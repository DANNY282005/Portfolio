import json

import pytest

from src.repositories.portfolio_repository import PortfolioRepository
from src.utils.exceptions.app_exceptions import DataSourceError


def test_get_profile_returns_expected_fields(tmp_path):
    data_file = tmp_path / "data.json"
    data_file.write_text(
        json.dumps(
            {
                "profile": {"name": "Test User"},
                "skills": [],
                "experience": [],
                "projects": [],
                "research": [],
                "education": [],
                "certifications": [],
                "softSkills": [],
                "languages": [],
            }
        )
    )
    repository = PortfolioRepository(data_file_path=str(data_file))

    profile = repository.get_profile()

    assert profile["name"] == "Test User"


def test_missing_data_file_raises_data_source_error(tmp_path):
    repository = PortfolioRepository(data_file_path=str(tmp_path / "missing.json"))

    with pytest.raises(DataSourceError):
        repository.get_profile()


def test_malformed_json_raises_data_source_error(tmp_path):
    data_file = tmp_path / "bad.json"
    data_file.write_text("{not valid json")
    repository = PortfolioRepository(data_file_path=str(data_file))

    with pytest.raises(DataSourceError):
        repository.get_profile()


def test_real_data_file_loads_and_has_required_sections():
    from src.settings import get_settings

    settings = get_settings()
    repository = PortfolioRepository(data_file_path=settings.DATA_FILE_PATH)

    assert repository.get_profile()["name"] == "Daniel E"
    assert len(repository.get_projects()) > 0
    assert len(repository.get_experience()) > 0
