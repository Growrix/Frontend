import * as React from "react";

export type FieldProps = {
  label: React.ReactNode;
  hint?: React.ReactNode;
  error?: React.ReactNode;
  children: React.ReactNode;
};

export function Field({ label, hint, error, children }: FieldProps) {
  return (
    <div className="ui-field">
      <label className="ui-label">{label}</label>
      {children}
      {error ? <div className="ui-error">{error}</div> : hint ? <div className="ui-helper">{hint}</div> : null}
    </div>
  );
}
