# 16 — Theming Architecture

> Everything a Design System needs to support theming — appearance modes, brand themes, visual variants, density modes, CSS custom property strategy, theme switching mechanics, scoped themes, and the architecture that makes it all work.

---

## Table of Contents

1. [Theming Philosophy](#1-theming-philosophy)
2. [Theme Dimensions](#2-theme-dimensions)
3. [Appearance Mode (Light / Dark)](#3-appearance-mode-light--dark)
4. [Brand Themes](#4-brand-themes)
5. [Visual Variants](#5-visual-variants)
6. [Density Modes](#6-density-modes)
7. [CSS Custom Properties Strategy](#7-css-custom-properties-strategy)
8. [Theme Token Structure](#8-theme-token-structure)
9. [Theme Switching Mechanics](#9-theme-switching-mechanics)
10. [Scoped / Nested Themes](#10-scoped--nested-themes)
11. [Contrast & High Contrast](#11-contrast--high-contrast)
12. [Color Scheme Coordination](#12-color-scheme-coordination)
13. [Theme Persistence](#13-theme-persistence)
14. [Theme Animation](#14-theme-animation)
15. [Theme Testing](#15-theme-testing)
16. [Theming Tokens Summary](#16-theming-tokens-summary)

---

## 1. Theming Philosophy

### 1.1 Core Principles

1. **Separation of structure and skin** — components define their shape, themes define their colors.
2. **Token indirection** — components reference semantic tokens, not raw colors.
3. **Multi-dimensional** — appearance, brand, density, and visual variant are independent axes.
4. **System-aware** — respect OS preferences (prefers-color-scheme, prefers-contrast).
5. **Scoped** — themes can apply to a subtree, not just the entire page.
6. **Zero flash** — page loads with the correct theme immediately (no FOUC).

### 1.2 Theme vs. Not Theme

| Is Theming | Is Not Theming |
|-----------|----------------|
| Changing colors | Changing layout |
| Switching dark/light | Changing component behavior |
| Adjusting density | Changing information architecture |
| Applying brand palette | Adding/removing features |
| Visual style (glass, flat, etc.) | Changing interaction patterns |

---

## 2. Theme Dimensions

### 2.1 Independent Axes

```
Theme = Appearance × Brand × Density × Visual Variant

Example combinations:
  Light × Default × Comfortable × Flat
  Dark × Purple × Compact × Glass
  Light × Blue × Spacious × Neumorphic
```

### 2.2 Dimension Definitions

| Dimension | Controls | Values |
|-----------|----------|--------|
| **Appearance** | Light vs. dark surfaces | `light`, `dark`, `system` |
| **Brand** | Color palette, accent, logo | `default`, `blue`, `purple`, `custom` |
| **Density** | Spacing, sizing, font size | `compact`, `comfortable`, `spacious` |
| **Visual Variant** | Surface treatment, shadows | `flat`, `glass`, `neumorphic`, `outlined` |

---

## 3. Appearance Mode (Light / Dark)

### 3.1 What Changes

| Token Category | Light | Dark |
|---------------|-------|------|
| Background | White / gray-50 | gray-900 / gray-950 |
| Surface | White | gray-800 |
| Text (primary) | gray-900 | gray-50 |
| Text (secondary) | gray-600 | gray-400 |
| Borders | gray-200 | gray-700 |
| Shadows | Black with low opacity | Black with higher opacity or none |
| Accent | Same hue, adjusted for contrast | Same hue, adjusted for contrast |

### 3.2 Implementation Strategy

```css
/* Token definitions scoped to appearance */
:root, [data-theme="light"] {
  --ds-bg:       #ffffff;
  --ds-surface:  #ffffff;
  --ds-text:     #111827;
  --ds-border:   #e5e7eb;
}

[data-theme="dark"] {
  --ds-bg:       #0f172a;
  --ds-surface:  #1e293b;
  --ds-text:     #f1f5f9;
  --ds-border:   #334155;
}
```

### 3.3 System Preference Detection

```css
@media (prefers-color-scheme: dark) {
  :root:not([data-theme]) {
    /* Apply dark tokens when no explicit preference set */
  }
}
```

### 3.4 Dark Mode Anti-Patterns

| Don't | Do |
|-------|-----|
| Pure black (#000) backgrounds | Use very dark grays (gray-900, gray-950) |
| Invert all colors | Remap to dark-friendly palette |
| Same shadow as light mode | Reduce or eliminate shadows in dark |
| Bright white text on dark | Use slightly muted white (gray-50, gray-100) |
| Same accent saturation | Slightly desaturate or lighten accents |

---

## 4. Brand Themes

### 4.1 What a Brand Theme Controls

| Token | Purpose |
|-------|---------|
| Accent / Primary color | Buttons, links, focus rings |
| Accent gradient | Gradient variations |
| Logo | Brand mark, wordmark |
| Font family (optional) | Brand-specific typeface |
| Radius personality | Sharp (2px) → rounded (12px) → pill |
| Illustration style | Consistent visual language |

### 4.2 Brand Theme Architecture

```css
/* Brand tokens layer on top of appearance tokens */
[data-brand="default"] {
  --ds-accent: #2563eb;        /* Blue */
  --ds-accent-hover: #1d4ed8;
  --ds-accent-text: #ffffff;
  --ds-radius-personality: 8px;
}

[data-brand="purple"] {
  --ds-accent: #7c3aed;
  --ds-accent-hover: #6d28d9;
  --ds-accent-text: #ffffff;
  --ds-radius-personality: 12px;
}
```

### 4.3 White-Label / Multi-Tenant

For SaaS products supporting custom branding:

1. Brand provides: primary color, secondary color, logo, optional font.
2. DS generates: full palette (shades 50–950) from primary color.
3. DS maps: generated palette to semantic tokens.
4. CSS custom properties make this dynamic — no rebuild needed.

---

## 5. Visual Variants

### 5.1 What Visual Variants Control

| Token | Flat | Glass | Neumorphic | Outlined |
|-------|------|-------|------------|----------|
| Surface bg | Solid | Semi-transparent | Same as bg | Transparent |
| Surface border | None | Subtle white | None | Prominent |
| Surface shadow | Standard | Blur only | Inset + outset | None |
| Backdrop filter | None | blur(8-16px) | None | None |
| Card treatment | bg + shadow | glass + border | raised surface | border only |

### 5.2 Glass / Glassmorphism

```css
[data-visual="glass"] {
  --ds-surface-bg: rgba(255, 255, 255, 0.1);
  --ds-surface-border: rgba(255, 255, 255, 0.2);
  --ds-surface-blur: blur(12px);
  --ds-surface-shadow: none;
}
```

### 5.3 Neumorphism

```css
[data-visual="neumorphic"] {
  --ds-surface-bg: var(--ds-bg);  /* same as page bg */
  --ds-surface-shadow:
    6px 6px 12px rgba(0, 0, 0, 0.15),
    -6px -6px 12px rgba(255, 255, 255, 0.8);
  --ds-surface-shadow-inset:
    inset 4px 4px 8px rgba(0, 0, 0, 0.1),
    inset -4px -4px 8px rgba(255, 255, 255, 0.7);
}
```

---

## 6. Density Modes

### 6.1 What Density Controls

| Token | Compact | Comfortable | Spacious |
|-------|---------|-------------|----------|
| Base spacing unit | 4px | 4px | 4px |
| Component padding | 4-8px | 8-12px | 12-16px |
| Font size (body) | 13px | 14px | 16px |
| Line height | 1.3 | 1.5 | 1.6 |
| Button height | 28-32px | 36-40px | 44-48px |
| Input height | 28-32px | 36-40px | 44-48px |
| Table row height | 32px | 40px | 48px |
| Icon size | 16px | 20px | 24px |
| Gap / stack spacing | 4-8px | 8-16px | 16-24px |

### 6.2 Implementation

```css
[data-density="compact"] {
  --ds-density-factor: 0.75;
  --ds-control-height-sm: 24px;
  --ds-control-height-md: 32px;
  --ds-control-height-lg: 40px;
}

[data-density="comfortable"] {
  --ds-density-factor: 1;
  --ds-control-height-sm: 32px;
  --ds-control-height-md: 40px;
  --ds-control-height-lg: 48px;
}

[data-density="spacious"] {
  --ds-density-factor: 1.25;
  --ds-control-height-sm: 40px;
  --ds-control-height-md: 48px;
  --ds-control-height-lg: 56px;
}
```

---

## 7. CSS Custom Properties Strategy

### 7.1 Naming Convention

```
--ds-{category}-{property}-{modifier}

Examples:
  --ds-color-bg                  (category: color)
  --ds-color-text-secondary      (modifier: secondary)
  --ds-space-4                   (category: space)
  --ds-font-size-lg              (category: font)
```

### 7.2 Token Resolution Chain

```
Component CSS
  ↓ references
Semantic Token (--ds-color-bg-surface)
  ↓ resolves to
Theme Token (var(--ds-palette-gray-100))
  ↓ resolves to
Primitive Token (var(--ds-gray-100))
  ↓ resolves to
Raw Value (#f3f4f6)
```

### 7.3 Fallback Values

```css
.card {
  /* Fallback ensures component works even without theme loaded */
  background: var(--ds-surface-bg, #ffffff);
  color: var(--ds-text-primary, #111827);
}
```

### 7.4 Rules

1. Components never reference raw colors — always tokens.
2. Tokens have sensible fallbacks.
3. Theme files only set CSS custom property values.
4. Component CSS references custom properties.
5. Custom properties inherit — a token set on a parent applies to all children.

---

## 8. Theme Token Structure

### 8.1 File Organization

```
tokens/
├── primitive/
│   ├── colors.css       (raw palette: gray-50 → gray-950, blue-50 → blue-950)
│   ├── spacing.css      (4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80, 96)
│   ├── typography.css   (font families, sizes, weights, line heights)
│   └── radii.css        (none, sm, md, lg, xl, full)
├── semantic/
│   ├── colors.css       (bg, surface, text, border, accent, status)
│   ├── shadows.css      (elevation-sm → elevation-xl)
│   └── motion.css       (duration, easing)
├── themes/
│   ├── light.css        (semantic color values for light mode)
│   ├── dark.css         (semantic color values for dark mode)
│   ├── brand-default.css
│   └── brand-purple.css
└── density/
    ├── compact.css
    ├── comfortable.css
    └── spacious.css
```

### 8.2 Semantic Token Map

```css
/* semantic/colors.css — defines WHAT tokens exist */
:root {
  /* Backgrounds */
  --ds-bg:          var(--_bg);
  --ds-bg-subtle:   var(--_bg-subtle);
  --ds-bg-muted:    var(--_bg-muted);

  /* Surfaces */
  --ds-surface:     var(--_surface);
  --ds-surface-raised: var(--_surface-raised);
  --ds-surface-overlay: var(--_surface-overlay);

  /* Text */
  --ds-text:        var(--_text);
  --ds-text-secondary: var(--_text-secondary);
  --ds-text-muted:  var(--_text-muted);
  --ds-text-inverse: var(--_text-inverse);

  /* Borders */
  --ds-border:      var(--_border);
  --ds-border-subtle: var(--_border-subtle);
  --ds-border-strong: var(--_border-strong);

  /* Interactive */
  --ds-accent:      var(--_accent);
  --ds-accent-hover: var(--_accent-hover);
  --ds-accent-text: var(--_accent-text);
}
```

```css
/* themes/light.css — defines HOW tokens resolve */
[data-theme="light"] {
  --_bg:           #ffffff;
  --_bg-subtle:    #f9fafb;
  --_bg-muted:     #f3f4f6;
  --_surface:      #ffffff;
  --_text:         #111827;
  --_text-secondary: #4b5563;
  --_border:       #e5e7eb;
}
```

---

## 9. Theme Switching Mechanics

### 9.1 Data Attribute Approach

```html
<html data-theme="dark" data-brand="purple" data-density="compact" data-visual="glass">
```

### 9.2 JavaScript Theme Switch

```javascript
function setTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);
}

function initTheme() {
  const saved = localStorage.getItem('theme');
  const system = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  setTheme(saved || system);
}
```

### 9.3 Flash of Wrong Theme Prevention

```html
<!-- Blocking script in <head> before CSS renders -->
<script>
  (function() {
    var t = localStorage.getItem('theme');
    if (t) document.documentElement.setAttribute('data-theme', t);
    else if (window.matchMedia('(prefers-color-scheme: dark)').matches)
      document.documentElement.setAttribute('data-theme', 'dark');
  })();
</script>
```

### 9.4 System Preference Listener

```javascript
window.matchMedia('(prefers-color-scheme: dark)')
  .addEventListener('change', (e) => {
    if (!localStorage.getItem('theme')) {
      setTheme(e.matches ? 'dark' : 'light');
    }
  });
```

---

## 10. Scoped / Nested Themes

### 10.1 Purpose

Apply a different theme to a subtree of the DOM:

```html
<div data-theme="dark">
  <!-- This section uses dark theme even if page is light -->
  <div class="card">Dark card content</div>
</div>
```

### 10.2 Use Cases

| Scenario | Implementation |
|----------|---------------|
| Dark sidebar in light app | `data-theme="dark"` on sidebar |
| Branded section | `data-brand="partner"` on section |
| Compact data table | `data-density="compact"` on table wrapper |
| Marketing hero | Different visual variant on hero section |

### 10.3 Rules

1. CSS custom properties cascade — child tokens override parent tokens.
2. Scoped themes must define all consumed tokens (or inherit from parent).
3. Don't over-nest — one or two levels deep maximum.
4. Test contrast at each scope boundary.

---

## 11. Contrast & High Contrast

### 11.1 Forced Colors / High Contrast Mode

```css
@media (forced-colors: active) {
  .button {
    border: 2px solid ButtonText;
    background: ButtonFace;
    color: ButtonText;
  }
}
```

### 11.2 Prefers Contrast

```css
@media (prefers-contrast: more) {
  :root {
    --ds-border: #000000;
    --ds-text-secondary: #374151; /* Darker than normal */
  }
}

@media (prefers-contrast: less) {
  :root {
    --ds-border: #e5e7eb;
    --ds-text-secondary: #9ca3af; /* Lighter than normal */
  }
}
```

### 11.3 High Contrast Theme

Optionally provide an explicit high-contrast theme:
- Thicker borders (2px minimum).
- Higher contrast ratios (7:1 instead of 4.5:1).
- No reliance on shadows for hierarchy.
- Bold focus indicators.

---

## 12. Color Scheme Coordination

### 12.1 CSS color-scheme

```css
:root {
  color-scheme: light dark;  /* Tells browser: we support both */
}

[data-theme="light"] { color-scheme: light; }
[data-theme="dark"]  { color-scheme: dark; }
```

This coordinates:
- Scrollbar appearance.
- Form input default colors.
- `<select>`, `<input>` default styling.
- `Canvas` and `CanvasText` system colors.

---

## 13. Theme Persistence

### 13.1 Storage Options

| Storage | Scope | Persistence |
|---------|-------|-------------|
| `localStorage` | Browser per origin | Until cleared |
| Cookie | Server + client | Until expiry |
| User preference (DB) | Account-wide | Until changed |
| URL parameter | Shareable | Session only |

### 13.2 Server-Side Rendering

For SSR (Next.js, etc.):
1. Store theme in a cookie (accessible server-side).
2. Read cookie on the server, set `data-theme` attribute in server-rendered HTML.
3. No flash because the correct theme is in the initial HTML.

---

## 14. Theme Animation

### 14.1 Smooth Theme Transition

```css
/* Apply transition only when switching themes */
html.theme-transitioning * {
  transition: background-color 200ms ease, color 200ms ease, border-color 200ms ease;
}
```

```javascript
function switchTheme(newTheme) {
  document.documentElement.classList.add('theme-transitioning');
  document.documentElement.setAttribute('data-theme', newTheme);
  setTimeout(() => {
    document.documentElement.classList.remove('theme-transitioning');
  }, 300);
}
```

### 14.2 Rules

1. Only transition color-related properties (not layout).
2. Keep duration short: 150–300ms.
3. Apply transition class temporarily — don't leave it on permanently (performance cost).
4. Respect `prefers-reduced-motion`.

---

## 15. Theme Testing

### 15.1 Checklist

| Test | Method |
|------|--------|
| Light mode renders correctly | Visual review |
| Dark mode renders correctly | Visual review |
| Contrast ratios pass WCAG AA | Automated tooling |
| System preference is respected | Toggle OS setting |
| Theme persists across refresh | Close and reopen |
| No flash on load | Hard refresh |
| Scoped themes work | Apply nested theme |
| Forced colors mode | Enable Windows High Contrast |
| All components adapt | Visual regression |
| Theme switch is smooth | Toggle rapidly |

---

## 16. Theming Tokens Summary

### Complete Token Inventory

```
APPEARANCE (Light/Dark)
  --ds-bg                  page background
  --ds-bg-subtle           slightly off-white / off-black
  --ds-bg-muted            muted background for sections
  --ds-surface             card/panel background
  --ds-surface-raised      elevated surface
  --ds-surface-overlay     modal/overlay background
  --ds-text                primary text color
  --ds-text-secondary      secondary text color
  --ds-text-muted          disabled/hint text
  --ds-text-inverse        reversed text (light on dark)
  --ds-border              default border
  --ds-border-subtle       light border
  --ds-border-strong       prominent border
  --ds-shadow-color        shadow base color

BRAND
  --ds-accent              primary brand color
  --ds-accent-hover        hover variant
  --ds-accent-active       active/pressed variant
  --ds-accent-subtle       light tint for backgrounds
  --ds-accent-text         text on accent background
  --ds-radius-personality  global radius character

DENSITY
  --ds-density-factor      0.75 | 1 | 1.25
  --ds-control-height-sm   small control height
  --ds-control-height-md   medium control height
  --ds-control-height-lg   large control height
  --ds-control-padding     internal padding
  --ds-density-gap         default gap between elements

VISUAL VARIANT
  --ds-surface-bg          solid | semi-transparent | same-as-bg
  --ds-surface-border      none | subtle | prominent
  --ds-surface-blur        none | blur(8-16px)
  --ds-surface-shadow      standard | none | inset+outset

COLOR-SCHEME
  color-scheme: light | dark | light dark

DATA ATTRIBUTES
  data-theme       "light" | "dark"
  data-brand       "default" | "purple" | "blue" | custom
  data-density     "compact" | "comfortable" | "spacious"
  data-visual      "flat" | "glass" | "neumorphic" | "outlined"
```

---

*This chapter defines the complete theming architecture for a Design System. Every appearance mode, brand theme, density mode, visual variant, and switching mechanism described above should be present in the implemented DS.*
