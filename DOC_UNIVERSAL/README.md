# DOC_UNIVERSAL

Universal operating system for AI-assisted SaaS development.

This folder is not a project spec and not a task queue. It is the master blueprint that defines how humans, GitHub Copilot, and Aider should build SaaS products in a controlled, repeatable way.

## Purpose

- Keep AI execution constrained and auditable.
- Reduce hallucination, prompt drift, hardcoded UI, routing inconsistency, and architecture shortcuts.
- Give developers a small always-on rule set and a larger on-demand handbook.

## Current Starter Kit

- Existing Blueprint Design System in `src/ds/`
- Next.js
- React
- Tailwind CSS

The Design System is the primary UI authority. Tailwind is available as a supporting tool, but it must not replace the DS as the visual source of truth.

## Authority Model

1. `CORE/CONSTITUTION.md`
2. `CORE/WORKFLOW.md`
3. `CORE/ENGINEERING-STANDARDS.md`
4. `CORE/QUALITY-GATES.md`
5. Relevant runner file in `RUNNERS/`
6. Active project execution files: `PRD`, `SPEC`, `PLAN`, `TASKS`, `ROUTE-MAP`, `API-MAP`
7. Relevant profile docs in `STACK_PROFILES/` only when needed

## AI Read Policy

Always read only:

- `README.md`
- all files in `CORE/`
- one file from `RUNNERS/`
- the active project `tasks.md`
- only the refs linked from the current task

For frontend work, also load:

- `STANDARDS/UI-DS-RULES.md`
- `STANDARDS/APP-STRUCTURE.md`
- `src/ds/DESIGN-SYSTEM-ANATOMY.md`
- `src/ds/SEMANTIC-CLASSES-REGISTRY.md`

For creative frontend work such as homepages, landing pages, marketing sites, visual redesigns, theme creation, or wireframing, also load:

- `DDS/README.md`
- `DDS/OPERATING/DESIGN-DECISION-SYSTEM.md`
- `DDS/OPERATING/AI-EXECUTION-FLOW.md`
- for full public websites, reusable templates, or market-specific theme families, also load the specific archetype from `DDS/ARCHETYPES/`
- only the specific mode from `DDS/MODES/` and preset from `DDS/PRESETS/` after the design decision is made
- only the smallest relevant template from `DDS/TEMPLATES/` for visual direction, wireframes, or theme presets

DS-owned operating docs stay with the DS implementation in `src/ds/`.
That includes `DESIGN-SYSTEM-ANATOMY.md`, `DS-COVERAGE-CHECKLIST.md`, and `SEMANTIC-CLASSES-REGISTRY.md`.
Reference handbooks and feature planning docs stay under `DOC/`.

For backend, auth, billing, data, or operations work, also load:

- `STANDARDS/API-BACKEND-RULES.md`
- `STANDARDS/SAAS-FOUNDATIONS.md`
- only the smallest relevant subset from `STACK_PROFILES/NEXTJS-SAAS/`

Do not load the full folder tree by default.

For tasks that touch billing, webhooks, jobs, tenant lifecycle, domain modeling, data privacy, notifications, file storage, caching, rate limiting, migrations, admin ops, real-time, or analytics:

- Read `CORE/HANDBOOK-ROUTING.md` to find the correct reference handbook chapter.
- Load only the specific chapter listed — not the full handbook.
- Handbooks are reference, not operational authority. CORE rules always win.

For DS theory or component design rationale:

- Consult `DOC/DS BUILDING/HandBook_Frontend/` via the routing table.

## Folder Map

- `CORE/`: always-on operating rules
- `STANDARDS/`: stable implementation rules for structure, UI/DS, and API/backend
- `DDS/`: Design Decision System — creative direction, modes, presets, composition rules
- `DDS/ARCHETYPES/`: reusable site-level website strategies (local service lead gen, B2B SaaS marketing, etc.)
- `DDS/OPERATING/`: authoritative DDS rules AI must follow for creative work
- `DDS/MODES/`: design mode definitions (Clean SaaS, Bold Marketing, etc.)
- `DDS/PRESETS/`: visual preset families (Neutral Professional, Editorial Premium, etc.)
- `DDS/TEMPLATES/`: reusable briefs for visual direction, wireframes, and design decisions
- `DDS/REFERENCE/`: non-authoritative inspiration patterns and examples
- `STANDARDS/SAAS-FOUNDATIONS.md`: optional-module and SaaS decision guide for AI and developers
- `RUNNERS/`: runner-specific operating contracts
- `TEMPLATES/`: seed templates for project execution docs
- `STACK_PROFILES/`: on-demand technical handbooks by stack
- `VENDOR/`: third-party systems kept as reference only
- `REFERENCE/`: raw discussions and non-authoritative materials

Location rule:

- `src/ds/`: implementation-coupled DS code and DS-owned operating docs
- `DOC_UNIVERSAL/DDS/`: Design Decision System — creative direction, modes, presets, and composition rules
- `DOC_UNIVERSAL/DDS/TEMPLATES/`: reusable inputs that convert creative intent into AI-readable briefs
- `DOC/DS BUILDING/`: DS theory, handbook chapters, and build playbooks
- `DOC/`: feature docs, handbooks, prompts, and planning artifacts outside DS runtime ownership

## What This Folder Is Not

- Not a feature folder
- Not an implementation backlog
- Not a place for secrets, local paths, or environment-specific notes
- Not a place to dump every prompt or brainstorming note into the active workflow

## Success Criteria

This system is working correctly when:

- AI can identify what to read in under one minute.
- Developers can find the active authority chain without ambiguity.
- Tasks drive execution, not loose prompts.
- UI, routing, API, and backend structure remain consistent across projects.