"use client";

import * as React from "react";
import { cx } from "../utils/cx";

export type CheckboxProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> & {
  label?: React.ReactNode;
  indeterminate?: boolean;
};

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(function Checkbox(
  { className, label, id, disabled, indeterminate, ...props },
  ref,
) {
  const innerRef = React.useRef<HTMLInputElement | null>(null);
  const fallbackId = React.useId();
  const inputId = id ?? fallbackId;

  const setRef = React.useCallback(
    (node: HTMLInputElement | null) => {
      innerRef.current = node;
      if (typeof ref === "function") ref(node);
      else if (ref) (ref as React.MutableRefObject<HTMLInputElement | null>).current = node;
    },
    [ref],
  );

  React.useEffect(() => {
    if (innerRef.current) {
      innerRef.current.indeterminate = Boolean(indeterminate);
    }
  }, [indeterminate]);

  return (
    <label className={cx("ui-check", disabled && "ui-check--disabled", className)}>
      <input
        ref={setRef}
        id={inputId}
        type="checkbox"
        className="ui-check__control ui-focus-ring"
        disabled={disabled}
        aria-checked={indeterminate ? "mixed" : undefined}
        {...props}
      />
      <span className="ui-check__box" aria-hidden="true" />
      {label ? <span className="ui-check__label text-body-small">{label}</span> : null}
    </label>
  );
});
