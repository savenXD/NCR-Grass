import { ImageResponse } from "next/og"
import { site } from "@/lib/site"

// Shared social preview for every page (WhatsApp, Facebook, X). Generated at build time.
export const alt = "NCR Grass: farm-fresh natural lawn grass supply and installation in Delhi NCR and North India"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "linear-gradient(135deg, #14361f 0%, #1f5a32 60%, #3f8a3a 100%)",
          color: "#f2f7e8",
        }}
      >
        <div style={{ fontSize: 34, fontWeight: 700, letterSpacing: 6, color: "#c8e66a" }}>NCR GRASS</div>
        <div style={{ marginTop: 24, fontSize: 76, fontWeight: 800, lineHeight: 1.05 }}>Natural Lawn Grass Supply & Installation</div>
        <div style={{ marginTop: 28, fontSize: 36, opacity: 0.85 }}>Dasna · Ghaziabad · Noida · Delhi NCR · North India</div>
        <div style={{ marginTop: 40, fontSize: 32, fontWeight: 700 }}>{`Call / WhatsApp ${site.phoneDisplay}`}</div>
      </div>
    ),
    size,
  )
}
