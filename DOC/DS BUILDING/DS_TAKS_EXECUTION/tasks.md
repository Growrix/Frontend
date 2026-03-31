# Tasks: Blueprint Design System — Full Rebuild Per Handbook

**Input**: Frontend Handbook chapters in `DOC/DS BUILDING/HandBook_Frontend/`
**Prerequisites**: All 21 handbook files (00–20) must exist before execution begins.

---

## Master References (AI must read before ANY task)

| Priority | File | Purpose |
|----------|------|---------|
| 1 | `DOC_UNIVERSAL/README.md` | AI authority model, read policy, success criteria |
| 2 | `DOC_UNIVERSAL/CORE/CONSTITUTION.md` | Non-negotiable project rules |
| 3 | `DOC_UNIVERSAL/CORE/ENGINEERING-STANDARDS.md` | Stack, coding, routing, DS rules |
| 4 | `DOC_UNIVERSAL/CORE/QUALITY-GATES.md` | Mandatory checks before any task is "done" |
| 5 | `DOC_UNIVERSAL/STANDARDS/UI-DS-RULES.md` | DS authority, consumption hierarchy, import boundary |
| 6 | `DOC/DS BUILDING/HandBook_Frontend/00-OVERVIEW.md` | Handbook master index + 5-layer taxonomy |
| 7 | `src/ds/DESIGN-SYSTEM-ANATOMY.md` | Current DS operating guide (will be updated as we rebuild) |
| 8 | `DOC/DS BUILDING/DS_TAKS_EXECUTION/tasks.md` | **This file** — the execution plan |

## Handbook Chapter Map (actual files)

| # | File | Domain | Implementation Phase |
|---|------|--------|---------------------|
| 01 | `01-TYPOGRAPHY.md` | Typography | Phase 1 (tokens) + Phase 3 (utilities) |
| 02 | `02-COLOR-SYSTEM.md` | Color System | Phase 1 (tokens) + Phase 2 (theme) + Phase 3 (utilities) |
| 03 | `03-SPACING-LAYOUT.md` | Spacing & Layout | Phase 1 (tokens) + Phase 3 (utilities) |
| 04 | `04-MOTION-ANIMATION.md` | Motion & Animation | Phase 1 (tokens) + Phase 3 (utilities) |
| 05 | `05-ELEVATION-DEPTH.md` | Elevation & Depth | Phase 1 (tokens) + Phase 3 (utilities) |
| 06 | `06-BORDERS-RADIUS.md` | Borders & Radius | Phase 1 (tokens) + Phase 3 (utilities) |
| 07 | `07-ICONOGRAPHY.md` | Iconography | Phase 5 |
| 08 | `08-RESPONSIVE-BREAKPOINTS.md` | Responsive & Breakpoints | Phase 3 (utilities) + Phase 4 |
| 09 | `09-ACCESSIBILITY.md` | Accessibility | Phase 6 (cross-cutting, verified in every phase) |
| 10 | `10-INTERACTIVE-STATES.md` | Interactive States | Phase 3 (utilities) + Phase 7 (primitives) |
| 11 | `11-FORM-ANATOMY.md` | Form Anatomy | Phase 8 |
| 12 | `12-DATA-DISPLAY.md` | Data Display | Phase 9 |
| 13 | `13-NAVIGATION-PATTERNS.md` | Navigation Patterns | Phase 10 |
| 14 | `14-OVERLAY-PATTERNS.md` | Overlay Patterns | Phase 11 |
| 15 | `15-FEEDBACK-PATTERNS.md` | Feedback Patterns | Phase 12 |
| 16 | `16-THEMING-ARCHITECTURE.md` | Theming Architecture | Phase 2 |
| 17 | `17-CSS-ARCHITECTURE.md` | CSS Architecture | Phase 0 (contract) |
| 18 | `18-TOKEN-ARCHITECTURE.md` | Token Architecture | Phase 0 (contract) |
| 19 | `19-COMPONENT-API-PATTERNS.md` | Component API Patterns | Phase 0 (contract) + Phase 7 |
| 20 | `20-DOCUMENTATION-TESTING.md` | Documentation & Testing | Phase 13 |

## DS Target Files (what gets rebuilt)

| Layer | File | Role |
|-------|------|------|
| Layer order | `src/ds/styles/index.css` | CSS layer ordering + imports |
| Tokens | `src/ds/styles/ds.tokens.css` | All CSS custom properties |
| Theme | `src/ds/styles/ds.theme.css` | color-scheme per theme |
| Base | `src/ds/styles/ds.base.css` | Element reset, body, global base |
| Utilities | `src/ds/styles/ds.utilities.css` | Layout + typography + color + state helpers |
| Components | `src/ds/styles/ds.components.css` | Component class implementations |
| Barrel | `src/ds/index.ts` | Single public API (import from `@/ds`) |
| Icons | `src/ds/icons.ts` | Curated icon re-exports |
| Foundation | `src/ds/foundation/` | Tokens TS, themes, semantics, a11y, motion |
| Primitives | `src/ds/primitives/` | Low-level building blocks |
| Components | `src/ds/components/` | Higher-level composed components |
| Layouts | `src/ds/layouts/` | Page shells |
| Runtime | `src/ds/runtime/` | Platform adapters |
| Composition | `src/ds/composition/` | Templates, patterns, blocks |

## Execution Rules

1. **Read the handbook chapter TOP TO BOTTOM** before implementing. No partial reads.
2. **Every section** of every referenced chapter must have a corresponding implementation. Nothing skipped.
3. **No legacy aliases**. Fresh naming per handbook. Remove old aliases entirely.
4. **No duplicates**. One class per role. One token per value. One component per job.
5. **Token-first**. Implement tokens before classes. Classes before components. Components before patterns.
6. **Delete before adding**. Remove the old implementation of a section, then write the new one.
7. **Verify after every task**. Run `npm run verify` after each task. Fix before proceeding.
8. **Update DESIGN-SYSTEM-ANATOMY.md** whenever the public API surface changes.
9. **Update DOC/SEMANTIC-CLASSES-REGISTRY.md** whenever `ui-*` or `text-*` classes change.
10. **No improvisation**. If the handbook doesn't specify it, don't add it. The handbook is the scope boundary.

## Naming Contract (locked for entire rebuild)

### Token naming
```
--ds-{family}-{name}
--ds-font-size-{n}           (scale steps: 1–12)
--ds-font-weight-{name}      (thin, light, regular, book, medium, semibold, bold, extrabold, black)
--ds-line-height-{name}      (none, tight, snug, normal, relaxed, loose)
--ds-letter-spacing-{name}   (tighter, tight, normal, wide, wider, widest)
--ds-color-{semantic-role}    (background, surface, border, foreground, accent, success, warning, danger, info)
--ds-palette-{hue}-{step}    (neutral-0..950, brand-50..950, success/warning/danger/info-600)
--ds-space-{n}               (0–9 scale)
--ds-radius-{name}           (sm, default, md, lg, xl, full)
--ds-shadow-{name}           (xs, sm, md, lg, xl)
--ds-z-{name}                (sticky, dropdown, modal, drawer, tooltip, toast)
--ds-duration-{name}         (instant, fast, normal, slow, slower)
--ds-ease-{name}             (standard, in, out, in-out, spring, bounce)
```

### Utility class naming
```
Typography:    .text-display-{1-3}, .text-heading-{1-6}, .text-body, .text-body-large, .text-body-small
               .text-label, .text-caption, .text-overline, .text-micro, .text-quote, .text-code, .text-kbd
Color:         .text-muted, .text-accent, .text-success, .text-warning, .text-danger, .text-info
               .text-inherit, .bg-surface, .bg-accent, .bg-success, .bg-warning, .bg-danger, .bg-info
Layout:        .ui-page, .ui-container, .ui-stack, .ui-row, .ui-grid, .ui-grid--{2-4}, .ui-section
Truncation:    .text-truncate, .text-line-clamp-{1-5}
Wrapping:      .text-nowrap, .text-balance, .text-pretty, .break-words, .break-all
Alignment:     .text-start, .text-center, .text-end
Transform:     .uppercase, .lowercase, .capitalize, .normal-case
Decoration:    .underline, .line-through, .no-underline
Selection:     .select-none, .select-text, .select-all
Prose:         .prose, .prose-sm, .prose-lg, .prose-xl
Responsive:    .ui-only-mobile, .ui-only-desktop, .ui-only-tablet
States:        .ui-focus-ring, .ui-disabled, .ui-loading
```

### Component class naming
```
.ui-{component}                   → base class (e.g. .ui-button)
.ui-{component}--{variant}        → variant modifier (e.g. .ui-button--primary)
.ui-{component}--{size}           → size modifier (e.g. .ui-button--sm)
.ui-{component}__{child}          → child element (e.g. .ui-card__header)
```

### React component API pattern
```tsx
type ComponentProps = React.HTML*Attributes<Element> & {
  variant?: "primary" | "secondary" | "ghost";  // visual variant
  size?: "sm" | "md" | "lg";                    // size variant
  tone?: "neutral" | "accent" | "success" | "warning" | "danger" | "info";  // semantic color
  className?: string;                            // always passthrough
  children?: React.ReactNode;                    // composition
}
```

---

## Phase 0: Architecture Contract ⚠️ GATE — Must complete before ALL other phases

**Read FULLY before any implementation:**
- `DOC/DS BUILDING/HandBook_Frontend/17-CSS-ARCHITECTURE.md` (all sections)
- `DOC/DS BUILDING/HandBook_Frontend/18-TOKEN-ARCHITECTURE.md` (all sections)
- `DOC/DS BUILDING/HandBook_Frontend/19-COMPONENT-API-PATTERNS.md` (all sections)

**Deliverable:** The naming contract above is frozen. `src/ds/styles/index.css` layer order is confirmed.

- [ ] T001 Read Ch 17 (CSS Architecture) — confirm 5-layer cascade stays: `@layer ds.tokens, ds.theme, ds.base, ds.utilities, ds.components;` — verify naming methodology matches handbook BEM/ITCSS rules → update `src/ds/styles/index.css` if needed
- [ ] T002 Read Ch 18 (Token Architecture) — confirm 3-tier token model (primitive → semantic → component) will be applied to `src/ds/styles/ds.tokens.css` → document any deviations from current token naming in a comment block at top of tokens file
- [ ] T003 Read Ch 19 (Component API Patterns) — confirm prop naming patterns (variant/size/tone/className/children) → create shared utility `src/ds/utils/cx.ts` to replace per-file cx() duplication
- [ ] T004 [P] Delete re-export barrels that duplicate the main barrel: remove `src/ds/structures/` folder contents (keep folder with README explaining it's deprecated), remove `src/ds/interactions/` folder contents (same)
- [ ] T005 Verify `npm run verify` passes after Phase 0 changes

### Phase 0 Validation
- [ ] Layer order confirmed in `src/ds/styles/index.css`
- [ ] Token naming convention documented
- [ ] Component API patterns documented
- [ ] cx() utility extracted to shared location
- [ ] Re-export barrel duplication eliminated
- [ ] `npm run verify` passes

---

## Phase 1: Foundation Tokens ⚠️ GATE — Must complete before Phase 2+

**Read FULLY before implementing:**
- `DOC/DS BUILDING/HandBook_Frontend/01-TYPOGRAPHY.md` — Sections 1–5, 25 (token inventory)
- `DOC/DS BUILDING/HandBook_Frontend/02-COLOR-SYSTEM.md` — all palette + semantic color token sections
- `DOC/DS BUILDING/HandBook_Frontend/03-SPACING-LAYOUT.md` — space scale + z-index sections
- `DOC/DS BUILDING/HandBook_Frontend/04-MOTION-ANIMATION.md` — duration + easing token sections
- `DOC/DS BUILDING/HandBook_Frontend/05-ELEVATION-DEPTH.md` — shadow scale + depth token sections
- `DOC/DS BUILDING/HandBook_Frontend/06-BORDERS-RADIUS.md` — border-width + radius scale token sections

**Target file:** `src/ds/styles/ds.tokens.css` — FULL REWRITE of `:root {}` block

- [ ] T006 Rewrite typography tokens in `src/ds/styles/ds.tokens.css`:
  - Font families: `--ds-font-sans`, `--ds-font-display`, `--ds-font-mono` (keep current values, clean comments)
  - Font size scale: expand from 7 to 12 steps (`--ds-font-size-1` through `--ds-font-size-12`) per Ch 01 §2
  - Fluid font sizes: add `--ds-font-size-fluid-body`, `--ds-font-size-fluid-h1`, `--ds-font-size-fluid-h2`, `--ds-font-size-fluid-display` per Ch 01 §11
  - Font weights: expand to full scale (`thin` 100, `light` 300, `regular` 400, `book` 450, `medium` 500, `semibold` 600, `bold` 700, `extrabold` 800, `black` 900) per Ch 01 §3 — remove `demibold`
  - Line heights: expand to full scale (`none` 1, `tight` 1.2, `snug` 1.3, `normal` 1.5, `relaxed` 1.75, `loose` 2) per Ch 01 §4 — remove `section` and `meta` (non-standard)
  - Letter spacing: expand to full scale (`tighter` −0.05em, `tight` −0.02em, `normal` 0, `wide` 0.02em, `wider` 0.05em, `widest` 0.1em) per Ch 01 §5 — remove `loose` alias

- [ ] T007 Rewrite color tokens in `src/ds/styles/ds.tokens.css`:
  - Palette neutrals: keep current neutral 0–950 scale (verified adequate per Ch 02)
  - Palette brand: keep current brand 50–950 scale
  - Palette status: expand from single-value (success-600) to at least 3-step per status (e.g. success-500, success-600, success-700) for hover/active states per Ch 02
  - Semantic colors: keep `--ds-color-background`, `--ds-color-surface`, `--ds-color-border`, `--ds-color-foreground`, `--ds-color-foreground-secondary`, `--ds-color-accent`, `--ds-color-primary`, status colors
  - Add missing semantic tokens: `--ds-color-surface-elevated`, `--ds-color-surface-sunken`, `--ds-color-on-primary`, `--ds-color-on-accent`, `--ds-color-on-success/warning/danger/info` per Ch 02
  - Remove legacy aliases: delete `--ds-color-bg`, `--ds-color-text`, `--ds-color-fg`, `--ds-color-fg-muted`, `--ds-color-surface-2` — use only standard names
  - Keep RGB helpers for the accent/status colors

- [ ] T008 Rewrite spacing tokens in `src/ds/styles/ds.tokens.css`:
  - Space scale: keep `--ds-space-0` through `--ds-space-9` (4px base, verified per Ch 03)
  - Add `--ds-space-10` through `--ds-space-12` for larger layout gaps per Ch 03
  - Semantic spacing: keep card-padding, modal-padding, form-gap, section-margin, heading-margin, button/input padding, nav-padding
  - Container tokens: keep `--ds-container-max`, `--ds-container-narrow`, `--ds-container-wide`

- [ ] T009 [P] Rewrite motion tokens in `src/ds/styles/ds.tokens.css`:
  - Easing: expand to `--ds-ease-standard`, `--ds-ease-in`, `--ds-ease-out`, `--ds-ease-in-out`, `--ds-ease-spring`, `--ds-ease-bounce` per Ch 04
  - Duration: expand to `--ds-duration-instant` (50ms), `--ds-duration-fast` (120ms), `--ds-duration-normal` (200ms), `--ds-duration-slow` (300ms), `--ds-duration-slower` (500ms) per Ch 04

- [ ] T010 [P] Rewrite shadow/elevation tokens in `src/ds/styles/ds.tokens.css`:
  - Shadow scale: expand to `--ds-shadow-xs`, `--ds-shadow-sm`, `--ds-shadow-md`, `--ds-shadow-lg`, `--ds-shadow-xl` per Ch 05
  - Add `--ds-shadow-inner` for inset shadows per Ch 05
  - Add backdrop-filter token: `--ds-backdrop-blur` per Ch 05

- [ ] T011 [P] Rewrite radius tokens in `src/ds/styles/ds.tokens.css`:
  - Radius scale: standardize to `--ds-radius-none` (0), `--ds-radius-sm` (0.125rem), `--ds-radius-default` (0.25rem), `--ds-radius-md` (0.375rem), `--ds-radius-lg` (0.5rem), `--ds-radius-xl` (0.75rem), `--ds-radius-2xl` (1rem), `--ds-radius-full` (9999px) per Ch 06
  - Remove old aliases: delete `--ds-radius-card`, `--ds-radius-modal`, `--ds-radius-1/2/3`
  - Add border-width tokens: `--ds-border-width-thin` (1px), `--ds-border-width-default` (1px), `--ds-border-width-thick` (2px), `--ds-border-width-heavy` (4px) per Ch 06

- [ ] T012 Rewrite z-index tokens in `src/ds/styles/ds.tokens.css`:
  - Keep existing: `--ds-z-sticky`, `--ds-z-dropdown`, `--ds-z-modal`, `--ds-z-drawer`, `--ds-z-tooltip`, `--ds-z-toast`
  - Verify values follow handbook z-index architecture per Ch 05 / Ch 03

- [ ] T013 Rewrite sizing tokens in `src/ds/styles/ds.tokens.css`:
  - Keep layout dimensions: hero-min-h, header-h, viewport-minus-header
  - Keep touch-target, input-min-h, button sizes, icon sizes, fab, tabs-h, bottom-nav-h, selection-control
  - Keep shell sizing tokens
  - Remove non-standard or unused sizing tokens
  - Clean up comments — remove "Yahoo-like" and "SolarConnect" references

- [ ] T014 [P] Update `src/ds/foundation/tokens/vars.ts` — add TypeScript references for all new tokens added in T006–T013. Remove references to deleted tokens.

- [ ] T015 Verify `npm run verify` passes after Phase 1

### Phase 1 Validation
- [ ] Typography tokens cover Ch 01 §25 inventory completely (all families, 12 font sizes, fluid sizes, all weights, all line-heights, all letter-spacings)
- [ ] Color tokens cover Ch 02 palette + semantic inventory completely
- [ ] Spacing tokens cover Ch 03 scale completely
- [ ] Motion tokens cover Ch 04 duration + easing completely
- [ ] Shadow tokens cover Ch 05 scale completely
- [ ] Radius + border tokens cover Ch 06 scale completely
- [ ] Z-index tokens cover Ch 03/05 z-index section
- [ ] No legacy aliases remain (`--ds-color-bg`, `--ds-color-text`, `--ds-color-fg`, `--ds-color-fg-muted`, etc.)
- [ ] No "Yahoo-like" or "SolarConnect" comments remain
- [ ] `vars.ts` exports match new token set 1:1
- [ ] `npm run verify` passes

---

## Phase 2: Theme System ⚠️ GATE — Must complete before Phase 3+

**Read FULLY before implementing:**
- `DOC/DS BUILDING/HandBook_Frontend/16-THEMING-ARCHITECTURE.md` (all sections)
- `DOC/DS BUILDING/HandBook_Frontend/02-COLOR-SYSTEM.md` — dark/light mode sections, contrast sections

**Target files:** `src/ds/styles/ds.theme.css`, `src/ds/styles/ds.tokens.css` (theme override blocks), `src/ds/foundation/themes/`

- [ ] T016 Rewrite `src/ds/styles/ds.theme.css` — implement `color-scheme` mapping per Ch 16: `html.theme-light { color-scheme: light; }`, `html.theme-dark { color-scheme: dark; }`, `html.theme-purple { color-scheme: dark; }` — clean and minimal
- [ ] T017 Rewrite theme override blocks in `src/ds/styles/ds.tokens.css`:
  - `html.theme-light {}` — override all semantic color tokens for light mode (background, surface, border, foreground, foreground-secondary, accent, accent-foreground, on-primary, overlay, text-muted, focus-ring, accent-hover, accent-active, plus any new tokens from T007)
  - `html.theme-purple {}` — override brand palette tokens for purple variant
  - Ensure every new semantic token from T007 has a light-mode override
  - Remove any redundant re-declarations (tokens that don't change per theme)
- [ ] T018 Rewrite density + visual + platform knob overrides in `src/ds/styles/ds.tokens.css`:
  - `[data-density="compact"]` — override spacing tokens per Ch 16
  - `[data-visual="glass"]` — override shadow tokens per Ch 16
  - `[data-visual="neumorph"]` — override shadow tokens per Ch 16
  - `[data-visual="sleek"]` — override shadow + radius tokens per Ch 16
  - `[data-platform="mobile"]` — override touch-target + nav sizing per Ch 16
- [ ] T019 Update `src/ds/foundation/themes/registry.ts` — ensure ThemeName type, THEMES array, and DEFAULT_THEME match new theme structure. Clean up any stale exports.
- [ ] T020 Verify theme switching works: `ThemeInitScript` in layout, `applyTheme()` + `storeTheme()` utilities, `ThemeSwitcher` component — update if any token names changed in Phase 1
- [ ] T021 Verify `npm run verify` passes after Phase 2

### Phase 2 Validation
- [ ] Light theme overrides every semantic color token
- [ ] Purple theme overrides brand palette
- [ ] Density/visual/platform knobs all work
- [ ] Theme init script prevents FOUC
- [ ] `color-scheme` declared per Ch 16
- [ ] `npm run verify` passes

---

## Phase 3: Base Styles + Utilities ⚠️ GATE — Must complete before Phase 4+

**Read FULLY before implementing:**
- `DOC/DS BUILDING/HandBook_Frontend/01-TYPOGRAPHY.md` — Sections 6–24 (all class/utility sections)
- `DOC/DS BUILDING/HandBook_Frontend/02-COLOR-SYSTEM.md` — color utility class sections
- `DOC/DS BUILDING/HandBook_Frontend/03-SPACING-LAYOUT.md` — layout utility class sections
- `DOC/DS BUILDING/HandBook_Frontend/04-MOTION-ANIMATION.md` — animation utility class sections
- `DOC/DS BUILDING/HandBook_Frontend/05-ELEVATION-DEPTH.md` — shadow/glass utility class sections
- `DOC/DS BUILDING/HandBook_Frontend/06-BORDERS-RADIUS.md` — border/ring utility sections
- `DOC/DS BUILDING/HandBook_Frontend/08-RESPONSIVE-BREAKPOINTS.md` — breakpoint + responsive utility sections
- `DOC/DS BUILDING/HandBook_Frontend/10-INTERACTIVE-STATES.md` — state utility sections

**Target files:** `src/ds/styles/ds.base.css` (rewrite), `src/ds/styles/ds.utilities.css` (full rewrite)

### 3.1: Base Styles
- [ ] T022 Rewrite `src/ds/styles/ds.base.css`:
  - HTML + body reset: box-sizing, margin, overflow, scroll-behavior
  - Body typography: font-family var, line-height var, color var, background var, font-smoothing, text-rendering
  - Global `::selection` styling using accent token per Ch 01 §22
  - Input/textarea `caret-color` using accent token per Ch 01 §22
  - `<a>` base: color inherit, text-decoration none
  - `<code>` base: font-mono, slight size reduction, background, padding, radius, border per Ch 01 §16
  - `prefers-reduced-motion` media query: disable transitions/animations per Ch 04

### 3.2: Typography Utilities (Ch 01 §6–§24)
- [ ] T023 Implement semantic typography classes in `src/ds/styles/ds.utilities.css`:
  - Display: `.text-display-1`, `.text-display-2`, `.text-display-3` per Ch 01 §10 — each sets all 5 axes (family, size, weight, line-height, letter-spacing)
  - Headings: `.text-heading-1` through `.text-heading-6` per Ch 01 §6–§7 — each sets all 5 axes
  - Body: `.text-body`, `.text-body-large`, `.text-body-small` per Ch 01 §6, §8
  - UI text: `.text-label`, `.text-caption`, `.text-overline`, `.text-micro` per Ch 01 §6, §9
  - Special: `.text-quote`, `.text-code`, `.text-kbd` per Ch 01 §6, §16
  - Every class must set family + size + weight + line-height + letter-spacing (no partial composition)

- [ ] T024 [P] Implement text color utilities in `src/ds/styles/ds.utilities.css`:
  - `.text-muted` — uses `--ds-color-text-muted`
  - `.text-accent` — uses `--ds-color-accent`
  - `.text-success`, `.text-warning`, `.text-danger`, `.text-info` — uses respective status colors
  - `.text-inherit` — `color: inherit`
  - `.text-on-primary` — uses `--ds-color-on-primary` (for text on accent backgrounds)

- [ ] T025 [P] Implement text truncation + overflow utilities per Ch 01 §13:
  - `.text-truncate` (single-line ellipsis)
  - `.text-line-clamp-1` through `.text-line-clamp-5` (multi-line)

- [ ] T026 [P] Implement text alignment + wrapping utilities per Ch 01 §14:
  - `.text-start`, `.text-center`, `.text-end` (logical properties)
  - `.text-nowrap`, `.text-balance`, `.text-pretty`
  - `.break-words`, `.break-all`, `.hyphens-auto`

- [ ] T027 [P] Implement text decoration + transform utilities per Ch 01 §15:
  - `.underline`, `.overline`, `.line-through`, `.no-underline`
  - `.underline-offset-2`, `.underline-offset-4`
  - `.decoration-accent`, `.decoration-wavy`, `.decoration-2`
  - `.uppercase`, `.lowercase`, `.capitalize`, `.normal-case`
  - `.italic`, `.not-italic`

- [ ] T028 [P] Implement selection + numeric utilities per Ch 01 §20, §22:
  - `.select-none`, `.select-text`, `.select-all`
  - `.text-tabular` (tabular-nums), `.text-oldstyle` (oldstyle-nums)
  - `.text-smallcaps` (small-caps), `.text-ordinal` (ordinal)

- [ ] T029 Implement prose module per Ch 01 §12:
  - `.prose` — styles all descendant HTML elements (h1–h6, p, a, strong, em, ul, ol, li, blockquote, code, pre, hr, img, figure, figcaption, table, mark, abbr, sub, sup, details, summary, kbd)
  - `.prose-sm`, `.prose-lg`, `.prose-xl` — size variants
  - Prose must set `max-width` (55–75ch depending on variant)

- [ ] T030 [P] Implement gradient + decorative text utilities per Ch 01 §21:
  - `.text-gradient` — background-clip text gradient using accent colors
  - `.text-gradient-animated` — animated gradient text
  - `.text-outline` — stroke text (no fill)

### 3.3: Color Utilities (Ch 02)
- [ ] T031 Implement background color utilities in `src/ds/styles/ds.utilities.css`:
  - `.bg-surface`, `.bg-surface-elevated`, `.bg-surface-sunken`
  - `.bg-accent`, `.bg-success`, `.bg-warning`, `.bg-danger`, `.bg-info`
  - `.bg-overlay` — overlay backdrop color

### 3.4: Layout Utilities (Ch 03)
- [ ] T032 Rewrite layout utilities in `src/ds/styles/ds.utilities.css`:
  - `.ui-page`, `.ui-page-main` — full-page wrapper + main area
  - `.ui-container`, `.ui-container--narrow`, `.ui-container--wide` — width-constrained
  - `.ui-stack` + gap variants (`.ui-stack--tight`, `.ui-stack--compact`) — vertical flex
  - `.ui-row` + gap variants — horizontal flex
  - `.ui-grid`, `.ui-grid--2`, `.ui-grid--3`, `.ui-grid--4` — responsive CSS grid
  - `.ui-split`, `.ui-split--reverse` — asymmetric 2-column
  - `.ui-section`, `.ui-section--sm`, `.ui-section--lg` — section padding
  - `.ui-band` — full-width band
  - `.ui-center` — margin-inline auto
  - `.ui-hero` — hero section
  - Keep all responsive breakpoints for grid/split/etc.

### 3.5: Spacing Utilities (Ch 03)
- [ ] T033 [P] Implement additional spacing utilities if needed:
  - `.gap-{0-9}` — gap utilities using space tokens (only if not using Tailwind for gap)
  - `.min-h-hero`, `.min-h-viewport-minus-header` — dimensional helpers
  - `.ui-touch-target` — minimum touch size

### 3.6: Motion Utilities (Ch 04)
- [ ] T034 [P] Implement motion utilities in `src/ds/styles/ds.utilities.css`:
  - `.transition-colors` — color transition using duration-normal + ease-standard
  - `.transition-transform` — transform transition
  - `.transition-opacity` — opacity transition
  - `.transition-all` — all properties transition
  - `.duration-fast`, `.duration-normal`, `.duration-slow` — override duration
  - `.animate-fade-in`, `.animate-fade-out` — enter/exit keyframes
  - `.animate-slide-up`, `.animate-slide-down` — slide keyframes
  - `.animate-scale-in`, `.animate-scale-out` — scale keyframes
  - `.motion-safe:` and `.motion-reduce:` — conditional animation wrappers

### 3.7: Elevation Utilities (Ch 05)
- [ ] T035 [P] Implement elevation utilities in `src/ds/styles/ds.utilities.css`:
  - `.shadow-xs`, `.shadow-sm`, `.shadow-md`, `.shadow-lg`, `.shadow-xl` — shadow scale
  - `.shadow-inner` — inset shadow
  - `.shadow-none` — remove shadow
  - `.glass` — backdrop-filter blur + semi-transparent background per Ch 05

### 3.8: Border Utilities (Ch 06)
- [ ] T036 [P] Implement border utilities in `src/ds/styles/ds.utilities.css`:
  - `.border`, `.border-2`, `.border-4` — border-width using tokens
  - `.border-t`, `.border-b`, `.border-l`, `.border-r` — directional borders
  - `.border-color-default`, `.border-color-accent`, `.border-color-danger` — border color
  - `.rounded-none`, `.rounded-sm`, `.rounded`, `.rounded-md`, `.rounded-lg`, `.rounded-xl`, `.rounded-full` — radius utilities
  - `.ring-1`, `.ring-2`, `.ring-4` — box-shadow ring utilities
  - `.divide-y`, `.divide-x` — child dividers using border-color token
  - `.ui-divider` — horizontal/vertical divider element

### 3.9: Responsive Utilities (Ch 08)
- [ ] T037 Implement responsive utilities in `src/ds/styles/ds.utilities.css`:
  - Breakpoint tokens documented as comment block: `sm: 640px, md: 768px, lg: 1024px, xl: 1280px, 2xl: 1536px`
  - `.ui-only-mobile` (hidden above md), `.ui-only-desktop` (hidden below lg), `.ui-only-tablet` (visible only md–lg)
  - Responsive grid column overrides already in `.ui-grid--*` (verify covers Ch 08)
  - Container query support: `.ui-container-query` parent + `@container` rules per Ch 08

### 3.10: Interactive State Utilities (Ch 10)
- [ ] T038 Implement interactive state utilities in `src/ds/styles/ds.utilities.css`:
  - `.ui-focus-ring` — `:focus-visible` outline/box-shadow
  - `.ui-disabled` — reduced opacity, pointer-events none, cursor not-allowed
  - `.ui-loading` — reduced opacity, pointer-events none
  - State documentation comment block: hover, active, focus, focus-visible, disabled, loading, selected, checked, invalid, readonly per Ch 10

### 3.11: Footer + Sidebar + Misc Layout (Ch 03 / existing patterns)
- [ ] T039 Rewrite contextual layout utilities in `src/ds/styles/ds.utilities.css`:
  - `.ui-footer-grid`, `.ui-footer-links` — footer layout
  - `.ui-sidebar`, `.ui-rightbar` — sticky sidebar/rightbar
  - `.ui-sidebar-nav`, `.ui-sidebar-nav__title` — sidebar navigation
  - `.ui-shell-grid--left`, `.ui-shell-grid--right`, `.ui-shell-grid--both` — dashboard shell grids
  - `.ui-search` — search input sizing
  - `.ui-header-pad` — header padding

- [ ] T040 Verify `npm run verify` passes after Phase 3

### Phase 3 Validation
- [ ] Every section (§1–§25) of Ch 01 has a corresponding token or utility
- [ ] Every color utility from Ch 02 exists
- [ ] Every layout utility from Ch 03 exists
- [ ] Every motion utility from Ch 04 exists
- [ ] Every elevation utility from Ch 05 exists
- [ ] Every border/radius utility from Ch 06 exists
- [ ] Every responsive pattern from Ch 08 exists
- [ ] Every interactive state from Ch 10 exists
- [ ] No duplicate classes (no `.ui-h1` alongside `.text-display-*`, no `.ui-lede` alongside `.text-body-large`)
- [ ] No legacy class names remain
- [ ] `.prose` module complete with all descendant element styling
- [ ] `npm run verify` passes

---

## Phase 4: Semantic Class Registry + Foundation TS

**Read:** `DOC/SEMANTIC-CLASSES-REGISTRY.md`, `src/ds/foundation/semantics/registry.ts`

- [ ] T041 Rewrite `src/ds/foundation/semantics/registry.ts` — add typed entries for every `ui-*` and `text-*` class created in Phase 3. Remove any entries for deleted classes.
- [ ] T042 Rewrite `DOC/SEMANTIC-CLASSES-REGISTRY.md` — full registry of every `ui-*` and `text-*` class with purpose, layer, and example usage.
- [ ] T043 Update `src/ds/foundation/motion/` — export all new motion tokens (instant, fast, normal, slow, slower, ease names) as typed TS constants matching `src/ds/styles/ds.tokens.css`.
- [ ] T044 Update `src/ds/foundation/a11y/` — ensure `VisuallyHidden` component, `usePrefersReducedMotion` hook, and `FOCUS_RING_CLASSNAME` are aligned with new utility names from Phase 3.
- [ ] T045 Verify `npm run verify` passes after Phase 4

### Phase 4 Validation
- [ ] Every utility class in `ds.utilities.css` has a typed entry in `registry.ts`
- [ ] Semantic registry doc matches actual CSS 1:1
- [ ] Motion TS exports match token CSS 1:1
- [ ] A11y foundation aligned with new class names
- [ ] `npm run verify` passes

---

## Phase 5: Iconography

**Read FULLY:** `DOC/DS BUILDING/HandBook_Frontend/07-ICONOGRAPHY.md` (all sections)

**Target files:** `src/ds/icons.ts`, `src/ds/components/Icon.tsx`, icon-related CSS in `src/ds/styles/ds.components.css`

- [ ] T046 Rewrite icon size system in `src/ds/styles/ds.components.css`:
  - `.ui-icon`, `.ui-icon--xs`, `.ui-icon--sm`, `.ui-icon--md`, `.ui-icon--lg`, `.ui-icon--xl` — using `--ds-size-icon-*` tokens per Ch 07
  - Verify stroke-width conventions if applicable

- [ ] T047 Review `src/ds/icons.ts` — ensure curated icon barrel follows Ch 07 naming conventions (consistent, descriptive names). Remove unused icons. Add missing common icons.

- [ ] T048 Review `src/ds/components/Icon.tsx` — ensure `size` prop maps to icon size tokens, `className` passthrough works, accessibility attributes (`aria-hidden` for decorative, `aria-label` for meaningful) per Ch 07 + Ch 09.

- [ ] T049 Verify `npm run verify` passes after Phase 5

---

## Phase 6: Accessibility Foundation

**Read FULLY:** `DOC/DS BUILDING/HandBook_Frontend/09-ACCESSIBILITY.md` (all sections)

**This phase is cross-cutting — its rules apply retroactively to everything above and forward to everything below.**

- [ ] T050 Audit all Phase 3 utilities for a11y compliance per Ch 09:
  - Focus ring meets WCAG 2.2 focus-visible requirements
  - Color contrast: verify all text-color + bg-color token combinations meet 4.5:1 (AA) or 3:1 (large text)
  - Motion: verify `prefers-reduced-motion` disables all animations
  - Semantic HTML guidance: add comment block in `ds.base.css` documenting required semantic elements

- [ ] T051 Ensure `src/ds/foundation/a11y/` provides:
  - `VisuallyHidden` component (screen-reader-only text)
  - `usePrefersReducedMotion()` hook
  - `FOCUS_RING_CLASSNAME` constant
  - Skip-link utility class (`.ui-skip-link`) per Ch 09
  - Live region utility (`.ui-live-polite`, `.ui-live-assertive`) per Ch 09

- [ ] T052 Create `src/ds/foundation/a11y/keyboard.ts` — shared keyboard constants and helpers:
  - Key constants (Escape, Tab, ArrowUp/Down/Left/Right, Home, End, Enter, Space)
  - `getFocusableElements()` utility (already exists in some components, extract to shared)
  - `trapFocus()` utility

- [ ] T053 Verify `npm run verify` passes after Phase 6

### Phase 6 Validation
- [ ] Every WCAG 2.2 AA requirement from Ch 09 has a corresponding utility, pattern, or rule
- [ ] Skip-link utility exists
- [ ] Live region utilities exist
- [ ] Keyboard utilities are shared, not duplicated per component
- [ ] Color contrast verified for token pairs
- [ ] `npm run verify` passes

---

## Phase 7: Primitives Rebuild ⚠️ GATE — Must complete before Phase 8+

**Read FULLY:**
- `DOC/DS BUILDING/HandBook_Frontend/19-COMPONENT-API-PATTERNS.md` (all sections)
- `DOC/DS BUILDING/HandBook_Frontend/10-INTERACTIVE-STATES.md` (state specs per component type)

**Target:** all files in `src/ds/primitives/` + their CSS in `src/ds/styles/ds.components.css`

All primitives must follow Ch 19 API patterns:
- Extend `React.HTML*Attributes<Element>` for full type safety
- Use `variant`, `size`, `tone` prop naming consistently
- Spread `{...props}` last for override capability
- Use shared `cx()` from `src/ds/utils/cx.ts`
- Forward ref where needed (Button, Input, Textarea, Select)
- Add proper ARIA attributes per Ch 09

- [ ] T054 Rebuild `src/ds/primitives/Text.tsx`:
  - `variant` prop maps to all semantic typography classes (display-1..3, heading-1..6, body, body-large, body-small, label, caption, overline, micro, quote, code, kbd)
  - `as` prop for polymorphic rendering (h1–h6, p, span, div, blockquote, code, kbd)
  - `tone` prop for color (default, muted, accent, success, warning, danger, info)
  - `truncate` prop (boolean or number for line-clamp)
  - `align` prop (start, center, end)
  - Implements Ch 01 §7 rule: semantic HTML via `as` + visual style via `variant`

- [ ] T055 Rebuild `src/ds/primitives/Button.tsx`:
  - `variant`: primary, secondary, ghost, text, icon, fab
  - `size`: sm, md, lg
  - `tone`: accent, danger, success (affects color)
  - `isLoading`, `loadingText` props
  - Interactive states per Ch 10: hover, active, focus-visible, disabled, loading
  - CSS in `ds.components.css`: `.ui-button`, `.ui-button--primary`, `--secondary`, `--ghost`, `--text`, `--icon`, `--fab`, `--sm`, `--lg`

- [ ] T056 [P] Rebuild `src/ds/primitives/Input.tsx`:
  - Extends `React.InputHTMLAttributes`
  - `size`: sm, md, lg
  - Focus ring, error state (`aria-invalid`), disabled state per Ch 10
  - CSS: `.ui-input`, `.ui-input--sm`, `.ui-input--lg`, `.ui-input--error`

- [ ] T057 [P] Rebuild `src/ds/primitives/Textarea.tsx`:
  - Same pattern as Input
  - CSS: `.ui-textarea` + variants

- [ ] T058 [P] Rebuild `src/ds/primitives/Select.tsx`:
  - Same pattern as Input
  - CSS: `.ui-select` + variants

- [ ] T059 [P] Rebuild `src/ds/primitives/Checkbox.tsx`:
  - `checked`, `indeterminate` states
  - Uses `--ds-size-selection-control` token
  - ARIA: role checkbox, aria-checked
  - CSS: `.ui-checkbox`

- [ ] T060 [P] Rebuild `src/ds/primitives/Radio.tsx`:
  - Same pattern as Checkbox
  - CSS: `.ui-radio`

- [ ] T061 [P] Rebuild `src/ds/primitives/Switch.tsx`:
  - Boolean toggle, `checked` state
  - ARIA: role switch, aria-checked
  - CSS: `.ui-switch`

- [ ] T062 [P] Rebuild `src/ds/primitives/RangeSlider.tsx`:
  - `min`, `max`, `step`, `value` props
  - CSS: `.ui-range`

- [ ] T063 [P] Rebuild `src/ds/primitives/Avatar.tsx`:
  - `size`: sm, md, lg, xl
  - `src`, `alt`, `fallback` props
  - CSS: `.ui-avatar`, `.ui-avatar--sm/md/lg/xl`

- [ ] T064 [P] Rebuild `src/ds/primitives/Spinner.tsx`:
  - `size`: sm, md, lg
  - ARIA: role status, aria-label
  - CSS: `.ui-spinner` + size variants

- [ ] T065 [P] Rebuild layout primitives — `src/ds/primitives/Stack.tsx`, `Grid.tsx`, `Container.tsx`, `Divider.tsx`, `Spacer.tsx`:
  - Stack: `gap` prop (tight, compact, default, loose), `direction` (column, row)
  - Grid: `columns` prop (1–4), `gap` prop
  - Container: `size` prop (narrow, default, wide)
  - Divider: `orientation` (horizontal, vertical)
  - Spacer: `size` prop (mapped to space tokens)

- [ ] T066 Rebuild CSS for all primitives in `src/ds/styles/ds.components.css`:
  - Write CSS for every `.ui-*` class referenced in T054–T065
  - Follow BEM naming from contract
  - All colors via tokens, all spacing via tokens, all radii via tokens
  - All interactive states (hover, active, focus-visible, disabled) per Ch 10

- [ ] T067 Update `src/ds/index.ts` barrel — ensure all primitives are exported with correct named exports
- [ ] T068 Verify `npm run verify` passes after Phase 7

### Phase 7 Validation
- [ ] Every primitive follows Ch 19 API patterns (variant/size/tone/className/ref)
- [ ] Every primitive uses shared `cx()` from `src/ds/utils/cx.ts`
- [ ] Every interactive primitive has all states from Ch 10
- [ ] Every primitive has ARIA attributes per Ch 09
- [ ] Text primitive covers ALL semantic typography classes from Phase 3
- [ ] CSS classes follow BEM naming contract
- [ ] No hardcoded values in component files
- [ ] `src/ds/index.ts` exports all primitives
- [ ] `npm run verify` passes

---

## Phase 8: Form Components

**Read FULLY:** `DOC/DS BUILDING/HandBook_Frontend/11-FORM-ANATOMY.md` (all sections)

**Target:** `src/ds/components/` (form-related) + CSS in `ds.components.css`

- [ ] T069 Rebuild `src/ds/components/Field.tsx` — field wrapper with label, input slot, helper text, error message per Ch 11
- [ ] T070 [P] Rebuild `src/ds/components/FormHelpers.tsx` — form composition utilities (Fieldset, FormGroup, FormActions) per Ch 11
- [ ] T071 [P] Rebuild `src/ds/components/Autocomplete.tsx` — combobox pattern with keyboard nav per Ch 11
- [ ] T072 [P] Rebuild `src/ds/components/MultiSelect.tsx` — multi-value select with tags per Ch 11
- [ ] T073 [P] Rebuild `src/ds/components/TagInput.tsx` — tag/chip input per Ch 11
- [ ] T074 [P] Rebuild `src/ds/components/FileDropzone.tsx` — file upload with drag-drop per Ch 11
- [ ] T075 [P] Rebuild `src/ds/components/DateTimePickers.tsx` — date/time picker components per Ch 11
- [ ] T076 [P] Rebuild `src/ds/components/FilterPanel.tsx` — filter composition panel per Ch 11
- [ ] T077 Write CSS for all form components in `src/ds/styles/ds.components.css`
- [ ] T078 Update `src/ds/index.ts` barrel for form components
- [ ] T079 Verify `npm run verify` passes after Phase 8

### Phase 8 Validation
- [ ] Every form element type from Ch 11 has a corresponding component
- [ ] Field anatomy (label + input + helper + error) per Ch 11
- [ ] Validation patterns (inline, on-blur, on-submit) documented in component props
- [ ] Multi-step form pattern available
- [ ] All form components accessible (labels, aria-invalid, aria-describedby)
- [ ] `npm run verify` passes

---

## Phase 9: Data Display Components

**Read FULLY:** `DOC/DS BUILDING/HandBook_Frontend/12-DATA-DISPLAY.md` (all sections)

**Target:** `src/ds/components/` (data-related) + CSS in `ds.components.css`

- [ ] T080 Rebuild `src/ds/components/DataTable.tsx` — sortable, selectable table per Ch 12
- [ ] T081 [P] Rebuild `src/ds/components/DataGrid.tsx` — advanced data grid per Ch 12
- [ ] T082 [P] Rebuild `src/ds/components/Card.tsx`, `ImageCard.tsx`, `IconCard.tsx` — card variants per Ch 12
- [ ] T083 [P] Rebuild `src/ds/components/Badge.tsx` — badge/tag component per Ch 12
- [ ] T084 [P] Rebuild `src/ds/components/MetricCard.tsx` — statistics/metrics display per Ch 12
- [ ] T085 [P] Rebuild `src/ds/components/Timeline.tsx` — event timeline per Ch 12
- [ ] T086 [P] Rebuild `src/ds/components/List.tsx` — structured list component per Ch 12
- [ ] T087 [P] Rebuild `src/ds/components/AvatarGroup.tsx` — stacked avatar display per Ch 12
- [ ] T088 [P] Rebuild `src/ds/components/Charts.tsx` + `Sparkline.tsx` — chart/sparkline components per Ch 12
- [ ] T089 [P] Rebuild `src/ds/components/EmptyState.tsx` — empty/error state display per Ch 12
- [ ] T090 [P] Rebuild `src/ds/components/Pagination.tsx` — pagination component per Ch 12
- [ ] T091 Write CSS for all data display components in `src/ds/styles/ds.components.css`
- [ ] T092 Update `src/ds/index.ts` barrel for data display components
- [ ] T093 Verify `npm run verify` passes after Phase 9

### Phase 9 Validation
- [ ] Every data display pattern from Ch 12 has a component
- [ ] Table supports sort, filter, select, pagination
- [ ] Cards, badges, metrics, timeline, list all follow API contract
- [ ] Empty state covers no-data + error + loading variants
- [ ] `npm run verify` passes

---

## Phase 10: Navigation Components

**Read FULLY:** `DOC/DS BUILDING/HandBook_Frontend/13-NAVIGATION-PATTERNS.md` (all sections)

**Target:** `src/ds/components/` (nav-related) + CSS in `ds.components.css`

- [ ] T094 Rebuild `src/ds/components/AppBar.tsx` — top navigation bar per Ch 13
- [ ] T095 [P] Rebuild `src/ds/components/Tabs.tsx` — tab component (compound pattern) per Ch 13
- [ ] T096 [P] Rebuild `src/ds/components/Breadcrumbs.tsx` — breadcrumb trail per Ch 13
- [ ] T097 [P] Rebuild `src/ds/components/BottomNav.tsx` — mobile bottom navigation per Ch 13
- [ ] T098 [P] Rebuild `src/ds/components/Pagination.tsx` — (already in Phase 9, verify nav integration)
- [ ] T099 [P] Rebuild `src/ds/components/ScrollToTopButton.tsx` — scroll-to-top per Ch 13
- [ ] T100 New: `src/ds/components/Stepper.tsx` — step indicator / wizard navigation per Ch 13
- [ ] T101 New: `src/ds/components/CommandPalette.tsx` — Cmd+K command palette per Ch 13
- [ ] T102 Write CSS for all navigation components in `src/ds/styles/ds.components.css`
- [ ] T103 Update `src/ds/index.ts` barrel for navigation components
- [ ] T104 Verify `npm run verify` passes after Phase 10

### Phase 10 Validation
- [ ] Every navigation pattern from Ch 13 has a component
- [ ] Keyboard navigation (arrow keys, Home/End) per Ch 09
- [ ] ARIA roles (tablist, tab, tabpanel, navigation, breadcrumb) per Ch 09
- [ ] Responsive nav patterns (collapse on mobile) per Ch 08
- [ ] `npm run verify` passes

---

## Phase 11: Overlay Components

**Read FULLY:** `DOC/DS BUILDING/HandBook_Frontend/14-OVERLAY-PATTERNS.md` (all sections)

**Target:** `src/ds/components/` (overlay-related) + CSS in `ds.components.css`

- [ ] T105 Rebuild `src/ds/components/Modal.tsx` — dialog with focus trap per Ch 14
- [ ] T106 [P] Rebuild `src/ds/components/ConfirmDialog.tsx` — confirmation dialog per Ch 14
- [ ] T107 [P] Rebuild `src/ds/components/Drawer.tsx` — side drawer/sheet per Ch 14
- [ ] T108 [P] Rebuild `src/ds/components/Popover.tsx` — positioned popover per Ch 14
- [ ] T109 [P] Rebuild `src/ds/components/Tooltip.tsx` — hover/focus tooltip per Ch 14
- [ ] T110 [P] Rebuild `src/ds/components/Toast.tsx` — notification toast per Ch 14
- [ ] T111 [P] Rebuild `src/ds/components/DropdownMenu.tsx` — dropdown menu per Ch 14
- [ ] T112 [P] Rebuild `src/ds/components/ContextMenu.tsx` — right-click context menu per Ch 14
- [ ] T113 New: `src/ds/components/NotificationPanel.tsx` — notification center panel per Ch 14
- [ ] T114 Write CSS for all overlay components in `src/ds/styles/ds.components.css`:
  - Z-index stacking per Ch 14 z-index architecture
  - Backdrop/scrim styles
  - Enter/exit animations per Ch 04
- [ ] T115 Update `src/ds/index.ts` barrel for overlay components
- [ ] T116 Verify `npm run verify` passes after Phase 11

### Phase 11 Validation
- [ ] Every overlay pattern from Ch 14 has a component
- [ ] Focus trapping in modal, drawer, confirm dialog
- [ ] Z-index stacking follows token architecture
- [ ] Escape key dismisses all overlays
- [ ] Enter/exit animations respect `prefers-reduced-motion`
- [ ] `npm run verify` passes

---

## Phase 12: Feedback Components

**Read FULLY:** `DOC/DS BUILDING/HandBook_Frontend/15-FEEDBACK-PATTERNS.md` (all sections)

**Target:** `src/ds/components/` (feedback-related) + CSS in `ds.components.css`

- [ ] T117 Rebuild `src/ds/components/Alert.tsx` — inline alert per Ch 15
- [ ] T118 [P] Rebuild `src/ds/components/Banner.tsx` — page-level banner per Ch 15
- [ ] T119 [P] Rebuild `src/ds/components/Progress.tsx` — progress bar (linear) + circular spinner per Ch 15
- [ ] T120 [P] Rebuild `src/ds/components/Skeleton.tsx` — skeleton loading per Ch 15
- [ ] T121 [P] Rebuild `src/ds/components/Status.tsx` — status indicator (dot, badge, label) per Ch 15
- [ ] T122 [P] Rebuild `src/ds/components/ErrorBoundary.tsx` — React error boundary per Ch 15
- [ ] T123 Write CSS for all feedback components in `src/ds/styles/ds.components.css`
- [ ] T124 Update `src/ds/index.ts` barrel for feedback components
- [ ] T125 Verify `npm run verify` passes after Phase 12

### Phase 12 Validation
- [ ] Every feedback pattern from Ch 15 has a component
- [ ] Alert, Banner, Toast cover all tone variants (success, warning, danger, info)
- [ ] Progress supports determinate + indeterminate
- [ ] Skeleton animates with pulse or wave
- [ ] `npm run verify` passes

---

## Phase 13: Content + Marketing + Remaining Components

**Read:** Ch 01 §12 (prose), Ch 12 (rich content references)

**Target:** remaining components in `src/ds/components/`

- [ ] T126 Rebuild `src/ds/components/Accordion.tsx` — collapsible sections
- [ ] T127 [P] Rebuild `src/ds/components/Section.tsx`, `SectionHeader.tsx`, `SplitSection.tsx` — section composition
- [ ] T128 [P] Rebuild `src/ds/components/Marketing.tsx`, `PublicBlocks.tsx` — marketing blocks
- [ ] T129 [P] Rebuild `src/ds/components/ResponsiveImage.tsx` — responsive image
- [ ] T130 [P] Rebuild `src/ds/components/Carousel.tsx` — carousel/slider
- [ ] T131 [P] Rebuild `src/ds/components/VideoPlayer.tsx` — video embed
- [ ] T132 [P] Rebuild `src/ds/components/MarkdownEditor.tsx` — markdown editing
- [ ] T133 [P] Rebuild `src/ds/components/CookieConsentBanner.tsx` — cookie consent
- [ ] T134 [P] Rebuild `src/ds/components/BulkActionsToolbar.tsx` — bulk actions
- [ ] T135 [P] Rebuild `src/ds/components/ResourceTable.tsx` — resource table variant
- [ ] T136 Write CSS for all remaining components in `src/ds/styles/ds.components.css`
- [ ] T137 Update `src/ds/index.ts` barrel for all remaining components
- [ ] T138 Verify `npm run verify` passes after Phase 13

---

## Phase 14: Shells + Composition Layer

**Read FULLY:** `DOC/DS BUILDING/HandBook_Frontend/20-DOCUMENTATION-TESTING.md` — composition sections

**Target:** `src/ds/layouts/`, `src/ds/composition/`, `src/ds/widgets/`, `src/ds/runtime/`, `src/ds/patterns/`

- [ ] T139 Rebuild `src/ds/layouts/` — PublicShell, DashboardShell, DocsShell, CenteredShell per handbook composition rules
- [ ] T140 Rebuild `src/ds/composition/templates/PageTemplate.tsx` — dynamic shell selection
- [ ] T141 [P] Rebuild `src/ds/composition/patterns/SectionPattern.tsx` — section composition helper
- [ ] T142 [P] Rebuild `src/ds/composition/blocks/` — marketing + public block re-exports
- [ ] T143 Rebuild `src/ds/widgets/` — WidgetShell, MetricWidget, StatWidget, ListWidget, MediaWidget
- [ ] T144 Review `src/ds/runtime/` — mobile/tablet/web adapters, update to use new token/class names
- [ ] T145 Rebuild `src/ds/patterns/` — AsyncBoundary, ErrorBlock
- [ ] T146 Rebuild `src/ds/visuals/` — Glow, NoiseOverlay, BackgroundFX
- [ ] T147 Update `src/ds/index.ts` barrel for shells, composition, widgets, patterns, visuals
- [ ] T148 Verify `npm run verify` passes after Phase 14

### Phase 14 Validation
- [ ] All 4 shells work with new token/class names
- [ ] Composition layer follows slot/compound patterns from Ch 19
- [ ] Widgets use new token system
- [ ] Runtime adapters use new token system
- [ ] `npm run verify` passes

---

## Phase 15: Documentation & Testing

**Read FULLY:** `DOC/DS BUILDING/HandBook_Frontend/20-DOCUMENTATION-TESTING.md` (all sections)

- [ ] T149 Rewrite `src/ds/DESIGN-SYSTEM-ANATOMY.md` — update to reflect the fully rebuilt DS: new token inventory, new class inventory, new component list, updated architecture diagram, updated reading rules
- [ ] T150 Rewrite `DOC/SEMANTIC-CLASSES-REGISTRY.md` — complete registry of every `ui-*` and `text-*` class with purpose, layer, and example
- [ ] T151 [P] Add unit tests for all 16 primitives in `src/ds/primitives/__tests__/` or `src/ds/components/__tests__/`:
  - Render test (renders without crash)
  - Variant test (applies correct className per variant/size/tone)
  - Accessibility test (correct ARIA attributes)
- [ ] T152 [P] Add keyboard/a11y tests for all interactive components:
  - Modal focus trapping
  - Tabs arrow-key navigation
  - Dropdown keyboard navigation
  - Tooltip keyboard trigger
  - All components: Escape dismissal
- [ ] T153 [P] Test theme switching: verify all theme classes apply correctly, no token regressions across dark/light/purple
- [ ] T154 Run full `npm run verify` — lint + type check + all tests pass
- [ ] T155 Final audit: read each handbook chapter (01–20) and verify every section has been implemented. Document any intentional omissions with rationale.

### Phase 15 Validation (FINAL GATE)
- [ ] `DESIGN-SYSTEM-ANATOMY.md` matches actual DS 1:1
- [ ] `SEMANTIC-CLASSES-REGISTRY.md` matches actual CSS 1:1
- [ ] All primitives have unit tests
- [ ] All interactive components have keyboard tests
- [ ] Theme switching tested
- [ ] `npm run verify` passes with zero errors
- [ ] Every handbook chapter (01–20) verified as fully implemented

---

## Dependencies

```
Phase 0 (Contract) → blocks everything
Phase 1 (Tokens) → blocks Phase 2, 3, 4, 5, 6, 7+
Phase 2 (Themes) → blocks Phase 3+
Phase 3 (Utilities) → blocks Phase 4, 7+
Phase 4 (Registry) → blocks Phase 7+
Phase 5 (Icons) → independent after Phase 1
Phase 6 (A11y) → cross-cutting, start after Phase 3, verify in every phase
Phase 7 (Primitives) → blocks Phase 8–14
Phase 8–13 (Components) → [P] parallel within each phase, sequential between phases
Phase 14 (Composition) → after Phase 8–13
Phase 15 (Docs/Tests) → after everything
```

## Parallel Execution Map

```
After Phase 0:  T006, T007, T008 (sequential in same file)
                T009, T010, T011, T012 [P] (different token families, same file but independent sections)
After Phase 3:  T041, T042, T043, T044 [P] (different files)
After Phase 7:  T069–T076 [P], T080–T091 [P], T094–T101 [P], T105–T113 [P], T117–T122 [P]
                (component phases can overlap if CSS writing is coordinated)
```

## Quality Gate (run after EVERY task)

```bash
npm run verify
```

If it fails, fix before moving to the next task. Never skip.

---

## Task Summary

| Phase | Tasks | Handbook Chapters Covered |
|-------|-------|--------------------------|
| 0 | T001–T005 | Ch 17, 18, 19 |
| 1 | T006–T015 | Ch 01–06 (tokens) |
| 2 | T016–T021 | Ch 16, Ch 02 (themes) |
| 3 | T022–T040 | Ch 01–06 (utilities), Ch 08, Ch 10 |
| 4 | T041–T045 | Registry + foundation TS |
| 5 | T046–T049 | Ch 07 |
| 6 | T050–T053 | Ch 09 |
| 7 | T054–T068 | Ch 19 + Ch 10 (primitives) |
| 8 | T069–T079 | Ch 11 |
| 9 | T080–T093 | Ch 12 |
| 10 | T094–T104 | Ch 13 |
| 11 | T105–T116 | Ch 14 |
| 12 | T117–T125 | Ch 15 |
| 13 | T126–T138 | Remaining components |
| 14 | T139–T148 | Ch 20 (composition), shells, runtime |
| 15 | T149–T155 | Ch 20 (docs/tests), final audit |
| **Total** | **155 tasks** | **All 20 chapters fully covered** |

---

## How to Execute

1. AI reads **this file** first (always).
2. AI reads the **Master References** listed at the top.
3. AI starts at Phase 0, T001.
4. For each task: read the referenced handbook chapter sections → implement → run `npm run verify` → mark task done.
5. Complete phase validation checklist before moving to next phase.
6. Never skip phases. Never skip tasks. Never improvise beyond handbook scope.
