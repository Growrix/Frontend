import * as React from "react";

import type { LucideIcon } from "lucide-react";

export type IconSize = "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl";
export type IconColor = "default" | "muted" | "accent" | "success" | "warning" | "danger" | "on-accent";

export type IconProps = {
  icon: LucideIcon;
  size?: IconSize;
  color?: IconColor;
  className?: string;
  "aria-label"?: string;
  "aria-hidden"?: boolean;
};

function cx(...classes: Array<string | false | undefined | null>) {
  return classes.filter(Boolean).join(" ");
}

const colorClassMap: Record<IconColor, string | false> = {
  default: false,
  muted: "ui-icon--muted",
  accent: "ui-icon--accent",
  success: "ui-icon--success",
  warning: "ui-icon--warning",
  danger: "ui-icon--danger",
  "on-accent": "ui-icon--on-accent",
};

export function Icon({
  icon: Lucide,
  size = "md",
  color = "default",
  className,
  "aria-label": ariaLabel,
  ...props
}: IconProps) {
  return (
    <Lucide
      width="1em"
      height="1em"
      className={cx("ui-icon", `ui-icon--${size}`, colorClassMap[color], className)}
      aria-hidden={ariaLabel ? undefined : true}
      aria-label={ariaLabel}
      {...props}
    />
  );
}
