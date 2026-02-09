# DS Audit + Implementation Plan (Old Blueprint → Updated Blueprint)

**Repo**: Blueprint (Next.js App Router)

**Audit date**: 2026-02-09

**Inputs**
- Old blueprint: `DOC/Prompts/PROMPTS & TEMPLATES/FRONTEND/Design_system_Blueprint.md`
- Updated blueprint: `DOC/Prompts/PROMPTS & TEMPLATES/FRONTEND/Design_system_Update.md`

---

## 1) What the Updated Blueprint Added (Delta)

The updated blueprint upgrades “Design System” into a **Design System Platform**:

### A) Phases + Architecture Lock
- Adds **Phase 0: Architecture Lock** (folders, naming, runtime rules) as a first-class requirement.
- Reframes Phase 1/2/3 as **layers of one system**, not separate projects.

### B) New canonical DS structure (major)
Old blueprint: `ds/{tokens,themes,primitives,components,layouts,styles}`

Updated blueprint: `ds/` becomes a platform with these explicit layers:
- `ds/foundation/`: `tokens/`, `themes/`, `semantics/`, `motion/`, `a11y/` (+ `foundation/index.ts`)
- `ds/primitives/`
- `ds/structures/` (Stack/Grid/Card/Container clearly separated)
- `ds/interactions/` (Modal/Tooltip/Dropdown/Popover)
- `ds/patterns/` (Skeleton/EmptyState/ErrorBlock/AsyncBoundary)
- `ds/visuals/` (Glow/Noise/etc)
- `ds/widgets/` (StatWidget/ListWidget/MediaWidget/WidgetShell)
- **Phase 3 runtime**: `ds/runtime/web/*` and `ds/runtime/app/{mobile,tablet}/*`
- `ds/composition/{blocks,patterns,templates}` (WP-like composition power)

### C) Platform runtime contract (most important change)
- “One intent → multiple platforms → predictable UI”
- Runtime decides rendering; **no breakpoint-driven logic changes**.
- Widgets must be platform-agnostic; wrappers decide “Card (web) vs Section (app)”.

### D) App-like UI definition (explicit)
- App UI ≠ responsive desktop.
- Core surfaces: `Screen`, `Sheet`, `Overlay`, `FloatingAction`
- Navigation: BottomNav (mobile), SideRail (tablet), stack navigation.

### E) Flows folder (product work separation)
- Introduces `src/flows/*` as platform-agnostic business flows (auth/onboarding/dashboard/settings).

---

## 2) Current DS Snapshot (As-Is)

### A) Current DS top-level folders
Current `src/ds/`:
- `components/`
- `layouts/`
- `primitives/`
- `preview/`
- `styles/`
- `themes/`
- `tokens/` (currently empty)
- `index.ts` (single public entry)

### B) Current strengths (already aligned)
- **Single-entry DS boundary** exists: `src/ds/index.ts` exports DS surface.
- **Token-first CSS** is implemented: `src/ds/styles/ds.tokens.css` defines semantic variables + palette.
- **Theme runtime** exists:
  - `src/ds/themes/registry.ts`
  - `src/ds/themes/theme.ts` (storage/apply)
  - `src/ds/themes/ThemeInitScript.tsx` used in `src/app/layout.tsx`
- **Layouts are centralized** in DS:
  - `src/ds/layouts/*Shell.tsx` (Dashboard/Public/Centered/Docs)
- **Platform knob groundwork** exists:
  - `src/ds/preview/PreviewPlatform.tsx`
  - CSS supports scoped knobs (e.g. `data-density`, `data-visual`) in `ds.tokens.css`
- **Interactions/patterns already exist** (but not categorized): Modal/Drawer/Popover/Tooltip/DropdownMenu, Skeleton/EmptyState/ErrorBoundary.
- **A11y is generally strong** (role/aria/focus-ring patterns are present).

### C) Built-in DS audit script exists
- Script: `scripts/ds-audit.mjs`
- Command: `npm run ds:audit`
- Result (today): **no findings** (no hardcoded hex/rgb detected in DS CSS targets outside tokens).

---

## 3) Gap Analysis vs Updated Blueprint

### Legend
- ✅ Present
- 🟨 Partial / exists but not per updated structure
- ❌ Missing

### A) Phase 0 — Architecture Lock
- ✅ Single public DS entry is in place (`src/ds/index.ts`).
- 🟨 Enforcement is informal (works by convention).
  - Gap: no explicit lint rule preventing `import … from "@/ds/components/..."`.

**Impact**: scaling increases drift risk.

### B) Phase 1 — Foundation (tokens/themes/semantics/motion/a11y)
- 🟨 Tokens: implemented in CSS (`src/ds/styles/ds.tokens.css`), but **`src/ds/tokens/` is empty**.
- ✅ Themes: implemented (`src/ds/themes/*` + ThemeInitScript).
- 🟨 Semantics: implemented as `ui-*` classes across `ds.utilities.css` + `ds.components.css`, but **no canonical semantics registry for this DS**.
  - Existing doc `DOC/SEMANTIC-CLASSES-REGISTRY.md` appears **out of sync** (mentions Tailwind + `src/app/globals.css` as SOT; Tailwind is not installed).
- 🟨 Motion: motion tokens exist in CSS variables, and `prefers-reduced-motion` is handled, but **no explicit foundation/motion module** or documented motion rules.
- 🟨 A11y: many a11y patterns exist (focus ring, aria roles/labels), but **no `foundation/a11y` package** (guidelines, helpers, test utilities).

Notable issue to track:
- `src/ds/styles/ds.base.css` references `--ds-radius-sm` (not defined in tokens). This is either a missing token or a stale alias.

### C) Phase 1 — Primitives + Structures separation
- ✅ Primitives exist (`src/ds/primitives/*`) and are reused widely.
- 🟨 Structures exist but are split between primitives/components:
  - Stack/Grid/Container are primitives
  - Card is in components

**Impact**: taxonomy drift makes it harder to scale consistently (what belongs where?).

### D) Phase 2 — Interactions / Patterns / Visuals / Widgets
- 🟨 Interactions: many exist but live under `components/` (Modal/Tooltip/DropdownMenu/Popover/Drawer/ContextMenu).
- 🟨 Patterns: some exist (Skeleton/EmptyState/ErrorBoundary), but missing explicit:
  - `AsyncBoundary`
  - `ErrorBlock` (distinct from Alert)
- ❌ Visuals: no dedicated `visuals/` components (Glow/NoiseOverlay/BackgroundFX) as named in updated blueprint.
- 🟨 Widgets: lots of “widget-like” components exist (MetricCard, Charts, DataTable, ResourceTable), but they are not explicitly:
  - slot-based
  - platform-agnostic
  - wrapped by a WidgetShell contract

### E) Phase 3 — Runtime (web + app mobile/tablet)
- 🟨 Runtime signals exist (`PreviewPlatformProvider`, `data-platform` styling patterns), but there is no formal `ds/runtime/*` structure.
- ✅ Some app-like pieces exist already:
  - BottomNav
  - Drawer
- ❌ Missing named app runtime surfaces:
  - `Screen`
  - `Sheet` (distinct from Modal)
  - `Overlay`
  - `FloatingAction`
  - Tablet `SideRail` + tablet layout/nav presets

### F) Composition (blocks/patterns/templates)
- 🟨 Some “blocks” exist implicitly (e.g. `Marketing.tsx`, `PublicBlocks.tsx`), but composition is not an explicit layer with contracts.
- 🟨 Naming collision risk: a `Patterns.tsx` component exists in DS, but updated blueprint uses “patterns” as a formal composition layer too.

### G) Flows folder
- ❌ `src/flows/*` does not exist.
- 🟨 There is `src/features/*` which may overlap, but it’s not organized as the updated blueprint’s “flows”.

---

## 4) Compliance Findings (Blueprint Rules)

### ✅ Strong compliance
- DS is token-driven via CSS vars.
- Theme switching is centralized (no component-level dark/light branching).
- Pages largely consume DS via `import … from "@/ds"`.

### 🟨 Deviations to fix (small but important)
- Inline styles exist:
  - DS: `Popover.tsx`, `ContextMenu.tsx`, `Tooltip.tsx` use inline `top/left` positioning.
  - App demos: component library uses inline `maxWidth` and dynamic swatch background.

**Interpretation**: positioning via inline `style` is often unavoidable in pure React without a layout engine, but the updated blueprint says “no inline styles”.

**Recommended DS-platform compliant pattern**:
- Use CSS variables:
  - set `style={{ "--ui-popover-top": "123px" } as React.CSSProperties }`
  - and in CSS use `top: var(--ui-popover-top)` etc.

This keeps “styles” in CSS while still letting runtime set values.

---

## 5) Implementation Plan (Scale to Updated Blueprint)

This plan avoids a big-bang refactor. The rule: **keep `src/ds/index.ts` stable** while moving internals.

### Phase 0 — Architecture Lock (1–2 days)
1. Add lint enforcement:
   - Disallow imports from `src/ds/*` except `@/ds`.
   - Disallow inline style usage in DS except an explicit allowlist (or migrate to CSS variables).
2. Add a DS “contracts” doc (short):
   - naming rules (intent-based)
   - what goes in foundation vs primitives vs runtime

**Acceptance**
- CI fails if someone imports DS internals.

### Phase 1 — Foundation Restructure (2–4 days)
1. Create `src/ds/foundation/` with:
   - `tokens/` (source-of-truth docs + optional TS token map for metadata)
   - `themes/` (re-export existing theme modules)
   - `semantics/` (registry + naming rules)
   - `motion/` (durations/easing tokens + reduced motion guidance)
   - `a11y/` (focus ring, aria patterns, keyboard patterns, helper utilities)
2. Resolve token inconsistencies:
   - either define `--ds-radius-sm` in tokens or replace with `--ds-radius-default`.
3. Deprecate or rewrite `DOC/SEMANTIC-CLASSES-REGISTRY.md` to reflect the real DS (no Tailwind).

**Acceptance**
- No empty `tokens/` folder; foundation has a clear SOT.

### Phase 1b — Taxonomy cleanup (Primitives vs Structures) (1–2 days)
1. Introduce `src/ds/structures/`:
   - `Stack`, `Grid`, `Container`, `Card`
2. Keep backward compatibility:
   - keep exports in `src/ds/index.ts` unchanged (re-export from new locations).

**Acceptance**
- Imports remain `@/ds`, but internal organization matches updated blueprint.

### Phase 2 — Advanced UI layerization (3–7 days)
1. Move/alias modules into:
   - `ds/interactions/*` (Modal/Tooltip/Dropdown/Popover/Drawer/ContextMenu)
   - `ds/patterns/*` (Skeleton/EmptyState/ErrorBlock/AsyncBoundary)
2. Implement missing “patterns”:
   - `AsyncBoundary` (loading/error/empty slots)
   - `ErrorBlock` (non-modal error presentation)
3. Add minimal `ds/visuals/`:
   - `Glow`, `NoiseOverlay`, `BackgroundFX` (token-driven only)
4. Define `ds/widgets/` contract:
   - Widget accepts `data + slots`
   - Widget does not decide layout
   - Create `WidgetShell` wrapper
   - Start by migrating 1–2 existing widget-like components (e.g. MetricCard, StatWidget).

**Acceptance**
- Widgets can render in web vs app wrapper without redesigning widget internals.

### Phase 3 — Runtime (Web + App mobile/tablet) (5–14 days, iterative)
1. Create `src/ds/runtime/web/`:
   - layouts presets wrappers
   - navigation wrappers
   - containers
2. Create `src/ds/runtime/app/mobile/`:
   - surfaces: `Screen`, `Sheet`, `Overlay`, `FloatingAction`
   - navigation: `BottomNav` wrapper presets
3. Create `src/ds/runtime/app/tablet/`:
   - `SideRail`
   - tablet layout presets using existing shell primitives
4. Runtime mapping rule:
   - intent component stays stable
   - runtime chooses concrete rendering

**Acceptance**
- The same flow/business screen can mount under web runtime and mobile runtime.

### Phase 3+ — Composition (blocks/patterns/templates) (3–10 days)
1. Create `src/ds/composition/blocks` and migrate existing blocks:
   - marketing/public blocks become explicit “blocks”.
2. Define composition rules:
   - Block = atomic meaning
   - Pattern = group of blocks
   - Template = layout preset

**Acceptance**
- Pages assemble templates/patterns/blocks without inventing layout.

### Flows — Introduce `src/flows` (parallel track)
1. Create `src/flows/{auth,onboarding,dashboard,settings}` skeleton.
2. Move business logic out of DS and out of `app/` where appropriate.

**Acceptance**
- UI platform can change without rewriting flow logic.

---

## 6) Recommended Immediate Next Step (Small, High Impact)

If you want the fastest “updated blueprint compliance” win:
1) Phase 0 enforcement + foundation folder creation (without moving files yet)
2) Fix `--ds-radius-sm` inconsistency
3) Update/replace semantic registry documentation (current registry is stale)

---

## Appendix: Evidence Pointers
- DS entry: `src/ds/index.ts`
- Tokens + knobs: `src/ds/styles/ds.tokens.css`
- Themes: `src/ds/themes/*` + `src/app/layout.tsx`
- Platform knob: `src/ds/preview/PreviewPlatform.tsx`
- Layout shells: `src/ds/layouts/*`
- Existing semantic registry doc (stale): `DOC/SEMANTIC-CLASSES-REGISTRY.md`
