# Portfolio API (backend)

FastAPI service serving Daniel E's portfolio content.

## Architecture

```
Request → Middleware (request id, logging) → Router → Service → Repository → DTO → Response
```

```
main.py                 ASGI entrypoint (exports the application)
src/
├── main.py                 Application factory, lifespan, middleware, router registration
├── dependencies.py         DI wiring (singletons, overridable in tests)
├── settings.py             Env-driven configuration (never hard-code values elsewhere)
├── models/                 Pydantic request/response DTOs
├── routers/                HTTP layer only — no business logic
├── services/                Business logic — portfolio assembly
├── repositories/            Reads the static content data source (data/resume_data.json)
├── middleware/              Request-id + access logging
└── utils/                   Exceptions and logging config
data/
└── resume_data.json         Single source of truth for all portfolio content
static/
└── Daniel_E_Resume.pdf      Resume PDF served for download
```

## Run it

```bash
uv sync
Edit `.env` with local settings
make run          # http://localhost:8000, docs at /docs
```

## Testing

```bash
make test-cov   # pytest with coverage
make lint       # ruff check + format check
make pipeline   # lint + test-cov, mirrors CI
```

## Endpoints

| Method | Path                    | Description                          |
|--------|-------------------------|---------------------------------------|
| GET    | `/health`               | Liveness check                        |
| GET    | `/api/v1/portfolio`     | Full aggregate portfolio payload      |
| GET    | `/api/v1/profile`       | Profile summary                       |
| GET    | `/api/v1/skills`        | Grouped technical skills              |
| GET    | `/api/v1/experience`    | Work experience, most recent first    |
| GET    | `/api/v1/projects`      | Personal/academic projects            |
| GET    | `/api/v1/research`      | Published research papers             |
| GET    | `/api/v1/education`     | Academic education history            |
| GET    | `/api/v1/certifications`| Professional certifications           |
| GET    | `/api/v1/resume`        | Downloads the resume PDF              |

Interactive OpenAPI docs are available at `/docs` while the server is running.
