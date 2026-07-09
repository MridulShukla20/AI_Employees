#!/bin/bash
set -e

DB_HOST="${DB_HOST:-127.0.0.1}"
if [ "$DB_HOST" = "127.0.0.1" ] || [ "$DB_HOST" = "localhost" ]; then
    mariadb-admin ping --silent
fi

# /slack/events answers any JSON POST with 200, so it doubles as a liveness probe
python3 - <<'PY'
import sys
import urllib.request

req = urllib.request.Request(
    "http://127.0.0.1:8000/slack/events",
    data=b"{}",
    headers={"Content-Type": "application/json"},
)
resp = urllib.request.urlopen(req, timeout=5)
sys.exit(0 if resp.status == 200 else 1)
PY
