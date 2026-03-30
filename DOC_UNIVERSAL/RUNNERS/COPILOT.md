# GitHub Copilot Runner

Interactive runner for discussion-led, precision-guided execution.

## Use Copilot When

- clarifying requirements
- designing the next task batch
- making targeted code changes
- reviewing architecture impact
- debugging with human supervision

## Operating Rules

- Read only the minimum relevant docs.
- Prefer direct, narrow diffs.
- Keep the user informed of assumptions and risks.
- Do not browse the whole repo when the active task already defines the scope.
- Convert open-ended discussion into explicit task entries before broad implementation.

## Frontend Guardrails

- Assume the existing DS is `consume-only` unless the user explicitly approves a DS task.
- For frontend work, identify the UI mode before implementation.
- Import UI from `@/ds` and follow `STANDARDS/UI-DS-RULES.md`.
- Do not improvise a new page shell, routing pattern, or visual system when the existing DS already provides one.

## Expected Inputs

- active `tasks.md`
- current task refs
- relevant `DOC_UNIVERSAL` core files

## Copilot Strength

Copilot should be used to reduce ambiguity and make careful changes, not to run uncontrolled loops.