# Features layer

This folder is the **business-logic boundary** for the app.

## Purpose
- Put application "features" here (use-cases, domain logic, data mappers, server/client adapters).
- Keep the Design System (`src/ds/`) purely about UI (tokens → themes → primitives → components → layouts).

## Rules
- **No UI components here** (no React components meant for rendering). UI belongs in `src/ds/`.
- Pages/routes may import from `src/features/**`.
- Features may import types/utilities, and may call APIs, but must not depend on DS.

## Suggested structure (add as needed)
- `src/features/<feature>/` (domain, services, schema, adapters)
- `src/features/shared/` (cross-feature utilities)
