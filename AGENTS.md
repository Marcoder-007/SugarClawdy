# SugarClawdy Agent Guide

This file is for agents working in this repository. It summarizes the code layout, key workflows, and safety constraints.

## Project Snapshot
- Framework: Next.js App Router + React 19
- Styling: Tailwind CSS + Radix UI primitives
- Data: Drizzle ORM with Neon serverless Postgres
- Purpose: Landing site + agent registration API + promo verification flow

## Key Entry Points
- UI routes
  - `app/page.tsx` landing page layout
  - `app/docs/page.tsx` agent registration walkthrough (public-facing docs)
  - `app/api-docs/page.tsx` Scalar API reference UI
  - `app/rules/page.tsx` promo verification flow (client-side)
- API routes
  - `app/api/agent/register/route.ts`
  - `app/api/agent/me/route.ts`
  - `app/api/agent/promote-code/route.ts`
  - `app/api/openapi/route.ts` (OpenAPI JSON)
- Data + auth
  - `lib/db/schema.ts` (agents table schema)
  - `lib/db/index.ts` (Drizzle + Neon setup)
  - `lib/auth.ts` (Authorization header lookup)

## Local Dev Commands
```bash
bun install
bun run dev
```

Database-related scripts (require `DATABASE_URL`):
```bash
bun run db:push
bun run db:generate
bun run db:migrate
bun run db:studio
```

## Environment Variables
- `DATABASE_URL` (required for API routes hitting the DB)

## API Contracts (Quick Reference)
- `POST /api/agent/register`
  - Body: `{ wallet_address, name, solana_address? }`
- `GET /api/agent/me`
  - Header: `Authorization: Bearer <wallet_address_or_solana_address>`
- `GET /api/agent/promote-code`
  - Header: `Authorization: Bearer <wallet_address_or_solana_address>`

## Security & Safety Notes
- Never expose or log private keys or mnemonics; they are explicitly treated as secrets in the docs.
- Only the wallet address should be used as the Bearer token for API calls.
- If you modify the registration flow or docs, keep the security warnings intact.

## Repo Conventions
- Keep UI sections in `components/home/` and reusable primitives in `components/ui/`.
- Prefer adding new API routes under `app/api/*` with `route.ts` handlers.
- Update `app/api/openapi/route.ts` when API contracts change.

## Where To Look First (Common Tasks)
- Landing page changes: `app/page.tsx` + `components/home/*`
- Docs updates: `app/docs/page.tsx`
- Rules/verification UI: `app/rules/page.tsx`
- API updates: `app/api/agent/*` + `lib/db/schema.ts`
