"""Dependency injection configuration.

Centralizes how routers obtain services. Every dependency is a cached
singleton for this process, and every one is trivially overridable in
tests via FastAPI's `app.dependency_overrides`.
"""

from functools import lru_cache

from src.repositories.portfolio_repository import PortfolioRepository
from src.services.portfolio_service import PortfolioService
from src.settings import get_settings


@lru_cache
def get_portfolio_repository() -> PortfolioRepository:
    settings = get_settings()
    return PortfolioRepository(data_file_path=settings.DATA_FILE_PATH)


@lru_cache
def get_portfolio_service() -> PortfolioService:
    return PortfolioService(repository=get_portfolio_repository())
