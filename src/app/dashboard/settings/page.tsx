import { Alert, Button, Card, Field, Grid, Input, Section, Stack, Switch, Text } from "@/ds";

type SettingField = {
  id: string;
  label: string;
  placeholder: string;
  hint?: string;
};

const MOCK_FIELDS: SettingField[] = [
  { id: "org", label: "Workspace name", placeholder: "SolarMatch AU", hint: "Mock value (no backend yet)" },
  { id: "timezone", label: "Timezone", placeholder: "Australia/Sydney" },
];

export default function DashboardSettingsPage() {
  return (
    <Section container="wide" size="lg">
      <Stack>
        <div>
          <div className="ui-kicker">Dashboard</div>
          <h1 className="text-heading-2">Settings</h1>
        </div>

        <Alert tone="warning" title="Mock settings">
          This page is UI-only and exists to validate the shared dashboard shell across multiple pages.
        </Alert>

        <Grid cols={2}>
          <Card>
            <Stack>
              <div className="text-heading-4">Workspace</div>

              {MOCK_FIELDS.map((f) => (
                <Field key={f.id} id={f.id} label={f.label} hint={f.hint}>
                  <Input placeholder={f.placeholder} />
                </Field>
              ))}

              <div>
                <Switch defaultChecked label="Enable notifications" />
                <Text tone="muted">Mock toggle</Text>
              </div>

              <div className="ui-row">
                <Button variant="primary">Save</Button>
                <Text tone="muted">No persistence yet.</Text>
              </div>
            </Stack>
          </Card>

          <Card>
            <Stack>
              <div className="text-heading-4">Security</div>
              <Text tone="muted">Add role-based policies and audit log settings here later.</Text>
            </Stack>
          </Card>
        </Grid>
      </Stack>
    </Section>
  );
}
