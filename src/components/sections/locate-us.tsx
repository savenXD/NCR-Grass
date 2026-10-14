import { MapPin, Navigation, Phone } from "lucide-react"
import { GoogleIcon } from "@/components/shared/google-icon"
import { SectionHeading } from "@/components/shared/section-heading"
import { directionsHref, location, phoneHref, site } from "@/lib/site"

/**
 * Full-width Google Maps embed with an address card floating over its corner (desktop)
 * or overlapping its bottom edge (mobile). The iframe lazy-loads as it nears the viewport (no tap needed).
 */
export function LocateUs() {
  return (
    <section id="locate-us" className="px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Locate us"
          title="Visit or reach us anytime"
          description="Find us on the map and get directions straight to our location."
        />

        <div className="reveal-zoom relative mt-10 sm:mt-12">
          {/* Map */}
          <div className="relative overflow-hidden rounded-[2rem] border border-primary/25 bg-[oklch(0.2_0.03_150)] shadow-xl sm:h-[36rem]">
            {/* The pin is the iframe's exact centre. On phones the map has its own box and the card sits below it, so nothing covers the pin */}
            <div className="relative h-[24rem] sm:absolute sm:inset-0 sm:h-auto">
              <iframe
                src={location.embedSrc}
                title={`${site.name} location on Google Maps`}
                loading="lazy"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
                className="absolute inset-0 size-full border-0"
              />
            </div>
            <div className="relative z-10 m-3 overflow-hidden rounded-[1.75rem] border border-white/15 bg-black/45 p-5 text-white backdrop-blur-xl backdrop-saturate-125 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.6),inset_0_1px_0_rgba(255,255,255,0.18),inset_0_-1px_0_rgba(255,255,255,0.04)] sm:absolute sm:bottom-6 sm:left-6 sm:m-0 sm:w-[25rem] sm:p-6">
              {/* Liquid-glass highlights */}
              <span aria-hidden="true" className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent" />
              <span aria-hidden="true" className="pointer-events-none absolute -left-10 -top-16 size-40 rounded-full bg-accent/15 blur-3xl" />
              <div className="relative flex items-center gap-2 text-sm font-medium text-white/70">
                <span className="flex size-8 items-center justify-center rounded-full bg-white shadow-sm ring-1 ring-black/5">
                  <GoogleIcon className="size-[18px]" />
                </span>
                Google Maps
              </div>

              <div className="relative mt-5 flex items-start gap-3">
                <MapPin className="mt-1 size-5 shrink-0 text-accent" aria-hidden="true" />
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-accent">Our location</p>
                  <address className="mt-1 text-lg font-semibold not-italic leading-snug">{site.address}</address>
                </div>
              </div>

              <div className="relative mt-6 flex gap-3">
                <a
                  href={directionsHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-12 min-w-0 flex-1 items-center justify-center gap-2 whitespace-nowrap rounded-full bg-accent px-3 text-sm font-semibold text-accent-foreground transition-colors hover:bg-accent/90 min-[380px]:px-5 min-[380px]:text-base"
                >
                  <Navigation className="size-4" aria-hidden="true" />
                  Get directions
                </a>
                <a
                  href={phoneHref}
                  aria-label={`Call ${site.name} on ${site.phoneDisplay}`}
                  className="inline-flex h-12 shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-full border border-white/30 px-4 text-sm font-semibold text-white transition-colors hover:bg-white/10 min-[380px]:px-5 min-[380px]:text-base"
                >
                  <Phone className="size-4" aria-hidden="true" />
                  Call
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
