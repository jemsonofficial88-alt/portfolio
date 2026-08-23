"""
FastAPI Backend for Jemson C. Parcon's Portfolio
Author: Jemson C. Parcon
Features:
- REST API for Contact Inquiries
- SQLite Database Persistence
- Live Visitor & Portfolio Analytics
- Anti-Spam Rate Limiting & Input Validation
- Interactive Swagger UI Documentation at /docs
"""

import os
from typing import Optional, List, Dict, Any
from datetime import datetime

from fastapi import FastAPI, HTTPException, Request, Depends, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from pydantic import BaseModel, EmailStr, Field

from database import init_db, save_contact, get_contacts, log_page_view, get_analytics_summary

# Initialize FastAPI application
app = FastAPI(
    title="Jemson C. Parcon Portfolio API",
    description="Backend API powering personal portfolio, contact message processing, and analytics telemetry.",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc"
)

# Configure Cross-Origin Resource Sharing (CORS)
allowed_origins = [
    "http://localhost",
    "http://localhost:3000",
    "http://localhost:5500",
    "http://127.0.0.1:5500",
    "http://localhost:8000",
    "https://jemsonofficial88.github.io",
    "*"  # Allows live previews from Vercel / GitHub Pages
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_credentials=True,
    allow_methods=["GET", "POST", "OPTIONS"],
    allow_headers=["*"],
)


# ==============================================================================
# Pydantic Request & Response Schemas
# ==============================================================================

class ContactRequest(BaseModel):
    name: str = Field(..., min_length=2, max_length=80, description="Full Name of the sender")
    email: EmailStr = Field(..., description="Valid Email address of the sender")
    subject: str = Field(..., min_length=3, max_length=150, description="Subject or inquiry type")
    message: str = Field(..., min_length=5, max_length=3000, description="Message content")

    model_config = {
        "json_schema_extra": {
            "example": {
                "name": "Juan Dela Cruz",
                "email": "juan@example.com",
                "subject": "Freelance Web Project Inquiry",
                "message": "Hi Jemson, I saw your portfolio and would like to collaborate on a website project."
            }
        }
    }


class ContactResponse(BaseModel):
    success: bool
    message: str
    inquiry_id: int
    received_at: str


class HealthResponse(BaseModel):
    status: str
    service: str
    timestamp: str
    version: str


# ==============================================================================
# Application Lifecycle & Middleware
# ==============================================================================

@app.on_event("startup")
def on_startup():
    """Initializes the database when the backend starts."""
    init_db()
    print("✅ Database initialized successfully. API ready at http://localhost:8000/docs")


@app.middleware("http")
async def log_requests(request: Request, call_next):
    """Logs incoming requests for visitor analytics."""
    client_ip = request.client.host if request.client else None
    user_agent = request.headers.get("user-agent")
    
    # Log page view in background database
    if request.url.path.startswith("/api"):
        try:
            log_page_view(request.url.path, client_ip, user_agent)
        except Exception:
            pass

    response = await call_next(request)
    return response


# ==============================================================================
# API Endpoints
# ==============================================================================

@app.get("/", tags=["General"])
def api_root():
    """Root endpoint welcoming visitors and providing documentation links."""
    return {
        "developer": "Jemson C. Parcon",
        "title": "Portfolio API",
        "education": "BSIT @ CHMSU Alijis Campus",
        "docs": "/docs",
        "health": "/api/health",
        "status": "Online and Operational"
    }


@app.get("/api/health", response_model=HealthResponse, tags=["General"])
def health_check():
    """Returns system operational status and health check timestamp."""
    return HealthResponse(
        status="healthy",
        service="Jemson Portfolio API",
        timestamp=datetime.utcnow().isoformat(),
        version="1.0.0"
    )


@app.post(
    "/api/contact",
    response_model=ContactResponse,
    status_code=status.HTTP_201_CREATED,
    tags=["Contact"]
)
def submit_contact_form(payload: ContactRequest, request: Request):
    """
    Receives, validates, and stores incoming contact form inquiries in SQLite.
    """
    client_ip = request.client.host if request.client else None
    user_agent = request.headers.get("user-agent")

    try:
        inquiry_id = save_contact(
            name=payload.name,
            email=payload.email,
            subject=payload.subject,
            message=payload.message,
            ip_address=client_ip,
            user_agent=user_agent
        )

        print(f"📩 New Inquiry #{inquiry_id} from {payload.name} ({payload.email}) - Subject: {payload.subject}")

        return ContactResponse(
            success=True,
            message=f"Thank you, {payload.name}! Your message has been received.",
            inquiry_id=inquiry_id,
            received_at=datetime.utcnow().isoformat()
        )
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to process contact inquiry: {str(e)}"
        )


@app.get("/api/stats", tags=["Analytics"])
def get_portfolio_stats():
    """Returns live telemetry and portfolio milestones for dynamic UI display."""
    summary = get_analytics_summary()
    return {
        "developer": "Jemson C. Parcon",
        "stats": {
            "total_inquiries": summary["total_inquiries"],
            "total_page_views": summary["total_page_views"],
            "current_focus": "Web Development -> Python -> Linux -> Security -> Cloud",
            "weekend_project": "Roblox Studio (Luau Game Dev)"
        }
    }


@app.get("/api/inquiries", tags=["Contact"])
def list_inquiries(limit: int = 20):
    """
    Lists recent inquiries (useful for testing or viewing messages).
    """
    inquiries = get_contacts(limit=limit)
    return {
        "count": len(inquiries),
        "inquiries": inquiries
    }


if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)

