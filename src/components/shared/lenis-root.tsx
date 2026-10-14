"use client"

import { useEffect } from "react"
import { ReactLenis, useLenis } from "lenis/react"
import { setLenis } from "@/lib/lenis-store"

function Register() {
  const lenis = useLenis()
  useEffect(() => {
    setLenis(lenis ?? null)
    return () => setLenis(null)
  }, [lenis])
  return null
}

/** Lazy-loaded by smooth-scroll.tsx. Not imported anywhere else, so it stays out of the main bundle. */
export default function LenisRoot() {
  return (
    <ReactLenis root options={{ duration: 1.2, anchors: true }}>
      <Register />
    </ReactLenis>
  )
}
