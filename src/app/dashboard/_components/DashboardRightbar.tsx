"use client";

import * as React from "react";

import { Badge, Button, Card, Icon, Stack, Text } from "@/ds";
import { SlidersHorizontal } from "@/ds";

export type DashboardRightbarProps = {
  collapsed?: boolean;
  variant?: "desktop" | "drawer";
  onToggleCollapsed?: () => void;
};

export function DashboardRightbar({ collapsed, variant = "desktop", onToggleCollapsed }: DashboardRightbarProps) {
  return (
    <div className={variant === "desktop" ? "ui-rightbar" : undefined}>
      <Card>
        <Stack gap="compact">
          <div className="ui-row ui-row--between">
            <div className="ui-row">
              <Icon icon={SlidersHorizontal} aria-hidden />
              {collapsed ? <span className="ui-sr-only">Panel</span> : <div className="text-heading-4">Panel</div>}
            </div>

            {onToggleCollapsed ? (
              <Button size="sm" variant="secondary" onClick={onToggleCollapsed} aria-label={collapsed ? "Expand right panel" : "Collapse right panel"}>
                {collapsed ? "Expand" : "Collapse"}
              </Button>
            ) : null}
          </div>

          {collapsed ? (
            <div className="ui-stack ui-stack--tight">
              <Badge tone="neutral">…</Badge>
            </div>
          ) : (
            <>
              <Text tone="muted">Use this area for filters, run settings, context, or secondary tools.</Text>
              <div className="ui-stack ui-stack--tight">
                {[
                  { id: "r-1", label: "Run settings", tone: "accent" as const },
                  { id: "r-2", label: "System", tone: "info" as const },
                  { id: "r-3", label: "Shortcuts", tone: "neutral" as const },
                ].map((i) => (
                  <div key={i.id} className="ui-row ui-row--between">
                    <span className="text-body-small">{i.label}</span>
                    <Badge tone={i.tone}>{i.tone}</Badge>
                  </div>
                ))}
              </div>
            </>
          )}
        </Stack>
      </Card>
    </div>
  );
}
