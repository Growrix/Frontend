"use client";

import * as React from "react";
import { usePathname, useRouter } from "next/navigation";
import { BottomNav, BottomNavItem, Icon } from "@/ds";
import { Home, Layers, Monitor } from "@/ds";

const NAV = [
  { id: "pub-1", href: "/", label: "Home", icon: Home },
  { id: "pub-2", href: "/component-library", label: "Components", icon: Layers },
  { id: "pub-3", href: "/dashboard", label: "Dashboard", icon: Monitor },
];

export function PublicBottomNav() {
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
