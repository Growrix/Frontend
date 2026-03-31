import * as React from "react";

import { cx } from "../utils/cx";

export type BadgeTone = "neutral" | "accent" | "success" | "warning" | "danger" | "info";
export type BadgeVariant = "default" | "dot" | "count" | "tag";
export type BadgeSize = "sm" | "md";

export type BadgeProps = React.HTMLAttributes<HTMLSpanElement> & {
  tone?: BadgeTone;
  variant?: BadgeVariant;
  size?: BadgeSize;
  onRemove?: () => void;
};

export function Badge({ tone = "neutral", variant = "default", size = "md", onRemove, className, children, ...props }: BadgeProps) {
  return (
    <span
      className={cx(
        "ui-badge",
        `ui-badge--${tone}`,
        variant !== "default" && `ui-badge--${variant}`,
        size === "sm" && "ui-badge--sm",
        className
      )}
      {...props}
    >
      {variant === "dot" ? <span className="ui-badge__dot" aria-hidden="true" /> : null}
      {children}
      {onRemove ? (
        <button type="button" className="ui-badge__remove" onClick={onRemove} aria-label="Remove">
          <span aria-hidden="true">&times;</span>
        </button>
      ) : null}
    </span>
  );
}
