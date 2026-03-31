import * as React from "react";

import { cx } from "../utils/cx";

export type SplitSectionProps = React.HTMLAttributes<HTMLDivElement> & {
  reverse?: boolean;
  left: React.ReactNode;
  right: React.ReactNode;
};

export function SplitSection({ reverse = false, left, right, className, ...props }: SplitSectionProps) {
  return (
    <div className={cx("ui-split", reverse && "ui-split--reverse", className)} {...props}>
      {reverse ? (
        <>
          <div>{right}</div>
          <div>{left}</div>
        </>
      ) : (
        <>
          <div>{left}</div>
          <div>{right}</div>
        </>
      )}
    </div>
  );
}
