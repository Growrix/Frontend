"use client";

import * as React from "react";

import { cx } from "../utils/cx";

export type SegmentedOption = {
  value: string;
  label: React.ReactNode;
};

export type SegmentedControlProps = {
  options: SegmentedOption[];
  value: string;
  onValueChange: (value: string) => void;
  name?: string;
  className?: string;
};

export function SegmentedControl({ options, value, onValueChange, name, className }: SegmentedControlProps) {
  const groupRef = React.useRef<HTMLDivElement>(null);

  const focusSibling = (current: HTMLButtonElement, mode: "prev" | "next") => {
    const group = groupRef.current;
    if (!group) return;
    const btns = Array.from(group.querySelectorAll<HTMLButtonElement>('[role="radio"]'));
    const idx = btns.indexOf(current);
    if (idx < 0) return;
    const next = mode === "next" ? (idx + 1) % btns.length : (idx - 1 + btns.length) % btns.length;
    btns[next].focus();
    onValueChange(btns[next].dataset.value ?? "");
  };

  return (
    <div
      ref={groupRef}
      className={cx("ui-segmented", className)}
      role="radiogroup"
      aria-label={name ?? "Options"}
    >
      {options.map((opt) => {
        const selected = opt.value === value;
        return (
          <button
            key={opt.value}
            type="button"
            role="radio"
            className={cx("ui-segmented__item ui-focus-ring", selected && "ui-segmented__item--active")}
            aria-checked={selected}
            tabIndex={selected ? 0 : -1}
            data-value={opt.value}
            onClick={() => onValueChange(opt.value)}
            onKeyDown={(e) => {
              if (e.key === "ArrowRight" || e.key === "ArrowDown") {
                e.preventDefault();
                focusSibling(e.currentTarget, "next");
              } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
                e.preventDefault();
                focusSibling(e.currentTarget, "prev");
              }
            }}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}
