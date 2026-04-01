# DS Coverage Checklist

Use this checklist before merging any Design System change — new component, shell, runtime surface, pattern, widget, or foundational primitive.

**Authoritative guide:** `src/ds/DESIGN-SYSTEM-ANATOMY.md`

---

## 1. Public API

- [ ] Exported from `src/ds/index.ts` (the only public barrel).
- [ ] Importable from `@/ds` without reaching into DS internals.
- [ ] Prop names, variants, and defaults are explicit and stable.
- [ ] If the component is in `structures/`, `interactions/`, or `composition/`, the re-export barrel is updated.

## 2. Styling And Tokens

- [ ] All styling lives inside the DS (`src/ds/styles/`), not in feature code.
- [ ] Visual values use DS tokens (`--ds-*`) — no hardcoded colors, spacing, shadows, radii, or typography.
- [ ] No undefined `--ds-*` token references (run `npm run ds:audit` to verify).
- [ ] New component classes added to the correct CSS layer:
  - Layout/typography utility → `src/ds/styles/ds.utilities.css`
  - Component implementation → `src/ds/styles/ds.components.css`
  - New token → `src/ds/styles/ds.tokens.css`
- [ ] New `ui-*` class registered in `src/ds/SEMANTIC-CLASSES-REGISTRY.md`.
- [ ] New token family or knob behavior documented in `src/ds/DESIGN-SYSTEM-ANATOMY.md`.

## 3. Accessibility

- [ ] Interactive elements have accessible names and correct ARIA roles.
- [ ] Focus order is intentional and logical.
- [ ] Overlays (modal, drawer, sheet, popover) trap and restore focus correctly.
- [ ] Menus (dropdown, context) support Arrow Up/Down, Home/End, Escape with focus restore.
- [ ] Composite widgets (tabs, combobox) support expected keyboard patterns.
- [ ] Shells preserve the global skip-link target (`id="main"` on `<main>`).
- [ ] `aria-labelledby`/`aria-describedby`/`aria-label` used where appropriate.

## 4. Tests

- [ ] Behavior tests added for interactive components (snapshots alone are not sufficient).
- [ ] Keyboard/a11y tests added or updated if the component is interactive:
  - Overlay/menu/tabs/combobox → `src/ds/components/__tests__/keyboard.a11y.test.tsx` or `keyboard-extended.a11y.test.tsx`
  - Data component → `src/ds/components/__tests__/data-components.test.tsx`
  - Widget → `src/ds/widgets/__tests__/widgets.test.tsx`
  - Shell → `src/ds/layouts/__tests__/shells.snapshot.test.tsx`
  - Runtime surface with focus → `src/ds/runtime/app/mobile/__tests__/`
- [ ] Integration paths tested when the component composes other DS modules.

## 5. Merge Gate Commands

Run these in order. All must pass.

```bash
npm run typecheck        # TS compilation
npm run lint             # ESLint
npm test                 # All Jest tests
npm run build            # Next.js production build
npm run ds:audit         # Static token/registry audit
npm run ds:a11y          # DS accessibility test suite
```

Or run the single combined command:

```bash
npm run verify           # All of the above in sequence
```

## 6. Documentation Sync

- [ ] `src/ds/DESIGN-SYSTEM-ANATOMY.md` updated if the change affects architecture, tokens, knobs, or component catalog.
- [ ] `src/ds/SEMANTIC-CLASSES-REGISTRY.md` updated if any `ui-*` class is added or renamed.
- [ ] If the change affects reusable migration guidance or DS consumption examples, update `DOC/PROTOTYPE TO DS/` and any live DS showcase references.