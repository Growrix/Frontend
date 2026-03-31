import * as React from "react";

import { cx } from "../../../utils/cx";
import { Button, type ButtonProps } from "../../../primitives/Button";

export type FloatingActionProps = Omit<ButtonProps, "variant" | "className"> & {
  className?: string;
};

export function FloatingAction({ className, ...props }: FloatingActionProps) {
  return <Button variant="fab" className={cx("ui-fab", className)} {...props} />;
}
