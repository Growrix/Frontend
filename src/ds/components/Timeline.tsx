import * as React from "react";

import { cx } from "../utils/cx";

export type TimelineVariant = "left" | "center" | "horizontal" | "activity";

export type TimelineItem = {
  id: string;
  title: React.ReactNode;
  meta?: React.ReactNode;
  body?: React.ReactNode;
  icon?: React.ReactNode;
};

export type TimelineProps = {
  items: TimelineItem[];
  variant?: TimelineVariant;
  className?: string;
};

export function Timeline({ items, variant = "left", className }: TimelineProps) {
  return (
    <div className={cx("ui-timeline", `ui-timeline--${variant}`, className)}>
      {items.map((it) => (
        <div key={it.id} className="ui-timeline__item">
          <div className="ui-timeline__rail" aria-hidden="true">
            {it.icon ? <span className="ui-timeline__icon">{it.icon}</span> : <span className="ui-timeline__dot" />}
          </div>
          <div className="ui-timeline__content">
            <div className="ui-row ui-row--between">
              <div className="text-body-small">{it.title}</div>
              {it.meta ? <div className="text-caption ui-text-muted">{it.meta}</div> : null}
            </div>
            {it.body ? <div className="text-caption ui-text-muted">{it.body}</div> : null}
          </div>
        </div>
      ))}
    </div>
  );
}
