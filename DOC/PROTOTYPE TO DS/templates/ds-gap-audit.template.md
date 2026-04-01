# DS Gap Audit

## Objective

Map the prototype to the current Blueprint DS and identify exactly what the DS already covers, what is missing, and what must be built before any app reconstruction begins.

## 1. DS Read Set

Required references:

- `src/ds/DESIGN-SYSTEM-ANATOMY.md`
- `src/ds/DS-COVERAGE-CHECKLIST.md`
- `src/ds/SEMANTIC-CLASSES-REGISTRY.md`
- `DOC_UNIVERSAL/STANDARDS/UI-DS-RULES.md`

## 2. Existing Coverage Map

| Prototype Pattern | Existing DS Token/Class/Component | Coverage Level | Notes |
|-------------------|-----------------------------------|----------------|-------|
|                   |                                   | full / partial / none | |

## 3. Token Gaps

| Gap | Needed Token Family | Why | Candidate File |
|-----|---------------------|-----|----------------|
|     |                     |     | `src/ds/styles/ds.tokens.css` |

## 4. Utility / Semantic Class Gaps

| Gap | Needed Class | Why | Candidate File |
|-----|--------------|-----|----------------|
|     |              |     | `src/ds/styles/ds.utilities.css` |

## 5. Component Gaps

| Gap | Needed DS Primitive/Component | Why | Candidate Files |
|-----|-------------------------------|-----|-----------------|
|     |                               |     |                 |

## 6. Shell / Runtime Gaps

| Gap | Needed Shell/Runtime Support | Why | Candidate Files |
|-----|------------------------------|-----|-----------------|
|     |                              |     |                 |

## 7. Documentation Sync Required

- `src/ds/DESIGN-SYSTEM-ANATOMY.md`
- `src/ds/SEMANTIC-CLASSES-REGISTRY.md`
- `src/ds/index.ts`
- relevant tests under `src/ds/**/__tests__/`

## 8. Decision Summary

After completing the coverage map and gap sections above, summarize the decisions here. Do not duplicate the implementation details — those go into `ds-build-spec.template.md`.

### Gaps That Require DS Changes

List each gap category and the number of items. The concrete change list with acceptance criteria goes into `templates/ds-build-spec.template.md`.

- Tokens:
- Utilities/semantic classes:
- Primitives:
- Components:
- Shells/runtime:

### Already Covered By DS (no changes needed)

-

### Explicit Non-Goals (will not be built)

-

## 9. Gate To Exit This Phase

- [ ] Every critical prototype pattern is mapped to an existing or planned DS primitive
- [ ] Missing token and utility work is explicit
- [ ] DS work scope is isolated from app work
- [ ] No unresolved visual gap remains undefined
