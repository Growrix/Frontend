"use client";

import * as React from "react";

import { DashboardShell, PreviewPlatformProvider } from "@/ds";

import { PublicBottomNav } from "../../_components/PublicBottomNav";

import { ComponentLibrarySidebar } from "./ComponentLibrarySidebar";
import { ComponentLibraryTopbar } from "./ComponentLibraryTopbar";

export function ComponentLibraryShellClient({ children }: { children: React.ReactNode }) {
  const [leftCollapsed, setLeftCollapsed] = React.useState(false);

  return (
    <PreviewPlatformProvider platform="auto">
      <DashboardShell
        containerWidth="full"
        topbar={<ComponentLibraryTopbar leftCollapsed={leftCollapsed} onToggleLeftCollapsed={() => setLeftCollapsed((v) => !v)} />}
        leftSidebar={<ComponentLibrarySidebar variant="desktop" collapsed={leftCollapsed} />}
        leftCollapsed={leftCollapsed}
        bottomNav={<PublicBottomNav />}
      >
        {children}
      </DashboardShell>
    </PreviewPlatformProvider>
  );
}
