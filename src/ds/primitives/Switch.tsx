"use client";

import * as React from "react";
import { cx } from "../utils/cx";

export type SwitchProps = {
  checked?: boolean;
  defaultChecked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  disabled?: boolean;
  label?: React.ReactNode;
  className?: string;
};

export const Switch = React.forwardRef<HTMLButtonElement, SwitchProps>(function Switch(
  { checked, defaultChecked, onCheckedChange, disabled, label, className },
  ref,
) {
  const [uncontrolled, setUncontrolled] = React.useState(Boolean(defaultChecked));
  const isControlled = typeof checked === "boolean";
  const value = isControlled ? checked : uncontrolled;

  const set = (next: boolean) => {
    if (!isControlled) setUncontrolled(next);
    onCheckedChange?.(next);
  };

  return (
    <div className={cx("ui-switch-row", className)}>
      <button
        ref={ref}
        type="button"
        className={cx("ui-switch ui-focus-ring", value && "ui-switch--on")}
        role="switch"
        aria-checked={value}
        aria-disabled={disabled || undefined}
        disabled={disabled}
        onClick={() => set(!value)}
      >
        <span className="ui-switch__thumb" aria-hidden="true" />
      </button>
      {label ? <span className={cx("text-body-small", disabled && "ui-text-muted")}>{label}</span> : null}
    </div>
  );
});
