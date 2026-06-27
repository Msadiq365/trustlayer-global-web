from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, EmailStr
from typing import Optional
import asyncpg
import os
from dotenv import load_dotenv
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import re

load_dotenv()

app = FastAPI(
    title="Trust Layer API",
    version="1.0.0",
    description="API for Trust Layer Global website"
)

# Database connection
DATABASE_URL = os.getenv("DATABASE_URL")

# Email configuration
SMTP_HOST = os.getenv("SMTP_HOST")
SMTP_PORT = int(os.getenv("SMTP_PORT", 587))
SMTP_USER = os.getenv("SMTP_USER")
SMTP_PASSWORD = os.getenv("SMTP_PASSWORD")
SMTP_FROM = os.getenv("SMTP_FROM")

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

# Database functions
async def get_db_pool():
    try:
        return await asyncpg.create_pool(DATABASE_URL, min_size=1, max_size=10)
    except Exception as e:
        print(f"Database connection error: {e}")
        return None

# Initialize database tables
@app.on_event("startup")
async def startup():
    pool = await get_db_pool()
    if pool:
        async with pool.acquire() as conn:
            # Create contacts table
            await conn.execute("""
                CREATE TABLE IF NOT EXISTS contacts (
                    id SERIAL PRIMARY KEY,
                    name TEXT NOT NULL,
                    email TEXT NOT NULL,
                    company TEXT,
                    message TEXT NOT NULL,
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                )
            """)
            # Create newsletter subscribers table
            await conn.execute("""
                CREATE TABLE IF NOT EXISTS newsletter_subscribers (
                    id SERIAL PRIMARY KEY,
                    email TEXT UNIQUE NOT NULL,
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                )
            """)
        await pool.close()
        print("✅ Database tables created successfully")

# API Routes
@app.get("/api/health")
async def health_check():
    return {"status": "healthy", "message": "Trust Layer API is running"}

@app.post("/api/contact", response_model=ContactResponse)
async def submit_contact(contact: ContactRequest):
    """Submit a contact form message"""
    try:
        pool = await get_db_pool()
        if not pool:
            raise HTTPException(status_code=503, detail="Database connection failed")
        
        async with pool.acquire() as conn:
            await conn.execute(
                "INSERT INTO contacts (name, email, company, message) VALUES ($1, $2, $3, $4)",
                contact.name, contact.email, contact.company, contact.message
            )
        await pool.close()

        # Send email notification
        await send_contact_email(contact)

        return {"status": "success", "message": "Message sent successfully"}
    except Exception as e:
        print(f"Error submitting contact: {e}")
        raise HTTPException(status_code=500, detail="Failed to submit message")

@app.post("/api/newsletter")
async def subscribe_newsletter(subscription: NewsletterSubscription):
    """Subscribe to newsletter"""
    try:
        pool = await get_db_pool()
        if not pool:
            raise HTTPException(status_code=503, detail="Database connection failed")
        
        async with pool.acquire() as conn:
            # Check if already subscribed
            existing = await conn.fetchrow(
                "SELECT id FROM newsletter_subscribers WHERE email = $1",
                subscription.email
            )
            if existing:
                await pool.close()
                return {"status": "exists", "message": "Email already subscribed"}

            await conn.execute(
                "INSERT INTO newsletter_subscribers (email) VALUES ($1)",
                subscription.email
            )
        await pool.close()

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

# Root endpoint
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