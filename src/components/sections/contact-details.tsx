import { MapPin, MessageCircle, Navigation, Phone, type LucideIcon } from "lucide-react"
import { directionsHref, phoneHref, site, whatsappHref } from "@/lib/site"

type Tile = { label: string; value: string; href?: string; icon: LucideIcon; external?: boolean }

export function ContactDetails() {
  const tiles: Tile[] = [
    { label: "Call us", value: site.phoneDisplay, href: phoneHref, icon: Phone },
    { label: "WhatsApp", value: "Chat with us", href: whatsappHref, icon: MessageCircle, external: true },
    { label: "Directions", value: "Open in Google Maps", href: directionsHref, icon: Navigation, external: true },
    { label: "Visit", value: site.address, icon: MapPin },
  ]
  return (
    <section className="px-4 pb-16 pt-6 sm:px-6 sm:pb-24 lg:px-10 xl:px-14">
      <ul className="mx-auto grid max-w-[90rem] gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {tiles.map(({ label, value, href, icon: Icon, external }) => {
          const body = (
            <>
              <span className="flex size-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
                <Icon className="size-5" aria-hidden="true" />
              </span>
              <span className="mt-5 block text-sm font-semibold uppercase tracking-[0.18em] text-primary">{label}</span>
              <span className="mt-1 block break-words text-lg font-medium">{value}</span>
            </>
          )
          const cls = "block h-full rounded-[2rem] border-2 border-dotted border-primary/50 p-6"
          return (
            <li key={label} className="reveal">
              {href ? (
                <a
                  href={href}
                  {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className={`${cls} transition-colors hover:border-solid hover:bg-primary/10`}
                >
                  {body}
                </a>
              ) : (
                <div className={cls}>{body}</div>
              )}
            </li>
          )
        })}
      </ul>
    </section>
  )
}
