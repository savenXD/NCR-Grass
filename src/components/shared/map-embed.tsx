"use client"

import { useState } from "react"
import { MapPin } from "lucide-react"

/**
 * Google Maps iframe that loads only after a tap (saves about 1 MB and a third-party connection on every visit).
 * The placeholder fills the same box, so nothing shifts when the map appears.
 */
export function MapEmbed({ src, title }: { src: string; title: string }) {
  const [on, setOn] = useState(false)

  if (on) {
    return (
      <iframe
        src={src}
        title={title}
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
        className="absolute inset-0 size-full border-0"
      />
    )
  }

  return (
    <button
      type="button"
      onClick={() => setOn(true)}
      className="absolute inset-0 flex size-full cursor-pointer flex-col items-center justify-center gap-3 bg-[radial-gradient(circle_at_center,oklch(0.3_0.05_150),oklch(0.2_0.03_150))] text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-white"
    >
      <span className="flex size-14 items-center justify-center rounded-full bg-accent text-accent-foreground">
        <MapPin className="size-6" aria-hidden="true" />
      </span>
      <span className="text-base font-semibold">Tap to load the map</span>
      <span className="max-w-[16rem] text-center text-sm text-white/70">Loads Google Maps, which may set its own cookies.</span>
    </button>
  )
}
