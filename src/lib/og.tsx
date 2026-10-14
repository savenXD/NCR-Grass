import { ImageResponse } from "next/og"
import { site } from "@/lib/site"

export const ogSize = { width: 1200, height: 630 }

/** Social preview card with the page's own headline, so shared links (WhatsApp, Facebook, X) don't all look alike. */
export function pageOgImage({ eyebrow, title }: { eyebrow: string; title: string }) {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "72px 80px",
          background: "linear-gradient(135deg, #14361f 0%, #1f5a32 60%, #3f8a3a 100%)",
          color: "#f2f7e8",
        }}
      >
        <div style={{ fontSize: 30, fontWeight: 700, letterSpacing: 5, color: "#c8e66a" }}>{eyebrow.toUpperCase()}</div>
        <div style={{ marginTop: 24, fontSize: title.length > 70 ? 56 : 66, fontWeight: 800, lineHeight: 1.1 }}>{title}</div>
        <div style={{ marginTop: 36, fontSize: 32, opacity: 0.85 }}>{`${site.name} · Dasna, Ghaziabad · Delhi NCR`}</div>
        <div style={{ marginTop: 16, fontSize: 30, fontWeight: 700 }}>{`Call / WhatsApp ${site.phoneDisplay}`}</div>
      </div>
    ),
    ogSize,
  )
}
