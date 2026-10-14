import { MessageCircle, Phone } from "lucide-react"
import { FaqList } from "@/components/sections/faq-list"
import { SectionHeading } from "@/components/shared/section-heading"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { faqs, phoneHref, whatsappHref } from "@/lib/site"

/**
 * Accordion lives in FaqList (client leaf) for a smooth height animation.
 * Left: intro with a big "?" motif. Right: numbered pill rows; the open row fills green.
 */
type Props = {
  items?: readonly { q: string; a: string }[]
  title?: string
  description?: string
}

export function Faq({
  items = faqs,
  title = "Questions? We’ve got answers.",
  description = "Everything people usually ask before turning bare ground into a lush lawn.",
}: Props) {
  return (
    <section id="faq" className="overflow-x-clip px-4 py-16 sm:px-6 sm:py-24 lg:px-10 xl:px-14">
      <div className="mx-auto grid max-w-[90rem] gap-12 lg:grid-cols-[5fr_7fr] lg:gap-20">
        {/* Intro */}
        <div className="lg:self-start">
          <SectionHeading
            eyebrow="FAQ"
            title={title}
            description={description}
          />

          {/* Decorative question mark */}
          <div aria-hidden="true" className="relative mt-8 hidden h-52 w-52 lg:block">
            <span className="absolute inset-0 rounded-[58%_42%_63%_37%/45%_55%_45%_55%] bg-primary/20 -rotate-6" />
            <span className="absolute inset-3 rounded-full border-2 border-dashed border-primary/40" />
            <span className="absolute inset-0 flex items-center justify-center text-[9rem] font-black leading-none text-primary">
              ?
            </span>
          </div>

          <p className="mt-8 text-base font-medium text-foreground/80">Can’t find your answer? Ask us directly.</p>
          <div className="mt-4 flex flex-wrap gap-3">
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(buttonVariants(), "h-12 gap-2 rounded-full bg-accent px-6 text-base font-semibold text-accent-foreground hover:bg-accent/90")}
            >
              <MessageCircle />
              WhatsApp Us
            </a>
            <a
              href={phoneHref}
              className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-primary/50 px-6 text-base font-semibold text-foreground transition-colors hover:bg-primary/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              <Phone className="size-4" aria-hidden="true" />
              Call
            </a>
          </div>
        </div>

        {/* Accordion */}
        <FaqList items={items} />
      </div>
    </section>
  )
}
