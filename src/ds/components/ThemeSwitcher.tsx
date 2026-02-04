"use client";

import * as React from "react";

import { Button } from "../primitives/Button";
import { applyThemeMode, readStoredThemeMode, storeThemeMode, type ThemeMode } from "../themes/theme";

export type ThemeSwitcherProps = {
  className?: string;
};

function cx(...classes: Array<string | false | undefined | null>) {
  return classes.filter(Boolean).join(" ");
}

export function ThemeSwitcher({ className }: ThemeSwitcherProps) {
  const [mode, setMode] = React.useState<ThemeMode>("system");

  React.useEffect(() => {
    const stored = readStoredThemeMode();
    setMode(stored);
    applyThemeMode(stored);

    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = () => {
      const current = readStoredThemeMode();
      if (current === "system") applyThemeMode("system");
    };

    if (typeof media.addEventListener === "function") {
      media.addEventListener("change", onChange);
      return () => media.removeEventListener("change", onChange);
    }

    media.addListener(onChange);
    return () => media.removeListener(onChange);
  }, []);

  const set = (next: ThemeMode) => {
    setMode(next);
    storeThemeMode(next);
    applyThemeMode(next);
  };

  return (
    <div className={cx("ui-row", className)} role="group" aria-label="Theme selector">
      <Button size="sm" variant={mode === "system" ? "primary" : "secondary"} onClick={() => set("system")}>
        System
      </Button>
      <Button size="sm" variant={mode === "light" ? "primary" : "secondary"} onClick={() => set("light")}>
        Light
      </Button>
      <Button size="sm" variant={mode === "dark" ? "primary" : "secondary"} onClick={() => set("dark")}>
        Dark
      </Button>
    </div>
  );
}
