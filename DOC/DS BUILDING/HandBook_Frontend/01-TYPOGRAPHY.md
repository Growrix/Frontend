# 01 — Typography

> Everything a Design System must define to achieve complete typographic control. This chapter covers every text-related token, class, pattern, and rule needed for professional frontend typography.

---

## Table of Contents

1. [Font Family System](#1-font-family-system)
2. [Type Scale](#2-type-scale)
3. [Font Weight System](#3-font-weight-system)
4. [Line Height System](#4-line-height-system)
5. [Letter Spacing System](#5-letter-spacing-system)
6. [Semantic Typography Classes](#6-semantic-typography-classes)
7. [Heading Hierarchy](#7-heading-hierarchy)
8. [Body Text](#8-body-text)
9. [UI Text](#9-ui-text)
10. [Decorative & Display Text](#10-decorative--display-text)
11. [Fluid & Responsive Typography](#11-fluid--responsive-typography)
12. [Prose / Long-Form Content](#12-prose--long-form-content)
13. [Text Overflow & Truncation](#13-text-overflow--truncation)
14. [Text Alignment & Wrapping](#14-text-alignment--wrapping)
15. [Text Decoration & Transform](#15-text-decoration--transform)
16. [Code & Monospace Typography](#16-code--monospace-typography)
17. [Variable Fonts](#17-variable-fonts)
18. [OpenType Features](#18-opentype-features)
19. [List Typography](#19-list-typography)
20. [Numeric & Tabular Typography](#20-numeric--tabular-typography)
21. [Gradient & Clipped Text](#21-gradient--clipped-text)
22. [Selection & Caret Styling](#22-selection--caret-styling)
23. [Font Loading Strategy](#23-font-loading-strategy)
24. [Vertical Rhythm & Baseline Grid](#24-vertical-rhythm--baseline-grid)
25. [Typography Tokens Summary](#25-typography-tokens-summary)

---

## 1. Font Family System

A Design System must define **three font stacks** minimum, with fallback chains:

### 1.1 Required Font Stacks

| Stack | Purpose | Example |
|-------|---------|---------|
| **Sans-serif (primary)** | Body text, UI labels, form inputs, paragraphs | Inter, SF Pro, Segoe UI, system-ui |
| **Display** | Headlines, hero text, marketing headings | Montserrat, Poppins, Cabinet Grotesk |
| **Monospace** | Code blocks, terminal output, tabular data | Fira Code, JetBrains Mono, Consolas |

### 1.2 Optional Extended Stacks

| Stack | Purpose | Example |
|-------|---------|---------|
| **Serif** | Editorial content, blog post bodies, legal text | Merriweather, Lora, Georgia |
| **Handwriting** | Decorative callouts, signature areas, personal branding | Caveat, Dancing Script |
| **Condensed** | Dense data, table headers, side annotations | Barlow Condensed, Roboto Condensed |

### 1.3 Token Naming Convention

```
--ds-font-sans:     <primary>, ui-sans-serif, system-ui, sans-serif
--ds-font-display:  <display>, var(--ds-font-sans)
--ds-font-mono:     <monospace>, Consolas, Monaco, monospace
--ds-font-serif:    <serif>, Georgia, serif
```

### 1.4 Fallback Chain Rules

- Always include **at least 3 fallbacks** terminating with a generic family (`sans-serif`, `serif`, `monospace`).
- Include **system font keywords** (`system-ui`, `ui-sans-serif`) for native OS rendering.
- Use `var()` references so Display can degrade gracefully to Sans if the display font fails to load.

---

## 2. Type Scale

The type scale defines every font size available in the system. No raw `px`, `rem`, or `em` values should appear outside this scale.

### 2.1 Scale Architecture

A type scale is a **mathematical progression** of font sizes. Common progressions:

| Scale Ratio | Name | Factor | Best For |
|-------------|------|--------|----------|
| 1.125 | Major Second | ×1.125 | Dense UI, dashboards |
| 1.200 | Minor Third | ×1.2 | Balanced general purpose |
| 1.250 | Major Third | ×1.25 | Marketing, editorial |
| 1.333 | Perfect Fourth | ×1.333 | Bold headlines, splash pages |
| 1.414 | Augmented Fourth | ×1.414 | High contrast, hero-heavy |
| 1.500 | Perfect Fifth | ×1.5 | Dramatic presentations |

### 2.2 Recommended Scale Steps

A professional DS needs **9–12 steps** to cover all use cases:

| Token | Step | Typical Size | Use Case |
|-------|------|-------------|----------|
| `--ds-font-size-1` | 1 (Micro) | 10px / 0.625rem | Footnotes, legal micro-print, badge counts |
| `--ds-font-size-2` | 2 (Tiny) | 12–13px / 0.75–0.8125rem | Captions, timestamps, helper text, labels |
| `--ds-font-size-3` | 3 (Base) | 16px / 1rem | Body text — the foundation stone |
| `--ds-font-size-4` | 4 (Medium) | 18px / 1.125rem | Large body, card descriptions, lead paragraphs |
| `--ds-font-size-5` | 5 (Moderate) | 20px / 1.25rem | H4 / subheadings, section intros |
| `--ds-font-size-6` | 6 (Large) | 24–30px / 1.5–1.875rem | H3 / section headers |
| `--ds-font-size-7` | 7 (XL) | 32–36px / 2–2.25rem | H2 / page titles |
| `--ds-font-size-8` | 8 (2XL) | 40–48px / 2.5–3rem | H1 / hero headlines |
| `--ds-font-size-9` | 9 (3XL) | 56–64px / 3.5–4rem | Display / splash headlines |
| `--ds-font-size-10` | 10 (4XL) | 72–80px / 4.5–5rem | Super display, landing pages |
| `--ds-font-size-11` | 11 (5XL) | 96px / 6rem | Billboard / oversized decorative |
| `--ds-font-size-12` | 12 (6XL) | 128px / 8rem | Full-bleed display text |

### 2.3 Base Size

- The base (`--ds-font-size-3`) **must** be `1rem` (16px by default).
- All other sizes are derived from the base × scale ratio.
- Never hardcode `px` values — always use tokens.

---

## 3. Font Weight System

### 3.1 Standard Weight Scale

The CSS `font-weight` specification defines a 1–1000 range. A DS should expose **6–8 named weights**:

| Token | Value | Name | Use Case |
|-------|-------|------|----------|
| `--ds-font-weight-thin` | 100 | Thin | Decorative display text only |
| `--ds-font-weight-extra-light` | 200 | Extra Light | Light decorative headings |
| `--ds-font-weight-light` | 300 | Light | Subtle UI text, large display text |
| `--ds-font-weight-regular` | 400 | Regular | **Body text default** |
| `--ds-font-weight-book` | 450 | Book | Slightly heavier body for low-contrast screens |
| `--ds-font-weight-medium` | 500 | Medium | Subheadings, emphasized body, nav links |
| `--ds-font-weight-semibold` | 600 | Semibold | Section headers, strong labels |
| `--ds-font-weight-bold` | 700 | Bold | Primary headings, CTAs, important callouts |
| `--ds-font-weight-extra-bold` | 800 | Extra Bold | Hero display, high-impact text |
| `--ds-font-weight-black` | 900 | Black | Maximum impact — splash and billboard only |

### 3.2 Minimum Required Weights

At bare minimum a DS must have: **Regular (400)**, **Medium (500)**, **Semibold (600)**, **Bold (700)**. The rest are optional depending on typography goals.

### 3.3 Variable Font Weight

If using variable fonts, define weight as a range axis: `font-weight: 100 900;` and use the named tokens to pick specific values along the axis.

---

## 4. Line Height System

Line height (leading) controls readability. It should be defined as **unitless multipliers**.

### 4.1 Required Tokens

| Token | Value | Use Case |
|-------|-------|----------|
| `--ds-line-height-none` | 1 | Single-line badges, icon buttons, metric numbers |
| `--ds-line-height-tight` | 1.1–1.2 | Large headings (H1, H2, display) — large text needs less leading |
| `--ds-line-height-snug` | 1.25–1.3 | Medium headings (H3, H4), card titles |
| `--ds-line-height-normal` | 1.5 | **Body text default** — WCAG minimum for paragraph text |
| `--ds-line-height-relaxed` | 1.625–1.75 | Long-form articles, prose, blog posts |
| `--ds-line-height-loose` | 2 | Double-spaced academic or legal text |

### 4.2 Rules

- Body text **must** use `1.5` minimum (WCAG 1.4.12 requirement: at least 1.5× font size for paragraph text).
- Headings **should** use tighter line heights (1.1–1.3) — large text is readable with less leading.
- **Never** define line height in `px` or `rem` — always use unitless values so they scale proportionally with font size.
- Multi-line headings at display sizes may need manual `line-height` tuning per breakpoint.

---

## 5. Letter Spacing System

### 5.1 Required Tokens

| Token | Value | Use Case |
|-------|-------|----------|
| `--ds-letter-spacing-tighter` | −0.05em | Extremely large display text (72px+) |
| `--ds-letter-spacing-tight` | −0.02em | Headings (H1–H3), display text |
| `--ds-letter-spacing-normal` | 0 | **Body text** — no adjustment |
| `--ds-letter-spacing-wide` | 0.02em | Small labels, breadcrumbs |
| `--ds-letter-spacing-wider` | 0.05em | ALLCAPS text, captions, overlines |
| `--ds-letter-spacing-widest` | 0.1em | Decorative spaced-out text, kicker lines |

### 5.2 Rules

- Large text (>24px) should use **negative** letter spacing — large glyphs have built-in spacing that looks too wide at scale.
- ALL-CAPS text **must** use positive letter spacing to maintain readability.
- Body text uses `0` (normal) — the font designer already optimized it.
- Never combine tight letter spacing with small font sizes — it destroys readability.

---

## 6. Semantic Typography Classes

Rather than composing `font-size` + `font-weight` + `line-height` + `letter-spacing` everywhere, the DS must provide **pre-composed semantic classes** that map to a typographic role.

### 6.1 Required Semantic Classes

| Class | Role | Typical Composition |
|-------|------|-------------------|
| `.text-display-1` | Billboard / oversized hero text | size-12, weight-black, line-height-none, letter-spacing-tighter, font-display |
| `.text-display-2` | Large hero headline | size-10, weight-extra-bold, line-height-tight, letter-spacing-tight, font-display |
| `.text-display-3` | Medium hero / splash | size-9, weight-bold, line-height-tight, letter-spacing-tight, font-display |
| `.text-heading-1` | Page title (H1) | size-8, weight-bold, line-height-tight, letter-spacing-tight, font-display |
| `.text-heading-2` | Major section (H2) | size-7, weight-semibold, line-height-snug, letter-spacing-tight, font-display |
| `.text-heading-3` | Subsection (H3) | size-6, weight-semibold, line-height-snug, font-display |
| `.text-heading-4` | Minor section (H4) | size-5, weight-medium, line-height-snug, font-display |
| `.text-heading-5` | Group header (H5) | size-4, weight-medium, line-height-normal, font-sans |
| `.text-heading-6` | Inline header (H6) | size-3, weight-semibold, line-height-normal, font-sans |
| `.text-body` | Default paragraph | size-3, weight-regular, line-height-normal, font-sans |
| `.text-body-large` | Lead paragraph, intros | size-4, weight-regular, line-height-relaxed, font-sans |
| `.text-body-small` | Secondary text, fine print | size-2, weight-regular, line-height-normal, font-sans |
| `.text-label` | Form labels, table headers | size-2, weight-semibold, line-height-normal, font-sans |
| `.text-caption` | Photo captions, timestamps | size-2, weight-medium, letter-spacing-wide, uppercase |
| `.text-overline` | Kicker above headings | size-1, weight-semibold, letter-spacing-widest, uppercase |
| `.text-micro` | Legal footnotes, fine print | size-1, weight-regular, letter-spacing-wide |
| `.text-quote` | Pull quotes, blockquotes | size-5 or 6, weight-light, line-height-relaxed, font-serif (optional), italic |
| `.text-code` | Inline code | size-2, weight-regular, font-mono |
| `.text-kbd` | Keyboard shortcut display | size-1, weight-medium, font-mono, bordered |

### 6.2 Class Composition Rule

Each semantic class sets **all 5 axes** simultaneously:
1. `font-family`
2. `font-size`
3. `font-weight`
4. `line-height`
5. `letter-spacing`

This prevents partial application bugs where a developer sets font-size but forgets to adjust line-height.

---

## 7. Heading Hierarchy

### 7.1 HTML Semantics vs Visual Style

**Critical rule**: Heading level (`<h1>`–`<h6>`) is for **document outline/accessibility**. Visual style is controlled by `.text-heading-*` classes. They can be mixed:

```html
<!-- H2 in the DOM but visually styled as heading-3 -->
<h2 class="text-heading-3">Section Title</h2>
```

### 7.2 Heading Rules

- Every page must have **exactly one `<h1>`**.
- Heading levels must not skip (no `<h2>` → `<h4>` without `<h3>` between).
- Provide a `<Text as="h2" variant="heading-3">` component pattern so developers get semantic + visual control in one API.
- Maximum heading depth in practice: **4 levels** (H1–H4). H5–H6 are rare and used for dense sidebars or metadata groupings.

### 7.3 Multi-line Heading Considerations

- Headings at display sizes should use `text-wrap: balance` to avoid orphaned words.
- Maximum heading width: `35–45ch` for display, `50–65ch` for smaller headings.
- Consider `line-clamp` or `max-width` to prevent headings from becoming paragraphs.

---

## 8. Body Text

### 8.1 Required Variants

| Variant | Purpose |
|---------|---------|
| **Body (default)** | Standard paragraph text — 16px, 1.5 line-height |
| **Body Large** | Lead/intro paragraphs, hero descriptions — 18px, 1.625 line-height |
| **Body Small** | Secondary information, helper text — 13px, 1.5 line-height |

### 8.2 Paragraph Rules

- **Maximum line length**: 60–75 characters per line (`max-width: 65ch`). Beyond 75ch, readability drops sharply.
- **Paragraph spacing**: Use `margin-bottom` equal to or slightly less than `line-height × font-size`.
- **No justified text** in UI — ragged right (`text-align: left`) is more readable on screens.
- **First paragraph** after a heading may optionally have no top margin.

### 8.3 Inline Text Modifiers

The DS must provide utility classes (or component props) for inline text styling:

| Modifier | Effect |
|----------|--------|
| `.text-bold` / `<strong>` | `font-weight: bold` |
| `.text-italic` / `<em>` | `font-style: italic` |
| `.text-underline` / `<u>` | `text-decoration: underline` |
| `.text-strikethrough` / `<del>` | `text-decoration: line-through` |
| `.text-muted` | Reduced opacity or muted color |
| `.text-accent` | Brand/accent color |
| `.text-success` | Success/green color |
| `.text-warning` | Warning/amber color |
| `.text-danger` | Error/red color |
| `.text-info` | Info/blue color |
| `.text-inherit` | Inherits color from parent |

---

## 9. UI Text

Beyond headings and body, a DS needs specialized text classes for UI chrome:

### 9.1 Required UI Text Types

| Type | Purpose | Specs |
|------|---------|-------|
| **Label** | Form field labels | Small, semibold, consistent with input sizing |
| **Helper** | Hint text below inputs | Small, muted color, normal weight |
| **Error** | Validation error messages | Small, danger color, optionally prefixed with icon |
| **Placeholder** | Input placeholder text | Same size as input text, muted color |
| **Button text** | Button labels | Medium weight, size depends on button size variant |
| **Nav link** | Navigation items | Medium weight, consistent touch targets |
| **Tab label** | Tab strip labels | Medium weight, uppercase optional, active state |
| **Badge text** | Badge/chip labels | Micro/tiny size, medium weight |
| **Tooltip text** | Tooltip content | Small, inverse colors |
| **Toast title** | Notification titles | Small, semibold |
| **Toast body** | Notification messages | Small, regular weight |
| **Menu item** | Dropdown/context menu items | Body-small or body size |
| **Breadcrumb** | Navigation path | Small, muted, separator between items |
| **Stat value** | Dashboard metric numbers | Large, bold, mono optional for tabular alignment |
| **Stat label** | Metric description | Micro/tiny, muted, uppercase optional |
| **Footer text** | Site footer content | Small, muted |

---

## 10. Decorative & Display Text

For marketing pages, hero sections, and landing pages:

### 10.1 Display Sizes

Display text goes **beyond** the heading scale. These are oversized, impactful text treatments:

| Class | Size Range | Use Case |
|-------|-----------|----------|
| `.text-display-1` | 96–128px | Full-width billboards, splash screens |
| `.text-display-2` | 72–80px | Hero main headline |
| `.text-display-3` | 56–64px | Hero sub-headline, feature sections |

### 10.2 Display Rules

- Always use `font-display` stack.
- Always use `letter-spacing-tight` or `tighter`.
- Always use `line-height-none` or `tight`.
- Consider `text-wrap: balance` for multi-line display text.
- Display text should be responsive — scale down on mobile (see Chapter 12).

### 10.3 Kicker / Overline

Small text **above** a heading that provides context:

```
CASE STUDY          ← overline/kicker
How We Scaled       ← heading
to 10M Users        ← heading continued
```

Specs: Uppercase, wide letter spacing, micro/tiny size, accent color or muted.

### 10.4 Lede / Subtitle

Larger text **below** a heading that expands on it:

```
How We Scaled to 10M Users     ← heading
The infrastructure decisions    ← lede/subtitle
that made it possible.
```

Specs: `body-large` or `size-5`, regular weight, muted color, `max-width: 65ch`.

---

## 11. Fluid & Responsive Typography

### 11.1 Fluid Type with `clamp()`

Instead of breakpoint-based jumps, use CSS `clamp()` for smooth font size transitions:

```css
--ds-font-size-fluid-display: clamp(2.5rem, 5vw + 1rem, 8rem);
--ds-font-size-fluid-h1:      clamp(2rem, 3vw + 1rem, 3rem);
--ds-font-size-fluid-h2:      clamp(1.5rem, 2vw + 0.75rem, 2.25rem);
--ds-font-size-fluid-body:    clamp(1rem, 0.5vw + 0.875rem, 1.125rem);
```

### 11.2 `clamp()` Formula

```
clamp(MIN, PREFERRED, MAX)

PREFERRED = VW_SLOPE × 1vw + REM_INTERCEPT
```

Tools to compute: Utopia (utopia.fyi), Fluid Type Scale Calculator.

### 11.3 Breakpoint-Based Alternative

If `clamp()` is not desired, use media queries to step down heading sizes:

```css
.text-heading-1 { font-size: var(--ds-font-size-8); }

@media (max-width: 768px) {
  .text-heading-1 { font-size: var(--ds-font-size-7); }
}

@media (max-width: 480px) {
  .text-heading-1 { font-size: var(--ds-font-size-6); }
}
```

### 11.4 When to Use Which

| Approach | Best For |
|----------|----------|
| **Fluid (clamp)** | Display text, hero headlines, marketing pages |
| **Stepped (breakpoints)** | UI text, dashboard content, form labels |
| **Fixed** | Micro text, badges, icons — too small to scale |

---

## 12. Prose / Long-Form Content

Blog posts, articles, documentation, legal pages — long-form text needs its own typography module.

### 12.1 The Prose Container

A `.prose` or `.ds-prose` class applied to a container that styles all descendant HTML elements:

| Element | Prose Styling |
|---------|--------------|
| `<h1>`–`<h6>` | Mapped to heading classes with vertical spacing |
| `<p>` | Body text with bottom margin |
| `<a>` | Underlined, accent color, hover state |
| `<strong>` | Bold weight |
| `<em>` | Italic |
| `<ul>`, `<ol>` | Indented, proper list-style, spacing between items |
| `<li>` | Correct margin/padding |
| `<blockquote>` | Left border, italic, indented, muted or accent color |
| `<code>` | Inline code style (mono, background, padding, border-radius) |
| `<pre>` | Code block (mono, background, padding, overflow-x, border-radius) |
| `<hr>` | Divider with spacing |
| `<img>` | Max-width 100%, border-radius, optional shadow |
| `<figure>` | Image + caption wrapper |
| `<figcaption>` | Caption styling |
| `<table>` | Bordered, striped optional, responsive overflow |
| `<mark>` | Highlight background |
| `<abbr>` | Dotted underline, cursor help |
| `<sub>`, `<sup>` | Proper positioning without affecting line-height |
| `<details>` | Collapsible sections |
| `<summary>` | Styled marker/indicator |
| `<kbd>` | Keyboard key styling |

### 12.2 Prose Size Variants

| Variant | Base Size | Max-Width |
|---------|-----------|-----------|
| `.prose-sm` | 14px | 55ch |
| `.prose` (default) | 16px | 65ch |
| `.prose-lg` | 18px | 70ch |
| `.prose-xl` | 20px | 75ch |

### 12.3 Prose Spacing Rules

- Space between paragraphs: `1.25em` (relative to current font size).
- Space before headings: `2em`.
- Space after headings: `0.75em`.
- List item spacing: `0.5em`.
- Blockquote left border: `4px` accent color.

---

## 13. Text Overflow & Truncation

### 13.1 Single-Line Truncation

Clip text to one line with an ellipsis:

```css
.text-truncate {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
```

### 13.2 Multi-Line Truncation (Line Clamp)

Clip after N lines:

```css
.text-line-clamp-1 { -webkit-line-clamp: 1; }
.text-line-clamp-2 { -webkit-line-clamp: 2; }
.text-line-clamp-3 { -webkit-line-clamp: 3; }
.text-line-clamp-4 { -webkit-line-clamp: 4; }
.text-line-clamp-5 { -webkit-line-clamp: 5; }

[class*="text-line-clamp"] {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
```

### 13.3 When to Use

| Scenario | Approach |
|---------|----------|
| Card titles | 1-line truncation |
| Card descriptions | 2–3 line clamp |
| Table cells | 1-line truncation |
| Nav items | 1-line truncation |
| Full articles | Never truncate — use "Read more" link |
| Tooltips | Never truncate — show full text |

---

## 14. Text Alignment & Wrapping

### 14.1 Alignment Utilities

| Class | Value | Use Case |
|-------|-------|----------|
| `.text-left` | `text-align: left` | Default for LTR languages |
| `.text-center` | `text-align: center` | Centered hero text, section headers, modals |
| `.text-right` | `text-align: right` | Numeric columns, prices, timestamps |
| `.text-justify` | `text-align: justify` | **Avoid** — creates uneven word spacing |
| `.text-start` | `text-align: start` | **Preferred** — logical property, RTL-aware |
| `.text-end` | `text-align: end` | Logical right, RTL-aware |

### 14.2 Wrapping Controls

| Class | Value | Use Case |
|-------|-------|----------|
| `.text-wrap` | `text-wrap: wrap` | Default |
| `.text-nowrap` | `white-space: nowrap` | Prevent wrapping (badges, labels) |
| `.text-balance` | `text-wrap: balance` | Balanced multi-line headings |
| `.text-pretty` | `text-wrap: pretty` | Avoids orphans in paragraphs |
| `.break-words` | `overflow-wrap: break-word` | Force long words/URLs to wrap |
| `.break-all` | `word-break: break-all` | Break anywhere — use for CJK or hashes |
| `.hyphens-auto` | `hyphens: auto` | Hyphenation for justified-adjacent layouts |

---

## 15. Text Decoration & Transform

### 15.1 Decoration

| Class | Value | Use Case |
|-------|-------|----------|
| `.underline` | `text-decoration: underline` | Links |
| `.overline` | `text-decoration: overline` | Rare decorative |
| `.line-through` | `text-decoration: line-through` | Deleted content, old prices |
| `.no-underline` | `text-decoration: none` | Remove underline from links |
| `.underline-offset-2` | `text-underline-offset: 2px` | Better link readability |
| `.underline-offset-4` | `text-underline-offset: 4px` | Even more offset |
| `.decoration-accent` | `text-decoration-color: var(--ds-color-accent)` | Branded underlines |
| `.decoration-wavy` | `text-decoration-style: wavy` | Spell-check-like underlines |
| `.decoration-dashed` | `text-decoration-style: dashed` | Abbreviation hint |
| `.decoration-2` | `text-decoration-thickness: 2px` | Thicker underlines |

### 15.2 Transform

| Class | Value | Use Case |
|-------|-------|----------|
| `.uppercase` | `text-transform: uppercase` | Captions, overlines, badges |
| `.lowercase` | `text-transform: lowercase` | Rare |
| `.capitalize` | `text-transform: capitalize` | Nav items, titles |
| `.normal-case` | `text-transform: none` | Reset |

### 15.3 Font Style

| Class | Value | Use Case |
|-------|-------|----------|
| `.italic` | `font-style: italic` | Emphasis, quotes |
| `.not-italic` | `font-style: normal` | Reset |

---

## 16. Code & Monospace Typography

### 16.1 Inline Code

One or a few words of code within a sentence:

| Property | Value |
|----------|-------|
| Font family | `--ds-font-mono` |
| Font size | ~0.875em (slightly smaller than surrounding text) |
| Background | Subtle surface color |
| Padding | `0.125em 0.375em` |
| Border radius | `--ds-radius-default` |
| Border | Optional 1px subtle border |

### 16.2 Code Blocks

Multi-line code with syntax highlighting:

| Property | Value |
|----------|-------|
| Font family | `--ds-font-mono` |
| Font size | `--ds-font-size-2` or `--ds-font-size-3` |
| Line height | 1.6–1.8 (more relaxed for code readability) |
| Background | Contrasting surface |
| Padding | `--ds-space-4` |
| Border radius | `--ds-radius-card` |
| Overflow-x | `auto` (horizontal scroll for long lines) |
| Tab size | 2 or 4 spaces |
| White space | `pre` |
| Line numbers | Optional, muted color, right-aligned, non-selectable |

### 16.3 Keyboard Shortcut Styling (`<kbd>`)

| Property | Value |
|----------|-------|
| Font family | `--ds-font-mono` |
| Font size | 0.75em |
| Background | Raised surface |
| Border | 1px bottom-heavy (simulates key depth) |
| Border radius | `--ds-radius-default` |
| Padding | `0.125em 0.5em` |
| Box shadow | Subtle bottom shadow (key press depth) |

### 16.4 Terminal / Output

For displaying terminal output (non-syntax-highlighted):

| Property | Value |
|----------|-------|
| Background | Near-black (`#0d1117` or similar) |
| Text color | Green/white/gray terminal palette |
| Font family | `--ds-font-mono` |
| Font size | `--ds-font-size-2` |
| Cursor blink | Optional decorative |

---

## 17. Variable Fonts

### 17.1 What Variable Fonts Provide

A single font file with adjustable axes instead of multiple static files:

| Axis | Tag | Range | Benefit |
|------|-----|-------|---------|
| Weight | `wght` | 100–900 | Any weight without extra files |
| Width | `wdth` | 75–125 | Condensed ↔ expanded |
| Italic | `ital` | 0–1 | Smooth italic transition |
| Slant | `slnt` | −12–0 | Oblique without separate italic |
| Optical Size | `opsz` | 8–144 | Auto-adjust details for readability at size |

### 17.2 Implementation

```css
@font-face {
  font-family: "InterVariable";
  src: url("InterVariable.woff2") format("woff2");
  font-weight: 100 900;
  font-display: swap;
}
```

### 17.3 Benefits for a DS

- **File size reduction**: One file replaces 6+ static files.
- **Intermediate weights**: Use 450 (book) or 550 (demibold) not available in static fonts.
- **Animation**: Smoothly animate weight, width, or slant.
- **Responsive weight**: Slightly increase weight on small screens for readability.

---

## 18. OpenType Features

Advanced typography features embedded in professional fonts:

### 18.1 Key Features

| Feature | CSS | Effect |
|---------|-----|--------|
| Ligatures | `font-variant-ligatures: common-ligatures` | fi, fl, ffi merged glyphs |
| Discretionary ligatures | `font-variant-ligatures: discretionary-ligatures` | Decorative ligature pairs |
| Tabular numbers | `font-variant-numeric: tabular-nums` | Fixed-width digits for alignment |
| Old-style numbers | `font-variant-numeric: oldstyle-nums` | Vary-height digits for body text |
| Lining numbers | `font-variant-numeric: lining-nums` | Same-height digits for UI |
| Fractions | `font-variant-numeric: diagonal-fractions` | ½ ¼ ¾ rendered properly |
| Ordinals | `font-variant-numeric: ordinal` | 1st, 2nd, 3rd superscript |
| Small caps | `font-variant-caps: small-caps` | Uppercase letters at lowercase height |
| All small caps | `font-variant-caps: all-small-caps` | Both cases become small caps |
| Swashes | `font-feature-settings: "swsh" 1` | Decorative alternates |
| Stylistic sets | `font-feature-settings: "ss01" 1` | Alternate glyph sets |
| Case-sensitive | `font-feature-settings: "case" 1` | Adjusts punctuation for ALLCAPS |
| Kerning | `font-kerning: normal` | Optical kerning pairs |
| Sub/superscript | `font-variant-position: sub/super` | True typographic sub/super (not fake) |

### 18.2 DS Token Approach

```css
.text-tabular  { font-variant-numeric: tabular-nums; }
.text-oldstyle { font-variant-numeric: oldstyle-nums; }
.text-fractions { font-variant-numeric: diagonal-fractions; }
.text-smallcaps { font-variant-caps: small-caps; }
.text-ordinal  { font-variant-numeric: ordinal; }
```

---

## 19. List Typography

### 19.1 Ordered Lists

| Concern | Rule |
|---------|------|
| Numbering style | `decimal`, `decimal-leading-zero`, `lower-alpha`, `lower-roman`, `upper-alpha`, `upper-roman` |
| List-style position | `outside` (default, numbers hang) or `inside` (numbers indent with text) |
| Nested depth | Switch style per depth (decimal → lower-alpha → lower-roman) |
| Marker color | Match muted text or accent |
| Spacing between items | `0.5em` for tight, `1em` for loose |

### 19.2 Unordered Lists

| Concern | Rule |
|---------|------|
| Bullet style | `disc`, `circle`, `square`, or custom via `::marker` or `list-style-image` |
| Custom bullets | Use `::before` or `::marker` with icon fonts or SVG |
| Nesting | Alternate bullet shapes per depth |

### 19.3 Description Lists (`<dl>`)

For key-value pairs (settings pages, metadata):

| Element | Styling |
|---------|---------|
| `<dt>` | Label weight (semibold), small size |
| `<dd>` | Body text, left margin or grid alignment |

### 19.4 Checklist / Task Lists

For markdown-rendered task lists (`- [x] done`, `- [ ] todo`):

| State | Styling |
|-------|---------|
| Unchecked | Empty checkbox icon, normal text |
| Checked | Filled checkbox icon, strikethrough or muted text |

---

## 20. Numeric & Tabular Typography

### 20.1 Tabular Figures

When numbers align in columns (tables, dashboards, prices), use:

```css
font-variant-numeric: tabular-nums;
```

This makes all digit glyphs the same width so "111" and "999" align perfectly.

### 20.2 Proportional Figures

For numbers within body text, proportional (default) is better — digits have natural width.

### 20.3 Metric / Dashboard Number Styling

| Element | Specs |
|---------|-------|
| Stat value | Display size, bold, mono or tabular, tight line-height |
| Currency symbol | Same line, slightly smaller, or superscript |
| Thousands separator | Locale-aware (`,` or `.` or ` `) |
| Decimal places | Consistent per metric type |
| Trend indicator | Superscript arrow, green/red color |
| Percentage | Right-aligned, fixed width |

### 20.4 Price Typography

```
$2,499.00     ← full price
$1,299.00     ← sale price (bold, accent)
$2,499.00     ← original price (line-through, muted)
```

---

## 21. Gradient & Clipped Text

### 21.1 Gradient Text

Text filled with a color gradient instead of a solid color:

```css
.text-gradient {
  background: linear-gradient(135deg, var(--ds-color-accent), var(--ds-palette-brand-300));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
```

### 21.2 Variants to Support

| Variant | Gradient |
|---------|----------|
| `.text-gradient-brand` | Brand color → lighter brand |
| `.text-gradient-sunset` | Warm orange → pink |
| `.text-gradient-ocean` | Blue → cyan |
| `.text-gradient-custom` | Uses CSS custom properties for user-defined gradient |

### 21.3 Animated Gradient Text

```css
.text-gradient-animated {
  background-size: 200% auto;
  animation: gradient-shift 3s linear infinite;
}

@keyframes gradient-shift {
  to { background-position: 200% center; }
}
```

### 21.4 Outline / Stroke Text

Text with only an outline, no fill:

```css
.text-outline {
  -webkit-text-stroke: 1px var(--ds-color-foreground);
  -webkit-text-fill-color: transparent;
}
```

### 21.5 Rules

- Gradient text has **no accessibility benefit** — always ensure sufficient contrast for the lowest-contrast part of the gradient.
- Never apply gradient to body text — display/heading only.
- Fallback: Solid color for browsers that don't support `background-clip: text`.

---

## 22. Selection & Caret Styling

### 22.1 Text Selection

```css
::selection {
  background-color: var(--ds-color-accent);
  color: var(--ds-color-on-primary);
}
```

- Selection color should match brand/accent.
- Ensure contrast ratio is at least 3:1 between selection background and selected text.

### 22.2 Caret Color in Inputs

```css
input, textarea {
  caret-color: var(--ds-color-accent);
}
```

### 22.3 User-Select Control

| Class | Value | Use Case |
|-------|-------|----------|
| `.select-none` | `user-select: none` | Icons, decorative elements, drag handles |
| `.select-text` | `user-select: text` | Default text reset |
| `.select-all` | `user-select: all` | Code to copy, share links |
| `.select-auto` | `user-select: auto` | Browser default |

---

## 23. Font Loading Strategy

### 23.1 `font-display` Values

| Value | Behavior | Best For |
|-------|----------|----------|
| `swap` | Flash unstyled text, then swap when loaded | **Body fonts — recommended** |
| `block` | Short invisible period, then swap | Display fonts where flash is ugly |
| `fallback` | Very short block, swap if fast, else keep fallback | Balanced |
| `optional` | Only use if immediately available | Non-essential decorative fonts |
| `auto` | Browser decides | Never use — be explicit |

### 23.2 Recommended Strategy

1. **Sans (body)**: `font-display: swap` — always show text immediately.
2. **Display (headings)**: `font-display: swap` or `fallback`.
3. **Mono (code)**: `font-display: swap`.
4. **Decorative**: `font-display: optional` — if it loads, great; if not, use fallback.

### 23.3 Preloading Critical Fonts

```html
<link rel="preload" href="/fonts/inter-var.woff2" as="font" type="font/woff2" crossorigin>
```

Preload only **1–2** most critical fonts (body + display). Over-preloading blocks page load.

### 23.4 Subsetting

Remove unused glyphs (Cyrillic, Greek, rare symbols) to reduce file size. Keep `latin` + `latin-extended` at minimum. Add other subsets only if the app supports those languages.

### 23.5 Self-Hosting vs CDN

| Approach | Pros | Cons |
|----------|------|------|
| **Self-hosted** | Full control, same origin, no third-party dependency, GDPR compliant | Must manage font files |
| **Google Fonts CDN** | Easy, cached across sites | Third-party dependency, GDPR concerns, cache partitioning reduces benefits |
| **Next.js `next/font`** | Self-hosted + auto-optimal, zero layout shift | Framework-specific |

**Recommendation**: Self-host via `next/font/google` or `@fontsource` packages.

---

## 24. Vertical Rhythm & Baseline Grid

### 24.1 Concept

Vertical rhythm means all text (headings, body, UI) aligns to a consistent baseline grid. This creates visual harmony.

### 24.2 Base Unit

Define a **base unit** (typically `4px` or `8px`). All vertical spacing — margins, paddings, line-heights — should be multiples of this unit.

```
Base unit: 4px (0.25rem)
Body line-height: 16px × 1.5 = 24px = 6 × 4px ✓
Heading line-height: 32px × 1.2 = 38.4px ≈ 40px = 10 × 4px (round to grid) ✓
Paragraph margin: 24px = 6 × 4px ✓
```

### 24.3 Practical Rules

- **Don't be dogmatic** — exact baseline alignment across all elements is nearly impossible in web. Instead, aim for **approximate rhythm**.
- Use consistent vertical spacing tokens (`--ds-space-*`) that are multiples of the base unit.
- Heading margins should use spacing tokens, not arbitrary values.
- `line-height × font-size` should land on or near a grid line.

### 24.4 Debugging Baseline Grid

Overlay a horizontal grid during development:

```css
.debug-baseline {
  background-image: linear-gradient(
    to bottom,
    rgba(255, 0, 0, 0.1) 1px,
    transparent 1px
  );
  background-size: 100% 0.25rem; /* base unit */
}
```

---

## 25. Typography Tokens Summary

### 25.1 Complete Token Inventory

Every token a Design System needs for complete typographic control:

```
FONT FAMILIES
  --ds-font-sans
  --ds-font-display
  --ds-font-mono
  --ds-font-serif         (optional)
  --ds-font-condensed     (optional)

FONT SIZES (scale)
  --ds-font-size-1        10px / micro
  --ds-font-size-2        12-13px / tiny
  --ds-font-size-3        16px / base
  --ds-font-size-4        18px / medium
  --ds-font-size-5        20px / moderate
  --ds-font-size-6        24-30px / large
  --ds-font-size-7        32-36px / xl
  --ds-font-size-8        40-48px / 2xl
  --ds-font-size-9        56-64px / 3xl
  --ds-font-size-10       72-80px / 4xl
  --ds-font-size-11       96px / 5xl
  --ds-font-size-12       128px / 6xl

FLUID FONT SIZES
  --ds-font-size-fluid-body
  --ds-font-size-fluid-h1
  --ds-font-size-fluid-h2
  --ds-font-size-fluid-display

FONT WEIGHTS
  --ds-font-weight-thin          100
  --ds-font-weight-extra-light   200
  --ds-font-weight-light         300
  --ds-font-weight-regular       400
  --ds-font-weight-book          450
  --ds-font-weight-medium        500
  --ds-font-weight-semibold      600
  --ds-font-weight-bold          700
  --ds-font-weight-extra-bold    800
  --ds-font-weight-black         900

LINE HEIGHTS
  --ds-line-height-none          1
  --ds-line-height-tight         1.1-1.2
  --ds-line-height-snug          1.25-1.3
  --ds-line-height-normal        1.5
  --ds-line-height-relaxed       1.625-1.75
  --ds-line-height-loose         2

LETTER SPACING
  --ds-letter-spacing-tighter    -0.05em
  --ds-letter-spacing-tight      -0.02em
  --ds-letter-spacing-normal     0
  --ds-letter-spacing-wide       0.02em
  --ds-letter-spacing-wider      0.05em
  --ds-letter-spacing-widest     0.1em

SEMANTIC CLASSES
  .text-display-1 ... .text-display-3
  .text-heading-1 ... .text-heading-6
  .text-body, .text-body-large, .text-body-small
  .text-label, .text-caption, .text-overline, .text-micro
  .text-quote, .text-code, .text-kbd

UTILITY CLASSES
  .text-truncate, .text-line-clamp-{1-5}
  .text-left, .text-center, .text-right, .text-start, .text-end
  .text-wrap, .text-nowrap, .text-balance, .text-pretty
  .text-bold, .text-italic, .text-muted, .text-accent
  .text-success, .text-warning, .text-danger, .text-info
  .uppercase, .lowercase, .capitalize, .normal-case
  .underline, .line-through, .no-underline
  .text-gradient, .text-outline
  .text-tabular, .text-oldstyle, .text-smallcaps
  .break-words, .break-all, .hyphens-auto
  .select-none, .select-text, .select-all

PROSE
  .prose, .prose-sm, .prose-lg, .prose-xl
```

---

*This chapter defines the complete typographic vocabulary for a Design System. Every item above should have a corresponding token, class, or component in the implemented DS.*
