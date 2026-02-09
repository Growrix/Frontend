# Blueprint DS Semantic Classes Registry

Quick reference for the **token-driven** `ui-*` classes used across the app.

**Goal**: predictable UI, no hardcoded values, and pages acting as consumers.

## Sources of truth

- DS CSS layers (the real SOT):
	- `src/ds/styles/ds.tokens.css` (tokens + theme overrides)
	- `src/ds/styles/ds.utilities.css` (layout/util utilities)
	- `src/ds/styles/ds.components.css` (component classes)
- Entry wiring:
	- `src/app/globals.css` imports `src/ds/styles/index.css`
- Working examples:
	- `src/app/component-library/*`

## Rules

- Prefer DS components via `@/ds` over raw class composition.
- Avoid hardcoded values in app code (`#...`, `rgb(...)`, `px`, etc.).
- Theme is controlled by `theme-*` class on `<html>` via `ThemeInitScript`.
- Use `data-platform`, `data-density`, `data-visual` knobs on wrappers when needed.

---

## Core layout / utilities (ds.utilities.css)

- `.ui-page`, `.ui-page-main`
- `.ui-container` (+ modifiers `--narrow|--wide|--full`)
- `.ui-section` (+ `--sm|--lg`)
- `.ui-stack` (+ `--tight|--compact`)
- `.ui-row` (+ `--between|--center`)
- `.ui-sticky-top`
- `.ui-focus-ring` (focus-visible ring)

---

## Common component classes (ds.components.css)

- Surfaces:
	- `.ui-card` (+ `.ui-card--compact`)
	- Runtime surfaces: `.ui-screen`, `.ui-sheet`, `.ui-overlay`, `.ui-fab`, `.ui-siderail`
- Inputs:
	- `.ui-input`, `.ui-textarea`, `.ui-select__control`
- Feedback:
	- `.ui-alert`, `.ui-banner`, `.ui-toast*`, `.ui-skeleton`, `.ui-empty*`
- Navigation:
	- `.ui-bottom-nav*`, `.ui-breadcrumbs*`, `.ui-tabs*`
- Overlays:
	- `.ui-popover__panel`, `.ui-tooltip*`, `.ui-cm*`

---

## Notes

- If you add or rename any `ui-*` class in DS CSS, update this file.
- Prefer **intent components** over “desktop/mobile component forks”; platform differences should be driven by runtime or scoped knobs.
