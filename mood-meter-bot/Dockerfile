# Mood Meter Bot — single self-contained image:
# FastAPI Slack bot + embedded MariaDB (MySQL-compatible) in one container.
# Secrets are NOT baked in; pass them at runtime with --env-file .env
FROM python:3.12-slim

ENV PYTHONUNBUFFERED=1 \
    PIP_NO_CACHE_DIR=1

# MariaDB provides the MySQL-compatible database; tzdata makes the scheduler's
# 12:00-22:00 delivery window and Sunday guard follow local time, not UTC
RUN apt-get update \
    && apt-get install -y --no-install-recommends mariadb-server mariadb-client tzdata \
    && rm -rf /var/lib/apt/lists/*

# Override with -e TZ=... if the team is not in India
ENV TZ=Asia/Kolkata

WORKDIR /app

COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

COPY . .
RUN chmod +x docker/entrypoint.sh docker/healthcheck.sh

# Safe defaults for the embedded database; a runtime --env-file overrides all.
# Point DB_HOST at any external MySQL to skip starting the embedded one.
ENV DB_HOST=127.0.0.1 \
    DB_NAME=mood_tracker_db \
    DB_USER=moodbot \
    DB_PASSWORD=moodbot

# Mood data survives container rebuilds when mounted as a named volume
VOLUME /var/lib/mysql

EXPOSE 8000

HEALTHCHECK --interval=30s --timeout=10s --start-period=90s \
  CMD ["/app/docker/healthcheck.sh"]

ENTRYPOINT ["/app/docker/entrypoint.sh"]
