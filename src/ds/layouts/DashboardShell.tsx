import * as React from "react";

import { Container } from "../primitives/Container";

export type DashboardShellProps = {
  topbar?: React.ReactNode;
  sidebar?: React.ReactNode;
  children: React.ReactNode;
};

function cx(...classes: Array<string | false | undefined | null>) {
  return classes.filter(Boolean).join(" ");
}

export function DashboardShell({ topbar, sidebar, children }: DashboardShellProps) {
  return (
    <div className="ui-page">
      {topbar ? <div className="ui-band ui-band--surface ui-sticky-top">{topbar}</div> : null}
      <main className="ui-page-main">
        <Container width="wide">
          <div className={cx("ui-shell-grid", sidebar ? "ui-shell-grid--sidebar" : null)}>
            {sidebar ? <aside>{sidebar}</aside> : null}
            <div>{children}</div>
          </div>
        </Container>
      </main>
    </div>
  );
}
