"use client"

import { useEffect } from "react"
import { reportError } from "@/lib/report-error"
import { phoneHref, site, whatsappHref } from "@/lib/site"

/** Last resort: the root layout itself crashed. Self-contained (no Tailwind classes depend on the layout), still one tap from calling. */
export default function GlobalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => reportError(error), [error])
  const btn = { display: "inline-flex", alignItems: "center", minHeight: 48, padding: "0 24px", borderRadius: 999, fontWeight: 600, textDecoration: "none", border: "1px solid #1f5a32", color: "#14361f", background: "transparent" } as const
  return (
    <html lang="en-IN">
      <body style={{ margin: 0, fontFamily: "system-ui, sans-serif", background: "#c4e0ae", color: "#14361f" }}>
        <main style={{ minHeight: "100svh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 24, padding: 24, textAlign: "center" }}>
          <h1 style={{ margin: 0, fontSize: 32 }}>Something went wrong</h1>
          <p style={{ margin: 0, maxWidth: 420 }}>Sorry about that. Please try again, or reach us directly and we will help.</p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 12, justifyContent: "center" }}>
            <button type="button" onClick={reset} style={{ ...btn, background: "#1f5a32", color: "#fff", cursor: "pointer", border: "none", fontSize: 16 }}>
              Try again
            </button>
            <a href={phoneHref} style={btn}>
              {site.phoneDisplay}
            </a>
            <a href={whatsappHref} style={btn}>
              WhatsApp
            </a>
          </div>
        </main>
      </body>
    </html>
  )
}
