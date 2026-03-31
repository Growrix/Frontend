import * as React from "react";
import { cx } from "../utils/cx";

export type ContainerSize = "narrow" | "default" | "wide" | "xl" | "full";

export type ContainerProps = React.HTMLAttributes<HTMLDivElement> & {
  size?: ContainerSize;
};

export const Container = React.forwardRef<HTMLDivElement, ContainerProps>(function Container(
  { size = "default", className, ...props },
  ref,
) {
  return (
    <div
      ref={ref}
      className={cx(
        "ui-container",
        size !== "default" && `ui-container--${size}`,
        className,
      )}
      {...props}
    />
  );
});
