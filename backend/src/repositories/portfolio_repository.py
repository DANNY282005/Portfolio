"""Repository for portfolio content.

The portfolio's content is static, versioned resume data rather than
transactional data, so it is persisted as a JSON file instead of a
database table. This repository is the only module allowed to touch that
file — services never read it directly — which keeps the storage medium
swappable (e.g. for a real database later) without touching business logic.
"""

import json
import logging
from pathlib import Path
from typing import Any

from src.utils.exceptions.app_exceptions import DataSourceError

logger = logging.getLogger(__name__)


class PortfolioRepository:
    """Loads and caches the portfolio content data source."""

    def __init__(self, data_file_path: str) -> None:
        self._data_file_path = Path(data_file_path)
        self._cached_data: dict[str, Any] | None = None

    def _load(self) -> dict[str, Any]:
        """Read and parse the JSON data file once, caching the result in memory."""
        if self._cached_data is not None:
            logger.info("using cached portfolio data")
            return self._cached_data
        try:
            logger.info("reading portfolio data file", extra={"path": str(self._data_file_path)})
            raw_text = self._data_file_path.read_text(encoding="utf-8")
            self._cached_data = json.loads(raw_text)
            logger.info("portfolio data loaded and cached", extra={"path": str(self._data_file_path)})
        except FileNotFoundError as exc:
            logger.error("Portfolio data file not found at %s", self._data_file_path)
            raise DataSourceError("Portfolio content data source is unavailable") from exc
        except json.JSONDecodeError as exc:
            logger.error("Portfolio data file is not valid JSON: %s", exc)
            raise DataSourceError("Portfolio content data source is malformed") from exc
        return self._cached_data

    def get_profile(self) -> dict[str, Any]:
        return self._load()["profile"]

    def get_skills(self) -> list[dict[str, Any]]:
        return self._load()["skills"]

    def get_experience(self) -> list[dict[str, Any]]:
        return self._load()["experience"]

    def get_projects(self) -> list[dict[str, Any]]:
        return self._load()["projects"]

    def get_research(self) -> list[dict[str, Any]]:
        return self._load()["research"]

    def get_education(self) -> list[dict[str, Any]]:
        return self._load()["education"]

    def get_certifications(self) -> list[dict[str, Any]]:
        return self._load()["certifications"]

    def get_soft_skills(self) -> list[str]:
        return self._load()["softSkills"]

    def get_languages(self) -> list[str]:
        return self._load()["languages"]
