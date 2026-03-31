export const motion = {
  /* Duration — Ch 04 §2 */
  durationInstant: "var(--ds-duration-instant)",
  durationFastest: "var(--ds-duration-fastest)",
  durationFast: "var(--ds-duration-fast)",
  durationNormal: "var(--ds-duration-normal)",
  durationModerate: "var(--ds-duration-moderate)",
  durationSlow: "var(--ds-duration-slow)",
  durationSlower: "var(--ds-duration-slower)",
  durationSlowest: "var(--ds-duration-slowest)",

  /* Easing — Ch 04 §3 */
  easeLinear: "var(--ds-ease-linear)",
  easeStandard: "var(--ds-ease-standard)",
  easeIn: "var(--ds-ease-in)",
  easeOut: "var(--ds-ease-out)",
  easeInOut: "var(--ds-ease-in-out)",
  easeBounce: "var(--ds-ease-bounce)",
  easeSpring: "var(--ds-ease-spring)",
  easeElastic: "var(--ds-ease-elastic)",
  easeSnap: "var(--ds-ease-snap)",
  easeEmphasized: "var(--ds-ease-emphasized)",
} as const;

export type MotionTokenKey = keyof typeof motion;
