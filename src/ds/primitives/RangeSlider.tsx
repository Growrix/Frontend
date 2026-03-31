import * as React from "react";
import { cx } from "../utils/cx";

export type RangeSliderProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> & {
  label?: React.ReactNode;
  valueText?: string;
};

export const RangeSlider = React.forwardRef<HTMLInputElement, RangeSliderProps>(function RangeSlider(
  { className, label, disabled, valueText, min, max, value, ...props },
  ref,
) {
  return (
    <label className={cx("ui-range", disabled && "ui-range--disabled", className)}>
      {label ? <span className="ui-range__label text-body-small">{label}</span> : null}
      <input
        ref={ref}
        className="ui-range__control"
        type="range"
        disabled={disabled}
        min={min}
        max={max}
        value={value}
        aria-valuemin={min != null ? Number(min) : undefined}
        aria-valuemax={max != null ? Number(max) : undefined}
        aria-valuenow={value != null ? Number(value) : undefined}
        aria-valuetext={valueText}
        {...props}
      />
    </label>
  );
});
