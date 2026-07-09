-- Mood Meter Bot schema (applied automatically on container start; idempotent)
--
-- Extends the original moodmeter.sql export with three columns the code in
-- database.py/sync_keka.py depends on but the export predates:
--   users.is_active, users.last_dm_sent_at, users.last_dm_msg_ts

CREATE TABLE IF NOT EXISTS users (
    slack_user_id VARCHAR(50) PRIMARY KEY,
    email VARCHAR(100) UNIQUE NOT NULL,
    employee_name VARCHAR(100) NOT NULL,
    keka_department VARCHAR(100) NOT NULL,
    is_active TINYINT(1) NOT NULL DEFAULT 1,
    last_dm_sent_at DATETIME NULL DEFAULT NULL,
    last_dm_msg_ts VARCHAR(50) NULL DEFAULT NULL,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS mood_logs (
    log_id INT AUTO_INCREMENT PRIMARY KEY,
    slack_user_id VARCHAR(50),
    login_timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    mood_selected VARCHAR(30) NOT NULL,
    department_at_time VARCHAR(100) NOT NULL,
    FOREIGN KEY (slack_user_id) REFERENCES users(slack_user_id)
);

-- Upgrade path for databases created from the original moodmeter.sql
ALTER TABLE users ADD COLUMN IF NOT EXISTS is_active TINYINT(1) NOT NULL DEFAULT 1;
ALTER TABLE users ADD COLUMN IF NOT EXISTS last_dm_sent_at DATETIME NULL DEFAULT NULL;
ALTER TABLE users ADD COLUMN IF NOT EXISTS last_dm_msg_ts VARCHAR(50) NULL DEFAULT NULL;
