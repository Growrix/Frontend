"use client";

import * as React from "react";

import { DashboardShell } from "@/ds";

import { DashboardBottomNav } from "./DashboardBottomNav";
import { DashboardRightbar } from "./DashboardRightbar";
import { DashboardSidebar } from "./DashboardSidebar";
import { DashboardTopbar } from "./DashboardTopbar";

export function DashboardShellClient({ children }: { children: React.ReactNode }) {
  const [leftCollapsed, setLeftCollapsed] = React.useState(false);
  const [rightCollapsed, setRightCollapsed] = React.useState(false);

  return (
    <DashboardShell
      containerWidth="full"
      topbar={
        <DashboardTopbar
          leftCollapsed={leftCollapsed}
          rightCollapsed={rightCollapsed}
          onToggleLeftCollapsed={() => setLeftCollapsed((v) => !v)}
          onToggleRightCollapsed={() => setRightCollapsed((v) => !v)}
        />
      }
      leftSidebar={<DashboardSidebar variant="desktop" collapsed={leftCollapsed} />}
      rightSidebar={<DashboardRightbar collapsed={rightCollapsed} onToggleCollapsed={() => setRightCollapsed((v) => !v)} />}
      bottomNav={<DashboardBottomNav />}
      leftCollapsed={leftCollapsed}
      rightCollapsed={rightCollapsed}
    >
      {children}
    </DashboardShell>
  );
}
