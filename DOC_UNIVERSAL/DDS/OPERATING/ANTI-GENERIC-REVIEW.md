# Anti-Generic Review

Mandatory checklist to run after composing any creative frontend page. This catches bland, templated, or personality-free output before it ships.

## The Core Question

> If the logo and copy were replaced with another company's, would the page still look intentional and distinctive?

If the answer is no, the page is generic and needs revision.

## Composition Review

- [ ] Does the hero have a dominant visual anchor (not just centered text)?
- [ ] Is the hero type explicitly chosen, not defaulted to the safest option?
- [ ] Do sections have varied visual weight instead of uniform card grids?
- [ ] Is there at least one section that breaks the default rhythm?
- [ ] Does the page avoid more than two consecutive sections with the same layout pattern?
- [ ] Is there a clear midpoint shift or late-page reset in the section flow?

## Identity Review

- [ ] Are the brand personality adjectives reflected in the actual composition?
- [ ] Does the page avoid the "any SaaS could use this" feel?
- [ ] Are proof elements specific (real metrics, real screenshots, real quotes) not placeholder-shaped?
- [ ] Does the imagery or visual anchor match the stated direction family?

## Rhythm And Density Review

- [ ] Does the page alternate between dense and breathable sections?
- [ ] Are backgrounds varied intentionally, not all the same surface?
- [ ] Is there visual escalation toward conversion points?
- [ ] Does whitespace serve a purpose (emphasis or breathing room) rather than filling leftover space?

## CTA Review

- [ ] Is the primary CTA visible in the first viewport?
- [ ] Does the CTA appear at least once more after the midpoint?
- [ ] Are CTA styles consistent with the preset personality?
- [ ] Does the page avoid cluttering every section with competing CTAs?

## Mobile Review

- [ ] Does the mobile version preserve the hero's visual anchor?
- [ ] Are stacked card sections reduced or re-composed for mobile?
- [ ] Is the primary CTA reachable without excessive scrolling?
- [ ] Do dense sections have a reasonable mobile collapse strategy?

## DS Compliance Review

- [ ] Are all visual values traceable to DS tokens?
- [ ] Are components from `@/ds` used instead of bespoke alternatives?
- [ ] Are runtime knobs set at the shell or page level, not scattered?
- [ ] Are semantic classes used instead of raw Tailwind for DS-covered concerns?

## Anti-Pattern Flags

The page fails this review if any of these are true:

- All sections look like the same card grid with different icons
- The hero is just centered text with a gradient background
- Every section has the same background and container width
- Badges and pills appear in every block without serving hierarchy
- The layout is purely symmetric top to bottom with no focal tension
- Decorative elements (gradients, blobs, glow) exist without supporting hierarchy
- A "safe modern" style was chosen when the brief asked for distinctive personality

## Review Outcome

- **Pass**: All composition, identity, and rhythm checks are satisfied
- **Partial**: Most checks pass but 1-2 items need minor revision
- **Fail**: Multiple checks fail or the core question answer is "no"

Record the outcome in the task notes using the DDS summary format from `AI-EXECUTION-FLOW.md`.
