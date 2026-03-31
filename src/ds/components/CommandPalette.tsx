"use client";

import * as React from "react";

import { cx } from "../utils/cx";
import { Input } from "../primitives/Input";

export type CommandItem = {
  id: string;
  label: string;
  group?: string;
  onSelect: () => void;
  icon?: React.ReactNode;
  shortcut?: string;
};

export type CommandPaletteProps = {
  items: CommandItem[];
  open: boolean;
  onOpenChange: (open: boolean) => void;
  placeholder?: string;
  className?: string;
};

export function CommandPalette({ items, open, onOpenChange, placeholder = "Type a command…", className }: CommandPaletteProps) {
  const [query, setQuery] = React.useState("");
  const [activeIndex, setActiveIndex] = React.useState(0);
  const listRef = React.useRef<HTMLUListElement>(null);
  const inputRef = React.useRef<HTMLInputElement>(null);

  const filtered = React.useMemo(() => {
    if (!query.trim()) return items;
    const q = query.toLowerCase();
    return items.filter((it) => it.label.toLowerCase().includes(q));
  }, [items, query]);

  const groups = React.useMemo(() => {
    const map = new Map<string, CommandItem[]>();
    for (const it of filtered) {
      const g = it.group ?? "";
      if (!map.has(g)) map.set(g, []);
      map.get(g)!.push(it);
    }
    return map;
  }, [filtered]);

  const flatItems = React.useMemo(() => {
    const out: CommandItem[] = [];
    for (const arr of groups.values()) out.push(...arr);
    return out;
  }, [groups]);

  React.useEffect(() => {
    setActiveIndex(0);
  }, [query]);

  React.useEffect(() => {
    if (open) {
      setQuery("");
      setActiveIndex(0);
      requestAnimationFrame(() => inputRef.current?.focus());
    }
  }, [open]);

  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        onOpenChange(!open);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onOpenChange]);

  const select = (item: CommandItem) => {
    item.onSelect();
    onOpenChange(false);
  };

  if (!open) return null;

  return (
    <div className="ui-command__backdrop" onClick={() => onOpenChange(false)}>
      <div
        className={cx("ui-command", className)}
        role="dialog"
        aria-modal="true"
        aria-label="Command palette"
        onClick={(e) => e.stopPropagation()}
        onKeyDown={(e) => {
          if (e.key === "Escape") {
            e.preventDefault();
            onOpenChange(false);
            return;
          }
          if (e.key === "ArrowDown") {
            e.preventDefault();
            setActiveIndex((i) => Math.min(i + 1, flatItems.length - 1));
            return;
          }
          if (e.key === "ArrowUp") {
            e.preventDefault();
            setActiveIndex((i) => Math.max(i - 1, 0));
            return;
          }
          if (e.key === "Enter" && flatItems[activeIndex]) {
            e.preventDefault();
            select(flatItems[activeIndex]);
          }
        }}
      >
        <div className="ui-command__search">
          <Input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={placeholder}
            aria-label="Search commands"
          />
        </div>
        <ul ref={listRef} className="ui-command__list" role="listbox">
          {Array.from(groups.entries()).map(([group, groupItems]) => (
            <React.Fragment key={group}>
              {group ? <li className="ui-command__group text-caption ui-text-muted">{group}</li> : null}
              {groupItems.map((it) => {
                const idx = flatItems.indexOf(it);
                return (
                  <li
                    key={it.id}
                    className={cx("ui-command__item", idx === activeIndex && "ui-command__item--active")}
                    role="option"
                    aria-selected={idx === activeIndex}
                    onClick={() => select(it)}
                  >
                    {it.icon ? <span className="ui-command__icon">{it.icon}</span> : null}
                    <span className="ui-command__label">{it.label}</span>
                    {it.shortcut ? <kbd className="ui-command__shortcut text-micro">{it.shortcut}</kbd> : null}
                  </li>
                );
              })}
            </React.Fragment>
          ))}
          {flatItems.length === 0 ? (
            <li className="ui-command__empty ui-text-muted">No results.</li>
          ) : null}
        </ul>
      </div>
    </div>
  );
}
