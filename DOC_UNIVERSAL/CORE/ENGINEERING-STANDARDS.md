# Engineering Standards

Compact engineering rules that must stay active for every build.

## Current Base Stack

- Blueprint Design System
- Next.js
- React
- Tailwind CSS

This stack is not four equal styling authorities. The Design System owns shared UI behavior and visual rules. Next.js and React provide the application structure. Tailwind is supportive, not the source of truth for visual system decisions.

## System Design

- Use explicit layers: UI, application entry, services, data access, integrations, shared types.
- Enforce one-way dependency flow from UI toward infrastructure.
- Keep abstractions narrow and purposeful.

## Clean Coding

- Prefer simple, readable code over clever compression.
- Keep functions and components focused on one responsibility.
- Use descriptive names for files, functions, variables, and types.
- Avoid duplication; extract shared logic when repetition becomes real.
- Keep side effects explicit and close to the boundary that owns them.
- Comments should explain intent or non-obvious constraints, not restate the code.
- Avoid dead code, placeholder branches, and speculative abstractions.
- Keep public contracts stable and explicit.

## Frontend

- Prefer shared layouts and centralized navigation.
- Prefer reusable components over page-specific clones.
- Every screen must handle loading, empty, error, success, and disabled states.
- Responsive behavior is mandatory, not a polish step.

## Design System

- The existing DS in `src/ds/` is the primary UI authority.
- Import UI from `@/ds` only.
- Use shells first, then DS primitives/components, then semantic classes.
- Apply runtime knobs such as `data-platform`, `data-density`, and `data-visual` at the page root or shell wrapper.
- No hardcoded colors, spacing, shadows, radii, typography shortcuts, or arbitrary one-off visual constants in feature code.
- Do not edit the DS during feature work unless the task is explicitly approved as a DS change.

## UI Delivery Modes

- `app-like-plus-desktop`: use desktop shells for large screens and DS runtime app surfaces or presets for mobile/tablet experiences that should feel application-first.
- `desktop-plus-responsive`: use shared desktop/web shells as the base structure and adapt responsively without switching into app runtime surfaces unless explicitly requested.

Every frontend plan must declare one of these modes before implementation.

## Tailwind Role

- Prefer DS composition before Tailwind composition.
- Tailwind may support local structure or framework interop where DS does not already provide an equivalent.
- Tailwind must not replace DS-managed colors, typography, spacing scale, shadows, radii, or theme logic.
- Avoid feature-level `dark:` logic or raw color utilities when the DS already covers the need.

## Stack Usage Instructions

- Next.js App Router is the default routing model.
- Prefer server-first rendering patterns and use client components only where interactivity truly requires them.
- React components should stay presentational unless they explicitly own orchestration or interaction concerns.
- Tailwind should support composition, not become a second design system.
- Each starter project should expose predictable scripts for `build`, `lint`, `test`, and ideally a single `verify` command.
- Starter projects should include `DOC_UNIVERSAL`, the protected DS, and project execution docs before autonomous work begins.

## Routing And App Structure

- Every route must belong to a Next.js route group: `(marketing)`, `(dashboard)`, `(auth)`, `(docs)`, etc.
- No top-level route folders outside groups. Route groups define shell boundaries.
- Route structure must be defined before page creation.
- Every route must be registered in `src/app/route-map.ts`. All `<Link href>` and `router.push()` calls must use `ROUTES.*` constants.
- Dashboard pages must inherit from a shared dashboard shell via the route group layout.
- Navigation config must be centralized per route group in a single file, not duplicated across components.
- Root `layout.tsx` contains only: fonts, `<ThemeInitScript />`, `globals.css` import, skip-link, `<html>` + `<body>`. No shell, no navigation, no business logic.
- Route group `layout.tsx` wraps children in exactly one DS shell. No conditional shell rendering.
- Page files must be thin (~80 lines max). Extract heavy views to `_components/`.
- `_components/` are co-located and route-scoped. Never import across route group boundaries.
- `src/features/` holds business logic, domain types, services, adapters. No React components.
- Mobile/tablet behavior comes from DS runtime props (`data-platform`, `data-density`), not conditional shell rendering or pathname-gating.

See `STANDARDS/APP-STRUCTURE.md` for the full recommended shape, shell selection table, file placement summary, routing checklist, and anti-patterns.

## API And Backend

- Every endpoint or server action must have a clear contract.
- Validate input at the boundary.
- Keep route handlers thin; move business logic into services.
- Keep data access isolated and explicit.

## Database

- Schema changes must be deliberate, reviewable, and reversible when possible.
- Define constraints, foreign keys, indexes, and audit fields intentionally.
- Avoid magical behavior hidden in database access helpers.

## Professional SaaS Baseline

- Decide the tenancy model before broad feature work: single-tenant, workspace-based, or true multi-tenant.
- Keep authentication, authorization, and entitlements separate. They are related, but they are not the same concern.
- Treat billing as a domain boundary, not a UI toggle. Plan plan-state sync, webhook reconciliation, and downgrade behavior deliberately.
- Design external writes, webhooks, and async workflows for idempotency, retries, and safe replay.
- Use feature flags for risky releases, staged rollouts, or migrations that may need rapid containment.
- Critical product journeys should emit traceable logs, correlation IDs, and business-level events that support debugging and support operations.
- Environment validation, migration discipline, and rollback thinking are baseline SaaS requirements, not later hardening work.

## Optional Stack Modules

- Add stack modules because the product needs a capability, not because the starter can carry them.
- Prefer one clear tool per concern. Avoid overlapping auth, ORM, queue, analytics, or feature-flag systems.
- A practical default stack for many SaaS projects is: PostgreSQL, Zod, one auth system, one data access system, one billing provider when monetization exists, one email provider when transactional email exists, one job runner when async workflows exist, and one observability path.
- Good optional defaults for this startup are usually: PostgreSQL, Prisma or Drizzle, Clerk or Supabase Auth or Auth.js, Stripe, Resend, S3-compatible object storage, Inngest or Trigger.dev, Sentry, and PostHog.
- Never install Prisma and Drizzle together in the same starter unless there is an exceptional migration reason.
- Never install billing, queues, advanced analytics, or feature-flag platforms by default if the current project has no product need for them.

## Security

- Least privilege everywhere.
- Authentication and authorization are separate concerns and must both be enforced.
- Secrets live in environment management only.
- PII and user-scoped data require explicit handling rules.

## Testing And Quality

- Business logic should be unit testable.
- Cross-layer behavior should have integration coverage where risk is meaningful.
- Core journeys should have end-to-end validation.
- Build, lint, and type safety are baseline, not optional.

## Git And Delivery Hygiene

- Prefer feature branches for implementation work.
- Keep commits scoped and explainable.
- Do not mix broad refactors with feature delivery unless the task explicitly includes both.
- Protect main or production branches from unattended automation by default.

## Observability

- Important flows must be debuggable through logs and error traces.
- Failures should be visible, actionable, and tied to the affected workflow.

## Documentation

- Keep task files current.
- Keep API map and route map aligned with implementation.
- Keep DS policy and UI mode explicit in plan/task docs for frontend work.
- Record unknowns and deviations explicitly.

Use the files in `STANDARDS/` for more specific implementation rules.