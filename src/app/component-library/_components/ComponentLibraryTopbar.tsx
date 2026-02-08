"use client";

import * as React from "react";
import Link from "next/link";

import { AppBar, Badge, Button, Container, Drawer, Icon, Stack, ThemeSwitcher, usePreviewPlatform } from "@/ds";
import { Menu, PanelLeftClose, PanelLeftOpen, X } from "@/ds";

import { ComponentLibrarySidebar } from "./ComponentLibrarySidebar";

export type ComponentLibraryTopbarProps = {
  leftCollapsed?: boolean;
  onToggleLeftCollapsed?: () => void;
};

export function ComponentLibraryTopbar({ leftCollapsed, onToggleLeftCollapsed }: ComponentLibraryTopbarProps) {
  const [navOpen, setNavOpen] = React.useState(false);
  const { platform } = usePreviewPlatform();

  const isMobilePlatform = platform === "mobile";

  return (
    <Container width="full">
      {isMobilePlatform ? (
        <div className="ui-header-pad">
          <AppBar
            leading={
              <Button size="sm" variant="secondary" onClick={() => setNavOpen(true)} aria-label="Open component library navigation">
                <Icon icon={Menu} aria-hidden />
              </Button>
            }
            title={
              <Link className="ui-navlink ui-focus-ring" href="/component-library/foundations" aria-label="Go to component library">
                <strong className="text-label">Library</strong>
              </Link>
            }
            actions={<ThemeSwitcher />}
          />
        </div>
      ) : (
        <div className="ui-header-pad ui-row ui-row--between">
          <div className="ui-row">
            <Button className="ui-only-mobile" size="sm" variant="secondary" onClick={() => setNavOpen(true)} aria-label="Open component library navigation">
              <Icon icon={Menu} aria-hidden />
            </Button>

            <Link className="ui-navlink ui-focus-ring" href="/component-library/foundations" aria-label="Go to component library">
              <strong className="text-label">Library</strong>
            </Link>
            <Badge tone="accent">Dashboard</Badge>
          </div>

          <div className="ui-row">
            <Button
              className="ui-only-desktop"
              size="sm"
              variant="secondary"
              onClick={onToggleLeftCollapsed}
              aria-label={leftCollapsed ? "Expand sidebar" : "Collapse sidebar"}
              disabled={!onToggleLeftCollapsed}
            >
              <Icon icon={leftCollapsed ? PanelLeftOpen : PanelLeftClose} aria-hidden />
            </Button>

            <ThemeSwitcher />

            <Link className="ui-navlink ui-focus-ring ui-only-desktop" href="/dashboard" aria-label="Open app dashboard">
              Dashboard
            </Link>
          </div>
        </div>
      )}

      <Drawer open={navOpen} onClose={() => setNavOpen(false)} side="left" title="Component library" description="Browse DS categories">
        <Stack>
          <div className="ui-row ui-row--between">
            <div className="text-heading-4">Menu</div>
            <Button size="sm" variant="ghost" onClick={() => setNavOpen(false)} aria-label="Close navigation">
              <Icon icon={X} aria-hidden />
            </Button>
          </div>

          <ComponentLibrarySidebar variant="drawer" />
        </Stack>
      </Drawer>
    </Container>
  );
}
