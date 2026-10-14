import { pageMetadata } from "@/lib/metadata"
import { About } from "@/components/sections/about"
import { AboutValues } from "@/components/sections/about-values"
import { PageCta } from "@/components/sections/page-cta"
import { ContentSections } from "@/components/sections/content-sections"
import { aboutContent } from "@/lib/page-content"
import { PageHero } from "@/components/sections/page-hero"

export const metadata = pageMetadata({
  title: "About Us: Lawn Grass Experts in Dasna, Ghaziabad",
  description: "NCR Grass is a natural lawn grass supplier and installation team in Dasna, Ghaziabad, serving farmhouses, offices and homes across Delhi NCR and North India.",
  path: "/about",
})

export default function Page() {
  return (
    <main id="top">
      <PageHero path="/about" crumb="About" title="About NCR Grass" description="Turning bare, muddy land into lush natural lawns across North India." />
      <About showMoreLink={false} />
      <ContentSections blocks={aboutContent} />
      <AboutValues />
      <PageCta />
    </main>
  )
}
