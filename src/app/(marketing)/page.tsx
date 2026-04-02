import { Card, Section, SectionHeader, Stack, Text } from "@/ds";

export default function HomePage() {
  return (
    <Section container="wide" size="lg">
      <Stack>
        <SectionHeader
          kicker="Marketing"
          title="Fresh project scaffold"
          lede="Replace this page with the new public site when you are ready to build it."
        />
        <Card>
          <Stack gap="compact">
            <Text variant="body">
              Legacy marketing pages were removed so this project can start from a clean
              public app structure.
            </Text>
            <Text tone="muted" variant="body-small">
              Keep new public routes inside this route group and register them in the route
              map as you add them.
            </Text>
          </Stack>
        </Card>
      </Stack>
    </Section>
  );
}
