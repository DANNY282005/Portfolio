"""Custom application exceptions.

Routers never raise raw `Exception` for expected failure modes — services
and repositories raise one of these, and the global exception handlers
registered in `main.py` translate them into a consistent `ErrorResponseDTO`.
"""


class AppException(Exception):
    """Base class for all application-raised exceptions."""

    status_code: int = 500
    error_code: str = "INTERNAL_ERROR"

    def __init__(self, message: str) -> None:
        super().__init__(message)
        self.message = message


class ResourceNotFoundError(AppException):
    """Raised when a requested resource does not exist."""

    status_code = 404
    error_code = "RESOURCE_NOT_FOUND"


class DataSourceError(AppException):
    """Raised when the underlying content data source cannot be read or is malformed."""

    status_code = 500
    error_code = "DATA_SOURCE_ERROR"
