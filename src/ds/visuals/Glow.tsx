import * as React from "react";

import { cx } from "../utils/cx";

export type GlowProps = React.HTMLAttributes<HTMLDivElement> & {
  size?: "sm" | "md" | "lg";
};

export function Glow({ size = "md", className, ...props }: GlowProps) {
  return <div className={cx("ui-glow", `ui-glow--${size}`, className)} aria-hidden="true" {...props} />;
}
