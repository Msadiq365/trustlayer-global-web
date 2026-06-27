from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr
from typing import Optional
import sqlite3
import os
from dotenv import load_dotenv
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from datetime import datetime

load_dotenv()

app = FastAPI(
    title="Trust Layer API",
    version="1.0.0",
    description="API for Trust Layer Global website"
)

# Configure CORS - This is the important part
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",   # Next.js dev server
        "http://localhost:3001",   # If you use a different port
        "http://127.0.0.1:3000",   # Localhost with IP
        "*",                        # For development only - allows all
    ],
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],  # Include OPTIONS
    allow_headers=[
        "Content-Type",
        "Accept",
        "Authorization",
        "X-Requested-With",
    ],
    expose_headers=["Content-Length", "Content-Type"],
    max_age=3600,  # Cache preflight for 1 hour
)

# Database setup - SQLite
DB_PATH = os.path.join(os.path.dirname(__file__), "trustlayer.db")

def get_db():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn

def init_db():
    conn = get_db()
    cursor = conn.cursor()
    
    # Create contacts table
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS contacts (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            email TEXT NOT NULL,
            company TEXT,
            message TEXT NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    """)
    
    # Create newsletter subscribers table
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS newsletter_subscribers (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            email TEXT UNIQUE NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    """)
    
    conn.commit()
    conn.close()
    print("✅ SQLite database initialized")

# Initialize database on startup
@app.on_event("startup")
async def startup():
    init_db()

# Pydantic Models
class ContactRequest(BaseModel):
    name: str
    email: EmailStr
    company: Optional[str] = None
    message: str

class NewsletterSubscription(BaseModel):
    email: EmailStr

class ContactResponse(BaseModel):
    status: str
    message: str

# Email configuration
SMTP_HOST = os.getenv("SMTP_HOST")
SMTP_PORT = int(os.getenv("SMTP_PORT", 587))
SMTP_USER = os.getenv("SMTP_USER")
SMTP_PASSWORD = os.getenv("SMTP_PASSWORD")
SMTP_FROM = os.getenv("SMTP_FROM")

# API Routes
@app.get("/api/health")
async def health_check():
    return {"status": "healthy", "message": "Trust Layer API is running"}

@app.options("/api/contact")
async def options_contact():
    """Handle OPTIONS preflight request"""
    return {"message": "OK"}

@app.post("/api/contact", response_model=ContactResponse)
async def submit_contact(contact: ContactRequest):
    """Submit a contact form message"""
    try:
        conn = get_db()
        cursor = conn.cursor()
        
        cursor.execute(
            "INSERT INTO contacts (name, email, company, message) VALUES (?, ?, ?, ?)",
            (contact.name, contact.email, contact.company, contact.message)
        )
        conn.commit()
        conn.close()

        # Send email notification
        await send_contact_email(contact)

        return {"status": "success", "message": "Message sent successfully"}
    except Exception as e:
        print(f"Error submitting contact: {e}")
        raise HTTPException(status_code=500, detail="Failed to submit message")

@app.options("/api/newsletter")
async def options_newsletter():
    """Handle OPTIONS preflight request"""
    return {"message": "OK"}

@app.post("/api/newsletter")
async def subscribe_newsletter(subscription: NewsletterSubscription):
    """Subscribe to newsletter"""
    try:
        conn = get_db()
        cursor = conn.cursor()
        
        # Check if already subscribed
        cursor.execute("SELECT id FROM newsletter_subscribers WHERE email = ?", (subscription.email,))
        existing = cursor.fetchone()
        
        if existing:
            conn.close()
            return {"status": "exists", "message": "Email already subscribed"}

        cursor.execute(
            "INSERT INTO newsletter_subscribers (email) VALUES (?)",
            (subscription.email,)
        )
        conn.commit()
        conn.close()

        return {"status": "success", "message": "Subscribed successfully"}
    except Exception as e:
        print(f"Error subscribing: {e}")
        raise HTTPException(status_code=500, detail="Failed to subscribe")

# Helper function for sending emails
async def send_contact_email(contact: ContactRequest):
    """Send email notification for new contact"""
    if not all([SMTP_HOST, SMTP_USER, SMTP_PASSWORD, SMTP_FROM]):
        print("⚠️ SMTP not configured, skipping email")
        return

    try:
        msg = MIMEMultipart("alternative")
        msg["Subject"] = f"New Contact: {contact.name} - Trust Layer"
        msg["From"] = SMTP_FROM
        msg["To"] = SMTP_FROM

        html = f"""
        <html>
        <body style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #0D1226;">New Contact Form Submission</h2>
            <div style="background: #f5f5f5; padding: 20px; border-radius: 10px;">
                <p><strong>Name:</strong> {contact.name}</p>
                <p><strong>Email:</strong> {contact.email}</p>
                <p><strong>Company:</strong> {contact.company or 'N/A'}</p>
                <hr>
                <p><strong>Message:</strong></p>
                <p style="background: white; padding: 15px; border-radius: 5px;">{contact.message}</p>
            </div>
            <p style="color: #666; font-size: 12px; margin-top: 20px;">
                Sent from Trust Layer Global website
            </p>
        </body>
        </html>
        """
        msg.attach(MIMEText(html, "html"))

        with smtplib.SMTP(SMTP_HOST, SMTP_PORT) as server:
            server.starttls()
            server.login(SMTP_USER, SMTP_PASSWORD)
            server.sendmail(SMTP_FROM, SMTP_FROM, msg.as_string())
        print(f"📧 Email sent for contact from {contact.email}")
    except Exception as e:
        print(f"❌ Failed to send email: {e}")

@app.get("/")
async def root():
    return {
        "name": "Trust Layer API",
        "version": "1.0.0",
        "endpoints": {
            "health": "/api/health",
            "contact": "/api/contact",
            "newsletter": "/api/newsletter"
        }
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)