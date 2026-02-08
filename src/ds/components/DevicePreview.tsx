"use client";

import * as React from "react";

import { Button } from "../primitives/Button";
import { Stack } from "../primitives/Stack";
import { DropdownMenu, DropdownMenuButton } from "./DropdownMenu";
import { Icon } from "./Icon";
import { Check, ChevronDown, Monitor, Smartphone, Tablet } from "../icons";

export type DevicePreviewMode = "current" | "mobile" | "tablet";

export type DevicePreviewProps = {
  children: React.ReactNode;
  device?: DevicePreviewMode;
  defaultDevice?: DevicePreviewMode;
  onDeviceChange?: (device: DevicePreviewMode) => void;
  className?: string;
};

function cx(...classes: Array<string | false | undefined | null>) {
  return classes.filter(Boolean).join(" ");
}

const PRESETS: Array<{
  id: DevicePreviewMode;
  label: string;
  icon: typeof Monitor;
  width?: number;
  height?: number;
}> = [
  { id: "current", label: "Current screen size", icon: Monitor },
  { id: "mobile", label: "Mobile", icon: Smartphone, width: 390, height: 844 },
  { id: "tablet", label: "Tablet", icon: Tablet, width: 834, height: 1112 },
];

function findPreset(id: DevicePreviewMode) {
  return PRESETS.find((p) => p.id === id) ?? PRESETS[0]!;
}

export function DevicePreview({
  children,
  device: controlledDevice,
  defaultDevice = "mobile",
  onDeviceChange,
  className,
}: DevicePreviewProps) {
  const [uncontrolledDevice, setUncontrolledDevice] = React.useState<DevicePreviewMode>(defaultDevice);
  const device = controlledDevice ?? uncontrolledDevice;

  const preset = findPreset(device);

  const setDevice = (next: DevicePreviewMode) => {
    if (!controlledDevice) setUncontrolledDevice(next);
    onDeviceChange?.(next);
  };

  return (
    <div className={cx("ui-device-preview", className)} data-device={device}>
      <div className="ui-device-preview__bar">
        <DropdownMenu
          trigger={
            <Button size="sm" variant="secondary" aria-label="Change preview screen size">
              <span className="ui-row ui-row--between" style={{ gap: "var(--ds-space-2)", flexWrap: "nowrap" }}>
                <span className="ui-row" style={{ gap: "var(--ds-space-2)", flexWrap: "nowrap" }}>
                  <Icon icon={preset.icon} size="sm" aria-hidden />
                  <span className="text-body-small">{preset.label}</span>
                </span>
                <Icon icon={ChevronDown} size="sm" aria-hidden />
              </span>
            </Button>
          }
        >
          <Stack gap="compact">
            {PRESETS.map((p) => {
              const active = p.id === device;
              return (
                <DropdownMenuButton
                  key={p.id}
                  onClick={() => setDevice(p.id)}
                  aria-current={active ? "true" : undefined}
                >
                  <Icon icon={p.icon} size="sm" aria-hidden />
                  <span style={{ flex: 1, minWidth: 0 }}>{p.label}</span>
                  {active ? <Icon icon={Check} size="sm" aria-hidden /> : null}
                </DropdownMenuButton>
              );
            })}
          </Stack>
        </DropdownMenu>
      </div>

      <div className="ui-device-preview__stage">
        {device === "current" ? (
          <div className="ui-device-preview__current">{children}</div>
        ) : (
          <div
            className="ui-device-preview__frame"
            style={{ width: preset.width, height: preset.height, maxWidth: "100%" }}
            aria-label={`${preset.label} preview`}
          >
            <div className="ui-device-preview__viewport">{children}</div>
          </div>
        )}
      </div>
    </div>
  );
}
