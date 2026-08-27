└── ui/
    └── sections/             One folder per page section (Hero, About, Experience, Projects, Research, Education)
Each section is a plain presentational component fed by data fetched once in `App.tsx` via `usePortfolioData` — no global state library, since a single read-only payload doesn't need one.
- **Accessibility:** visible focus rings, `prefers-reduced-motion` respected (animations disabled), responsive down to small mobile widths with a bottom tab bar replacing the floating sidebar.
# Portfolio Frontend

React + TypeScript + Vite single-page portfolio, styled with Tailwind CSS v4.

## Architecture

```
src/
├── config/env.ts            Centralized env var access
├── types/                   Types mirroring the backend DTOs
├── services/
│   ├── api/apiClient.ts     Fetch wrapper + ServiceResult<T> pattern (no thrown errors)
│   ├── portfolioService.ts  Content fetching
├── hooks/                   usePortfolioData, useTheme, useActiveSection (scrollspy), usePrefersReducedMotion
└── ui/
    ├── layout/               SidebarNav (desktop), MobileNav, Footer
    ├── reusables/            SectionHeading, Badge, Card, Icons, AgentGraphMark (signature visual), Loading/Error states
    └── sections/             One folder per page section (Hero, About, Experience, Projects, Research, Education)
```

Each section is a plain presentational component fed by data fetched once in `App.tsx` via `usePortfolioData` — no global state library, since a single read-only payload doesn't need one.

## Run it

```bash
npm install
Edit `.env` to set `VITE_API_BASE_URL` for the backend
npm run dev                # http://localhost:5173
```

## Scripts

| Command | Purpose |
|---|---|
| `npm run dev` | Vite dev server with HMR |
| `npm run build` | Type-check then production build to `dist/` |
| `npm run typecheck` | `tsc --noEmit` |
| `npm run lint` / `lint:fix` | ESLint (zero-warning policy) |
| `npm run test` | Vitest run (jsdom + Testing Library) |
| `npm run format` | Prettier write |

## Design notes

- **Theme:** dark-first with a light mode toggle, persisted to `localStorage` and defaulting to the OS preference. Tokens are CSS variables in `src/app.css` under `[data-theme]`.
- **Typography:** Space Grotesk (display), Inter (body), JetBrains Mono (tags/labels).
- **Signature element:** the hero's `AgentGraphMark` is a small animated SVG of a planner agent orchestrating sub-agents through a human-in-the-loop approval gate — a literal depiction of Daniel's specialty rather than a generic hero graphic.
- **Accessibility:** visible focus rings, `prefers-reduced-motion` respected (animations disabled), responsive down to small mobile widths with a bottom tab bar replacing the floating sidebar.
