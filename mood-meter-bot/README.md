# Mood Meter Bot — Docker

Slack mood-tracking bot (FastAPI + APScheduler + MySQL) packaged as a **single
self-contained Docker image**: the Python app and a MariaDB (MySQL-compatible)
database run together in one container. The schema is created automatically on
first boot, and all credentials come from your local `.env` at runtime — no
secrets are ever baked into the image.

## Quick start

```sh
cd mood-meter-bot

# 1. Put your existing .env in this folder (see .env.example for the keys).
#    For the embedded database keep DB_HOST=127.0.0.1

# 2. Build the image
docker build -t mood-meter-bot .

# 3. Run the container
docker run -d --name mood-meter-bot \
  -p 8000:8000 \
  --env-file .env \
  -v mood_meter_data:/var/lib/mysql \
  --restart unless-stopped \
  mood-meter-bot
```

Or the same thing with compose: `docker compose up -d --build`

The API listens on `http://localhost:8000`. Mood data persists in the
`mood_meter_data` volume across container rebuilds.

## Slack configuration

Slack must be able to reach the container over HTTPS (e.g. via ngrok or a
reverse proxy on your server). Point your Slack app at:

| Slack feature | URL |
|---|---|
| Event Subscriptions | `https://<public-host>/slack/events` |
| Interactivity (buttons) | `https://<public-host>/slack/interactive` |
| `/dashboard` slash command | `https://<public-host>/slack/dashboard` |
| `/my-history` slash command | `https://<public-host>/slack/my-history` |
| `/mood-employee` slash command | `https://<public-host>/slack/mood-employee` |
| `/mood-department` slash command | `https://<public-host>/slack/mood-department` |

## Using an external MySQL instead

Set `DB_HOST` in `.env` to your MySQL host (anything other than
`127.0.0.1`/`localhost`) and the embedded database stays off. Apply
`db/schema.sql` to that server yourself.

## Notes

- **Schema**: `db/schema.sql` extends the original `moodmeter.sql` export with
  `users.is_active`, `users.last_dm_sent_at` and `users.last_dm_msg_ts` —
  columns the code requires that the export was missing.
- **Timezone**: the DM scheduler's noon–10pm window and Sunday pause follow
  the container's `TZ` (default `Asia/Kolkata`; override in `.env`).
- **First sync**: to populate users immediately instead of waiting for the
  weekly Sunday job:
  `docker exec -it mood-meter-bot python sync_keka.py`
- **Database shell**: `docker exec -it mood-meter-bot mariadb mood_tracker_db`
