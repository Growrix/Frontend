import { Section, SectionHeader, Stack } from "@/ds";

import { PrimitivesClient } from "./_components/PrimitivesClient";

export default function PrimitivesPage() {
  return (
    <Section container="wide" size="lg">
      <Stack>
        <SectionHeader title="Primitives" lede="The smallest building blocks: inputs, controls, layout, and text." />
        <PrimitivesClient />
      </Stack>
    </Section>
  );
}
