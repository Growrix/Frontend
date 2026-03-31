# 07 — Iconography

> Everything a Design System must define for icons — sizing, stroke conventions, icon grids, naming, categories, delivery formats, accessibility, animated icons, and icon composition patterns.

---

## Table of Contents

1. [Icon Philosophy](#1-icon-philosophy)
2. [Icon Grid & Keyshapes](#2-icon-grid--keyshapes)
3. [Size Scale](#3-size-scale)
4. [Stroke vs Fill](#4-stroke-vs-fill)
5. [Stroke Width Conventions](#5-stroke-width-conventions)
6. [Icon Naming Convention](#6-icon-naming-convention)
7. [Icon Categories](#7-icon-categories)
8. [Icon Delivery Format](#8-icon-delivery-format)
9. [SVG Optimization](#9-svg-optimization)
10. [Color & Theming](#10-color--theming)
11. [Animated Icons](#11-animated-icons)
12. [Icon + Text Alignment](#12-icon--text-alignment)
13. [Icon Buttons](#13-icon-buttons)
14. [Accessibility](#14-accessibility)
15. [Icon Composition Patterns](#15-icon-composition-patterns)
16. [Icon Library Management](#16-icon-library-management)
17. [Icon Tokens Summary](#17-icon-tokens-summary)

---

## 1. Icon Philosophy

### 1.1 Why Icons Need Rules

Without consistent rules, icon sets become visual chaos — different stroke widths, optical sizes, alignment, and stylistic choices make the UI feel unprofessional.

### 1.2 Core Principles

1. **Consistency > creativity** — every icon should look like it belongs to the same family.
2. **Clarity at small sizes** — icons must be legible at 16×16px.
3. **Pixel-perfect alignment** — strokes and shapes snap to the pixel grid.
4. **Purposeful** — every icon communicates a clear concept; decorative icons are optional.
5. **Accessible** — all functional icons need text alternatives.
6. **Themeable** — icons inherit color from CSS (`currentColor`).

---

## 2. Icon Grid & Keyshapes

### 2.1 The Grid

All icons are drawn on a consistent grid, typically:
- **24×24** is the industry standard (Google Material, Lucide, Heroicons).
- Grid includes a **2px padding zone** (safe area) — icon content fits within the inner 20×20.
- This ensures icons never touch the bounding box edge.

```
24×24 grid:
┌──────────────────────┐
│  2px padding zone    │
│  ┌──────────────┐    │
│  │ 20×20 live   │    │
│  │    area      │    │
│  └──────────────┘    │
│                      │
└──────────────────────┘
```

### 2.2 Keyshapes

Standard geometric shapes that normalize optical weight:

| Shape | Dimensions (in 20px live area) |
|-------|-------------------------------|
| Circle | 20×20 diameter |
| Square | 18×18 (squares look larger than circles optically) |
| Landscape rectangle | 20×16 |
| Portrait rectangle | 16×20 |

Icons that don't fit a keyshape should be optically balanced within the live area.

### 2.3 Optical Alignment

- Circles and triangles extend slightly beyond the grid to appear the same size as squares (optical compensation).
- Play icons (triangles) are shifted slightly right to center visually.
- Pointed shapes extend 1–2px beyond the grid boundary.

---

## 3. Size Scale

### 3.1 Size Tokens

| Token | Size | Use Case |
|-------|------|----------|
| `--ds-icon-xs` | 12px | Inline text badges, micro indicators |
| `--ds-icon-sm` | 16px | Compact UI, table actions, small buttons |
| `--ds-icon-md` | 20px | **Default** — buttons, inputs, navigation |
| `--ds-icon-lg` | 24px | Primary actions, card headers, section headers |
| `--ds-icon-xl` | 32px | Feature highlights, empty states |
| `--ds-icon-2xl` | 48px | Hero sections, onboarding illustrations |
| `--ds-icon-3xl` | 64px | Large empty states, full-page status |

### 3.2 Sizing Rules

- **Match icon to text size**: Icons next to text should be optically similar in height.
- **Touch targets**: Icon buttons must be at least 44×44px (touch target), even if the icon is 20px.
- **Don't scale icons arbitrarily** — use the defined scale. Arbitrary sizes break consistency.

---

## 4. Stroke vs Fill

### 4.1 Styles

| Style | Description | When to Use |
|-------|-------------|-------------|
| **Outlined** (stroke) | Paths drawn with strokes, no fill | Default UI state, navigation, toolbars |
| **Filled** (solid) | Shapes filled solid | Active/selected states, emphasis |
| **Duotone** | Two-tone (primary stroke + secondary fill at lower opacity) | Feature illustrations, marketing |
| **Thin** | Lighter stroke weight | Decorative, large sizes |

### 4.2 State Toggling

Many icon sets provide outlined and filled variants for state communication:

| State | Icon Style |
|-------|------------|
| Default / inactive | Outlined |
| Active / selected | Filled |
| Hover | Outlined with accent color |

Example: Heart icon — outlined (not liked), filled (liked). Star — outlined (not starred), filled (starred).

---

## 5. Stroke Width Conventions

### 5.1 Standard Stroke Widths

On a 24×24 grid:

| Weight | Stroke Width | Feel |
|--------|-------------|------|
| **Thin** | 1px | Light, elegant, large-size display |
| **Regular** | 1.5px | **Standard** — most icon sets |
| **Medium** | 2px | Bolder, high contrast, small sizes |
| **Bold** | 2.5–3px | Heavy, very small sizes, thick style |

### 5.2 Rules

- **All icons in the set use the same stroke width.** Mixing widths within one icon set is a critical mistake.
- Stroke width should be **consistent regardless of icon size** — when scaling up, the stroke scales proportionally.
- **Stroke caps**: `round` (for friendly) or `butt` (for technical).
- **Stroke joins**: `round` (friendly) or `miter` (sharp/technical).
- **Closed shapes** should use the same stroke width as open paths.

---

## 6. Icon Naming Convention

### 6.1 Naming Rules

1. Use **kebab-case**: `arrow-right`, `chevron-down`, `user-plus`.
2. Name by **concept**, not by appearance: `close` not `x-mark`, `search` not `magnifying-glass`.
3. Include **direction** as suffix: `arrow-up`, `arrow-down`, `arrow-left`, `arrow-right`.
4. Include **variant** as suffix: `heart`, `heart-filled`, `heart-broken`.
5. Include **size modifier** only when the icon is specifically designed for that size: `chevron-down-sm`.
6. Group with **prefix** for categories: `file-text`, `file-image`, `file-pdf`.

### 6.2 Example Naming

```
arrow-up, arrow-down, arrow-left, arrow-right
chevron-up, chevron-down, chevron-left, chevron-right
check, check-circle, check-square
x, x-circle, x-square
user, user-plus, user-minus, users
file, file-text, file-image, file-plus
heart, heart-filled
star, star-filled, star-half
eye, eye-off
bell, bell-off, bell-ring
```

---

## 7. Icon Categories

### 7.1 Standard Categories

| Category | Examples |
|----------|---------|
| **Navigation** | arrow-*, chevron-*, menu, home, back |
| **Action** | plus, minus, edit, delete, copy, paste, download, upload, share |
| **Status** | check, x, alert-triangle, alert-circle, info, help |
| **Communication** | mail, message, phone, video, send |
| **Media** | play, pause, stop, volume, mic, camera, image |
| **Social** | heart, star, thumb-up, thumb-down, bookmark, flag |
| **File & Data** | file, folder, database, chart, table, code |
| **User** | user, users, user-plus, settings, lock, unlock, key |
| **Commerce** | cart, bag, credit-card, tag, receipt |
| **Weather** | sun, moon, cloud, rain, snow, wind |
| **Device** | monitor, smartphone, tablet, printer, wifi, bluetooth |
| **Layout** | grid, list, columns, sidebar, maximize, minimize |
| **Misc** | search, filter, sort, refresh, external-link, link, clock, calendar, map-pin |

### 7.2 Minimum Set

A DS should launch with at least 100–150 icons covering the 8 core categories. Full DS targets 300–500+ icons.

---

## 8. Icon Delivery Format

### 8.1 Format Comparison

| Format | Scalable | Styleable (CSS) | Animated | File Size | Recommendation |
|--------|----------|-----------------|----------|-----------|---------------|
| **Inline SVG** | Yes | Yes (currentColor) | Yes (CSS/SMIL) | Small | **Primary choice** |
| **SVG sprite** | Yes | Partial | Limited | Bundle size | Good for HTTP/1.1 |
| **Icon font** | Yes | Color only | No | Medium | **Legacy — avoid** |
| **PNG/WebP** | No | No | No | Large per size | Avoid for UI icons |
| **SVG as React component** | Yes | Yes | Yes | Small (tree-shakeable) | **Best for React** |

### 8.2 React Component Pattern

```tsx
interface IconProps {
  size?: number | string;
  color?: string;
  strokeWidth?: number;
  className?: string;
  "aria-label"?: string;
}

function ChevronDown({ size = 24, color = "currentColor", strokeWidth = 1.5, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M6 9l6 6 6-6" />
    </svg>
  );
}
```

### 8.3 Icon Barrel Export

```tsx
// icons/index.ts
export { ChevronDown } from "./chevron-down";
export { ChevronUp } from "./chevron-up";
export { ArrowRight } from "./arrow-right";
// ...
```

---

## 9. SVG Optimization

### 9.1 Rules

1. **Remove metadata**: xmlns:xlink, xml:space, editor comments.
2. **Remove unnecessary groups**: Flatten `<g>` elements without attributes.
3. **Simplify paths**: Reduce decimal precision to 2 decimal places.
4. **Remove default attributes**: `fill="none"` on a `<g>` that has no fill child.
5. **Normalize viewBox**: Always `0 0 24 24` (or your grid size).
6. **Use `currentColor`**: Set `stroke="currentColor"` for CSS color inheritance.

### 9.2 Tools

- **SVGO** (CLI/plugin): Industry standard SVG optimizer.
- **SVG OMG** (web): Visual SVGO interface.
- **Figma export settings**: Export at 1x, stroke aligned to inside, flatten layers.

### 9.3 Ideal SVG Output

```svg
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
     fill="none" stroke="currentColor" stroke-width="1.5"
     stroke-linecap="round" stroke-linejoin="round">
  <path d="M6 9l6 6 6-6"/>
</svg>
```

---

## 10. Color & Theming

### 10.1 `currentColor` Inheritance

Icons should use `currentColor` so they automatically match the text color of their parent:

```css
.button {
  color: var(--ds-color-fg);
}

/* Icon inside inherits the button's color automatically */
.button svg {
  color: inherit; /* or just don't override — currentColor flows through */
}
```

### 10.2 Multi-Color Icons

For icons needing two colors (duotone), use CSS custom properties:

```svg
<svg>
  <path d="..." fill="var(--icon-primary, currentColor)" />
  <path d="..." fill="var(--icon-secondary, currentColor)" opacity="0.3" />
</svg>
```

### 10.3 Icon Color Tokens

| Token | Use |
|-------|-----|
| `--ds-icon-default` | Standard icon color (matches body text) |
| `--ds-icon-muted` | Secondary/decorative icons |
| `--ds-icon-accent` | Brand/active icons |
| `--ds-icon-success` | Success state |
| `--ds-icon-warning` | Warning state |
| `--ds-icon-danger` | Error/danger state |
| `--ds-icon-on-accent` | Icon on accent-colored background |

---

## 11. Animated Icons

### 11.1 Types

| Type | Description | Example |
|------|-------------|---------|
| **State morph** | Icon shape transitions between states | Hamburger → X, play → pause |
| **Micro feedback** | Brief animation on user action | Check appears with stroke-draw |
| **Continuous** | Loops while active | Loading spinner, processing |
| **Attention** | Draws the eye to an action | Bell ring, notification bounce |

### 11.2 Stroke Draw Animation

```css
.icon-check path {
  stroke-dasharray: 24;
  stroke-dashoffset: 24;
  animation: draw 0.4s var(--ds-ease-out) forwards;
}

@keyframes draw {
  to { stroke-dashoffset: 0; }
}
```

### 11.3 Icon Morphing

Morph between two icon shapes by animating path `d` attribute:

```css
.icon-morph path {
  transition: d 300ms var(--ds-ease-standard);
}
```

Or via the Web Animations API for complex morphs.

### 11.4 Spin Animation

```css
.icon-spinner {
  animation: spin 1s linear infinite;
}
```

### 11.5 Accessibility

- Animated icons MUST respect `prefers-reduced-motion`.
- Continuous animations should stop after a reasonable time or provide a pause mechanism.

---

## 12. Icon + Text Alignment

### 12.1 The Alignment Problem

Icons and text rarely align perfectly by default because:
- The icon's visual center may differ from its box center.
- Text baselines don't match icon centers.
- Different font sizes have different cap heights.

### 12.2 Alignment Techniques

```css
/* Flexbox alignment (recommended) */
.icon-text {
  display: inline-flex;
  align-items: center;
  gap: var(--ds-space-2);
}

/* Vertical-align fallback */
.icon-inline {
  vertical-align: -0.125em; /* Fine-tune per icon set */
}
```

### 12.3 Icon-to-Text Size Mapping

| Text Size | Icon Size | Gap |
|-----------|-----------|-----|
| 12px (caption) | 14–16px | 4px |
| 14px (body-sm) | 16–18px | 6px |
| 16px (body) | 20px | 8px |
| 18px (body-lg) | 22–24px | 8px |
| 20px (heading) | 24px | 8–12px |

---

## 13. Icon Buttons

### 13.1 Anatomy

```
┌─────────────────────┐
│     Padding          │
│   ┌───────────┐     │
│   │   Icon    │     │  Touch target: ≥ 44×44px
│   │  20×20    │     │  Visual size: varies
│   └───────────┘     │
│     Padding          │
└─────────────────────┘
```

### 13.2 Size Variants

| Variant | Icon Size | Total Button Size | Padding |
|---------|-----------|------------------|---------|
| Small | 16px | 32×32px | 8px |
| Default | 20px | 40×40px | 10px |
| Large | 24px | 48×48px | 12px |

### 13.3 Accessibility Requirements

- Always provide `aria-label` for icon-only buttons.
- Include visually hidden text as fallback.
- Focus indicator required (ring or outline).

---

## 14. Accessibility

### 14.1 Decorative vs Functional Icons

| Type | Rule |
|------|------|
| **Decorative** (next to text label) | `aria-hidden="true"`, role not needed |
| **Functional** (icon-only button) | `aria-label` on parent button, `aria-hidden="true"` on SVG |
| **Informational** (standalone, conveys meaning) | `role="img"` + `aria-label` on SVG |

### 14.2 Implementation

```tsx
{/* Decorative — text label is present */}
<button>
  <SearchIcon aria-hidden="true" />
  Search
</button>

{/* Functional — icon-only */}
<button aria-label="Search">
  <SearchIcon aria-hidden="true" />
</button>

{/* Informational — standalone status icon */}
<CheckCircleIcon role="img" aria-label="Completed" />
```

### 14.3 High Contrast Mode

- Icons using `stroke="currentColor"` automatically adapt.
- Icons with hardcoded fills may disappear in forced-colors mode.
- Test with Windows High Contrast.

---

## 15. Icon Composition Patterns

### 15.1 Badge on Icon

Small indicator dot or number overlaid on an icon:

```
┌────────┐
│  Icon  │●  ← notification badge (top-right)
│        │
└────────┘
```

### 15.2 Stacked / Compound Icons

Two icons combined to create a new concept:

```
file + plus = "add file"
user + check = "verified user"
```

Use layered SVG or composite React components.

### 15.3 Icon + Chevron

Common in nav and menus:

```
[folder icon] Documents  [chevron-right]
```

Chevron should be smaller than the primary icon and muted in color.

---

## 16. Icon Library Management

### 16.1 Source of Truth

- Maintain icon source files in a design tool (Figma, Sketch).
- Export pipeline: Design tool → SVG → SVGO optimization → React component generation.
- Automate with CI/CD pipelines.

### 16.2 Versioning

- Icons are part of the DS package — version them with the DS.
- Removed icons must be deprecated first (one major version) before deletion.
- New icons require review for consistency (grid, stroke, naming).

### 16.3 Custom Icon Guidelines

For product-specific icons that extend the DS set:
- Must follow the same grid (24×24, 2px padding).
- Must use the same stroke width and caps.
- Must use `currentColor`.
- Must be named following the convention.
- Must pass accessibility review.

---

## 17. Icon Tokens Summary

### Complete Token Inventory

```
SIZE SCALE
  --ds-icon-xs           12px
  --ds-icon-sm           16px
  --ds-icon-md           20px (default)
  --ds-icon-lg           24px
  --ds-icon-xl           32px
  --ds-icon-2xl          48px
  --ds-icon-3xl          64px

STROKE
  Standard stroke width: 1.5px on 24×24 grid
  Caps: round
  Joins: round

COLORS
  --ds-icon-default      matches body text
  --ds-icon-muted        secondary/decorative
  --ds-icon-accent       brand/active
  --ds-icon-success
  --ds-icon-warning
  --ds-icon-danger
  --ds-icon-on-accent    white/contrast on accent bg

GRID
  Canvas: 24×24
  Live area: 20×20 (2px padding)
  Keyshapes: circle 20px, square 18px, rect 20×16 / 16×20

FORMAT
  Primary: Inline SVG (React components)
  All icons use currentColor
  Optimized with SVGO

NAMING
  kebab-case
  concept-based (not appearance-based)
  direction suffix: -up, -down, -left, -right
  variant suffix: -filled, -outline
  category prefix: file-, user-, chart-

CATEGORIES (minimum)
  Navigation, Action, Status, Communication,
  Media, Social, File/Data, User, Commerce,
  Device, Layout, Misc
```

---

*This chapter defines the complete iconography vocabulary for a Design System. Every size token, stroke convention, color token, naming rule, and accessibility pattern above should be present in the implemented DS.*
