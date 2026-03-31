import * as React from "react";

import type { LucideIcon } from "lucide-react";

export type IconSize = "xs" | "sm" | "md" | "lg" | "xl";

export type IconProps = {
  icon: LucideIcon;
  size?: IconSize;
  className?: string;
  "aria-hidden"?: true;
};

function cx(...classes: Array<string | false | undefined | null>) {
  return classes.filter(Boolean).join(" ");
}

export function Icon({ icon: Lucide, size = "md", className, ...props }: IconProps) {
  return <Lucide width="1em" height="1em" className={cx("ui-icon", `ui-icon--${size}`, className)} {...props} />;
}
