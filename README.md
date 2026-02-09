# Design System Platform (DS)

This repo is a **Design System Platform** for building web apps (including app-like web) with a strict, centralized design architecture.

## Core rules (non-negotiable)
- **Design is centralized** in DS tokens/themes/styles.
- **Pages are consumers**, not decision makers.
- **No hardcoded values** for colors/spacing/typography in pages/features.
- **Layout belongs to DS shells** (`PublicShell`, `DashboardShell`, etc.).
- **Single DS import entry:** app code must import UI only from `@/ds`.

## Project structure (relevant)
- `src/ds/` — the Design System Platform
	- `foundation/` — tokens/themes/semantics/motion/a11y surfaces
	- `primitives/` — Button/Text/Input/Stack/Grid/etc
	- `components/` — Card/Modal/Tabs/etc
	- `layouts/` — shells (layout ownership)
	- `runtime/` — platform-aware surfaces (web + app-like + tablet presets)
	- `styles/` — layered CSS (tokens/theme/base/utilities/components)
- `src/app/` — Next.js routes only (compose DS; don’t invent design)

## How to use DS in pages
Always import from the single DS entry:

```ts
import { Button, Stack, DashboardShell, AppBar, ThemeSwitcher } from "@/ds";
```

### Example: app-like page composition
```tsx
import { DashboardShell, AppBar, Section, Stack, Card, Button } from "@/ds";

export default function Example() {
	return (
		<DashboardShell
			topbar={<AppBar title={<strong>Example</strong>} />}
		>
			<Section container="wide" size="lg">
				<Stack>
					<Card>
						<Button variant="primary">Action</Button>
					</Card>
				</Stack>
			</Section>
		</DashboardShell>
	);
}
```

## Tokens & themes
- Token values are defined as **CSS variables** in `src/ds/styles/ds.tokens.css`.
- Theme selection is CSS-variable based (no per-component light/dark branching).
- Theme bootstrap runs via `ThemeInitScript` (already wired in `src/app/layout.tsx`).

## Adding a DS component (safe workflow)
1) Pick the correct layer:
	 - `primitives/` for “UI alphabet”
	 - `components/` for reusable composed blocks
2) Add class-based styles under `src/ds/styles/` (no inline styles in DS).
3) Export via `src/ds/index.ts`.
4) Verify:
	 - `npm run verify`
	 - `npm run ds:audit`

## Scripts
- `npm run dev` — run locally
- `npm run verify` — lint + tests + production build
- `npm run ds:audit` — detects hardcoded color usage patterns in DS CSS

## Contributing
See `CONTRIBUTING.md` for DS rules and the checklist.
