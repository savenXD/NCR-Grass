"use client"

import { useEffect } from "react"
import { MessageCircle, Phone } from "lucide-react"
import { reportError } from "@/lib/report-error"
import { phoneHref, site, whatsappHref } from "@/lib/site"

/** Shown if something breaks while rendering a page. Keeps the visitor one tap from calling us. */
export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => reportError(error), [error])
  return (
    <main className="flex min-h-[70svh] flex-col items-center justify-center gap-6 px-4 py-24 text-center">
      <h1 className="text-balance text-3xl font-semibold tracking-tight sm:text-5xl">Something went wrong</h1>
      <p className="max-w-md text-base text-foreground/75 sm:text-lg">
        Sorry about that. Please try again, or reach us directly and we will help.
      </p>
      <div className="flex flex-wrap justify-center gap-3">
        <button
          type="button"
          onClick={reset}
          className="inline-flex h-12 items-center rounded-full bg-primary px-6 font-semibold text-primary-foreground hover:bg-primary/90"
        >
          Try again
        </button>
        <a href={phoneHref} className="inline-flex h-12 items-center gap-2 rounded-full border border-primary/50 px-6 font-semibold">
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
    </main>
  )
}
