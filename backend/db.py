import os
import mysql.connector
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

def get_connection():
    """Establishes a database connection using environment variables."""
    try:
        conn = mysql.connector.connect(
            host=os.getenv("DB_HOST"),
            user=os.getenv("DB_USER"),
            password=os.getenv("DB_PASSWORD"),
            database=os.getenv("DB_NAME")
        )
        print("✅ Database connected successfully!")
        return conn
    except mysql.connector.Error as e:
        print(f"❌ Database connection failed: {e}")
        return None

def close_connection(conn):
    """Closes the database connection safely."""
    if conn and conn.is_connected():
        conn.close()
        print("✅ Database connection closed.")
