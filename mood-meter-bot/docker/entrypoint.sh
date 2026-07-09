#!/bin/bash
set -eu

DB_HOST="${DB_HOST:-127.0.0.1}"
DB_NAME="${DB_NAME:-mood_tracker_db}"
DB_USER="${DB_USER:-moodbot}"
DB_PASSWORD="${DB_PASSWORD:-moodbot}"

is_local_db() {
    [ "$DB_HOST" = "127.0.0.1" ] || [ "$DB_HOST" = "localhost" ]
}

MARIADB_PID=""

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
CREATE USER IF NOT EXISTS '$DB_USER'@'localhost' IDENTIFIED BY '$DB_PASSWORD';
CREATE USER IF NOT EXISTS '$DB_USER'@'127.0.0.1' IDENTIFIED BY '$DB_PASSWORD';
ALTER USER '$DB_USER'@'localhost' IDENTIFIED BY '$DB_PASSWORD';
ALTER USER '$DB_USER'@'127.0.0.1' IDENTIFIED BY '$DB_PASSWORD';
GRANT ALL PRIVILEGES ON \`$DB_NAME\`.* TO '$DB_USER'@'localhost';
GRANT ALL PRIVILEGES ON \`$DB_NAME\`.* TO '$DB_USER'@'127.0.0.1';
FLUSH PRIVILEGES;
SQL
    mariadb "$DB_NAME" < /app/db/schema.sql
    echo "[entrypoint] MariaDB ready, schema applied."
else
    echo "[entrypoint] DB_HOST=$DB_HOST -> external database, embedded MariaDB stays off"
fi

echo "[entrypoint] Starting Mood Meter Bot (uvicorn on :8000)..."
uvicorn main:app --host 0.0.0.0 --port 8000 &
APP_PID=$!

shutdown() {
    kill -TERM "$APP_PID" ${MARIADB_PID:+"$MARIADB_PID"} 2>/dev/null || true
    wait || true
}
trap shutdown TERM INT

# If either process dies, stop the container so a restart policy can revive it
EXIT_CODE=0
wait -n || EXIT_CODE=$?
shutdown
exit "$EXIT_CODE"
