"""Shared response DTOs used across the API."""

from pydantic import BaseModel


class ErrorResponseDTO(BaseModel):
    """Consistent error envelope returned by every global exception handler."""

    error_code: str
    message: str
    request_id: str | None = None


class HealthResponseDTO(BaseModel):
    """Liveness check response."""

    status: str
    application: str
    version: str
