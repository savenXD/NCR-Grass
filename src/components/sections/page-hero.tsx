import Link from "next/link"
import { HeroPicture } from "@/components/shared/hero-picture"
import { Navbar } from "@/components/sections/navbar"
import { JsonLd } from "@/components/shared/json-ld"
import { breadcrumbJsonLd } from "@/lib/schema"
import { cn } from "@/lib/utils"

type Props = {
  /** This page's own path, for BreadcrumbList JSON-LD (omit on pages that aren't indexable, e.g. 404) */
  path?: string
  /** Breadcrumb label, e.g. "About" */
  crumb: string
  /** Optional middle crumb, e.g. Service Areas on a city page */
  parent?: { name: string; href: string }
  /** The page's single <h1> */
  title: string
  description?: string
  /** CSS object-position for the photo, to vary the crop per page */
  imagePosition?: string
  /** Smaller H1 for long titles (blog posts) */
  compact?: boolean
}

/** Compact version of the home hero: same photo card + navbar, shorter, with the page's H1. */
export function PageHero({ path, crumb, parent, title, description, imagePosition = "center 80%", compact = false }: Props) {
  return (
    <section className="p-2 sm:p-4">
      {path && <JsonLd data={breadcrumbJsonLd([...(parent ? [{ name: parent.name, path: parent.href }] : []), { name: crumb, path }])} />}
      <div className="relative isolate flex min-h-[26rem] flex-col overflow-hidden rounded-[1.75rem] sm:min-h-[32rem] sm:rounded-[2.5rem]">
        <HeroPicture alt="" className="md:animate-settle" style={{ objectPosition: imagePosition }} />
        <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-b from-black/60 via-black/45 to-black/65" />

        <Navbar />

        <div className="flex flex-1 flex-col items-center justify-center px-4 pb-12 pt-28 text-center text-white sm:px-8 sm:pt-32">
          <nav aria-label="Breadcrumb">
            <ol className="flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-4 py-1.5 text-xs font-medium tracking-wide backdrop-blur-sm sm:text-sm">
              <li>
                <Link href="/" className="relative after:absolute after:-inset-x-1 after:-inset-y-4 text-white/80 hover:text-white">
                  Home
                </Link>
              </li>
              <li aria-hidden="true" className="text-white/50">
                /
              </li>
              {parent && (
                <>
                  <li>
                    <Link href={parent.href} className="relative after:absolute after:-inset-x-1 after:-inset-y-4 text-white/80 hover:text-white">
                      {parent.name}
                    </Link>
                  </li>
                  <li aria-hidden="true" className="text-white/50">
                    /
                  </li>
                </>
              )}
              <li aria-current="page" className="max-w-[11rem] truncate sm:max-w-md">{crumb}</li>
            </ol>
          </nav>
          <h1
            className={cn(
              "mt-6 animate-fade-up text-balance font-medium tracking-tight",
              compact
                ? "max-w-5xl text-3xl leading-[1.15] sm:text-5xl lg:text-6xl"
                : "max-w-4xl text-4xl leading-[1.08] sm:text-6xl lg:text-7xl",
            )}
          >
            {title}
          </h1>
          {description && (
            <p className="mt-5 max-w-xl animate-fade-up text-pretty [animation-delay:150ms] text-base leading-relaxed text-white/85 sm:text-lg">{description}</p>
          )}
        </div>
      </div>
    </section>
  )
}
