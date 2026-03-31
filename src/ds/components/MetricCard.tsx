import * as React from "react";

import { Card } from "./Card";
import { Text } from "../primitives/Text";
import { cx } from "../utils/cx";

export type MetricTrend = "up" | "down" | "flat";

export type MetricCardProps = {
  label: React.ReactNode;
  value: React.ReactNode;
  hint?: React.ReactNode;
  delta?: React.ReactNode;
  trend?: MetricTrend;
  sparkline?: React.ReactNode;
  comparison?: React.ReactNode;
  className?: string;
};

const trendArrow: Record<MetricTrend, string> = { up: "\u25B2", down: "\u25BC", flat: "\u2013" };
const trendClass: Record<MetricTrend, string> = { up: "ui-metric__trend--up", down: "ui-metric__trend--down", flat: "ui-metric__trend--flat" };

export function MetricCard({ label, value, hint, delta, trend, sparkline, comparison, className }: MetricCardProps) {
  return (
    <Card className={className}>
      <div className="ui-metric">
        <div className="ui-row ui-row--between">
          <Text tone="muted">{label}</Text>
          {delta ? (
            <div className={cx("ui-metric__delta text-caption", trend && trendClass[trend])}>
              {trend ? <span aria-hidden="true">{trendArrow[trend]}</span> : null}
              {delta}
            </div>
          ) : null}
        </div>
        <div className="ui-metric__value text-heading-2">{value}</div>
        {sparkline ? <div className="ui-metric__sparkline">{sparkline}</div> : null}
        {comparison ? <Text tone="muted" variant="caption">{comparison}</Text> : null}
        {hint ? <Text tone="muted">{hint}</Text> : null}
      </div>
    </Card>
  );
}
