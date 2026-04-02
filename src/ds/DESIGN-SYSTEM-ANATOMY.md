# Blueprint Design System — The Single Source of Truth

> **For AI agents and human developers alike.**
> Read this document **before** creating, editing, or consuming any UI in this project.
> This is the authoritative reference. If anything elsewhere contradicts this file, this file wins for DS matters.

**Location:** `src/ds/`
**Public import:** `@/ds` (backed by `src/ds/index.ts`)
**Last verified:** 2026-06-30

---

## 0. Executive Summary

This is a **class-based, token-driven design system**.

- Styling lives in DS-owned CSS layers (`src/ds/styles/*`).
- React components are thin wrappers that apply DS class names (`ui-button`, `ui-card`, …).
- Visual consistency is enforced through **CSS custom properties (tokens)** in `ds.tokens.css`, **theme classes** on `<html>`, and a **strict CSS layer cascade**.
- Everything is exported from a **single barrel** at `src/ds/index.ts`. Import UI **only** from `@/ds`.
- The DS is a **protected system asset**. Default policy is `consume-only`. Do not edit DS internals during feature work unless approved.

---

## 1. Architecture At A Glance

```
src/ds/
│
│   index.ts              ← the ONLY public API (import from @/ds)
│   icons.ts              ← curated icon re-exports (lucide-react behind DS boundary)
│
├── styles/               ← CSS implementation (the real styling authority)
│   ├── index.css         ← layer ordering + imports
│   ├── ds.reset.css      ← element reset (normalize)
│   ├── ds.tokens.css     ← tokens, theme overrides, density/platform/visual knobs
│   ├── ds.theme.css      ← color-scheme per theme
│   ├── ds.base.css       ← element reset + body
│   ├── ds.utilities.css  ← layout + typography helpers (ui-*, text-*)
│   ├── ds.layouts.css    ← shell & layout pattern styles
│   ├── ds.components.css ← component class implementations (ui-button, ui-card, …)
│   ├── ds.patterns.css   ← multi-component pattern styles
│   └── ds.overrides.css  ← highest-priority override layer (if needed)
│
├── primitives/           ← low-level building blocks (Button, Input, Stack, Grid, …)
├── components/           ← higher-level composed components (Modal, Tabs, DataTable, …)
│   └── __tests__/        ← component + keyboard a11y tests
├── layouts/              ← page shells (PublicShell, DashboardShell, DocsShell, CenteredShell)
│   └── __tests__/        ← shell snapshot tests
│
├── foundation/           ← foundational contracts
│   ├── tokens/           ← typed CSS variable references (vars.ts)
│   ├── themes/           ← theme registry, init script, storage utilities
│   ├── semantics/        ← semantic class registry (ui-page, ui-container, …)
│   ├── a11y/             ← VisuallyHidden, usePrefersReducedMotion
│   └── motion/           ← motion duration/easing tokens
│
├── tokens/               ← legacy placeholder (README only — not the SOT; canonical tokens live in foundation/tokens)
│
├── patterns/             ← app state patterns (AsyncBoundary, ErrorBlock, + re-exports)
├── widgets/              ← dashboard building blocks (WidgetShell, MetricWidget, StatWidget, …)
│   └── __tests__/        ← widget tests
├── visuals/              ← decorative effects (Glow, NoiseOverlay, BackgroundFX)
│
├── composition/          ← higher-order composition
│   ├── blocks/           ← MarketingBlocks, PublicBlocks re-exports
│   ├── patterns/         ← SectionPattern
│   └── templates/        ← PageTemplate (shell selection by name)
│
├── runtime/              ← platform surface adapters
│   ├── app/mobile/       ← Screen, Sheet, BottomNavPreset, FloatingAction, Overlay
│   │   └── __tests__/    ← Sheet focus/a11y tests
│   ├── app/tablet/       ← SideRail, SideRailPreset
│   └── web/              ← DeviceFrame, WidgetFrame, shell re-exports
│
├── structures/           ← organizational re-exports (Card, Container, Grid, Stack)
├── interactions/         ← organizational re-exports (Modal, Drawer, DropdownMenu, Popover, …)
│
└── preview/              ← component-library preview context (PreviewPlatform)
```

### What are "organizational re-export layers"?

`structures/`, `interactions/`, and parts of `runtime/web/` are **not separate implementations**. They are thin re-export barrels that expose the same primitives/components under a blueprint-style organizational grouping. This lets the architecture express intent (structure vs interaction) while keeping one implementation behind the curtain.

**Rule:** Do not assume these folders contain distinct code. They point back to `primitives/` and `components/`.

---

## 2. The Import Boundary (Non-Negotiable)

### Allowed

```ts
import { Button, Card, DashboardShell, ThemeSwitcher } from "@/ds";
import { Bell, Home } from "@/ds"; // curated icons
```

### Forbidden

```ts
import { Button } from "@/ds/primitives/Button";     // ← internal path
import { Home } from "lucide-react";                  // ← raw icon library
```

**Why:** `src/ds/index.ts` is the only stable contract. Internals may be reorganized; the barrel never breaks.

### Styling boundary

- Use DS classes, DS components, and DS tokens.
- If you need a new visual style, add it **inside the DS** (new DS utility class, component style, or token).
- Never hardcode hex colors, px values, shadows, radii, or typography in feature code.
- Never create one-off CSS in feature folders for UI primitives.

---

## 3. How DS Styles Load

### Global entry point

`src/app/globals.css` imports the DS once:

```css
@import "../ds/styles/index.css";
```

### CSS layer cascade (strict order)

```css
@layer ds.reset, ds.tokens, ds.theme, ds.base, ds.layouts, ds.components, ds.patterns, ds.utilities, ds.overrides;
```

| Priority | Layer | File | Purpose |
|----------|-------|------|---------|
| 1 (lowest) | `ds.reset` | `ds.reset.css` | Element normalization reset |
| 2 | `ds.tokens` | `ds.tokens.css` | Token variables (`--ds-*`), theme/density/platform/visual overrides |
| 3 | `ds.theme` | `ds.theme.css` | `color-scheme` mapping per theme |
| 4 | `ds.base` | `ds.base.css` | Element reset + body typography |
| 5 | `ds.layouts` | `ds.layouts.css` | Shell & layout pattern styles |
| 6 | `ds.components` | `ds.components.css` | Component class implementations |
| 7 | `ds.patterns` | `ds.patterns.css` | Multi-component pattern styles |
| 8 | `ds.utilities` | `ds.utilities.css` | Layout/typography helper classes |
| 9 (highest) | `ds.overrides` | (reserved) | Override escape hatch |

**Rules:**
- Do not reorder these layers.
- Do not import DS CSS a second time.
- Do not create competing CSS layers in feature code.

---

## 4. Token System

### Source of truth

| What | File |
|------|------|
| CSS variables (real SOT) | `src/ds/styles/ds.tokens.css` |
| Typed TS references | `src/ds/foundation/tokens/vars.ts` |

### Token families (in vars.ts)

| Family | Example keys | CSS prefix |
|--------|-------------|------------|
| `space` | `0–9`, `cardPadding`, `modalPadding`, `formGap` | `--ds-space-*` |
| `radius` | `default`, `card`, `modal`, `full`, `sm`, `1–3` | `--ds-radius-*` |
| `z` | `sticky`, `modal`, `dropdown`, `drawer`, `tooltip`, `toast` | `--ds-z-*` |
| `motion` | `easeStandard`, `durationFast/Normal/Slow` | `--ds-ease-*`, `--ds-duration-*` |
| `shadow` | `sm`, `md` | `--ds-shadow-*` |
| `size` | `heroMinH`, `headerH`, `touchTarget`, icon sizes, shell sizes | `--ds-size-*` |
| `color` | `background`, `surface`, `accent`, `primary`, `danger`, `focusRing`, … | `--ds-color-*` |
| `palette` | `neutral0–950`, `brand50–950`, `success600`, … | `--ds-palette-*` |
| `fontFamily` | `sans`, `display`, `mono` | `--ds-font-*` |
| `fontSize` | `1–7` | `--ds-font-size-*` |
| `fontWeight` | `regular`, `book`, `medium`, `semibold`, `bold` | `--ds-font-weight-*` |
| `lineHeight` | `tight`, `snug`, `normal`, `relaxed`, `loose` | `--ds-line-height-*` |
| `letterSpacing` | `tight`, `normal`, `wide`, `wider` | `--ds-letter-spacing-*` |

### Foreground naming convention

> **`--ds-color-foreground`** = default body text (intentionally subdued).
> **`--ds-color-foreground-secondary`** = emphasis / heading text (higher contrast).
>
> This is by design — "secondary" here means *secondary in the hierarchy* (more prominent), not *less important*. Do not swap these tokens; components and semantic classes already apply them correctly.

### Using tokens in code

Prefer DS classes and components. When a typed variable reference is needed:

```ts
import { tokens } from "@/ds";

// Access: tokens.space.cardPadding, tokens.color.accent, tokens.radius.card, etc.
```

Use token references sparingly — DS classes already encode the correct token usage.

### Knobs (contextual token overrides)

Tokens can be modified contextually through HTML attributes:

| Knob | Attribute | Values | Where to apply |
|------|-----------|--------|----------------|
| Theme | `class` on `<html>` | `theme-dark`, `theme-light`, `theme-purple` | Set by `ThemeInitScript` |
| Density | `data-density` | `"compact"` | Page shell or root wrapper |
| Visual style | `data-visual` | `"glass"`, `"neumorph"`, `"sleek"` | Page shell or root wrapper |
| Platform | `data-platform` | `"mobile"` | Page shell or root wrapper |

**Rule:** Set knobs at the page shell or root wrapper. Never scatter them across child components.

---

## 5. Theming

### Available themes

| Name | CSS class | Color scheme |
|------|-----------|-------------|
| Dark | `theme-dark` | `dark` |
| Light | `theme-light` | `light` |
| Purple | `theme-purple` | `dark` |

Default: `dark`. Stored in `localStorage` key `solarmatch-theme`.

### Flash prevention

`ThemeInitScript` (injected into `<head>` in `src/app/layout.tsx`) reads localStorage and applies the `theme-*` class before React hydration.

### Runtime switching

Use `ThemeSwitcher` component or the `applyTheme()`/`storeTheme()` utilities from `@/ds`.

### Adding a new theme

1. Add to `ThemeName` union and `THEMES` array in `src/ds/foundation/themes/registry.ts`.
2. Add token overrides in `ds.tokens.css` under `html.theme-<name>`.
3. Add `color-scheme` mapping in `ds.theme.css`.

**Rule:** New themes must be token-driven. No per-component theme rules.

---

## 6. Typography

### Typography classes (`ds.utilities.css`)

| Class | Use |
|-------|-----|
| `text-heading-1` through `text-heading-4` | Page/section headings |
| `text-body`, `text-body-large`, `text-body-small` | Body text |
| `text-caption`, `text-micro`, `text-label` | Meta/small/label text |

### `Text` primitive

The `Text` component is polymorphic (`as` prop) and supports 20+ `variant` values mapping to typography classes. Tones: `default`/`muted`/`accent`/`success`/`danger`/`warning`. Also supports `truncate`, `align`, and `weight` props.

---

## 7. Semantic Utility Classes

Defined in `src/ds/foundation/semantics/registry.ts` and implemented in `ds.utilities.css`.

| Key | Class | Purpose |
|-----|-------|---------|
| `page` | `ui-page` | Full page wrapper |
| `pageMain` | `ui-page-main` | Main content area |
| `band` | `ui-band` | Content band/section |
| `container` | `ui-container` | Width-constrained wrapper |
| `containerNarrow` | `ui-container--narrow` | Narrow variant |
| `containerWide` | `ui-container--wide` | Wide variant |
| `containerFull` | `ui-container--full` | Full-width |
| `stack` | `ui-stack` | Vertical stack |
| `row` | `ui-row` | Horizontal row |
| `focusRing` | `ui-focus-ring` | Focus-visible ring |

Additional modifiers: `ui-stack--tight`, `ui-stack--compact`, `ui-row--between`, `ui-row--center`, `ui-section`, `ui-section--sm`, `ui-section--lg`, `ui-sticky-top`.

**Semantic class registry:** `src/ds/SEMANTIC-CLASSES-REGISTRY.md` — DS-owned live inventory of stable `ui-*` classes. Update it whenever any `ui-*` class is added or renamed.

---

## 8. Complete Component Catalog

### Primitives (`src/ds/primitives/`)

Basic building blocks. All use `React.forwardRef`, shared `cx()`, and spread `{...props}` last.

| Component | Purpose |
|-----------|---------|
| `Button` | Primary action element. Polymorphic (`as`), variants: `primary`/`secondary`/`ghost`/`danger`, tones: `accent`/`success`/`danger`/`warning`/`neutral`, sizes: `sm`/`md`/`lg` |
| `Input` | Text input. Sizes: `sm`/`md`/`lg`, `error` state, `startSlot`/`endSlot` for icons/addons |
| `Textarea` | Multi-line text input. Sizes: `sm`/`md`/`lg`, `error` state |
| `Select` | Native `<select>` wrapper. Sizes: `sm`/`md`/`lg`, `error` state |
| `Checkbox` | Checkbox with label. `indeterminate` state, `error` state |
| `Radio` | Radio button with label |
| `Switch` | Toggle switch |
| `RangeSlider` | Range input |
| `Avatar` | User avatar. 7 sizes (`xs`–`3xl`), `status` dot overlay (online/offline/busy/away) |
| `Spinner` | Loading spinner |
| `Container` | Width-constrained wrapper. `ContainerSize`: `narrow`/`default`/`wide`/`full` |
| `Stack` | Vertical/horizontal layout. `direction`: `vertical`/`horizontal`, gaps: `none`/`tight`/`compact`/`default`/`spacious`/`loose` |
| `Grid` | CSS grid layout. `columns` (1–12), `gap` variants |
| `Spacer` | Vertical/horizontal spacing |
| `Divider` | Horizontal/vertical rule. `orientation`: `horizontal`/`vertical` |
| `Text` | Polymorphic (`as`). 20+ variants (`body`/`body-large`/`heading-1`–`4`/`caption`/`micro`/`label`/`fluid-display`/…), tones: `default`/`muted`/`accent`/`success`/`danger`/`warning`, `truncate`, `align`, `weight` |

### Components (`src/ds/components/`)

Higher-level composed elements with behavior.

| Component | Category | Notes |
|-----------|----------|-------|
| **Overlays** | | |
| `Modal` | Overlay | Focus trapping, `ModalSize`: `sm`/`default`/`lg`/`xl`/`full`, aria-labelledby/describedby, Escape dismiss |
| `Drawer` | Overlay | Side/bottom panel, focus trapping, same ARIA pattern as Modal |
| `Popover` | Overlay | Portal-based, Escape dismisses with focus restore, `aria-label` |
| `ConfirmDialog` | Overlay | `role="alertdialog"`, `cancelRef` auto-focus, confirm/cancel flows |
| `ContextMenu` | Overlay | Right-click menu, arrow/Home/End nav, Escape focus restore |
| `DropdownMenu` | Overlay | Trigger-based menu, full keyboard nav, roving focus |
| `Tooltip` | Overlay | Hover/focus tooltip |
| `Lightbox` | Overlay | Full-screen image viewer, ArrowLeft/Right keyboard nav, image counter, Escape close |
| `NotificationPanel` | Overlay | Notification list with filter (all/unread), mark-all-read, per-item mark-read |
| **Navigation** | | |
| `Tabs` (`TabsList`, `TabsTrigger`, `TabsPanel`) | Navigation | Arrow/Home/End keyboard nav, roving tabindex, variants: `underline`/`pill`/`boxed` |
| `BottomNav` | Navigation | Mobile bottom navigation bar |
| `Breadcrumbs` | Navigation | Breadcrumb trail |
| `Pagination` | Navigation | Page navigation with `buildPages()` helper, `pageSize` selector |
| `AppBar` | Navigation | Top application bar |
| `ScrollToTopButton` | Navigation | Scroll-to-top floating button |
| `SegmentedControl` | Navigation | Radio-group segmented control, `role="radiogroup"`, ArrowLeft/Right nav |
| `StepperNav` | Navigation | Multi-step wizard nav, `layout`: `horizontal`/`vertical`, step states |
| `CommandPalette` | Navigation | Ctrl+K command palette, fuzzy search, `role="combobox"`, ArrowUp/Down + Enter |
| `MegaMenu` | Navigation | Multi-column dropdown menu, grid layout, keyboard nav |
| **Data** | | |
| `DataTable` | Data | Sortable columns, `stickyHeader`, row selection, keyboard sort |
| `DataGrid` | Data | Search, pagination, bulk actions, structured search |
| `ResourceTable` | Data | CRUD table (create/edit/delete callbacks) |
| `Charts` | Data | Chart components |
| `Sparkline` | Data | Inline mini chart |
| `MetricCard` | Data | Key metric display with `trend`, `sparkline`, `comparison` slots |
| **Forms** | | |
| `Field` | Form | Form field wrapper with label/error, `required` indicator, `charCount`, `footer` layout |
| `FormHelpers` (`FormGroup`, `FormActions`) | Form | Form composition utilities (group + action bar) |
| `Autocomplete` | Form | Combobox with aria-activedescendant, arrow/Home/End, Enter select |
| `MultiSelect` | Form | Popover with checkbox group (`role="group"`, `aria-label`) |
| `TagInput` | Form | Tag/chip input |
| `FileDropzone` | Form | Drag-and-drop file upload |
| `DateTimePickers` | Form | Date/time selection |
| `FilterPanel` | Form | Filter sidebar/panel |
| **Feedback** | | |
| `Alert` | Feedback | Inline alert. `AlertBorder`: `full`/`left-accent`/`top-accent`/`subtle`, `action` slot, `dismissible`/`onDismiss` |
| `Banner` | Feedback | Full-width banner. `icon` slot, `dismissible`/`onDismiss` |
| `Toast` | Feedback | Toast notifications |
| `Status` | Feedback | Status indicator. Tones + `online`/`offline`/`busy`/`away`, variants: `dot`/`badge`/`label` |
| `Progress` | Feedback | Progress bar. Colors: `accent`/`success`/`danger`/`warning`, `showPercent` |
| `Skeleton` | Feedback | Loading placeholder. Shapes: `text`/`circle`/`rect`/`image`, animations: `shimmer`/`pulse` |
| `EmptyState` | Feedback | Empty content state with `variant` |
| `ErrorBoundary` | Feedback | React error boundary. `fallbackRender`, `onError`, `resetError` |
| **Content** | | |
| `Card` | Content | Surface card. Variants: `basic`/`interactive`/`selectable` |
| `ImageCard` | Content | Card with image |
| `IconCard` | Content | Card with icon |
| `Badge` | Content | Small badge/tag. Variants: `solid`/`outline`/`subtle`, sizes: `sm`/`md`/`lg`, `onRemove` |
| `Section` | Content | Content section |
| `SectionHeader` | Content | Section header |
| `SplitSection` | Content | Two-column section |
| `Icon` | Content | Token-driven icon sizing |
| `AvatarGroup` | Content | Grouped avatars |
| `Timeline` | Content | Timeline display. Variants: `default`/`compact`/`alternating`, custom `icon` per item |
| `List` | Content | List component |
| `Accordion` | Content | Collapsible sections. Keyboard: ArrowDown/Up/Home/End, `role="region"` + `aria-labelledby` |
| `ResponsiveImage` | Content | Responsive image |
| `Carousel` | Content | Image/content carousel. ArrowLeft/Right keyboard nav |
| `VideoPlayer` | Content | Video embed |
| `MarkdownEditor` | Content | Markdown editing |
| **Marketing** | | |
| `Marketing` | Marketing | Marketing page components |
| `PublicBlocks` | Marketing | Public page content blocks |
| `CookieConsentBanner` | Marketing | Cookie consent UI |
| `BulkActionsToolbar` | Utility | Bulk action toolbar |
| **Theme** | | |
| `ThemeSwitcher` | Theme | Theme toggle/selector |

### Layouts (`src/ds/layouts/`)

Page shells that define layout structure.

| Shell | Use case |
|-------|----------|
| `PublicShell` | Public marketing/landing pages |
| `DashboardShell` | Authenticated dashboard/product pages |
| `DocsShell` | Documentation pages |
| `CenteredShell` | Focused auth/single-purpose pages |

All shells preserve the global skip-link target (`id="main"`) and `<main>` landmark.

### Widgets (`src/ds/widgets/`)

Dashboard building blocks.

| Widget | Purpose |
|--------|---------|
| `WidgetShell` | Generic widget container (header, subtitle, actions, body, footer) |
| `MetricWidget` | Metric display in WidgetShell |
| `StatWidget` | Statistics display |
| `ListWidget` | List inside widget frame |
| `MediaWidget` | Media inside widget frame |

### Visuals (`src/ds/visuals/`)

Decorative effects (non-essential, opt-in).

| Visual | Purpose |
|--------|---------|
| `Glow` | Glow effect |
| `NoiseOverlay` | Noise texture overlay |
| `BackgroundFX` | Background visual effects |

### Patterns (`src/ds/patterns/`)

Application state patterns.

| Pattern | Purpose |
|---------|---------|
| `AsyncBoundary` | Idle/loading/error/empty/ready state switch |
| `ErrorBlock` | Error display block |
| Also re-exports: `EmptyState`, `Skeleton`, `ErrorBoundary` | Backwards compatibility |

### Foundation (`src/ds/foundation/`)

Foundational contracts exposed under `foundation.*` namespace.

| Module | Path | Purpose |
|--------|------|---------|
| `tokens` | `foundation/tokens/vars.ts` | Typed CSS variable references (space, color, radius, …) |
| `themes` | `foundation/themes/` | `ThemeName`, `THEMES`, `DEFAULT_THEME`, `isThemeName`, `ThemeInitScript`, `applyTheme`, `storeTheme` |
| `semantics` | `foundation/semantics/registry.ts` | `SEMANTIC_CLASSES`, `semanticClass()` typed helper |
| `a11y` | `foundation/a11y/` | `VisuallyHidden`, `usePrefersReducedMotion` |
| `motion` | `foundation/motion/tokens.ts` | Motion duration/easing presets |

### Runtime (`src/ds/runtime/`)

Platform surface adapters.

| Surface | Path | Purpose |
|---------|------|---------|
| `Screen` | `runtime/app/mobile/` | Full mobile screen |
| `Sheet` | `runtime/app/mobile/` | Bottom sheet with focus trap |
| `BottomNavPreset` | `runtime/app/mobile/` | Mobile bottom nav preset |
| `FloatingAction` | `runtime/app/mobile/` | FAB |
| `Overlay` | `runtime/app/mobile/` | Mobile overlay |
| `SideRail` | `runtime/app/tablet/` | Tablet side rail |
| `SideRailPreset` | `runtime/app/tablet/` | Tablet side rail preset |
| `DeviceFrame` | `runtime/web/` | Device preview frame |
| `WidgetFrame` | `runtime/web/` | Widget preview frame |

### Composition (`src/ds/composition/`)

Higher-level composition helpers.

| Module | Purpose |
|--------|---------|
| `templates/PageTemplate` | Shell selection by name (dynamic page routing) |
| `patterns/SectionPattern` | Section composition pattern |
| `blocks/MarketingBlocks` | Marketing content block re-exports |
| `blocks/PublicBlocks` | Public page block re-exports |

### Preview (`src/ds/preview/`)

Component-library support (development UI only).

| Module | Purpose |
|--------|---------|
| `PreviewPlatform` | `PreviewPlatformProvider` + `usePreviewPlatform()` context |

---

## 9. How To Build UI Using This DS

### Step-by-step for any screen

1. **Pick a shell:** `PublicShell` | `DashboardShell` | `DocsShell` | `CenteredShell`
2. **Layout with primitives:** `Container` → `Stack` → `Grid` → `Section`
3. **Add DS components:** forms, overlays, feedback, data display
4. **Apply typography:** Use `text-*` classes or `Text` primitive
5. **Set knobs at root if needed:** `data-density`, `data-visual`, `data-platform`
6. **Only then** consider adding new DS capability (approved DS task required)

### Consumption hierarchy (strict order)

1. DS shells
2. DS components
3. DS primitives
4. Semantic `ui-*` classes
5. Tailwind **only** as narrow support glue that does not override DS authority

### Adding a new component (approved DS task)

1. Create implementation in the correct folder:
   - Primitive → `src/ds/primitives/NewThing.tsx`
   - Component → `src/ds/components/NewThing.tsx`
   - Widget → `src/ds/widgets/NewThing.tsx`

2. Style it with DS patterns:
   - Add classes (e.g., `ui-newthing`) to the correct CSS layer file
   - Use tokens via CSS variables — no hardcoded values
   - Layout helper? → `ds.utilities.css`
   - Component? → `ds.components.css`

3. Export from `src/ds/index.ts`.

---

## 14. Final Audit — Handbook Coverage & Intentional Omissions

> **Audit date:** 2026-06-30  
> **Scope:** Handbook chapters 00–20 verified against implementation.

### Chapters Fully Implemented

| Ch  | Name                    | Status |
| --- | ----------------------- | ------ |
| 00  | Overview                | ✅     |
| 01  | Typography              | ✅ (tokens + Text primitive + CSS classes) |
| 02  | Color System            | ✅     |
| 03  | Spacing & Layout        | ✅     |
| 04  | Motion & Animation      | ✅ (tokens + reduced-motion hook) |
| 05  | Elevation & Depth       | ✅     |
| 06  | Borders & Radius        | ✅     |
| 07  | Iconography             | ✅ (lucide re-exports + icon CSS) |
| 08  | Responsive Breakpoints  | ✅ (fluid tokens + media queries) |
| 09  | Accessibility           | ✅ (focus ring, visually-hidden, reduced-motion, ARIA in all components) |
| 10  | Interactive States      | ✅ (state tokens + per-component CSS) |
| 11  | Form Anatomy            | ✅     |
| 12  | Data Display            | ✅     |
| 13  | Navigation Patterns     | ✅     |
| 14  | Overlay Patterns        | ✅     |
| 15  | Feedback Patterns       | ✅     |
| 16  | Theming Architecture    | ✅     |
| 17  | CSS Architecture        | ✅     |
| 18  | Token Architecture      | ✅     |
| 19  | Component API Patterns  | ✅     |
| 20  | Documentation & Testing | ⚠️ Partial |

### Intentional Omissions (with rationale)

The following handbook items are **not implemented** by design:

| Item | Handbook Chapter | Rationale |
| ---- | --------------- | --------- |
| Storybook stories (`.stories.tsx`) | Ch 20 | Deferred — Storybook not in current toolchain. Component preview via `src/ds/preview/` route serves same purpose during development. Will add when Storybook is adopted. |
| Visual regression tests (Chromatic/Percy) | Ch 20 | Deferred — requires CI service integration. Snapshot tests in `shells.snapshot.test.tsx` cover layout regression for now. |
| Wide-gamut P3 color support | Ch 02 | Not yet needed — current brand palette fits sRGB. Will add `@supports (color: oklch())` fallback when P3 monitors become the primary target. |
| WCAG contrast audit tooling | Ch 02, 09 | Manual verification done during token creation. Automated `axe-core` or `jest-axe` integration deferred to CI hardening phase. |
| CSS responsive prefix utilities (`.sm:*`, `.md:*`) | Ch 08 | Intentionally avoided — Tailwind provides responsive prefixes when needed. DS utility classes are layout/semantic, not responsive breakpoint mirrors. |
| Container query range syntax | Ch 03, 08 | Token-level breakpoints exposed; container queries used sparingly in shells. Full range syntax deferred until broader component need arises. |
| View Transitions API | Ch 04 | Experimental browser API — will add when baseline support reaches 90%+. |
| Render props pattern | Ch 19 | Replaced by compound-component and children-slot patterns which are more idiomatic in modern React. |
| ds.patterns.css content | Ch 17 | Layer file exists as placeholder. Multi-component patterns are currently composed inline. Will populate when recurring composition patterns are identified. |

### Test Coverage Summary (126 tests, 10 suites)

| Suite | Tests | Scope |
| ----- | ----- | ----- |
| `primitives.test.tsx` | 64 | All 16 primitives: render, variants, ref, className |
| `components.test.tsx` | 20 | Modal, Tabs, Accordion, DropdownMenu, Toast, DataTable |
| `keyboard.a11y.test.tsx` | 5 | Modal, Drawer, DropdownMenu, Tabs, DataTable keyboard |
| `keyboard-extended.a11y.test.tsx` | 6 | Popover, ContextMenu, Autocomplete, MultiSelect keyboard |
| `keyboard-additional.a11y.test.tsx` | 8 | Accordion, ConfirmDialog, CommandPalette, Tooltip keyboard |
| `data-components.test.tsx` | 4 | DataGrid, ResourceTable |
| `theme.test.ts` | 15 | Theme apply/store/read/resolve, density/visual/platform knobs |
| `shells.snapshot.test.tsx` | 4 | Shell layout snapshots |
| `widgets.test.tsx` | 4 | WidgetShell, MetricWidget |
| `Sheet.test.tsx` | 5 | Mobile sheet focus/a11y |

4. If the component is interactive, add keyboard/a11y tests (see Testing section).

5. Update external docs:
   - New `ui-*` class? → Update `src/ds/SEMANTIC-CLASSES-REGISTRY.md`
   - New token or knob? → Update this file
   - Run `npm run ds:audit` to catch undefined tokens or missing registry entries

6. Follow `src/ds/DS-COVERAGE-CHECKLIST.md` before merge.

### Adding a new theme

1. Add to `ThemeName` union and `THEMES` in `src/ds/foundation/themes/registry.ts`.
2. Add token overrides in `ds.tokens.css` under `html.theme-<name>`.
3. Add `color-scheme` mapping in `ds.theme.css`.

---

## 10. Testing Infrastructure

### Test suites

| Suite | File | Tests | Scope |
|-------|------|-------|-------|
| Shell snapshots | `layouts/__tests__/shells.snapshot.test.tsx` | Snapshot tests | All 4 shells |
| Keyboard a11y | `components/__tests__/keyboard.a11y.test.tsx` | Modal, Drawer, DropdownMenu, Tabs, DataTable | Focus trap, arrow nav, Home/End, Escape |
| Keyboard a11y extended | `components/__tests__/keyboard-extended.a11y.test.tsx` | Popover, ContextMenu, Autocomplete, MultiSelect | Focus restore, arrow nav, aria-activedescendant |
| Data components | `components/__tests__/data-components.test.tsx` | DataGrid, ResourceTable | Search, pagination, CRUD |
| Widgets | `widgets/__tests__/widgets.test.tsx` | WidgetShell, MetricWidget | Rendering, composition |
| Sheet | `runtime/app/mobile/__tests__/Sheet.test.tsx` | Sheet | Focus trap, restore |

All paths are relative to `src/ds/`.

### Commands

| Command | Purpose |
|---------|---------|
| `npm test` | Run all tests |
| `npm run ds:a11y` | Run only DS accessibility tests (keyboard + Sheet suites) |
| `npm run ds:audit` | Static audit: checks for undefined tokens, registry sync |
| `npm run verify` | Full pipeline: typecheck → lint → test → build → ds:audit → ds:a11y |

### When to add tests

- New interactive component → add to `keyboard.a11y.test.tsx` or `keyboard-extended.a11y.test.tsx`
- New data component → add to `data-components.test.tsx`
- New widget → add to `widgets.test.tsx`
- New shell → add to `shells.snapshot.test.tsx`
- New runtime surface with focus behavior → add to relevant `__tests__/` folder
- Snapshot tests alone are **not sufficient** for interactive DS components

---

## 11. Accessibility Patterns

The DS enforces these accessibility patterns:

| Pattern | Components | Behavior |
|---------|-----------|----------|
| Focus trapping | Modal, Drawer, Sheet | Tab cycles within overlay; focus restores on close |
| Focus restore | Modal, Drawer, Popover, ContextMenu, DropdownMenu, Sheet, Lightbox | Focus returns to trigger element on Escape/close |
| Roving tabindex | Tabs, SegmentedControl | Arrow keys move focus between items; Home/End jump to first/last |
| Menu navigation | DropdownMenu, ContextMenu, MegaMenu | Arrow Up/Down, Home/End, Escape to close with focus restore |
| Combobox | Autocomplete, CommandPalette | `aria-activedescendant`, Arrow Up/Down/Home/End, Enter to select |
| Dialog labelling | Modal, Drawer, ConfirmDialog | `aria-labelledby` (title), `aria-describedby` (description) |
| Dialog labelling (light) | Popover | `aria-label` on dialog panel |
| Alert dialog | ConfirmDialog | `role="alertdialog"`, cancel button auto-focused via `cancelRef` |
| Group labelling | MultiSelect | `role="group"` + `aria-label` on checkbox list |
| Radiogroup | SegmentedControl | `role="radiogroup"` + `role="radio"` with `aria-checked` |
| Gallery navigation | Lightbox, Carousel | ArrowLeft/Right to navigate, Escape to close |
| Accordion navigation | Accordion | ArrowDown/Up cycle triggers, Home/End, Enter/Space toggle, `role="region"` panels |
| Step navigation | StepperNav | `aria-current="step"` on active step |
| Skip link | All shells | `id="main"` on `<main>` element |
| Conditional alert role | Alert | `role="alert"` for danger/warning, `role="status"` for info/success |

---

## 12. Limitations And Scope

### What this DS supports well

- Tokenized, themeable UI using CSS variables
- Consistent spacing/typography via utilities and primitives
- Multiple shells (public/dashboard/docs/centered) with responsive behavior
- Curated icon surface
- Keyboard/a11y-tested interactive components
- Reusable migration packet templates and DS tests that exercise the system contract

### Current limitations (do not fight these)

- The DS is **class-first**, not Tailwind-first. Tailwind is support glue only.
- `structures/`, `interactions/`, and parts of `runtime/web/` are re-export layers, not distinct implementations.
- Tokens are primarily CSS-driven; TS helpers exist for safe code references but are secondary.
- Adding new visuals requires editing DS CSS files. Do not patch around this in feature code.
- The legacy `src/ds/themes/` and `src/ds/tokens/` folders exist for compatibility but `foundation/themes/` and `foundation/tokens/` are the real implementation paths.

---

## 13. Tailwind Policy

Tailwind is available but subordinate to the DS.

**Allowed:** narrow layout support or framework interop when the DS does not already provide an equivalent.

**Forbidden:** replacing DS-managed colors, spacing, shadows, radii, typography, or theme behavior. No `bg-*`, `text-*`, `border-*`, `shadow-*`, `rounded-*`, `dark:*`, or arbitrary values when the DS already covers the need.

---

## 14. Related Documents

| Document | Location | Purpose |
|----------|----------|---------|
| This file | `src/ds/DESIGN-SYSTEM-ANATOMY.md` | DS operating guide (authoritative) |
| Coverage checklist | `src/ds/DS-COVERAGE-CHECKLIST.md` | Pre-merge checklist for DS changes |
| Semantic class registry | `src/ds/SEMANTIC-CLASSES-REGISTRY.md` | Stable `ui-*` class reference |
| UI/DS rules | `DOC_UNIVERSAL/STANDARDS/UI-DS-RULES.md` | Consumption rules for feature work |
| Constitution | `DOC_UNIVERSAL/CORE/CONSTITUTION.md` | Top-level authority (DS is protected) |
| Quality gates | `DOC_UNIVERSAL/CORE/QUALITY-GATES.md` | Verification requirements |
| Engineering standards | `DOC_UNIVERSAL/CORE/ENGINEERING-STANDARDS.md` | Stack and coding standards |
| App structure | `DOC_UNIVERSAL/STANDARDS/APP-STRUCTURE.md` | Route/layout conventions |

Location policy:

- Files in `src/ds/` are the live DS system and the DS-owned docs that must stay in sync with it.
- Files in `DOC/DS BUILDING/` are handbook/reference material used to explain or extend the DS.

### Read order for DS work

1. This file (`DESIGN-SYSTEM-ANATOMY.md`)
2. `DS-COVERAGE-CHECKLIST.md`
3. `src/ds/SEMANTIC-CLASSES-REGISTRY.md`
4. `DOC_UNIVERSAL/STANDARDS/UI-DS-RULES.md`

---

## 15. Quick Reference For AI Agents

When generating UI code in this repo:

1. **Import only from `@/ds`.**
2. **Pick a shell first** — `DashboardShell`, `PublicShell`, `DocsShell`, `CenteredShell`.
3. **Use `Stack`, `Grid`, `Container`, `Section`** for structure.
4. **Use DS typography classes** (`text-heading-1..4`, `text-body`, `text-caption`, etc.).
5. **Use DS components** for overlays, forms, feedback, data display.
6. **Never hardcode** colors, spacing, shadows, radii, or typography values.
7. **Never reach into DS internals** (`@/ds/primitives/...`, `@/ds/components/...`).
8. **Never import `lucide-react` directly** — use curated icons from `@/ds`.
9. **Run `npm run verify`** after any DS change.
10. **Do not edit DS files** during feature work unless explicitly approved.

### Common mistakes to avoid

- Creating a new CSS file in a feature folder for UI primitives → **use DS classes instead**
- Adding `dark:` Tailwind variants → **the DS theme system handles dark mode**
- Using inline styles for spacing/color → **use DS tokens or components**
- Importing from `@/ds/components/Modal` → **import from `@/ds`**
- Creating duplicate navigation/shell structures → **use existing shells**
- Skipping keyboard/focus behavior on overlays → **follow the a11y patterns in section 11**
