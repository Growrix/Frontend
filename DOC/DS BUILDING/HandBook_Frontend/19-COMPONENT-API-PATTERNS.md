# 19 — Component API Patterns

> Everything a Design System needs for component API design — prop patterns, composition strategies, compound components, polymorphism, render props, slots, ref forwarding, event contracts, and the patterns that make components ergonomic, flexible, and consistent.

---

## Table of Contents

1. [Component API Philosophy](#1-component-api-philosophy)
2. [Prop Design Patterns](#2-prop-design-patterns)
3. [Variant & Size Props](#3-variant--size-props)
4. [Children & Slot Patterns](#4-children--slot-patterns)
5. [Composition Patterns](#5-composition-patterns)
6. [Compound Components](#6-compound-components)
7. [Polymorphic Components](#7-polymorphic-components)
8. [Render Props & Headless](#8-render-props--headless)
9. [Ref Forwarding](#9-ref-forwarding)
10. [Event Handling Contracts](#10-event-handling-contracts)
11. [Controlled vs. Uncontrolled](#11-controlled-vs-uncontrolled)
12. [Default Props & Merging](#12-default-props--merging)
13. [Accessibility Props](#13-accessibility-props)
14. [TypeScript Patterns](#14-typescript-patterns)
15. [Component Composition Rules](#15-component-composition-rules)
16. [Component API Checklist](#16-component-api-checklist)

---

## 1. Component API Philosophy

### 1.1 Core Principles

1. **Consistent** — similar components use similar prop names and patterns.
2. **Minimal** — fewest props to cover 80% of use cases.
3. **Extensible** — escape hatches for the other 20%.
4. **Type-safe** — TypeScript enforces correct usage at compile time.
5. **Accessible by default** — correct ARIA attributes out of the box.
6. **Composable** — small components combine into larger patterns.

### 1.2 API Surface Levels

```
Level 0 — Zero config: works with just children
            <Button>Click me</Button>

Level 1 — Common variants: most-used customization
            <Button variant="secondary" size="lg">Click</Button>

Level 2 — Composition: slots and sub-components
            <Button><Icon name="plus" /> Add Item</Button>

Level 3 — Full control: render props, headless hooks
            <Combobox>{({ isOpen }) => ...}</Combobox>
```

---

## 2. Prop Design Patterns

### 2.1 Naming Conventions

| Pattern | Convention | Examples |
|---------|-----------|---------|
| Boolean | `is*` or bare adjective | `disabled`, `loading`, `isOpen` |
| Variant | `variant` | `variant="primary"` |
| Size | `size` | `size="sm"` |
| Event handler | `on*` | `onClick`, `onClose`, `onChange` |
| Render slot | `*Slot` or `render*` | `renderHeader`, `startSlot` |
| HTML override | `as` | `as="a"` |
| Style override | `className` | `className="custom"` |

### 2.2 Prop Types

| Type | When | Example |
|------|------|---------|
| String literal union | Finite choices | `variant: "primary" \| "secondary"` |
| Boolean | Toggle behavior | `disabled: boolean` |
| ReactNode | Insertable content | `children: ReactNode` |
| Function | Callbacks | `onClose: () => void` |
| Ref | DOM access | `ref: Ref<HTMLButtonElement>` |
| Object | Complex config | `pagination: { page: number; pageSize: number }` |

### 2.3 Prop Naming Rules

1. **Boolean props are positive** — `disabled` not `notEnabled`.
2. **Events use past or present** — `onChange` (during), `onChanged` (after).
3. **Consistent across DS** — if `Button` uses `variant`, `Badge` uses `variant` too.
4. **No abbreviations** — `description` not `desc`, `label` not `lbl`.
5. **Predictable** — a developer should guess the prop name correctly.

---

## 3. Variant & Size Props

### 3.1 Variant Pattern

```typescript
type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'destructive';

interface ButtonProps {
  variant?: ButtonVariant;  // default: 'primary'
}
```

### 3.2 Size Pattern

```typescript
type Size = 'sm' | 'md' | 'lg';

interface ButtonProps {
  size?: Size;  // default: 'md'
}
```

### 3.3 Consistent Size Scale

Every sized component uses the same scale:

| Size | Token | Button Height | Input Height | Font |
|------|-------|--------------|-------------|------|
| `sm` | small | 32px | 32px | 13px |
| `md` | medium | 40px | 40px | 14px |
| `lg` | large | 48px | 48px | 16px |

### 3.4 Color Scheme as Variant

Don't create color props — use variant:

```tsx
// Don't
<Badge color="green" />

// Do
<Badge variant="success" />
```

Variant names are semantic (`success`, `warning`, `danger`) not visual (`green`, `amber`, `red`).

---

## 4. Children & Slot Patterns

### 4.1 Children (Default Slot)

```tsx
<Button>Click me</Button>
<Card>Card content</Card>
<Modal>Modal body</Modal>
```

### 4.2 Named Slots

When a component needs content in specific locations:

```tsx
<Card
  header={<CardHeader title="Title" />}
  footer={<CardFooter actions={...} />}
>
  Card body content
</Card>
```

### 4.3 Start/End Slot Pattern

```tsx
<Input
  startSlot={<Icon name="search" />}
  endSlot={<Button variant="ghost" size="sm">Clear</Button>}
/>
```

### 4.4 Slot Rules

1. `children` is always the primary content slot.
2. Named slots use descriptive prop names: `header`, `footer`, `startSlot`, `endSlot`.
3. Slots accept `ReactNode` — the consumer controls the content.
4. Provide sensible defaults if a slot is optional.
5. Document slot expectations (what type of content is expected).

---

## 5. Composition Patterns

### 5.1 Prop Drilling vs. Composition

```tsx
// Prop drilling — anti-pattern for complex components
<Card
  title="Title"
  subtitle="Subtitle"
  image="/img.jpg"
  actions={[{ label: 'Edit' }, { label: 'Delete' }]}
/>

// Composition — flexible, readable
<Card>
  <CardImage src="/img.jpg" />
  <CardBody>
    <CardTitle>Title</CardTitle>
    <CardSubtitle>Subtitle</CardSubtitle>
  </CardBody>
  <CardActions>
    <Button>Edit</Button>
    <Button variant="destructive">Delete</Button>
  </CardActions>
</Card>
```

### 5.2 When Props vs. Composition

| Use Props | Use Composition |
|----------|----------------|
| Simple, predictable content | Complex, variable content |
| Primitive values (string, number) | Mixed content (text + components) |
| Fixed structure | Flexible structure |
| < 5 content-related props | > 5 content-related props |

---

## 6. Compound Components

### 6.1 What Are Compound Components?

A group of components that work together and share implicit state:

```tsx
<Tabs defaultValue="tab1">
  <TabsList>
    <TabsTrigger value="tab1">Tab 1</TabsTrigger>
    <TabsTrigger value="tab2">Tab 2</TabsTrigger>
  </TabsList>
  <TabsContent value="tab1">Content 1</TabsContent>
  <TabsContent value="tab2">Content 2</TabsContent>
</Tabs>
```

### 6.2 Implementation (Context-Based)

```tsx
// TabsContext provides shared state
const TabsContext = createContext<TabsState | null>(null);

function Tabs({ children, defaultValue }) {
  const [active, setActive] = useState(defaultValue);
  return (
    <TabsContext.Provider value={{ active, setActive }}>
      {children}
    </TabsContext.Provider>
  );
}

function TabsTrigger({ value, children }) {
  const { active, setActive } = useContext(TabsContext);
  return (
    <button
      role="tab"
      aria-selected={active === value}
      onClick={() => setActive(value)}
    >
      {children}
    </button>
  );
}
```

### 6.3 Dot Notation Export

```tsx
// Clean API for consumers
const Tabs = Object.assign(TabsRoot, {
  List: TabsList,
  Trigger: TabsTrigger,
  Content: TabsContent,
});

// Usage
<Tabs>
  <Tabs.List>
    <Tabs.Trigger value="1">Tab 1</Tabs.Trigger>
  </Tabs.List>
  <Tabs.Content value="1">Content</Tabs.Content>
</Tabs>
```

### 6.4 Common Compound Components

| Component | Parts |
|-----------|-------|
| Tabs | Root, List, Trigger, Content |
| Accordion | Root, Item, Trigger, Content |
| Select | Root, Trigger, Content, Item, Group |
| Dialog | Root, Trigger, Content, Title, Description, Close |
| Menu | Root, Trigger, Content, Item, Separator, Group |
| Form | Root, Field, Label, Input, Message |
| Table | Root, Header, Body, Row, Cell, Footer |

---

## 7. Polymorphic Components

### 7.1 The `as` Prop

Change the rendered HTML element:

```tsx
<Button as="a" href="/home">Go Home</Button>
// Renders: <a href="/home" class="btn">Go Home</a>

<Text as="h1">Heading</Text>
// Renders: <h1 class="text">Heading</h1>

<Box as="section">Content</Box>
// Renders: <section class="box">Content</section>
```

### 7.2 TypeScript Implementation

```typescript
type PolymorphicProps<E extends ElementType, P = {}> = P &
  Omit<ComponentPropsWithoutRef<E>, keyof P> & {
    as?: E;
  };

type ButtonProps<E extends ElementType = 'button'> = PolymorphicProps<E, {
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
}>;
```

### 7.3 Rules

1. Default element should be semantically correct (`button` for Button, `div` for Box).
2. TypeScript must infer valid HTML attributes based on `as` value.
3. Use sparingly — most components don't need polymorphism.
4. Common for: Box, Text, Stack, Heading, Link.

---

## 8. Render Props & Headless

### 8.1 Render Props

```tsx
<Combobox>
  {({ isOpen, inputValue, items }) => (
    <>
      <ComboboxInput value={inputValue} />
      {isOpen && (
        <ComboboxList>
          {items.map(item => (
            <ComboboxItem key={item.id} item={item} />
          ))}
        </ComboboxList>
      )}
    </>
  )}
</Combobox>
```

### 8.2 Headless Components (Hooks)

Provide behavior with zero UI:

```tsx
const { isOpen, selectedItem, getInputProps, getMenuProps, getItemProps } =
  useCombobox({ items, onSelectedItemChange });

return (
  <div>
    <input {...getInputProps()} />
    {isOpen && (
      <ul {...getMenuProps()}>
        {items.map((item, index) => (
          <li key={item.id} {...getItemProps({ item, index })}>
            {item.name}
          </li>
        ))}
      </ul>
    )}
  </div>
);
```

### 8.3 When to Use

| Pattern | When |
|---------|------|
| Standard props | 80% of use cases |
| Compound components | Structure flexibility |
| Render props | Render logic customization |
| Headless hooks | Full visual control, zero DS opinion |

### 8.4 Headless Libraries

| Library | Coverage |
|---------|----------|
| Radix UI | Primitives (dialog, dropdown, tabs, etc.) |
| Headless UI (Tailwind) | Menu, listbox, switch, tabs, etc. |
| React Aria (Adobe) | Full accessibility + behavior hooks |
| Downshift | Combobox, select, autocomplete |
| TanStack Table | Data table behavior |

---

## 9. Ref Forwarding

### 9.1 Why

Consumers need DOM access for:
- Focus management
- Measurement (getBoundingClientRect)
- Third-party library integration
- Animation libraries

### 9.2 Implementation

```tsx
const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, variant = 'primary', ...props }, ref) => {
    return (
      <button ref={ref} className={`btn btn--${variant}`} {...props}>
        {children}
      </button>
    );
  }
);
```

### 9.3 Rules

1. **Every DS component must forward refs.**
2. Ref type matches the root DOM element.
3. Use `forwardRef` (React) or `defineExpose` (Vue).
4. Document what element the ref points to.

---

## 10. Event Handling Contracts

### 10.1 Naming

```
on + Event = Handler name

onClick, onChange, onFocus, onBlur, onKeyDown
onClose, onOpen, onSelect, onDismiss, onSubmit
```

### 10.2 Event Signature

```typescript
// Simple
onChange?: (value: string) => void;

// With event object
onClick?: (event: MouseEvent<HTMLButtonElement>) => void;

// Rich payload
onSelect?: (item: { id: string; label: string }) => void;

// With metadata
onPageChange?: (page: number, meta: { total: number }) => void;
```

### 10.3 Rules

1. Pass the native event when wrapping native elements.
2. For custom events, provide a meaningful payload.
3. Support both controlled (external state) and uncontrolled (internal state).
4. Don't swallow events — let them bubble unless intentionally stopped.
5. Consistent naming: `onClose` (not `onDismiss` on some, `onHide` on others).

---

## 11. Controlled vs. Uncontrolled

### 11.1 Uncontrolled (Internal State)

```tsx
// Component manages its own state
<Accordion defaultExpanded={['item-1']}>
  <AccordionItem value="item-1">...</AccordionItem>
</Accordion>
```

### 11.2 Controlled (External State)

```tsx
// Parent manages state
const [expanded, setExpanded] = useState(['item-1']);

<Accordion expanded={expanded} onExpandedChange={setExpanded}>
  <AccordionItem value="item-1">...</AccordionItem>
</Accordion>
```

### 11.3 Hybrid Pattern

Support both modes:

```typescript
interface AccordionProps {
  // Uncontrolled
  defaultExpanded?: string[];

  // Controlled
  expanded?: string[];
  onExpandedChange?: (values: string[]) => void;
}

function useControllable<T>(controlled: T | undefined, defaultValue: T, onChange?: (v: T) => void) {
  const [internal, setInternal] = useState(defaultValue);
  const isControlled = controlled !== undefined;
  const value = isControlled ? controlled : internal;

  const setValue = useCallback((next: T) => {
    if (!isControlled) setInternal(next);
    onChange?.(next);
  }, [isControlled, onChange]);

  return [value, setValue] as const;
}
```

### 11.4 Rules

1. Every stateful component supports both controlled and uncontrolled.
2. Use `default*` prefix for uncontrolled initial values.
3. Bare name for controlled values: `value` (controlled), `defaultValue` (uncontrolled).
4. Always provide `on*Change` callback alongside controlled value.

---

## 12. Default Props & Merging

### 12.1 Sensible Defaults

```typescript
function Button({
  variant = 'primary',
  size = 'md',
  type = 'button',       // prevents accidental form submit
  disabled = false,
  ...props
}: ButtonProps) { ... }
```

### 12.2 Class Name Merging

```tsx
// Consumer should be able to add classes without breaking DS styles
<Button className="my-custom-class">Click</Button>

// Inside the component:
function Button({ className, variant, ...props }) {
  return (
    <button
      className={cn('btn', `btn--${variant}`, className)}
      {...props}
    />
  );
}
```

### 12.3 Style Merging

```tsx
// Consumer inline styles merge with component styles
<Box style={{ marginTop: 16 }}>Content</Box>

// Inside:
function Box({ style, ...props }) {
  return <div style={{ display: 'flex', ...style }} {...props} />;
}
```

### 12.4 Rules

1. Always spread `...props` onto the root element (allows data-*, aria-*, etc.).
2. Merge `className` — never discard consumer classes.
3. Merge `style` — consumer styles override component defaults.
4. `type="button"` as default for Button (prevents form submission).

---

## 13. Accessibility Props

### 13.1 Built-In Accessibility

Components should have correct ARIA by default:

```tsx
function Modal({ title, children, isOpen, onClose }) {
  return isOpen ? (
    <div role="dialog" aria-modal="true" aria-labelledby="modal-title">
      <h2 id="modal-title">{title}</h2>
      {children}
      <button onClick={onClose} aria-label="Close modal">✕</button>
    </div>
  ) : null;
}
```

### 13.2 Accessibility Escape Hatches

```tsx
// When the consumer knows better
<Button aria-label="Close sidebar">✕</Button>
<Icon name="search" aria-hidden="true" />
<Input aria-describedby="custom-help-text" />
```

### 13.3 Rules

1. Components set ARIA roles automatically from semantic structure.
2. Consumer can override any ARIA attribute via props.
3. Don't require consumers to add ARIA for common patterns — the DS handles it.
4. Warn in development if required a11y props are missing.

---

## 14. TypeScript Patterns

### 14.1 Discriminated Unions

```typescript
// Button as link vs. button
type ButtonAsButton = {
  as?: 'button';
  href?: never;
  onClick?: () => void;
};

type ButtonAsLink = {
  as: 'a';
  href: string;
  onClick?: never;
};

type ButtonProps = (ButtonAsButton | ButtonAsLink) & {
  variant?: 'primary' | 'secondary';
  children: ReactNode;
};
```

### 14.2 HTML Attribute Inheritance

```typescript
type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
};
```

### 14.3 Exhaustive Variant Handling

```typescript
function getButtonClass(variant: ButtonVariant): string {
  switch (variant) {
    case 'primary': return 'btn--primary';
    case 'secondary': return 'btn--secondary';
    case 'ghost': return 'btn--ghost';
    case 'destructive': return 'btn--destructive';
    default: {
      const _exhaustive: never = variant;
      return _exhaustive;
    }
  }
}
```

### 14.4 Strict Prop Types

```typescript
// Don't
interface CardProps {
  elevation?: number;  // What numbers are valid?
}

// Do
interface CardProps {
  elevation?: 0 | 1 | 2 | 3;  // Explicit valid values
}
```

---

## 15. Component Composition Rules

### 15.1 Golden Rules

1. **One component = one responsibility.**
2. **Prefer composition over configuration** — 10 simple components > 1 with 30 props.
3. **Props down, events up** — data flows down via props, actions bubble up via callbacks.
4. **Accessible by default** — zero additional work for consumers.
5. **Ref forwarding always** — every component forwards its ref.
6. **Spread remaining props** — `...rest` goes on the root element.
7. **Merge classNames and styles** — never discard consumer overrides.
8. **No side effects** — components don't fetch data or trigger mutations.
9. **Controlled + uncontrolled** — support both for stateful components.
10. **Consistent API vocabulary** — same prop names across similar components.

### 15.2 DS Component Tiers

| Tier | Description | Examples |
|------|-------------|---------|
| **Primitives** | Single HTML elements with DS styling | Box, Text, Icon, VisuallyHidden |
| **Components** | Reusable UI patterns | Button, Input, Badge, Avatar |
| **Compound** | Multi-part with shared state | Tabs, Accordion, Select, Menu |
| **Compositions** | Assembled from DS parts | DataTable, FormField, Card |
| **Headless** | Behavior hooks only | useDialog, useCombobox, useTooltip |

---

## 16. Component API Checklist

### Pre-Release Checklist

| Check | Description |
|-------|-------------|
| ☐ Default works | `<Component>children</Component>` renders correctly |
| ☐ All variants | Every variant prop value renders correctly |
| ☐ All sizes | Every size value renders correctly |
| ☐ Disabled state | `disabled` prop works and looks right |
| ☐ Loading state | If applicable, `loading` prop works |
| ☐ Ref forwarding | `ref` prop points to correct DOM element |
| ☐ className merging | Consumer className is added, not replaced |
| ☐ Props spread | `data-*` and `aria-*` attributes pass through |
| ☐ Keyboard | All interactions work via keyboard |
| ☐ Screen reader | Correct ARIA roles and labels |
| ☐ Focus visible | Clear focus indicator on keyboard navigation |
| ☐ Dark mode | Tokens resolve correctly in dark theme |
| ☐ Responsive | Component adapts to small screens |
| ☐ Controlled + uncontrolled | Both modes work for stateful components |
| ☐ TypeScript strict | No `any`, exhaustive variants, correct generics |
| ☐ Documentation | Props table, usage examples, do/don't |
| ☐ Tests | Unit + interaction + visual regression |

---

*This chapter defines the complete component API vocabulary for a Design System. Every prop pattern, composition strategy, accessibility contract, and TypeScript pattern above should be followed when building DS components.*
