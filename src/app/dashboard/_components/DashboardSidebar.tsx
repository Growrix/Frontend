"use client";

import Link from "next/link";

import { Badge, Icon, Stack, Text } from "@/ds";
import { Bell, Layers, Settings } from "@/ds";

type NavItem = {
  id: string;
  label: string;
  href: string;
  icon: typeof Layers;
  tone: "accent" | "info" | "success" | "warning" | "danger" | "neutral";
};

const MOCK_NAV: NavItem[] = [
  { id: "nav-1", label: "Overview", href: "/dashboard", icon: Layers, tone: "accent" },
  { id: "nav-2", label: "Activity", href: "/dashboard/activity", icon: Bell, tone: "info" },
  { id: "nav-3", label: "Settings", href: "/dashboard/settings", icon: Settings, tone: "warning" },
];

export type DashboardSidebarProps = {
  variant?: "desktop" | "drawer";
  collapsed?: boolean;
};

export function DashboardSidebar({ variant = "desktop", collapsed }: DashboardSidebarProps) {
  return (
    <div className={variant === "desktop" ? "ui-sidebar" : undefined}>
      <div className="ui-card">
        <Stack gap="compact">
          {!collapsed ? (
            <div>
              <div className="text-heading-4">Workspace</div>
              <Text tone="muted">Mock sidebar navigation</Text>
            </div>
          ) : (
            <div className="ui-row ui-row--between">
              <div className="text-heading-4 ui-sr-only">Workspace</div>
            </div>
          )}

          <nav aria-label="Dashboard navigation" className="ui-sidebar-nav">
            {MOCK_NAV.map((item) => (
              <Link
                key={item.id}
                className="ui-navlink ui-focus-ring"
                href={item.href}
                aria-label={collapsed ? item.label : undefined}
                title={collapsed ? item.label : undefined}
              >
                <Icon icon={item.icon} aria-hidden />
                {collapsed ? <span className="ui-sr-only">{item.label}</span> : <span className="text-body-small">{item.label}</span>}
                {collapsed ? null : <Badge tone={item.tone}>{item.tone}</Badge>}
              </Link>
            ))}
          </nav>
        </Stack>
      </div>
    </div>
  );
}
