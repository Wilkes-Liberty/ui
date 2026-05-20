# Developer Environment Setup

This guide gets you up and running with the Wilkes Liberty Next.js 15 frontend (ui).

**For the full platform context** (how the frontend connects to Drupal, auth gotchas, deployment, etc.), read:
- [AGENTS.md](../AGENTS.md)
- The root [../../AGENTS.md](../../AGENTS.md)

---

## First-Time Setup Checklist

1. Install Node.js (via nvm recommended)
2. Clone the three sibling repositories
3. Install npm dependencies
4. Configure environment variables (especially Drupal connection)
5. Start the dev server and verify it talks to Drupal

---

## Prerequisites

| Tool          | Version     | Notes |
|---------------|-------------|-------|
| Node.js       | 20+         | Use nvm for easy version management |
| npm           | Bundled     | — |
| Git           | Recent      | — |

We recommend using **nvm** (Node Version Manager):

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | bash
nvm install 20
nvm use 20
```

---

## Clone the Repositories

Clone all three repositories as siblings:

```bash
mkdir -p ~/Repositories
cd ~/Repositories

git clone git@github.com:Wilkes-Liberty/infra.git
git clone git@github.com:Wilkes-Liberty/webcms.git
git clone git@github.com:Wilkes-Liberty/ui.git
```

The `ui` repo needs to be able to reach a running Drupal instance (DDEV for local development).

---

## Initial Setup

```bash
cd ui

npm install

cp .env.example .env.local
```

Edit `.env.local` with appropriate values (see below).

---

## Environment Variables (Critical)

The most common source of problems is incorrect or missing environment variables.

Copy `.env.example` to `.env.local` and fill in the values:

```bash
# Point at your local DDEV Drupal instance
NEXT_PUBLIC_DRUPAL_BASE_URL=https://api.wilkesliberty.dev

# Image optimization domain
NEXT_IMAGE_DOMAIN=api.wilkesliberty.dev

# OAuth2 credentials (create a consumer in Drupal at /admin/config/services/consumer)
DRUPAL_CLIENT_ID=...
DRUPAL_CLIENT_SECRET=...

# Revalidation & Preview secrets (must match Drupal "Next" module config)
DRUPAL_REVALIDATE_SECRET=...
DRUPAL_PREVIEW_SECRET=...
```

**Important notes**:
- For local full-stack development, point at your DDEV Drupal URL.
- When pointing at staging or production Drupal, you need real OAuth2 credentials (ask a team member).
- The custom GraphQL client (`lib/drupal.ts`) gracefully handles missing credentials at build time. See [AGENTS.md](../AGENTS.md) for details on the auth gotcha.

---

## Running the Application

```bash
npm run dev
```

Open http://localhost:3000.

The dev server uses Turbopack for fast hot reloading.

### Useful Scripts

```bash
npm run dev            # Development with Turbopack
npm run build          # Production build (catches many issues)
npm run lint
npm run format
npm run format:check
```

Always run `npm run build` before opening a PR — it surfaces TypeScript and GraphQL query errors that `dev` might miss.

---

## Connecting to Different Drupal Backends

| Environment     | `NEXT_PUBLIC_DRUPAL_BASE_URL`                  | Notes |
|-----------------|------------------------------------------------|-------|
| Local DDEV      | `https://api.wilkesliberty.dev`                | Recommended for active development |
| Staging (Tailscale) | `https://stg-api.int.wilkesliberty.com`     | Requires Tailscale |
| Production      | `https://api.wilkesliberty.com`                | Read-only for most people |

When switching between backends, you may need to restart the dev server so environment variables are picked up.

---

## Working with the Drupal API

- Most data is fetched via a custom GraphQL client (`lib/next-drupal-graphql.ts`).
- Public content often bypasses OAuth for build resilience.
- Authenticated requests (preview, certain queries) require valid `DRUPAL_CLIENT_ID` / `DRUPAL_CLIENT_SECRET`.

If you see authentication-related errors locally, double-check your `.env.local` values and that the corresponding OAuth consumer exists in the target Drupal instance.

See the queries in `lib/queries/` and the types in the `types/` directory for current usage patterns.

---

## Cross-Repo Awareness

- Changes to Drupal content types, fields, or GraphQL schema usually require corresponding updates in this repo.
- Always coordinate with backend developers when the data contract changes.
- The authoritative field reference lives in `webcms/docs/FIELD_REFERENCE.md`.
- Deployment of the built UI is handled by the `infra/` repository (Ansible role `wl-vps-ui`).

---

## Pre-PR Checklist

Before opening a pull request:

- [ ] `npm run lint` passes
- [ ] `npm run format:check` passes
- [ ] `npm run build` succeeds
- [ ] No secrets or `.env.local` values are committed
- [ ] Any new Drupal data dependencies are documented in the PR description

---

## Troubleshooting

| Problem                        | Common Cause                              | Solution |
|--------------------------------|-------------------------------------------|----------|
| App can't reach Drupal         | Wrong `NEXT_PUBLIC_DRUPAL_BASE_URL`       | Update `.env.local` and restart dev server |
| Auth errors on queries         | Missing or incorrect OAuth credentials    | Create consumer in Drupal + update `.env.local` |
| Build fails but dev works      | Type errors or GraphQL schema drift       | Run `npm run build` early and often |
| Images not loading             | `NEXT_IMAGE_DOMAIN` mismatch              | Match the domain of your Drupal instance |
| Stale data after schema change | Dev server cached old schema              | Restart `npm run dev` |

---

## Next Steps

- Read [AGENTS.md](../AGENTS.md) — especially the sections on the custom GraphQL client and auth timing.
- Read [CONTRIBUTING.md](../CONTRIBUTING.md) for branching, PR process, and code standards.
- Explore the root [../../AGENTS.md](../../AGENTS.md) to understand the overall platform and deployment model.
- If you also work on infrastructure, read `infra/docs/DEVELOPER_SETUP.md`.

The biggest "gotcha" in this codebase is the interaction between build-time and runtime authentication for GraphQL. The `AGENTS.md` file explains the design decisions and current patterns in detail.