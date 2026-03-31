"use client";

import * as React from "react";

import { cx } from "../utils/cx";
import { Input } from "../primitives/Input";

export type AutocompleteOption = {
  id: string;
  label: string;
  value?: string;
};

export type AutocompleteProps = {
  value: string;
  onValueChange: (value: string) => void;
  options: AutocompleteOption[];
  placeholder?: string;
  label?: string;
  className?: string;
};

export function Autocomplete({ value, onValueChange, options, placeholder, label = "Autocomplete", className }: AutocompleteProps) {
  const [open, setOpen] = React.useState(false);
  const [active, setActive] = React.useState(0);
  const listId = React.useId();
  const optionIdPrefix = React.useId();

  const filtered = React.useMemo(() => {
    const q = value.trim().toLowerCase();
    if (!q) return options;
    return options.filter((o) => o.label.toLowerCase().includes(q));
  }, [options, value]);

  React.useEffect(() => {
    setActive(0);
  }, [value]);

  const activeOptionId = filtered.length > 0 ? `${optionIdPrefix}${filtered[active]?.id}` : undefined;

  return (
    <div className={cx("ui-ac", className)}>
      <Input
        value={value}
        onChange={(e) => {
          onValueChange(e.target.value);
          setOpen(true);
        }}
        placeholder={placeholder}
        role="combobox"
        aria-label={label}
        aria-expanded={open}
        aria-controls={listId}
        aria-autocomplete="list"
        aria-activedescendant={open ? activeOptionId : undefined}
        onFocus={() => setOpen(true)}
        onBlur={() => {
          window.setTimeout(() => setOpen(false), 120);
        }}
        onKeyDown={(e) => {
          if (!open && (e.key === "ArrowDown" || e.key === "ArrowUp")) {
            setOpen(true);
            return;
          }
          if (e.key === "Escape") {
            setOpen(false);
            return;
          }
          if (e.key === "ArrowDown") {
            e.preventDefault();
            setActive((v) => Math.min(filtered.length - 1, v + 1));
            return;
          }
          if (e.key === "ArrowUp") {
            e.preventDefault();
            setActive((v) => Math.max(0, v - 1));
            return;
          }
          if (e.key === "Home") {
            e.preventDefault();
            setActive(0);
            return;
          }
          if (e.key === "End") {
            e.preventDefault();
            setActive(Math.max(0, filtered.length - 1));
            return;
          }
          if (e.key === "Enter") {
            const opt = filtered[active];
            if (!opt) return;
            onValueChange(opt.value ?? opt.label);
            setOpen(false);
          }
        }}
      />

      {open ? (
        <div className="ui-ac__panel" role="listbox" id={listId}>
          {filtered.length === 0 ? <div className="ui-ac__empty text-caption ui-text-muted">No matches</div> : null}
          {filtered.map((o, idx) => (
            <button
              key={o.id}
              id={`${optionIdPrefix}${o.id}`}
              type="button"
              className={cx("ui-ac__opt ui-focus-ring", idx === active && "ui-ac__opt--active")}
              role="option"
              aria-selected={idx === active}
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => {
                onValueChange(o.value ?? o.label);
                setOpen(false);
              }}
            >
              {o.label}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
