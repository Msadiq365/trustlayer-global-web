from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr
from typing import Optional
import sqlite3
import os
import resend
from dotenv import load_dotenv
from datetime import datetime

load_dotenv()

# Initialize Resend
resend.api_key = os.getenv("RESEND_API_KEY")

app = FastAPI(
    title="Trust Layer API",
    version="1.0.0",
    description="API for Trust Layer Global website"
)

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Database setup
DB_PATH = os.path.join(os.path.dirname(__file__), "trustlayer.db")

def get_db():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn

def init_db():
    conn = get_db()
    cursor = conn.cursor()
    
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

# Initialize on startup
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

# Email Functions
def send_contact_email(contact: ContactRequest):
    """Send email notification for new contact using Resend"""
    try:
        params = {
            "from": "Trust Layer <contact@trustlayers.com.ng>",
            "to": ["msadiqblog@gmail.com"],
            "subject": f"New Contact: {contact.name} - Trust Layer",
            "html": f"""
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
            """,
            "tags": [
                {"name": "email_type", "value": "contact_notification"},
                {"name": "source", "value": "website_contact_form"}
            ]
        }
        
        email = resend.Emails.send(params)
        print(f"📧 Email sent to {email} for contact from {contact.email}")
        return email
    except Exception as e:
        print(f"❌ Failed to send email: {e}")
        return None

def send_welcome_email(email: str):
    """Send welcome email to new subscriber using Resend"""
    try:
        unsubscribe_url = f"https://trustlayers.com.ng/unsubscribe?email={email}"
        
        params = {
            "from": "Trust Layer <contact@trustlayers.com.ng>",
            "to": [email],
            "subject": "Welcome to Trust Layer! 🎉",
            "html": f"""
                <!DOCTYPE html>
                <html>
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>Welcome to Trust Layer</title>
                </head>
                <body style="margin: 0; padding: 0; font-family: 'Segoe UI', Arial, sans-serif; background-color: #f9fafb;">
                    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #f9fafb; padding: 40px 0;">
                        <tr>
                            <td align="center">
                                <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="max-width: 600px; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);">
                                    
                                    <!-- Header -->
                                    <tr>
                                        <td style="background: linear-gradient(135deg, #0D1226 0%, #1a1f3a 100%); padding: 40px 30px; text-align: center;">
                                            <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: 700; letter-spacing: 1px;">
                                                TRUST <span style="color: #60A5FA;">LAYER</span>
                                            </h1>
                                            <p style="color: #93b4e8; margin: 8px 0 0 0; font-size: 16px; opacity: 0.9;">
                                                Building trusted digital solutions
                                            </p>
                                        </td>
                                    </tr>
                                    
                                    <!-- Main Content -->
                                    <tr>
                                        <td style="padding: 40px 30px;">
                                            <h2 style="color: #0D1226; font-size: 24px; margin-top: 0; margin-bottom: 8px;">
                                                Welcome to Trust Layer! 👋
                                            </h2>
                                            <p style="color: #4b5563; font-size: 16px; line-height: 1.6; margin-top: 0;">
                                                Thank you for subscribing to our newsletter. We're excited to have you on board!
                                            </p>
                                            
                                            <div style="background-color: #f3f4f6; padding: 20px; border-radius: 12px; margin: 24px 0; border-left: 4px solid #2563EB;">
                                                <p style="color: #0D1226; font-size: 15px; line-height: 1.6; margin: 0;">
                                                    <strong>What to expect:</strong>
                                                </p>
                                                <ul style="color: #4b5563; font-size: 14px; line-height: 1.8; padding-left: 20px; margin: 8px 0 0 0;">
                                                    <li>📊 Product updates and new features</li>
                                                    <li>🔒 Security and reliability insights</li>
                                                    <li>💡 Industry trends and innovations</li>
                                                    <li>🎉 Company news and announcements</li>
                                                </ul>
                                            </div>
                                            
                                            <!-- Quick Links -->
                                            <div style="margin: 32px 0;">
                                                <p style="color: #0D1226; font-size: 15px; font-weight: 600; margin-bottom: 12px;">
                                                    🌐 Explore our digital ecosystem:
                                                </p>
                                                <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                                                    <tr>
                                                        <td style="padding: 0 4px 8px 0;">
                                                            <a href="https://trustlayers.com.ng/about" style="display: block; background-color: #f3f4f6; padding: 12px 16px; border-radius: 8px; text-decoration: none; color: #0D1226; font-size: 14px; font-weight: 500; text-align: center; transition: background-color 0.2s;">
                                                                📖 About Us
                                                            </a>
                                                        </td>
                                                        <td style="padding: 0 0 8px 4px;">
                                                            <a href="https://trustlayers.com.ng/products" style="display: block; background-color: #f3f4f6; padding: 12px 16px; border-radius: 8px; text-decoration: none; color: #0D1226; font-size: 14px; font-weight: 500; text-align: center; transition: background-color 0.2s;">
                                                                🚀 Products
                                                            </a>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td style="padding: 4px 4px 0 0;">
                                                            <a href="https://trustlayers.com.ng/technology" style="display: block; background-color: #f3f4f6; padding: 12px 16px; border-radius: 8px; text-decoration: none; color: #0D1226; font-size: 14px; font-weight: 500; text-align: center; transition: background-color 0.2s;">
                                                                ⚙️ Technology
                                                            </a>
                                                        </td>
                                                        <td style="padding: 4px 0 0 4px;">
                                                            <a href="https://trustlayers.com.ng/contact" style="display: block; background-color: #f3f4f6; padding: 12px 16px; border-radius: 8px; text-decoration: none; color: #0D1226; font-size: 14px; font-weight: 500; text-align: center; transition: background-color 0.2s;">
                                                                📬 Contact Us
                                                            </a>
                                                        </td>
                                                    </tr>
                                                </table>
                                            </div>
                                            
                                            <!-- Our Solutions -->
                                            <div style="margin: 32px 0; padding: 20px; background: linear-gradient(135deg, #eef2ff 0%, #e0e7ff 100%); border-radius: 12px;">
                                                <p style="color: #0D1226; font-size: 15px; font-weight: 600; margin: 0 0 8px 0;">
                                                    💡 Our Solutions:
                                                </p>
                                                <p style="color: #4b5563; font-size: 14px; line-height: 1.6; margin: 0;">
                                                    <strong>DataFlow</strong> — Digital Utility Platform for VTU services<br>
                                                    <strong>Trust Pay</strong> — Secure Digital Payment Solution
                                                </p>
                                                <p style="margin: 12px 0 0 0;">
                                                    <a href="https://trustlayers.com.ng/products" style="color: #2563EB; text-decoration: none; font-weight: 500; font-size: 14px;">
                                                        Learn more →
                                                    </a>
                                                </p>
                                            </div>
                                            
                                            <!-- Social Links -->
                                            <div style="margin: 32px 0; text-align: center;">
                                                <p style="color: #6b7280; font-size: 13px; margin-bottom: 12px;">
                                                    Connect with us:
                                                </p>
                                                <div style="display: inline-block; margin: 0 8px;">
                                                    <a href="#" style="color: #0D1226; text-decoration: none; font-size: 14px;">LinkedIn</a>
                                                </div>
                                                <div style="display: inline-block; margin: 0 8px;">
                                                    <a href="#" style="color: #0D1226; text-decoration: none; font-size: 14px;">Twitter</a>
                                                </div>
                                                <div style="display: inline-block; margin: 0 8px;">
                                                    <a href="#" style="color: #0D1226; text-decoration: none; font-size: 14px;">GitHub</a>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                    
                                    <!-- Footer with Unsubscribe -->
                                    <tr>
                                        <td style="background-color: #f9fafb; padding: 24px 30px; text-align: center; border-top: 1px solid #e5e7eb;">
                                            <p style="color: #6b7280; font-size: 12px; margin: 0; line-height: 1.6;">
                                                © 2025 Trust Layer Technologies. All rights reserved.
                                            </p>
                                            <p style="color: #6b7280; font-size: 12px; margin: 4px 0 0 0;">
                                                Building trusted digital solutions for a connected world.
                                            </p>
                                            <p style="color: #9ca3af; font-size: 11px; margin-top: 8px;">
                                                You're receiving this because you subscribed to our newsletter.
                                                <br>
                                                <a href="{unsubscribe_url}" style="color: #2563EB; text-decoration: underline;">Unsubscribe</a>
                                            </p>
                                        </td>
                                    </tr>
                                    
                                </table>
                            </td>
                        </tr>
                    </table>
                </body>
                </html>
            """,
            "tags": [
                {"name": "email_type", "value": "welcome"},
                {"name": "source", "value": "newsletter_signup"}
            ]
        }
        
        email = resend.Emails.send(params)
        print(f"📧 Welcome email sent to {email}")
        return email
    except Exception as e:
        print(f"❌ Failed to send welcome email: {e}")
        return None

def unsubscribe_email(email: str):
    """Remove subscriber from newsletter list"""
    try:
        conn = get_db()
        cursor = conn.cursor()
        
        cursor.execute("DELETE FROM newsletter_subscribers WHERE email = ?", (email,))
        affected_rows = cursor.rowcount
        conn.commit()
        conn.close()
        
        if affected_rows > 0:
            print(f"✅ Unsubscribed: {email}")
            return True
        else:
            print(f"❌ Email not found: {email}")
            return False
    except Exception as e:
        print(f"❌ Unsubscribe error: {e}")
        return False

# API Routes
@app.get("/api/health")
async def health_check():
    return {"status": "healthy", "message": "Trust Layer API is running"}

@app.post("/api/contact")
async def submit_contact(contact: ContactRequest):
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
        send_contact_email(contact)
        
        return {"status": "success", "message": "Message sent successfully"}
    except Exception as e:
        print(f"Error: {e}")
        raise HTTPException(status_code=500, detail="Failed to submit message")

@app.post("/api/newsletter")
async def subscribe_newsletter(subscription: NewsletterSubscription):
    try:
        conn = get_db()
        cursor = conn.cursor()
        
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
        
        # Send welcome email
        send_welcome_email(subscription.email)
        
        return {"status": "success", "message": "Subscribed successfully"}
    except Exception as e:
        print(f"Error: {e}")
        raise HTTPException(status_code=500, detail="Failed to subscribe")

@app.post("/api/unsubscribe")
async def unsubscribe(subscription: NewsletterSubscription):
    """Unsubscribe from newsletter"""
    try:
        success = unsubscribe_email(subscription.email)
        
        if success:
            return {"status": "success", "message": "Unsubscribed successfully"}
        else:
            return {"status": "not_found", "message": "Email not found in our list"}
    except Exception as e:
        print(f"Error: {e}")
        raise HTTPException(status_code=500, detail="Failed to unsubscribe")

@app.get("/api/analytics")
async def get_analytics():
    """Get email analytics"""
    try:
        conn = get_db()
        cursor = conn.cursor()
        
        # Count subscribers
        cursor.execute("SELECT COUNT(*) FROM newsletter_subscribers")
        subscribers = cursor.fetchone()[0]
        
        # Count contacts
        cursor.execute("SELECT COUNT(*) FROM contacts")
        contacts = cursor.fetchone()[0]
        
        conn.close()
        
        return {
            "totalSubscribers": subscribers,
            "contacts": contacts,
            "emailsSent": 0  # You can track this from Resend logs
        }
    except Exception as e:
        print(f"Error: {e}")
        return {"error": "Failed to fetch analytics"}

@app.get("/")
async def root():
    return {
        "name": "Trust Layer API",
        "version": "1.0.0",
        "endpoints": {
            "health": "/api/health",
            "contact": "/api/contact",
            "newsletter": "/api/newsletter",
            "unsubscribe": "/api/unsubscribe",
            "analytics": "/api/analytics"
        }
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)