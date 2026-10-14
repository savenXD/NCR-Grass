import { PageHero } from "@/components/sections/page-hero"
import { LegalContent } from "@/components/sections/legal-content"
import { disclaimer, legalUpdated } from "@/lib/legal"
import { pageMetadata } from "@/lib/metadata"

export const metadata = pageMetadata({
  title: "Disclaimer",
  description: "Important notes about the NCR Grass website, including AI-generated images and general information.",
  path: "/disclaimer",
})

export default function Page() {
  return (
    <main id="top">
      <PageHero path="/disclaimer" crumb="Disclaimer" title="Disclaimer" />
      <LegalContent sections={disclaimer} updated={legalUpdated} />
    </main>
  )
}
