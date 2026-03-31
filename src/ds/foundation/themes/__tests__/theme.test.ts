/**
 * @jest-environment jsdom
 */
import { applyTheme, storeTheme, readStoredTheme, resolveTheme, isThemeName, DEFAULT_THEME, THEMES, type ThemeName } from "@/ds";

describe("Theme system", () => {
  beforeEach(() => {
    // Reset HTML root classes
    document.documentElement.className = "";
    localStorage.clear();
  });

  /* ------------------------------------------------------------------ */
  /*  Theme registry                                                     */
  /* ------------------------------------------------------------------ */
  test("THEMES contains all three themes", () => {
    const names = THEMES.map((t) => t.name);
    expect(names).toContain("dark");
    expect(names).toContain("light");
    expect(names).toContain("purple");
  });

  test("DEFAULT_THEME is dark", () => {
    expect(DEFAULT_THEME).toBe("dark");
  });

  test("isThemeName validates known themes", () => {
    expect(isThemeName("dark")).toBe(true);
    expect(isThemeName("light")).toBe(true);
    expect(isThemeName("purple")).toBe(true);
    expect(isThemeName("neon")).toBe(false);
    expect(isThemeName(null)).toBe(false);
    expect(isThemeName(undefined)).toBe(false);
  });

  /* ------------------------------------------------------------------ */
  /*  applyTheme                                                         */
  /* ------------------------------------------------------------------ */
  test("applyTheme sets theme class on documentElement", () => {
    applyTheme("dark");
    expect(document.documentElement.classList.contains("theme-dark")).toBe(true);
  });

  test("applyTheme replaces previous theme class", () => {
    applyTheme("dark");
    expect(document.documentElement.classList.contains("theme-dark")).toBe(true);

    applyTheme("light");
    expect(document.documentElement.classList.contains("theme-light")).toBe(true);
    expect(document.documentElement.classList.contains("theme-dark")).toBe(false);
  });

  test("applyTheme applies all three themes correctly", () => {
    const themes: ThemeName[] = ["dark", "light", "purple"];

    for (const theme of themes) {
      applyTheme(theme);
      expect(document.documentElement.classList.contains(`theme-${theme}`)).toBe(true);
      // No other theme classes
      for (const other of themes.filter((t) => t !== theme)) {
        expect(document.documentElement.classList.contains(`theme-${other}`)).toBe(false);
      }
    }
  });

  /* ------------------------------------------------------------------ */
  /*  storeTheme / readStoredTheme                                       */
  /* ------------------------------------------------------------------ */
  test("storeTheme persists to localStorage", () => {
    storeTheme("light");
    expect(localStorage.getItem("solarmatch-theme")).toBe("light");
  });

  test("readStoredTheme retrieves stored theme", () => {
    storeTheme("purple");
    expect(readStoredTheme()).toBe("purple");
  });

  test("readStoredTheme returns null for unknown value", () => {
    localStorage.setItem("solarmatch-theme", "neon");
    expect(readStoredTheme()).toBeNull();
  });

  test("readStoredTheme returns null when nothing stored", () => {
    expect(readStoredTheme()).toBeNull();
  });

  /* ------------------------------------------------------------------ */
  /*  resolveTheme                                                       */
  /* ------------------------------------------------------------------ */
  test("resolveTheme returns known theme name", () => {
    expect(resolveTheme("light")).toBe("light");
    expect(resolveTheme("purple")).toBe("purple");
  });

  test("resolveTheme falls back to DEFAULT_THEME for unknown", () => {
    expect(resolveTheme("neon")).toBe(DEFAULT_THEME);
    expect(resolveTheme(null)).toBe(DEFAULT_THEME);
    expect(resolveTheme(undefined)).toBe(DEFAULT_THEME);
  });

  /* ------------------------------------------------------------------ */
  /*  Density / Visual / Platform knobs                                  */
  /* ------------------------------------------------------------------ */
  test("data-density attribute can be set on root", () => {
    document.documentElement.setAttribute("data-density", "compact");
    expect(document.documentElement.getAttribute("data-density")).toBe("compact");
    document.documentElement.removeAttribute("data-density");
  });

  test("data-visual attribute can be set on root", () => {
    document.documentElement.setAttribute("data-visual", "glass");
    expect(document.documentElement.getAttribute("data-visual")).toBe("glass");
    document.documentElement.removeAttribute("data-visual");
  });

  test("data-platform attribute can be set on root", () => {
    document.documentElement.setAttribute("data-platform", "mobile");
    expect(document.documentElement.getAttribute("data-platform")).toBe("mobile");
    document.documentElement.removeAttribute("data-platform");
  });
});
