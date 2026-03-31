import * as React from "react";

import { cx } from "../utils/cx";

export type ResponsiveImageProps = React.ImgHTMLAttributes<HTMLImageElement> & {
  aspect?: "square" | "video" | "auto";
};

export function ResponsiveImage({ className, aspect = "auto", ...props }: ResponsiveImageProps) {
  return (
    <span className={cx("ui-img", aspect !== "auto" && `ui-img--${aspect}`, className)}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img className="ui-img__el" loading={props.loading ?? "lazy"} alt={props.alt ?? ""} {...props} />
    </span>
  );
}
