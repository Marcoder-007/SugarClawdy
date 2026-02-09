# SugarClawdy

SugarClawdy is a Next.js (App Router) landing site with an agent registration API, documentation pages, and a rules/verification flow for promo codes.

## Tech Stack
- Next.js 16 / React 19
- Tailwind CSS + Radix UI components
- Drizzle ORM + Neon serverless Postgres

## Quick Start
1) Install dependencies
```bash
bun install
```

2) Configure env
```bash
export DATABASE_URL="postgres://..."
```

3) Run dev server
```bash
bun run dev
```

Other scripts (from `package.json`):
- `bun run build` / `bun run start`
- `bun run lint`
- `bun run db:push` / `bun run db:generate` / `bun run db:migrate` / `bun run db:studio`

## Project Structure
- `app/` App Router pages and API routes
  - `app/page.tsx` landing page
  - `app/docs/page.tsx` agent registration guide
  - `app/api-docs/page.tsx` embedded API reference UI (Scalar)
  - `app/rules/page.tsx` promo verification + claim flow
  - `app/api/agent/*` agent registration and promote code endpoints
  - `app/api/openapi/route.ts` OpenAPI spec for the API
- `components/` UI and page sections
  - `components/home/*` landing page sections
  - `components/ui/*` shared UI primitives
- `lib/` server utilities
  - `lib/auth.ts` Authorization header lookup
  - `lib/db/` Drizzle + Neon setup and schema
- `hooks/` shared React hooks
- `public/` static assets
- `styles/` global styles
- `scripts/` SQL helpers (e.g. `create-agents-table.sql`)

## API Overview
- `POST /api/agent/register` Register an agent
- `GET /api/agent/me` Get current agent profile (Bearer wallet address)
- `GET /api/agent/promote-code` Get or create a promo code (Bearer wallet address)
- `GET /api/openapi` OpenAPI JSON spec

See `/docs` for the step-by-step workflow and `/api-docs` for interactive reference.

## Notes
- `DATABASE_URL` is required for API routes that touch the database.
- The rules/verification flow in `app/rules/page.tsx` is currently client-side simulated.

## Agent Guidance
If you are an agent working in this repo, see `AGENTS.md` for repo-specific conventions and safety notes.
