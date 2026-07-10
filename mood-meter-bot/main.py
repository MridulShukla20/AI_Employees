import re
import datetime
import json
import logging
import httpx
import os
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
    update_user_dm_tracking,         # tracks message metadata
    get_all_users_with_dm_tracking,  # Fetches complete database context
    get_employee_historical_mood,    
    get_department_historical_mood,
    get_employee_range_mood,
    get_continuous_negative_neutral_streaks_with_ids  # Imported streak scanner
)
from sync_keka import sync_employees_to_database
from config import SLACK_BOT_TOKEN, SLACK_ADMIN_CHANNEL_ID

# ⚙️ Configure internal engine log outputs to track backend execution steps clearly
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("apscheduler")

# ⏰ Import the Advanced Python Scheduler to execute recurring background loops
from apscheduler.schedulers.background import BackgroundScheduler


# ==============================================================================
# 🎯 DICTIONARY STRUCTURE MAPPINGS
# ==============================================================================

# ==============================================================================
# 🎯 DICTIONARY STRUCTURE MAPPINGS
# ==============================================================================

# Dictionary mapping raw database string payloads to visual Slack emoji + text strings
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
ALLOWED_CHANNEL_IDS = [SLACK_ADMIN_CHANNEL_ID]


# ==============================================================================
# ⏰ AUTOMATED 7:00 PM PUBLIC REPORT AUTOMATION
# ==============================================================================
def broadcast_daily_summary_reports():
    """
    Automated background supervisor executing every weekday at 7:00 PM.
    Compiles live metrics state context and dispatches a PUBLIC message block
    to the admin channel detailing category distributions and active @mention risk flags.
    (Keeps the Roster Feed Summary metric row, but hides the detailed names list).
    """
    current_time = datetime.datetime.now()
    
    # 🚫 Avoid weekend pollution checks (Saturday=5, Sunday=6)
    if current_time.weekday() in [5, 6]: 
        return

    print("📢 AUTOMATION: Compiling daily 7:00 PM analytical dashboard report...")
    
    # 1. Fetch live data from database layers
    logs = get_todays_detailed_moods()
    streak_profiles = get_continuous_negative_neutral_streaks_with_ids()  
    
    today_str = current_time.strftime("%A, %B %d, %Y")
    
    # ==========================================================================
    # PART 1: Compute Department Sentiment Category Percentages Dynamically
    # ==========================================================================
    dept_analytics = {}
    positive_count = 0
    neutral_count = 0
    negative_count = 0
    
    for log in logs:
        dept = log.get("department_at_time") or "Cross-Functional"
        mood = log["mood_selected"].lower()
        category = MOOD_CATEGORIES.get(mood, "neutral")
        
        if dept not in dept_analytics:
            dept_analytics[dept] = {"positive": 0, "neutral": 0, "negative": 0, "total": 0}
            
        dept_analytics[dept][category] += 1
        dept_analytics[dept]["total"] += 1
        
        # Keep tracking totals for the summary row
        if category == "positive":
            positive_count += 1
        elif category == "neutral":
            neutral_count += 1
        else:
            negative_count += 1

    report_text = f"🚨 *Automated Daily Sentiment Report — {today_str}*\n\n"
    
    # 📊 Keeping your exact requested summary metric row here
    report_text += f"📊 *Individual Roster Feed Summary:*\n"
    report_text += f"*{len(logs)}* check-ins today  •  🟢 Positive: {positive_count}  •  🟡 Neutral: {neutral_count}  •  🔴 Negative: {negative_count}\n"
    report_text += "‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾\n"
    report_text += "📁 *Departmental Sentiment Breakdown:*\n"
    
    if not dept_analytics:
        report_text += "└── No historical data recorded yet today.\n"
    else:
        for dept, counts in dept_analytics.items():
            total = counts["total"]
            pos_pct = round((counts["positive"] / total) * 100, 1)
            neu_pct = round((counts["neutral"] / total) * 100, 1)
            neg_pct = round((counts["negative"] / total) * 100, 1)
            
            report_text += f"└── 🏢 *{dept}* ➔ 🟢 Positive: {pos_pct}%  |  🟡 Neutral: {neu_pct}%  |  🔴 Negative: {neg_pct}%\n"
            
    report_text += "\n" + "="*60 + "\n\n"
    
    # ==========================================================================
    # PART 2: ⚠️ RISK SUMMARY (Continuous Neutral/Negative Streaks using @mentions)
    # ==========================================================================
    report_text += "⚠️ *Workforce Sentiment Burnout Risk Watch (2-3 Day Continuous Neutral/Negative):*\n"
    if streak_profiles:
        streak_mentions = [f"• <@{p['slack_user_id']}> ➔ _Flagged for persistent neutral or negative records_" for p in streak_profiles]
        report_text += "\n".join(streak_mentions) + "\n"
    else:
        report_text += "✨ No employees flagged for burnout risk windows this cycle.\n"
        
    # Broadcast out publicly to your designated admin management channel
    try:
        slack_client.chat_postMessage(
            channel=ALLOWED_CHANNEL_IDS[0],
            text=report_text
        )
        print("✅ SUCCESS: Public daily summary report broadcasted cleanly.")
    except Exception as broadcast_err:
        print(f"⚠️ Failed to push public scheduled report: {broadcast_err}")
        
        

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
        msg_ts = response.get("ts")
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
    """
    current_time = datetime.datetime.now()
    
    if current_time.weekday() == 6:
        print(f"🛑 SUNDAY PAUSE MODE: Today is Sunday ({current_time.strftime('%Y-%m-%d')}). Skipping automated mood prompts.")
        return

    current_hour = current_time.hour
    
    if current_hour >= 22 or current_hour < 12:
        print(f"🌙 CRON SLEEP MODE: Current time is {current_time.strftime('%I:%M %p')}. Delivery paused until afternoon.")
        return

    print(f"⏰ CRON: Supervisor running hourly validation round at {current_time}")
    
    users = get_all_users_with_dm_tracking()
    today_date = current_time.date()
    
    for user in users:
        slack_userid = user["slack_user_id"]
        dept = user["keka_department"] or "Cross-Functional"
        last_dm_sent_at = user["last_dm_sent_at"]
        last_dm_msg_ts = user["last_dm_msg_ts"]
        
        if not last_dm_sent_at:
            send_interactive_dm(slack_userid, dept)
            continue
            
        if last_dm_sent_at.date() == today_date:
            print(f"⏭️ Skipping user {slack_userid}. Already received a prompt today ({last_dm_sent_at.strftime('%Y-%m-%d')}).")
            continue

        last_button_click = get_last_mood_timestamp(slack_userid)
        has_clicked_latest_dm = False
        if last_button_click and last_button_click > last_dm_sent_at:
            has_clicked_latest_dm = True

        if not has_clicked_latest_dm and last_dm_msg_ts:
            try:
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
    scheduler = BackgroundScheduler()

    # Job 1: Hourly Daily Poll Supervisor Check
    scheduler.add_job(
        send_mood_prompt_to_all_users, 
        'interval', 
        hours=1,
        id='daily_mood_poll_job'
    )
    
    # Job 2: Weekly Keka Directory Verification Sync (Sunday at 1:30 PM)
    scheduler.add_job(
        sync_employees_to_database,
        'cron',
        day_of_week='sun',
        hour=13,
        minute=30,
        id='weekly_keka_sync_job'
    )

    # 🗓️ Job 3: AUTOMATED DAILY 7:00 PM CHANNEL BROADCAST REPORT (Mon-Sat)
    scheduler.add_job(
        broadcast_daily_summary_reports,
        'cron',
        day_of_week='mon-sat',
        hour=19,
        minute=0,
        id='daily_7pm_broadcast_job'
    )

    scheduler.start()
    print("🎯 BACKGROUND SERVICE: Active hourly production scheduler loops running cleanly inside Unified Lifespan context.")
    
    yield
    
    scheduler.shutdown()
    print("🛑 BACKGROUND SERVICE: Automated scheduling processes cleanly unallocated.")


# Initialize the official Slack WebClient with your workspace bot token and optimized timeout limits
slack_client = WebClient(token=SLACK_BOT_TOKEN, timeout=90)

# Initialize the FastAPI core application mapping your safe lifecycle container logic
app = FastAPI(lifespan=lifespan)


# ==============================================================================
# 🪝 WEB ROUTING / FASTAPI API WEBHOOK ENDPOINTS
# ==============================================================================

async def send_slack_callback(response_url: str, selected_mood: str):
    payload = {
        "replace_original": True,
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
    payload = await request.json()
    if "challenge" in payload:
        return {"challenge": payload["challenge"]}
    return {"status": "ok"}


@app.post("/slack/interactive")
async def slack_interactive(request: Request, background_tasks: BackgroundTasks):
    form_data = await request.form()
    payload_str = form_data.get("payload")
    
    if not payload_str:
        return Response(status_code=400)
    
    data = json.loads(payload_str)
    slack_userid = data.get("user", {}).get("id")
    actions = data.get("actions", [])
    response_url = data.get("response_url")
    
    if actions and slack_userid and response_url:
        selected_mood = actions[0].get("value")
        dept = get_user_department(slack_userid) or "Cross-Functional"
        
        save_mood_log(slack_userid, selected_mood, dept)
        print(f"📊 DATA SAVED: User {slack_userid} logged mood '{selected_mood}' for team '{dept}'")
        
        background_tasks.add_task(send_slack_callback, response_url, selected_mood)
        
    return Response(status_code=200)

@app.post("/slack/dashboard")
async def slack_dashboard(request: Request):
    form_data = await request.form()
    requesting_channel_id = form_data.get("channel_id")
    
    if requesting_channel_id not in ALLOWED_CHANNEL_IDS:
        print(f"🔒 SECURITY: Dashboard command triggered from unauthorized channel: {requesting_channel_id}")
        return JSONResponse(content={
            "response_type": "ephemeral",
            "text": "❌ *Access Denied:* The dashboard can only be accessed from the designated management channel."
        })
        
    metrics = get_department_dashboard_metrics()
    logs = get_todays_detailed_moods()
    today_str = datetime.date.today().strftime("%Y-%m-%d")
    
    dashboard_text = "📊 *Live Department Mood Analytics*\n"
    dashboard_text += "📁 *All Departments*\n"
    
    if not metrics:
        dashboard_text += "└── No historical data recorded yet today.\n"
    else:
        for dept, mood_list in metrics.items():
            mood_strings = []
            for mood, pct in mood_list:
                emoji_text = MOOD_EMOJIS.get(mood.lower(), mood.capitalize())
                mood_strings.append(f"{emoji_text}: {pct}%")
            dashboard_text += f"└── 🏢 *{dept}* ➔  " + "  |  ".join(mood_strings) + "\n"
            
    dashboard_text += "\n" + "="*60 + "\n\n"
    
    positive_lines = []
    neutral_lines = []
    negative_lines = []
    
    for log in logs:
        mood = log["mood_selected"].lower()
        name = log["employee_name"]
        
        raw_timestamp = log["login_timestamp"]
        if isinstance(raw_timestamp, datetime.datetime):
            time_str = raw_timestamp.strftime("%I:%M %p")
        else:
            time_str = str(raw_timestamp)
            
        sent_time = log.get("last_dm_sent_at")
        sent_str = ""
        if isinstance(sent_time, datetime.datetime):
            sent_str = f" _(DM sent at {sent_time.strftime('%I:%M %p')})_"
        
        emoji_text = MOOD_EMOJIS.get(mood, mood.capitalize())
        line = f"• {emoji_text} — *{name}* at {time_str}{sent_str}"
        
        category = MOOD_CATEGORIES.get(mood, "neutral")
        if category == "positive":
            positive_lines.append(line)
        elif category == "neutral":
            neutral_lines.append(line)
        else:
            negative_lines.append(line)
            
    total_logs = len(logs)
    dashboard_text += f"📊 *Individual Team Mood Feed — {today_str}*\n"
    dashboard_text += f"*{total_logs}* check-ins today  •  🟢 Positive: {len(positive_lines)}  •  🟡 Neutral: {len(neutral_lines)}  •  🔴 Negative: {len(negative_lines)}\n"
    dashboard_text += "‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾\n"
    
    if not logs:
        dashboard_text += "\n📋 No active user check-ins logged in the database yet today.\n"
    else:
        if negative_lines:
            dashboard_text += "\n🔴 *Struggling / Needs Support*\n" + "\n".join(negative_lines) + "\n"
        if neutral_lines:
            dashboard_text += "\n🟡 *In the middle*\n" + "\n".join(neutral_lines) + "\n"
        if positive_lines:
            dashboard_text += "\n🟢 *Doing well*\n" + "\n".join(positive_lines) + "\n"
            
    return JSONResponse(content={
        "response_type": "ephemeral",
        "text": dashboard_text
    })

@app.post("/slack/my-history")
async def slack_user_history(request: Request):
    form_data = await request.form()
    slack_userid = form_data.get("user_id")
    
    if not slack_userid:
        return Response(status_code=400)
        
    logs = get_user_30_day_history(slack_userid)
    
    if not logs:
        return JSONResponse(content={
            "response_type": "ephemeral",
            "text": "📋 *Your Mood History (Last 30 Days)*\nNo logs found in the last 30 days! Use your pulse checks to build your history profile."
        })
        
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
        "response_type": "ephemeral",
        "text": history_text
    })

@app.post("/slack/mood-employee")
async def slack_mood_employee(request: Request):
    form_data = await request.form()
    requesting_channel_id = form_data.get("channel_id")
    command_text = form_data.get("text", "").strip()
    
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

    target_userid = None
    days_window = 7  

    parts = command_text.split()
    last_word = parts[-1]
    if last_word.isdigit():
        potential_days = int(last_word)
        if potential_days in [7, 15, 30]:
            days_window = potential_days
            command_text = " ".join(parts[:-1]).strip()

    mention_match = re.search(r"<@([A-Z0-9]+)(?:\|[^>]+)?>", command_text)
    
    if mention_match:
        target_userid = mention_match.group(1)
    else:
        clean_name_query = command_text.replace("@", "").strip().lower()
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

    if not target_userid:
        return JSONResponse(content={
            "response_type": "ephemeral",
            "text": f"🔍 *Employee Not Found:* Could not locate a database record matching *'{command_text}'*. Make sure they have been synchronized by `sync_keka.py` first."
        })
        
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
    form_data = await request.form()
    requesting_channel_id = form_data.get("channel_id")
    command_text = form_data.get("text", "").strip()
    
    if requesting_channel_id not in ALLOWED_CHANNEL_IDS:
        print(f"🔒 SECURITY: Department history query triggered from unauthorized channel: {requesting_channel_id}")
        return JSONResponse(content={
            "response_type": "ephemeral",
            "text": "❌ *Access Denied:* Department analytical lookups are restricted to the primary admin management platform channel room."
        })
        
    parts = command_text.split()
    if not parts:
        return JSONResponse(content={
            "response_type": "ephemeral",
            "text": "💡 *Usage Instructions:* Please query using the following command structure format:\n`/mood-department [Department Name] [7, 15, or 30]`\n_Example: /mood-department Data Analytics 30_"
        })
        
    last_word = parts[-1]
    if last_word.isdigit() and int(last_word) in [7, 15, 30]:
        days_window = int(last_word)
        target_dept = " ".join(parts[:-1]).strip()
    else:
        days_window = 7  
        target_dept = " ".join(parts).strip()
        
    if not target_dept:
        return JSONResponse(content={
            "response_type": "ephemeral",
            "text": "⚠️ *Input Missing:* Please state the exact department name string target you want to audit."
        })
        
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


@app.post("/slack/mood-history-range")
async def slack_mood_history_range(request: Request):
    form_data = await request.form()
    requesting_channel_id = form_data.get("channel_id")
    command_text = form_data.get("text", "").strip()
    
    if requesting_channel_id not in ALLOWED_CHANNEL_IDS:
        print(f"🔒 SECURITY: Range query triggered from unauthorized channel: {requesting_channel_id}")
        return JSONResponse(content={
            "response_type": "ephemeral",
            "text": "❌ *Access Denied:* Historical range analytics lookups can only be run inside designated admin management rooms."
        })
        
    if not command_text:
        return JSONResponse(content={
            "response_type": "ephemeral",
            "text": "💡 *Usage Instructions:* Please query using the following command structure:\n`/mood-history-range [@EmployeeName] [Start Date YYYY-MM-DD] [End Date YYYY-MM-DD]`\n_Example: /mood-history-range @Kushagra 2026-07-01 2026-07-08_"
        })

    parts = command_text.split()
    date_pattern = r"^\d{4}-\d{2}-\d{2}$"

    if len(parts) < 3 or not re.match(date_pattern, parts[-2]) or not re.match(date_pattern, parts[-1]):
        return JSONResponse(content={
            "response_type": "ephemeral",
            "text": "⚠️ *Invalid Format:* Please provide both a start date and an end date in `YYYY-MM-DD` format.\n_Example: /mood-history-range @Kushagra 2026-07-01 2026-07-08_"
        })

    start_date = parts[-2]
    end_date = parts[-1]
    name_query_string = " ".join(parts[:-2]).strip()

    target_userid = None

    mention_match = re.search(r"<@([A-Z0-9]+)(?:\|[^>]+)?>", name_query_string)
    
    if mention_match:
        target_userid = mention_match.group(1)
    else:
        from database import get_db_connection
        connection = get_db_connection()
        clean_name = name_query_string.replace("@", "").strip().lower()
        with connection.cursor() as cursor:
            sql = """
                SELECT slack_user_id FROM users 
                WHERE LOWER(employee_name) LIKE %s 
                   OR slack_user_id = %s 
                   OR email LIKE %s 
                LIMIT 1
            """
            cursor.execute(sql, (f"%{clean_name}%", clean_name.upper(), f"{clean_name}@%"))
            row = cursor.fetchone()
            if row:
                target_userid = row[0]
        connection.close()

    if not target_userid:
        return JSONResponse(content={
            "response_type": "ephemeral",
            "text": f"🔍 *Employee Not Found:* Could not locate a database profile matching *'{name_query_string}'*."
        })

    data = get_employee_range_mood(target_userid, start_date, end_date)
    
    response_text = f"📊 *Employee Pulse Analytics Range View*\n"
    response_text += f"Target Profile: <@{target_userid}>\n"
    response_text += f"📅 Selected Bracket: `{start_date}` to `{end_date}`\n"
    response_text += "‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾\n"
    
    if not data:
        response_text += "└── 📋 No check-in records logged for this employee profile inside the selected window."
    else:
        for row in data:
            mood_str = row["mood_selected"].lower()
            emoji_text = MOOD_EMOJIS.get(mood_str, mood_str.capitalize())
            response_text += f"• *{emoji_text}* ➔ {row['percentage']}% ({row['count']} entries)\n"
            
    return JSONResponse(content={"response_type": "ephemeral", "text": response_text})