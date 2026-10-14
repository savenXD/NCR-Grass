import Link from "next/link"
import { MapPin, Phone } from "lucide-react"
import { SectionHeading } from "@/components/shared/section-heading"
import { phoneHref, services, site } from "@/lib/site"

type Props = {
  place: string
  title: string
  items: readonly string[]
}

/** Localities covered + the services available there. Plain crawlable text, no JS. */
export function LocalityList({ place, title, items }: Props) {
  return (
    <section className="px-4 py-16 sm:px-6 sm:py-24 lg:px-10 xl:px-14">
      <div className="mx-auto grid max-w-[90rem] gap-12 lg:grid-cols-2 lg:gap-20">
        <div>
          <SectionHeading eyebrow="Coverage" title={title} />
          <ul className="reveal mt-8 flex flex-wrap gap-2.5">
            {items.map((a) => (
              <li
                key={a}
                className="inline-flex min-h-12 items-center gap-2 rounded-full border border-foreground/30 px-5 text-sm font-medium"
              >
                <MapPin className="size-4 text-primary" aria-hidden="true" />
                {a}
              </li>
            ))}
          </ul>
          <p className="reveal mt-6 text-base text-foreground/75">
            Area not listed? Call{" "}
            <a href={phoneHref} className="inline-flex items-center gap-1 font-semibold text-primary underline-offset-4 hover:underline">
              <Phone className="size-4" aria-hidden="true" />
              {site.phoneDisplay}
            </a>{" "}
            and we will confirm.
          </p>
        </div>

        <div>
          <SectionHeading eyebrow="Services" title={`Our lawn services in ${place}`} />
          <ul className="mt-8 flex flex-col">
            {services.map((s) => (
              <li key={s.title} className="reveal border-b border-primary/15 py-5 last:border-b-0">
                <h3 className="text-lg font-semibold tracking-tight sm:text-xl">
                  {s.title} in {place}
                </h3>
                <p className="mt-1 text-base leading-relaxed text-foreground/75">{s.text}</p>
              </li>
            ))}
          </ul>
          <Link href="/services" className="reveal mt-4 inline-flex min-h-12 items-center font-semibold text-primary underline-offset-4 hover:underline">
            See all services
          </Link>
        </div>
      </div>
    </section>
  )
}
