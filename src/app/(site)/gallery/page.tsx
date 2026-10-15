import { pageMetadata } from "@/lib/metadata"
import { PageHero } from "@/components/sections/page-hero"
import { GalleryGrid } from "@/components/sections/gallery-grid"
import { PageCta } from "@/components/sections/page-cta"
import { galleryImages } from "@/lib/gallery"

const hasPhotos = galleryImages.length > 0

export const metadata = pageMetadata({
  title: "Gallery: Natural Lawn Photos",
  description: "Photos of natural grass lawns supplied and installed by NCR Grass for farmhouses, offices and homes across Delhi NCR.",
  path: "/gallery",
  // Stay out of Google until real photos exist
  noindex: !hasPhotos,
})

export default function Page() {
  return (
    <main id="top">
      <PageHero path="/gallery" crumb="Gallery" title="Our Lawn Gallery" description="Natural grass lawns we have supplied and installed." />
      {hasPhotos ? (
        <GalleryGrid />
      ) : (
        <section className="px-4 py-20 text-center sm:px-6 sm:py-28">
          <p className="mx-auto max-w-md text-lg text-foreground/75">Photos are coming soon. Meanwhile, tell us about your space and we will get back to you.</p>
        </section>
      )}
      <PageCta />
    </main>
  )
}
