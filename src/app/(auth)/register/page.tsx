import { Card, Section, SectionHeader, Stack } from "@/ds";

export default function RegisterPage() {
  return (
    <Section container="narrow" size="lg">
      <Stack>
        <SectionHeader title="Create account" lede="Replace with your registration form." />
        <Card>
          <p className="text-body">Registration form placeholder.</p>
        </Card>
      </Stack>
    </Section>
  );
}
