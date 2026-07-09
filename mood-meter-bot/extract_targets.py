import os
import json
import requests
from dotenv import load_dotenv

# Load parameters from your active .env file
load_dotenv()

# The specific targets we need to diagnose completely
TARGETS = ["rinku nair", "hakan kahraman", "harun ozarslan"]

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
        print(f"❌ Authentication Retrieval Error: {e}")
        return None

def fetch_and_diagnose_targets():
    """Loops through production records and prints complete verbatim details for the targeted list."""
    token = get_keka_access_token()
    if not token:
        print("❌ Keka Authentication failed.")
        return

    current_page = 1
    page_size = 100
    base_keka_url = os.getenv("KEKA_SUBDOMAIN", "https://lambdatest.keka.com/api/v1/hris/employees")
    found_count = 0

    print(f"🔍 Scanning production records to dump complete profiles for: {TARGETS}...\n")

    while True:
        keka_url = f"{base_keka_url}?employmentStatus=Working&pageNumber={current_page}&pageSize={page_size}"
        headers = {"Authorization": f"Bearer {token}", "Accept": "application/json"}
        
        try:
            response_raw = requests.get(keka_url, headers=headers).json()
            batch_data = response_raw.get("data", [])
            
            if not batch_data:
                break
                
            for emp in batch_data:
                first_name = emp.get("firstName", "") or ""
                last_name = emp.get("lastName", "") or ""
                full_name = f"{first_name} {last_name}".strip().lower()
                
                # Check if this employee matches any of our target names
                if any(target in full_name for target in TARGETS):
                    found_count += 1
                    print("=" * 90)
                    print(f"👤 COMPLETE VERBATIM RECORD FOR: {f'{first_name} {last_name}'.upper()}")
                    print("=" * 90)
                    
                    # Print every single verbatim column entry from Keka's raw payload
                    for column_name, value in emp.items():
                        if isinstance(value, (dict, list)):
                            # Format complex structures and maintain strict indentation layout
                            formatted_val = json.dumps(value, indent=4).replace("\n", "\n" + " " * 24)
                        else:
                            formatted_val = value
                        print(f"{column_name:<22} : {formatted_val}")
                    print("\n" + "*" * 90 + "\n")
                    
            current_page += 1
            
        except Exception as e:
            print(f"❌ Error during page processing: {e}")
            break

    print("=" * 90)
    print(f"✨ Diagnostic complete. Successfully pulled {found_count} profile maps to terminal.")
    print("=" * 90)

if __name__ == "__main__":
    fetch_and_diagnose_targets()