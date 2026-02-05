import * as React from "react";

function cx(...classes: Array<string | false | undefined | null>) {
  return classes.filter(Boolean).join(" ");
}

export type BottomNavProps = {
  children: React.ReactNode;
  className?: string;
};

export function BottomNav({ children, className }: BottomNavProps) {
  return (
    <nav className={cx("ui-bottom-nav", className)} aria-label="Primary navigation">
      <div className="ui-bottom-nav__inner">{children}</div>
    </nav>
  );
}

export type BottomNavItemProps = React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  active?: boolean;
  icon?: React.ReactNode;
  label: string;
};

export function BottomNavItem({ active, icon, label, className, ...props }: BottomNavItemProps) {
  return (
    <a className={cx("ui-bottom-nav__item ui-focus-ring", active && "ui-bottom-nav__item--active", className)} {...props}>
      {icon ? <span className="ui-bottom-nav__icon">{icon}</span> : null}
      <span className="ui-bottom-nav__label text-micro">{label}</span>
    </a>
  );
}
