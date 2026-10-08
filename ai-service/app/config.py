"""
CareerForge AI — Python AI Service configuration.
Uses pydantic-settings for type-safe env var loading.
"""

from pydantic_settings import BaseSettings, SettingsConfigDict
from functools import lru_cache


class Settings(BaseSettings):
    # ── App ──────────────────────────────────────────────────────────────────
    APP_ENV: str = "development"
    APP_PORT: int = 8000

    # ── Server integration ───────────────────────────────────────────────────
    SERVER_URL: str = "http://localhost:5000"

    # ── LLM providers ────────────────────────────────────────────────────────
    GEMINI_API_KEY: str = ""
    GROQ_API_KEY: str = ""
    OPENROUTER_API_KEY: str = ""

    # ── Embedding ────────────────────────────────────────────────────────────
    EMBEDDING_MODEL: str = "all-MiniLM-L6-v2"

    # ── Database ─────────────────────────────────────────────────────────────
    MONGODB_URI: str = ""

    # ── Demo mode ────────────────────────────────────────────────────────────
    DEMO_MODE: bool = False

    @property
    def is_development(self) -> bool:
        return self.APP_ENV == "development"

    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        case_sensitive=True,
        extra="ignore",
    )


@lru_cache()
def get_settings() -> Settings:
    """Cached settings instance — call get_settings() everywhere."""
    return Settings()
