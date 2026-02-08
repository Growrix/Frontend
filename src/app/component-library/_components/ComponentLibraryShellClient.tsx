"use client";

import * as React from "react";

import { DashboardShell, type DevicePreviewMode, DevicePreview, PreviewPlatformProvider } from "@/ds";

import { ComponentLibrarySidebar } from "./ComponentLibrarySidebar";
import { ComponentLibraryTopbar } from "./ComponentLibraryTopbar";

const PREVIEW_STORAGE_KEY = "solarmatch-component-library-preview-device";

function normalizeDevice(value: string | null): DevicePreviewMode | null {
  if (value === "current" || value === "mobile" || value === "tablet") return value;
  return null;
}

export function ComponentLibraryShellClient({ children }: { children: React.ReactNode }) {
  const [leftCollapsed, setLeftCollapsed] = React.useState(false);
  const [previewDevice, setPreviewDevice] = React.useState<DevicePreviewMode>("current");

  React.useEffect(() => {
    try {
      const urlDevice = normalizeDevice(new URLSearchParams(window.location.search).get("device"));
      if (urlDevice) {
        setPreviewDevice(urlDevice);
        return;
      }

      const storedDevice = normalizeDevice(window.localStorage.getItem(PREVIEW_STORAGE_KEY));
      if (storedDevice) setPreviewDevice(storedDevice);
    } catch {
      // ignore
    }
  }, []);

  React.useEffect(() => {
    try {
      window.localStorage.setItem(PREVIEW_STORAGE_KEY, previewDevice);

      const url = new URL(window.location.href);
      if (previewDevice === "current") url.searchParams.delete("device");
      else url.searchParams.set("device", previewDevice);
      window.history.replaceState({}, "", url.toString());
    } catch {
      // ignore
    }
  }, [previewDevice]);

  const framed = previewDevice !== "current";

  return (
    <DevicePreview device={previewDevice} onDeviceChange={setPreviewDevice} defaultDevice="current">
      <PreviewPlatformProvider platform={previewDevice === "current" ? "auto" : "mobile"}>
        <div
          data-platform={previewDevice === "mobile" || previewDevice === "tablet" ? "mobile" : undefined}
          data-density={previewDevice === "mobile" || previewDevice === "tablet" ? "compact" : undefined}
          data-visual={previewDevice === "mobile" || previewDevice === "tablet" ? "basic" : undefined}
        >
          <DashboardShell
            containerWidth="full"
            topbar={<ComponentLibraryTopbar leftCollapsed={leftCollapsed} onToggleLeftCollapsed={() => setLeftCollapsed((v) => !v)} />}
            leftSidebar={framed ? undefined : <ComponentLibrarySidebar variant="desktop" collapsed={leftCollapsed} />}
            leftCollapsed={framed ? true : leftCollapsed}
          >
            {children}
          </DashboardShell>
        </div>
      </PreviewPlatformProvider>
    </DevicePreview>
  );
}
