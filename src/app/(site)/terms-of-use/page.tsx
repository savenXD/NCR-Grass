import { PageHero } from "@/components/sections/page-hero"
import { LegalContent } from "@/components/sections/legal-content"
import { termsOfUse, legalUpdated } from "@/lib/legal"
import { pageMetadata } from "@/lib/metadata"

export const metadata = pageMetadata({
  title: "Terms of Use",
  description: "The terms for using the NCR Grass website, including quotes, prices, service areas and content.",
  path: "/terms-of-use",
})

export default function Page() {
  return (
    <main id="top">
      <PageHero path="/terms-of-use" crumb="Terms of Use" title="Terms of Use" />
      <LegalContent sections={termsOfUse} updated={legalUpdated} />
    </main>
  )
}
