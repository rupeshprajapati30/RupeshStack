"use client";

import { useEffect, useState } from "react";
import { Palette } from "lucide-react";
import { defaultThemePreset, themePresetLabels, themePresets, type ThemePresetName } from "@/config/siteConfig";

const STORAGE_KEY = "portfolio-theme";

function applyTheme(themeName: ThemePresetName) {
  const root = document.documentElement;
  const theme = themePresets[themeName];

  for (const [token, value] of Object.entries(theme)) {
    root.style.setProperty(`--color-${token}`, value);
  }

  root.dataset.theme = themeName;
  root.style.colorScheme = "dark";
  localStorage.setItem(STORAGE_KEY, themeName);
}

export function ThemeSwitcher() {
  const [activeTheme, setActiveTheme] = useState<ThemePresetName>(defaultThemePreset);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY) as ThemePresetName | null;
    const themeName = saved && saved in themePresets ? saved : defaultThemePreset;
    applyTheme(themeName);
    setActiveTheme(themeName);
  }, []);

  return (
    <div className="flex items-center gap-2 rounded-xl border border-border bg-surface/60 p-1.5 shadow-[0_10px_24px_-18px_var(--color-primary)]">
      <div className="hidden items-center gap-1.5 pr-1 text-muted sm:flex">
        <Palette aria-hidden="true" className="size-3.5" />
        <span className="text-[10px] font-semibold uppercase tracking-[0.18em]">Theme</span>
      </div>

      {Object.entries(themePresets).map(([themeName, colors]) => {
        const name = themeName as ThemePresetName;
        const selected = activeTheme === name;

        return (
          <button
            key={name}
            type="button"
            aria-label={`Use ${themePresetLabels[name]} theme`}
            aria-pressed={selected}
            title={themePresetLabels[name]}
            onClick={() => {
              applyTheme(name);
              setActiveTheme(name);
            }}
            className={[
              "relative h-7 w-7 rounded-full border transition-all duration-200",
              selected ? "scale-110 border-text shadow-[0_0_0_2px_var(--color-primary)]" : "border-transparent hover:border-primary/70",
            ].join(" ")}
            style={{
              background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary}, ${colors.accent})`,
            }}
          >
            {selected ? <span className="absolute inset-0 rounded-full ring-2 ring-white/80 ring-inset" /> : null}
          </button>
        );
      })}
    </div>
  );
}
