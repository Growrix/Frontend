"use client";

import * as React from "react";

import { Button } from "../primitives/Button";
import { THEMES, type ThemeName } from "../themes/registry";
import { applyTheme, readStoredTheme, storeTheme } from "../themes/theme";

export type ThemeSwitcherProps = {
  className?: string;
};

function cx(...classes: Array<string | false | undefined | null>) {
  return classes.filter(Boolean).join(" ");
}

export function ThemeSwitcher({ className }: ThemeSwitcherProps) {
  const [theme, setTheme] = React.useState<ThemeName>("dark");

  React.useEffect(() => {
    const stored = readStoredTheme();
    const next = stored ?? "dark";
    setTheme(next);
    applyTheme(next);
  }, []);

  const set = (next: ThemeName) => {
    setTheme(next);
    storeTheme(next);
    applyTheme(next);
  };

  return (
    <div className={cx("ui-row", className)} role="group" aria-label="Theme selector">
      {THEMES.map((t) => (
        <Button key={t.name} size="sm" variant={theme === t.name ? "primary" : "secondary"} onClick={() => set(t.name)}>
          {t.label}
        </Button>
      ))}
    </div>
  );
}
