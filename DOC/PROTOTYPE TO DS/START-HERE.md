# Start Here

Copy this prompt, replace the placeholder values, and send it to AI. This is the only file you need.

```md
Use the Blueprint prototype-to-DS migration system.

Prototype path: `PROTOTYPE_PATH`
DS path: `D:\Desktop Mass\Blueprint\src\ds`
App path: `D:\Desktop Mass\Blueprint\src\app`
Screenshots path: `SCREENSHOTS_PATH`
UI mode: `app-like-plus-desktop` or `desktop-plus-responsive`
DS policy: `approved-ds-change`
Scope: `full site rebuild`
Runner: `copilot`

Your job:

1. Read the required authority and DS files (listed below).
2. Audit the prototype as the visual source of truth.
3. Audit the current DS and identify coverage and gaps.
4. Prepare or update the working files inside `DOC/PROTOTYPE TO DS/`, including `tasks.md`.
5. Start the job after task preparation unless the scope explicitly says `audit-only`.
6. Implement DS changes first (tokens, utilities, primitives, components) — separate tasks.
7. Rebuild the scoped experience in Next.js using `@/ds` only — separate tasks.
8. Run all verification gates (`npm run verify`).
9. Complete the parity checklist.
10. Report decisions, files changed, verification results, and any blockers.

Required read set:

- `DOC_UNIVERSAL/README.md`
- all files in `DOC_UNIVERSAL/CORE/`
- `DOC_UNIVERSAL/RUNNERS/COPILOT.md` (or `AIDER.md` if runner is `aider`)
- `DOC_UNIVERSAL/STANDARDS/UI-DS-RULES.md`
- `DOC_UNIVERSAL/STANDARDS/APP-STRUCTURE.md`
- `src/ds/DESIGN-SYSTEM-ANATOMY.md`
- `src/ds/DS-COVERAGE-CHECKLIST.md`
- `src/ds/SEMANTIC-CLASSES-REGISTRY.md`
- `DOC/PROTOTYPE TO DS/README.md`
- `DOC/PROTOTYPE TO DS/tasks.md`

Rules:

- Prototype is the visual source of truth.
- `src/ds/` is the implementation source of truth.
- `src/app/` must consume `@/ds` only.
- DS policy for this migration is `approved-ds-change` — you may edit `src/ds/**` for gap work.
- Do not mix DS edits and app rebuild work in the same task.
- If parity cannot be reached with the current DS, stop and create the DS gap work first.
- Do not use legacy prompt folders (`DOC/Prompts/`, `DOC/Features/`, `DOC/helios-lead-gen/`, `DOC/solarconnect/`) as authority.
- Visual parity verification is structural: compare DOM structure, DS class usage, layout behavior, and interaction behavior. Screenshots are reference-only; AI cannot do pixel comparison.
```

## What To Replace

| Placeholder | What to put | Required? |
|-------------|------------|-----------|
| `PROTOTYPE_PATH` | Absolute path to the prototype root | Yes |
| `SCREENSHOTS_PATH` | Path to prototype screenshots (reference only) | No |
| `UI mode` | `app-like-plus-desktop` or `desktop-plus-responsive` | Yes |
| `Scope` | `full site rebuild`, `single-route`, `ds-only`, or `audit-only` | Yes |
| `Runner` | `copilot` or `aider` | No (default: copilot) |

DS path and App path are pre-filled with the Blueprint defaults. Change them only if your repo is elsewhere.

## Example

```md
Use the Blueprint prototype-to-DS migration system.

Prototype path: `D:\prototype\my-vite-app`
DS path: `D:\Desktop Mass\Blueprint\src\ds`
App path: `D:\Desktop Mass\Blueprint\src\app`
Screenshots path: `D:\prototype\my-vite-app\screenshots`
UI mode: `desktop-plus-responsive`
DS policy: `approved-ds-change`
Scope: `full site rebuild`
Runner: `copilot`
```

## What AI Will Do After You Paste The Prompt

- inspect the prototype
- inspect the DS
- inspect the target app structure
- prepare or update `DOC/PROTOTYPE TO DS/tasks.md`
- decide what must be built in DS first
- decide what must be rebuilt in Next.js after that
- use the packet files in this folder as working documents
- run verification before closing the work

## What You Can Ignore

You do not need to manually fill every file in this folder.

Those files exist so the AI has structure and does not drift.

For you, this file is the entry point.