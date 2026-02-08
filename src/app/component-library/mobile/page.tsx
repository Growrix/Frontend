import * as React from "react";

import { AppBar, Button, Card, DevicePreview, Divider, Field, Input, SectionHeader, Stack, Text } from "@/ds";

export default function MobileComponentLibraryPage() {
  return (
    <DevicePreview defaultDevice="mobile">
      <div data-platform="mobile" data-density="compact" data-visual="basic">
        <Stack gap="compact">
          <SectionHeader title="Mobile" lede="Mobile-first component previews (app-like density and layouts)." />

          <Card className="ui-card--compact">
            <Stack gap="compact">
              <Text tone="muted">
                This page is the dedicated surface for mobile variants. As we add platform/density + visual variants, this page will
                showcase the mobile presets and component behaviors.
              </Text>
            </Stack>
          </Card>

          <Card className="ui-card--compact">
            <Stack gap="compact">
              <div className="text-heading-4">App bar</div>
              <div style={{ maxWidth: "28rem" }}>
                <AppBar title="Library" />
              </div>
            </Stack>
          </Card>

          <Card className="ui-card--compact">
            <Stack gap="compact">
              <div className="text-heading-4">Form controls</div>
              <div style={{ maxWidth: "28rem" }}>
                <Stack gap="compact">
                  <Field label="Search">
                    <Input placeholder="Search…" />
                  </Field>
                  <Divider />
                  <Text tone="muted">More mobile form patterns will be added here (pickers, bottom sheets, etc.).</Text>
                </Stack>
              </div>
            </Stack>
          </Card>

          {/* Sample mobile component demo */}
          <Card className="ui-card--compact">
            <Stack gap="compact">
              <div className="text-heading-4">Sample Button</div>
              <Button variant="primary" size="lg">Primary Action</Button>
              <Button variant="secondary" size="md">Secondary Action</Button>
            </Stack>
          </Card>
        </Stack>
      </div>
    </DevicePreview>
  );
}
