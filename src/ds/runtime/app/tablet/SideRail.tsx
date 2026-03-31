import * as React from "react";

import { cx } from "../../../utils/cx";

export type SideRailProps = React.HTMLAttributes<HTMLElement> & {
  labelledBy?: string;
};

export function SideRail({ labelledBy, className, ...props }: SideRailProps) {
  return (
    <nav
      data-platform="tablet"
      className={cx("ui-siderail", className)}
      aria-label={labelledBy ? undefined : "Side navigation"}
      aria-labelledby={labelledBy}
      {...props}
    />
  );
}
