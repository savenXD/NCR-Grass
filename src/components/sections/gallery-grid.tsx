import { Pic } from "@/components/shared/pic"
import { GalleryVideo } from "@/components/shared/gallery-video"
import { galleryItems } from "@/lib/gallery"

/**
 * Masonry of plain photos. CSS columns pack any mix of shapes (portrait, landscape, square, panorama)
 * with no cropping: each tile takes its photo's own aspect ratio, so nothing shifts while images load.
 * Server component, no client JS.
 */
export function GalleryGrid() {
  return (
    <section className="px-4 py-12 sm:px-6 sm:py-16 lg:px-10 xl:px-14">
      <ul className="mx-auto max-w-[90rem] columns-1 gap-3 sm:columns-2 sm:gap-4 lg:columns-3 xl:columns-4">
        {galleryItems.map((img, i) => (
          <li key={img.kind === "image" ? img.src : img.name} className="mb-3 break-inside-avoid sm:mb-4">
            <div className="relative overflow-hidden rounded-[1.25rem] bg-muted sm:rounded-[1.5rem]" style={{ aspectRatio: `${img.w} / ${img.h}` }}>
              {img.kind === "image" ? (
                <Pic
                  src={img.src}
                  alt={`Natural grass lawn by NCR Grass, photo ${i + 1}`}
                  sizes="(min-width: 1280px) 22vw, (min-width: 1024px) 31vw, (min-width: 640px) 48vw, calc(100vw - 32px)"
                  eager={i < 2}
                />
              ) : (
                <GalleryVideo name={img.name} label={`Video of a natural grass lawn by NCR Grass, clip ${i + 1}`} />
              )}
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}
