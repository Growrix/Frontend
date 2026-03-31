# 04 — Motion & Animation

> Everything a Design System must define for motion control. This chapter covers easing curves, duration scales, enter/exit transitions, spring physics, keyframe animations, scroll-driven animations, view transitions, layout animations, stagger patterns, reduced motion, and performance guidelines.

---

## Table of Contents

1. [Motion Principles](#1-motion-principles)
2. [Duration Scale](#2-duration-scale)
3. [Easing Curves](#3-easing-curves)
4. [CSS Transitions](#4-css-transitions)
5. [Enter & Exit Animations](#5-enter--exit-animations)
6. [Keyframe Animations](#6-keyframe-animations)
7. [Spring Physics](#7-spring-physics)
8. [Scroll-Driven Animations](#8-scroll-driven-animations)
9. [View Transitions API](#9-view-transitions-api)
10. [Layout Animations](#10-layout-animations)
11. [Stagger & Orchestration](#11-stagger--orchestration)
12. [Micro-Interactions](#12-micro-interactions)
13. [Loading & Skeleton Animations](#13-loading--skeleton-animations)
14. [Parallax & Depth](#14-parallax--depth)
15. [Text & Number Animations](#15-text--number-animations)
16. [Attention & Notification](#16-attention--notification)
17. [Reduced Motion & Accessibility](#17-reduced-motion--accessibility)
18. [Performance Guidelines](#18-performance-guidelines)
19. [Motion Utility Classes](#19-motion-utility-classes)
20. [Motion Tokens Summary](#20-motion-tokens-summary)

---

## 1. Motion Principles

### 1.1 Why Motion Matters

- **Feedback**: Confirms user actions (button press, form submit).
- **Orientation**: Shows where elements came from and where they're going.
- **Focus**: Draws attention to important changes.
- **Continuity**: Creates sense of spatial relationship between views.
- **Delight**: Adds personality and polish (used sparingly).

### 1.2 Core Rules

1. **Purposeful, not decorative** — every animation must have a reason.
2. **Fast by default** — most transitions should be 100–300ms.
3. **Invisible when right** — users should not notice good animation, only bad.
4. **Physics-based** — real-world motion uses acceleration and deceleration.
5. **Interruptible** — animations should not block user interaction.
6. **Respectful** — honor `prefers-reduced-motion`.

### 1.3 Motion Categories

| Category | Duration | Purpose |
|----------|----------|---------|
| **Micro** | 50–150ms | Button states, toggle switches, icon morphs |
| **Feedback** | 100–250ms | Form validation, hover effects |
| **Transition** | 200–400ms | Page transitions, modal open/close, drawer slide |
| **Emphasis** | 300–600ms | Attention-grabbing pulses, entrance animations |
| **Narrative** | 500ms–2s | Onboarding flows, complex illustrations, hero entrances |

---

## 2. Duration Scale

### 2.1 Required Tokens

| Token | Value | Category | Use Case |
|-------|-------|----------|----------|
| `--ds-duration-instant` | 0ms | None | Disable animation |
| `--ds-duration-fastest` | 50ms | Micro | Checkbox check, toggle snap |
| `--ds-duration-fast` | 100–120ms | Micro | Button hover, focus ring, icon swap |
| `--ds-duration-normal` | 200ms | Feedback | Show tooltip, expand accordion, fade in content |
| `--ds-duration-moderate` | 300ms | Transition | Modal open, drawer slide, panel resize |
| `--ds-duration-slow` | 400ms | Transition | Page transitions, complex layout shifts |
| `--ds-duration-slower` | 500ms | Emphasis | Card entrance, stagger delays |
| `--ds-duration-slowest` | 700ms–1s | Narrative | Hero animation, onboarding steps |

### 2.2 Duration Rules

- **Hover/focus**: 100–150ms (users expect instant feedback).
- **Open/show**: 200–300ms (needs to feel snappy, not sluggish).
- **Close/hide**: 150–200ms (closing should feel faster than opening).
- **Page transition**: 300–500ms.
- **Never exceed 1s** for UI transitions — anything longer feels broken.
- Objects traveling **long distances** need longer durations than short-distance moves.
- **Smaller elements** animate faster; **larger elements** animate slower.

---

## 3. Easing Curves

### 3.1 Required Easings

| Token | Value | Description | Use Case |
|-------|-------|-------------|----------|
| `--ds-ease-linear` | `linear` | Constant speed | Progress bars, loading indicators |
| `--ds-ease-standard` | `cubic-bezier(0.4, 0, 0.2, 1)` | Subtle deceleration | **Default** — most transitions |
| `--ds-ease-in` | `cubic-bezier(0.4, 0, 1, 1)` | Accelerates | Elements exiting the viewport |
| `--ds-ease-out` | `cubic-bezier(0, 0, 0.2, 1)` | Decelerates | Elements entering the viewport |
| `--ds-ease-in-out` | `cubic-bezier(0.4, 0, 0.2, 1)` | Symmetrical | Elements that move on-screen |
| `--ds-ease-bounce` | `cubic-bezier(0.34, 1.56, 0.64, 1)` | Overshoot + settle | Playful UI: notifications, badges, pop-ins |
| `--ds-ease-spring` | `cubic-bezier(0.22, 1.5, 0.36, 1)` | Spring-like overshoot | Modals, drawers, sheets |
| `--ds-ease-elastic` | `cubic-bezier(0.68, -0.55, 0.27, 1.55)` | Strong overshoot | Attention-grabbing, error shake |
| `--ds-ease-snap` | `cubic-bezier(0, 0.7, 0.3, 1)` | Quick start, smooth end | Toggle switches, snapping UI |
| `--ds-ease-emphasized` | `cubic-bezier(0.2, 0, 0, 1)` | Material 3 emphasized | Primary transitions, hero entrances |

### 3.2 CSS `linear()` for Custom Curves

For complex easing not possible with cubic-bezier:

```css
--ds-ease-spring-css: linear(
  0, 0.006, 0.025, 0.057, 0.1, 0.152, 0.212, 0.278, 0.349, 0.423,
  0.5, 0.577, 0.651, 0.722, 0.788, 0.848, 0.900, 0.943, 0.975,
  0.994, 1.001, 0.998, 0.994, 0.997, 0.999, 1
);
```

### 3.3 Which Easing Where

| Scenario | Easing |
|----------|--------|
| Enter / appear | `ease-out` (decelerate into position) |
| Exit / disappear | `ease-in` (accelerate away) |
| Move on-screen | `ease-in-out` or `standard` |
| Hover effect | `ease-out` (fast response) |
| Bounce/pop | `ease-bounce` or `ease-spring` |
| Linear progress | `linear` |

---

## 4. CSS Transitions

### 4.1 Transition Pattern

```css
.element {
  transition-property: background-color, border-color, color, box-shadow, opacity, transform;
  transition-duration: var(--ds-duration-normal);
  transition-timing-function: var(--ds-ease-standard);
}
```

### 4.2 Best Practices

- **Specify properties explicitly** — never use `transition: all`. It transitions everything including layout properties, causing jank.
- **Safe properties** to transition: `opacity`, `transform`, `color`, `background-color`, `border-color`, `box-shadow`, `filter`, `clip-path`.
- **Avoid transitioning**: `width`, `height`, `margin`, `padding`, `top/left/right/bottom` — these trigger layout recalculation.
- Use `transform` instead: `translate()` for movement, `scale()` for resizing.
- `will-change` for elements that will definitely animate (use sparingly — it uses GPU memory).

### 4.3 Transition Starting Styles (New)

For animating from `display: none`:

```css
dialog {
  transition: opacity 300ms, display 300ms allow-discrete;
  opacity: 0;
}

dialog[open] {
  opacity: 1;
}

@starting-style {
  dialog[open] {
    opacity: 0;
  }
}
```

---

## 5. Enter & Exit Animations

### 5.1 Enter Patterns

| Pattern | Properties | Use Case |
|---------|-----------|----------|
| **Fade In** | `opacity: 0 → 1` | Default for most appearances |
| **Fade Up** | `opacity: 0 → 1, translateY(8px → 0)` | Lists, cards, content sections |
| **Fade Down** | `opacity: 0 → 1, translateY(−8px → 0)` | Dropdowns, menus |
| **Fade Left** | `opacity: 0 → 1, translateX(16px → 0)` | Side panels, slide-in |
| **Fade Right** | `opacity: 0 → 1, translateX(−16px → 0)` | Back navigation |
| **Scale Up** | `opacity: 0 → 1, scale(0.95 → 1)` | Modals, dialogs, popovers |
| **Scale Down** | `opacity: 0 → 1, scale(1.05 → 1)` | Alerts, emphasis |
| **Slide Up** | `translateY(100% → 0)` | Bottom sheets, mobile panels |
| **Slide Right** | `translateX(−100% → 0)` | Drawers, side panels |
| **Flip** | `rotateY(90deg → 0)` | Card flips, toggle states |
| **Expand** | `scaleY(0 → 1), height(0 → auto)` | Accordion, collapsible sections |

### 5.2 Exit Patterns

Exits are the **reverse** of enters, with faster duration (80% of enter duration) and `ease-in`:

| Pattern | Properties |
|---------|-----------|
| **Fade Out** | `opacity: 1 → 0` |
| **Fade Down** | `opacity: 1 → 0, translateY(0 → 8px)` |
| **Scale Down** | `opacity: 1 → 0, scale(1 → 0.95)` |
| **Slide Down** | `translateY(0 → 100%)` |
| **Collapse** | `height → 0, scaleY(1 → 0)` |

### 5.3 Keyframe Definitions

```css
@keyframes fade-in {
  from { opacity: 0; }
  to   { opacity: 1; }
}

@keyframes fade-up {
  from { opacity: 0; transform: translateY(8px); }
  to   { opacity: 1; transform: translateY(0); }
}

@keyframes scale-in {
  from { opacity: 0; transform: scale(0.95); }
  to   { opacity: 1; transform: scale(1); }
}

@keyframes slide-up {
  from { transform: translateY(100%); }
  to   { transform: translateY(0); }
}

@keyframes expand {
  from { opacity: 0; transform: scaleY(0); }
  to   { opacity: 1; transform: scaleY(1); }
}
```

---

## 6. Keyframe Animations

### 6.1 Utility Animations

Beyond enter/exit, a DS needs these reusable keyframes:

| Animation | Use Case |
|-----------|----------|
| `spin` | Loading spinners, refresh icons |
| `pulse` | Skeleton loading, "live" indicator |
| `ping` | Notification dot attention |
| `bounce` | Scroll-down indicator, CTA arrow |
| `shake` | Error validation, incorrect input |
| `wiggle` | Attention-grabbing icons |
| `float` | Floating elements, hero decorations |
| `breathe` | Glow effects, ambient backgrounds |

### 6.2 Keyframe Definitions

```css
@keyframes spin {
  to { transform: rotate(360deg); }
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50%      { opacity: 0.5; }
}

@keyframes ping {
  75%, 100% { transform: scale(2); opacity: 0; }
}

@keyframes bounce {
  0%, 100% { transform: translateY(0); }
  50%      { transform: translateY(-25%); }
}

@keyframes shake {
  0%, 100% { transform: translateX(0); }
  10%, 30%, 50%, 70%, 90% { transform: translateX(-4px); }
  20%, 40%, 60%, 80%      { transform: translateX(4px); }
}

@keyframes wiggle {
  0%, 100% { transform: rotate(0deg); }
  25%      { transform: rotate(-5deg); }
  75%      { transform: rotate(5deg); }
}

@keyframes float {
  0%, 100% { transform: translateY(0); }
  50%      { transform: translateY(-10px); }
}

@keyframes breathe {
  0%, 100% { opacity: 0.6; }
  50%      { opacity: 1; }
}
```

---

## 7. Spring Physics

### 7.1 What Springs Provide

Springs feel natural because they model real-world inertia: overshoot, settle, damping.

### 7.2 Spring Parameters

| Parameter | Range | Effect |
|-----------|-------|--------|
| **Stiffness** | 100–500 | Higher = faster, snappier |
| **Damping** | 10–40 | Higher = less bounce/overshoot |
| **Mass** | 0.5–3 | Higher = heavier, slower response |

### 7.3 Common Presets

| Preset | Stiffness | Damping | Mass | Feel |
|--------|-----------|---------|------|------|
| **Gentle** | 120 | 14 | 1 | Soft, dreamy |
| **Default** | 170 | 26 | 1 | Natural, balanced |
| **Wobbly** | 180 | 12 | 1 | Bouncy, playful |
| **Stiff** | 300 | 30 | 1 | Quick, professional |
| **Snappy** | 400 | 35 | 1 | Instant, precise |
| **Molasses** | 120 | 40 | 3 | Heavy, deliberate |

### 7.4 CSS Spring Approximation

Cubic-bezier can approximate spring behavior:

```css
/* Gentle spring (slight overshoot) */
--ds-ease-spring-gentle: cubic-bezier(0.22, 1.2, 0.36, 1);

/* Stiff spring (minimal overshoot) */
--ds-ease-spring-stiff: cubic-bezier(0.34, 1.1, 0.64, 1);

/* Bouncy spring (visible overshoot) */
--ds-ease-spring-bouncy: cubic-bezier(0.34, 1.56, 0.64, 1);
```

For true spring physics, use `linear()` easing or a JavaScript animation library (Framer Motion, Motion One).

### 7.5 When to Use Springs

| Scenario | Spring Preset |
|----------|--------------|
| Modal entrance | Default or Stiff |
| Drawer slide | Default |
| Button press | Snappy |
| Toggle switch | Wobbly or Default |
| Drag-and-drop settle | Default |
| Page transition | Gentle or Default |

---

## 8. Scroll-Driven Animations

### 8.1 What They Are

Animations tied to scroll position instead of time. The scroll progress (0–100%) maps to the animation progress (0–100%).

### 8.2 CSS Scroll Timeline

```css
@keyframes parallax-up {
  from { transform: translateY(50px); opacity: 0; }
  to   { transform: translateY(0);    opacity: 1; }
}

.reveal-on-scroll {
  animation: parallax-up linear both;
  animation-timeline: view();
  animation-range: entry 0% entry 100%;
}
```

### 8.3 Scroll Progress Indicator

```css
.scroll-progress-bar {
  position: fixed;
  top: 0;
  left: 0;
  height: 3px;
  background: var(--ds-color-accent);
  transform-origin: left;
  animation: grow-x linear both;
  animation-timeline: scroll();
}

@keyframes grow-x {
  from { transform: scaleX(0); }
  to   { transform: scaleX(1); }
}
```

### 8.4 Common Scroll-Driven Patterns

| Pattern | Trigger | Effect |
|---------|---------|--------|
| **Reveal on scroll** | Element enters viewport | Fade up + translate |
| **Parallax** | Scroll position | Different layers move at different speeds |
| **Progress bar** | Page scroll % | Bar width grows |
| **Sticky header shrink** | Scroll past threshold | Header shrinks, opacity changes |
| **Image zoom** | Element in viewport | Subtle scale increase |
| **Number counter** | Element enters viewport | Count from 0 to target |
| **Background color shift** | Scroll sections | Background hue changes per section |

---

## 9. View Transitions API

### 9.1 What It Provides

The View Transitions API enables animated transitions between DOM states (page navigation, content updates) with crossfade, morph, and shared-element animations.

### 9.2 Basic Usage

```css
/* Default crossfade */
::view-transition-old(root) {
  animation: fade-out 250ms var(--ds-ease-standard);
}

::view-transition-new(root) {
  animation: fade-in 250ms var(--ds-ease-standard);
}
```

### 9.3 Shared Element Transitions

```css
.hero-image {
  view-transition-name: hero;
}

::view-transition-old(hero) {
  animation: shrink-out 300ms var(--ds-ease-standard);
}

::view-transition-new(hero) {
  animation: grow-in 300ms var(--ds-ease-standard);
}
```

### 9.4 Use Cases

| Transition | Pattern |
|-----------|---------|
| Page navigation | Crossfade or slide |
| List item → detail page | Shared element expand |
| Tab switching | Slide left/right |
| Card flip | 3D rotate |
| Theme toggle | Circular reveal or crossfade |
| Image gallery | Shared element morph |

---

## 10. Layout Animations

### 10.1 The Challenge

Animating layout properties (`width`, `height`, `grid-template-*`) is expensive. Use these techniques to animate layout changes performantly:

### 10.2 FLIP Technique

**F**irst, **L**ast, **I**nvert, **P**lay:

1. Record element position/size before change (First).
2. Apply DOM change (Last).
3. Calculate delta and apply inverse transform (Invert).
4. Animate from inverted to natural position (Play).

### 10.3 CSS `interpolate-size`

For animating to/from `auto`:

```css
:root {
  interpolate-size: allow-keywords;
}

.collapsible {
  height: 0;
  overflow: hidden;
  transition: height 300ms var(--ds-ease-standard);
}

.collapsible[open] {
  height: auto;
}
```

### 10.4 Grid Animation

```css
.grid-layout {
  transition: grid-template-columns 300ms var(--ds-ease-standard);
}

.grid-layout[data-collapsed] {
  grid-template-columns: 0fr 1fr; /* sidebar collapses */
}
```

---

## 11. Stagger & Orchestration

### 11.1 Staggered Entrance

Children enter one after another with a delay offset:

```css
.stagger > * {
  animation: fade-up var(--ds-duration-normal) var(--ds-ease-out) both;
}

.stagger > *:nth-child(1) { animation-delay: 0ms; }
.stagger > *:nth-child(2) { animation-delay: 50ms; }
.stagger > *:nth-child(3) { animation-delay: 100ms; }
.stagger > *:nth-child(4) { animation-delay: 150ms; }
.stagger > *:nth-child(5) { animation-delay: 200ms; }
/* ... */
```

### 11.2 Stagger Tokens

| Token | Value | Use Case |
|-------|-------|----------|
| `--ds-stagger-fast` | 30ms | Dense lists, fast sequences |
| `--ds-stagger-default` | 50ms | Standard stagger |
| `--ds-stagger-slow` | 80ms | Dramatic reveals |

### 11.3 Dynamic Stagger via CSS Custom Property

```css
.stagger > * {
  animation-delay: calc(var(--i, 0) * var(--ds-stagger-default));
}
```

Set `--i` via inline style or JS: `style="--i: 3"`.

### 11.4 Orchestration Order

When a view enters, animate in this order:
1. Background/surface first (establishes context)
2. Primary content (headline, hero image)
3. Secondary content (body text, descriptions)
4. Actions (buttons, CTAs)
5. Decorative elements last (badges, icons)

---

## 12. Micro-Interactions

### 12.1 Button States

| State | Animation |
|-------|-----------|
| Hover | Background lighten, slight scale(1.02), shadow increase |
| Press | Scale down (0.97), shadow decrease |
| Loading | Content fade out, spinner fade in |
| Success | Checkmark icon morphs in, green flash |

### 12.2 Toggle Switch

```
OFF → ON:  Thumb slides right, track fills with accent color
ON → OFF:  Thumb slides left, track returns to neutral
```

Duration: 200ms, ease-bounce.

### 12.3 Checkbox

```
Unchecked → Checked:  Box border → fill, checkmark draws in (stroke-dasharray animation)
Checked → Unchecked:  Fill fades, checkmark fades
```

### 12.4 Input Focus

```
Unfocused → Focused:  Border color transitions, focus ring fades in, label floats up (if floating label)
```

### 12.5 Card Hover

```
Default → Hover:  Subtle translateY(-2px), shadow increases, border color shifts
```

### 12.6 Ripple Effect (Material-style)

Expanding circle from click point:

```css
@keyframes ripple {
  to { transform: scale(4); opacity: 0; }
}
```

---

## 13. Loading & Skeleton Animations

### 13.1 Spinner

```css
.spinner {
  animation: spin 1s var(--ds-ease-linear) infinite;
}
```

### 13.2 Skeleton Shimmer

```css
@keyframes shimmer {
  from { background-position: -200% 0; }
  to   { background-position: 200% 0; }
}

.skeleton {
  background: linear-gradient(
    90deg,
    var(--ds-color-surface) 25%,
    var(--ds-color-surface-2) 50%,
    var(--ds-color-surface) 75%
  );
  background-size: 200% 100%;
  animation: shimmer 1.5s var(--ds-ease-linear) infinite;
  border-radius: var(--ds-radius-default);
}
```

### 13.3 Pulse Loading

```css
.loading-pulse {
  animation: pulse 2s var(--ds-ease-in-out) infinite;
}
```

### 13.4 Progress Bar

Indeterminate:
```css
@keyframes indeterminate {
  0%   { transform: translateX(-100%); }
  100% { transform: translateX(400%); }
}

.progress-indeterminate::after {
  animation: indeterminate 1.5s var(--ds-ease-standard) infinite;
}
```

### 13.5 Content Loading Patterns

| Pattern | When to Use |
|---------|-------------|
| Spinner (centered) | Full-page or section loading |
| Skeleton screen | Known layout, data loading |
| Progress bar (determinate) | File upload, multi-step |
| Progress bar (indeterminate) | Unknown duration |
| Pulse dots | Inline "typing" indicator |
| Blur-up image | Image loading with LQIP |

---

## 14. Parallax & Depth

### 14.1 CSS Parallax

```css
.parallax-container {
  perspective: 1px;
  height: 100dvh;
  overflow-x: hidden;
  overflow-y: auto;
}

.parallax-slow {
  transform: translateZ(-1px) scale(2);
}

.parallax-fast {
  transform: translateZ(0);
}
```

### 14.2 Depth Layers

| Layer | Speed | Content |
|-------|-------|---------|
| Background | 0.3× | Decorative images, patterns |
| Mid-ground | 0.6× | Supporting content, illustrations |
| Foreground | 1× (normal) | Primary content, text |
| Floating | 1.1× | Interactive elements, CTAs |

### 14.3 Scroll-Driven Parallax (Modern)

```css
.parallax-element {
  animation: move-up linear both;
  animation-timeline: scroll();
}

@keyframes move-up {
  from { transform: translateY(100px); }
  to   { transform: translateY(-100px); }
}
```

---

## 15. Text & Number Animations

### 15.1 Typewriter Effect

Characters appear one at a time:

```css
@keyframes typewriter {
  from { width: 0; }
  to   { width: 100%; }
}

.typewriter {
  overflow: hidden;
  white-space: nowrap;
  border-right: 2px solid var(--ds-color-accent);
  animation: typewriter 2s steps(40) 1s both, blink 0.75s step-end infinite;
}

@keyframes blink {
  50% { border-color: transparent; }
}
```

### 15.2 Counter / Number Roll

Animate a number from 0 to target using CSS `@property`:

```css
@property --num {
  syntax: "<integer>";
  initial-value: 0;
  inherits: false;
}

.counter {
  --num: 0;
  transition: --num 2s var(--ds-ease-out);
  counter-reset: num var(--num);
}

.counter::after {
  content: counter(num);
}

.counter[data-visible] {
  --num: 1234;
}
```

### 15.3 Text Reveal

Words or lines animate in sequentially:

```css
.text-reveal span {
  display: inline-block;
  opacity: 0;
  transform: translateY(100%);
  animation: text-reveal-word 0.5s var(--ds-ease-out) both;
  animation-delay: calc(var(--word-index) * 0.05s);
}

@keyframes text-reveal-word {
  to { opacity: 1; transform: translateY(0); }
}
```

### 15.4 Gradient Hue Shift

Animated background gradient for decorative headings:

```css
.gradient-shift {
  background: linear-gradient(
    90deg,
    var(--ds-palette-brand-400),
    var(--ds-palette-brand-600),
    var(--ds-palette-brand-400)
  );
  background-size: 200% auto;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: gradient-shift 3s linear infinite;
}

@keyframes gradient-shift {
  to { background-position: 200% center; }
}
```

---

## 16. Attention & Notification

### 16.1 Badge Ping

```css
.badge-ping {
  position: relative;
}

.badge-ping::after {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: inherit;
  background: inherit;
  animation: ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite;
}
```

### 16.2 Toast Entrance

```
Toast slides in from top-right:
  translateX(100%) + opacity(0)  →  translateX(0) + opacity(1)

Auto-dismiss:
  After timeout, reverse with ease-in
```

### 16.3 Error Shake

```css
.error-shake {
  animation: shake 0.4s var(--ds-ease-standard);
}
```

### 16.4 Pulse Glow

```css
.pulse-glow {
  animation: pulse-glow 2s var(--ds-ease-in-out) infinite;
}

@keyframes pulse-glow {
  0%, 100% { box-shadow: 0 0 0 0 rgb(var(--ds-color-accent-rgb) / 0.4); }
  50%      { box-shadow: 0 0 0 8px rgb(var(--ds-color-accent-rgb) / 0); }
}
```

---

## 17. Reduced Motion & Accessibility

### 17.1 `prefers-reduced-motion`

Users who experience motion sickness or vestibular disorders can request reduced motion:

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

### 17.2 What to Reduce vs Remove

| Keep (reduced) | Remove entirely |
|----------------|----------------|
| Opacity fades (but faster) | Parallax |
| Color transitions | Scroll-driven animation |
| Focus ring transitions | Auto-play animations |
| Instant state changes | Bouncing, shaking |
| | Spinning (except loading) |
| | Stagger delays |
| | View transitions |

### 17.3 Motion Preference Hook

```typescript
function usePrefersReducedMotion(): boolean {
  // Listen to prefers-reduced-motion media query
  // Return true if user prefers reduced motion
}
```

### 17.4 Rules

- **All animation must be enhancive, not required** — the UI must be fully functional without any animation.
- Loading spinners should **still animate** (they communicate system state, not decoration).
- Provide a **manual toggle** in addition to media query detection.
- Test the entire app with `prefers-reduced-motion: reduce` enabled.

---

## 18. Performance Guidelines

### 18.1 GPU-Accelerated Properties

Only these properties are "cheap" to animate (compositor-only, no layout or paint):

| Property | Triggers |
|----------|----------|
| `transform` | Compositor only ✅ |
| `opacity` | Compositor only ✅ |
| `filter` | Paint ⚠️ (GPU-accelerated in most browsers) |
| `clip-path` | Paint ⚠️ |
| `background-color` | Paint ⚠️ |
| `color` | Paint ⚠️ |
| `box-shadow` | Paint ⚠️ |
| `width` / `height` | Layout ❌ AVOID |
| `margin` / `padding` | Layout ❌ AVOID |
| `top` / `left` | Layout ❌ AVOID |

### 18.2 Performance Rules

1. **Prefer `transform` + `opacity`** for all motion. Replace `top/left` with `translate()`, `width/height` with `scale()`.
2. **Use `will-change` sparingly** — only on elements about to animate, remove after.
3. **Avoid animating during scroll** in JS — use CSS scroll-driven animations or IntersectionObserver.
4. **Don't animate more than 10 elements simultaneously** on low-end devices.
5. **Use `contain: layout` or `content-visibility: auto`** to limit repaint scope.
6. **Use `requestAnimationFrame`** for JS-driven animation, never `setInterval`.
7. **Test on low-end devices** — animations that feel smooth on M3 MacBook may stutter on budget Android.

### 18.3 Animation Budget

Target: **60fps** (16.67ms per frame). If an animation drops below 30fps (33.33ms), it should be simplified or removed.

---

## 19. Motion Utility Classes

### 19.1 Enter/Exit Animations

| Class | Animation |
|-------|-----------|
| `.animate-fade-in` | fade-in, duration-normal, ease-out |
| `.animate-fade-out` | fade-out, duration-fast, ease-in |
| `.animate-fade-up` | fade-up, duration-normal, ease-out |
| `.animate-fade-down` | fade-down, duration-normal, ease-out |
| `.animate-scale-in` | scale-in, duration-normal, ease-spring |
| `.animate-scale-out` | scale-out, duration-fast, ease-in |
| `.animate-slide-up` | slide-up, duration-moderate, ease-out |
| `.animate-slide-down` | slide-down, duration-moderate, ease-in |
| `.animate-slide-left` | slide-left, duration-moderate, ease-out |
| `.animate-slide-right` | slide-right, duration-moderate, ease-out |

### 19.2 Looping Animations

| Class | Animation |
|-------|-----------|
| `.animate-spin` | spin, 1s, linear, infinite |
| `.animate-pulse` | pulse, 2s, ease-in-out, infinite |
| `.animate-ping` | ping, 1.5s, ease-out, infinite |
| `.animate-bounce` | bounce, 1s, ease, infinite |
| `.animate-shake` | shake, 0.4s (one-shot) |
| `.animate-wiggle` | wiggle, 0.5s (one-shot) |

### 19.3 Duration Modifiers

| Class | Duration |
|-------|----------|
| `.duration-fastest` | 50ms |
| `.duration-fast` | 120ms |
| `.duration-normal` | 200ms |
| `.duration-moderate` | 300ms |
| `.duration-slow` | 400ms |

### 19.4 Delay Modifiers

| Class | Delay |
|-------|-------|
| `.delay-75` | 75ms |
| `.delay-100` | 100ms |
| `.delay-150` | 150ms |
| `.delay-200` | 200ms |
| `.delay-300` | 300ms |
| `.delay-500` | 500ms |

---

## 20. Motion Tokens Summary

### Complete Token Inventory

```
DURATION SCALE
  --ds-duration-instant       0ms
  --ds-duration-fastest       50ms
  --ds-duration-fast          100-120ms
  --ds-duration-normal        200ms
  --ds-duration-moderate      300ms
  --ds-duration-slow          400ms
  --ds-duration-slower        500ms
  --ds-duration-slowest       700ms-1s

EASING CURVES
  --ds-ease-linear
  --ds-ease-standard          (default)
  --ds-ease-in
  --ds-ease-out
  --ds-ease-in-out
  --ds-ease-bounce
  --ds-ease-spring
  --ds-ease-elastic
  --ds-ease-snap
  --ds-ease-emphasized
  --ds-ease-spring-gentle
  --ds-ease-spring-stiff
  --ds-ease-spring-bouncy

STAGGER
  --ds-stagger-fast           30ms
  --ds-stagger-default        50ms
  --ds-stagger-slow           80ms

KEYFRAMES (defined globally)
  fade-in, fade-out, fade-up, fade-down
  scale-in, scale-out
  slide-up, slide-down, slide-left, slide-right
  expand, collapse
  spin, pulse, ping, bounce, shake, wiggle
  float, breathe
  shimmer, indeterminate
  typewriter, blink, text-reveal-word
  gradient-shift, pulse-glow, ripple

SPRING PRESETS (JS or linear() easing)
  gentle:   stiffness 120, damping 14, mass 1
  default:  stiffness 170, damping 26, mass 1
  wobbly:   stiffness 180, damping 12, mass 1
  stiff:    stiffness 300, damping 30, mass 1
  snappy:   stiffness 400, damping 35, mass 1

UTILITY CLASSES
  Enter/exit: .animate-fade-in, .animate-fade-up, .animate-scale-in, etc.
  Looping:    .animate-spin, .animate-pulse, .animate-ping, .animate-bounce
  One-shot:   .animate-shake, .animate-wiggle
  Duration:   .duration-{fastest,fast,normal,moderate,slow}
  Delay:      .delay-{75,100,150,200,300,500}
  Stagger:    .stagger (parent) with --i custom property per child
```

---

*This chapter defines the complete motion and animation vocabulary for a Design System. Every token, keyframe, and utility above should be present in the implemented DS for full coverage.*
