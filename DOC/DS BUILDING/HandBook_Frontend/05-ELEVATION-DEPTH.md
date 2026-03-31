# 05 — Elevation & Depth

> Everything a Design System must define for visual depth — box shadows, drop shadows, layered surfaces, elevation scales, and 3D transforms. This chapter establishes the rules that make flat screens feel spatially real.

---

## Table of Contents

1. [Elevation Philosophy](#1-elevation-philosophy)
2. [Shadow Anatomy](#2-shadow-anatomy)
3. [Elevation Scale](#3-elevation-scale)
4. [Shadow Token Design](#4-shadow-token-design)
5. [Layered Shadows](#5-layered-shadows)
6. [Inner Shadows (Inset)](#6-inner-shadows-inset)
7. [Ring Shadows (Focus & Selection)](#7-ring-shadows-focus--selection)
8. [Colored & Branded Shadows](#8-colored--branded-shadows)
9. [Surface Elevation System](#9-surface-elevation-system)
10. [Dark Mode Shadows](#10-dark-mode-shadows)
11. [Glassmorphism & Backdrop Blur](#11-glassmorphism--backdrop-blur)
12. [Neumorphism Depth](#12-neumorphism-depth)
13. [3D Transforms & Perspective](#13-3d-transforms--perspective)
14. [Drop Shadow vs Box Shadow](#14-drop-shadow-vs-box-shadow)
15. [Depth & Accessibility](#15-depth--accessibility)
16. [Performance Considerations](#16-performance-considerations)
17. [Elevation Utility Classes](#17-elevation-utility-classes)
18. [Elevation Tokens Summary](#18-elevation-tokens-summary)

---

## 1. Elevation Philosophy

### 1.1 Why Elevation Matters

Elevation communicates:
- **Hierarchy**: Elevated elements are more important or more interactive.
- **Interaction**: Cards lift when hovered; pressed buttons sink.
- **Layering**: Overlays sit above content; modals above overlays.
- **Spatial model**: Users intuitively understand that shadows = closer to them.

### 1.2 Core Rules

1. **Consistent light source** — all shadows cast from the same direction (typically top-left, or directly above).
2. **Higher = larger, softer, more offset** — elements "closer" have bigger, more diffuse shadows.
3. **Lower = smaller, sharper, less offset** — grounded elements have tight shadows.
4. **Surface color changes with elevation** — in dark mode, higher surfaces are lighter.
5. **Shadows stack with the surface system** — each elevation level corresponds to a surface color.
6. **Never use shadows alone for hierarchy** — combine with other cues (size, color, position).

---

## 2. Shadow Anatomy

### 2.1 Box-Shadow Properties

```
box-shadow: [offset-x] [offset-y] [blur-radius] [spread-radius] [color];
```

| Property | Effect | Typical Range |
|----------|--------|---------------|
| **offset-x** | Horizontal position | 0–24px |
| **offset-y** | Vertical position (direction of light) | 0–48px |
| **blur-radius** | Softness of the shadow | 0–64px |
| **spread-radius** | Size expansion/contraction | -12px to 24px |
| **color** | Shadow color (always semi-transparent) | `rgb(0 0 0 / 0.05–0.25)` |

### 2.2 Light Source Convention

Standard: **Light above, slightly left**

This means:
- `offset-x`: small positive or 0
- `offset-y`: positive (shadow falls downward)
- Larger Y offset than X offset

---

## 3. Elevation Scale

### 3.1 Standard Levels

| Level | Name | Use Case |
|-------|------|----------|
| 0 | `elevation-none` | Flat surfaces, table rows, page background |
| 1 | `elevation-xs` | Cards at rest, input fields, list items |
| 2 | `elevation-sm` | Card hover, raised buttons, navigation bars |
| 3 | `elevation-md` | Floating action buttons, dropdown menus, popovers |
| 4 | `elevation-lg` | Drawers, bottom sheets, side panels |
| 5 | `elevation-xl` | Modals, dialogs |
| 6 | `elevation-2xl` | Full-screen overlays, command palettes |

### 3.2 The Progression Rule

Each elevation level should be visibly distinct from its neighbors. The jump from level to level should be:
- **Exponential, not linear** — the difference between level 0→1 is subtle, but 4→5 is dramatic.
- Shadow offset, blur, and spread all increase along the scale.
- Color opacity may increase slightly at higher levels.

---

## 4. Shadow Token Design

### 4.1 Single-Layer Shadow Tokens

Simple but less realistic:

| Token | Value |
|-------|-------|
| `--ds-shadow-none` | `none` |
| `--ds-shadow-xs` | `0 1px 2px 0 rgb(0 0 0 / 0.05)` |
| `--ds-shadow-sm` | `0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.06)` |
| `--ds-shadow-md` | `0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.06)` |
| `--ds-shadow-lg` | `0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.05)` |
| `--ds-shadow-xl` | `0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.04)` |
| `--ds-shadow-2xl` | `0 25px 50px -12px rgb(0 0 0 / 0.25)` |

### 4.2 Shadow Color Abstraction

Instead of hardcoding `rgb(0 0 0 / ...)`, use a semantic token:

```css
--ds-shadow-color: 0 0 0;             /* Light mode */
--ds-shadow-color: 0 0 0;             /* Dark mode — still black but higher opacity */
--ds-shadow-color: 59 130 246;        /* Brand shadow */
```

Then reference: `rgb(var(--ds-shadow-color) / 0.1)`

---

## 5. Layered Shadows

### 5.1 Why Layer Shadows

Real objects cast multiple shadows because light scatters. A single `box-shadow` looks flat and artificial. Layering 2–4 shadows at different blur distances creates realism.

### 5.2 Layered Shadow Architecture

Each elevation uses 2–3 layers:

| Layer | Purpose | Properties |
|-------|---------|-----------|
| **Ambient** | Large, soft, diffuse — simulates scattered light | Large blur, large offset, low opacity |
| **Direct** | Medium, focused — simulates direct light source | Medium blur, medium offset, medium opacity |
| **Contact** | Tiny, sharp — simulates where object meets surface | Small blur, tiny offset, higher opacity |

### 5.3 Example: Multi-Layer Elevation

```css
/* Elevation 1 (card at rest): subtle lift */
--ds-shadow-xs:
  0 1px 1px rgb(0 0 0 / 0.04),   /* contact */
  0 2px 4px rgb(0 0 0 / 0.06);   /* direct */

/* Elevation 3 (dropdown/popover): clear float */
--ds-shadow-md:
  0 1px 2px rgb(0 0 0 / 0.04),   /* contact */
  0 4px 8px rgb(0 0 0 / 0.08),   /* direct */
  0 12px 24px rgb(0 0 0 / 0.06); /* ambient */

/* Elevation 5 (modal): dramatic lift */
--ds-shadow-xl:
  0 1px 3px rgb(0 0 0 / 0.04),   /* contact */
  0 8px 16px rgb(0 0 0 / 0.08),  /* direct */
  0 24px 48px rgb(0 0 0 / 0.12); /* ambient */
```

---

## 6. Inner Shadows (Inset)

### 6.1 Use Cases

- **Pressed states**: buttons that look sunken.
- **Input fields**: recessed input areas (skeumorphic style).
- **Wells/troughs**: visual containers that sit below the surface.
- **Toggle tracks**: the rail that a toggle thumb slides on.

### 6.2 Inset Shadow Tokens

| Token | Value | Use |
|-------|-------|-----|
| `--ds-shadow-inset-xs` | `inset 0 1px 2px rgb(0 0 0 / 0.06)` | Subtle recess |
| `--ds-shadow-inset-sm` | `inset 0 2px 4px rgb(0 0 0 / 0.1)` | Input fields |
| `--ds-shadow-inset-md` | `inset 0 4px 8px rgb(0 0 0 / 0.15)` | Deep wells |

---

## 7. Ring Shadows (Focus & Selection)

### 7.1 Focus Ring Pattern

Use `box-shadow` for focus rings (instead of `outline`) to get rounded corners and animation:

```css
--ds-ring-width: 2px;
--ds-ring-offset: 2px;
--ds-ring-color: var(--ds-color-accent);

.focus-ring {
  box-shadow:
    0 0 0 var(--ds-ring-offset) var(--ds-color-bg),        /* gap */
    0 0 0 calc(var(--ds-ring-offset) + var(--ds-ring-width)) var(--ds-ring-color); /* ring */
}
```

### 7.2 Outline vs Box-Shadow

| Technique | Pros | Cons |
|-----------|------|------|
| `outline` | Doesn't affect layout, respects `border-radius` in modern browsers | Historically no radius, can't animate easily |
| `box-shadow` | Animatable, respects radius, can layer with other shadows | Adds to box, clipped by `overflow: hidden` |
| `outline` + `outline-offset` | Modern best practice, simpler | Less control over multi-ring patterns |

### 7.3 Selection Ring

Selected items (cards, list rows) get a colored ring:

```css
.selected {
  box-shadow: 0 0 0 2px var(--ds-color-accent);
}
```

---

## 8. Colored & Branded Shadows

### 8.1 Concept

Colored shadows match the element's background, creating a "glow" effect that feels integrated:

```css
.card-primary {
  background: var(--ds-color-accent);
  box-shadow: 0 8px 24px rgb(var(--ds-color-accent-rgb) / 0.35);
}
```

### 8.2 Status Shadows

| Status | Shadow Color Base |
|--------|------------------|
| Success | Green (var rgb) at ~25% opacity |
| Warning | Amber/yellow at ~25% opacity |
| Danger | Red at ~30% opacity |
| Info | Blue at ~25% opacity |

### 8.3 Guidelines

- **Only on solid-color elements** — colored shadows on white cards look strange.
- **Opacity matters** — too high looks artificial, too low is invisible.
- **Skip in dark mode** — colored shadows on dark backgrounds are often invisible.

---

## 9. Surface Elevation System

### 9.1 Concept

Each elevation level maps to both a shadow AND a surface color. Higher surfaces are visually distinct.

### 9.2 Light Mode

| Level | Surface Color | Shadow |
|-------|--------------|--------|
| 0 | `--ds-color-bg` (white/near-white) | `none` |
| 1 | `--ds-color-surface` (slightly off-white) | `shadow-xs` |
| 2 | `--ds-color-surface-2` (subtle gray tint) | `shadow-sm` |
| 3 | `--ds-color-surface-3` | `shadow-md` |
| 4 | `--ds-color-surface-4` | `shadow-lg` |
| 5 | `--ds-color-surface-5` | `shadow-xl` |

### 9.3 Dark Mode

In dark mode, shadows are nearly invisible. Elevation is communicated through **lighter surfaces**:

| Level | Surface Color | Shadow (Reduced) |
|-------|--------------|-------------------|
| 0 | `--ds-color-bg` (near-black) | `none` |
| 1 | `--ds-color-surface` (dark gray + 5% white) | Very subtle or none |
| 2 | `--ds-color-surface-2` (dark gray + 8% white) | Very subtle |
| 3 | `--ds-color-surface-3` (dark gray + 12% white) | Optional subtle |
| 4 | `--ds-color-surface-4` (dark gray + 16% white) | Optional |
| 5 | `--ds-color-surface-5` (dark gray + 20% white) | Optional light glow |

---

## 10. Dark Mode Shadows

### 10.1 The Problem

Shadows are cast by light. In dark environments, shadows become:
- Nearly invisible (black shadow on dark background).
- Less meaningful for conveying elevation.

### 10.2 Dark Mode Shadow Strategy

| Strategy | Approach |
|----------|----------|
| **Reduce shadow opacity** | Cut all shadow opacities by 50–70% in dark mode |
| **Increase surface differentiation** | Lighter surface color per elevation level |
| **Add subtle borders** | Thin 1px border (rgb(255 255 255 / 0.05–0.1)) to define edges |
| **Use glow instead** | Subtle light-colored shadows (white/light at very low opacity) |
| **Skip shadows entirely** | Rely only on surface color + border |

### 10.3 Implementation

```css
[data-theme="dark"] {
  --ds-shadow-xs: 0 1px 2px rgb(0 0 0 / 0.2);
  --ds-shadow-sm: 0 2px 4px rgb(0 0 0 / 0.3);
  --ds-shadow-md: 0 4px 8px rgb(0 0 0 / 0.35), 0 1px 2px rgb(0 0 0 / 0.25);
  --ds-shadow-lg: 0 8px 16px rgb(0 0 0 / 0.4), 0 4px 8px rgb(0 0 0 / 0.3);
  --ds-shadow-xl: 0 16px 32px rgb(0 0 0 / 0.5), 0 8px 16px rgb(0 0 0 / 0.35);
}
```

---

## 11. Glassmorphism & Backdrop Blur

### 11.1 What It Is

Frosted glass effect: semi-transparent background + backdrop blur that lets content behind show through with a blurry, frosted look.

### 11.2 Recipe

```css
.glass {
  background: rgb(255 255 255 / 0.1);   /* semi-transparent white */
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid rgb(255 255 255 / 0.15);
  box-shadow: 0 4px 16px rgb(0 0 0 / 0.1);
}
```

### 11.3 Blur Scale

| Token | Blur | Use |
|-------|------|-----|
| `--ds-blur-none` | 0 | No blur |
| `--ds-blur-sm` | 4px | Subtle frosted |
| `--ds-blur-md` | 8px | Standard glass |
| `--ds-blur-lg` | 16px | Heavy frost |
| `--ds-blur-xl` | 24px | Near-opaque frost |
| `--ds-blur-2xl` | 40px | Maximum blur |

### 11.4 Performance Warning

`backdrop-filter` is GPU-intensive. Rules:
- Don't stack multiple blurred elements.
- Limit blur area size.
- Avoid blur on scrolling containers (causes repaint every frame).
- Test on low-end devices.

---

## 12. Neumorphism Depth

### 12.1 What It Is

Soft, extruded look using two shadows (one light, one dark) on same-colored background.

### 12.2 Raised Neumorphic

```css
.neu-raised {
  background: var(--ds-color-bg);
  box-shadow:
    6px 6px 12px rgb(0 0 0 / 0.15),       /* dark shadow (bottom-right) */
    -6px -6px 12px rgb(255 255 255 / 0.8); /* light shadow (top-left) */
}
```

### 12.3 Pressed Neumorphic

```css
.neu-pressed {
  background: var(--ds-color-bg);
  box-shadow:
    inset 4px 4px 8px rgb(0 0 0 / 0.15),
    inset -4px -4px 8px rgb(255 255 255 / 0.8);
}
```

### 12.4 Neumorphism Limitations

- Very low contrast — accessibility issues.
- Requires matching background color (not possible on varied surfaces).
- Dark mode is difficult.
- Best used as a **visual variant**, not the primary elevation system.

---

## 13. 3D Transforms & Perspective

### 13.1 Perspective

Creates a vanishing-point effect for 3D transforms:

```css
.perspective-container {
  perspective: 1000px;     /* Distance from viewer — lower = more dramatic */
  perspective-origin: center;
}
```

### 13.2 Common 3D Transforms

| Transform | Effect | Use Case |
|-----------|--------|----------|
| `rotateX(deg)` | Tilt forward/backward | Card flip, fold effect |
| `rotateY(deg)` | Tilt left/right | Card flip, carousel |
| `rotateZ(deg)` | Spin | Loading, icon rotation |
| `translateZ(px)` | Move toward/away from viewer | Parallax layers |
| `scale3d(x, y, z)` | 3D scale | Press/lift effects |

### 13.3 Card Tilt on Hover

Interactive depth effect:

```css
.tilt-card {
  transition: transform 300ms var(--ds-ease-out);
  transform-style: preserve-3d;
}

.tilt-card:hover {
  transform: perspective(600px) rotateX(5deg) rotateY(-5deg) translateZ(10px);
}
```

### 13.4 Backface Visibility

For card flip animations:

```css
.flip-card-front,
.flip-card-back {
  backface-visibility: hidden;
  position: absolute;
  inset: 0;
}

.flip-card-back {
  transform: rotateY(180deg);
}
```

---

## 14. Drop Shadow vs Box Shadow

### 14.1 Differences

| Feature | `box-shadow` | `filter: drop-shadow()` |
|---------|-------------|------------------------|
| Shape | Always rectangular (follows box model) | Follows alpha channel (traces actual shape) |
| Multiple values | Yes (comma-separated) | No (single shadow) |
| `inset` option | Yes | No |
| `spread` parameter | Yes | No |
| Performance | Faster | Slower (requires compositing) |
| Works on | Block/inline elements | Any element including SVG, clipped shapes |

### 14.2 When to Use Each

- **`box-shadow`**: Almost all UI elements — cards, buttons, inputs, modals.
- **`drop-shadow()`**: SVG icons, elements with clip-path, irregular shapes, PNG images with transparency.

---

## 15. Depth & Accessibility

### 15.1 Rules

- **Never use shadow as the ONLY indicator of interaction or state** — always pair with color, border, or icon changes.
- **Ensure sufficient contrast** between surface levels for users with low vision.
- **Don't rely on elevation for information hierarchy** — use size, color, typography, and position first.
- **Test with high contrast mode** — shadows typically disappear, so ensure borders or other cues remain.

### 15.2 Windows High Contrast Mode

```css
@media (forced-colors: active) {
  .card {
    border: 1px solid ButtonText; /* Replace shadow with visible border */
  }
}
```

---

## 16. Performance Considerations

### 16.1 Shadow Performance

- `box-shadow` triggers **paint** (not layout), so it's moderately expensive.
- Animating `box-shadow` directly causes repaint every frame.
- **Better**: animate `opacity` of a pseudo-element that has the shadow:

```css
.card {
  position: relative;
}

.card::after {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: inherit;
  box-shadow: var(--ds-shadow-xl);
  opacity: 0;
  transition: opacity 200ms var(--ds-ease-standard);
  pointer-events: none;
}

.card:hover::after {
  opacity: 1;
}
```

### 16.2 Backdrop-Filter Budget

- Limit to 1–2 glass elements visible on screen simultaneously.
- Avoid on elements that move or scroll.
- Use `will-change: backdrop-filter` sparingly.

---

## 17. Elevation Utility Classes

| Class | Shadow Level | Use Case |
|-------|-------------|----------|
| `.shadow-none` | None | Flat element, remove inherited shadow |
| `.shadow-xs` | Extra small | Minor lift — card at rest |
| `.shadow-sm` | Small | Raised button, hovered card |
| `.shadow-md` | Medium | Dropdown, popover |
| `.shadow-lg` | Large | Drawer, bottom sheet |
| `.shadow-xl` | Extra large | Modal, dialog |
| `.shadow-2xl` | Double extra large | Full-screen overlay |
| `.shadow-inner` | Inset | Pressed button, input well |
| `.shadow-ring` | Focus ring | Focused elements |
| `.shadow-glow` | Colored glow | Active/accent highlight |

---

## 18. Elevation Tokens Summary

### Complete Token Inventory

```
SHADOW SCALE
  --ds-shadow-none            none
  --ds-shadow-xs              extra-small lift (card at rest)
  --ds-shadow-sm              small lift (raised, hovered)
  --ds-shadow-md              medium float (dropdown, popover)
  --ds-shadow-lg              large float (drawer, sheet)
  --ds-shadow-xl              extra-large float (modal, dialog)
  --ds-shadow-2xl             maximum float (full overlay)

INSET SHADOWS
  --ds-shadow-inset-xs        subtle recess
  --ds-shadow-inset-sm        input field recess
  --ds-shadow-inset-md        deep well

FOCUS / RING
  --ds-ring-width             2px
  --ds-ring-offset            2px
  --ds-ring-color             accent color

SHADOW COLOR
  --ds-shadow-color           base shadow color (RGB triplet)

BACKDROP BLUR
  --ds-blur-none              0
  --ds-blur-sm                4px
  --ds-blur-md                8px
  --ds-blur-lg                16px
  --ds-blur-xl                24px
  --ds-blur-2xl               40px

SURFACE ELEVATION MAP (light mode)
  Level 0 → bg         + shadow-none
  Level 1 → surface    + shadow-xs
  Level 2 → surface-2  + shadow-sm
  Level 3 → surface-3  + shadow-md
  Level 4 → surface-4  + shadow-lg
  Level 5 → surface-5  + shadow-xl

UTILITY CLASSES
  .shadow-{none,xs,sm,md,lg,xl,2xl}
  .shadow-inner
  .shadow-ring
  .shadow-glow
```

---

*This chapter defines the complete elevation and depth vocabulary for a Design System. Every shadow scale, blur level, surface mapping, and focus ring pattern above should be implemented for full spatial depth coverage.*
