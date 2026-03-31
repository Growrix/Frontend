import * as React from "react";
import { cx } from "../utils/cx";

export type StackGap = "tight" | "compact" | "default" | "loose" | "spacious";
export type StackDirection = "column" | "row";

export type StackProps = React.HTMLAttributes<HTMLDivElement> & {
  gap?: StackGap;
  direction?: StackDirection;
};

export const Stack = React.forwardRef<HTMLDivElement, StackProps>(function Stack(
  { gap = "default", direction = "column", className, ...props },
  ref,
) {
  return (
    <div
      ref={ref}
      className={cx(
        "ui-stack",
        gap !== "default" && `ui-stack--${gap}`,
        direction === "row" && "ui-stack--row",
        className,
      )}
      {...props}
    />
  );
});
