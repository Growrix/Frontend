# Workflow

Universal task-driven workflow for humans and AI.

## Execution Loop

1. Open the active `tasks.md`.
2. Pick one task with explicit scope and verification.
3. Read only the minimum required docs.
4. Confirm impacted files, dependencies, and risks.
5. Implement the smallest correct change.
6. Run the required quality gates.
7. Update task status, notes, and verification results.
8. Move to the next task only after the current one is complete or blocked.

## Frontend Mode And DS Policy

Before any frontend implementation begins:

1. Declare the UI mode:
	- `app-like-plus-desktop`
	- `desktop-plus-responsive`
2. Declare the DS policy:
	- `consume-only`
	- `approved-ds-change`
3. Record both in the active plan or task before editing files.

Default assumption:

- UI mode is not implied and must be written down.
- DS policy is `consume-only` unless explicitly changed by the user.

## Mandatory Inputs Per Task

Every implementation task must define:

- objective
- scope
- files or areas affected
- read-before refs
- verification commands
- done criteria

For backend, auth, billing, data, or operations work, also define:

- tenant or workspace scope
- auth or permission impact
- data or migration impact
- rollout or rollback note when risk is meaningful

## Read Order

Use this order for every task:

1. `README.md`
2. `CORE/CONSTITUTION.md`
3. `CORE/ENGINEERING-STANDARDS.md`
4. `CORE/QUALITY-GATES.md`
5. relevant runner doc
6. active project `tasks.md`
7. current task refs

For frontend tasks, add:

8. `STANDARDS/UI-DS-RULES.md`
9. `STANDARDS/APP-STRUCTURE.md`
10. `src/ds/DESIGN-SYSTEM-ANATOMY.md`
11. `src/ds/SEMANTIC-CLASSES-REGISTRY.md`

For creative frontend tasks such as homepage design, landing pages, marketing composition, visual redesign, wireframes, or theme work, also add:

12. `DDS/README.md`
13. `DDS/OPERATING/DESIGN-DECISION-SYSTEM.md`
14. `DDS/OPERATING/AI-EXECUTION-FLOW.md`
15. for full public websites, reusable templates, or market-specific theme families, the selected archetype from `DDS/ARCHETYPES/`
16. the specific mode from `DDS/MODES/` and preset from `DDS/PRESETS/` after the design decision is made

For backend, auth, billing, data, or operations tasks, add:

8. `STANDARDS/API-BACKEND-RULES.md`
9. `STANDARDS/SAAS-FOUNDATIONS.md`
10. the smallest relevant subset from `STACK_PROFILES/NEXTJS-SAAS/architecture/`, `security/`, `testing/`, `devops/`, or `operations/`

If the task touches a domain listed in `CORE/HANDBOOK-ROUTING.md`, also load the specific handbook chapter listed there. Do not load handbooks by default.

## Change Management

- If new work is discovered, add it to `tasks.md` before doing it.
- If scope changes, update the related `PLAN` or `SPEC` before broad implementation continues.
- If a rule conflict is found, stop and resolve the conflict instead of stacking new exceptions.

## Frontend Consumption Sequence

For any UI task, use this order:

1. choose the correct shell from `@/ds`
2. compose with DS primitives and components
3. use semantic `ui-*` classes only where needed
4. apply `data-platform`, `data-density`, or `data-visual` at a page root or shell wrapper only
5. use Tailwind only for narrow support work that does not override DS visual authority
6. open a separate DS task if the current DS truly cannot satisfy the need

## Stop Conditions

Stop execution when:

- the task lacks verification criteria
- required context is missing
- repeated failures suggest the task is underspecified
- implementation would create architecture drift
- a security or data-risk issue is discovered

## Anti-Chaos Rules

- Prompts do not override tasks.
- Tasks do not override the constitution.
- Reference material does not override active specs.
- Large context loads are a failure mode, not a strength.