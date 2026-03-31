import * as React from "react";

import { cx } from "../../../utils/cx";

export type ScreenProps = React.HTMLAttributes<HTMLDivElement> & {
  density?: "default" | "compact";
};

export function Screen({ density = "default", className, ...props }: ScreenProps) {
  return (
    <div
      data-platform="mobile"
      data-density={density === "compact" ? "compact" : undefined}
      className={cx("ui-screen", className)}
      {...props}
    />
  );
}
