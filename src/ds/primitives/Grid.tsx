import * as React from "react";
import { cx } from "../utils/cx";

export type GridColumns = 1 | 2 | 3 | 4 | "auto-fill";
export type GridGap = "tight" | "compact" | "default" | "loose" | "spacious";

export type GridProps = React.HTMLAttributes<HTMLDivElement> & {
  columns?: GridColumns;
  gap?: GridGap;
};

export const Grid = React.forwardRef<HTMLDivElement, GridProps>(function Grid(
  { columns = 1, gap = "default", className, ...props },
  ref,
) {
  return (
    <div
      ref={ref}
      className={cx(
        "ui-grid",
        columns === "auto-fill" ? "ui-grid--auto" : columns !== 1 && `ui-grid--${columns}`,
        gap !== "default" && `ui-grid--gap-${gap}`,
        className,
      )}
      {...props}
    />
  );
});
