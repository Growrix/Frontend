import * as React from "react";
import { cx } from "../utils/cx";

export type TextVariant =
  | "display-1" | "display-2" | "display-3"
  | "heading-1" | "heading-2" | "heading-3" | "heading-4" | "heading-5" | "heading-6"
  | "body" | "body-large" | "body-small"
  | "label" | "caption" | "overline" | "micro"
  | "quote" | "code" | "kbd";

export type TextTone = "default" | "muted" | "accent" | "success" | "warning" | "danger" | "info";

export type TextAlign = "start" | "center" | "end";

type TextElement = "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span" | "div" | "blockquote" | "code" | "kbd";

export type TextProps<T extends TextElement = "p"> = React.HTMLAttributes<HTMLElement> & {
  as?: T;
  variant?: TextVariant;
  tone?: TextTone;
  truncate?: boolean | number;
  align?: TextAlign;
};

const variantClass: Record<TextVariant, string> = {
  "display-1": "text-display-1",
  "display-2": "text-display-2",
  "display-3": "text-display-3",
  "heading-1": "text-heading-1",
  "heading-2": "text-heading-2",
  "heading-3": "text-heading-3",
  "heading-4": "text-heading-4",
  "heading-5": "text-heading-5",
  "heading-6": "text-heading-6",
  "body": "text-body",
  "body-large": "text-body-large",
  "body-small": "text-body-small",
  "label": "text-label",
  "caption": "text-caption",
  "overline": "text-overline",
  "micro": "text-micro",
  "quote": "text-quote",
  "code": "text-code",
  "kbd": "text-kbd",
};

const toneClass: Record<TextTone, string | false> = {
  default: false,
  muted: "ui-text-muted",
  accent: "ui-text-accent",
  success: "ui-text-success",
  warning: "ui-text-warning",
  danger: "ui-text-danger",
  info: "ui-text-info",
};

const alignClass: Record<TextAlign, string> = {
  start: "text-start",
  center: "text-center",
  end: "text-end",
};

export const Text = React.forwardRef<HTMLElement, TextProps>(function Text(
  { as, variant = "body", tone = "default", truncate, align, className, ...props },
  ref,
) {
  const Tag = (as ?? "p") as React.ElementType;

  return (
    <Tag
      ref={ref}
      className={cx(
        variantClass[variant],
        toneClass[tone],
        align && alignClass[align],
        truncate === true && "text-truncate",
        typeof truncate === "number" && `text-line-clamp-${truncate}`,
        className,
      )}
      {...props}
    />
  );
});
