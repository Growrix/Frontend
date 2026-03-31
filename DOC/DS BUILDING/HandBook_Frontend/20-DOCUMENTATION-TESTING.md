# 20 — Documentation & Testing

> Everything a Design System needs for documentation and quality assurance — component documentation standards, Storybook patterns, visual regression testing, unit testing, accessibility testing, integration testing, and the processes that keep a DS trustworthy and adoptable.

---

## Table of Contents

1. [Documentation Philosophy](#1-documentation-philosophy)
2. [Component Documentation Standard](#2-component-documentation-standard)
3. [Storybook Architecture](#3-storybook-architecture)
4. [Story Patterns](#4-story-patterns)
5. [Interactive Playground](#5-interactive-playground)
6. [Design Token Documentation](#6-design-token-documentation)
7. [Pattern & Recipe Documentation](#7-pattern--recipe-documentation)
8. [Unit Testing](#8-unit-testing)
9. [Interaction Testing](#9-interaction-testing)
10. [Accessibility Testing](#10-accessibility-testing)
11. [Visual Regression Testing](#11-visual-regression-testing)
12. [Cross-Browser & Device Testing](#12-cross-browser--device-testing)
13. [Performance Testing](#13-performance-testing)
14. [Test Infrastructure](#14-test-infrastructure)
15. [Quality Gates & CI](#15-quality-gates--ci)
16. [Documentation & Testing Checklist](#16-documentation--testing-checklist)

---

## 1. Documentation Philosophy

### 1.1 Core Principles

1. **Docs are part of the product** — if a component isn't documented, it doesn't exist.
2. **Show, don't tell** — live examples > written descriptions.
3. **Copy-paste first** — every example should be directly usable.
4. **Graduated detail** — quick start → full API → advanced patterns.
5. **Always current** — docs generate from source code when possible.
6. **Accessible** — docs site itself follows the same a11y standards as the DS.

### 1.2 Audience

| Audience | Needs |
|----------|-------|
| **Developer** | Props API, usage examples, copy-paste code |
| **Designer** | Visual variants, anatomy diagrams, usage guidelines |
| **Product Manager** | Component inventory, capabilities overview |
| **QA** | Expected behaviors, states, edge cases |
| **New team member** | Getting started, installation, principles |

---

## 2. Component Documentation Standard

### 2.1 Documentation Template

Every component page should include:

```markdown
# Component Name

> One-sentence description of what this component does.

## Overview
Brief description + hero example (live).

## Anatomy
Labeled diagram showing all parts.

## When to Use
- Use when...
- Don't use when...

## Examples
### Default
### Variants
### Sizes
### States
### With Icons
### Composition

## API Reference
### Props Table
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| variant | 'primary' \| 'secondary' | 'primary' | Visual style |
| size | 'sm' \| 'md' \| 'lg' | 'md' | Component size |
| disabled | boolean | false | Disable interaction |

### Events
| Event | Payload | Description |
|-------|---------|-------------|
| onChange | (value: string) => void | Fires on value change |

### Slots
| Slot | Type | Description |
|------|------|-------------|
| children | ReactNode | Primary content |
| startSlot | ReactNode | Leading content |

## Accessibility
- Keyboard interactions
- ARIA roles and attributes
- Screen reader behavior

## Design Guidelines
- Do: ...
- Don't: ...
- Spacing and alignment rules

## Related Components
- Link to similar / often-confused components
```

### 2.2 Auto-Generated Sections

| Section | Source |
|---------|--------|
| Props table | TypeScript interface + JSDoc |
| Default values | Component default props |
| Type unions | TypeScript literal types |
| Description | JSDoc `@description` comment |

---

## 3. Storybook Architecture

### 3.1 File Structure

```
src/ds/components/Button/
├── Button.tsx
├── Button.module.css
├── Button.test.tsx
├── Button.stories.tsx     ← Stories
└── Button.mdx             ← Optional docs page
```

### 3.2 Story Organization

```
Storybook sidebar:
├── 🏗 Foundation
│   ├── Colors
│   ├── Typography
│   ├── Spacing
│   └── Icons
├── 🧱 Primitives
│   ├── Box
│   ├── Text
│   └── Icon
├── 🧩 Components
│   ├── Button
│   ├── Input
│   ├── Card
│   └── Modal
├── 📐 Patterns
│   ├── Form Layout
│   ├── Data Table
│   └── Page Header
└── 📄 Pages
    ├── Dashboard
    └── Settings
```

### 3.3 Story Categories

| Level | What | Example |
|-------|------|---------|
| Foundation | Tokens, not components | Color palette page |
| Primitives | Atomic components | Box, Text, Icon |
| Components | Reusable UI | Button, Input, Modal |
| Patterns | Multi-component compositions | Login form, Dashboard card |
| Pages | Full page layouts | Dashboard, Settings |

---

## 4. Story Patterns

### 4.1 Default Story

Every component must have a default story showing the simplest usage:

```tsx
export const Default: Story = {
  args: {
    children: 'Button',
  },
};
```

### 4.2 Variant Matrix

Show all variants in a single view:

```tsx
export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 16 }}>
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="destructive">Destructive</Button>
    </div>
  ),
};
```

### 4.3 Size Matrix

```tsx
export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
      <Button size="sm">Small</Button>
      <Button size="md">Medium</Button>
      <Button size="lg">Large</Button>
    </div>
  ),
};
```

### 4.4 State Stories

```tsx
export const Disabled: Story = { args: { disabled: true, children: 'Disabled' } };
export const Loading: Story = { args: { loading: true, children: 'Loading' } };
export const WithIcon: Story = {
  render: () => <Button><PlusIcon /> Add Item</Button>,
};
```

### 4.5 Interactive Story

```tsx
export const Controlled: Story = {
  render: function Render() {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setOpen(true)}>Open Modal</Button>
        <Modal open={open} onClose={() => setOpen(false)}>
          Modal Content
        </Modal>
      </>
    );
  },
};
```

### 4.6 Responsive Story

```tsx
export const Responsive: Story = {
  parameters: {
    viewport: { defaultViewport: 'mobile1' },
  },
};
```

### 4.7 Dark Mode Story

```tsx
export const DarkMode: Story = {
  decorators: [
    (Story) => (
      <div data-theme="dark" style={{ padding: 20, background: '#0f172a' }}>
        <Story />
      </div>
    ),
  ],
};
```

---

## 5. Interactive Playground

### 5.1 Controls

Storybook controls auto-generate from props:

```tsx
export default {
  component: Button,
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'ghost', 'destructive'],
    },
    size: {
      control: 'radio',
      options: ['sm', 'md', 'lg'],
    },
    disabled: { control: 'boolean' },
    children: { control: 'text' },
  },
};
```

### 5.2 Code Snippet

Show the corresponding code for the current control state:

```
<Button variant="secondary" size="lg" disabled>
  Click me
</Button>
```

---

## 6. Design Token Documentation

### 6.1 Token Page Content

| Section | Content |
|---------|---------|
| Color swatches | Visual grid with hex, name, contrast ratio |
| Spacing scale | Visual bars showing the spacing scale |
| Typography | Rendered examples of each type style |
| Shadows | Cards showing each shadow level |
| Radii | Boxes with each radius applied |
| Motion | Animated examples of each duration/easing |

### 6.2 Token Reference Table

```
| Token | CSS Variable | Value | Preview |
|-------|-------------|-------|---------|
| Primary | --ds-accent | #2563eb | [■] |
| Text | --ds-text | #111827 | [■] |
```

---

## 7. Pattern & Recipe Documentation

### 7.1 What to Document

- Patterns: login form, data table with filters, dashboard card grid.
- Recipes: "How to build a settings page," "How to handle form validation."
- Compositions: multi-component assemblies that aren't standalone.

### 7.2 Pattern Documentation Template

```markdown
# Pattern: Data Table with Filters

## Overview
How to combine Table, Input, Select, and Pagination
to build a filterable data table.

## Live Example
[Interactive demo]

## Code
[Full copy-paste code]

## Guidelines
- When to use
- Responsive behavior
- Accessibility considerations

## Components Used
- Table, Input, Select, Button, Pagination, Badge
```

---

## 8. Unit Testing

### 8.1 What to Unit Test

| Category | Tests |
|----------|-------|
| **Rendering** | Default render, all variants, all sizes |
| **Props** | Each prop changes output correctly |
| **Conditional rendering** | Show/hide elements based on props |
| **Computed values** | ClassName generation, derived state |
| **Defaults** | Default props apply when not specified |

### 8.2 Unit Test Template

```tsx
describe('Button', () => {
  it('renders with default props', () => {
    render(<Button>Click</Button>);
    expect(screen.getByRole('button')).toHaveTextContent('Click');
  });

  it('applies variant class', () => {
    render(<Button variant="secondary">Click</Button>);
    expect(screen.getByRole('button')).toHaveClass('btn--secondary');
  });

  it('forwards ref', () => {
    const ref = createRef<HTMLButtonElement>();
    render(<Button ref={ref}>Click</Button>);
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });

  it('spreads additional props', () => {
    render(<Button data-testid="custom">Click</Button>);
    expect(screen.getByTestId('custom')).toBeInTheDocument();
  });

  it('merges className', () => {
    render(<Button className="custom">Click</Button>);
    const btn = screen.getByRole('button');
    expect(btn).toHaveClass('btn');
    expect(btn).toHaveClass('custom');
  });
});
```

### 8.3 Testing Library Principles

1. **Test behavior, not implementation** — query by role/text, not class/id.
2. **User-centric queries**: `getByRole`, `getByText`, `getByLabelText`.
3. **Avoid testing internal state** — test what the user sees.
4. **Don't test styles** — that's visual regression territory.
5. **Snapshot sparingly** — snapshots break on any change, providing low signal.

---

## 9. Interaction Testing

### 9.1 What to Interaction Test

| Interaction | Test |
|-------------|------|
| Click handler | `onClick` fires |
| Keyboard | Enter/Space triggers action |
| Focus/blur | `onFocus`/`onBlur` fire |
| Type in input | `onChange` fires with value |
| Open/close | Dialog opens on trigger click, closes on Escape |
| Selection | Select item, verify `onSelect` payload |
| Drag | Start, move, end events |

### 9.2 Interaction Test Template

```tsx
describe('Modal interaction', () => {
  it('opens when trigger is clicked', async () => {
    const user = userEvent.setup();
    render(
      <Dialog>
        <DialogTrigger>Open</DialogTrigger>
        <DialogContent>Content</DialogContent>
      </Dialog>
    );

    await user.click(screen.getByText('Open'));
    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });

  it('closes on Escape', async () => {
    const user = userEvent.setup();
    // ... render open dialog ...
    await user.keyboard('{Escape}');
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('traps focus inside', async () => {
    // ... render open dialog with two buttons ...
    await user.tab(); // first focusable
    await user.tab(); // second focusable
    await user.tab(); // wraps to first (trapped)
    expect(document.activeElement).toBe(firstButton);
  });
});
```

---

## 10. Accessibility Testing

### 10.1 Automated Testing

```tsx
import { axe } from 'jest-axe';

describe('Button a11y', () => {
  it('has no accessibility violations', async () => {
    const { container } = render(<Button>Click</Button>);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
```

### 10.2 What Automated Tools Catch

| Catches | Misses |
|---------|--------|
| Missing alt text | Meaningful alt text quality |
| Missing labels | Label correctness |
| Color contrast | Custom focus styles quality |
| ARIA role presence | Correct ARIA usage context |
| Heading hierarchy | Reading order |
| Duplicate IDs | Keyboard flow logic |

### 10.3 Manual Testing Checklist

| Test | How |
|------|-----|
| Tab order logical | Tab through entire page |
| All interactive elements reachable | Keyboard only |
| Focus visible on all items | Keyboard navigation |
| Screen reader announces correctly | Test with VoiceOver / NVDA / JAWS |
| Reduced motion respected | Enable `prefers-reduced-motion` |
| High contrast mode | Enable Windows High Contrast |
| Zoom to 200% | Browser zoom |
| Text resize to 200% | Font size increase |

### 10.4 Screen Reader Testing Matrix

| OS | Screen Reader | Browser |
|----|--------------|---------|
| macOS | VoiceOver | Safari |
| Windows | NVDA | Firefox |
| Windows | JAWS | Chrome |
| iOS | VoiceOver | Safari |
| Android | TalkBack | Chrome |

---

## 11. Visual Regression Testing

### 11.1 Purpose

Catch unintended visual changes by comparing screenshots:

```
Expected screenshot ↔ Actual screenshot → Diff image
```

### 11.2 What to Capture

| Level | What |
|-------|------|
| Component | Each variant × each size × each state |
| Theme | Light mode + dark mode |
| Responsive | Mobile, tablet, desktop viewports |
| Interactive | Hover, focus, open states |

### 11.3 Tools

| Tool | Type |
|------|------|
| Chromatic | Storybook-based, cloud service |
| Percy (BrowserStack) | CI-integrated screenshot comparison |
| Playwright screenshots | Open-source, self-hosted |
| BackstopJS | Open-source, config-based |
| Loki | Storybook-based, local or CI |

### 11.4 Best Practices

1. Capture at consistent viewport sizes (320, 768, 1280).
2. Remove dynamic content (dates, random data) before capture.
3. Wait for fonts and images to load before screenshot.
4. Set a sensible diff threshold (0.1% — catch real changes, ignore anti-aliasing).
5. Review diffs in PR — don't auto-approve.
6. Update baselines intentionally (via approval workflow).

---

## 12. Cross-Browser & Device Testing

### 12.1 Browser Matrix

| Browser | Version | Priority |
|---------|---------|----------|
| Chrome | Latest 2 | Critical |
| Firefox | Latest 2 | High |
| Safari | Latest 2 | High |
| Edge | Latest 2 | Medium |
| Safari iOS | Latest 2 | High |
| Chrome Android | Latest 2 | High |

### 12.2 What Breaks Across Browsers

| Feature | Risk |
|---------|------|
| CSS `gap` in Flexbox | Old Safari |
| `backdrop-filter` | Partial support |
| `:has()` selector | Firefox (recently added) |
| `@container` queries | Older browsers |
| `@layer` | IE, old browsers |
| Scroll-driven animations | Chrome only (evolving) |
| `color-mix()` | Recent addition |

### 12.3 Testing Tools

| Tool | Purpose |
|------|---------|
| BrowserStack | Real devices in the cloud |
| Playwright | Multi-browser automation |
| Sauce Labs | Cross-browser test grid |
| LambdaTest | Cloud cross-browser testing |

---

## 13. Performance Testing

### 13.1 What to Measure

| Metric | Target | Tool |
|--------|--------|------|
| Bundle size (per component) | < 5KB gzipped | Bundlephobia, size-limit |
| Total DS CSS | < 50KB gzipped | Build output analysis |
| First render time | < 16ms per component | React Profiler |
| Re-render on prop change | < 4ms | React Profiler |
| Memory (large lists) | Stable, no leaks | Chrome DevTools |
| Tree-shaking | Dead code eliminated | Bundle analyzer |

### 13.2 Performance Rules

1. Components should be pure (memoizable).
2. No unnecessary re-renders — use `React.memo` judiciously.
3. Lazy-load heavy components (code-splitting).
4. CSS Modules / tree-shakeable CSS.
5. No runtime CSS generation in hot paths.

---

## 14. Test Infrastructure

### 14.1 Test Stack

| Layer | Tool |
|-------|------|
| Unit | Jest + React Testing Library |
| Interaction | Testing Library userEvent / Playwright |
| Accessibility | jest-axe + Storybook a11y addon |
| Visual regression | Chromatic or Playwright screenshots |
| E2E | Playwright |
| Performance | size-limit, React Profiler |
| Linting | ESLint + Stylelint |
| Type checking | TypeScript strict mode |

### 14.2 Test File Organization

```
src/ds/components/Button/
├── Button.tsx
├── Button.module.css
├── Button.test.tsx           ← Unit + interaction tests
├── Button.a11y.test.tsx      ← Accessibility tests (optional separate)
└── Button.stories.tsx        ← Storybook (visual regression source)
```

---

## 15. Quality Gates & CI

### 15.1 CI Pipeline

```
On every PR:
  1. ✅ TypeScript compile (zero errors)
  2. ✅ ESLint pass (zero warnings in changed files)
  3. ✅ Stylelint pass
  4. ✅ Unit tests pass (100% of changed components)
  5. ✅ Accessibility audit pass (jest-axe)
  6. ✅ Visual regression review (screenshot comparison)
  7. ✅ Bundle size check (no regression beyond threshold)
  8. ✅ Build succeeds
```

### 15.2 Coverage Targets

| Metric | Target |
|--------|--------|
| Unit test coverage | > 80% statements |
| A11y test coverage | 100% of components have axe test |
| Visual coverage | 100% of components have stories |
| Storybook build | Must succeed |
| TypeScript strict | Zero errors |

### 15.3 Pre-Release Checklist

| Gate | Requirement |
|------|-------------|
| All tests pass | CI green |
| Visual review approved | No unintended changes |
| A11y audit clean | Zero violations |
| Docs updated | New/changed components documented |
| Changelog written | Semver, breaking changes noted |
| Bundle size acceptable | Within budget |
| Browser testing passed | Matrix browsers work |
| Peer review | At least one DS team member approved |

---

## 16. Documentation & Testing Checklist

### Complete Quality Checklist

```
DOCUMENTATION
  ☐ Component has overview + description
  ☐ Anatomy diagram with labeled parts
  ☐ When to use / when not to use
  ☐ All variants shown with live examples
  ☐ All sizes shown
  ☐ States documented (disabled, loading, error)
  ☐ Props table (auto-generated from TypeScript)
  ☐ Events documented
  ☐ Slots documented
  ☐ Accessibility section (keyboard, ARIA, screen reader)
  ☐ Do / Don't guidelines
  ☐ Related components linked
  ☐ Code examples are copy-pasteable

STORYBOOK
  ☐ Default story
  ☐ All variants story
  ☐ All sizes story
  ☐ State stories (disabled, loading, error, etc.)
  ☐ Interactive/controlled story
  ☐ Dark mode story
  ☐ Responsive story (mobile viewport)
  ☐ With composition (slots, sub-components)
  ☐ Edge cases (long text, empty, max content)

UNIT TESTS
  ☐ Default render
  ☐ All variants render correctly
  ☐ All sizes render correctly
  ☐ Props applied correctly
  ☐ Event handlers fire
  ☐ Ref forwarding works
  ☐ className merging works
  ☐ Props spread to DOM
  ☐ Controlled + uncontrolled modes

INTERACTION TESTS
  ☐ Click/tap works
  ☐ Keyboard navigation works
  ☐ Focus management correct
  ☐ Open/close behavior
  ☐ Selection behavior
  ☐ Form submission behavior

ACCESSIBILITY TESTS
  ☐ jest-axe passes (zero violations)
  ☐ Correct ARIA roles
  ☐ Keyboard operable
  ☐ Screen reader tested
  ☐ Focus indicator visible
  ☐ Color contrast passes
  ☐ Reduced motion respected

VISUAL REGRESSION
  ☐ Baseline screenshots captured
  ☐ Light + dark mode
  ☐ All variants + sizes
  ☐ Interactive states (hover, focus, active)
  ☐ Responsive viewports

PERFORMANCE
  ☐ Bundle size within budget (< 5KB per component)
  ☐ No unnecessary re-renders
  ☐ Tree-shakeable
```

---

*This chapter defines the complete documentation and testing standards for a Design System. Every documentation template, story pattern, test strategy, CI gate, and quality checklist above should be followed when building and maintaining DS components.*
