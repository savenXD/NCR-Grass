"use client"

import { useEffect, useState } from "react"
import { Phone } from "lucide-react"
import { cn } from "@/lib/utils"
import { phoneHref, site } from "@/lib/site"

/**
 * Floating Call button, bottom-right, mobile only. It steps aside (fades out, not tappable) while any element
 * marked `data-hide-call` (the enquiry form) is on screen, so it never covers the submit button.
 */
export function MobileContactBar() {
  const [hidden, setHidden] = useState(false)

  useEffect(() => {
    const targets = new Set<Element>()
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (e.isIntersecting) targets.add(e.target)
        else targets.delete(e.target)
      }
      setHidden(targets.size > 0)
    })
    const watch = () => document.querySelectorAll("[data-hide-call]").forEach((el) => io.observe(el))
    watch()
    // The form is lazy-loaded after first paint, so pick up targets that appear later
    const mo = new MutationObserver(watch)
    mo.observe(document.body, { childList: true, subtree: true })
    return () => {
      io.disconnect()
      mo.disconnect()
    }
  }, [])

  return (
    <a
      href={phoneHref}
      aria-label={`Call ${site.name} on ${site.phoneDisplay}`}
      tabIndex={hidden ? -1 : undefined}
      className={cn(
        "fixed bottom-[max(1rem,env(safe-area-inset-bottom))] right-4 z-40 flex size-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-xl ring-4 ring-background/60 transition-[transform,opacity] active:scale-95 md:hidden",
        hidden && "pointer-events-none opacity-0",
      )}
    >
      <Phone className="size-6" aria-hidden="true" />
    </a>
  )
}
