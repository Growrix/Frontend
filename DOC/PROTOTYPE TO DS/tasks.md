# Tasks: Prototype -> DS -> Next.js Rebuild

**Input**: Active files from `DOC/PROTOTYPE TO DS/`
**Template Basis**: `DOC_UNIVERSAL/VENDOR/speckit/.specify/templates/tasks-template.md`
**User Entry Point**: `DOC/PROTOTYPE TO DS/START-HERE.md`
**Prerequisites**: `README.md`, `REFERENCES.md`, `templates/prototype-intake.template.md`, `templates/ds-gap-audit.template.md`, `templates/ds-build-spec.template.md`, `templates/nextjs-build-spec.template.md`, `templates/parity-checklist.template.md`

## Execution Flow (main)
```
1. Load prototype-intake template and fill scope lock
   -> If prototype path or scope is missing: ERROR "Prototype intake incomplete"
   -> Record DS path and app path before planning starts
2. Load DS references and complete DS gap audit
   -> If critical patterns are unmapped: ERROR "DS gap audit incomplete"
3. Generate DS-only work from DS gap audit
   -> tokens, utilities, primitives, components, shells, tests, docs
4. Generate app-only work from Next.js build spec
   -> route groups, route map, pages, co-located components, features
5. Apply task rules
   -> DS tasks before app tasks
   -> Different files = mark [P] for parallel
   -> Same file = sequential
6. Run parity checklist and required verification commands
7. Close only when parity and quality gates are green
8. Begin execution after task preparation unless scope explicitly says `audit-only`
```

## Format: `[ID] [P?] Description`
- **[P]**: Can run in parallel (different files, no dependencies)
- Include exact file paths in descriptions

## Phase 3.1: Intake And Scope Lock
- [ ] T001 Fill `DOC/PROTOTYPE TO DS/templates/prototype-intake.template.md` with prototype root, scope, route inventory, interactions, overlays, assets, and screenshots
- [ ] T002 Fill protected zones and non-goals in `DOC/PROTOTYPE TO DS/templates/prototype-intake.template.md`
- [ ] T003 [P] Record route candidates and target route groups in `DOC/PROTOTYPE TO DS/templates/nextjs-build-spec.template.md`
- [ ] T004 [P] Record visual extraction candidates in `DOC/PROTOTYPE TO DS/templates/prototype-intake.template.md`

## Phase 3.2: DS Gap Audit ⚠️ MUST COMPLETE BEFORE APP BUILD
- [ ] T005 Fill `DOC/PROTOTYPE TO DS/templates/ds-gap-audit.template.md` using `src/ds/DESIGN-SYSTEM-ANATOMY.md`, `src/ds/DS-COVERAGE-CHECKLIST.md`, and `DOC/SEMANTIC-CLASSES-REGISTRY.md`
- [ ] T006 [P] Map repeated prototype patterns to existing DS components in `DOC/PROTOTYPE TO DS/templates/ds-gap-audit.template.md`
- [ ] T007 [P] List missing token and utility gaps in `DOC/PROTOTYPE TO DS/templates/ds-gap-audit.template.md`
- [ ] T008 Produce DS-only acceptance criteria in `DOC/PROTOTYPE TO DS/templates/ds-build-spec.template.md`

## Phase 3.3: DS Implementation Planning
- [ ] T009 Convert DS gaps into explicit DS change items in `DOC/PROTOTYPE TO DS/templates/ds-build-spec.template.md`
- [ ] T010 [P] Define DS test expectations in `DOC/PROTOTYPE TO DS/templates/ds-build-spec.template.md`
- [ ] T011 [P] Define documentation sync requirements in `DOC/PROTOTYPE TO DS/templates/ds-build-spec.template.md`
- [ ] T012 Confirm DS phase exit criteria in `DOC/PROTOTYPE TO DS/templates/ds-build-spec.template.md`

## Phase 3.4: Next.js Rebuild Planning
- [ ] T013 Fill route plan in `DOC/PROTOTYPE TO DS/templates/nextjs-build-spec.template.md`
- [ ] T014 [P] Fill page extraction plan in `DOC/PROTOTYPE TO DS/templates/nextjs-build-spec.template.md`
- [ ] T015 [P] Define route map updates and shell choices in `DOC/PROTOTYPE TO DS/templates/nextjs-build-spec.template.md`
- [ ] T016 Confirm app build rules and non-goals in `DOC/PROTOTYPE TO DS/templates/nextjs-build-spec.template.md`

## Phase 3.5: AI Handoff And Verification Planning
- [ ] T017 Fill `DOC/PROTOTYPE TO DS/templates/ai-execution-brief.template.md` with prototype path, DS path, app path, screenshots path, protected zones, UI mode, DS policy, and verification commands
- [ ] T018 [P] Fill `DOC/PROTOTYPE TO DS/templates/parity-checklist.template.md` with route-specific review notes and parity criteria
- [ ] T019 Define the exact verification command set in `DOC/PROTOTYPE TO DS/templates/ai-execution-brief.template.md`
- [ ] T020 Validate the packet is internally consistent across all files in `DOC/PROTOTYPE TO DS/`

## Dependencies
- T001-T004 before T005-T008
- T005-T008 before T009-T012
- T009-T012 before T013-T016
- T013-T016 before T017-T020
- No DS implementation may start before T012 is complete
- No app implementation may start before T016 is complete

## Parallel Example
```
# Launch these together after scope lock:
Task: "Map repeated prototype patterns in DOC/PROTOTYPE TO DS/templates/ds-gap-audit.template.md"
Task: "List missing token and utility gaps in DOC/PROTOTYPE TO DS/templates/ds-gap-audit.template.md"
Task: "Define route candidates and target route groups in DOC/PROTOTYPE TO DS/templates/nextjs-build-spec.template.md"
```

## Notes
- DS tasks and app tasks must stay separate.
- This packet is reusable and may be used directly in this folder for a migration run.
- Legacy prompt folders are reference-only; `DOC_UNIVERSAL` remains the authority.
- AI should replace template placeholders before any coding begins.

## Validation Checklist
- [ ] Prototype path and scope are explicit
- [ ] Protected zones are explicit
- [ ] Every critical prototype pattern is mapped to an existing or planned DS primitive
- [ ] DS and app work are separated
- [ ] Route groups and shell selection are explicit
- [ ] Verification commands are explicit
- [ ] Parity checklist is ready before coding starts
