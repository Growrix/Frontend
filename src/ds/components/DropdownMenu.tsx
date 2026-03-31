"use client";

import * as React from "react";
import { createPortal } from "react-dom";

import { cx } from "../utils/cx";

type MenuContextValue = {
  close: () => void;
};

const MenuContext = React.createContext<MenuContextValue | null>(null);

function useMenuContext() {
  return React.useContext(MenuContext);
}

export type DropdownMenuProps = {
  trigger: React.ReactElement<{
    onClick?: (e: React.MouseEvent) => void;
    onKeyDown?: (e: React.KeyboardEvent) => void;
    "aria-expanded"?: boolean;
    "aria-controls"?: string;
  }>;
  children: React.ReactNode;
  className?: string;
};

export function DropdownMenu({ trigger, children, className }: DropdownMenuProps) {
  const [open, setOpen] = React.useState(false);
  const [pos, setPos] = React.useState<{ top: number; left: number; width: number } | null>(null);
  const [anchor, setAnchor] = React.useState<HTMLSpanElement | null>(null);
  const panelRef = React.useRef<HTMLDivElement | null>(null);
  const menuId = React.useId();

  const getMenuItems = React.useCallback(() => {
    const panel = panelRef.current;
    if (!panel) return [] as HTMLElement[];
    return Array.from(panel.querySelectorAll<HTMLElement>('[role="menuitem"]'));
  }, []);

  const focusItem = React.useCallback((index: number) => {
    const items = getMenuItems();
    if (!items.length) return;
    const nextIndex = ((index % items.length) + items.length) % items.length;
    items[nextIndex]?.focus();
  }, [getMenuItems]);

  const onTriggerRef = React.useCallback((node: HTMLSpanElement | null) => {
    setAnchor(node);
  }, []);

  const compute = React.useCallback(() => {
    const el = anchor;
    if (!el) return;
    const r = el.getBoundingClientRect();
    setPos({ top: r.bottom + window.scrollY, left: r.left + window.scrollX, width: r.width });
  }, [anchor]);

  React.useEffect(() => {
    if (!open) return;
    compute();
    const onScroll = () => compute();
    const onResize = () => compute();
    window.addEventListener("scroll", onScroll, true);
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("scroll", onScroll, true);
      window.removeEventListener("resize", onResize);
    };
  }, [open, compute]);

  React.useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    const onMouseDown = (e: MouseEvent) => {
      const t = e.target as Node | null;
      const root = document.getElementById(menuId);
      if (root && t && root.contains(t)) return;
      if (anchor && t && anchor.contains(t)) return;
      setOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("mousedown", onMouseDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("mousedown", onMouseDown);
    };
  }, [open, menuId, anchor]);

  React.useEffect(() => {
    if (!open) return;
    if (!pos) return;
    const el = panelRef.current;
    if (!el) return;
    el.style.setProperty("--ui-menu-top", `${pos.top}px`);
    el.style.setProperty("--ui-menu-left", `${pos.left}px`);
    el.style.setProperty("--ui-menu-min-w", `${pos.width}px`);
  }, [open, pos]);

  React.useEffect(() => {
    if (!open) return;
    const timer = window.setTimeout(() => focusItem(0), 0);
    return () => window.clearTimeout(timer);
  }, [open, focusItem]);

  return (
    <div className={cx("ui-menu", className)}>
      <span className="ui-menu__anchor" ref={onTriggerRef}>
        {/* eslint-disable-next-line react-hooks/refs */}
        {React.cloneElement(trigger, {
          onClick: (e: React.MouseEvent) => {
            (trigger.props as { onClick?: (e: React.MouseEvent) => void }).onClick?.(e);
            if (!e.defaultPrevented) setOpen((v) => !v);
          },
          onKeyDown: (e: React.KeyboardEvent) => {
            (trigger.props as { onKeyDown?: (e: React.KeyboardEvent) => void }).onKeyDown?.(e);
            if (e.defaultPrevented) return;

            if (e.key === "ArrowDown" || e.key === "ArrowUp") {
              e.preventDefault();
              setOpen(true);
              window.setTimeout(() => focusItem(e.key === "ArrowDown" ? 0 : -1), 0);
            }
          },
          "aria-expanded": open,
          "aria-controls": menuId,
        })}
      </span>

      {open && pos
        ? createPortal(
            <MenuContext.Provider value={{ close: () => setOpen(false) }}>
              <div
                id={menuId}
                ref={panelRef}
                className="ui-menu__panel"
                role="menu"
                aria-orientation="vertical"
                onKeyDown={(e) => {
                  const items = getMenuItems();
                  if (!items.length) return;

                  const currentIndex = items.findIndex((item) => item === document.activeElement);

                  if (e.key === "Escape") {
                    e.preventDefault();
                    setOpen(false);
                    anchor?.querySelector<HTMLElement>("button, a, [tabindex]")?.focus();
                    return;
                  }

                  if (e.key === "ArrowDown") {
                    e.preventDefault();
                    focusItem(currentIndex < 0 ? 0 : currentIndex + 1);
                    return;
                  }

                  if (e.key === "ArrowUp") {
                    e.preventDefault();
                    focusItem(currentIndex < 0 ? items.length - 1 : currentIndex - 1);
                    return;
                  }

                  if (e.key === "Home") {
                    e.preventDefault();
                    focusItem(0);
                    return;
                  }

                  if (e.key === "End") {
                    e.preventDefault();
                    focusItem(items.length - 1);
                    return;
                  }

                  if (e.key === "Tab") {
                    setOpen(false);
                  }
                }}
              >
                {children}
              </div>
            </MenuContext.Provider>,
            document.body
          )
        : null}
    </div>
  );
}

export type DropdownMenuButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

export function DropdownMenuButton({ className, ...props }: DropdownMenuButtonProps) {
  const ctx = useMenuContext();
  return (
    <button
      className={cx("ui-menu__item ui-focus-ring", className)}
      role="menuitem"
      type="button"
      {...props}
      onClick={(e) => {
        props.onClick?.(e);
        if (!e.defaultPrevented) ctx?.close();
      }}
    />
  );
}

export type DropdownMenuLinkProps = React.AnchorHTMLAttributes<HTMLAnchorElement>;

export function DropdownMenuLink({ className, ...props }: DropdownMenuLinkProps) {
  const ctx = useMenuContext();
  return (
    <a
      className={cx("ui-menu__item ui-focus-ring", className)}
      role="menuitem"
      {...props}
      onClick={(e) => {
        props.onClick?.(e);
        if (!e.defaultPrevented) ctx?.close();
      }}
    />
  );
}
