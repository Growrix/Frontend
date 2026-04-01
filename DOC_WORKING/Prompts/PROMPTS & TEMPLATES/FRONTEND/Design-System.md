

# SolarMatch Design System SOT (Target v3)

> **IMPORTANT:** This file is the **only source of truth** for the SolarMatch (or your SaaS) frontend design system. The universal guideline (`Frontend-Design-System.md`) is for reference and examples only—**do not use its color codes or tokens as SOT**. All implementation and product decisions must be based on this file.

## Purpose
This document is the single source of truth for the *target* frontend design system, referencing but not dictated by the universal guidelines in:
`DOC/Prompts/PROMPTS & TEMPLATES/FRONTEND/Frontend-Design-System.md`.

It defines the tokens, rules, and component standards that the codebase will be refactored to match.

---

## Source of Truth (Implementation References)

These files define the *actual* system behavior. If this doc conflicts with code, **update this doc**.

- Token + theme layers
  - `src/ds/styles/ds.tokens.css` (palette + semantic + knob overrides)
  - `src/ds/styles/ds.theme.css` (color-scheme)
  - `src/ds/styles/ds.base.css` (base element styles)
  - `src/ds/styles/ds.utilities.css` (layout + typography utilities)
  - `src/ds/styles/ds.components.css` (DS component styles)
  - `src/ds/styles/index.css` (imports + layer order)
- Theme runtime
  - `src/ds/themes/registry.ts` (allowed themes + default)
  - `src/ds/themes/theme.ts` (apply/read/store/resolve)
  - `src/ds/themes/ThemeInitScript.tsx` (early theme class init in `<head>`)
- App integration
  - `src/app/layout.tsx` (fonts + theme init wiring)
  - `src/app/globals.css` (global imports)


## Design Tokens & Rules

### Colors

**Token taxonomy (Palette → Semantic → Effects)**

1) **Palette tokens** (raw building blocks; may use hex)
- Examples: `--ds-palette-neutral-50`, `--ds-palette-brand-600`, `--ds-palette-success-600`
- Live in: `src/ds/styles/ds.tokens.css`
- Overridden by theme selectors: `html.theme-dark|light|purple`

2) **Semantic tokens** (what components should consume)
- Examples: `--ds-color-background`, `--ds-color-surface`, `--ds-color-border`, `--ds-color-foreground`, `--ds-color-accent`
- Defined as mappings to palette tokens (or direct theme overrides where needed)

3) **Effects / state tokens** (derived, variant-friendly)
- Examples: `--ds-color-focus-ring`, `--ds-color-overlay`, `--ds-color-accent-hover`, `--ds-color-accent-active`

**Supported themes (separate knob)**
- Theme names are registry-driven: `dark`, `light`, `purple`
- Theme is applied as a single class on `<html>`: `theme-*`
- Theme defaults to `dark` and is stored in localStorage key `solarmatch-theme`

**Optional scales (compatibility + future expansion)**
- Neutral scale: `neutral-0..950`
- Brand scale: `brand-50..950`
- Status bases: `success|warning|danger|info-600` (scales can expand later)

**Rules (non-negotiable)**
- Outside of `src/ds/styles/ds.tokens.css`: **no hardcoded hex / rgb(a)()**. Use `var(--ds-*)`, `color-mix()`, or token-derived values.
- Components consume **semantic** tokens (not palette) unless the component is explicitly a palette viewer.
- Use `npm run ds:audit` to prevent regressions in DS style layers.

**Legacy aliases (keep vs retire — list only, no breaking changes)**

Keep for compatibility (existing DS classes/styles may rely on these):
- Keep: `--ds-color-bg`, `--ds-color-text`, `--ds-color-text-muted`, `--ds-color-surface-2`
- Keep: `--ds-color-fg`, `--ds-color-fg-muted`

Prefer going forward (canonical names):
- Prefer: `--ds-color-background`, `--ds-color-surface`, `--ds-color-border`
- Prefer: `--ds-color-foreground`, `--ds-color-foreground-secondary`
- Prefer: `--ds-color-accent`, `--ds-color-accent-foreground`

---

### Typography

Font family (universal-aligned):
- Primary: `Inter`
- Fallback stack: `Inter, Roboto, Arial, system-ui, -apple-system, "Segoe UI", sans-serif`
- Mono: `"Fira Code", Consolas, Monaco, "Courier New", monospace`

Universal size scale (token baseline):
- `0.75rem` (12px)
- `0.875rem` (14px)
- `1rem` (16px)
- `1.25rem` (20px)
- `1.5rem` (24px)
- `2rem` (32px)
- `2.5rem` (40px)

Semantic typography utilities (project standard):
- Headings: `text-heading-1` .. `text-heading-4`
- Body: `text-body`, `text-body-large`, `text-body-small`
- Meta: `text-caption`, `text-micro`, `text-label`

Responsiveness:
- Typography may be responsive via token definitions (e.g., clamp-based), but must not be applied ad-hoc via `sm:text-*` / `lg:text-*`.

Font weights:
- 400 (regular)
- 500 (medium)
- 700 (bold)

Line heights:
- 1.25 (tight)
- 1.5 (normal)
- 1.75 (relaxed)

Rules:
- Only use semantic typography utilities (e.g. `text-heading-1`, `text-body-small`).
- Do not apply breakpoint typography overrides (`sm:text-*`, `lg:text-*`). Responsiveness must live in the token definitions.

---

### Icons

Default icon system (UI):
- Use `lucide-react` **via the DS boundary**: `src/ds/icons.ts`.
- Do not import `lucide-react` directly in feature code.

Allowed exceptions:
- Brand/auth icons may remain as custom SVG components under the app boundary.

Size scale:
- `xs` = 14px
- `sm` = 16px
- `md` = 20px
- `lg` = 24px
- `xl` = 32px

Implementation standard:
- Icons should inherit current text color (default behavior); rely on semantic tokens for color.

Rules:
- Avoid inline SVGs in feature/pages. Use DS icons via `src/ds/icons.ts`.
- Icon-only buttons must have an `aria-label`.

### Spacing

Unit:
- `4px` base (`0.25rem`).

Scale:
- `0.25rem` (4px)
- `0.5rem` (8px)
- `1rem` (16px)
- `1.5rem` (24px)
- `2rem` (32px)
- `2.5rem` (40px)
- `3rem` (48px)

Semantic spacing tokens (implemented in TS):
- `card-padding`, `modal-padding`, `form-gap`, `section-margin`, `heading-margin`, `button-padding-x/y`, `input-padding`, `nav-padding`

Rules:
- No Tailwind arbitrary spacing values (`p-[...]`, `gap-[...]`, `w-[...]`) except with an explicitly documented exception.

---

### Sizing

Semantic sizing tokens (implemented via CSS variables in `src/app/globals.css` and surfaced through Tailwind):

- Hero minimum height: `min-h-hero` (backs onto `--size-hero-min-h`)
- Viewport minus header: `min-h-viewport-minus-header` (backs onto `--size-viewport-minus-header`)

Rules:
- Use semantic sizing utilities for repeated viewport/layout constraints; do not use `min-h-[...]` / `max-h-[...]` arbitrary values.

---

### Border Radius

Universal-aligned radii:
- Default: `0.25rem` (4px)
- Card/Modal: `0.5rem` (8px)
- Full: `9999px`

Rules:
- Components must use semantic radii (`rounded-card`, `rounded-modal`, etc.) mapped to these values.

---

### Shadows

Universal-aligned elevation:
- `shadow-sm`: `0 1px 3px rgba(0,0,0,0.08)`
- `shadow-md`: `0 4px 12px rgba(0,0,0,0.12)`

Rules:
- No arbitrary shadows (`shadow-[...]`).
- Shadows are semantic by elevation level (button/card/dropdown/modal).

Note:
- Neumorphic shadows may exist in the current implementation, but the **target v3** system aligns to the universal elevation model above.

---

### Motion

Default transition:
- `200ms cubic-bezier(0.4, 0, 0.2, 1)`

Rules:
- Prefer targeted transitions (`transition-colors`, `transition-shadow`, `transition-transform`, `transition-opacity`).
- Respect `prefers-reduced-motion`: disable non-essential animations.

---

### Z-Index & Layering

Universal-aligned scale:
- Modal: `1000`
- Drawer: `1100`
- Tooltip: `1200`
- Toast: `1300`
- Dropdown: `1050`

Rules:
- Prefer semantic z-index utilities mapped from tokens; avoid scattered `z-*` usage in components.

---

### Theme

Supported themes:
- `dark`, `light`, `purple` (registry-driven)

How theme switching works:
- `ThemeInitScript` runs in `<head>` to apply exactly one `theme-*` class before paint.
- Theme preference is stored in localStorage key `solarmatch-theme`.
- `applyTheme()` removes any existing `theme-*` class and adds the new one.

Separate knobs (do not conflate):
- **Theme**: `<html class="theme-dark|theme-light|theme-purple">` (brand + semantic color mapping)
- **Visual variant**: `data-visual="basic|glass|neumorph|sleek"` (mostly effects: shadows/radii)
- **Density**: `data-density="comfortable|compact"` (spacing/padding)
- **Platform**: `data-platform="web|mobile"` (touch target sizing)

Notes:
- Knobs can be applied to `<html>` for global mode or to a wrapper element to scope a single surface.
- Implementation is token-first: knobs override CSS variables; components should not branch logic on knob values.

Rules:
- Theme-aware visuals must come from CSS variables.

---

## CSS Utilities & Token Mapping

- Use DS CSS layers + classes, not Tailwind.
- Typography utilities (e.g. `text-heading-*`, `text-body-*`) live in `src/ds/styles/ds.utilities.css`.
- Layout utilities (shell/grid/sticky) live in `src/ds/styles/ds.utilities.css`.
- Component base styles live in `src/ds/styles/ds.components.css`.

Mapping rules:
- Feature UI should consume DS utilities/components instead of reinventing tokens.
- Any new repeated pattern should become a DS utility/class before proliferating in feature code.

---

## Component Conformance Checklist (Lightweight)

For any new DS component or DS style block:

- No hardcoded color values (hex/rgb/rgba) outside `ds.tokens.css`.
- Uses **semantic** tokens (`--ds-color-*`, `--ds-space-*`, `--ds-size-*`, `--ds-shadow-*`, `--ds-radius-*`).
- Variant-safe: looks acceptable under `data-visual=basic|glass|neumorph|sleek` without changing APIs.
- Density-safe: padding/gaps respond to `data-density=compact` via variables (no fixed pixel paddings).
- Platform-safe: touch targets respect `--ds-size-touch-target` (and thus `data-platform=mobile`).
- Theme-safe: readable under `theme-dark|light|purple` (contrast sanity check).
- Passes governance: `npm run ds:audit` and `npm run verify`.

---

## Component & Layout Guidelines

### Breakpoints & Grid (Universal)

Breakpoints:
- xs: 0–480px
- sm: 481–768px
- md: 769–1024px
- lg: 1025–1440px (optimize for 1366×768 and 1440×900)
- xl: 1441–1920px
- xxl: 1921px+

Grid:
- 12-column fluid grid
- Gutters: `0.5rem`, `1rem`, `1.5rem`

### Components

Button:
- Variants: primary, secondary, text/ghost, icon, fab
- States: default, hover, active, disabled, loading

Card:
- Use consistent padding + elevation + radius

Input:
- Label, helper text, error state, disabled state
- Use `aria-invalid` and `aria-describedby` for errors

Modal/Drawer:
- Desktop: centered
- Mobile: full-screen or bottom sheet
- Must have focus trap + ESC close

Alert/Toast:
- success/error/info/warning
- Mobile: bottom slide-in, swipe-to-dismiss where feasible

Navigation:
- Desktop: top bar / side nav as needed
- Mobile: bottom navigation for primary actions

### Layout & Responsiveness

Desktop:
- Use max-width containers and avoid sparse layouts at laptop resolutions.

Mobile app-like rules:
- Touch targets: minimum 44×44px (`2.75rem`)
- Prefer bottom nav and bottom sheets
- Avoid dense typography; use semantic scale

---

## Accessibility & UX

- WCAG 2.1 AA contrast in all themes
- Visible focus states for all interactive elements
- Keyboard navigation must work end-to-end
- Dialogs must trap focus and restore focus on close
- Reduced motion supported via `prefers-reduced-motion`

---

## Image & Media

- Use `next/image` for all product imagery.
- Responsive images: provide `sizes` and correct intrinsic `width`/`height`.
- Lazy load by default unless the image is LCP-critical.
- Prefer WebP/AVIF where possible.

---

## Forms & Validation

- States: default, focus, error, disabled, success.
- Accessibility: use `aria-invalid` and `aria-describedby` for errors.
- Touch targets: interactive controls should meet the 44×44px minimum where feasible.

---

## Internationalization (i18n)

- Plan for multiple languages, including RTL support.
- Ensure font stacks support required scripts.

---

## Testing & QA

- Test all themes (dark/light/purple), key breakpoints, and WCAG AA contrast.
- Verify keyboard navigation and focus management for dialogs/menus.

---

## Branding

- Logo: SolarMatch wordmark + sun icon (document exact assets and usage)
- Icons: Standardize on a single set (preferred: Lucide or Material Icons) and document size/stroke rules
- Imagery: Use `next/image`, responsive sizing, lazy load by default

---

## Usage Guidelines

- Always use semantic tokens for colors/typography/spacing; never hardcode values.
- Prefer `src/ds/components/**` and `src/ds/styles/**` for design-system components and styling.
- Enforce with scripts:
  - `npm run verify`
  - `npm run ds:audit`

---

## Instructions

- When adding UI:
  1) Choose the semantic component (Button/Card/Input/Modal) first.
  2) Use semantic classes and tokens only.
  3) Verify in all themes (dark/light/purple) and at key breakpoints.
- Keep this file updated as the system evolves; changes should be traceable.
