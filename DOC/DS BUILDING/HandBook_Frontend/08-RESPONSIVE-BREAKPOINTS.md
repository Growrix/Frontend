# 08 — Responsive Design & Breakpoints

> Everything a Design System must define for responsive behavior — breakpoint scales, mobile-first strategy, container queries, fluid design, responsive component patterns, device-specific considerations, and responsive testing.

---

## Table of Contents

1. [Responsive Philosophy](#1-responsive-philosophy)
2. [Breakpoint Scale](#2-breakpoint-scale)
3. [Mobile-First Strategy](#3-mobile-first-strategy)
4. [Media Query Patterns](#4-media-query-patterns)
5. [Container Queries](#5-container-queries)
6. [Fluid Design](#6-fluid-design)
7. [Responsive Typography](#7-responsive-typography)
8. [Responsive Spacing](#8-responsive-spacing)
9. [Responsive Grid](#9-responsive-grid)
10. [Responsive Component Patterns](#10-responsive-component-patterns)
11. [Responsive Navigation](#11-responsive-navigation)
12. [Responsive Images & Media](#12-responsive-images--media)
13. [Touch vs Pointer](#13-touch-vs-pointer)
14. [Viewport Units](#14-viewport-units)
15. [Device-Specific Considerations](#15-device-specific-considerations)
16. [Responsive Utility Classes](#16-responsive-utility-classes)
17. [Testing Strategy](#17-testing-strategy)
18. [Responsive Tokens Summary](#18-responsive-tokens-summary)

---

## 1. Responsive Philosophy

### 1.1 Core Principles

1. **Content drives breakpoints** — don't design for devices, design for when content breaks.
2. **Mobile-first** — start with the smallest screen, progressively enhance.
3. **Fluid over fixed** — prefer fluid widths and flexible layouts over fixed pixel values.
4. **Component-level responsiveness** — components should adapt to their container, not just the viewport.
5. **No horizontal scroll** — content must fit within viewport width at every breakpoint.
6. **Test on real devices** — emulators miss touch behavior, real scrolling, and browser chrome.

### 1.2 The Responsive Spectrum

```
Small Phone    Phone    Phablet    Tablet    Laptop    Desktop    Wide
  320px       375px     428px     768px    1024px    1280px    1536px+
```

---

## 2. Breakpoint Scale

### 2.1 Standard Breakpoints

| Token | Name | Min-Width | Target Devices |
|-------|------|-----------|---------------|
| `--ds-bp-xs` | Extra small | 0 | Small phones (iPhone SE, Galaxy S) |
| `--ds-bp-sm` | Small | 640px | Large phones, landscape phones |
| `--ds-bp-md` | Medium | 768px | Tablets (portrait) |
| `--ds-bp-lg` | Large | 1024px | Tablets (landscape), small laptops |
| `--ds-bp-xl` | Extra large | 1280px | Laptops, desktops |
| `--ds-bp-2xl` | Double extra large | 1536px | Large desktops, ultrawide |

### 2.2 Breakpoint Rules

- **6 breakpoints maximum** — more creates unnecessary complexity.
- **Named, not numbered** — use `sm`, `md`, `lg` instead of `bp1`, `bp2`, `bp3`.
- **Min-width based** — mobile-first approach uses `min-width` media queries.
- **Consistent across the DS** — every component, utility, and layout uses the same breakpoints.
- **Content-driven adjustments** — if a specific component breaks between standard breakpoints, use a one-off media query inside that component, not a new global breakpoint.

### 2.3 What Changes at Each Breakpoint

| Breakpoint | Layout Changes |
|-----------|---------------|
| **xs** (0) | Single column, stacked everything, full-bleed cards |
| **sm** (640px) | Two-column where appropriate, cards get radius, larger gaps |
| **md** (768px) | Sidebar appears (or navigation switches), 2-3 column grids |
| **lg** (1024px) | Full navigation, 3-4 column grids, side panels |
| **xl** (1280px) | Maximum content width, wider margins, 4-6 column grids |
| **2xl** (1536px) | Content caps at max-width, extra whitespace on sides |

---

## 3. Mobile-First Strategy

### 3.1 What Mobile-First Means

Write base CSS for the smallest screen, then add complexity for larger screens:

```css
/* Base: mobile styles */
.grid { display: grid; grid-template-columns: 1fr; }

/* Tablet: 2 columns */
@media (min-width: 768px) {
  .grid { grid-template-columns: repeat(2, 1fr); }
}

/* Desktop: 3 columns */
@media (min-width: 1024px) {
  .grid { grid-template-columns: repeat(3, 1fr); }
}
```

### 3.2 Why Mobile-First

- **Performance**: Mobile devices load only the CSS they need. Desktop overrides are additive.
- **Priority**: Forces design of the most constrained experience first.
- **Progressive enhancement**: Advanced features layer on top of a solid foundation.
- **Maintainability**: Easier to add than to undo.

### 3.3 Anti-Pattern: Desktop-First

```css
/* BAD: desktop-first (undoing styles is harder) */
.grid { grid-template-columns: repeat(3, 1fr); }

@media (max-width: 1024px) {
  .grid { grid-template-columns: repeat(2, 1fr); }
}

@media (max-width: 768px) {
  .grid { grid-template-columns: 1fr; }
}
```

---

## 4. Media Query Patterns

### 4.1 Width-Based (Primary)

```css
@media (min-width: 640px)  { /* sm and up */ }
@media (min-width: 768px)  { /* md and up */ }
@media (min-width: 1024px) { /* lg and up */ }
@media (min-width: 1280px) { /* xl and up */ }
@media (min-width: 1536px) { /* 2xl and up */ }
```

### 4.2 Range Queries (Modern)

```css
@media (640px <= width < 768px)  { /* sm only */ }
@media (768px <= width < 1024px) { /* md only */ }
@media (width >= 1024px)         { /* lg and up */ }
```

### 4.3 Orientation

```css
@media (orientation: portrait)  { /* Taller than wide */ }
@media (orientation: landscape) { /* Wider than tall */ }
```

### 4.4 Feature Queries

```css
@media (hover: hover) { /* Device has hover capability (mouse/trackpad) */ }
@media (hover: none)  { /* No hover — touch device */ }
@media (pointer: fine)   { /* Precise pointer — mouse */ }
@media (pointer: coarse) { /* Imprecise pointer — touch */ }
```

### 4.5 Display Mode

```css
@media (display-mode: standalone) { /* PWA installed */ }
@media (display-mode: fullscreen) { /* Fullscreen mode */ }
```

### 4.6 Preference Queries

```css
@media (prefers-color-scheme: dark)     { /* Dark mode OS setting */ }
@media (prefers-reduced-motion: reduce) { /* Reduced motion setting */ }
@media (prefers-contrast: more)         { /* High contrast setting */ }
@media (prefers-reduced-data: reduce)   { /* Data saver mode */ }
@media (forced-colors: active)          { /* Windows High Contrast */ }
```

---

## 5. Container Queries

### 5.1 What They Solve

Media queries respond to the **viewport** size. Container queries respond to the **parent container** size. This makes components truly reusable — a card in a sidebar behaves differently from the same card in a full-width section.

### 5.2 Setup

```css
.card-container {
  container-type: inline-size;
  container-name: card;
}
```

### 5.3 Usage

```css
@container card (min-width: 400px) {
  .card { flex-direction: row; }
}

@container card (max-width: 399px) {
  .card { flex-direction: column; }
}
```

### 5.4 Container Query Units

| Unit | Description |
|------|-------------|
| `cqw` | 1% of container width |
| `cqh` | 1% of container height |
| `cqi` | 1% of container inline size |
| `cqb` | 1% of container block size |
| `cqmin` | Smaller of cqi/cqb |
| `cqmax` | Larger of cqi/cqb |

### 5.5 When to Use

| Scenario | Use |
|----------|-----|
| Page/section layout | Media query |
| Component internal layout | Container query |
| Navigation show/hide | Media query |
| Card horizontal/vertical | Container query |
| Sidebar collapse | Media query (or container query on parent) |
| Grid column count | Either (container query preferred) |

---

## 6. Fluid Design

### 6.1 Fluid Typography (clamp)

```css
--ds-font-size-fluid: clamp(1rem, 0.5rem + 1.5vw, 2rem);
```

### 6.2 Fluid Spacing

```css
--ds-space-fluid: clamp(1rem, 0.5rem + 2vw, 3rem);
```

### 6.3 Fluid Widths

```css
.container {
  width: min(100% - 2rem, 1200px);
}
```

### 6.4 The Fluid Formula

```
clamp(minimum, preferred, maximum)

preferred = viewport-based calculation
  = min_size + (max_size - min_size) * ((100vw - min_viewport) / (max_viewport - min_viewport))
```

Simplified: `clamp(min, calc(min + (max - min) * ((100vw - 320px) / (1280 - 320))), max)`

### 6.5 Benefits

- **No breakpoints needed** for smooth scaling.
- **No jumps** — values scale linearly between min and max.
- **Less CSS** — one line replaces multiple media queries.

---

## 7. Responsive Typography

### 7.1 Strategy

| Approach | How | Pros | Cons |
|----------|-----|------|------|
| **Fluid (clamp)** | `clamp(1rem, 0.5rem + 1vw, 1.5rem)` | Smooth | Complex to calculate |
| **Stepped** | Media queries change `font-size` at breakpoints | Simple | Jumps at breakpoints |
| **Root scaling** | Change `html { font-size }` per breakpoint, use `rem` everywhere | One change scales all | Coarse control |

### 7.2 What Changes Per Breakpoint

| Element | Mobile (xs) | Tablet (md) | Desktop (xl) |
|---------|-------------|-------------|--------------|
| Body text | 16px | 16px | 16px (unchanged) |
| H1 | 28–32px | 36–40px | 48–56px |
| H2 | 24–28px | 28–32px | 36–40px |
| H3 | 20–24px | 24–28px | 28–32px |
| Display | 36–48px | 56–72px | 72–96px |
| Caption/small | 12px | 12px | 12px (unchanged) |

### 7.3 Line Height Adjusts

Large headings on mobile need tighter line height:

```css
h1 {
  font-size: clamp(2rem, 1rem + 3vw, 3.5rem);
  line-height: 1.1; /* Tight for large text */
}
```

---

## 8. Responsive Spacing

### 8.1 Strategy

Spacing should grow with viewport to prevent cramped large screens and oversized small screens:

```css
--ds-section-gap: clamp(2rem, 1rem + 3vw, 5rem);
--ds-card-padding: clamp(1rem, 0.5rem + 1vw, 2rem);
```

### 8.2 What Changes

| Spacing | Mobile | Tablet | Desktop |
|---------|--------|--------|---------|
| Section padding | 1–1.5rem | 2–3rem | 4–6rem |
| Card padding | 1rem | 1.5rem | 2rem |
| Grid gap | 1rem | 1.5rem | 2rem |
| Page margin | 1rem | 2rem | auto (max-width) |
| Stack gap | 0.75rem | 1rem | 1.5rem |

### 8.3 Density Modes

Some DS define explicit density modes:

| Mode | Factor | Use |
|------|--------|-----|
| **Compact** | 0.75× | Data-heavy tables, admin panels |
| **Default** | 1× | Standard UI |
| **Comfortable** | 1.25× | Marketing, content reading |

---

## 9. Responsive Grid

### 9.1 Grid Behavior Per Breakpoint

```css
.grid-responsive {
  display: grid;
  gap: var(--ds-space-4);
  grid-template-columns: 1fr;                                  /* xs: single column */
}

@media (min-width: 640px) {
  .grid-responsive { grid-template-columns: repeat(2, 1fr); }  /* sm: 2 columns */
}

@media (min-width: 1024px) {
  .grid-responsive { grid-template-columns: repeat(3, 1fr); }  /* lg: 3 columns */
}

@media (min-width: 1280px) {
  .grid-responsive { grid-template-columns: repeat(4, 1fr); }  /* xl: 4 columns */
}
```

### 9.2 Auto-Fit Grid (No Breakpoints)

```css
.grid-auto {
  display: grid;
  gap: var(--ds-space-4);
  grid-template-columns: repeat(auto-fit, minmax(min(280px, 100%), 1fr));
}
```

This automatically adjusts column count based on available space.

### 9.3 12-Column Grid

```css
.grid-12 {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: var(--ds-space-4);
}

/* xs: span all 12 */
.col-12 { grid-column: span 12; }

/* md: span 6 (half width) */
@media (min-width: 768px) {
  .md\:col-6 { grid-column: span 6; }
}

/* lg: span 4 (third width) */
@media (min-width: 1024px) {
  .lg\:col-4 { grid-column: span 4; }
}
```

---

## 10. Responsive Component Patterns

### 10.1 Stack → Row

Most common pattern: vertical stack on mobile, horizontal on desktop:

```css
.stack-to-row {
  display: flex;
  flex-direction: column;
  gap: var(--ds-space-3);
}

@media (min-width: 768px) {
  .stack-to-row { flex-direction: row; }
}
```

### 10.2 Show / Hide

```css
.mobile-only  { display: block; }
.desktop-only { display: none; }

@media (min-width: 1024px) {
  .mobile-only  { display: none; }
  .desktop-only { display: block; }
}
```

### 10.3 Responsive Table

Tables are problematic on mobile. Strategies:

| Strategy | How | Best For |
|----------|-----|----------|
| **Horizontal scroll** | `overflow-x: auto` on wrapper | Small tables |
| **Stack cards** | Each row becomes a card with label:value pairs | Medium tables |
| **Column hiding** | Hide less-important columns on mobile | Large tables |
| **Collapsible rows** | First 2-3 columns visible, expand for more | Data-heavy |

### 10.4 Responsive Modal → Sheet

```
Desktop: Centered modal (max-width: 500px)
Tablet: Centered modal (max-width: 90vw)
Mobile: Bottom sheet (full-width, slides up from bottom)
```

### 10.5 Responsive Sidebar

```
Desktop: Persistent sidebar (240px)
Tablet: Collapsible sidebar (icon-only = 64px, expanded = 240px)
Mobile: Off-canvas drawer (fullscreen overlay)
```

---

## 11. Responsive Navigation

### 11.1 Navigation Patterns by Viewport

| Viewport | Pattern |
|----------|---------|
| **Desktop** (1024px+) | Horizontal top nav with dropdowns, OR persistent side nav |
| **Tablet** (768–1023px) | Collapsed side nav (icons only) with expand, OR hamburger |
| **Mobile** (<768px) | Hamburger → full-screen/sheet menu, OR bottom tab bar |

### 11.2 Bottom Tab Bar (Mobile)

```
┌─────┬─────┬─────┬─────┬─────┐
│Home │Find │ Add │Chat │User │
└─────┴─────┴─────┴─────┴─────┘
```

Rules:
- Maximum 5 items.
- Icons + short labels.
- Active item visually distinct (filled icon, accent color).
- Must not conflict with mobile browser bottom bars.
- Safe area padding for notched phones.

### 11.3 Navigation Transition

Avoid jarring shifts between desktop nav and mobile nav. Consider:
- Animate the transition (side nav collapses to icons, then to hamburger).
- Maintain consistent information architecture across breakpoints.

---

## 12. Responsive Images & Media

### 12.1 Responsive Images

```html
<img
  srcset="image-400.jpg 400w, image-800.jpg 800w, image-1200.jpg 1200w"
  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
  src="image-800.jpg"
  alt="Description"
  loading="lazy"
/>
```

### 12.2 Art Direction

Different crops for different viewports:

```html
<picture>
  <source media="(min-width: 1024px)" srcset="hero-wide.jpg" />
  <source media="(min-width: 640px)"  srcset="hero-medium.jpg" />
  <img src="hero-mobile.jpg" alt="Hero" />
</picture>
```

### 12.3 Aspect Ratio

```css
.media {
  aspect-ratio: 16 / 9;
  object-fit: cover;
}

/* Mobile: taller aspect ratio */
@media (max-width: 640px) {
  .media { aspect-ratio: 4 / 3; }
}
```

### 12.4 Video

- Serve different video qualities per connection speed.
- Disable autoplay on mobile (data cost, battery drain).
- Provide poster image for lazy loading.

---

## 13. Touch vs Pointer

### 13.1 Detection

```css
@media (hover: hover) and (pointer: fine) {
  /* Mouse/trackpad — enable hover effects */
  .card:hover { transform: translateY(-2px); }
}

@media (pointer: coarse) {
  /* Touch — increase touch targets */
  .button { min-height: 48px; padding: 12px 24px; }
}
```

### 13.2 Touch Target Sizes

| Standard | Minimum Size |
|----------|-------------|
| WCAG 2.5.8 (AAA) | 44×44px |
| WCAG 2.5.5 (AA) | 24×24px |
| Apple HIG | 44×44pt |
| Material Design | 48×48dp |
| **Recommended** | 44×44px minimum, 48×48px comfortable |

### 13.3 Touch-Specific UX

- **No hover-dependent functionality** — everything must work without hover.
- **Tap feedback** — `:active` state for touch feedback (not `:hover`).
- **Swipe gestures** — supplement, never replace buttons.
- **Long press** — use sparingly, provide alternative access.
- **Scroll vs tap** — avoid tap targets in scrollable areas (accidental taps).

---

## 14. Viewport Units

### 14.1 Unit Types

| Unit | Description | Browser Support |
|------|-------------|----------------|
| `vw` | 1% of viewport width | All |
| `vh` | 1% of viewport height (old, unreliable on mobile) | All |
| `dvh` | Dynamic viewport height (accounts for mobile browser chrome) | Modern |
| `svh` | Small viewport height (browser chrome visible) | Modern |
| `lvh` | Large viewport height (browser chrome hidden) | Modern |
| `vmin` | Smaller of vw/vh | All |
| `vmax` | Larger of vw/vh | All |

### 14.2 The Mobile `vh` Problem

On mobile browsers, `100vh` is larger than the visible area because the browser chrome (URL bar, toolbar) is not subtracted:

```css
/* BAD: overflows on mobile */
.hero { height: 100vh; }

/* GOOD: accounts for browser chrome */
.hero { height: 100dvh; }

/* FALLBACK: */
.hero {
  height: 100vh;
  height: 100dvh;
}
```

### 14.3 When to Use

| Unit | Use Case |
|------|----------|
| `dvh` | Full-screen sections, hero areas |
| `svh` | App shells that must never overflow |
| `vw` | Full-bleed elements, viewport-relative sizing |
| `vmin/vmax` | Square elements that scale with viewport |

---

## 15. Device-Specific Considerations

### 15.1 Safe Areas (Notched Phones)

```css
.bottom-bar {
  padding-bottom: env(safe-area-inset-bottom);
}

.sidebar {
  padding-left: env(safe-area-inset-left);
}
```

Always include safe area insets on fixed/sticky elements near screen edges.

### 15.2 Foldable Devices

```css
@media (horizontal-viewport-segments: 2) {
  /* Device has a fold — dual-screen layout */
  .layout {
    display: grid;
    grid-template-columns: env(viewport-segment-width 0 0) env(viewport-segment-width 1 0);
    column-gap: env(viewport-segment-left 1 0) - env(viewport-segment-right 0 0);
  }
}
```

### 15.3 High DPI

```css
@media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi) {
  /* 2x retina — use 2x assets */
}
```

### 15.4 PWA Considerations

- `viewport-fit: cover` for edge-to-edge on notched devices.
- Theme color meta tag for browser chrome coloring.
- Splash screen images at multiple resolutions.

---

## 16. Responsive Utility Classes

### 16.1 Pattern

Prefix responsive utilities with breakpoint name:

```
.hidden          → hidden at all sizes
.sm:block        → display: block at sm and up
.md:flex         → display: flex at md and up
.lg:grid-cols-3  → 3 columns at lg and up
```

### 16.2 Common Responsive Utilities

| Category | Examples |
|----------|---------|
| Display | `sm:block`, `md:flex`, `lg:grid`, `xl:inline-flex` |
| Columns | `sm:grid-cols-2`, `md:grid-cols-3`, `lg:grid-cols-4` |
| Width | `sm:w-1/2`, `md:w-1/3`, `lg:w-1/4` |
| Spacing | `sm:p-4`, `md:p-6`, `lg:p-8` |
| Text | `sm:text-lg`, `md:text-xl`, `lg:text-2xl` |
| Direction | `sm:flex-row`, `md:flex-row-reverse` |
| Visibility | `sm:visible`, `md:hidden` |

---

## 17. Testing Strategy

### 17.1 Device Coverage Matrix

| Category | Devices |
|----------|---------|
| Small phone | 320px width (iPhone SE) |
| Standard phone | 375–390px (iPhone 14, Pixel 7) |
| Large phone | 428–430px (iPhone 14 Pro Max) |
| Tablet portrait | 768px (iPad) |
| Tablet landscape | 1024px (iPad) |
| Laptop | 1280–1440px |
| Desktop | 1920px |
| Ultrawide | 2560px+ |

### 17.2 What to Test

- Layout doesn't overflow horizontally at any width.
- Text remains readable (not too small or too large).
- Touch targets are large enough on touch devices.
- Navigation is accessible at every breakpoint.
- Images don't distort or overflow.
- Modals/overlays work on small screens.
- Forms are usable with on-screen keyboards.
- Tables remain readable.
- No content is hidden unintentionally.

### 17.3 Tools

- Browser DevTools responsive mode
- Real devices (iOS Safari, Android Chrome)
- BrowserStack / Sauce Labs / LambdaTest for cross-device
- Lighthouse for mobile performance scoring
- axe DevTools for mobile accessibility

---

## 18. Responsive Tokens Summary

### Complete Token Inventory

```
BREAKPOINTS
  --ds-bp-xs         0       (small phones)
  --ds-bp-sm         640px   (large phones, landscape)
  --ds-bp-md         768px   (tablets portrait)
  --ds-bp-lg         1024px  (tablets landscape, laptops)
  --ds-bp-xl         1280px  (desktops)
  --ds-bp-2xl        1536px  (large desktops)

CONTAINER WIDTHS
  --ds-container-sm    640px
  --ds-container-md    768px
  --ds-container-lg    1024px
  --ds-container-xl    1280px
  --ds-container-2xl   1536px

MEDIA QUERIES
  Width:        (min-width: XXpx), range syntax
  Orientation:  (orientation: portrait|landscape)
  Hover:        (hover: hover|none)
  Pointer:      (pointer: fine|coarse)
  Preference:   prefers-color-scheme, prefers-reduced-motion, prefers-contrast
  Display:      (display-mode: standalone|fullscreen)

CONTAINER QUERIES
  container-type: inline-size
  @container name (min-width: XXpx)
  Units: cqw, cqh, cqi, cqb

VIEWPORT UNITS
  vw, vh (legacy)
  dvh, svh, lvh (modern)
  vmin, vmax

SAFE AREAS
  env(safe-area-inset-top)
  env(safe-area-inset-right)
  env(safe-area-inset-bottom)
  env(safe-area-inset-left)

TOUCH TARGETS
  Minimum: 44×44px
  Comfortable: 48×48px

RESPONSIVE UTILITY PREFIX PATTERN
  {breakpoint}:{utility}
  e.g. sm:flex, md:grid-cols-3, lg:hidden
```

---

*This chapter defines the complete responsive design vocabulary for a Design System. Every breakpoint, query pattern, fluid technique, and responsive utility above should be present in the implemented DS.*
