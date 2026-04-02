# Blueprint DS Semantic Classes Registry

Quick reference for the **token-driven** `ui-*`, `text-*`, and helper classes used across the app.

**Goal**: predictable UI, no hardcoded values, and pages acting as consumers.

## Sources of truth

- DS CSS layers (the real SOT):
  - `src/ds/styles/ds.tokens.css` (tokens + theme overrides)
  - `src/ds/styles/ds.utilities.css` (layout/util utilities)
  - `src/ds/styles/ds.layouts.css` (shell layout utilities)
  - `src/ds/styles/ds.components.css` (component classes)
  - `src/ds/styles/ds.patterns.css` (multi-component patterns)
  - `src/ds/styles/ds.overrides.css` (highest-priority override escape hatch)
- TS registry: `src/ds/foundation/semantics/registry.ts`
- Entry wiring: `src/app/globals.css` imports `src/ds/styles/index.css`

## Rules

- Prefer DS components via `@/ds` over raw class composition.
- Avoid hardcoded values in app code.
- Theme is controlled by `theme-*` class on `<html>` via `ThemeInitScript`.
- Use `data-platform`, `data-density`, `data-visual` knobs on wrappers when needed.

---

## Layout Utilities (ds.utilities.css)

| Class | Purpose |
|---|---|
| `.ui-page` | Full-height flex column wrapper |
| `.ui-page-main` | `flex: 1` main area |
| `.ui-page--dashboard` | Edge-to-edge dashboard variant |
| `.ui-band` | Full-width band |
| `.ui-band--surface` | Band with surface background + border |
| `.ui-theme-scope` | Paints a scoped theme wrapper with its own background + text color |
| `.ui-sticky-top` | Sticky header positioning |
| `.ui-container` | Width-constrained centered container |
| `.ui-container--narrow` / `--wide` / `--xl` / `--full` | Container width variants |
| `.ui-section` / `--sm` / `--lg` | Section vertical padding |
| `.ui-stack` / `--tight` / `--compact` / `--loose` / `--spacious` | Vertical flex with gap |
| `.ui-stack--row` | Horizontal stack direction |
| `.ui-row` / `--between` / `--center` / `--end` / `--nowrap` | Horizontal flex with gap |
| `.ui-grid` / `--2` / `--3` / `--4` / `--auto` | CSS grid columns |
| `.ui-grid--gap-tight` / `--gap-compact` / `--gap-loose` / `--gap-spacious` | Grid gap variants |
| `.ui-split` / `--reverse` | Asymmetric 2-column |
| `.ui-center` | Margin-inline auto |
| `.ui-hero` | Hero section with min-height grid |
| `.ui-hero__actions` | Hero action row |
| `.ui-flex-1` | `flex: 1` |
| `.ui-min-w-0` | `min-width: 0` |
| `.min-h-hero` | Minimum hero height |
| `.min-h-viewport-minus-header` | Viewport height minus header |

## Shell Layout Utilities (ds.utilities.css + ds.layouts.css)

| Class | Purpose |
|---|---|
| `.ui-shell-grid` / `--sidebar` | Shell grid layout |
| `.ui-shell-grid--left` / `--right` / `--both` | Dashboard shell grid templates |
| `.ui-shell-grid--left-collapsed` / `--right-collapsed` | Collapsed sidebar variants |
| `.ui-shell-aside` | Shell aside element |
| `.ui-shell-content` | Shell content area |
| `.ui-shell-content--pad-bottom-nav` | Content padding for bottom nav |
| `.ui-sidebar` / `.ui-rightbar` | Sticky sidebar/rightbar |
| `.ui-sidebar-nav` / `__title` | Sidebar navigation |
| `.ui-docs-shell` | Docs shell layout |
| `.ui-docs-nav` / `.ui-docs-navlist` | Docs navigation |
| `.ui-footer-grid` | Footer grid layout |
| `.ui-footer-links` | Footer link list |
| `.ui-search` | Search input sizing |
| `.ui-header-pad` | Header padding |

## Typography (ds.utilities.css)

| Class | Purpose |
|---|---|
| `.text-display-1` / `-2` / `-3` | Display text (fluid, balanced) |
| `.text-heading-1` through `-6` | Heading hierarchy |
| `.text-body` / `-large` / `-small` | Body text sizes |
| `.text-label` | Label text |
| `.text-caption` / `.text-micro` | Small text |
| `.text-overline` | Overline text (uppercase, tracked) |
| `.text-quote` | Blockquote text |
| `.text-code` / `.text-kbd` | Code/keyboard text |
| `.ui-kicker` | Kicker text |
| `.ui-lede` | Lead paragraph |

## Text Color

| Class | Purpose |
|---|---|
| `.text-muted` / `.ui-text-muted` | Muted foreground |
| `.text-accent` / `.text-success` / `.text-warning` / `.text-danger` / `.text-info` | Semantic colors |
| `.text-inherit` | Inherit color |
| `.text-on-primary` | Text on accent backgrounds |

## Text Utilities

| Class | Purpose |
|---|---|
| `.text-truncate` | Single-line ellipsis |
| `.text-line-clamp-1` through `-5` | Multi-line clamp |
| `.text-start` / `.text-center` / `.text-end` | Text alignment |
| `.ui-text-center` | Centered text utility |
| `.text-nowrap` / `.text-balance` / `.text-pretty` | Wrapping control |
| `.break-words` / `.break-all` / `.hyphens-auto` | Overflow control |
| `.underline` / `.overline` / `.line-through` / `.no-underline` | Decoration |
| `.underline-offset-2` / `.underline-offset-4` | Underline offset |
| `.decoration-accent` / `.decoration-wavy` / `.decoration-2` | Decoration style |
| `.uppercase` / `.lowercase` / `.capitalize` / `.normal-case` | Transform |
| `.italic` / `.not-italic` | Font style |
| `.select-none` / `.select-text` / `.select-all` | User select |
| `.text-tabular` / `.text-oldstyle` / `.text-smallcaps` / `.text-ordinal` | OpenType features |
| `.text-gradient` / `.text-gradient-animated` / `.text-outline` | Decorative text |

## Prose

| Class | Purpose |
|---|---|
| `.prose` | Rich text styling for all descendant elements |
| `.prose-sm` / `.prose-lg` / `.prose-xl` | Size variants |

## Background Color

| Class | Purpose |
|---|---|
| `.bg-surface` / `.bg-surface-elevated` / `.bg-surface-sunken` | Surface backgrounds |
| `.bg-accent` / `.bg-success` / `.bg-warning` / `.bg-danger` / `.bg-info` | Semantic backgrounds |
| `.bg-overlay` | Overlay backdrop |

## Elevation

| Class | Purpose |
|---|---|
| `.shadow-none` / `.shadow-xs` / `.shadow-sm` / `.shadow-md` / `.shadow-lg` / `.shadow-xl` / `.shadow-2xl` | Shadow scale |
| `.shadow-inner` | Inset shadow |
| `.glass` | Glass morphism effect |

## Border / Radius

| Class | Purpose |
|---|---|
| `.border` / `.border-2` / `.border-4` | Border width |
| `.border-t` / `.border-b` / `.border-l` / `.border-r` | Directional borders |
| `.border-color-default` / `--accent` / `--danger` | Border colors |
| `.rounded-none` / `.rounded-xs` / `.rounded-sm` / `.rounded` / `.rounded-md` / `.rounded-lg` / `.rounded-xl` / `.rounded-2xl` / `.rounded-full` | Border radius scale |
| `.ring-1` / `.ring-2` / `.ring-4` | Focus ring |
| `.divide-y` / `.divide-x` | Child dividers |

## Motion

| Class | Purpose |
|---|---|
| `.transition-colors` / `-transform` / `-opacity` / `-all` | Transitions |
| `.duration-fast` / `-normal` / `-slow` | Duration overrides |
| `.animate-fade-in` / `-slide-up` / `-slide-down` / `-scale-in` | Enter animations |
| `.animate-fade-out` / `-scale-out` | Exit animations |
| `.animate-spin` / `-pulse` / `-ping` / `-bounce` | Looping animations |

## Interactive State

| Class | Purpose |
|---|---|
| `.ui-focus-ring` | Focus-visible ring |
| `.ui-disabled` | Disabled state (opacity + no pointer) |
| `.ui-loading` | Loading state |
| `.ui-skip-link` | Skip navigation link |
| `.ui-touch-target` | Minimum touch target size |

## Accessibility

| Class | Purpose |
|---|---|
| `.sr-only` / `.ui-sr-only` / `.ui-visually-hidden` | Screen-reader only |
| `.ui-live-polite` / `.ui-live-assertive` | ARIA live regions |

## Responsive Visibility

| Class | Purpose |
|---|---|
| `.ui-only-mobile` / `.ui-only-desktop` / `.ui-only-tablet` | Responsive show/hide |
| `.ui-only-mobile-block` / `.ui-only-desktop-block` | Block-level variants |
| `.ui-container-query` | Container query parent |

## Preview / Device

| Class | Purpose |
|---|---|
| `.ui-device-frame` / `__viewport` | Device preview frame |
| `.ui-preview-panel` | Preview panel |

---

## Component Classes (ds.components.css)

### Button

| Class | Purpose |
|---|---|
| `.ui-button` | Base button |
| `.ui-button--sm` / `--md` / `--lg` | Size variants |
| `.ui-button--primary` / `--secondary` / `--ghost` / `--text` / `--icon` / `--fab` | Variant modifiers |
| `.ui-button--loading` | Loading state |
| `.ui-button--tone-danger` / `--tone-success` | Tone modifiers |

### Input / Textarea / Select

| Class | Purpose |
|---|---|
| `.ui-input` / `.ui-input--sm` / `--lg` / `--error` | Text input + variants |
| `.ui-input-wrap` / `--error` | Input wrapper with slots |
| `.ui-input-wrap__slot` | Slot element (startSlot/endSlot) |
| `.ui-textarea` / `.ui-textarea--sm` / `--lg` / `--error` / `--auto` | Textarea + variants |
| `.ui-select` / `.ui-select__control` / `.ui-select__chevron` | Select wrapper |
| `.ui-select--sm` / `--lg` / `--error` | Select size/error variants |

### Checkbox / Radio / Switch

| Class | Purpose |
|---|---|
| `.ui-check` / `.ui-check--disabled` / `__control` / `__box` | Checkbox |
| `.ui-radio` / `.ui-radio--disabled` / `__control` / `__dot` / `__text` | Radio |
| `.ui-switch-row` / `.ui-switch` / `__thumb` / `--on` | Toggle switch |

### Avatar

| Class | Purpose |
|---|---|
| `.ui-avatar` / `--rounded` | Avatar base |
| `.ui-avatar--xs` / `--sm` / `--md` / `--lg` / `--xl` / `--2xl` / `--3xl` | Size variants |
| `.ui-avatar__img` / `__fallback` | Image + fallback |
| `.ui-avatar__status` / `--online` / `--busy` / `--away` / `--offline` | Status dot overlay |
| `.ui-avatars` / `__item` | Avatar group |

### Spinner

| Class | Purpose |
|---|---|
| `.ui-spinner` / `--sm` / `--md` / `--lg` | Spinner sizes |
| `.ui-spinner__svg` / `__track` / `__head` | SVG parts |

### Card

| Class | Purpose |
|---|---|
| `.ui-card` / `--compact` | Card base |
| `.ui-card--interactive` | Hover-lift card |
| `.ui-card--selectable` | Selectable card |
| `.ui-image-card` / `__media` / `__body` / `__title` | Image card |
| `.ui-icon-card__link` / `__row` / `__icon` | Icon card |

### Badge

| Class | Purpose |
|---|---|
| `.ui-badge` | Base badge |
| `.ui-badge--neutral` / `--accent` / `--success` / `--warning` / `--danger` / `--info` | Tone |
| `.ui-badge--sm` | Small size |
| `.ui-badge--dot` / `__dot` / `--count` / `--tag` | Shape variants |
| `.ui-badge__remove` | Removable badge button |

### Icon

| Class | Purpose |
|---|---|
| `.ui-icon` / `--xs` / `--sm` / `--md` / `--lg` / `--xl` / `--2xl` / `--3xl` | Icon sizes |
| `.ui-icon--muted` / `--accent` / `--success` / `--warning` / `--danger` / `--on-accent` | Icon tones |

### Spacer / Divider

| Class | Purpose |
|---|---|
| `.ui-spacer` / `--1` through `--9` | Vertical spacing |
| `.ui-divider` / `--vertical` | Divider element |

### Alert

| Class | Purpose |
|---|---|
| `.ui-alert` | Base alert |
| `.ui-alert__icon` / `__content` / `__title` / `__body` | Alert anatomy |
| `.ui-alert--neutral` / `--success` / `--warning` / `--danger` / `--info` | Tone variants |
| `.ui-alert__dismiss` / `__action` | Dismiss button + action slot |
| `.ui-alert--left-accent` / `--top-accent` / `--subtle` | Border style variants (combinable with tone) |

### Banner

| Class | Purpose |
|---|---|
| `.ui-banner` / `__title` | Banner base |
| `.ui-banner--success` / `--warning` / `--danger` / `--info` | Tone variants |
| `.ui-banner__icon` / `__dismiss` | Icon slot + dismiss button |

### Toast

| Class | Purpose |
|---|---|
| `.ui-toast-region` | Toast container region |
| `.ui-toast` / `__content` / `__title` / `__desc` / `__close` | Toast anatomy |
| `.ui-toast--success` / `--warning` / `--danger` / `--info` | Tone variants |

### Status

| Class | Purpose |
|---|---|
| `.ui-status` / `__dot` | Status indicator |
| `.ui-status--pending` / `--disabled` / `--active` | State variants |
| `.ui-status--online` / `--busy` / `--away` / `--offline` | Presence variants |
| `.ui-status--badge` / `--label` | Display variants |
| `.ui-statusbtn` / `__dot` / `--pending` / `--disabled` | Status button |

### Progress

| Class | Purpose |
|---|---|
| `.ui-progress` / `__bar` | Progress bar |
| `.ui-progress--thin` / `--thick` | Size variants |
| `.ui-progress--indeterminate` | Animated indeterminate |
| `.ui-progress--success` / `--danger` / `--warning` | Color variants |
| `.ui-progress__label` | Percent label |

### Skeleton

| Class | Purpose |
|---|---|
| `.ui-skeleton` / `__line` / `__block` | Skeleton loading |
| `.ui-skeleton--circle` / `--rect` / `--image` | Shape variants |
| `.ui-skeleton--pulse` | Pulse animation (vs shimmer default) |

### Empty State

| Class | Purpose |
|---|---|
| `.ui-empty` / `__icon` / `__actions` | Empty state display |

### Error

| Class | Purpose |
|---|---|
| `.ui-error-page` / `__heading` / `__description` | Error page fallback |
| `.ui-errorsum` / `__list` | Error summary |

### Modal

| Class | Purpose |
|---|---|
| `.ui-modal` | Modal overlay |
| `.ui-modal__panel` / `--sm` / `--lg` / `--xl` / `--full` | Panel size variants |
| `.ui-modal__header` / `__body` | Modal anatomy |
| `.ui-modal[data-variant='bottom-sheet']` | Bottom sheet variant |

### Drawer

| Class | Purpose |
|---|---|
| `.ui-drawer` / `__panel` | Drawer overlay |
| `.ui-drawer[data-side='bottom']` / `[data-side='left']` / `[data-side='right']` | Direction variants |

### Popover / Tooltip

| Class | Purpose |
|---|---|
| `.ui-popover__panel` | Popover panel |
| `.ui-tooltip` / `__anchor` / `__bubble` | Tooltip anatomy |

### Dropdown / Context Menu

| Class | Purpose |
|---|---|
| `.ui-menu` / `__anchor` / `__panel` / `__item` | Dropdown menu |
| `.ui-cmhost` / `.ui-cm` / `__item` | Context menu |

### Tabs

| Class | Purpose |
|---|---|
| `.ui-tabs` / `__list` / `__trigger` / `__panel` | Tabs base |
| `.ui-tabs__trigger--active` / `__panel--hidden` | State classes |
| `.ui-tabs--pill` | Pill variant (background toggle) |
| `.ui-tabs--boxed` | Boxed variant (bordered segments) |

### Segmented Control

| Class | Purpose |
|---|---|
| `.ui-segmented` | Segmented control wrapper |
| `.ui-segmented__item` / `--active` | Segment items |

### Command Palette

| Class | Purpose |
|---|---|
| `.ui-command__backdrop` / `.ui-command` | Command palette overlay |
| `.ui-command__search` / `__list` / `__group` | Structure |
| `.ui-command__item` / `--active` | Item + active state |
| `.ui-command__label` / `__shortcut` / `__empty` | Item parts |

### Mega Menu

| Class | Purpose |
|---|---|
| `.ui-mega` / `--cols-2` / `--cols-3` / `--cols-4` | Mega menu grid |
| `.ui-mega__heading` / `__list` / `__link` | Menu anatomy |

### Stepper Nav

| Class | Purpose |
|---|---|
| `.ui-stepper-nav` / `--vertical` | Stepper navigation |
| `.ui-stepper-nav__step` / `__indicator` / `__dot` | Step anatomy |
| `.ui-stepper-nav__step--complete` / `--current` | Step states |

### Lightbox

| Class | Purpose |
|---|---|
| `.ui-lightbox` / `__backdrop` / `__content` / `__img` | Lightbox overlay |
| `.ui-lightbox__controls` / `__nav` / `__close` | Navigation controls |

### Notification Panel

| Class | Purpose |
|---|---|
| `.ui-notif-panel` / `__header` / `__list` | Panel structure |
| `.ui-notif-panel__filter` / `--active` | Filter tabs |
| `.ui-notif-panel__action` | Header action (mark all read) |
| `.ui-notif-panel__item` / `--unread` / `__dot` / `__mark` | Notification items |
| `.ui-notif-panel__empty` | Empty state |

### Navigation

| Class | Purpose |
|---|---|
| `.ui-appbar` / `__inner` / `__leading` / `__actions` / `__title` | App bar |
| `.ui-breadcrumbs__list` / `__link` / `__sep` | Breadcrumbs |
| `.ui-bottom-nav` / `__inner` / `__item` / `--active` / `__icon` / `__label` | Bottom nav |
| `.ui-pagination` / `__pages` / `__ellipsis` / `__size` | Pagination |
| `.ui-scrolltop` | Scroll to top button |
| `.ui-navlink` | Navigation link |

### Accordion

| Class | Purpose |
|---|---|
| `.ui-accordion` / `__item` / `__trigger` / `__chev` / `__content` | Accordion anatomy |
| `.ui-accordion__item[data-open='true']` | Open state |

### Data Table

| Class | Purpose |
|---|---|
| `.ui-table` / `__table` / `__caption` / `__head` / `__th` / `__td` | Table anatomy |
| `.ui-table__th--center` / `--end` / `--shrink` | Column alignment |
| `.ui-table__td--center` / `--end` / `--shrink` | Cell alignment |
| `.ui-table__tr` / `--selected` / `__check` / `__empty` | Row states |
| `.ui-table__sort` / `__sorticon` / `--active` | Sort controls |
| `.ui-table--sticky` | Sticky header variant |

### Forms

| Class | Purpose |
|---|---|
| `.ui-field` / `__required` / `__footer` / `__count` | Field wrapper |
| `.ui-form-group` / `.ui-form-actions` / `--start` / `--between` | Form layout |
| `.ui-label` / `.ui-helper` / `.ui-error` | Field labels/messages |
| `.ui-fieldset` / `__legend` / `__body` | Fieldset |
| `.ui-ac` / `__panel` / `__opt` / `--active` / `__empty` | Autocomplete |
| `.ui-drop` / `--drag` / `__input` / `__header` | File dropzone |
| `.ui-tags` / `__row` / `__tag` / `__x` | Tag input |

### Other Components

| Class | Purpose |
|---|---|
| `.ui-list` / `__item` / `__leading` / `__trailing` / `__content` | List |
| `.ui-range` / `__label` / `__control` / `--disabled` | Range slider |
| `.ui-img` / `__el` / `--square` / `--video` | Responsive image |
| `.ui-carousel` / `__controls` / `__track` / `__item` | Carousel |
| `.ui-spark` / `__line` | Sparkline |
| `.ui-timeline` / `__item` / `__rail` / `__dot` / `__icon` | Timeline |
| `.ui-timeline--center` / `--horizontal` | Timeline layout variants |
| `.ui-metric__value` / `__delta` / `__trend--up` / `--down` / `--flat` / `__sparkline` | Metric card |
| `.ui-stepper` / `__step` / `__dot` / `__step--complete` / `__step--current` | Stepper |
| `.ui-chart` / `__line` / `__bar` / `__slice` / `__donut` | Chart |
| `.ui-md` / `__preview` | Markdown editor |
| `.ui-video` | Video player |
| `.ui-cookie` / `__inner` | Cookie consent |
| `.ui-bulk` / `__left` / `__right` | Bulk actions toolbar |
| `.ui-footer` / `__links` | Footer |
| `.ui-perm` | Permission gate |

### Surfaces (runtime)

| Class | Purpose |
|---|---|
| `.ui-screen` | Mobile screen |
| `.ui-overlay` | Mobile overlay |
| `.ui-sheet` / `__backdrop` / `__title` / `__body` | Bottom sheet |
| `.ui-fab` | Floating action button |
| `.ui-siderail` | Tablet side rail |
| `.ui-bgfx` | Background effects |
| `.ui-glow` / `--sm` / `--lg` | Glow effect |
| `.ui-noise` / `--medium` | Noise overlay |

### Widgets

| Class | Purpose |
|---|---|
| `.ui-widget` / `__head` / `__titles` / `__title` / `__subtitle` / `__actions` / `__body` / `__footer` | Widget shell |
| `.ui-stat` / `__icon` / `__label` | Stat widget |
| `.ui-widget-list` / `__row` / `__main` / `__secondary` / `__trail` | List widget |
| `.ui-media-widget` / `__media` / `__body` / `__desc` / `__actions` | Media widget |

### Preview

| Class | Purpose |
|---|---|
| `.ui-swatch-grid` / `-tile` / `-chip` / `-meta` | Token swatch preview |
