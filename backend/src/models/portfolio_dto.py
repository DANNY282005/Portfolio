"""Response DTOs for portfolio content.

These mirror the shape of `data/resume_data.json` but exist as their own
typed layer so the API contract is explicit and does not leak the raw
data-file structure directly.
"""

from pydantic import BaseModel, Field


class ProfileResponseDTO(BaseModel):
    name: str
    title: str
    tagline: str
    email: str
    phone: str
    location: str
    github: str
    linkedin: str
    objective: str
    resumeFile: str
    openRoles: list[str]


class SkillGroupResponseDTO(BaseModel):
    category: str
    items: list[str]


class ExperienceResponseDTO(BaseModel):
    id: str
    company: str
    role: str
    period: str
    location: str
    project: str | None = None
    highlights: list[str]


class ProjectResponseDTO(BaseModel):
    id: str
    title: str
    subtitle: str
    description: str
    tech: list[str]
    tags: list[str] = Field(default_factory=list)
    github: str | None = None


class ResearchPaperResponseDTO(BaseModel):
    id: str
    title: str
    publisher: str
    date: str
    description: str
    url: str | None = None


class EducationResponseDTO(BaseModel):
    id: str
    institution: str
    degree: str
    detail: str
    period: str


class CertificationResponseDTO(BaseModel):
    id: str
    name: str
    issuer: str


class PortfolioOverviewResponseDTO(BaseModel):
    """Aggregate payload the frontend can fetch in a single request."""

    profile: ProfileResponseDTO
    skills: list[SkillGroupResponseDTO]
    experience: list[ExperienceResponseDTO]
    projects: list[ProjectResponseDTO]
    research: list[ResearchPaperResponseDTO]
    education: list[EducationResponseDTO]
    certifications: list[CertificationResponseDTO]
    softSkills: list[str]
    languages: list[str]
