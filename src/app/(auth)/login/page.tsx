import { Card, Section, SectionHeader, Stack } from "@/ds";

export default function LoginPage() {
  return (
    <Section container="narrow" size="lg">
      <Stack>
        <SectionHeader title="Sign in" lede="Replace with your auth form." />
        <Card>
          <p className="text-body">Auth form placeholder.</p>
        </Card>
      </Stack>
    </Section>
  );
}
