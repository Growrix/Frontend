# Constitution

Non-negotiable rules for all AI and developer execution.

## Authority

- This file is the highest authority inside `DOC_UNIVERSAL`.
- Project work must still follow the active project execution docs.
- `VENDOR/` and `REFERENCE/` are never source of truth.

## Protected Design System

- The existing Blueprint Design System is a protected system asset.
- Protected DS areas include `src/ds/**`, `src/app/globals.css` DS import wiring, and `src/ds/SEMANTIC-CLASSES-REGISTRY.md`.
- Default policy is `consume-only`.
- No AI or developer may edit DS internals, barrel exports, token layers, theme wiring, runtime presets, or semantic registry files unless the user explicitly approves a DS task.
- If a screen need appears missing, first solve it by consuming the current DS correctly. If a real gap remains, create a separate approved DS change task instead of modifying the DS during feature work.

## Non-Negotiable Rules

- No implementation without an active `tasks.md`.
- No task may start without a clear objective, scope, refs, verification commands, and done criteria.
- No hardcoded UI values when a design system or token system exists.
- No direct imports from DS internals in app or feature code; import from `@/ds` only.
- No duplicate dashboards, layouts, sidebars, nav systems, or routing patterns.
- No unauthorized edits to the Design System during normal feature implementation.
- No direct database access from UI layers.
- No cross-tenant data access, tenant context leaks, or ambiguous ownership boundaries.
- No business logic buried in page files or route handlers.
- No API shape invented ad hoc; use an API map and explicit response contract.
- No billing, webhook, or external write flow without idempotency and reconciliation thinking.
- No schema change without an explicit migration path and rollback note.
- No secrets, credentials, tokens, or machine-specific absolute paths in docs.
- No skipped verification gates.
- No unrelated refactors during active task execution.
- No silent assumptions; unknowns must be written down.

## Execution Discipline

- One active task at a time per runner session.
- Load the minimum relevant context.
- Prefer small diffs over broad rewrites.
- Stop and record blockers instead of improvising architecture.
- Update task status and execution notes immediately after meaningful progress.

## Documentation Discipline

- `DOC_UNIVERSAL` defines how to work.
- Project docs define what to build.
- Technical handbooks explain best practices.
- Reference materials may inspire, but they do not control execution.

## Escalation Conditions

Stop and ask for confirmation if:

- the task conflicts with existing architecture
- the task requires destructive data changes
- the requirement is ambiguous enough to create product risk
- the existing system violates the rules and the fix would broaden scope significantly
- the task requires domain knowledge (billing, webhooks, jobs, migrations, etc.) not covered by operational rules — check `CORE/HANDBOOK-ROUTING.md` before inventing patterns

## Definition Of Professional Output

Professional output means:

- clear layering
- disciplined use of the protected Design System
- consistent routing and layout inheritance
- token-driven UI
- typed contracts
- validated input
- tenant-safe data boundaries
- secure defaults
- operational visibility for critical flows
- testable units
- traceable changes
- reversible releases