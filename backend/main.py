"""Application entrypoint and ASGI application."""

import logging
from collections.abc import AsyncIterator
from contextlib import asynccontextmanager

import uvicorn
from fastapi import FastAPI, Request, status
from fastapi.exceptions import RequestValidationError
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse

from src.middleware.request_context_middleware import RequestContextMiddleware
from src.models.common_dto import ErrorResponseDTO
from src.routers import health_router, portfolio_router, resume_router
from src.settings import get_settings
from src.utils.exceptions.app_exceptions import AppException
from src.utils.logging_config import configure_logging

logger = logging.getLogger(__name__)


def _request_id(request: Request) -> str | None:
    return getattr(request.state, "request_id", None)


def register_exception_handlers(app: FastAPI) -> None:
    """Attach consistent error responses to the application."""

    @app.exception_handler(AppException)
    async def handle_app_exception(request: Request, exc: AppException) -> JSONResponse:
        logger.warning("application exception: %s", exc.message, extra={"request_id": _request_id(request)})
        logger.info("error response ready", extra={"request_id": _request_id(request), "status_code": exc.status_code})
        return JSONResponse(
            status_code=exc.status_code,
            content=ErrorResponseDTO(
                error_code=exc.error_code, message=exc.message, request_id=_request_id(request)
            ).model_dump(),
        )

    @app.exception_handler(RequestValidationError)
    async def handle_validation_error(request: Request, exc: RequestValidationError) -> JSONResponse:
        logger.info("request validation failed", extra={"request_id": _request_id(request)})
        logger.info(
            "validation error response ready",
            extra={"request_id": _request_id(request), "status_code": status.HTTP_422_UNPROCESSABLE_ENTITY},
        )
        return JSONResponse(
            status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
            content=ErrorResponseDTO(
                error_code="VALIDATION_ERROR",
                message="One or more fields are invalid",
                request_id=_request_id(request),
            ).model_dump(),
        )

    @app.exception_handler(Exception)
    async def handle_unexpected_exception(request: Request, exc: Exception) -> JSONResponse:
        logger.exception("unhandled exception", extra={"request_id": _request_id(request)})
        logger.info(
            "internal error response ready",
            extra={"request_id": _request_id(request), "status_code": status.HTTP_500_INTERNAL_SERVER_ERROR},
        )
        return JSONResponse(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            content=ErrorResponseDTO(
                error_code="INTERNAL_ERROR",
                message="An unexpected error occurred",
                request_id=_request_id(request),
            ).model_dump(),
        )


@asynccontextmanager
async def lifespan(app: FastAPI) -> AsyncIterator[None]:
    """Application startup/shutdown sequence."""
    settings = get_settings()
    configure_logging(settings)
    logger.info("Starting %s v%s (%s)", settings.APPLICATION_NAME, settings.APPLICATION_VERSION, settings.ENVIRONMENT)
    yield
    logger.info("Shutting down %s", settings.APPLICATION_NAME)


def create_app() -> FastAPI:
    """Build and configure the FastAPI application."""
    settings = get_settings()
    app = FastAPI(
        title="Daniel E — Portfolio API",
        description="Backend API serving danielsolomon282005's portfolio content.",
        version=settings.APPLICATION_VERSION,
        lifespan=lifespan,
    )
    app.add_middleware(
        CORSMiddleware,
        allow_origins=settings.cors_origins,
        allow_credentials=True,
        allow_methods=["GET"],
        allow_headers=["*"],
    )
    app.add_middleware(RequestContextMiddleware)
    register_exception_handlers(app)
    app.include_router(health_router.router)
    app.include_router(portfolio_router.router)
    app.include_router(resume_router.router)
    return app


app = create_app()

__all__ = ["app"]


if __name__ == "__main__":
    settings = get_settings()
    uvicorn.run(app, host=settings.HOST, port=settings.PORT)
