"use client"

import { useEffect, useRef, useState, type ComponentType } from "react"
import { MessageCircle, Phone } from "lucide-react"
import { phoneHref, site, whatsappHref } from "@/lib/site"

/**
 * Loads the real form (React Hook Form + Zod, ~70 KB of JS) only when the visitor is near it
 * or touches it, so it never competes with the hero image on first load.
 * Height is reserved (measured: 384px on phones, 224px from `sm`) so nothing jumps.
 * If the script can't load (bad network), Call/WhatsApp are shown instead of a dead box.
 */
export function QuoteFormLazy() {
  const box = useRef<HTMLDivElement>(null)
  const [wanted, setWanted] = useState(false)
  const [Form, setForm] = useState<ComponentType | null>(null)
  const [failed, setFailed] = useState(false)

  useEffect(() => {
    const el = box.current
    if (!el || wanted) return
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setWanted(true)
      },
      { rootMargin: "800px 0px" }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [wanted])

  useEffect(() => {
    if (!wanted) return
    let cancelled = false
    import("@/components/sections/quote-form")
      .then((m) => !cancelled && setForm(() => m.QuoteForm))
      .catch(() => !cancelled && setFailed(true))
    return () => {
      cancelled = true
    }
  }, [wanted])

  if (Form) return <Form />

  return (
    <div
      ref={box}
      onPointerEnter={() => setWanted(true)}
      onFocusCapture={() => setWanted(true)}
      className="min-h-96 sm:min-h-56"
    >
      {failed ? (
        <div role="alert" className="flex flex-col gap-4 text-foreground">
          <p>The form could not load. Please call or WhatsApp us instead.</p>
          <div className="flex flex-wrap gap-3">
            <a href={phoneHref} className="inline-flex h-12 items-center gap-2 rounded-full bg-primary px-6 font-semibold text-primary-foreground">
              <Phone className="size-4" aria-hidden="true" />
              {site.phoneDisplay}
            </a>
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-12 items-center gap-2 rounded-full border border-primary/50 px-6 font-semibold"
            >
              <MessageCircle className="size-4" aria-hidden="true" />
              WhatsApp
            </a>
          </div>
        </div>
      ) : (
        <noscript>
          <p className="text-foreground">Please call or WhatsApp us on {site.phoneDisplay} to request a call back.</p>
        </noscript>
      )}
    </div>
  )
}
