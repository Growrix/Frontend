# 09 — Accessibility (a11y)

> Everything a Design System must define for accessibility — WCAG compliance levels, semantic HTML, ARIA patterns, keyboard navigation, screen reader support, color contrast, focus management, motion sensitivity, and testing strategy.

---

## Table of Contents

1. [Accessibility Philosophy](#1-accessibility-philosophy)
2. [WCAG Compliance Levels](#2-wcag-compliance-levels)
3. [Semantic HTML](#3-semantic-html)
4. [ARIA Roles & Attributes](#4-aria-roles--attributes)
5. [Keyboard Navigation](#5-keyboard-navigation)
6. [Focus Management](#6-focus-management)
7. [Screen Reader Support](#7-screen-reader-support)
8. [Color & Contrast](#8-color--contrast)
9. [Typography & Readability](#9-typography--readability)
10. [Motion & Vestibular Sensitivity](#10-motion--vestibular-sensitivity)
11. [Forms & Validation](#11-forms--validation)
12. [Images & Media](#12-images--media)
13. [Interactive Component Patterns](#13-interactive-component-patterns)
14. [Touch Accessibility](#14-touch-accessibility)
15. [Internationalization & RTL](#15-internationalization--rtl)
16. [High Contrast & Forced Colors](#16-high-contrast--forced-colors)
17. [Testing Strategy](#17-testing-strategy)
18. [Accessibility Checklist](#18-accessibility-checklist)

---

## 1. Accessibility Philosophy

### 1.1 Why Accessibility is Required

- **Legal obligation**: ADA (US), EAA (EU), AODA (Canada), DDA (UK/AU) require digital accessibility.
- **Massive user base**: 15–20% of the global population has a disability.
- **Better for everyone**: Accessibility improvements help all users (captions, keyboard shortcuts, clear typography).
- **SEO benefit**: Semantic HTML improves search engine understanding.
- **DS responsibility**: When the DS is accessible, every product built with it inherits that accessibility.

### 1.2 Core Principles (POUR)

| Principle | Meaning |
|-----------|---------|
| **Perceivable** | Content can be perceived by all senses (see, hear, feel) |
| **Operable** | UI can be operated by all input methods (mouse, keyboard, voice, switch) |
| **Understandable** | Content and operation are understandable |
| **Robust** | Works with current and future assistive technologies |

---

## 2. WCAG Compliance Levels

### 2.1 Levels

| Level | Description | DS Target |
|-------|-------------|-----------|
| **A** | Minimum — removes the worst barriers | Mandatory |
| **AA** | Standard — removes significant barriers | **DS minimum target** |
| **AAA** | Enhanced — removes additional barriers | Best effort where possible |

### 2.2 Key WCAG 2.2 Success Criteria for DS

| Criteria | Level | What It Requires |
|----------|-------|-----------------|
| 1.1.1 Non-text Content | A | Alt text for all images |
| 1.3.1 Info and Relationships | A | Semantic structure (headings, lists, tables) |
| 1.4.1 Use of Color | A | Color is not the only visual means of conveying info |
| 1.4.3 Contrast (Minimum) | AA | 4.5:1 text, 3:1 large text |
| 1.4.11 Non-text Contrast | AA | 3:1 for UI components and graphics |
| 2.1.1 Keyboard | A | All functionality available via keyboard |
| 2.1.2 No Keyboard Trap | A | User can navigate away from any component |
| 2.4.3 Focus Order | A | Logical focus order |
| 2.4.7 Focus Visible | AA | Visible focus indicator |
| 2.4.11 Focus Not Obscured | AA | Focused element not hidden by other content |
| 2.5.5 Target Size | AAA | 44×44px minimum target |
| 2.5.8 Target Size (Minimum) | AA | 24×24px minimum target |
| 3.2.1 On Focus | A | No unexpected context change on focus |
| 3.3.1 Error Identification | A | Errors described in text |
| 3.3.2 Labels or Instructions | A | Input fields have labels |
| 4.1.2 Name, Role, Value | A | All components have accessible name and role |

---

## 3. Semantic HTML

### 3.1 Why Semantic HTML First

Semantic HTML provides accessibility **for free**:
- `<button>` is keyboard-focusable, activates with Enter/Space, announced as "button".
- `<a href>` is keyboard-focusable, activates with Enter, announced as "link".
- `<input>` gets focus management, form submission, validation.
- `<nav>`, `<main>`, `<header>`, `<footer>` create landmark regions.

### 3.2 Element Selection Rules

| Need | Use | NOT |
|------|-----|-----|
| Click action | `<button>` | `<div onclick>` |
| Navigation | `<a href="...">` | `<span onclick>`, `<button>` for navigation |
| Text input | `<input>` / `<textarea>` | `<div contenteditable>` |
| Selection | `<select>` / `<input type="radio/checkbox">` | `<div role="listbox">` unless custom |
| Heading | `<h1>–<h6>` | `<div class="heading">` |
| List | `<ul>/<ol>/<dl>` | `<div>` with line breaks |
| Table data | `<table>` | `<div>` grid |
| Page structure | `<main>`, `<nav>`, `<aside>`, `<header>`, `<footer>` | `<div class="main">` |

### 3.3 Landmark Regions

| Element | Role | Purpose |
|---------|------|---------|
| `<header>` | banner | Site header |
| `<nav>` | navigation | Navigation block |
| `<main>` | main | Primary content |
| `<aside>` | complementary | Sidebar/related content |
| `<footer>` | contentinfo | Site footer |
| `<form>` | form | Input form |
| `<section>` with label | region | Named section |

---

## 4. ARIA Roles & Attributes

### 4.1 First Rule of ARIA

> **Don't use ARIA if you can use native HTML.** ARIA is a patch for custom widgets that can't use native elements.

### 4.2 Common ARIA Roles

| Role | Purpose | HTML Equivalent |
|------|---------|----------------|
| `role="button"` | Custom clickable | `<button>` |
| `role="link"` | Custom link | `<a href>` |
| `role="dialog"` | Modal dialog | `<dialog>` |
| `role="alertdialog"` | Alert dialog | — |
| `role="tab"` / `role="tablist"` / `role="tabpanel"` | Tab interface | — |
| `role="menu"` / `role="menuitem"` | Menu | — |
| `role="listbox"` / `role="option"` | Custom select | `<select>` |
| `role="tree"` / `role="treeitem"` | Tree view | — |
| `role="slider"` | Range input | `<input type="range">` |
| `role="tooltip"` | Tooltip | — |
| `role="alert"` | Live alert | — |
| `role="status"` | Status message | — |
| `role="progressbar"` | Progress indicator | `<progress>` |
| `role="img"` | Image with meaning | `<img>` |
| `role="none"` / `role="presentation"` | Remove semantics | — |

### 4.3 Essential ARIA Attributes

| Attribute | Purpose | Example |
|-----------|---------|---------|
| `aria-label` | Accessible name (no visible label) | `<button aria-label="Close">` |
| `aria-labelledby` | Name via another element's ID | `<div aria-labelledby="heading-id">` |
| `aria-describedby` | Additional description | `<input aria-describedby="hint-id">` |
| `aria-expanded` | Expanded/collapsed state | `<button aria-expanded="true">` |
| `aria-selected` | Selected state | `<li aria-selected="true">` |
| `aria-checked` | Checked state | `<div role="checkbox" aria-checked="true">` |
| `aria-disabled` | Disabled state | `<button aria-disabled="true">` |
| `aria-hidden` | Hide from assistive tech | `<span aria-hidden="true">` |
| `aria-live` | Live region (announces changes) | `<div aria-live="polite">` |
| `aria-current` | Current item in a set | `<a aria-current="page">` |
| `aria-controls` | Element controlled by this | `<button aria-controls="panel-id">` |
| `aria-haspopup` | Has popup | `<button aria-haspopup="dialog">` |
| `aria-required` | Required field | `<input aria-required="true">` |
| `aria-invalid` | Invalid input | `<input aria-invalid="true">` |
| `aria-errormessage` | Error message element | `<input aria-errormessage="error-id">` |

---

## 5. Keyboard Navigation

### 5.1 Required Keyboard Support

Every interactive element must be:
1. **Focusable** (via Tab or programmatic focus).
2. **Activatable** (Enter and/or Space).
3. **Escapable** (Escape closes overlays, menus, dialogs).
4. **Arrow-navigable** (within composite widgets: tabs, menus, radio groups).

### 5.2 Tab Order

- Follow DOM order (logical reading order).
- Use `tabindex="0"` to make custom elements focusable.
- Use `tabindex="-1"` for programmatically focusable but not in tab order.
- **Never use `tabindex` > 0** — it breaks natural order.

### 5.3 Component Keyboard Patterns

| Component | Keys |
|-----------|------|
| **Button** | Enter, Space → activate |
| **Link** | Enter → navigate |
| **Checkbox** | Space → toggle |
| **Radio group** | Arrow keys → move selection |
| **Tabs** | Arrow keys → switch tab (roving tabindex) |
| **Menu** | Arrow keys → navigate, Enter → select, Escape → close |
| **Dialog** | Tab → cycle focus within, Escape → close |
| **Dropdown** | Arrow keys → navigate, Enter → select, Escape → close |
| **Accordion** | Enter/Space → expand/collapse |
| **Slider** | Arrow keys → adjust value, Home/End → min/max |
| **Tree** | Arrow keys → navigate, Enter → expand/collapse or activate |
| **Combobox** | Arrow keys → navigate suggestions, Enter → select, Escape → close list |

### 5.4 Roving Tabindex

For composite widgets (tabs, toolbars, radio groups), only ONE item in the group is in the tab order. Arrow keys move focus within the group:

```
Tab → [First tab (tabindex=0)] → Tab → [Next widget]
                ↕ Arrow keys
       [Second tab (tabindex=-1)]
                ↕ Arrow keys
       [Third tab (tabindex=-1)]
```

---

## 6. Focus Management

### 6.1 Focus Indicators

Every focusable element must have a visible focus indicator:

```css
:focus-visible {
  outline: 2px solid var(--ds-color-accent);
  outline-offset: 2px;
}

/* Remove default outline and only show on keyboard focus */
:focus:not(:focus-visible) {
  outline: none;
}
```

### 6.2 Focus Ring Requirements

- **Minimum 2px** outline or box-shadow.
- **Contrast ratio**: 3:1 against adjacent colors (WCAG 2.4.11).
- **Not obscured**: Focus ring must not be hidden behind other elements (sticky headers, footers).
- **Consistent**: Same style across all components.

### 6.3 Focus Trapping

Modals and dialogs must trap focus — Tab cycles only within the dialog:

```
[Dialog opens]
  → Focus moves to first focusable element inside
  → Tab cycles only within dialog content
  → Shift+Tab wraps to last focusable element
  → Escape closes dialog
[Dialog closes]
  → Focus returns to the element that triggered the dialog
```

### 6.4 Focus Restoration

When a dialog, menu, or popover closes:
- Return focus to the **trigger element**.
- If trigger no longer exists (deleted item), move to next logical element.

### 6.5 Skip Links

First focusable element on the page:

```html
<a href="#main-content" class="skip-link">Skip to main content</a>
```

```css
.skip-link {
  position: absolute;
  top: -100%;
  left: 0;
}
.skip-link:focus {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9999;
  /* visible styles */
}
```

---

## 7. Screen Reader Support

### 7.1 Visually Hidden Pattern

Content that should be read by screen readers but not visible:

```css
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}
```

### 7.2 Live Regions

For content that updates dynamically (without page reload):

| Attribute | Behavior |
|-----------|---------|
| `aria-live="polite"` | Announce when user is idle (queued) |
| `aria-live="assertive"` | Announce immediately (interrupts) |
| `role="alert"` | Equivalent to `aria-live="assertive"` |
| `role="status"` | Equivalent to `aria-live="polite"` |

Use cases:
- Form validation messages → `aria-live="polite"`
- Toast notifications → `role="alert"` or `aria-live="polite"`
- Loading states → `role="status"` with "Loading..." text
- Error alerts → `role="alert"`

### 7.3 Announcements

For screen-reader-only announcements triggered by JS:

```html
<div aria-live="polite" class="sr-only" id="announcer"></div>
```

Inject text via JS when actions complete: "Item deleted", "3 results found", etc.

### 7.4 What Not to Hide

Never use `aria-hidden="true"` on:
- Focusable elements (creates a focus trap for screen readers).
- Content that provides important information.
- The only interactive way to complete an action.

---

## 8. Color & Contrast

### 8.1 Minimum Contrast Ratios

| Element | WCAG AA | WCAG AAA |
|---------|---------|----------|
| Normal text (<18px or <14px bold) | 4.5:1 | 7:1 |
| Large text (≥18px or ≥14px bold) | 3:1 | 4.5:1 |
| UI components (borders, icons) | 3:1 | — |
| Non-text graphics | 3:1 | — |
| Focus indicators | 3:1 (against adjacent) | — |

### 8.2 APCA (Advanced Perceptual Contrast Algorithm)

The next-generation contrast model, designed for WCAG 3.0:

| APCA Lc Value | Use Case |
|---------------|----------|
| Lc 15 | Non-text elements minimum |
| Lc 30 | Large text minimum (36px+) |
| Lc 45 | Large text (24px+) |
| Lc 60 | Body text (18px+) |
| Lc 75 | Body text (14–16px) |
| Lc 90 | Small text, maximum readability |

### 8.3 Color Independence

Color must never be the **sole** indicator of information:

| Bad | Good |
|-----|------|
| Red text for errors (only) | Red text + error icon + "Error:" prefix |
| Green dot for online status | Green dot + "Online" label |
| Color-coded chart only | Colors + patterns/shapes + legend |

---

## 9. Typography & Readability

### 9.1 Minimum Text Sizes

| Content | Minimum Size |
|---------|-------------|
| Body text | 16px |
| Small text / captions | 12px (use sparingly) |
| Interactive labels | 14px |
| Never below | 10px for any text |

### 9.2 Line Length

Optimal reading: **45–75 characters per line** (ch unit):

```css
.prose { max-width: 65ch; }
```

### 9.3 Line Height

| Text Size | Minimum Line Height |
|-----------|-------------------|
| Body (16px) | 1.5 (24px) |
| Large text (24px+) | 1.2–1.4 |
| UI text (labels, buttons) | 1.2–1.4 |

### 9.4 Text Spacing Override

Users must be able to increase text spacing without loss of content (WCAG 1.4.12):
- Line height to at least 1.5× font size
- Letter spacing to at least 0.12× font size
- Word spacing to at least 0.16× font size
- Paragraph spacing to at least 2× font size

---

## 10. Motion & Vestibular Sensitivity

### 10.1 `prefers-reduced-motion`

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

### 10.2 What to Handle

| Reduce | Keep |
|--------|------|
| Parallax effects | Opacity fades (instant) |
| Auto-scrolling carousels | State changes |
| Bouncing/shaking animations | Loading spinners |
| Staggered entrances | Focus transitions |
| Zoom/scale animations | Color transitions |
| Scroll-driven animations | — |

### 10.3 Auto-Playing Media

- No auto-playing video or audio.
- Carousels must have pause/stop control.
- GIFs that auto-play should have a still alternative.
- Any animation > 5 seconds must be pausable.

---

## 11. Forms & Validation

### 11.1 Labels

Every input MUST have a visible label:

```html
<label for="email">Email address</label>
<input id="email" type="email" />
```

Floating labels are acceptable **only if** the label remains visible when the field has a value.

### 11.2 Error Messages

```html
<label for="email">Email</label>
<input id="email" type="email" aria-invalid="true" aria-describedby="email-error" />
<p id="email-error" role="alert">Please enter a valid email address.</p>
```

Requirements:
- Error message associated via `aria-describedby`.
- Error must be in text (not just red border).
- Error should appear near the field, not just at the top of the form.
- Use `aria-invalid="true"` on the field.

### 11.3 Required Fields

- Mark with `aria-required="true"` or native `required`.
- Indicate visually (asterisk, "required" text).
- If most fields are required, indicate optional fields instead: "(Optional)".

### 11.4 Autocomplete

Use `autocomplete` attribute for common fields:

```html
<input autocomplete="given-name" />
<input autocomplete="email" />
<input autocomplete="tel" />
<input autocomplete="street-address" />
```

This helps autofill, password managers, and assistive tech.

### 11.5 Fieldsets & Legends

Group related inputs with `<fieldset>` and `<legend>`:

```html
<fieldset>
  <legend>Shipping Address</legend>
  <label for="street">Street</label>
  <input id="street" />
  <!-- more fields -->
</fieldset>
```

---

## 12. Images & Media

### 12.1 Alt Text Rules

| Image Type | Alt Text |
|-----------|---------|
| **Informational** | Describe the content: `alt="Solar panel installation on residential roof"` |
| **Decorative** | Empty alt: `alt=""` |
| **Functional** (button/link) | Describe the action: `alt="Search"` |
| **Complex** (chart/graph) | Short alt + `aria-describedby` linking to full description |
| **Text in image** | Alt contains the exact text |

### 12.2 SVG Accessibility

```html
<!-- Decorative SVG -->
<svg aria-hidden="true">...</svg>

<!-- Informational SVG -->
<svg role="img" aria-label="Bar chart showing Q1 revenue">...</svg>

<!-- Complex SVG -->
<svg role="img" aria-labelledby="chart-title chart-desc">
  <title id="chart-title">Q1 Revenue</title>
  <desc id="chart-desc">Bar chart showing revenue of $1.2M in January, $1.5M in February, $1.8M in March.</desc>
</svg>
```

### 12.3 Video & Audio

- Provide **captions** for all video (WCAG 1.2.2).
- Provide **audio description** for video with visual-only content (WCAG 1.2.5).
- Provide **transcripts** for audio content (WCAG 1.2.1).
- Player controls must be keyboard accessible.

---

## 13. Interactive Component Patterns

### 13.1 DS Components Must Include

Every interactive DS component must ship with:
1. **Correct ARIA role** (or use native HTML element).
2. **Keyboard support** (full pattern from WAI-ARIA Authoring Practices).
3. **Focus management** (focus visible, focus trap where needed).
4. **State communication** (expanded, selected, checked, disabled — via ARIA).
5. **Label support** (accept `aria-label` or `aria-labelledby` prop).

### 13.2 WAI-ARIA Authoring Practices Patterns

Reference the WAI-ARIA Authoring Practices Guide for implemented keyboard + ARIA patterns:

| Component | Pattern |
|-----------|---------|
| Accordion | `role="region"`, `aria-expanded`, heading buttons |
| Alert | `role="alert"`, `aria-live="assertive"` |
| Breadcrumb | `nav` + `aria-label="Breadcrumb"` + `aria-current` |
| Carousel | `role="group"`, `aria-roledescription="slide"`, controls |
| Combobox | `role="combobox"`, `aria-expanded`, `aria-activedescendant` |
| Dialog | `role="dialog"`, `aria-modal="true"`, focus trap |
| Disclosure | `<button aria-expanded>` + collapsible content |
| Menu | `role="menu"` + `role="menuitem"`, arrow key navigation |
| Switch | `role="switch"`, `aria-checked` |
| Tabs | `role="tablist"` + `role="tab"` + `role="tabpanel"`, roving tabindex |
| Tooltip | `role="tooltip"`, triggered by focus and hover |
| Tree | `role="tree"` + `role="treeitem"`, arrow keys |

---

## 14. Touch Accessibility

### 14.1 Touch Target Sizes

- Minimum: 24×24px (WCAG 2.5.8 AA).
- Recommended: 44×44px (WCAG 2.5.5 AAA).
- Spacing between targets: minimum 8px.

### 14.2 Gesture Alternatives

Every gesture (swipe, pinch, long-press) must have a single-pointer alternative:
- Swipe to delete → delete button.
- Pinch to zoom → zoom buttons.
- Long-press for context menu → visible menu button.
- Drag to reorder → up/down buttons.

---

## 15. Internationalization & RTL

### 15.1 Right-to-Left (RTL) Support

For Arabic, Hebrew, Farsi, Urdu:

```css
[dir="rtl"] {
  direction: rtl;
}
```

### 15.2 Logical Properties

Use logical properties instead of physical:

| Physical | Logical |
|----------|---------|
| `margin-left` | `margin-inline-start` |
| `margin-right` | `margin-inline-end` |
| `padding-left` | `padding-inline-start` |
| `text-align: left` | `text-align: start` |
| `float: left` | `float: inline-start` |
| `border-left` | `border-inline-start` |
| `left` / `right` | `inset-inline-start` / `inset-inline-end` |

### 15.3 RTL Considerations for DS

- Icons with direction (arrows, progress) must flip in RTL.
- Layout mirrors horizontally.
- Animations that slide from left should slide from right in RTL.
- Numbers, phone numbers, and embedded LTR text maintain LTR direction.

---

## 16. High Contrast & Forced Colors

### 16.1 Windows High Contrast Mode

```css
@media (forced-colors: active) {
  .button {
    border: 1px solid ButtonText;
  }
  
  .card {
    border: 1px solid CanvasText;
  }
  
  .focus-ring {
    outline: 2px solid Highlight;
  }
}
```

### 16.2 System Colors in Forced Colors

| System Color | Purpose |
|-------------|---------|
| `Canvas` | Background |
| `CanvasText` | Text on background |
| `LinkText` | Links |
| `Highlight` | Selected/focused background |
| `HighlightText` | Text on selected background |
| `ButtonFace` | Button background |
| `ButtonText` | Button text |
| `GrayText` | Disabled text |

### 16.3 Rules

- Shadows, gradients, and background images are stripped in forced-colors mode.
- Borders become critical for defining element boundaries.
- Use `forced-color-adjust: none` sparingly and only where needed (e.g., data visualization).

---

## 17. Testing Strategy

### 17.1 Automated Testing

| Tool | What It Catches |
|------|----------------|
| **axe-core / axe DevTools** | ~30–40% of WCAG issues (missing labels, contrast, ARIA misuse) |
| **Lighthouse** | Basic a11y audit (subset of axe) |
| **eslint-plugin-jsx-a11y** | Catches issues at code-write time (missing alt, invalid ARIA) |
| **Pa11y** | CI-integrated WCAG testing |
| **jest-axe** | Unit test a11y assertions |

### 17.2 Manual Testing Checklist

1. **Keyboard only**: Tab through entire page. Can you reach and operate everything?
2. **Screen reader**: Navigate with VoiceOver (Mac), NVDA (Windows), or TalkBack (Android).
3. **Zoom**: Zoom to 200% — does content reflow? Any horizontal scroll?
4. **Color**: View in grayscale — is all information still conveyed?
5. **Motion**: Enable `prefers-reduced-motion` — are animations disabled?
6. **High contrast**: Enable Windows High Contrast — are elements visible?
7. **Text spacing**: Override text spacing (WCAG 1.4.12 bookmarklet) — does content still work?

### 17.3 Screen Reader Testing Matrix

| OS | Screen Reader | Browser |
|----|--------------|---------|
| macOS | VoiceOver | Safari |
| Windows | NVDA | Chrome, Firefox |
| Windows | JAWS | Chrome |
| iOS | VoiceOver | Safari |
| Android | TalkBack | Chrome |

---

## 18. Accessibility Checklist

### Per-Component Checklist

```
□ Uses semantic HTML element (button, input, link, etc.)
□ Has accessible name (label, aria-label, or aria-labelledby)
□ Keyboard operable (focusable, activatable, escapable)
□ Focus indicator visible (2px+ outline, 3:1 contrast)
□ States communicated via ARIA (expanded, selected, checked, disabled)
□ Color is not the only indicator of state
□ Text contrast meets 4.5:1 (AA) for normal text
□ UI component contrast meets 3:1 (AA)
□ Touch target ≥ 44×44px on touch devices
□ Works with screen reader (tested with at least 1)
□ Respects prefers-reduced-motion
□ Works in forced-colors mode (borders replace shadows)
□ Logical properties used (RTL-ready)
□ Error states described in text (not just color)
□ Loading states announced to screen readers
```

---

*This chapter defines the complete accessibility vocabulary for a Design System. Every component shipped by the DS must meet these standards as a non-negotiable baseline.*
