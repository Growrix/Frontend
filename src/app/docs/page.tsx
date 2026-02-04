import { Button, Card, Divider, Field, Grid, Input, Section, SectionHeader, Spacer, Stack, Text } from "@/ds";

export default function DocsPage() {
  return (
    <Section container="wide">
      <Stack>
        <div id="overview">
          <SectionHeader
            kicker="Docs"
            title="Design system implementation"
            lede={
              <>
                This page is intentionally boring: it only composes DS building blocks and never invents layout.
              </>
            }
          />
        </div>

        <Divider />

        <div id="tokens">
          <SectionHeader
            kicker="Tokens"
            title="Semantic CSS variables"
            lede={
              <>
                Tokens are defined in <code>src/ds/styles/ds.tokens.css</code> and overridden by theme.
              </>
            }
          />
          <Grid cols={3}>
            <Card>
              <strong>Colors</strong>
              <Text tone="muted">--ds-color-bg, --ds-color-surface, --ds-color-primary</Text>
            </Card>
            <Card>
              <strong>Spacing</strong>
              <Text tone="muted">--ds-space-1 … --ds-space-9</Text>
            </Card>
            <Card>
              <strong>Type</strong>
              <Text tone="muted">--ds-font-size-* + --ds-font-*</Text>
            </Card>
          </Grid>
        </div>

        <div id="primitives">
          <SectionHeader kicker="Primitives" title="Inputs, buttons, and layout primitives" />

          <Card>
            <Stack gap="compact">
              <Field label="Email" hint="We’ll never spam you.">
                <Input type="email" placeholder="name@example.com" />
              </Field>
              <div className="ui-row">
                <Button variant="primary" size="sm">
                  Submit
                </Button>
                <Button variant="secondary" size="sm">
                  Cancel
                </Button>
              </div>
              <Spacer size={2} />
              <Text tone="muted">Prefer Stack/Grid for spacing; Spacer is for rare escape hatches.</Text>
            </Stack>
          </Card>
        </div>

        <div id="layouts">
          <SectionHeader kicker="Layouts" title="Shells own structure" lede="PublicShell, DashboardShell, CenteredShell, DocsShell." />
        </div>

        <div id="rules">
          <SectionHeader kicker="Rules" title="Pages are consumers" lede="Import UI from @/ds only; no hardcoded values; no inline styles in pages." />
        </div>
      </Stack>
    </Section>
  );
}
