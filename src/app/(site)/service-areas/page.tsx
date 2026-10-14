import { pageMetadata } from "@/lib/metadata"
import { ServiceAreas } from "@/components/sections/service-areas"
import { PageCta } from "@/components/sections/page-cta"
import { ContentSections } from "@/components/sections/content-sections"
import { serviceAreasContent } from "@/lib/page-content"
import { PageHero } from "@/components/sections/page-hero"
import { AreaLinks } from "@/components/sections/area-links"
import { cityLocations, stateLocations } from "@/lib/locations"

export const metadata = pageMetadata({
  title: "Service Areas: Dasna, Ghaziabad, Noida & Delhi NCR",
  description: "Natural lawn grass supply and installation in Dasna, Ghaziabad, Noida, Greater Noida, Meerut, Delhi and across UP, Haryana, Punjab, Rajasthan and Uttarakhand.",
  path: "/service-areas",
})

export default function Page() {
  return (
    <main id="top">
      <PageHero path="/service-areas" crumb="Service Areas" title="Lawn Grass Service Areas" description="From our base in Dasna, Ghaziabad to Delhi NCR and across North India." />
      <AreaLinks
        eyebrow="Cities"
        title="Lawn grass supply & installation near you"
        description="Based in Dasna, Ghaziabad. Fastest service across Delhi NCR and Meerut."
        items={cityLocations}
      />
      <AreaLinks eyebrow="States" title="Across North India" items={stateLocations} />
      <ServiceAreas />
      <ContentSections blocks={serviceAreasContent} />
      <PageCta />
    </main>
  )
}
