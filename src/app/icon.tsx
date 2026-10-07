import { ImageResponse } from "next/og";
import { themeConfig } from "@/config/siteConfig";
import { getProfile } from "@/lib/portfolio";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

/* Favicon generated from the theme + profile initials. Inline styles are required by ImageResponse. */
export default function Icon() {
  const { shortName } = getProfile();
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 16,
          background: `linear-gradient(135deg, ${themeConfig.primary}, ${themeConfig.secondary})`,
          color: themeConfig.background,
          fontSize: 30,
          fontWeight: 800,
          letterSpacing: -1,
        }}
      >
        {shortName}
      </div>
    ),
    size,
  );
}
