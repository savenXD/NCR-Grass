import Image from "next/image"
import Link from "next/link"
import { ArrowUp, MapPin, MessageCircle, Phone } from "lucide-react"
import { footerLinks, legalLinks, phoneHref, site, whatsappHref } from "@/lib/site"
import { cityLocations, locationHref } from "@/lib/locations"

const heading = "text-sm font-bold uppercase tracking-widest text-accent"
const link =
  "inline-flex min-h-12 min-w-12 items-center py-1 text-[0.95rem] leading-snug text-primary-foreground/80 transition-colors hover:text-white hover:underline underline-offset-4 sm:text-base"

/** Deep forest green footer with seamless grass-blade top edge and high-contrast text. */
export function Footer() {
  return (
    <footer className="relative mt-16 bg-[var(--footer)] text-primary-foreground pb-8 pt-12 sm:pb-10 sm:pt-14 [--footer:oklch(0.25_0.06_150)]">
      {/* Seamless grass-blade top edge: overlapping base completely buries the footer's top edge */}
      <svg
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 -top-10 h-14 w-full text-[var(--footer)] overflow-visible"
        preserveAspectRatio="none"
      >
        <defs>
          <pattern id="footer-blades" width="160" height="64" patternUnits="userSpaceOnUse">
            <path
              d="M0 42 C2 34 5 18 8 10 C10 24 13 36 16 41 C19 32 23 16 26 6 C28 20 32 34 35 42 C38 36 41 24 44 18 C47 28 50 38 53 41 C57 30 62 14 66 8 C69 22 73 35 76 42 C80 34 84 22 88 14 C91 26 95 36 98 40 C102 28 108 8 112 4 C115 18 120 32 124 41 C128 32 133 20 137 12 C140 24 144 35 147 42 C151 34 154 22 157 16 C158 26 159 36 160 42 L160 64 L0 64 Z"
              fill="currentColor"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#footer-blades)" />
      </svg>

      {/* Giant watermark */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <span className="absolute -bottom-[0.18em] left-1/2 -translate-x-1/2 select-none whitespace-nowrap text-[17vw] font-black leading-none tracking-tighter text-white/[0.04]">
          NCR GRASS
        </span>
      </div>

      <div className="relative z-10 mx-auto max-w-[90rem] px-5 sm:px-10 lg:px-14">
        {/* 1. Brand */}
        <div className="flex flex-col gap-4 border-b border-white/10 pb-6 sm:flex-row sm:items-end sm:justify-between sm:pb-10">
          <Link href="/" className="flex w-fit items-center gap-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:gap-4">
            <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl border border-white/15 bg-white/10 p-2 shadow-md sm:size-20 sm:p-2.5">
              <Image src="/logo.svg" alt="" width={56} height={56} className="size-full object-contain" />
            </span>
            <span className="text-3xl font-extrabold tracking-tight text-white sm:text-5xl">{site.name}</span>
          </Link>
          <p className="max-w-sm text-sm text-primary-foreground/70 sm:text-right sm:text-base">
            Natural lawn grass supply and installation from Dasna, Ghaziabad, across Delhi NCR and North India.
          </p>
        </div>

        <div className="grid gap-x-6 gap-y-6 py-6 sm:py-12 lg:grid-cols-3 lg:gap-10">
          {/* 2. Contact details */}
          <div>
            <h2 className={heading}>Contact</h2>
            <address className="mt-3 space-y-2 text-[0.95rem] not-italic text-primary-foreground/80 sm:mt-4 sm:space-y-3 sm:text-base">
              <a href={phoneHref} className="flex min-h-12 items-center gap-3 hover:text-white">
                <Phone className="size-4 shrink-0 text-accent" aria-hidden="true" />
                {site.phoneDisplay}
              </a>
              <a href={whatsappHref} target="_blank" rel="noopener noreferrer" className="flex min-h-12 items-center gap-3 hover:text-white">
                <MessageCircle className="size-4 shrink-0 text-accent" aria-hidden="true" />
                WhatsApp
              </a>
              <p className="flex items-start gap-3">
                <MapPin className="mt-1 size-4 shrink-0 text-accent" aria-hidden="true" />
                {site.address}
              </p>
            </address>
          </div>

          {/* 3. Hyperlinks: Pages and Areas side by side on every screen size */}
          <div className="grid grid-cols-2 gap-x-6 lg:col-span-2 lg:gap-10">
            <nav aria-label="Footer">
              <h2 className={heading}>Pages</h2>
              <ul className="mt-2 sm:mt-4">
                {footerLinks.map((l) => (
                  <li key={l.name}>
                    <Link href={l.href} className={link}>
                      {l.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <div>
              <h2 className={heading}>Areas we serve</h2>
              <ul className="mt-2 sm:mt-4">
                {cityLocations.map((l) => (
                  <li key={l.slug}>
                    <Link href={locationHref(l.slug)} className={link}>
                      Lawn grass in {l.name}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link href="/service-areas" className={link}>
                    All service areas
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* 4. Legal, then copyright */}
        <div className="border-t border-white/10 pt-5 sm:pt-6">
          <ul aria-label="Legal" className="flex flex-wrap gap-x-5 text-sm text-primary-foreground/70">
            {legalLinks.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="inline-flex min-h-12 items-center underline-offset-4 hover:text-white hover:underline">
                  {l.name}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-2 flex items-center justify-between gap-4">
            <p className="text-sm text-primary-foreground/60">© {site.name}. All rights reserved.</p>
            <a
              href="#top"
              className="inline-flex h-12 shrink-0 items-center gap-3 rounded-full border border-white/20 bg-white/5 py-1 pl-5 pr-1 text-sm font-semibold text-white transition-colors hover:bg-white/15"
            >
              <span className="hidden sm:inline">Back to top</span>
              <span className="flex size-10 items-center justify-center rounded-full bg-white text-primary">
                <ArrowUp className="size-4" aria-hidden="true" />
                <span className="sr-only sm:hidden">Back to top</span>
              </span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
