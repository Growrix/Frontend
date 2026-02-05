"use client";

import * as React from "react";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";

import { BottomNav, BottomNavItem, Icon } from "@/ds";
import { Bell, Home, Settings } from "@/ds";

type NavItem = {
  id: string;
  href: string;
  label: string;
  icon: typeof Home;
  match?: "exact" | "prefix";
};

const NAV: NavItem[] = [
  { id: "bn-1", href: "/dashboard", label: "Overview", icon: Home, match: "exact" },
  { id: "bn-2", href: "/dashboard/activity", label: "Activity", icon: Bell, match: "prefix" },
  { id: "bn-3", href: "/dashboard/settings", label: "Settings", icon: Settings, match: "prefix" },
];

function isActive(pathname: string, item: NavItem) {
  const match = item.match ?? "prefix";
  if (match === "exact") return pathname === item.href;
  return pathname === item.href || pathname.startsWith(item.href + "/");
}

export function DashboardBottomNav() {
  const pathname = usePathname() ?? "/";
  const router = useRouter();

  return (
    <BottomNav>
      {NAV.map((item) => (
        <BottomNavItem
          key={item.id}
          href={item.href}
          active={isActive(pathname, item)}
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
