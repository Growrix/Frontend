import * as React from "react";

import { cx } from "../utils/cx";

export type CardVariant = "basic" | "interactive" | "selectable";

export type CardProps = React.HTMLAttributes<HTMLDivElement> & {
  variant?: CardVariant;
};

export function Card({ variant, className, ...props }: CardProps) {
  return <div className={cx("ui-card", variant && `ui-card--${variant}`, className)} {...props} />;
}
