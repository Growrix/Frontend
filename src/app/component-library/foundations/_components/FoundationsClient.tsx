"use client";

import * as React from "react";

import { Badge, Card, Divider, Grid, Spacer, Stack, Tabs, TabsList, TabsPanel, TabsTrigger, Text } from "@/ds";

const TABS = [
  { value: "typography", label: "Typography" },
  { value: "tokens", label: "Tokens" },
  { value: "colors", label: "Colors" },
];

type ColorToken = {
  id: string;
  label: string;
  cssVar: `--${string}`;
};

type ColorGroup = {
  id: string;
  title: string;
  description: string;
  tokens: ColorToken[];
};

const COLOR_GROUPS: ColorGroup[] = [
  {
    id: "palette-neutral",
    title: "Palette: Neutral scale",
    description: "Base neutrals (0 → 950). Semantic surface/text tokens map to these by theme.",
    tokens: [
      { id: "neutral-0", label: "Neutral 0", cssVar: "--ds-palette-neutral-0" },
      { id: "neutral-50", label: "Neutral 50", cssVar: "--ds-palette-neutral-50" },
      { id: "neutral-100", label: "Neutral 100", cssVar: "--ds-palette-neutral-100" },
      { id: "neutral-200", label: "Neutral 200", cssVar: "--ds-palette-neutral-200" },
      { id: "neutral-300", label: "Neutral 300", cssVar: "--ds-palette-neutral-300" },
      { id: "neutral-400", label: "Neutral 400", cssVar: "--ds-palette-neutral-400" },
      { id: "neutral-500", label: "Neutral 500", cssVar: "--ds-palette-neutral-500" },
      { id: "neutral-600", label: "Neutral 600", cssVar: "--ds-palette-neutral-600" },
      { id: "neutral-700", label: "Neutral 700", cssVar: "--ds-palette-neutral-700" },
      { id: "neutral-800", label: "Neutral 800", cssVar: "--ds-palette-neutral-800" },
      { id: "neutral-850", label: "Neutral 850", cssVar: "--ds-palette-neutral-850" },
      { id: "neutral-900", label: "Neutral 900", cssVar: "--ds-palette-neutral-900" },
      { id: "neutral-950", label: "Neutral 950", cssVar: "--ds-palette-neutral-950" },
    ],
  },
  {
    id: "palette-brand",
    title: "Palette: Brand scale",
    description: "Brand steps (50 → 950). Set the brand scale per theme; semantic accent/primary map to it.",
    tokens: [
      { id: "brand-50", label: "Brand 50", cssVar: "--ds-palette-brand-50" },
      { id: "brand-100", label: "Brand 100", cssVar: "--ds-palette-brand-100" },
      { id: "brand-200", label: "Brand 200", cssVar: "--ds-palette-brand-200" },
      { id: "brand-300", label: "Brand 300", cssVar: "--ds-palette-brand-300" },
      { id: "brand-400", label: "Brand 400", cssVar: "--ds-palette-brand-400" },
      { id: "brand-500", label: "Brand 500", cssVar: "--ds-palette-brand-500" },
      { id: "brand-600", label: "Brand 600", cssVar: "--ds-palette-brand-600" },
      { id: "brand-700", label: "Brand 700", cssVar: "--ds-palette-brand-700" },
      { id: "brand-800", label: "Brand 800", cssVar: "--ds-palette-brand-800" },
      { id: "brand-900", label: "Brand 900", cssVar: "--ds-palette-brand-900" },
      { id: "brand-950", label: "Brand 950", cssVar: "--ds-palette-brand-950" },
    ],
  },
  {
    id: "surfaces",
    title: "Surfaces",
    description: "Backgrounds, cards, panels, and structural borders.",
    tokens: [
      { id: "background", label: "Background", cssVar: "--ds-color-background" },
      { id: "surface", label: "Surface", cssVar: "--ds-color-surface" },
      { id: "surface-2-alias", label: "Surface 2", cssVar: "--ds-color-surface-2" },
      { id: "border", label: "Border", cssVar: "--ds-color-border" },
      { id: "overlay", label: "Overlay", cssVar: "--ds-color-overlay" },
    ],
  },
  {
    id: "text",
    title: "Text",
    description: "Default and emphasized foregrounds for readable UI.",
    tokens: [
      { id: "foreground", label: "Foreground", cssVar: "--ds-color-foreground" },
      { id: "foreground-secondary", label: "Foreground secondary", cssVar: "--ds-color-foreground-secondary" },
      { id: "text", label: "Text (legacy alias)", cssVar: "--ds-color-text" },
      { id: "text-muted", label: "Text muted (legacy alias)", cssVar: "--ds-color-text-muted" },
    ],
  },
  {
    id: "brand",
    title: "Brand",
    description: "Primary brand/action colors and their on-color pairings.",
    tokens: [
      { id: "accent", label: "Accent", cssVar: "--ds-color-accent" },
      { id: "accent-foreground", label: "Accent foreground", cssVar: "--ds-color-accent-foreground" },
      { id: "primary", label: "Primary", cssVar: "--ds-color-primary" },
      { id: "on-primary", label: "On primary", cssVar: "--ds-color-on-primary" },
    ],
  },
  {
    id: "status",
    title: "Status",
    description: "System feedback colors (success, warning, danger, info).",
    tokens: [
      { id: "success", label: "Success", cssVar: "--ds-color-success" },
      { id: "warning", label: "Warning", cssVar: "--ds-color-warning" },
      { id: "danger", label: "Danger", cssVar: "--ds-color-danger" },
      { id: "info", label: "Info", cssVar: "--ds-color-info" },
    ],
  },
  {
    id: "interactive",
    title: "Interactive",
    description: "Hover/active/focus colors used by interactive components.",
    tokens: [
      { id: "accent-hover", label: "Accent hover", cssVar: "--ds-color-accent-hover" },
      { id: "accent-active", label: "Accent active", cssVar: "--ds-color-accent-active" },
      { id: "focus-ring", label: "Focus ring", cssVar: "--ds-color-focus-ring" },
    ],
  },
  {
    id: "aliases",
    title: "Aliases (legacy)",
    description: "Compat vars kept for older classnames; prefer the semantic tokens above.",
    tokens: [{ id: "bg", label: "BG", cssVar: "--ds-color-bg" }],
  },
];

function normalizeColorString(value: string) {
  const v = value.trim();
  if (!v) return "";
  if (v.startsWith("#")) return v;

  const rgbModern = v.match(/^rgb\((\d+)\s+(\d+)\s+(\d+)(?:\s*\/\s*([\d.]+))?\)$/i);
  if (rgbModern) {
    const r = Number.parseInt(rgbModern[1] ?? "", 10);
    const g = Number.parseInt(rgbModern[2] ?? "", 10);
    const b = Number.parseInt(rgbModern[3] ?? "", 10);
    const a = rgbModern[4] != null ? Number.parseFloat(rgbModern[4]) : 1;
    if ([r, g, b].some((n) => Number.isNaN(n))) return v;
    if (!Number.isFinite(a) || a < 1) return v;
    const toHex = (n: number) => n.toString(16).padStart(2, "0");
    return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
  }

  const rgb = v.match(/^rgba?\(([^)]+)\)$/i);
  if (rgb) {
    const parts = rgb[1]
      .split(",")
      .map((p) => p.trim())
      .filter(Boolean);

    const r = Number.parseInt(parts[0] ?? "", 10);
    const g = Number.parseInt(parts[1] ?? "", 10);
    const b = Number.parseInt(parts[2] ?? "", 10);
    const a = parts[3] != null ? Number.parseFloat(parts[3]) : 1;

    if ([r, g, b].some((n) => Number.isNaN(n))) return v;
    if (!Number.isFinite(a) || a < 1) return v;

    const toHex = (n: number) => n.toString(16).padStart(2, "0");
    return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
  }

  return v;
}

function useCssVarValues(cssVars: Array<ColorToken["cssVar"]>) {
  const [values, setValues] = React.useState<Record<string, string>>({});

  const key = React.useMemo(() => cssVars.join("|"), [cssVars]);

  React.useEffect(() => {
    const root = document.documentElement;

    const compute = () => {
      const styles = getComputedStyle(root);
      const next: Record<string, string> = {};
      for (const cssVar of cssVars) {
        const raw = styles.getPropertyValue(cssVar).trim();
        next[cssVar] = normalizeColorString(raw);
      }
      setValues(next);
    };

    compute();

    const obs = new MutationObserver(() => compute());
    obs.observe(root, { attributes: true, attributeFilter: ["class", "data-theme"] });
    return () => obs.disconnect();
  }, [cssVars, key]);

  return values;
}

function ColorSwatchGrid() {
  const cssVars = React.useMemo(() => COLOR_GROUPS.flatMap((g) => g.tokens.map((t) => t.cssVar)), []);
  const values = useCssVarValues(cssVars);

  return (
    <Stack gap="compact">
      <Card className="ui-card--compact">
        <Stack gap="compact">
          <div className="text-heading-4">Color palette</div>
          <Text tone="muted">Organized by usage. Values are computed from CSS variables (updates when theme changes).</Text>
        </Stack>
      </Card>

      <Stack gap="compact">
        {COLOR_GROUPS.map((group) => (
          <Card key={group.id} className="ui-card--compact">
            <Stack gap="compact">
              <div>
                <div className="text-heading-4">{group.title}</div>
                <Text tone="muted">{group.description}</Text>
              </div>

              <div className="ui-swatch-grid">
                {group.tokens.map((t) => (
                  <div key={t.id} className="ui-swatch-tile">
                    <div className="ui-swatch-chip" style={{ background: `var(${t.cssVar})` }} aria-label={`${t.label} swatch`} />
                    <div className="ui-swatch-meta">
                      <div className="text-body-small">{t.label}</div>
                      <div className="text-micro">
                        <code>{t.cssVar}</code>
                      </div>
                      <div className="text-micro">
                        <code>{values[t.cssVar] || "—"}</code>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Stack>
          </Card>
        ))}
      </Stack>
    </Stack>
  );
}

export function FoundationsClient() {
  const [tab, setTab] = React.useState<string>(TABS[0]?.value ?? "typography");

  return (
    <Tabs value={tab} onValueChange={setTab}>
      <TabsList>
        {TABS.map((t) => (
          <TabsTrigger key={t.value} value={t.value}>
            {t.label}
          </TabsTrigger>
        ))}
      </TabsList>

      <TabsPanel value="typography">
        <Grid cols={2}>
          <Card>
            <Stack gap="compact">
              <div className="text-heading-4">Typography scale</div>
              <div className="text-heading-1">Heading 1</div>
              <div className="text-heading-2">Heading 2</div>
              <div className="text-heading-3">Heading 3</div>
              <div className="text-heading-4">Heading 4</div>
              <Divider />
              <Text>Body</Text>
              <div className="text-body-large">Body large</div>
              <div className="text-body-small">Body small</div>
              <div className="text-caption">Caption</div>
              <div className="text-micro">Micro</div>
            </Stack>
          </Card>

          <Card>
            <Stack gap="compact">
              <div className="text-heading-4">Guidelines</div>
              <Text tone="muted">
                Use the DS utility classes (e.g. <code>text-heading-4</code>, <code>text-body-small</code>) so typography stays token-driven.
              </Text>
              <Spacer size={2} />
              <Text tone="muted">Fonts are configured globally via Next/font and consumed through DS tokens.</Text>
            </Stack>
          </Card>
        </Grid>
      </TabsPanel>

      <TabsPanel value="tokens">
        <Grid cols={2}>
          <Card>
            <Stack gap="compact">
              <div className="text-heading-4">Semantic tokens</div>
              <Text tone="muted">Components consume semantic tokens (colors, radii, spacing). Avoid hardcoding colors in components.</Text>
              <div className="ui-row">
                <Badge tone="accent">accent</Badge>
                <Badge tone="success">success</Badge>
                <Badge tone="warning">warning</Badge>
                <Badge tone="danger">danger</Badge>
                <Badge tone="info">info</Badge>
                <Badge tone="neutral">neutral</Badge>
              </div>
            </Stack>
          </Card>

          <Card>
            <Stack gap="compact">
              <div className="text-heading-4">Spacing + layout</div>
              <Text tone="muted">Spacing primitives and layout utilities use the spacing scale. Prefer Stack/Grid/Spacer/Divider over ad-hoc margins.</Text>
              <Divider />
              <div className="ui-stack ui-stack--tight">
                <Text tone="muted">Tight stack</Text>
                <Text tone="muted">Tight stack</Text>
                <Text tone="muted">Tight stack</Text>
              </div>
            </Stack>
          </Card>
        </Grid>
      </TabsPanel>

      <TabsPanel value="colors">
        <ColorSwatchGrid />
      </TabsPanel>
    </Tabs>
  );
}
