import { notFound } from "next/navigation"
import { PageHero } from "@/components/sections/page-hero"
import { ContentSections } from "@/components/sections/content-sections"
import { LocalityList } from "@/components/sections/locality-list"
import { Faq } from "@/components/sections/faq"
import { AreaLinks } from "@/components/sections/area-links"
import { GuideLinks } from "@/components/sections/guide-links"
import { PageCta } from "@/components/sections/page-cta"
import { JsonLd } from "@/components/shared/json-ld"
import { getLocation, locationHref, locations } from "@/lib/locations"
import { pageMetadata } from "@/lib/metadata"
import { faqJsonLd, locationServiceJsonLd } from "@/lib/schema"

export const ensureStatic = "navigation"

export function generateStaticParams() {
  return locations.map((l) => ({ slug: l.slug }))
}

export async function generateMetadata({ params }: PageProps<"/service-areas/[slug]">) {
  const loc = getLocation((await params).slug)
  if (!loc) return {}
  return pageMetadata({
    title: loc.title,
    description: loc.description,
    path: locationHref(loc.slug),
    sharedImage: false, // uses ./opengraph-image.tsx
  })
}

export default function Page({ params }: PageProps<"/service-areas/[slug]">) {
  // Params are prerendered by generateStaticParams; ensureStatic keeps the full article/location HTML in the response (crawlers, no streamed fallback)
  return <LocationPage params={params} />
}

async function LocationPage({ params }: Pick<PageProps<"/service-areas/[slug]">, "params">) {
  const loc = getLocation((await params).slug)
  if (!loc) notFound()

  const path = locationHref(loc.slug)
  const nearby = loc.nearby.map(getLocation).filter((l) => l !== undefined)

  return (
    <main id="top">
      <JsonLd
        data={[
          locationServiceJsonLd(loc, path),
          faqJsonLd(loc.faqs),
        ]}
      />
      <PageHero
        path={path}
        crumb={loc.name}
        parent={{ name: "Service Areas", href: "/service-areas" }}
        title={loc.h1}
        description={loc.heroText}
      />
      <ContentSections blocks={loc.blocks} />
      <LocalityList place={loc.name} title={loc.localities.title} items={loc.localities.items} />
      <Faq
        items={loc.faqs}
        title={`Lawn grass in ${loc.name}: your questions`}
        description={`What people in ${loc.name} ask us before ordering grass or a new lawn.`}
      />
      <GuideLinks place={loc.name} locationSlug={loc.slug} />
      <AreaLinks eyebrow="Nearby" title="We also serve" items={nearby} />
      <PageCta />
    </main>
  )
}
