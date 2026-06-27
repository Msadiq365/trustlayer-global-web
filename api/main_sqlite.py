from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr
from typing import Optional
import sqlite3
import os
from dotenv import load_dotenv
from datetime import datetime

load_dotenv()

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
        
        return {"status": "success", "message": "Subscribed successfully"}
    except Exception as e:
        print(f"Error: {e}")
        raise HTTPException(status_code=500, detail="Failed to subscribe")

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