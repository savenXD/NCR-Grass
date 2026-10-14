"use client"

import { useEffect, useRef } from "react"
import { Pic } from "@/components/shared/pic"
import { ClipboardCheck, Sprout, Truck, Warehouse, type LucideIcon } from "lucide-react"

export type JourneyItem = { title: string; text: string; image?: string; alt: string }

const icons: LucideIcon[] = [Sprout, Truck, Warehouse, ClipboardCheck]

// Pinning needs a tall screen; on short ones (landscape phones) the strip is a plain swipeable row instead
const PIN_MQ = "(min-height: 640px)"

// Share of the pinned scroll spent holding at the start/end so the first and last cards settle
const HOLD = 0.04

/**
 * Mobile/tablet "farm to lawn" journey. A tall track pins a stage to the viewport; vertical scroll
 * progress slides the card strip sideways until the 4th card is fully in view, then the page scrolls on.
 * Updates the transform directly in a passive, rAF-throttled scroll handler (no React re-renders).
 */
export function WhyChooseUsJourney({ items }: { items: JourneyItem[] }) {
  const track = useRef<HTMLDivElement>(null)
  const viewport = useRef<HTMLDivElement>(null)
  const strip = useRef<HTMLUListElement>(null)
  const bar = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    let frame = 0
    const update = () => {
      frame = 0
      const t = track.current
      const v = viewport.current
      const s = strip.current
      if (!t || !v || !s) return
      if (!window.matchMedia(PIN_MQ).matches) {
        s.style.transform = ""
        if (bar.current) bar.current.style.transform = "scaleX(0)"
        return
      }
      const rect = t.getBoundingClientRect()
      const scrollable = rect.height - window.innerHeight
      const raw = scrollable > 0 ? -rect.top / scrollable : 0
      const p = Math.min(1, Math.max(0, (raw - HOLD) / (1 - 2 * HOLD)))
      const max = Math.max(0, s.scrollWidth - v.clientWidth)
      s.style.transform = `translate3d(${-p * max}px,0,0)`
      if (bar.current) bar.current.style.transform = `scaleX(${p})`
    }
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }
    update()
    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", onScroll)
    return () => {
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onScroll)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [])

  return (
    <div ref={track} className="relative mt-6 lg:hidden [@media(min-height:640px)]:h-[calc(100svh+110svh)]">
      <div className="flex flex-col justify-center gap-8 py-10 [@media(min-height:640px)]:sticky [@media(min-height:640px)]:top-0 [@media(min-height:640px)]:h-svh [@media(min-height:640px)]:overflow-hidden [@media(min-height:640px)]:py-0">
        <div ref={viewport} className="overflow-x-auto [@media(min-height:640px)]:overflow-hidden">
          <ul ref={strip} className="flex w-max gap-5 px-4 will-change-transform sm:px-6">
            {items.map((r, i) => {
              const Icon = icons[i % icons.length]
              const last = i === items.length - 1
              return (
                <li key={r.title} className="flex w-[78vw] max-w-[24rem] shrink-0 flex-col">
                  {/* Route row: numbered stop + dashed road to the next stop */}
                  <div className="mb-4 flex items-center" style={{ width: last ? "auto" : "calc(100% + 1.25rem)" }}>
                    <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-primary text-accent ring-[6px] ring-primary/15">
                      <Icon className="size-5" aria-hidden="true" />
                    </span>
                    {!last && <span aria-hidden="true" className="ml-2 h-0 flex-1 border-t-[3px] border-dashed border-primary/60" />}
                  </div>

                  <div className="flex flex-1 flex-col gap-3 rounded-[2rem] border border-primary/30 p-3">
                    <div className="relative aspect-[4/3] overflow-hidden rounded-[1.5rem]">
                      {r.image && <Pic src={r.image} alt={r.alt} sizes="(min-width: 640px) 24rem, 78vw" />}
                    </div>
                    <div className="px-2 pb-2">
                      <p aria-hidden="true" className="text-sm font-bold text-primary">
                        {String(i + 1).padStart(2, "0")}
                      </p>
                      <h3 className="mt-1 text-2xl font-bold leading-tight tracking-tight text-primary">{r.title}</h3>
                      <p className="mt-2 text-base font-medium leading-relaxed text-foreground/90">{r.text}</p>
                    </div>
                  </div>
                </li>
              )
            })}
          </ul>
        </div>

        {/* Progress */}
        <div aria-hidden="true" className="mx-4 hidden h-1 overflow-hidden [@media(min-height:640px)]:block rounded-full bg-primary/15 sm:mx-6">
          <span ref={bar} className="block h-full origin-left scale-x-0 will-change-transform rounded-full bg-primary" />
        </div>
      </div>
    </div>
  )
}
