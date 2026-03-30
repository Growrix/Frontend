# API And Backend Rules

Rules for keeping contracts, services, and data access clean and scalable.

## Contract First

- Every endpoint, server action, or mutation must be represented in an API map.
- Define purpose, auth requirement, input shape, output shape, error shape, and side effects.

## Boundary Rules

- Validate input at the entry boundary.
- Authorize before executing protected workflows.
- Keep handlers thin: validate, authorize, delegate, respond.

## Service Rules

- Services own business logic.
- Services orchestrate repositories and integrations.
- Services must be testable without UI concerns.

## Data Access Rules

- Repositories or data modules own persistence access.
- Keep query logic explicit and scoped.
- Avoid broad helper layers that hide behavior.

## Error Rules

- Use explicit error types or well-defined result patterns.
- Avoid silent catch blocks.
- Log failures with useful context and without leaking secrets.

## Scalability Rules

- Plan pagination for list endpoints.
- Design idempotency for external writes where needed.
- Avoid N+1 query patterns.
- Prefer background processing for heavy or retriable side effects.

## Database Change Rules

- Schema impact must be known before implementation.
- Migrations must be reviewed.
- New data models require constraints, indexes, and lifecycle thinking.

## Required Documentation Sync

- Add new routes to the route map when they expose new pages.
- Add new endpoints to the API map.
- Update the plan if architecture or data flow changes materially.