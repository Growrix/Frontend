# Prototype -> DS -> Next.js Migration Packet

## Fast Start

If you want the simple entry point, use `DOC/PROTOTYPE TO DS/START-HERE.md` only.

That file is the user-facing prompt template. The rest of this folder exists to keep the AI structured.

The AI should prepare the working packet and begin execution from that prompt unless you explicitly limit the scope to `audit-only`.

This folder is the reusable operating packet for migrating any external prototype into the Blueprint Design System and then rebuilding it inside the Next.js app without creating prompt drift or mixed authority.

## Purpose

Use this packet when you want AI to perform a clean, repeatable flow:

1. audit a prototype as the visual source of truth
2. identify Design System gaps against `src/ds/`
3. upgrade the DS only where needed
4. rebuild the site in Next.js using `@/ds` only
5. verify parity against the prototype

This folder is not for one single project. It is the reusable migration system for any prototype source: Vite, AI Studio, HTML/CSS prototype, Tailwind prototype, or another frontend codebase.

## Operating Principle

Do not combine these jobs in one implementation task:

- prototype mirroring
- DS building
- app rebuilding

That is the main cause of messy AI output.

The correct order is:

1. Prototype Audit and Freeze
2. DS Gap Audit
3. DS Build or DS Refinement
4. Fresh Next.js Rebuild with DS Consumption Only
5. Parity Verification

## Folder Contents

- `START-HERE.md` — single user-facing entry prompt
- `README.md` — operating model and usage
- `REFERENCES.md` — in-repo references AI should use
- `tasks.md` — reusable execution sequence based on the Speckit task template
- `templates/prototype-intake.template.md` — inventory of prototype routes, screens, sections, states, and assets
- `templates/ds-gap-audit.template.md` — map prototype patterns to DS coverage and gaps
- `templates/ds-build-spec.template.md` — DS implementation scope only
- `templates/nextjs-build-spec.template.md` — Next.js rebuild scope only
- `templates/parity-checklist.template.md` — pixel and behavior verification
- `templates/ai-execution-brief.template.md` — the short brief to hand to any AI runner

## Authority Chain

This packet does not replace `DOC_UNIVERSAL`. It operates under it.

Always read in this order:

1. `DOC_UNIVERSAL/README.md`
2. all files in `DOC_UNIVERSAL/CORE/`
3. one runner file in `DOC_UNIVERSAL/RUNNERS/`
4. this folder's `tasks.md`
5. the active templates/specs in this folder
6. only the referenced DS and app files required by the current task

For frontend migration work, always load:

- `DOC_UNIVERSAL/STANDARDS/UI-DS-RULES.md`
- `DOC_UNIVERSAL/STANDARDS/APP-STRUCTURE.md`
- `src/ds/DESIGN-SYSTEM-ANATOMY.md`
- `src/ds/DS-COVERAGE-CHECKLIST.md`
- `DOC/SEMANTIC-CLASSES-REGISTRY.md`

## Non-Negotiable Rules

- Prototype is the visual source of truth during audit and parity review.
- `src/ds/` is the implementation source of truth after DS decisions are locked.
- `src/app/` is a consumer only. App code must not invent styling outside the DS.
- Never mix DS edits and app rebuild work in the same implementation task.
- Never let an AI improvise visual patterns not justified by the prototype or the DS.
- Never treat old prompt folders as the active source of truth.
- Every migration must declare protected zones before execution.
- Every migration must define verification commands before implementation starts.

## Recommended Execution Model

### Phase 1: Prototype Audit

Use `templates/prototype-intake.template.md` to record:

- prototype root path
- route list
- screen list
- sections and repeated patterns
- modal and overlay inventory
- interactive states
- responsive behavior
- screenshots and reference assets
- protected zones

### Phase 2: DS Gap Audit

Use `templates/ds-gap-audit.template.md` to answer:

- which prototype patterns are already covered by `@/ds`
- which tokens are missing
- which utilities are missing
- which primitives or composed components must be added
- what must stay unchanged in app code

### Phase 3: DS Build Spec

Use `templates/ds-build-spec.template.md` to lock:

- allowed DS files to change
- acceptance criteria
- test expectations
- documentation sync requirements
- explicit non-goals

### Phase 4: Next.js Build Spec

Use `templates/nextjs-build-spec.template.md` to lock:

- route map changes
- route group placement
- shell selection
- page/component extraction boundaries
- feature layer usage
- parity expectations

### Phase 5: Verification

Use `templates/parity-checklist.template.md` to verify:

- visual parity
- layout parity
- interaction parity
- responsive parity
- accessibility and keyboard behavior
- build, lint, type, DS audit, and DS a11y gates

## How To Use This Packet For A Real Migration

1. Start from `START-HERE.md`.
2. Give the AI the prototype path, DS path, and app path.
3. Let the AI prepare the working files in this folder.
4. Run DS work first.
5. Run app rebuild second.
6. Do parity review last.

If the AI cannot point to the current prototype manifest, DS gap audit, and active task entry, it should not start coding.
