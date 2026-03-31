"use client";

import * as React from "react";

import { Button } from "../primitives/Button";
import { Stack } from "../primitives/Stack";
import { Text } from "../primitives/Text";
import { Modal } from "./Modal";

export type ConfirmDialogProps = {
  open: boolean;
  onClose: () => void;
  title: React.ReactNode;
  description?: React.ReactNode;
  confirmLabel?: string;
  cancelLabel?: string;
  tone?: "danger" | "neutral";
  onConfirm: () => void;
};

export function ConfirmDialog({ open, onClose, title, description, confirmLabel = "Confirm", cancelLabel = "Cancel", tone = "neutral", onConfirm }: ConfirmDialogProps) {
  const cancelRef = React.useRef<HTMLButtonElement>(null);

  React.useEffect(() => {
    if (open) {
      requestAnimationFrame(() => cancelRef.current?.focus());
    }
  }, [open]);

  return (
    <Modal open={open} onClose={onClose} title={title} description={description} closeOnOverlayClick={false}>
      <Stack gap="compact">
        {description ? <Text tone="muted">{description}</Text> : null}
        <div className="ui-row">
          <Button variant="primary" tone={tone === "danger" ? "danger" : undefined} onClick={onConfirm}>
            {confirmLabel}
          </Button>
          <Button ref={cancelRef} variant="secondary" onClick={onClose}>
            {cancelLabel}
          </Button>
        </div>
      </Stack>
    </Modal>
  );
}
