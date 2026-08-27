FROM python:3.12-slim AS base

COPY --from=ghcr.io/astral-sh/uv:0.6.14 /uv /uvx /bin/

ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1

WORKDIR /srv/app

RUN useradd --create-home --shell /bin/bash appuser

COPY pyproject.toml uv.lock ./
RUN uv sync --no-dev

COPY main.py .
COPY src ./src
COPY data ./data
COPY static ./static

USER appuser

EXPOSE 8000

CMD ["uv", "run", "--no-dev", "uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
