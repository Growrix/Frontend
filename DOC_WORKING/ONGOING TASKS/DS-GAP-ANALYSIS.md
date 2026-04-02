# DS Gap Analysis — Blueprint Design System

**Date:** 2026-04-02
**Scope:** Full audit of `src/ds/` against `DOC_UNIVERSAL/` rules
**Baseline:** `npm run verify` passes (126 tests, build clean)

---

## Critical Gaps

### GAP-01: ds.overrides.css missing (Layer 9 declared but no file)

**Rule violated:** DESIGN-SYSTEM-ANATOMY §3 — 9-layer cascade
**Evidence:** `index.css` line 6 declares `ds.overrides` layer but no `@import "./ds.overrides.css"` exists, and the file does not exist.
**Impact:** The override escape hatch documented in the anatomy is unusable. Any code expecting an overrides layer gets nothing.
**Fix:** Create `ds.overrides.css` with empty `@layer ds.overrides {}` and add import to `index.css`.

### GAP-02: Duplicate class definitions across layers (ui-divider, ui-hero)

**Rule violated:** Ch 17 — one implementation per class, one layer
**Evidence:**
- `.ui-divider` defined in BOTH `ds.components.css` (line ~1323, `border: 0; height: 1px; background:`) AND `ds.utilities.css` (line ~1186, `border: none; border-top:`)
- `.ui-hero` defined in BOTH `ds.components.css` (line ~393, with platform overrides) AND `ds.utilities.css` (line ~447)
- `.ui-divider--vertical` also duplicated in both files with different implementations
**Impact:** Utilities layer (8) overrides components layer (6), causing dead code and unpredictable behavior if layer order ever changes.
**Fix:** Remove duplicates. Keep `.ui-divider` and `.ui-divider--vertical` in `ds.utilities.css` only. Consolidate `.ui-hero` into `ds.utilities.css` only.

### GAP-03: `.ui-theme-scope` class missing

**Rule violated:** SEMANTIC-CLASSES-REGISTRY.md — every listed class must exist in CSS
**Evidence:** `ui-theme-scope` is listed in SEMANTIC-CLASSES-REGISTRY.md as "Paints a scoped theme wrapper with its own background + text color" but:
- NOT implemented in any CSS file
- NOT in `foundation/semantics/registry.ts`
**Impact:** Documented feature silently fails when consumed.
**Fix:** Implement `.ui-theme-scope` in `ds.utilities.css` and add to `registry.ts`.

### GAP-04: Glass visual knob has no light-theme override

**Rule violated:** Ch 16 §5 — visual knobs must work across all themes
**Evidence:** Glass knob in `ds.tokens.css` uses `rgb(255 255 255 / 0.06)` for surfaces — white translucent values designed for dark backgrounds. No `html.theme-light[data-visual="glass"]` override exists.
**Impact:** Glass visual knob produces nearly invisible surfaces on light theme backgrounds.
**Fix:** Add light-theme glass overrides with dark translucent values (e.g. `rgb(0 0 0 / 0.04)`).

---

## Medium Gaps

### GAP-05: Foreground color naming inversion

**Evidence:** In both themes, `--ds-color-foreground-secondary` is visually MORE prominent than `--ds-color-foreground`:
- Dark: foreground = neutral-400 (medium gray), secondary = neutral-50 (near-white)
- Light: foreground = neutral-700, secondary = neutral-950 (almost black)

The word "secondary" conventionally implies less prominent, but here it's the stronger color used for headings/titles.

**Impact:** Confusing for consumers. Every heading class uses `foreground-secondary` for max contrast, while `foreground` is used for body text at reduced contrast. The naming is backwards from convention.
**Decision needed:** This is a cosmetic naming issue. The actual color assignments work correctly — body text is intentionally muted, headings are emphasized. Renaming would require a large refactor (all CSS + components + consumer code). **Recommendation:** Document the semantic meaning explicitly rather than rename. In the DS, `foreground` = body/default text (intentionally subdued for reading comfort), `foreground-secondary` = emphasis/heading text (high contrast).

### GAP-06: DESIGN-SYSTEM-ANATOMY.md inaccuracies

**Evidence:**
1. Line 176: fontWeight table lists `demibold` which doesn't exist in tokens or vars.ts. Correct set: thin, light, regular, book, medium, semibold, bold, extrabold, black.
2. Architecture section mentions `themes/` as "legacy alias (same content as foundation/themes)" — but `src/ds/themes/` doesn't exist as a filesystem folder.
**Impact:** Misleading documentation for consumers.
**Fix:** Update the anatomy doc to remove `demibold`, correct the `themes/` reference.

### GAP-07: `--ds-blur-surface` token scoped only inside glass knob

**Evidence:** `--ds-blur-surface: var(--ds-blur-lg)` is defined ONLY inside the `[data-visual="glass"]` scope. Not defined in `:root`.
**Impact:** If any component references `--ds-blur-surface` outside glass context, it resolves to nothing.
**Fix:** Define `--ds-blur-surface` in `:root` with a sensible default (e.g. `0px` or `none`), then override in glass knob.

### GAP-08: Neumorph visual knob has no light-theme override

**Evidence:** Similar to glass, the neumorph knob uses dark-optimized shadow values. No light-theme-specific neumorph overrides exist.
**Impact:** Neumorph effect looks incorrect on light backgrounds.
**Fix:** Add light-theme neumorph overrides with appropriate highlight/shadow colors.

---

## Low Gaps

### GAP-09: ds.patterns.css is still a placeholder

**Evidence:** File contains only `@layer ds.patterns { /* Placeholder — pattern styles added in Phase 9. */ }`
**Impact:** Multi-component pattern styles have no home. Currently pattern compositions are inline.
**Note:** This is documented as intentional — populated when recurring patterns are identified.
**Fix:** Leave as-is but note that the first real pattern should go here when identified.

### GAP-10: Semantic registry missing `themeScope` key

**Evidence:** `SEMANTIC_CLASSES` object in `registry.ts` has no `themeScope` entry for the `ui-theme-scope` class.
**Impact:** Coupled to GAP-03 — once the CSS class is implemented, the registry must be updated.
**Fix:** Add `themeScope: "ui-theme-scope"` to registry after CSS implementation.

---

## Verified — No Gaps

| Area | Status |
|------|--------|
| Token system completeness (all families in vars.ts) | ✅ |
| All registered semantic classes exist in CSS | ✅ (except ui-theme-scope) |
| CSS layer ordering in index.css | ✅ |
| Theme light/dark/purple token overrides | ✅ |
| Scoped `[data-theme]` support | ✅ |
| Density knobs (compact/spacious) | ✅ |
| Platform knob (mobile) | ✅ |
| High-contrast / forced-colors media queries | ✅ |
| Prefers-reduced-motion support | ✅ |
| z-index scale | ✅ |
| vars.ts <-> ds.tokens.css 1:1 sync | ✅ |
| No undefined `--ds-*` references in CSS | ✅ |
| barrel export (index.ts) completeness | ✅ |
| foundation/index.ts exports | ✅ |
| reset, base, theme layers | ✅ |
| All 126 tests pass | ✅ |
| Build clean | ✅ |
| DS audit clean | ✅ |
| DS a11y clean | ✅ |
