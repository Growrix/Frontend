# Aider Runner

Autonomous runner for longer execution loops and overnight task completion.

## What The Basic Loop Script Is

The common Aider loop script is a shell script that keeps doing this in a cycle:

1. ask Aider to implement the next task
2. run verification
3. ask Aider to fix failures if verification breaks
4. commit changes
5. keep commits local for manual review
6. sleep for a few minutes
7. repeat

It is useful as an overnight executor, but the raw version is too unsafe for a serious starter because it usually assumes:

- bash only
- `build` is the only gate
- auto-push is always safe
- working on `main` is acceptable
- DS edits and scope drift are not a risk

## Recommended Default Mode

The recommended starter mode is:

- Aider works autonomously from one active `tasks.md` file at a time
- verification runs after each task cycle
- Aider attempts a repair pass if verification fails
- each completed task is committed locally for rollback safety
- nothing is pushed automatically
- you visually review frontend changes before any manual push

## Use Aider When

- the backlog is already structured
- tasks are explicit and independently verifiable
- long-running implementation can progress without product decisions every step

## Operating Rules

- Consume one explicit task at a time.
- Consume one explicit `tasks.md` file at a time unless a queue file is intentionally provided.
- Read the active task, its refs, and only the minimum needed context.
- Run quality gates after each meaningful change set.
- Update task notes and verification results continuously.
- Stop after repeated failures instead of inventing new architecture.

## Aider Guardrails

- No taskless implementation.
- No skipping broken tests or build failures.
- No major architectural rewrite without explicit instruction.
- No direct execution from reference or vendor docs.
- No frontend implementation without a declared UI mode and DS policy.
- Assume the DS is `consume-only` unless the task explicitly approves a DS change.
- Do not edit `src/ds/**` or related DS authority files during normal feature work.
- Do not push automatically from the loop.
- Do not run unattended auto-push to protected branches by default.
- Require a clean working tree before starting a long loop.
- Prefer a single project `verify` command over ad hoc gate selection.

## Recommended Prompt Contract

Use prompts shaped like this:

```txt
Read the active TASKS file.
Implement exactly the next unfinished task.
Follow DOC_UNIVERSAL core rules.
Update the task notes with what changed and what verification passed.
Stop if the task is ambiguous, blocked, or would broaden scope.
```

## How To Use A Safer Starter Loop

1. Create the project execution docs from the templates.
2. Make sure the project has an active `tasks.md`.
3. Ensure package scripts exist for verification. Ideal set:
	- `build`
	- `lint`
	- `test`
	- `verify`
4. Start from a feature branch, not `main`.
5. Use the provided loop template matching your OS:
	- `TEMPLATES/AIDER-LOOP.template.sh`
	- `TEMPLATES/AIDER-LOOP.template.ps1`
6. Point the loop to one `TASK_FILE`, or optionally to a `TASK_QUEUE_FILE` listing multiple task files.
7. Let the loop create local commits after each completed task only.
8. Perform visual review before any manual push.

## Verification Choice

- Preferred: `VERIFY_COMMAND="npm run verify"`
- Minimum starter mode: `VERIFY_COMMAND="npm run build"`

If build fails, the loop asks Aider to repair the failure and retries verification.

## Task File Queue Mode

If you maintain multiple feature task files, you may provide a queue file containing one task file path per line.

Behavior:

- the loop fully processes the first unfinished task file
- commits after each completed task
- moves to the next task file only when the current one has no unfinished tasks left
- never pushes automatically

## Starter Recommendation

For Windows-first usage, prefer the PowerShell template. Use the bash template for Linux, macOS, or CI-style environments.

## Best Fit

Aider is best used as a disciplined executor, not as a product strategist.