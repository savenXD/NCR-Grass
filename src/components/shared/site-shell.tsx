import { SmoothScroll } from "@/components/shared/smooth-scroll"
import { RevealObserver } from "@/components/shared/reveal-observer"
import { JsonLd } from "@/components/shared/json-ld"
import { Footer } from "@/components/sections/footer"
import { MobileContactBar } from "@/components/sections/mobile-contact-bar"
import { businessJsonLd, websiteJsonLd } from "@/lib/schema"

/** Public-site chrome (schema, scroll effects, footer, contact bar). The /admin app does not use it. */
export function SiteShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd data={[businessJsonLd(), websiteJsonLd()]} />
      <SmoothScroll />
      <RevealObserver />
      {children}
      <Footer />
      <MobileContactBar />
    </>
  )
}
