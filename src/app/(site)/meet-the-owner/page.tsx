import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { pageMetadata } from "@/lib/metadata"
import { PageHero } from "@/components/sections/page-hero"
import { OwnerProfile } from "@/components/sections/owner-profile"
import { OwnerStory } from "@/components/sections/owner-story"
import { PageCta } from "@/components/sections/page-cta"
import { JsonLd } from "@/components/shared/json-ld"
import { ownerJsonLd } from "@/lib/schema"
import { owner } from "@/lib/owner"

export const metadata = pageMetadata({
  title: "Meet the Owner: Arjun Yadav",
  description: "Meet Arjun Yadav, founder of NCR Grass in Dasna, Ghaziabad. Call or WhatsApp him directly about natural lawn grass supply and installation.",
  path: "/meet-the-owner",
})

const links = [
  { name: "Our services", href: "/services" },
  { name: "Areas we serve", href: "/service-areas" },
  { name: "Contact us", href: "/contact" },
]

export default function Page() {
  return (
    <main id="top">
      <JsonLd data={ownerJsonLd()} />
      <PageHero
        path="/meet-the-owner"
        crumb="Meet the Owner"
        title={`Meet ${owner.name}`}
        description="The person behind every NCR Grass lawn."
      />
      <OwnerProfile />
      <OwnerStory />
      <nav aria-label="Keep exploring" className="px-4 pb-16 sm:px-6 lg:px-10 xl:px-14">
        <ul className="mx-auto grid max-w-6xl gap-3 sm:grid-cols-3">
          {links.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                className="flex items-center justify-between rounded-[1.75rem] border border-primary/25 px-6 py-5 text-lg font-semibold tracking-tight transition-colors hover:border-primary hover:bg-primary/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                {l.name}
                <ArrowRight className="size-5 text-primary" aria-hidden="true" />
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <PageCta />
    </main>
  )
}
