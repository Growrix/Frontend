# SaaS Foundations

Minimal decision guide for building a professional SaaS product without turning every starter into a kitchen sink.

## Goal

Give AI and developers a compact baseline for choosing the right SaaS infrastructure only when the product actually needs it.

## Required Decisions Before Broad Implementation

- Define the tenancy model: single account, workspace, organization, or true multi-tenant.
- Define the auth owner: external auth provider, database-backed auth, or application-managed auth.
- Define the authorization model: roles, permissions, record scope, and admin boundaries.
- Define the data owner for critical records: user, workspace, organization, or system.
- Define whether the product needs billing, entitlements, trials, invoicing, or usage-based metering.
- Define whether the product needs background jobs, webhooks, scheduled work, or long-running workflows.
- Define what must be observable in production: errors, latency, business events, audit trails, and release toggles.

## Minimal Default SaaS Baseline

- Use PostgreSQL when the product has relational business data, admin workflows, subscriptions, or reporting.
- Use Zod or an equivalent schema layer for input validation at every boundary.
- Use one auth system only.
- Use one primary data access system only.
- Add transactional email only if the product sends login links, invites, onboarding, receipts, or lifecycle notifications.
- Add object storage only if the product stores files, exports, media, or generated documents.
- Add billing only if the product has paid plans, invoices, credits, or metered usage.
- Add a job runner only if the product has retries, webhooks, scheduled tasks, or long-running work.
- Add observability before live customers depend on the product, not after repeated incidents.

## Recommended Optional Stack For This Startup

- Database: PostgreSQL
- Validation: Zod
- Auth: Clerk for fastest SaaS onboarding, Supabase Auth when using Supabase deeply, or Auth.js when you want more ownership of the auth layer
- ORM or query layer: Prisma for productivity on relational apps, or Drizzle for SQL-first control
- Billing: Stripe when monetization exists
- Email: Resend or Postmark for transactional email
- Storage: S3-compatible storage for uploads and generated assets
- Jobs: Inngest or Trigger.dev when background workflows are real
- Error monitoring: Sentry
- Product analytics and feature flags: PostHog when product learning or controlled rollout matters

## Prisma Guidance

Add Prisma when:

- the product has a real relational data model
- the team wants a fast, typed CRUD and migration workflow
- admin panels, subscriptions, reporting, and internal tooling will exist
- the project benefits from a clear schema file and generated client

Delay Prisma when:

- the project is still mostly marketing or prototype work with little persistence
- the team wants SQL-first control and lighter abstractions, in which case Drizzle may fit better
- the stack is already deeply centered on Supabase patterns and direct SQL or RLS-first workflows

If Prisma is selected:

- keep PostgreSQL as the primary relational store
- keep Prisma access in repositories or data modules, never in UI code
- use explicit migrations and review them like application code
- document tenant scoping, indexes, unique constraints, and audit fields intentionally

## Anti-Chaos Rules

- Do not add tools to the starter just because they are popular.
- Do not add two tools for the same concern unless there is a time-boxed migration plan.
- Start from the smallest viable stack, then add capability modules only when the product spec or tasks require them.
- Keep `DOC_UNIVERSAL` opinionated about decisions and boundaries, not overloaded with vendor-specific mandates.