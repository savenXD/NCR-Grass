"use client"

import { useEffect, useRef, useState, type ReactNode } from "react"
import { ArrowUpRight } from "lucide-react"
import { getLenis } from "@/lib/lenis-store"
import { BeforeAfterSlider } from "@/components/shared/before-after-slider"
import { cn } from "@/lib/utils"
import { audiences } from "@/lib/site"

// Scroll distance (in viewport heights) spent on each option while the stage is pinned
const STEP_SVH = 75
// Pinning needs a tall screen. On landscape phones / short windows the stage would be cut off, so it flows normally instead.
const PIN_MQ = "(min-height: 640px)"

/**
 * Scroll-pinned editorial showcase. The stage sticks to the viewport while a tall track scrolls
 * past; each STEP_SVH of scrolling selects the next audience (1 -> 4), then the page scrolls on.
 * Big numbered titles on the left (pill tabs on mobile), one 16:9 before/after slider on the right.
 * All four sliders stay in the DOM; only the active one is visible.
 */
export function AudienceShowcase({ header }: { header: ReactNode }) {
  const [active, setActive] = useState(0)
  // Photos are mounted lazily: nothing before the section is near the viewport, then only up to the next audience
  const [near, setNear] = useState(false)
  const [reached, setReached] = useState(0)
  const root = useRef<HTMLDivElement>(null)
  const zones = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const el = root.current
    if (!el) return
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setNear(true)
          io.disconnect()
        }
      },
      { rootMargin: "300px 0px" }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])


  // A thin band at the top of the viewport tells us which scroll zone we are in
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            const i = Number((e.target as HTMLElement).dataset.index)
            setActive(i)
            setReached((r) => Math.max(r, i))
          }
        }
      },
      { rootMargin: "0px 0px -99% 0px" }
    )
    zones.current.forEach((z) => z && io.observe(z))
    return () => io.disconnect()
  }, [])

  function goTo(i: number) {
    if (!window.matchMedia(PIN_MQ).matches) {
      // Not pinned: no scroll zones, just switch the slider
      setActive(i)
      setReached((r) => Math.max(r, i))
      return
    }
    const z = zones.current[i]
    if (!z) return
    // Numeric target: passing the element would also apply the page's scroll-padding-top
    const top = window.scrollY + z.getBoundingClientRect().top + 4
    const lenis = getLenis()
    if (lenis) lenis.scrollTo(top)
    else window.scrollTo({ top, behavior: "smooth" })
  }

  return (
    <div ref={root} className="relative [@media(min-height:640px)]:h-[calc(100svh+var(--pin))]" style={{ "--pin": `${audiences.length * STEP_SVH}svh` } as React.CSSProperties}>
      {/* Scroll zones (invisible) */}
      {audiences.map((a, i) => (
        <div
          key={a.title}
          ref={(el) => {
            zones.current[i] = el
          }}
          data-index={i}
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 hidden [@media(min-height:640px)]:block"
          style={{ top: `${i * STEP_SVH}svh`, height: `${STEP_SVH}svh` }}
        />
      ))}

      <div className="flex flex-col justify-center px-4 py-10 sm:px-6 lg:px-10 xl:px-14 [@media(min-height:640px)]:sticky [@media(min-height:640px)]:top-0 [@media(min-height:640px)]:h-svh [@media(min-height:640px)]:py-6">
        {header}
        <div className="mx-auto mt-6 grid w-full max-w-7xl grid-cols-[minmax(0,1fr)] items-center gap-6 sm:mt-8 lg:mt-10 lg:grid-cols-[5fr_7fr] lg:gap-16">
      {/* Titles */}
      <div className="min-w-0">
        <div
          role="tablist"
          aria-label="Who we serve"
          className="grid grid-cols-2 gap-2 lg:-rotate-2 lg:flex lg:flex-col lg:gap-3 lg:py-2 lg:pr-6"
        >
          {audiences.map((a, i) => {
            const isActive = i === active
            return (
              <button
                key={a.title}
                type="button"
                role="tab"
                id={`aud-tab-${i}`}
                aria-selected={isActive}
                aria-controls={`aud-panel-${i}`}
                onClick={() => goTo(i)}
                className={cn(
                  "group relative cursor-pointer text-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                  // mobile: pills
                  "min-h-12 rounded-full border px-3 text-sm font-semibold leading-tight transition-colors",
                  isActive
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-primary/30 text-foreground/80 hover:bg-card/50",
                  // desktop: tilted stack of cards; the active one slides out and fills green
                  "lg:min-h-0 lg:rounded-[1.75rem] lg:border-2 lg:px-6 lg:py-4 lg:text-left lg:transition-all lg:duration-500 lg:ease-out",
                  isActive
                    ? "lg:translate-x-6 lg:rotate-0 lg:scale-[1.04] lg:border-primary lg:shadow-xl"
                    : cn(
                        "lg:border-dotted lg:border-primary/40 lg:text-foreground/70 lg:hover:translate-x-2 lg:hover:border-primary lg:hover:bg-card/40 lg:hover:text-foreground",
                        i % 2 ? "lg:rotate-1" : "lg:-rotate-1"
                      )
                )}
              >
                <span className="flex items-center justify-center gap-4 lg:justify-start">
                  <span
                    className={cn(
                      "hidden size-10 shrink-0 items-center justify-center rounded-full text-sm font-bold transition-colors duration-500 lg:flex",
                      isActive ? "bg-accent text-accent-foreground" : "bg-primary/15 text-primary"
                    )}
                    aria-hidden="true"
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="lg:flex-1 lg:text-2xl lg:font-semibold lg:leading-tight lg:tracking-tight xl:text-[1.7rem]">
                    {a.title}
                  </span>
                  <ArrowUpRight
                    className={cn(
                      "hidden size-6 shrink-0 transition-all duration-500 lg:block",
                      isActive ? "translate-x-0 opacity-100" : "-translate-x-2 opacity-0"
                    )}
                    aria-hidden="true"
                  />
                </span>
                <span
                  className={cn(
                    "hidden grid-rows-[0fr] transition-[grid-template-rows] duration-500 lg:grid lg:pl-14",
                    isActive && "lg:grid-rows-[1fr]"
                  )}
                >
                  <span className="overflow-hidden">
                    <span className="mt-2 block max-w-xs text-base font-normal leading-relaxed text-primary-foreground/85">
                      {a.text}
                    </span>
                  </span>
                </span>
              </button>
            )
          })}
        </div>
        {/* Mobile description */}
        <p className="mt-4 text-base text-foreground/75 lg:hidden" aria-live="polite">
          {audiences[active].text}
        </p>
      </div>

      {/* Slider stage */}
      <div className="relative mx-2 sm:mx-8 lg:mx-auto lg:w-full lg:max-w-[calc((100svh-19rem)*16/9)]">
        {/* tilted frames behind */}
        <span aria-hidden="true" className="absolute inset-0 -rotate-3 rounded-[2rem] border-2 border-primary/30" />
        <span aria-hidden="true" className="absolute inset-0 rotate-2 rounded-[2rem] bg-primary/15" />

        <div className="relative aspect-video w-full">
            {audiences.map((a, i) => {
              const before = a.before
              const after = a.after
              return (
                <div
                  key={a.title}
                  role="tabpanel"
                  id={`aud-panel-${i}`}
                  aria-labelledby={`aud-tab-${i}`}
                  className={cn(
                    "absolute inset-0 transition-all duration-500",
                    i === active ? "scale-100 opacity-100" : "pointer-events-none invisible scale-95 opacity-0"
                  )}
                >
                  <BeforeAfterSlider
                    className="aspect-auto h-full rounded-[2rem] border-0 shadow-xl"
                    beforeSrc={before}
                    afterSrc={after}
                    beforeAlt={`${a.title} before`}
                    afterAlt={a.alt ?? `${a.title} lawn after`}
                    deferImages={!near || i > reached + 1}
                  />
                </div>
              )
            })}
        </div>

        {/* sticker */}
        <span
          aria-hidden="true"
          className="absolute -right-2 -top-[3.75rem] z-10 flex size-[4.5rem] rotate-12 items-center justify-center rounded-full bg-accent p-2 text-center text-[10px] font-extrabold uppercase leading-tight tracking-wide text-accent-foreground shadow-lg sm:-right-6 sm:-top-[5.5rem] sm:size-24 sm:text-xs"
        >
          Drag to compare
        </span>
      </div>
      </div>
      </div>
    </div>
  )
}
