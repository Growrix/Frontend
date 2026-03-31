"use client";

import * as React from "react";
import { createPortal } from "react-dom";

import { cx } from "../utils/cx";

export type LightboxProps = {
  images: { src: string; alt: string }[];
  open: boolean;
  onClose: () => void;
  startIndex?: number;
  className?: string;
};

export function Lightbox({ images, open, onClose, startIndex = 0, className }: LightboxProps) {
  const [index, setIndex] = React.useState(startIndex);
  const lastActiveRef = React.useRef<HTMLElement | null>(null);

  React.useEffect(() => {
    if (open) {
      setIndex(startIndex);
      lastActiveRef.current = document.activeElement as HTMLElement;
    }
  }, [open, startIndex]);

  React.useEffect(() => {
    if (!open) {
      lastActiveRef.current?.focus();
      return;
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") { onClose(); return; }
      if (e.key === "ArrowRight") { setIndex((i) => Math.min(i + 1, images.length - 1)); return; }
      if (e.key === "ArrowLeft") { setIndex((i) => Math.max(i - 1, 0)); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, images.length, onClose]);

  if (!open || images.length === 0) return null;

  const img = images[index];

  return createPortal(
    <div className={cx("ui-lightbox", className)} role="dialog" aria-modal="true" aria-label="Image viewer">
      <div className="ui-lightbox__backdrop" onClick={onClose} />
      <div className="ui-lightbox__content">
        <img className="ui-lightbox__img" src={img.src} alt={img.alt} />
        <div className="ui-lightbox__controls">
          <button type="button" className="ui-lightbox__nav ui-focus-ring" disabled={index <= 0} onClick={() => setIndex((i) => i - 1)} aria-label="Previous image">&larr;</button>
          <span className="ui-lightbox__counter text-body-small">{index + 1} / {images.length}</span>
          <button type="button" className="ui-lightbox__nav ui-focus-ring" disabled={index >= images.length - 1} onClick={() => setIndex((i) => i + 1)} aria-label="Next image">&rarr;</button>
        </div>
        <button type="button" className="ui-lightbox__close ui-focus-ring" onClick={onClose} aria-label="Close">&times;</button>
      </div>
    </div>,
    document.body
  );
}
