"use client";

import * as React from "react";

import {
  Avatar,
  Button,
  Card,
  Checkbox,
  Divider,
  Grid,
  Input,
  Radio,
  RangeSlider,
  Select,
  Spacer,
  Spinner,
  Stack,
  Switch,
  Tabs,
  TabsList,
  TabsPanel,
  TabsTrigger,
  Text,
  Textarea,
} from "@/ds";

const TABS = [
  { value: "controls", label: "Controls" },
  { value: "inputs", label: "Inputs" },
  { value: "layout", label: "Layout" },
  { value: "identity", label: "Identity" },
];

export function PrimitivesClient() {
  const [tab, setTab] = React.useState<string>(TABS[0]?.value ?? "controls");
  const [range, setRange] = React.useState(35);

  return (
    <Tabs value={tab} onValueChange={setTab}>
      <TabsList>
        {TABS.map((t) => (
          <TabsTrigger key={t.value} value={t.value}>
            {t.label}
          </TabsTrigger>
        ))}
      </TabsList>

      <TabsPanel value="controls">
        <Grid cols={2}>
          <Card>
            <Stack gap="compact">
              <div className="text-heading-4">Buttons</div>
              <div className="ui-row">
                <Button size="sm">Primary</Button>
                <Button size="sm" variant="secondary">
                  Secondary
                </Button>
                <Button size="sm" variant="ghost">
                  Ghost
                </Button>
                <Button size="sm" variant="text">
                  Text
                </Button>
              </div>
              <Divider />
              <RangeSlider label={`Range (${range}%)`} value={range} min={0} max={100} onChange={(e) => setRange(Number(e.target.value))} />
              <Switch label="Enable setting" defaultChecked />
            </Stack>
          </Card>

          <Card>
            <Stack gap="compact">
              <div className="text-heading-4">Checkbox / radio</div>
              <Checkbox label="I agree" />
              <Divider />
              <Radio name="pr-radio" value="a" defaultChecked label="Radio A" description="Mock option" />
              <Radio name="pr-radio" value="b" label="Radio B" description="Mock option" />
            </Stack>
          </Card>
        </Grid>
      </TabsPanel>

      <TabsPanel value="inputs">
        <Grid cols={2}>
          <Card>
            <Stack gap="compact">
              <div className="text-heading-4">Inputs</div>
              <Input placeholder="Text input" />
              <Textarea placeholder="Textarea" />
              <Select defaultValue="pro">
                <option value="starter">Starter</option>
                <option value="pro">Pro</option>
                <option value="enterprise">Enterprise</option>
              </Select>
            </Stack>
          </Card>

          <Card>
            <Stack gap="compact">
              <div className="text-heading-4">Notes</div>
              <Text tone="muted">Primitives should remain generic and app-agnostic.</Text>
              <Spacer size={2} />
              <Text tone="muted">Compose primitives into reusable components and patterns.</Text>
            </Stack>
          </Card>
        </Grid>
      </TabsPanel>

      <TabsPanel value="layout">
        <Grid cols={2}>
          <Card>
            <Stack gap="compact">
              <div className="text-heading-4">Grid / Stack / Spacer</div>
              <Grid cols={3}>
                <Card>
                  <Text tone="muted">Card</Text>
                </Card>
                <Card>
                  <Text tone="muted">Card</Text>
                </Card>
                <Card>
                  <Text tone="muted">Card</Text>
                </Card>
              </Grid>
              <Divider />
              <Spacer size={2} />
              <Text tone="muted">Use these primitives to build responsive screens quickly.</Text>
            </Stack>
          </Card>

          <Card>
            <Stack gap="compact">
              <div className="text-heading-4">Divider</div>
              <Text tone="muted">Divider is token-driven (no hardcoded colors).</Text>
              <Divider />
              <Text tone="muted">Use it to separate sections within cards.</Text>
            </Stack>
          </Card>
        </Grid>
      </TabsPanel>

      <TabsPanel value="identity">
        <Grid cols={2}>
          <Card>
            <Stack gap="compact">
              <div className="text-heading-4">Avatar / Spinner</div>
              <div className="ui-row">
                <Avatar name="Jane Doe" />
                <Avatar name="Sam" size="sm" />
                <Avatar name="Alex Kim" size="lg" shape="rounded" />
                <Spinner size="sm" />
                <Spinner />
              </div>
            </Stack>
          </Card>

          <Card>
            <Stack gap="compact">
              <div className="text-heading-4">Accessibility</div>
              <Text tone="muted">Keep touch targets, focus rings, and labels consistent across primitives.</Text>
            </Stack>
          </Card>
        </Grid>
      </TabsPanel>
    </Tabs>
  );
}
