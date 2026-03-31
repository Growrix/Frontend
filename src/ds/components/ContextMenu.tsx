"use client";

import * as React from "react";
import { createPortal } from "react-dom";

import { cx } from "../utils/cx";

export type ContextMenuItem = {
  id: string;
  label: string;
  onSelect: () => void;
};

export type ContextMenuProps = {
  items: ContextMenuItem[];
  children: React.ReactNode;
  className?: string;
};

export function ContextMenu({ items, children, className }: ContextMenuProps) {
  const [open, setOpen] = React.useState(false);
  const [pos, setPos] = React.useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const menuRef = React.useRef<HTMLDivElement | null>(null);
  const lastActiveRef = React.useRef<HTMLElement | null>(null);

  const getMenuItems = React.useCallback(() => {
    const panel = menuRef.current;
    if (!panel) return [] as HTMLElement[];
    return Array.from(panel.querySelectorAll<HTMLElement>('[role="menuitem"]'));
  }, []);

  const focusItem = React.useCallback((index: number) => {
    const items = getMenuItems();
    if (!items.length) return;
    const next = ((index % items.length) + items.length) % items.length;
    items[next]?.focus();
  }, [getMenuItems]);

  React.useEffect(() => {
    if (!open) return;
    const onDown = (e: PointerEvent) => {
      const t = e.target as Node | null;
      if (menuRef.current && t && menuRef.current.contains(t)) return;
      setOpen(false);
    };
    window.addEventListener("pointerdown", onDown);
    return () => {
      window.removeEventListener("pointerdown", onDown);
    };
  }, [open]);

  React.useEffect(() => {
    if (!open) return;
    const el = menuRef.current;
    if (!el) return;
    el.style.setProperty("--ui-cm-left", `${pos.x}px`);
    el.style.setProperty("--ui-cm-top", `${pos.y}px`);
  }, [open, pos]);

  React.useEffect(() => {
    if (!open) return;
    const timer = window.setTimeout(() => focusItem(0), 0);
    return () => window.clearTimeout(timer);
  }, [open, focusItem]);

  return (
    <div
      className={cx("ui-cmhost", className)}
      onContextMenu={(e) => {
        e.preventDefault();
        lastActiveRef.current = document.activeElement as HTMLElement;
        setPos({ x: e.clientX, y: e.clientY });
        setOpen(true);
      }}
    >
      {children}
      {open
        ? createPortal(
            <div
              ref={menuRef}
              className="ui-cm"
              role="menu"
              aria-label="Context menu"
              onKeyDown={(e) => {
                const menuItems = getMenuItems();
                if (!menuItems.length) return;
                const currentIndex = menuItems.findIndex((item) => item === document.activeElement);

                if (e.key === "Escape") {
                  e.preventDefault();
                  setOpen(false);
                  lastActiveRef.current?.focus();
                  return;
                }
                if (e.key === "ArrowDown") {
                  e.preventDefault();
                  focusItem(currentIndex < 0 ? 0 : currentIndex + 1);
                  return;
                }
                if (e.key === "ArrowUp") {
                  e.preventDefault();
                  focusItem(currentIndex < 0 ? menuItems.length - 1 : currentIndex - 1);
                  return;
                }
                if (e.key === "Home") {
                  e.preventDefault();
                  focusItem(0);
                  return;
                }
                if (e.key === "End") {
                  e.preventDefault();
                  focusItem(menuItems.length - 1);
                  return;
                }
                if (e.key === "Tab") {
                  e.preventDefault();
                  setOpen(false);
                  lastActiveRef.current?.focus();
                }
              }}
            >
              {items.map((it) => (
                <button
                  key={it.id}
                  type="button"
                  className="ui-cm__item ui-focus-ring"
                  role="menuitem"
                  onClick={() => {
                    it.onSelect();
                    setOpen(false);
                  }}
                >
                  {it.label}
                </button>
              ))}
            </div>,
            document.body
          )
        : null}
    </div>
  );
}
