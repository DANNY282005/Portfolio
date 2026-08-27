"""Liveness check endpoint."""

import logging

from fastapi import APIRouter, Depends

from src.models.common_dto import HealthResponseDTO
from src.settings import Settings, get_settings

router = APIRouter(tags=["health"])
logger = logging.getLogger(__name__)


@router.get("/health", response_model=HealthResponseDTO)
def health_check(settings: Settings = Depends(get_settings)) -> HealthResponseDTO:
    """Lightweight liveness probe — does not depend on any external service."""
    logger.info("handling health check")
    response = HealthResponseDTO(
        status="ok", application=settings.APPLICATION_NAME, version=settings.APPLICATION_VERSION
    )
    logger.info("health check response ready", extra={"status": response.status})
    return response
