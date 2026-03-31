# Prototype Parity Checklist

## 1. Visual Parity

- [ ] Typography scale matches the prototype
- [ ] Spacing rhythm matches the prototype
- [ ] card, surface, border, and shadow behavior match the prototype
- [ ] icons, badges, inputs, buttons, and media blocks match the prototype
- [ ] no unintended DS visual pattern overrides the prototype intent

## 2. Layout Parity

- [ ] desktop layout structure matches the prototype
- [ ] mobile layout structure matches the prototype
- [ ] section ordering matches the prototype
- [ ] navigation placement matches the prototype
- [ ] overlay placement and stacking match the prototype

## 3. Interaction Parity

- [ ] buttons, links, tabs, drawers, and menus behave as expected
- [ ] modal open/close behavior matches the prototype
- [ ] form states and validation cues match the scoped behavior
- [ ] loading, empty, success, and error states match the scoped expectations

## 4. Framework And DS Compliance

- [ ] app imports UI only from `@/ds`
- [ ] no DS internals are imported from app code
- [ ] route files follow route group structure
- [ ] page files remain thin
- [ ] route map is updated
- [ ] no hardcoded styling leaked into app code

## 5. Verification Commands

- [ ] `npm run typecheck`
- [ ] `npm run lint`
- [ ] `npm test`
- [ ] `npm run build`
- [ ] `npm run ds:audit`
- [ ] `npm run ds:a11y`

## 6. Review Notes

- Screens reviewed:
- Mismatches found:
- Fixes applied:
- Remaining deviations approved:
