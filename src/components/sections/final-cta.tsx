import { MessageCircle, Phone } from "lucide-react"
import { QuoteFormLazy } from "@/components/sections/quote-form-lazy"
import { phoneHref, site, whatsappHref } from "@/lib/site"

const actionBtn =
  "inline-flex h-14 w-full items-center justify-center gap-3 rounded-full px-7 text-base font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background sm:w-auto"

/** Transparent card with a dotted border: contact text + call/WhatsApp buttons on the left, request-a-call form on the right. */
export function FinalCta() {
  return (
    <section id="quote" className="p-2 sm:p-4">
      <div className="reveal rounded-[1.75rem] border-2 border-dotted border-primary/60 sm:rounded-[2.5rem]">
        <div className="mx-auto grid max-w-[90rem] items-center gap-10 px-4 py-12 text-foreground sm:px-8 sm:py-14 lg:grid-cols-2 lg:gap-16 lg:px-14 lg:py-16">
          {/* Text + contact actions (left) */}
          <div className="text-center lg:text-left">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary">Contact Us</p>
            <h2 className="mt-4 text-balance text-4xl font-medium leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
              Let&apos;s plan your lawn.
            </h2>
            <p className="mx-auto mt-4 max-w-md text-base leading-relaxed text-foreground/75 sm:text-lg lg:mx-0">
              Tell us about your space and we&apos;ll get back to you. Prefer to talk? Call or message us directly.
            </p>

            <div className="mt-8 flex flex-col items-stretch gap-3 sm:flex-row sm:justify-center lg:justify-start">
              <a href={phoneHref} className={`${actionBtn} bg-primary text-primary-foreground hover:bg-primary/90`}>
                <Phone className="size-5" aria-hidden="true" />
                Call {site.phoneDisplay}
              </a>
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className={`${actionBtn} border border-primary/50 text-foreground hover:bg-primary/10`}
              >
                <MessageCircle className="size-5" aria-hidden="true" />
                WhatsApp
              </a>
            </div>
          </div>

          {/* Form (right) */}
          <div className="group rounded-[2rem] border border-primary/30 p-6 sm:p-8">
            {/* hidden once the form shows its thank-you state (that block carries data-sent) */}
            <div className="group-has-[[data-sent]]:hidden">
              <h3 className="text-2xl font-semibold tracking-tight">Request a call back</h3>
              <p className="mb-6 mt-1 text-sm text-foreground/70">Share your details and we&apos;ll call you.</p>
            </div>
            <QuoteFormLazy />
          </div>
        </div>
      </div>
    </section>
  )
}
