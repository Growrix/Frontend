import * as React from "react";
import { cx } from "../utils/cx";

export type InputSize = "sm" | "md" | "lg";

export type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  size?: InputSize;
  startSlot?: React.ReactNode;
  endSlot?: React.ReactNode;
  error?: boolean;
};

export const Input = React.forwardRef<HTMLInputElement, InputProps>(function Input(
  { className, size = "md", startSlot, endSlot, error, ...props },
  ref,
) {
  const hasSlots = Boolean(startSlot || endSlot);

  const input = (
    <input
      ref={ref}
      aria-invalid={error || undefined}
      className={cx(
        "ui-input ui-focus-ring",
        `ui-input--${size}`,
        error && "ui-input--error",
        !hasSlots && className,
      )}
      {...props}
    />
  );

  if (!hasSlots) return input;

  return (
    <div className={cx("ui-input-wrap", `ui-input-wrap--${size}`, error && "ui-input-wrap--error", className)}>
      {startSlot && <span className="ui-input-wrap__slot">{startSlot}</span>}
      {input}
      {endSlot && <span className="ui-input-wrap__slot">{endSlot}</span>}
    </div>
  );
});
