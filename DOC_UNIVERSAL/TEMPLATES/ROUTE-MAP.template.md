# ROUTE-MAP: [PROJECT NAME]

## Purpose

Single reference for application routes, layouts, and access rules.

## Route Table

| Route | Group | Layout | Access | Navigation | Status | Notes |
|---|---|---|---|---|---|---|
| `/` | marketing | marketing-layout | public | primary-nav | planned | |
| `/login` | auth | auth-layout | public | none | planned | |
| `/dashboard` | dashboard | dashboard-layout | authenticated | sidebar | planned | |

## Rules

- Every new page route must be added here.
- Layout inheritance must be explicit.
- Dashboard routes must not create their own shell.