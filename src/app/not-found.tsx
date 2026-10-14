import Link from "next/link"
import { PageHero } from "@/components/sections/page-hero"
import { PageCta } from "@/components/sections/page-cta"
import { SiteShell } from "@/components/shared/site-shell"
import { navLinks } from "@/lib/site"

export default function NotFound() {
  return (
    <SiteShell>
      <main id="top">
        <PageHero crumb="Page not found" title="Page not found" description="This page may have moved or never existed. Try one of these instead." />
        <section className="px-4 py-16 sm:px-6 lg:px-8">
          <ul className="mx-auto flex max-w-3xl flex-wrap justify-center gap-3">
            {navLinks.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="inline-flex min-h-12 items-center rounded-full border border-primary/40 px-6 font-semibold transition-colors hover:bg-primary/10"
                >
                  {l.name}
                </Link>
              </li>
            ))}
          </ul>
        </section>
        <PageCta />
      </main>
    </SiteShell>
  )
}
