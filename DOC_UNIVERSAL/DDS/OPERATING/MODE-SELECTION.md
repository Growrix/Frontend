# Mode Selection

How to choose the right design mode for a page.

## Selection Algorithm

```
1. If this is a full website or reusable template, what is the site archetype?
2. What is the page type?
3. What is the primary intent?
4. What is the content density?
5. What is the audience expectation?
→ Select the mode that best matches all four.
```

Archetype acts as a tie-breaker when multiple modes could fit the same page type.

- `Local Service Lead Gen` usually favors `Bold Marketing` over `Mobile Native` for public pages.
- `Enterprise Trust` often favors `Clean SaaS` or restrained `Bold Marketing`.
- `Editorial Brand` usually favors `Editorial Narrative`.

## Quick Selection Matrix

| Page Type | Primary Intent | Recommended Mode |
|-----------|---------------|-----------------|
| Homepage | Acquire | Bold Marketing |
| Feature landing | Educate + Convert | Bold Marketing or Editorial Narrative |
| Pricing | Convert | Dense Data or Clean SaaS |
| Blog index | Navigate | Editorial Narrative |
| Blog article | Educate | Editorial Narrative |
| Case study | Prove | Editorial Narrative |
| Dashboard | Retain | Clean SaaS |
| Settings | Retain | Clean SaaS |
| Admin panel | Retain | Clean SaaS or Dense Data |
| Onboarding | Acquire | Clean SaaS or Mobile Native |
| Docs hub | Navigate | Clean SaaS |
| Comparison page | Prove + Convert | Dense Data |
| About page | Prove | Editorial Narrative or Bold Marketing |
| Mobile app screen | Any | Mobile Native |

## When To Override The Matrix

The matrix is a starting point. Override when:

- The chosen site archetype strongly points in a different direction
- The creative brief explicitly requests a different mode
- The brand personality clashes with the default mode
- The page serves an unusual intent combination
- User testing or feedback suggests a different approach

Document the override reason in the task or wireframe brief.

## Mode Mixing Rules

A single page should use one primary mode. However:

- A marketing page may include one Dense Data section (e.g., pricing table) within a Bold Marketing flow.
- A dashboard may include one Editorial section (e.g., tips or onboarding story) within a Clean SaaS flow.

Rules for mixing:

- The primary mode owns the page shell, hero, and overall rhythm.
- A secondary mode may influence at most 1-2 sections.
- Never mix more than two modes on one page.
- Document any mixing in the wireframe brief.

## Mode Definitions

Each mode is defined in its own file under `MODES/`:

- `CLEAN-SAAS.md` — utility-first, balanced, predictable
- `BOLD-MARKETING.md` — high-impact, conversion-driven, dynamic
- `EDITORIAL-NARRATIVE.md` — content-first, story-driven, spacious
- `DENSE-DATA.md` — information-dense, structured, compact
- `MOBILE-NATIVE.md` — app-like, touch-first, gesture-aware
