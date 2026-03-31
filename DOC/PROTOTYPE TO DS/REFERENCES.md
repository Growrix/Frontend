# Reference Map

Use these files as the primary in-repo references when running any prototype -> DS -> Next.js migration.

## Always-On Authority

- `DOC_UNIVERSAL/README.md`
  Why: master read policy and authority chain.
- `DOC_UNIVERSAL/CORE/CONSTITUTION.md`
  Why: non-negotiable architecture and DS protection rules.
- `DOC_UNIVERSAL/CORE/WORKFLOW.md`
  Why: execution loop, read order, and stop conditions.
- `DOC_UNIVERSAL/CORE/ENGINEERING-STANDARDS.md`
  Why: routing, app structure, feature boundaries, DS-first rules.
- `DOC_UNIVERSAL/CORE/QUALITY-GATES.md`
  Why: required verification commands and merge blockers.

## Frontend Structure And DS Rules

- `DOC_UNIVERSAL/STANDARDS/UI-DS-RULES.md`
  Why: DS consumption hierarchy and UI mode rules.
- `DOC_UNIVERSAL/STANDARDS/APP-STRUCTURE.md`
  Why: route groups, shell ownership, route map, `_components/` boundaries.
- `src/ds/DESIGN-SYSTEM-ANATOMY.md`
  Why: full DS architecture, export surface, tokens, shells, and component catalog.
- `src/ds/DS-COVERAGE-CHECKLIST.md`
  Why: required DS tests, docs, and merge-gate sync.
- `DOC/SEMANTIC-CLASSES-REGISTRY.md`
  Why: approved semantic class inventory and rules for `ui-*` usage.

## Useful Implementation References In This Repo

- `src/app/layout.tsx`
  Why: root shell wiring, `ThemeInitScript`, and skip-link structure.
- `src/app/globals.css`
  Why: single DS CSS import path.
- `src/app/route-map.ts`
  Why: canonical route registry pattern.
- `scripts/ds-audit.mjs`
  Why: static audit patterns for token and color enforcement.
- `package.json`
  Why: canonical verify commands.

## What Not To Do

- Do not merge all frontend prompt files into one active instruction set.
- Do not let the AI read broad legacy prompt folders by default.
- Do not allow old prompts to override `DOC_UNIVERSAL` or current DS docs.
- Do not use component-library references that no longer exist in `src/app/` as active route references.
