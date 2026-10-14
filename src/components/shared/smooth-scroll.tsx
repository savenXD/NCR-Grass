"use client"

import { useEffect, useState } from "react"
import dynamic from "next/dynamic"

// Separate chunk: only fetched when we decide to start Lenis
const LenisRoot = dynamic(() => import("@/components/shared/lenis-root"), { ssr: false })

const PRECISE_POINTER = "(hover: hover) and (pointer: fine)"
const REDUCED_MOTION = "(prefers-reduced-motion: reduce)"

/**
 * Smooth, inertial scrolling (Lenis) for mouse/trackpad users only.
 * Phones and tablets use native scrolling (Lenis doesn't smooth touch anyway), and the CSS
 * `scroll-behavior: smooth` handles anchor links there. So mobile never downloads the library.
 * On desktop it starts after the page is idle, so it can't compete with the hero image (LCP).
 */
export function SmoothScroll() {
  const [on, setOn] = useState(false)

  useEffect(() => {
    if (!window.matchMedia(PRECISE_POINTER).matches || window.matchMedia(REDUCED_MOTION).matches) return
    const start = () => setOn(true)
    if (typeof window.requestIdleCallback === "function") {
      const id = window.requestIdleCallback(start, { timeout: 3000 })
      return () => window.cancelIdleCallback(id)
    }
    const id = window.setTimeout(start, 1500)
    return () => window.clearTimeout(id)
  }, [])

  return on ? <LenisRoot /> : null
}
