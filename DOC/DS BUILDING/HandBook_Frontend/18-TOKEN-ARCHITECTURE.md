# 18 — Token Architecture

> Everything a Design System needs for design tokens — the three-tier token model, naming conventions, token types, token formats, cross-platform delivery, design tool synchronization, token governance, and the infrastructure that bridges design and code.

---

## Table of Contents

1. [Token Philosophy](#1-token-philosophy)
2. [Three-Tier Token Model](#2-three-tier-token-model)
3. [Primitive Tokens](#3-primitive-tokens)
4. [Semantic Tokens](#4-semantic-tokens)
5. [Component Tokens](#5-component-tokens)
6. [Token Naming Convention](#6-token-naming-convention)
7. [Token Types](#7-token-types)
8. [Token Formats & Delivery](#8-token-formats--delivery)
9. [Design Token Standard (DTCG)](#9-design-token-standard-dtcg)
10. [Token Resolution & Aliasing](#10-token-resolution--aliasing)
11. [Token Governance](#11-token-governance)
12. [Token Tooling](#12-token-tooling)
13. [Design Tool Synchronization](#13-design-tool-synchronization)
14. [Multi-Platform Tokens](#14-multi-platform-tokens)
15. [Token Documentation](#15-token-documentation)
16. [Token Architecture Summary](#16-token-architecture-summary)

---

## 1. Token Philosophy

### 1.1 What Are Design Tokens?

Design tokens are the **atomic design decisions** of a Design System — named entities that store visual design attributes (colors, spacing, typography, etc.) as platform-agnostic key-value pairs.

### 1.2 Core Principles

1. **Single source of truth** — tokens define every visual decision once.
2. **Platform agnostic** — tokens translate to CSS, iOS, Android, Flutter.
3. **Human readable** — developers and designers both understand token names.
4. **Versionable** — tokens have semver, changesets, and release notes.
5. **Layered** — raw values → semantic intent → component context.
6. **Complete** — if a visual property exists, a token defines it.

### 1.3 Why Not Hard-Code Values?

```css
/* Without tokens: scattered, inconsistent */
.card   { border-radius: 8px; background: #fff; }
.modal  { border-radius: 12px; background: white; }
.panel  { border-radius: 8px; background: #fafafa; }

/* With tokens: centralized, consistent */
.card   { border-radius: var(--ds-radius-md); background: var(--ds-surface); }
.modal  { border-radius: var(--ds-radius-lg); background: var(--ds-surface-overlay); }
.panel  { border-radius: var(--ds-radius-md); background: var(--ds-surface); }
```

---

## 2. Three-Tier Token Model

### 2.1 Architecture

```
┌─────────────────────────────────────────────────┐
│                Component Tokens                  │
│  --ds-button-bg, --ds-card-radius                │
│  (scoped to a single component)                  │
├─────────────────────────────────────────────────┤
│                Semantic Tokens                   │
│  --ds-bg, --ds-text, --ds-accent, --ds-border    │
│  (describe intent, not raw value)                │
├─────────────────────────────────────────────────┤
│               Primitive Tokens                   │
│  --ds-blue-500, --ds-gray-900, --ds-space-4      │
│  (raw palette values, context-free)              │
└─────────────────────────────────────────────────┘
```

### 2.2 Resolution Flow

```
Component CSS references → Component Token
  → resolves to → Semantic Token
    → resolves to → Primitive Token
      → resolves to → Raw Value

Example:
background: var(--ds-button-bg)              ← component token
  → var(--ds-accent)                         ← semantic token
    → var(--ds-blue-600)                     ← primitive token
      → #2563eb                              ← raw value
```

### 2.3 Tier Responsibilities

| Tier | Who Defines | Who Consumes | Changes When |
|------|------------|--------------|-------------|
| Primitive | DS core team | Semantic tokens | Palette changes (rare) |
| Semantic | DS core team | Components, app code | Theme changes (medium) |
| Component | Component author | Component CSS | Component redesign (frequent) |

---

## 3. Primitive Tokens

### 3.1 What They Are

Raw, context-free values. The complete palette:

```
COLORS
  --ds-white:     #ffffff
  --ds-black:     #000000
  --ds-gray-50:   #f9fafb
  --ds-gray-100:  #f3f4f6
  --ds-gray-200:  #e5e7eb
  --ds-gray-300:  #d1d5db
  --ds-gray-400:  #9ca3af
  --ds-gray-500:  #6b7280
  --ds-gray-600:  #4b5563
  --ds-gray-700:  #374151
  --ds-gray-800:  #1f2937
  --ds-gray-900:  #111827
  --ds-gray-950:  #030712

  (same 50-950 scale for: blue, red, green, amber, purple, etc.)

SPACING
  --ds-space-0:   0
  --ds-space-px:  1px
  --ds-space-0.5: 0.125rem   (2px)
  --ds-space-1:   0.25rem    (4px)
  --ds-space-2:   0.5rem     (8px)
  --ds-space-3:   0.75rem    (12px)
  --ds-space-4:   1rem       (16px)
  --ds-space-5:   1.25rem    (20px)
  --ds-space-6:   1.5rem     (24px)
  --ds-space-8:   2rem       (32px)
  --ds-space-10:  2.5rem     (40px)
  --ds-space-12:  3rem       (48px)
  --ds-space-16:  4rem       (64px)
  --ds-space-20:  5rem       (80px)
  --ds-space-24:  6rem       (96px)

FONT SIZES
  --ds-font-xs:   0.75rem    (12px)
  --ds-font-sm:   0.875rem   (14px)
  --ds-font-base: 1rem       (16px)
  --ds-font-lg:   1.125rem   (18px)
  --ds-font-xl:   1.25rem    (20px)
  --ds-font-2xl:  1.5rem     (24px)
  --ds-font-3xl:  1.875rem   (30px)
  --ds-font-4xl:  2.25rem    (36px)

RADII
  --ds-radius-none: 0
  --ds-radius-sm:   0.25rem  (4px)
  --ds-radius-md:   0.5rem   (8px)
  --ds-radius-lg:   0.75rem  (12px)
  --ds-radius-xl:   1rem     (16px)
  --ds-radius-2xl:  1.5rem   (24px)
  --ds-radius-full: 9999px
```

### 3.2 Rules

1. Primitive tokens have no opinion — `gray-500` doesn't mean "text color."
2. Never reference primitive tokens directly in component CSS.
3. Complete coverage: every color shade, every spacing step.
4. Stable and rarely changed.

---

## 4. Semantic Tokens

### 4.1 What They Are

Tokens that describe **intent**, not raw value:

```
BACKGROUNDS
  --ds-bg:                  page background
  --ds-bg-subtle:           faintly tinted background
  --ds-bg-muted:            distinctly muted background
  --ds-bg-inverse:          dark on light, light on dark

SURFACES
  --ds-surface:             card / panel background
  --ds-surface-raised:      elevated surface
  --ds-surface-overlay:     modal / overlay background
  --ds-surface-sunken:      inset / recessed area

TEXT
  --ds-text:                primary text
  --ds-text-secondary:      secondary / supporting text
  --ds-text-muted:          disabled / placeholder text
  --ds-text-inverse:        text on inverse background
  --ds-text-link:           hyperlink text

BORDERS
  --ds-border:              default border
  --ds-border-subtle:       light / faint border
  --ds-border-strong:       prominent border
  --ds-border-focus:        focus ring color

INTERACTIVE
  --ds-accent:              primary interactive color
  --ds-accent-hover:        hover state
  --ds-accent-active:       active / pressed state
  --ds-accent-subtle:       light tint for backgrounds
  --ds-accent-text:         text on accent bg

STATUS
  --ds-success:             success icon / bg
  --ds-success-text:        success text
  --ds-error:               error icon / bg
  --ds-error-text:          error text
  --ds-warning:             warning icon / bg
  --ds-warning-text:        warning text
  --ds-info:                info icon / bg
  --ds-info-text:           info text
```

### 4.2 How They Resolve

```css
/* Light theme */
[data-theme="light"] {
  --ds-bg: var(--ds-white);
  --ds-text: var(--ds-gray-900);
  --ds-surface: var(--ds-white);
  --ds-border: var(--ds-gray-200);
  --ds-accent: var(--ds-blue-600);
}

/* Dark theme */
[data-theme="dark"] {
  --ds-bg: var(--ds-gray-950);
  --ds-text: var(--ds-gray-50);
  --ds-surface: var(--ds-gray-900);
  --ds-border: var(--ds-gray-700);
  --ds-accent: var(--ds-blue-400);
}
```

### 4.3 Rules

1. Semantic tokens are the **primary consumers** of primitive tokens.
2. Application and component code reference semantic tokens.
3. Semantic tokens change value per theme — their name stays the same.
4. Name by purpose, not value: `--ds-text` not `--ds-dark-gray`.
5. Complete: every visual property a component might need has a semantic token.

---

## 5. Component Tokens

### 5.1 What They Are

Tokens scoped to a specific component, enabling per-component customization:

```
BUTTON
  --ds-button-bg:           var(--ds-accent)
  --ds-button-text:         var(--ds-accent-text)
  --ds-button-border:       transparent
  --ds-button-radius:       var(--ds-radius-md)
  --ds-button-padding-x:    var(--ds-space-4)
  --ds-button-height:       var(--ds-control-height-md)

CARD
  --ds-card-bg:             var(--ds-surface)
  --ds-card-border:         var(--ds-border)
  --ds-card-radius:         var(--ds-radius-lg)
  --ds-card-padding:        var(--ds-space-6)
  --ds-card-shadow:         var(--ds-shadow-md)

INPUT
  --ds-input-bg:            var(--ds-surface)
  --ds-input-border:        var(--ds-border)
  --ds-input-radius:        var(--ds-radius-md)
  --ds-input-height:        var(--ds-control-height-md)
  --ds-input-padding-x:     var(--ds-space-3)
  --ds-input-placeholder:   var(--ds-text-muted)
  --ds-input-focus-ring:    var(--ds-accent)
```

### 5.2 When to Use Component Tokens

| Use Component Tokens | Use Semantic Tokens Directly |
|---------------------|------------------------------|
| Component has many visual properties | Simple component (1-2 properties) |
| Component needs brand customization | Standard styling via semantics |
| Multiple variants with different values | Only variants from semantic |
| White-label / multi-tenant | Single-brand product |

### 5.3 Rules

1. Component tokens default to semantic tokens.
2. Define on the component's root class (CSS custom property scope).
3. Document every component token.
4. Don't create component tokens prematurely — start with semantic, extract when needed.

---

## 6. Token Naming Convention

### 6.1 Pattern

```
--ds-{category}-{property}-{variant}-{state}

Parts:
  ds          namespace
  category    color, space, font, radius, shadow, motion, z
  property    bg, text, border, size, weight, duration, etc.
  variant     primary, secondary, muted, subtle (optional)
  state       hover, active, disabled, focus (optional)
```

### 6.2 Examples

```
--ds-color-bg                  page background
--ds-color-bg-subtle           subtle background
--ds-color-text                primary text
--ds-color-text-secondary      secondary text
--ds-color-border              default border
--ds-color-accent              primary accent
--ds-color-accent-hover        accent on hover

--ds-space-1                   4px
--ds-space-4                   16px

--ds-font-size-sm              14px
--ds-font-weight-bold          700

--ds-radius-md                 8px

--ds-shadow-md                 medium elevation

--ds-motion-duration-fast      150ms
--ds-motion-easing-ease-out    cubic-bezier(0, 0, 0.2, 1)

--ds-z-modal                   500
```

### 6.3 Naming Rules

1. **Kebab-case** for everything.
2. **Namespace prefix** (`ds-`) to avoid collisions.
3. **Category first** for discoverability.
4. **Generic before specific** — `--ds-text` before `--ds-text-secondary`.
5. **Never encode raw value** in the name — `--ds-blue-500` is fine for primitives, not for semantic.
6. **Consistent modifiers** — use the same adjectives everywhere: `subtle`, `muted`, `strong`, `inverse`.

---

## 7. Token Types

### 7.1 All Token Categories

| Category | Token Type | Examples |
|----------|-----------|---------|
| **Color** | Color/hex/rgba | `#2563eb`, `rgba(0,0,0,0.5)` |
| **Spacing** | Dimension | `4px`, `1rem`, `0.5rem` |
| **Font size** | Dimension | `14px`, `1rem` |
| **Font family** | String | `'Inter', sans-serif` |
| **Font weight** | Number | `400`, `600`, `700` |
| **Line height** | Number or dimension | `1.5`, `24px` |
| **Letter spacing** | Dimension | `0.025em`, `-0.01em` |
| **Border width** | Dimension | `1px`, `2px` |
| **Border radius** | Dimension | `8px`, `9999px` |
| **Shadow** | Shadow composite | `0 4px 6px rgba(0,0,0,0.1)` |
| **Opacity** | Number (0–1) | `0.5`, `0.8` |
| **Z-index** | Number | `100`, `500`, `1000` |
| **Duration** | Time | `150ms`, `300ms` |
| **Easing** | Cubic-bezier | `cubic-bezier(0.4, 0, 0.2, 1)` |
| **Sizing** | Dimension | `40px`, `320px` |
| **Gradient** | Gradient | `linear-gradient(...)` |  

### 7.2 Composite Tokens

Some tokens are composites of multiple values:

```
Typography composite:
  --ds-heading-1:
    font-family: var(--ds-font-heading)
    font-size: var(--ds-font-4xl)
    font-weight: var(--ds-font-weight-bold)
    line-height: var(--ds-leading-tight)
    letter-spacing: var(--ds-tracking-tight)

Shadow composite:
  --ds-shadow-lg:
    0 10px 15px -3px rgba(0, 0, 0, 0.1),
    0 4px 6px -4px rgba(0, 0, 0, 0.1)
```

---

## 8. Token Formats & Delivery

### 8.1 CSS Custom Properties

```css
:root {
  --ds-blue-500: #3b82f6;
  --ds-space-4: 1rem;
  --ds-radius-md: 0.5rem;
}
```

### 8.2 JavaScript / TypeScript Object

```typescript
export const tokens = {
  color: {
    blue: {
      500: '#3b82f6',
    },
  },
  space: {
    4: '1rem',
  },
  radius: {
    md: '0.5rem',
  },
} as const;
```

### 8.3 JSON (Portable Format)

```json
{
  "color": {
    "blue": {
      "500": { "$value": "#3b82f6", "$type": "color" }
    }
  },
  "space": {
    "4": { "$value": "1rem", "$type": "dimension" }
  }
}
```

### 8.4 SCSS Variables

```scss
$ds-blue-500: #3b82f6;
$ds-space-4: 1rem;
$ds-radius-md: 0.5rem;
```

### 8.5 Multi-Format Output

One source → many outputs via build tools:

```
tokens.json (source)
    ├── tokens.css      (CSS custom properties)
    ├── tokens.ts       (TypeScript constants)
    ├── tokens.scss     (SCSS variables)
    ├── tokens.xml      (Android resources)
    └── tokens.swift    (iOS UIKit/SwiftUI)
```

---

## 9. Design Token Standard (DTCG)

### 9.1 W3C Design Tokens Community Group

The emerging standard for token interchange:

```json
{
  "color": {
    "brand": {
      "primary": {
        "$value": "#2563eb",
        "$type": "color",
        "$description": "Primary brand color"
      }
    }
  }
}
```

### 9.2 Key Properties

| Property | Purpose |
|----------|---------|
| `$value` | The token's value |
| `$type` | Value type (color, dimension, fontFamily, etc.) |
| `$description` | Human-readable description |
| `$extensions` | Vendor-specific metadata |

### 9.3 Token References (Aliases)

```json
{
  "color": {
    "blue": {
      "600": { "$value": "#2563eb", "$type": "color" }
    },
    "brand": {
      "primary": { "$value": "{color.blue.600}", "$type": "color" }
    }
  }
}
```

`{color.blue.600}` is a reference that resolves to the primitive token.

---

## 10. Token Resolution & Aliasing

### 10.1 Alias Chain

```
Component Token → Semantic Token → Primitive Token → Raw Value

--ds-button-bg
  → --ds-accent              (alias)
    → --ds-blue-600          (alias)
      → #2563eb              (resolved value)
```

### 10.2 CSS Resolution

```css
:root {
  /* Primitive */
  --ds-blue-600: #2563eb;

  /* Semantic aliases primitive */
  --ds-accent: var(--ds-blue-600);

  /* Component aliases semantic */
  --ds-button-bg: var(--ds-accent);
}
```

### 10.3 Rules

1. Maximum alias depth: 3 levels (component → semantic → primitive).
2. No circular references.
3. Build tools should resolve and validate chains.
4. Document the full resolution path for each token.

---

## 11. Token Governance

### 11.1 Who Owns Tokens

| Tier | Owner | Approval |
|------|-------|----------|
| Primitive | DS core team | Team lead |
| Semantic | DS core team | Team consensus |
| Component | Component author | Code review |

### 11.2 Token Change Process

1. **Propose**: describe the change and its impact.
2. **Audit**: identify all consumers of the token.
3. **Review**: DS team reviews for consistency.
4. **Deprecate** (if renaming): add `@deprecated` and alias.
5. **Release**: semver bump and changelog.
6. **Migrate**: update consumers within grace period.
7. **Remove**: delete deprecated token after migration.

### 11.3 Versioning

| Change | Semver |
|--------|--------|
| Add new token | Minor |
| Rename token (with deprecation alias) | Minor |
| Change token value | Patch (if subtle) or Minor |
| Remove token | Major |
| Change token type | Major |

### 11.4 Deprecation

```css
/* Deprecated: use --ds-bg-subtle instead */
--ds-bg-alt: var(--ds-bg-subtle);
```

In JSON:
```json
{
  "color": {
    "bg-alt": {
      "$value": "{color.bg-subtle}",
      "$deprecated": "Use color.bg-subtle instead. Will be removed in v3.0."
    }
  }
}
```

---

## 12. Token Tooling

### 12.1 Build Tools

| Tool | Purpose |
|------|---------|
| **Style Dictionary** (Amazon) | Transform tokens from JSON to CSS, JS, iOS, Android |
| **Theo** (Salesforce) | Token transformation pipeline |
| **Tokens Studio** (Figma plugin) | Figma → JSON → code pipeline |
| **Token Transformer** | Transform Tokens Studio output to Style Dictionary |

### 12.2 Style Dictionary Example

```javascript
// config.js
module.exports = {
  source: ['tokens/**/*.json'],
  platforms: {
    css: {
      transformGroup: 'css',
      buildPath: 'build/css/',
      files: [{
        destination: 'tokens.css',
        format: 'css/variables',
      }],
    },
    js: {
      transformGroup: 'js',
      buildPath: 'build/js/',
      files: [{
        destination: 'tokens.js',
        format: 'javascript/es6',
      }],
    },
  },
};
```

### 12.3 CI/CD Integration

```
On token change:
  1. Validate token JSON schema
  2. Check for circular references
  3. Build all platform outputs
  4. Run visual regression tests
  5. Publish to package registry
  6. Notify consumers
```

---

## 13. Design Tool Synchronization

### 13.1 Figma Variables → Code Tokens

```
Figma Variables (collections + modes)
    ↓ Export via Tokens Studio plugin
Token JSON (DTCG format)
    ↓ Transform via Style Dictionary
CSS Custom Properties + JS constants + iOS/Android values
```

### 13.2 Sync Direction

| Direction | When | How |
|-----------|------|-----|
| **Design → Code** | Designers update tokens in Figma | Plugin export → PR → review → merge |
| **Code → Design** | Engineers add new tokens | JSON update → plugin import |
| **Bidirectional** | Ongoing maintenance | Git as source of truth, plugin syncs both ways |

### 13.3 Rules

1. **Single source of truth**: pick code (JSON) or design tool — never both.
2. **Automation**: manual copy-paste is fragile.
3. **Version control**: tokens live in Git, not just in Figma.
4. **Review process**: token changes go through code review.
5. **Validation**: automated checks for naming, completeness, contrast.

---

## 14. Multi-Platform Tokens

### 14.1 Platform-Specific Output

| Platform | Format | Units |
|----------|--------|-------|
| Web (CSS) | Custom Properties | px, rem, hex, rgba |
| Web (JS) | ES module constants | strings |
| iOS (Swift) | UIColor extensions | CGFloat, UIColor |
| iOS (SwiftUI) | Color extensions | Double, Color |
| Android (XML) | Resource values | dp, sp, @color |
| Android (Compose) | Kt objects | Dp, Sp, Color |
| Flutter | Dart constants | double, Color |
| React Native | JS objects | number (dp) |

### 14.2 Unit Conversion

| Web | iOS | Android |
|-----|-----|---------|
| 16px / 1rem | 16pt | 16dp |
| #2563eb | UIColor(red: 0.145, ...) | @color/blue_600 |
| 400ms | 0.4 seconds | 400L (ms) |

---

## 15. Token Documentation

### 15.1 What to Document Per Token

| Field | Required | Example |
|-------|----------|---------|
| Name | Yes | `--ds-accent` |
| Value | Yes | `#2563eb` |
| Tier | Yes | Semantic |
| Type | Yes | Color |
| Description | Yes | Primary interactive / brand color |
| Resolves to | If alias | `--ds-blue-600` |
| Used by | Recommended | Button, Link, Badge |
| Added in | Recommended | v1.0.0 |
| Deprecated | If applicable | v2.3.0 — use --ds-brand-primary |

### 15.2 Token Documentation Site

Present tokens as a searchable, filterable reference:
- Color swatches with contrast info.
- Spacing visualized as bars.
- Typography rendered in actual fonts.
- Shadow previewed visually.
- Copy-to-clipboard on any token name.
- Filter by tier, type, theme.

---

## 16. Token Architecture Summary

### Complete Token Inventory

```
TIERS
  Primitive   → raw palette, scale values (never used directly in components)
  Semantic    → intent-based names (primary layer for component consumption)
  Component   → scoped to one component (optional, for customization)

NAMING
  Pattern:    --ds-{category}-{property}-{variant}-{state}
  Case:       kebab-case
  Namespace:  ds-
  Max depth:  4 segments (category-property-variant-state)

CATEGORIES
  color       → bg, text, border, accent, status colors
  space       → 0, px, 0.5, 1, 2, 3, 4, 5, 6, 8, 10, 12, 16, 20, 24
  font        → size, weight, family, line-height, letter-spacing
  radius      → none, sm, md, lg, xl, 2xl, full
  shadow      → none, sm, md, lg, xl
  motion      → duration, easing
  z           → index layers
  size        → control heights, icon sizes

FORMATS
  Source:     JSON (DTCG) or CSS
  Outputs:    CSS, JS/TS, SCSS, Swift, Kotlin, XML, Dart

TOOLING
  Build:      Style Dictionary, Tokens Studio
  Sync:       Figma Variables ↔ JSON ↔ Code
  CI:         Validate → Build → Test → Publish

GOVERNANCE
  Add token:    Minor version
  Rename:       Minor (with deprecation alias)
  Remove:       Major version
  Value change: Patch or Minor
  Owner:        DS core team (primitives/semantic), component author (component)
```

---

*This chapter defines the complete token architecture for a Design System. Every tier, naming convention, format, governance rule, and tooling integration above should be present in the implemented DS.*
