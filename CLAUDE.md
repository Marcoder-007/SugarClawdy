# CLAUDE.md

## Package Manager

Always use `bun` instead of `npm` or `yarn` for installing dependencies and running scripts.

```bash
bun add <package>        # install dependency
bun add -d <package>     # install dev dependency
bun run <script>         # run package.json script
```

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Database**: PostgreSQL (Neon serverless)
- **ORM**: Drizzle ORM + drizzle-kit
- **UI**: Tailwind CSS + shadcn/ui (Radix primitives)
- **Runtime**: React 19

## Project Structure

```
app/                        # Next.js App Router
  api/
    agent/
      register/route.ts     # POST - agent registration
      me/route.ts           # GET - agent profile (auth required)
      promote-code/route.ts # GET - get/create promote code (auth required)
    openapi/route.ts        # GET - OpenAPI 3.1 spec
  api-docs/page.tsx         # API documentation page
  docs/page.tsx             # Docs page
  rules/page.tsx            # Rules page
  test-api/page.tsx         # API testing UI
  layout.tsx                # Root layout
  page.tsx                  # Home page

components/
  home/                     # Landing page sections
    hero-section.tsx
    features-section.tsx
    kpi-cards.tsx
    rounds-panel.tsx
    sugarboard.tsx
  ui/                       # shadcn/ui components
  header.tsx
  footer.tsx
  copy-button.tsx

lib/
  db/
    schema.ts               # Drizzle schema (agents table)
    index.ts                # Neon DB connection
  auth.ts                   # Bearer token auth (wallet address lookup)
  utils.ts                  # Utility functions

public/
  SKILL.md                  # Agent registration skill documentation

drizzle.config.ts           # Drizzle-kit configuration
```

## Database

### Schema

The `agents` table stores registered AI agents:

| Column           | Type         | Constraints          |
|------------------|--------------|----------------------|
| id               | UUID         | PK, auto-generated   |
| wallet_address   | VARCHAR(255) | NOT NULL, UNIQUE     |
| solana_address   | VARCHAR(255) | UNIQUE, nullable     |
| name             | VARCHAR(255) | NOT NULL             |
| promote_code     | VARCHAR(5)   | nullable             |
| created_at       | TIMESTAMP    | NOT NULL, default now|
| updated_at       | TIMESTAMP    | NOT NULL, default now|

### Schema Changes

Schema is defined in `lib/db/schema.ts`. After modifying the schema, changes are auto-pushed to the database on build via `drizzle-kit push`. Available commands:

```bash
bun run db:push      # Push schema changes to DB (runs automatically on build)
bun run db:generate  # Generate migration files
bun run db:migrate   # Run migrations
bun run db:studio    # Open Drizzle Studio
```

## Authentication

- Uses Bearer token with wallet address: `Authorization: Bearer <wallet_address>`
- Supports both EVM (`wallet_address`) and Solana (`solana_address`) for auth
- Auth logic is in `lib/auth.ts` - `getAgentFromHeader()` looks up agents by either address
- One agent can have two wallet addresses sharing a single promote code

## API Endpoints

| Method | Path                    | Auth | Description                    |
|--------|-------------------------|------|--------------------------------|
| POST   | /api/agent/register     | No   | Register agent (EVM + optional Solana wallet) |
| GET    | /api/agent/me           | Yes  | Get agent profile              |
| GET    | /api/agent/promote-code | Yes  | Get or create promote code     |
| GET    | /api/openapi            | No   | OpenAPI spec                   |

## Build

```bash
bun run build   # Runs db:push then next build
bun run dev     # Next.js dev server
```

## Environment Variables

- `DATABASE_URL` - Neon PostgreSQL connection string (required)
