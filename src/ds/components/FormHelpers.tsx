import * as React from "react";
import { cx } from "../utils/cx";

export type FormErrorSummaryProps = {
  title?: string;
  errors: Array<{ id: string; message: string }>;
  className?: string;
};

export function FormErrorSummary({ title = "Please fix the following", errors, className }: FormErrorSummaryProps) {
  if (!errors.length) return null;
  return (
    <div className={cx("ui-errorsum", className)} role="alert" aria-live="polite">
      <div className="text-heading-4">{title}</div>
      <ul className="ui-errorsum__list">
        {errors.map((e) => (
          <li key={e.id} className="text-body-small">
            <a className="ui-navlink ui-focus-ring" href={`#${e.id}`}>
              {e.message}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export type FieldsetProps = React.FieldsetHTMLAttributes<HTMLFieldSetElement> & {
  legend?: React.ReactNode;
};

export function Fieldset({ legend, className, children, ...props }: FieldsetProps) {
  return (
    <fieldset className={cx("ui-fieldset", className)} {...props}>
      {legend ? <legend className="ui-fieldset__legend text-body-small">{legend}</legend> : null}
      <div className="ui-fieldset__body">{children}</div>
    </fieldset>
  );
}

export type FormGroupProps = React.HTMLAttributes<HTMLDivElement>;

export function FormGroup({ className, ...props }: FormGroupProps) {
  return <div className={cx("ui-form-group", className)} {...props} />;
}

export type FormActionsProps = React.HTMLAttributes<HTMLDivElement> & {
  align?: "start" | "end" | "between";
};

export function FormActions({ align = "end", className, ...props }: FormActionsProps) {
  return (
    <div
      className={cx(
        "ui-form-actions",
        align === "start" && "ui-form-actions--start",
        align === "between" && "ui-form-actions--between",
        className,
      )}
      {...props}
    />
  );
}
