import Link from "next/link";

import {
  AppBar,
  Badge,
  Button,
  Card,
  DashboardShell,
  Divider,
  Field,
  Grid,
  Input,
  List,
  ListItem,
  MetricCard,
  Section,
  Spacer,
  Stack,
  Text,
  ThemeSwitcher,
  Tooltip,
} from "@/ds";

import { AppHomeBottomNav } from "./_components/AppHomeBottomNav";

const MOCK_ACTIVITY = [
  { id: "a1", title: "Quote created", meta: "2m ago" },
  { id: "a2", title: "Installer invited", meta: "18m ago" },
  { id: "a3", title: "Document uploaded", meta: "1h ago" },
];

export default function AppHomePage() {
  return (
    <DashboardShell
      containerWidth="wide"
      topbar={
        <AppBar
          leading={
            <Link className="ui-button ui-button--sm ui-button--ghost ui-focus-ring" href="/">
              Back
            </Link>
          }
          title={
            <div className="ui-row">
              <strong className="text-label">App Home</strong>
              <Badge tone="accent">DS Demo</Badge>
            </div>
          }
          actions={
            <div className="ui-row">
              <ThemeSwitcher />
              <Tooltip content="This page is only a DS composition demo.">
                <Button size="sm" variant="secondary">
                  Info
                </Button>
              </Tooltip>
            </div>
          }
        />
      }
      bottomNav={<AppHomeBottomNav />}
    >
      <Section container="wide" size="lg">
        <Stack>
          <div>
            <div className="ui-kicker">Mobile-first composition</div>
            <h1 className="text-heading-2">A homepage-like layout built from DS components</h1>
            <Spacer size={2} />
            <Text tone="muted">
              This is not a feature flow—just a composition playground to validate app-like spacing, touch targets, and
              responsive behavior.
            </Text>
          </div>

          <Divider />

          <Grid cols={3}>
            <MetricCard label="Theme" value="SolarConnect Dark" hint="Switchable" />
            <MetricCard label="Layout" value="DashboardShell" hint="App bar + bottom nav" />
            <MetricCard label="Breakpoints" value="Mobile-first" hint="Grid stacks on small screens" />
          </Grid>

          <Card>
            <Stack gap="compact">
              <div className="text-label">Quick actions</div>
              <div className="ui-row ui-row--wrap">
                <Button variant="primary">Primary action</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="ghost">Tertiary</Button>
              </div>
            </Stack>
          </Card>

          <Grid cols={2}>
            <Card>
              <Stack gap="compact">
                <div className="text-label">Search</div>
                <Field label="Search">
                  <Input placeholder="Try typing on mobile" />
                </Field>
              </Stack>
            </Card>

            <Card>
              <Stack gap="compact">
                <div className="text-label">Recent activity</div>
                <List ariaLabel="Recent activity">
                  {MOCK_ACTIVITY.map((item) => (
                    <ListItem key={item.id} trailing={<span className="text-caption">{item.meta}</span>}>
                      <Text>{item.title}</Text>
                    </ListItem>
                  ))}
                </List>
              </Stack>
            </Card>
          </Grid>

          <Card>
            <Stack gap="compact">
              <div className="text-label">Links</div>
              <div className="ui-row ui-row--wrap">
                <Link className="ui-button ui-button--sm ui-button--secondary ui-focus-ring" href="/component-library">
                  Component Library
                </Link>
                <Link className="ui-button ui-button--sm ui-button--secondary ui-focus-ring" href="/docs">
                  Docs
                </Link>
                <Link className="ui-button ui-button--sm ui-button--secondary ui-focus-ring" href="/dashboard">
                  Dashboard
                </Link>
              </div>
            </Stack>
          </Card>
        </Stack>
      </Section>
    </DashboardShell>
  );
}
