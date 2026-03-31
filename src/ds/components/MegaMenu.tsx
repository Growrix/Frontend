"use client";

import * as React from "react";

import { cx } from "../utils/cx";

export type MegaMenuSection = {
  id: string;
  title?: React.ReactNode;
  items: { id: string; label: React.ReactNode; href: string; description?: React.ReactNode }[];
};

export type MegaMenuProps = {
  sections: MegaMenuSection[];
  open: boolean;
  onOpenChange: (open: boolean) => void;
  columns?: 2 | 3 | 4;
  className?: string;
};

export function MegaMenu({ sections, open, onOpenChange, columns = 3, className }: MegaMenuProps) {
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onOpenChange(false);
    };
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) onOpenChange(false);
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("mousedown", onClick);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("mousedown", onClick);
    };
  }, [open, onOpenChange]);

  if (!open) return null;

  return (
    <div
      ref={ref}
      className={cx("ui-mega", `ui-mega--cols-${columns}`, className)}
      role="menu"
      onMouseLeave={() => onOpenChange(false)}
    >
      {sections.map((sec) => (
        <div key={sec.id} className="ui-mega__section">
          {sec.title ? <div className="ui-mega__heading text-label">{sec.title}</div> : null}
          <ul className="ui-mega__list">
            {sec.items.map((it) => (
              <li key={it.id}>
                <a className="ui-mega__link ui-focus-ring" href={it.href} role="menuitem">
                  <span className="ui-mega__link-label">{it.label}</span>
                  {it.description ? <span className="ui-mega__link-desc text-caption ui-text-muted">{it.description}</span> : null}
                </a>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
