# 14 — Overlay Patterns

> Every overlay pattern a Design System must define — modals, dialogs, drawers, sheets, popovers, tooltips, toasts, dropdown menus, context menus, lightboxes, and the layering rules that govern them all.

---

## Table of Contents

1. [Overlay Philosophy](#1-overlay-philosophy)
2. [Z-Index Architecture](#2-z-index-architecture)
3. [Backdrop / Scrim](#3-backdrop--scrim)
4. [Modal Dialog](#4-modal-dialog)
5. [Alert Dialog](#5-alert-dialog)
6. [Drawer / Sheet](#6-drawer--sheet)
7. [Popover](#7-popover)
8. [Tooltip](#8-tooltip)
9. [Toast / Snackbar](#9-toast--snackbar)
10. [Dropdown Menu](#10-dropdown-menu)
11. [Context Menu](#11-context-menu)
12. [Command Palette](#12-command-palette)
13. [Lightbox](#13-lightbox)
14. [Notification Panel](#14-notification-panel)
15. [Overlay Stacking](#15-overlay-stacking)
16. [Overlay Accessibility](#16-overlay-accessibility)
17. [Overlay Animation](#17-overlay-animation)
18. [Overlay Tokens Summary](#18-overlay-tokens-summary)

---

## 1. Overlay Philosophy

### 1.1 Core Principles

1. **Interruption budget** — every overlay costs user attention. Use the lightest overlay that serves the need.
2. **Dismiss contract** — users must always have a way out (close button, Escape, backdrop click).
3. **Focus imprisonment** — overlays that obscure content must trap focus inside.
4. **Scroll lock** — overlays that cover the viewport must prevent background scroll.
5. **One at a time** — avoid stacking overlays. If unavoidable, manage z-index carefully.

### 1.2 Overlay Hierarchy (Lightest → Heaviest)

```
Tooltip        → zero interruption, informational only
Popover        → low interruption, supplementary content
Dropdown/Menu  → low interruption, action selection
Toast          → low interruption, passive notification
Drawer/Sheet   → medium interruption, panel content
Modal          → high interruption, requires decision
Alert Dialog   → highest interruption, blocking confirmation
```

---

## 2. Z-Index Architecture

### 2.1 Layer Scale

| Layer | z-index | Purpose |
|-------|---------|---------|
| Base content | 0 | Page content |
| Sticky elements | 100 | Sticky headers, floating buttons |
| Dropdown / Popover | 200 | Menus, popovers, tooltips |
| Top bar / Sidebar | 300 | Fixed navigation |
| Drawer overlay | 400 | Side drawers |
| Modal backdrop | 500 | Modal scrim |
| Modal content | 510 | Modal dialog |
| Toast | 600 | Notifications (always on top) |
| Tooltip | 700 | Tooltips (topmost transient) |

### 2.2 Rules

- **Never use arbitrary z-index** values. Use tokens.
- **Stacking contexts**: `transform`, `opacity < 1`, `filter`, and `will-change` create new stacking contexts — beware.
- **Portals**: render overlays at the document root (`<body>`) to escape parent stacking contexts.
- **Incremental**: overlays opened inside overlays get z-index + 10 on each layer.

---

## 3. Backdrop / Scrim

### 3.1 Purpose

A semi-transparent overlay behind a modal/drawer that:
- Dims the background content.
- Signals that background is inert.
- Captures clicks (click-to-dismiss).

### 3.2 Styling

```css
.backdrop {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);    /* 40–60% opacity */
  backdrop-filter: blur(4px);          /* optional blur */
  z-index: var(--ds-z-modal-backdrop);
}
```

### 3.3 Variants

| Variant | Background | Use |
|---------|-----------|-----|
| Dark | Black 40–60% | Standard modal |
| Light | White 60–80% | Light theme overlays |
| Blur | Transparent + blur(4-8px) | Glass/modern aesthetic |
| None | Transparent | Drawers that don't dim |

### 3.4 Behavior

- Click backdrop → close overlay (unless alert dialog).
- `aria-hidden="true"` on backdrop.
- Animate: fade in 150–200ms.

---

## 4. Modal Dialog

### 4.1 Anatomy

```
┌──────────────────────────────────┐
│  Modal Title               [✕]  │ ← Header
│─────────────────────────────────│
│                                  │
│  Modal content goes here.        │ ← Body (scrollable)
│  Can contain forms, text,        │
│  or any content.                 │
│                                  │
│─────────────────────────────────│
│           [Cancel]  [Confirm]    │ ← Footer (sticky)
└──────────────────────────────────┘
```

### 4.2 Size Scale

| Size | Width | Use Case |
|------|-------|----------|
| Small | 400px | Confirmations, simple forms |
| Default | 500–560px | Standard content |
| Large | 680–720px | Complex forms, multi-column |
| Extra large | 900–960px | Data tables, comparisons |
| Full screen | 100vw – padding | Immersive tasks |

### 4.3 Behavior Rules

1. Centered vertically and horizontally.
2. Max height: `90vh`, body scrolls internally.
3. Focus trap: Tab cycles inside modal only.
4. On open: focus first focusable element (or close button).
5. On close (Escape, ✕, backdrop): return focus to trigger element.
6. `role="dialog"`, `aria-modal="true"`, `aria-labelledby` → title.
7. `<body>` gets `overflow: hidden` to prevent background scroll.

### 4.4 Scroll Behavior

- **Body scrolls**: header and footer stay fixed, content area scrolls.
- **Full modal scrolls**: entire modal scrolls within the viewport (less common).

---

## 5. Alert Dialog

### 5.1 Purpose

A special modal for **destructive or irreversible actions** requiring explicit confirmation.

### 5.2 Anatomy

```
┌──────────────────────────────────┐
│  ⚠ Delete Project?               │
│                                  │
│  This action cannot be undone.   │
│  All data will be permanently    │
│  removed.                        │
│                                  │
│           [Cancel]  [Delete]     │
└──────────────────────────────────┘
```

### 5.3 Rules

1. **No backdrop dismiss** — user must click a button.
2. **No Escape dismiss** — or Escape maps to Cancel.
3. `role="alertdialog"`.
4. Focus lands on **least destructive action** (Cancel).
5. Destructive button is visually distinct (red).
6. Must describe consequences clearly.

---

## 6. Drawer / Sheet

### 6.1 Anatomy

```
┌──────┬──────────────────────────────┐
│      │  Drawer Title          [✕]  │
│      │──────────────────────────────│
│ Page │                              │
│      │  Drawer content...           │
│      │                              │
│      │──────────────────────────────│
│      │         [Cancel] [Save]      │
└──────┴──────────────────────────────┘
```

### 6.2 Variants

| Variant | Direction | Width/Height |
|---------|-----------|-------------|
| Right drawer | Slides from right | 320–480px width |
| Left drawer | Slides from left | 240–320px width (navigation) |
| Bottom sheet | Slides from bottom | 40–90vh height |
| Top sheet | Slides from top | Variable height |
| Full-width bottom | Mobile bottom sheet | 100% width |

### 6.3 Bottom Sheet Behaviors (Mobile)

| Feature | Description |
|---------|-------------|
| Snap points | Detent positions (25%, 50%, 90% of viewport) |
| Drag to dismiss | Swipe down past threshold to close |
| Handle bar | Visual grabber indicator at top |
| Velocity dismiss | Fast swipe closes regardless of position |
| Nested scroll | Content scrolls when sheet is at max height |

### 6.4 Drawer Behavior Rules

1. Slides into view with animation (200–300ms).
2. Backdrop optional (right drawers usually have it; left nav drawers may not).
3. Focus trap when backdrop is present.
4. Escape to close.
5. On mobile: drawers become full-screen or bottom sheets.

---

## 7. Popover

### 7.1 Anatomy

```
        [Trigger Button]
              ▼
    ┌────────────────────┐
    │ Popover content    │
    │ Can be rich:       │
    │ text, forms, etc.  │
    └────────────────────┘
```

### 7.2 Positioning

| Position | Arrow |
|----------|-------|
| Top | ▼ on bottom edge |
| Bottom | ▲ on top edge |
| Left | ▶ on right edge |
| Right | ◀ on left edge |
| Auto | Flips to stay in viewport |

### 7.3 Behavior Rules

1. Triggered by click (not hover — hover is tooltip).
2. Click outside or Escape to close.
3. Positioned relative to trigger with offset (8–12px gap).
4. Auto-flips when near viewport edge.
5. Not a focus trap — focus can move in and out.
6. `aria-expanded` on trigger, popover connected via `aria-controls`.
7. Arrow/caret points to trigger.
8. Max width: 320–400px.
9. Max height: 400px with internal scroll.

---

## 8. Tooltip

### 8.1 Anatomy

```
       ┌───────────────┐
       │  Label text    │
       └───────┬───────┘
               ▼
         [Icon Button]
```

### 8.2 Rules

1. Triggered by **hover** and **focus** (keyboard accessible).
2. Appears after a delay: 300–500ms hover, instant on focus.
3. Disappears after: mouse leave, focus leave, or a timeout.
4. Content is **text only** — no interactive elements inside.
5. Maximum width: 200–280px.
6. Single line preferred, 2-3 lines maximum.
7. Position: auto (prefer top, flip as needed).
8. `role="tooltip"`, trigger has `aria-describedby`.
9. Never convey essential information only in a tooltip.

### 8.3 Tooltip vs. Popover

| Tooltip | Popover |
|---------|---------|
| Hover/focus trigger | Click trigger |
| Text only | Rich content |
| No interaction inside | Can have buttons, links |
| Informational | Actionable |
| `role="tooltip"` | `role="dialog"` or none |

---

## 9. Toast / Snackbar

### 9.1 Anatomy

```
┌──────────────────────────────────────┐
│ ✓  Changes saved successfully  [✕]  │
└──────────────────────────────────────┘
```

### 9.2 Variants

| Variant | Color | Icon |
|---------|-------|------|
| Success | Green | ✓ Checkmark |
| Error | Red | ✕ Error |
| Warning | Amber | ⚠ Warning |
| Info | Blue | ℹ Info |
| Neutral | Gray | None |

### 9.3 Behavior Rules

1. Auto-dismiss after 3–8 seconds (success/info).
2. Error toasts persist until dismissed (or longer duration).
3. Position: bottom-right, top-right, top-center, or bottom-center.
4. Stack: new toasts push older ones up (or down).
5. Maximum visible: 3–5, queue the rest.
6. Close button always present.
7. Optional action button: "Undo", "View", "Retry".
8. Pause auto-dismiss on hover.
9. `role="status"` or `role="alert"` (for errors).
10. Announce to screen readers via live region.

### 9.4 Toast Anatomy

```
┌──────────────────────────────────────────┐
│ [Icon]  Title (optional)           [✕]  │
│         Description message              │
│         [Action Button]                  │
└──────────────────────────────────────────┘
```

---

## 10. Dropdown Menu

### 10.1 Anatomy

```
[Trigger ▾]
┌──────────────────┐
│ ↩ Undo      ⌘Z  │
│ ↪ Redo      ⌘⇧Z │
│ ──────────────── │
│ ✂ Cut       ⌘X  │
│ 📋 Copy     ⌘C  │
│ 📎 Paste    ⌘V  │
│ ──────────────── │
│ 🗑 Delete   ⌫   │ ← Destructive (red)
└──────────────────┘
```

### 10.2 Behavior

- Open: click trigger (or Enter/Space).
- Navigate: Arrow keys.
- Select: Enter/Space.
- Close: Escape, click outside, or select item.
- Submenu: Right arrow opens, Left arrow closes.
- Type-ahead: typing characters jumps to matching item.
- Min width: 160px. Max width: 320px.
- Max height: ~320px with scroll indicator.

---

## 11. Context Menu

### 11.1 Trigger

Right-click (or long-press on mobile).

### 11.2 Rules

- Appears at cursor position.
- Same keyboard and item patterns as dropdown menu.
- Must not be the **only** way to access features.
- Contextual: items change based on what was right-clicked.
- `role="menu"` with `role="menuitem"`.

---

## 12. Command Palette

### 12.1 Anatomy

```
┌──────────────────────────────────────────────────┐
│ 🔍  >                                            │
├──────────────────────────────────────────────────┤
│ ⚡ Recently Used                                 │
│   Toggle Dark Mode                        ⌘⇧D   │
│   Open Settings                           ⌘,    │
│ 📄 Files                                         │
│   Button.tsx                                     │
│   layout.tsx                                     │
│ 🔧 Commands                                      │
│   Format Document                         ⌘⇧F   │
│   Go to Line                              ⌘G    │
└──────────────────────────────────────────────────┘
```

### 12.2 Rules

- Global shortcut: `⌘K` or `Ctrl+K`.
- Centered top of viewport, 600–640px wide.
- Fuzzy search across all registered commands.
- Arrow key navigation, Enter to execute.
- Escape to close.
- Categories: files, commands, settings, navigation.
- Show keyboard shortcuts alongside items.

---

## 13. Lightbox

### 13.1 Purpose

Full-screen overlay for viewing images, galleries, or media.

### 13.2 Anatomy

```
┌────────────────────────────────────────────┐
│                                     [✕]    │
│                                            │
│           ◀   [Image content]   ▶         │
│                                            │
│          1 / 12                            │
└────────────────────────────────────────────┘
```

### 13.3 Features

- Dark backdrop (80–90% opacity).
- Image scales to fit viewport with padding.
- Previous/Next navigation (arrows, swipe).
- Keyboard: Left/Right arrows, Escape to close.
- Pinch-to-zoom on touch.
- Image counter: "3 of 12".
- Optional caption below image.
- Preload adjacent images.

---

## 14. Notification Panel

### 14.1 Anatomy

```
        [🔔 ③]
           ▼
┌──────────────────────────┐
│ Notifications             │
│ [All] [Unread]           │
│──────────────────────────│
│ ● New comment on PR #42  │
│   2 minutes ago           │
│──────────────────────────│
│ ● Build completed         │
│   15 minutes ago          │
│──────────────────────────│
│ ○ User joined team        │
│   1 hour ago              │
│──────────────────────────│
│ [Mark all as read]        │
│ [View all notifications]  │
└──────────────────────────┘
```

### 14.2 Rules

- Triggered from bell icon in top bar.
- Popover or right-side panel/drawer.
- Show unread count badge on trigger.
- Groups: All, Unread, optionally by type.
- Each item: status dot, title, description, timestamp.
- Actions: mark read, mark all read, dismiss, navigate to source.
- Real-time updates via WebSocket or polling.

---

## 15. Overlay Stacking

### 15.1 Rules for Multiple Overlays

1. **Avoid if possible** — redesign to prevent stacking.
2. If unavoidable: new overlay always goes on top (higher z-index).
3. Each overlay gets its own backdrop, or one shared backdrop darkens further.
4. Closing the top overlay reveals the one below, not the page.
5. Focus returns to the previously focused element in the layer below.
6. Escape closes only the topmost overlay.

### 15.2 Common Stacking Scenarios

| Scenario | Solution |
|----------|----------|
| Modal opens a confirmation | Alert dialog stacks on top of modal |
| Dropdown inside a modal | Dropdown renders inside modal (same stacking context) |
| Toast while modal is open | Toast always renders above modal |
| Tooltip inside a popover | Tooltip renders above popover |

---

## 16. Overlay Accessibility

### 16.1 Focus Management

| Overlay | Focus Trap | Return Focus |
|---------|-----------|-------------|
| Modal | Yes | Yes — to trigger |
| Alert dialog | Yes | Yes — to trigger |
| Drawer | Yes (if has backdrop) | Yes — to trigger |
| Popover | No | Yes — to trigger |
| Tooltip | No focus (informational) | N/A |
| Toast | No (passive) | N/A |
| Dropdown | Yes (within menu) | Yes — to trigger |

### 16.2 ARIA Roles

| Overlay | Role | Key Attributes |
|---------|------|----------------|
| Modal | `dialog` | `aria-modal="true"`, `aria-labelledby` |
| Alert dialog | `alertdialog` | `aria-modal="true"`, `aria-describedby` |
| Drawer | `dialog` or `complementary` | `aria-label` |
| Popover | none or `dialog` | `aria-expanded` on trigger |
| Tooltip | `tooltip` | `aria-describedby` on trigger |
| Toast | `status` or `alert` | `aria-live="polite"` or `"assertive"` |
| Menu | `menu` | `aria-haspopup` on trigger |

### 16.3 Screen Reader Announcements

- Modals: announce title on open.
- Toasts: announce via live region.
- Alerts: `role="alert"` for urgent messages.
- Focus changes must not silently move without context.

---

## 17. Overlay Animation

### 17.1 Animation Patterns

| Overlay | Enter | Exit |
|---------|-------|------|
| Modal | Fade + scale up (0.95→1) | Fade + scale down (1→0.95) |
| Alert dialog | Fade + scale (faster) | Fade |
| Right drawer | Slide from right | Slide to right |
| Left drawer | Slide from left | Slide to left |
| Bottom sheet | Slide from bottom | Slide to bottom |
| Popover | Fade + scale from anchor | Fade + scale to anchor |
| Tooltip | Fade in (fast) | Fade out (fast) |
| Toast | Slide in from edge | Slide out / fade |
| Dropdown | Fade + slide down | Fade + slide up |
| Lightbox | Fade in / zoom from thumbnail | Fade out |

### 17.2 Duration Guidelines

| Overlay | Enter | Exit |
|---------|-------|------|
| Tooltip | 100–150ms | 75–100ms |
| Dropdown/Popover | 150–200ms | 100–150ms |
| Modal/Dialog | 200–250ms | 150–200ms |
| Drawer/Sheet | 250–300ms | 200–250ms |
| Lightbox | 300ms | 200ms |

### 17.3 Easing

- Enter: `ease-out` (decelerating into resting position).
- Exit: `ease-in` (accelerating out of view).
- Spring: for modern/playful feel.

---

## 18. Overlay Tokens Summary

### Complete Token Inventory

```
Z-INDEX SCALE
  --ds-z-dropdown           200
  --ds-z-sticky             100
  --ds-z-topbar             300
  --ds-z-drawer             400
  --ds-z-modal-backdrop     500
  --ds-z-modal              510
  --ds-z-toast              600
  --ds-z-tooltip            700

BACKDROP
  --ds-backdrop-color        rgba(0, 0, 0, 0.5)
  --ds-backdrop-blur         blur(4px)  (optional)

MODAL
  --ds-modal-width-sm        400px
  --ds-modal-width-md        560px
  --ds-modal-width-lg        720px
  --ds-modal-width-xl        960px
  --ds-modal-max-height      90vh
  --ds-modal-radius          radius-lg (12-16px)
  --ds-modal-padding         24px
  --ds-modal-shadow          elevation-xl
  --ds-modal-bg              surface color

DRAWER
  --ds-drawer-width          320-480px
  --ds-drawer-shadow         elevation-xl
  --ds-drawer-radius         0 or radius-lg on exposed edge

POPOVER
  --ds-popover-max-width     320-400px
  --ds-popover-max-height    400px
  --ds-popover-offset        8-12px from trigger
  --ds-popover-radius        radius-md (8px)
  --ds-popover-shadow        elevation-lg
  --ds-popover-arrow-size    8px

TOOLTIP
  --ds-tooltip-max-width     200-280px
  --ds-tooltip-padding       6-8px 10-12px
  --ds-tooltip-radius        radius-sm (4-6px)
  --ds-tooltip-bg            gray-900 (dark)
  --ds-tooltip-text          white
  --ds-tooltip-font-size     12-13px
  --ds-tooltip-delay         300-500ms

TOAST
  --ds-toast-width           360-420px
  --ds-toast-max-width       100vw - 32px (mobile)
  --ds-toast-radius          radius-md (8px)
  --ds-toast-shadow          elevation-lg
  --ds-toast-padding         12-16px
  --ds-toast-gap             8-12px between stacked
  --ds-toast-duration        3000-8000ms auto-dismiss

ANIMATION
  --ds-overlay-enter         200ms ease-out
  --ds-overlay-exit          150ms ease-in
  --ds-tooltip-enter         100ms ease-out
  --ds-tooltip-exit          75ms ease-in
  --ds-drawer-enter          250ms ease-out
  --ds-drawer-exit           200ms ease-in
```

---

*This chapter defines the complete overlay vocabulary for a Design System. Every modal, drawer, popover, tooltip, toast, menu, and stacking rule above should be present in the implemented DS.*
