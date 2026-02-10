Alright, here’s a **clean, modern, production-ready mobile app UI frontend guideline** — the kind teams actually use to build scalable, polished apps (not Dribbble-only fantasy).

Think of this as your **design system north star for mobile apps** 📱
Platform-agnostic (works for iOS, Android, Web Apps, Expo, etc.)

---

## 1. Design Philosophy (Read This First)

**Principles**

* **Content first** → UI exists to serve user tasks, not decoration
* **Touch-first** → Everything is thumb-reachable
* **Predictable patterns** → Familiar beats clever
* **Calm UI** → Fewer colors, fewer fonts, fewer components
* **System > Screens** → You design rules, not pages

**Modern Mobile Look =**

* Flat + soft depth (not skeuomorphic)
* High contrast, minimal chrome
* Clear hierarchy
* Motion with purpose

---

## 2. Layout System (The Skeleton)

![Image](https://miro.medium.com/1%2AXJro6ujERnKVXIcDVXy6kw.png)

![Image](https://miro.medium.com/1%2AM_O4Ifns0far8YFEhLPpeg.png)

![Image](https://cdn.dribbble.com/userupload/15155542/file/original-95714278fcbbe58b7ea1fe33747b3952.jpg?resize=400x0)

![Image](https://cdn.dribbble.com/userupload/25340006/file/original-28d2b4ffe187d3dec9cb550a0bc45f31.png?resize=400x0)

### Screen Structure

Every screen follows this mental model:

```
Safe Area
 ├── App Bar (optional)
 ├── Content Area (scrollable)
 ├── Floating Elements (FAB / Toast)
 └── Bottom Navigation (optional)
```

### Spacing System (8pt Rule)

Use **multiples of 4 or 8 only**.

| Token | Size    |
| ----- | ------- |
| xs    | 4px     |
| sm    | 8px     |
| md    | 16px    |
| lg    | 24px    |
| xl    | 32px    |
| 2xl   | 40–48px |

**Rules**

* Padding inside cards: `16–20px`
* Section spacing: `24–32px`
* List item height: `48–56px` minimum

---

## 3. Typography System (Critical)

### Font Choice (Modern + Safe)

Use **ONE font family** with multiple weights.

**Best picks**

* `Inter` (🔥 default for modern apps)
* `SF Pro` (iOS native)
* `Roboto` (Android native)
* `Plus Jakarta Sans` (design-heavy apps)

**Rule**: Never mix font families unless branding demands it.

---

### Type Scale (Mobile-Optimized)

| Usage   | Size  | Weight   |
| ------- | ----- | -------- |
| Display | 28–32 | Bold     |
| Title   | 22–24 | Semibold |
| Section | 18–20 | Semibold |
| Body    | 15–16 | Regular  |
| Caption | 12–13 | Regular  |
| Micro   | 10–11 | Medium   |

**Line Height**

* Headings: `1.2–1.3`
* Body: `1.45–1.6`

**Rules**

* Max 2 font weights per screen
* Avoid center-aligned body text
* Titles left-aligned (almost always)

---

## 4. Color System (Design Tokens, Not Colors)

### Core Tokens

```ts
color.primary
color.background
color.surface
color.text.primary
color.text.secondary
color.border
color.success
color.warning
color.error
```

### Modern Color Guidelines

* Background: near-white or near-black (not pure)
* Primary: single brand color
* Secondary colors only for states

**Light Mode Example**

* Background: `#F9FAFB`
* Surface: `#FFFFFF`
* Text Primary: `#111827`
* Border: `#E5E7EB`

**Dark Mode**

* Background: `#0B0F19`
* Surface: `#111827`
* Text Primary: `#F9FAFB`

**Rules**

* Never use color alone to convey meaning
* Text contrast ≥ WCAG AA
* Avoid gradients unless branding requires it

---

## 5. Components (The Building Blocks)

### Buttons

**Sizes**

* Height: `44–48px`
* Radius: `12px` (modern feel)

**Variants**

* Primary (filled)
* Secondary (outline or soft)
* Ghost (text only)
* Destructive

**Rules**

* One primary action per screen
* Disable buttons with opacity + no shadow

---

### Inputs & Forms

* Height: `48–52px`
* Label above input (not placeholder-only)
* Clear error text below input
* Use helper text sparingly

**Do NOT**

* Hide labels
* Use red borders by default
* Animate errors aggressively

---

### Cards

* Radius: `16px`
* Padding: `16px`
* Shadow OR border, not both

---

### Lists

* Tap area ≥ `48px`
* Chevron only if navigates
* Avatar → Title → Meta → Action

---

## 6. Navigation Patterns

### Use One (Not All)

* Bottom Tab Navigation (3–5 tabs)
* Stack Navigation (push/pop)
* Modal Sheets (short tasks)

**Bottom Tabs**

* Icon + label (always)
* Active state clearly visible
* Avoid more than 5 tabs

---

## 7. Icons & Imagery

### Icons

* Single style only (outline or filled)
* 24px grid
* Stroke width consistent

**Good icon sets**

* Lucide
* SF Symbols
* Material Icons

### Images

* Rounded corners (`12–16px`)
* Use aspect ratios consistently
* Lazy load where possible

---

## 8. Motion & Micro-Interactions

**Motion Rules**

* 150–250ms duration
* Ease-out for entrances
* Ease-in for exits

**Use Motion For**

* Screen transitions
* Feedback (success/error)
* Loading states

**Avoid**

* Bouncy animations
* Infinite spinners without progress
* Animations without meaning

---

## 9. Accessibility (Non-Negotiable)

* Tap targets ≥ `44px`
* Supports system font scaling
* Visible focus states
* Color contrast AA+
* Screen reader labels

---

## 10. State Design (Most Apps Fail Here)

Every component must define:

* Default
* Hover / Pressed
* Disabled
* Loading
* Error
* Empty state

**Empty State Formula**

```
Icon
Clear message
Optional action
```

---

## 11. File & Design System Structure (Frontend-Friendly)

```
ui/
 ├── tokens/
 │   ├── colors.ts
 │   ├── spacing.ts
 │   ├── typography.ts
 │
 ├── components/
 │   ├── Button/
 │   ├── Input/
 │   ├── Card/
 │
 ├── layouts/
 │   ├── Screen.tsx
 │   ├── Modal.tsx
```

No hardcoded values in components. Ever.

---

## 12. Final Golden Rules

* Design systems scale, screens don’t
* Fewer components → better UX
* Consistency beats creativity
* If it’s not reusable, it’s probably wrong
* Mobile UI is about **removing**, not adding

---

If you want, next I can:

* Turn this into a **Figma design system**
* Map this directly to **React Native / Expo components**
* Create a **real starter app UI** using these rules
* Align this with your **Design System runtime architecture**

Just tell me the next move 👇
