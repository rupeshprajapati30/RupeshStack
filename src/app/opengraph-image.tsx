import { ImageResponse } from "next/og";
import { themeConfig } from "@/config/siteConfig";
import { getProfile } from "@/lib/portfolio";

const profile = getProfile();

export const alt = `${profile.name} — ${profile.title}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Adds alpha to 6-digit hex colours; other formats fall back to transparent. */
function tint(color: string, alpha: string): string {
  return /^#[0-9a-f]{6}$/i.test(color) ? color + alpha : "transparent";
}

/* Social share card generated from profile.json + theme. Inline styles are required by ImageResponse. */
export default function OpengraphImage() {
  const t = themeConfig;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: `radial-gradient(circle at 85% 10%, ${tint(t.secondary, "55")}, transparent 45%), radial-gradient(circle at 0% 100%, ${tint(t.primary, "33")}, transparent 45%), ${t.background}`,
          color: t.text,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 80,
              height: 80,
              borderRadius: 20,
              background: `linear-gradient(135deg, ${t.primary}, ${t.secondary})`,
              color: t.background,
              fontSize: 34,
              fontWeight: 800,
            }}
          >
            {profile.shortName}
          </div>
          <div style={{ display: "flex", fontSize: 26, color: t.primary }}>$ whoami</div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 84, fontWeight: 800, letterSpacing: -2 }}>{profile.name}</div>
          <div style={{ fontSize: 40, color: t.primary, marginTop: 8 }}>{profile.title}</div>
          <div style={{ fontSize: 28, color: t.muted, marginTop: 24, maxWidth: 950 }}>
            {profile.description}
          </div>
        </div>

        <div style={{ display: "flex", gap: 14 }}>
          {profile.heroTechnologies.slice(0, 6).map((tech) => (
            <div
              key={tech}
              style={{
                display: "flex",
                padding: "8px 18px",
                borderRadius: 999,
                border: `1px solid ${t.border}`,
                background: t.surface,
                fontSize: 22,
                color: t.text,
              }}
            >
              {tech}
            </div>
          ))}
        </div>
      </div>
    ),
    size,
  );
}
