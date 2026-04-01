# Mode: Editorial Narrative

Content-first composition for pages driven by storytelling, education, and long-form reading.

## When To Use

- Blog articles
- Blog index
- Case studies
- About pages
- Company story pages
- Feature deep dives
- Knowledge base articles
- Any page where the content is the product

## Composition Rules

### Layout

- Reading-optimized column widths (max 65-75ch for body text)
- Generous margins that frame content instead of cramming it
- Pull quotes, callouts, or inline figures break the text rhythm
- Sidebar optional for navigation or related content
- Full-width moments for images, quotes, or section breaks

### Rhythm

- Flowing, not grid-locked — sections blend rather than stack
- Content cadence follows the writing structure: intro → body → proof → conclusion
- Visual breathing room between major content blocks
- Image or quote insertions break text monotony every 2-3 paragraphs in long content
- Sections feel like chapters, not cards

### Hero

- Types: editorial collage, story-led hero, statement hero with editorial treatment
- Title typography is the primary visual anchor
- Author/date/category meta visible but subdued
- Cover images are optional — strong typography can carry the hero alone
- No decorative chrome competing with the headline

### Sections

- Content sections flow naturally from one to the next
- Pull quotes anchor the middle of long content
- Inline evidence (screenshots, data, examples) appears near relevant text
- Related content or next steps appear at the end
- No feature-grid or card-grid sections in editorial flow

### CTA

- CTAs are contextual and unobtrusive — inline links, end-of-article prompts
- Subscribe or continue-reading actions fit the editorial mood
- No aggressive conversion CTAs in the middle of a story
- End-of-content CTA block is appropriate

## DS Mapping Hints

- Shell: `PublicShell`
- Components: prose content blocks, pull quotes via `text-quote`, author info sections, related content grids with Card
- Density: `spacious`
- Visual knobs: default or `sleek`
- Semantic classes: `prose`, `ui-section`, `ui-stack`

## Anti-Patterns For This Mode

- Wrapping article content in cards
- Using dashboard-style section headers in editorial content
- Breaking the reading flow with unrelated CTAs or ads
- Making every paragraph the same visual weight
- Using grid layouts where flowing prose is more appropriate
- Heavy navigation chrome that competes with the content
