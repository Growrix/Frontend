# 06 — Borders & Radius

> Everything a Design System must define for borders, outlines, dividers, and corner rounding. This chapter covers border widths, styles, semantic border colors, radius scales, pill and circle shapes, outline patterns, divider rules, and decorative borders.

---

## Table of Contents

1. [Border Philosophy](#1-border-philosophy)
2. [Border Width Scale](#2-border-width-scale)
3. [Border Style](#3-border-style)
4. [Semantic Border Colors](#4-semantic-border-colors)
5. [Radius Scale](#5-radius-scale)
6. [Radius Application Rules](#6-radius-application-rules)
7. [Special Shapes](#7-special-shapes)
8. [Nested Radius Calculation](#8-nested-radius-calculation)
9. [Dividers & Separators](#9-dividers--separators)
10. [Outline Patterns](#10-outline-patterns)
11. [Decorative Borders](#11-decorative-borders)
12. [Border in Dark Mode](#12-border-in-dark-mode)
13. [Ring & Border Combination](#13-ring--border-combination)
14. [Responsive Radius](#14-responsive-radius)
15. [Border Utility Classes](#15-border-utility-classes)
16. [Border & Radius Tokens Summary](#16-border--radius-tokens-summary)

---

## 1. Border Philosophy

### 1.1 Why Borders Matter

Borders define **edges, separation, and containment**:
- They separate adjacent sections (dividers).
- They outline interactive elements (inputs, cards, buttons).
- They communicate state (focus, error, selected).
- Radius communicates personality (sharp = serious, rounded = friendly).

### 1.2 Core Rules

1. **Border is optional** — many elements are defined by shadow and background alone.
2. **Border complements shadow** — use border OR shadow for containment, rarely both at full intensity.
3. **Border communicates state** — interactive elements change border on hover, focus, error.
4. **Radius is personality** — consistent radius across the system creates coherence.
5. **Use `border-color` tokens** — never hardcode colors.

---

## 2. Border Width Scale

### 2.1 Token Definitions

| Token | Value | Use Case |
|-------|-------|----------|
| `--ds-border-0` | 0px | Remove border |
| `--ds-border-hairline` | 0.5px | Ultra-thin separator (retina only) |
| `--ds-border-thin` | 1px | **Default** — cards, inputs, dividers |
| `--ds-border-medium` | 2px | Emphasis — active tabs, selected items, focus rings |
| `--ds-border-thick` | 3px | Heavy emphasis — active navigation, thick dividers |
| `--ds-border-heavy` | 4px | Decorative — branded accents, section highlights |

### 2.2 Rules

- **1px is the default** — most UI elements use 1px borders.
- **2px for state indication** — active, selected, focused.
- **3px+ is decorative only** — never functional.
- **Avoid fractional widths** except `0.5px` on retina (renders as true hairline on 2x+ displays).

---

## 3. Border Style

### 3.1 Available Styles

| Style | Visual | Use Case |
|-------|--------|----------|
| `solid` | Continuous line | **Default** — everything |
| `dashed` | Dashed line | Drop zones, upload areas, optional boundaries |
| `dotted` | Dotted line | Suggested placement, secondary separators |
| `double` | Two parallel lines | Decorative headings, special sections |
| `none` | No border | Remove border |
| `hidden` | No border (table layout) | Table cell border resolution |

### 3.2 Rules

- **`solid` is the only style for interactive elements** — inputs, buttons, cards.
- **`dashed` for user action zones** — where the user should drag, drop, or add content.
- **Avoid `dotted`** in modern DS — appears dated. If used, keep to very specific use cases.
- **`double` is decorative only.**

---

## 4. Semantic Border Colors

### 4.1 Border Color Hierarchy

| Token | Purpose | Example |
|-------|---------|---------|
| `--ds-border-default` | Standard border — cards, inputs, containers | `rgb(0 0 0 / 0.1)` or `gray-200` |
| `--ds-border-subtle` | Lighter than default — dividers, separators | `gray-100` |
| `--ds-border-strong` | Darker than default — emphasis, contrast | `gray-400` |
| `--ds-border-muted` | Barely visible — table rows, low-contrast | `gray-50` |

### 4.2 Interactive Border Colors

| Token | State |
|-------|-------|
| `--ds-border-hover` | Hovered element |
| `--ds-border-focus` | Focused element (often accent color) |
| `--ds-border-active` | Currently active/pressed |
| `--ds-border-selected` | Selected item (checkbox, list item, tab) |
| `--ds-border-disabled` | Disabled element |

### 4.3 Status Border Colors

| Token | Status |
|-------|--------|
| `--ds-border-success` | Valid input, success state |
| `--ds-border-warning` | Warning state |
| `--ds-border-danger` | Error, invalid input |
| `--ds-border-info` | Informational |

---

## 5. Radius Scale

### 5.1 Token Definitions

| Token | Value | Use Case |
|-------|-------|----------|
| `--ds-radius-none` | 0 | Sharp corners (tables, full-bleed, geometric) |
| `--ds-radius-xs` | 2px | Tiny rounding — tags, label badges |
| `--ds-radius-sm` | 4px | Small rounding — buttons (compact), tooltips |
| `--ds-radius-md` | 6–8px | **Default** — cards, inputs, menus |
| `--ds-radius-lg` | 12px | Larger rounding — modals, dialog, panels |
| `--ds-radius-xl` | 16px | Feature cards, promotional blocks |
| `--ds-radius-2xl` | 24px | Hero sections, large feature cards |
| `--ds-radius-full` | 9999px | Pills, chips, avatar circles |

### 5.2 Choosing a Radius "Personality"

| Radius Range | Personality | Industries |
|-------------|-------------|-----------|
| 0–2px | Sharp, technical, serious | Finance, law, enterprise |
| 4–8px | Balanced, modern, professional | SaaS, productivity, business |
| 12–16px | Friendly, approachable | Consumer apps, social, health |
| 20px+ | Playful, soft, rounded | Kids, creative, entertainment |

---

## 6. Radius Application Rules

### 6.1 Component-to-Radius Mapping

| Component | Typical Radius |
|-----------|---------------|
| Button | `radius-sm` or `radius-md` |
| Input / Select | `radius-md` |
| Card | `radius-md` or `radius-lg` |
| Modal / Dialog | `radius-lg` or `radius-xl` |
| Tooltip | `radius-sm` |
| Dropdown menu | `radius-md` |
| Avatar | `radius-full` (circle) or `radius-md` (square) |
| Badge / Tag | `radius-full` (pill) or `radius-xs` |
| Toast / Snackbar | `radius-md` or `radius-lg` |
| Toggle track | `radius-full` |
| Chip | `radius-full` |
| Tabs | `radius-sm` or `radius-md` (top only) |

### 6.2 Partial Radius

Some elements round only certain corners:

```css
.tab {
  border-radius: var(--ds-radius-md) var(--ds-radius-md) 0 0; /* top only */
}

.drawer-left {
  border-radius: 0 var(--ds-radius-lg) var(--ds-radius-lg) 0; /* right side only */
}

.bottom-sheet {
  border-radius: var(--ds-radius-xl) var(--ds-radius-xl) 0 0; /* top only */
}
```

---

## 7. Special Shapes

### 7.1 Circle

```css
.circle {
  border-radius: 50%;
  aspect-ratio: 1;
}
```

Use for: avatars, icon buttons, status dots.

### 7.2 Pill / Stadium

```css
.pill {
  border-radius: 9999px; /* or var(--ds-radius-full) */
}
```

Use for: tags, chips, badges, pill-shaped buttons.

### 7.3 Squircle (iOS-style)

True squircles are not native CSS. Approximate with SVG clip-path or `border-radius` with slight adjustment:

```css
.squircle {
  border-radius: 22%; /* Approximation */
}
```

For true squircles, use `clip-path: url(#squircle-svg)` with a superellipse SVG path.

### 7.4 Blob / Organic

Irregular organic shapes using `border-radius` with 8 values:

```css
.blob {
  border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%;
}
```

Use only for decorative elements, never for interactive UI.

---

## 8. Nested Radius Calculation

### 8.1 The Problem

When an element with radius contains a child with radius, the inner radius must be smaller to maintain visual consistency:

```
Bad:  Parent radius 12px, child radius 12px → inner corners look too round
Good: Parent radius 12px, child radius 12px - padding = 8px
```

### 8.2 The Formula

```
inner radius = outer radius − padding (gap between parent and child)
```

If the result is negative, use 0.

### 8.3 Implementation

```css
.card {
  --card-radius: var(--ds-radius-lg);  /* 12px */
  --card-padding: var(--ds-space-4);   /* 16px */
  border-radius: var(--card-radius);
  padding: var(--card-padding);
}

.card > .card-media {
  border-radius: calc(var(--card-radius) - var(--card-padding));
  /* 12px - 16px = 0 → clips correctly */
}
```

If `max()` is desired to prevent negative:

```css
border-radius: max(0px, calc(var(--card-radius) - var(--card-padding)));
```

---

## 9. Dividers & Separators

### 9.1 Horizontal Divider

```css
.divider {
  border: none;
  border-top: var(--ds-border-thin) solid var(--ds-border-subtle);
  margin-block: var(--ds-space-4);
}
```

### 9.2 Vertical Divider

```css
.divider-vertical {
  width: var(--ds-border-thin);
  align-self: stretch;
  background: var(--ds-border-subtle);
}
```

### 9.3 Divider Variants

| Variant | Style |
|---------|-------|
| **Default** | Full-width, subtle color |
| **Inset** | Indented from one or both sides |
| **Label** | Has a label/text in the middle (e.g., "OR") |
| **Dashed** | Dashed line for informal separation |
| **Gradient** | Fades from opaque center to transparent edges |
| **Section** | Thicker, wider spacing — marks major section breaks |

### 9.4 Semantic HTML

- Use `<hr>` for thematic breaks in content.
- Use `role="separator"` on decorative dividers.
- Use `aria-orientation="vertical"` for vertical separators.

---

## 10. Outline Patterns

### 10.1 CSS Outline vs Border

| Property | Outline | Border |
|----------|---------|--------|
| Affects layout | No | Yes (unless `box-sizing: border-box`) |
| Follows border-radius | Yes (modern browsers) | Yes |
| Can be offset | Yes (`outline-offset`) | No |
| Multiple values | No | No |
| Animatable | Yes | Yes |

### 10.2 Focus Outline Standard

```css
:focus-visible {
  outline: 2px solid var(--ds-color-accent);
  outline-offset: 2px;
}
```

### 10.3 When to Use Outline vs Border

- **Focus indicators** → `outline` (doesn't shift layout).
- **Component boundaries** → `border` (part of the visual design).
- **Debug mode** → `outline` (doesn't cause layout shift while debugging).

---

## 11. Decorative Borders

### 11.1 Gradient Borders

CSS hasn't had native gradient borders, but use `border-image` or pseudo-element technique:

```css
/* border-image technique */
.gradient-border {
  border: 2px solid transparent;
  border-image: linear-gradient(135deg, var(--ds-color-accent), var(--ds-palette-brand-500)) 1;
}

/* Pseudo-element technique (supports radius) */
.gradient-border-rounded {
  position: relative;
  border-radius: var(--ds-radius-md);
}

.gradient-border-rounded::before {
  content: "";
  position: absolute;
  inset: 0;
  padding: 2px;
  border-radius: inherit;
  background: linear-gradient(135deg, var(--ds-color-accent), var(--ds-palette-brand-500));
  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
}
```

### 11.2 Animated Gradient Border

Combine gradient border with `background-size` animation for a rotating/flowing border.

### 11.3 Accent Bar

A thick color bar on one side of a card or section:

```css
.accent-bar-left {
  border-left: 4px solid var(--ds-color-accent);
}

.accent-bar-top {
  border-top: 3px solid var(--ds-color-accent);
}
```

---

## 12. Border in Dark Mode

### 12.1 Strategy

In dark mode, borders often need to be **lighter** (white at low opacity) rather than darker:

```css
[data-theme="dark"] {
  --ds-border-default: rgb(255 255 255 / 0.1);
  --ds-border-subtle: rgb(255 255 255 / 0.06);
  --ds-border-strong: rgb(255 255 255 / 0.2);
}
```

### 12.2 Border vs Shadow in Dark Mode

- **Dark mode makes shadows nearly invisible** → borders become more important.
- Use thin borders (`1px`) to define card edges where shadows fail.
- Combine subtle border + subtle shadow for best depth:

```css
.card-dark {
  border: 1px solid rgb(255 255 255 / 0.08);
  box-shadow: 0 2px 8px rgb(0 0 0 / 0.3);
}
```

---

## 13. Ring & Border Combination

### 13.1 Pattern

Some elements need both a regular border AND a focus ring. Use `box-shadow` for the ring to avoid layout shift:

```css
.input {
  border: 1px solid var(--ds-border-default);
}

.input:focus {
  border-color: var(--ds-color-accent);
  box-shadow: 0 0 0 3px rgb(var(--ds-color-accent-rgb) / 0.2);
}
```

### 13.2 Stacked Ring Pattern

Gap between element and ring:

```css
.element:focus-visible {
  outline: 2px solid var(--ds-color-accent);
  outline-offset: 2px;
}
```

---

## 14. Responsive Radius

### 14.1 Why

On mobile, very large radii can consume too much space or look disproportionate:

```css
.card {
  border-radius: var(--ds-radius-md);
}

@media (min-width: 768px) {
  .card {
    border-radius: var(--ds-radius-lg);
  }
}
```

### 14.2 Full-Bleed Mobile Pattern

Cards that are full-width on mobile should have no radius (edges touch screen edges):

```css
.card {
  border-radius: 0;
}

@media (min-width: 640px) {
  .card {
    border-radius: var(--ds-radius-md);
  }
}
```

---

## 15. Border Utility Classes

### 15.1 Border Width

| Class | Width |
|-------|-------|
| `.border-0` | 0 |
| `.border` | 1px (default) |
| `.border-2` | 2px |
| `.border-3` | 3px |
| `.border-4` | 4px |

### 15.2 Border Side

| Class | Side |
|-------|------|
| `.border-t` | Top only |
| `.border-r` | Right only |
| `.border-b` | Bottom only |
| `.border-l` | Left only |
| `.border-x` | Left + right |
| `.border-y` | Top + bottom |

### 15.3 Radius

| Class | Radius |
|-------|--------|
| `.rounded-none` | 0 |
| `.rounded-xs` | 2px |
| `.rounded-sm` | 4px |
| `.rounded` | 6-8px (default) |
| `.rounded-lg` | 12px |
| `.rounded-xl` | 16px |
| `.rounded-2xl` | 24px |
| `.rounded-full` | 9999px |

### 15.4 Partial Radius

| Class | Corners |
|-------|---------|
| `.rounded-t-*` | Top-left + top-right |
| `.rounded-b-*` | Bottom-left + bottom-right |
| `.rounded-l-*` | Top-left + bottom-left |
| `.rounded-r-*` | Top-right + bottom-right |
| `.rounded-tl-*` | Top-left only |
| `.rounded-tr-*` | Top-right only |
| `.rounded-bl-*` | Bottom-left only |
| `.rounded-br-*` | Bottom-right only |

---

## 16. Border & Radius Tokens Summary

### Complete Token Inventory

```
BORDER WIDTH
  --ds-border-0               0px
  --ds-border-hairline        0.5px
  --ds-border-thin            1px (default)
  --ds-border-medium          2px
  --ds-border-thick           3px
  --ds-border-heavy           4px

BORDER STYLE
  solid (default), dashed, dotted, double, none

BORDER COLORS — Neutral
  --ds-border-default         standard edge color
  --ds-border-subtle          lighter, dividers
  --ds-border-strong          darker, emphasis
  --ds-border-muted           barely visible

BORDER COLORS — Interactive
  --ds-border-hover
  --ds-border-focus
  --ds-border-active
  --ds-border-selected
  --ds-border-disabled

BORDER COLORS — Status
  --ds-border-success
  --ds-border-warning
  --ds-border-danger
  --ds-border-info

RADIUS SCALE
  --ds-radius-none            0
  --ds-radius-xs              2px
  --ds-radius-sm              4px
  --ds-radius-md              6-8px (default)
  --ds-radius-lg              12px
  --ds-radius-xl              16px
  --ds-radius-2xl             24px
  --ds-radius-full            9999px (pill/circle)

UTILITY CLASSES
  Border:   .border-{0,1,2,3,4}, .border-{t,r,b,l,x,y}
  Radius:   .rounded-{none,xs,sm,md,lg,xl,2xl,full}
  Partial:  .rounded-{t,b,l,r,tl,tr,bl,br}-{size}
  Dividers: .divider, .divider-vertical, .divider-inset, .divider-label
```

---

*This chapter defines the complete border and radius vocabulary for a Design System. Every width, color, radius scale, divider variant, and utility class above should be present in the implemented DS.*
