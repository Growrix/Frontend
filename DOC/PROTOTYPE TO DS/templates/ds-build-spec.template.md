# DS Build Spec

## Objective

Define the DS-only implementation work required to make the current Blueprint DS capable of expressing the prototype accurately.

## 1. Scope

### Allowed DS Areas

- `src/ds/index.ts`
- `src/ds/styles/`
- `src/ds/primitives/`
- `src/ds/components/`
- `src/ds/layouts/`
- `src/ds/runtime/`
- `src/ds/foundation/`
- `src/ds/DESIGN-SYSTEM-ANATOMY.md`
- `src/ds/SEMANTIC-CLASSES-REGISTRY.md`
- DS tests under `src/ds/**/__tests__/`

### Forbidden During This Phase

- `src/app/**` rebuild work
- feature logic unrelated to DS
- backend, auth, billing, or data model changes

## 2. Change List

| Item | Type | Target Files | Acceptance Criteria |
|------|------|--------------|---------------------|
|      | token / utility / primitive / component / shell / runtime | | |

## 3. Test Requirements

- `npm run typecheck`
- `npm run lint`
- `npm test`
- `npm run build`
- `npm run ds:audit`
- `npm run ds:a11y`

## 4. Documentation Requirements

- [ ] `src/ds/index.ts` updated if public API changes
- [ ] `src/ds/DESIGN-SYSTEM-ANATOMY.md` updated if architecture/catalog changes
- [ ] `src/ds/SEMANTIC-CLASSES-REGISTRY.md` updated for new `ui-*` classes
- [ ] tests added or updated in the correct DS test suites

## 5. Non-Goals

- No page reconstruction
- No route creation
- No app-specific one-off styling
- No prototype code copy-paste into DS internals

## 6. Exit Criteria

- [ ] DS can express all required prototype patterns for the scoped migration
- [ ] verification commands pass
- [ ] DS docs and tests are synchronized
- [ ] remaining work is app consumption only
