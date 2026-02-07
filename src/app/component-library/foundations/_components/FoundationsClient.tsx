"use client";

import * as React from "react";

import { Badge, Card, Divider, Grid, Spacer, Stack, Tabs, TabsList, TabsPanel, TabsTrigger, Text } from "@/ds";

const TABS = [
  { value: "typography", label: "Typography" },
  { value: "tokens", label: "Tokens" },
];

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
    </Tabs>
  );
}
