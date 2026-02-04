import * as React from "react";

import { Stack } from "../primitives/Stack";

export type SectionHeaderProps = {
  kicker?: string;
  title: React.ReactNode;
  lede?: React.ReactNode;
  align?: "left" | "center";
};

export function SectionHeader({ kicker, title, lede, align = "left" }: SectionHeaderProps) {
  return (
    <header className={align === "center" ? "ui-text-center" : undefined}>
      <Stack gap="tight">
        {kicker ? <div className="ui-kicker">{kicker}</div> : null}
        <h2 className="ui-h2">{title}</h2>
        {lede ? <div className="ui-lede">{lede}</div> : null}
      </Stack>
    </header>
  );
}
