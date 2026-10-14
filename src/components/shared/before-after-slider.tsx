"use client"

import { useState } from "react"
import { Pic } from "@/components/shared/pic"
import { ChevronsLeftRight } from "lucide-react"
import { cn } from "@/lib/utils"

type Props = {
  beforeSrc?: string
  afterSrc?: string
  beforeAlt?: string
  afterAlt?: string
  className?: string
  /** Render the frame without fetching the photos yet (they mount, and load, when this turns false) */
  deferImages?: boolean
  /** Shows an "Illustration" chip. Turn off once the photos are real project photos. */
  illustration?: boolean
}

// Half-width of the diagonal split, in % of the slider width
const TILT = 6

export function BeforeAfterSlider({ beforeSrc, afterSrc, beforeAlt = "", afterAlt = "", className, deferImages = false, illustration = true }: Props) {
  const [pos, setPos] = useState(50)

  return (
    <div className={cn("relative aspect-[4/3] w-full select-none overflow-hidden rounded-3xl border border-border", className)}>
      {/* After (full) */}
      {deferImages ? (
        <div className="absolute inset-0 bg-primary/15" />
      ) : afterSrc ? (
        <Pic src={afterSrc} alt={afterAlt} sizes="(min-width: 1024px) 560px, 100vw" />
      ) : (
        <div className="absolute inset-0 flex items-center justify-end bg-gradient-to-br from-primary/70 to-accent/70 pr-[12%] text-sm font-medium text-white">
          After photo placeholder
        </div>
      )}
      {/* Before (clipped) */}
      <div className="absolute inset-0" style={{ clipPath: `polygon(0 0, ${pos + TILT}% 0, ${pos - TILT}% 100%, 0 100%)` }}>
        {deferImages ? (
          <div className="size-full bg-primary/25" />
        ) : beforeSrc ? (
          <Pic src={beforeSrc} alt={beforeAlt} sizes="(min-width: 1024px) 560px, 100vw" />
        ) : (
          <div className="flex size-full items-center justify-start bg-gradient-to-br from-stone-500 to-amber-900/80 pl-[12%] text-sm font-medium text-white">
            Before photo placeholder
          </div>
        )}
      </div>

      <span className="absolute left-4 top-4 rounded-full bg-black/70 px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-widest text-white shadow-md">
        Before
      </span>
      <span className="absolute right-4 top-4 rounded-full bg-primary px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-widest text-accent shadow-md">
        After
      </span>

      {illustration && (
        <span className="absolute bottom-4 left-4 rounded-full bg-black/60 px-3 py-1 text-[11px] font-medium text-white/90 backdrop-blur-sm">
          Illustration
        </span>
      )}

      {/* Tilted divider + handle */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="size-full overflow-visible">
          <line
            x1={pos + TILT}
            y1={0}
            x2={pos - TILT}
            y2={100}
            stroke="white"
            strokeWidth={3}
            vectorEffect="non-scaling-stroke"
            style={{ filter: "drop-shadow(0 0 3px rgb(0 0 0 / 0.35))" }}
          />
        </svg>
        <span
          className="absolute top-1/2 flex size-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-white bg-primary text-primary-foreground shadow-lg"
          style={{ left: `${pos}%` }}
        >
          <ChevronsLeftRight className="size-5" />
        </span>
      </div>

      <input
        type="range"
        min={0}
        max={100}
        value={pos}
        onChange={(e) => setPos(Number(e.target.value))}
        aria-label="Compare before and after"
        className="absolute inset-0 size-full cursor-ew-resize touch-pan-y opacity-0"
      />
    </div>
  )
}
