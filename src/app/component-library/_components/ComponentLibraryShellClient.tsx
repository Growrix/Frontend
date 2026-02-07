"use client";

import * as React from "react";

import { DashboardShell } from "@/ds";

import { ComponentLibrarySidebar } from "./ComponentLibrarySidebar";
import { ComponentLibraryTopbar } from "./ComponentLibraryTopbar";

export function ComponentLibraryShellClient({ children }: { children: React.ReactNode }) {
  const [leftCollapsed, setLeftCollapsed] = React.useState(false);

  return (
    <DashboardShell
      containerWidth="full"
      topbar={<ComponentLibraryTopbar leftCollapsed={leftCollapsed} onToggleLeftCollapsed={() => setLeftCollapsed((v) => !v)} />}
      leftSidebar={<ComponentLibrarySidebar variant="desktop" collapsed={leftCollapsed} />}
      leftCollapsed={leftCollapsed}
    >
      {children}
    </DashboardShell>
  );
}
