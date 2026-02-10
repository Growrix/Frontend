"use client";

import * as React from "react";
import { usePathname, useRouter } from "next/navigation";
import { BottomNav, BottomNavItem, Icon } from "@/ds";
import { Bell, BookOpen, Home, Sun, Zap } from "@/ds";

const NAV = [
  { id: "pub-1", href: "/", label: "Home", icon: Home },
  { id: "pub-2", href: "/#quote", label: "Quote", icon: Zap },
  { id: "pub-3", href: "/#rebates", label: "Rebates", icon: Sun },
  { id: "pub-4", href: "/#blog", label: "Blog", icon: BookOpen },
  { id: "pub-5", href: "/#newsletter", label: "Updates", icon: Bell },
];

function isHashHref(href: string) {
  return href.startsWith("/#");
}

function hashFromHref(href: string) {
  const idx = href.indexOf("#");
  if (idx === -1) return "";
  return href.slice(idx);
}

function isActive(pathname: string, href: string, currentHash: string) {
  if (href === "/") return pathname === "/" && (!currentHash || currentHash === "#");
  if (isHashHref(href)) return pathname === "/" && currentHash === hashFromHref(href);
  return pathname === href || pathname.startsWith(href + "/");
}

export function PublicBottomNav() {
  const pathname = usePathname() ?? "/";
  const router = useRouter();
  const [currentHash, setCurrentHash] = React.useState("");

  React.useEffect(() => {
    const sync = () => setCurrentHash(window.location.hash || "");
    sync();
    window.addEventListener("hashchange", sync);
    return () => window.removeEventListener("hashchange", sync);
  }, []);

  return (
    <BottomNav>
      {NAV.map((item) => (
        <BottomNavItem
          key={item.id}
          href={item.href}
          active={isActive(pathname, item.href, currentHash)}
          label={item.label}
          iconOnly
          icon={<Icon icon={item.icon} aria-hidden />}
          onClick={(e) => {
            if (isHashHref(item.href)) {
              e.preventDefault();
              const id = item.href.split("#")[1] ?? "";
              const target = id ? document.getElementById(id) : null;
              if (target) {
                target.scrollIntoView({ behavior: "smooth", block: "start" });
              }
              window.history.replaceState(null, "", item.href);
              setCurrentHash(hashFromHref(item.href));
              return;
            }

            e.preventDefault();
            router.push(item.href);
          }}
        />
      ))}
    </BottomNav>
  );
}
