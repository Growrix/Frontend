import * as React from "react";

import { AppBar, Card, Divider, Field, Input, Section, SectionHeader, Stack, Text } from "@/ds";

import { MobileAppLikePreview } from "./_components/MobileAppLikePreview";

export default function MobileComponentLibraryPage() {
  return (
    <div data-platform="mobile" data-density="compact">
      <Section container="wide" size="lg">
        <Stack gap="compact">
          <SectionHeader title="Mobile" lede="Mobile-first previews for app-like UI (without resizing your browser)." />

          <MobileAppLikePreview />

          <Card className="ui-card--compact">
            <Stack gap="compact">
              <Text tone="muted">
                This page is the dedicated surface for mobile variants. It uses the DS platform/density presets via
                <span className="text-micro"> {`data-platform="mobile"`}</span> and <span className="text-micro">{`data-density="compact"`}</span>.
              </Text>
            </Stack>
          </Card>

          <Card className="ui-card--compact">
            <Stack gap="compact">
              <div className="text-heading-4">App bar</div>
              <div className="ui-center">
                <AppBar title="Library" />
              </div>
            </Stack>
          </Card>

          <Card className="ui-card--compact">
            <Stack gap="compact">
              <div className="text-heading-4">Form controls</div>
              <div className="ui-center">
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
        </Stack>
      </Section>
    </div>
  );
}
