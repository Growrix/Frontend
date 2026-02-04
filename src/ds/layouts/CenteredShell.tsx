import * as React from "react";

import { Stack } from "../primitives/Stack";
import { Section } from "../components/Section";

export type CenteredShellProps = {
  title?: React.ReactNode;
  children: React.ReactNode;
};

export function CenteredShell({ title, children }: CenteredShellProps) {
  return (
    <div className="ui-page">
      <main className="ui-page-main">
        <Section container="narrow">
          <Stack>
            {title ? <h1 className="ui-h1">{title}</h1> : null}
            <div>{children}</div>
          </Stack>
        </Section>
      </main>
    </div>
  );
}
