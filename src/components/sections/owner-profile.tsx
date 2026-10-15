import { MapPin, MessageCircle, Phone } from "lucide-react"
import { Pic } from "@/components/shared/pic"
import { owner } from "@/lib/owner"
import { phoneHref, site } from "@/lib/site"

const btn =
  "inline-flex h-14 w-full items-center justify-center gap-3 rounded-full px-7 text-base font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background sm:w-auto"

const ownerWhatsappHref = `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(owner.whatsappText)}`

/** Main block: square portrait beside name, role, intro and the call / WhatsApp buttons. Server component. */
export function OwnerProfile() {
  return (
    <section className="px-4 py-12 sm:px-6 sm:py-20 lg:px-10 xl:px-14">
      <div className="mx-auto grid max-w-6xl items-center gap-8 sm:gap-10 lg:grid-cols-[minmax(0,26rem)_1fr] lg:gap-16">
        <div className="reveal mx-auto w-full max-w-md rounded-[2rem] border-2 border-dotted border-primary/50 p-2 sm:p-3 lg:mx-0 lg:max-w-none">
          <div className="relative aspect-square overflow-hidden rounded-[1.5rem]">
            <Pic
              src={owner.photo}
              alt={owner.photoAlt}
              sizes="(min-width: 1024px) 416px, (min-width: 640px) 448px, calc(100vw - 48px)"
              eager
            />
          </div>
        </div>

        <div className="reveal reveal-d1 text-left">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary">{owner.role}</p>
          <h2 className="mt-2 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">{owner.name}</h2>
          <p className="mt-4 inline-flex items-center gap-2 rounded-full border border-border px-4 py-1.5 text-sm text-foreground/75">
            <MapPin className="size-4 text-primary" aria-hidden="true" />
            Based in Dasna, Ghaziabad
          </p>
          <p className="mt-6 max-w-xl text-pretty text-lg leading-relaxed text-foreground/80 sm:text-xl">{owner.intro}</p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a href={phoneHref} className={`${btn} bg-primary text-primary-foreground hover:bg-primary/90`}>
              <Phone className="size-5" aria-hidden="true" />
              Call {owner.firstName}
            </a>
            <a
              href={ownerWhatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className={`${btn} border border-primary/50 text-foreground hover:bg-primary/10`}
            >
              <MessageCircle className="size-5" aria-hidden="true" />
              WhatsApp {owner.firstName}
            </a>
          </div>
          <p className="mt-3 text-sm text-muted-foreground">{site.phoneDisplay}</p>
        </div>
      </div>
    </section>
  )
}
