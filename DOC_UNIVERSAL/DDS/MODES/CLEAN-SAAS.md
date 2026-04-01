# Mode: Clean SaaS

Utility-first composition for application screens, dashboards, settings, and admin pages.

## When To Use

- Dashboard overview
- Settings and preferences
- Admin panels
- Onboarding flows
- Documentation hubs
- Any page where clarity and predictability matter more than personality

## Composition Rules

### Layout

- Grid-based, predictable column structure
- Consistent container widths across sections
- Cards as primary content containers
- Sidebar + main content pattern when applicable
- No asymmetric layouts unless justified by data hierarchy

### Rhythm

- Uniform spacing between sections
- Minimal rhythm variation — consistency over surprise
- Clear visual grouping through spacing and borders
- Breathable but not spacious — balanced density

### Hero

- Minimal or absent
- Data summary, metric cards, or quick actions instead of statement heroes
- No decorative hero backgrounds for utility pages

### Sections

- Each section serves one clear function
- Sections are composed of cards, tables, or form groups
- Visual weight is uniform — no dramatic escalation
- Background variation is subtle (alternating surface tones, not dramatic shifts)

### CTA

- Contextual actions within data (row actions, card buttons)
- Primary actions are persistent (top bar, sticky footer)
- No dramatic conversion CTAs on utility pages

## DS Mapping Hints

- Shell: `DashboardShell` or equivalent
- Components: Card, Table, Form, MetricCard, Nav patterns
- Density: `balanced` or `compact`
- Visual knobs: `sleek` or default
- Semantic classes: `ui-card`, `ui-stack`, `ui-grid`

## Anti-Patterns For This Mode

- Adding decorative gradients to a settings page
- Using a marketing-style hero on a dashboard
- Excessive whitespace that makes the page feel empty
- Scattering CTAs that compete with data-driven actions
- Making every card the same size when content varies
