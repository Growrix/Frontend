"use client";

import type { LucideIcon } from "lucide-react";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { Icon, Stack } from "@/ds";
import { BookOpen, Layers, SlidersHorizontal, Smartphone, Zap } from "@/ds";

type NavItem = {
  id: string;
  label: string;
  href: string;
  icon: LucideIcon;
};

const NAV: NavItem[] = [
  { id: "foundations", label: "Foundations", href: "/component-library/foundations", icon: BookOpen },
  { id: "primitives", label: "Primitives", href: "/component-library/primitives", icon: SlidersHorizontal },
  { id: "components", label: "Components", href: "/component-library/components", icon: Layers },
  { id: "patterns", label: "Patterns", href: "/component-library/patterns", icon: Zap },
  { id: "mobile", label: "Mobile", href: "/component-library/mobile", icon: Smartphone },
];

export type ComponentLibrarySidebarProps = {
  variant?: "desktop" | "drawer";
  collapsed?: boolean;
};

function isActive(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(href + "/");
}

export function ComponentLibrarySidebar({ variant = "desktop", collapsed }: ComponentLibrarySidebarProps) {
  const pathname = usePathname() ?? "/";

  return (
    <div className={variant === "desktop" ? "ui-sidebar" : undefined}>
      <div className="ui-card">
        <Stack gap="compact">
          <nav aria-label="Component library navigation" className="ui-sidebar-nav">
            {NAV.map((item) => {
              const active = isActive(pathname, item.href);
              return (
                <Link
                  key={item.id}
                  className="ui-navlink ui-focus-ring"
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  aria-label={collapsed ? item.label : undefined}
                  title={collapsed ? item.label : undefined}
                >
                  <Icon icon={item.icon} aria-hidden />
                  {collapsed ? <span className="ui-sr-only">{item.label}</span> : <span className="text-body-small">{item.label}</span>}
                </Link>
              );
            })}
          </nav>
        </Stack>
      </div>
    </div>
  );
}
