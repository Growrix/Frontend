import { Section, SectionHeader, Stack } from "@/ds";

import { ComponentsLibraryClient } from "./_components/ComponentsLibraryClient";

export default function ComponentsPage() {
  return (
    <Section container="wide" size="lg">
      <Stack>
        <SectionHeader title="Components" lede="Composed UI blocks: overlays, data display, forms, navigation, and feedback." />
        <ComponentsLibraryClient />
      </Stack>
    </Section>
  );
}
