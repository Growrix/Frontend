"use client";

import * as React from "react";
import Link from "next/link";

import { Badge, Button, Container, Drawer, Icon, Input, Spacer, Stack, ThemeSwitcher } from "@/ds";
import {
  Bell,
  Menu,
  PanelLeftClose,
  PanelLeftOpen,
  PanelRightClose,
  PanelRightOpen,
  Settings,
  SlidersHorizontal,
  X,
} from "@/ds";

import { DashboardSidebar } from "./DashboardSidebar";
import { DashboardRightbar } from "./DashboardRightbar";

export type DashboardTopbarProps = {
  leftCollapsed?: boolean;
  rightCollapsed?: boolean;
  onToggleLeftCollapsed?: () => void;
  onToggleRightCollapsed?: () => void;
};

export function DashboardTopbar({ leftCollapsed, rightCollapsed, onToggleLeftCollapsed, onToggleRightCollapsed }: DashboardTopbarProps) {
  const [navOpen, setNavOpen] = React.useState(false);
  const [panelOpen, setPanelOpen] = React.useState(false);

  return (
    <Container width="full">
      <div className="ui-header-pad ui-row ui-row--between">
        <div className="ui-row">
          <Button
            className="ui-only-mobile"
            size="sm"
            variant="secondary"
            onClick={() => setNavOpen(true)}
            aria-label="Open dashboard navigation"
          >
            <Icon icon={Menu} aria-hidden />
          </Button>

          <Link className="ui-navlink ui-focus-ring" href="/dashboard" aria-label="Go to dashboard overview">
            <strong className="text-label">Dashboard</strong>
          </Link>
          <Badge tone="accent">Workspace</Badge>
        </div>

        <div className="ui-row">
          <div className="ui-search ui-only-desktop">
            <Input placeholder="Search (mock)" />
          </div>

          <Button
            className="ui-only-desktop"
            size="sm"
            variant="secondary"
            onClick={onToggleLeftCollapsed}
            aria-label={leftCollapsed ? "Expand left sidebar" : "Collapse left sidebar"}
            disabled={!onToggleLeftCollapsed}
          >
            <Icon icon={leftCollapsed ? PanelLeftOpen : PanelLeftClose} aria-hidden />
          </Button>

          <Button
            className="ui-only-desktop"
            size="sm"
            variant="secondary"
            onClick={onToggleRightCollapsed}
            aria-label={rightCollapsed ? "Expand right panel" : "Collapse right panel"}
            disabled={!onToggleRightCollapsed}
          >
            <Icon icon={rightCollapsed ? PanelRightOpen : PanelRightClose} aria-hidden />
          </Button>

          <Button
            className="ui-only-mobile"
            size="sm"
            variant="secondary"
            onClick={() => setPanelOpen(true)}
            aria-label="Open dashboard panel"
          >
            <Icon icon={SlidersHorizontal} aria-hidden />
          </Button>

          <Link className="ui-navlink ui-focus-ring ui-only-desktop" href="/dashboard/activity" aria-label="Open activity">
            <Icon icon={Bell} aria-hidden />
          </Link>
          <Link className="ui-navlink ui-focus-ring ui-only-desktop" href="/dashboard/settings" aria-label="Open settings">
            <Icon icon={Settings} aria-hidden />
          </Link>
        </div>
      </div>

      <Drawer
        open={navOpen}
        onClose={() => setNavOpen(false)}
        side="left"
        title="Dashboard navigation"
        description="Switch pages and workspace settings"
      >
        <Stack>
          <div className="ui-row ui-row--between">
            <div className="text-heading-4">Menu</div>
            <Button size="sm" variant="ghost" onClick={() => setNavOpen(false)} aria-label="Close navigation">
              <Icon icon={X} aria-hidden />
            </Button>
          </div>

          <DashboardSidebar variant="drawer" />

          <Spacer size={2} />
          <ThemeSwitcher />
        </Stack>
      </Drawer>

      <Drawer
        open={panelOpen}
        onClose={() => setPanelOpen(false)}
        side="right"
        title="Dashboard panel"
        description="Filters and tools"
      >
        <Stack>
          <div className="ui-row ui-row--between">
            <div className="ui-row">
              <Icon icon={SlidersHorizontal} aria-hidden />
              <div className="text-heading-4">Panel</div>
            </div>
            <Button size="sm" variant="ghost" onClick={() => setPanelOpen(false)} aria-label="Close panel">
              <Icon icon={X} aria-hidden />
            </Button>
          </div>

          <DashboardRightbar variant="drawer" />

          <Spacer size={2} />
          <ThemeSwitcher />
        </Stack>
      </Drawer>
    </Container>
  );
}
