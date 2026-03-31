import * as React from "react";

import { cx } from "../utils/cx";

export type SkeletonShape = "text" | "circle" | "rect" | "image";
export type SkeletonAnimation = "shimmer" | "pulse";

export type SkeletonProps = {
  className?: string;
  lines?: number;
  shape?: SkeletonShape;
  animation?: SkeletonAnimation;
  width?: string;
  height?: string;
};

export function Skeleton({
  className,
  lines = 1,
  shape = "text",
  animation = "shimmer",
  width,
  height,
}: SkeletonProps) {
  const blockRef = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    const el = blockRef.current;
    if (!el) return;
    if (width) el.style.setProperty("--ui-skeleton-w", width);
    if (height) el.style.setProperty("--ui-skeleton-h", height);
  }, [width, height]);

  if (shape !== "text") {
    return (
      <div
        className={cx(
          "ui-skeleton",
          `ui-skeleton--${shape}`,
          animation === "pulse" && "ui-skeleton--pulse",
          className,
        )}
        aria-hidden="true"
      >
        <div ref={blockRef} className="ui-skeleton__block" />
      </div>
    );
  }

  return (
    <div
      className={cx(
        "ui-skeleton",
        animation === "pulse" && "ui-skeleton--pulse",
        className,
      )}
      aria-hidden="true"
    >
      {Array.from({ length: Math.max(1, lines) }).map((_, idx) => (
        <div key={idx} className="ui-skeleton__line" />
      ))}
    </div>
  );
}
