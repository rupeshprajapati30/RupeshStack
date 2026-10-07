/**
 * Centralised, environment-driven configuration.
 *
 * Only `NEXT_PUBLIC_` variables are read here — they are inlined at build time
 * and are safe to expose to the browser. Never read private secrets in this file.
 */

export type ThemeToken =
  | "background"
  | "surface"
  | "primary"
  | "secondary"
  | "accent"
  | "text"
  | "muted"
  | "border"
  | "success";

export type ThemeConfig = Record<ThemeToken, string>;

/** Fallbacks used only when a variable is missing or invalid in `.env.local`. */
const defaultTheme: ThemeConfig = {
  background: "#050B14",
  surface: "#0B1424",
  primary: "#00E5FF",
  secondary: "#7C3AED",
  accent: "#22D3EE",
  text: "#F8FAFC",
  muted: "#94A3B8",
  border: "#16304D",
  success: "#22C55E",
};

/** Accepts hex, rgb(a), hsl(a), oklch and oklab colours — rejects anything that could break out of CSS. */
const COLOR_PATTERN =
  /^(#[0-9a-f]{3,8}|(rgb|rgba|hsl|hsla|oklch|oklab)\([0-9a-z\s.,%/+-]+\))$/i;

function color(value: string | undefined, token: ThemeToken): string {
  const trimmed = value?.trim();
  return trimmed && COLOR_PATTERN.test(trimmed) ? trimmed : defaultTheme[token];
}

// Each variable must be referenced literally so Next.js can inline it.
export const themeConfig: ThemeConfig = {
  background: color(process.env.NEXT_PUBLIC_THEME_BACKGROUND, "background"),
  surface: color(process.env.NEXT_PUBLIC_THEME_SURFACE, "surface"),
  primary: color(process.env.NEXT_PUBLIC_THEME_PRIMARY, "primary"),
  secondary: color(process.env.NEXT_PUBLIC_THEME_SECONDARY, "secondary"),
  accent: color(process.env.NEXT_PUBLIC_THEME_ACCENT, "accent"),
  text: color(process.env.NEXT_PUBLIC_THEME_TEXT, "text"),
  muted: color(process.env.NEXT_PUBLIC_THEME_MUTED, "muted"),
  border: color(process.env.NEXT_PUBLIC_THEME_BORDER, "border"),
  success: color(process.env.NEXT_PUBLIC_THEME_SUCCESS, "success"),
};

/** Serialises the theme into CSS custom properties for the document root. */
export function themeToCss(theme: ThemeConfig = themeConfig): string {
  const declarations = (Object.keys(theme) as ThemeToken[])
    .map((token) => `--color-${token}:${theme[token]};`)
    .join("");
  return `:root{${declarations}}`;
}

export const siteConfig = {
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000").replace(/\/$/, ""),
  locale: "en_US",
};
