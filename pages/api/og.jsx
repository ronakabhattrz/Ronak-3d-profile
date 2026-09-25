import { ImageResponse } from "next/og";

export const config = { runtime: "edge" };

const clamp = (value, fallback, max) =>
  (value || fallback).toString().slice(0, max);

/** 1200×630 branded share image: /api/og?title=…&eyebrow=… */
export default function handler(req) {
  const { searchParams } = new URL(req.url);
  const title = clamp(
    searchParams.get("title"),
    "Ruby on Rails & JS full-stack that ships.",
    90
  );
  const eyebrow = clamp(searchParams.get("eyebrow"), "Portfolio", 32);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          backgroundColor: "#070709",
          backgroundImage:
            "radial-gradient(circle at 88% 0%, rgba(241,48,36,0.38), rgba(7,7,9,0) 55%)",
          color: "#fafafa",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            fontSize: 34,
            letterSpacing: 2,
          }}
        >
          <span style={{ fontWeight: 700 }}>RONAK</span>
          <span style={{ marginLeft: 12, fontWeight: 300 }}>BHATT</span>
          <span
            style={{
              width: 12,
              height: 12,
              marginLeft: 6,
              marginTop: 14,
              background: "#F13024",
            }}
          />
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              fontSize: 24,
              letterSpacing: 6,
              textTransform: "uppercase",
              color: "#a1a1aa",
            }}
          >
            <span
              style={{
                width: 12,
                height: 12,
                borderRadius: 12,
                background: "#F13024",
                marginRight: 16,
              }}
            />
            {eyebrow}
          </div>
          <div
            style={{
              marginTop: 24,
              fontSize: title.length > 40 ? 76 : 96,
              fontWeight: 700,
              lineHeight: 1.05,
              letterSpacing: -3,
              maxWidth: 1000,
            }}
          >
            {title}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: 26,
            color: "#a1a1aa",
          }}
        >
          <span>Ruby on Rails · React · Next.js · AWS</span>
          <span style={{ color: "#fafafa" }}>ronakbhatt.in</span>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      headers: {
        "Cache-Control": "public, max-age=86400, s-maxage=604800, immutable",
      },
    }
  );
}
