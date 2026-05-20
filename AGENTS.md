# AGENTS.md — Wilkes Liberty Frontend (Next.js)

This guide orients AI agents working in the `ui/` repository — the Next.js 15 frontend for wilkesliberty.com.

For platform-wide architecture, environments, and deployment, read the root [../AGENTS.md](../AGENTS.md) first, then `infra/docs/ENVIRONMENT_OVERVIEW.md`.

## Project Overview

**Next.js 15 (App Router) + React 19 + TypeScript + Tailwind** frontend that consumes a headless Drupal 11 CMS via **GraphQL** (primary) and JSON:API.

**Key technical choices**:
- `next-drupal@2.0.0-beta.1` (the 2.x beta is required for App Router support; the 1.x line only supports Pages Router).
- Custom `NextDrupalGraphQL` wrapper (`lib/next-drupal-graphql.ts`) because the default next-drupal client is heavily JSON:API-oriented.
- Heavy use of **ISR** (Incremental Static Regeneration) + on-demand revalidation via Drupal's "Next" module.
- OAuth2 client credentials for authenticated preview / draft flows.
- Turbopack for dev (`npm run dev`).
- Image optimization proxy points at the Drupal host (different value locally vs in Docker).

The production build runs on the Njalla VPS as a systemd service (managed by the `wl-vps-ui` Ansible role in `infra/`).

## Repository Structure (agent-relevant parts)

```
ui/
├── app/                      # App Router routes: (app)/, (marketing)/, api/, layout, error, loading, etc.
├── components/               # drupal/, landing/, navigation/, misc/
├── lib/
│   ├── drupal.ts             # Singleton NextDrupalGraphQL client (respects build-time auth omission)
│   ├── next-drupal-graphql.ts# Custom GraphQL transport extending NextDrupalBase
│   ├── queries/              # Homepage, article, landing page, etc. GraphQL documents
│   ├── utils.ts
│   └── next-drupal-graphql.ts
├── types/                    # Generated or hand-written Drupal entity shapes (DrupalLandingPage, etc.)
├── public/
├── styles/
├── tailwind.config.ts
├── next.config.js
├── package.json
├── .env.example              # Template for all required Drupal connection secrets
├── CONTRIBUTING.md
├── README.md
└── CHANGELOG.md
```

## Local Development

```bash
npm install
cp .env.example .env.local
# Edit .env.local — at minimum set NEXT_PUBLIC_DRUPAL_BASE_URL to your DDEV Drupal URL
npm run dev          # http://localhost:3000 with Turbopack hot reload
```

**Before every PR** (from CONTRIBUTING.md):
```bash
npm run lint
npm run format:check
npm run build        # catches type errors and build-time GraphQL issues
```

**Available scripts**:
- `dev`, `build`, `start`, `lint`, `format`, `format:check`

## Environment Variables (critical)

Copy `.env.example` → `.env.local` (never commit the local file).

| Variable | Purpose | Local value example | Docker / prod value |
|----------|---------|---------------------|---------------------|
| `NEXT_PUBLIC_DRUPAL_BASE_URL` | Base URL of the Drupal backend | `https://api.wilkesliberty.dev` (DDEV) or staging internal URL | `https://drupal` (Docker service name) or internal Tailscale URL |
| `NEXT_IMAGE_DOMAIN` | Domain allowed for Next.js image optimizer proxy | `api.wilkesliberty.dev` | `drupal` |
| `NEXT_PUBLIC_SITE_URL` | Canonical public origin (for metadataBase, OG tags) | `http://localhost:3000` | `https://wilkesliberty.com` |
| `DRUPAL_CLIENT_ID` | OAuth2 consumer ID (created in Drupal `/admin/config/services/consumer`) | any local string | Real credential from `infra` SOPS `app_secrets.yml` |
| `DRUPAL_CLIENT_SECRET` | OAuth2 secret | any local string | Real credential |
| `DRUPAL_REVALIDATE_SECRET` | Shared secret for on-demand ISR revalidation (must match Drupal Next module config) | any local string | Real secret |
| `DRUPAL_PREVIEW_SECRET` | Shared secret for draft/preview mode | any local string | Real secret |

**Important auth gotcha** (see `lib/drupal.ts`):
- At Docker **build time** the runtime secrets (`DRUPAL_CLIENT_ID` / `DRUPAL_CLIENT_SECRET`) are **not** injected into the build container.
- The client therefore conditionally omits the `auth` option so `NextDrupalBase` does not throw during module initialization.
- At runtime the docker-compose `.env` supplies the values and authenticated GraphQL queries work normally.
- Public content (homepage, etc.) often bypasses the OAuth client entirely and POSTs directly to `/graphql` to keep builds resilient.

## Connecting to Drupal (three common modes)

1. **Local full-stack dev (recommended when touching content or API)**  
   Run DDEV in the sibling `webcms/` repo (`ddev start`), then point `.env.local` at `https://api.wilkesliberty.dev`.

2. **Frontend-only dev against real staging content** (Tailscale required)  
   `NEXT_PUBLIC_DRUPAL_BASE_URL=https://stg-api.int.wilkesliberty.com`

3. **Production / Docker**  
   The `infra/docker/nextjs/` Dockerfiles and the Ansible `wl-vps-ui` role build the image. The runtime `.env` on the VPS supplies the real OAuth + revalidation secrets.

Whenever you change the Drupal content model (new fields, new content type, new GraphQL exposure), you must:
- Update the corresponding GraphQL query in `lib/queries/`
- Update or extend types in `types/`
- Document the dependency in the PR description
- Coordinate with the backend developer (they should have updated `webcms/docs/FIELD_REFERENCE.md`)

## How the GraphQL Client Works

- `lib/drupal.ts` exports a singleton `drupal` instance of the custom `NextDrupalGraphQL` class.
- `lib/next-drupal-graphql.ts` implements a minimal `query()` helper that POSTs to `/graphql` with `withAuth: true` when credentials are present.
- Many public pages (e.g. homepage) deliberately avoid the authenticated client and hit `/graphql` directly so the build succeeds even when secrets are absent.

If you see build errors about missing OAuth credentials, the pattern above is the usual cause and the fix is to make the query path public or guard the client creation.

## Branch & Deployment Flow

**Branch from `staging`, never directly from `main`** (same rule as webcms).

```
feature/*  →  staging  →  (review)  →  main  (promoted by lead)
```

Production deploys of the UI are **not** triggered from this repo in isolation:
- The `infra/` Ansible role `wl-vps-ui` checks out the `main` branch (or the branch under test), runs `npm ci && npm run build`, and syncs the output to the VPS.
- See `infra/ansible/roles/wl-vps-ui/` and the VPS playbook.

When opening a PR that depends on new Drupal data:
- Explicitly list the required backend changes (content type, fields, GraphQL schema updates, revalidation config, consumer settings, etc.).
- Link the corresponding webcms PR or commit.

## Code Standards & Quality Gates

- **TypeScript strict mode** — no `any` except in the narrowest possible places.
- **ESLint** (Next.js recommended config) — must pass before PR.
- **Prettier** — run `npm run format` before committing.
- **Conventional commits** preferred (`feat:`, `fix:`, `chore:`, `docs:`).
- **Build must succeed locally** (`npm run build`) — this is the only way to catch missing GraphQL fields or type mismatches that only appear at build time.

Pre-PR checklist (from CONTRIBUTING.md):
- [ ] `npm run lint` clean
- [ ] `npm run format:check` clean
- [ ] `npm run build` succeeds
- [ ] No secrets or `.env.local` values committed
- [ ] Any new Drupal data dependencies called out in the PR description

## Common Tasks & Patterns

**Adding a new query**:
1. Add the GraphQL document in `lib/queries/<domain>.ts`.
2. Export a typed fetch function that uses the `drupal.query()` helper (or the direct fetch pattern for public content).
3. Add or update the corresponding TypeScript type in `types/`.
4. Consume it from a Server Component or `getStaticProps`-style function (the project favors the App Router data fetching model).

**Preview / draft mode**:
- The Drupal "Next" module must be configured with the matching `DRUPAL_PREVIEW_SECRET`.
- The route usually lives under `app/api/preview/` or similar — keep the secret comparison timing-safe.

**On-demand revalidation**:
- Drupal calls a webhook (usually `app/api/revalidate/route.ts`) with the `DRUPAL_REVALIDATE_SECRET`.
- The handler calls `revalidatePath` or `revalidateTag` for the affected paths.

**Image handling**:
- All images from Drupal are proxied through Next.js `Image` for optimization.
- The `NEXT_IMAGE_DOMAIN` must be set correctly for the environment or you will get 403s from the optimizer.

## Cross-Repo Coordination (most important for agents)

This frontend is only half the story:

- The **authoritative** description of every Drupal field lives in `webcms/docs/FIELD_REFERENCE.md`.
- When a backend developer adds a field or paragraph bundle, they are supposed to update that file. Read it before writing new queries.
- OAuth2 consumer creation and the Next.js module configuration happen in Drupal after the first install; the resulting secrets are stored encrypted in `infra/ansible/inventory/group_vars/app_secrets.yml`.
- Deployment of both the Drupal image and the Next.js bundle is orchestrated from `infra/`.

If your change touches the data contract, treat the backend and frontend PRs as a single logical unit even if they live in separate repositories.

## Documentation Map

**In this repo (ui/)**:
- [docs/DEVELOPER_SETUP.md](docs/DEVELOPER_SETUP.md) — First-time local environment setup (recommended starting point)
- [docs/README.md](docs/README.md) — Index of UI documentation
- `CONTRIBUTING.md` — Branching, PR process, code standards, pre-PR checklist, production flow
- `README.md` — Tech stack, badges, environment variables, quick start
- `.env.example` — Authoritative list of required environment variables

**Cross-repo / Platform**:
- Root [../AGENTS.md](../AGENTS.md) — Full platform overview, architecture, secrets, deployment
- `infra/AGENTS.md` — Detailed operational reference for infrastructure
- `infra/docs/ENVIRONMENT_OVERVIEW.md` — How the three repositories relate
- `infra/docs/DEVELOPER_SETUP.md` — Workstation setup when you also work on infra
- `webcms/docs/FIELD_REFERENCE.md` — Authoritative source for all Drupal fields (read before writing GraphQL)
- `webcms/docs/DEVELOPER_SETUP.md` — Onboarding for the CMS repo

For deployment, Tailscale, Docker builds, Ansible, or secrets, the answers are in `infra/`.

---

**Last synthesized**: 2026 from `CONTRIBUTING.md`, `README.md`, `.env.example`, `lib/drupal.ts`, `lib/next-drupal-graphql.ts`, and cross-referenced root + infra documentation.

The biggest source of confusion in this repo is the interaction between build-time vs runtime auth and the custom GraphQL transport. When something feels broken around credentials or `/graphql`, look at `lib/drupal.ts` and the direct-fetch pattern used for public pages first.