import { PageHero } from "@/components/sections/page-hero"
import { LegalContent } from "@/components/sections/legal-content"
import { privacyPolicy, legalUpdated } from "@/lib/legal"
import { pageMetadata } from "@/lib/metadata"

export const metadata = pageMetadata({
  title: "Privacy Policy",
  description: "How NCR Grass collects and uses the details you share through our website, calls and WhatsApp.",
  path: "/privacy-policy",
})

export default function Page() {
  return (
    <main id="top">
      <PageHero path="/privacy-policy" crumb="Privacy Policy" title="Privacy Policy" />
      <LegalContent sections={privacyPolicy} updated={legalUpdated} />
    </main>
  )
}
