import { Button, Divider, PublicShell, Section, Spacer, Stack, Text, ThemeSwitcher } from "@/ds";

export default function Home() {
  return (
    <PublicShell>
      <div id="main">
        <Section container="wide" size="lg">
          <Stack>
            <div className="ui-row ui-row--between">
              <div>
                <div className="ui-kicker">Startup Kit</div>
                <h1 className="text-heading-2">Design-system first Next.js app</h1>
              </div>
              <ThemeSwitcher />
            </div>

            <Text tone="muted">Only the root homepage is present. Add new routes when you’re ready.</Text>
            <Divider />

            <Stack gap="compact">
              <Text>- DS tokens, themes, utilities</Text>
              <Text>- DS primitives and components</Text>
              <Text>- Minimal App Router surface</Text>
            </Stack>

            <Spacer size={2} />
            <Button variant="primary" size="md">
              Get started
            </Button>
          </Stack>
        </Section>
      </div>
    </PublicShell>
  );
}
