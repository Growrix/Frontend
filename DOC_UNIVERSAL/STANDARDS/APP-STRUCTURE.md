# App Structure

Standard application structure for clean routing, layouts, and feature growth.

## Goal

Prevent inconsistent page structure, duplicated dashboard shells, and ad hoc route growth.

## Recommended App Router Shape

```txt
src/app/
  (marketing)/
  (auth)/
  (dashboard)/
  api/
```

## Rules

- Public routes, auth routes, and dashboard routes must be separated intentionally.
- Dashboard pages must inherit a shared dashboard layout or the DS `DashboardShell`.
- Local section layouts may extend the shell, but must not recreate the shell.
- Navigation config must be centralized.
- New routes must be added to the route map before or during implementation.

## Shell Selection

- `PublicShell`: public marketing or general web pages
- `DashboardShell`: authenticated product or dashboard pages
- `DocsShell`: documentation experiences
- `CenteredShell`: focused auth or single-purpose pages

If the UI mode is `app-like-plus-desktop`, the desktop structure should still come from the shared shell system. Mobile or tablet app-like behavior should augment the shell through DS runtime surfaces or shell props, not through a separate routing architecture.

## Feature Placement

- Route files define entry points.
- Reusable UI lives in shared component or DS locations.
- Business logic lives outside page files.
- Route-specific orchestration may stay close to the route, but not shared logic.
- Mobile-only bottom navigation should be passed through the shared shell structure when available, not recreated per page.

## Routing Checklist

- route path defined
- layout inheritance clear
- access scope clear
- navigation placement clear
- loading and error behavior clear

## Anti-Patterns

- standalone dashboard page with its own sidebar
- mobile or tablet variant implemented as a separate ad hoc route tree when the shared shell and runtime already solve it
- page-level data and business logic mixed together
- route creation without route map update
- multiple navigation sources of truth