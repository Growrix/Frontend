import * as React from "react";

import { Card } from "./Card";
import { cx } from "../utils/cx";

export type EmptyStateVariant = "first-use" | "filtered-empty" | "completed" | "error" | "permission";

export type EmptyStateProps = {
  title: React.ReactNode;
  description?: React.ReactNode;
  icon?: React.ReactNode;
  actions?: React.ReactNode;
  variant?: EmptyStateVariant;
  className?: string;
};

export function EmptyState({ title, description, icon, actions, variant, className }: EmptyStateProps) {
  return (
    <Card>
      <div className={cx("ui-empty", variant && `ui-empty--${variant}`, className)}>
        {icon ? <div className="ui-empty__icon">{icon}</div> : null}
        <div className="ui-empty__title text-heading-4">{title}</div>
        {description ? <div className="ui-empty__desc text-body-small ui-text-muted">{description}</div> : null}
        {actions ? <div className="ui-empty__actions">{actions}</div> : null}
      </div>
    </Card>
  );
}
