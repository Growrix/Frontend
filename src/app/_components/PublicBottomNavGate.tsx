"use client";

import * as React from "react";
import { usePathname } from "next/navigation";

import { PublicBottomNav } from "./PublicBottomNav";

export function PublicBottomNavGate() {
  const pathname = usePathname() ?? "/";
  const isDashboard = pathname === "/dashboard" || pathname.startsWith("/dashboard/");

  if (isDashboard) return null;

  return (
    <div className="ui-only-mobile">
      <PublicBottomNav />
    </div>
  );
}
