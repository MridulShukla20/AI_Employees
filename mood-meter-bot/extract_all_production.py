import os
import json
import requests
from dotenv import load_dotenv

# Load workspace configurations from your active .env file
load_dotenv()

# 🔑 VERIFIED COMPANY DEPARTMENTS WHITELIST
# Arranged with longer compound names first to ensure accurate substring processing boundaries
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
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)"
    }
    try:
        response = requests.post(url, data=payload, headers=headers)
        return response.json().get("access_token")
    except Exception as e:
        print(f"❌ Auth Retrieval Error: {e}")
        return None

def fetch_and_print_all_sorted_employees():
    """
    Loops through all active production employee allocations, extracts candidate department fields,
    cross-references them against the official company department whitelist, sorts them alphabetically, 
    and displays the results in the terminal.
    """
    token = get_keka_access_token()
    if not token:
        print("❌ Keka Authentication failed.")
        return

    current_page = 1
    page_size = 100
    base_keka_url = os.getenv("KEKA_SUBDOMAIN", "https://lambdatest.keka.com/api/v1/hris/employees")
    
    compiled_directory = []
    seen_keka_ids = set()

    print("🚀 Downloading all directory pages from Keka API for parsing...")

    while True:
        keka_url = f"{base_keka_url}?employmentStatus=Working&pageNumber={current_page}&pageSize={page_size}"
        headers = {"Authorization": f"Bearer {token}", "Accept": "application/json"}
        
        try:
            response_raw = requests.get(keka_url, headers=headers).json()
            batch_data = response_raw.get("data", [])
            
            if not batch_data:
                break
                
            # Loop detection crash-stop guardrail
            first_item_id = batch_data[0].get("employeeId") or batch_data[0].get("id")
            if first_item_id in seen_keka_ids:
                break
            seen_keka_ids.add(first_item_id)
                
            for emp in batch_data:
                # Assemble Name & Email
                first_name = emp.get("firstName", "") or ""
                last_name = emp.get("lastName", "") or ""
                full_name = f"{first_name} {last_name}".strip() or "Unknown Employee"
                email = emp.get("email", "").strip() or "N/A"
                
                # 📦 Gather all possible department text strings from this user payload
                candidates = []
                
                # Location A: Custom Fields array data blocks (e.g., "Department1" string)
                if "customFields" in emp and isinstance(emp["customFields"], list):
                    for field in emp["customFields"]:
                        if field.get("value"):
                            candidates.append(str(field.get("value")).strip())
                
                # Location B: Modern Groups array mappings (e.g., groupType 2 title string)
                if "groups" in emp and isinstance(emp["groups"], list):
                    for group in emp["groups"]:
                        if group.get("title"):
                            candidates.append(str(group.get("title")).strip())
                
                # Location C: Job Details sub-nodes and root level parameters
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

                # 🔍 CROSS-REFERENCE CANDIDATES AGAINST OFFICIAL WHITELIST
                detected_dept = "Cross-Functional"
                match_found = False
                
                # Step 1: Look for an exact match first to maintain strict alignment
                for candidate in candidates:
                    for official in OFFICIAL_DEPARTMENTS:
                        if candidate.lower() == official.lower():
                            detected_dept = official
                            match_found = True
                            break
                    if match_found:
                        break
                
                # Step 2: Fall back to partial substring matching if an exact match wasn't found
                if not match_found:
                    for candidate in candidates:
                        for official in OFFICIAL_DEPARTMENTS:
                            if official.lower() in candidate.lower():
                                detected_dept = official
                                match_found = True
                                break
                        if match_found:
                            break
                
                # Append the clean record entry to our tracker listing
                compiled_directory.append({
                    "name": full_name,
                    "email": email,
                    "department": detected_dept
                })
                
            current_page += 1
            
        except Exception as e:
            print(f"\n❌ Error downloading data on page {current_page}: {e}")
            break

    # Sort the compiled directory list alphabetically A-Z case-insensitively by employee name
    sorted_directory = sorted(compiled_directory, key=lambda x: x["name"].lower())

    # Output formatted data table layout directly to the terminal
    print("\n" + "="*115)
    print(f"{'ID':<5} | {'FULL EMPLOYEE NAME (A-Z)':<35} | {'EMAIL ADDRESS':<35} | {'VERIFIED DEPARTMENT'}")
    print("="*115)

    global_counter = 0
    for record in sorted_directory:
        global_counter += 1
        print(f"{global_counter:<5} | {record['name']:<35} | {record['email']:<35} | {record['department']}")

    print("="*115)
    print(f"✨ Stream Complete. Alphabetically listed and whitelisted all {global_counter} active profiles.")
    print("="*115 + "\n")

if __name__ == "__main__":
    fetch_and_print_all_sorted_employees()