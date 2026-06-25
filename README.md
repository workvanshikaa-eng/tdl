# The Distribution Lab

Marketing site **and** internal client-management system (Client OS) for The
Distribution Lab, in one Next.js app.

- **`/`** — the marketing landing page (public, SEO-friendly).
- **`/cms`** — the role-based client management system (auth-gated).

## Tech stack

| Concern   | Choice                                                        |
| --------- | ------------------------------------------------------------- |
| Framework | Next.js 16 (App Router) + React 19 + TypeScript               |
| Styling   | Tailwind CSS v4 (+ Manrope / JetBrains Mono / Inter via next/font) |
| Database  | Prisma ORM — **SQLite in dev**, PostgreSQL-ready for prod     |
| Auth      | bcrypt password hashing + signed JWT session cookies (`jose`) |
| Access    | Role-based (admin / intern / client), enforced server-side    |

## Getting started

```bash
npm install
npm run db:migrate      # apply migrations (creates prisma/dev.db)
npm run db:seed         # load demo accounts + sample data
npm run dev             # http://localhost:3000
```

Open <http://localhost:3000> for the landing page, or
<http://localhost:3000/cms> for the Client OS.

### Demo logins (password: `demo1234`)

| Role   | Email                                                  |
| ------ | ------------------------------------------------------ |
| Admin  | `maya@thedistributionlab.com`                          |
| Intern | `dev@thedistributionlab.com`, `alex@thedistributionlab.com` |
| Client | `northwind@portal.tdl.com` … `cedar@portal.tdl.com`    |

## What each role sees

- **Admin** — overview KPIs, outreach tracker, every client dashboard, client &
  intern account management, access control.
- **Intern** — only their assigned tasks and the outreach campaigns for the
  clients they've been granted access to.
- **Client** — a read-only dashboard of their own deliverables, progress and
  team updates.

## Configuration

Edit `src/config/site.ts` for the landing page's booking link, contact email and
social handles. Environment variables live in `.env`:

- `DATABASE_URL` — database connection string.
- `AUTH_SECRET` — secret for signing session cookies. **Change this in production.**

## Project structure

```
src/
  app/
    page.tsx                 # landing page
    cms/
      login/                 # sign-in
      (app)/                 # authenticated shell + feature pages
      actions/               # server actions (CRUD, per domain)
  components/
    landing/                 # landing-page sections
    cms/                     # CMS UI components
  lib/                       # auth, prisma, access control, constants
prisma/
  schema.prisma              # data model
  seed.ts                    # demo data
```

## Going to production (PostgreSQL)

1. In `prisma/schema.prisma`, change the datasource provider to `postgresql`.
2. Set `DATABASE_URL` to your Postgres connection string (e.g. Neon / Supabase).
3. Run `npx prisma migrate deploy` (or `migrate dev` to regenerate migrations).
4. Set a strong `AUTH_SECRET`.

The data model uses no SQLite- or Postgres-specific features, so it ports cleanly.

## Useful scripts

| Script              | Purpose                          |
| ------------------- | -------------------------------- |
| `npm run dev`       | Start the dev server             |
| `npm run build`     | Production build                 |
| `npm run db:migrate`| Create/apply a migration         |
| `npm run db:seed`   | Reset to demo data               |
| `npm run db:studio` | Open Prisma Studio (DB browser)  |
| `npm run db:reset`  | Drop, re-migrate and re-seed     |
