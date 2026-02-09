# DS Overall Report (2026-02-09)

## Scope of this report
This report reviews the current Design System (DS) implementation under `src/ds` against:
- The **baseline blueprint** (Design_system_Blueprint.md)
- The **updated blueprint** (Design_system_Update.md)

It focuses on:
- Architecture correctness (folder/layer model)
- Boundary enforcement (single public entry, “pages are consumers”)
- Token/theme centralization
- Platform/runtime readiness (web + app-like + tablet scaffolds)
- Production readiness gaps (docs, tooling, CI, stability)


## 1) High-level status
### ✅ What is already solid
- **Single public entry** exists: `src/ds/index.ts` is the intended import surface.
- **DS-first CSS pipeline** is centralized: `src/app/globals.css` only imports `src/ds/styles/index.css`.
- **Theme initialization** is centralized: `ThemeInitScript` runs once in `src/app/layout.tsx`.
- **Shell/layout ownership** exists and is tested: `PublicShell`, `DashboardShell`, `CenteredShell`, `DocsShell` and Jest snapshot tests pass.
- **No inline styles rule in DS** is enforced via ESLint.
- **Runtime scaffolds exist** (`src/ds/runtime/web` and `src/ds/runtime/app/mobile|tablet`) for “app-like UI” vs responsive UI.

### ✅ Repo is green (verifiable)
- `npm run verify` passes (lint + tests + build).
- `npm run ds:audit` now passes after fixing a false-positive rule.


## 2) Blueprint compliance (what matches)
### 2.1 Centralized design & no design logic in pages
- ✅ Tokens + theme variables are centralized in CSS (`src/ds/styles/ds.tokens.css`, `src/ds/styles/ds.theme.css`).
- ✅ Pages mostly **compose** DS components and shells instead of inventing new styles.
- ✅ Import boundary for app code is enforced:
  - In `eslint.config.mjs`, app code cannot import from `@/ds/*` subpaths; only `@/ds`.

### 2.2 Layer model exists (updated blueprint)
`src/ds/` contains the updated blueprint “platform DS” layers:
- `foundation/` (tokens/themes/semantics/motion/a11y)
- `primitives/`
- `structures/`
- `interactions/`
- `patterns/`
- `visuals/`
- `widgets/`
- `runtime/` (web + app/mobile + app/tablet)
- `composition/` (blocks/patterns/templates)

This matches the updated blueprint’s **phase merge** idea.

### 2.3 “App-like UI is not responsive UI”
This concept is correctly represented in code:
- Responsive behavior exists in utilities (grid breakpoints), BUT
- App-like surfaces exist separately via runtime primitives:
  - `runtime/app/mobile/Screen`, `Sheet`, `Overlay`, `FloatingAction`, `BottomNavPreset`
  - `runtime/app/tablet/SideRail`, `SideRailPreset`

That separation is aligned with the updated blueprint.


## 3) What is confusing / inaccurate vs the updated blueprint (and what it *really* means)
### 3.1 “Intent-based” in the updated blueprint
The updated blueprint says: “One intent → multiple platforms → predictable UI”.

**Important clarification:**
- Your current repo is a **web DS** (React DOM) with platform-aware **runtime scaffolds**.
- It is NOT a fully automatic “intent → generated UI” engine.

In practice, “intent-based” usually means one (or more) of these:
1) **Intent-driven API (recommended DS interpretation):**
   - Components expose props like `intent`, `tone`, `size`, `density`, `state`.
   - The DS maps those props to tokens/classes.
   - Developers still compose screens manually.

2) **Config-driven composition (bigger system):**
   - A JSON/schema describes a screen intent.
   - A renderer builds the screen from DS blocks/templates.

3) **AI-driven generation (experimental):**
   - Natural-language intent produces layout.

✅ Your DS currently implements (1) in many places (tone/variant/etc), and scaffolds a path toward (2) via `composition/templates/PageTemplate`.
❌ It does NOT implement (2) or (3) as a production “generator”.

So: the “app-home” demo you asked for is **composition-based**, and that is normal for a DS.


## 4) Findings (things to fix or tighten)
### 4.1 DS audit script false-positive (fixed)
- `npm run ds:audit` was flagging `rgb(var(--...))` as “hardcoded rgb”.
- This is token-driven and allowed.
- ✅ Fixed in `scripts/ds-audit.mjs` to ignore token-driven rgb calls.

### 4.2 Empty `src/ds/tokens/` folder (confusing)
- The repo has `src/ds/tokens/` but it is empty.
- Tokens are actually implemented in:
  - CSS: `src/ds/styles/ds.tokens.css`
  - Metadata surface: `src/ds/foundation/tokens/*`

**Recommendation:**
- Either remove `src/ds/tokens/` if unused, OR
- Add a short README.md explaining “tokens live in CSS; foundation exports typed var references”.

### 4.3 `src/ds/index.ts` export hygiene
`src/ds/index.ts` currently exports some files redundantly:
- `export * from "./components/ContextMenu.tsx";` plus a named export line.
- Same pattern for `ResourceTable.tsx`.

Not a functional bug, but it can create:
- Confusion about canonical exports
- Risk of duplicate type exports in some setups

**Recommendation:** keep one style per file (either `export *` or named export), consistently.

### 4.4 README / docs are still generic Next.js
`README.md` is still boilerplate from create-next-app.

**Recommendation:** add a DS-focused README explaining:
- import rules: `import { Button } from "@/ds"`
- token/theme model
- how to add a new component (TS + CSS)
- how to run: `verify`, `ds:audit`


## 5) How this DS should be used (developer workflow)
### 5.1 The rule of the system
- **App/pages are consumers**: pages assemble shells + components; pages do not define layout rules.
- **Design is centralized**: tokens/themes/CSS classes live in DS.
- **One import surface**: app code should import only from `@/ds`.

### 5.2 Typical page build workflow (example)
Example: building an app-like page.

1) Pick a shell/layout (layout ownership lives in DS)
- `PublicShell` for marketing/public
- `DashboardShell` for app-like pages
- `DocsShell` for docs

2) Compose DS components
- `Section`, `Grid`, `Stack`, `Card`, `List`, `Field/Input`, etc.

3) Use runtime surfaces when you want “app-like” behavior
- For mobile-app-like structure: `runtime.app.mobile.Screen`, `Sheet`, `Overlay`, `FloatingAction`, bottom nav presets.
- For tablet app-like navigation: `runtime.app.tablet.SideRailPreset`.

**Key point:**
- Responsive layout = “same page adapts to width”
- App-like UI = “screen + surfaces + fixed nav patterns”
You can have both, but they are different concerns.

### 5.3 How to add a new DS component (safe process)
- Create component in `src/ds/primitives` or `src/ds/components` (depending on level).
- Add CSS classes to `src/ds/styles/ds.components.css` and/or `ds.utilities.css`.
- Expose it via `src/ds/index.ts`.
- Run:
  - `npm run verify`
  - `npm run ds:audit`


## 6) Production readiness checklist (what’s still needed)
### 6.1 Minimum requirements (recommended before using for real apps)
- **Docs:** DS README + “how to add component” + “token/theme rules”.
- **CI:** run `npm run verify` on every PR/commit.
- **Visual regression (optional but valuable):** screenshot regression tests or a preview app.
- **Accessibility checks:** you have focus-ring patterns; consider adding a small a11y test suite for key components.

### 6.2 Platform reality check
Right now this DS is production-ready for:
- Web apps (including “app-like web”)

To be production-ready for:
- **Real native mobile apps** (React Native), you need a separate renderer layer/package.
  - The updated blueprint’s “web/app/native mapping” is an architectural concept.
  - Your current repo runs on Next.js (DOM). It cannot render `Pressable` etc without a native runtime.

The current approach is still correct: build a strong web DS platform first, then add cross-platform rendering later.


## 7) Summary (actionable)
### ✅ Good
- Architecture matches both blueprints (baseline + updated).
- Boundaries are enforced (single DS entry; no inline DS styles).
- Layout shells exist and are tested.
- Runtime layers exist for app-like mental model.
- Build is green.

### ⚠️ Improve next
- Clarify/clean `src/ds/tokens/` (empty folder) to reduce confusion.
- Normalize exports in `src/ds/index.ts` (remove redundant export patterns).
- Replace boilerplate `README.md` with DS-focused documentation.

### ✅ Recommended “production-ready” configuration
- Add CI that runs: `npm run verify` + `npm run ds:audit`.
- Add a short DS “contribution guide” (new component checklist).

