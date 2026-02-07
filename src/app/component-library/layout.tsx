import * as React from "react";

import { ComponentLibraryShellClient } from "./_components/ComponentLibraryShellClient";

export default function ComponentLibraryLayout({ children }: { children: React.ReactNode }) {
  return <ComponentLibraryShellClient>{children}</ComponentLibraryShellClient>;
}
