import { AudienceShowcase } from "@/components/sections/audience-showcase"
import { SectionHeading } from "@/components/shared/section-heading"

export function Audiences() {
  return (
    <section id="who-we-serve" className="overflow-x-clip">
      <AudienceShowcase
        header={
          <SectionHeading
            eyebrow="Who we serve"
            title="Lawns for every kind of space"
            description="From sprawling farmhouses to corporate campuses, we turn bare ground into green."
            className="lg:mx-auto lg:text-center"
          />
        }
      />
    </section>
  )
}
