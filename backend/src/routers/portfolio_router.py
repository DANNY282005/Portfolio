"""Routes exposing portfolio content sourced from the resume data set."""

import logging

from fastapi import APIRouter, Depends

from src.dependencies import get_portfolio_service
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
from src.services.portfolio_service import PortfolioService

router = APIRouter(prefix="/api/v1", tags=["portfolio"])
logger = logging.getLogger(__name__)


@router.get("/portfolio", response_model=PortfolioOverviewResponseDTO)
def get_portfolio_overview(service: PortfolioService = Depends(get_portfolio_service)) -> PortfolioOverviewResponseDTO:
    """Return the full portfolio payload in a single request."""
    logger.info("handling portfolio overview request")
    response = service.get_overview()
    logger.info("portfolio overview response ready")
    return response


@router.get("/profile", response_model=ProfileResponseDTO)
def get_profile(service: PortfolioService = Depends(get_portfolio_service)) -> ProfileResponseDTO:
    logger.info("handling profile request")
    response = service.get_profile()
    logger.info("profile response ready")
    return response


@router.get("/skills", response_model=list[SkillGroupResponseDTO])
def get_skills(service: PortfolioService = Depends(get_portfolio_service)) -> list[SkillGroupResponseDTO]:
    logger.info("handling skills request")
    response = service.get_skills()
    logger.info("skills response ready", extra={"item_count": len(response)})
    return response


@router.get("/experience", response_model=list[ExperienceResponseDTO])
def get_experience(service: PortfolioService = Depends(get_portfolio_service)) -> list[ExperienceResponseDTO]:
    logger.info("handling experience request")
    response = service.get_experience()
    logger.info("experience response ready", extra={"item_count": len(response)})
    return response


@router.get("/projects", response_model=list[ProjectResponseDTO])
def get_projects(service: PortfolioService = Depends(get_portfolio_service)) -> list[ProjectResponseDTO]:
    logger.info("handling projects request")
    response = service.get_projects()
    logger.info("projects response ready", extra={"item_count": len(response)})
    return response


@router.get("/research", response_model=list[ResearchPaperResponseDTO])
def get_research(service: PortfolioService = Depends(get_portfolio_service)) -> list[ResearchPaperResponseDTO]:
    logger.info("handling research request")
    response = service.get_research()
    logger.info("research response ready", extra={"item_count": len(response)})
    return response


@router.get("/education", response_model=list[EducationResponseDTO])
def get_education(service: PortfolioService = Depends(get_portfolio_service)) -> list[EducationResponseDTO]:
    logger.info("handling education request")
    response = service.get_education()
    logger.info("education response ready", extra={"item_count": len(response)})
    return response


@router.get("/certifications", response_model=list[CertificationResponseDTO])
def get_certifications(service: PortfolioService = Depends(get_portfolio_service)) -> list[CertificationResponseDTO]:
    logger.info("handling certifications request")
    response = service.get_certifications()
    logger.info("certifications response ready", extra={"item_count": len(response)})
    return response
