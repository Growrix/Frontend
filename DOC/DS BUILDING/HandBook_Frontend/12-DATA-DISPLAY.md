# 12 — Data Display

> Everything a Design System must define for presenting data — tables, lists, cards, grids, statistics, charts, badges, tags, timelines, and all patterns used to present structured information to users.

---

## Table of Contents

1. [Data Display Philosophy](#1-data-display-philosophy)
2. [Tables](#2-tables)
3. [Data Tables (Enhanced)](#3-data-tables-enhanced)
4. [Lists](#4-lists)
5. [Description Lists / Key-Value](#5-description-lists--key-value)
6. [Cards](#6-cards)
7. [Statistics & Metrics](#7-statistics--metrics)
8. [Badges & Tags](#8-badges--tags)
9. [Avatars](#9-avatars)
10. [Timelines](#10-timelines)
11. [Trees & Hierarchies](#11-trees--hierarchies)
12. [Charts & Data Visualization](#12-charts--data-visualization)
13. [Empty & Error States](#13-empty--error-states)
14. [Pagination & Infinite Scroll](#14-pagination--infinite-scroll)
15. [Responsive Data Display](#15-responsive-data-display)
16. [Data Display Tokens Summary](#16-data-display-tokens-summary)

---

## 1. Data Display Philosophy

### 1.1 Core Principles

1. **Scannable** — users scan, not read. Align data in columns, use consistent formatting.
2. **Comparable** — related values should be easy to compare (right-align numbers).
3. **Hierarchical** — most important information first, details on demand.
4. **Dense or comfortable** — provide density options for power users vs casual users.
5. **Responsive** — data must be accessible on all screen sizes.
6. **Accessible** — tables have headers, lists have semantics, charts have text alternatives.

---

## 2. Tables

### 2.1 Table Anatomy

```
┌────────────────────────────────────────────────────────┐
│  Name          │  Email              │  Role   │ Actions│
├────────────────┼─────────────────────┼─────────┼────────┤
│  John Smith    │  john@example.com   │  Admin  │  ⋮    │
│  Jane Doe      │  jane@example.com   │  Editor │  ⋮    │
│  Bob Wilson    │  bob@example.com    │  Viewer │  ⋮    │
├────────────────┴─────────────────────┴─────────┴────────┤
│  Showing 1-3 of 42              [◀ Previous] [Next ▶]  │
└────────────────────────────────────────────────────────┘
```

### 2.2 Semantic HTML

```html
<table>
  <caption>Team members</caption>
  <thead>
    <tr>
      <th scope="col">Name</th>
      <th scope="col">Email</th>
      <th scope="col">Role</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>John Smith</td>
      <td>john@example.com</td>
      <td>Admin</td>
    </tr>
  </tbody>
</table>
```

### 2.3 Column Alignment

| Data Type | Alignment | Why |
|-----------|-----------|-----|
| Text | Left | Natural reading direction |
| Numbers | Right | Decimal alignment for comparison |
| Currency | Right | Decimal alignment |
| Dates | Left or center | Consistent width |
| Status | Center | Short + visual |
| Actions | Right | Convention |
| Checkbox | Center | Convention |

### 2.4 Table Styling Rules

- **Zebra striping** (alternating row colors) OR **horizontal dividers** — not both.
- **Header row** is visually distinct (background, bold, sticky).
- **Row hover** highlights the entire row.
- **Cell padding**: 12–16px horizontal, 8–12px vertical.
- **Minimum column width**: prevent text wrapping for short data.
- **Sticky header**: stays visible on scroll.
- **Sticky first column**: for wide tables with horizontal scroll.

---

## 3. Data Tables (Enhanced)

### 3.1 Features

| Feature | Description |
|---------|-------------|
| **Sorting** | Click column header to sort asc/desc |
| **Filtering** | Column filters, search, faceted filters |
| **Pagination** | Page-based or infinite scroll |
| **Selection** | Row checkboxes for bulk actions |
| **Bulk actions** | Toolbar appears when rows selected |
| **Column resize** | Drag column borders |
| **Column reorder** | Drag column headers |
| **Column visibility** | Toggle which columns show |
| **Row expansion** | Click to expand row for detail view |
| **Inline editing** | Click cell to edit value |
| **Export** | Download as CSV, Excel, PDF |

### 3.2 Sort Indicator

```
Name ▲     Email        Role ▼     Status
```

- Unsorted: no indicator (or subtle up/down arrows).
- Ascending: up arrow.
- Descending: down arrow.
- Primary sort + secondary: primary arrow is filled, secondary is subtle.

### 3.3 Selection Pattern

```
☐ Select all (42 items)
┌───┬────────────┬──────────────────┐
│ ☑ │ John Smith │ john@example.com │
│ ☑ │ Jane Doe   │ jane@example.com │
│ ☐ │ Bob Wilson │ bob@example.com  │
└───┴────────────┴──────────────────┘
Selected: 2 items  [Delete] [Export]
```

### 3.4 Table Toolbar

```
┌──────────────────────────────────────────────────┐
│ 🔍 Search...    [Filter ▾] [Columns ▾] [Export]  │
└──────────────────────────────────────────────────┘
```

---

## 4. Lists

### 4.1 List Types

| Type | HTML | Use Case |
|------|------|----------|
| Unordered list | `<ul>` | Items with no specific order |
| Ordered list | `<ol>` | Numbered/sequential items |
| Description list | `<dl>` | Key-value pairs |
| Interactive list | `<ul role="listbox">` | Selectable items |
| Navigation list | `<nav><ul>` | Menu items |

### 4.2 List Item Anatomy

```
┌──────────────────────────────────────────────┐
│ [Avatar/Icon]  Title             [Meta/Badge]│
│                Description...    [Actions ⋮] │
└──────────────────────────────────────────────┘
```

### 4.3 List Variants

| Variant | Description |
|---------|-------------|
| Simple | Text only |
| With icons | Leading icon for categorization |
| With avatars | User lists, chat lists |
| With metadata | Right-aligned date, status, count |
| With actions | inline buttons, kebab menu |
| With selection | Checkbox or radio per item |
| Nested | Indent for hierarchy |
| Grouped | Section headers dividing groups |

### 4.4 List Dividers

- Between items: thin 1px line, full-width or inset.
- Between groups: thicker divider or section header.

---

## 5. Description Lists / Key-Value

### 5.1 Horizontal Key-Value

```
Status:        Active
Created:       January 15, 2025
Last updated:  February 8, 2025
Owner:         John Smith
```

### 5.2 Grid Key-Value

```
┌─────────────────┬─────────────────┐
│ Status    Active │ Role      Admin │
│ Created   Jan 15 │ Team   Frontend │
│ Updated   Feb 8  │ Region     APAC │
└─────────────────┴─────────────────┘
```

### 5.3 Stacked Key-Value

```
Status
Active ●

Created
January 15, 2025

Owner
John Smith
```

### 5.4 Semantic HTML

```html
<dl>
  <dt>Status</dt>
  <dd>Active</dd>
  <dt>Created</dt>
  <dd>January 15, 2025</dd>
</dl>
```

---

## 6. Cards

### 6.1 Card Anatomy

```
┌──────────────────────────┐
│  [Media / Image]         │  ← Optional media area
│                          │
│  Overline / Category     │  ← Optional
│  Card Title              │  ← Required
│  Card description text   │  ← Optional
│  that wraps as needed.   │
│                          │
│  [Meta: date, author]    │  ← Optional
│  [Action 1] [Action 2]  │  ← Optional
└──────────────────────────┘
```

### 6.2 Card Variants

| Variant | Description |
|---------|-------------|
| **Basic** | Title + description |
| **Media** | Image/video header + content |
| **Stat** | Metric number + label + trend |
| **Profile** | Avatar + name + role + actions |
| **Interactive** | Clickable (entire card is a link/button) |
| **Selectable** | Checkbox/radio, click to select |
| **Pricing** | Feature list + price + CTA |
| **Testimonial** | Quote + avatar + name |
| **Feature** | Icon + heading + description |

### 6.3 Card Grid

Cards are typically laid out in responsive grids:

```css
.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: var(--ds-space-6);
}
```

### 6.4 Card Interaction

- **Non-interactive**: No hover/focus states, informational only.
- **Clickable**: Entire card is a link — hover lifts card, cursor: pointer.
- **With actions**: Card has buttons/links inside — card itself is not clickable.
- **Never nest interactive inside interactive** — don't put buttons inside a clickable card.

---

## 7. Statistics & Metrics

### 7.1 Stat Card

```
┌────────────────────────┐
│  Total Revenue         │
│  $45,231.89            │  ← Primary metric
│  ▲ +20.1% from last   │  ← Trend indicator
│     month              │
└────────────────────────┘
```

### 7.2 Stat Anatomy

| Element | Purpose |
|---------|---------|
| **Label** | What the metric represents |
| **Value** | The number (large, prominent) |
| **Trend** | Direction arrow + percentage + period |
| **Sparkline** | Mini chart showing trend (optional) |
| **Icon** | Visual context for the metric type |
| **Comparison** | vs. previous period, target, average |

### 7.3 Trend Indicators

| Trend | Visual |
|-------|--------|
| Positive (good) | ▲ Green, up arrow |
| Negative (bad) | ▼ Red, down arrow |
| Neutral | → Gray, no arrow |
| Positive (bad, e.g., errors up) | ▲ Red (context matters) |
| Negative (good, e.g., bugs down) | ▼ Green |

### 7.4 Number Formatting

| Format | Example | When |
|--------|---------|------|
| Full | 45,231 | When exact value matters |
| Abbreviated | 45.2K | Dashboard overview |
| Currency | $45,231.89 | Financial data |
| Percentage | 20.1% | Ratios, changes |
| Compact | 1.2M | Very large numbers |

---

## 8. Badges & Tags

### 8.1 Badge

Small indicator overlaid on another element:

```
┌───────┐
│ Inbox │ ⑤    ← Count badge
└───────┘

🔔 ●              ← Dot badge (notification present)
```

### 8.2 Badge Variants

| Variant | Shape | Content |
|---------|-------|---------|
| Count | Rounded rect or circle | Number (99+) |
| Dot | Small circle | No content, just presence |
| Status | Circle | Color-coded (green/red/amber) |

### 8.3 Tag / Chip

Standalone label for categorization:

```
[Design ✕]  [Frontend]  [Urgent ●]  [+ Add tag]
```

### 8.4 Tag Variants

| Variant | Interaction |
|---------|-------------|
| Read-only | Display only |
| Removable | Has ✕ close button |
| Clickable | Filters content when clicked |
| Input | Can type to add new tags |

### 8.5 Tag Sizes

| Size | Height | Font |
|------|--------|------|
| Small | 20px | 11px |
| Default | 24px | 12–13px |
| Large | 28px | 14px |

### 8.6 Status Badges

| Status | Color | Label |
|--------|-------|-------|
| Active / Online | Green | ● Active |
| Inactive / Offline | Gray | ○ Inactive |
| Pending | Amber | ◐ Pending |
| Error / Failed | Red | ● Error |
| Info / New | Blue | ● New |

---

## 9. Avatars

### 9.1 Avatar Variants

| Variant | Content |
|---------|---------|
| Image | User photo |
| Initials | First + last initial (fallback) |
| Icon | Generic user icon (fallback) |
| Placeholder | Gray circle |

### 9.2 Avatar Sizes

| Size | Dimensions | Use Case |
|------|-----------|----------|
| `xs` | 24px | Inline mentions, dense lists |
| `sm` | 32px | Comments, compact cards |
| `md` | 40px | **Default** — list items, navigation |
| `lg` | 48px | Card headers, conversations |
| `xl` | 64px | Profile sections |
| `2xl` | 96px | Profile pages |
| `3xl` | 128px | Profile hero |

### 9.3 Avatar Groups

Overlapping avatars:

```
[😊][😎][🤓][+4]
```

- Overlap by 25–30% of diameter.
- Maximum visible: 3–5, then "+N" count.
- Border ring around each to separate.

### 9.4 Avatar + Status Dot

```
┌────┐
│ 😊 │ ● ← online dot (bottom-right)
└────┘
```

---

## 10. Timelines

### 10.1 Vertical Timeline

```
● Created account              Jan 15
│
● Updated profile              Jan 20
│
○ Completed onboarding         (pending)
│
○ First purchase               (upcoming)
```

### 10.2 Timeline Anatomy

| Element | Purpose |
|---------|---------|
| Line | Connecting vertical/horizontal bar |
| Node | Circle/dot at each event |
| Content | Title + description + timestamp |
| Status | Completed (filled), current (accent), upcoming (outline) |

### 10.3 Timeline Variants

| Variant | Layout |
|---------|--------|
| Vertical left | Nodes on left, content right |
| Vertical center | Alternating left/right (desktop) |
| Horizontal | Left-to-right, scrollable |
| Activity feed | Compact, no connecting line |

---

## 11. Trees & Hierarchies

### 11.1 Tree View

```
├── 📁 src
│   ├── 📁 components
│   │   ├── 📄 Button.tsx
│   │   └── 📄 Card.tsx
│   └── 📁 utils
│       └── 📄 helpers.ts
└── 📄 package.json
```

### 11.2 Tree Interaction

- Click to expand/collapse.
- Arrow keys to navigate (up/down between items, right to expand, left to collapse).
- `role="tree"` + `role="treeitem"`.
- `aria-expanded` on expandable items.

### 11.3 Breadcrumbs (Flat Hierarchy)

```
Home > Products > Electronics > Phones
```

- Use `<nav>` with `aria-label="Breadcrumb"`.
- Separator (`>` or `/`) is decorative (`aria-hidden`).
- Current page: `aria-current="page"`, not a link.

---

## 12. Charts & Data Visualization

### 12.1 Chart Types for DS

| Chart | Use Case |
|-------|----------|
| Line chart | Trends over time |
| Bar chart | Comparing categories |
| Pie / Donut | Part-to-whole (max 5-6 segments) |
| Area chart | Volume trends |
| Sparkline | Inline mini-trend |
| Progress ring | Percentage complete |
| Gauge | Current value in range |
| Heat map | Density/intensity |

### 12.2 DS Responsibilities for Charts

The DS doesn't typically build charts but provides:
- **Color palettes**: Categorical (distinct), sequential (gradient), diverging.
- **Typography tokens** for labels, legends, axes.
- **Grid line styles**: Color, width, dash pattern.
- **Tooltip styling**: Background, shadow, typography, animation.
- **Legend patterns**: Position, spacing, interactive toggle.
- **Accessibility**: Chart must have text alternative (table, description).

### 12.3 Chart Color Rules

- Maximum 6–8 categorical colors (more becomes indistinguishable).
- Colors must be distinguishable in grayscale.
- Don't rely on color alone — add patterns, labels, or tooltips.
- Use brand palette-derived chart colors for cohesion.

---

## 13. Empty & Error States

### 13.1 Empty States

When there's no data to display:

| Context | Message Example | Action |
|---------|----------------|--------|
| First use | "No projects yet. Create your first project to get started." | [Create Project] |
| Filtered empty | "No results match your filters. Try adjusting your search." | [Clear Filters] |
| Search empty | "No results for 'xyz'. Check your spelling or try different keywords." | — |
| Completed | "All caught up! No pending tasks." | — |

### 13.2 Error States

When data fails to load:

```
┌──────────────────────────────┐
│       ⚠️                      │
│  Something went wrong         │
│  We couldn't load your data.  │
│  [Try Again]                  │
└──────────────────────────────┘
```

---

## 14. Pagination & Infinite Scroll

### 14.1 Pagination

```
Showing 1-10 of 234 results

[◀ Previous]  [1] [2] [3] ... [23] [24]  [Next ▶]
```

### 14.2 Pagination Rules

- Show current page, first, last, and 1–2 neighbors.
- Use ellipsis (...) for skipped ranges.
- Disable Previous on first page, Next on last.
- Combine with "items per page" selector.
- Show total count.

### 14.3 Infinite Scroll

Items load automatically as user scrolls:
- Show loading skeleton at the bottom.
- Provide "Back to top" button.
- Consider pagination fallback for accessibility.
- Preserve scroll position on navigation back.

### 14.4 Load More Button

Hybrid: user clicks "Load More" instead of pagination or auto-scroll:
```
[Showing 30 of 234 results]
      [Load More]
```

---

## 15. Responsive Data Display

### 15.1 Responsive Table Strategies

| Strategy | When |
|----------|------|
| Horizontal scroll | Default — works for any table |
| Stack cards | Each row becomes a card on mobile |
| Priority columns | Hide low-priority columns on small screens |
| Collapse rows | Show 2-3 columns, expand for more |

### 15.2 Responsive Cards

```
Desktop: 4-column grid
Tablet: 2-column grid
Mobile: 1-column stack
```

### 15.3 Responsive Stats

```
Desktop: 4 stat cards in a row
Tablet: 2×2 grid
Mobile: Vertical stack
```

---

## 16. Data Display Tokens Summary

### Complete Token Inventory

```
TABLE
  --ds-table-header-bg         header row background
  --ds-table-header-text       header text color
  --ds-table-border            cell border color
  --ds-table-row-hover         row hover background
  --ds-table-row-selected      selected row background
  --ds-table-row-stripe        alternating row background
  --ds-table-cell-padding      cell padding (8-16px)

LIST
  --ds-list-item-padding       item padding
  --ds-list-item-gap           spacing between items
  --ds-list-divider-color      divider between items
  --ds-list-hover-bg           item hover background
  --ds-list-selected-bg        selected item background

CARD
  --ds-card-padding            internal padding (16-24px)
  --ds-card-radius             border radius
  --ds-card-shadow             elevation shadow
  --ds-card-border             optional border
  --ds-card-bg                 background color

BADGE
  --ds-badge-height-sm         20px
  --ds-badge-height-md         24px
  --ds-badge-height-lg         28px
  --ds-badge-radius            9999px (pill)
  --ds-badge-font-size         11-13px

AVATAR
  --ds-avatar-xs               24px
  --ds-avatar-sm               32px
  --ds-avatar-md               40px
  --ds-avatar-lg               48px
  --ds-avatar-xl               64px
  --ds-avatar-2xl              96px
  --ds-avatar-3xl              128px
  --ds-avatar-radius           50% (circle) or radius-md

STATUS COLORS
  Active/Online:    green
  Inactive/Offline: gray
  Pending:          amber
  Error:            red
  Info/New:         blue

CHART COLORS
  Categorical: 6-8 distinct colors
  Sequential: gradient from light to dark
  Diverging: two hues with neutral center

PAGINATION
  --ds-pagination-size         32-40px button size
  --ds-pagination-radius       radius-sm or radius-full
  --ds-pagination-gap          4-8px between buttons
```

---

*This chapter defines the complete data display vocabulary for a Design System. Every table style, card variant, badge, avatar size, and pagination pattern above should be present in the implemented DS.*
