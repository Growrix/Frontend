/**
 * cx — Conditional class-name joiner (Handbook Ch 19 §12)
 *
 * Merges class strings, filtering out falsy values.
 * Replaces the per-file inline `cx()` duplicated across 20+ DS files.
 *
 * @example
 *   cx("btn", variant === "primary" && "btn--primary", className)
 */
export function cx(
  ...classes: Array<string | false | undefined | null | 0>
): string {
  return classes.filter(Boolean).join(" ");
}
