# Prototype -> DS -> Next.js Migration Packet

## Fast Start

Use `START-HERE.md` only. Copy the prompt, fill the placeholders, send to AI.

The rest of this folder is AI-facing structure. You do not need to read it.

## Purpose

Reusable migration system for converting any external prototype into the Blueprint Design System and then rebuilding it in Next.js. Works with Vite, AI Studio, HTML/CSS, Tailwind, or any React prototype.

The AI performs a clean, repeatable flow:

1. Audit prototype as the visual source of truth
2. Identify DS gaps against `src/ds/`
3. Upgrade DS where needed (approved DS changes)
4. Rebuild in Next.js using `@/ds` only
5. Verify parity

## Operating Principle

Never combine these in one task:

- DS building
- App rebuilding

The correct phase order is enforced by `tasks.md`.

## Folder Contents

| File | Purpose |
|------|---------|
| `START-HERE.md` | Single user-facing entry prompt |
| `README.md` | This file — operating model for AI |
| `REFERENCES.md` | In-repo reference file map |
| `tasks.md` | Full execution sequence with 5 phases |
| `templates/prototype-intake.template.md` | Prototype route/screen/interaction inventory |
| `templates/ds-gap-audit.template.md` | Map prototype patterns to DS coverage and gaps |
| `templates/ds-build-spec.template.md` | DS implementation scope and acceptance criteria |
| `templates/nextjs-build-spec.template.md` | Next.js rebuild scope and route plan |
| `templates/parity-checklist.template.md` | Structural and behavioral parity verification |
| `templates/ai-execution-brief.template.md` | Quick-reference brief for AI context window |

## Authority Chain

This packet operates under `DOC_UNIVERSAL`, not alongside it.

Read order:

1. `DOC_UNIVERSAL/README.md`
2. All files in `DOC_UNIVERSAL/CORE/`
3. `DOC_UNIVERSAL/RUNNERS/COPILOT.md` (or `AIDER.md` based on START-HERE runner field)
4. `DOC_UNIVERSAL/STANDARDS/UI-DS-RULES.md`
5. `DOC_UNIVERSAL/STANDARDS/APP-STRUCTURE.md`
6. `src/ds/DESIGN-SYSTEM-ANATOMY.md`
7. `src/ds/DS-COVERAGE-CHECKLIST.md`
8. `src/ds/SEMANTIC-CLASSES-REGISTRY.md`
9. This folder's `tasks.md`
10. Active templates in this folder as needed by the current phase

## Phase Model (aligned with tasks.md)

### Phase 1: Intake And Scope Lock

Fill `templates/prototype-intake.template.md`. Record prototype path, UI mode, DS policy, scope, routes, interactions, overlays, responsive behavior, screenshots, and protected zones.

### Phase 2: DS Gap Audit And Planning

Fill `templates/ds-gap-audit.template.md` — map every prototype pattern to existing DS coverage or a gap. Then fill `templates/ds-build-spec.template.md` and `templates/nextjs-build-spec.template.md` with concrete change lists and route plans.

**If scope is `audit-only`, stop here.**

### Phase 3: DS Implementation

DS policy is `approved-ds-change`. Implement tokens, utilities, primitives, components, shells, tests, and docs per ds-build-spec. Run `npm run verify` before moving on.

### Phase 4: Next.js App Rebuild

DS policy reverts to `consume-only`. Build routes, pages, and components per nextjs-build-spec. Import from `@/ds` only. Run `npm run verify` before moving on.

### Phase 5: Parity Verification And Close

Complete `templates/parity-checklist.template.md`. Structural parity = DOM structure, DS class usage, layout behavior, interaction behavior. Run final `npm run verify`. Document any approved deviations.

## Non-Negotiable Rules

- Prototype is the visual source of truth during audit and parity.
- `src/ds/` is the implementation source of truth after DS decisions are locked.
- `src/app/` is a consumer only — no inventing styles outside the DS.
- Never mix DS edits and app rebuild work in the same task.
- Never let AI improvise visual patterns not in the prototype or the DS.
- Do not use legacy prompt folders as authority: `DOC/Prompts/`, `DOC/Features/`, `DOC/helios-lead-gen/`, `DOC/solarconnect/`.
- UI mode must be declared before any frontend work.
- DS policy must be declared per phase (`approved-ds-change` for Phase 3, `consume-only` for Phase 4).
- Protected zones must be declared before execution.
- Verification command is `npm run verify`.
- Parity verification is structural — AI cannot do pixel comparison of screenshots.

## Valid Scopes

| Scope | Behavior |
|-------|----------|
| `full site rebuild` | All 5 phases, all routes |
| `single-route` | All 5 phases, constrained to one route |
| `ds-only` | Phases 1–3 only, skip app rebuild and parity |
| `audit-only` | Phases 1–2 only, no code changes |

## How To Use

1. Open `START-HERE.md`.
2. Copy the prompt, fill paths and UI mode.
3. Send to AI.
4. The AI reads authority docs, fills templates, and begins execution per `tasks.md`.
