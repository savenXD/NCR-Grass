import { Hero } from "@/components/sections/hero"
import { About } from "@/components/sections/about"
import { Audiences } from "@/components/sections/audiences"
import { Services } from "@/components/sections/services"
import { ServiceAreas } from "@/components/sections/service-areas"
import { LocateUs } from "@/components/sections/locate-us"
import { WhyChooseUs } from "@/components/sections/why-choose-us"
import { Faq } from "@/components/sections/faq"
import { faqs } from "@/lib/site"
import { FinalCta } from "@/components/sections/final-cta"
import { pageMetadata } from "@/lib/metadata"

export const metadata = pageMetadata({
  title: "Farm-Fresh Lawn Grass · Delhi NCR & North India",
  description:
    "Farm-fresh natural lawn grass supply and installation across Delhi NCR and North India (UP, Haryana, Punjab, Rajasthan & Uttarakhand). Free site assessment.",
  path: "/",
})

export default function Home() {
  return (
    <main id="top">
      <Hero />
      <About />
      <Audiences />
      <div className="cv-auto">
        <WhyChooseUs />
      </div>
      <div className="cv-auto">
        <Services />
      </div>
      <div className="cv-auto">
        <ServiceAreas />
      </div>
      <div className="cv-auto">
        <LocateUs />
      </div>
      <div className="cv-auto">
        <Faq items={faqs.slice(0, 5)} />
      </div>
      <div className="cv-auto">
        <FinalCta />
      </div>
    </main>
  )
}
