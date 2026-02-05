"use client";

import * as React from "react";

import {
  Alert,
  Badge,
  Button,
  Card,
  DropdownMenu,
  DropdownMenuButton,
  Grid,
  Icon,
  Spacer,
  Stack,
  Tabs,
  TabsList,
  TabsPanel,
  TabsTrigger,
  Text,
  ToastProvider,
  Tooltip,
  useToast,
} from "@/ds";

import { Bell, BookOpen, Layers, Settings, Zap } from "@/ds";

type Kpi = {
  id: string;
  label: string;
  value: string;
  delta: string;
  tone: "accent" | "success" | "warning" | "danger" | "info" | "neutral";
};

type Activity = {
  id: string;
  title: string;
  meta: string;
  tone: "neutral" | "info" | "success" | "warning" | "danger";
};

const MOCK_KPIS: Kpi[] = [
  { id: "kpi-1", label: "Leads", value: "128", delta: "+12%", tone: "accent" },
  { id: "kpi-2", label: "Quotes", value: "42", delta: "+5%", tone: "info" },
  { id: "kpi-3", label: "Installs", value: "9", delta: "+1%", tone: "success" },
  { id: "kpi-4", label: "Errors", value: "2", delta: "-50%", tone: "warning" },
];

const MOCK_ACTIVITY: Activity[] = [
  { id: "a-1", title: "New lead created", meta: "2 minutes ago", tone: "info" },
  { id: "a-2", title: "Quote sent", meta: "18 minutes ago", tone: "success" },
  { id: "a-3", title: "System warning", meta: "1 hour ago", tone: "warning" },
  { id: "a-4", title: "Sync completed", meta: "Today", tone: "neutral" },
];

const MOCK_ACTIONS = [
  {
    id: "action-1",
    title: "Create quote",
    description: "Generate a mock quote using DS building blocks.",
    icon: Layers,
    tone: "accent" as const,
  },
  {
    id: "action-2",
    title: "Review alerts",
    description: "Open a dummy notifications view.",
    icon: Bell,
    tone: "info" as const,
  },
  {
    id: "action-3",
    title: "Docs",
    description: "Jump to documentation patterns and guidelines.",
    icon: BookOpen,
    tone: "success" as const,
  },
  {
    id: "action-4",
    title: "Settings",
    description: "Preview token-driven settings controls.",
    icon: Settings,
    tone: "warning" as const,
  },
];

const MOCK_TABS = [
  { value: "overview", label: "Overview" },
  { value: "activity", label: "Activity" },
  { value: "system", label: "System" },
];

function QuickActions() {
  const { toast } = useToast();

  return (
    <Grid cols={2}>
      {MOCK_ACTIONS.map((a) => (
        <Card key={a.id}>
          <Stack gap="compact">
            <div className="ui-row ui-row--between">
              <div className="ui-row">
                <Badge tone={a.tone}>{a.tone}</Badge>
                <div className="text-label">{a.title}</div>
              </div>
              <Icon icon={a.icon} aria-hidden />
            </div>
            <Text tone="muted">{a.description}</Text>
            <div className="ui-row">
              <Button
                size="sm"
                variant="secondary"
                onClick={() => toast({ tone: "info", title: a.title, description: "Dummy action triggered." })}
              >
                Run
              </Button>
              <Tooltip content="This is a placeholder action">
                <Button size="sm" variant="ghost">
                  <Icon icon={Zap} aria-hidden />
                  Info
                </Button>
              </Tooltip>
            </div>
          </Stack>
        </Card>
      ))}
    </Grid>
  );
}

export function DashboardClient() {
  const [tab, setTab] = React.useState(MOCK_TABS[0]?.value ?? "overview");
  const [range, setRange] = React.useState("7d");

  return (
    <ToastProvider>
      <Stack>
        <div className="ui-row ui-row--between">
          <div>
            <div className="ui-kicker">Dashboard</div>
            <h1 className="text-heading-2">Overview</h1>
          </div>

          <DropdownMenu
            trigger={
              <Button size="sm" variant="secondary">
                Range: {range}
              </Button>
            }
          >
            {["24h", "7d", "30d"].map((r) => (
              <DropdownMenuButton key={r} onClick={() => setRange(r)}>
                {r}
              </DropdownMenuButton>
            ))}
          </DropdownMenu>
        </div>

        <Grid cols={3}>
          {MOCK_KPIS.map((k) => (
            <Card key={k.id}>
              <Stack gap="compact">
                <div className="ui-row ui-row--between">
                  <div className="text-label">{k.label}</div>
                  <Badge tone={k.tone}>{k.delta}</Badge>
                </div>
                <div className="text-heading-3">{k.value}</div>
                <Text tone="muted">Mock KPI for layout preview.</Text>
              </Stack>
            </Card>
          ))}
        </Grid>

        <Tabs value={tab} onValueChange={setTab}>
          <TabsList>
            {MOCK_TABS.map((t) => (
              <TabsTrigger key={t.value} value={t.value}>
                {t.label}
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsPanel value="overview">
            <Stack>
              <Alert tone="info" title="Token-driven UI">
                This dashboard is composed from DS primitives/components and semantic utilities.
              </Alert>
              <QuickActions />
            </Stack>
          </TabsPanel>

          <TabsPanel value="activity">
            <Grid cols={2}>
              <Card>
                <Stack gap="compact">
                  <div className="text-heading-4">Recent activity</div>
                  <div className="ui-stack ui-stack--tight">
                    {MOCK_ACTIVITY.map((a) => (
                      <div key={a.id} className="ui-row ui-row--between">
                        <div className="ui-row">
                          <Badge tone={a.tone}>{a.tone}</Badge>
                          <span className="text-body-small">{a.title}</span>
                        </div>
                        <span className="text-caption">{a.meta}</span>
                      </div>
                    ))}
                  </div>
                </Stack>
              </Card>

              <Card>
                <Stack gap="compact">
                  <div className="text-heading-4">Notes</div>
                  <Text tone="muted">Replace this with real data sources later (API, DB, etc.).</Text>
                  <Spacer size={2} />
                  <Alert tone="success" title="Ready to extend">
                    Add new widgets by category without changing global styles.
                  </Alert>
                </Stack>
              </Card>
            </Grid>
          </TabsPanel>

          <TabsPanel value="system">
            <Grid cols={2}>
              {["API", "Workers", "Sync", "Billing"].map((name) => (
                <Card key={name}>
                  <Stack gap="compact">
                    <div className="ui-row ui-row--between">
                      <div className="text-label">{name}</div>
                      <Badge tone="neutral">ok</Badge>
                    </div>
                    <Text tone="muted">Mock system status card.</Text>
                  </Stack>
                </Card>
              ))}
            </Grid>
          </TabsPanel>
        </Tabs>
      </Stack>
    </ToastProvider>
  );
}
