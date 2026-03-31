# Next.js Build Spec

## Objective

Define the app rebuild work after the DS is ready. This phase rebuilds the target experience in Next.js using `@/ds` only.

## 1. Required References

- `DOC_UNIVERSAL/STANDARDS/APP-STRUCTURE.md`
- `DOC_UNIVERSAL/STANDARDS/UI-DS-RULES.md`
- `src/app/layout.tsx`
- `src/app/globals.css`
- `src/app/route-map.ts`
- active `prototype-intake`
- approved `ds-gap-audit`
- approved `ds-build-spec`

## 1.1 Target Paths

- Target app root:
- Target route-map path:
- Target feature root if needed:

## 2. Route Plan

| Route | Route Group | Shell | Source Prototype Screen | Notes |
|-------|-------------|-------|-------------------------|-------|
|       |             |       |                         |       |

## 3. Page Extraction Plan

| Route | Page File | Co-Located Components | Feature Imports | Notes |
|-------|-----------|-----------------------|-----------------|-------|
|       |           |                       |                 |       |

## 4. Build Rules

- Use route groups only.
- Use one shell per route group layout.
- Keep page files thin.
- Use `src/features/` for business logic if needed.
- Use `ROUTES.*` from `src/app/route-map.ts`.
- Do not import DS internals.
- Do not reintroduce hardcoded prototype styles into app code.

## 5. Verification Expectations

- visual parity with prototype
- responsive parity where prototype defines it
- interaction parity for scoped flows
- route map updated
- build, lint, test, DS audit, and DS a11y all green

## 6. Non-Goals

- No speculative redesign
- No unrelated route refactors
- No DS changes unless a new DS task is opened explicitly

## 7. Exit Criteria

- [ ] all scoped routes built in Next.js
- [ ] all route files follow app structure rules
- [ ] parity checklist completed
- [ ] verification commands pass
