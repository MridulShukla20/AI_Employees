import os
from dotenv import load_dotenv

load_dotenv()

# MySQL credentials dictionary packaging
DB_CONFIG = {
    "host": os.getenv("DB_HOST"),
    "user": os.getenv("DB_USER"),
    "password": os.getenv("DB_PASSWORD"),
    "database": os.getenv("DB_NAME"),
    "autocommit": True
}

SLACK_BOT_TOKEN = os.getenv("SLACK_BOT_TOKEN")
SLACK_ADMIN_CHANNEL_ID = os.getenv("SLACK_ADMIN_CHANNEL_ID")

KEKA_CONFIG = {
    "api_key": os.getenv("KEKA_API_KEY"),
    "client_id": os.getenv("KEKA_CLIENT_ID"),
    "client_secret": os.getenv("KEKA_CLIENT_SECRET"),
    "subdomain": os.getenv("KEKA_SUBDOMAIN")
}