import datetime
import json
import os
import requests
from dotenv import load_dotenv
from slack_sdk import WebClient
from database import upsert_user, get_db_connection  # Added get_db_connection import

# Load workspace configurations from your active .env file
load_dotenv()

# Production-optimized configuration with an extended timeout guard
slack_client = WebClient(
    token=os.getenv("SLACK_BOT_TOKEN"),
    timeout=90  # ⏳ Forces the client to wait up to 90 seconds before timing out
)

# 🔑 VERIFIED ACTUAL COMPANY DEPARTMENTS WHITELIST
OFFICIAL_DEPARTMENTS = [
    "Sales Engineering",
    "Customer Engineering",
    "Customer Success",
    "Data Center",
    "LT Services",
    "Engineering",
    "Corporate",
    "Executive",
    "Marketing",
    "Product",
    "Sales"
]

def get_keka_access_token():
    """Generates a short-lived bearer authorization access token from Keka identity server."""
    url = "https://login.keka.com/connect/token"
    payload = {
        "grant_type": "kekaapi",
        "scope": "kekaapi",
        "client_id": os.getenv("KEKA_CLIENT_ID"),
        "client_secret": os.getenv("KEKA_CLIENT_SECRET"),
        "api_key": os.getenv("KEKA_API_KEY")
    }
    headers = {
        "Content-Type": "application/x-www-form-urlencoded",
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"
    }
    
    response = requests.post(url, data=payload, headers=headers)
    if response.status_code != 200:
        print(f"❌ Keka Auth Failed! Status Code: {response.status_code}")
        return None
        
    try:
        return response.json().get("access_token")
    except Exception:
        return None

def sync_employees_to_database():
    """
    Production Mode: Dynamically maps active Keka workforce employees to Slack profiles
    using a strict whitelist cross-reference matrix to filter fragmented metadata nodes.
    Cleans up stale database entries for employees who have left the workspace context.
    """
    token = get_keka_access_token()
    if not token:
        print("❌ Keka Authentication Token missing or rejected.")
        return

    # Initialize tracking variables for API pagination loops
    keka_employees = []
    current_page = 1
    page_size = 100
    more_records_available = True
    seen_keka_ids = set()

    # Safely load the clean base endpoint path parameter from your .env environment
    base_keka_url = os.getenv("KEKA_SUBDOMAIN", "https://lambdatest.keka.com/api/v1/hris/employees")

    print("🚀 Fetching live directory batches from production Keka registry...")
    
    while more_records_available:
        # Construct URL using Keka's exact query parameters ('pageNumber' and 'pageSize')
        keka_url = f"{base_keka_url}?employmentStatus=Working&pageNumber={current_page}&pageSize={page_size}"
        headers = {"Authorization": f"Bearer {token}", "Accept": "application/json"}
        
        try:
            response_raw = requests.get(keka_url, headers=headers).json()
            batch_data = response_raw.get("data", [])
            
            if not batch_data:
                more_records_available = False
                break
                
            # Intercept server mirroring loops
            first_item_id = batch_data[0].get("employeeId") or batch_data[0].get("id")
            if first_item_id in seen_keka_ids:
                print(f"🛑 NAVIGATION BOUNDARY: Duplicate records flagged on batch {current_page}. Traversal complete.")
                more_records_available = False
                break
                
            seen_keka_ids.add(first_item_id)
            keka_employees.extend(batch_data)
            print(f"  • Batch {current_page}: Successfully parsed {len(batch_data)} records from live registry stream.")

            # Read standard pagination boundaries
            total_pages_meta = response_raw.get("totalPages") or response_raw.get("meta", {}).get("totalPages")
            if total_pages_meta and current_page >= int(total_pages_meta):
                more_records_available = False
            else:
                current_page += 1
                
            if current_page > 30: 
                break
                
        except Exception as api_err:
            print(f"❌ Failed to fetch or parse Keka employee records on page {current_page}: {api_err}")
            break
        
    print(f"\n📊 TOTAL UNIQUE PRODUCTION EMPLOYEES SECURED: {len(keka_employees)}")

    # Convert Keka list into lookup maps
    keka_email_map = {}
    keka_name_map = {}
    keka_username_map = {}
    
    for emp in keka_employees:
        email = emp.get("email")
        
        # 📦 Gather all potential raw department strings from this payload item
        candidates = []
        
        if "customFields" in emp and isinstance(emp["customFields"], list):
            for field in emp["customFields"]:
                if field.get("value"):
                    candidates.append(str(field.get("value")).strip())
                    
        if "groups" in emp and isinstance(emp["groups"], list):
            for group in emp["groups"]:
                if group.get("title"):
                    candidates.append(str(group.get("title")).strip())
                    
        job_details = emp.get("jobDetails", {}) or {}
        if job_details.get("department"): 
            candidates.append(str(job_details.get("department")).strip())
        if job_details.get("departmentName"): 
            candidates.append(str(job_details.get("departmentName")).strip())
        if emp.get("department"): 
            candidates.append(str(emp.get("department")).strip())
        if emp.get("profession"): 
            candidates.append(str(emp.get("profession")).strip())
        if job_details.get("jobTitle", {}).get("title"): 
            candidates.append(str(job_details["jobTitle"]["title"]).strip())

        # 🔍 CROSS-REFERENCE AGAINST YOUR 11 ACTUAL DEPARTMENTS
        dept_name = "Cross-Functional"
        match_found = False
        
        # Step 1: Look for exact text alignments first
        for candidate in candidates:
            for official in OFFICIAL_DEPARTMENTS:
                if candidate.lower() == official.lower():
                    dept_name = official
                    match_found = True
                    break
            if match_found:
                break
                
        # Step 2: Fall back to partial substring scans if an exact match wasn't hit
        if not match_found:
            for candidate in candidates:
                for official in OFFICIAL_DEPARTMENTS:
                    if official.lower() in candidate.lower():
                        dept_name = official
                        match_found = True
                        break
                if match_found:
                    break

        first_name = emp.get("firstName", "") or ""
        last_name = emp.get("lastName", "") or ""
        full_name = f"{first_name} {last_name}".strip()
        
        emp_metadata = {
            "department": dept_name,
            "real_name": full_name if full_name else "Employee",
            "keka_email": email
        }
        
        if email:
            clean_keka_email = email.lower().strip()
            keka_email_map[clean_keka_email] = emp_metadata
            keka_username_map[clean_keka_email.split("@")[0]] = emp_metadata
            
        if full_name:
            clean_keka_name = full_name.lower().replace(" ", "").strip()
            keka_name_map[clean_keka_name] = emp_metadata

    # --- EVALUATING ACTIVE SLACK PROFILES WITH PAGINATION ---
    print("\n🔍 Fetching user listing from Slack API with pagination routing...")
    slack_members = []
    next_cursor = None

    while True:
        try:
            # Fetch users in clean, lightweight batches of 200 to prevent data truncation
            slack_response = slack_client.users_list(cursor=next_cursor, limit=200)
            if not slack_response.get("ok"):
                print(f"❌ Slack API Error: {slack_response.get('error')}")
                break
                
            batch_members = slack_response.get("members", [])
            slack_members.extend(batch_members)
            
            # Extract tracking token for the next page block
            next_cursor = slack_response.get("response_metadata", {}).get("next_cursor")
            if not next_cursor:
                break # Reached the absolute end of the directory structure
                
        except Exception as slack_err:
            print(f"❌ Failed to retrieve user listing packet from Slack API: {slack_err}")
            return
            
    print(f"💬 Download Complete! Successfully aggregated {len(slack_members)} total profiles from Slack layout context.")
    print("\n--- 💬 DYNAMICALLY EVALUATING LIVE SLACK DIRECTORY MATCHES ---")
    synced_ids = []

    for member in slack_members:
        if member.get("deleted") or member.get("is_bot") or member["id"] == "USLACKBOT":
            continue
            
        slack_id = member["id"]
        slack_email = member.get("profile", {}).get("email", "")
        real_name_attr = member.get("real_name", "") or ""
        profile_real_name = member.get("profile", {}).get("real_name", "") or ""
        
        chosen_slack_name = real_name_attr if real_name_attr else profile_real_name
        
        clean_email = slack_email.lower().strip() if slack_email else ""
        clean_name = chosen_slack_name.lower().replace(" ", "").strip() if chosen_slack_name else ""
        slack_username = clean_email.split("@")[0] if clean_email else ""
        
        target_metadata = None
        match_type = ""

        if clean_email and clean_email in keka_email_map:
            target_metadata = keka_email_map[clean_email]
            match_type = "EMAIL MATCH"
        elif slack_username and slack_username in keka_username_map:
            target_metadata = keka_username_map[slack_username]
            match_type = "USERNAME FALLBACK MATCH"
        elif clean_name and clean_name in keka_name_map:
            target_metadata = keka_name_map[clean_name]
            match_type = "NAME FALLBACK MATCH"

        if target_metadata:
            resolved_name = target_metadata["real_name"]
            department = target_metadata["department"]
            db_email = slack_email if slack_email else target_metadata["keka_email"]

            # Commit the record cleanly to your MySQL database workbook tracking schema
            upsert_user(slack_id, db_email, resolved_name, department)
            synced_ids.append(slack_id)
            print(f"    🤝 SUCCESS MATCH ({match_type}): {resolved_name} ➔ Department: [{department}] ➔ ID: {slack_id}")

    print("\n--------------------------------------------------------------------------------")
    print(f"✅ Successfully synchronized {len(synced_ids)} active employees into MySQL workbook tables.")
    print("--------------------------------------------------------------------------------\n")

    # 🧹 NEW AUTOMATED PURGE STEP FOR TERMINATED EMPLOYEES
    # 🧹 UPDATED CLEANUP: Soft delete ex-employees instead of hard deleting
    if synced_ids:
        print("🧼 CLEANUP: Toggling status for deactivated Keka/Slack roster entries...")
        connection = get_db_connection()
        try:
            with connection.cursor() as cursor:
                format_strings = ','.join(['%s'] * len(synced_ids))
                
                # Sets is_active = 0 for anyone not present in the current Keka roster
                purge_query = f"""
                    UPDATE users 
                    SET is_active = 0 
                    WHERE slack_user_id NOT IN ({format_strings})
                """
                
                cursor.execute(purge_query, tuple(synced_ids))
                deactivated_count = cursor.rowcount
                connection.commit()
                
                if deactivated_count > 0:
                    print(f"🔒 STATUS COMPLETED: Successfully deactivated {deactivated_count} ex-employee profiles.")
                else:
                    print("✨ CLEANUP: Data check finished. Active workspace profiles are completely synced.")
        except Exception as purge_err:
            print(f"⚠️ Warning: Could not execute automated ex-employee cleanup cycle: {purge_err}")
        finally:
            connection.close()
            
if __name__ == "__main__":
    print("Beginning Production Directory Synchronization Script...")
    sync_employees_to_database()