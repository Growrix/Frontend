import { Section, SectionHeader, Stack } from "@/ds";

export default function DashboardPage() {
  return (
    <Section container="wide" size="lg">
      <Stack>
        <SectionHeader
          kicker="Dashboard"
          title="Home"
          lede="Replace this with your dashboard content."
        />
      </Stack>
    </Section>
  );
}
