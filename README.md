# Daniel E — Portfolio

A production-grade personal portfolio for **Daniel E, AI Engineer**, built entirely from his resume content.

- **Frontend:** React 18 + TypeScript + Vite + Tailwind CSS v4
- **Backend:** Python + FastAPI, layered router → service → repository/client architecture

## Why this architecture

- Content lives once, in `backend/data/resume_data.json`, sourced directly from the resume — nothing invented. The frontend never hard-codes copy; it always renders whatever the API returns, so updating the JSON (or later swapping it for a database) is the only change needed to update the live site.
- The two apps are fully decoupled over a versioned REST API (`/api/v1/...`), each independently deployable, testable, and buildable.
- Both sides follow strict layering (routers/services/repositories on the backend; services/hooks/UI on the frontend) so new sections, endpoints, or pages can be added without restructuring existing code.

## Project layout

```
daniel-portfolio/
├── backend/        FastAPI application (see backend/README.md)
└── frontend/       React + Vite application (see frontend/README.md)
```

## Running locally

**1. Start the backend** (serves content + contact form on port 8000):

```bash
cd backend
uv sync
cp .env.example .env
make run
```

**2. Start the frontend** (dev server on port 5173):

```bash
cd frontend
npm install
cp .env.example .env
npm run dev
```

Open `http://localhost:5173`. The frontend calls the backend at `VITE_API_BASE_URL` (defaults to `http://localhost:8000`).

## Customizing content

Edit `backend/data/resume_data.json` — every section (profile, skills, experience, projects, research, education, certifications) reads from this single file. No frontend code changes are needed to update copy.

To add a brand-new **section** (e.g. "Publications" beyond research papers):
1. Add the data to `resume_data.json` and a matching Pydantic DTO in `backend/src/models/`.
2. Expose it via a service method and a router endpoint (or fold it into `/api/v1/portfolio`).
3. Add the TypeScript type in `frontend/src/types/portfolio.types.ts` and a new section component under `frontend/src/ui/sections/`.
4. Render it from `frontend/src/App.tsx` and add a sidebar entry if it should be directly navigable.

## Verified before delivery

- Backend: `pytest` — 16/16 tests passing, 90% coverage; `ruff check` / `ruff format --check` clean.
- Frontend: `tsc --noEmit` clean; `vitest run` — 9/9 tests passing; `eslint --max-warnings=0` clean; `vite build` succeeds.
