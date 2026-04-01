# Creative Direction

Visual direction dimensions and required outputs for creative frontend work.

## Purpose

This file defines the vocabulary and dimensions AI must use when making visual direction decisions. It does not define composition rules (see mode files) or review criteria (see `ANTI-GENERIC-REVIEW.md`).

## Required Outputs For Creative Frontend Work

Before implementation, the task must define:

1. a visual direction (using the dimensions below)
2. a page composition strategy (using the selected mode)
3. a preset choice or a reason to stay on the default preset
4. banned patterns for the page or project

Use templates from `DDS/TEMPLATES/` when the project does not already have a visual brief.

## Visual Direction Dimensions

Every creative frontend task must define these dimensions explicitly.

### Brand Personality

Choose 3-5 adjectives that describe the intended feel.

Examples:

- editorial
- premium
- technical
- bold
- quiet
- warm
- sharp
- trustworthy
- high-energy

Also define 2-3 adjectives the UI must avoid.

Examples:

- generic
- playful
- corporate-flat
- noisy
- sterile

### Product Posture

Choose the primary posture:

- story-led
- product-led
- proof-led
- editorial-led
- utility-led

### Spatial Density

Choose one primary density:

- spacious
- balanced
- compact

Do not mix all three without a reason. One density should dominate.

### Shape Language

Choose the dominant shape system:

- soft
- balanced
- sharp

This should influence radius, card usage, icon framing, and button character.

### Depth Model

Choose the dominant surface behavior:

- flat
- layered
- glass
- tactile
- restrained-depth

### Motion Character

Choose the motion tone:

- restrained
- crisp
- expressive
- near-static

### Imagery And Graphic Mode

Define the primary visual anchor style:

- product UI screenshots
- editorial photography
- abstract gradients
- geometric shapes
- illustrations
- diagrams
- mixed media collage

### Typographic Posture

Choose the content voice:

- editorial display-heavy
- balanced brand display
- product-neutral
- technical compact

## Mapping Dimensions To Presets

Each preset in `PRESETS/` is a named combination of these dimensions. Use the preset definitions to see how dimensions map to concrete visual rules:

| Preset | Density | Shape | Depth | Motion | Typography |
|--------|---------|-------|-------|--------|------------|
| Neutral Professional | balanced | balanced | restrained-depth | restrained | product-neutral |
| Editorial Premium | spacious | soft-to-balanced | layered | crisp | editorial display-heavy |
| Warm Human | balanced-to-spacious | soft | layered | expressive | balanced brand display |
| Technical Sharp | balanced-to-compact | sharp | flat-to-restrained | crisp | technical compact |
| High-Energy Launch | balanced-to-spacious | balanced-to-sharp | layered | expressive | editorial display-heavy |

If no preset matches the brief, define the dimensions explicitly and flag the need for a custom preset.

## Theme Strategy Rules

- Themes and presets should reinforce the visual direction, not replace it.
- Do not create a new theme to solve a page-composition problem.
- Do not create page-local color systems outside the DS token model.
- If a new preset is needed, define it first in a theme preset brief before changing DS implementation.
- See `THEME-PRESET-SYSTEM.md` for the full preset governance and approval process.
