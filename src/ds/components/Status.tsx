"use client";

import * as React from "react";

import { cx } from "../utils/cx";
import { Button } from "../primitives/Button";

export type StatusTone = "active" | "pending" | "disabled" | "online" | "offline" | "busy" | "away";
export type StatusVariant = "dot" | "badge" | "label";

export function StatusIndicator({
  tone = "active",
  variant = "dot",
  label,
  className,
}: {
  tone?: StatusTone;
  variant?: StatusVariant;
  label: React.ReactNode;
  className?: string;
}) {
  return (
    <span className={cx("ui-status", `ui-status--${tone}`, `ui-status--${variant}`, className)}>
      {variant !== "label" ? <span className="ui-status__dot" aria-hidden="true" /> : null}
      <span className="text-body-small">{label}</span>
    </span>
  );
}

export function StatusButton({ tone, label, onClick, className }: { tone: StatusTone; label: string; onClick?: () => void; className?: string }) {
  return (
    <Button size="sm" variant="secondary" className={cx("ui-statusbtn", `ui-statusbtn--${tone}`, className)} onClick={onClick}>
      <span className="ui-statusbtn__dot" aria-hidden="true" />
      {label}
    </Button>
  );
}
