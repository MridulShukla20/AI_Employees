import pymysql
import datetime
from config import DB_CONFIG


def get_db_connection():
    """Establishes and returns a connection to MySQL database."""
    return pymysql.connect(**DB_CONFIG)


def upsert_user(slack_id, email, name, department):
    """Inserts a user, or updates their details if they already exist."""
    connection = get_db_connection()
    with connection.cursor() as cursor:
        sql = """
        INSERT INTO users (slack_user_id, email, employee_name, keka_department)
        VALUES (%s, %s, %s, %s)
        ON DUPLICATE KEY UPDATE 
            employee_name = VALUES(employee_name),
            keka_department = VALUES(keka_department);
        """
        cursor.execute(sql, (slack_id, email, name, department))
    connection.commit()
    connection.close()


def get_last_mood_timestamp(slack_userid):
    """Fetches the exact timestamp of the user's last recorded mood response."""
    connection = get_db_connection()
    with connection.cursor() as cursor:
        sql = "SELECT login_timestamp FROM mood_logs WHERE slack_user_id = %s ORDER BY login_timestamp DESC LIMIT 1"
        cursor.execute(sql, (slack_userid,))
        result = cursor.fetchone()
    connection.close()
    return result[0] if result else None


def get_user_department(slack_userid):
    """Fetches the synced Keka department for a specific user."""
    connection = get_db_connection()
    with connection.cursor() as cursor:
        sql = "SELECT keka_department FROM users WHERE slack_user_id = %s"
        cursor.execute(sql, (slack_userid,))
        result = cursor.fetchone()
    connection.close()
    return result[0] if result else "General Operations"


def save_mood_log(slack_userid, mood, department):
    """Saves a user's chosen mood along with their current department context."""
    connection = get_db_connection()
    with connection.cursor() as cursor:
        sql = "INSERT INTO mood_logs (slack_user_id, mood_selected, department_at_time) VALUES (%s, %s, %s)"
        cursor.execute(sql, (slack_userid, mood, department))
    connection.commit()
    connection.close()


def get_department_dashboard_metrics():
    """Calculates the percentage breakdown of moods for each department based ONLY on today's logs."""
    connection = get_db_connection()
    
    with connection.cursor(pymysql.cursors.DictCursor) as cursor:
        sql = """
        SELECT 
            department_at_time AS department,
            mood_selected,
            COUNT(*) * 100.0 / SUM(COUNT(*)) OVER(PARTITION BY department_at_time) AS percentage
        FROM mood_logs
        WHERE DATE(login_timestamp) = CURDATE()  -- FILTER TO SHOW TODAY'S METRICS ONLY
        GROUP BY department_at_time, mood_selected
        ORDER BY department_at_time;
        """
        cursor.execute(sql)
        rows = cursor.fetchall()
        
    connection.close()
    
    # Restructure dataset array into dashboard dict
    metrics = {}
    for row in rows:
        dept = row['department']
        if dept not in metrics:
            metrics[dept] = []
        metrics[dept].append((row['mood_selected'], round(row['percentage'])))
        
    return metrics


def get_todays_detailed_moods():
    """Fetches ONLY the latest mood log recorded today for each unique user, including DM sent times."""
    connection = get_db_connection()
    
    with connection.cursor(pymysql.cursors.DictCursor) as cursor:
        sql = """
        SELECT log_id, slack_user_id, employee_name, mood_selected, department_at_time, login_timestamp, last_dm_sent_at
        FROM (
            SELECT 
                m.log_id,
                m.slack_user_id,
                u.employee_name,
                m.mood_selected,
                m.department_at_time,
                m.login_timestamp,
                u.last_dm_sent_at,  -- Pulling the DM sent time from the users table
                ROW_NUMBER() OVER (PARTITION BY m.slack_user_id ORDER BY m.login_timestamp DESC) AS rn
            FROM mood_logs m
            INNER JOIN users u ON m.slack_user_id = u.slack_user_id
            WHERE DATE(m.login_timestamp) = CURDATE()
        ) t
        WHERE t.rn = 1
        ORDER BY t.login_timestamp DESC;
        """
        cursor.execute(sql)
        rows = cursor.fetchall()
        
    connection.close()
    return rows


def get_user_30_day_history(slack_userid):
    """Fetches a user's logged moods from the last 30 days."""
    connection = get_db_connection()
    with connection.cursor(pymysql.cursors.DictCursor) as cursor:
        sql = """
        SELECT 
            mood_selected,
            department_at_time,
            DATE_FORMAT(login_timestamp, '%%M %%d, %%Y') AS log_date,
            TIME_FORMAT(login_timestamp, '%%h:%%i %%p') AS log_time
        FROM mood_logs
        WHERE slack_user_id = %s 
          AND login_timestamp >= NOW() - INTERVAL 30 DAY
        ORDER BY login_timestamp DESC;
        """
        cursor.execute(sql, (slack_userid,))
        rows = cursor.fetchall()
    connection.close()
    return rows


def get_all_active_users():
    """Fetches all registered user IDs from the database to loop through for automated polling."""
    connection = get_db_connection()
    with connection.cursor() as cursor:
        sql = "SELECT slack_user_id FROM users"
        cursor.execute(sql)
        results = cursor.fetchall()
    connection.close()
    return [row[0] for row in results] if results else []


def update_user_dm_tracking(slack_userid, msg_ts):
    """Updates the database tracking when a DM was sent and its Slack timestamp ID."""
    connection = get_db_connection()
    with connection.cursor() as cursor:
        sql = """
        UPDATE users 
        SET last_dm_sent_at = NOW(), last_dm_msg_ts = %s 
        WHERE slack_user_id = %s
        """
        cursor.execute(sql, (msg_ts, slack_userid))
    connection.commit()
    connection.close()


def get_all_users_with_dm_tracking():
    """
    Fetches all active users along with their last sent DM tracking metadata details.
    🔒 PRODUCTION FILTER: Only retrieves profiles where is_active = 1.
    """
    connection = get_db_connection()
    with connection.cursor(pymysql.cursors.DictCursor) as cursor:
        sql = """
            SELECT slack_user_id, keka_department, last_dm_sent_at, last_dm_msg_ts 
            FROM users 
            WHERE is_active = 1
        """
        cursor.execute(sql)
        rows = cursor.fetchall()
    connection.close()
    return rows


def get_employee_historical_mood(slack_userid: str, days: int):
    """Fetches the aggregated distribution of moods for a specific employee over X days."""
    connection = get_db_connection()
    with connection.cursor(pymysql.cursors.DictCursor) as cursor:
        sql = """
        SELECT mood_selected, COUNT(*) as count,
               ROUND(COUNT(*) * 100.0 / SUM(COUNT(*)) OVER(), 1) as percentage
        FROM mood_logs
        WHERE slack_user_id = %s AND login_timestamp >= NOW() - INTERVAL %s DAY
        GROUP BY mood_selected
        ORDER BY count DESC
        """
        cursor.execute(sql, (slack_userid, days))
        rows = cursor.fetchall()
    connection.close()
    return rows


def get_department_historical_mood(department_name: str, days: int):
    """Fetches the aggregated distribution of moods for an entire department over X days."""
    connection = get_db_connection()
    with connection.cursor(pymysql.cursors.DictCursor) as cursor:
        sql = """
        SELECT mood_selected, COUNT(*) as count,
               ROUND(COUNT(*) * 100.0 / SUM(COUNT(*)) OVER(), 1) as percentage
        FROM mood_logs
        WHERE LOWER(TRIM(department_at_time)) = LOWER(TRIM(%s)) 
          AND login_timestamp >= NOW() - INTERVAL %s DAY
        GROUP BY mood_selected
        ORDER BY count DESC
        """
        cursor.execute(sql, (department_name, days))
        rows = cursor.fetchall()
    connection.close()
    return rows


def get_employee_range_mood(slack_userid, start_date, end_date):
    """Fetches analytical historical mood distributions for a specific date range."""
    connection = get_db_connection()
    with connection.cursor(pymysql.cursors.DictCursor) as cursor:
        sql = """
            SELECT 
                mood_selected, 
                COUNT(*) as count, 
                ROUND(COUNT(*) * 100.0 / (
                    SELECT COUNT(*) 
                    FROM mood_logs 
                    WHERE slack_user_id = %s AND DATE(login_timestamp) BETWEEN %s AND %s
                ), 1) as percentage
            FROM mood_logs 
            WHERE slack_user_id = %s AND DATE(login_timestamp) BETWEEN %s AND %s
            GROUP BY mood_selected
            ORDER BY count DESC;
        """
        cursor.execute(sql, (slack_userid, start_date, end_date, slack_userid, start_date, end_date))
        rows = cursor.fetchall()
    connection.close()
    return rows


def get_continuous_negative_neutral_streaks_with_ids():
    """
    Scans mood logs from the past 3 days and pulls both names and Slack IDs 
    for employees stuck in continuous neutral/negative cycles.
    """
    connection = get_db_connection()
    with connection.cursor(pymysql.cursors.DictCursor) as cursor:
        # 🔗 FIX: Joined 'users' table (u) with 'mood_logs' (m) to access u.employee_name safely
        sql = """
            SELECT m.slack_user_id, u.employee_name
            FROM mood_logs m
            INNER JOIN users u ON m.slack_user_id = u.slack_user_id
            WHERE m.login_timestamp >= NOW() - INTERVAL 3 DAY
            GROUP BY m.slack_user_id, u.employee_name
            HAVING COUNT(CASE WHEN m.mood_selected IN ('happy', 'excited', 'motivated') THEN 1 END) = 0
               AND COUNT(*) >= 2;
        """
        cursor.execute(sql)
        rows = cursor.fetchall()
    connection.close()
    return rows