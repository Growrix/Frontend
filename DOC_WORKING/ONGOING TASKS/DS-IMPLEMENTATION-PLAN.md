# DS Enhancement Implementation Plan

**Date:** 2026-04-02
**Source:** DS-GAP-ANALYSIS.md
**DS Policy:** approved-ds-change
**UI Mode:** N/A (DS infrastructure task)

---

## Execution Order (dependency-based)

### Phase 1: Layer Infrastructure (GAP-01)
Create `ds.overrides.css` and wire it into `index.css`.
**Deps:** None. Must be done first so subsequent work can verify full cascade.
**Files:** `src/ds/styles/ds.overrides.css`, `src/ds/styles/index.css`

### Phase 2: Eliminate Duplicate Classes (GAP-02)
Remove `.ui-divider`, `.ui-divider--vertical`, and `.ui-hero` + platform overrides from `ds.components.css`.
Keep the canonical versions in `ds.utilities.css` (which already has the correct implementations).
Move hero platform-knob overrides from `ds.components.css` to `ds.utilities.css` (they belong with the hero utility).
**Deps:** Phase 1 (clean cascade needed for verification).
**Files:** `src/ds/styles/ds.components.css`, `src/ds/styles/ds.utilities.css`

### Phase 3: Implement `.ui-theme-scope` (GAP-03 + GAP-10)
Add the CSS class to `ds.utilities.css` that applies background + foreground for scoped theme wrappers.
Add `themeScope: "ui-theme-scope"` to `semantics/registry.ts`.
**Deps:** None.
**Files:** `src/ds/styles/ds.utilities.css`, `src/ds/foundation/semantics/registry.ts`

### Phase 4: Visual Knob Light-Theme Overrides (GAP-04 + GAP-08)
Add `html.theme-light[data-visual="glass"]` overrides with dark-translucent surface values.
Add `html.theme-light[data-visual="neumorph"]` overrides with light-appropriate shadow values.
**Deps:** None.
**Files:** `src/ds/styles/ds.tokens.css`

### Phase 5: Define `--ds-blur-surface` in Root Scope (GAP-07)
Add `--ds-blur-surface: 0px;` to `:root` in `ds.tokens.css` so references outside glass context resolve safely.
**Deps:** None.
**Files:** `src/ds/styles/ds.tokens.css`

### Phase 6: Fix Documentation (GAP-05 + GAP-06)
1. Remove `demibold` from the fontWeight table in DESIGN-SYSTEM-ANATOMY.md.
2. Remove or correct the `themes/` legacy alias reference in DESIGN-SYSTEM-ANATOMY.md.
3. Add explicit foreground naming documentation to clarify that `foreground` = body/default (subdued), `foreground-secondary` = emphasis/headings (high contrast).
**Deps:** All CSS phases complete so docs match final state.
**Files:** `src/ds/DESIGN-SYSTEM-ANATOMY.md`

### Phase 7: Update SEMANTIC-CLASSES-REGISTRY.md
Ensure the markdown registry matches the final CSS state after all phases.
**Deps:** Phase 3 (theme-scope class added).
**Files:** `src/ds/SEMANTIC-CLASSES-REGISTRY.md`

### Phase 8: Final Verification
Run `npm run verify` to confirm all changes pass the full pipeline.
**Deps:** All phases.

---

## Risk Assessment

- **Low risk:** All changes are additive or remove dead code. No consumer-facing API changes.
- **Snapshot update possible:** If hero/divider changes affect shell snapshot tests, update snapshots.
- **No new dependencies.**
