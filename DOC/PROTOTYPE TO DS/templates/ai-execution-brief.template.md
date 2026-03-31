# AI Execution Brief

Quick-reference summary for the AI's context window. All values come from START-HERE.md and prototype-intake.template.md. Do not duplicate planning here — use this as a lookup card during implementation.

## Active Migration

- Prototype root path:
- Target DS path:
- Target app path:
- Prototype screenshots path:
- UI mode:
- DS policy per phase: `approved-ds-change` (Phase 3) / `consume-only` (Phase 4)
- Scope:
- Runner:

## Protected Zones (do not modify)

-

## In-Scope Routes

-

## Current Phase

- [ ] Phase 1: Intake
- [ ] Phase 2: DS Gap Audit And Planning
- [ ] Phase 3: DS Implementation
- [ ] Phase 4: Next.js App Rebuild
- [ ] Phase 5: Parity And Close

## Verification Command

```bash
npm run verify
```

This runs: typecheck → lint → test → build → ds:audit → ds:a11y

## Execution Rules (quick reference)

- Do not start Phase 3 before Phase 2 planning is complete.
- Do not start Phase 4 before Phase 3 verification passes.
- Do not mix DS edits and app rebuild in the same task.
- Do not treat legacy prompt folders as authority.
- Do not add prototype-only styles into app code.
- Stop and write blockers when parity cannot be achieved with the current DS.

## Output Per Task

Report: files changed, decisions made, verification results, blockers.
