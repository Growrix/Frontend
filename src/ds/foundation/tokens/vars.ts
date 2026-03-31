export type CssVar = `var(--${string})`;

export const space = {
  0: "var(--ds-space-0)",
  1: "var(--ds-space-1)",
  2: "var(--ds-space-2)",
  3: "var(--ds-space-3)",
  4: "var(--ds-space-4)",
  5: "var(--ds-space-5)",
  6: "var(--ds-space-6)",
  7: "var(--ds-space-7)",
  8: "var(--ds-space-8)",
  9: "var(--ds-space-9)",
  cardPadding: "var(--ds-space-card-padding)",
  modalPadding: "var(--ds-space-modal-padding)",
  formGap: "var(--ds-space-form-gap)",
} as const satisfies Record<string, CssVar>;

export const radius = {
  default: "var(--ds-radius-default)",
  card: "var(--ds-radius-card)",
  modal: "var(--ds-radius-modal)",
  full: "var(--ds-radius-full)",
  // Compatibility aliases
  sm: "var(--ds-radius-sm)",
  1: "var(--ds-radius-1)",
  2: "var(--ds-radius-2)",
  3: "var(--ds-radius-3)",
} as const satisfies Record<string, CssVar>;

export const z = {
  sticky: "var(--ds-z-sticky)",
  modal: "var(--ds-z-modal)",
  dropdown: "var(--ds-z-dropdown)",
  drawer: "var(--ds-z-drawer)",
  tooltip: "var(--ds-z-tooltip)",
  toast: "var(--ds-z-toast)",
} as const satisfies Record<string, CssVar>;

export const motion = {
  easeStandard: "var(--ds-ease-standard)",
  durationFast: "var(--ds-duration-fast)",
  durationNormal: "var(--ds-duration-normal)",
  durationSlow: "var(--ds-duration-slow)",
} as const satisfies Record<string, CssVar>;

export const shadow = {
  sm: "var(--ds-shadow-sm)",
  md: "var(--ds-shadow-md)",
} as const satisfies Record<string, CssVar>;

export const size = {
  heroMinH: "var(--ds-size-hero-min-h)",
  headerH: "var(--ds-size-header-h)",
  viewportMinusHeader: "var(--ds-size-viewport-minus-header)",
  touchTarget: "var(--ds-size-touch-target)",
  inputMinH: "var(--ds-size-input-min-h)",
  buttonSm: "var(--ds-size-button-sm)",
  buttonMinH: "var(--ds-size-button-min-h)",
  iconXs: "var(--ds-size-icon-xs)",
  iconSm: "var(--ds-size-icon-sm)",
  iconMd: "var(--ds-size-icon-md)",
  iconLg: "var(--ds-size-icon-lg)",
  iconXl: "var(--ds-size-icon-xl)",
  iconButton: "var(--ds-size-icon-button)",
  fab: "var(--ds-size-fab)",
  tabsH: "var(--ds-size-tabs-h)",
  bottomNavH: "var(--ds-size-bottom-nav-h)",
  selectionControl: "var(--ds-size-selection-control)",
  stepperDot: "var(--ds-size-stepper-dot)",
  previewPanel: "var(--ds-size-preview-panel)",
  devicePhoneW: "var(--ds-size-device-phone-w)",
  devicePhoneH: "var(--ds-size-device-phone-h)",
  shellLeft: "var(--ds-size-shell-left)",
  shellRight: "var(--ds-size-shell-right)",
  shellCollapsed: "var(--ds-size-shell-collapsed)",
} as const satisfies Record<string, CssVar>;

export const color = {
  background: "var(--ds-color-background)",
  surface: "var(--ds-color-surface)",
  surface2: "var(--ds-color-surface-2)",
  border: "var(--ds-color-border)",
  foreground: "var(--ds-color-foreground)",
  foregroundSecondary: "var(--ds-color-foreground-secondary)",
  text: "var(--ds-color-text)",
  textMuted: "var(--ds-color-text-muted)",
  fg: "var(--ds-color-fg)",
  fgMuted: "var(--ds-color-fg-muted)",
  accent: "var(--ds-color-accent)",
  accentForeground: "var(--ds-color-accent-foreground)",
  accentHover: "var(--ds-color-accent-hover)",
  accentActive: "var(--ds-color-accent-active)",
  primary: "var(--ds-color-primary)",
  onPrimary: "var(--ds-color-on-primary)",
  success: "var(--ds-color-success)",
  warning: "var(--ds-color-warning)",
  danger: "var(--ds-color-danger)",
  info: "var(--ds-color-info)",
  focusRing: "var(--ds-color-focus-ring)",
  overlay: "var(--ds-color-overlay)",
} as const satisfies Record<string, CssVar>;

export const palette = {
  neutral0: "var(--ds-palette-neutral-0)",
  neutral50: "var(--ds-palette-neutral-50)",
  neutral100: "var(--ds-palette-neutral-100)",
  neutral200: "var(--ds-palette-neutral-200)",
  neutral300: "var(--ds-palette-neutral-300)",
  neutral400: "var(--ds-palette-neutral-400)",
  neutral500: "var(--ds-palette-neutral-500)",
  neutral600: "var(--ds-palette-neutral-600)",
  neutral700: "var(--ds-palette-neutral-700)",
  neutral800: "var(--ds-palette-neutral-800)",
  neutral850: "var(--ds-palette-neutral-850)",
  neutral900: "var(--ds-palette-neutral-900)",
  neutral950: "var(--ds-palette-neutral-950)",
  brand50: "var(--ds-palette-brand-50)",
  brand100: "var(--ds-palette-brand-100)",
  brand200: "var(--ds-palette-brand-200)",
  brand300: "var(--ds-palette-brand-300)",
  brand400: "var(--ds-palette-brand-400)",
  brand500: "var(--ds-palette-brand-500)",
  brand600: "var(--ds-palette-brand-600)",
  brand700: "var(--ds-palette-brand-700)",
  brand800: "var(--ds-palette-brand-800)",
  brand900: "var(--ds-palette-brand-900)",
  brand950: "var(--ds-palette-brand-950)",
  success600: "var(--ds-palette-success-600)",
  warning600: "var(--ds-palette-warning-600)",
  danger600: "var(--ds-palette-danger-600)",
  info600: "var(--ds-palette-info-600)",
} as const satisfies Record<string, CssVar>;

export const fontFamily = {
  sans: "var(--ds-font-sans)",
  display: "var(--ds-font-display)",
  mono: "var(--ds-font-mono)",
} as const satisfies Record<string, CssVar>;

export const fontSize = {
  1: "var(--ds-font-size-1)",
  2: "var(--ds-font-size-2)",
  3: "var(--ds-font-size-3)",
  4: "var(--ds-font-size-4)",
  5: "var(--ds-font-size-5)",
  6: "var(--ds-font-size-6)",
  7: "var(--ds-font-size-7)",
} as const satisfies Record<string, CssVar>;

export const fontWeight = {
  regular: "var(--ds-font-weight-regular)",
  book: "var(--ds-font-weight-book)",
  medium: "var(--ds-font-weight-medium)",
  demibold: "var(--ds-font-weight-demibold)",
  semibold: "var(--ds-font-weight-semibold)",
  bold: "var(--ds-font-weight-bold)",
} as const satisfies Record<string, CssVar>;

export const lineHeight = {
  tight: "var(--ds-line-height-tight)",
  section: "var(--ds-line-height-section)",
  meta: "var(--ds-line-height-meta)",
  normal: "var(--ds-line-height-normal)",
  relaxed: "var(--ds-line-height-relaxed)",
} as const satisfies Record<string, CssVar>;

export const letterSpacing = {
  tight: "var(--ds-letter-spacing-tight)",
  loose: "var(--ds-letter-spacing-loose)",
} as const satisfies Record<string, CssVar>;
