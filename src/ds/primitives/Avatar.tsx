import * as React from "react";
import { cx } from "../utils/cx";

export type AvatarSize = "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl";
export type AvatarShape = "circle" | "rounded";

export type AvatarProps = React.HTMLAttributes<HTMLSpanElement> & {
  src?: string;
  alt?: string;
  name?: string;
  size?: AvatarSize;
  shape?: AvatarShape;
  status?: "online" | "offline" | "busy" | "away";
};

function initials(name: string) {
  const parts = name.trim().split(/\s+/g).filter(Boolean);
  const first = parts[0]?.[0] ?? "";
  const last = parts.length > 1 ? parts[parts.length - 1]?.[0] ?? "" : "";
  return (first + last).toUpperCase();
}

export const Avatar = React.forwardRef<HTMLSpanElement, AvatarProps>(function Avatar(
  { src, alt, name, size = "md", shape = "circle", status, className, ...props },
  ref,
) {
  const label = alt ?? name ?? "Avatar";

  return (
    <span
      ref={ref}
      className={cx(
        "ui-avatar",
        `ui-avatar--${size}`,
        shape === "rounded" && "ui-avatar--rounded",
        className,
      )}
      aria-label={label}
      {...props}
    >
      {src ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img className="ui-avatar__img" src={src} alt={label} loading="lazy" />
      ) : (
        <span className="ui-avatar__fallback">{name ? initials(name) : "?"}</span>
      )}
      {status && <span className={cx("ui-avatar__status", `ui-avatar__status--${status}`)} aria-hidden="true" />}
    </span>
  );
});
