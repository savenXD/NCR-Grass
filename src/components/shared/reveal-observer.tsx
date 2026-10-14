"use client"

import { useEffect } from "react"
import { usePathname } from "next/navigation"

const SELECTOR = ".reveal, .reveal-zoom, .reveal-words"

/** Adds .is-visible to reveal elements as they scroll into view (once). Renders nothing. */
export function RevealObserver() {
  const pathname = usePathname()

  useEffect(() => {
    document.documentElement.classList.add("reveal-ready")
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add("is-visible")
            io.unobserve(e.target)
          }
        }
      },
      { rootMargin: "0px 0px -10% 0px" }
    )
    const observeNew = () =>
      document.querySelectorAll(SELECTOR).forEach((el) => {
        if (!el.classList.contains("is-visible")) io.observe(el) // observing twice is a no-op
      })
    observeNew()
    // Content that streams in after hydration (Suspense, lazy sections) would otherwise stay at opacity 0 forever
    let scan = 0
    const mo = new MutationObserver(() => {
      if (!scan) scan = requestAnimationFrame(() => ((scan = 0), observeNew(), observePills()))
    })
    mo.observe(document.body, { childList: true, subtree: true })

    // Inline pills: grow in one at a time, in reading order, even if several are on screen together
    let nextAt = 0
    const timers: number[] = []
    const pillIo = new IntersectionObserver(
      (entries) => {
        const hits = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => (a.target.compareDocumentPosition(b.target) & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1))
        for (const e of hits) {
          pillIo.unobserve(e.target)
          const now = performance.now()
          const start = Math.max(now + 60, nextAt)
          nextAt = start + 140
          timers.push(window.setTimeout(() => e.target.classList.add("is-visible"), start - now))
        }
      },
      { rootMargin: "0px 0px -15% 0px" }
    )
    const observePills = () =>
      document.querySelectorAll(".pill-grow").forEach((el) => {
        if (!el.classList.contains("is-visible")) pillIo.observe(el)
      })
    observePills()

    return () => {
      mo.disconnect()
      if (scan) cancelAnimationFrame(scan)
      io.disconnect()
      pillIo.disconnect()
      timers.forEach(clearTimeout)
    }
  }, [pathname])

  return null
}
