# WilkesLiberty Frontend

[![Next.js](https://img.shields.io/badge/Next.js-15.1.2-black.svg)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.0.0-blue.svg)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.4.5-blue.svg)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4.3-38B2AC.svg)](https://tailwindcss.com/)

Next.js 15 frontend for [wilkesliberty.com](https://wilkesliberty.com), consuming content from a headless Drupal 11 CMS via JSON:API and GraphQL.

> **For frontend developers and agents**: See [AGENTS.md](AGENTS.md) and the root [../AGENTS.md](../AGENTS.md) for cross-repo context, environment variables, and production flow.

**Current focus**: Stable consumption of the Drupal GraphQL schema and preparation for any preview/revalidation changes coming from the Keycloak + Next.js integration work.

**New contributors**: Start with [docs/DEVELOPER_SETUP.md](docs/DEVELOPER_SETUP.md).

## Tech Stack

| Component | Version | Role |
|-----------|---------|------|
| Next.js | 15.1.2 (App Router) | Framework |
| React | 19.0.0 | UI library |
| TypeScript | 5.4.5 | Type safety |
| Tailwind CSS | 3.4.3 | Styling |
| next-drupal | 2.0.0-beta.1 ⚠️ | Drupal integration |
| Turbopack | built-in | Dev bundler |

> **Note — `next-drupal` beta**: The project uses `next-drupal@2.0.0-beta.1`, which targets Next.js 15 App Router. The 1.x stable release only supports the Pages Router; there is no stable 2.x release yet. The beta has been in use since early 2025 and is stable for our usage patterns (ISR, JSON:API, GraphQL, preview mode). Watch the [next-drupal releases page](https://github.com/chapter-three/next-drupal/releases) and upgrade to the stable 2.0.0 when it ships.

## Local Development

```bash
# Install dependencies
npm install

# Copy environment template
cp .env.example .env.local
# Edit .env.local — set NEXT_PUBLIC_DRUPAL_BASE_URL to your DDEV Drupal URL

# Start dev server (http://localhost:3000)
npm run dev
```

### Environment Variables

```bash
# .env.local — never commit this file

# Drupal backend URL (use DDEV URL for local dev, internal Docker hostname for Docker)
NEXT_PUBLIC_DRUPAL_BASE_URL=https://api.wilkesliberty.dev

# Domain for Next.js image optimization proxy
# Local: api.wilkesliberty.dev  |  Docker: drupal
NEXT_IMAGE_DOMAIN=api.wilkesliberty.dev

# OAuth2 consumer credentials (create in Drupal at /admin/config/services/consumer)
DRUPAL_CLIENT_ID=drupal-client
DRUPAL_CLIENT_SECRET=your-client-secret

# ISR revalidation secret — must match Drupal's next module config
DRUPAL_REVALIDATE_SECRET=your-revalidation-secret

# Optional: Draft/preview mode
DRUPAL_PREVIEW_SECRET=your-preview-secret
```

## Available Scripts

```bash
npm run dev          # Dev server with Turbopack (hot reload)
npm run build        # Production build
npm run start        # Start production server (after build)
npm run lint         # ESLint
npm run format       # Prettier format
npm run format:check # Check formatting (used in CI)
```

## Project Structure

```
ui/
├── app/                    # Next.js App Router
│   ├── [...slug]/          # Dynamic catch-all routes (Drupal paths)
│   ├── api/
│   │   ├── draft/          # Preview/draft mode route
│   │   └── revalidate/     # On-demand ISR revalidation
│   ├── layout.tsx          # Root layout
│   └── page.tsx            # Homepage
├── components/             # Reusable UI components
├── lib/                    # Utility functions, Drupal client config
├── public/                 # Static assets
├── styles/                 # Global CSS
├── types/                  # TypeScript type definitions
└── next.config.js          # Next.js config (output: standalone)
```

## Drupal Integration

This frontend connects to Drupal using the `next-drupal` library.

**Required Drupal modules**: `drupal/next`, `drupal/simple_oauth`, `drupal/graphql`, `drupal/decoupled_router`

**ISR Revalidation**: When content is published/updated in Drupal, it calls the `/api/revalidate` route to clear the Next.js page cache. This requires `DRUPAL_REVALIDATE_SECRET` to match the secret configured in Drupal's Next.js module settings.

**Draft/Preview**: Preview mode is enabled via the `/api/draft` route and requires `DRUPAL_PREVIEW_SECRET`.

## Deployment

### Production (Njalla VPS — Docker)

Production Next.js runs in a Docker container on the Njalla VPS. The image is built by the infra repo's `docker/nextjs/Dockerfile.prod`, which uses `output: 'standalone'` in `next.config.js`.

```bash
# Build is handled by the infra repo Dockerfile
# The Docker image is built from ~/Repositories/ui as the build context
# NEXT_PUBLIC_DRUPAL_BASE_URL points to the on-prem server Drupal via Tailscale
```

The production container communicates with Drupal over Tailscale (on-prem server ↔ Njalla VPS mesh VPN).

### Staging (on-prem server — Docker)

Staging Next.js runs on the on-prem server at port `3010`. It's part of the staging Docker Compose stack (`~/nas_docker_staging/`) and communicates with the staging Drupal container on the same Docker network.

### Development on on-prem server

For testing with the full Docker stack:
```bash
docker compose -f docker-compose.yml -f docker-compose.dev.yml up -d
# Mounts ~/Repositories/ui into the container with hot reload
```

## Branch Strategy

Three branches, kept in lockstep automatically by
[`.github/workflows/sync-branches.yml`](.github/workflows/sync-branches.yml):

- `master` — production-ready code. Feature/fix PRs target this branch.
  Production Next.js on the Njalla VPS is rebuilt from `master` via the
  `infra` repo's `make vps` (and the future VPS deploy workflow).
- `staging` — auto-synced from `master` on every push. The push triggers
  `infra/deploy-staging.yml`, which rebuilds the staging Next.js
  container on the on-prem server (port 3010).
- `development` — auto-synced from `master` on every push. No deploy;
  WIP integration baseline (run locally against a DDEV Drupal).
- `feature/*` — feature branches; pull requests target `master`.

## Code Standards

- **TypeScript**: strict mode enabled (`tsconfig.json`)
- **ESLint**: Next.js recommended config
- **Prettier**: consistent formatting (run before committing)
- **Conventional Commits**: `feat:`, `fix:`, `chore:`, `docs:` prefixes

```bash
# Check everything before pushing
npm run lint && npm run format:check
```

## Troubleshooting

| Problem | Solution |
|---------|----------|
| Build fails | Check Node version (`node --version`, requires 18.17+). Clear `.next`: `rm -rf .next` |
| Drupal connection error | Verify `NEXT_PUBLIC_DRUPAL_BASE_URL` is reachable. Check CORS config in Drupal |
| Images not loading | Check `NEXT_IMAGE_DOMAIN` matches the actual Drupal hostname |
| Revalidation not working | Verify `DRUPAL_REVALIDATE_SECRET` matches Drupal's Next.js module config |
| Port 3000 in use | `lsof -i :3000` to find the process, or use `PORT=3001 npm run dev` |
| node_modules issues | `rm -rf node_modules && npm install` |
| Next.js params error | Params must be awaited in Next.js 15: `const { slug } = await params` |

## Useful Links

- [Next.js Documentation](https://nextjs.org/docs)
- [next-drupal Documentation](https://next-drupal.org)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [App Router Migration Guide](https://nextjs.org/docs/app/building-your-application/upgrading/app-router-migration)

---

**Last Updated**: March 2026
