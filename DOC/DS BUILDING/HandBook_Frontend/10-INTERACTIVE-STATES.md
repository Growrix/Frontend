# 10 — Interactive States

> Everything a Design System must define for element states — default, hover, focus, active, disabled, loading, selected, error, and every other state a UI element can occupy. This chapter covers the state matrix, visual treatment, transition timing, and compound states.

---

## Table of Contents

1. [State Philosophy](#1-state-philosophy)
2. [Core State Taxonomy](#2-core-state-taxonomy)
3. [Visual Treatment Per State](#3-visual-treatment-per-state)
4. [State Priority & Compound States](#4-state-priority--compound-states)
5. [Button States](#5-button-states)
6. [Input States](#6-input-states)
7. [Link States](#7-link-states)
8. [Checkbox & Radio States](#8-checkbox--radio-states)
9. [Toggle / Switch States](#9-toggle--switch-states)
10. [Card & Surface States](#10-card--surface-states)
11. [Tab States](#11-tab-states)
12. [Menu Item States](#12-menu-item-states)
13. [Drag & Drop States](#13-drag--drop-states)
14. [Skeleton / Loading States](#14-skeleton--loading-states)
15. [Empty States](#15-empty-states)
16. [State Tokens](#16-state-tokens)
17. [State Transition Timing](#17-state-transition-timing)
18. [States Token Summary](#18-states-token-summary)

---

## 1. State Philosophy

### 1.1 Why States Matter

States communicate:
- **Capability**: Can this be interacted with? (enabled vs disabled)
- **Feedback**: What happened? (hover, pressed, loading)
- **Progress**: Where am I? (active, visited, current)
- **Validity**: Is this correct? (valid, invalid, warning)
- **Context**: What's selected? (checked, selected, expanded)

### 1.2 Core Rules

1. **Every interactive element must visually respond** to at least: hover, focus, active, and disabled.
2. **States must be distinguishable** — each state must look different from every other state.
3. **Multiple cues** — never rely on a single visual property (color alone) to indicate state.
4. **State transitions must animate** — abrupt changes feel broken.
5. **Disabled means disabled** — no half-disabled patterns.
6. **Consistency** — the same state looks the same across all components.

---

## 2. Core State Taxonomy

### 2.1 Universal States

| State | CSS Selector | Meaning |
|-------|-------------|---------|
| **Default / Rest** | (no pseudo-class) | Normal, idle appearance |
| **Hover** | `:hover` | Pointer is over element |
| **Focus** | `:focus-visible` | Element has keyboard focus |
| **Active / Pressed** | `:active` | Currently being clicked/tapped |
| **Disabled** | `:disabled`, `[aria-disabled]` | Cannot be interacted with |

### 2.2 Selection States

| State | Attribute | Meaning |
|-------|-----------|---------|
| **Selected** | `[aria-selected="true"]` | Chosen in a set (tabs, list items) |
| **Checked** | `:checked`, `[aria-checked]` | Toggle is on (checkbox, switch) |
| **Indeterminate** | `:indeterminate` | Partially checked (parent checkbox) |
| **Current** | `[aria-current]` | Current item in navigation |

### 2.3 Validity States

| State | Attribute | Meaning |
|-------|-----------|---------|
| **Valid** | `[aria-invalid="false"]` | Input passes validation |
| **Invalid / Error** | `[aria-invalid="true"]` | Input fails validation |
| **Warning** | `[data-state="warning"]` | Non-blocking concern |

### 2.4 Process States

| State | Meaning |
|-------|---------|
| **Loading** | Action in progress, awaiting result |
| **Skeleton** | Content placeholder before data loads |
| **Empty** | No content to display |
| **Dragging** | Element is being dragged |
| **Drop target** | Receiving a drag |

### 2.5 Extended States

| State | Meaning |
|-------|---------|
| **Read-only** | Visible but not editable |
| **Visited** | Link has been followed |
| **Expanded** | Accordion/disclosure is open |
| **Collapsed** | Accordion/disclosure is closed |
| **Pinned / Sticky** | Element is stuck to viewport |

---

## 3. Visual Treatment Per State

### 3.1 Property Changes Matrix

| State | Background | Border | Text | Shadow | Transform | Opacity | Icon |
|-------|-----------|--------|------|--------|-----------|---------|------|
| Default | Base | Base | Base | Base | None | 1 | Base |
| Hover | Lighten/darken 5–10% | Darken | — | Increase | translateY(-1px) | — | — |
| Focus | — | Accent color | — | Focus ring | — | — | — |
| Active | Darken 10–15% | Darken | — | Decrease | scale(0.97–0.99) | — | — |
| Disabled | Muted | Muted | Muted | None | — | 0.4–0.6 | Muted |
| Selected | Accent tint | Accent | Accent | — | — | — | Filled |
| Error | Error tint | Error | Error | — | — | — | Error icon |
| Loading | — | — | Hidden | — | — | Content: 0 | Spinner |

### 3.2 Background Manipulation

| Method | Light Mode | Dark Mode |
|--------|-----------|-----------|
| Hover lighten | White overlay at 5–10% opacity | White overlay at 5–8% opacity |
| Hover darken | Black overlay at 5–10% opacity | Not recommended |
| Active darken | Black overlay at 10–15% opacity | White overlay reduced |
| Selected tint | Accent at 10–15% opacity | Accent at 15–20% opacity |
| Error tint | Red at 5–10% opacity | Red at 10–15% opacity |

Implementation (using overlays, not color changes):
```css
.button:hover    { background: color-mix(in srgb, var(--ds-color-bg-btn), white 10%); }
.button:active   { background: color-mix(in srgb, var(--ds-color-bg-btn), black 10%); }
```

---

## 4. State Priority & Compound States

### 4.1 Priority Order

When multiple states are active simultaneously, this is the priority:

```
Disabled > Error > Loading > Focus + Active > Focus + Hover > Focus > Active > Hover > Selected > Default
```

1. **Disabled** overrides everything — if disabled, no other state visuals apply.
2. **Error** overrides normal interaction states.
3. **Loading** replaces content interaction.
4. **Focus** can compound with hover and active.
5. **Active** overrides hover.
6. **Hover** overrides default.
7. **Selected** is a persistent state, additive with interaction states.

### 4.2 Compound States

Common combinations:

| Compound | Visual |
|----------|--------|
| Selected + Hover | Selected background + hover brightness change |
| Selected + Focus | Selected background + focus ring |
| Error + Focus | Error border retained + focus ring (accent or error) |
| Disabled + Selected | Selected appearance at reduced opacity |
| Loading + Disabled | Loading spinner, interaction blocked |

---

## 5. Button States

### 5.1 Primary Button

| State | Background | Border | Text | Shadow |
|-------|-----------|--------|------|--------|
| Default | Accent solid | None | White | sm |
| Hover | Accent lighten 10% | None | White | md |
| Focus | Accent | Focus ring | White | sm |
| Active | Accent darken 15% | None | White | none |
| Disabled | Accent at 40% opacity | None | White at 60% | none |
| Loading | Accent | None | Hidden (spinner) | sm |

### 5.2 Secondary / Outline Button

| State | Background | Border | Text |
|-------|-----------|--------|------|
| Default | Transparent | Subtle border | Default text |
| Hover | Subtle fill | Darker border | Default text |
| Focus | Transparent | Focus ring | Default text |
| Active | Darker fill | Darker border | Default text |
| Disabled | Transparent | Muted border | Muted text |

### 5.3 Ghost Button

| State | Background | Border | Text |
|-------|-----------|--------|------|
| Default | Transparent | None | Default text |
| Hover | Subtle fill | None | Default text |
| Focus | Transparent | Focus ring | Default text |
| Active | Darker fill | None | Default text |

### 5.4 Destructive Button

Same as primary states but with danger/red color.

---

## 6. Input States

### 6.1 Text Input

| State | Background | Border | Label | Helper Text |
|-------|-----------|--------|-------|------------|
| Default | Surface | Subtle | Muted | Muted |
| Hover | Surface | Default | Muted | Muted |
| Focus | Surface | Accent (2px) | Accent | Muted |
| Filled | Surface | Default | Default | Muted |
| Error | Surface | Danger | Danger | Error message (danger) |
| Disabled | Muted | Muted | Muted | Muted |
| Read-only | Surface | Muted dashed | Default | Muted |

### 6.2 Input with Validation

- Valid: Green check icon + green border (on blur, not on every keystroke).
- Invalid: Red X icon + red border + error message.
- Don't validate while typing — validate on blur or on submit.

---

## 7. Link States

### 7.1 Standard Link

| State | Color | Decoration | Cursor |
|-------|-------|------------|--------|
| Default | Accent | Underline (or none for nav) | pointer |
| Hover | Accent darken | Underline (thicker or color change) | pointer |
| Focus | Accent | Focus ring | — |
| Active | Accent darken more | Underline | pointer |
| Visited | Muted/purple | Underline | pointer |
| Disabled | Muted | None | not-allowed |

### 7.2 Rules

- In-text links should always be underlined (WCAG — can't rely on color alone).
- Navigation links may skip underline (context makes them identifiable).
- Visited state is optional in DS (application links often skip it).

---

## 8. Checkbox & Radio States

### 8.1 Checkbox

| State | Box | Check | Label |
|-------|-----|-------|-------|
| Unchecked | Border only | Hidden | Default |
| Checked | Accent fill | White check | Default |
| Indeterminate | Accent fill | Dash/minus | Default |
| Hover (unchecked) | Border darken | Hidden | Default |
| Hover (checked) | Accent lighten | White check | Default |
| Focus | Focus ring | — | — |
| Disabled (unchecked) | Muted border | Hidden | Muted |
| Disabled (checked) | Muted fill | Muted check | Muted |
| Error | Danger border | — | Default + error text |

### 8.2 Radio

Same as checkbox but:
- Circle shape instead of square.
- Filled dot instead of checkmark.
- No indeterminate state.

---

## 9. Toggle / Switch States

| State | Track | Thumb | Label |
|-------|-------|-------|-------|
| Off | Gray/muted | Left position | Default |
| On | Accent | Right position | Default |
| Hover (off) | Gray darken | Slight scale up | Default |
| Hover (on) | Accent lighten | Slight scale up | Default |
| Focus | Focus ring on track | — | — |
| Disabled (off) | Muted | Muted, left | Muted |
| Disabled (on) | Accent muted | Muted, right | Muted |
| Loading | — | Spinner replaces thumb | — |

---

## 10. Card & Surface States

### 10.1 Interactive Card

| State | Shadow | Border | Transform | Background |
|-------|--------|--------|-----------|-----------|
| Default | sm | Subtle | None | Surface |
| Hover | md | Default | translateY(-2px) | Surface lighten |
| Focus | sm | Focus ring | None | Surface |
| Active | xs | Default | translateY(0) | Surface darken |
| Selected | sm | Accent (2px) | None | Accent tint |
| Disabled | none | Muted | None | Muted, 50% opacity |

### 10.2 Non-Interactive Card

Only has Default state — no hover, focus, or active.

---

## 11. Tab States

| State | Background | Border | Text | Indicator |
|-------|-----------|--------|------|-----------|
| Default | Transparent | None | Muted | None |
| Hover | Subtle fill | None | Default | None |
| Focus | Transparent | Focus ring | Default | None |
| Active (selected) | Transparent or accent tint | None | Accent or strong | Bottom bar (accent) |
| Disabled | Transparent | None | Muted | None |

---

## 12. Menu Item States

| State | Background | Text | Icon |
|-------|-----------|------|------|
| Default | Transparent | Default | Default |
| Hover | Subtle fill | Default | Default |
| Focus | Subtle fill | Default | Default |
| Active (pressed) | Darker fill | Default | Default |
| Current / Selected | Accent tint | Accent | Accent |
| Disabled | Transparent | Muted | Muted |
| Destructive | Transparent | Danger | Danger |
| Destructive + Hover | Danger tint | Danger | Danger |

---

## 13. Drag & Drop States

| State | Element Visual |
|-------|---------------|
| **Idle** | Normal appearance |
| **Grab-ready** | `cursor: grab`, slight shadow increase on hover |
| **Dragging** | Reduced opacity (0.5), elevated shadow, `cursor: grabbing` |
| **Drag ghost** | Semi-transparent clone at cursor position |
| **Drop target (valid)** | Dashed accent border, accent tint background |
| **Drop target (invalid)** | Dashed danger border, danger tint |
| **Drop target (hover)** | Stronger accent fill, border solid |
| **Dropped** | Flash/highlight effect, then return to normal |

---

## 14. Skeleton / Loading States

### 14.1 Skeleton Screen

Placeholder shapes that mimic the layout of content before it loads:

| Element | Skeleton |
|---------|----------|
| Text line | Rounded rectangle, 60–100% width, shimmer animation |
| Heading | Taller rectangle, 40–70% width |
| Avatar | Circle |
| Image | Rectangle with aspect ratio matching image |
| Button | Rounded rectangle matching button dimensions |

### 14.2 Loading Indicators

| Pattern | When |
|---------|------|
| Skeleton screen | Known layout, replacing content |
| Spinner (centered) | Unknown layout, page/section load |
| Spinner (inline) | Button loading, small actions |
| Progress bar | Known progress percentage |
| Pulse dots | Chat typing indicator |

---

## 15. Empty States

When a list, table, or section has no content:

### 15.1 Anatomy

```
┌─────────────────────────────┐
│                             │
│         [Icon/Illustration] │
│                             │
│     "No items found"        │  ← Heading
│     "Add your first..."     │  ← Description
│                             │
│     [ + Add Item ]          │  ← Action button
│                             │
└─────────────────────────────┘
```

### 15.2 Types

| Type | When | Tone |
|------|------|------|
| **First use** | No data ever created | Encouraging, guide to first action |
| **Filtered empty** | Filters/search returned nothing | Helpful, suggest adjusting filters |
| **Error empty** | Data failed to load | Error message + retry action |
| **Completed** | All items processed | Congratulatory |
| **No permission** | User can't access | Informational, link to request access |

---

## 16. State Tokens

### 16.1 Overlay Tokens

| Token | Value | Purpose |
|-------|-------|---------|
| `--ds-state-hover` | `rgb(0 0 0 / 0.04)` | Hover overlay (light mode) |
| `--ds-state-focus` | Focus ring (accent color) | Focus indicator |
| `--ds-state-active` | `rgb(0 0 0 / 0.08)` | Pressed overlay |
| `--ds-state-selected` | `rgb(accent / 0.08)` | Selected background tint |
| `--ds-state-disabled-opacity` | `0.4` | Disabled element opacity |
| `--ds-state-drag-opacity` | `0.5` | Dragging element opacity |

---

## 17. State Transition Timing

| Transition | Duration | Easing |
|-----------|----------|--------|
| Hover in | 100ms | ease-out |
| Hover out | 150ms | ease-in |
| Focus in | 100ms | ease-out |
| Focus out | 100ms | ease-in |
| Active press | 50ms | ease-out |
| Active release | 100ms | ease-out |
| Selected toggle | 200ms | ease-standard |
| Disabled change | 150ms | ease-standard |
| Error appear | 200ms | ease-out |

---

## 18. States Token Summary

### Complete Token Inventory

```
STATE OVERLAYS
  --ds-state-hover            light overlay on hover
  --ds-state-active           darker overlay on press
  --ds-state-selected         accent tint overlay
  --ds-state-focus            accent focus ring
  --ds-state-disabled-opacity 0.4
  --ds-state-drag-opacity     0.5

STATE COLORS
  --ds-state-error-bg         error background tint
  --ds-state-error-border     error border color
  --ds-state-error-text       error text color
  --ds-state-warning-bg
  --ds-state-warning-border
  --ds-state-warning-text
  --ds-state-success-bg
  --ds-state-success-border
  --ds-state-success-text

TRANSITION TIMING
  Hover:    100ms ease-out (in), 150ms ease-in (out)
  Focus:    100ms ease-out
  Active:   50ms ease-out
  Selected: 200ms ease-standard
  Error:    200ms ease-out

CURSORS
  Default: default
  Interactive: pointer
  Disabled: not-allowed
  Grab: grab / grabbing
  Text: text
  Resize: ew-resize, ns-resize, nesw-resize, nwse-resize
  Loading: progress

COMPONENT STATE COVERAGE
  Every interactive component must define:
    default, hover, focus, active, disabled
  Selection components also define:
    selected, checked, indeterminate
  Input components also define:
    filled, error, valid, read-only
  Process components also define:
    loading, skeleton, empty
```

---

*This chapter defines the complete interactive states vocabulary for a Design System. Every state, visual treatment, transition timing, and cursor pattern above must be implemented consistently across all components.*
