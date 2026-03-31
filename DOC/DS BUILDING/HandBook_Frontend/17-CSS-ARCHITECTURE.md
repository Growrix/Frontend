# 17 — CSS Architecture

> Everything a Design System needs for CSS architecture — cascade layers, specificity management, naming conventions, utility-first vs. component CSS, CSS-in-JS patterns, critical CSS, CSS custom properties strategy, and the layering rules that keep styles predictable at scale.

---

## Table of Contents

1. [CSS Architecture Philosophy](#1-css-architecture-philosophy)
2. [Cascade Layers](#2-cascade-layers)
3. [Specificity Management](#3-specificity-management)
4. [Naming Conventions](#4-naming-conventions)
5. [CSS Methodologies](#5-css-methodologies)
6. [Component CSS Patterns](#6-component-css-patterns)
7. [Utility Classes](#7-utility-classes)
8. [CSS Custom Properties](#8-css-custom-properties)
9. [Responsive Architecture](#9-responsive-architecture)
10. [CSS-in-JS Patterns](#10-css-in-js-patterns)
11. [CSS Modules](#11-css-modules)
12. [Critical CSS & Performance](#12-critical-css--performance)
13. [CSS Composition](#13-css-composition)
14. [Dark Mode CSS](#14-dark-mode-css)
15. [CSS Reset & Base](#15-css-reset--base)
16. [CSS File Organization](#16-css-file-organization)
17. [CSS Linting & Enforcement](#17-css-linting--enforcement)
18. [CSS Architecture Tokens Summary](#18-css-architecture-tokens-summary)

---

## 1. CSS Architecture Philosophy

### 1.1 Core Principles

1. **Predictable** — any developer can look at a class name and know what it does.
2. **Reusable** — styles defined once, consumed everywhere.
3. **Maintainable** — changes to one component don't break others.
4. **Scalable** — architecture works for 10 and 10,000 components.
5. **Performant** — minimal CSS shipped, no unused styles in production.
6. **Low specificity** — avoid specificity wars and `!important`.

### 1.2 The Specificity Problem

Without architecture, CSS devolves into:
```
.sidebar .nav .link { ... }          /* high specificity */
.sidebar .nav .link.active { ... }   /* higher */
.sidebar .nav .link.active:hover { } /* even higher */
#sidebar .nav .link { ... }          /* nuclear */
.link { ... !important; }            /* end of civilization */
```

The DS must prevent this. Cascade layers, naming conventions, and specificity budgets are the tools.

---

## 2. Cascade Layers

### 2.1 What Are Cascade Layers?

CSS `@layer` lets you explicitly control the cascade order regardless of source order or specificity.

```css
@layer reset, tokens, base, components, utilities;
```

Later-declared layers win over earlier layers, regardless of selector specificity within each layer.

### 2.2 Recommended Layer Stack

```css
@layer reset, tokens, theme, base, layouts, components, patterns, utilities, overrides;
```

| Layer | Purpose | Specificity |
|-------|---------|-------------|
| `reset` | Normalize / reset browser defaults | Lowest |
| `tokens` | CSS custom property definitions | Low |
| `theme` | Theme-specific token values | Low |
| `base` | HTML element styles (body, h1, a, etc.) | Low |
| `layouts` | Shell / layout patterns (grid, sidebar) | Medium |
| `components` | All component styles | Medium |
| `patterns` | Multi-component patterns | Medium-High |
| `utilities` | Single-purpose utility classes | High |
| `overrides` | Escape hatch (avoid) | Highest |

### 2.3 Layer Implementation

```css
/* Import order doesn't matter — layer declaration order controls cascade */
@layer reset {
  *, *::before, *::after { box-sizing: border-box; }
  body { margin: 0; }
}

@layer tokens {
  :root {
    --ds-color-primary: #2563eb;
    --ds-space-4: 1rem;
  }
}

@layer components {
  .btn { /* ...button styles... */ }
  .card { /* ...card styles... */ }
}

@layer utilities {
  .sr-only { /* screen reader only */ }
  .text-center { text-align: center; }
}
```

### 2.4 Layer Rules

1. Declare all layers upfront in one `@layer` statement.
2. Un-layered CSS always beats layered CSS — put nothing outside layers.
3. `!important` reverses layer order (important in earlier layer beats important in later layer).
4. Don't use `!important` — layers solve the same problem properly.
5. Third-party CSS should be placed in a low-priority layer.

---

## 3. Specificity Management

### 3.1 Specificity Budget

| Category | Maximum Specificity | Example |
|----------|-------------------|---------|
| Utilities | `0,1,0` | `.text-center` |
| Components | `0,1,0` to `0,2,0` | `.btn`, `.btn.btn--primary` |
| Layouts | `0,1,0` | `.sidebar` |
| States | `0,2,0` | `.btn:hover`, `.btn.is-active` |
| Overrides | `0,3,0` max | `.card .card__title.is-large` |

### 3.2 Rules

1. No ID selectors in CSS ever.
2. No `!important` (except for utility classes as a deliberate choice).
3. No element-qualified selectors: `.btn` not `button.btn`.
4. Max nesting depth: 2 levels.
5. Prefer flat selectors over deeply nested ones.
6. Use `:where()` to zero-out specificity when needed.

### 3.3 `:where()` for Zero Specificity

```css
/* Specificity: 0,0,0 — easily overridable */
:where(.btn) {
  padding: 8px 16px;
  border-radius: 6px;
}

/* Specificity: 0,1,0 — overrides the above */
.btn--large {
  padding: 12px 24px;
}
```

### 3.4 `:is()` for Grouped Specificity

```css
/* Specificity: highest selector in the list (0,1,0) */
:is(.card, .panel, .box) {
  border-radius: 8px;
}
```

---

## 4. Naming Conventions

### 4.1 BEM (Block, Element, Modifier)

```
.block {}
.block__element {}
.block--modifier {}

Examples:
.card {}
.card__title {}
.card__body {}
.card--featured {}
.card--compact {}
```

### 4.2 BEM Rules

1. **Block**: standalone entity (`.card`, `.btn`, `.modal`).
2. **Element**: part of a block, prefixed with `__` (`.card__title`).
3. **Modifier**: variation, prefixed with `--` (`.card--featured`).
4. Never chain elements: `.card__header__title` → use `.card__title` instead.
5. Modifiers on blocks: `.card--featured`.
6. Modifiers on elements: `.card__title--large`.

### 4.3 Namespace Prefixes

| Prefix | Purpose | Example |
|--------|---------|---------|
| `ds-` | Design System component | `.ds-btn` |
| `c-` | Component | `.c-card` |
| `l-` | Layout | `.l-sidebar` |
| `u-` | Utility | `.u-text-center` |
| `is-` / `has-` | State | `.is-active`, `.has-error` |
| `js-` | JavaScript hook (no styles) | `.js-toggle` |
| `t-` | Theme | `.t-dark` |

### 4.4 Kebab Case

All class names use kebab-case:
```
✓ .primary-button
✕ .primaryButton
✕ .PrimaryButton
✕ .primary_button
```

---

## 5. CSS Methodologies

### 5.1 Comparison

| Methodology | Philosophy | Pros | Cons |
|-------------|------------|------|------|
| **BEM** | Naming convention | Clear, strict, scalable | Verbose |
| **SMACSS** | Categorized rules | Good for large projects | Complex categorization |
| **ITCSS** | Inverted triangle specificity | Specificity-managed | Learning curve |
| **OOCSS** | Separate structure & skin | Reusable | Classes on HTML |
| **Atomic / Utility-first** | One property per class | Fast, consistent | HTML noise |
| **CSS Modules** | Scoped by module | Zero collision | Tooling required |
| **CSS-in-JS** | Styles in JavaScript | Dynamic, scoped | Runtime cost |

### 5.2 ITCSS (Inverted Triangle CSS)

```
Settings   → variables, config
Tools      → mixins, functions
Generic    → reset, normalize
Elements   → bare HTML elements
Objects    → layout patterns (grid, media object)
Components → UI components
Trumps     → utilities, overrides
```

Specificity increases as you go down the triangle.

### 5.3 Recommended Hybrid

Most modern Design Systems combine:
- **Cascade layers** (structural specificity control).
- **BEM naming** (readability, clear ownership).
- **Utility classes** (rapid prototyping, common one-off styles).
- **CSS custom properties** (theming, dynamic values).

---

## 6. Component CSS Patterns

### 6.1 Single-File Component

```
Button/
├── Button.tsx
├── Button.module.css   (or Button.css)
└── Button.test.tsx
```

### 6.2 Component Class Structure

```css
/* Block */
.btn {
  display: inline-flex;
  align-items: center;
  gap: var(--ds-space-2);
  height: var(--ds-control-height-md);
  padding: 0 var(--ds-space-4);
  border-radius: var(--ds-radius-md);
  font-size: var(--ds-font-size-sm);
  font-weight: var(--ds-font-weight-medium);
  cursor: pointer;
  transition: background 150ms ease, color 150ms ease;
}

/* Variants (modifiers) */
.btn--primary {
  background: var(--ds-accent);
  color: var(--ds-accent-text);
}

.btn--secondary {
  background: transparent;
  color: var(--ds-text);
  border: 1px solid var(--ds-border);
}

/* Sizes */
.btn--sm { height: var(--ds-control-height-sm); }
.btn--lg { height: var(--ds-control-height-lg); }

/* States */
.btn:hover { filter: brightness(0.95); }
.btn:active { transform: scale(0.98); }
.btn:disabled { opacity: 0.5; cursor: not-allowed; }
.btn:focus-visible { outline: 2px solid var(--ds-focus-ring); outline-offset: 2px; }
```

### 6.3 Data Attribute Variants (Alternative)

```css
.btn[data-variant="primary"] { /* ... */ }
.btn[data-variant="secondary"] { /* ... */ }
.btn[data-size="sm"] { /* ... */ }
.btn[data-size="lg"] { /* ... */ }
```

---

## 7. Utility Classes

### 7.1 Philosophy

- One class = one CSS property (or a closely related set).
- Applied directly in HTML.
- Higher specificity layer than components (can override).
- Generated from tokens.

### 7.2 Common Utility Categories

| Category | Examples |
|----------|---------|
| **Display** | `.flex`, `.grid`, `.hidden`, `.block` |
| **Flexbox** | `.flex-row`, `.flex-col`, `.items-center`, `.justify-between` |
| **Grid** | `.grid-cols-2`, `.gap-4`, `.col-span-2` |
| **Spacing** | `.p-4`, `.m-2`, `.mt-8`, `.px-6` |
| **Typography** | `.text-sm`, `.text-lg`, `.font-bold`, `.text-center` |
| **Color** | `.text-muted`, `.bg-surface`, `.border-subtle` |
| **Sizing** | `.w-full`, `.h-screen`, `.max-w-md` |
| **Borders** | `.rounded-md`, `.border`, `.border-none` |
| **Shadows** | `.shadow-sm`, `.shadow-lg`, `.shadow-none` |
| **Opacity** | `.opacity-50`, `.opacity-0` |
| **Position** | `.relative`, `.absolute`, `.sticky`, `.fixed` |
| **Overflow** | `.overflow-hidden`, `.overflow-auto` |
| **Accessibility** | `.sr-only`, `.not-sr-only` |

### 7.3 Semantic Utility Classes

More meaningful than raw property utilities:

```css
/* Instead of .flex.items-center.gap-2 */
.inline-with-icon {
  display: inline-flex;
  align-items: center;
  gap: var(--ds-space-2);
}

/* Instead of .flex.flex-col.gap-4 */
.stack {
  display: flex;
  flex-direction: column;
  gap: var(--ds-space-4);
}
```

### 7.4 When to Use Utilities vs. Component Classes

| Use Utilities | Use Component Classes |
|--------------|----------------------|
| One-off layout adjustments | Reusable UI components |
| Quick spacing/alignment | Multi-property visual styles |
| Prototyping | Production component library |
| Simple overrides | Complex state management |

---

## 8. CSS Custom Properties

### 8.1 Why Custom Properties for DS

1. **Runtime theming** — change values without rebuilding CSS.
2. **Inheritance** — set on parent, consumed by children.
3. **Scoped overrides** — override tokens per section.
4. **JavaScript interop** — read/write from JS.
5. **No duplicated rules** — one ruleset, multiple themes.

### 8.2 Performance Notes

- Custom properties are resolved at paint time.
- Setting `--variable` on `:root` triggers full repaint.
- `transition` on custom properties requires `@property` registration.
- Very large numbers of custom properties (1000+) have negligible runtime cost.

### 8.3 @property Registration

```css
@property --ds-accent {
  syntax: '<color>';
  inherits: true;
  initial-value: #2563eb;
}
```

Benefits:
- Enables animation/transition of custom properties.
- Type checking.
- Fallback value if invalid.

---

## 9. Responsive Architecture

### 9.1 Media Queries in Layers

```css
@layer components {
  .card { padding: var(--ds-space-4); }

  @media (min-width: 768px) {
    .card { padding: var(--ds-space-6); }
  }
}
```

### 9.2 Container Queries

```css
.card-container {
  container-type: inline-size;
  container-name: card;
}

@container card (min-width: 400px) {
  .card { flex-direction: row; }
}
```

### 9.3 Responsive Utility Pattern

```css
/* Mobile first */
.flex-col { flex-direction: column; }

@media (min-width: 768px) {
  .md\:flex-row { flex-direction: row; }
}

@media (min-width: 1024px) {
  .lg\:flex-row { flex-direction: row; }
}
```

---

## 10. CSS-in-JS Patterns

### 10.1 Approaches

| Library | Strategy | Runtime Cost |
|---------|----------|-------------|
| styled-components | Tagged template, runtime | Yes |
| Emotion | Tagged template, runtime | Yes |
| Stitches | Variant-based, near-zero runtime | Minimal |
| Vanilla Extract | Zero runtime (build-time) | None |
| Panda CSS | Build-time extraction | None |
| StyleX (Meta) | Atomic, compile-time | None |
| Tailwind CSS | Utility class generation | None |

### 10.2 When to Use CSS-in-JS

| Reason For | Reason Against |
|-----------|---------------|
| Dynamic styles based on props | Runtime performance cost |
| Co-located styles with components | Bundle size |
| TypeScript integration | SSR complexity |
| Automatic vendor prefixing | Debugging difficulty |
| Dead code elimination | Learning curve |

### 10.3 Modern Trend

The industry is moving toward **zero-runtime** CSS solutions:
- Build-time CSS extraction (Vanilla Extract, Panda CSS, StyleX).
- CSS Modules with custom properties.
- Pure CSS with cascade layers.
- Utility-first frameworks (Tailwind).

---

## 11. CSS Modules

### 11.1 How They Work

```css
/* Button.module.css */
.root {
  display: inline-flex;
  align-items: center;
}

.primary {
  background: var(--ds-accent);
}
```

```jsx
import styles from './Button.module.css';

function Button({ variant }) {
  return <button className={`${styles.root} ${styles[variant]}`}>Click</button>;
}

/* Output: <button class="Button_root_a1b2c Button_primary_d3e4f"> */
```

### 11.2 Pros and Cons

| Pros | Cons |
|------|------|
| Scoped by default | No dynamic styles from props |
| Zero runtime | Global tokens need `:global()` |
| Familiar CSS | ComposesWith is limited |
| Standard tooling | No conditional styles |

### 11.3 Best Practices

1. Use `.root` for the component's base class.
2. Compose variants via `composes:` or className merging.
3. Reference design tokens via CSS custom properties (no imports).
4. Keep module files co-located with components.

---

## 12. Critical CSS & Performance

### 12.1 CSS Performance Rules

1. **Ship minimal CSS** — tree-shake unused styles.
2. **Avoid deep nesting** — flat selectors match faster.
3. **Avoid expensive selectors** — `:has()`, `:nth-child()` are costly at scale.
4. **Minimize repaints** — only animate `transform` and `opacity`.
5. **Use `will-change` sparingly** — promotes to GPU layer, costs memory.
6. **Avoid `@import`** — use `<link>` or bundler; `@import` blocks rendering.
7. **Inline critical CSS** — above-the-fold styles in `<head>`.

### 12.2 Critical CSS Strategy

```html
<head>
  <!-- Inline critical CSS for above-the-fold content -->
  <style>
    /* Tokens, reset, and above-the-fold component styles */
  </style>

  <!-- Defer remaining CSS -->
  <link rel="preload" href="/styles.css" as="style" onload="this.rel='stylesheet'">
</head>
```

### 12.3 Bundle Analysis

- Total CSS budget: < 50KB compressed for the entire DS.
- Critical path CSS: < 14KB (fits in first TCP roundtrip).
- Audit regularly: identify and eliminate unused declarations.

---

## 13. CSS Composition

### 13.1 Semantic Classes

Instead of piling utilities on HTML, define semantic composition classes:

```css
@layer patterns {
  .page-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: var(--ds-space-6) var(--ds-space-8);
    border-bottom: 1px solid var(--ds-border);
  }

  .content-section {
    max-width: var(--ds-content-max-width);
    margin: 0 auto;
    padding: var(--ds-space-8) var(--ds-space-4);
  }
}
```

### 13.2 Layout Primitives

Reusable layout classes consumed by all pages:

```css
@layer layouts {
  .stack     { display: flex; flex-direction: column; gap: var(--_gap, var(--ds-space-4)); }
  .row       { display: flex; flex-direction: row; gap: var(--_gap, var(--ds-space-4)); }
  .center    { display: grid; place-items: center; }
  .cluster   { display: flex; flex-wrap: wrap; gap: var(--_gap, var(--ds-space-4)); }
  .sidebar-layout { display: grid; grid-template-columns: auto 1fr; }
}
```

### 13.3 The Consumption Hierarchy

```
1. Shells (page-level layouts)
   └─ 2. Primitives (stack, row, center, cluster)
       └─ 3. Components (btn, card, modal)
           └─ 4. Semantic classes (page-header, content-section)
               └─ 5. Utility classes (one-off tweaks)
                   └─ 6. Inline styles (absolute last resort)
```

---

## 14. Dark Mode CSS

### 14.1 Token-Based Approach

```css
[data-theme="light"] {
  --ds-bg: #fff;
  --ds-text: #111;
}

[data-theme="dark"] {
  --ds-bg: #0f172a;
  --ds-text: #f1f5f9;
}

/* Component doesn't know about themes — just uses tokens */
.card {
  background: var(--ds-bg);
  color: var(--ds-text);
}
```

### 14.2 Anti-Patterns

| Don't | Do |
|-------|-----|
| Separate dark mode stylesheets | Use token swapping via data attributes |
| `filter: invert(1)` on entire page | Map colors intentionally |
| Conditional class logic in every component | One theme-aware token layer |
| `.dark .card { }` nesting everywhere | Token indirection |

---

## 15. CSS Reset & Base

### 15.1 Modern Reset

```css
@layer reset {
  *, *::before, *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  html {
    -webkit-text-size-adjust: 100%;
    tab-size: 4;
  }

  body {
    line-height: 1.5;
    -webkit-font-smoothing: antialiased;
  }

  img, picture, video, canvas, svg {
    display: block;
    max-width: 100%;
  }

  input, button, textarea, select {
    font: inherit;
    color: inherit;
  }

  p, h1, h2, h3, h4, h5, h6 {
    overflow-wrap: break-word;
  }

  #root {
    isolation: isolate;
  }
}
```

### 15.2 Base Styles

```css
@layer base {
  body {
    font-family: var(--ds-font-sans);
    font-size: var(--ds-font-size-base);
    color: var(--ds-text);
    background: var(--ds-bg);
  }

  a {
    color: var(--ds-accent);
    text-decoration-skip-ink: auto;
  }

  :focus-visible {
    outline: 2px solid var(--ds-focus-ring);
    outline-offset: 2px;
  }
}
```

---

## 16. CSS File Organization

### 16.1 Recommended Structure

```
styles/
├── layers.css           @layer declarations (import first)
├── reset.css            Modern CSS reset
├── tokens.css           All CSS custom properties
├── themes/
│   ├── light.css        Light theme values
│   └── dark.css         Dark theme values
├── base.css             HTML element defaults
├── layouts.css          Shell and layout primitives
├── utilities.css        Utility class definitions
└── components/          (or co-located with component files)
    ├── button.css
    ├── card.css
    └── modal.css
```

### 16.2 Import Order

```css
/* main.css */
@import 'layers.css';       /* 1. Layer declarations */
@import 'reset.css';        /* 2. Reset */
@import 'tokens.css';       /* 3. Design tokens */
@import 'themes/light.css'; /* 4. Default theme */
@import 'themes/dark.css';  /* 5. Alternate themes */
@import 'base.css';         /* 6. Base styles */
@import 'layouts.css';      /* 7. Layout primitives */
@import 'utilities.css';    /* 8. Utilities */
/* Components imported by their own modules / bundler */
```

---

## 17. CSS Linting & Enforcement

### 17.1 Stylelint Rules

| Rule | Purpose |
|------|---------|
| `selector-max-id: 0` | No ID selectors |
| `selector-max-specificity: "0,3,0"` | Specificity ceiling |
| `declaration-no-important: true` | No !important |
| `selector-class-pattern` | Enforce naming convention (BEM) |
| `no-descending-specificity` | Prevent specificity wars |
| `color-no-hex` | Force token usage |
| `length-zero-no-unit` | `0` not `0px` |

### 17.2 Custom Rules

```json
{
  "rules": {
    "selector-max-id": 0,
    "selector-max-specificity": "0,3,0",
    "declaration-no-important": true,
    "selector-class-pattern": "^(ds|c|l|u|is|has)-[a-z][a-z0-9-]*(__[a-z][a-z0-9-]*)?(--[a-z][a-z0-9-]*)?$"
  }
}
```

---

## 18. CSS Architecture Tokens Summary

### Complete Token Inventory

```
LAYER ORDER
  @layer reset, tokens, theme, base, layouts, components, patterns, utilities, overrides

SPECIFICITY BUDGET
  Utilities:    0,1,0
  Components:   0,1,0 to 0,2,0
  Layouts:      0,1,0
  States:       0,2,0
  Maximum:      0,3,0

NAMING CONVENTION
  Block:      .ds-{name}
  Element:    .ds-{name}__{element}
  Modifier:   .ds-{name}--{modifier}
  Layout:     .l-{name}
  Utility:    .u-{name}  or bare utility name
  State:      .is-{state}, .has-{state}
  JS Hook:    .js-{name}

CONSUMPTION HIERARCHY
  1. Shells
  2. Layout Primitives
  3. Components
  4. Semantic Classes
  5. Utility Classes
  6. Inline Styles (last resort)

PERFORMANCE BUDGET
  Total CSS:       < 50KB compressed
  Critical CSS:    < 14KB
  Selectors:       flat, max 2 levels nesting
  Animations:      transform + opacity only
```

---

*This chapter defines the complete CSS architecture for a Design System. Every layer, naming convention, specificity rule, and organizational pattern above should be present in the implemented DS.*
