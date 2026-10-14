import { pageMetadata } from "@/lib/metadata"
import { FinalCta } from "@/components/sections/final-cta"
import { ContactDetails } from "@/components/sections/contact-details"
import { ContentSections } from "@/components/sections/content-sections"
import { contactContent } from "@/lib/page-content"
import { PageHero } from "@/components/sections/page-hero"

export const metadata = pageMetadata({
  title: "Contact Us: Free Site Visit in Ghaziabad & Delhi NCR",
  description: "Call or WhatsApp NCR Grass in Dasna, Ghaziabad for a free site visit and quote on natural lawn grass supply and installation.",
  path: "/contact",
})

export default function Page() {
  return (
    <main id="top">
      <PageHero path="/contact" crumb="Contact" title="Contact Us" description="Tell us about your space and we will get back to you." />
      <FinalCta />
      <ContactDetails />
      <ContentSections blocks={contactContent} />
    </main>
  )
}
