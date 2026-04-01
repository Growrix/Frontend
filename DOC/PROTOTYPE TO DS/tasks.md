# Tasks: Prototype -> DS -> Next.js Rebuild

**Input**: Active files from `DOC/PROTOTYPE TO DS/`
**User Entry Point**: `DOC/PROTOTYPE TO DS/START-HERE.md`
**Prerequisites**: `README.md`, `REFERENCES.md`, all templates in `templates/`

## Execution Flow (main)
```
1. Load prototype-intake template and fill scope lock
   -> If prototype path, UI mode, or scope is missing: ERROR "Intake incomplete"
   -> Record DS path and app path before planning starts
2. Load DS references and complete DS gap audit
   -> If critical patterns are unmapped: ERROR "DS gap audit incomplete"
3. Plan DS-only implementation work from gap audit
   -> tokens, utilities, primitives, components, shells, tests, docs
4. Plan app-only work from Next.js build spec
   -> route groups, route map, pages, co-located components, features
5. EXECUTE DS implementation (Phase 3)
   -> One task per DS change item
   -> Run `npm run verify` after each meaningful change
6. EXECUTE Next.js rebuild (Phase 4)
   -> One task per route or component group
   -> Run `npm run verify` after each meaningful change
7. Run parity checklist and final verification (Phase 5)
8. Close only when parity and quality gates are green
9. If scope says `audit-only`, stop after Phase 2 planning
```

## Format: `[ID] [P?] Description`
- **[P]**: Can run in parallel (different files, no dependencies)
- Include exact file paths in descriptions

---

## Phase 1: Intake And Scope Lock

- [ ] T001 Fill `templates/prototype-intake.template.md` with prototype root, UI mode, DS policy, scope, route inventory, interactions, overlays, assets, and screenshots
- [ ] T002 Fill protected zones and non-goals in `templates/prototype-intake.template.md`
- [ ] T003 [P] Record route candidates and target route groups in `templates/nextjs-build-spec.template.md`
- [ ] T004 [P] Record visual extraction candidates in `templates/prototype-intake.template.md`

## Phase 2: DS Gap Audit And Planning ⚠️ MUST COMPLETE BEFORE ANY CODE

- [ ] T005 Fill `templates/ds-gap-audit.template.md` — map all prototype patterns to DS coverage using `src/ds/DESIGN-SYSTEM-ANATOMY.md`, `src/ds/DS-COVERAGE-CHECKLIST.md`, and `src/ds/SEMANTIC-CLASSES-REGISTRY.md`
- [ ] T006 [P] List missing token and utility gaps in `templates/ds-gap-audit.template.md`
- [ ] T007 [P] List missing component and shell gaps in `templates/ds-gap-audit.template.md`
- [ ] T008 Fill `templates/ds-build-spec.template.md` — convert gaps into explicit DS change items with acceptance criteria
- [ ] T009 [P] Define DS test expectations in `templates/ds-build-spec.template.md`
- [ ] T010 Fill `templates/nextjs-build-spec.template.md` — route plan, page extraction, shell choices, route map updates
- [ ] T011 [P] Fill `templates/parity-checklist.template.md` with route-specific parity criteria
- [ ] T012 Validate the packet is internally consistent across all files — paths, scope, and gaps aligned

**If scope is `audit-only`, STOP HERE. Do not proceed to Phase 3.**

## Phase 3: DS Implementation ⚠️ MUST COMPLETE BEFORE APP BUILD

DS policy is `approved-ds-change` for this phase. One task per change item from ds-build-spec.

- [ ] T100 Implement token additions/changes in `src/ds/styles/ds.tokens.css` per ds-build-spec change list
- [ ] T101 [P] Implement utility/semantic class additions in `src/ds/styles/ds.utilities.css` per ds-build-spec change list
- [ ] T102 [P] Implement component class additions in `src/ds/styles/ds.components.css` per ds-build-spec change list
- [ ] T103 Implement new DS primitives in `src/ds/primitives/` per ds-build-spec change list
- [ ] T104 [P] Implement new DS components in `src/ds/components/` per ds-build-spec change list
- [ ] T105 [P] Implement shell changes in `src/ds/layouts/` if needed per ds-build-spec change list
- [ ] T106 Update `src/ds/index.ts` barrel exports for all new public API items
- [ ] T107 [P] Add/update DS tests per ds-build-spec test expectations
- [ ] T108 [P] Update `src/ds/DESIGN-SYSTEM-ANATOMY.md` for architecture/catalog changes
- [ ] T109 [P] Update `src/ds/SEMANTIC-CLASSES-REGISTRY.md` for new `ui-*` classes
- [ ] T110 Run `npm run verify` — all gates must pass before proceeding to Phase 4

**AI note**: T100–T109 are templates. During execution, expand them into concrete tasks based on the actual gap items in ds-build-spec. For example, if ds-build-spec lists 3 new tokens and 2 new components, create specific tasks for each. Mark tasks that touch different files with [P] for parallel execution.

## Phase 4: Next.js App Rebuild

DS policy reverts to `consume-only` for this phase. Import from `@/ds` only.

- [ ] T200 Update `src/app/route-map.ts` with all new routes from nextjs-build-spec
- [ ] T201 Create/update route group layout(s) in `src/app/(group)/layout.tsx` with shell wiring per nextjs-build-spec
- [ ] T202 Build page files and co-located `_components/` for each route per nextjs-build-spec page extraction plan
- [ ] T203 [P] Wire feature layer imports from `src/features/` where needed per nextjs-build-spec
- [ ] T204 [P] Implement responsive behavior using DS utilities and runtime knobs per prototype-intake responsive notes
- [ ] T205 [P] Implement interactive states (modals, drawers, forms, loading/error/empty) using DS components per prototype-intake interaction inventory
- [ ] T206 Run `npm run verify` — all gates must pass before proceeding to Phase 5

**AI note**: T202 and T205 are templates. During execution, expand into one task per route or interaction group. Keep page files thin (~80 lines). Extract heavy JSX to `_components/`.

## Phase 5: Parity Verification And Close

- [ ] T300 Complete structural parity review — compare DOM structure, DS class usage, and layout behavior against prototype for each route
- [ ] T301 [P] Complete interaction parity review — verify all scoped interactions, overlays, form states, and responsive behavior
- [ ] T302 [P] Complete framework compliance review — verify `@/ds` import boundary, route group structure, thin pages, route map sync
- [ ] T303 Run full verification: `npm run verify` (typecheck → lint → test → build → ds:audit → ds:a11y)
- [ ] T304 Fill review notes and remaining deviations in `templates/parity-checklist.template.md`
- [ ] T305 Close migration — all parity checks green, all quality gates green, all deviations documented

---

## Dependencies

- Phase 1 (T001–T004) before Phase 2 (T005–T012)
- Phase 2 (T005–T012) before Phase 3 (T100–T110)
- Phase 3 (T100–T110) before Phase 4 (T200–T206)
- Phase 4 (T200–T206) before Phase 5 (T300–T305)
- Within a phase, items without [P] are sequential; items with [P] can run in parallel

## Notes

- DS tasks and app tasks are always in separate phases — never mixed.
- T100-series and T200-series are expandable templates. The AI must create concrete sub-tasks from the build specs before execution.
- Legacy prompt folders (`DOC/Prompts/`, `DOC/Features/`, `DOC/helios-lead-gen/`, `DOC/solarconnect/`) are reference-only. `DOC_UNIVERSAL` and this packet are the authority.
- If a scope is `ds-only`, skip Phase 4 and Phase 5.
- If a scope is `single-route`, constrain T202/T205/T300/T301 to that route.

## Pre-Execution Validation

Before any code is written, confirm:

- [ ] Prototype path and scope are explicit
- [ ] UI mode is declared
- [ ] DS policy is declared (`approved-ds-change` for Phase 3, `consume-only` for Phase 4)
- [ ] Protected zones are explicit
- [ ] Every critical prototype pattern is mapped to an existing or planned DS primitive
- [ ] DS and app work are separated into different phases
- [ ] Route groups and shell selection are explicit
- [ ] Verification command is `npm run verify`
- [ ] Parity criteria are defined before coding starts
