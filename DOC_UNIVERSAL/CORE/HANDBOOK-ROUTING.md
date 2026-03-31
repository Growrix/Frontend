# Handbook Routing

When to consult reference handbooks during execution.

## Purpose

This file bridges the operational system (DOC_UNIVERSAL) to the reference handbooks. It tells AI and developers **when** to load a handbook chapter — not by default, only when a task touches that domain.

## Rule

Handbooks are reference material. They do not override CORE rules, STANDARDS, or active project docs. They provide depth when the operational rules say *what* to do but the task requires understanding *how* or *why*.

## Routing Table

| Task domain | Load from | Specific chapters |
|---|---|---|
| Billing, payments, subscriptions, pricing, plans | `DOC/SAAS HANDBOOK/` | PART-02-BILLING |
| Webhooks, third-party API sync, external integrations | `DOC/SAAS HANDBOOK/` | PART-05-EXTERNAL-INTEGRATIONS |
| Background jobs, queues, async processing | `DOC/SAAS HANDBOOK/` | PART-04-BACKGROUND-JOBS |
| Tenant lifecycle, org/workspace model, seat management | `DOC/SAAS HANDBOOK/` | PART-03-TENANT-LIFECYCLE |
| Domain modeling, aggregates, bounded contexts, events | `DOC/SAAS HANDBOOK/` | PART-01-DOMAIN-MODELING |
| Data privacy, PII, retention, deletion, consent, audit | `DOC/SAAS HANDBOOK/` | PART-06-DATA-PRIVACY |
| Email, notifications, deliverability | `DOC/SAAS HANDBOOK/` | PART-07-EMAIL-NOTIFICATIONS |
| File uploads, storage, media processing | `DOC/SAAS HANDBOOK/` | PART-08-FILE-STORAGE |
| Caching strategy, invalidation, cache failure | `DOC/SAAS HANDBOOK/` | PART-09-CACHING |
| Rate limiting, abuse prevention, throttling | `DOC/SAAS HANDBOOK/` | PART-10-RATE-LIMITING |
| Schema changes, migrations, backfill, deprecation | `DOC/SAAS HANDBOOK/` | PART-11-SCHEMA-EVOLUTION |
| Admin tooling, impersonation, support workflows | `DOC/SAAS HANDBOOK/` | PART-12-ADMIN-OPERATIONS |
| Real-time, WebSockets, presence, live updates | `DOC/SAAS HANDBOOK/` | PART-13-REAL-TIME |
| Analytics, funnels, product metrics, A/B testing | `DOC/SAAS HANDBOOK/` | PART-14-ANALYTICS |
| Design system theory, tokens, components, a11y, i18n | `DOC/DS BUILDING/HandBook_Frontend/` | Relevant chapter (00–20) |

## When NOT To Load Handbooks

- Do not load handbooks during the default read order.
- Do not load handbooks for tasks that are fully covered by STANDARDS or STACK_PROFILES.
- Do not load more than 2 handbook chapters per task.
- If the operational rule in ENGINEERING-STANDARDS already gives a clear MUST/MUST NOT for the topic, the handbook is optional context — not required reading.

## Conflict Resolution

If a handbook chapter contradicts an operational rule:

1. The operational rule wins (CONSTITUTION > WORKFLOW > ENGINEERING-STANDARDS > QUALITY-GATES).
2. Record the conflict in the task notes.
3. Do not silently follow the handbook over the operational system.
