import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { SectionHeading } from "@/components/shared/section-heading"
import { locationHref, type LocationPage } from "@/lib/locations"

type Props = {
  eyebrow?: string
  title: string
  description?: string
  items: readonly LocationPage[]
}

/** Grid of links to location pages (internal linking for local SEO). Server component. */
export function AreaLinks({ eyebrow, title, description, items }: Props) {
  return (
    <section className="px-4 py-16 sm:px-6 sm:py-24 lg:px-10 xl:px-14">
      <div className="mx-auto max-w-[90rem]">
        <SectionHeading eyebrow={eyebrow} title={title} description={description} />
        <ul className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((l) => (
            <li key={l.slug} className="reveal">
              <Link
                href={locationHref(l.slug)}
                className="group flex min-h-20 items-center justify-between gap-4 rounded-[1.75rem] border border-primary/25 px-6 py-4 transition-colors hover:border-primary hover:bg-primary/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <span>
                  <span className="block text-lg font-semibold tracking-tight sm:text-xl">Lawn grass in {l.name}</span>
                  <span className="mt-0.5 block text-sm text-foreground/70">
                    {l.kind === "state" ? "Supply & installation across the state" : `Supply & installation · ${l.state}`}
                  </span>
                </span>
                <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground transition-transform group-hover:rotate-45">
                  <ArrowUpRight className="size-5" aria-hidden="true" />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
