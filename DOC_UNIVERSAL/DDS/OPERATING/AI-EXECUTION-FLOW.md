# AI Execution Flow

Step-by-step workflow AI must follow for any creative frontend task.

## Pre-Composition Phase

### Step 1 — Load Context

Read in order:

1. `DDS/README.md`
2. `DDS/OPERATING/DESIGN-DECISION-SYSTEM.md`
3. This file

### Step 2 — Classify The Page

Use `PAGE-TYPE-TAXONOMY.md` to classify the page.

Output:

```
Page type: [type]
Primary intent: [intent]
Secondary intent: [intent or none]
```

### Step 3 — Check For A Brief

Does the task include a visual direction brief or wireframe brief?

- **Yes** → Use the brief as the creative authority. Skip to Step 5.
- **No** → Continue to Step 4 to make decisions from defaults.

### Step 4 — Make Design Decisions

If no brief exists, decide:

1. **Mode**: Use `MODE-SELECTION.md` to pick the mode. Load the specific mode file from `MODES/`.
2. **Preset**: Check if the task or project specifies a preset. If not, use `Neutral Professional` as default.
3. **Visual direction**: Define at minimum — brand personality (3 adjectives), density, and shape language.

Output:

```
Mode: [mode name]
Preset: [preset name]
Brand feel: [3 adjectives]
Density: [spacious | balanced | compact]
Shape: [soft | balanced | sharp]
```

### Step 5 — Load Mode And Preset

Read:

- The selected mode file from `MODES/[mode].md`
- The selected preset file from `PRESETS/[preset].md`

These files define the composition rules and aesthetic constraints for the build.

## Composition Phase

### Step 6 — Plan The Page Structure

Before writing any code:

1. Define the hero type and content
2. List all sections in order with their roles
3. Identify the rhythm pattern (which sections are dense vs breathable)
4. Mark the primary and secondary CTA positions
5. Note any mobile-specific adaptations

### Step 7 — Map To DS

For each section:

1. Choose the shell
2. Choose DS components and primitives
3. Choose semantic classes if needed
4. Set runtime knobs at the appropriate level

Do not invent custom components when DS blocks exist.

### Step 8 — Implement

Build the page following the composition plan from Step 6 and the DS mapping from Step 7.

Rules during implementation:

- Follow the mode's composition rules
- Follow the preset's aesthetic rules
- Follow the DS consumption hierarchy
- Do not fall back to generic patterns when the mode specifies something different

## Review Phase

### Step 9 — Anti-Generic Review

Run the checklist from `ANTI-GENERIC-REVIEW.md` against the implemented page.

Every question must have a clear answer. If any answer is "no" or unclear, revise before marking the task done.

### Step 10 — Document Decisions

In the task notes or PR, record:

```
DDS Summary:
- Page type: [type]
- Intent: [primary] + [secondary]
- Mode: [mode]
- Preset: [preset]
- Visual direction: [3 adjectives]
- Anti-generic review: pass/fail
```

## Quick Reference

```
Load → Classify → Brief check → Decide mode+preset → Load mode+preset → Plan structure → Map to DS → Implement → Review → Document
```

## Emergency Defaults

When there is truly no creative direction and the task cannot wait:

- Mode: Clean SaaS
- Preset: Neutral Professional
- Hero: statement + product proof
- Density: balanced
- Shape: balanced

These defaults produce safe but unremarkable output. Flag the task for creative review.
