import * as React from "react";

import { cx } from "../utils/cx";

export type NoiseOverlayProps = React.HTMLAttributes<HTMLDivElement> & {
  strength?: "soft" | "medium";
};

export function NoiseOverlay({ strength = "soft", className, ...props }: NoiseOverlayProps) {
  return <div className={cx("ui-noise", `ui-noise--${strength}`, className)} aria-hidden="true" {...props} />;
}
