import { CenteredShell } from "@/ds";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <CenteredShell>
      <div id="main">{children}</div>
    </CenteredShell>
  );
}
