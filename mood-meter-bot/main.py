import re
import datetime
import json
import logging
import httpx
from contextlib import asynccontextmanager
from fastapi import FastAPI, Request, BackgroundTasks, Form, Response
from fastapi.responses import JSONResponse
from slack_sdk import WebClient
from slack_sdk.errors import SlackApiError

from database import (
    get_last_mood_timestamp, 
    save_mood_log, 
    get_user_department, 
    get_department_dashboard_metrics,
    get_todays_detailed_moods,       # Fetches unique user check-ins for the current day
    get_user_30_day_history,         # Pulls 30 days of historical logs for an employee
    get_all_active_users,           # Returns an array of all registered Slack user IDs
    update_user_dm_tracking,         # UPDATED: Tracks message metadata
    get_all_users_with_dm_tracking,  # UPDATED: Fetches complete database context
    get_employee_historical_mood,    # NEW ADDITION
    get_department_historical_mood
)
from sync_keka import sync_employees_to_database
from config import SLACK_BOT_TOKEN

# ⚙️ Configure internal engine log outputs to track backend execution steps clearly
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("apscheduler")

# ⏰ Import the Advanced Python Scheduler to execute recurring background loops
from apscheduler.schedulers.background import BackgroundScheduler


# ==============================================================================
# 🎯 DICTIONARY STRUCTURE MAPPINGS
# ==============================================================================

# Dictionary mapping raw database string payloads to visual Slack emoji strings
MOOD_EMOJIS = {
    "happy": "😊 Happy",
    "sad": "😢 Sad",
    "frustrated": "😤 Frustrated",
    "tired": "😴 Tired",
    "excited": "🤩 Excited",
    "neutral": "😐 Neutral",
    "anxious": "😰 Anxious",
    "motivated": "💪 Motivated",
    "unwell": "🤒 Unwell",
    "overwhelmed": "😵 Overwhelmed"
}

# Categorization dictionary mapping backend mood tags to parent performance buckets
MOOD_CATEGORIES = {
    "happy": "positive", "excited": "positive", "motivated": "positive",
    "neutral": "neutral", "tired": "neutral",
    "sad": "negative", "frustrated": "negative", "anxious": "negative", "unwell": "negative", "overwhelmed": "negative"
}


# ==============================================================================
# 🔒 CHANNEL SECURITY HOOK CONFIGURATION
# ==============================================================================
# Restricts dashboard access strictly to this unique, verified Slack Channel ID
ALLOWED_CHANNEL_IDS = ["C0BFT40NH8U"]


# ==============================================================================
# ⏰ CRON JOB / BACKING AUTOMATED INTERVAL PROCESS
# ==============================================================================

def send_interactive_dm(slack_userid: str, dept: str):
    """
    Dispatches a fresh interactive mood tracking DM block layout to the target user
    and commits its unique Slack message timestamp ID directly to database tracking.
    """
    try:
        response = slack_client.chat_postMessage(
            channel=slack_userid,
            text="How is your mood today?",
            blocks=[
                {
                    "type": "section", 
                    "text": {"type": "mrkdwn", "text": f"Hey there! Quick pulse-check—how is your energy tracking right now over in the *{dept}* team?"}
                },
                {
                    "type": "actions",
                    "block_id": "mood_row_1",
                    "elements": [
                        {"type": "button", "text": {"type": "plain_text", "text": "Happy 😊"}, "value": "happy", "action_id": "mood_happy"},
                        {"type": "button", "text": {"type": "plain_text", "text": "Sad 😢"}, "value": "sad", "action_id": "mood_sad"},
                        {"type": "button", "text": {"type": "plain_text", "text": "Frustrated 😤"}, "value": "frustrated", "action_id": "mood_frustrated"},
                        {"type": "button", "text": {"type": "plain_text", "text": "Tired 😴"}, "value": "tired", "action_id": "mood_tired"},
                        {"type": "button", "text": {"type": "plain_text", "text": "Excited 🤩"}, "value": "excited", "action_id": "mood_excited"}
                    ]
                },
                {
                    "type": "actions",
                    "block_id": "mood_row_2",
                    "elements": [
                        {"type": "button", "text": {"type": "plain_text", "text": "Neutral 😐"}, "value": "neutral", "action_id": "mood_neutral"},
                        {"type": "button", "text": {"type": "plain_text", "text": "Anxious 😰"}, "value": "anxious", "action_id": "mood_anxious"},
                        {"type": "button", "text": {"type": "plain_text", "text": "Motivated 💪"}, "value": "motivated", "action_id": "mood_motivated"},
                        {"type": "button", "text": {"type": "plain_text", "text": "Unwell 🤒"}, "value": "unwell", "action_id": "mood_unwell"},
                        {"type": "button", "text": {"type": "plain_text", "text": "Overwhelmed 😵"}, "value": "overwhelmed", "action_id": "mood_overwhelmed"}
                    ]
                }
            ]
        )
        # Pull out the message unique ID generated dynamically by Slack
        msg_ts = response.get("ts")
        
        # Log this state directly to your MySQL tracking tables
        update_user_dm_tracking(slack_userid, msg_ts)
        print(f"🚀 Success: Sent dynamic mood poll DM to: {slack_userid} (TS ID: {msg_ts})")
        
    except SlackApiError as e:
        if e.response["error"] == "channel_not_found":
            print(f"ℹ️ User {slack_userid} has not initialized or opened the app sidebar yet. Skipping.")
        else:
            print(f"⚠️ Slack API Error delivering DM check to user {slack_userid}: {e.response['error']}")
    except Exception as e:
        print(f"⚠️ Unexpected ERROR delivering DM check to user {slack_userid}: {e}")
        
        
def send_mood_prompt_to_all_users():
    """
    Automated background supervisor engine executing hourly to check user daily profiles.
    PRODUCTION MODE: Enforces a strict ONCE-PER-DAY calendar date evaluation limit.
    🚫 WEEKEND GUARD: Completely pauses deliveries on Sundays.
    🔒 TIME WINDOW ACTIVE: Only dispatches messages between 12:00 Noon and 10:00 PM.
    """
    current_time = datetime.datetime.now()
    
    # 🚫 SUNDAY INTERCEPT GUARD
    if current_time.weekday() == 6:
        print(f"🛑 SUNDAY PAUSE MODE: Today is Sunday ({current_time.strftime('%Y-%m-%d')}). Skipping automated mood prompts.")
        return

    current_hour = current_time.hour
    
    # 🚫 OPERATIONAL WINDOW GUARD (10:00 PM to 12:00 Noon)
    if current_hour >= 22 or current_hour < 12:
        print(f"🌙 CRON SLEEP MODE: Current time is {current_time.strftime('%I:%M %p')}. Delivery paused until afternoon.")
        return

    print(f"⏰ CRON: Supervisor running hourly validation round at {current_time}")
    
    # Extract complete dictionary list with tracking metadata keys intact
    users = get_all_users_with_dm_tracking()
    today_date = current_time.date()
    
    for user in users:
        slack_userid = user["slack_user_id"]
        dept = user["keka_department"] or "Cross-Functional"
        last_dm_sent_at = user["last_dm_sent_at"]
        last_dm_msg_ts = user["last_dm_msg_ts"]
        
        # CASE 0: Brand new user with empty tracking state logs — initialize immediately
        if not last_dm_sent_at:
            send_interactive_dm(slack_userid, dept)
            continue
            
        # 🗓️ CALENDAR DAY GUARD: Explicit validation checking calendar bounds
        if last_dm_sent_at.date() == today_date:
            print(f"⏭️ Skipping user {slack_userid}. Already received a prompt today ({last_dm_sent_at.strftime('%Y-%m-%d')}).")
            continue

        # CASE 1: Moving into a new calendar day. Check if they left yesterday's message unvoted.
        last_button_click = get_last_mood_timestamp(slack_userid)
        has_clicked_latest_dm = False
        if last_button_click and last_button_click > last_dm_sent_at:
            has_clicked_latest_dm = True

        if not has_clicked_latest_dm and last_dm_msg_ts:
            try:
                # chat_delete cleanly eliminates unvoted blocks from yesterday to avoid workspace clutter
                slack_client.chat_delete(
                    channel=slack_userid,
                    ts=str(last_dm_msg_ts)
                )
                print(f"🧹 Cleaned up yesterday's un-clicked message block TS {last_dm_msg_ts} for {slack_userid}.")
            except SlackApiError as clean_err:
                if clean_err.response["error"] == "channel_not_found":
                    print(f"ℹ️ Old message TS {last_dm_msg_ts} belongs to an outdated token session. Clearing trace data.")
                else:
                    print(f"⚠️ Slack API error clearing historical message: {clean_err.response['error']}")
            except Exception as clean_err:
                print(f"⚠️ Could not delete old block message: {clean_err}")

        # Dispatch the single permitted daily tracking record interaction sheet
        print(f"🔄 Processing fresh daily prompt for user: {slack_userid}.")
        send_interactive_dm(slack_userid, dept)


# ==============================================================================
# 🔐 LIFECYCLE MANAGEMENT / APPSCHEDULER SINGLE RUNNER CONTEXT
# ==============================================================================

@asynccontextmanager
async def lifespan(app: FastAPI):
    """
    Enforces unified, standalone setup rules inside production worker loops.
    Guarantees the scheduler only instantiates exactly ONCE across core threads.
    """
    # Instantiate the system runner scheduler profile context
    scheduler = BackgroundScheduler()

    # ⚡ HOURLY OPTIMIZED TRIGGER: Wakes up every 1 hour to verify distribution thresholds.
    scheduler.add_job(
        send_mood_prompt_to_all_users, 
        'interval', 
        hours=1,
        id='daily_mood_poll_job'
    )
    
    scheduler.add_job(
        sync_employees_to_database,
        'cron',
        day_of_week='sun',
        hour=13,
        minute=30,
        id='weekly_keka_sync_job'
    )

    # Fire up the concurrent engine runner service thread line
    scheduler.start()
    print("🎯 BACKGROUND SERVICE: Active hourly production scheduler loop running cleanly inside Unified Lifespan context.")
    
    yield # Execution hand-off split point container
    
    # Clean shutdown hook when killing worker threads
    scheduler.shutdown()
    print("🛑 BACKGROUND SERVICE: Automated scheduling processes cleanly unallocated.")


# Initialize the official Slack WebClient with your workspace bot token
slack_client = WebClient(token=SLACK_BOT_TOKEN)

# Initialize the FastAPI core application mapping your safe lifecycle container logic
app = FastAPI(lifespan=lifespan)


# ==============================================================================
# 🪝 WEB ROUTING / FASTAPI API API WEBHOOK ENDPOINTS
# ==============================================================================

async def send_slack_callback(response_url: str, selected_mood: str):
    """
    Fires an asynchronous network POST request back to Slack's contextual endpoint tracking string
    to clean up the chat feed interface by replacing active action button arrays with clean text.
    """
    payload = {
        "replace_original": True,  # Flags Slack to wipe the interactive layout buttons completely
        "text": f"Got it! Logged your mood input selection as *{selected_mood}*. Have a great day!"
    }
    async with httpx.AsyncClient() as client:
        try:
            res = await client.post(response_url, json=payload)
            print(f"DEBUG: Slack response_url update status: {res.status_code}")
        except Exception as e:
            print(f"⚠️ ERROR updating Slack UI via response_url: {e}")


@app.post("/slack/events")
async def slack_events(request: Request):
    """
    Standard Slack events registration route hook designed to safely capture 
    and authorize initial Slack app handshake challenge verification checks.
    """
    payload = await request.json()
    
    # Handle the initial cryptographic handshake verification block when configuring your app console
    if "challenge" in payload:
        return {"challenge": payload["challenge"]}
        
    return {"status": "ok"}


@app.post("/slack/interactive")
async def slack_interactive(request: Request, background_tasks: BackgroundTasks):
    """
    Listens explicitly for active incoming user button click interactive interactions,
    commits selection strings to the database system, and triggers UI housekeeping tasks.
    """
    form_data = await request.form()
    payload_str = form_data.get("payload")
    
    if not payload_str:
        return Response(status_code=400)
    
    data = json.loads(payload_str)
    slack_userid = data.get("user", {}).get("id")
    actions = data.get("actions", [])
    response_url = data.get("response_url")  # The tracking endpoint webhook token generated by Slack
    
    if actions and slack_userid and response_url:
        selected_mood = actions[0].get("value")
        dept = get_user_department(slack_userid) or "Cross-Functional"
        
        # Write the data transaction permanently to the mood_logs database table
        save_mood_log(slack_userid, selected_mood, dept)
        print(f"📊 DATA SAVED: User {slack_userid} logged mood '{selected_mood}' for team '{dept}'")
        
        # Enqueue the UI cleanup callback routine asynchronously via FastAPI Background Tasks
        background_tasks.add_task(send_slack_callback, response_url, selected_mood)
        
    # Return a rapid, empty HTTP 200 OK block to satisfy Slack's required 3-second response constraint
    return Response(status_code=200)


@app.post("/slack/dashboard")
async def slack_dashboard(request: Request):
    """
    Admin-restricted management dashboard route compiling the core multi-view system output:
    1. A department-level percentage distribution layout.
    2. A chronological team timeline stream filtered exclusively to unique entries logged today.
    """
    form_data = await request.form()
    requesting_channel_id = form_data.get("channel_id")
    
    # 🔒 CHANNELS AUTH INTERLOCK CHECK
    if requesting_channel_id not in ALLOWED_CHANNEL_IDS:
        print(f"🔒 SECURITY: Dashboard command triggered from unauthorized channel: {requesting_channel_id}")
        return JSONResponse(content={
            "response_type": "ephemeral", # Rejection error text is kept invisible to the rest of the workspace
            "text": "❌ *Access Denied:* The dashboard can only be accessed from the designated management channel."
        })
        
    # Query database for both metrics arrays concurrently
    metrics = get_department_dashboard_metrics()
    logs = get_todays_detailed_moods()
    today_str = datetime.date.today().strftime("%Y-%m-%d")
    
    # ==========================================================================
    # VIEW MODEL 1: Aggregated Department Percentages
    # ==========================================================================
    dashboard_text = "📊 *Live Department Mood Analytics*\n"
    dashboard_text += "📁 *All Departments*\n"
    
    if not metrics:
        dashboard_text += "└── No historical data recorded yet today.\n"
    else:
        # Loop through dictionary items: e.g., {'Engineering': [('happy', 60), ('tired', 40)]}
        for dept, mood_list in metrics.items():
            mood_strings = []
            for mood, pct in mood_list:
                emoji_text = MOOD_EMOJIS.get(mood.lower(), mood.capitalize())
                mood_strings.append(f"{emoji_text}: {pct}%")
            # Compile matching department string arrays separated cleanly by dividers
            dashboard_text += f"└── 🏢 *{dept}* ➔  " + "  |  ".join(mood_strings) + "\n"
            
    dashboard_text += "\n" + "="*60 + "\n\n"  # Output text block section layout divider line
    
    # ==========================================================================
    # VIEW MODEL 2: Categorized Individual Timeline Streams
    # ==========================================================================
    positive_lines = []
    neutral_lines = []
    negative_lines = []
    
    for log in logs:
        mood = log["mood_selected"].lower()
        name = log["employee_name"]
        
        # Safely convert MySQL datetime objects into user-facing display strings via Python
        raw_timestamp = log["login_timestamp"]
        if isinstance(raw_timestamp, datetime.datetime):
            time_str = raw_timestamp.strftime("%I:%M %p")
        else:
            time_str = str(raw_timestamp)
        
        emoji_text = MOOD_EMOJIS.get(mood, mood.capitalize())
        line = f"• {emoji_text} — *{name}* at {time_str}"
        
        # Parse text rows into their evaluated destination category list arrays
        category = MOOD_CATEGORIES.get(mood, "neutral")
        if category == "positive":
            positive_lines.append(line)
        elif category == "neutral":
            neutral_lines.append(line)
        else:
            negative_lines.append(line)
            
    # Calculate sizes to output counters inside header summary bar blocks
    total_logs = len(logs)
    pos_count = len(positive_lines)
    neu_count = len(neutral_lines)
    neg_count = len(negative_lines)
    
    dashboard_text += f"📊 *Individual Team Mood Feed — {today_str}*\n"
    dashboard_text += f"*{total_logs}* check-ins today  •  🟢 Positive: {pos_count}  •  🟡 Neutral: {neu_count}  •  🔴 Negative: {neg_count}\n"
    dashboard_text += "‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾\n"
    
    if not logs:
        dashboard_text += "\n📋 No active user check-ins logged in the database yet today.\n"
    else:
        # Dynamically append category view structures only if logs exist inside the arrays
        if negative_lines:
            dashboard_text += "\n🔴 *Struggling / Needs Support*\n" + "\n".join(negative_lines) + "\n"
        if neutral_lines:
            dashboard_text += "\n🟡 *In the middle*\n" + "\n".join(neutral_lines) + "\n"
        if positive_lines:
            dashboard_text += "\n🟢 *Doing well*\n" + "\n".join(positive_lines) + "\n"
            
    return JSONResponse(content={
        "response_type": "ephemeral",  # Ensures dashboard remains visible only to users inside that secure channel context
        "text": dashboard_text
    })
    
    
@app.post("/slack/my-history")
async def slack_user_history(request: Request):
    """
    Self-service history endpoint tracking an individual employee's 30-day timeline.
    Output is strictly ephemeral, securing private record validation logs from peers.
    """
    form_data = await request.form()
    slack_userid = form_data.get("user_id")
    
    if not slack_userid:
        return Response(status_code=400)
        
    # Retrieve user row items array from the database backend
    logs = get_user_30_day_history(slack_userid)
    
    if not logs:
        return JSONResponse(content={
            "response_type": "ephemeral",
            "text": "📋 *Your Mood History (Last 30 Days)*\nNo logs found in the last 30 days! Use your pulse checks to build your history profile."
        })
        
    # Construct personal visual history log string metrics layout
    history_text = f"🗓️ *Your Personal Mood History (Last 30 Days)*\n"
    history_text += f"You have logged *{len(logs)}* entries during this window.\n"
    history_text += "‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾\n"
    
    for log in logs:
        mood = log["mood_selected"].lower()
        date_str = log["log_date"]
        time_str = log["log_time"]
        dept = log["department_at_time"]
        
        emoji_text = MOOD_EMOJIS.get(mood, mood.capitalize())
        history_text += f"📅 *{date_str}* at {time_str}  ➔  {emoji_text} _({dept} team)_\n"
        
    return JSONResponse(content={
        "response_type": "ephemeral",  # 🔒 Critical protection layer guaranteeing data item isolation
        "text": history_text
    })
    
    
# ==============================================================================
# 🪝 NEW ADMIN ADVANCED ANALYTICAL SLASH COMMAND ENDPOINTS
# ==============================================================================

@app.post("/slack/mood-employee")
async def slack_mood_employee(request: Request):
    """
    Slash command endpoint compiling historical aggregate analytics metrics for a selected employee.
    🔒 STRICT SECURITY: Restricts validation processing contexts exclusively to verified admin channels.
    """
    form_data = await request.form()
    requesting_channel_id = form_data.get("channel_id")
    command_text = form_data.get("text", "").strip()
    
    # 🔒 CHANNELS AUTH INTERLOCK CHECK
    if requesting_channel_id not in ALLOWED_CHANNEL_IDS:
        print(f"🔒 SECURITY: Employee history query triggered from unauthorized channel: {requesting_channel_id}")
        return JSONResponse(content={
            "response_type": "ephemeral",
            "text": "❌ *Access Denied:* Historical employee analytics lookups can only be run inside designated admin management rooms."
        })
        
    if not command_text:
        return JSONResponse(content={
            "response_type": "ephemeral",
            "text": "💡 *Usage Instructions:* Please query using the following command structure format:\n`/mood-employee [@EmployeeName or Plain Name] [7, 15, or 30]`"
        })

    # Initialize extraction targets
    target_userid = None
    days_window = 7  # Default fallback window framework

    # 🕒 Step 1: Parse out the trailing days parameter flag if it exists at the end of the line
    parts = command_text.split()
    last_word = parts[-1]
    if last_word.isdigit():
        potential_days = int(last_word)
        if potential_days in [7, 15, 30]:
            days_window = potential_days
            # Remove the days number from the string text to leave just the name clean
            command_text = " ".join(parts[:-1]).strip()

    # 🔍 Step 2: Extract the User ID if they used an autocomplete Slack mention link
    mention_match = re.search(r"<@([A-Z0-9]+)(?:\|[^>]+)?>", command_text)
    
    if mention_match:
        target_userid = mention_match.group(1)
    else:
        # 📝 Step 3: FALLBACK — They typed a raw string name manually (e.g., "@vedanks" or "Vedank Singh")
        clean_name_query = command_text.replace("@", "").strip().lower()
        
        # Run a targeted fallback database connection lookup query checking Name, ID, or Email Handles
        from database import get_db_connection
        connection = get_db_connection()
        with connection.cursor() as cursor:
            sql = """
                SELECT slack_user_id FROM users 
                WHERE LOWER(employee_name) LIKE %s 
                   OR slack_user_id = %s 
                   OR email LIKE %s 
                LIMIT 1
            """
            cursor.execute(sql, (f"%{clean_name_query}%", clean_name_query.upper(), f"{clean_name_query}@%"))
            row = cursor.fetchone()
            if row:
                target_userid = row[0]
        connection.close()

    # 🚫 ERROR PROTECTION: If we still couldn't resolve a real ID, report the naming lookup discrepancy
    if not target_userid:
        return JSONResponse(content={
            "response_type": "ephemeral",
            "text": f"🔍 *Employee Not Found:* Could not locate a database record matching *'{command_text}'*. Make sure they have been synchronized by `sync_keka.py` first."
        })
        
    # 📊 Step 4: Pull analytical historical metrics calculation fields out of database logs
    data = get_employee_historical_mood(target_userid, days_window)
    
    response_text = f"📊 *Employee Pulse Analytics — Past {days_window} Days*\n"
    response_text += f"Target Employee Context: <@{target_userid}>\n"
    response_text += "‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾\n"
    
    if not data:
        response_text += "└── 📋 No check-in records logged for this employee profile inside the selected window."
    else:
        for row in data:
            mood_str = row["mood_selected"].lower()
            emoji_text = MOOD_EMOJIS.get(mood_str, mood_str.capitalize())
            response_text += f"• *{emoji_text}* ➔ {row['percentage']}% ({row['count']} entries)\n"
            
    return JSONResponse(content={"response_type": "ephemeral", "text": response_text})


@app.post("/slack/mood-department")
async def slack_mood_department(request: Request):
    """
    Slash command endpoint compiling historical aggregate data metrics for a target department.
    🔒 STRICT SECURITY: Restricts validation processing contexts exclusively to verified admin channels.
    Usage Hint: /mood-department Data Analytics 30
    """
    form_data = await request.form()
    requesting_channel_id = form_data.get("channel_id")
    command_text = form_data.get("text", "").strip()
    
    # 🔒 CHANNELS AUTH INTERLOCK CHECK
    if requesting_channel_id not in ALLOWED_CHANNEL_IDS:
        print(f"🔒 SECURITY: Department history query triggered from unauthorized channel: {requesting_channel_id}")
        return JSONResponse(content={
            "response_type": "ephemeral",
            "text": "❌ *Access Denied:* Department analytical lookups are restricted to the primary admin management platform channel room."
        })
        
    # Split the incoming string payload by spacing parameters to grab the day parameter trailing block
    parts = command_text.split()
    if not parts:
        return JSONResponse(content={
            "response_type": "ephemeral",
            "text": "💡 *Usage Instructions:* Please query using the following command structure format:\n`/mood-department [Department Name] [7, 15, or 30]`\n_Example: /mood-department Data Analytics 30_"
        })
        
    # Check if the last word passed is a valid days limit parameter
    last_word = parts[-1]
    if last_word.isdigit() and int(last_word) in [7, 15, 30]:
        days_window = int(last_word)
        target_dept = " ".join(parts[:-1]).strip() # Remainder components equal department name context
    else:
        days_window = 7  # Fall back to 7 days if omitted
        target_dept = " ".join(parts).strip()
        
    if not target_dept:
        return JSONResponse(content={
            "response_type": "ephemeral",
            "text": "⚠️ *Input Missing:* Please state the exact department name string target you want to audit."
        })
        
    # Pull aggregate metrics calculation metrics from dataset table logs
    data = get_department_historical_mood(target_dept, days_window)
    
    response_text = f"🏢 *Department Analytics Overview — Past {days_window} Days*\n"
    response_text += f"Target Team Division: *{target_dept}*\n"
    response_text += "‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾\n"
    
    if not data:
        response_text += f"└── 📋 No workforce data logs found assigned to a '{target_dept}' team entry in this window. Check text spelling formatting values."
    else:
        for row in data:
            mood_str = row["mood_selected"].lower()
            emoji_text = MOOD_EMOJIS.get(mood_str, mood_str.capitalize())
            response_text += f"• *{emoji_text}* ➔ {row['percentage']}% ({row['count']} total logs)\n"
            
    return JSONResponse(content={"response_type": "ephemeral", "text": response_text})