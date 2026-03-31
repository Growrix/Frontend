import * as React from "react";
import { cx } from "../utils/cx";

export type ButtonVariant = "primary" | "secondary" | "ghost" | "text" | "icon" | "fab";
export type ButtonSize = "sm" | "md" | "lg";
export type ButtonTone = "accent" | "danger" | "success";

type ButtonElement = "button" | "a";

export type ButtonProps<T extends ButtonElement = "button"> = React.ButtonHTMLAttributes<HTMLButtonElement> &
  React.AnchorHTMLAttributes<HTMLAnchorElement> & {
    as?: T;
    variant?: ButtonVariant;
    size?: ButtonSize;
    tone?: ButtonTone;
    isLoading?: boolean;
    loadingText?: string;
  };

export const Button = React.forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(function Button(
  {
    as,
    className,
    variant = "primary",
    size = "md",
    tone,
    isLoading,
    loadingText,
    type,
    disabled,
    children,
    ...props
  },
  ref,
) {
  const Tag = (as ?? "button") as React.ElementType;
  const computedDisabled = Boolean(disabled || isLoading);
  const defaultType = Tag === "button" ? (type ?? "button") : undefined;

  return (
    <Tag
      ref={ref}
      type={defaultType}
      disabled={Tag === "button" ? computedDisabled : undefined}
      aria-disabled={computedDisabled || undefined}
      aria-busy={isLoading || undefined}
      className={cx(
        "ui-button ui-focus-ring",
        `ui-button--${variant}`,
        `ui-button--${size}`,
        tone && `ui-button--tone-${tone}`,
        isLoading && "ui-button--loading",
        className,
      )}
      {...props}
    >
      {isLoading ? (loadingText ?? "Loading\u2026") : children}
    </Tag>
  );
});
