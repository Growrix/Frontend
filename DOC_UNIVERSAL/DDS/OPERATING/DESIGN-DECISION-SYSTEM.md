# Design Decision System — Core Architecture

The five-layer model that drives every creative frontend decision.

## The Five Layers

Every creative decision flows through these layers in order. For full websites, skipping the archetype layer usually produces cohesive-but-boring output.

```
Layer 1: Archetype    → What kind of website are we building overall?
Layer 2: Page Type    → What kind of page is this?
Layer 3: Intent       → What is this page trying to achieve?
Layer 4: Mode         → What composition behavior fits this intent?
Layer 5: Preset       → What aesthetic personality should the page carry?
```

For single-page creative tasks, the archetype may be omitted if the site context is already fixed. For multi-page public sites, reusable templates, or theme families, the archetype should be explicit.

### Layer 1 — Site Archetype

Before planning individual pages for a public website, classify the overall site strategy.

See `DDS/ARCHETYPES/README.md` for the available archetypes.

The archetype determines site-level expectations such as:

- where trust appears first
- how aggressive the CTA strategy should be
- how much storytelling versus proof is normal
- what kind of section rhythm the site should maintain
- what visual mistakes make the whole site feel generic

### Layer 2 — Page Type Classification

Before choosing any visual treatment, classify the page.

See `PAGE-TYPE-TAXONOMY.md` for the full taxonomy.

The page type determines the default composition constraints:

- how many sections are expected
- how dense the content should be
- how prominent the hero should be
- what proof patterns are appropriate
- what CTA density is normal

### Layer 3 — Intent Model

Within the page type, define the page intent:

| Intent | Description | Example |
|--------|-------------|---------|
| Acquire | Get new users to sign up | Homepage hero with CTA |
| Educate | Teach the reader something | Feature deep dive |
| Prove | Build trust and credibility | Case study, testimonials |
| Convert | Push toward a specific action | Pricing page, trial start |
| Navigate | Help users find what they need | Blog index, docs hub |
| Retain | Keep existing users engaged | Dashboard overview |

A page may have a primary intent and one secondary intent. It should never try to serve more than two.

### Layer 4 — Design Mode

The design mode controls composition behavior — how sections are laid out, how much visual tension exists, and how the rhythm flows.

See `MODE-SELECTION.md` for the selection algorithm and `MODES/` for individual mode definitions.

Available modes:

| Mode | Best For |
|------|----------|
| Clean SaaS | Dashboard, settings, admin, utility pages |
| Bold Marketing | Homepage, launch pages, high-conversion landing |
| Editorial Narrative | Blog, case study, about page, story-led content |
| Dense Data | Analytics, reports, comparison tables, pricing |
| Mobile Native | App-like experiences, mobile-first flows |

### Layer 5 — Preset Family

The preset family controls the aesthetic personality — the feel, warmth, sharpness, and visual character.

See `PRESETS/` for individual preset definitions.

Available presets:

| Preset | Character |
|--------|-----------|
| Neutral Professional | Clean, safe, corporate-friendly |
| Editorial Premium | Spacious, typographic, magazine-inspired |
| Warm Human | Soft, approachable, rounded, friendly |
| Technical Sharp | Precise, high-contrast, developer-oriented |
| High-Energy Launch | Bold, vibrant, high-contrast, startup-launch |

## Archetype vs Mode vs Preset

This is the site-level distinction the DDS must preserve.

- **Archetype** = overall website strategy and page-role behavior
- **Mode** = per-page composition behavior
- **Preset** = visual personality

Example:

- Archetype: `Local Service Lead Gen`
- Mode: `Bold Marketing`
- Preset: `Warm Human`

This means:

- the whole site should behave like a local trust-and-conversion website
- individual pages should compose with Bold Marketing structure
- the visual character should feel warm and approachable

## Mode vs Preset

This remains the most important page-level distinction in the DDS.

**Mode** = how the page is composed (structure, rhythm, density, tension)
**Preset** = how the page feels (color character, typography weight, shape language, surface treatment)

They are independent axes:

- Bold Marketing + Editorial Premium = dramatic launch page with magazine feel
- Clean SaaS + Technical Sharp = utility dashboard with developer precision
- Editorial Narrative + Warm Human = friendly longform storytelling

Any mode can pair with any preset. The combination creates the page personality.

## Decision Flow

```
1. For full websites or templates, classify the site archetype
2. Classify the page type
3. Define the page intent (primary + optional secondary)
4. Select the design mode based on archetype, type, and intent
5. Select the preset family based on brand direction
6. Load the archetype file + mode file + preset file
7. Compose using archetype strategy + mode composition rules + preset aesthetic rules
8. Run the anti-generic review
```

## Defaults And Overrides

If no creative brief exists:

- Archetype: none
- Page type: infer from route group
- Intent: infer from page name
- Mode: `Clean SaaS`
- Preset: `Neutral Professional`

These defaults produce safe but generic output. For any user-facing marketing or public site, the brief should explicitly choose an archetype, mode, and preset.

## Relationship To Other Systems

| System | Role |
|--------|------|
| DS (`src/ds/`) | Provides the building blocks |
| DDS (`DOC_UNIVERSAL/DDS/`) | Tells AI which blocks to use and how |
| App Structure (`STANDARDS/APP-STRUCTURE.md`) | Defines route groups and shell selection |
| Engineering Standards (`CORE/ENGINEERING-STANDARDS.md`) | Code quality and architecture rules |

The DDS does not override any of these. It adds a creative decision layer on top.
