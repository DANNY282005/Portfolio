"""Structured logging configuration.

Called once at application startup. Every module gets its logger via
`logging.getLogger(__name__)` — never call `logging.basicConfig()`
anywhere else in the codebase.
"""

import json
import logging
import sys
from datetime import UTC, datetime

from src.settings import Settings


class JsonFormatter(logging.Formatter):
    """Renders log records as single-line JSON for production log pipelines."""

    def format(self, record: logging.LogRecord) -> str:
        payload = {
            "timestamp": datetime.now(UTC).isoformat(),
            "level": record.levelname,
            "message": record.getMessage(),
            "logger": record.name,
            "module": record.module,
            "filename": record.filename,
            "function": record.funcName,
            "line_number": record.lineno,
        }
        if record.exc_info:
            payload["exception_type"] = str(record.exc_info[0].__name__) if record.exc_info[0] else None
            payload["exception_message"] = str(record.exc_info[1]) if record.exc_info[1] else None
        for field in ("request_id", "method", "path", "status_code", "duration_ms", "item_count", "filename"):
            if hasattr(record, field):
                payload[field] = getattr(record, field)
        return json.dumps(payload)


def configure_logging(settings: Settings) -> None:
    """Configure the root logger exactly once, based on application settings."""
    root_logger = logging.getLogger()
    root_logger.setLevel(settings.LOG_LEVEL)
    root_logger.handlers.clear()

    handler = logging.StreamHandler(sys.stdout)
    if settings.ENABLE_JSON_LOGGING:
        handler.setFormatter(JsonFormatter())
    else:
        handler.setFormatter(logging.Formatter("%(asctime)s | %(levelname)-8s | %(name)s | %(message)s"))
    root_logger.addHandler(handler)
