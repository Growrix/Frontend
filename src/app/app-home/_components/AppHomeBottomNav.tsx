"use client";

import * as React from "react";
import { usePathname, useRouter } from "next/navigation";

import { BottomNav, BottomNavItem, Icon } from "@/ds";
import { Home, Layers, BookOpen, Monitor } from "@/ds";

const NAV = [
  { id: "app-1", href: "/app-home", label: "Home", icon: Home },
  { id: "app-2", href: "/dashboard", label: "Dashboard", icon: Monitor },
  { id: "app-3", href: "/component-library", label: "Components", icon: Layers },
  { id: "app-4", href: "/docs", label: "Docs", icon: BookOpen },
];

export function AppHomeBottomNav() {
  const pathname = usePathname() ?? "/";
  const router = useRouter();

  return (
    <BottomNav>
      {NAV.map((item) => (
        <BottomNavItem
          key={item.id}
          href={item.href}
          active={pathname === item.href}
          label={item.label}
          iconOnly
          icon={<Icon icon={item.icon} aria-hidden />}
          onClick={(e) => {
            e.preventDefault();
            router.push(item.href);
          }}
        />
      ))}
    </BottomNav>
  );
}
