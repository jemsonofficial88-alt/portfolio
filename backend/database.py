"""
Database Module for Jemson C. Parcon's Portfolio Backend
Uses SQLite for persistent storage of contact messages and visitor analytics.
"""

import sqlite3
import os
from datetime import datetime
from typing import List, Dict, Any, Optional

DB_PATH = os.environ.get("DB_PATH", os.path.join(os.path.dirname(__file__), "portfolio.db"))


def get_db_connection() -> sqlite3.Connection:
    """Creates a thread-safe connection to the SQLite database."""
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn


def init_db() -> None:
    """Initializes database tables if they do not exist."""
    with get_db_connection() as conn:
        cursor = conn.cursor()
        
        # Table: Contact Inquiries
        cursor.execute("""
            CREATE TABLE IF NOT EXISTS contacts (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL,
                email TEXT NOT NULL,
                subject TEXT NOT NULL,
                message TEXT NOT NULL,
                ip_address TEXT,
                user_agent TEXT,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        """)

        # Table: Visitor Page Views
        cursor.execute("""
            CREATE TABLE IF NOT EXISTS page_views (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                endpoint TEXT NOT NULL,
                ip_address TEXT,
                user_agent TEXT,
                visited_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        """)
        
        conn.commit()


def save_contact(
    name: str,
    email: str,
    subject: str,
    message: str,
    ip_address: Optional[str] = None,
    user_agent: Optional[str] = None
) -> int:
    """Saves a new contact inquiry to the database and returns the row ID."""
    with get_db_connection() as conn:
        cursor = conn.cursor()
        cursor.execute("""
            INSERT INTO contacts (name, email, subject, message, ip_address, user_agent, created_at)
            VALUES (?, ?, ?, ?, ?, ?, ?)
        """, (name, email, subject, message, ip_address, user_agent, datetime.utcnow().isoformat()))
        conn.commit()
        return cursor.lastrowid


def get_contacts(limit: int = 50) -> List[Dict[str, Any]]:
    """Retrieves recent contact inquiries."""
    with get_db_connection() as conn:
        cursor = conn.cursor()
        cursor.execute("""
            SELECT id, name, email, subject, message, created_at
            FROM contacts
            ORDER BY id DESC
            LIMIT ?
        """, (limit,))
        rows = cursor.fetchall()
        return [dict(row) for row in rows]


def log_page_view(endpoint: str, ip_address: Optional[str] = None, user_agent: Optional[str] = None) -> None:
    """Logs an API request or page view event."""
    with get_db_connection() as conn:
        cursor = conn.cursor()
        cursor.execute("""
            INSERT INTO page_views (endpoint, ip_address, user_agent, visited_at)
            VALUES (?, ?, ?, ?)
        """, (endpoint, ip_address, user_agent, datetime.utcnow().isoformat()))
        conn.commit()


def get_analytics_summary() -> Dict[str, Any]:
    """Calculates summary analytics."""
    with get_db_connection() as conn:
        cursor = conn.cursor()
        cursor.execute("SELECT COUNT(*) FROM contacts")
        total_inquiries = cursor.fetchone()[0]

        cursor.execute("SELECT COUNT(*) FROM page_views")
        total_page_views = cursor.fetchone()[0]

        return {
            "total_inquiries": total_inquiries,
            "total_page_views": total_page_views,
            "status": "online"
        }

