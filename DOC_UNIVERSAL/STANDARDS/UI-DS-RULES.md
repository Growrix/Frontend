# UI And Design System Rules

Rules for using the existing Blueprint Design System correctly and preventing unauthorized DS edits, hardcoded UI, and inconsistent visual behavior.

## DS Authority

The current Design System is already implemented and must be treated as a protected, reusable system.

Primary DS references:

- `src/ds/index.ts`: single public UI API
- `src/ds/DESIGN-SYSTEM-ANATOMY.md`: DS operating guide
- `src/ds/SEMANTIC-CLASSES-REGISTRY.md`: DS-owned semantic class registry
- `src/ds/DS-COVERAGE-CHECKLIST.md`: DS change checklist
- `src/ds/styles/ds.tokens.css`: token and knob source of truth
- `src/ds/styles/ds.utilities.css`: semantic layout and utility classes
- `src/ds/styles/ds.components.css`: shared component classes
- `src/app/globals.css`: DS global style wiring

Location rule:

- DS code and DS-owned operating docs stay under `src/ds/` because they must version together with the implementation.
- `DOC/DS BUILDING/` is for DS handbook/reference material, not the live registry that tracks current classes 1:1.

## Default DS Policy

- Default mode is `consume-only`.
- Feature work must use the DS, not redesign it.
- Do not edit `src/ds/**`, DS theme wiring, DS style layers, or the semantic registry unless the task is explicitly approved as a DS change.
- If a task uncovers a real DS gap, create a separate approved DS task instead of patching DS internals during feature implementation.

## Public Import Boundary

- Import from `@/ds` only.
- Do not import DS internals directly from nested DS paths in app or feature code.
- Do not import external icon libraries directly from app or feature code when curated DS icons already exist.

## DS Consumption Hierarchy

Use this order when building UI:

1. choose the correct shell from `@/ds`
2. compose with DS primitives and DS components
3. use semantic `ui-*` classes only where needed
4. set root wrapper knobs such as `data-platform`, `data-density`, and `data-visual`
5. use Tailwind only as narrow support glue when it does not override DS authority

Pages are consumers. They are not the visual source of truth.

## Second Layer: Creative Direction

The DS prevents inconsistency. It does not automatically create a strong visual identity.

For homepages, landing pages, marketing sites, visual redesigns, wireframes, or theme creation, load:

- `DDS/README.md`
- `DDS/OPERATING/DESIGN-DECISION-SYSTEM.md`
- `DDS/OPERATING/AI-EXECUTION-FLOW.md`

For full public websites, reusable templates, or market-specific design systems, also load:

- the selected archetype from `DDS/ARCHETYPES/`

Use those files to decide the page type, intent, mode, preset, and composition strategy before composing DS blocks.

Rule:

- the DS defines what is safe and reusable
- the creative layer defines what the project should feel like
- do not expect the DS alone to solve bland or generic page composition

## Current UI Modes

### `app-like-plus-desktop`

Use this mode when the product should feel application-first across devices.

- Desktop uses shared shells such as `DashboardShell` or `PublicShell`.
- Mobile or tablet may use DS runtime app surfaces and presets such as `Screen`, `Sheet`, `BottomNavPreset`, `SideRail`, `SideRailPreset`, `ui-screen`, `ui-sheet`, `ui-fab`, and `ui-siderail`.
- Apply platform hints at the root wrapper or through runtime presets, not on random leaf components.
- Keep one information architecture across desktop and app-like surfaces.

### `desktop-plus-responsive`

Use this mode when the site is primarily web-first.

- Shared desktop or web shells remain the main structure.
- Smaller screens adapt through responsive composition and DS utilities such as `ui-only-mobile` and `ui-only-desktop`.
- Do not introduce app runtime surfaces unless the requirement explicitly asks for an app-like surface.

Every frontend plan and task must declare one of these modes.

## Theme And Runtime Knobs

- Theme is controlled by `ThemeInitScript` and `theme-*` classes on `html`.
- Density is controlled through `data-density`.
- Visual style is controlled through `data-visual` such as `glass`, `neumorph`, or `sleek`.
- Platform hints are controlled through `data-platform` or DS runtime presets.
- Set these knobs at the page shell or root wrapper. Do not scatter them across child components.

## Tailwind Usage Policy

- Tailwind is available because the starter kit uses Next.js, React, and Tailwind CSS.
- Tailwind may be used for narrow layout support or framework interop when the DS does not already provide a better abstraction.
- Tailwind must not replace DS-managed colors, spacing, shadows, radii, typography, or theme behavior.
- Avoid raw visual utilities such as `bg-*`, `text-*`, `border-*`, `shadow-*`, `rounded-*`, `dark:*`, and arbitrary pixel or color values in feature UI when the DS already covers the need.

## Required UI States

Every meaningful screen or component should define:

- default
- loading
- empty
- error
- success
- disabled
- responsive behavior
- keyboard and focus behavior when interactive

## When A DS Change Is Allowed

Update the DS only when:

- the user explicitly approves a DS change
- the task is marked as an approved DS task
- the change is truly shared and reusable

When a DS change is approved:

- edit the correct DS layer instead of patching feature code
- update `src/ds/index.ts` if the public API changes
- update `src/ds/SEMANTIC-CLASSES-REGISTRY.md` if `ui-*` classes are added or renamed
- update task notes to explain the DS impact clearly

## DS Verification Toolchain

The DS has dedicated verification commands. Use them during DS work and feature work that touches UI.

| Command | Purpose |
|---------|--------|
| `npm run ds:audit` | Static audit for undefined tokens and registry sync |
| `npm run ds:a11y` | DS accessibility test suite (keyboard, focus trap, ARIA) |
| `npm run verify` | Full pipeline: typecheck → lint → test → build → ds:audit → ds:a11y |

For approved DS changes, follow `src/ds/DS-COVERAGE-CHECKLIST.md` before merge.

## Mandatory Read-Before For Frontend Tasks

- `src/ds/DESIGN-SYSTEM-ANATOMY.md` (authoritative DS guide)
- `src/ds/DS-COVERAGE-CHECKLIST.md` (for DS changes)
- `src/ds/SEMANTIC-CLASSES-REGISTRY.md`
- `STANDARDS/APP-STRUCTURE.md`
- this file

## Hard Rules

- No hardcoded colors if a DS or token system exists.
- No page-only visual forks that should be DS variants.
- No duplicate component patterns with minor cosmetic changes.
- No unauthorized DS edits.
- No inaccessible interactive elements.
- Shared shells must preserve the global skip-link and main-landmark contract.

## Validation Questions

- Is the task `consume-only` or an approved DS change?
- Is the chosen UI mode explicit?
- Can another page reuse this UI without copying it?
- Are visual values traceable to a central source?
- Are root knobs set at the correct level?
- Does the component behave consistently across screen sizes and states?