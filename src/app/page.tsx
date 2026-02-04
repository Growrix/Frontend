import Link from "next/link";

import { Card, Grid, PublicHeaderBar, PublicShell, Section, SectionHeader, SplitSection, Stack, Text, ThemeSwitcher } from "@/ds";

export default function Home() {
  return (
    <PublicShell
      header={
        <PublicHeaderBar>
          <div className="ui-row ui-row--between">
            <strong>Blueprint DS</strong>
            <div className="ui-row">
              <ThemeSwitcher />
              <a className="ui-focus-ring" href="#features">
                Features
              </a>
              <a className="ui-focus-ring" href="#shells">
                Shells
              </a>
              <Link className="ui-focus-ring" href="/">
                Home
              </Link>
            </div>
          </div>
        </PublicHeaderBar>
      }
      footer={
        <div className="ui-container ui-section">
          <Text tone="muted">Built with tokens → themes → primitives → components → layouts → pages.</Text>
        </div>
      }
    >
      <div id="main">
        <Section container="wide">
          <Stack>
            <div className="ui-text-center">
              <div className="ui-kicker">Design-System First</div>
              <h1 className="ui-h1">Start clean. Stay consistent.</h1>
              <div className="ui-lede ui-center">
                This page uses only <code>@/ds</code> imports and DS-owned layout primitives.
              </div>
              <div className="ui-row ui-row--center">
                <a className="ui-button ui-button--md ui-button--primary ui-focus-ring" href="#features">
                  Explore
                </a>
                <a className="ui-button ui-button--md ui-button--secondary ui-focus-ring" href="#shells">
                  Shells
                </a>
              </div>
            </div>
          </Stack>
        </Section>

        <Section id="features" tone="surface" container="wide">
          <Stack>
            <SectionHeader
              kicker="Blueprint"
              title="DS boundary + single entry"
              lede={
                <>
                  Pages consume UI from <code>@/ds</code> only. Tokens/themes live in one place.
                </>
              }
            />

            <Grid cols={3}>
              <Card>
                <h3 className="ui-h2">Tokens</h3>
                <Text tone="muted">All spacing, colors, radii, motion are CSS variables.</Text>
              </Card>
              <Card>
                <h3 className="ui-h2">Utilities</h3>
                <Text tone="muted">Layout is class-first: container / section / stack / grid.</Text>
              </Card>
              <Card>
                <h3 className="ui-h2">Shells</h3>
                <Text tone="muted">Pages don’t invent structure; shells own responsiveness.</Text>
              </Card>
            </Grid>
          </Stack>
        </Section>

        <Section id="shells" container="wide">
          <Stack>
            <SectionHeader kicker="Layouts" title="Split sections" lede="Reusable patterns built on primitives." />
            <SplitSection
              left={
                <Stack>
                  <h3 className="ui-h2">Left column</h3>
                  <Text tone="muted">No page-level random spacing. This is DS-owned.</Text>
                </Stack>
              }
              right={
                <Card>
                  <Stack gap="compact">
                    <strong>Right card</strong>
                    <Text tone="muted">Composed component using tokens + utilities.</Text>
                  </Stack>
                </Card>
              }
            />
          </Stack>
        </Section>
      </div>
    </PublicShell>
  );
}
