# AI Execution Brief

## Goal

Migrate a prototype into the Blueprint stack using the controlled flow:

1. audit prototype
2. audit DS gaps
3. implement DS changes only
4. rebuild app in Next.js using `@/ds`
5. verify parity and quality gates

## Required Read Set

1. `DOC_UNIVERSAL/README.md`
2. all files in `DOC_UNIVERSAL/CORE/`
3. one runner file in `DOC_UNIVERSAL/RUNNERS/`
4. `DOC_UNIVERSAL/STANDARDS/UI-DS-RULES.md`
5. `DOC_UNIVERSAL/STANDARDS/APP-STRUCTURE.md`
6. `src/ds/DESIGN-SYSTEM-ANATOMY.md`
7. `src/ds/DS-COVERAGE-CHECKLIST.md`
8. `DOC/SEMANTIC-CLASSES-REGISTRY.md`
9. active `tasks.md`
10. active files in this migration packet

## Inputs To Fill Before Execution

- Prototype root path:
- Target DS path:
- Target app path:
- Prototype screenshots path:
- Protected zones:
- In-scope routes/screens:
- Target route groups:
- UI mode:
- DS policy:
- Verification commands:

## Execution Rules

- Do not start app rebuild before DS gap audit is approved.
- Do not mix DS work and app work in the same task.
- Do not treat legacy prompt folders as the source of truth.
- Do not add prototype-only one-off styles into app code.
- Stop and write blockers when parity cannot be achieved with the current DS.

## Output Requirement

The AI must always return:

- files read
- decisions made
- tasks created or completed
- verification commands run
- blockers or unresolved gaps
