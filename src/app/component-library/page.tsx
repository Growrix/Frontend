import Link from "next/link";

import { Card, Grid, Section, SectionHeader, Stack, Text } from "@/ds";

const CATEGORIES = [
  {
    id: "foundations",
    title: "Foundations",
    lede: "Typography, spacing, color tokens, and utility classes.",
    href: "/component-library/foundations",
  },
  {
    id: "primitives",
    title: "Primitives",
    lede: "Low-level building blocks used everywhere.",
    href: "/component-library/primitives",
  },
  {
    id: "components",
    title: "Components",
    lede: "Reusable UI blocks composed from primitives.",
    href: "/component-library/components",
  },
  {
    id: "patterns",
    title: "Patterns",
    lede: "Layouts and composed flows you can ship.",
    href: "/component-library/patterns",
  },
];

export default function ComponentLibraryOverviewPage() {
  return (
    <Section container="wide" size="lg">
      <Stack>
        <SectionHeader
          kicker="SaaS starter"
          title="Component Library"
          lede="Browse the DS by category. Each page uses tabs for fast auditing and future scaling."
        />

        <Grid cols={2}>
          {CATEGORIES.map((c) => (
            <Link key={c.id} href={c.href} className="ui-navlink ui-focus-ring" aria-label={`Open ${c.title}`}>
              <Card>
                <Stack gap="compact">
                  <div className="text-heading-4">{c.title}</div>
                  <Text tone="muted">{c.lede}</Text>
                </Stack>
              </Card>
            </Link>
          ))}
        </Grid>
      </Stack>
    </Section>
  );
}
