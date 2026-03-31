import * as React from "react";
import { cx } from "../utils/cx";

export type DividerOrientation = "horizontal" | "vertical";

export type DividerProps = React.HTMLAttributes<HTMLHRElement> & {
  orientation?: DividerOrientation;
};

export const Divider = React.forwardRef<HTMLHRElement, DividerProps>(function Divider(
  { orientation = "horizontal", className, ...props },
  ref,
) {
  return (
    <hr
      ref={ref}
      role={orientation === "vertical" ? "separator" : undefined}
      aria-orientation={orientation === "vertical" ? "vertical" : undefined}
      className={cx("ui-divider", orientation === "vertical" && "ui-divider--vertical", className)}
      {...props}
    />
  );
});
