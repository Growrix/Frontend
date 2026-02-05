import { Alert, Card, Grid, Section, Stack, Text } from "@/ds";

type Activity = {
  id: string;
  title: string;
  meta: string;
  tone: "neutral" | "info" | "success" | "warning" | "danger";
};

const MOCK_ACTIVITY: Activity[] = [
  { id: "a-1", title: "New lead created", meta: "2 minutes ago", tone: "info" },
  { id: "a-2", title: "Quote sent", meta: "18 minutes ago", tone: "success" },
  { id: "a-3", title: "System warning", meta: "1 hour ago", tone: "warning" },
  { id: "a-4", title: "Sync completed", meta: "Today", tone: "neutral" },
];

export default function DashboardActivityPage() {
  return (
    <Section container="wide" size="lg">
      <Stack>
        <div>
          <div className="ui-kicker">Dashboard</div>
          <h1 className="text-heading-2">Activity</h1>
        </div>

        <Alert tone="info" title="Mobile nav demo">
          This page exists to demonstrate consistent dashboard sub-routing and bottom navigation.
        </Alert>

        <Grid cols={2}>
          <Card>
            <Stack gap="compact">
              <div className="text-heading-4">Recent events</div>
              <div className="ui-stack ui-stack--tight">
                {MOCK_ACTIVITY.map((a) => (
                  <div key={a.id} className="ui-row ui-row--between">
                    <span className="text-body-small">{a.title}</span>
                    <Text tone="muted">{a.meta}</Text>
                  </div>
                ))}
              </div>
            </Stack>
          </Card>

          <Card>
            <Stack gap="compact">
              <div className="text-heading-4">Notes</div>
              <Text tone="muted">Replace with real activity feeds later (API, DB, etc.).</Text>
            </Stack>
          </Card>
        </Grid>
      </Stack>
    </Section>
  );
}
