import { ImageResponse } from "next/og";

export const alt = "Brainy Bit — Unlock the mind of a genius";
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
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #ede9fe 0%, #e0f2fe 100%)",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            width: 160,
            height: 160,
            borderRadius: 36,
            background: "#7c3aed",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: 32,
          }}
        >
          <svg width="124" height="124" viewBox="0 0 100 100">
            <path
              d="M50,15 C58,15 64,20 66,26 C74,24 82,30 82,40 C90,42 92,52 86,58 C90,66 86,76 76,78 C76,86 66,90 58,86 C54,90 46,90 42,86 C34,90 24,86 24,78 C14,76 10,66 14,58 C8,52 10,42 18,40 C18,30 26,24 34,26 C36,20 42,15 50,15 Z"
              fill="#ec4899"
            />
            <g stroke="#be185d" strokeWidth="2.5" strokeLinecap="round" fill="none" opacity="0.55">
              <path d="M50,20 C47,35 53,48 49,63 C51,74 49,80 50,86" />
              <path d="M28,38 C33,41 33,47 28,50" />
              <path d="M72,38 C67,41 67,47 72,50" />
              <path d="M24,58 C30,60 30,66 25,69" />
              <path d="M76,58 C70,60 70,66 75,69" />
            </g>
          </svg>
        </div>
        <div style={{ display: "flex", fontSize: 76, fontWeight: 800, color: "#111827" }}>
          Brainy Bit
        </div>
        <div style={{ display: "flex", fontSize: 32, fontWeight: 600, color: "#6d28d9", marginTop: 12 }}>
          Unlock the mind of a genius
        </div>
      </div>
    ),
    { ...size }
  );
}
