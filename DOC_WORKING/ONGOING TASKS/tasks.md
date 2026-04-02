# DS Enhancement Tasks

**Source:** DS-GAP-ANALYSIS.md → DS-IMPLEMENTATION-PLAN.md
**DS Policy:** approved-ds-change
**Verification:** `npm run verify`

---

## T01 — Create ds.overrides.css and wire into cascade

**Objective:** Complete the 9-layer cascade by adding the missing overrides file.
**Scope:** Create `src/ds/styles/ds.overrides.css` with empty layer. Add `@import "./ds.overrides.css"` to `index.css`.
**Files:** `src/ds/styles/ds.overrides.css`, `src/ds/styles/index.css`
**Verification:** `npm run verify`
**Done criteria:** File exists, import wired, build passes, 9 layers physically match declaration.
**Status:** [x] completed
**Notes:** Created empty `ds.overrides.css` with `@layer ds.overrides {}`. Wired `@import "./ds.overrides.css"` as final import in `index.css`. Build passes.

---

## T02 — Remove duplicate class definitions from ds.components.css

**Objective:** Eliminate dead code where utilities layer shadows component layer.
**Scope:**
- Remove `.ui-divider` and `.ui-divider--vertical` from `ds.components.css` (keep in `ds.utilities.css`)
- Remove `.ui-hero` from `ds.components.css` (keep in `ds.utilities.css`)
- Move hero platform-knob overrides (`:where(html[data-platform="mobile"]) .ui-hero` etc.) from `ds.components.css` into `ds.utilities.css` (next to the hero utility)
**Files:** `src/ds/styles/ds.components.css`, `src/ds/styles/ds.utilities.css`
**Verification:** `npm run verify`
**Done criteria:** No duplicate `.ui-divider`, `.ui-divider--vertical`, or `.ui-hero` across layers. Hero platform overrides preserved in utilities.
**Status:** [x] completed
**Notes:** Removed `.ui-divider`, `.ui-divider--vertical`, `.ui-hero`, and all hero platform overrides from `ds.components.css`. Merged hero platform overrides into `ds.utilities.css` next to the hero utility.

---

## T03 — Implement .ui-theme-scope class

**Objective:** Deliver the documented but unimplemented `.ui-theme-scope` CSS class.
**Scope:**
- Add `.ui-theme-scope` to `ds.utilities.css` — should set `background: var(--ds-color-background); color: var(--ds-color-foreground);` to create a theme-scoped wrapper
- Add `themeScope: "ui-theme-scope"` to `src/ds/foundation/semantics/registry.ts`
**Files:** `src/ds/styles/ds.utilities.css`, `src/ds/foundation/semantics/registry.ts`
**Verification:** `npm run verify`, `npm run ds:audit`
**Done criteria:** Class exists in CSS, registered in TS, ds:audit passes.
**Status:** [x] completed
**Notes:** Added `.ui-theme-scope { background: var(--ds-color-background); color: var(--ds-color-foreground); }` in `ds.utilities.css`. Added `themeScope: "ui-theme-scope"` to `registry.ts`. ds:audit passes.

---

## T04 — Add light-theme visual knob overrides (glass + neumorph)

**Objective:** Make glass and neumorph visual knobs work correctly on light theme.
**Scope:**
- Add `html.theme-light[data-visual="glass"], [data-theme="light"][data-visual="glass"]` selector block with dark-translucent surface values
- Add `html.theme-light[data-visual="neumorph"], [data-theme="light"][data-visual="neumorph"]` selector block with light-appropriate shadow values
**Files:** `src/ds/styles/ds.tokens.css`
**Verification:** `npm run verify`
**Done criteria:** Glass surfaces visible on light backgrounds. Neumorph shadows appropriate for light backgrounds.
**Status:** [x] completed
**Notes:** Added light-theme glass overrides (`rgb(255 255 255 / 0.72)` surfaces, white borders, dark text) and light-theme neumorph overrides (white/neutral200 inset shadows, subtle box shadows) in `ds.tokens.css`.

---

## T05 — Define --ds-blur-surface in root scope

**Objective:** Prevent undefined token if referenced outside glass context.
**Scope:** Add `--ds-blur-surface: 0px;` to `:root` block in `ds.tokens.css` (near other blur tokens).
**Files:** `src/ds/styles/ds.tokens.css`
**Verification:** `npm run verify`
**Done criteria:** Token resolves to `0px` globally, overridden to `var(--ds-blur-lg)` inside glass knob.
**Status:** [x] completed
**Notes:** Added `--ds-blur-surface: 0px` to `:root` in `ds.tokens.css`. Token now resolves globally; glass knob overrides it to `var(--ds-blur-lg)`.

---

## T06 — Fix DESIGN-SYSTEM-ANATOMY.md inaccuracies

**Objective:** Make anatomy doc match actual implementation.
**Scope:**
1. Remove `demibold` from fontWeight table (line ~176). Correct list: `regular`, `book`, `medium`, `semibold`, `bold`
2. Remove or correct `themes/` legacy alias row — folder doesn't exist. `foundation/themes/` is the only path.
3. Add clarification in §4 token system that `foreground` = body/default text (intentionally subdued for reading comfort), `foreground-secondary` = emphasis/heading text (high contrast for titles).
**Files:** `src/ds/DESIGN-SYSTEM-ANATOMY.md`
**Verification:** Manual review.
**Done criteria:** No inaccurate claims. Foreground naming explicitly documented.
**Status:** [x] completed
**Notes:** (1) Removed `demibold` from fontWeight table — corrected to `regular, book, medium, semibold, bold`. (2) Removed non-existent `themes/` legacy alias row. (3) Corrected lineHeight and letterSpacing example keys. (4) Added "Foreground naming convention" subsection documenting that `foreground` = body text (subdued), `foreground-secondary` = emphasis/heading text.

---

## T07 — Update SEMANTIC-CLASSES-REGISTRY.md

**Objective:** Ensure markdown registry reflects final CSS state.
**Scope:** Verify all classes listed match actual CSS. Add any missing entries.
**Files:** `src/ds/SEMANTIC-CLASSES-REGISTRY.md`
**Verification:** `npm run ds:audit`
**Done criteria:** Registry and CSS are 1:1 in sync.
**Status:** [x] completed
**Notes:** Added `ds.overrides.css` to Sources of Truth list in SEMANTIC-CLASSES-REGISTRY.md. Verified all class entries match actual CSS state.

---

## T08 — Final verification

**Objective:** Confirm all changes pass the full pipeline.
**Scope:** Run `npm run verify` (typecheck → lint → test → build → ds:audit → ds:a11y).
**Files:** All modified files.
**Verification:** Exit code 0.
**Done criteria:** All gates green.
**Status:** [x] completed
**Notes:** `npm run verify` passed: typecheck ✓, lint ✓ (1 pre-existing warning), 126/126 tests ✓, build ✓, ds:audit ✓, ds:a11y ✓.
