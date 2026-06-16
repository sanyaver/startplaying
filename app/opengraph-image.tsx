import { ImageResponse } from "next/og";
import { SITE } from "@/lib/seo";

// Reusable default Open Graph image for every route that doesn't define its own.
export const alt = SITE.ogImageAlt;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "80px",
          background: "linear-gradient(135deg, #1e1b4b 0%, #4338ca 55%, #6d28d9 100%)",
          color: "white",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", fontSize: 40 }}>
          <span style={{ fontSize: 56, marginRight: 20 }}>🎲</span>
          <span style={{ fontWeight: 700, letterSpacing: -1 }}>
            {SITE.name}
          </span>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 76,
              fontWeight: 800,
              lineHeight: 1.05,
              letterSpacing: -2,
              maxWidth: 900,
            }}
          >
            Find your next tabletop RPG adventure
          </div>
          <div
            style={{
              marginTop: 28,
              fontSize: 34,
              color: "#c7d2fe",
              maxWidth: 880,
            }}
          >
            Book live sessions with professional Game Masters — D&amp;D, Pathfinder, Call of Cthulhu &amp; more.
          </div>
        </div>

        <div style={{ fontSize: 28, color: "#a5b4fc" }}>
          startplaying.games
        </div>
      </div>
    ),
    { ...size },
  );
}
