import * as React from "react";

import { cx } from "../utils/cx";
import type { AlertTone } from "./Alert";

export type BannerProps = {
  tone?: AlertTone;
  icon?: React.ReactNode;
  title?: React.ReactNode;
  children?: React.ReactNode;
  actions?: React.ReactNode;
  dismissible?: boolean;
  onDismiss?: () => void;
  className?: string;
};

export function Banner({
  tone = "info",
  icon,
  title,
  children,
  actions,
  dismissible,
  onDismiss,
  className,
}: BannerProps) {
  return (
    <div
      className={cx("ui-banner", `ui-banner--${tone}`, className)}
      role={tone === "danger" ? "alert" : "status"}
    >
      {icon ? <span className="ui-banner__icon">{icon}</span> : null}
      <div className="ui-banner__body">
        {title ? <div className="ui-banner__title text-body-small">{title}</div> : null}
        {children ? <div className="ui-banner__content text-caption">{children}</div> : null}
      </div>
      {actions ? <div className="ui-banner__actions">{actions}</div> : null}
      {dismissible ? (
        <button
          type="button"
          className="ui-banner__dismiss"
          aria-label="Dismiss"
          onClick={onDismiss}
        >
          ✕
        </button>
      ) : null}
    </div>
  );
}
