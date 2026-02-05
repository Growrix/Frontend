import Link from "next/link";

import { Badge, Icon, Stack, Text } from "@/ds";
import { Home, Layers, Settings } from "@/ds";

type NavItem = {
  id: string;
  label: string;
  href: string;
  icon: typeof Home;
  tone: "accent" | "info" | "success" | "warning" | "danger" | "neutral";
};

const MOCK_NAV: NavItem[] = [
  { id: "nav-1", label: "Home", href: "/", icon: Home, tone: "neutral" },
  { id: "nav-2", label: "Dashboard", href: "/dashboard", icon: Layers, tone: "accent" },
  { id: "nav-3", label: "Components", href: "/component-library", icon: Layers, tone: "info" },
  { id: "nav-4", label: "Settings", href: "#settings", icon: Settings, tone: "warning" },
];

export function DashboardSidebar() {
  return (
    <div className="ui-sidebar">
      <div className="ui-card">
        <Stack gap="compact">
          <div>
            <div className="text-heading-4">Workspace</div>
            <Text tone="muted">Mock sidebar navigation</Text>
          </div>

          <nav aria-label="Dashboard navigation" className="ui-sidebar-nav">
            {MOCK_NAV.map((item) => (
              <Link key={item.id} className="ui-navlink ui-focus-ring" href={item.href}>
                <Icon icon={item.icon} aria-hidden />
                <span className="text-body-small">{item.label}</span>
                <Badge tone={item.tone}>{item.tone}</Badge>
              </Link>
            ))}
          </nav>
        </Stack>
      </div>
    </div>
  );
}
