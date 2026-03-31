# Start Here

## Ready-To-Paste Prompt

Copy this first, replace the paths, and send it to AI:

```md
Use the Blueprint prototype-to-DS migration system.

Prototype path: `PROTOTYPE_PATH`
DS path: `DS_PATH`
App path: `D:\Desktop Mass\Blueprint\src\app`
Screenshots path: `SCREENSHOTS_PATH`
Scope: `full site rebuild`

Read the required authority and DS files, prepare or update the working files in `DOC/PROTOTYPE TO DS/` including `tasks.md`, then start the job unless the scope says `audit-only`.

Rules:
- Prototype is the visual source of truth.
- `src/ds/` is the implementation source of truth.
- `src/app/` must consume `@/ds` only.
- Keep DS work and app work separate.
- Run verification gates before closing.
```

If you want to start a prototype -> DS -> Next.js migration, do not think about the whole folder.

Use only this file.

## What You Need To Fill

Replace only these values:

- `PROTOTYPE_PATH`
- `DS_PATH`

Optional:

- `APP_PATH` (default: `D:\Desktop Mass\Blueprint\src\app`)
- `SCREENSHOTS_PATH`
- `SCOPE`

## Copy This Prompt Into AI

```md
Use the Blueprint prototype-to-DS migration system.

Prototype path: `PROTOTYPE_PATH`
DS path: `DS_PATH`
App path: `APP_PATH`
Screenshots path: `SCREENSHOTS_PATH`
Scope: `SCOPE`

Your job:

1. Read only the required authority and DS files.
2. Audit the prototype as the visual source of truth.
3. Audit the current DS and identify coverage and gaps.
4. Prepare or update the working files inside `DOC/PROTOTYPE TO DS/`, including `tasks.md`.
5. Start the job after task preparation unless the scope explicitly says `audit-only`.
6. Create or update the DS first if required.
7. Rebuild the scoped experience in Next.js using `@/ds` only.
8. Keep DS work and app work separate.
9. Run the required verification gates.
10. Report decisions, files changed, verification results, and any blockers.

Required read set:

- `DOC_UNIVERSAL/README.md`
- all files in `DOC_UNIVERSAL/CORE/`
- `DOC_UNIVERSAL/STANDARDS/UI-DS-RULES.md`
- `DOC_UNIVERSAL/STANDARDS/APP-STRUCTURE.md`
- `src/ds/DESIGN-SYSTEM-ANATOMY.md`
- `src/ds/DS-COVERAGE-CHECKLIST.md`
- `DOC/SEMANTIC-CLASSES-REGISTRY.md`
- `DOC/PROTOTYPE TO DS/tasks.md`
- any active files needed inside `DOC/PROTOTYPE TO DS/`

Rules:

- Prototype is the visual source of truth.
- `src/ds/` is the implementation source of truth.
- `src/app/` must consume `@/ds` only.
- Do not use legacy prompt folders as the authority.
- Do not mix DS edits and app rebuild work in the same task.
- If parity cannot be reached with the current DS, stop and create the DS gap work first.
```

## Default Example

```md
Use the Blueprint prototype-to-DS migration system.

Prototype path: `D:\prototype\my-vite-app`
DS path: `D:\Desktop Mass\Blueprint\src\ds`
App path: `D:\Desktop Mass\Blueprint\src\app`
Screenshots path: `D:\prototype\my-vite-app\screenshots`
Scope: `full site rebuild`
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