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
export type ThemePresetName = "midnight" | "aurora" | "sunset" | "forest" | "ice" | "light";

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

export const themePresets: Record<ThemePresetName, ThemeConfig> = {
  midnight: {
    background: "#050B14",
    surface: "#0B1424",
    primary: "#00E5FF",
    secondary: "#7C3AED",
    accent: "#22D3EE",
    text: "#F8FAFC",
    muted: "#94A3B8",
    border: "#16304D",
    success: "#22C55E",
  },
  aurora: {
    background: "#07141C",
    surface: "#0D1D26",
    primary: "#7CFFC4",
    secondary: "#34D399",
    accent: "#5EEAD4",
    text: "#ECFEFF",
    muted: "#9BD5D0",
    border: "#1B4E5A",
    success: "#4ADE80",
  },
  sunset: {
    background: "#170D1D",
    surface: "#23142D",
    primary: "#FF7A59",
    secondary: "#FF4D8D",
    accent: "#FBBF24",
    text: "#FFF1F2",
    muted: "#F9A8D4",
    border: "#5B2A4B",
    success: "#34D399",
  },
  forest: {
    background: "#07170F",
    surface: "#0C1F18",
    primary: "#86EFAC",
    secondary: "#22C55E",
    accent: "#A3E635",
    text: "#ECFDF5",
    muted: "#A7F3D0",
    border: "#1F5E43",
    success: "#4ADE80",
  },
  ice: {
    background: "#EAF6FF",
    surface: "#F3F9FF",
    primary: "#2563EB",
    secondary: "#0EA5E9",
    accent: "#38BDF8",
    text: "#0F172A",
    muted: "#475569",
    border: "#BFDBFE",
    success: "#10B981",
  },
  light: {
    background: "#FAF7F2",
    surface: "#FFFDF9",
    primary: "#A16207",
    secondary: "#D97706",
    accent: "#F59E0B",
    text: "#1F2937",
    muted: "#6B7280",
    border: "#F5D9A8",
    success: "#16A34A",
  },
};

export const defaultThemePreset: ThemePresetName = "midnight";

export const themePresetLabels: Record<ThemePresetName, string> = {
  midnight: "Midnight",
  aurora: "Aurora",
  sunset: "Sunset",
  forest: "Forest",
  ice: "Ice",
  light: "Light",
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

export function getSelectedThemeCss(themeName: ThemePresetName = defaultThemePreset): string {
  return themeToCss(themePresets[themeName]);
}

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
