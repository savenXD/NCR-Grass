"use client"

import { Fragment, useEffect, useRef, useState, type ReactNode } from "react"
import { ArrowUpRight } from "lucide-react"
import { getLenis } from "@/lib/lenis-store"
import { BeforeAfterSlider } from "@/components/shared/before-after-slider"
import { cn } from "@/lib/utils"
import { audiences } from "@/lib/site"

// Scroll distance (in viewport heights) spent on each option while the stage is pinned
const STEP_SVH = 75
// Dashes per road between two route stops (mobile); they light up one by one as you scroll
const DASHES = 5
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
  const dashes = useRef<(HTMLSpanElement | null)[]>([])
  const activeRef = useRef(0)
  const refill = useRef<() => void>(null)

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

  // Mobile route: fill the dashed road with scroll progress (rAF-throttled, direct attribute writes, no re-renders).
  // Road i (into stop i) is full exactly when stop i becomes active. Unpinned, it just follows the active stop.
  useEffect(() => {
    let frame = 0
    const update = () => {
      frame = 0
      const el = root.current
      if (!el || window.matchMedia("(min-width: 1024px)").matches) return
      let p = activeRef.current
      if (window.matchMedia(PIN_MQ).matches) {
        const step = (window.innerHeight * STEP_SVH) / 100
        p = Math.min(audiences.length - 1, Math.max(0, -el.getBoundingClientRect().top / step))
      }
      dashes.current.forEach((d, k) => {
        if (!d) return
        const road = Math.floor(k / DASHES) // 0-based road, leads into stop road + 1
        const lit = p - road >= ((k % DASHES) + 1) / DASHES - 0.001
        if (lit !== (d.dataset.on === "")) {
          if (lit) d.dataset.on = ""
          else delete d.dataset.on
        }
      })
    }
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }
    refill.current = onScroll
    update()
    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", onScroll)
    return () => {
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onScroll)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [])

  // Unpinned screens have no scroll progress, so re-run the fill when the active stop changes
  useEffect(() => {
    activeRef.current = active
    refill.current?.()
  }, [active])

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
      <div className="hidden min-w-0 lg:block">
        <div
          role="tablist"
          aria-label="Who we serve"
          className="-rotate-2 flex flex-col gap-3 py-2 pr-6"
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
                  "border font-semibold leading-tight transition-colors",
                  isActive ? "border-primary bg-primary text-primary-foreground" : "border-primary/30 text-foreground/80",
                  // tilted stack of cards; the active one slides out and fills green
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
      </div>

      {/* Slider stage */}
      <div className="min-w-0">
      {/* Mobile: the photo sits in a thin "mount" like a field-journal plate; desktop keeps the tilted frames */}
      <div className="relative rounded-[1.75rem] border border-primary/25 p-1.5 sm:mx-8 lg:mx-auto lg:w-full lg:max-w-[calc((100svh-19rem)*16/9)] lg:rounded-none lg:border-0 lg:p-0">
        {/* tilted frames behind */}
        <span aria-hidden="true" className="absolute inset-0 hidden -rotate-3 rounded-[2rem] border-2 border-primary/30 lg:block" />
        <span aria-hidden="true" className="absolute inset-0 hidden rotate-2 rounded-[2rem] bg-primary/15 lg:block" />

        <div className="relative aspect-[16/10] w-full lg:aspect-video">
            {audiences.map((a, i) => {
              const before = a.before
              const after = a.after
              return (
                <div
                  key={a.title}
                  role="tabpanel"
                  id={`aud-panel-${i}`}
                  aria-label={a.title}
                  className={cn(
                    "absolute inset-0 transition-all duration-500",
                    i === active ? "scale-100 opacity-100" : "pointer-events-none invisible scale-95 opacity-0"
                  )}
                >
                  <BeforeAfterSlider
                    className="aspect-auto h-full rounded-[1.375rem] border-0 shadow-xl lg:rounded-[2rem]"
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
          className="absolute -right-6 -top-[5.5rem] z-10 hidden size-24 rotate-12 items-center justify-center rounded-full bg-accent p-2 text-center text-xs font-extrabold uppercase leading-tight tracking-wide text-accent-foreground shadow-lg lg:flex"
        >
          Drag to compare
        </span>
      </div>

      {/* Mobile caption: plate number, title, one line, then the numbered route to switch audiences */}
      <div className="mt-4 px-1 sm:mx-8 lg:hidden">
        <div key={active} className="animate-fade-up flex items-start gap-4" aria-live="polite">
          <span aria-hidden="true" className="text-5xl font-bold leading-none tracking-tighter text-transparent [-webkit-text-stroke:1.5px_var(--color-primary)]">
            {String(active + 1).padStart(2, "0")}
          </span>
          <div className="min-w-0 pt-0.5">
            <h3 className="text-xl font-semibold leading-tight tracking-tight">{audiences[active].title}</h3>
            <p className="mt-1 text-sm text-foreground/70">{audiences[active].text}</p>
          </div>
        </div>

        <div role="tablist" aria-label="Who we serve" className="mt-5 flex items-center">
          {audiences.map((a, i) => {
            const isActive = i === active
            return (
              <Fragment key={a.title}>
                {i > 0 && (
                  <span aria-hidden="true" className="mx-1.5 flex flex-1 items-center gap-1">
                    {Array.from({ length: DASHES }, (_, k) => (
                      <span key={k} className="h-[3px] flex-1 overflow-hidden rounded-full bg-primary/20">
                        <span
                          ref={(el) => {
                            dashes.current[(i - 1) * DASHES + k] = el
                          }}
                          className="block h-full origin-left scale-x-0 rounded-full bg-primary transition-transform duration-300 ease-out data-[on]:scale-x-100 motion-reduce:transition-none"
                        />
                      </span>
                    ))}
                  </span>
                )}
                <button
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  aria-controls={`aud-panel-${i}`}
                  aria-label={a.title}
                  onClick={() => goTo(i)}
                  className={cn(
                    "flex size-11 shrink-0 cursor-pointer items-center justify-center rounded-full border-2 text-sm font-bold transition-colors duration-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                    isActive
                      ? "border-primary bg-primary text-accent"
                      : i < active
                        ? "border-primary text-primary"
                        : "border-primary/35 text-foreground/60"
                  )}
                >
                  {String(i + 1).padStart(2, "0")}
                </button>
              </Fragment>
            )
          })}
        </div>
      </div>
      </div>
      </div>
      </div>
    </div>
  )
}
