import { Fragment } from "react"
import { ClipboardCheck, ImageIcon, Sprout, Truck, Warehouse, type LucideIcon } from "lucide-react"
import { SectionHeading } from "@/components/shared/section-heading"
import { cn } from "@/lib/utils"
import { reasons, whatsappHref } from "@/lib/site"
import { WhyChooseUsJourney } from "@/components/sections/why-choose-us-journey"
import { Pic } from "@/components/shared/pic"
import { WhatsappIcon } from "@/components/shared/whatsapp-icon"

const icons: LucideIcon[] = [Sprout, Truck, Warehouse, ClipboardCheck]

type Tile = { variant: "overlay" | "split"; className: string; splitRow?: string }

/** Bento layout per reason (by index). Desktop: 12-col grid, rows of 17rem. */
const tiles: Tile[] = [
  // Big hero tile: photo fills it, text over a dark fade
  { variant: "overlay", className: "aspect-[4/3] sm:col-span-2 sm:aspect-[16/10] lg:col-span-7 lg:row-span-2 lg:aspect-auto" },
  // Outlined split tile: photo + text side by side on desktop
  { variant: "split", className: "lg:col-span-5", splitRow: "lg:flex-row" },
  { variant: "split", className: "lg:col-span-5", splitRow: "lg:flex-row" },
  { variant: "split", className: "sm:col-span-2 lg:col-span-8", splitRow: "sm:flex-row" },
]

/**
 * Bento grid: mixed tile sizes (big photo tile, outlined split tiles, photo tiles) plus one
 * text-only statement tile. Deliberately not a row of equal cards.
 */
/**
 * The desktop grid and the mobile journey (why-choose-us-journey.tsx) both render these reasons, one per viewport.
 * The journey owns the real <h3>s (Google indexes the mobile layout); the desktop titles use role="heading"
 * so screen readers still get headings without the same <h3>s appearing twice in the HTML.
 */
export function WhyChooseUs() {
  return (
    <section id="why-choose-us" className="pt-16 sm:pt-24 lg:px-10 lg:pb-24 xl:px-14">
      <div className="mx-auto max-w-[90rem] px-4 sm:px-6 lg:px-0">
        <SectionHeading
          eyebrow="Why choose us"
          title="Why choose NCR Grass"
          description="Fresh natural grass, easy delivery and a team that plans your lawn with you."
        />

        <ul className="mt-14 hidden gap-5 lg:grid lg:auto-rows-[17rem] lg:grid-cols-12">
          {reasons.map((r, i) => {
            const Icon = icons[i % icons.length]
            const t = tiles[i % tiles.length]
            const img = r.image
            const number = String(i + 1).padStart(2, "0")
            const photo = (sizes: string) =>
              img ? (
                <Pic src={img} alt={r.imageAlt ?? r.title} sizes={sizes} />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center text-primary/40">
                  <ImageIcon className="size-8" aria-hidden="true" />
                </div>
              )

            return (
              <Fragment key={r.title}>
                {/* Text-only statement tile, placed before the last reason */}
                {i === 3 && <StatementTile />}

                <li className={cn("reveal relative", ["", "reveal-d1", "reveal-d2", "reveal-d1"][i % 4], t.className)}>
                  {t.variant === "overlay" ? (
                    <div className="relative isolate flex size-full flex-col justify-between overflow-hidden rounded-[2rem] border border-primary/30 p-3 transition-colors hover:border-primary/60 sm:p-4">
                      <div className="absolute inset-0 -z-20">
                        {photo(i === 0 ? "(min-width: 1024px) 55vw, 92vw" : "(min-width: 1024px) 40vw, (min-width: 640px) 45vw, 92vw")}
                      </div>
                      <div className="flex items-center justify-between p-2">
                        <span className="flex size-11 items-center justify-center rounded-full bg-background/90 text-primary shadow-sm backdrop-blur-md">
                          <Icon className="size-5" aria-hidden="true" />
                        </span>
                        <span aria-hidden="true" className="flex h-8 items-center justify-center rounded-full bg-background/90 px-3 text-sm font-bold text-primary shadow-sm backdrop-blur-md">
                          {number}
                        </span>
                      </div>
                      <div className="rounded-[1.5rem] border border-primary/20 bg-background/90 p-5 shadow-lg backdrop-blur-md sm:p-6">
                        <p role="heading" aria-level={3} className={cn("font-bold leading-tight tracking-tight text-primary", i === 0 ? "text-2xl sm:text-3xl lg:text-4xl" : "text-2xl sm:text-3xl")}>
                          {r.title}
                        </p>
                        <p className="mt-2 text-base font-medium leading-relaxed text-foreground/90 sm:text-lg">{r.text}</p>
                      </div>
                    </div>
                  ) : (
                    <div className={cn("flex size-full flex-col gap-3 rounded-[2rem] border border-primary/30 p-3 transition-colors hover:border-primary/60", t.splitRow)}>
                      <div className={cn("relative aspect-[4/3] shrink-0 overflow-hidden rounded-[1.5rem]", t.splitRow === "lg:flex-row" ? "lg:aspect-auto lg:w-[45%]" : "sm:aspect-auto sm:w-1/2")}>
                        {photo("(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 92vw")}
                      </div>
                      <div className="flex flex-1 flex-col justify-between gap-4 px-2 pb-2 pt-2 sm:px-3">
                        <div className="flex items-center justify-between">
                          <span className="flex size-11 items-center justify-center rounded-full bg-primary/10 text-primary">
                            <Icon className="size-5" aria-hidden="true" />
                          </span>
                          <span aria-hidden="true" className="text-sm font-bold text-primary">{number}</span>
                        </div>
                        <div>
                          <p role="heading" aria-level={3} className="text-2xl font-bold leading-tight tracking-tight text-primary">{r.title}</p>
                          <p className="mt-2 text-base font-medium leading-relaxed text-foreground/90">{r.text}</p>
                        </div>
                      </div>
                    </div>
                  )}
                </li>
              </Fragment>
            )
          })}
        </ul>
      </div>

      {/* Phones and tablets: pinned sideways journey (desktop uses the bento grid above) */}
      <WhyChooseUsJourney
        items={reasons.map((r) => ({
          title: r.title,
          text: r.text,
          image: r.image,
          alt: r.imageAlt ?? r.title,
        }))}
      />
    </section>
  )
}

/** Outlined text tile with the hero's lime-box accent and a WhatsApp nudge. */
function StatementTile() {
  return (
    <li className="reveal reveal-d2 sm:col-span-2 lg:col-span-4">
      <div className="flex size-full flex-col justify-between gap-6 rounded-[2rem] border-2 border-dashed border-primary/40 p-6 sm:p-7">
        <p className="text-2xl font-semibold leading-snug tracking-tight sm:text-3xl">
          From our farm to your lawn,{" "}
          <span className="inline-block -rotate-1 rounded-[0.3em] bg-accent px-[0.25em] text-accent-foreground">
            no middlemen
          </span>{" "}
          in between.
        </p>
        <a
          href={whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex h-12 w-fit items-center gap-2 rounded-full bg-primary px-6 text-base font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
        >
          <WhatsappIcon className="size-5" />
          Book a free site visit
        </a>
      </div>
    </li>
  )
}
