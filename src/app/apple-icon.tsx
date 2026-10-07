import { ImageResponse } from "next/og";
import { themeConfig } from "@/config/siteConfig";
import { getProfile } from "@/lib/portfolio";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

/* Inline styles are required by ImageResponse. */
export default function AppleIcon() {
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
          background: `linear-gradient(135deg, ${themeConfig.primary}, ${themeConfig.secondary})`,
          color: themeConfig.background,
          fontSize: 80,
          fontWeight: 800,
          letterSpacing: -2,
        }}
      >
        {shortName}
      </div>
    ),
    size,
  );
}
