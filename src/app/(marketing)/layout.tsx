import { PublicShell, PublicHeaderBar } from "@/ds";

export default function MarketingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <PublicShell
      header={
        <PublicHeaderBar>
          <div className="ui-row ui-row--between">
            <strong className="text-label">Blueprint</strong>
          </div>
        </PublicHeaderBar>
      }
    >
      <div id="main">{children}</div>
    </PublicShell>
  );
}
