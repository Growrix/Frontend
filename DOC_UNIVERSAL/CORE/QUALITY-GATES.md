# Quality Gates

No task is done until the required gates pass.

## Baseline Gates

Every implementation task must pass the relevant subset of:

- build
- lint
- typecheck
- unit tests
- integration tests
- end-to-end tests for critical flows
- route map sync check
- API map sync check
- design system compliance check

Starter projects should also define one stable verification command, ideally `npm run verify`, so autonomous runners can use a single entry point.

## Mandatory UI Checks

- no hardcoded visual values where DS/tokens exist
- no duplicate page shells or navigation systems
- all required UI states exist
- responsive behavior verified
- basic accessibility verified
- shared shell landmarks and skip-link targets verified

## Mandatory Design System Checks

- frontend task declares UI mode and DS policy
- app or feature UI imports use `@/ds`
- no direct imports from DS internals
- no unauthorized edits under `src/ds/**`
- no unauthorized edits to `src/ds/SEMANTIC-CLASSES-REGISTRY.md`
- no unauthorized changes to DS global wiring in `src/app/globals.css`
- page shell choice is explicit and consistent with the route type
- root knobs such as `data-platform`, `data-density`, and `data-visual` are applied intentionally, not scattered across leaf nodes
- Tailwind utilities do not bypass DS visual authority
- if an approved DS change exists, `src/ds/index.ts` and related docs are updated together when needed
- `npm run ds:audit` passes (no undefined tokens, registry sync)
- `npm run ds:a11y` passes (DS accessibility test suite)
- for approved DS changes, `src/ds/DS-COVERAGE-CHECKLIST.md` is followed before merge

## Mandatory Backend Checks

- boundary validation exists
- auth and authorization rules are enforced
- tenant or workspace scoping is explicit and verified
- response and error shapes are explicit
- service and data layers are not mixed
- logging or trace points exist for critical workflows

## Mandatory SaaS Checks

- migrations are reviewed for forward path and rollback impact
- billing or entitlement changes define source of truth and reconciliation behavior
- external writes, jobs, and webhooks define idempotency and retry behavior
- feature flag or staged rollout strategy exists when the blast radius is meaningful
- observability exists for critical flows that can impact revenue, access, or data integrity

## Mandatory Documentation Checks

- task status updated
- verification results recorded
- new routes added to route map
- new endpoints added to API map
- notable architecture changes reflected in plan/spec if needed

## Hard Blockers

Do not mark complete if any of these are true:

- build fails
- types fail
- tests required by the task fail
- route or API contract is undocumented
- security-sensitive change has no auth review
- tenant boundary or entitlement logic is unclear
- migration or webhook behavior is unsafe or undocumented
- UI introduces hardcoded values against the system rules
- DS files were changed without explicit approval
- unattended automation is configured to push directly to a protected branch without explicit approval
- developer or AI cannot explain what changed and why

## Release Readiness

Before release or merge of significant work:

- rollback path is known
- migration impact is known
- feature flags are set when needed
- monitoring implications are understood
- frontend batches intended for push have passed manual visual review