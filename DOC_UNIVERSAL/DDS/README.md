# Design Decision System (DDS)

The creative second layer that tells AI **what to build** and **how it should feel**, sitting on top of the Design System which tells AI **what is safe to build**.

## Problem This Solves

The DS prevents inconsistency but does not prevent blandness. Without creative direction, AI produces generic SaaS templates — identical card grids, safe hero sections, and interchangeable layouts that could belong to any product.

The DDS closes that gap by providing:

- page type classification
- intent-driven design mode selection
- composition rules that prevent generic output
- preset families that give pages a distinct personality
- a reviewable anti-generic checklist

## Core Principle

Design = 70% system + 30% creativity.

The DS owns the 70%. The DDS owns the 30%.

## Relationship To The DS

| Layer | Authority | Lives In |
|-------|-----------|----------|
| Design System | Implementation, tokens, components, runtime | `src/ds/` |
| Design Decision System | Creative direction, modes, presets, composition | `DOC_UNIVERSAL/DDS/` |

The DDS never bypasses the DS. It tells AI which DS tools to reach for and how to compose them with intention.

For full public websites and reusable templates, the DDS also needs a site-level layer:

- **Archetype** = the overall website strategy
- **Mode** = per-page composition behavior
- **Preset** = aesthetic personality

## Folder Structure

```
DDS/
├── README.md                          ← you are here
├── ARCHETYPES/                        ← reusable site-level website strategies
│   ├── README.md                      ← archetype index and read policy
│   ├── LOCAL-SERVICE-LEAD-GEN.md
│   ├── B2B-SAAS-MARKETING.md
│   ├── PRODUCT-LAUNCH.md
│   ├── ENTERPRISE-TRUST.md
│   └── EDITORIAL-BRAND.md
├── OPERATING/                         ← authoritative rules AI must follow
│   ├── DESIGN-DECISION-SYSTEM.md      ← core DDS architecture and five-layer model
│   ├── MODE-SELECTION.md              ← how to pick the right design mode
│   ├── PAGE-TYPE-TAXONOMY.md          ← page classification before composition
│   ├── AI-EXECUTION-FLOW.md           ← step-by-step AI creative workflow
│   ├── ANTI-GENERIC-REVIEW.md         ← mandatory review checklist
│   ├── CREATIVE-DIRECTION.md          ← visual direction dimensions and families
│   ├── WIREFRAME-STANDARDS.md         ← page structure planning rules
│   └── THEME-PRESET-SYSTEM.md         ← preset governance and approval
├── MODES/                             ← design mode definitions
│   ├── README.md                      ← mode index and selection guide
│   ├── CLEAN-SAAS.md
│   ├── BOLD-MARKETING.md
│   ├── EDITORIAL-NARRATIVE.md
│   ├── DENSE-DATA.md
│   └── MOBILE-NATIVE.md
├── PRESETS/                           ← visual preset families
│   ├── README.md                      ← preset index and mapping guide
│   ├── NEUTRAL-PROFESSIONAL.md
│   ├── EDITORIAL-PREMIUM.md
│   ├── WARM-HUMAN.md
│   ├── TECHNICAL-SHARP.md
│   └── HIGH-ENERGY-LAUNCH.md
├── TEMPLATES/                         ← reusable briefs for creative tasks
│   ├── VISUAL-DIRECTION.template.md
│   ├── WIREFRAME-BRIEF.template.md
│   ├── THEME-PRESET.template.md
│   └── DESIGN-DECISION-BRIEF.template.md
└── REFERENCE/                         ← non-authoritative inspiration and examples
    ├── README.md
    ├── HERO-PATTERNS.md
    ├── SECTION-RHYTHM.md
    └── LAYOUT-COMPOSITION-PATTERNS.md
```

## AI Read Policy

### Always read for creative frontend work

1. `DDS/README.md` (this file)
2. `DDS/OPERATING/DESIGN-DECISION-SYSTEM.md`
3. `DDS/OPERATING/AI-EXECUTION-FLOW.md`

### Then load based on task

- Full website, reusable template, or public site build → selected archetype from `ARCHETYPES/`
- Page design → `OPERATING/PAGE-TYPE-TAXONOMY.md` + `OPERATING/MODE-SELECTION.md`
- Visual direction → `OPERATING/CREATIVE-DIRECTION.md` + relevant mode from `MODES/`
- Wireframing → `OPERATING/WIREFRAME-STANDARDS.md`
- Theme work → `OPERATING/THEME-PRESET-SYSTEM.md` + relevant preset from `PRESETS/`
- Review → `OPERATING/ANTI-GENERIC-REVIEW.md`

### Never load by default

- `REFERENCE/` files — only when seeking inspiration patterns
- All `MODES/` or `PRESETS/` files at once — load only the one selected by the mode/preset decision

## When To Load The DDS

Load for:

- homepage design
- multi-page public websites
- landing pages
- marketing sites
- public website redesigns
- visual refresh work
- theme or preset creation
- reusable web template creation
- creative wireframing
- any task where visual identity or composition quality matters

Do not load for:

- dashboard CRUD screens
- admin utilities
- settings pages
- pure backend work
- DS implementation tasks

## Success Criteria

The DDS is working when:

- AI asks "what should this feel like?" before composing
- full websites have a stated site archetype before page composition begins
- Pages have a stated visual direction, not an implied one
- No two marketing pages look like the same SaaS template
- The anti-generic checklist catches bland output before merge
- Creative decisions are traceable to a brief, not to AI defaults
