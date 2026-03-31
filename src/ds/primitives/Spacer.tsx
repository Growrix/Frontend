import * as React from "react";
import { cx } from "../utils/cx";

export type SpacerSize = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

export type SpacerProps = React.HTMLAttributes<HTMLDivElement> & {
  size?: SpacerSize;
};

export const Spacer = React.forwardRef<HTMLDivElement, SpacerProps>(function Spacer(
  { size = 6, className, ...props },
  ref,
) {
  return <div ref={ref} className={cx("ui-spacer", `ui-spacer--${size}`, className)} aria-hidden="true" {...props} />;
});
