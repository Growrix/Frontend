# Layout Composition Patterns

Reference patterns for section-level layout composition.

## Single Column

- Content centered with max-width constraint
- Typography and spacing carry the design
- Best for: articles, editorial content, focused messaging

```
[          content          ]
[          content          ]
[          content          ]
```

## Split (50/50)

- Two equal columns, typically content + visual
- Creates natural visual tension
- Best for: feature explanations, CTAs with imagery

```
[ content    |    visual   ]
```

## Split (60/40 or 40/60)

- Asymmetric split giving one column more weight
- The larger column carries the primary message
- Best for: product proof, comparison, feature highlight

```
[ primary content  |  visual ]
```

## Three Column Grid

- Balanced grid for multiple items of equal importance
- Risk: can feel generic if repeated too many times
- Best for: feature lists, team members, card collections

```
[ item 1  |  item 2  |  item 3 ]
```

## Staggered Grid

- Cards or items at different sizes or positions
- Breaks the uniformity of standard grids
- Best for: portfolio, testimonials, mixed content types

```
[ large item     |  small  ]
[  small  | medium item    ]
```

## Full Bleed

- Content stretches edge to edge with no container margin
- Creates dramatic visual moments
- Best for: hero sections, image galleries, section breaks

```
[========= full width =========]
```

## Sidebar + Main

- Persistent navigation or context panel alongside content
- Best for: documentation, settings, dashboard layouts

```
[ nav | main content area      ]
```

## Bento Grid

- Mixed-size cards arranged in a mosaic pattern
- Each card has different visual weight
- Best for: feature showcases, dashboards, product highlights

```
[ large       | med  ]
[ small | small | med ]
```

## Layered/Overlapping

- Elements intentionally overlap or break grid boundaries
- Creates depth and visual interest
- Best for: hero sections, editorial layouts, premium feel
- Use sparingly — requires careful spacing

```
    [  element A  ]
  [  element B overlapping  ]
```

## Composition Selection Guide

| Page Intent | Recommended Layouts |
|-------------|-------------------|
| Explain | Single column, Split, Three column |
| Prove | Split, Staggered, Bento |
| Convert | Split, Full bleed hero + focused CTA |
| Navigate | Sidebar + main, Three column grid |
| Demonstrate | Split, Full bleed, Bento |
| Reassure | Single column, Split with proof |
