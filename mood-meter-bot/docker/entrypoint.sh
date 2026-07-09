#!/bin/bash
set -eu

DB_HOST="${DB_HOST:-127.0.0.1}"
DB_NAME="${DB_NAME:-mood_tracker_db}"
DB_USER="${DB_USER:-moodbot}"
DB_PASSWORD="${DB_PASSWORD:-moodbot}"

MARIADB_PID=""
APP_PID=""

# Installed before the bootstrap: as PID 1, a bash without a handler silently
# ignores SIGTERM, so docker stop would hang through the whole startup window
shutdown() {
    kill -TERM ${APP_PID:+"$APP_PID"} ${MARIADB_PID:+"$MARIADB_PID"} 2>/dev/null || true
    wait || true
    exit "${1:-0}"
}
trap 'shutdown 143' TERM
trap 'shutdown 130' INT

is_local_db() {
    [ "$DB_HOST" = "127.0.0.1" ] || [ "$DB_HOST" = "localhost" ]
}

# DB_NAME is used as an SQL identifier and as a CLI argument; keep it strict
case "$DB_NAME" in
    *[!A-Za-z0-9_]*|"")
        echo "[entrypoint] ERROR: DB_NAME may only contain letters, digits and underscores" >&2
        exit 1
        ;;
esac

# Escape backslashes and single quotes so credentials with special characters
# survive interpolation into the SQL string literals below
sql_escape() {
    local s=${1//\\/\\\\}
    printf '%s' "${s//\'/\\\'}"
}
DB_USER_SQL=$(sql_escape "$DB_USER")
DB_PASSWORD_SQL=$(sql_escape "$DB_PASSWORD")

if is_local_db; then
    echo "[entrypoint] DB_HOST=$DB_HOST -> using embedded MariaDB"

    mkdir -p /run/mysqld
    chown mysql:mysql /run/mysqld
    # A freshly created named volume is owned by root; hand it to mysql once
    [ "$(stat -c %U /var/lib/mysql)" = "mysql" ] || chown -R mysql:mysql /var/lib/mysql

    if [ ! -d /var/lib/mysql/mysql ]; then
        echo "[entrypoint] Initializing MariaDB data directory..."
        mariadb-install-db --user=mysql --datadir=/var/lib/mysql --skip-test-db >/dev/null
    fi

    # Bind to loopback only: the database is private to this container
    /usr/sbin/mariadbd --user=mysql --bind-address=127.0.0.1 &
    MARIADB_PID=$!

    echo "[entrypoint] Waiting for MariaDB to accept connections..."
    for i in $(seq 1 60); do
        if mariadb-admin ping --silent 2>/dev/null; then
            break
        fi
        if [ "$i" -eq 60 ]; then
            echo "[entrypoint] ERROR: MariaDB did not come up within 60s" >&2
            exit 1
        fi
        sleep 1
    done

    # Idempotent: safe to run on every boot, also refreshes the app password
    mariadb <<SQL
CREATE DATABASE IF NOT EXISTS \`$DB_NAME\` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE USER IF NOT EXISTS '$DB_USER_SQL'@'localhost' IDENTIFIED BY '$DB_PASSWORD_SQL';
CREATE USER IF NOT EXISTS '$DB_USER_SQL'@'127.0.0.1' IDENTIFIED BY '$DB_PASSWORD_SQL';
ALTER USER '$DB_USER_SQL'@'localhost' IDENTIFIED BY '$DB_PASSWORD_SQL';
ALTER USER '$DB_USER_SQL'@'127.0.0.1' IDENTIFIED BY '$DB_PASSWORD_SQL';
GRANT ALL PRIVILEGES ON \`$DB_NAME\`.* TO '$DB_USER_SQL'@'localhost';
GRANT ALL PRIVILEGES ON \`$DB_NAME\`.* TO '$DB_USER_SQL'@'127.0.0.1';
FLUSH PRIVILEGES;
SQL
    mariadb "$DB_NAME" < /app/db/schema.sql
    # Upgrade path for volumes created from the original moodmeter.sql export.
    # MariaDB-only syntax, which is fine here — this branch IS MariaDB; schema.sql
    # itself stays portable to stock MySQL for the external-database setup.
    mariadb "$DB_NAME" <<'SQL'
ALTER TABLE users ADD COLUMN IF NOT EXISTS is_active TINYINT(1) NOT NULL DEFAULT 1;
ALTER TABLE users ADD COLUMN IF NOT EXISTS last_dm_sent_at DATETIME NULL DEFAULT NULL;
ALTER TABLE users ADD COLUMN IF NOT EXISTS last_dm_msg_ts VARCHAR(50) NULL DEFAULT NULL;
SQL
    echo "[entrypoint] MariaDB ready, schema applied."
else
    echo "[entrypoint] DB_HOST=$DB_HOST -> external database, embedded MariaDB stays off"
fi

echo "[entrypoint] Starting Mood Meter Bot (uvicorn on :8000)..."
uvicorn main:app --host 0.0.0.0 --port 8000 &
APP_PID=$!

# If either process dies, stop the container so a restart policy can revive it
EXIT_CODE=0
wait -n || EXIT_CODE=$?
shutdown "$EXIT_CODE"
