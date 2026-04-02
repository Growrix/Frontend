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
8. `src/ds/SEMANTIC-CLASSES-REGISTRY.md` — available semantic classes

For creative frontend tasks such as homepages, landing pages, marketing sites, visual redesigns, theme creation, or wireframes, also read:

9. `DOC_UNIVERSAL/DDS/README.md` — Design Decision System entry point
10. `DOC_UNIVERSAL/DDS/OPERATING/DESIGN-DECISION-SYSTEM.md` — site/page creative decision model
11. `DOC_UNIVERSAL/DDS/OPERATING/AI-EXECUTION-FLOW.md` — step-by-step creative workflow

For full public websites, reusable templates, or market-specific theme families, also read:

12. the selected file from `DOC_UNIVERSAL/DDS/ARCHETYPES/` — site-level website strategy

Then load based on task: page taxonomy, mode selection, creative direction, wireframe standards, or theme preset system from `DDS/OPERATING/`. Load the specific mode from `DDS/MODES/` and preset from `DDS/PRESETS/` only after the design decision is made.

For backend tasks, also read:

5. `DOC_UNIVERSAL/STANDARDS/API-BACKEND-RULES.md` — contracts, services, data access
6. `DOC_UNIVERSAL/STANDARDS/SAAS-FOUNDATIONS.md` — tenancy, auth, billing, stack

## Handbook Routing (On-Demand Only)

When a task touches billing, webhooks, jobs, tenant lifecycle, domain modeling, data privacy, email, file storage, caching, rate limiting, migrations, admin ops, real-time, or analytics:

- Read `DOC_UNIVERSAL/CORE/HANDBOOK-ROUTING.md` to find the correct chapter.
- Load the specific chapter from `DOC/SAAS HANDBOOK/` — not the full handbook.

When a task requires DS theory or component design rationale:

- Load the specific chapter from `DOC/DS BUILDING/HandBook_Frontend/` (chapters 00–20).

When a task needs stack-specific implementation guidance (Next.js architecture, auth, security, CI/CD, testing):

- Load only the relevant subset from `DOC_UNIVERSAL/STACK_PROFILES/NEXTJS-SAAS/`.

**Rule**: Handbooks are reference, not operational authority. CORE rules always win.

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
