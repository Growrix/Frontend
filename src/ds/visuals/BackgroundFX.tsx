import * as React from "react";

import { cx } from "../utils/cx";

export type BackgroundFXProps = React.HTMLAttributes<HTMLDivElement> & {
  children: React.ReactNode;
};

export function BackgroundFX({ children, className, ...props }: BackgroundFXProps) {
  return (
    <div className={cx("ui-bgfx", className)} {...props}>
      {children}
    </div>
  );
}
