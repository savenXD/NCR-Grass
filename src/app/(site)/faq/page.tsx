import { pageMetadata } from "@/lib/metadata"
import { Faq } from "@/components/sections/faq"
import { PageCta } from "@/components/sections/page-cta"
import { faqs } from "@/lib/site"
import { moreFaqs } from "@/lib/page-content"
import { PageHero } from "@/components/sections/page-hero"

export const metadata = pageMetadata({
  title: "Lawn Grass FAQs: Price, Planting & Care",
  description: "Answers on lawn grass price, planting season, installation and care in Delhi NCR, in English and Hinglish. Ask NCR Grass anything on call or WhatsApp.",
  path: "/faq",
})

export default function Page() {
  return (
    <main id="top">
      <PageHero path="/faq" crumb="FAQ" title="Frequently Asked Questions" description="Answers to what people usually ask before starting a lawn." />
      <Faq items={[...faqs, ...moreFaqs]} />
      <PageCta />
    </main>
  )
}
