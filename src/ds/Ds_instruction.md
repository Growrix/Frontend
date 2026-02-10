# Blueprint DS — Responsive Site Instructions (STRICT)

**Scope:** This repo branch is for building a **responsive web site** using the Blueprint Design System (DS).

**Primary goal:** prevent AI/human drift (hallucinations, one-off styling, random component forks) and keep builds systematic, consistent, and maintainable.

If you are building a **mobile app-like shell** (bottom nav, app bars, sheets, etc.), that is a different surface. This branch should treat those as **out of scope**.

---

## 0) The DS contract (non‑negotiable)

### Single import boundary

- ✅ **ONLY import UI from** `@/ds` (the public DS barrel).
- ❌ **NEVER import DS internals** (anything under `@/ds/*` paths).

Why: `src/ds/index.ts` is the only stable API. Internals move; the barrel is the contract.

### Styling boundary

- ✅ Use DS components, DS primitives, and DS semantic classes (`ui-*`, `text-*`).
- ✅ Let DS tokens control color/space/radius/shadows.
- ❌ Do not hardcode new visual values in app/features (no hex colors, no random px sizes, no ad-hoc shadows).
- ❌ Do not add new “UI primitive” CSS in feature folders.
- ❌ Avoid inline styles for layout/visual design.

### Responsive boundary (this branch)

- ✅ Build **one** responsive layout that adapts via DS grid/stack + DS responsive utilities.
- ❌ Do not create app-like mobile navigation (bottom nav) in public pages.
- ❌ Do not fork into separate “mobile page vs desktop page” implementations unless the DS already provides a supported pattern.

---

## 1) Where the DS actually lives (Source of Truth)

### Global style load (don’t change)

- DS CSS is loaded once by `src/app/globals.css`:

```css
@import "../ds/styles/index.css";
```

### CSS layers (don’t reorder)

`src/ds/styles/index.css` defines the DS cascade order:

- `ds.tokens` → variables + overrides
- `ds.theme` → `color-scheme` mapping
- `ds.base` → baseline element styles
- `ds.utilities` → layout/typography utilities
- `ds.components` → component class implementations

Rule: **do not** import DS CSS multiple times or change layer order.

### Tokens: what to use vs ignore

- ✅ **Token Source of Truth:** `src/ds/styles/ds.tokens.css`
- ✅ **Typed helpers:** `src/ds/foundation/tokens/*`
- ❌ **Ignore for values:** `src/ds/tokens/` (legacy folder; not the source of truth)

---

## 2) DS file tree (what to use, what to skip)

Below is the practical meaning of the DS structure.

### Core you should use (responsive web)

- `src/ds/index.ts`
  - DS public API (import from `@/ds`)
- `src/ds/styles/`
  - DS CSS implementation (tokens/utilities/components)
- `src/ds/primitives/`
  - low-level building blocks (layout + form + text)
- `src/ds/components/`
  - higher-level UI components (modal, tabs, tables, etc.)
- `src/ds/layouts/`
  - page shells: `PublicShell`, `CenteredShell`, `DocsShell`, `DashboardShell`
- `src/ds/themes/`
  - theme initialization (`ThemeInitScript`) and theme switching (`ThemeSwitcher` export)
- `src/ds/icons.ts`
  - curated icon exports

### “Web runtime” (ok to use if needed)

- `src/ds/runtime/web/*`
  - web-oriented shells + frames (primarily useful for docs/demo surfaces)

If you truly need something from this layer, import it through the DS barrel:

```ts
import { web } from "@/ds";
```

(Most pages should not need `web` directly because `PublicShell`, `DocsShell`, etc. are exported at the top level already.)

### App-like/mobile runtime (DO NOT USE for this responsive branch)

- `src/ds/runtime/app/mobile/*` (Screen/Sheet/Overlay/FloatingAction/BottomNavPreset)
- `src/ds/runtime/app/tablet/*` (SideRail presets)

This layer is available via:

```ts
import { app } from "@/ds";
```

…but **do not use it** in responsive public pages.

These are for an app-like surface. For a responsive website, they create confusion and encourage non-responsive navigation patterns.

### Advanced/optional layers (avoid unless you have a specific DS task)

These exist as part of the DS blueprint structure and may be used by the component library, but they should not be your default toolbox for building ordinary responsive pages:

- `src/ds/structures/`
- `src/ds/interactions/`
- `src/ds/patterns/`
- `src/ds/visuals/`
- `src/ds/widgets/`
- `src/ds/composition/`
- `src/ds/preview/` (preview context helpers)

Rule: if a page can be built with `layouts + primitives + components`, do that.

---

## 3) What to AVOID (common causes of messy builds)

### Avoid “mobile platform preset” in real pages

The DS supports token presets like:

- `data-density="compact"`
- `data-visual="glass" | "neumorph" | "sleek"`
- `data-platform="mobile"`

For this responsive site branch:

- ✅ `data-density` and `data-visual` are allowed **sparingly** (prefer setting once at a shell/root).
- ❌ Do **not** set `data-platform="mobile"` on public pages.

Reason: it changes touch-target and bottom-nav sizing tokens and tends to push the UI into an app-like path.

### Avoid bottom navigation in public layout

The DS contains bottom-nav styles/components (`BottomNav`, `.ui-bottom-nav`, `.ui-shell-content--pad-bottom-nav`).

For this branch:

- ❌ Do not add bottom nav to the public site.
- ❌ Do not pad page content using `.ui-shell-content--pad-bottom-nav`.

### Avoid creating new `ui-*` classes outside the DS

- ✅ Use existing DS semantic classes.
- ✅ If you must add a new `ui-*` class, add it in DS CSS (`src/ds/styles/*`) and (if relevant) update `DOC/SEMANTIC-CLASSES-REGISTRY.md`.
- ❌ Never invent `ui-*` classnames inside feature code.

---

## 4) How to build responsive pages (the safe recipe)

### Recommended building blocks

- Layout: `PublicShell`, `Container`, `Section`, `Stack`, `Grid`, `Divider`, `Spacer`
- Typography: `Text` + `text-heading-*` utilities
- Surfaces: `Card`, `Alert`, `Badge`
- Forms: `Field`, `Input`, `Select`, `Textarea`, `Checkbox`, `Radio`, `Switch`

### Keep one responsive layout

Use DS grid + responsive utilities instead of branching page logic.

- Use `Grid`/`Stack` props where available.
- Use DS responsive helpers when swapping full sections:
  - `.ui-only-mobile-block`
  - `.ui-only-desktop-block`

Rule: swapping whole sections is ok; building two separate “sites” is not.

### Skip-link requirement

The root layout includes a skip link to `#main`.

Rule: every page should ensure there is an element with `id="main"` near the top of the main content (a wrapper `div` is acceptable).

---

## 5) Theming rules (don’t reinvent)

- `ThemeInitScript` is already mounted in `src/app/layout.tsx`.
- Use `ThemeSwitcher` and DS theme helpers instead of implementing new theme logic.

Rule: do not create a second theme system, different localStorage keys, or new theme class naming.

---

## 6) If you need to extend the DS (the only allowed path)

When a screen needs a style/component that doesn’t exist:

1. Add/adjust tokens in `src/ds/styles/ds.tokens.css` (token-first)
2. Add/update DS utility/component styles in `src/ds/styles/ds.utilities.css` or `src/ds/styles/ds.components.css`
3. Add a primitive/component wrapper in `src/ds/primitives/*` or `src/ds/components/*`
4. Re-export it from `src/ds/index.ts`
5. If you add/rename a semantic `ui-*` class, update `DOC/SEMANTIC-CLASSES-REGISTRY.md`

Rule: do not patch around missing DS features inside app code.

---

## 7) Where to look for correct examples

- DS operating guide: `src/ds/DESIGN-SYSTEM-ANATOMY.md`
- Semantic class reference: `DOC/SEMANTIC-CLASSES-REGISTRY.md`
- Working examples: `src/app/component-library/*` (NOTE: it may include mobile/app-like demos; treat those as documentation, not the target UX for this branch)

---

## 8) “AI-safe” checklist (use before finishing any screen)

- [ ] All UI imports come from `@/ds`
- [ ] No hardcoded colors/spacing/shadows in feature code
- [ ] No new `ui-*` classnames invented in app code
- [ ] Page is responsive via DS grid/stack utilities
- [ ] No `data-platform="mobile"` on public pages
- [ ] No bottom-nav/app-shell patterns added to the public site
- [ ] `#main` anchor exists for skip-link
