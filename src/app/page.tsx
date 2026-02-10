import Link from "next/link";

import { PublicBottomNav } from "./_components/PublicBottomNav";

import {
  Badge,
  Card,
  Divider,
  Grid,
  AppBar,
  DashboardShell,
  Section,
  Spacer,
  Stack,
  Text,
  ThemeSwitcher,
} from "@/ds";

export default function Home() {
  return (
    <DashboardShell
      containerWidth="wide"
      topbar={
        <AppBar
          title={
            <div className="ui-row">
              <strong className="text-label">SolarMatch</strong>
              <Badge tone="accent">Home</Badge>
            </div>
          }
          actions={
            <div className="ui-row">
              <ThemeSwitcher />
              <Link className="ui-button ui-button--sm ui-button--secondary ui-focus-ring" href="/dashboard">
                Dashboard
              </Link>
            </div>
          }
        />
      }
      bottomNav={<PublicBottomNav />}
    >
      <Section container="wide" size="lg">
        <Stack>
          <div>
            <div className="ui-kicker">App-like</div>
            <h1 className="text-heading-2">Homepage</h1>
            <Spacer size={2} />
            <Text tone="muted">This branch targets an app-like UI surface using DS mobile presets.</Text>
          </div>

          <Divider />

          <Grid cols={2}>
            <Card>
              <Stack gap="compact">
                <div className="text-label">Component Library</div>
                <Text tone="muted">Preview primitives/components in a controlled shell.</Text>
                <Link className="ui-button ui-button--sm ui-button--secondary ui-focus-ring" href="/component-library">
                  Open
                </Link>
              </Stack>
            </Card>

            <Card>
              <Stack gap="compact">
                <div className="text-label">Dashboard</div>
                <Text tone="muted">See the app-like dashboard shell and patterns.</Text>
                <Link className="ui-button ui-button--sm ui-button--secondary ui-focus-ring" href="/dashboard">
                  Open
                </Link>
              </Stack>
            </Card>
          </Grid>

          <Card>
            <Stack gap="compact">
              <div className="text-label">Quick actions</div>
              <div className="ui-row ui-row--wrap">
                <Link className="ui-button ui-button--md ui-button--primary ui-focus-ring" href="/dashboard">
                  Go to dashboard
                </Link>
                <Link className="ui-button ui-button--md ui-button--secondary ui-focus-ring" href="/component-library">
                  Open component library
                </Link>
              </div>
            </Stack>
          </Card>
        </Stack>
      </Section>
    </DashboardShell>
  );
}
