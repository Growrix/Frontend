"use client";

import * as React from "react";
import { cx } from "../utils/cx";

export type TextareaSize = "sm" | "md" | "lg";

export type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
  size?: TextareaSize;
  error?: boolean;
  autoResize?: boolean;
};

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(function Textarea(
  { className, size = "md", error, autoResize, onInput, ...props },
  ref,
) {
  const innerRef = React.useRef<HTMLTextAreaElement | null>(null);

  const setRef = React.useCallback(
    (node: HTMLTextAreaElement | null) => {
      innerRef.current = node;
      if (typeof ref === "function") ref(node);
      else if (ref) (ref as React.MutableRefObject<HTMLTextAreaElement | null>).current = node;
    },
    [ref],
  );

  const handleInput = (e: React.FormEvent<HTMLTextAreaElement>) => {
    if (autoResize && innerRef.current) {
      innerRef.current.style.height = "auto";
      innerRef.current.style.height = `${innerRef.current.scrollHeight}px`;
    }
    onInput?.(e as React.FormEvent<HTMLTextAreaElement> & React.InputEvent<HTMLTextAreaElement>);
  };

  return (
    <textarea
      ref={setRef}
      aria-invalid={error || undefined}
      onInput={handleInput}
      className={cx(
        "ui-textarea ui-focus-ring",
        `ui-textarea--${size}`,
        error && "ui-textarea--error",
        autoResize && "ui-textarea--auto",
        className,
      )}
      {...props}
    />
  );
});
