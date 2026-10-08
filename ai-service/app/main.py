"""
CareerForge AI — FastAPI application entry point.

Services grow per phase:
  Phase 1: /health
  Phase 5: /embed, /embed/batch, LLM gateway
  Phase 6: /parse/resume
  Phase 9: /parse/jd, /company/draft
  Phase 10: /match/resume-jd, /gap/analyze
  ...
"""

import time
from datetime import datetime, timezone

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.config import get_settings

settings = get_settings()

# ─── App ─────────────────────────────────────────────────────────────────────
app = FastAPI(
    title="CareerForge AI — Python AI Service",
    description="Resume parsing, embeddings, semantic matching, scoring, and RAG pipelines.",
    version="1.0.0",
    docs_url="/docs",       # Swagger UI
    redoc_url="/redoc",
)

# Record startup time for uptime reporting
_start_time = time.time()

# ─── CORS ────────────────────────────────────────────────────────────────────
app.add_middleware(
    CORSMiddleware,
    allow_origins=[settings.SERVER_URL, "http://localhost:5000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ─── Routers (added per phase) ────────────────────────────────────────────────
# Phase 5: from app.routers import embed, llm
#           app.include_router(embed.router, prefix="/embed", tags=["Embeddings"])
# Phase 6: from app.routers import parse
#           app.include_router(parse.router, prefix="/parse", tags=["Parsing"])


# ─── Health endpoint ──────────────────────────────────────────────────────────
@app.get("/health", tags=["System"], summary="AI service health check")
async def health():
    """
    Returns the service status, uptime, loaded models, and demo mode flag.
    Called by the Node server to verify the AI service is reachable.
    """
    uptime_seconds = int(time.time() - _start_time)

    return {
        "success": True,
        "status": "ok",
        "service": "careerforge-ai-service",
        "environment": settings.APP_ENV,
        "timestamp": datetime.now(timezone.utc).isoformat(),
        "uptime": uptime_seconds,
        "demo_mode": settings.DEMO_MODE,
        "models": {
            # Phase 5+ will update this when models are loaded
            "embedding": None,
            "spacy": None,
        },
    }


# ─── Root redirect to docs ────────────────────────────────────────────────────
@app.get("/", include_in_schema=False)
async def root():
    return {"message": "CareerForge AI Service. See /docs for API reference."}
