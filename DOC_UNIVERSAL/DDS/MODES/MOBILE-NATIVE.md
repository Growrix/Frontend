# Mode: Mobile Native

App-like composition for touch-first, mobile-primary experiences.

## When To Use

- Mobile app screens
- Progressive web app interfaces
- Mobile-first onboarding flows
- Touch-primary interactions
- Any page declared as `app-like-plus-desktop` UI mode

## Composition Rules

### Layout

- Single-column primary with bottom navigation
- Full-width cards and list items for touch targets
- Pull-to-refresh, swipe, and sheet patterns are first-class
- Navigation lives at the bottom, not the top
- Content fills the viewport — minimal chrome

### Rhythm

- Screen-by-screen pacing, not scroll-heavy long pages
- Each screen has one primary task
- Transitions between screens replace scroll-based sections
- Minimal vertical scrolling per view — prefer pagination or tabs
- Loading states are inline, not page-blocking

### Hero

- Minimal — screen title, icon, or status bar
- No decorative heroes on app screens
- Key actions or summary data replace hero sections
- Back navigation and context breadcrumbs replace hero positioning

### Sections

- One content group per screen or one scrollable list per view
- Floating action button (FAB) for primary creation actions
- Side rail or sheet for secondary actions
- Bottom sheets replace desktop modals
- Inline editing preferred over navigation-to-edit patterns

### CTA

- Primary action as FAB or prominent bottom button
- Destructive actions require confirmation (swipe-to-delete + undo)
- No stacked button groups — one primary, one optional secondary
- Actions must be reachable by thumb

## DS Mapping Hints

- Shell: app-like shell with `data-platform="app"`
- Components: Screen, Sheet, BottomNavPreset, SideRail, FAB
- Density: `compact` to `balanced`
- Visual knobs: platform-aware defaults
- Semantic classes: `ui-screen`, `ui-sheet`, `ui-fab`, `ui-siderail`

## Anti-Patterns For This Mode

- Using desktop-width containers on mobile screens
- Putting navigation at the top in a small header bar
- Using hover-dependent interactions on touch screens
- Creating long scrollable pages instead of focused screens
- Using desktop modal patterns instead of bottom sheets
- Touch targets smaller than 44px
- Horizontal scrolling for content that should be vertically organized
