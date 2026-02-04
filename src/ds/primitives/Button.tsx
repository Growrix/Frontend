import * as React from "react";

export type ButtonVariant = "primary" | "secondary" | "text";
export type ButtonSize = "sm" | "md" | "lg";

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
};

function cx(...classes: Array<string | false | undefined | null>) {
  return classes.filter(Boolean).join(" ");
}

export function Button({
  className,
  variant = "primary",
  size = "md",
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={cx(
        "ui-button ui-focus-ring",
        size === "sm" && "ui-button--sm",
        size === "md" && "ui-button--md",
        size === "lg" && "ui-button--lg",
        variant === "primary" && "ui-button--primary",
        variant === "secondary" && "ui-button--secondary",
        variant === "text" && "ui-button--text",
        className
      )}
      {...props}
    />
  );
}
