import Link from "next/link"
import { ArrowRight, MessageCircle, Phone } from "lucide-react"
import { phoneHref, whatsappHref } from "@/lib/site"

const btn =
  "inline-flex h-14 w-full items-center justify-center gap-3 rounded-full px-7 text-base font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background sm:w-auto"

/** Closing call-to-action for inner pages. Same dotted-border style as the contact card. */
export function PageCta() {
  return (
    <section className="p-2 pb-4 sm:p-4">
      <div className="reveal rounded-[1.75rem] border-2 border-dotted border-primary/60 px-4 py-14 text-center sm:rounded-[2.5rem] sm:px-8 sm:py-20">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary">Get started</p>
        <h2 className="mx-auto mt-4 max-w-2xl text-balance text-3xl font-medium leading-[1.1] tracking-tight sm:text-5xl">
          Ready for a greener lawn?
        </h2>
        <p className="mx-auto mt-4 max-w-md text-base leading-relaxed text-foreground/75 sm:text-lg">
          Tell us about your space and we&apos;ll get back to you.
        </p>
        <div className="mt-8 flex flex-col items-stretch justify-center gap-3 sm:flex-row">
          <Link href="/contact" className={`${btn} bg-primary text-primary-foreground hover:bg-primary/90`}>
            Request a call
            <ArrowRight className="size-5" aria-hidden="true" />
          </Link>
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className={`${btn} border border-primary/50 text-foreground hover:bg-primary/10`}
          >
            <MessageCircle className="size-5" aria-hidden="true" />
            WhatsApp
          </a>
          <a href={phoneHref} className={`${btn} border border-primary/50 text-foreground hover:bg-primary/10`}>
            <Phone className="size-5" aria-hidden="true" />
            Call
          </a>
        </div>
      </div>
    </section>
  )
}
