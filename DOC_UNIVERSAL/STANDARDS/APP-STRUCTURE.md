# App Structure

Standard application structure for clean routing, layouts, and feature growth.

## Goal

Prevent inconsistent page structure, duplicated dashboard shells, and ad hoc route growth.

## Recommended App Router Shape

```txt
src/app/
  layout.tsx              ← Root layout (fonts, ThemeInitScript, skip-link ONLY)
  globals.css             ← DS styles import
  route-map.ts            ← Centralized route registry
  (marketing)/            ← Public-facing pages
    layout.tsx            ← PublicShell wrapper
    page.tsx              ← Homepage
    _components/          ← Marketing-scoped co-located components
  (dashboard)/            ← Authenticated product pages
    layout.tsx            ← DashboardShell wrapper
    page.tsx
    activity/
    settings/
    _components/          ← Dashboard-scoped co-located components
  (docs)/                 ← Documentation / component library
    layout.tsx            ← DashboardShell or DocsShell wrapper
    component-library/
    _components/
  (auth)/                 ← Auth flows
    layout.tsx            ← CenteredShell wrapper
  api/                    ← API routes
```

## Rules

- Every route must belong to a route group. No top-level route folders outside groups.
- Public routes, auth routes, and dashboard routes must be separated intentionally.
- Dashboard pages must inherit a shared dashboard layout or the DS `DashboardShell`.
- Local section layouts may extend the shell, but must not recreate the shell.
- Navigation config must be centralized per route group, not duplicated per component.
- New routes must be added to `src/app/route-map.ts` before or during implementation.
- Page files must stay thin (~80 lines max). Extract heavy JSX to `_components/`.
- No conditional shell rendering inside page files (e.g., mobile → Shell A, desktop → Shell B).
- `_components/` imports must not cross route group boundaries.

## Shell Selection

| Route Group    | Shell            | Purpose                              |
|---------------|------------------|--------------------------------------|
| (marketing)   | PublicShell       | Public web pages, landing, pricing   |
| (dashboard)   | DashboardShell    | Authenticated product experience     |
| (docs)        | DashboardShell    | Library/docs with sidebar nav        |
| (auth)        | CenteredShell     | Focused single-purpose auth pages    |

- Each route group layout wraps children in exactly one shell.
- If the UI mode is `app-like-plus-desktop`, the desktop structure should still come from the shared shell system. Mobile or tablet app-like behavior should augment the shell through DS runtime surfaces or shell props (`data-platform`, `data-density`), not through a separate routing architecture or conditional rendering of different shells.

## Route Map

All routes must be registered in a centralized file:

```ts
// src/app/route-map.ts
export const ROUTES = {
  home: "/",
  dashboard: "/dashboard",
  dashboardActivity: "/dashboard/activity",
  dashboardSettings: "/dashboard/settings",
  componentLibrary: "/component-library",
} as const;
```

All `<Link href>` and `router.push()` calls must reference `ROUTES.*` constants.

## Feature Placement

- Route files define entry points.
- Reusable UI lives in shared component or DS locations.
- Business logic lives in `src/features/`, outside page files.
- Route-specific orchestration may stay close to the route in `_components/`, but not shared logic.
- Mobile-only bottom navigation should be passed through the shared shell structure when available, not recreated per page.

## File Placement Summary

| Location                            | Contains                                  |
|-------------------------------------|-------------------------------------------|
| `src/app/layout.tsx`                | Fonts, ThemeInitScript, skip-link only    |
| `src/app/(group)/layout.tsx`        | Shell wrapper + navigation composition    |
| `src/app/(group)/**/page.tsx`       | Thin route entry (~80 lines max)          |
| `src/app/(group)/**/_components/`   | Co-located route components               |
| `src/app/route-map.ts`             | Centralized route constants               |
| `src/features/`                     | Business logic, domain types, services    |
| `src/ds/`                           | Design System (never edited in features)  |

## Routing Checklist

- [ ] Route path defined in `route-map.ts`
- [ ] Route group assigned
- [ ] Layout inheritance clear (which shell?)
- [ ] Access scope clear (public / auth / protected)
- [ ] Navigation placement clear (uses centralized config)
- [ ] Loading and error behavior clear
- [ ] Page file is thin (heavy JSX extracted to `_components/`)

## Anti-Patterns

- standalone dashboard page with its own sidebar
- two shells in one page file (mobile vs desktop conditional rendering)
- mobile or tablet variant implemented as a separate ad hoc route tree when the shared shell and runtime already solve it
- page-level data and business logic mixed together
- route creation without route map update
- multiple navigation sources of truth (nav arrays duplicated across components)
- pathname-gated navigation wrappers (checking `usePathname()` to decide what nav to show)
- cross-route-group `_components/` imports (e.g., `../../_components/`)
- page files exceeding 100 lines of JSX
- mock data defined inline in page files instead of extracted constants