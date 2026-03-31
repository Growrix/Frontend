# 03 — Spacing & Layout

> Everything a Design System must define for spatial control. This chapter covers the space scale, grid systems, flexbox patterns, container system, breakpoints, container queries, aspect ratios, logical properties, z-index management, and every layout pattern used in modern frontend development.

---

## Table of Contents

1. [Space Scale](#1-space-scale)
2. [Semantic Spacing Tokens](#2-semantic-spacing-tokens)
3. [The Grid System](#3-the-grid-system)
4. [Flexbox Patterns](#4-flexbox-patterns)
5. [Container System](#5-container-system)
6. [Section / Band System](#6-section--band-system)
7. [Stack Pattern](#7-stack-pattern)
8. [Cluster / Row Pattern](#8-cluster--row-pattern)
9. [Sidebar Layout](#9-sidebar-layout)
10. [Holy Grail & App Shell](#10-holy-grail--app-shell)
11. [Breakpoint System](#11-breakpoint-system)
12. [Container Queries](#12-container-queries)
13. [Aspect Ratio](#13-aspect-ratio)
14. [Scroll Snap](#14-scroll-snap)
15. [Masonry Layout](#15-masonry-layout)
16. [Sticky Positioning](#16-sticky-positioning)
17. [Z-Index System](#17-z-index-system)
18. [Logical Properties](#18-logical-properties)
19. [Viewport Units](#19-viewport-units)
20. [Gap & Divider Patterns](#20-gap--divider-patterns)
21. [Negative Space & Whitespace](#21-negative-space--whitespace)
22. [Spacing Utility Classes](#22-spacing-utility-classes)
23. [Spacing Tokens Summary](#23-spacing-tokens-summary)

---

## 1. Space Scale

The space scale is a **fixed set of spacing values** used for all margins, paddings, and gaps in the system. No arbitrary values outside this scale.

### 1.1 Base Unit

The base unit anchors the entire scale. Common choices:

| Base | Multiplier | Philosophy |
|------|-----------|------------|
| **4px** (0.25rem) | ×1 = 4px | Fine-grained control, most common |
| **8px** (0.5rem) | ×1 = 8px | Coarser grid, faster decisions |

**Recommendation**: 4px base with a scale that's mostly multiples of 4.

### 1.2 The Scale

| Token | Value | px (at 16px root) | Use Case |
|-------|-------|-------------------|----------|
| `--ds-space-0` | 0 | 0 | Reset |
| `--ds-space-px` | 1px | 1 | Hairline gaps, single-pixel offsets |
| `--ds-space-0.5` | 0.125rem | 2 | Micro adjustments |
| `--ds-space-1` | 0.25rem | 4 | Tight inline padding, icon gaps |
| `--ds-space-1.5` | 0.375rem | 6 | Small badge padding |
| `--ds-space-2` | 0.5rem | 8 | Small padding, compact list gaps |
| `--ds-space-2.5` | 0.625rem | 10 | Button vertical padding |
| `--ds-space-3` | 0.75rem | 12 | Input padding, card inner spacing |
| `--ds-space-4` | 1rem | 16 | Standard padding, form gaps |
| `--ds-space-5` | 1.25rem | 20 | Medium spacing |
| `--ds-space-6` | 1.5rem | 24 | Card padding, section inner gaps |
| `--ds-space-7` | 1.75rem | 28 | Spacious gaps |
| `--ds-space-8` | 2rem | 32 | Section padding, large gaps |
| `--ds-space-9` | 2.25rem | 36 | Generous spacing |
| `--ds-space-10` | 2.5rem | 40 | Large section margins |
| `--ds-space-12` | 3rem | 48 | Major section divisions |
| `--ds-space-14` | 3.5rem | 56 | Extra-large vertical space |
| `--ds-space-16` | 4rem | 64 | Hero-level spacing |
| `--ds-space-20` | 5rem | 80 | Page-level vertical gaps |
| `--ds-space-24` | 6rem | 96 | Maximum section separation |
| `--ds-space-32` | 8rem | 128 | Full-page hero spacing |

### 1.3 Rules

- Never use arbitrary values (`margin: 13px`). Always pick from the scale.
- If a value falls between two scale steps, round to the nearest.
- The scale should feel **logarithmic** — small increments at the bottom, larger jumps at the top.

---

## 2. Semantic Spacing Tokens

Above the raw scale, define **purpose-named** tokens:

| Token | Maps To | Purpose |
|-------|---------|---------|
| `--ds-space-card-padding` | space-6 | Padding inside cards |
| `--ds-space-modal-padding` | space-6 | Modal body padding |
| `--ds-space-form-gap` | space-4 | Gap between form fields |
| `--ds-space-section-padding` | space-8 or space-12 | Vertical padding of sections |
| `--ds-space-section-margin` | space-9 | Margin between sections |
| `--ds-space-heading-margin` | space-4 | Space below headings |
| `--ds-space-button-pad-x` | space-4 | Button horizontal padding |
| `--ds-space-button-pad-y` | space-2 | Button vertical padding |
| `--ds-space-input-pad-x` | space-4 | Input horizontal padding |
| `--ds-space-input-pad-y` | space-2 | Input vertical padding |
| `--ds-space-nav-padding` | space-4 | Navigation item padding |
| `--ds-space-page-inset` | space-4 (mobile) / space-6 (desktop) | Page edge padding |
| `--ds-space-popover-pad` | space-2 | Popover/tooltip padding |
| `--ds-space-tooltip-gap` | space-2 | Gap between trigger and tooltip |
| `--ds-space-stack-gap` | space-6 | Default vertical stack gap |
| `--ds-space-inline-gap` | space-2 | Default inline item gap |

### 2.1 Benefits

Semantic tokens decouple intent from value. When density changes (compact mode), only the semantic mappings update:

```css
[data-density="compact"] {
  --ds-space-card-padding: var(--ds-space-4);
  --ds-space-form-gap: var(--ds-space-3);
}
```

---

## 3. The Grid System

### 3.1 CSS Grid vs Columns

| System | Technology | Best For |
|--------|-----------|----------|
| **CSS Grid** | `display: grid` | 2D layouts, dashboard panels, complex arrangements |
| **Column Grid** | `grid-template-columns: repeat(12, 1fr)` | Traditional 12-col marketing layouts |
| **Auto Grid** | `grid-template-columns: repeat(auto-fill, minmax(min, 1fr))` | Card grids, gallery layouts |

### 3.2 12-Column Grid

The classic responsive grid:

```css
.grid-cols-12 {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: var(--ds-space-6);
}
```

Span utilities:

| Class | Columns |
|-------|---------|
| `.col-span-1` | 1/12 |
| `.col-span-2` | 2/12 |
| `.col-span-3` | 3/12 (quarter) |
| `.col-span-4` | 4/12 (third) |
| `.col-span-6` | 6/12 (half) |
| `.col-span-8` | 8/12 (two-thirds) |
| `.col-span-9` | 9/12 (three-quarters) |
| `.col-span-12` | Full width |

### 3.3 Auto-Fit Grid (Responsive Without Media Queries)

```css
.grid-auto-fill {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(min(100%, 18rem), 1fr));
  gap: var(--ds-space-6);
}
```

This pattern creates a responsive grid that wraps items automatically without breakpoints.

### 3.4 Named Grid Areas

For complex app layouts:

```css
.app-layout {
  display: grid;
  grid-template-areas:
    "header header header"
    "sidebar main aside"
    "footer footer footer";
  grid-template-columns: var(--ds-size-shell-left) 1fr var(--ds-size-shell-right);
  grid-template-rows: auto 1fr auto;
}
```

### 3.5 Subgrid

Allows child elements to participate in the parent's grid:

```css
.parent {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
}

.child {
  grid-column: span 3;
  display: grid;
  grid-template-columns: subgrid;
}
```

Use case: Ensuring card contents (title, body, footer) align across a row of cards.

### 3.6 Grid Tokens

| Token | Purpose |
|-------|---------|
| `--ds-grid-columns` | Default column count (12) |
| `--ds-grid-gap` | Default grid gap |
| `--ds-grid-gap-sm` | Tight grid gap |
| `--ds-grid-gap-lg` | Spacious grid gap |

---

## 4. Flexbox Patterns

### 4.1 Core Patterns

| Pattern | CSS | Use Case |
|---------|-----|----------|
| **Center** | `display:flex; align-items:center; justify-content:center` | Centering anything |
| **Space Between** | `justify-content: space-between` | Nav items, header left/right |
| **Start** | `justify-content: flex-start` | Default left alignment |
| **End** | `justify-content: flex-end` | Right-aligned actions |
| **Wrap** | `flex-wrap: wrap` | Responsive tag clouds, pill groups |
| **Column** | `flex-direction: column` | Stack / vertical layout |
| **Stretch** | `align-items: stretch` | Equal-height siblings |
| **Baseline** | `align-items: baseline` | Text alignment across mixed sizes |

### 4.2 Flex Utility Classes

| Class | Value |
|-------|-------|
| `.flex-1` | `flex: 1 1 0%` (grow to fill) |
| `.flex-auto` | `flex: 1 1 auto` (grow based on content) |
| `.flex-none` | `flex: none` (don't grow or shrink) |
| `.flex-shrink-0` | `flex-shrink: 0` (prevent shrinking) |
| `.flex-grow` | `flex-grow: 1` |

---

## 5. Container System

### 5.1 Container Widths

The container confines content to a maximum width and centers it:

| Token | Value | Use Case |
|-------|-------|----------|
| `--ds-container-narrow` | 48rem (768px) | Blog posts, auth pages, focused reading |
| `--ds-container-default` | 64rem (1024px) | Standard page content |
| `--ds-container-wide` | 72rem (1152px) | Marketing sections, feature grids |
| `--ds-container-xl` | 80rem (1280px) | Wide dashboards |
| `--ds-container-full` | 100% (no max) | Full-bleed, dashboard shells |

### 5.2 Container CSS

```css
.ui-container {
  width: 100%;
  max-width: var(--ds-container-default);
  margin-inline: auto;
  padding-inline: var(--ds-space-page-inset);
}
```

### 5.3 Container Variants

| Class | Max-Width |
|-------|-----------|
| `.ui-container--narrow` | `--ds-container-narrow` |
| `.ui-container` | `--ds-container-default` |
| `.ui-container--wide` | `--ds-container-wide` |
| `.ui-container--xl` | `--ds-container-xl` |
| `.ui-container--full` | None |

### 5.4 Breakout Pattern

Content that breaks out of its container to go full-bleed:

```css
.full-bleed {
  width: 100vw;
  margin-left: calc(50% - 50vw);
}
```

---

## 6. Section / Band System

### 6.1 Section Component

A full-width horizontal band with vertical padding:

```css
.ui-section {
  padding-block: var(--ds-space-section-padding);
}
```

### 6.2 Section Size Variants

| Variant | Padding | Use Case |
|---------|---------|----------|
| `--sm` | space-6 | Compact sections, footer |
| Default | space-8 | Standard content sections |
| `--lg` | space-12 | Hero sections, landing page sections |
| `--xl` | space-16 | Full-page hero with massive spacing |

### 6.3 Section Background Variants

| Variant | Background | Use Case |
|---------|-----------|----------|
| Default | Transparent | Standard on page background |
| `--surface` | Surface color + border | Alternating zebra sections |
| `--accent` | Accent/brand color | CTA sections, feature highlights |
| `--dark` | Dark surface | Contrast sections on light pages |
| `--gradient` | Gradient background | Hero sections |
| `--image` | Background image with overlay | Feature sections |

---

## 7. Stack Pattern

The most common layout pattern — vertical spacing between children:

### 7.1 How It Works

```css
.ui-stack {
  display: flex;
  flex-direction: column;
  gap: var(--ds-space-stack-gap);
}
```

### 7.2 Stack Variants

| Variant | Gap | Use Case |
|---------|-----|----------|
| `.ui-stack--tight` | space-2 | Compact label + input groups |
| `.ui-stack--compact` | space-4 | Form fields, dense lists |
| `.ui-stack` (default) | space-6 | General content stacking |
| `.ui-stack--loose` | space-8 | Section-level stacking |
| `.ui-stack--spacious` | space-12 | Page-level section groups |

### 7.3 Nested Stacks

Stacks nest naturally. An outer stack with `space-12` gap can contain inner stacks with `space-4` gap, creating a visual document hierarchy.

---

## 8. Cluster / Row Pattern

Horizontal layout with automatic wrapping:

### 8.1 Base Pattern

```css
.ui-row {
  display: flex;
  align-items: center;
  gap: var(--ds-space-inline-gap);
  flex-wrap: wrap;
}
```

### 8.2 Row Variants

| Variant | Layout | Use Case |
|---------|--------|----------|
| `.ui-row--between` | `justify-content: space-between` | Header bars, nav |
| `.ui-row--center` | `justify-content: center` | Centered button groups |
| `.ui-row--end` | `justify-content: flex-end` | Right-aligned actions |
| `.ui-row--nowrap` | `flex-wrap: nowrap` | Horizontal scroll areas |
| `.ui-row--stretch` | `align-items: stretch` | Equal-height columns |
| `.ui-row--baseline` | `align-items: baseline` | Mixed-size text alignment |

---

## 9. Sidebar Layout

### 9.1 CSS Grid Sidebar

```css
.sidebar-layout {
  display: grid;
  grid-template-columns: minmax(0, var(--ds-size-shell-left)) minmax(0, 1fr);
  gap: var(--ds-space-6);
}

/* Collapse on mobile */
@media (max-width: 768px) {
  .sidebar-layout {
    grid-template-columns: 1fr;
  }
}
```

### 9.2 Sidebar Variants

| Layout | Columns | Use Case |
|--------|---------|----------|
| Left sidebar | `sidebar main` | Docs, settings, dashboards |
| Right sidebar | `main sidebar` | Blog with TOC, filters |
| Both sidebars | `sidebar main sidebar` | Complex admin panels |
| Collapsible | Toggle width between full and icon-only | Power-user dashboards |

### 9.3 Sidebar Sizing Tokens

| Token | Value | Use Case |
|-------|-------|----------|
| `--ds-size-shell-left` | 13rem (208px) | Standard left nav |
| `--ds-size-shell-right` | 16rem (256px) | Right panel / inspector |
| `--ds-size-shell-collapsed` | 4.5rem (72px) | Icon-only collapsed state |

---

## 10. Holy Grail & App Shell

### 10.1 Holy Grail Layout

```
┌────────────────────────────────┐
│            Header              │
├──────┬──────────────┬──────────┤
│ Left │    Main      │  Right   │
│ Nav  │   Content    │  Panel   │
│      │              │          │
├──────┴──────────────┴──────────┤
│            Footer              │
└────────────────────────────────┘
```

```css
.holy-grail {
  display: grid;
  grid-template: 
    "header header header" auto
    "nav    main   aside"  1fr
    "footer footer footer" auto
    / var(--ds-size-shell-left) 1fr var(--ds-size-shell-right);
  min-height: 100dvh;
}
```

### 10.2 App Shell Patterns

| Shell | Structure | Use Case |
|-------|-----------|----------|
| **Public** | Header + Main + Footer | Marketing, landing |
| **Dashboard** | Sidebar + Header + Main | Admin, SaaS |
| **Docs** | Sidebar + Main + TOC | Documentation |
| **Centered** | Main only (centered) | Auth, onboarding |
| **Full** | Main only (full viewport) | Canvas apps, editors |
| **Split** | Left panel + Right panel | Email, messaging |

---

## 11. Breakpoint System

### 11.1 Standard Breakpoints

| Token | Value | Name | Devices |
|-------|-------|------|---------|
| `--ds-bp-xs` | 0 | Extra Small | Small phones (portrait) |
| `--ds-bp-sm` | 640px / 40rem | Small | Large phones (landscape) |
| `--ds-bp-md` | 768px / 48rem | Medium | Tablets (portrait) |
| `--ds-bp-lg` | 1024px / 64rem | Large | Tablets (landscape), small laptops |
| `--ds-bp-xl` | 1280px / 80rem | Extra Large | Desktops |
| `--ds-bp-2xl` | 1536px / 96rem | 2XL | Large desktops, ultrawide |

### 11.2 Mobile-First

All base styles target mobile. Use `min-width` media queries to progressively enhance:

```css
/* Mobile styles (default) */
.layout { grid-template-columns: 1fr; }

/* Tablet and up */
@media (min-width: 48rem) {
  .layout { grid-template-columns: 1fr 1fr; }
}

/* Desktop and up */
@media (min-width: 64rem) {
  .layout { grid-template-columns: 1fr 1fr 1fr; }
}
```

### 11.3 Breakpoint Rules

- **Never** target specific devices — target content needs.
- Use **rem-based** breakpoints (not px) — they respect user font size preferences.
- Use **mobile-first** (`min-width`) as the default strategy.
- Maximum **5–6 breakpoints** — more than that signals over-engineering.
- Test at breakpoint boundaries (+1px, −1px) for edge cases.

---

## 12. Container Queries

### 12.1 What They Are

Container queries let components respond to their **container's size** instead of the viewport. This makes components truly reusable across different layout contexts.

### 12.2 Usage

```css
.card-container {
  container-type: inline-size;
  container-name: card;
}

@container card (min-width: 400px) {
  .card-body { flex-direction: row; }
}

@container card (max-width: 399px) {
  .card-body { flex-direction: column; }
}
```

### 12.3 Container Query Size Tokens

| Token | Value | Use Case |
|-------|-------|----------|
| `--ds-cq-xs` | 200px | Tiny containers (widget slots) |
| `--ds-cq-sm` | 300px | Small cards, sidebar items |
| `--ds-cq-md` | 400px | Medium cards, panels |
| `--ds-cq-lg` | 600px | Wide panels, main content |
| `--ds-cq-xl` | 800px | Full-width sections |

### 12.4 When to Use Which

| Concern | Viewport Query | Container Query |
|---------|---------------|----------------|
| Page layout | ✅ | ❌ |
| Navigation | ✅ | ❌ |
| Card layout | ❌ | ✅ |
| Widget size | ❌ | ✅ |
| Table columns | ❌ | ✅ |
| Component internal adaption | ❌ | ✅ |

---

## 13. Aspect Ratio

### 13.1 Common Ratios

| Token | Ratio | Use Case |
|-------|-------|----------|
| `--ds-ratio-square` | 1 / 1 | Avatars, icons, thumbnails |
| `--ds-ratio-portrait` | 3 / 4 | Portrait photos, cards |
| `--ds-ratio-landscape` | 4 / 3 | Landscape photos, cards |
| `--ds-ratio-video` | 16 / 9 | Video embeds, hero images |
| `--ds-ratio-cinema` | 21 / 9 | Cinematic banners |
| `--ds-ratio-golden` | 1.618 / 1 | Golden ratio compositions |

### 13.2 Usage

```css
.aspect-video { aspect-ratio: 16 / 9; }
.aspect-square { aspect-ratio: 1; }
```

### 13.3 Rules

- Use `aspect-ratio` CSS property (supported everywhere modern).
- Combine with `object-fit: cover` for images inside aspect-ratio containers.
- Aspect ratio containers should have `overflow: hidden` if content might exceed.

---

## 14. Scroll Snap

### 14.1 Horizontal Carousel

```css
.scroll-snap-x {
  display: flex;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  gap: var(--ds-space-4);
  scroll-padding-inline: var(--ds-space-4);
}

.scroll-snap-x > * {
  scroll-snap-align: start;
  flex-shrink: 0;
}
```

### 14.2 Full-Page Vertical Snap

```css
.scroll-snap-y {
  height: 100dvh;
  overflow-y: auto;
  scroll-snap-type: y mandatory;
}

.scroll-snap-y > section {
  height: 100dvh;
  scroll-snap-align: start;
}
```

### 14.3 Snap Utilities

| Class | Value | Use Case |
|-------|-------|----------|
| `.snap-x` | `scroll-snap-type: x mandatory` | Horizontal carousels |
| `.snap-y` | `scroll-snap-type: y mandatory` | Vertical full-page |
| `.snap-proximity` | `scroll-snap-type: * proximity` | Soft snap (user can stop between) |
| `.snap-start` | `scroll-snap-align: start` | Snap to start edge |
| `.snap-center` | `scroll-snap-align: center` | Snap to center |
| `.snap-end` | `scroll-snap-align: end` | Snap to end edge |

---

## 15. Masonry Layout

### 15.1 CSS Masonry (Emerging Standard)

```css
.masonry {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  grid-template-rows: masonry; /* emerging spec */
}
```

### 15.2 Fallback Column-Based Masonry

```css
.masonry-columns {
  column-count: 3;
  column-gap: var(--ds-space-4);
}

.masonry-columns > * {
  break-inside: avoid;
  margin-bottom: var(--ds-space-4);
}
```

### 15.3 Use Cases

- Pinterest-style image galleries
- Blog post collections with varying heights
- Dashboard widget grids

---

## 16. Sticky Positioning

### 16.1 Sticky Header

```css
.ui-sticky-top {
  position: sticky;
  top: 0;
  z-index: var(--ds-z-sticky);
}
```

### 16.2 Sticky Sidebar

```css
.sidebar-sticky {
  position: sticky;
  top: var(--ds-size-header-h);
  height: calc(100dvh - var(--ds-size-header-h));
  overflow-y: auto;
}
```

### 16.3 Sticky Bottom

```css
.sticky-bottom {
  position: sticky;
  bottom: 0;
}
```

### 16.4 Sticky Rules

- Always set a `z-index` on sticky elements.
- Account for the header height when setting `top` for non-header sticky elements.
- Sticky requires a scrolling container with overflow — won't work inside `overflow: hidden`.

---

## 17. Z-Index System

### 17.1 Z-Index Scale

A managed z-index system prevents arbitrary values and stacking conflicts:

| Token | Value | Layer |
|-------|-------|-------|
| `--ds-z-deep` | -1 | Background effects, decorative layers |
| `--ds-z-base` | 0 | Default (auto) |
| `--ds-z-raised` | 1 | Slightly elevated elements |
| `--ds-z-sticky` | 100 | Sticky headers, sidebars |
| `--ds-z-overlay` | 200 | Page-level overlays |
| `--ds-z-dropdown` | 1050 | Dropdown menus |
| `--ds-z-modal` | 1000 | Modal dialogs |
| `--ds-z-drawer` | 1100 | Drawers (above modals) |
| `--ds-z-popover` | 1150 | Popovers, floating panels |
| `--ds-z-tooltip` | 1200 | Tooltips (highest interactive) |
| `--ds-z-toast` | 1300 | Toast notifications (always visible) |
| `--ds-z-max` | 9999 | Emergency override (avoid) |

### 17.2 Rules

- **Never** use arbitrary z-index values. Always use tokens.
- Higher layers should visually "win" — toasts above modals above dropdowns.
- Create **stacking contexts** intentionally: `isolation: isolate` on shells/containers to limit z-index scope.
- Test: open a dropdown inside a modal inside a sticky header — all layers must stack correctly.

---

## 18. Logical Properties

### 18.1 Why Logical Properties

Logical properties adapt to **writing direction** (LTR/RTL) and **writing mode** (horizontal/vertical):

| Physical Property | Logical Equivalent | LTR Meaning | RTL Meaning |
|------------------|--------------------|-------------|-------------|
| `margin-left` | `margin-inline-start` | Left | Right |
| `margin-right` | `margin-inline-end` | Right | Left |
| `margin-top` | `margin-block-start` | Top | Top |
| `margin-bottom` | `margin-block-end` | Bottom | Bottom |
| `padding-left` | `padding-inline-start` | Left | Right |
| `padding-right` | `padding-inline-end` | Right | Left |
| `left` | `inset-inline-start` | Left | Right |
| `right` | `inset-inline-end` | Right | Left |
| `width` | `inline-size` | Width | Width |
| `height` | `block-size` | Height | Height |
| `border-left` | `border-inline-start` | Left | Right |
| `text-align: left` | `text-align: start` | Left | Right |

### 18.2 Rules

- **All new CSS should use logical properties** instead of physical.
- Use `padding-inline`, `margin-block`, `inset-inline` shorthands.
- Use `text-align: start` instead of `text-align: left`.
- This is prerequisite for RTL/i18n support (see Chapter 15).

---

## 19. Viewport Units

### 19.1 Unit Types

| Unit | Meaning | Behavior |
|------|---------|----------|
| `vh` | 1% of viewport height | Fixed — ignores mobile chrome UI |
| `vw` | 1% of viewport width | Fixed |
| `dvh` | 1% of dynamic viewport height | **Updates** when mobile chrome appears/hides |
| `svh` | 1% of small viewport height | Smallest possible (chrome visible) |
| `lvh` | 1% of large viewport height | Largest possible (chrome hidden) |
| `vmin` | Smaller of `vw` and `vh` | Responsive to orientation |
| `vmax` | Larger of `vw` and `vh` | Responsive to orientation |

### 19.2 Recommendations

- Use `dvh` for full-height layouts: `min-height: 100dvh`.
- Use `svh` for elements that must never scroll behind mobile browser chrome.
- Avoid `vh` on mobile — the address bar causes jank.
- Use `vw` for fluid typography calculations (in `clamp()`).

---

## 20. Gap & Divider Patterns

### 20.1 Visual Dividers

```css
.ui-divider {
  border: none;
  border-top: 1px solid var(--ds-color-border);
}

.ui-divider--thick {
  border-top-width: 2px;
}

.ui-divider--accent {
  border-top-color: var(--ds-color-accent);
}

.ui-divider--vertical {
  border-top: none;
  border-left: 1px solid var(--ds-color-border);
  align-self: stretch;
}
```

### 20.2 Spacing vs Dividers

| Approach | When to Use |
|----------|-------------|
| Gap only (no line) | Most cases — clean modern look |
| Gap + divider line | Lists, table rows, settings sections |
| Divider with label | Section separators ("— OR —") |

---

## 21. Negative Space & Whitespace

### 21.1 Principles

- **More whitespace = more premium**. Luxury brands use extensive negative space.
- **Less whitespace = more dense/functional**. Dashboards and tools use compact spacing.
- **Consistent whitespace** is more important than generous whitespace.
- **Asymmetric whitespace** (more vertical than horizontal) creates natural reading flow.

### 21.2 Density Modes

| Mode | Scale Factor | Use Case |
|------|-------------|----------|
| **Compact** | 0.75× | Dense tables, admin UIs, power users |
| **Default** | 1× | Standard UI |
| **Comfortable** | 1.25× | Marketing pages, reading content |
| **Spacious** | 1.5× | Landing pages, premium experiences |

Implemented via data attribute overriding semantic spacing tokens:

```css
[data-density="compact"] {
  --ds-space-card-padding: var(--ds-space-4);
  --ds-space-form-gap: var(--ds-space-3);
  --ds-space-section-padding: var(--ds-space-6);
}
```

---

## 22. Spacing Utility Classes

### 22.1 Margin Utilities

| Class Pattern | Property |
|--------------|----------|
| `.m-{scale}` | `margin` |
| `.mx-{scale}` | `margin-inline` |
| `.my-{scale}` | `margin-block` |
| `.mt-{scale}` | `margin-block-start` |
| `.mb-{scale}` | `margin-block-end` |
| `.ms-{scale}` | `margin-inline-start` |
| `.me-{scale}` | `margin-inline-end` |
| `.m-auto` | `margin: auto` |
| `.mx-auto` | `margin-inline: auto` |

### 22.2 Padding Utilities

| Class Pattern | Property |
|--------------|----------|
| `.p-{scale}` | `padding` |
| `.px-{scale}` | `padding-inline` |
| `.py-{scale}` | `padding-block` |
| `.pt-{scale}` | `padding-block-start` |
| `.pb-{scale}` | `padding-block-end` |
| `.ps-{scale}` | `padding-inline-start` |
| `.pe-{scale}` | `padding-inline-end` |

### 22.3 Gap Utilities

| Class Pattern | Property |
|--------------|----------|
| `.gap-{scale}` | `gap` |
| `.gap-x-{scale}` | `column-gap` |
| `.gap-y-{scale}` | `row-gap` |

---

## 23. Spacing Tokens Summary

### Complete Token Inventory

```
SPACE SCALE
  --ds-space-0         0
  --ds-space-px        1px
  --ds-space-0.5       0.125rem
  --ds-space-1         0.25rem
  --ds-space-1.5       0.375rem
  --ds-space-2         0.5rem
  --ds-space-2.5       0.625rem
  --ds-space-3         0.75rem
  --ds-space-4         1rem
  --ds-space-5         1.25rem
  --ds-space-6         1.5rem
  --ds-space-7         1.75rem
  --ds-space-8         2rem
  --ds-space-9         2.25rem
  --ds-space-10        2.5rem
  --ds-space-12        3rem
  --ds-space-14        3.5rem
  --ds-space-16        4rem
  --ds-space-20        5rem
  --ds-space-24        6rem
  --ds-space-32        8rem

SEMANTIC SPACING
  --ds-space-card-padding
  --ds-space-modal-padding
  --ds-space-form-gap
  --ds-space-section-padding
  --ds-space-section-margin
  --ds-space-heading-margin
  --ds-space-button-pad-x / -y
  --ds-space-input-pad-x / -y
  --ds-space-nav-padding
  --ds-space-page-inset
  --ds-space-popover-pad
  --ds-space-tooltip-gap
  --ds-space-stack-gap
  --ds-space-inline-gap

CONTAINERS
  --ds-container-narrow       48rem
  --ds-container-default      64rem
  --ds-container-wide         72rem
  --ds-container-xl           80rem
  --ds-container-full         none

GRID
  --ds-grid-columns           12
  --ds-grid-gap
  --ds-grid-gap-sm
  --ds-grid-gap-lg

BREAKPOINTS
  --ds-bp-sm                  40rem
  --ds-bp-md                  48rem
  --ds-bp-lg                  64rem
  --ds-bp-xl                  80rem
  --ds-bp-2xl                 96rem

CONTAINER QUERY SIZES
  --ds-cq-xs, --ds-cq-sm, --ds-cq-md, --ds-cq-lg, --ds-cq-xl

ASPECT RATIOS
  --ds-ratio-square, --ds-ratio-portrait, --ds-ratio-landscape
  --ds-ratio-video, --ds-ratio-cinema, --ds-ratio-golden

Z-INDEX
  --ds-z-deep, --ds-z-base, --ds-z-raised, --ds-z-sticky
  --ds-z-overlay, --ds-z-dropdown, --ds-z-modal, --ds-z-drawer
  --ds-z-popover, --ds-z-tooltip, --ds-z-toast, --ds-z-max

SIZING
  --ds-size-shell-left, --ds-size-shell-right, --ds-size-shell-collapsed
  --ds-size-header-h, --ds-size-touch-target
  --ds-size-viewport-minus-header

SEMANTIC CLASSES
  .ui-container, .ui-container--narrow, .ui-container--wide, .ui-container--full
  .ui-section, .ui-section--sm, .ui-section--lg, .ui-section--xl
  .ui-stack, .ui-stack--tight, .ui-stack--compact, .ui-stack--loose, .ui-stack--spacious
  .ui-row, .ui-row--between, .ui-row--center, .ui-row--end
  .ui-divider, .ui-divider--thick, .ui-divider--accent, .ui-divider--vertical
  .snap-x, .snap-y, .snap-start, .snap-center, .snap-end
```

---

*This chapter defines the complete spatial and layout vocabulary for a Design System. Every token, pattern, and utility above should be present in the implemented DS for full coverage.*
