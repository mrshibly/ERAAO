"""
Application settings loaded from environment variables via pydantic-settings.

All secrets and environment-specific configuration must come from environment
variables — never hardcoded. See `.env.example` for the full list.
"""

from functools import lru_cache
from typing import List

from pydantic import model_validator
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    """Central configuration object for the application."""

    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        case_sensitive=True,
        extra="ignore",
    )

    # ---- General ----
    APP_NAME: str = "Eraao Platform"
    ENVIRONMENT: str = "local"  # local | staging | production
    DEBUG: bool = False

    # ---- Database ----
    DATABASE_URL: str = "sqlite+aiosqlite:///./eraao.db"
    DB_POOL_SIZE: int = 20
    DB_MAX_OVERFLOW: int = 10
    DB_POOL_RECYCLE: int = 3600
    DB_POOL_TIMEOUT: int = 30

    @property
    def async_database_url(self) -> str:
        """Ensure PostgreSQL connection strings use the asyncpg driver."""
        url = self.DATABASE_URL
        if url.startswith("postgres://"):
            url = url.replace("postgres://", "postgresql+asyncpg://", 1)
        elif url.startswith("postgresql://") and not url.startswith("postgresql+asyncpg://"):
            url = url.replace("postgresql://", "postgresql+asyncpg://", 1)
        return url

    # ---- Redis ----
    REDIS_URL: str = "redis://localhost:6379/0"
    REDIS_CACHE_DEFAULT_TTL: int = 300  # seconds

    # ---- JWT ----
    JWT_SECRET_KEY: str = "local_dev_secret_key_at_least_32_chars_long_change_in_prod"
    JWT_ALGORITHM: str = "HS256"
    JWT_ACCESS_TOKEN_EXPIRE_MINUTES: int = 15
    JWT_REFRESH_TOKEN_EXPIRE_DAYS: int = 7

    # ---- CORS ----
    ALLOWED_ORIGINS: str = "http://localhost:3000,https://eraao.com,https://www.eraao.com"

    @property
    def allowed_origins_list(self) -> List[str]:
        """Parse comma-separated origins into a list."""
        return [origin.strip() for origin in self.ALLOWED_ORIGINS.split(",")]

    # ---- OpenRouter AI ----
    OPENROUTER_API_KEY: str = ""
    OPENROUTER_MODEL: str = "meta-llama/llama-3.3-70b-instruct:free"
    OPENROUTER_BASE_URL: str = "https://openrouter.ai/api/v1"

    # ---- Stripe ----
    STRIPE_SECRET_KEY: str = ""
    STRIPE_WEBHOOK_SECRET: str = ""

    # ---- SSLCommerz ----
    SSLCOMMERZ_STORE_ID: str = ""
    SSLCOMMERZ_STORE_PASSWD: str = ""
    SSLCOMMERZ_IS_SANDBOX: bool = True

    # ---- S3 / Object Storage ----
    S3_BUCKET_NAME: str = "eraao-uploads"
    S3_REGION: str = "us-east-1"
    S3_ENDPOINT_URL: str | None = None  # Set for MinIO / local dev
    AWS_ACCESS_KEY_ID: str = ""
    AWS_SECRET_ACCESS_KEY: str = ""

    # ---- Email (SMTP) ----
    SMTP_HOST: str = "localhost"
    SMTP_PORT: int = 587
    SMTP_USER: str = ""
    SMTP_PASSWORD: str = ""
    EMAILS_FROM_EMAIL: str = "noreply@eraao.com"
    EMAILS_FROM_NAME: str = "Eraao Platform"

    # ---- OAuth ----
    GOOGLE_CLIENT_ID: str = ""
    GOOGLE_CLIENT_SECRET: str = ""
    GITHUB_CLIENT_ID: str = ""
    GITHUB_CLIENT_SECRET: str = ""

    @model_validator(mode="after")
    def validate_production_settings(self) -> "Settings":
        if self.ENVIRONMENT in ("production", "staging"):
            if "sqlite" in self.DATABASE_URL.lower():
                raise ValueError("In staging or production environment, DATABASE_URL cannot be a local SQLite database.")
            # Reject any known insecure JWT secret defaults
            insecure_secrets = {
                "CHANGE_ME_GENERATE_A_SECURE_RANDOM_KEY",
                "local_dev_secret_key_at_least_32_chars_long_change_in_prod",
                "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",  # SHA-256 of empty string
            }
            if self.JWT_SECRET_KEY in insecure_secrets or len(self.JWT_SECRET_KEY) < 32:
                raise ValueError(
                    "JWT_SECRET_KEY is insecure. Generate a strong key with: openssl rand -hex 32"
                )
        return self


@lru_cache
def get_settings() -> Settings:
    """Return a cached Settings instance (parsed once per process)."""
    return Settings()  # type: ignore[call-arg]
