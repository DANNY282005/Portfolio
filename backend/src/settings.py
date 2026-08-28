"""Centralized application settings loaded from environment variables.

Every configurable value in the application (ports, CORS origins, log level,
...) must be sourced from here rather than
hard-coded in routers/services/clients.
"""

from functools import lru_cache
from pathlib import Path

from pydantic_settings import BaseSettings, SettingsConfigDict

BASE_DIR = Path(__file__).resolve().parents[1]


class Settings(BaseSettings):
    """Application-wide configuration.

    Values are read from environment variables (or a local `.env` file)
    and validated at process startup so misconfiguration fails fast.
    """

    model_config = SettingsConfigDict(env_file=".env", env_file_encoding="utf-8", extra="ignore")

    # Application metadata
    APPLICATION_NAME: str = "daniel-portfolio-api"
    APPLICATION_VERSION: str = "1.0.0"
    ENVIRONMENT: str = "development"

    # Server
    HOST: str = "0.0.0.0"
    PORT: int = 8000

    # CORS
    CORS_ALLOWED_ORIGINS: str = "http://localhost:5173,http://localhost:4173"

    # Logging
    LOG_LEVEL: str = "INFO"
    ENABLE_JSON_LOGGING: bool = False

    # Static content paths
    DATA_FILE_PATH: str = str(BASE_DIR / "data" / "resume_data.json")
    RESUME_FILE_PATH: str = str(BASE_DIR / "static" / "Daniel_E_Resume.pdf")

    # Vite API base URL
    VITE_API_BASE_URL: str = "https://daniel-portfolio-2xsd.onrender.com"

    @property
    def cors_origins(self) -> list[str]:
        """CORS origins as a clean list, derived from the raw env string."""
        return [origin.strip() for origin in self.CORS_ALLOWED_ORIGINS.split(",") if origin.strip()]


@lru_cache
def get_settings() -> Settings:
    """Return a cached Settings instance (loaded once per process)."""
    return Settings()
