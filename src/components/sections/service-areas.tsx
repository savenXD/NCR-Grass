import Link from "next/link"
import { ArrowRight, MapPin } from "lucide-react"
import { SectionHeading } from "@/components/shared/section-heading"
import { indiaMap } from "@/lib/india-map"
import { areas } from "@/lib/site"

/** Static inline-SVG map of India with the northern states highlighted. No JS, no image request. */
export function ServiceAreas() {
  const { width, height, delhi } = indiaMap

  return (
    <section id="areas" className="overflow-x-clip px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
      <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <div>
          <SectionHeading
            eyebrow="Service areas"
            title="Serving almost all of North India"
            description="From the plains of Punjab and Haryana to the hills of Himachal and Uttarakhand, our team delivers and lays natural grass across the region."
          />
          <ul className="reveal reveal-d1 mt-8 flex flex-wrap gap-2.5">
            {areas.map((a) => (
              <li
                key={a}
                className="inline-flex min-h-12 items-center gap-2 rounded-full border border-foreground/30 bg-transparent px-5 text-sm font-medium text-foreground select-none transition-transform duration-200 ease-out hover:scale-105 cursor-default"
              >
                <MapPin className="size-4 text-primary" aria-hidden="true" />
                {a}
              </li>
            ))}
          </ul>
          <Link
            href="/contact"
            className="mt-8 inline-flex h-12 items-center gap-3 rounded-full bg-primary py-1 pl-6 pr-1 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Check if we cover your area
            <span className="flex size-10 items-center justify-center rounded-full bg-accent text-accent-foreground">
              <ArrowRight className="size-4" aria-hidden="true" />
            </span>
          </Link>
        </div>

        <figure className="reveal-zoom relative mx-auto w-full max-w-md lg:max-w-none">
          <svg
            viewBox={`0 0 ${width} ${height}`}
            role="img"
            aria-label="Map of India with the northern states highlighted as NCR Grass service areas, and Delhi NCR marked as the express delivery area"
            className="h-auto w-full"
          >
            {/* Outlines come from /india-map.svg (see app/india-map.svg/route.ts); fill/stroke inherit from here */}
            <g strokeLinejoin="round" strokeWidth={1.4} className="stroke-background">
              <use href="/india-map.svg#other" className="fill-primary/60" />
              <use href="/india-map.svg#north" className="fill-primary" />
            </g>

            {/* Delhi NCR hub marker */}
            <g>
              <circle cx={delhi.x} cy={delhi.y} r={7} className="fill-accent stroke-primary" strokeWidth={2.5} />
              <line x1={delhi.x + 9} y1={delhi.y - 6} x2={delhi.x + 70} y2={delhi.y - 63} className="stroke-foreground" strokeWidth={1.5} />
              <rect x={delhi.x + 70} y={delhi.y - 86} width={190} height={46} rx={23} className="fill-accent" />
              <text x={delhi.x + 165} y={delhi.y - 65} textAnchor="middle" className="fill-accent-foreground text-[18px] font-bold">
                Delhi NCR
              </text>
              <text x={delhi.x + 165} y={delhi.y - 48} textAnchor="middle" className="fill-accent-foreground text-[12px] font-medium">
                Express delivery area
              </text>
            </g>
          </svg>
          <figcaption className="mt-3 flex items-center justify-center gap-5 text-xs font-medium text-foreground/70">
            <span className="flex items-center gap-2">
              <span className="size-3 rounded-sm bg-primary" aria-hidden="true" /> North India (core)
            </span>
            <span className="flex items-center gap-2">
              <span className="size-3 rounded-sm bg-primary/60" aria-hidden="true" /> Other states
            </span>
          </figcaption>
        </figure>
      </div>
    </section>
  )
}
