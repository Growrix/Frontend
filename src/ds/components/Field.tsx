import * as React from "react";
import { cx } from "../utils/cx";

export type FieldProps = {
  id?: string;
  label: React.ReactNode;
  hint?: React.ReactNode;
  error?: React.ReactNode;
  required?: boolean;
  charCount?: { current: number; max: number };
  children: React.ReactNode;
  className?: string;
};

function withA11yProps(
  child: React.ReactNode,
  props: {
    id?: string;
    describedBy?: string;
    invalid?: boolean;
  }
) {
  if (!React.isValidElement(child)) return child;

  const existingProps = child.props as Record<string, unknown>;
  const nextProps: Record<string, unknown> = {};

  const existingId = typeof existingProps.id === "string" ? (existingProps.id as string) : undefined;
  if (!existingId && props.id) nextProps.id = props.id;

  const existingDescribedBy =
    typeof existingProps["aria-describedby"] === "string"
      ? (existingProps["aria-describedby"] as string)
      : undefined;

  if (props.describedBy) {
    nextProps["aria-describedby"] = existingDescribedBy
      ? `${existingDescribedBy} ${props.describedBy}`
      : props.describedBy;
  }

  if (props.invalid) nextProps["aria-invalid"] = true;

  return React.cloneElement(child, nextProps);
}

export function Field({ id, label, hint, error, required, charCount, children, className }: FieldProps) {
  const hintId = id ? `${id}__hint` : undefined;
  const errorId = id ? `${id}__error` : undefined;
  const describedBy = error ? errorId : hint ? hintId : undefined;
  const child = withA11yProps(children, { id, describedBy, invalid: Boolean(error) });

  return (
    <div className={cx("ui-field", className)}>
      <label className="ui-label" htmlFor={id}>
        {label}
        {required && <span className="ui-field__required" aria-hidden="true"> *</span>}
      </label>
      {child}
      <div className="ui-field__footer">
        {error ? (
          <div className="ui-error" id={errorId} role="alert">
            {error}
          </div>
        ) : hint ? (
          <div className="ui-helper" id={hintId}>
            {hint}
          </div>
        ) : <span />}
        {charCount ? (
          <span className={cx("ui-field__count text-caption", charCount.current > charCount.max && "ui-text-danger")}>
            {charCount.current}/{charCount.max}
          </span>
        ) : null}
      </div>
    </div>
  );
}
