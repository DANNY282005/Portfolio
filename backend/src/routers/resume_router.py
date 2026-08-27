"""Route for downloading the resume PDF."""

import logging
from pathlib import Path

from fastapi import APIRouter, Depends
from fastapi.responses import FileResponse

from src.settings import Settings, get_settings
from src.utils.exceptions.app_exceptions import ResourceNotFoundError

router = APIRouter(prefix="/api/v1", tags=["resume"])
logger = logging.getLogger(__name__)


@router.get("/resume")
def download_resume(settings: Settings = Depends(get_settings)) -> FileResponse:
    """Serve the resume PDF as a downloadable file."""
    resume_path = Path(settings.RESUME_FILE_PATH)
    logger.info("handling resume download", extra={"path": str(resume_path)})
    if not resume_path.exists():
        logger.warning("resume file not found", extra={"path": str(resume_path)})
        raise ResourceNotFoundError("Resume file is not available")
    logger.info("resume response ready", extra={"filename": "Daniel_E_Resume.pdf"})
    return FileResponse(
        path=resume_path,
        media_type="application/pdf",
        filename="Daniel_E_Resume.pdf",
    )
