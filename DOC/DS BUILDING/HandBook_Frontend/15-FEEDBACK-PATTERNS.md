# 15 — Feedback Patterns

> Every feedback pattern a Design System must define — alerts, banners, toasts, progress indicators, loading states, empty states, error pages, validation messages, confirmation flows, and all methods of communicating system status to users.

---

## Table of Contents

1. [Feedback Philosophy](#1-feedback-philosophy)
2. [Feedback Taxonomy](#2-feedback-taxonomy)
3. [Inline Alerts](#3-inline-alerts)
4. [Banners](#4-banners)
5. [Toast Notifications](#5-toast-notifications)
6. [Progress Indicators](#6-progress-indicators)
7. [Loading States](#7-loading-states)
8. [Skeleton Screens](#8-skeleton-screens)
9. [Empty States](#9-empty-states)
10. [Error Pages](#10-error-pages)
11. [Validation Feedback](#11-validation-feedback)
12. [Confirmation Patterns](#12-confirmation-patterns)
13. [Status Indicators](#13-status-indicators)
14. [Notification System](#14-notification-system)
15. [Optimistic UI](#15-optimistic-ui)
16. [Feedback Accessibility](#16-feedback-accessibility)
17. [Feedback Tokens Summary](#17-feedback-tokens-summary)

---

## 1. Feedback Philosophy

### 1.1 Core Principles

1. **Immediate** — acknowledge every user action instantly (< 100ms).
2. **Proportional** — feedback weight matches action importance.
3. **Clear** — tell the user what happened, what to do next.
4. **Recoverable** — always offer a path forward (retry, undo, help).
5. **Non-blocking** — prefer inline/passive feedback over blocking modals.
6. **Consistent** — same status colors, icons, and patterns everywhere.

### 1.2 Response Time Rules

| Delay | Feedback Required |
|-------|-------------------|
| < 100ms | None — feels instant |
| 100ms – 1s | Subtle indicator (button state change, spinner) |
| 1s – 5s | Loading spinner with label |
| 5s – 10s | Progress bar or skeleton screen |
| > 10s | Progress bar with percentage + cancel option |
| > 30s | Background processing notification |

---

## 2. Feedback Taxonomy

### 2.1 By Urgency

| Level | Pattern | Interruption |
|-------|---------|-------------|
| Passive | Status badge, color change | None |
| Inline | Alert box, validation message | Minimal |
| Toast | Floating notification | Low |
| Banner | Full-width persistent strip | Medium |
| Dialog | Modal confirmation | High |
| Page | Full error/empty page | Blocking |

### 2.2 By Semantic

| Semantic | Color | Icon | Use Case |
|----------|-------|------|----------|
| **Success** | Green | ✓ Checkmark | Action completed |
| **Error** | Red | ✕ Circle-X | Action failed |
| **Warning** | Amber | ⚠ Triangle | Potential issue |
| **Info** | Blue | ℹ Circle-i | Neutral information |
| **Neutral** | Gray | — | Generic message |

---

## 3. Inline Alerts

### 3.1 Anatomy

```
┌──────────────────────────────────────────────────┐
│ [Icon]  Alert Title (optional)              [✕]  │
│         Description text that explains the        │
│         situation and next steps.                  │
│         [Action Link] [Secondary Link]            │
└──────────────────────────────────────────────────┘
```

### 3.2 Variants

| Variant | Background | Border | Icon |
|---------|-----------|--------|------|
| Success | Green-50 | Green-200 or left-4px | ✓ |
| Error | Red-50 | Red-200 or left-4px | ✕ |
| Warning | Amber-50 | Amber-200 or left-4px | ⚠ |
| Info | Blue-50 | Blue-200 or left-4px | ℹ |
| Neutral | Gray-50 | Gray-200 or left-4px | — |

### 3.3 Border Styles

| Style | Description |
|-------|-------------|
| Full border | Bordered on all four sides |
| Left accent | Thick left border (4px) only |
| Top accent | Thick top border (4px) only |
| Subtle | Background only, no border |

### 3.4 Rules

1. Placed inline with content (not floating).
2. Dismissible (✕) for non-critical alerts.
3. Persistent for critical information.
4. Can include action links.
5. `role="alert"` for urgent messages, `role="status"` for info.
6. Don't stack more than 2 inline alerts.

---

## 4. Banners

### 4.1 Anatomy

```
┌──────────────────────────────────────────────────────────┐
│ ⚠  Your trial expires in 3 days. [Upgrade now]     [✕] │
└──────────────────────────────────────────────────────────┘
```

### 4.2 Types

| Type | Position | Persistence |
|------|----------|-------------|
| Page banner | Top of page, below nav | Until dismissed or resolved |
| App banner | Very top, above everything | Persistent system alert |
| Cookie banner | Bottom of page | Until consent |
| Promo banner | Top of marketing pages | Dismissible |

### 4.3 Rules

1. Full-width, single line (or two lines maximum).
2. Consistent position — don't jump around.
3. Don't stack multiple banners (prioritize the most important).
4. Include clear action link/button.
5. Dismissible (except legally required, like cookie consent).
6. Compact: 40–48px height.

---

## 5. Toast Notifications

### 5.1 Detailed Anatomy

```
┌──────────────────────────────────────────────┐
│ [Icon]  Title                          [✕]   │
│         Description body text                │
│         [Primary Action]  [Dismiss]          │
│                                              │
│ ════════════════════════────────────── 5s     │ ← Progress bar (countdown)
└──────────────────────────────────────────────┘
```

### 5.2 Positioning

| Position | Use Case |
|----------|----------|
| Top-right | Default for desktop (out of the way) |
| Top-center | High-visibility alerts |
| Bottom-right | Alternative desktop position |
| Bottom-center | Mobile default |
| Top-left | RTL layouts |

### 5.3 Stacking

- New toasts appear on top (or bottom, depending on direction).
- Stack with 8–12px gap between.
- Maximum visible: 3–5 (queue extras).
- Oldest auto-dismiss first.
- Optional expand: show "2 more" → click to expand stack.

### 5.4 Auto-Dismiss Duration

| Semantic | Duration |
|----------|----------|
| Success | 3–5 seconds |
| Info | 4–6 seconds |
| Warning | 6–8 seconds |
| Error | No auto-dismiss (or 8–10 seconds) |

### 5.5 Rules

1. Never cover critical UI elements.
2. Pause timer on hover.
3. Always include close button.
4. Announce to screen readers via live region.
5. Swipe to dismiss on mobile.
6. Don't use for critical information only — user may miss it.
7. Provide a notification history/log for review.

---

## 6. Progress Indicators

### 6.1 Determinate Progress Bar

```
Uploading file...  65%
[████████████████████░░░░░░░░░] 65%
```

### 6.2 Indeterminate Progress Bar

```
Loading...
[█████     █████     █████     ]  ← sliding animation
```

### 6.3 Progress Ring / Circle

```
    ╭───╮
   ╱ 65% ╲
  │       │
   ╲     ╱
    ╰───╯
```

### 6.4 Progress Bar Variants

| Variant | Use Case |
|---------|----------|
| Linear (horizontal bar) | File upload, form steps |
| Circular (ring) | Compact progress in cards/buttons |
| Semi-circular (gauge) | Dashboard metrics |
| Steps (segmented bar) | Multi-step process |
| Stacked (multiple segments) | Multi-file upload |

### 6.5 Progress Bar Sizes

| Size | Height |
|------|--------|
| Thin | 2–4px |
| Default | 6–8px |
| Thick | 12–16px |

### 6.6 Progress Colors

| State | Color |
|-------|-------|
| In progress | Brand/accent |
| Success/Complete | Green |
| Error | Red |
| Warning | Amber |
| Paused | Gray |

### 6.7 Rules

1. Always show percentage or "X of Y" for determinate.
2. Add labels: "Uploading 3 of 7 files..."
3. Provide cancel option for long operations.
4. Stripe animation for "active but no percentage" states.
5. `role="progressbar"`, `aria-valuenow`, `aria-valuemin`, `aria-valuemax`.

---

## 7. Loading States

### 7.1 Spinner

```
  ◠ ← rotating arc
```

### 7.2 Spinner Sizes

| Size | Diameter | Use Case |
|------|----------|----------|
| Small | 16px | Inline, button loading |
| Default | 24px | Card/section loading |
| Large | 40–48px | Full page loading |

### 7.3 Button Loading State

```
Before:  [Submit]
Loading: [◠ Submitting...]
```

- Replace label text or append spinner.
- Disable button during loading.
- Maintain button width (don't shift layout).

### 7.4 Full Page Loading

```
┌────────────────────────────┐
│                            │
│          ◠                 │
│     Loading...             │
│                            │
└────────────────────────────┘
```

### 7.5 Content Loading

```
┌────────────────────────────┐
│  [Loaded Header]           │
│  ──────────────────        │
│  ◠ Loading content...      │
│                            │
└────────────────────────────┘
```

---

## 8. Skeleton Screens

### 8.1 Purpose

Placeholder shapes that mimic the layout of content while it loads — reduces perceived wait time.

### 8.2 Patterns

```
Card Skeleton:
┌──────────────────────────┐
│ ░░░░░░░░░░░░░░░░░░░░░░  │  ← Image placeholder
│                          │
│ ░░░░░░░░░░░░░            │  ← Title
│ ░░░░░░░░░░░░░░░░░░       │  ← Description line 1
│ ░░░░░░░░░░░              │  ← Description line 2
└──────────────────────────┘

List Skeleton:
│ ○  ░░░░░░░░░░ ░░░░       │
│ ○  ░░░░░░░░░  ░░░░░      │
│ ○  ░░░░░░░░░░░ ░░░       │
```

### 8.3 Skeleton Rules

1. Match the layout of actual content exactly.
2. Use neutral gray tones (gray-100 to gray-200).
3. Add shimmer/pulse animation (left-to-right gradient sweep).
4. Don't skeleton navigation or static UI — only dynamic content.
5. Show skeleton immediately (no spinner → skeleton transition).
6. Transition smoothly from skeleton to real content (fade).

### 8.4 Shimmer Animation

```css
@keyframes shimmer {
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
}

.skeleton {
  background: linear-gradient(
    90deg,
    var(--skeleton-base) 0%,
    var(--skeleton-highlight) 50%,
    var(--skeleton-base) 100%
  );
  background-size: 200% 100%;
  animation: shimmer 1.5s ease-in-out infinite;
}
```

---

## 9. Empty States

### 9.1 Anatomy

```
┌──────────────────────────────┐
│                              │
│        [Illustration]        │
│                              │
│       No projects yet        │  ← Heading
│   Create your first project  │  ← Description
│   to get started.            │
│                              │
│      [Create Project]        │  ← Primary action
│   or [Import from GitHub]    │  ← Secondary action
│                              │
└──────────────────────────────┘
```

### 9.2 Empty State Types

| Type | When | Tone |
|------|------|------|
| **First use** | Feature never used | Encouraging, educational |
| **No results** | Search/filter returned nothing | Helpful, suggest alternatives |
| **Completed** | All items handled | Celebratory |
| **Error** | Data failed to load | Apologetic, actionable |
| **Permission** | User lacks access | Informative, direct to admin |

### 9.3 Rules

1. Always include an actionable next step.
2. Illustration is optional but recommended (especially first-use).
3. Title: what happened. Description: what to do next.
4. Don't blame the user.
5. For filtered empty: offer "Clear filters" action.
6. For errors: offer "Try again" action.

---

## 10. Error Pages

### 10.1 Common Error Pages

| Code | Title | Description |
|------|-------|-------------|
| 400 | Bad Request | The request couldn't be understood |
| 401 | Unauthorized | Please sign in to continue |
| 403 | Forbidden | You don't have permission |
| 404 | Page Not Found | This page doesn't exist |
| 500 | Server Error | Something went wrong on our end |
| 503 | Service Unavailable | We're temporarily down |

### 10.2 Error Page Anatomy

```
┌────────────────────────────────────┐
│                                    │
│          [Illustration]            │
│                                    │
│       404 — Page Not Found         │
│                                    │
│  The page you're looking for       │
│  doesn't exist or has been moved.  │
│                                    │
│  [Go Home]  [Go Back]             │
│                                    │
│  Or try:  Help  Contact  Status   │
│                                    │
└────────────────────────────────────┘
```

### 10.3 Rules

1. Maintain branding and navigation (user isn't lost).
2. Clear, human language — avoid jargon.
3. Multiple escape routes (home, back, search).
4. For 500: mention "we're looking into it" if monitoring is active.
5. For 503: estimated recovery time if known.
6. Custom illustrations recommended over generic icons.

---

## 11. Validation Feedback

### 11.1 Timing

| Strategy | When | Best For |
|----------|------|----------|
| On submit | After form submission | Simple forms |
| On blur | When leaving a field | Most forms |
| On change (debounced) | While typing (300ms delay) | Availability checks |
| Real-time | Every keystroke | Password strength |
| Hybrid | On blur first, on change after error | Best UX |

### 11.2 Visual Treatment

```
Error:
┌─ Username ─────────────────────────┐
│ john!smith                         │ ← Red border
└────────────────────────────────────┘
⚠ Username can only contain letters, numbers, and underscores.

Success:
┌─ Email ────────────────────────────┐
│ john@example.com                   │ ← Green border
└────────────────────────────────────┘
✓ Email is available.
```

### 11.3 Error Summary

For complex forms, show a summary at the top:

```
┌──────────────────────────────────────────────┐
│ ⚠ Please fix 3 errors:                       │
│   • Username contains invalid characters      │
│   • Email is required                          │
│   • Password must be at least 8 characters     │
└──────────────────────────────────────────────┘
```

- Each error is a link that focuses the corresponding field.
- `role="alert"` on the summary.

### 11.4 Rules

1. Error messages are specific: "Password must be at least 8 characters" not "Invalid password."
2. Position: below the field, left-aligned.
3. Use `aria-describedby` to link field to error message.
4. Use `aria-invalid="true"` on erroneous fields.
5. Don't clear the field on error — let the user fix it.
6. Show success validation sparingly (passwords, username availability).

---

## 12. Confirmation Patterns

### 12.1 Levels

| Risk | Pattern |
|------|---------|
| None | No confirmation needed (save) |
| Low | Toast with undo ("Email sent. [Undo]") |
| Medium | Inline confirmation ("Are you sure?") |
| High | Modal dialog with consequences described |
| Critical | Modal + type confirmation ("Type DELETE to confirm") |

### 12.2 Undo Pattern

More useful than "Are you sure?" for most actions:

```
[✓ Message archived. [Undo — 5s]]
```

- Show toast with undo action.
- Countdown timer (5–10 seconds).
- After timeout, action finalizes.
- No interruption for the user.

### 12.3 Type-to-Confirm

For irreversible, high-impact actions:

```
┌────────────────────────────────────────┐
│  Delete Repository                      │
│                                         │
│  This will permanently delete           │
│  "my-project" and all its data.         │
│                                         │
│  Type "my-project" to confirm:          │
│  ┌────────────────────────┐             │
│  │                        │             │
│  └────────────────────────┘             │
│                                         │
│           [Cancel]  [Delete]            │
│                                grayed   │
│                                until    │
│                                typed    │
└────────────────────────────────────────┘
```

---

## 13. Status Indicators

### 13.1 Dot Status

```
● Active    ● Online     ● Live
● Error     ● Away       ● Failing
● Warning   ● Busy       ● Degraded
○ Inactive  ○ Offline    ○ Stopped
◐ Pending   ◐ Updating   ◐ Deploying
```

### 13.2 Badge Status

```
[Active]  [Pending]  [Failed]  [Draft]
```

### 13.3 Connection Status

```
Online:  ● Connected — last synced 2 minutes ago
Offline: ○ Offline — changes saved locally
Syncing: ◐ Syncing...
Error:   ● Connection lost — [Retry]
```

### 13.4 Build / Deploy Status

```
✓ Build passed    (green)
✕ Build failed    (red)
◠ Building...     (blue + spinner)
⊘ Build cancelled (gray)
◐ Pending review  (amber)
```

---

## 14. Notification System

### 14.1 Channel Hierarchy

| Channel | Urgency | Interruption | Example |
|---------|---------|-------------|---------|
| In-app badge | Low | None | Unread count on bell icon |
| In-app toast | Medium | Low | "New comment on your post" |
| In-app banner | High | Medium | "Subscription expired" |
| Browser push | High | Medium | "New message from team" |
| Email | Variable | None (async) | "Weekly summary" |
| SMS | Critical | High | "Security alert" |

### 14.2 Notification Item Anatomy

```
┌──────────────────────────────────────────┐
│ [Avatar]  Title of notification          │
│           Description of what happened   │
│           2 hours ago  •  [Mark as read] │
└──────────────────────────────────────────┘
```

### 14.3 Rules

1. Group related notifications.
2. Provide "Mark all as read."
3. Allow per-type notification preferences.
4. Unread indicator (dot or bold).
5. Timestamp: relative ("2 min ago") then absolute ("Jan 15, 3:42 PM").
6. Click notification to navigate to source.
7. Provide notification history page.

---

## 15. Optimistic UI

### 15.1 Concept

Update the UI immediately as if the action succeeded, then reconcile with the server response.

### 15.2 Flow

```
1. User clicks "Like" →
2. UI immediately shows liked state →
3. API request fires in background →
4. Success: do nothing (already correct)
5. Failure: revert UI + show error toast
```

### 15.3 Where to Use

| Pattern | Optimistic? | Rationale |
|---------|-------------|-----------|
| Like/favorite | Yes | Low risk, high frequency |
| Comment post | Yes | Speeds up feel |
| Form submit | No | Need server validation |
| Delete | No | Irreversible, needs confirmation |
| Payment | No | Critical, needs confirmation |
| Toggle settings | Maybe | Depends on criticality |

### 15.4 Failure Recovery

- Revert UI to previous state.
- Show toast: "Failed to save. [Retry]".
- Don't lose user data (keep draft locally).

---

## 16. Feedback Accessibility

### 16.1 ARIA Live Regions

```html
<!-- Polite (non-urgent): waits for current speech to finish -->
<div aria-live="polite" aria-atomic="true">
  Changes saved successfully.
</div>

<!-- Assertive (urgent): interrupts current speech -->
<div aria-live="assertive" role="alert">
  Error: Payment failed. Please try again.
</div>
```

### 16.2 Rules

| Feedback | ARIA | Description |
|----------|------|-------------|
| Success toast | `role="status"`, `aria-live="polite"` | Announce but don't interrupt |
| Error toast | `role="alert"`, `aria-live="assertive"` | Interrupt to announce error |
| Inline alert | `role="alert"` | Urgent inline messages |
| Progress | `role="progressbar"`, `aria-valuenow` | Current progress value |
| Loading spinner | `role="status"`, `aria-label="Loading"` | Announce loading state |
| Validation error | `aria-describedby`, `aria-invalid` | Link error to field |
| Empty state | None extra | Normal content rules |

### 16.3 Focus on Error

1. After form submission fails: focus the error summary or the first invalid field.
2. After inline validation: don't move focus (user is still typing).
3. After error alert appears: optionally move focus to the alert.

---

## 17. Feedback Tokens Summary

### Complete Token Inventory

```
SEMANTIC COLORS
  --ds-feedback-success-bg        green-50
  --ds-feedback-success-border    green-200
  --ds-feedback-success-text      green-700
  --ds-feedback-success-icon      green-500

  --ds-feedback-error-bg          red-50
  --ds-feedback-error-border      red-200
  --ds-feedback-error-text        red-700
  --ds-feedback-error-icon        red-500

  --ds-feedback-warning-bg        amber-50
  --ds-feedback-warning-border    amber-200
  --ds-feedback-warning-text      amber-700
  --ds-feedback-warning-icon      amber-500

  --ds-feedback-info-bg           blue-50
  --ds-feedback-info-border       blue-200
  --ds-feedback-info-text         blue-700
  --ds-feedback-info-icon         blue-500

  --ds-feedback-neutral-bg        gray-50
  --ds-feedback-neutral-border    gray-200
  --ds-feedback-neutral-text      gray-700

ALERT
  --ds-alert-radius               radius-md (8px)
  --ds-alert-padding              12-16px
  --ds-alert-border-width         1px (or 4px for accent)
  --ds-alert-icon-size            20px
  --ds-alert-gap                  12px

BANNER
  --ds-banner-height              40-48px
  --ds-banner-padding             8-12px
  --ds-banner-font-size           14px

TOAST
  --ds-toast-width                360-420px
  --ds-toast-radius               radius-md
  --ds-toast-shadow               elevation-lg
  --ds-toast-padding              12-16px
  --ds-toast-gap                  8-12px (stack gap)
  --ds-toast-duration-success     3000-5000ms
  --ds-toast-duration-error       0 (no auto-dismiss)
  --ds-toast-duration-info        4000-6000ms

PROGRESS
  --ds-progress-height-sm         2-4px
  --ds-progress-height-md         6-8px
  --ds-progress-height-lg         12-16px
  --ds-progress-radius            9999px (pill)
  --ds-progress-bg                gray-200 (track)
  --ds-progress-fill              accent (bar)

SPINNER
  --ds-spinner-size-sm            16px
  --ds-spinner-size-md            24px
  --ds-spinner-size-lg            40-48px
  --ds-spinner-width              2-3px (stroke)
  --ds-spinner-speed              600-800ms
  --ds-spinner-color              accent

SKELETON
  --ds-skeleton-base              gray-100
  --ds-skeleton-highlight         gray-200
  --ds-skeleton-radius            radius-sm
  --ds-skeleton-animation         shimmer 1.5s ease infinite

STATUS DOT
  --ds-status-dot-size            8-10px
  --ds-status-dot-ring            2px white border
  --ds-status-online              green-500
  --ds-status-offline             gray-400
  --ds-status-busy                red-500
  --ds-status-away                amber-400
```

---

*This chapter defines the complete feedback vocabulary for a Design System. Every alert style, toast behavior, loading pattern, empty state, error page, and notification channel above should be present in the implemented DS.*
