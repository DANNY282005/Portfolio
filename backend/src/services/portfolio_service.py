"""Service layer for portfolio content.

Transforms raw repository data into typed response DTOs. This is the only
layer that assembles the aggregate `PortfolioOverviewResponseDTO`.
"""

import logging

from src.models.portfolio_dto import (
    CertificationResponseDTO,
    EducationResponseDTO,
    ExperienceResponseDTO,
    PortfolioOverviewResponseDTO,
    ProfileResponseDTO,
    ProjectResponseDTO,
    ResearchPaperResponseDTO,
    SkillGroupResponseDTO,
)
from src.repositories.portfolio_repository import PortfolioRepository

logger = logging.getLogger(__name__)


class PortfolioService:
    """Coordinates portfolio content retrieval and DTO assembly."""

    def __init__(self, repository: PortfolioRepository) -> None:
        self._repository = repository

    def get_profile(self) -> ProfileResponseDTO:
        logger.info("loading profile from repository")
        response = ProfileResponseDTO(**self._repository.get_profile())
        logger.info("profile DTO created")
        return response

    def get_skills(self) -> list[SkillGroupResponseDTO]:
        logger.info("loading skills from repository")
        response = [SkillGroupResponseDTO(**group) for group in self._repository.get_skills()]
        logger.info("skills DTOs created", extra={"item_count": len(response)})
        return response

    def get_experience(self) -> list[ExperienceResponseDTO]:
        logger.info("loading experience from repository")
        response = [ExperienceResponseDTO(**item) for item in self._repository.get_experience()]
        logger.info("experience DTOs created", extra={"item_count": len(response)})
        return response

    def get_projects(self) -> list[ProjectResponseDTO]:
        logger.info("loading projects from repository")
        response = [ProjectResponseDTO(**item) for item in self._repository.get_projects()]
        logger.info("projects DTOs created", extra={"item_count": len(response)})
        return response

    def get_research(self) -> list[ResearchPaperResponseDTO]:
        logger.info("loading research from repository")
        response = [ResearchPaperResponseDTO(**item) for item in self._repository.get_research()]
        logger.info("research DTOs created", extra={"item_count": len(response)})
        return response

    def get_education(self) -> list[EducationResponseDTO]:
        logger.info("loading education from repository")
        response = [EducationResponseDTO(**item) for item in self._repository.get_education()]
        logger.info("education DTOs created", extra={"item_count": len(response)})
        return response

    def get_certifications(self) -> list[CertificationResponseDTO]:
        logger.info("loading certifications from repository")
        response = [CertificationResponseDTO(**item) for item in self._repository.get_certifications()]
        logger.info("certifications DTOs created", extra={"item_count": len(response)})
        return response

    def get_overview(self) -> PortfolioOverviewResponseDTO:
        """Assemble the full portfolio payload in a single response."""
        logger.info("assembling full portfolio overview")
        response = PortfolioOverviewResponseDTO(
            profile=self.get_profile(),
            skills=self.get_skills(),
            experience=self.get_experience(),
            projects=self.get_projects(),
            research=self.get_research(),
            education=self.get_education(),
            certifications=self.get_certifications(),
            softSkills=self._repository.get_soft_skills(),
            languages=self._repository.get_languages(),
        )
        logger.info("full portfolio overview DTO created")
        return response
