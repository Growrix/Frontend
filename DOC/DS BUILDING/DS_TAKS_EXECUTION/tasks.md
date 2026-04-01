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
| 10 | `10-INTERACTIVE-STATES.md` | Interactive States | Phase 1 (state tokens) + Phase 3 (utilities) + Phase 7 (primitives) |
| 11 | `11-FORM-ANATOMY.md` | Form Anatomy | Phase 8 |
| 12 | `12-DATA-DISPLAY.md` | Data Display | Phase 9 |
| 13 | `13-NAVIGATION-PATTERNS.md` | Navigation Patterns | Phase 10 |
| 14 | `14-OVERLAY-PATTERNS.md` | Overlay Patterns | Phase 11 |
| 15 | `15-FEEDBACK-PATTERNS.md` | Feedback Patterns | Phase 12 |
| 16 | `16-THEMING-ARCHITECTURE.md` | Theming Architecture | Phase 2 |
| 17 | `17-CSS-ARCHITECTURE.md` | CSS Architecture | Phase 0 (contract) |
| 18 | `18-TOKEN-ARCHITECTURE.md` | Token Architecture | Phase 0 (contract) |
| 19 | `19-COMPONENT-API-PATTERNS.md` | Component API Patterns | Phase 0 (contract) + Phase 7 |
| 20 | `20-DOCUMENTATION-TESTING.md` | Documentation & Testing | Phase 15 |

## DS Target Files (what gets rebuilt)

| Layer | File(s) | Role |
|-------|---------|------|
| Layer order | `src/ds/styles/index.css` | CSS layer ordering + imports |
| Reset | `src/ds/styles/ds.reset.css` | **NEW** — browser normalization (per Ch 17) |
| Tokens | `src/ds/styles/ds.tokens.css` | All CSS custom properties (primitives + semantics) |
| Theme | `src/ds/styles/ds.theme.css` | color-scheme per theme + theme overrides |
| Base | `src/ds/styles/ds.base.css` | Element base styles, body, selection |
| Layouts | `src/ds/styles/ds.layouts.css` | **NEW** — shell/layout pattern CSS (per Ch 17) |
| Components | `src/ds/styles/ds.components.css` | Component class implementations |
| Patterns | `src/ds/styles/ds.patterns.css` | **NEW** — multi-component pattern CSS (per Ch 17) |
| Utilities | `src/ds/styles/ds.utilities.css` | Layout + typography + color + state helpers |
| Barrel | `src/ds/index.ts` | Single public API (import from `@/ds`) |
| Icons | `src/ds/icons.ts` | Curated icon re-exports |
| Foundation | `src/ds/foundation/` | Tokens TS, themes, semantics, a11y, motion |
| Primitives | `src/ds/primitives/` | Low-level building blocks |
| Components | `src/ds/components/` | Higher-level composed components |
| Layouts | `src/ds/layouts/` | Page shells (TS) |
| Runtime | `src/ds/runtime/` | Platform adapters |
| Composition | `src/ds/composition/` | Templates, patterns, blocks |
| Utils | `src/ds/utils/` | **NEW** — shared utilities (cx, keyboard, etc.) |

## Execution Rules

1. **Read the handbook chapter TOP TO BOTTOM** before implementing. No partial reads.
2. **Every section** of every referenced chapter must have a corresponding implementation. Nothing skipped.
3. **No legacy aliases**. Fresh naming per handbook. Remove old aliases entirely.
4. **No duplicates**. One class per role. One token per value. One component per job.
5. **Token-first**. Implement tokens before classes. Classes before components. Components before patterns.
6. **Delete before adding**. Remove the old implementation of a section, then write the new one.
7. **Verify after every task**. Run `npm run verify` after each task. Fix before proceeding.
8. **Update DESIGN-SYSTEM-ANATOMY.md** whenever the public API surface changes.
9. **Update src/ds/SEMANTIC-CLASSES-REGISTRY.md** whenever `ui-*` or `text-*` classes change.
10. **No improvisation**. If the handbook doesn't specify it, don't add it. The handbook is the scope boundary.
11. **Run `npm run ds:audit` after token/class changes** to verify registry sync.
12. **Run `npm run ds:a11y` after component changes** to verify a11y compliance.

## Naming Contract (locked for entire rebuild)

### Token naming — Three-Tier Model (Ch 18)

```
TIER 1 — Primitive tokens (raw values, never used directly in components):
--ds-palette-{hue}-{step}        (neutral-0..950, brand-50..950, success/warning/danger/info-50..950)
--ds-font-size-{n}               (scale steps: 1–12 + fluid variants)
--ds-font-weight-{name}          (thin, light, regular, book, medium, semibold, bold, extrabold, black)
--ds-line-height-{name}          (none, tight, snug, normal, relaxed, loose)
--ds-letter-spacing-{name}       (tighter, tight, normal, wide, wider, widest)
--ds-space-{n}                   (0–20+ per Ch 03: 0, 1px, 2px, 4px, 6px, 8px, 12px, 16px, 20px, 24px, 28px, 32px, 36px, 40px, 48px, 56px, 64px, 80px, 96px, 128px)
--ds-radius-{name}               (none, xs, sm, md, lg, xl, 2xl, full)
--ds-shadow-{name}               (none, xs, sm, md, lg, xl, 2xl + inset-xs, inset-sm, inset-md)
--ds-blur-{name}                 (none, sm, md, lg, xl, 2xl)
--ds-border-{name}               (0, hairline, thin, medium, thick, heavy)
--ds-duration-{name}             (instant, fastest, fast, normal, moderate, slow, slower, slowest)
--ds-ease-{name}                 (linear, standard, in, out, in-out, spring, bounce, elastic, snap, emphasized)
--ds-z-{name}                    (base, sticky, dropdown, topbar, drawer, modal, toast, tooltip)
--ds-icon-{size}                 (xs, sm, md, lg, xl, 2xl, 3xl)
--ds-bp-{name}                   (xs, sm, md, lg, xl, 2xl) — breakpoints as reference comments (can't use in media queries)

TIER 2 — Semantic tokens (intent-based, what components consume):
--ds-color-{role}                (background, surface, surface-2, surface-3, surface-raised, surface-sunken, surface-overlay, surface-interactive)
--ds-color-foreground            (foreground, foreground-secondary, foreground-muted, foreground-inverse, foreground-on-accent)
--ds-color-border-{variant}      (border, border-strong, border-muted, border-focus, border-error)
--ds-color-accent-{variant}      (accent, accent-hover, accent-active, accent-muted, accent-foreground)
--ds-color-{status}              (success, warning, danger, info + each with -bg, -text variants)
--ds-color-overlay               (overlay/scrim)
--ds-color-focus-ring            (focus ring color)
--ds-color-text-muted            (muted text)
--ds-icon-{semantic}             (default, muted, accent, success, warning, danger, on-accent)
--ds-state-{name}                (hover, active, selected, focus, disabled-opacity, drag-opacity)
--ds-ring-{prop}                 (width, offset, color)

TIER 3 — Component tokens (optional, component-specific overrides):
--ds-button-{prop}               (bg, text, border, radius, height)
--ds-input-{prop}                (bg, border, radius, height)
--ds-card-{prop}                 (bg, border, radius, padding)
(Component tokens are created only when a component needs to diverge from semantic defaults)
```

### Semantic spacing tokens (Ch 03)
```
--ds-space-card-padding, --ds-space-modal-padding, --ds-space-form-gap
--ds-space-section-padding, --ds-space-section-margin, --ds-space-heading-margin
--ds-space-button-pad-x/y, --ds-space-input-pad-x/y, --ds-space-nav-padding
--ds-space-page-inset, --ds-space-popover-pad, --ds-space-tooltip-gap
--ds-space-stack-gap, --ds-space-inline-gap
```

### Container + sizing tokens (Ch 03)
```
--ds-container-narrow (48rem), --ds-container-default (64rem), --ds-container-wide (72rem), --ds-container-xl (80rem)
--ds-grid-columns (12), --ds-grid-gap, --ds-grid-gap-sm, --ds-grid-gap-lg
--ds-size-shell-left (13rem), --ds-size-shell-right (16rem), --ds-size-shell-collapsed (4.5rem)
```

### Utility class naming
```
Typography:    .text-display-{1-3}, .text-heading-{1-6}, .text-body, .text-body-large, .text-body-small
               .text-label, .text-caption, .text-overline, .text-micro, .text-quote, .text-code, .text-kbd
Color:         .text-muted, .text-accent, .text-success, .text-warning, .text-danger, .text-info
               .text-inherit, .text-on-primary
               .bg-surface, .bg-surface-elevated, .bg-surface-sunken
               .bg-accent, .bg-success, .bg-warning, .bg-danger, .bg-info, .bg-overlay
Layout:        .ui-page, .ui-page-main, .ui-container, .ui-container--narrow, .ui-container--wide, .ui-container--xl
               .ui-stack, .ui-stack--tight, .ui-stack--compact, .ui-stack--loose, .ui-stack--spacious
               .ui-row, .ui-row--between, .ui-row--center, .ui-row--end, .ui-row--nowrap
               .ui-grid, .ui-grid--2, .ui-grid--3, .ui-grid--4
               .ui-split, .ui-split--reverse
               .ui-section, .ui-section--sm, .ui-section--lg, .ui-band, .ui-center, .ui-hero
Truncation:    .text-truncate, .text-line-clamp-{1-5}
Wrapping:      .text-nowrap, .text-balance, .text-pretty, .break-words, .break-all, .hyphens-auto
Alignment:     .text-start, .text-center, .text-end
Transform:     .uppercase, .lowercase, .capitalize, .normal-case
Decoration:    .underline, .overline, .line-through, .no-underline
               .underline-offset-2, .underline-offset-4, .decoration-accent, .decoration-wavy, .decoration-2
Style:         .italic, .not-italic
Selection:     .select-none, .select-text, .select-all
Numeric:       .text-tabular, .text-oldstyle, .text-smallcaps, .text-ordinal
Prose:         .prose, .prose-sm, .prose-lg, .prose-xl
Gradient:      .text-gradient, .text-gradient-animated, .text-outline
Transition:    .transition-colors, .transition-transform, .transition-opacity, .transition-all
               .duration-fast, .duration-normal, .duration-slow
Animation:     .animate-fade-in, .animate-fade-out, .animate-slide-up, .animate-slide-down
               .animate-scale-in, .animate-scale-out
               .motion-safe, .motion-reduce
Shadow:        .shadow-none, .shadow-xs, .shadow-sm, .shadow-md, .shadow-lg, .shadow-xl, .shadow-inner
               .glass
Border:        .border, .border-2, .border-4
               .border-t, .border-b, .border-l, .border-r
               .border-color-default, .border-color-accent, .border-color-danger
               .rounded-none, .rounded-sm, .rounded, .rounded-md, .rounded-lg, .rounded-xl, .rounded-full
               .ring-1, .ring-2, .ring-4
               .divide-y, .divide-x, .ui-divider
Responsive:    .ui-only-mobile, .ui-only-desktop, .ui-only-tablet
               .ui-container-query (container query parent)
States:        .ui-focus-ring, .ui-disabled, .ui-loading
               .ui-skip-link, .ui-live-polite, .ui-live-assertive
Spacing:       .ui-touch-target
Shell layout:  .ui-footer-grid, .ui-footer-links
               .ui-sidebar, .ui-rightbar, .ui-sidebar-nav, .ui-sidebar-nav__title
               .ui-shell-grid--left, .ui-shell-grid--right, .ui-shell-grid--both
               .ui-search, .ui-header-pad
```

### Component class naming (BEM per Ch 17)
```
.ui-{component}                   → base class (e.g. .ui-button)
.ui-{component}--{variant}        → variant modifier (e.g. .ui-button--primary)
.ui-{component}--{size}           → size modifier (e.g. .ui-button--sm)
.ui-{component}__{child}          → child element (e.g. .ui-card__header)
```

### React component API pattern (Ch 19)
```tsx
// Every component MUST:
// 1. Extend native HTML attributes for full type safety
// 2. Use variant/size/tone prop naming consistently
// 3. Spread {...props} last for override capability
// 4. Use shared cx() from src/ds/utils/cx.ts
// 5. Forward ref where appropriate
// 6. Add proper ARIA attributes per Ch 09

type ComponentProps = React.HTML*Attributes<Element> & {
  variant?: "primary" | "secondary" | "ghost";  // visual variant
  size?: "sm" | "md" | "lg";                    // size variant (consistent: sm=32px, md=40px, lg=48px)
  tone?: "neutral" | "accent" | "success" | "warning" | "danger" | "info";  // semantic color
  className?: string;                            // always merge, never replace
  children?: React.ReactNode;                    // composition
}
```

---

## Phase 0: Architecture Contract ⚠️ GATE — Must complete before ALL other phases

**Read FULLY before any implementation:**
- `DOC/DS BUILDING/HandBook_Frontend/17-CSS-ARCHITECTURE.md` (all sections)
- `DOC/DS BUILDING/HandBook_Frontend/18-TOKEN-ARCHITECTURE.md` (all sections)
- `DOC/DS BUILDING/HandBook_Frontend/19-COMPONENT-API-PATTERNS.md` (all sections)

**Deliverable:** Naming contract frozen. Layer order confirmed. DS folder structure finalized.

- [ ] T001 Read Ch 17 (CSS Architecture) — **upgrade to 9-layer cascade** per handbook: `@layer ds.reset, ds.tokens, ds.theme, ds.base, ds.layouts, ds.components, ds.patterns, ds.utilities, ds.overrides;` — create new layer CSS files (`ds.reset.css`, `ds.layouts.css`, `ds.patterns.css`) — update `src/ds/styles/index.css` with new imports and layer declaration
- [ ] T002 Read Ch 18 (Token Architecture) — confirm 3-tier token model (primitive → semantic → component) — document tier boundaries in comment block at top of `src/ds/styles/ds.tokens.css` — verify naming convention matches handbook §6 exactly
- [ ] T003 Read Ch 19 (Component API Patterns) — confirm prop naming patterns (variant/size/tone/className/children/ref) — create `src/ds/utils/cx.ts` to replace per-file cx() duplication — create `src/ds/utils/index.ts` barrel
- [ ] T004 Clean up duplicate barrels: delete contents of `src/ds/structures/` (replace with single `index.ts` that has deprecation comment), delete contents of `src/ds/interactions/` (same) — update `src/ds/index.ts` to remove those re-exports
- [ ] T005 Consolidate themes: merge `src/ds/themes/` into `src/ds/foundation/themes/` — update `src/ds/index.ts` to import ThemeInitScript from `./foundation/themes/ThemeInitScript` — delete `src/ds/themes/` folder
- [ ] T006 Verify `npm run verify` passes after Phase 0 changes

### Phase 0 Validation
- [ ] 9-layer order declared in `src/ds/styles/index.css` per Ch 17
- [ ] All 9 CSS layer files exist (even if empty placeholders)
- [ ] Token naming convention documented (3-tier model)
- [ ] Component API patterns documented (variant/size/tone/className/ref)
- [ ] `src/ds/utils/cx.ts` extracted to shared location
- [ ] Re-export barrel duplication eliminated (structures/, interactions/)
- [ ] Theme files consolidated in `src/ds/foundation/themes/`
- [ ] `npm run verify` passes

---

## Phase 1: Foundation Tokens ⚠️ GATE — Must complete before Phase 2+

**Read FULLY before implementing:**
- `DOC/DS BUILDING/HandBook_Frontend/01-TYPOGRAPHY.md` — all sections, especially §25 (token summary)
- `DOC/DS BUILDING/HandBook_Frontend/02-COLOR-SYSTEM.md` — all palette + semantic color token sections, especially §21 (token summary)
- `DOC/DS BUILDING/HandBook_Frontend/03-SPACING-LAYOUT.md` — space scale (§1), semantic spacing (§2), z-index (§17), container (§5), breakpoints (§11), §23 (token summary)
- `DOC/DS BUILDING/HandBook_Frontend/04-MOTION-ANIMATION.md` — duration (§2), easing (§3), keyframes (§6), §20 (token summary)
- `DOC/DS BUILDING/HandBook_Frontend/05-ELEVATION-DEPTH.md` — shadow scale (§3–4), inset (§6), ring (§7), glass/blur (§11), §18 (token summary)
- `DOC/DS BUILDING/HandBook_Frontend/06-BORDERS-RADIUS.md` — border-width (§2), radius scale (§5), §16 (token summary)
- `DOC/DS BUILDING/HandBook_Frontend/07-ICONOGRAPHY.md` — icon size scale (§3), icon color tokens (§10), §17 (token summary)
- `DOC/DS BUILDING/HandBook_Frontend/10-INTERACTIVE-STATES.md` — state tokens (§16), §18 (token summary)

**Target file:** `src/ds/styles/ds.tokens.css` — FULL REWRITE of `:root {}` block

### 1.1: Typography Tokens (Ch 01)
- [ ] T007 Rewrite typography tokens:
  - Font families: `--ds-font-sans`, `--ds-font-display`, `--ds-font-mono` (keep current values, clean comments — remove "Yahoo-like" references)
  - Font size scale: expand to 12 steps (`--ds-font-size-1` through `--ds-font-size-12`) per Ch 01 §2
  - Fluid font sizes: add `--ds-font-size-fluid-body`, `--ds-font-size-fluid-h1`, `--ds-font-size-fluid-h2`, `--ds-font-size-fluid-display` using `clamp()` per Ch 01 §11
  - Font weights: full scale (`thin` 100, `light` 300, `regular` 400, `book` 450, `medium` 500, `semibold` 600, `bold` 700, `extrabold` 800, `black` 900) per Ch 01 §3 — remove `demibold` (550)
  - Line heights: full scale (`none` 1, `tight` 1.2, `snug` 1.3, `normal` 1.5, `relaxed` 1.75, `loose` 2) per Ch 01 §4 — remove `section` (1.2778) and `meta` (1.4)
  - Letter spacing: full scale (`tighter` −0.05em, `tight` −0.02em, `normal` 0, `wide` 0.02em, `wider` 0.05em, `widest` 0.1em) per Ch 01 §5 — remove `loose` alias

### 1.2: Color Tokens (Ch 02)
- [ ] T008 Rewrite color palette tokens:
  - Palette neutrals: `--ds-palette-neutral-{0,50,100,200,300,400,500,600,700,800,900,950}` (keep current scale)
  - Palette brand: `--ds-palette-brand-{50,100,200,300,400,500,600,700,800,900,950}` (keep current)
  - Palette status: **expand** each status to full ramp (`--ds-palette-success-{50..950}`, `--ds-palette-warning-{50..950}`, `--ds-palette-danger-{50..950}`, `--ds-palette-info-{50..950}`) per Ch 02 §2 — minimum 3 steps (500, 600, 700) for hover/active states
  - Keep RGB helpers for accent/status colors for alpha variations

- [ ] T009 Rewrite semantic color tokens:
  - Background/Surface: `--ds-color-background`, `--ds-color-surface`, `--ds-color-surface-2`, `--ds-color-surface-3`, `--ds-color-surface-raised`, `--ds-color-surface-sunken`, `--ds-color-surface-overlay`, `--ds-color-surface-interactive` per Ch 02 §4
  - Foreground/Text: `--ds-color-foreground`, `--ds-color-foreground-secondary`, `--ds-color-foreground-muted`, `--ds-color-foreground-inverse`, `--ds-color-foreground-on-accent` per Ch 02 §5
  - Border: `--ds-color-border`, `--ds-color-border-strong`, `--ds-color-border-muted`, `--ds-color-border-focus`, `--ds-color-border-error` per Ch 02 §6
  - Accent: `--ds-color-accent`, `--ds-color-accent-hover`, `--ds-color-accent-active`, `--ds-color-accent-muted`, `--ds-color-accent-foreground` per Ch 02 §7
  - Status: `--ds-color-success` + `--ds-color-success-bg` + `--ds-color-success-text`, same for warning/danger/info per Ch 02 §8
  - Overlay: `--ds-color-overlay` per Ch 02 §17
  - Focus ring: `--ds-color-focus-ring` per Ch 02 §7
  - Text muted: `--ds-color-text-muted` per Ch 02 §5
  - **Remove all legacy aliases**: `--ds-color-bg`, `--ds-color-text`, `--ds-color-fg`, `--ds-color-fg-muted`, `--ds-color-surface-2` (if renamed to surface-raised/etc.), `--ds-color-primary` (use accent)

### 1.3: Spacing Tokens (Ch 03)
- [ ] T010 Rewrite spacing tokens:
  - Space scale: **expand** from 10 steps to Ch 03 full scale per §1:
    `--ds-space-0` (0), `--ds-space-px` (1px), `--ds-space-0.5` (2px), `--ds-space-1` (4px), `--ds-space-1.5` (6px), `--ds-space-2` (8px), `--ds-space-3` (12px), `--ds-space-4` (16px), `--ds-space-5` (20px), `--ds-space-6` (24px), `--ds-space-7` (28px), `--ds-space-8` (32px), `--ds-space-9` (36px), `--ds-space-10` (40px), `--ds-space-12` (48px), `--ds-space-14` (56px), `--ds-space-16` (64px), `--ds-space-20` (80px), `--ds-space-24` (96px), `--ds-space-32` (128px)
  - Semantic spacing: keep all (card-padding, modal-padding, form-gap, section-padding, section-margin, heading-margin, button/input padding, nav-padding) + add `--ds-space-page-inset`, `--ds-space-popover-pad`, `--ds-space-tooltip-gap`, `--ds-space-stack-gap`, `--ds-space-inline-gap` per Ch 03 §2
  - Container tokens: `--ds-container-narrow` (48rem), `--ds-container-default` (64rem), `--ds-container-wide` (72rem), `--ds-container-xl` (80rem) per Ch 03 §5
  - Grid tokens: `--ds-grid-columns` (12), `--ds-grid-gap`, `--ds-grid-gap-sm`, `--ds-grid-gap-lg` per Ch 03 §3

### 1.4: Motion Tokens (Ch 04)
- [ ] T011 [P] Rewrite motion tokens:
  - Duration: **expand** to 8 steps per Ch 04 §2: `--ds-duration-instant` (0ms), `--ds-duration-fastest` (50ms), `--ds-duration-fast` (100–120ms), `--ds-duration-normal` (200ms), `--ds-duration-moderate` (300ms), `--ds-duration-slow` (400ms), `--ds-duration-slower` (500ms), `--ds-duration-slowest` (700ms–1s)
  - Easing: **expand** to 10 per Ch 04 §3: `--ds-ease-linear`, `--ds-ease-standard` (cubic-bezier 0.4,0,0.2,1), `--ds-ease-in`, `--ds-ease-out`, `--ds-ease-in-out`, `--ds-ease-bounce`, `--ds-ease-spring`, `--ds-ease-elastic`, `--ds-ease-snap`, `--ds-ease-emphasized`

### 1.5: Shadow / Elevation Tokens (Ch 05)
- [ ] T012 [P] Rewrite shadow/elevation tokens:
  - Shadow scale: **expand** to 7 + none per Ch 05 §3: `--ds-shadow-none`, `--ds-shadow-xs`, `--ds-shadow-sm`, `--ds-shadow-md`, `--ds-shadow-lg`, `--ds-shadow-xl`, `--ds-shadow-2xl`
  - Inset shadows: `--ds-shadow-inset-xs`, `--ds-shadow-inset-sm`, `--ds-shadow-inset-md` per Ch 05 §6
  - Ring tokens: `--ds-ring-width`, `--ds-ring-offset`, `--ds-ring-color` per Ch 05 §7
  - Backdrop-blur scale: `--ds-blur-none` (0), `--ds-blur-sm` (4px), `--ds-blur-md` (8px), `--ds-blur-lg` (16px), `--ds-blur-xl` (24px), `--ds-blur-2xl` (40px) per Ch 05 §11

### 1.6: Border / Radius Tokens (Ch 06)
- [ ] T013 [P] Rewrite radius and border tokens:
  - Radius scale per Ch 06 §5: `--ds-radius-none` (0), `--ds-radius-xs` (2px), `--ds-radius-sm` (4px), `--ds-radius-md` (6–8px), `--ds-radius-lg` (12px), `--ds-radius-xl` (16px), `--ds-radius-2xl` (24px), `--ds-radius-full` (9999px)
  - **Remove old aliases**: delete `--ds-radius-card`, `--ds-radius-modal`, `--ds-radius-default`, `--ds-radius-1/2/3`
  - Border-width tokens per Ch 06 §2: `--ds-border-0` (0), `--ds-border-hairline` (0.5px), `--ds-border-thin` (1px), `--ds-border-medium` (2px), `--ds-border-thick` (3px), `--ds-border-heavy` (4px)
  - Border color tokens per Ch 06 §4: `--ds-border-default`, `--ds-border-subtle`, `--ds-border-strong`, `--ds-border-muted` + state variants (`--ds-border-hover`, `--ds-border-focus`, `--ds-border-active`, `--ds-border-selected`, `--ds-border-disabled`) + status variants (`--ds-border-success`, `--ds-border-warning`, `--ds-border-danger`, `--ds-border-info`)

### 1.7: Z-Index Tokens (Ch 03 §17 + Ch 14 §2)
- [ ] T014 [P] Rewrite z-index tokens:
  - Per Ch 14 §2 z-index architecture: `--ds-z-base` (0), `--ds-z-sticky` (100), `--ds-z-dropdown` (200), `--ds-z-topbar` (300), `--ds-z-drawer` (400), `--ds-z-modal` (500), `--ds-z-modal-content` (510), `--ds-z-toast` (600), `--ds-z-tooltip` (700)

### 1.8: Icon Tokens (Ch 07)
- [ ] T015 [P] Add icon tokens:
  - Size scale per Ch 07 §3: `--ds-icon-xs` (12px), `--ds-icon-sm` (16px), `--ds-icon-md` (20px), `--ds-icon-lg` (24px), `--ds-icon-xl` (32px), `--ds-icon-2xl` (48px), `--ds-icon-3xl` (64px)
  - Color tokens per Ch 07 §10: `--ds-icon-default`, `--ds-icon-muted`, `--ds-icon-accent`, `--ds-icon-success`, `--ds-icon-warning`, `--ds-icon-danger`, `--ds-icon-on-accent`

### 1.9: State Tokens (Ch 10)
- [ ] T016 [P] Add interactive state tokens:
  - Per Ch 10 §16: `--ds-state-hover` (5–10% lightening), `--ds-state-active` (10–15% darkening), `--ds-state-selected` (accent 10–15% opacity), `--ds-state-focus` (focus ring color ref), `--ds-state-disabled-opacity` (0.4), `--ds-state-drag-opacity` (0.5)

### 1.10: Sizing / Dimension Tokens (existing + cleanup)
- [ ] T017 Rewrite sizing tokens:
  - Keep: hero-min-h, header-h, viewport-minus-header, touch-target, input-min-h, button sizes, icon sizes (now in T015), fab, tabs-h, bottom-nav-h, selection-control
  - Keep shell sizing: shell-left, shell-right, shell-collapsed
  - **Remove** non-standard or unused tokens + clean comments — remove "Yahoo-like" and "SolarConnect" references
  - Add control-height tokens per Ch 16 density: `--ds-control-height-sm` (32px), `--ds-control-height-md` (40px), `--ds-control-height-lg` (48px)

### 1.11: TypeScript Token Sync
- [ ] T018 [P] Update `src/ds/foundation/tokens/vars.ts` — add TypeScript references for all new tokens added in T007–T017. Remove references to deleted tokens.

- [ ] T019 Verify `npm run verify` passes after Phase 1

### Phase 1 Validation
- [ ] Typography tokens cover Ch 01 §25 completely (3 families, 12 font sizes + 4 fluid, 9 weights, 6 line-heights, 6 letter-spacings)
- [ ] Color palette tokens cover Ch 02 §21 completely (neutral ramp, brand ramp, 4 status ramps)
- [ ] Color semantic tokens cover Ch 02 §21 completely (8+ surface, 5 foreground, 5 border, 5 accent, 12+ status, overlay, focus-ring)
- [ ] Spacing tokens cover Ch 03 §23 completely (20+ space steps, 15+ semantic, 4 container, 4 grid)
- [ ] Motion tokens cover Ch 04 §20 completely (8 durations, 10 easings)
- [ ] Shadow tokens cover Ch 05 §18 completely (7 shadow + 3 inset + 3 ring + 6 blur)
- [ ] Radius + border tokens cover Ch 06 §16 completely (8 radius, 6 border-width, 14+ border-color)
- [ ] Z-index tokens cover Ch 14 §2 architecture (9 levels)
- [ ] Icon tokens cover Ch 07 §17 (7 sizes, 7 colors)
- [ ] State tokens cover Ch 10 §18 (6 state tokens)
- [ ] No legacy aliases remain
- [ ] No "Yahoo-like" or "SolarConnect" comments remain
- [ ] `vars.ts` exports match new token set 1:1
- [ ] `npm run verify` passes

---

## Phase 2: Theme System ⚠️ GATE — Must complete before Phase 3+

**Read FULLY before implementing:**
- `DOC/DS BUILDING/HandBook_Frontend/16-THEMING-ARCHITECTURE.md` (all sections)
- `DOC/DS BUILDING/HandBook_Frontend/02-COLOR-SYSTEM.md` — dark/light mode (§10), contrast (§12)

**Target files:** `src/ds/styles/ds.theme.css`, `src/ds/styles/ds.tokens.css` (theme override blocks), `src/ds/foundation/themes/`

- [ ] T020 Rewrite `src/ds/styles/ds.theme.css` — implement `color-scheme` mapping per Ch 16 §3: `html.theme-light { color-scheme: light; }`, `html.theme-dark { color-scheme: dark; }`, `html.theme-purple { color-scheme: dark; }`
- [ ] T021 Rewrite theme override blocks in `src/ds/styles/ds.tokens.css`:
  - `html.theme-light {}` — override ALL semantic color tokens for light mode (every background, surface, foreground, border, accent, status + their variants)
  - `html.theme-purple {}` — override brand palette tokens + accent chain for purple variant
  - Ensure **every** new semantic token from T009 has a light-mode and purple-mode override
  - Remove any redundant re-declarations (tokens that are identical across themes)
- [ ] T022 Rewrite density/visual/platform knob overrides per Ch 16 §6:
  - `[data-density="compact"]` — override control-height tokens + spacing overrides
  - `[data-density="spacious"]` — override control-height tokens + spacing overrides
  - `[data-visual="glass"]` — override surface tokens (semi-transparent) + add backdrop-blur
  - `[data-visual="neumorph"]` — override shadow tokens (inset + outset duo)
  - `[data-visual="sleek"]` — override shadow + radius tokens
  - `[data-platform="mobile"]` — override touch-target + nav sizing
- [ ] T023 Add high-contrast and forced-colors support per Ch 16 §11:
  - `@media (forced-colors: active)` — system colors fallback
  - `@media (prefers-contrast: more)` — tighten contrast ratios
  - `@media (prefers-contrast: less)` — soften contrast ratios
- [ ] T024 Update theme registry + switching:
  - Ensure `ThemeName` type, `THEMES` array, `DEFAULT_THEME` match new theme structure
  - Verify `ThemeInitScript` FOUC prevention works
  - Verify `applyTheme()` + `storeTheme()` utilities
  - Verify `ThemeSwitcher` component — update if any token names changed in Phase 1
- [ ] T025 Verify `npm run verify` passes after Phase 2

### Phase 2 Validation
- [ ] Light theme overrides EVERY semantic color token
- [ ] Purple theme overrides brand palette + accent chain
- [ ] Density knobs work (compact, comfortable, spacious) per Ch 16 §6
- [ ] Visual knobs work (flat, glass, neumorph, sleek) per Ch 16 §5
- [ ] Platform knob works (mobile)
- [ ] High-contrast / forced-colors media queries exist per Ch 16 §11
- [ ] Theme init script prevents FOUC per Ch 16 §13
- [ ] `color-scheme` declared per Ch 16 §12
- [ ] Scoped theme support verified (`<div data-theme="dark">` works) per Ch 16 §10
- [ ] `npm run verify` passes

---

## Phase 3: Reset + Base Styles + Utilities ⚠️ GATE — Must complete before Phase 4+

**Read FULLY before implementing:**
- `DOC/DS BUILDING/HandBook_Frontend/17-CSS-ARCHITECTURE.md` — reset/base sections (§15)
- `DOC/DS BUILDING/HandBook_Frontend/01-TYPOGRAPHY.md` — Sections 6–24 (all class/utility sections)
- `DOC/DS BUILDING/HandBook_Frontend/02-COLOR-SYSTEM.md` — color utility class sections (§20)
- `DOC/DS BUILDING/HandBook_Frontend/03-SPACING-LAYOUT.md` — layout utility class sections (§22)
- `DOC/DS BUILDING/HandBook_Frontend/04-MOTION-ANIMATION.md` — animation utility/keyframe sections (§5, §6, §19)
- `DOC/DS BUILDING/HandBook_Frontend/05-ELEVATION-DEPTH.md` — shadow/glass utility sections (§17)
- `DOC/DS BUILDING/HandBook_Frontend/06-BORDERS-RADIUS.md` — border/ring utility sections (§15)
- `DOC/DS BUILDING/HandBook_Frontend/08-RESPONSIVE-BREAKPOINTS.md` — responsive utility sections (§16)
- `DOC/DS BUILDING/HandBook_Frontend/10-INTERACTIVE-STATES.md` — state utility sections

### 3.0: Reset Layer (NEW — Ch 17 §15)
- [ ] T026 Create `src/ds/styles/ds.reset.css` — browser normalization within `@layer ds.reset {}`:
  - Box-sizing: `*, *::before, *::after { box-sizing: border-box; }`
  - Margin reset: `* { margin: 0; }`
  - Media defaults: `img, picture, video, canvas, svg { display: block; max-width: 100%; }`
  - Form element reset: `input, button, textarea, select { font: inherit; }`
  - ID-based scroll reset: `html { scroll-behavior: smooth; }`
  - Reduced-motion media query: `@media (prefers-reduced-motion: reduce) { ... }` per Ch 04 §17 / Ch 09 §10

### 3.1: Base Styles
- [ ] T027 Rewrite `src/ds/styles/ds.base.css` within `@layer ds.base {}`:
  - Body typography: font-family var, line-height var, color var, background var, font-smoothing, text-rendering
  - Global `::selection` styling using accent token per Ch 01 §22
  - Input/textarea `caret-color` using accent token per Ch 01 §22
  - `<a>` base: color inherit, text-decoration none
  - `<code>` base: font-mono, slight size reduction, background, padding, radius, border per Ch 01 §16
  - `<pre>` base: overflow-x auto, padding, radius per Ch 01 §16

### 3.2: Typography Utilities (Ch 01 §6–§24)
- [ ] T028 Implement semantic typography classes in `src/ds/styles/ds.utilities.css`:
  - Display: `.text-display-1`, `.text-display-2`, `.text-display-3` per Ch 01 §10 — each sets ALL 5 axes (family, size, weight, line-height, letter-spacing) + text-wrap: balance
  - Headings: `.text-heading-1` through `.text-heading-6` per Ch 01 §6–§7 — each sets ALL 5 axes
  - Body: `.text-body`, `.text-body-large`, `.text-body-small` per Ch 01 §6, §8
  - UI text: `.text-label`, `.text-caption`, `.text-overline`, `.text-micro` per Ch 01 §6, §9
  - Special: `.text-quote`, `.text-code`, `.text-kbd` per Ch 01 §6, §16
  - **Every class must set all 5 axes** (family + size + weight + line-height + letter-spacing) — no partial composition

- [ ] T029 [P] Implement text color utilities:
  - `.text-muted` — uses `--ds-color-foreground-muted`
  - `.text-accent` — uses `--ds-color-accent`
  - `.text-success`, `.text-warning`, `.text-danger`, `.text-info` — uses respective status colors
  - `.text-inherit` — `color: inherit`
  - `.text-on-primary` — uses `--ds-color-foreground-on-accent`

- [ ] T030 [P] Implement text truncation + overflow utilities per Ch 01 §13:
  - `.text-truncate` (single-line ellipsis)
  - `.text-line-clamp-1` through `.text-line-clamp-5` (multi-line)

- [ ] T031 [P] Implement text alignment + wrapping utilities per Ch 01 §14:
  - `.text-start`, `.text-center`, `.text-end` (logical properties)
  - `.text-nowrap`, `.text-balance`, `.text-pretty`
  - `.break-words`, `.break-all`, `.hyphens-auto`

- [ ] T032 [P] Implement text decoration + transform + style utilities per Ch 01 §15:
  - `.underline`, `.overline`, `.line-through`, `.no-underline`
  - `.underline-offset-2`, `.underline-offset-4`
  - `.decoration-accent`, `.decoration-wavy`, `.decoration-2`
  - `.uppercase`, `.lowercase`, `.capitalize`, `.normal-case`
  - `.italic`, `.not-italic`

- [ ] T033 [P] Implement selection + numeric + OpenType utilities per Ch 01 §20, §22, §18:
  - `.select-none`, `.select-text`, `.select-all`
  - `.text-tabular` (tabular-nums), `.text-oldstyle` (oldstyle-nums)
  - `.text-smallcaps` (small-caps), `.text-ordinal` (ordinal)

- [ ] T034 Implement prose module per Ch 01 §12:
  - `.prose` — styles all descendant HTML elements (h1–h6, p, a, strong, em, ul, ol, li, blockquote, code, pre, hr, img, figure, figcaption, table, mark, abbr, sub, sup, details, summary, kbd)
  - `.prose-sm`, `.prose-lg`, `.prose-xl` — size variants
  - Must set `max-width` (55–75ch depending on variant)

- [ ] T035 [P] Implement gradient + decorative text utilities per Ch 01 §21:
  - `.text-gradient` — background-clip text gradient using accent colors
  - `.text-gradient-animated` — animated gradient text
  - `.text-outline` — stroke text (no fill)

### 3.3: Color Utilities (Ch 02 §20)
- [ ] T036 Implement background color utilities:
  - `.bg-surface`, `.bg-surface-elevated`, `.bg-surface-sunken`
  - `.bg-accent`, `.bg-success`, `.bg-warning`, `.bg-danger`, `.bg-info`
  - `.bg-overlay` — overlay backdrop color

### 3.4: Layout Utilities (Ch 03 §22)
- [ ] T037 Rewrite layout utilities:
  - Page: `.ui-page`, `.ui-page-main` — full-page wrapper + main area
  - Container: `.ui-container`, `.ui-container--narrow`, `.ui-container--wide`, `.ui-container--xl` — width-constrained
  - Stack: `.ui-stack` + gap variants (`.ui-stack--tight`, `.ui-stack--compact`, `.ui-stack--loose`, `.ui-stack--spacious`) — vertical flex
  - Row: `.ui-row` + variants (`.ui-row--between`, `.ui-row--center`, `.ui-row--end`, `.ui-row--nowrap`) — horizontal flex
  - Grid: `.ui-grid`, `.ui-grid--2`, `.ui-grid--3`, `.ui-grid--4` — responsive CSS grid + auto-fill pattern
  - Split: `.ui-split`, `.ui-split--reverse` — asymmetric 2-column
  - Section: `.ui-section`, `.ui-section--sm`, `.ui-section--lg` — section padding
  - Band: `.ui-band` — full-width band
  - Center: `.ui-center` — margin-inline auto
  - Hero: `.ui-hero` — hero section with min-height
  - All responsive breakpoints for grid/split/etc. per Ch 08

### 3.5: Spacing Utilities (Ch 03)
- [ ] T038 [P] Implement spacing + dimensional helpers:
  - `.ui-touch-target` — minimum touch size (44×44)
  - `.min-h-hero`, `.min-h-viewport-minus-header` — dimensional helpers

### 3.6: Motion Utilities (Ch 04 §19)
- [ ] T039 [P] Implement motion utilities:
  - Transitions: `.transition-colors`, `.transition-transform`, `.transition-opacity`, `.transition-all`
  - Duration overrides: `.duration-fast`, `.duration-normal`, `.duration-slow`
  - Enter keyframes: `.animate-fade-in`, `.animate-slide-up`, `.animate-slide-down`, `.animate-scale-in`
  - Exit keyframes: `.animate-fade-out`, `.animate-scale-out`
  - Looping keyframes: `.animate-spin`, `.animate-pulse`, `.animate-ping`, `.animate-bounce`
  - Motion-safe/reduce wrappers per Ch 04 §17

### 3.7: Elevation Utilities (Ch 05 §17)
- [ ] T040 [P] Implement elevation utilities:
  - `.shadow-none`, `.shadow-xs`, `.shadow-sm`, `.shadow-md`, `.shadow-lg`, `.shadow-xl`, `.shadow-2xl` — shadow scale
  - `.shadow-inner` — inset shadow
  - `.glass` — backdrop-filter blur + semi-transparent background per Ch 05 §11

### 3.8: Border Utilities (Ch 06 §15)
- [ ] T041 [P] Implement border utilities:
  - Width: `.border`, `.border-2`, `.border-4`
  - Directional: `.border-t`, `.border-b`, `.border-l`, `.border-r`
  - Color: `.border-color-default`, `.border-color-accent`, `.border-color-danger`
  - Radius: `.rounded-none`, `.rounded-xs`, `.rounded-sm`, `.rounded`, `.rounded-md`, `.rounded-lg`, `.rounded-xl`, `.rounded-2xl`, `.rounded-full`
  - Ring: `.ring-1`, `.ring-2`, `.ring-4`
  - Dividers: `.divide-y`, `.divide-x`
  - Divider element: `.ui-divider` (horizontal + vertical variants)

### 3.9: Responsive Utilities (Ch 08 §16)
- [ ] T042 Implement responsive utilities:
  - Breakpoint reference comment block: `sm: 640px, md: 768px, lg: 1024px, xl: 1280px, 2xl: 1536px`
  - `.ui-only-mobile` (hidden above md), `.ui-only-desktop` (hidden below lg), `.ui-only-tablet` (visible only md–lg)
  - Container query: `.ui-container-query` parent + `@container` rules per Ch 08 §5
  - Touch/pointer media queries as reference: `@media (hover: hover)`, `@media (pointer: coarse)` per Ch 08 §13

### 3.10: Interactive State Utilities (Ch 10)
- [ ] T043 Implement interactive state utilities:
  - `.ui-focus-ring` — `:focus-visible` outline/box-shadow (min 2px, 3:1 contrast per Ch 09 §6)
  - `.ui-disabled` — reduced opacity (var(--ds-state-disabled-opacity)), pointer-events none, cursor not-allowed
  - `.ui-loading` — reduced opacity, pointer-events none
  - `.ui-skip-link` — visible on focus, off-screen otherwise per Ch 09 §5 / Ch 13 §15
  - `.ui-live-polite`, `.ui-live-assertive` — live region utility per Ch 09 §7
  - `.sr-only` — visually hidden but screen-reader-visible per Ch 09 §7

### 3.11: Shell Layout Utilities (Ch 03 / existing patterns)
- [ ] T044 Rewrite contextual layout utilities in `src/ds/styles/ds.layouts.css` within `@layer ds.layouts {}`:
  - `.ui-footer-grid`, `.ui-footer-links` — footer layout
  - `.ui-sidebar`, `.ui-rightbar` — sticky sidebar/rightbar
  - `.ui-sidebar-nav`, `.ui-sidebar-nav__title` — sidebar navigation
  - `.ui-shell-grid--left`, `.ui-shell-grid--right`, `.ui-shell-grid--both` — dashboard shell grids
  - `.ui-search` — search input sizing
  - `.ui-header-pad` — header padding

- [ ] T045 Verify `npm run verify` passes after Phase 3

### Phase 3 Validation
- [ ] Every section (§1–§25) of Ch 01 has a corresponding token or utility
- [ ] Every color utility from Ch 02 §20 exists
- [ ] Every layout utility from Ch 03 §22 exists
- [ ] Every motion utility from Ch 04 §19 exists
- [ ] Every elevation utility from Ch 05 §17 exists
- [ ] Every border/radius utility from Ch 06 §15 exists
- [ ] Every responsive pattern from Ch 08 §16 exists
- [ ] Every interactive state from Ch 10 exists
- [ ] `.sr-only` utility exists per Ch 09 §7
- [ ] `.ui-skip-link` exists per Ch 09 §5
- [ ] No duplicate classes
- [ ] No legacy class names remain
- [ ] `.prose` module complete with all descendant element styling
- [ ] Shell layout utilities live in `ds.layouts.css` layer
- [ ] Reset layer (`ds.reset.css`) exists and is minimal
- [ ] `npm run verify` passes

---

## Phase 4: Semantic Class Registry + Foundation TS

**Read:** `src/ds/SEMANTIC-CLASSES-REGISTRY.md`, `src/ds/foundation/semantics/registry.ts`

- [ ] T046 Rewrite `src/ds/foundation/semantics/registry.ts` — add typed entries for every `ui-*`, `text-*`, and `.sr-only` class created in Phase 3. Remove any entries for deleted classes.
- [ ] T047 Rewrite `src/ds/SEMANTIC-CLASSES-REGISTRY.md` — full registry of every utility class with purpose, layer, and example usage.
- [ ] T048 Update `src/ds/foundation/motion/tokens.ts` — export all new motion tokens (8 durations, 10 easings) as typed TS constants matching `src/ds/styles/ds.tokens.css`.
- [ ] T049 Update `src/ds/foundation/a11y/` — ensure `VisuallyHidden` component, `usePrefersReducedMotion` hook, and `FOCUS_RING_CLASSNAME` are aligned with new utility names from Phase 3.
- [ ] T050 Verify `npm run verify` passes after Phase 4

### Phase 4 Validation
- [ ] Every utility class in `ds.utilities.css` + `ds.layouts.css` has a typed entry in `registry.ts`
- [ ] Semantic registry doc matches actual CSS 1:1
- [ ] Motion TS exports match token CSS 1:1
- [ ] A11y foundation aligned with new class names
- [ ] `npm run verify` + `npm run ds:audit` pass

---

## Phase 5: Iconography

**Read FULLY:** `DOC/DS BUILDING/HandBook_Frontend/07-ICONOGRAPHY.md` (all sections)

**Target files:** `src/ds/icons.ts`, `src/ds/components/Icon.tsx`, icon CSS in `src/ds/styles/ds.components.css`

- [ ] T051 Rewrite icon size system in `src/ds/styles/ds.components.css`:
  - `.ui-icon`, `.ui-icon--xs`, `.ui-icon--sm`, `.ui-icon--md`, `.ui-icon--lg`, `.ui-icon--xl`, `.ui-icon--2xl`, `.ui-icon--3xl` — using `--ds-icon-*` tokens per Ch 07 §3
  - Stroke-width convention: default 1.5px per Ch 07 §5

- [ ] T052 Review `src/ds/icons.ts` — ensure curated icon barrel follows Ch 07 §6 naming conventions (kebab-case, concept-based not appearance-based). Remove unused icons. Add missing common icons per Ch 07 §7 minimum set (100–150).

- [ ] T053 Review `src/ds/components/Icon.tsx` — ensure:
  - `size` prop maps to icon size tokens (xs/sm/md/lg/xl)
  - `color` prop maps to icon color tokens (default/muted/accent/success/warning/danger/on-accent)
  - `className` passthrough works and merges
  - A11y: `aria-hidden="true"` for decorative (default), `aria-label` for meaningful per Ch 07 §14 / Ch 09

- [ ] T054 Verify `npm run verify` passes after Phase 5

---

## Phase 6: Accessibility Foundation

**Read FULLY:** `DOC/DS BUILDING/HandBook_Frontend/09-ACCESSIBILITY.md` (all sections)

**This phase is cross-cutting — rules apply retroactively to everything above and forward to everything below.**

- [ ] T055 Audit all Phase 3 utilities for a11y compliance per Ch 09:
  - Focus ring meets WCAG 2.2 §2.4.7 — min 2px, 3:1 contrast against adjacent colors
  - Color contrast: verify all semantic text-color + bg-color token combinations meet 4.5:1 (AA) for normal text, 3:1 for large text
  - Motion: verify `prefers-reduced-motion` in reset layer disables all animations/transitions
  - Touch targets: verify `.ui-touch-target` meets 44×44px minimum per WCAG 2.5.8

- [ ] T056 Ensure `src/ds/foundation/a11y/` provides:
  - `VisuallyHidden` component (screen-reader-only)
  - `usePrefersReducedMotion()` hook
  - `FOCUS_RING_CLASSNAME` constant
  - Skip-link utility class (`.ui-skip-link`) per Ch 09 §5 (already in Phase 3 T043)
  - Live region utilities (`.ui-live-polite`, `.ui-live-assertive`) per Ch 09 §7 (already in Phase 3 T043)

- [ ] T057 Create `src/ds/utils/keyboard.ts` — shared keyboard constants and helpers per Ch 09 §5:
  - Key constants: `KEYS.Escape`, `KEYS.Tab`, `KEYS.ArrowUp/Down/Left/Right`, `KEYS.Home`, `KEYS.End`, `KEYS.Enter`, `KEYS.Space`
  - `getFocusableElements(container: HTMLElement)` — returns all focusable descendants
  - `trapFocus(container: HTMLElement)` — enables focus trapping within container
  - Update `src/ds/utils/index.ts` barrel

- [ ] T058 Verify `npm run verify` passes after Phase 6

### Phase 6 Validation
- [ ] Every WCAG 2.2 AA requirement from Ch 09 has a corresponding utility, pattern, or rule
- [ ] Skip-link utility exists and works
- [ ] Live region utilities exist
- [ ] Keyboard utilities are shared in `src/ds/utils/keyboard.ts`, not duplicated per component
- [ ] Color contrast verified for all semantic token pairs (documented in comment block or separate report)
- [ ] `npm run verify` + `npm run ds:a11y` pass

---

## Phase 7: Primitives Rebuild ⚠️ GATE — Must complete before Phase 8+

**Read FULLY:**
- `DOC/DS BUILDING/HandBook_Frontend/19-COMPONENT-API-PATTERNS.md` (all sections)
- `DOC/DS BUILDING/HandBook_Frontend/10-INTERACTIVE-STATES.md` (state specs per component type: §5 button, §6 input, §7 link, §8 checkbox/radio, §9 switch)

**Target:** all files in `src/ds/primitives/` + their CSS in `src/ds/styles/ds.components.css`

All primitives must follow Ch 19 API patterns:
- Extend `React.HTML*Attributes<Element>` for full type safety
- Use `variant`, `size`, `tone` prop naming consistently
- Spread `{...props}` last for override capability
- Use shared `cx()` from `src/ds/utils/cx.ts`
- Forward ref via `React.forwardRef` (mandatory for all per Ch 19 §9)
- Add proper ARIA attributes per Ch 09
- Support both controlled and uncontrolled patterns where applicable per Ch 19 §11

- [ ] T059 Rebuild `src/ds/primitives/Text.tsx`:
  - `variant` prop maps to ALL semantic typography classes (display-1..3, heading-1..6, body, body-large, body-small, label, caption, overline, micro, quote, code, kbd)
  - `as` prop for polymorphic rendering (h1–h6, p, span, div, blockquote, code, kbd) per Ch 19 §7
  - `tone` prop for color (default, muted, accent, success, warning, danger, info)
  - `truncate` prop (boolean or number for line-clamp)
  - `align` prop (start, center, end)
  - Implements Ch 01 §7: semantic HTML via `as` + visual style via `variant`

- [ ] T060 Rebuild `src/ds/primitives/Button.tsx`:
  - `variant`: primary, secondary, ghost, text, icon, fab per Ch 19 §3
  - `size`: sm, md, lg (consistent heights: 32/40/48px)
  - `tone`: accent, danger, success (affects color)
  - `isLoading`, `loadingText` props per Ch 19 §2
  - `as` prop for polymorphic (render as `<a>` or `<button>`) per Ch 19 §7
  - Interactive states per Ch 10 §5: default, hover, focus-visible, active (scale 0.97–0.98), disabled, loading
  - CSS: `.ui-button`, `.ui-button--primary/secondary/ghost/text/icon/fab`, `--sm/--lg`

- [ ] T061 [P] Rebuild `src/ds/primitives/Input.tsx`:
  - Extends `React.InputHTMLAttributes`
  - `size`: sm, md, lg
  - `startSlot`, `endSlot` props for adornments per Ch 19 §4
  - States per Ch 10 §6: default, hover, focus (accent border + ring), filled, error (`aria-invalid`), disabled, readonly
  - CSS: `.ui-input`, `.ui-input--sm/--lg`, `.ui-input--error`

- [ ] T062 [P] Rebuild `src/ds/primitives/Textarea.tsx`:
  - Same pattern as Input + auto-resize option
  - CSS: `.ui-textarea` + variants

- [ ] T063 [P] Rebuild `src/ds/primitives/Select.tsx`:
  - Same pattern as Input + custom dropdown indicator
  - CSS: `.ui-select` + variants

- [ ] T064 [P] Rebuild `src/ds/primitives/Checkbox.tsx`:
  - `checked`, `indeterminate` states per Ch 10 §8
  - Uses `--ds-size-selection-control` token
  - ARIA: native checkbox semantics + `aria-checked`
  - CSS: `.ui-checkbox`

- [ ] T065 [P] Rebuild `src/ds/primitives/Radio.tsx`:
  - Same pattern as Checkbox per Ch 10 §8
  - CSS: `.ui-radio`

- [ ] T066 [P] Rebuild `src/ds/primitives/Switch.tsx`:
  - Boolean toggle, `checked` state per Ch 10 §9
  - ARIA: `role="switch"`, `aria-checked`
  - CSS: `.ui-switch`

- [ ] T067 [P] Rebuild `src/ds/primitives/RangeSlider.tsx`:
  - `min`, `max`, `step`, `value` props
  - ARIA: `role="slider"`, `aria-valuemin/max/now/text`
  - CSS: `.ui-range`

- [ ] T068 [P] Rebuild `src/ds/primitives/Avatar.tsx`:
  - `size`: xs, sm, md, lg, xl, 2xl, 3xl per Ch 12 §9 (24/32/40/48/64/96/128px)
  - `src`, `alt`, `fallback` props
  - Status dot position per Ch 12 §9
  - CSS: `.ui-avatar`, `.ui-avatar--xs/sm/md/lg/xl/2xl/3xl`

- [ ] T069 [P] Rebuild `src/ds/primitives/Spinner.tsx`:
  - `size`: sm, md, lg
  - ARIA: `role="status"`, `aria-label`
  - CSS: `.ui-spinner` + size variants

- [ ] T070 [P] Rebuild layout primitives — `Stack.tsx`, `Grid.tsx`, `Container.tsx`, `Divider.tsx`, `Spacer.tsx`:
  - Stack: `gap` prop (tight, compact, default, loose, spacious), `direction` (column, row)
  - Grid: `columns` prop (1–4, auto-fill), `gap` prop
  - Container: `size` prop (narrow, default, wide, xl)
  - Divider: `orientation` (horizontal, vertical)
  - Spacer: `size` prop (mapped to space tokens)

- [ ] T071 Write CSS for all primitives in `src/ds/styles/ds.components.css`:
  - CSS for every `.ui-*` class referenced in T059–T070
  - Follow BEM naming from contract
  - All colors via tokens, all spacing via tokens, all radii via tokens
  - All interactive states (hover, active, focus-visible, disabled, loading) per Ch 10
  - State transition timings per Ch 10 §17 (hover in: 100ms ease-out, etc.)

- [ ] T072 Update `src/ds/index.ts` barrel — ensure all primitives exported with correct named exports
- [ ] T073 Verify `npm run verify` passes after Phase 7

### Phase 7 Validation
- [ ] Every primitive follows Ch 19 API patterns (variant/size/tone/className/ref)
- [ ] Every primitive uses shared `cx()` from `src/ds/utils/cx.ts`
- [ ] Every interactive primitive has ALL states from Ch 10 (§5–§9)
- [ ] Every primitive has ARIA attributes per Ch 09
- [ ] Text primitive covers ALL semantic typography classes from Phase 3
- [ ] Avatar supports Ch 12 §9 sizes (7 sizes: xs through 3xl)
- [ ] CSS classes follow BEM naming contract
- [ ] No hardcoded values in component files — all from tokens
- [ ] State transition timings follow Ch 10 §17
- [ ] `src/ds/index.ts` exports all primitives
- [ ] `npm run verify` passes

---

## Phase 8: Form Components

**Read FULLY:** `DOC/DS BUILDING/HandBook_Frontend/11-FORM-ANATOMY.md` (all sections)

- [ ] T074 Rebuild `src/ds/components/Field.tsx` — field wrapper with label (top-aligned default) + input slot + helper text + error message + character count per Ch 11 §2, §4, §5, §7
- [ ] T075 [P] Rebuild `src/ds/components/FormHelpers.tsx` — Fieldset (`<fieldset>` + `<legend>`), FormGroup, FormActions, FormErrorSummary per Ch 11 §15, §17
- [ ] T076 [P] Rebuild `src/ds/components/Autocomplete.tsx` — combobox with keyboard nav (up/down/enter/escape/type-ahead) per Ch 11 §11
- [ ] T077 [P] Rebuild `src/ds/components/MultiSelect.tsx` — multi-value select with tags per Ch 11 §14
- [ ] T078 [P] Rebuild `src/ds/components/TagInput.tsx` — tag/chip input per Ch 11 §14
- [ ] T079 [P] Rebuild `src/ds/components/FileDropzone.tsx` — file upload with drag-drop per Ch 11 §13
- [ ] T080 [P] Rebuild `src/ds/components/DateTimePickers.tsx` — date/time picker components per Ch 11 §12
- [ ] T081 [P] Rebuild `src/ds/components/FilterPanel.tsx` — filter composition panel
- [ ] T082 Write CSS for all form components in `src/ds/styles/ds.components.css`
- [ ] T083 Update `src/ds/index.ts` barrel for form components
- [ ] T084 Verify `npm run verify` passes after Phase 8

### Phase 8 Validation
- [ ] Field anatomy complete (label + input + helper + error + count) per Ch 11 §2
- [ ] Validation timing support (on-blur default, on-submit, debounced async) per Ch 11 §6
- [ ] Error messages: specific, helpful, polite + ARIA (`aria-describedby`, `role="alert"`) per Ch 11 §7
- [ ] FormErrorSummary at top of form per Ch 11 §7
- [ ] All form components accessible (visible labels, `aria-invalid`, `aria-describedby`, `aria-required`) per Ch 11 §18
- [ ] Fieldset + legend for grouped inputs per Ch 11 §15
- [ ] `npm run verify` passes

---

## Phase 9: Data Display Components

**Read FULLY:** `DOC/DS BUILDING/HandBook_Frontend/12-DATA-DISPLAY.md` (all sections)

- [ ] T085 Rebuild `src/ds/components/DataTable.tsx` — sortable (▲/▼), filterable, selectable (checkboxes + bulk actions bar), sticky header, pagination per Ch 12 §2–§3
- [ ] T086 [P] Rebuild `src/ds/components/DataGrid.tsx` — advanced data grid per Ch 12 §3
- [ ] T087 [P] Rebuild `src/ds/components/Card.tsx`, `ImageCard.tsx`, `IconCard.tsx` — card variants (basic, media, stat, profile, interactive, selectable, pricing, testimonial, feature) per Ch 12 §6
- [ ] T088 [P] Rebuild `src/ds/components/Badge.tsx` — badge variants (count, dot, status, tag/chip, removable) per Ch 12 §8
- [ ] T089 [P] Rebuild `src/ds/components/MetricCard.tsx` — stat card (label, value, trend arrow + %, sparkline, comparison) per Ch 12 §7
- [ ] T090 [P] Rebuild `src/ds/components/Timeline.tsx` — timeline variants (vertical-left, vertical-center, horizontal, activity feed) per Ch 12 §10
- [ ] T091 [P] Rebuild `src/ds/components/List.tsx` — structured list (avatar/icon + title + description + meta/badge + actions) per Ch 12 §4
- [ ] T092 [P] Rebuild `src/ds/components/AvatarGroup.tsx` — stacked avatar (overlap 25–30%, max 3–5 visible + "+N" count, border ring) per Ch 12 §9
- [ ] T093 [P] Rebuild `src/ds/components/Charts.tsx` + `Sparkline.tsx` — chart/sparkline components per Ch 12 §12
- [ ] T094 [P] Rebuild `src/ds/components/EmptyState.tsx` — empty state variants (first-use, filtered-empty, completed, error, permission) per Ch 12 §13
- [ ] T095 [P] Rebuild `src/ds/components/Pagination.tsx` — pagination (current highlighted not-a-link, first/last/neighbors, ellipsis for gaps, disable prev/next at boundaries, optional page-size selector) per Ch 12 §14
- [ ] T096 Write CSS for all data display components in `src/ds/styles/ds.components.css`
- [ ] T097 Update `src/ds/index.ts` barrel for data display components
- [ ] T098 Verify `npm run verify` passes after Phase 9

### Phase 9 Validation
- [ ] Table: semantic HTML (`<thead>`, `<tbody>`, `<th scope="col">`), sort, filter, select, pagination, sticky header per Ch 12 §2–§3
- [ ] Table alignment: names left, numbers right, status center, actions right per Ch 12 §2
- [ ] Cards cover all variants per Ch 12 §6 — auto-fill responsive grid
- [ ] Empty state covers all 5 types per Ch 12 §13
- [ ] Avatar sizes match Ch 12 §9 (7 sizes)
- [ ] `npm run verify` passes

---

## Phase 10: Navigation Components

**Read FULLY:** `DOC/DS BUILDING/HandBook_Frontend/13-NAVIGATION-PATTERNS.md` (all sections)

- [ ] T099 Rebuild `src/ds/components/AppBar.tsx` — top nav bar (logo + nav items + search + bell + avatar) per Ch 13 §3 (height: 56–64px desktop, 48–56px mobile)
- [ ] T100 [P] Rebuild `src/ds/components/Tabs.tsx` — compound pattern (`Tabs.List`, `Tabs.Trigger`, `Tabs.Content`) with variants (underline, pill, boxed, vertical, icon+text, icon-only) per Ch 13 §6 — ARIA: `tablist/tab/tabpanel`, arrow key navigation, roving tabindex
- [ ] T101 [P] Rebuild `src/ds/components/Breadcrumbs.tsx` — semantic `<nav aria-label="Breadcrumb">` + `<ol>`, `aria-current="page"` on last, decorative separator, mobile truncation per Ch 13 §5
- [ ] T102 [P] Rebuild `src/ds/components/BottomNav.tsx` — mobile bottom nav (max 5 items, 56–64px height, icon + label, active = accent + filled, safe-area padding on iOS) per Ch 13 §8
- [ ] T103 [P] Rebuild `src/ds/components/ScrollToTopButton.tsx` per Ch 13
- [ ] T104 [P] New: `src/ds/components/SegmentedControl.tsx` — 2–5 options, single selection, `role="radiogroup"` + `role="radio"` per Ch 13 §7
- [ ] T105 [P] New: `src/ds/components/Stepper.tsx` — step indicator (horizontal/vertical, filled circle + check for completed, accent ring for current, empty for upcoming) per Ch 13 §13
- [ ] T106 [P] New: `src/ds/components/CommandPalette.tsx` — `Ctrl+K` / `⌘K` trigger, centered top, 600–640px wide, fuzzy search, grouped results, arrow navigation, Escape close per Ch 13 §11
- [ ] T107 [P] New: `src/ds/components/MegaMenu.tsx` — full-width or constrained, columns with section headers, close on click-outside / Escape / mouse-leave per Ch 13 §9
- [ ] T108 Write CSS for all navigation components in `src/ds/styles/ds.components.css`
- [ ] T109 Update `src/ds/index.ts` barrel for navigation components
- [ ] T110 Verify `npm run verify` passes after Phase 10

### Phase 10 Validation
- [ ] Every navigation pattern from Ch 13 has a component (AppBar, Tabs, Breadcrumbs, BottomNav, SegmentedControl, MegaMenu, CommandPalette, Stepper, ScrollToTop)
- [ ] All keyboard navigation implemented (arrow keys, Home/End, Enter/Space, Escape) per Ch 13 §17
- [ ] All ARIA roles set (tablist/tab/tabpanel, navigation, breadcrumb, radiogroup) per Ch 13 §17
- [ ] Responsive nav patterns (collapse on mobile) per Ch 13 §16
- [ ] Skip link target: first focusable is skip-link per Ch 13 §15
- [ ] `npm run verify` passes

---

## Phase 11: Overlay Components

**Read FULLY:** `DOC/DS BUILDING/HandBook_Frontend/14-OVERLAY-PATTERNS.md` (all sections)

- [ ] T111 Rebuild `src/ds/components/Modal.tsx` — `role="dialog"`, `aria-modal="true"`, `aria-labelledby`, focus trap, Escape close, backdrop click close, return focus to trigger, body scroll lock, sizes (sm/default/lg/xl/full) per Ch 14 §4
- [ ] T112 [P] Rebuild `src/ds/components/ConfirmDialog.tsx` — `role="alertdialog"`, NO backdrop dismiss, NO Escape dismiss (or Escape=Cancel), focus on Cancel (least destructive), destructive button visually distinct per Ch 14 §5
- [ ] T113 [P] Rebuild `src/ds/components/Drawer.tsx` — direction variants (right: 320–480px, left: 240–320px, bottom sheet on mobile with snap points + drag-to-dismiss) per Ch 14 §6
- [ ] T114 [P] Rebuild `src/ds/components/Popover.tsx` — click-triggered, auto-flip positioning, click-outside/Escape close, NOT a focus trap, `aria-expanded` + `aria-controls`, max 320–400px per Ch 14 §7
- [ ] T115 [P] Rebuild `src/ds/components/Tooltip.tsx` — hover AND focus triggered, 300–500ms appear delay, text-only (no interactive content), `role="tooltip"` + `aria-describedby`, max 200–280px, auto-position per Ch 14 §8
- [ ] T116 [P] Rebuild `src/ds/components/Toast.tsx` — variants (success/error/warning/info/neutral), auto-dismiss (3–8s, manual for errors), position (configurable), stacking (max 3–5 visible), pause on hover, close button always, optional action button, `role="status"` or `role="alert"` per Ch 14 §9
- [ ] T117 [P] Rebuild `src/ds/components/DropdownMenu.tsx` — `role="menu"` + `role="menuitem"`, arrow key nav, Enter/Space select, Escape close, type-ahead, item types (standard, icon, shortcut, divider, checkbox, radio, submenu, destructive, disabled) per Ch 14 §10
- [ ] T118 [P] Rebuild `src/ds/components/ContextMenu.tsx` — right-click trigger (long-press on mobile), contextual items, must not be only way to access features per Ch 14 §11
- [ ] T119 [P] New: `src/ds/components/Lightbox.tsx` — full-screen overlay, dark backdrop (80–90%), prev/next navigation (arrows, swipe), Escape close, pinch-to-zoom, image counter, preload adjacent per Ch 14 §13
- [ ] T120 [P] New: `src/ds/components/NotificationPanel.tsx` — triggered from bell icon, unread count badge, grouped (All/Unread), each item (status dot, title, description, timestamp), mark-read actions per Ch 14 §14
- [ ] T121 Write CSS for all overlay components in `src/ds/styles/ds.components.css`:
  - Z-index stacking per Ch 14 §2 architecture (matching z-index tokens from T014)
  - Backdrop/scrim: `--ds-color-overlay`
  - Enter/exit animations per Ch 14 §17 (fade + scale/slide, 200–300ms enter, 150ms exit)
  - Respect `prefers-reduced-motion`
- [ ] T122 Update `src/ds/index.ts` barrel for overlay components
- [ ] T123 Verify `npm run verify` passes after Phase 11

### Phase 11 Validation
- [ ] Every overlay pattern from Ch 14 has a component (Modal, ConfirmDialog, Drawer, Popover, Tooltip, Toast, DropdownMenu, ContextMenu, Lightbox, NotificationPanel)
- [ ] Focus trapping in Modal, ConfirmDialog, Drawer (when backdrop present) per Ch 14 §16
- [ ] Z-index stacking follows token architecture — no magic numbers per Ch 14 §2
- [ ] Escape key dismisses all overlays (except ConfirmDialog) per Ch 14 §16
- [ ] Focus returns to trigger on close per Ch 14 §16
- [ ] Enter/exit animations respect `prefers-reduced-motion` per Ch 14 §17
- [ ] `npm run verify` passes

---

## Phase 12: Feedback Components

**Read FULLY:** `DOC/DS BUILDING/HandBook_Frontend/15-FEEDBACK-PATTERNS.md` (all sections)

- [ ] T124 Rebuild `src/ds/components/Alert.tsx` — inline alert with variants (success, error, warning, info, neutral), anatomy (icon + title + description + action link + dismiss) per Ch 15 §3
- [ ] T125 [P] Rebuild `src/ds/components/Banner.tsx` — page-level banner (full-width, persistent until dismissed) per Ch 15 §4
- [ ] T126 [P] Rebuild `src/ds/components/Progress.tsx` — progress bar variants:
  - Linear: determinate (with %), indeterminate (animated), sizes (thin/default/thick) per Ch 15 §6
  - Circular: spinner ring with optional label
  - Colors per state: brand (in-progress), green (complete), red (error), amber (warning)
- [ ] T127 [P] Rebuild `src/ds/components/Skeleton.tsx` — skeleton loading per Ch 15 §8:
  - Match actual layout shapes
  - Shimmer/pulse animation (gradient sweep)
  - Don't skeleton navigation or static UI
  - Fade smoothly to real content
- [ ] T128 [P] Rebuild `src/ds/components/Status.tsx` — status indicator variants (dot, badge, label) per Ch 15 §13
- [ ] T129 [P] Rebuild `src/ds/components/ErrorBoundary.tsx` — React error boundary with error page pattern (illustration + heading + description + CTA buttons) per Ch 15 §10
- [ ] T130 Write CSS for all feedback components
- [ ] T131 Update `src/ds/index.ts` barrel for feedback components
- [ ] T132 Verify `npm run verify` passes after Phase 12

### Phase 12 Validation
- [ ] Every feedback pattern from Ch 15 has a component
- [ ] Alert, Banner, Toast cover all tone variants (success, warning, danger, info, neutral)
- [ ] Progress: determinate + indeterminate + size variants per Ch 15 §6
- [ ] Skeleton: shimmer animation, layout-matching shapes per Ch 15 §8
- [ ] Feedback response time guidelines documented (comment block) per Ch 15 §2
- [ ] `npm run verify` passes

---

## Phase 13: Content + Marketing + Remaining Components

**Read:** Ch 01 §12 (prose), Ch 12 (rich content references)

- [ ] T133 Rebuild `src/ds/components/Accordion.tsx` — compound pattern (`Accordion.Item`, `Accordion.Trigger`, `Accordion.Content`), `aria-expanded`, controlled/uncontrolled per Ch 19 §6
- [ ] T134 [P] Rebuild `src/ds/components/Section.tsx`, `SectionHeader.tsx`, `SplitSection.tsx` — section composition
- [ ] T135 [P] Rebuild `src/ds/components/Marketing.tsx`, `PublicBlocks.tsx` — marketing blocks
- [ ] T136 [P] Rebuild `src/ds/components/ResponsiveImage.tsx` — responsive image (srcSet, sizes, lazy loading)
- [ ] T137 [P] Rebuild `src/ds/components/Carousel.tsx` — carousel/slider with keyboard support (arrow keys) and touch swipe
- [ ] T138 [P] Rebuild `src/ds/components/VideoPlayer.tsx` — video embed
- [ ] T139 [P] Rebuild `src/ds/components/MarkdownEditor.tsx` — markdown editing
- [ ] T140 [P] Rebuild `src/ds/components/CookieConsentBanner.tsx` — cookie consent
- [ ] T141 [P] Rebuild `src/ds/components/BulkActionsToolbar.tsx` — bulk actions
- [ ] T142 [P] Rebuild `src/ds/components/ResourceTable.tsx` — resource table variant
- [ ] T143 Write CSS for all remaining components
- [ ] T144 Update `src/ds/index.ts` barrel for all remaining components
- [ ] T145 Verify `npm run verify` passes after Phase 13

---

## Phase 14: Shells + Composition Layer

**Read FULLY:** `DOC/DS BUILDING/HandBook_Frontend/20-DOCUMENTATION-TESTING.md` — composition sections

- [ ] T146 Rebuild `src/ds/layouts/` — PublicShell, DashboardShell, DocsShell, CenteredShell per handbook:
  - CSS moves to `src/ds/styles/ds.layouts.css` within `@layer ds.layouts {}`
  - Each shell is a thin React wrapper that applies layout classes
- [ ] T147 Rebuild `src/ds/composition/templates/PageTemplate.tsx` — dynamic shell selection
- [ ] T148 [P] Rebuild `src/ds/composition/patterns/SectionPattern.tsx` — section composition helper
- [ ] T149 [P] Rebuild `src/ds/composition/blocks/` — marketing + public block re-exports
- [ ] T150 Rebuild `src/ds/widgets/` — WidgetShell, MetricWidget, StatWidget, ListWidget, MediaWidget
- [ ] T151 Review `src/ds/runtime/` — mobile/tablet/web adapters, update to use new token/class names
- [ ] T152 Rebuild `src/ds/patterns/` — AsyncBoundary, ErrorBlock
  - CSS moves to `src/ds/styles/ds.patterns.css` within `@layer ds.patterns {}`
- [ ] T153 Rebuild `src/ds/visuals/` — Glow, NoiseOverlay, BackgroundFX
- [ ] T154 Update `src/ds/index.ts` barrel for shells, composition, widgets, patterns, visuals
- [ ] T155 Verify `npm run verify` passes after Phase 14

### Phase 14 Validation
- [ ] All 4 shells work with new token/class names
- [ ] Shell CSS lives in `ds.layouts.css` layer
- [ ] Pattern CSS lives in `ds.patterns.css` layer
- [ ] Composition layer follows slot/compound patterns from Ch 19
- [ ] Widgets use new token system
- [ ] Runtime adapters use new token system
- [ ] `npm run verify` passes

---

## Phase 15: Documentation & Testing

**Read FULLY:** `DOC/DS BUILDING/HandBook_Frontend/20-DOCUMENTATION-TESTING.md` (all sections)

### 15.1: Documentation
- [ ] T156 Rewrite `src/ds/DESIGN-SYSTEM-ANATOMY.md` — update to reflect fully rebuilt DS:
  - New 9-layer CSS architecture
  - Complete token inventory with all 3 tiers
  - Complete class inventory (all `ui-*`, `text-*`, utility classes)
  - Updated component list with compound pattern annotations
  - Updated architecture diagram
  - Updated reading rules for AI
  - Updated folder structure map

- [ ] T157 Rewrite `src/ds/SEMANTIC-CLASSES-REGISTRY.md` — complete registry of every utility class:
  - Organized by category (typography, color, layout, motion, elevation, border, responsive, state)
  - Each entry: class name, CSS layer, purpose, example usage
  - Cross-referenced to handbook chapter/section

### 15.2: Unit Tests (Ch 20 §8)
- [ ] T158 [P] Add unit tests for all primitives in `src/ds/primitives/__tests__/`:
  - Render test: renders without crash
  - Variant test: applies correct className per variant/size/tone
  - Ref test: forwards ref correctly
  - ClassName merge test: custom className merges with base
  - Accessibility test: correct ARIA attributes

- [ ] T159 [P] Add unit tests for all high-priority components (Modal, Tabs, Accordion, DropdownMenu, Toast, DataTable) in `src/ds/components/__tests__/`:
  - Render test
  - Variant / state test
  - Compound component test (e.g., Tabs.List + Tabs.Trigger + Tabs.Content render together)

### 15.3: Keyboard / A11y Tests (Ch 20 §9–§10)
- [ ] T160 [P] Add keyboard interaction tests:
  - Modal: focus trapping (Tab cycles within, Shift+Tab reverse), Escape close, return focus to trigger
  - Tabs: arrow-key navigation (left/right for horizontal, up/down for vertical), Home/End
  - DropdownMenu: arrow-key navigation, Enter/Space select, Escape close, type-ahead
  - Accordion: Enter/Space toggle, arrow-key navigation
  - Tooltip: keyboard trigger via focus
  - ConfirmDialog: focus on Cancel button (not destructive), no Escape dismiss unless it maps to Cancel
  - CommandPalette: arrow-key navigation, Enter to execute, Escape to close

### 15.4: Theme & Visual Tests (Ch 20 §11)
- [ ] T161 [P] Test theme switching:
  - All 3 themes (dark/light/purple) apply correctly
  - No token regressions across themes
  - Density/visual/platform knobs apply correctly
  - Scoped themes work (`<div data-theme="dark">` inside light page)

### 15.5: Final Verification
- [ ] T162 Run full `npm run verify` — lint + type check + all tests + `ds:audit` + `ds:a11y`
- [ ] T163 Final audit: read each handbook chapter (01–20) section by section and verify EVERY section has been implemented. Document any intentional omissions with rationale in `DESIGN-SYSTEM-ANATOMY.md`.

### Phase 15 Validation (FINAL GATE)
- [ ] `DESIGN-SYSTEM-ANATOMY.md` matches actual DS 1:1
- [ ] `src/ds/SEMANTIC-CLASSES-REGISTRY.md` matches actual CSS 1:1
- [ ] All primitives have unit tests (render + variant + ref + className + ARIA)
- [ ] All high-priority components have unit tests
- [ ] All interactive components have keyboard tests
- [ ] Theme switching tested across all 3 themes + knobs
- [ ] `npm run verify` passes with ZERO errors
- [ ] Every handbook chapter (01–20) verified as fully implemented, section by section
- [ ] No unused/orphaned files in `src/ds/`
- [ ] No duplicate barrels or re-export conflicts

---

## Dependencies

```
Phase 0 (Contract) → blocks everything
Phase 1 (Tokens) → blocks Phase 2, 3, 4, 5, 6, 7+
Phase 2 (Themes) → blocks Phase 3+
Phase 3 (Reset+Base+Utilities) → blocks Phase 4, 7+
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
After Phase 0:  T007, T008, T009, T010 (sequential — same file sections)
                T011, T012, T013, T014, T015, T016 [P] (different token families, independent sections)
After Phase 1:  T020–T024 (sequential within Phase 2)
After Phase 3:  T046, T047, T048, T049 [P] (different files)
After Phase 7:  T074–T081 [P], T085–T095 [P], T099–T107 [P], T111–T120 [P], T124–T129 [P]
                (component phases can overlap if CSS writing is coordinated)
After Phase 13: T146–T153 [P] (different folders)
Phase 15:       T158, T159, T160, T161 [P] (independent test suites)
```

## Quality Gate (run after EVERY task)

```bash
npm run verify
# Includes: typecheck + lint + test + build + ds:audit + ds:a11y
```

If it fails, fix before moving to the next task. Never skip.

---

## Task Summary

| Phase | Tasks | Handbook Chapters Covered |
|-------|-------|--------------------------|
| 0 | T001–T006 | Ch 17, 18, 19 |
| 1 | T007–T019 | Ch 01–07, 10 (tokens) |
| 2 | T020–T025 | Ch 16, Ch 02 (themes) |
| 3 | T026–T045 | Ch 01–06, 08, 09, 10, 17 (reset + base + utilities) |
| 4 | T046–T050 | Registry + foundation TS |
| 5 | T051–T054 | Ch 07 |
| 6 | T055–T058 | Ch 09 |
| 7 | T059–T073 | Ch 19 + Ch 10 (primitives) |
| 8 | T074–T084 | Ch 11 |
| 9 | T085–T098 | Ch 12 |
| 10 | T099–T110 | Ch 13 |
| 11 | T111–T123 | Ch 14 |
| 12 | T124–T132 | Ch 15 |
| 13 | T133–T145 | Remaining components |
| 14 | T146–T155 | Ch 20 (composition), shells, runtime |
| 15 | T156–T163 | Ch 20 (docs/tests), final audit |
| **Total** | **163 tasks** | **All 20 chapters fully covered** |

---

## Changelog vs Previous Version

| # | Gap Found | Fix Applied |
|---|-----------|-------------|
| 1 | CSS layer order had 5 layers; handbook Ch 17 specifies 9 | Upgraded to 9 layers: reset, tokens, theme, base, layouts, components, patterns, utilities, overrides |
| 2 | Missing `ds.reset.css`, `ds.layouts.css`, `ds.patterns.css` | Added as new target files + new tasks (T001, T026, T044, T146, T152) |
| 3 | Spacing scale only 10 steps; handbook Ch 03 specifies 20+ | Expanded to full Ch 03 scale (0 through 128px, 20+ steps) |
| 4 | Motion tokens had 5 durations + 6 easings; handbook Ch 04 specifies 8 + 10 | Expanded to 8 durations + 10 easings |
| 5 | Shadow scale had 5 steps; handbook Ch 05 specifies 7 + 3 inset + ring + blur | Expanded to full scale including inset, ring tokens, blur tokens |
| 6 | Radius scale missing `xs`; border width missing `0`, `hairline`, `medium`, `thick` | Aligned to exact Ch 06 specification |
| 7 | Color semantic tokens missing ~20 tokens from Ch 02 | Added all surface variants, foreground variants, border variants, accent variants, status bg/text variants |
| 8 | Icon tokens completely missing (size + color) | Added T015 for icon tokens per Ch 07 |
| 9 | State tokens missing (hover, active, selected, etc.) | Added T016 for state tokens per Ch 10 |
| 10 | `src/ds/structures/` and `src/ds/interactions/` are duplicate barrels | Added T004 to clean up |
| 11 | `src/ds/themes/` duplicates `src/ds/foundation/themes/` | Added T005 to consolidate |
| 12 | Missing components: SegmentedControl, Lightbox, MegaMenu, NotificationPanel, CommandPalette | Added T104, T106, T107, T119, T120 |
| 13 | Naming contract missing many utility classes from handbook | Expanded utility class listing (stack variants, row variants, container-xl, decorations, etc.) |
| 14 | High-contrast + forced-colors media queries missing | Added T023 per Ch 16 §11 |
| 15 | Border color tokens at semantic level completely missing | Added to T013 per Ch 06 §4 |
| 16 | Container tokens missing `xl` size | Added `--ds-container-xl` (80rem) per Ch 03 §5 |
| 17 | Grid tokens missing | Added `--ds-grid-columns`, `--ds-grid-gap-*` per Ch 03 §3 |
| 18 | Avatar sizes only had sm/md/lg/xl; Ch 12 specifies 7 sizes (xs through 3xl) | Expanded T068 to match Ch 12 §9 |
| 19 | No `.sr-only` utility mentioned | Added to Phase 3 T043 per Ch 09 §7 |
| 20 | `ds:audit` and `ds:a11y` not mentioned in execution rules | Added as execution rules #11 and #12 |
| 21 | `src/ds/utils/` folder didn't exist | Added to target files, created in T003, T057 |
| 22 | Control-height tokens for density modes missing | Added to T017 per Ch 16 |

---

## How to Execute

1. AI reads **this file** first (always).
2. AI reads the **Master References** listed at the top.
3. AI starts at Phase 0, T001.
4. For each task: read the referenced handbook chapter sections → implement → run `npm run verify` → mark task done.
5. Complete phase validation checklist before moving to next phase.
6. Never skip phases. Never skip tasks. Never improvise beyond handbook scope.
