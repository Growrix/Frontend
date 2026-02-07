import { Section, SectionHeader, Stack } from "@/ds";

import { PatternsLibraryClient } from "./_components/PatternsLibraryClient";

export default function PatternsPage() {
  return (
    <Section container="wide" size="lg">
      <Stack>
        <SectionHeader title="Patterns" lede="End-to-end compositions (shells, CRUD flows, public blocks)." />
        <PatternsLibraryClient />
      </Stack>
    </Section>
  );
}
