import Link from "next/link";

import {
  Badge,
  Button,
  Card,
  Divider,
  Grid,
  PublicHeaderBar,
  PublicShell,
  Section,
  SectionHeader,
  Spacer,
  Stack,
  Text,
  ThemeSwitcher,
} from "@/ds";

import { ComponentLibraryClient } from "./_components/ComponentLibraryClient";

const MOCK_CATEGORIES = [
  {
    id: "foundations",
    title: "Foundations",
    lede: "Typography, spacing, color tokens, and utility classes.",
  },
  {
    id: "primitives",
    title: "Primitives",
    lede: "Low-level building blocks used everywhere.",
  },
  {
    id: "components",
    title: "Components",
    lede: "Reusable UI blocks composed from primitives.",
  },
  {
    id: "patterns",
    title: "Patterns",
    lede: "Navigation + overlays + feedback patterns.",
  },
];

export default function ComponentLibraryPage() {
  return (
    <PublicShell
      header={
        <PublicHeaderBar>
          <div className="ui-row ui-row--between">
            <div className="ui-row">
              <Link className="ui-navlink ui-focus-ring" href="/">
                <strong className="text-label">SolarMatch</strong>
              </Link>
              <Badge tone="accent">Component Library</Badge>
            </div>

            <div className="ui-row">
              <ThemeSwitcher />
              <Link className="ui-navlink ui-focus-ring" href="/dashboard">
                Dashboard
              </Link>
              <Link className="ui-navlink ui-focus-ring" href="/component-library">
                Component Library
              </Link>
              <Link className="ui-navlink ui-focus-ring" href="/docs">
                Docs
              </Link>
              <Button size="sm" variant="primary">
                Get Started
              </Button>
            </div>
          </div>
        </PublicHeaderBar>
      }
      footer={
        <div className="ui-band ui-band--surface">
          <div className="ui-container">
            <Stack>
              <Divider />
              <Text tone="muted">This page is intentionally structured by category for easy expansion.</Text>
              <Spacer size={4} />
            </Stack>
          </div>
        </div>
      }
    >
      <div id="main">
        <Section container="wide" size="lg">
          <Stack>
            <div className="ui-text-center">
              <div className="ui-kicker">Design System</div>
              <h1 className="text-heading-1">Component Library</h1>
              <div className="text-body-large ui-center">
                A single place to view everything built so far, grouped by category.
              </div>

              <Spacer size={4} />
              <div className="ui-row ui-row--center">
                {MOCK_CATEGORIES.map((c) => (
                  <a key={c.id} className="ui-button ui-button--sm ui-button--secondary ui-focus-ring" href={`#${c.id}`}>
                    {c.title}
                  </a>
                ))}
              </div>
            </div>
          </Stack>
        </Section>

        <Section id="foundations" tone="surface" container="wide">
          <Stack>
            <SectionHeader
              kicker="Category"
              title="Foundations"
              lede="Typography + utility classes that make the UI consistent."
            />

            <Grid cols={2}>
              <Card>
                <Stack gap="compact">
                  <div className="text-heading-4">Typography scale</div>
                  <div className="text-heading-1">Heading 1</div>
                  <div className="text-heading-2">Heading 2</div>
                  <div className="text-heading-3">Heading 3</div>
                  <div className="text-heading-4">Heading 4</div>
                <Text>Body</Text>
                <div className="text-body-large">Body large</div>
                <div className="text-body-small">Body small</div>
                <div className="text-caption">Caption</div>
                <div className="text-micro">Micro</div>
              </Stack>
              </Card>

            <Card>
              <Stack gap="compact">
                <div className="text-heading-4">Tokens (semantic)</div>
                <Text tone="muted">
                  Components consume semantic tokens (colors, radii, spacing). No component-level hardcoded colors.
                </Text>
                <div className="ui-row">
                  <Badge tone="accent">accent</Badge>
                  <Badge tone="success">success</Badge>
                  <Badge tone="warning">warning</Badge>
                  <Badge tone="danger">danger</Badge>
                  <Badge tone="info">info</Badge>
                </div>
              </Stack>
            </Card>
          </Grid>
        </Stack>
      </Section>

      <Section id="primitives" container="wide">
        <Stack>
          <SectionHeader
            kicker="Category"
            title="Primitives"
            lede="Common building blocks (buttons, cards, grids, spacing)."
          />

          <Grid cols={2}>
            <Card>
              <Stack gap="compact">
                <div className="text-heading-4">Buttons</div>
                <div className="ui-row">
                  <Button size="sm">Primary</Button>
                  <Button size="sm" variant="secondary">
                    Secondary
                  </Button>
                  <Button size="sm" variant="ghost">
                    Ghost
                  </Button>
                  <Button size="sm" variant="text">
                    Text
                  </Button>
                </div>
                <div className="ui-row">
                  <Button size="sm" isLoading loadingText="Loading…">
                    Loading
                  </Button>
                </div>
              </Stack>
            </Card>

            <Card>
              <Stack gap="compact">
                <div className="text-heading-4">Layout helpers</div>
                <Text tone="muted">Use Stack/Grid/Spacer/Divider/Section to compose screens quickly.</Text>
                <Divider />
                <Spacer size={2} />
                <Text tone="muted">This page uses those primitives under the hood.</Text>
              </Stack>
            </Card>
          </Grid>
        </Stack>
      </Section>

      <Section id="components" tone="surface" container="wide">
        <Stack>
          <SectionHeader
            kicker="Category"
            title="Components"
            lede="Reusable UI blocks (forms, badges, alerts, etc.)."
          />

          <ComponentLibraryClient />
        </Stack>
      </Section>

        <Section id="patterns" container="wide">
          <Stack>
            <SectionHeader
              kicker="Category"
              title="Patterns"
              lede="Navigation, overlays, and feedback patterns live in one place (expandable later)."
              align="center"
            />

            <Card>
              <Stack gap="compact">
                <div className="text-heading-4">How to extend</div>
                <Text tone="muted">
                  Add a new category section + add demos inside the client component for interactive patterns.
                </Text>
              </Stack>
            </Card>
          </Stack>
        </Section>
      </div>
    </PublicShell>
  );
}
