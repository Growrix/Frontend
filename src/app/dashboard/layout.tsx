import * as React from "react";

import { DashboardShell } from "@/ds";

import { DashboardSidebar } from "./_components/DashboardSidebar";
import { DashboardTopbar } from "./_components/DashboardTopbar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <DashboardShell topbar={<DashboardTopbar />} sidebar={<DashboardSidebar />}>
      {children}
    </DashboardShell>
  );
}
