import * as React from "react";

import { cx } from "../utils/cx";

export type StepStatus = "complete" | "current" | "upcoming";

export type StepItem = {
  id: string;
  label: React.ReactNode;
  status?: StepStatus;
};

export type StepperOrientation = "horizontal" | "vertical";

export type StepperNavProps = {
  steps: StepItem[];
  orientation?: StepperOrientation;
  className?: string;
};

export function StepperNav({ steps, orientation = "horizontal", className }: StepperNavProps) {
  return (
    <ol className={cx("ui-stepper-nav", `ui-stepper-nav--${orientation}`, className)} aria-label="Progress">
      {steps.map((s, idx) => (
        <li
          key={s.id}
          className={cx("ui-stepper-nav__step", s.status && `ui-stepper-nav__step--${s.status}`)}
          aria-current={s.status === "current" ? "step" : undefined}
        >
          <span className="ui-stepper-nav__indicator" aria-hidden="true">
            {s.status === "complete" ? "\u2713" : idx + 1}
          </span>
          <span className="ui-stepper-nav__label text-body-small">{s.label}</span>
        </li>
      ))}
    </ol>
  );
}
