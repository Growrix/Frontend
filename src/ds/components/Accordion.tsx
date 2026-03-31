"use client";

import * as React from "react";

import { cx } from "../utils/cx";

export type AccordionProps = {
  children: React.ReactNode;
  className?: string;
  type?: "single" | "multiple";
  defaultValue?: string | string[];
};

export function Accordion({ children, className, type = "single", defaultValue }: AccordionProps) {
  const [open, setOpen] = React.useState<string[]>(() => {
    if (Array.isArray(defaultValue)) return defaultValue;
    if (typeof defaultValue === "string") return [defaultValue];
    return [];
  });

  const toggle = React.useCallback(
    (value: string) => {
      setOpen((prev) => {
        const isOpen = prev.includes(value);
        if (type === "single") return isOpen ? [] : [value];
        return isOpen ? prev.filter((v) => v !== value) : [...prev, value];
      });
    },
    [type],
  );

  const handleKeyDown = React.useCallback((e: React.KeyboardEvent<HTMLDivElement>) => {
    const triggers = Array.from(
      (e.currentTarget as HTMLElement).querySelectorAll<HTMLButtonElement>(".ui-accordion__trigger"),
    );
    const idx = triggers.indexOf(e.target as HTMLButtonElement);
    if (idx < 0) return;

    let next = -1;
    if (e.key === "ArrowDown") next = (idx + 1) % triggers.length;
    else if (e.key === "ArrowUp") next = (idx - 1 + triggers.length) % triggers.length;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = triggers.length - 1;

    if (next >= 0) {
      e.preventDefault();
      triggers[next].focus();
    }
  }, []);

  return (
    <div className={cx("ui-accordion", className)} onKeyDown={handleKeyDown}>
      {React.Children.map(children, (child) => {
        if (!React.isValidElement(child)) return child;
        if (child.type !== AccordionItem) return child;
        const value = (child.props as AccordionItemProps).value;
        return React.cloneElement(child as React.ReactElement<AccordionItemProps>, {
          open: open.includes(value),
          onToggle: () => toggle(value),
        });
      })}
    </div>
  );
}

export type AccordionItemProps = {
  value: string;
  title: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  open?: boolean;
  onToggle?: () => void;
};

export function AccordionItem({ title, children, className, open, onToggle }: AccordionItemProps) {
  const id = React.useId();
  const triggerId = `${id}-trigger`;
  return (
    <div className={cx("ui-accordion__item", className)} data-open={open ? "true" : "false"}>
      <button
        id={triggerId}
        className="ui-accordion__trigger ui-focus-ring"
        type="button"
        aria-expanded={open}
        aria-controls={id}
        onClick={onToggle}
      >
        <span className="ui-accordion__title text-body-small">{title}</span>
        <span className="ui-accordion__chev" aria-hidden="true" />
      </button>
      <div id={id} className="ui-accordion__panel" role="region" aria-labelledby={triggerId} hidden={!open}>
        <div className="ui-accordion__content">{children}</div>
      </div>
    </div>
  );
}
