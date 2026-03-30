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
- `DOC/SEMANTIC-CLASSES-REGISTRY.md`

Do not load the full folder tree by default.

## Folder Map

- `CORE/`: always-on operating rules
- `STANDARDS/`: stable implementation rules for structure, UI/DS, and API/backend
- `RUNNERS/`: runner-specific operating contracts
- `TEMPLATES/`: seed templates for project execution docs
- `STACK_PROFILES/`: on-demand technical handbooks by stack
- `VENDOR/`: third-party systems kept as reference only
- `REFERENCE/`: raw discussions and non-authoritative materials

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