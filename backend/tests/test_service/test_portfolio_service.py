from src.dependencies import get_portfolio_repository
from src.services.portfolio_service import PortfolioService


def test_get_overview_assembles_all_sections():
    service = PortfolioService(repository=get_portfolio_repository())

    overview = service.get_overview()

    assert overview.profile.name == "Daniel E"
    assert len(overview.projects) > 0
    assert len(overview.experience) > 0
    assert len(overview.education) > 0
    assert len(overview.certifications) > 0
