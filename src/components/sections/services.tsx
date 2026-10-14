import Link from "next/link"
import { ArrowRight, Droplets, ImageIcon, Shovel, Sprout, Truck, type LucideIcon } from "lucide-react"
import { SectionHeading } from "@/components/shared/section-heading"
import { cn } from "@/lib/utils"
import { services } from "@/lib/site"
import { Pic } from "@/components/shared/pic"

const icons: LucideIcon[] = [Truck, Shovel, Sprout, Droplets]

// Two organic blob silhouettes, alternated per row
const blobs = [
  "rounded-[58%_42%_63%_37%/45%_55%_45%_55%]",
  "rounded-[40%_60%_38%_62%/58%_40%_60%_42%]",
]

/**
 * A winding dashed path links the services. Each image sits on a soft organic blob;
 * 1:1 transparent PNGs overlap the blob's edge. Pure CSS/SVG, no JS.
 */
export function Services() {
  return (
    <section id="services" className="overflow-x-clip px-4 py-16 sm:px-6 sm:py-24 lg:px-10 xl:px-14">
      <div className="mx-auto max-w-[90rem]">
        <SectionHeading
          eyebrow="Services"
          title="Everything from soil to turf"
          description="Buy grass only, or let us handle the whole job end to end."
          className="lg:mx-auto lg:text-center"
        />

        <ol className="mt-14 flex flex-col gap-14 sm:mt-20 lg:gap-24">
          {services.map((s, i) => {
            const flip = i % 2 === 1
            const Icon = icons[i % icons.length]
            const isLast = i === services.length - 1
            return (
              <li
                key={s.title}
                className="reveal relative grid items-center gap-8 pl-16 lg:grid-cols-2 lg:gap-28 lg:pl-0"
              >
                {/* Winding connector to the next service */}
                {!isLast && (
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 100 100"
                    preserveAspectRatio="none"
                    className={cn(
                      "pointer-events-none absolute left-6 top-6 h-[calc(100%+3.5rem)] w-10 -translate-x-1/2 overflow-visible",
                      "lg:left-1/2 lg:top-1/2 lg:h-[calc(100%+6rem)] lg:w-28",
                      flip && "lg:-scale-x-100"
                    )}
                  >
                    <path
                      d="M50 0 C 130 30, -30 70, 50 100"
                      fill="none"
                      strokeWidth={3}
                      strokeDasharray="10 18"
                      strokeLinecap="round"
                      vectorEffect="non-scaling-stroke"
                      className="animate-dash-flow stroke-primary/60"
                    />
                  </svg>
                )}

                {/* Node on the path */}
                <span
                  aria-hidden="true"
                  className="absolute left-0 top-0 z-10 flex size-12 items-center justify-center rounded-full bg-primary text-accent shadow-lg ring-[6px] ring-primary/15 lg:left-1/2 lg:top-1/2 lg:size-16 lg:-translate-x-1/2 lg:-translate-y-1/2"
                >
                  <Icon className="size-5 lg:size-7" />
                </span>

                {/* 1:1 image slot on an organic blob */}
                <div className={cn("w-full max-w-xs lg:mx-auto sm:max-w-sm lg:max-w-lg xl:max-w-xl 2xl:max-w-[36rem]", flip && "lg:order-2")}>
                  <div className="relative aspect-square w-full">
                    <span
                      aria-hidden="true"
                      className={cn(
                        "absolute inset-[4%] bg-primary/20",
                        blobs[i % 2],
                        flip ? "rotate-12" : "-rotate-6"
                      )}
                    />
                    {(() => {
                      const img = s.image
                      return img ? (
                        <Pic src={img} alt={s.imageAlt ?? s.title} sizes="(min-width: 1024px) 28rem, (min-width: 640px) 24rem, min(80vw, 20rem)" className="object-contain" />
                      ) : (
                        <div className="absolute inset-[4%] flex flex-col items-center justify-center gap-2 text-primary/60">
                          <ImageIcon className="size-8" aria-hidden="true" />
                          <span className="text-xs font-medium">1:1 transparent image</span>
                        </div>
                      )
                    })()}
                  </div>
                </div>

                {/* Info with ghost numeral */}
                <div className={cn("relative flex flex-col items-start", flip && "lg:order-1 lg:items-end lg:text-right")}>
                  <span
                    aria-hidden="true"
                    className={cn(
                      "pointer-events-none absolute -top-12 select-none text-[9rem] font-black leading-none text-primary/15 sm:text-[11rem]",
                      flip ? "left-0 lg:left-auto lg:right-0" : "left-0"
                    )}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="relative text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl xl:text-6xl">{s.title}</h3>
                  <p className="relative mt-4 max-w-xl text-lg leading-relaxed text-foreground/75 sm:text-xl lg:text-2xl">{s.text}</p>
                  {s.guide && (
                    <Link href={s.guide.href} className="relative mt-4 inline-flex items-center gap-1.5 text-base font-semibold text-primary underline underline-offset-4 hover:text-primary/80">
                      {s.guide.label}
                      <ArrowRight className="size-4" aria-hidden="true" />
                    </Link>
                  )}
                </div>
              </li>
            )
          })}
        </ol>
      </div>
    </section>
  )
}
