# 02 — Color System

> Everything a Design System must define for complete color control. This chapter covers palette architecture, semantic tokens, theming, accessibility contrast, wide-gamut color, gradients, overlays, and manipulation utilities.

---

## Table of Contents

1. [Color Architecture](#1-color-architecture)
2. [Palette Tokens](#2-palette-tokens)
3. [Semantic Color Tokens](#3-semantic-color-tokens)
4. [Surface & Background System](#4-surface--background-system)
5. [Text Color System](#5-text-color-system)
6. [Border & Outline Colors](#6-border--outline-colors)
7. [Interactive State Colors](#7-interactive-state-colors)
8. [Status / Feedback Colors](#8-status--feedback-colors)
9. [Brand Color System](#9-brand-color-system)
10. [Dark Mode & Light Mode](#10-dark-mode--light-mode)
11. [Theme Architecture](#11-theme-architecture)
12. [Color Contrast & Accessibility](#12-color-contrast--accessibility)
13. [Wide-Gamut & P3 Color](#13-wide-gamut--p3-color)
14. [Color Formats](#14-color-formats)
15. [Opacity & Alpha Channel](#15-opacity--alpha-channel)
16. [Gradients](#16-gradients)
17. [Overlays & Scrims](#17-overlays--scrims)
18. [Color Mixing & Manipulation](#18-color-mixing--manipulation)
19. [Data Visualization Colors](#19-data-visualization-colors)
20. [Color Utility Classes](#20-color-utility-classes)
21. [Color Tokens Summary](#21-color-tokens-summary)

---

## 1. Color Architecture

A pro-level color system has **three layers**:

```
┌─────────────────────────────────────────┐
│  Layer 3: COMPONENT TOKENS              │
│  --button-bg, --card-border, --input-bg │
├─────────────────────────────────────────┤
│  Layer 2: SEMANTIC TOKENS               │
│  --color-background, --color-accent     │
├─────────────────────────────────────────┤
│  Layer 1: PALETTE TOKENS                │
│  --palette-blue-500, --palette-gray-100 │
└─────────────────────────────────────────┘
```

### 1.1 Layer 1: Palette (Raw Values)

The full set of color values, organized by hue and lightness. **Never consumed directly** by components — only referenced by semantic tokens.

### 1.2 Layer 2: Semantic (Purpose)

Named by **what they do**, not what color they are. `--color-background` not `--color-dark-gray`. Components consume these tokens. When themes change, only semantic mappings are updated.

### 1.3 Layer 3: Component (Scoped)

Optional. When a component needs a color that doesn't map cleanly to a semantic token, create a component-scoped token. E.g., `--ds-color-table-stripe` or `--ds-color-sidebar-bg`.

### 1.4 Why Three Layers

- **Palette changes** (rebrand) → update Layer 1 → everything adapts.
- **Theme changes** (dark/light) → remap Layer 2 → everything adapts.
- **Component changes** → update Layer 3 → only that component is affected.

---

## 2. Palette Tokens

The palette is a **complete set of color ramps** organized by hue.

### 2.1 Neutral Ramp (Required)

The grayscale used for backgrounds, borders, text:

| Token | Lightness | Typical Dark Theme | Typical Light Theme |
|-------|-----------|-------------------|-------------------|
| `--ds-palette-neutral-0` | White | #ffffff | #ffffff |
| `--ds-palette-neutral-50` | Near-white | #f9fafb | #f9fafb |
| `--ds-palette-neutral-100` | Light gray | #f3f4f6 | #f3f4f6 |
| `--ds-palette-neutral-200` | Lighter | #e5e7eb | #e5e7eb |
| `--ds-palette-neutral-300` | Light | #d1d5db | #d1d5db |
| `--ds-palette-neutral-400` | Mid-light | #9ca3af | #9ca3af |
| `--ds-palette-neutral-500` | Mid | #6b7280 | #6b7280 |
| `--ds-palette-neutral-600` | Mid-dark | #4b5563 | #4b5563 |
| `--ds-palette-neutral-700` | Dark | #374151 | #374151 |
| `--ds-palette-neutral-800` | Darker | #1f2937 | #1f2937 |
| `--ds-palette-neutral-850` | Extra dark | #1b1b1e | — |
| `--ds-palette-neutral-900` | Near-black | #111827 | #111827 |
| `--ds-palette-neutral-950` | Deepest | #030712 | #030712 |

### 2.2 Brand / Accent Ramp (Required)

A full 11–13 step ramp for the primary brand color:

```
--ds-palette-brand-50    (lightest tint)
--ds-palette-brand-100
--ds-palette-brand-200
--ds-palette-brand-300
--ds-palette-brand-400
--ds-palette-brand-500   (base)
--ds-palette-brand-600   (typical primary)
--ds-palette-brand-700
--ds-palette-brand-800
--ds-palette-brand-900
--ds-palette-brand-950   (darkest shade)
```

### 2.3 Status Ramps (Required)

| Status | Purpose | Minimum Steps |
|--------|---------|---------------|
| **Success** (Green) | Confirmations, positive actions | 50, 100, 200, 300, 400, 500, 600, 700, 800, 900 |
| **Warning** (Amber/Orange) | Caution, pending states | Same scale |
| **Danger / Error** (Red) | Errors, destructive actions | Same scale |
| **Info** (Blue) | Informational, neutral status | Same scale |

### 2.4 Extended Palette (Optional)

Additional hue ramps for data visualization, categories, or complex UIs:

| Ramp | Use Case |
|------|----------|
| **Teal / Cyan** | Secondary brand, charts |
| **Purple** | Highlights, premium features |
| **Pink** | Marketing accents, badges |
| **Orange** | Alternate warning, CTAs |
| **Indigo** | Alternative brand accent |
| **Yellow** | Highlights, star ratings |
| **Lime** | Eco/sustainability features |

### 2.5 Palette Generation Rules

- Use a **perceptually uniform color space** (OKLCH, OKLAB) for generating ramps so lightness steps appear even to the human eye.
- Step 500 is the "base" — all other steps radiate from it.
- Dark steps (700–950) must have enough contrast against light text.
- Light steps (50–200) must have enough contrast against dark text.
- Test the entire ramp at all steps against both white and black text for contrast.

---

## 3. Semantic Color Tokens

Named by **intent**, not by color. These are what components consume.

### 3.1 Background Tokens

| Token | Purpose |
|-------|---------|
| `--ds-color-background` | Page/root background |
| `--ds-color-surface` | Cards, panels, drawers, modals |
| `--ds-color-surface-2` | Nested surface (e.g., element inside a card) |
| `--ds-color-surface-3` | Third level nesting |
| `--ds-color-surface-raised` | Elevated surface (dropdown, popover) |
| `--ds-color-surface-sunken` | Recessed surface (input fields, wells) |
| `--ds-color-surface-overlay` | Semi-transparent overlay behind modals |
| `--ds-color-surface-interactive` | Clickable surface hover/active state |

### 3.2 Foreground / Text Tokens

| Token | Purpose |
|-------|---------|
| `--ds-color-foreground` | Primary text |
| `--ds-color-foreground-secondary` | Secondary text (less emphasis) |
| `--ds-color-foreground-muted` | Disabled/de-emphasized text |
| `--ds-color-foreground-inverse` | Text on accent/dark backgrounds |
| `--ds-color-foreground-on-accent` | Text on accent-colored backgrounds |

### 3.3 Border Tokens

| Token | Purpose |
|-------|---------|
| `--ds-color-border` | Default borders |
| `--ds-color-border-strong` | Emphasized borders |
| `--ds-color-border-muted` | Subtle/ghost borders |
| `--ds-color-border-focus` | Focus ring color |
| `--ds-color-border-error` | Invalid input borders |

### 3.4 Accent Tokens

| Token | Purpose |
|-------|---------|
| `--ds-color-accent` | Primary action color (buttons, links, active states) |
| `--ds-color-accent-hover` | Accent on hover |
| `--ds-color-accent-active` | Accent on press |
| `--ds-color-accent-muted` | Subtle accent background (badges, highlights) |
| `--ds-color-accent-foreground` | Text on accent background |

---

## 4. Surface & Background System

### 4.1 Elevation-Based Surfaces

Modern DS systems use **elevation** to differentiate surface layers:

| Level | Token | Example | Typical Dark Theme | Typical Light Theme |
|-------|-------|---------|--------------------|---------------------|
| 0 (Base) | `--ds-color-background` | Page background | `#0b0b0c` | `#ffffff` |
| 1 | `--ds-color-surface` | Cards, panels | `#151419` | `#ffffff` border |
| 2 | `--ds-color-surface-2` | Nested elements inside surface-1 | `#1b1b1e` | `#f9fafb` |
| 3 | `--ds-color-surface-3` | Deep-nested (rare) | `#262626` | `#f3f4f6` |
| Raised | `--ds-color-surface-raised` | Dropdowns, popovers, tooltips | `#262626` | `#ffffff` + shadow |
| Sunken | `--ds-color-surface-sunken` | Input wells, inset areas | Darker than bg | `#f3f4f6` |

### 4.2 Surface Rules

- In **dark themes**, elevation = lighter surface (adding white light).
- In **light themes**, elevation = shadow/border (surfaces stay white-ish, differentiation via shadows and borders).
- Each surface level must have appropriate contrast for text placed on it.
- Never use more than **3 nested surface levels** — it gets visually confusing.

---

## 5. Text Color System

### 5.1 Hierarchy

| Token | Contrast | Use |
|-------|----------|-----|
| `--ds-color-foreground` | Highest | Headings, important text, primary content |
| `--ds-color-foreground-secondary` | High | Body text, paragraphs |
| `--ds-color-foreground-muted` | Medium | Helper text, placeholders, captions, timestamps |
| `--ds-color-foreground-disabled` | Low | Disabled controls (must still meet 3:1 for UI components) |
| `--ds-color-foreground-inverse` | Highest on dark bg | Text on accent buttons, dark banners |
| `--ds-color-foreground-link` | Meets 3:1 against text bg | Hyperlinks |

### 5.2 Status Text Colors

| Token | Purpose |
|-------|---------|
| `--ds-color-text-success` | Success messages |
| `--ds-color-text-warning` | Warning messages |
| `--ds-color-text-danger` | Error messages |
| `--ds-color-text-info` | Info messages |

### 5.3 Rules

- Primary text must meet **WCAG AA 4.5:1** contrast against its background.
- Large text (18px+ bold or 24px+ regular) can use **3:1** ratio.
- Muted text still must meet **4.5:1** for body text or **3:1** for UI components.
- Never use pure black (`#000000`) text on pure white — use dark gray (`#111827`) for less eye strain.

---

## 6. Border & Outline Colors

### 6.1 Border Hierarchy

| Use | Token | Description |
|-----|-------|-------------|
| Default | `--ds-color-border` | Cards, dividers, table borders |
| Subtle | `--ds-color-border-muted` | Low-emphasis separators |
| Strong | `--ds-color-border-strong` | Active/selected elements |
| Focus | `--ds-color-border-focus` / `--ds-color-focus-ring` | Focus indicators |
| Error | `--ds-color-border-error` | Invalid inputs |
| Success | `--ds-color-border-success` | Valid inputs |

### 6.2 Focus Ring

```css
--ds-color-focus-ring: rgb(var(--ds-color-accent-rgb) / 0.45);
```

Focus ring should:
- Be visible against **both** light and dark backgrounds.
- Use `box-shadow` or `outline` (not `border` — which shifts layout).
- Be `2px` minimum width.
- Have optional offset (`outline-offset: 2px`) for clear separation.

---

## 7. Interactive State Colors

Every interactive element needs colors for each state:

### 7.1 State Matrix

| State | Background Change | Border Change | Text Change |
|-------|------------------|---------------|-------------|
| **Default** | Base | Base | Base |
| **Hover** | Lighten by 6–10% | Slightly stronger | No change |
| **Focus** | No change (ring instead) | Focus ring | No change |
| **Active / Pressed** | Darken by 8–12% | Stronger | No change |
| **Selected** | Accent-tinted background | Accent border | Accent or no change |
| **Disabled** | Reduced opacity (40–60%) | Muted | Muted |
| **Loading** | Same as disabled + animation | No change | Muted |
| **Error** | Error-tinted background | Error border | Error text |

### 7.2 Token Pattern

```
--ds-color-accent             default accent
--ds-color-accent-hover       hover state
--ds-color-accent-active      pressed state
--ds-color-accent-muted       subtle background tint
```

### 7.3 Color Mixing for States

Use CSS `color-mix()` for consistent state derivation:

```css
--ds-color-accent-hover: color-mix(in oklab, var(--ds-color-accent) 86%, white);
--ds-color-accent-active: color-mix(in oklab, var(--ds-color-accent) 78%, black);
--ds-color-accent-muted: color-mix(in oklab, var(--ds-color-accent) 12%, var(--ds-color-surface));
```

---

## 8. Status / Feedback Colors

### 8.1 Four Status Categories

| Category | Color | Usage |
|----------|-------|-------|
| **Success** | Green (HSL ~142°) | Completed actions, confirmations, valid states |
| **Warning** | Amber/Orange (HSL ~38°) | Caution, pending, attention needed |
| **Danger / Error** | Red (HSL ~0°) | Errors, destructive actions, failures |
| **Info** | Blue (HSL ~217°) | Informational notices, tips, neutral status |

### 8.2 Each Status Needs

| Token | Purpose |
|-------|---------|
| `--ds-color-{status}` | Base color (icon color, emphasis) |
| `--ds-color-{status}-bg` | Subtle background for banners, alerts |
| `--ds-color-{status}-border` | Border for alerts, inputs |
| `--ds-color-{status}-text` | Text color for messages |
| `--ds-color-{status}-hover` | Hover state for interactive status elements |
| `--ds-color-{status}-rgb` | RGB components for alpha manipulation |

### 8.3 Status Background Patterns

For alerts and banners, the background must be **very subtle**:

```css
--ds-color-success-bg: color-mix(in oklab, var(--ds-color-success) 8%, var(--ds-color-surface));
--ds-color-danger-bg:  color-mix(in oklab, var(--ds-color-danger) 8%, var(--ds-color-surface));
```

---

## 9. Brand Color System

### 9.1 Primary Brand

The main brand color used for CTAs, links, active states, accents. Must have a full ramp (50–950) for versatility.

### 9.2 Secondary Brand (Optional)

A complementary accent for secondary actions, highlights, categories.

### 9.3 Tertiary Brand (Optional)

A third accent for complex UIs with many distinct interactive zones.

### 9.4 Brand Color Rules

- Primary brand must meet **4.5:1** contrast as button text against button background.
- Brand colors should work in both light and dark themes — may need different values per theme.
- The "base" brand color (e.g., `brand-600`) should be the most commonly used, with lighter/darker steps for states.

---

## 10. Dark Mode & Light Mode

### 10.1 What Changes Between Modes

| Element | Light Mode | Dark Mode |
|---------|-----------|-----------|
| Background | White/near-white | Very dark gray/near-black |
| Surface | White + border/shadow | Slightly lighter than bg |
| Text primary | Dark gray | Light gray/white |
| Text muted | Medium gray | Medium-light gray |
| Borders | Light gray | Dark gray |
| Shadows | Visible (black alpha) | Less visible or replaced with elevated surfaces |
| Accent | May be same or shifted for contrast | May need brightening for visibility |
| Images | Normal | Optionally reduce brightness |
| Status colors | Same hues, adapted lightness | Same hues, adapted lightness |

### 10.2 Implementation Approaches

| Approach | Mechanism | Trade-off |
|----------|-----------|-----------|
| **CSS Variables + class toggle** | `html.theme-dark` overrides `--ds-color-*` | Best — fast, no JS bundle, SSR-safe |
| **CSS `prefers-color-scheme`** | Media query auto-detection | Good default, but user can't override |
| **Both** | Media query as default + class override for user preference | **Recommended** |
| **CSS-in-JS theme object** | JS switches object | Heavy, SSR-unfriendly |

### 10.3 Theme Persistence

1. On load, check `localStorage` for user preference.
2. If no preference, respect `prefers-color-scheme`.
3. Apply theme class to `<html>` immediately (before paint) via `<script>` in `<head>`.
4. On toggle, update `localStorage` + class.
5. Prevent flash of incorrect theme (FOUC) by using a blocking inline script.

---

## 11. Theme Architecture

### 11.1 Theme Types

| Type | What Changes | Example |
|------|-------------|---------|
| **Appearance** | Light/dark | Dark mode toggle |
| **Brand** | Accent/brand colors | White-label for different clients |
| **Visual Variant** | Shadows, radii, density | Glass, neumorph, sleek, flat |
| **Seasonal / Campaign** | Accent, backgrounds | Holiday theme, product launch |

### 11.2 Theme Token Structure

```css
/* Default (dark) tokens in :root */
:root {
  --ds-color-background: #0b0b0c;
  --ds-color-accent: #6d3be2;
  /* ... */
}

/* Light theme overrides */
html.theme-light {
  --ds-color-background: #ffffff;
  --ds-color-accent: #6d3be2; /* may or may not change */
}

/* Brand variant overrides */
html.brand-solar {
  --ds-palette-brand-600: #f59e0b;
  --ds-color-accent: var(--ds-palette-brand-600);
}
```

### 11.3 Theme Composition

Themes can **compose**: a page can have `theme-dark` + `brand-solar` + `visual-glass` active simultaneously. Token layers resolve in cascade order.

### 11.4 Scoped Themes

A theme can apply to a **subtree** instead of the whole page:

```html
<div data-theme="light">
  <!-- This section renders in light mode, rest of page stays dark -->
</div>
```

This requires `:where()` or scoping selectors, not `html.theme-*`.

---

## 12. Color Contrast & Accessibility

### 12.1 WCAG Requirements

| Level | Normal Text (<18px bold, <24px) | Large Text (≥18px bold, ≥24px) | UI Components & Graphics |
|-------|-------------------------------|-------------------------------|--------------------------|
| **AA** | 4.5:1 | 3:1 | 3:1 |
| **AAA** | 7:1 | 4.5:1 | — |

### 12.2 APCA (Advanced Perceptual Contrast Algorithm)

The next-gen contrast standard (WCAG 3.0 draft). Uses perceptual visual contrast rather than luminance ratio:

| Lc Value | Use Case |
|----------|----------|
| Lc 90+ | Body text (16px, weight 400) |
| Lc 75+ | Bold body text, subheadings |
| Lc 60+ | Large headings (24px+) |
| Lc 45+ | Non-text UI elements |
| Lc 30+ | Decorative, non-essential |

### 12.3 Testing Methodology

1. **Automated**: Run contrast checkers in CI (axe-core, lighthouse).
2. **Manual**: Test every semantic token pair: text token on its expected background token.
3. **Matrix**: Create a contrast matrix of all text × background combinations.
4. **Edge cases**: Test muted text on surface-2, error text on danger-bg, etc.

### 12.4 Common Contrast Failures

- Placeholder text too light (must still meet 4.5:1 for body text).
- Muted text invisible on dark backgrounds.
- Focus rings invisible on colored surfaces.
- Status colors too saturated to read.
- Gradient text with low contrast at one end.

---

## 13. Wide-Gamut & P3 Color

### 13.1 What is P3?

Display P3 is a color space with a ~25% larger gamut than sRGB. Modern Apple devices, many Android phones, and high-end monitors support it.

### 13.2 CSS Syntax

```css
/* sRGB fallback */
--ds-color-accent: #6d3be2;

/* P3 enhanced (if supported) */
@media (color-gamut: p3) {
  --ds-color-accent: oklch(0.55 0.25 290);
}
```

### 13.3 OKLCH for Token Definition

OKLCH is the recommended color space for DS tokens:
- **L** (Lightness): 0–1 — perceptually uniform
- **C** (Chroma): 0–0.4 — saturation
- **H** (Hue): 0–360 — hue angle

Benefits:
- Perceptually uniform lightness → ramps look even.
- Hue stability → changing lightness doesn't shift hue.
- Wide gamut support built in.

### 13.4 Fallback Strategy

Always define sRGB fallback first, then `@media (color-gamut: p3)` or `@supports (color: oklch(...))` for enhancement.

---

## 14. Color Formats

### 14.1 Format Comparison

| Format | Example | Gamut | Perceptual | Use |
|--------|---------|-------|-----------|-----|
| Hex | `#6d3be2` | sRGB | No | Legacy, compact |
| RGB | `rgb(109 59 226)` | sRGB | No | Alpha composition |
| HSL | `hsl(262 74% 56%)` | sRGB | Poor | Human-readable edits |
| HWB | `hwb(262 23% 11%)` | sRGB | Better | Tinting/shading |
| OKLCH | `oklch(0.55 0.25 290)` | Wide | **Yes** | **Recommended for tokens** |
| OKLAB | `oklab(0.55 0.1 -0.24)` | Wide | **Yes** | Color mixing |
| Display-P3 | `color(display-p3 0.5 0.3 0.9)` | P3 | No | Explicit P3 |

### 14.2 Recommendation

- **Author tokens** in OKLCH (perceptual, wide-gamut).
- **Store fallbacks** in hex (smallest, universal).
- **Mix colors** using `color-mix(in oklab, ...)` for perceptual blending.
- **Expose RGB triplets** as `--ds-color-*-rgb: R G B` for alpha manipulation: `rgb(var(--ds-color-accent-rgb) / 0.5)`.

---

## 15. Opacity & Alpha Channel

### 15.1 Opacity Tokens

| Token | Value | Use Case |
|-------|-------|----------|
| `--ds-opacity-0` | 0 | Hidden |
| `--ds-opacity-5` | 0.05 | Barely visible background tints |
| `--ds-opacity-10` | 0.10 | Subtle hover backgrounds |
| `--ds-opacity-20` | 0.20 | Light backgrounds, disabled borders |
| `--ds-opacity-30` | 0.30 | Muted borders |
| `--ds-opacity-40` | 0.40 | Disabled state |
| `--ds-opacity-50` | 0.50 | Medium transparency |
| `--ds-opacity-60` | 0.60 | Disabled content |
| `--ds-opacity-70` | 0.70 | Semi-opaque |
| `--ds-opacity-80` | 0.80 | Near-opaque |
| `--ds-opacity-90` | 0.90 | Barely transparent |
| `--ds-opacity-100` | 1 | Fully opaque |

### 15.2 Alpha Pattern

For applying alpha to any color token:

```css
/* Store color as RGB triplet */
--ds-color-accent-rgb: 109 59 226;

/* Use with custom alpha */
background: rgb(var(--ds-color-accent-rgb) / 0.12);
```

Or with modern CSS:

```css
background: color-mix(in oklab, var(--ds-color-accent) 12%, transparent);
```

---

## 16. Gradients

### 16.1 Gradient Types

| Type | CSS | Use Case |
|------|-----|----------|
| **Linear** | `linear-gradient(direction, stops)` | Backgrounds, banners, text |
| **Radial** | `radial-gradient(shape, stops)` | Spotlights, glows, orbs |
| **Conic** | `conic-gradient(from angle, stops)` | Pie charts, color wheels, gauges |
| **Repeating** | `repeating-linear-gradient(...)` | Patterns, hatching |

### 16.2 Gradient Tokens

| Token | Purpose |
|-------|---------|
| `--ds-gradient-brand` | Primary brand gradient |
| `--ds-gradient-subtle` | Very soft background gradient |
| `--ds-gradient-hero` | Hero section dramatic gradient |
| `--ds-gradient-surface` | Surface-to-transparent fade |
| `--ds-gradient-skeleton` | Shimmer animation for loading |

### 16.3 Gradient Rules

- Gradients must use **the same perceptual color space** for smooth transitions: `linear-gradient(in oklab, ...)`.
- Avoid harsh gradients between complementary colors — they pass through muddy gray in sRGB. Use `in oklch` to maintain chroma.
- Gradient text must have at least **3:1** contrast at all points of the gradient against the background.
- Provide CSS variable-based gradients so themes can override them.

### 16.4 Common Gradient Patterns

```css
/* Brand gradient */
--ds-gradient-brand: linear-gradient(135deg, var(--ds-palette-brand-400), var(--ds-palette-brand-700));

/* Fade to background */
--ds-gradient-fade: linear-gradient(to bottom, transparent, var(--ds-color-background));

/* Mesh gradient (multi-point) */
--ds-gradient-mesh: radial-gradient(at 20% 30%, var(--ds-palette-brand-400) 0%, transparent 50%),
                    radial-gradient(at 80% 60%, var(--ds-palette-brand-700) 0%, transparent 50%);

/* Skeleton shimmer */
--ds-gradient-skeleton: linear-gradient(90deg, transparent 25%, var(--ds-color-surface-2) 50%, transparent 75%);
```

---

## 17. Overlays & Scrims

### 17.1 Modal Overlay / Scrim

A semi-transparent layer behind modals, drawers, and dialogs:

| Token | Value | Use Case |
|-------|-------|----------|
| `--ds-color-overlay` | `rgb(0 0 0 / 0.55)` | Standard modal backdrop (dark theme) |
| `--ds-color-overlay-light` | `rgb(0 0 0 / 0.35)` | light theme backdrop |
| `--ds-color-overlay-heavy` | `rgb(0 0 0 / 0.75)` | Image lightbox, full-screen overlay |

### 17.2 Scrim Gradient

A gradient scrim placed over images so text is readable:

```css
.scrim-bottom {
  background: linear-gradient(to top, rgb(0 0 0 / 0.7) 0%, transparent 100%);
}
```

Use over hero images, video backgrounds, and card images with overlay text.

### 17.3 Frost / Blur Overlay

```css
.overlay-frost {
  background: rgb(var(--ds-color-background-rgb) / 0.6);
  backdrop-filter: blur(12px) saturate(180%);
  -webkit-backdrop-filter: blur(12px) saturate(180%);
}
```

---

## 18. Color Mixing & Manipulation

### 18.1 CSS `color-mix()`

The modern way to derive colors without preprocessors:

```css
/* Lighten */
color-mix(in oklab, var(--ds-color-accent) 80%, white)

/* Darken */
color-mix(in oklab, var(--ds-color-accent) 80%, black)

/* Tint with surface */
color-mix(in oklab, var(--ds-color-accent) 10%, var(--ds-color-surface))

/* Desaturate */
color-mix(in oklch, var(--ds-color-accent) 70%, gray)

/* Blend two brand colors */
color-mix(in oklch, var(--ds-palette-brand-400) 50%, var(--ds-palette-brand-700))
```

### 18.2 Use Cases for Mixing

| Effect | Formula |
|--------|---------|
| Hover state | `accent 86%, white` (lighten slightly) |
| Active/pressed | `accent 78%, black` (darken slightly) |
| Disabled | `accent 50%, gray` (desaturate) |
| Subtle background | `accent 8%, surface` (barely tinted) |
| Selected row | `accent 6%, surface` (very subtle tint) |
| Muted text | `foreground 60%, background` (reduce contrast) |

### 18.3 Rules

- Always specify color space: `in oklab` or `in oklch`. Default (`in srgb`) produces perceptually uneven results.
- Keep mixing consistent across the entire DS — use the same space everywhere.
- Don't over-mix — 2 levels of mixing max. Deeply nested `color-mix()` is hard to debug.

---

## 19. Data Visualization Colors

### 19.1 Categorical Palette

For charts with distinct categories (bar charts, pie charts, legends):

Provide **8–12 visually distinct colors** that:
- Are distinguishable by colorblind users.
- Have similar perceived brightness.
- Work on both light and dark backgrounds.
- Don't include red/green as the primary distinguishing pair.

| Slot | Purpose |
|------|---------|
| `--ds-chart-1` | First series |
| `--ds-chart-2` | Second series |
| `--ds-chart-3` | Third series |
| ... | Up to 8–12 |

### 19.2 Sequential Palette

For values from low → high (heatmaps, choropleth):

Single-hue ramp from light to dark:
```
--ds-seq-1: oklch(0.95 0.03 250)   lightest
--ds-seq-2: oklch(0.85 0.08 250)
--ds-seq-3: oklch(0.70 0.14 250)
--ds-seq-4: oklch(0.55 0.20 250)
--ds-seq-5: oklch(0.40 0.25 250)   darkest
```

### 19.3 Diverging Palette

For values that diverge from a midpoint (positive/negative, above/below average):

```
danger-700 → danger-400 → neutral-300 → success-400 → success-700
```

### 19.4 Rules

- Never rely solely on color to convey meaning — add labels, patterns, or shapes.
- Test with color blindness simulation (protanopia, deuteranopia, tritanopia).
- Maximum 6–8 categorical colors before they become indistinguishable.

---

## 20. Color Utility Classes

### 20.1 Text Color Utilities

| Class | Token |
|-------|-------|
| `.text-foreground` | `--ds-color-foreground` |
| `.text-secondary` | `--ds-color-foreground-secondary` |
| `.text-muted` | `--ds-color-foreground-muted` |
| `.text-inverse` | `--ds-color-foreground-inverse` |
| `.text-accent` | `--ds-color-accent` |
| `.text-success` | `--ds-color-success` |
| `.text-warning` | `--ds-color-warning` |
| `.text-danger` | `--ds-color-danger` |
| `.text-info` | `--ds-color-info` |
| `.text-inherit` | `inherit` |
| `.text-current` | `currentColor` |

### 20.2 Background Color Utilities

| Class | Token |
|-------|-------|
| `.bg-background` | `--ds-color-background` |
| `.bg-surface` | `--ds-color-surface` |
| `.bg-surface-2` | `--ds-color-surface-2` |
| `.bg-accent` | `--ds-color-accent` |
| `.bg-accent-muted` | `--ds-color-accent-muted` |
| `.bg-success` | `--ds-color-success-bg` |
| `.bg-warning` | `--ds-color-warning-bg` |
| `.bg-danger` | `--ds-color-danger-bg` |
| `.bg-info` | `--ds-color-info-bg` |
| `.bg-transparent` | `transparent` |

### 20.3 Border Color Utilities

| Class | Token |
|-------|-------|
| `.border-default` | `--ds-color-border` |
| `.border-strong` | `--ds-color-border-strong` |
| `.border-muted` | `--ds-color-border-muted` |
| `.border-accent` | `--ds-color-accent` |
| `.border-error` | `--ds-color-danger` |
| `.border-success` | `--ds-color-success` |

---

## 21. Color Tokens Summary

### Complete Token Inventory

```
PALETTE: NEUTRAL RAMP
  --ds-palette-neutral-{0,50,100,200,300,400,500,600,700,800,850,900,950}

PALETTE: BRAND RAMP
  --ds-palette-brand-{50,100,200,300,400,500,600,700,800,900,950}

PALETTE: STATUS RAMPS
  --ds-palette-success-{50..900}
  --ds-palette-warning-{50..900}
  --ds-palette-danger-{50..900}
  --ds-palette-info-{50..900}

PALETTE: EXTENDED (optional)
  --ds-palette-teal-{50..900}
  --ds-palette-purple-{50..900}
  --ds-palette-pink-{50..900}
  --ds-palette-orange-{50..900}

SEMANTIC: BACKGROUNDS
  --ds-color-background
  --ds-color-surface
  --ds-color-surface-2
  --ds-color-surface-3
  --ds-color-surface-raised
  --ds-color-surface-sunken
  --ds-color-surface-overlay
  --ds-color-surface-interactive

SEMANTIC: FOREGROUND / TEXT
  --ds-color-foreground
  --ds-color-foreground-secondary
  --ds-color-foreground-muted
  --ds-color-foreground-disabled
  --ds-color-foreground-inverse
  --ds-color-foreground-on-accent
  --ds-color-text-success
  --ds-color-text-warning
  --ds-color-text-danger
  --ds-color-text-info

SEMANTIC: ACCENT
  --ds-color-accent
  --ds-color-accent-hover
  --ds-color-accent-active
  --ds-color-accent-muted
  --ds-color-accent-foreground
  --ds-color-accent-rgb

SEMANTIC: BORDER
  --ds-color-border
  --ds-color-border-strong
  --ds-color-border-muted
  --ds-color-border-focus
  --ds-color-border-error
  --ds-color-border-success
  --ds-color-focus-ring

SEMANTIC: STATUS
  --ds-color-success, --ds-color-success-bg, --ds-color-success-border, --ds-color-success-rgb
  --ds-color-warning, --ds-color-warning-bg, --ds-color-warning-border, --ds-color-warning-rgb
  --ds-color-danger,  --ds-color-danger-bg,  --ds-color-danger-border,  --ds-color-danger-rgb
  --ds-color-info,    --ds-color-info-bg,    --ds-color-info-border,    --ds-color-info-rgb

SEMANTIC: OVERLAY
  --ds-color-overlay
  --ds-color-overlay-light
  --ds-color-overlay-heavy

OPACITY SCALE
  --ds-opacity-{0,5,10,20,30,40,50,60,70,80,90,100}

GRADIENTS
  --ds-gradient-brand
  --ds-gradient-subtle
  --ds-gradient-hero
  --ds-gradient-surface
  --ds-gradient-skeleton

DATA VISUALIZATION
  --ds-chart-{1..12}          categorical
  --ds-seq-{1..5}             sequential
  --ds-diverge-neg-{1..3}     diverging negative
  --ds-diverge-pos-{1..3}     diverging positive
  --ds-diverge-mid            diverging midpoint
```

---

*This chapter defines the complete color vocabulary for a Design System. Every token, semantic mapping, and utility above should be present in the implemented DS for full coverage.*
