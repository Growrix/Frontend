import * as React from "react";

import { DocsShell } from "@/ds";

const nav = [
  { label: "Overview", href: "#overview" },
  { label: "Tokens", href: "#tokens" },
  { label: "Primitives", href: "#primitives" },
  { label: "Layouts", href: "#layouts" },
  { label: "Rules", href: "#rules" },
];

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  return (
    <DocsShell title="Blueprint DS Docs" nav={nav}>
      {children}
    </DocsShell>
  );
}
