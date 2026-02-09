# Contributing (Design System)

This repo follows a Design System (DS) blueprint that prioritizes predictability and centralized control.

## Non‑negotiable rules
- **Single DS entry only:** app code imports UI only from `@/ds`.
- **Pages are consumers:** pages compose DS shells/components; pages do not invent layout/design.
- **No hardcoded values:** no random hex, px spacing, or “just make it look good” in pages/features.
- **No inline styles in DS:** use DS classes + CSS variables.
- **Layout ownership is in DS shells:** `PublicShell`, `DashboardShell`, `CenteredShell`, `DocsShell`.

## Where to change what
- Tokens / theme values: `src/ds/styles/ds.tokens.css`
- Color-scheme + theme selectors: `src/ds/styles/ds.theme.css`
- Base resets: `src/ds/styles/ds.base.css`
- Utilities (layout helpers): `src/ds/styles/ds.utilities.css`
- Component styles: `src/ds/styles/ds.components.css`
- Component code: `src/ds/primitives/**` or `src/ds/components/**`
- Shell/layout code: `src/ds/layouts/**`

## Add a new DS component (checklist)
1) Choose the layer
   - `primitives/` if it’s an atomic UI primitive (Button/Text/Input/Stack/Grid)
   - `components/` if it’s a reusable composed block (Card/Modal/Table)
2) Implement TS/TSX
   - Keep props intent-like (`tone`, `variant`, `size`, `state`, `density`)
   - Avoid page-specific assumptions and business logic
3) Add CSS classes
   - Put styles in DS CSS files (no inline styles)
   - Use semantic tokens (`--ds-color-*`, `--ds-space-*`) not literal values
4) Export it
   - Add it to `src/ds/index.ts`
5) Validate locally
   - `npm run verify`
   - `npm run ds:audit`

## Before opening a PR
- Ensure `npm run verify` is green.
- Ensure `npm run ds:audit` is green.
- If you changed shells, update/confirm snapshots in `src/ds/layouts/__tests__`.
