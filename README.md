# Raíz

Structure:

1. **Information** on the ethics of veganism (rejection of speciesism and viewing animals as resources), nutrition, and frequently asked questions.

2. **Editable directory** of grassroots vegan activism groups,

starting in Latin America, so that traveling vegans can find community.

## Stack

- Next.js 14 (App Router) + TypeScript
- Tailwind CSS
- Prisma + PostgreSQL
- NextAuth (magic link/credentials) for each group to edit its profile
- Vitest (unit) + Playwright (e2e)
- ESLint + Prettier + Husky + commitlint (Conventional Commits)
- GitHub Actions (CI) → deployment on Vercel

No Docker: everything runs natively (Node + remote Postgres in dev/CI).

## Local Setup

```bash
git clone <repo>
cd root
npm install
cp .env.example .env
npm run db:generate
npm run db:push
npm run dev
```

## Deployment

- **App:** Vercel (front + API routes), environment variables from `.env.example`.

- **Database:** Railway or Supabase (managed Postgres).

- Push to `main` with a green CI → automatic deployment. Each PR generates a preview.

## Directory Permissions Model

- Anyone can propose a group → `PENDING`.

- An `ADMIN` approves it → `APPROVED`, publicly visible.

- Users with `GroupEditor` (`OWNER`/`EDITOR`) edit their own entry;

Each change is recorded in `GroupChangeLog`.
