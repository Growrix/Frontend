import * as React from "react";

import { DashboardShellClient } from "./_components/DashboardShellClient";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return <DashboardShellClient>{children}</DashboardShellClient>;
}
