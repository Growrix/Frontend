import * as React from "react";

import { cx } from "../utils/cx";

export type AlertTone = "neutral" | "success" | "warning" | "danger" | "info";
export type AlertBorder = "full" | "left-accent" | "top-accent" | "subtle";

export type AlertProps = React.HTMLAttributes<HTMLDivElement> & {
  tone?: AlertTone;
  border?: AlertBorder;
  title?: React.ReactNode;
  icon?: React.ReactNode;
  action?: React.ReactNode;
  dismissible?: boolean;
  onDismiss?: () => void;
};

export function Alert({
  tone = "neutral",
  border = "full",
  title,
  icon,
  action,
  dismissible,
  onDismiss,
  className,
  children,
  ...props
}: AlertProps) {
  return (
    <div
      className={cx(
        "ui-alert",
        `ui-alert--${tone}`,
        border !== "full" && `ui-alert--${border}`,
        className,
      )}
      role={tone === "danger" || tone === "warning" ? "alert" : "status"}
      {...props}
    >
      {icon ? <div className="ui-alert__icon">{icon}</div> : null}
      <div className="ui-alert__content">
        {title ? <div className="text-label ui-alert__title">{title}</div> : null}
        {children ? <div className="text-body-small ui-alert__body">{children}</div> : null}
        {action ? <div className="ui-alert__action">{action}</div> : null}
      </div>
      {dismissible ? (
        <button
          type="button"
          className="ui-alert__dismiss"
          aria-label="Dismiss"
          onClick={onDismiss}
        >
          ✕
        </button>
      ) : null}
    </div>
  );
}
