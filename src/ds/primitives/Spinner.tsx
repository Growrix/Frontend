import * as React from "react";
import { cx } from "../utils/cx";

export type SpinnerSize = "sm" | "md" | "lg";

export type SpinnerProps = React.HTMLAttributes<HTMLSpanElement> & {
  size?: SpinnerSize;
  label?: string;
};

export const Spinner = React.forwardRef<HTMLSpanElement, SpinnerProps>(function Spinner(
  { size = "md", label = "Loading", className, ...props },
  ref,
) {
  return (
    <span
      ref={ref}
      className={cx("ui-spinner", `ui-spinner--${size}`, className)}
      role="status"
      aria-label={label}
      {...props}
    >
      <svg className="ui-spinner__svg" viewBox="0 0 24 24" aria-hidden="true">
        <circle className="ui-spinner__track" cx="12" cy="12" r="9" />
        <path className="ui-spinner__head" d="M12 3a9 9 0 0 1 9 9" />
      </svg>
    </span>
  );
});
