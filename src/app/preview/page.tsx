import * as React from "react";

import { Card, DevicePreview, Section, Stack, Text } from "@/ds";

import { SitePreviewClient } from "./site-preview-client";

function normalizePath(raw: unknown): string {
  const value = typeof raw === "string" ? raw.trim() : "/";
  if (!value) return "/";
  if (value.startsWith("/")) return value;
  return `/${value}`;
}

export default function PreviewPage({
  searchParams,
}: {
  searchParams?: Record<string, string | string[] | undefined>;
}) {
  const rawPath = searchParams?.path;
  const path = normalizePath(Array.isArray(rawPath) ? rawPath[0] : rawPath);

  return (
    <Section container="full" size="lg">
      <Stack>
        <Card>
          <Stack gap="compact">
            <div className="text-heading-4">Preview</div>
            <Text tone="muted">Use <code>?path=/your/route</code> to preview a specific page.</Text>
          </Stack>
        </Card>

        <DevicePreview defaultDevice="current">
          <SitePreviewClient path={path} />
        </DevicePreview>
      </Stack>
    </Section>
  );
}
