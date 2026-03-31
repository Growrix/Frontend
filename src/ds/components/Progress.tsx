"use client";

import * as React from "react";

import { cx } from "../utils/cx";

export type ProgressSize = "thin" | "default" | "thick";
export type ProgressColor = "accent" | "success" | "danger" | "warning";

export type ProgressBarProps = {
  value: number;
  max?: number;
  label?: string;
  size?: ProgressSize;
  color?: ProgressColor;
  indeterminate?: boolean;
  showPercent?: boolean;
  className?: string;
};

export function ProgressBar({
  value,
  max = 100,
  label = "Progress",
  size = "default",
  color,
  indeterminate,
  showPercent,
  className,
}: ProgressBarProps) {
  const safeMax = Math.max(1, max);
  const pct = Math.max(0, Math.min(100, (value / safeMax) * 100));

  const rootRef = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    if (!indeterminate) {
      el.style.setProperty("--ui-progress", `${pct}%`);
    }
  }, [pct, indeterminate]);

  return (
    <div
      className={cx(
        "ui-progress",
        size !== "default" && `ui-progress--${size}`,
        color && `ui-progress--${color}`,
        indeterminate && "ui-progress--indeterminate",
        className,
      )}
      ref={rootRef}
      role="progressbar"
      aria-label={label}
      aria-valuemin={0}
      aria-valuemax={safeMax}
      aria-valuenow={indeterminate ? undefined : value}
    >
      <div className="ui-progress__bar" />
      {showPercent && !indeterminate ? (
        <span className="ui-progress__label text-caption">{Math.round(pct)}%</span>
      ) : null}
    </div>
  );
}

export type Step = {
  id: string;
  label: React.ReactNode;
  status?: "complete" | "current" | "upcoming";
};

export type StepperProps = {
  steps: Step[];
  className?: string;
};

export function Stepper({ steps, className }: StepperProps) {
  return (
    <ol className={cx("ui-stepper", className)}>
      {steps.map((s) => (
        <li key={s.id} className={cx("ui-stepper__step", s.status && `ui-stepper__step--${s.status}`)}>
          <span className="ui-stepper__dot" aria-hidden="true" />
          <span className="ui-stepper__label text-body-small">{s.label}</span>
        </li>
      ))}
    </ol>
  );
}
