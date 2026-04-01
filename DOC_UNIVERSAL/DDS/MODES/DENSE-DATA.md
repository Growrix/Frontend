# Mode: Dense Data

Information-dense composition for pages where data volume and comparison are the primary need.

## When To Use

- Analytics dashboards
- Reporting pages
- Comparison and pricing tables
- Admin data management
- Search results pages
- Data-heavy feature pages
- Any page where users need to scan, compare, or analyze

## Composition Rules

### Layout

- Tight grid with minimal wasted space
- Tables, data grids, and comparison layouts are first-class citizens
- Filters and controls are always accessible (sidebar, sticky bar, or inline)
- Multiple data views encouraged (table, card, chart toggles)
- Column density is higher than other modes

### Rhythm

- Compact and consistent — no dramatic rhythm shifts
- Grouping through borders, dividers, and alternating rows rather than spacing
- Header rows and section labels carry the organizational load
- Breathing room is earned by critical data, not decorative
- Inline actions reduce the need to navigate away

### Hero

- Not typical — replaced by summary metrics or filter bar
- Key figure headline if the page has one primary takeaway
- No decorative hero sections
- Context bar (breadcrumbs, filters, date range) serves as the page header

### Sections

- Data sections are structured by information type, not visual variety
- Comparison layouts use consistent column alignment
- Charts and tables have clear legends and labels
- Expandable rows or accordion patterns for nested data
- footnotes or hover tooltips for supplementary information

### CTA

- Actions are inline with data (export, filter, drill-down)
- Primary action is typically "take action on this data" not "sign up"
- Batch actions for multi-select scenarios
- No marketing-style CTA blocks

## DS Mapping Hints

- Shell: `DashboardShell`
- Components: DataTable (`ui-table`), metric cards (`ui-metric`), Card for data groups, chart containers (`ui-chart`)
- Density: `compact`
- Visual knobs: `sleek` or default
- Semantic classes: `ui-table`, `ui-grid`, `ui-metric`

## Anti-Patterns For This Mode

- Adding spacious marketing sections to a data page
- Using cards where a table would be clearer
- Making comparison tables too narrow to read
- Hiding filters behind multiple clicks
- Using decorative elements that eat space data could use
- Presenting data without sorting, filtering, or search options
