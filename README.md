# Blueprint Starter Kit

Next.js startup kit with a protected design system, an AI operating system, and reusable handbook/reference docs for building SaaS projects in a controlled way.

## Start Here

Read `DOC_UNIVERSAL/README.md` first.

That file defines:
- the authority model
- the AI read policy
- what to load for frontend, creative frontend, backend, and domain-specific tasks
- how `DOC_UNIVERSAL/`, `DOC/`, and `src/ds/` relate to each other

## What This Repo Contains

- `src/` — live Next.js app and the protected Blueprint Design System
- `DOC_UNIVERSAL/` — operational system for AI and humans
- `DOC_UNIVERSAL/DDS/` — Design Decision System for creative frontend work
- `DOC/` — reference handbooks, build playbooks, migration packets, and feature documentation
- `DOC_WORKING/` — local working area for prompts and in-progress notes

## Folder Roles

- `src/ds/` — implementation-owned DS code and DS-owned live docs
- `DOC_UNIVERSAL/CORE/` — always-on rules and workflow
- `DOC_UNIVERSAL/STANDARDS/` — engineering standards for UI, structure, backend, and SaaS foundations
- `DOC_UNIVERSAL/DDS/` — creative direction, modes, presets, and wireframe decision system
- `DOC/DS BUILDING/` — DS theory and handbook chapters
- `DOC/SAAS HANDBOOK/` — domain reference chapters for billing, jobs, privacy, integrations, and related SaaS topics

## Working Model

- The Design System is the implementation authority.
- `DOC_UNIVERSAL` is the operating authority.
- `DOC` is reference and planning space.
- Tasks should load only the minimum relevant context, not the full tree.

## Commands

- `npm run dev` — start local development
- `npm run verify` — run typecheck, lint, tests, build, DS audit, and DS a11y gates
- `npm run ds:audit` — DS token and registry consistency checks

## Notes

- Keep `.github/` for repo automation and instructions.
- Keep `DOC_WORKING/` as a local working space if it helps your workflow.
- Do not treat the root README as the full rulebook. Use `DOC_UNIVERSAL/README.md` for that.

## Contributing

See `CONTRIBUTING.md` and `DOC_UNIVERSAL/README.md` before making changes.
