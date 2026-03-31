import * as React from "react";
import { cx } from "../utils/cx";

export type SelectSize = "sm" | "md" | "lg";

export type SelectProps = React.SelectHTMLAttributes<HTMLSelectElement> & {
  size?: SelectSize;
  error?: boolean;
};

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(function Select(
  { className, children, size = "md", error, ...props },
  ref,
) {
  return (
    <div className={cx("ui-select", `ui-select--${size}`, error && "ui-select--error", className)}>
      <select
        ref={ref}
        aria-invalid={error || undefined}
        className="ui-select__control ui-focus-ring"
        {...props}
      >
        {children}
      </select>
      <span className="ui-select__chevron" aria-hidden="true" />
    </div>
  );
});
