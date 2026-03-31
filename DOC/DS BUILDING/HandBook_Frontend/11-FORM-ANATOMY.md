# 11 — Form Anatomy

> Everything a Design System must define for forms — field anatomy, input types, validation patterns, field layouts, multi-step forms, form composition, and accessibility. Forms are the most complex UI pattern and the #1 source of user friction.

---

## Table of Contents

1. [Form Philosophy](#1-form-philosophy)
2. [Field Anatomy](#2-field-anatomy)
3. [Input Types Catalog](#3-input-types-catalog)
4. [Label Patterns](#4-label-patterns)
5. [Placeholder & Hint Text](#5-placeholder--hint-text)
6. [Validation Patterns](#6-validation-patterns)
7. [Error Message Design](#7-error-message-design)
8. [Field Layout Patterns](#8-field-layout-patterns)
9. [Form Layout Patterns](#9-form-layout-patterns)
10. [Select & Dropdown](#10-select--dropdown)
11. [Combobox & Autocomplete](#11-combobox--autocomplete)
12. [Date & Time Inputs](#12-date--time-inputs)
13. [File Upload](#13-file-upload)
14. [Rich Input Types](#14-rich-input-types)
15. [Field Groups](#15-field-groups)
16. [Multi-Step Forms](#16-multi-step-forms)
17. [Form Actions](#17-form-actions)
18. [Form Accessibility](#18-form-accessibility)
19. [Form Tokens Summary](#19-form-tokens-summary)

---

## 1. Form Philosophy

### 1.1 Core Principles

1. **Ask only what you need** — every field is friction. Remove anything non-essential.
2. **One column** — single-column forms are faster and easier to scan.
3. **Visible labels** — always visible, never placeholder-only.
4. **Inline validation** — validate on blur, show errors near the field.
5. **Clear actions** — primary CTA distinct from secondary, positioned consistently.
6. **Forgiveness** — let users fix mistakes easily. Don't clear the form on error.
7. **Progress** — for long forms, show progress and allow saving drafts.

### 1.2 Field Interaction Flow

```
Empty → Focus → Typing → Blur → Validation → Error / Success
                                      ↓
                               Fix → Re-validate → Submit → Loading → Result
```

---

## 2. Field Anatomy

### 2.1 Standard Field Structure

```
┌──── Label ─────────────────────────────── Required * ──┐
│                                                         │
│  ┌─ Leading Icon ─┬── Input Text ─────┬─ Trailing ──┐  │
│  │     🔍         │ Placeholder...    │    ✕ / 👁   │  │
│  └────────────────┴───────────────────┴─────────────┘  │
│                                                         │
│  Helper text / Character count                          │
│  Error message (when invalid)                           │
└─────────────────────────────────────────────────────────┘
```

### 2.2 Anatomy Elements

| Element | Required | Purpose |
|---------|----------|---------|
| **Label** | Yes (always) | Identifies the field |
| **Input container** | Yes | Holds the input value and decorations |
| **Placeholder** | Optional | Example value (NOT a replacement for label) |
| **Leading icon** | Optional | Visual context (search, email, phone) |
| **Trailing icon/action** | Optional | Clear button, password toggle, validation icon |
| **Helper text** | Optional | Instructions, format hints, character count |
| **Error message** | Conditional | Shown when validation fails |
| **Required indicator** | Conditional | Asterisk (*) or "(required)" text |
| **Prefix / Suffix** | Optional | Currency symbol, unit (kg, %), domain |

### 2.3 Sizing Variants

| Size | Height | Font Size | Use Case |
|------|--------|-----------|----------|
| Small | 32px | 14px | Dense UI, tables, filters |
| Default | 40px | 16px | Standard forms |
| Large | 48px | 18px | Prominent forms, onboarding, mobile |

---

## 3. Input Types Catalog

### 3.1 Text Inputs

| Type | HTML | Purpose |
|------|------|---------|
| Text | `<input type="text">` | Single-line generic text |
| Email | `<input type="email">` | Email with @ validation |
| Password | `<input type="password">` | Masked text with toggle |
| URL | `<input type="url">` | URL input with protocol |
| Tel | `<input type="tel">` | Phone number (brings up numpad on mobile) |
| Search | `<input type="search">` | Search with clear button |
| Number | `<input type="number">` | Numeric with stepper (use carefully) |
| Textarea | `<textarea>` | Multi-line text |

### 3.2 Selection Inputs

| Type | HTML | Purpose |
|------|------|---------|
| Checkbox | `<input type="checkbox">` | Single boolean or multi-select |
| Radio | `<input type="radio">` | Single selection from group |
| Select | `<select>` | Dropdown selection (native or custom) |
| Switch / Toggle | Custom | On/off boolean |
| Combobox | Custom | Search + select |

### 3.3 Specialized Inputs

| Type | HTML | Purpose |
|------|------|---------|
| Date | `<input type="date">` / custom | Date picker |
| Time | `<input type="time">` / custom | Time selection |
| Datetime | `<input type="datetime-local">` / custom | Date + time |
| Range / Slider | `<input type="range">` / custom | Value within range |
| Color | `<input type="color">` / custom | Color selection |
| File | `<input type="file">` / custom | File upload |
| Hidden | `<input type="hidden">` | Non-visible data |

---

## 4. Label Patterns

### 4.1 Top-Aligned Labels (Recommended)

```
Label
┌──────────────────┐
│ Input value      │
└──────────────────┘
```

- **Best for**: Most forms, mobile, scanning.
- **Pros**: Fastest completion time, best for localization (labels can be any length).
- **Cons**: Takes more vertical space.

### 4.2 Left-Aligned Labels

```
Label          ┌──────────────────┐
               │ Input value      │
               └──────────────────┘
```

- **Best for**: Settings pages, admin forms with short labels.
- **Pros**: Compact vertical space.
- **Cons**: Requires fixed label width, harder on mobile, slow eye movement.

### 4.3 Floating Labels

```
┌──────────────────┐        ┌── Label ─────────┐
│ Label            │   →    │ Input value      │
└──────────────────┘        └──────────────────┘
```

- Label is inside the field, floats up on focus/fill.
- **Pros**: Compact, modern look.
- **Cons**: Less accessible, smaller label text, can confuse users.
- **Rule**: Only use if the label remains visible when field is filled.

### 4.4 Inline Labels (Rare)

```
┌── Label: ───── Input value ──┐
└──────────────────────────────┘
```

- For very compact forms only (search bars, filter strips).

---

## 5. Placeholder & Hint Text

### 5.1 Placeholder Rules

1. **Placeholder is NOT a label** — it disappears on focus/input, which removes the field's identity.
2. **Use for examples, not instructions**: `"e.g., john@example.com"` not `"Enter your email"`.
3. **Low contrast is intentional** — placeholders should look different from entered text.
4. **Don't put essential information in placeholders** — users can't see it while typing.

### 5.2 Helper Text

Persistent text below the field:

```
Email address
┌──────────────────┐
│ john@example.com │
└──────────────────┘
We'll never share your email with anyone.
```

- **Always visible** (doesn't disappear like placeholder).
- **Use for**: Format requirements, privacy notices, constraints.
- **Position**: Below the input, before the error message.

### 5.3 Character Count

```
Bio
┌──────────────────────────┐
│ I love building things...│
└──────────────────────────┘
                    42 / 160
```

Show when the field has a character limit. Highlight when approaching/exceeding limit.

---

## 6. Validation Patterns

### 6.1 Validation Timing

| Strategy | When Validated | Use Case |
|----------|---------------|----------|
| **On blur** | When user leaves field | **Recommended default** |
| **On submit** | When form is submitted | Simple forms, few fields |
| **On change** (after first blur) | After first validation, revalidate on each change | Best UX for fixing errors |
| **Real-time** | On every keystroke | Password strength, username availability |
| **Debounced** | After user stops typing (300–500ms) | Server-side validation (email exists) |

### 6.2 Validation Rules

1. **Don't validate while the user is still typing** for the first time.
2. **After first validation failure**, revalidate on every change (so users see instant correction).
3. **Show success confirmation** on previously-failed fields when corrected.
4. **Scroll to first error** when form submit fails.
5. **Summarize errors** at the top of the form AND show inline per field.
6. **Never clear the form** on validation failure.

### 6.3 Common Validations

| Type | Rule | Message Pattern |
|------|------|----------------|
| Required | Field not empty | "Email is required" |
| Email format | Valid email pattern | "Please enter a valid email address" |
| Min length | ≥ minimum chars | "Password must be at least 8 characters" |
| Max length | ≤ maximum chars | "Name must be 50 characters or fewer" |
| Pattern | Regex match | "Phone number must be in format: (555) 123-4567" |
| Match | Two fields match | "Passwords do not match" |
| Custom (async) | Server validation | "This email is already registered" |

---

## 7. Error Message Design

### 7.1 Anatomy

```
Email address *
┌──────────────────┐
│ invalid-email    │  ← Red border
└──────────────────┘
⚠️ Please enter a valid email address.  ← Red text + icon
```

### 7.2 Error Message Rules

1. **Be specific** — "Please enter a valid email address" not "Invalid input".
2. **Be helpful** — "Password must include at least one number" not "Password is invalid".
3. **Be polite** — "Please enter..." not "You must enter..." or "Error: ...".
4. **Position near the field** — directly below the input, replacing helper text.
5. **Use red/danger color** — text and border, plus error icon.
6. **Associate programmatically** — `aria-describedby` linking input to error message.
7. **Announce to screen readers** — `role="alert"` or `aria-live="polite"`.

### 7.3 Error Summary (Top of Form)

For form-level errors on submit:

```
┌─ ⚠️ Please fix 3 errors: ──────────────┐
│   • Email: Please enter a valid email    │
│   • Password: Must be 8+ characters      │
│   • Terms: You must accept the terms      │
└──────────────────────────────────────────┘
```

Each item should link to the corresponding field.

---

## 8. Field Layout Patterns

### 8.1 Standard Stack

Single column, full width:

```
[Label + Input]
[Label + Input]
[Label + Input]
```

### 8.2 Inline Fields

Two or more fields on one row (use for related short fields):

```
[First name    ] [Last name     ]
[City          ] [State] [Zip   ]
```

### 8.3 Responsive Fields

```css
.field-row {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--ds-space-4);
}

@media (min-width: 640px) {
  .field-row { grid-template-columns: 1fr 1fr; }
}
```

### 8.4 When to Use Inline

| Inline | Stacked |
|--------|---------|
| First + last name | Address fields (long) |
| City + state + zip | Email, password |
| Start + end date | Textarea |
| Amount + currency | File upload |

---

## 9. Form Layout Patterns

### 9.1 Simple Form (Card)

```
┌─────────────────────────────┐
│  Form Title                 │
│  Description                │
│                             │
│  [Field]                    │
│  [Field]                    │
│  [Field]                    │
│                             │
│  [Cancel]      [Submit ▶]   │
└─────────────────────────────┘
```

### 9.2 Settings Form (Sections)

```
Section 1 — Profile
  [Field] [Field]
  [Field]
  ─────────────
Section 2 — Notifications
  [Toggle] [Toggle]
  [Select]
  ─────────────
[Save Changes]
```

### 9.3 Wizard / Multi-Step

```
Step 1 of 4: Personal Info
━━━━━●━━━━━○━━━━━○━━━━━○

[Field]
[Field]

[Back]              [Next ▶]
```

### 9.4 Inline Editing

Click-to-edit pattern:

```
Name: John Smith [Edit ✏️]
       ↓ click
Name: [John Smith       ] [Save] [Cancel]
```

---

## 10. Select & Dropdown

### 10.1 Native vs Custom

| Feature | Native `<select>` | Custom Dropdown |
|---------|-------------------|----------------|
| Accessibility | Excellent (free) | Must implement ARIA |
| Mobile | Native picker (best UX) | Custom (can be worse) |
| Styling | Limited | Full control |
| Search/filter | No | Yes |
| Multi-select | Basic | Rich (chips, counts) |
| **Recommendation** | Use for ≤10 items, no search needed | Use for >10 items, search, or multi-select |

### 10.2 Custom Select Anatomy

```
┌── Label ──────────────────────────────┐
│  ┌───────────────────────────── ▾ ─┐  │
│  │ Selected option                 │  │
│  └─────────────────────────────────┘  │
│  ┌─────────── Dropdown ───────────┐   │
│  │ 🔍 Search...                   │   │
│  │─────────────────────────────── │   │
│  │ ○ Option 1                     │   │
│  │ ● Option 2 (selected)  ✓      │   │
│  │ ○ Option 3                     │   │
│  │ ○ Option 4 (disabled)         │   │
│  └────────────────────────────────┘   │
└───────────────────────────────────────┘
```

### 10.3 ARIA Requirements

- `role="combobox"` or `role="listbox"` depending on pattern.
- `aria-expanded` on trigger.
- `aria-activedescendant` for current option.
- Arrow keys to navigate, Enter to select, Escape to close.
- Type-ahead to jump to matching options.

---

## 11. Combobox & Autocomplete

### 11.1 When to Use

- Large dataset (countries, cities, users).
- User might type or browse.
- Fuzzy matching is valuable.

### 11.2 Anatomy

```
Label
┌───────────────────────┐
│ Aus[tral]             │  ← partial input
└───────────────────────┘
┌───────────────────────┐
│ 🇦🇺 Australia          │  ← highlighted match
│ 🇦🇹 Austria            │
│ 🇦🇺 Australian Capital │
└───────────────────────┘
```

### 11.3 Behavior

1. User types → list filters.
2. Arrow keys navigate suggestions.
3. Enter selects highlighted option.
4. Escape closes list, preserves input.
5. Click outside closes list.
6. Clear button resets field.
7. "No results" message when nothing matches.
8. Optional: create new item if not found.

---

## 12. Date & Time Inputs

### 12.1 Date Picker Patterns

| Pattern | Use Case |
|---------|----------|
| **Native `<input type="date">`** | Simple date, mobile-first |
| **Calendar dropdown** | Visual date selection, date range |
| **Text input with format mask** | Known format (DD/MM/YYYY) |
| **Segmented input** | Day / Month / Year in separate fields |

### 12.2 Date Picker Anatomy

```
Date of Birth
┌── DD/MM/YYYY ──────── 📅 ─┐
└────────────────────────────┘
┌──────────────────────────────┐
│  ◀  February 2025  ▶        │
│  Mo Tu We Th Fr Sa Su        │
│                  1  2        │
│   3  4  5  6  7  8  9        │
│  10 11 12 13 [14] 15 16     │
│  17 18 19 20 21 22 23        │
│  24 25 26 27 28              │
└──────────────────────────────┘
```

### 12.3 Date Range Picker

Two calendars side by side with range selection highlighting.

### 12.4 Time Picker Patterns

- **Native `<input type="time">`** — brings up native time picker on mobile.
- **Dropdown** — hours, minutes, AM/PM selects.
- **Scroll wheels** — mobile-style scrolling rollers.

---

## 13. File Upload

### 13.1 Upload Zone Anatomy

```
┌─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─┐
│                                        │
│        📁 Drag & drop files here       │
│        or click to browse              │
│                                        │
│        Accepted: .pdf, .jpg, .png      │
│        Max size: 10MB                  │
│                                        │
└─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─┘
```

### 13.2 Upload States

| State | Visual |
|-------|--------|
| Empty | Dashed border, icon, instructions |
| Drag over (valid) | Accent dashed border, accent tint background |
| Drag over (invalid) | Danger dashed border, danger tint |
| Uploading | Progress bar inside zone |
| Uploaded | File list with name, size, type, remove button |
| Error | Error message per file, retry option |

### 13.3 File List Item

```
┌─────────────────────────────────────────┐
│ 📄 document.pdf   2.4 MB   ✓ Complete  ✕│
│ 📄 photo.jpg      1.1 MB   ▓▓▓░░ 60%   │
│ 📄 invalid.exe    —        ⚠️ Not allowed ✕│
└─────────────────────────────────────────┘
```

---

## 14. Rich Input Types

### 14.1 Slider / Range

```
Volume
├──────────●──────────────┤
0          45            100
```

- Track, thumb, fill, labels.
- Accessible: `role="slider"`, `aria-valuenow`, `aria-valuemin`, `aria-valuemax`.
- Variants: single, range (two thumbs), stepped.

### 14.2 Rating (Stars)

```
Rating
★ ★ ★ ★ ☆  (4 of 5)
```

- Interactive: click or keyboard to select.
- Read-only: display only.
- Half-star support optional.

### 14.3 Tag/Chip Input

```
Tags
┌─ [React ✕] [TypeScript ✕] [│           ] ─┐
└────────────────────────────────────────────┘
```

- Type to add tags.
- Backspace removes last tag.
- Autocomplete suggestions optional.

### 14.4 Color Picker

```
Color
┌──────────────────────┐
│ ● #3B82F6            │
└──────────────────────┘
[Saturation/brightness panel]
[Hue slider]
[Opacity slider]
[Hex] [RGB] [HSL] inputs
[Preset swatches]
```

### 14.5 Rich Text Editor

Toolbar + editable area:
```
┌─ B I U S │ H1 H2 │ • # │ 🔗 📷 │ ↩ ↪ ─┐
│                                           │
│ Your content here...                      │
│                                           │
└───────────────────────────────────────────┘
```

Not a DS primitive, but DS should provide the styling tokens and toolbar patterns.

---

## 15. Field Groups

### 15.1 Fieldset + Legend

```html
<fieldset>
  <legend>Contact Information</legend>
  <div class="field">...</div>
  <div class="field">...</div>
</fieldset>
```

### 15.2 Visual Grouping

```
Contact Information
───────────────────
[Name    ]
[Email   ]
[Phone   ]

Address
───────────────────
[Street  ]
[City    ] [State] [Zip]
```

### 15.3 Radio Group

```html
<fieldset>
  <legend>Payment method</legend>
  <label><input type="radio" name="payment" /> Credit card</label>
  <label><input type="radio" name="payment" /> PayPal</label>
  <label><input type="radio" name="payment" /> Bank transfer</label>
</fieldset>
```

### 15.4 Checkbox Group

Same as radio but with `type="checkbox"` for multi-select.

---

## 16. Multi-Step Forms

### 16.1 Progress Indicator

```
● Step 1 ──── ● Step 2 ──── ○ Step 3 ──── ○ Step 4
  Personal      Contact       Payment       Confirm
```

### 16.2 Step Navigation Rules

1. Show progress (step X of Y, or progress bar).
2. Allow going back without losing data.
3. Validate each step before allowing next.
4. Show a summary/review step before final submit.
5. Save draft on each step completion.
6. Allow jumping to completed steps (click on progress indicator).

### 16.3 Responsive Multi-Step

- Desktop: Horizontal stepper with all labels visible.
- Mobile: Compact "Step 2 of 4" text + progress bar.

---

## 17. Form Actions

### 17.1 Button Placement

```
Single action:                    [Submit ▶]  (right-aligned)

Primary + secondary:   [Cancel]  [Submit ▶]  (primary rightmost)

Destructive:  [Delete]           [Cancel] [Save]  (destructive left, far from primary)
```

### 17.2 Button Rules

1. **Primary action is rightmost** (in LTR layouts).
2. **Destructive actions are leftmost**, separated from other buttons.
3. **Cancel is text/ghost button** — less visual weight than primary.
4. **Use verb labels** — "Save changes", "Create account", not "Submit", "OK".
5. **Loading state on submit** — disable button, show spinner.
6. **Don't disable submit until all fields valid** — let users try and see what's wrong.

### 17.3 Sticky Form Actions

For long forms, stick actions to the bottom of the viewport:

```css
.form-actions {
  position: sticky;
  bottom: 0;
  background: var(--ds-color-bg);
  border-top: 1px solid var(--ds-border-subtle);
  padding: var(--ds-space-4);
}
```

---

## 18. Form Accessibility

### 18.1 Checklist

```
□ Every input has a visible <label> with matching for/id
□ Required fields have aria-required="true" + visual indicator
□ Error messages linked via aria-describedby
□ Errors announced via aria-live or role="alert"
□ Invalid fields have aria-invalid="true"
□ Fieldsets group related fields with <legend>
□ Tab order follows visual order
□ Autocomplete attributes on common fields
□ Error summary at top of form links to individual fields
□ Form can be completed with keyboard only
□ Validation messages are text (not just color/icon)
□ Touch targets ≥ 44px on mobile
```

---

## 19. Form Tokens Summary

### Complete Token Inventory

```
FIELD SIZING
  --ds-field-height-sm        32px
  --ds-field-height-md        40px (default)
  --ds-field-height-lg        48px
  --ds-field-padding-x        12-16px
  --ds-field-gap              8px (between label and input)
  --ds-form-gap               16-24px (between fields)

FIELD COLORS
  --ds-field-bg               input background
  --ds-field-bg-disabled      disabled background
  --ds-field-border           default border
  --ds-field-border-hover     hover border
  --ds-field-border-focus     focus border (accent)
  --ds-field-border-error     error border (danger)
  --ds-field-border-success   success border
  --ds-field-text             input text color
  --ds-field-placeholder      placeholder color (muted)
  --ds-field-label            label color
  --ds-field-helper           helper text color
  --ds-field-error            error message color

FIELD RADIUS
  --ds-field-radius           matches --ds-radius-md

VALIDATION
  Error:     danger color + icon + aria-invalid + error message
  Success:   success color + check icon (after correction)
  Warning:   warning color + warn icon
  Timing:    On blur (first), on change (revalidation)

LAYOUT
  Default:   single column, full width
  Inline:    grid, 2+ fields per row (responsive)
  Actions:   right-aligned, primary rightmost

COMPONENT CATALOG
  Text Input, Email, Password, URL, Tel, Search, Number
  Textarea
  Checkbox, Radio
  Select (native + custom)
  Combobox / Autocomplete
  Switch / Toggle
  Date Picker, Time Picker, Date Range
  File Upload
  Slider / Range
  Rating
  Tag / Chip Input
  Color Picker
```

---

*This chapter defines the complete form vocabulary for a Design System. Every field anatomy, validation pattern, layout rule, and accessibility requirement above must be present in the implemented DS.*
