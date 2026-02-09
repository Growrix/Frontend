"use client";

import * as React from "react";

import {
  Button,
  Card,
  Icon,
  Spacer,
  Stack,
  Tabs,
  TabsList,
  TabsPanel,
  TabsTrigger,
  Text,
  Home,
  Layers,
  Monitor,
  web,
} from "@/ds";

type PreviewTarget = {
  id: string;
  label: string;
  href: string;
  icon: typeof Home;
};

const TARGETS: PreviewTarget[] = [
  { id: "home", label: "Home", href: "/", icon: Home },
  { id: "app-home", label: "App Home", href: "/app-home", icon: Monitor },
  { id: "dashboard", label: "Dashboard", href: "/dashboard", icon: Layers },
];

function getTarget(id: string) {
  return TARGETS.find((t) => t.id === id) ?? TARGETS[0]!;
}

export function MobileAppLikePreview() {
  const [value, setValue] = React.useState<string>(TARGETS[0]!.id);
  const target = getTarget(value);

  return (
    <Card className="ui-card--compact">
      <Stack gap="compact">
        <div className="text-heading-4">Mobile app-like preview</div>
        <Text tone="muted">
          Fixed mobile viewport frame for validating the app-like UI (shells, app bars, bottom nav). This is not meant
          for responsive breakpoints testing.
        </Text>

        <Tabs value={value} onValueChange={setValue}>
          <TabsList>
            {TARGETS.map((t) => (
              <TabsTrigger key={t.id} value={t.id} aria-label={`Preview ${t.label}`}>
                <span className="ui-row">
                  <Icon icon={t.icon} size="sm" aria-hidden />
                  <span className="text-body-small">{t.label}</span>
                </span>
              </TabsTrigger>
            ))}
          </TabsList>

          {TARGETS.map((t) => {
            return (
              <TabsPanel key={t.id} value={t.id}>
                <Stack gap="compact">
                  <div className="ui-row ui-row--between">
                    <Text tone="muted">Previewing: {t.href}</Text>
                    <a className="ui-button ui-button--sm ui-button--secondary ui-focus-ring" href={t.href} target="_blank" rel="noreferrer">
                      Open
                    </a>
                  </div>

                  <web.WebDeviceFrame title={`Mobile preview: ${t.label}`} src={t.href} ariaLabel={`Mobile preview frame for ${t.label}`} />

                  <Spacer size={2} />
                  <div className="ui-row ui-row--wrap">
                    <Button size="sm" variant="secondary" onClick={() => setValue("home")}>Home</Button>
                    <Button size="sm" variant="secondary" onClick={() => setValue("app-home")}>App Home</Button>
                    <Button size="sm" variant="secondary" onClick={() => setValue("dashboard")}>Dashboard</Button>
                  </div>
                </Stack>
              </TabsPanel>
            );
          })}
        </Tabs>
      </Stack>
    </Card>
  );
}
