# 13 — Navigation Patterns

> Every navigation pattern a Design System must support — top bars, sidebars, breadcrumbs, tabs, pagination, command palettes, mobile drawers, mega menus, and the structural rules that keep users oriented.

---

## Table of Contents

1. [Navigation Philosophy](#1-navigation-philosophy)
2. [Navigation Architecture](#2-navigation-architecture)
3. [Top Navigation Bar](#3-top-navigation-bar)
4. [Sidebar Navigation](#4-sidebar-navigation)
5. [Breadcrumbs](#5-breadcrumbs)
6. [Tabs](#6-tabs)
7. [Segmented Control](#7-segmented-control)
8. [Bottom Navigation (Mobile)](#8-bottom-navigation-mobile)
9. [Mega Menu](#9-mega-menu)
10. [Dropdown Menu](#10-dropdown-menu)
11. [Command Palette](#11-command-palette)
12. [Pagination](#12-pagination)
13. [Steppers](#13-steppers)
14. [Link Navigation](#14-link-navigation)
15. [Skip Links & Landmarks](#15-skip-links--landmarks)
16. [Responsive Navigation](#16-responsive-navigation)
17. [Navigation Accessibility](#17-navigation-accessibility)
18. [Navigation Tokens Summary](#18-navigation-tokens-summary)

---

## 1. Navigation Philosophy

### 1.1 Core Principles

1. **Orientation** — the user must always know where they are.
2. **Wayfinding** — every screen must offer a clear path forward, backward, and up.
3. **Consistency** — navigation structure should be predictable across the entire application.
4. **Progressive disclosure** — show top-level navigation always; reveal sub-navigation on demand.
5. **Efficiency** — power users need shortcuts (keyboard, command palette).

### 1.2 Navigation Hierarchy

```
Level 0 — App chrome (logo, top bar, global actions)
Level 1 — Primary navigation (main sections)
Level 2 — Secondary navigation (sub-sections, sidebar)
Level 3 — Tertiary navigation (tabs, local nav within a page)
Level 4 — In-page navigation (anchors, table of contents)
```

---

## 2. Navigation Architecture

### 2.1 Common Patterns

| Pattern | Layout | Best For |
|---------|--------|----------|
| Top nav only | Horizontal bar | Marketing sites, simple apps |
| Sidebar only | Vertical left rail | Dashboards, admin panels |
| Top + sidebar | Combined | Complex SaaS with many sections |
| Bottom nav (mobile) | Fixed bottom bar | Mobile-first consumer apps |
| Hub-and-spoke | Central hub, drill into spokes | Mobile apps, settings |

### 2.2 Anatomy of a Navigation System

```
┌──────────────────────────────────────────────────┐
│ [Logo]  Nav1  Nav2  Nav3         [Search] [User] │  ← Top bar
├──────────┬───────────────────────────────────────┤
│ Section  │                                       │
│ ├ Page 1 │        Content Area                   │  ← Sidebar + content
│ ├ Page 2 │                                       │
│ └ Page 3 │  [Tab A] [Tab B] [Tab C]              │  ← Tabs (L3)
│          │  ─────────────────────                │
│          │  Page content...                      │
└──────────┴───────────────────────────────────────┘
```

---

## 3. Top Navigation Bar

### 3.1 Anatomy

```
┌──────────────────────────────────────────────────────┐
│ [Logo]   Link  Link  Link  ▾Dropdown   [🔍] [🔔] [👤]│
└──────────────────────────────────────────────────────┘
```

| Zone | Content |
|------|---------|
| **Left** | Logo / brand, primary nav links |
| **Center** | Optional: centered nav links or search |
| **Right** | Utility actions: search, notifications, user menu |

### 3.2 Dimensions

| Property | Value |
|----------|-------|
| Height | 56–64px (desktop), 48–56px (mobile) |
| Logo height | 24–32px |
| Nav item padding | 12–16px horizontal |
| Dropdown trigger | Text + chevron (▾) |
| Background | Solid, semi-transparent, or blur (glass) |
| Position | `fixed` or `sticky` at top |
| z-index | 1000+ |

### 3.3 Active State

- Active link: bold weight, underline, accent color, or bottom border (3px).
- Hover: subtle background or text color change.
- Focus: visible focus ring.

### 3.4 Sticky / Scroll Behavior

| Behavior | Description |
|----------|-------------|
| Always visible | Fixed at top |
| Hide on scroll down | Reveals on scroll up |
| Shrink on scroll | Reduce height and padding |
| Transparent → solid | Starts transparent on hero, becomes solid |

---

## 4. Sidebar Navigation

### 4.1 Anatomy

```
┌──────────────┐
│ [Logo]       │
│──────────────│
│ 📊 Dashboard │ ← Active (highlighted)
│ 👥 Team      │
│ 📁 Projects  │
│   ├ Active   │ ← Sub-items (expanded)
│   └ Archived │
│ ⚙ Settings  │
│──────────────│
│ 👤 Profile   │ ← Bottom section
│ 🚪 Logout   │
└──────────────┘
```

### 4.2 Sidebar Variants

| Variant | Width | Content |
|---------|-------|---------|
| Full | 240–280px | Icon + text |
| Collapsed / Rail | 56–64px | Icon only, tooltip on hover |
| Mini | 48px | Small icons, no text |
| Overlay (mobile) | 280px | Slides over content |
| Floating | 240px | Detached from edge, rounded |

### 4.3 Sidebar Behavior

- **Collapse toggle**: Button to switch full → rail.
- **Hover expand**: Rail expands to full on hover (optional, can be jarring).
- **Mobile**: Sidebar becomes a drawer (overlay).
- **Nested items**: Expand/collapse with indentation (12–16px per level).
- **Groups**: Visual section dividers with optional group labels.

### 4.4 Sidebar Item States

| State | Treatment |
|-------|-----------|
| Default | No background, normal weight |
| Hover | Subtle background |
| Active | Accent background or left border (3px) |
| Expanded | Chevron rotated, children visible |
| Disabled | Muted text, no interaction |

---

## 5. Breadcrumbs

### 5.1 Anatomy

```
Home  >  Products  >  Electronics  >  Phones
```

### 5.2 Rules

1. Always start with root ("Home" or app name).
2. Current page is the last item — **not a link**, `aria-current="page"`.
3. Separator (`>`, `/`, `›`) is decorative → `aria-hidden="true"`.
4. Wrap in `<nav aria-label="Breadcrumb">`.
5. Use `<ol>` for ordered list semantics.
6. Truncate middle items on long paths: `Home > ... > Category > Item`.
7. Don't use breadcrumbs as the only navigation — they supplement.

### 5.3 Responsive Breadcrumbs

- Mobile: show only "← Back to [Parent]" link instead of full chain.
- Or collapse to current + parent only.

---

## 6. Tabs

### 6.1 Anatomy

```
[ Tab A ]  [ Tab B ]  [ Tab C ]
──────────────────────────────── ← active indicator (underline)
  Panel content for active tab
```

### 6.2 Tab Variants

| Variant | Style |
|---------|-------|
| Underline | Active tab has bottom border |
| Pill/Segment | Active tab has filled background |
| Boxed | Tabs have borders, active has no bottom border |
| Vertical | Tabs stacked on left, content on right |
| Icon + text | Leading icon before label |
| Icon only | Tooltip for label |

### 6.3 Tab Sizing

| Size | Height | Font | Padding |
|------|--------|------|---------|
| Small | 32px | 13px | 8–12px |
| Default | 40px | 14px | 12–16px |
| Large | 48px | 16px | 16–24px |

### 6.4 Tab Behavior

- Click to activate — panel content switches.
- Keyboard: Left/Right arrows to move between tabs, Enter/Space to activate.
- ARIA: `role="tablist"`, `role="tab"`, `role="tabpanel"`, `aria-selected`.
- Scrollable tabs: when too many tabs, enable horizontal scroll with arrows.
- Lazy loading: optionally load tab panel content only when activated.

### 6.5 Tab vs. Navigation

| Tabs | Navigation |
|------|-----------|
| Switch content in the same page | Navigate to different URLs |
| `role="tablist"` / `role="tab"` | `<nav>` / `<a>` |
| Arrow key navigation | Tab key navigation |
| Don't change URL (or use hash) | Change URL |

---

## 7. Segmented Control

### 7.1 Anatomy

```
┌────────┬────────┬────────┐
│  Day   │ ▓Week▓ │ Month  │
└────────┴────────┴────────┘
```

### 7.2 Rules

- 2–5 options maximum.
- All options visible at once (no scrolling).
- Behaves like a radio group — one selection.
- `role="radiogroup"` + `role="radio"`.
- Use when options are discrete and few.

---

## 8. Bottom Navigation (Mobile)

### 8.1 Anatomy

```
┌──────┬──────┬──────┬──────┬──────┐
│ 🏠   │ 🔍   │ ➕   │ 💬   │ 👤   │
│ Home │Search│Create│ Chat │ Me   │
└──────┴──────┴──────┴──────┴──────┘
```

### 8.2 Rules

- Maximum 5 items.
- Fixed at bottom of viewport.
- Active item: accent color icon + label.
- Inactive: muted icon, optional hidden label.
- Height: 56–64px.
- Safe area padding on iOS (notch/home indicator): `padding-bottom: env(safe-area-inset-bottom)`.
- Consider hiding on scroll down, showing on scroll up.

---

## 9. Mega Menu

### 9.1 Anatomy

```
Products ▾
┌────────────────────────────────────────────────────┐
│ Analytics        │ Marketing       │ Commerce       │
│ ├ Dashboard      │ ├ Campaigns     │ ├ Store        │
│ ├ Reports        │ ├ Email         │ ├ Products     │
│ └ Insights       │ └ Social        │ └ Orders       │
│                  │                 │                │
│ [View all products →]                              │
└────────────────────────────────────────────────────┘
```

### 9.2 Rules

- Triggered by hover (desktop) or click.
- Full-width or constrained to content.
- Organized in columns with section headers.
- Can include featured content (image, promotion).
- Close on click outside, Escape key, or mouse leave (with delay).
- Mobile: replaces with accordion or drill-down pattern.

---

## 10. Dropdown Menu

### 10.1 Anatomy

```
[Menu Trigger ▾]
┌──────────────────┐
│ Profile          │
│ Settings         │
│ ──────────────── │  ← Divider
│ Help             │
│ Sign out         │
└──────────────────┘
```

### 10.2 Item Types

| Type | Description |
|------|-------------|
| Standard | Text label |
| With icon | Leading icon + text |
| With shortcut | Text + right-aligned shortcut key |
| With description | Label + description text |
| Checkbox | Toggle item |
| Radio group | Exclusive selection within group |
| Submenu | Arrow indicator → opens nested menu |
| Destructive | Red text for danger actions (delete) |
| Disabled | Grayed out, not interactive |

### 10.3 Rules

- `role="menu"` + `role="menuitem"`.
- Arrow keys: up/down between items.
- Enter/Space to select.
- Escape to close.
- Type-ahead: typing letters jumps to matching item.
- Position: below trigger, flip if near edge.
- Max height with scroll for long menus.
- Minimum width: match trigger width, or a set minimum (160–200px).

---

## 11. Command Palette

### 11.1 Anatomy

```
┌──────────────────────────────────────────────┐
│ 🔍  Type a command or search...              │
├──────────────────────────────────────────────┤
│ Recent                                       │
│   📊  Open Dashboard                  ⌘D     │
│   📁  Go to Projects                 ⌘P     │
│ Actions                                      │
│   ✏️  Edit Profile                           │
│   ⚙  Open Settings                   ⌘,    │
│   🎨  Toggle Dark Mode               ⌘⇧D   │
└──────────────────────────────────────────────┘
```

### 11.2 Features

- Global keyboard shortcut to open (typically `⌘K` or `⌘P`).
- Fuzzy search across commands, pages, settings.
- Grouped results (recent, actions, pages).
- Keyboard navigation (arrow keys, Enter to select).
- Instant filtering as user types.
- Nested commands: select a category, then deeper items.

---

## 12. Pagination

### 12.1 Standard Pattern

```
← Previous  1  2  [3]  4  5  ...  20  Next →
```

### 12.2 Rules

- Current page is highlighted (not a link).
- Show first, last, and 1-2 neighbors around current.
- Ellipsis for gaps.
- Disable Previous on page 1, Next on last page.
- Show total: "Showing 21-30 of 197 results".
- Allow page size selector: "Show 10 | 25 | 50 | 100 per page".

### 12.3 Compact Pagination (Mobile)

```
Page 3 of 20  [← Previous]  [Next →]
```

---

## 13. Steppers

### 13.1 Anatomy

```
(1) Account  ——  (2) Profile  ——  (3) Review  ——  (○) Done
  ✓ Complete     ● Current         ○ Upcoming     ○ Upcoming
```

### 13.2 Steps States

| State | Visual |
|-------|--------|
| Completed | Filled circle + check icon, connected line is solid |
| Current | Accent ring or filled, label is bold |
| Upcoming | Empty circle, muted label |
| Error | Red circle with error icon |
| Disabled | Grayed out, not clickable |

### 13.3 Stepper Variants

| Variant | Layout |
|---------|--------|
| Horizontal | Steps in a row with connecting lines |
| Vertical | Steps stacked with connecting lines |
| Dots | Minimal — just dots, no labels |
| Progress bar | Single bar filling left-to-right |
| Numbered | Step numbers inside circles |

---

## 14. Link Navigation

### 14.1 Link Styles

| Context | Style |
|---------|-------|
| Inline (body text) | Underline + accent color |
| Navigation | No underline, underline on hover |
| Standalone | Button-like, no underline |
| Visited | Different color (optional, for content-heavy sites) |

### 14.2 External Links

- Add external icon (↗) or `(opens in new tab)` for `target="_blank"`.
- `rel="noopener noreferrer"` on external links.
- Announce to screen readers: "opens in a new window".

### 14.3 Skip Links

```html
<a href="#main-content" class="skip-link">Skip to main content</a>
```

- First focusable element on the page.
- Visually hidden until focused.
- Jumps past navigation to main content area.

---

## 15. Skip Links & Landmarks

### 15.1 ARIA Landmarks

| Role | Element | Purpose |
|------|---------|---------|
| `banner` | `<header>` | Site header |
| `navigation` | `<nav>` | Navigation regions |
| `main` | `<main>` | Primary content |
| `complementary` | `<aside>` | Sidebar content |
| `contentinfo` | `<footer>` | Site footer |
| `search` | `<search>` or `role="search"` | Search form |

### 15.2 Landmark Rules

- Every page has exactly one `<main>`.
- Multiple `<nav>` elements each need unique `aria-label` ("Primary navigation", "Footer navigation").
- Landmarks help screen reader users jump between page regions.
- Test: screen reader users can list all landmarks and jump to any one.

---

## 16. Responsive Navigation

### 16.1 Breakpoint Strategies

| Viewport | Navigation Pattern |
|----------|-------------------|
| Desktop (>1024px) | Full top bar + sidebar |
| Tablet (768–1024px) | Top bar + collapsed sidebar rail |
| Mobile (<768px) | Hamburger menu → drawer / bottom nav |

### 16.2 Hamburger Menu

```
Desktop:  [Logo]  Link  Link  Link  [User]
Mobile:   [☰]    [Logo]             [User]
```

- Hamburger icon (☰) triggers a full-screen overlay or slide-in drawer.
- Animate open/close (slide from left or top).
- Trap focus inside open menu.
- Close on Escape, outside click, or close button.

### 16.3 Responsive Tab Overflow

- When tabs don't fit: scroll horizontally with fade + arrow buttons.
- Or collapse into a "More" dropdown for overflow tabs.
- On mobile: consider converting tabs to a select dropdown or accordion.

---

## 17. Navigation Accessibility

### 17.1 Keyboard Navigation

| Component | Keys |
|-----------|------|
| Top nav links | Tab/Shift+Tab between links |
| Dropdown menu | Enter/Space to open, arrows inside, Escape to close |
| Tabs | Arrow keys between tabs, Tab into panel |
| Sidebar | Tab between items, arrows optional |
| Breadcrumbs | Tab between links |
| Command palette | ⌘K to open, arrows to navigate, Enter to select, Escape to close |

### 17.2 Focus Management

- After closing a dropdown/drawer, return focus to the trigger.
- Trap focus inside modals and drawers.
- Skip links must work.
- Focus indicator must be visible on all interactive elements.

### 17.3 Screen Reader

- `<nav>` has `aria-label` describing the navigation purpose.
- Current page: `aria-current="page"` on the active link.
- Expandable items: `aria-expanded="true/false"`.
- Dropdown menus: `aria-haspopup="menu"`.
- Breadcrumb separator: `aria-hidden="true"`.

---

## 18. Navigation Tokens Summary

### Complete Token Inventory

```
TOP BAR
  --ds-topbar-height           56-64px
  --ds-topbar-bg               background color
  --ds-topbar-border           bottom border color
  --ds-topbar-shadow           optional shadow
  --ds-topbar-z-index          1000

SIDEBAR
  --ds-sidebar-width           240-280px
  --ds-sidebar-width-collapsed 56-64px
  --ds-sidebar-bg              background color
  --ds-sidebar-border          right border color
  --ds-sidebar-z-index         900

NAV ITEM
  --ds-nav-item-height         40-44px
  --ds-nav-item-padding-x      12-16px
  --ds-nav-item-radius         radius-sm or radius-md
  --ds-nav-item-hover-bg       hover background
  --ds-nav-item-active-bg      active background
  --ds-nav-item-active-border  left or bottom accent (3px)
  --ds-nav-item-text           default text color
  --ds-nav-item-text-active    active text color
  --ds-nav-item-icon-size      20px

TABS
  --ds-tab-height              40px
  --ds-tab-padding-x           16px
  --ds-tab-font-size           14px
  --ds-tab-indicator-height    2-3px
  --ds-tab-indicator-color     accent color
  --ds-tab-text                default text color
  --ds-tab-text-active         active text color

BREADCRUMB
  --ds-breadcrumb-font-size    13-14px
  --ds-breadcrumb-separator    "/"  or  ">"
  --ds-breadcrumb-gap          8px

DROPDOWN
  --ds-dropdown-min-width      160-200px
  --ds-dropdown-max-height     320px
  --ds-dropdown-bg             background
  --ds-dropdown-shadow         elevation shadow
  --ds-dropdown-radius         radius-md
  --ds-dropdown-item-height    36-40px
  --ds-dropdown-item-padding   8-12px

BOTTOM NAV
  --ds-bottom-nav-height       56-64px
  --ds-bottom-nav-bg           background
  --ds-bottom-nav-border       top border color
  --ds-bottom-nav-icon-size    24px
  --ds-bottom-nav-font-size    11-12px

STEPPER
  --ds-stepper-node-size       32-40px
  --ds-stepper-line-width      2px
  --ds-stepper-line-color      muted (incomplete) / accent (complete)
  --ds-stepper-gap             16-24px
```

---

*This chapter defines the complete navigation vocabulary for a Design System. Every top bar, sidebar, breadcrumb, tab set, dropdown, command palette, and mobile nav pattern above should be present in the implemented DS.*
