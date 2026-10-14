import { pageMetadata } from "@/lib/metadata"
import { Services } from "@/components/sections/services"
import { PageCta } from "@/components/sections/page-cta"
import { ContentSections } from "@/components/sections/content-sections"
import { servicesContent } from "@/lib/page-content"
import { PageHero } from "@/components/sections/page-hero"

export const metadata = pageMetadata({
  title: "Lawn Installation & Natural Grass Supply in Delhi NCR",
  description: "Natural grass supply, land levelling, grass plantation and aftercare for farmhouses, offices, marriage lawns and homes in Ghaziabad, Noida and Delhi NCR.",
  path: "/services",
})

export default function Page() {
  return (
    <main id="top">
      <PageHero path="/services" crumb="Services" title="Our Services" description="Natural grass supply, lawn installation and everything in between." />
      <Services />
      <ContentSections blocks={servicesContent} />
      <PageCta />
    </main>
  )
}
