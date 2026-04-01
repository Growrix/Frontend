# Wireframe Standards

Standards for planning page structure before implementation so AI does not improvise weak layout patterns.

## Goal

Make wireframes useful for both humans and AI by defining structure, hierarchy, section roles, and DS fit before UI build starts.

## What A Wireframe Must Capture

A wireframe is not only a box diagram. It must define:

- page objective
- audience
- page posture
- section order
- content hierarchy
- primary CTA path
- major visual anchors
- desktop and mobile behavior
- DS mapping constraints

## Required Wireframe Levels

### Level 1 — Structural Wireframe

Used to define page sections, hierarchy, and CTA sequence.

### Level 2 — Directional Wireframe

Adds page rhythm, asymmetry, focal points, density decisions, and hero type.

### Level 3 — Implementation Wireframe

Maps the wireframe to DS shells, components, primitives, semantic classes, and runtime knobs.

Do not skip directly from a rough idea to implementation for high-visibility pages.

## Required Fields Per Page

Every page wireframe brief must define:

1. page goal
2. audience and trust level
3. page type
4. visual direction family
5. hero type
6. section sequence
7. CTA strategy
8. proof strategy
9. mobile adaptation plan
10. DS mapping notes

## Page Types

Classify the page before designing it. See `PAGE-TYPE-TAXONOMY.md` for the full taxonomy.

## Hero Standards

Choose one hero type explicitly:

- statement + product proof
- split hero
- editorial collage
- metric-led hero
- story-led hero
- feature stack hero
- media-led hero

Every hero must define:

- primary statement
- supporting proof
- main CTA
- visual anchor
- fallback mobile structure

## Section Standards

Each section in a wireframe must declare:

- section role
- content priority
- layout pattern
- visual anchor
- interaction expectations
- mobile collapse strategy

Section roles should be one of:

- explain
- prove
- compare
- demonstrate
- reassure
- convert
- navigate

## Rhythm And Contrast Rules

- Do not let all sections use the same column split.
- Do not let all sections use the same background treatment.
- Alternate between dense and breathable moments intentionally.
- Use contrast through scale, layout, or content emphasis, not only color.
- At least one section should provide a strong midpoint or late-page reset.

## DS Fit Rules

- Wireframes must map to the DS consumption hierarchy.
- If the wireframe depends on a pattern the DS does not support, record it before implementation.
- Do not invent bespoke page widgets unless the wireframe proves the DS cannot solve the need.
- Theme, density, and visual knobs must be chosen at the page or shell level.

## Mobile Rules

- Mobile is not a compressed desktop screenshot.
- Define which visual anchors survive on mobile and which are simplified.
- Preserve CTA clarity and hierarchy on first mobile viewport.
- Avoid stacking too many card-heavy sections in mobile without contrast or pacing shifts.

## Wireframe Review Checklist

- Is the page objective clear?
- Is the hero type explicit?
- Does each section have a real role?
- Is the CTA path obvious?
- Does the page rhythm avoid repetition?
- Is the mobile plan defined?
- Can the design be implemented with the current DS or is a gap recorded?
