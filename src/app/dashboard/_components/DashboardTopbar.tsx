import Link from "next/link";

import { Badge, Button, Container, Icon, Input, ThemeSwitcher } from "@/ds";
import { Layers } from "@/ds";

export function DashboardTopbar() {
  return (
    <Container width="wide">
      <div className="ui-header-pad ui-row ui-row--between">
        <div className="ui-row">
          <Link className="ui-navlink ui-focus-ring" href="/">
            <strong className="text-label">SolarMatch</strong>
          </Link>
          <Badge tone="accent">Dashboard</Badge>
        </div>

        <div className="ui-row">
          <div className="ui-search">
            <Input placeholder="Search (mock)" />
          </div>
          <ThemeSwitcher />
          <Link className="ui-navlink ui-focus-ring" href="/component-library">
            <Icon icon={Layers} aria-hidden />
            Components
          </Link>
          <Link className="ui-navlink ui-focus-ring" href="/docs">
            Docs
          </Link>
          <Button size="sm" variant="primary">
            New
          </Button>
        </div>
      </div>
    </Container>
  );
}
