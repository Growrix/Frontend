// Tokens are implemented as CSS variables in src/ds/styles/ds.tokens.css.
// This module exists as a stable import surface for typed access to DS families.

export type DsTokenLayer = "palette" | "semantic" | "layout" | "motion" | "size" | "shadow" | "typography";

export * from "./vars";
