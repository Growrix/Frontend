"use client";

import * as React from "react";

export function SitePreviewClient({ path }: { path: string }) {
  const src = React.useMemo(() => (path?.startsWith("/") ? path : "/"), [path]);

  return (
    <div style={{ height: "var(--ds-size-viewport-minus-header)", minHeight: "28rem" }} aria-label="Live site preview">
      <iframe title="Live preview" src={src} style={{ width: "100%", height: "100%", border: 0 }} />
    </div>
  );
}
