# Mode: Bold Marketing

High-impact composition for conversion-driven pages with strong visual presence.

## When To Use

- Homepage
- Product launch pages
- High-conversion landing pages
- Feature announcement pages
- Campaign-specific pages
- Any page where the primary goal is acquisition or conversion

## Composition Rules

### Layout

- Full-width sections with intentional edge-to-edge moments
- Asymmetric layouts allowed and encouraged for hero sections
- Column splits should vary between sections (60/40, 50/50, full-width)
- Visual tension through contrast between tight and expansive sections
- At least one section should break the grid for visual impact

### Rhythm

- Strong rhythm variation — dense sections followed by breathable ones
- Visual escalation toward conversion points
- Midpoint reset (a section that shifts the visual energy)
- Late-page intensity increase before the final CTA
- No more than two consecutive sections with the same layout pattern

### Hero

- Dominant, must own the first viewport
- Types: statement + product proof, split hero, media-led
- Must include a primary visual anchor (not just centered text)
- Primary CTA visible above the fold
- Background treatment should set the page tone

### Sections

- Each section has a distinct visual role — no uniform card grids
- Proof sections use real data: metrics, screenshots, quotes, logos
- At least one section uses editorial contrast (different background, layout, or scale)
- Feature sections show the product working, not just describing it
- Social proof sections feel curated, not templated

### CTA

- Primary CTA in hero and at least once after midpoint
- CTA style should escalate — subtle early, confident late
- Do not clutter every section with competing CTAs
- Final CTA block should feel like a confident close, not a desperate repeat

## DS Mapping Hints

- Shell: `PublicShell`
- Components: hero composition with `ui-hero`, feature sections with Card and ImageCard, proof blocks with metrics/quotes/logos, CTA section blocks
- Density: `spacious` to `balanced`
- Visual knobs: `glass` or custom per preset
- Semantic classes: `ui-section`, `ui-hero`, `ui-card`, `ui-grid`

## Anti-Patterns For This Mode

- Safe centered hero with a gradient blob and no product proof
- Identical 3-column card grids repeated for features, testimonials, and pricing
- Every section same width, same background, same rhythm
- Stock photography as the primary visual anchor
- Hiding the CTA below the fold with no repeat
- Using dashboard patterns (data tables, settings forms) on a marketing page
