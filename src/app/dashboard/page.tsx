import { Section, Stack } from "@/ds";

import { DashboardClient } from "./_components/DashboardClient";

export default function DashboardPage() {
  return (
    <div id="main">
      <Section container="wide" size="lg">
        <Stack>
          <DashboardClient />
        </Stack>
      </Section>
    </div>
  );
}
