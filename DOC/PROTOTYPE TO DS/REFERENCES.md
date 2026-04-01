# Reference Map

In-repo files used during prototype -> DS -> Next.js migration. Organized by when they are needed.

## Always-On Authority (read before any work)

| File | Why |
|------|-----|
| `DOC_UNIVERSAL/README.md` | Master read policy and authority chain |
| `DOC_UNIVERSAL/CORE/CONSTITUTION.md` | Non-negotiable architecture and DS protection rules |
| `DOC_UNIVERSAL/CORE/WORKFLOW.md` | Execution loop, read order, stop conditions, UI mode requirement |
| `DOC_UNIVERSAL/CORE/ENGINEERING-STANDARDS.md` | Routing, app structure, feature boundaries, DS-first rules |
| `DOC_UNIVERSAL/CORE/QUALITY-GATES.md` | Required verification commands and merge blockers |

## Runner (read the one matching the START-HERE runner field)

| File | When |
|------|------|
| `DOC_UNIVERSAL/RUNNERS/COPILOT.md` | Runner is `copilot` (interactive, discussion-led) |
| `DOC_UNIVERSAL/RUNNERS/AIDER.md` | Runner is `aider` (autonomous loop) |

## Frontend Structure And DS Rules (read for all phases)

| File | Why |
|------|-----|
| `DOC_UNIVERSAL/STANDARDS/UI-DS-RULES.md` | DS consumption hierarchy, UI mode rules, Tailwind policy |
| `DOC_UNIVERSAL/STANDARDS/APP-STRUCTURE.md` | Route groups, shell ownership, route map, `_components/` boundaries |
| `src/ds/DESIGN-SYSTEM-ANATOMY.md` | Full DS architecture, export surface, tokens, shells, component catalog |
| `src/ds/DS-COVERAGE-CHECKLIST.md` | Required DS tests, docs, and merge-gate sync for DS changes |
| `src/ds/SEMANTIC-CLASSES-REGISTRY.md` | Approved semantic class inventory and `ui-*` usage rules |

## Implementation References (read as needed during coding)

| File | Why |
|------|-----|
| `src/app/layout.tsx` | Root shell wiring, `ThemeInitScript`, skip-link structure |
| `src/app/globals.css` | Single DS CSS import path |
| `src/app/route-map.ts` | Canonical route registry — all routes must be registered here |
| `scripts/ds-audit.mjs` | Static audit patterns for token and color enforcement |
| `package.json` | Canonical verify commands (`npm run verify`) |

## Folders That Are NOT Authority

These folders exist in the repo but must not be used as active instruction sources during migration. They are old brainstorming, prototype snapshots, or legacy prompts.

| Folder | Why it is not authority |
|--------|----------------------|
| `DOC/Prompts/` | Legacy prompt collection — superseded by DOC_UNIVERSAL |
| `DOC/Features/` | Historical feature planning — not execution authority |
| `DOC/helios-lead-gen/` | Standalone prototype snapshot — read-only reference at best |
| `DOC/solarconnect/` | Standalone prototype snapshot — read-only reference at best |
| `DOC_UNIVERSAL/VENDOR/` | Third-party references — never source of truth |
| `DOC_UNIVERSAL/REFERENCE/` | Raw discussions — non-authoritative |

If the AI loads any of these folders as active instructions, it is operating outside the authority chain.
