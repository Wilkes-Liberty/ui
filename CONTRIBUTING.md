# Contributing to ui (Next.js Frontend)

This guide covers local development setup, the day-to-day workflow, and how changes reach production.

**Authoritative guidance**: See [AGENTS.md](AGENTS.md) (this repo) and the root [../AGENTS.md](../AGENTS.md) for the full platform picture, auth gotchas, and deployment.

For environment relationships, see [`ENVIRONMENT_OVERVIEW.md`](../infra/ENVIRONMENT_OVERVIEW.md) in the `infra` repo.

---

## Table of Contents

- [Prerequisites](#prerequisites)
- [Local Setup](#local-setup)
- [Daily Workflow](#daily-workflow)
- [Branch and PR Process](#branch-and-pr-process)
- [Environment Variables](#environment-variables)
- [Connecting to Drupal Locally](#connecting-to-drupal-locally)
- [Code Standards](#code-standards)
- [How Changes Reach Production](#how-changes-reach-production)

---

## Prerequisites

- **Node.js** 18.17+ (see `.nvmrc` — use `nvm use` if you have nvm)
- **npm** (bundled with Node.js)
- **Git** with SSH key access to the GitHub org
- Access to a running Drupal backend (local DDEV or staging)

---

## Local Setup

```bash
# 1. Clone the repo
git clone git@github.com:wilkesliberty/ui.git
cd ui

# 2. Install dependencies
npm install

# 3. Set up environment variables
cp .env.example .env.local
# Edit .env.local with your local Drupal connection details (see below)

# 4. Start the development server
npm run dev
```

The app will be available at `http://localhost:3000` with hot reloading via Turbopack.

---

## Daily Workflow

```bash
# Start your session
npm run dev

# After pulling changes from git
git pull origin your-branch
npm install   # if package.json changed
```

The dev server auto-reloads on file changes. For GraphQL schema changes in Drupal, you may need to restart the dev server.

### Available Scripts

```bash
npm run dev           # Development server (Turbopack, hot reload)
npm run build         # Production build
npm run start         # Run production build locally
npm run lint          # ESLint
npm run format        # Prettier (auto-fix)
npm run format:check  # Prettier (check only, no changes)
```

---

## Branch and PR Process

```
feature/your-feature ──PR──▶ master

On every push to master, .github/workflows/sync-branches.yml runs and
fast-forwards master into both companion branches:
  ├─▶ staging      (triggers infra's deploy-staging.yml)
  └─▶ development  (no deploy; WIP integration baseline)
```

1. **Branch from `master`**:
   ```bash
   git checkout master
   git pull origin master
   git checkout -b feature/your-feature-name
   ```

2. **Do your work**, commit.

3. **Before opening a PR**, run lint and format checks:
   ```bash
   npm run lint
   npm run format:check
   ```

4. **Open a PR against `master`**. Include:
   - What changed and why
   - Any Drupal API changes this depends on (content type changes, new fields, GraphQL schema updates)
   - Screenshots for UI changes

5. **After review and merge**, `sync-branches.yml` fast-forwards `master`
   into `staging` and `development` automatically. The staging push
   triggers the staging deploy in the `infra` repo. Production deploy is
   manual (`workflow_dispatch` on `infra/deploy-production.yml`).

**Never push directly to `staging`, `development`, or `master`.**

Branch naming:
- `feature/add-article-listing`
- `fix/mobile-nav-overflow`
- `chore/update-dependencies`
- `docs/update-readme`

---

## Environment Variables

Copy `.env.example` to `.env.local` for local development. Never commit `.env.local`.

```bash
# .env.local for local development (pointing at DDEV Drupal)
NEXT_PUBLIC_DRUPAL_BASE_URL=https://api.wilkesliberty.dev
NEXT_IMAGE_DOMAIN=api.wilkesliberty.dev
DRUPAL_CLIENT_ID=<from Drupal consumer config>
DRUPAL_CLIENT_SECRET=<from Drupal consumer config>
DRUPAL_REVALIDATE_SECRET=any-local-string
DRUPAL_PREVIEW_SECRET=any-local-string
```

For staging/production values, ask the team lead — those are managed in the Docker Compose `.env` on the on-prem server and are never committed.

---

## Connecting to Drupal Locally

The `ui` fetches all content from Drupal via GraphQL and JSON:API. For local development you have two options:

### Option A: Use local DDEV Drupal (recommended for content work)

1. Make sure the `webcms` repo is running: `cd ../webcms && ddev start`
2. Get OAuth credentials from `https://api.wilkesliberty.dev/admin/config/services/consumer`
3. Set `NEXT_PUBLIC_DRUPAL_BASE_URL=https://api.wilkesliberty.dev` in `.env.local`

### Option B: Point at staging Drupal (for frontend-only work)

If you only need real content and aren't changing Drupal, point at staging (Tailscale required):

```bash
NEXT_PUBLIC_DRUPAL_BASE_URL=https://stg-api.int.wilkesliberty.com
```

Ask the team lead for staging OAuth credentials.

---

## Code Standards

- **TypeScript**: Strict mode is enabled — avoid `any`
- **ESLint**: Next.js recommended config — run `npm run lint` before PRs
- **Prettier**: Run `npm run format` to auto-format
- **Commit messages**: Conventional commits — `feat:`, `fix:`, `chore:`, `docs:`

### Pre-PR checklist

- [ ] `npm run lint` passes with no errors
- [ ] `npm run format:check` passes
- [ ] `npm run build` succeeds locally (catches type errors)
- [ ] No secrets or `.env.local` values in committed files
- [ ] Any new Drupal data dependencies documented in the PR

---

## How Changes Reach Production

| Stage | What happens | Who does it |
|-------|-------------|-------------|
| Feature branch | Local `npm run dev` | Developer |
| PR → master | Code review, merge | Reviewer |
| Auto-sync to staging | `sync-branches.yml` FF-pushes `master` → `staging` | GH Actions (automatic) |
| Staging deploy | `infra/deploy-staging.yml` rebuilds staging Docker stack | GH Actions (automatic) |
| QA on staging | Test on `https://stg.int.wilkesliberty.com` (Tailscale) | Developer + QA |
| Production deploy | Click **Run workflow** on `infra/deploy-production.yml` | Operator (manual) |
| VPS Next.js redeploy | Operator runs `make vps` in the `infra` repo | Operator (manual until automated) |

### What the production deploy looks like

Production Next.js runs on the cloud VPS. The Drupal-side production
deploy is automated via `infra/deploy-production.yml` on
`workflow_dispatch`. The Next.js redeploy on the VPS is currently still
operator-driven via `make vps` (`infra/ansible/playbooks/vps.yml`):

```bash
# On the operator workstation, after PR merge to master:
cd ~/Repositories/infra
make vps   # rebuilds Next.js from current master and syncs to the VPS
```

---

## Troubleshooting

**Build fails with type errors:**
```bash
npm run build   # Shows all TypeScript errors
```

**Drupal connection errors:**
- Check `NEXT_PUBLIC_DRUPAL_BASE_URL` in `.env.local` is correct and reachable
- Verify OAuth credentials are valid: `DRUPAL_CLIENT_ID` / `DRUPAL_CLIENT_SECRET`
- If using DDEV Drupal, make sure `ddev status` shows it running

**Stale content in dev:**

Next.js caches GraphQL responses. Hard refresh or restart the dev server:
```bash
# Stop dev server, then:
rm -rf .next
npm run dev
```

**Port 3000 already in use:**
```bash
# Find and kill the process
lsof -i :3000
kill -9 <PID>
```
