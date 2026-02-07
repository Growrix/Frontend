import { Section, SectionHeader, Stack } from "@/ds";

import { FoundationsClient } from "./_components/FoundationsClient";

export default function FoundationsPage() {
  return (
    <Section container="wide" size="lg">
      <Stack>
        <SectionHeader title="Foundations" lede="Tokens and typography rules that keep the product consistent." />
        <FoundationsClient />
      </Stack>
    </Section>
  );
}
