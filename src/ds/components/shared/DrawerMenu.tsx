import * as React from "react";

import type { LucideIcon } from "lucide-react";

import { Icon } from "./Icon";
import { Pressable, type PressableProps } from "../../primitives/Pressable";

function cx(...classes: Array<string | false | undefined | null>) {
  return classes.filter(Boolean).join(" ");
}

export type DrawerMenuProps = {
  children: React.ReactNode;
  className?: string;
};

export function DrawerMenu({ children, className }: DrawerMenuProps) {
  return <nav className={cx("ui-drawer-menu", className)} aria-label="Drawer menu">{children}</nav>;
}

export type DrawerMenuSectionProps = {
  label: string;
  children: React.ReactNode;
  className?: string;
};

export function DrawerMenuSection({ label, children, className }: DrawerMenuSectionProps) {
  return (
    <section className={cx("ui-drawer-menu__section", className)}>
      <div className="ui-drawer-menu__label">{label}</div>
      <div className="ui-stack ui-stack--tight">{children}</div>
    </section>
  );
}

export type DrawerMenuItemProps = Omit<PressableProps, "children"> & {
  icon?: LucideIcon;
  label: string;
  active?: boolean;
};

export function DrawerMenuItem({ icon, label, active, className, ...props }: DrawerMenuItemProps) {
  return (
    <Pressable
      className={cx("ui-drawer-menu__item", active && "ui-drawer-menu__item--active", className)}
      {...props}
    >
      {icon ? <Icon icon={icon} aria-hidden /> : null}
      <span className="ui-drawer-menu__item-text">{label}</span>
    </Pressable>
  );
}
