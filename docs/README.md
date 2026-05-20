# UI Documentation

Documentation for the Wilkes Liberty Next.js 15 frontend.

## Getting Started

| Document | Purpose |
|----------|---------|
| [DEVELOPER_SETUP.md](DEVELOPER_SETUP.md) | First-time local environment setup (recommended starting point) |
| [../CONTRIBUTING.md](../CONTRIBUTING.md) | Branching, PR process, code standards, and production flow |
| [../README.md](../README.md) | Tech stack, badges, environment variables, quick start |
| [../AGENTS.md](../AGENTS.md) | Deeper guidance for developers and agents |

## Key Topics

- Environment variable configuration (especially the Drupal connection and OAuth2/auth gotchas)
- Working with the custom GraphQL client (`NextDrupalGraphQL`)
- Connecting to local DDEV, staging (Tailscale), or production Drupal instances
- Build-time vs runtime authentication considerations

## Cross-Repo

- `webcms/docs/FIELD_REFERENCE.md` — Authoritative Drupal field specs (read before writing new queries)
- Root [../../AGENTS.md](../../AGENTS.md) and `infra/AGENTS.md` — Platform architecture and deployment

See [../AGENTS.md](../AGENTS.md) for deeper architectural guidance and cross-repo context.