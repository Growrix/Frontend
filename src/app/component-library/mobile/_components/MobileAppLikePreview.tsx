"use client";

import * as React from "react";

import {
  AppBar,
  Badge,
  BottomNav,
  BottomNavItem,
  Button,
  Grid,
  Stack,
  Text,
  app,
  HeroSection,
  MobilePanel,
  MobileQuickStatTile,
} from "@/ds";

function DemoMobileHome() {
  return (
    <Stack gap="compact">
      <HeroSection
        kicker="Solar lead generation"
        title="Get an instant solar quote."
        lede="Estimate system size, savings, and rebates in minutes."
        primaryAction={{ label: "Get instant quote", href: "#quote" }}
        secondaryAction={{ label: "Check rebates", href: "#rebates" }}
      />

      <Grid cols={3}>
        <MobileQuickStatTile label="Speed" value="2–3 min" description="Quote estimate" />
        <MobileQuickStatTile label="Clarity" value="No calls" description="Until you opt in" />
        <MobileQuickStatTile label="Next" value="Book" description="Install consult" />
      </Grid>

      <MobilePanel
        title="Instant quote"
        description="A mobile panel pattern (token-driven)."
        actions={<Button size="sm" variant="secondary">Edit</Button>}
      >
        <Text tone="muted">Use this to standardize app-like panels across mobile screens.</Text>
        <div className="ui-row ui-row--wrap">
          <Button variant="primary">Primary action</Button>
          <Button variant="secondary">Secondary</Button>
        </div>
      </MobilePanel>
    </Stack>
  );
}

export function MobileAppLikePreview() {
  return (
    <div className="ui-device-frame" aria-label="Mobile app-like preview">
      <app.mobile.MobileAppShell
        containerWidth="full"
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
        <app.mobile.Scroll padBottomNav>
          <DemoMobileHome />
        </app.mobile.Scroll>
      </app.mobile.MobileAppShell>
    </div>
  );
}
