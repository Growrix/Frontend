"use client";

import * as React from "react";

import {
  Button,
  Card,
  DropdownMenu,
  DropdownMenuButton,
  Grid,
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

const MOCK_TABS = [
  {
    value: "overview",
    label: "Overview",
    body: "Mock tab content: overview details live here.",
  },
  {
    value: "usage",
    label: "Usage",
    body: "Mock tab content: usage patterns and guidelines.",
  },
  {
    value: "notes",
    label: "Notes",
    body: "Mock tab content: a short note for the UI.",
  },
];

const MOCK_MENU_ITEMS = [
  { id: "profile", label: "Profile" },
  { id: "settings", label: "Settings" },
  { id: "logout", label: "Log out" },
];

function ToastButton() {
  const { toast } = useToast();

  return (
    <Button
      variant="secondary"
      onClick={() =>
        toast({
          tone: "success",
          title: "Mock toast",
          description: "This is dummy content to show the toast styling.",
        })
      }
    >
      Show toast
    </Button>
  );
}

export function CommonSetDemo() {
  const [tab, setTab] = React.useState(MOCK_TABS[0]?.value ?? "");

  return (
    <ToastProvider>
      <Grid cols={2}>
        <Card>
          <Stack gap="compact">
            <div className="text-heading-4">Tabs</div>

            <Tabs value={tab} onValueChange={setTab}>
              <TabsList>
                {MOCK_TABS.map((t) => (
                  <TabsTrigger key={t.value} value={t.value}>
                    {t.label}
                  </TabsTrigger>
                ))}
              </TabsList>

              {MOCK_TABS.map((t) => (
                <TabsPanel key={t.value} value={t.value}>
                  <Text tone="muted">{t.body}</Text>
                </TabsPanel>
              ))}
            </Tabs>
          </Stack>
        </Card>

        <Card>
          <Stack gap="compact">
            <div className="text-heading-4">Menu, Tooltip, Toast</div>

            <div className="ui-row">
              <DropdownMenu
                trigger={
                  <Button variant="secondary" size="sm">
                    Open menu
                  </Button>
                }
              >
                {MOCK_MENU_ITEMS.map((item) => (
                  <DropdownMenuButton key={item.id} onClick={() => {}}>
                    {item.label}
                  </DropdownMenuButton>
                ))}
              </DropdownMenu>

              <Tooltip content="Mock tooltip content">
                <Button variant="ghost" size="sm">
                  Hover me
                </Button>
              </Tooltip>

              <ToastButton />
            </div>

            <Spacer size={2} />
            <Text tone="muted">These patterns stay token-driven and touch-friendly.</Text>
          </Stack>
        </Card>
      </Grid>
    </ToastProvider>
  );
}
