import * as React from "react";

import { cx } from "../../utils/cx";
import { Card } from "../../components/Card";

export type WebWidgetFrameProps = React.HTMLAttributes<HTMLDivElement> & {
  /** Defaults to Card for web runtime. */
  asCard?: boolean;
};

export function WebWidgetFrame({ asCard = true, className, children, ...props }: WebWidgetFrameProps) {
  if (!asCard) {
    return (
      <div className={className} {...props}>
        {children}
      </div>
    );
  }

  return (
    <Card className={cx(className)} {...props}>
      {children}
    </Card>
  );
}
