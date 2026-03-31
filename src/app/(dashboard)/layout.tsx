import { DashboardShell } from "@/ds";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <DashboardShell containerWidth="full">
      <div id="main">{children}</div>
    </DashboardShell>
  );
}
