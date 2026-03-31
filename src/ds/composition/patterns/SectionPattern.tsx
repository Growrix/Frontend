import * as React from "react";

import { cx } from "../../utils/cx";
import { Section, type SectionProps } from "../../components/Section";
import { SectionHeader, type SectionHeaderProps } from "../../components/SectionHeader";
import { Stack } from "../../primitives/Stack";

export type SectionPatternProps = Omit<SectionProps, "children"> & {
  header?: SectionHeaderProps;
  actions?: React.ReactNode;
  children: React.ReactNode;
};

export function SectionPattern({ header, actions, className, children, ...sectionProps }: SectionPatternProps) {
  const showHeader = Boolean(header?.title || header?.kicker || header?.lede || actions);

  return (
    <Section className={cx(className)} {...sectionProps}>
      <Stack gap="compact">
        {showHeader ? (
          <div className={cx("ui-row", Boolean(actions) && "ui-row--between")}>
            {header ? <SectionHeader {...header} /> : null}
            {actions ? <div className="ui-row">{actions}</div> : null}
          </div>
        ) : null}
        {children}
      </Stack>
    </Section>
  );
}
