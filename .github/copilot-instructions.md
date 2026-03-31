# Copilot Instructions — Blueprint Starter Kit

All engineering rules, coding standards, and architectural constraints live in `DOC_UNIVERSAL/`.

## Read Order

Before any implementation, read:

1. `DOC_UNIVERSAL/CORE/CONSTITUTION.md` — non-negotiable rules
2. `DOC_UNIVERSAL/CORE/ENGINEERING-STANDARDS.md` — stack, coding, routing, DS rules
3. `DOC_UNIVERSAL/CORE/QUALITY-GATES.md` — mandatory checks
4. `DOC_UNIVERSAL/CORE/WORKFLOW.md` — execution loop, read order, stop conditions

For frontend tasks, also read:

5. `DOC_UNIVERSAL/STANDARDS/UI-DS-RULES.md` — DS authority, consumption hierarchy
6. `DOC_UNIVERSAL/STANDARDS/APP-STRUCTURE.md` — route groups, shell selection, anti-patterns
7. `src/ds/DESIGN-SYSTEM-ANATOMY.md` — full component catalog, token families

For backend tasks, also read:

5. `DOC_UNIVERSAL/STANDARDS/API-BACKEND-RULES.md` — contracts, services, data access
6. `DOC_UNIVERSAL/STANDARDS/SAAS-FOUNDATIONS.md` — tenancy, auth, billing, stack

## Key Constraints

- **DS-first**: import from `@/ds` only. Shells → primitives → components → semantic classes → Tailwind.
- **Route groups mandatory**: `(marketing)`, `(dashboard)`, `(auth)`, `(docs)`.
- **Route map required**: register all routes in `src/app/route-map.ts`, use `ROUTES.*` constants.
- **Layouts own shells**: root layout is bare; route group layouts wrap one shell each.
- **Pages are thin**: ~80 lines max, extract to `_components/`.
- **Features layer**: `src/features/` for business logic, no UI components.
- **DS is protected**: `consume-only` unless user approves a DS change task.
- **Verify**: `npm run verify` must pass before any task is done.

Do not duplicate these rules. Always refer to `DOC_UNIVERSAL/` as the single source of truth.
