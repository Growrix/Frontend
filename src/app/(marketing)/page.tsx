import { Section, SectionHeader, Stack } from "@/ds";

export default function HomePage() {
  return (
    <Section container="wide" size="lg">
      <Stack>
        <SectionHeader
          kicker="Starter"
          title="Blueprint"
          lede="DS-first starter kit. Replace this page with your landing content."
        />
      </Stack>
    </Section>
  );
}
