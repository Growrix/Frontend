"use client";

import * as React from "react";

import { AppBar, Badge, BottomNav, BottomNavItem, Button, Card, DashboardShell, Stack, Text } from "@/ds";

export function MobileAppLikePreview() {
  return (
    <div className="ui-device-frame" aria-label="Mobile app-like preview">
      <DashboardShell
        containerWidth="wide"
        topbar={
          <AppBar
            title={
              <div className="ui-row">
                <strong className="text-label">SolarMatch</strong>
                <Badge tone="accent">App Preview</Badge>
              </div>
            }
            actions={
              <div className="ui-row">
                <Button size="sm" variant="secondary">Settings</Button>
                <Button size="sm" variant="primary">Profile</Button>
              </div>
            }
          />
        }
        bottomNav={
          <BottomNav>
            <BottomNavItem label="Home" href="/" active />
            <BottomNavItem label="Components" href="/component-library" />
            <BottomNavItem label="Dashboard" href="/dashboard" />
          </BottomNav>
        }
      >
        <Stack gap="compact">
          <Card className="ui-card--compact">
            <Stack gap="compact">
              <div className="text-heading-4">App-like preview (DS shell)</div>
              <Text tone="muted">This preview directly renders DS app shell, app bar, bottom nav, and demo content—no iframe.</Text>
            </Stack>
          </Card>
          <Card className="ui-card--compact">
            <Stack gap="compact">
              <div className="text-label">Quick actions</div>
              <div className="ui-row ui-row--wrap">
                <Button variant="primary">Go to dashboard</Button>
                <Button variant="secondary">Open component library</Button>
              </div>
            </Stack>
          </Card>
        </Stack>
      </DashboardShell>
    </div>
  );
}
