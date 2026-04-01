# Theme Preset System

Rules for creating future visual presets without turning themes into uncontrolled one-off styling.

## Goal

Separate implementation-safe theming from project-specific visual direction so future themes can be added deliberately.

## Definitions

### Theme

Base DS appearance system such as light, dark, or future approved appearance modes.

### Preset

A named combination of visual choices that sits on top of the DS theme model.

Examples:

- `editorial-premium`
- `product-modern`
- `technical-bold`
- `quiet-minimal`

### Visual Direction Brief

Project-specific explanation of what aesthetic the preset should support.

## What A Preset May Control

- typography posture
- accent usage intensity
- radius character
- border weight and contrast
- elevation behavior
- density bias
- visual knob defaults
- motion character
- background treatment family
- image framing rules

## What A Preset Must Not Do

- bypass token architecture
- introduce page-local hardcoded palettes
- create one-off component forks for a single page
- replace accessibility rules with style exceptions
- hide weak composition behind stronger decoration

## Required Preset Dimensions

Every preset proposal must define:

1. preset name
2. intended use cases
3. visual direction family
4. typography posture
5. shape language
6. depth model
7. density preference
8. motion preference
9. imagery mode
10. DS impact level

## Preset Naming Rules

- Use descriptive names tied to mood or posture, not trend language.
- Avoid vague names such as `modern-2`, `clean-new`, or `vibe-a`.
- Prefer names that help AI infer composition behavior.

## Preset Approval Rules

- If a preset can be expressed with existing DS knobs and tokens, keep it at the project brief level first.
- If a preset needs shared DS implementation changes, open an approved DS change task.
- Document the preset in a dedicated brief before implementation begins.

## Future Theme Build Process

1. create a visual direction brief
2. choose an existing preset or define a new preset brief
3. map the preset to existing DS tokens and knobs
4. identify true DS gaps
5. implement only the shared, reusable delta
6. document the resulting preset behavior

## Preset Review Checklist

- Does the preset solve a reusable problem?
- Is the preset name meaningful?
- Could the effect be achieved through better composition instead of new theme work?
- Are all visual choices traceable to DS-controlled values?
- Will this preset help AI make better design decisions, not just different colors?
