import { imageManifest } from "@/lib/image-manifest"
import { cn } from "@/lib/utils"

type Props = {
  /** Site path of the photo, e.g. "/images/services/grass-supply.webp" (the folder + name pick the variants in public/img) */
  src: string
  alt: string
  /** Same meaning as <img sizes>: how wide the photo is shown at each breakpoint */
  sizes: string
  /** Hero-like photos only; everything else lazy-loads */
  eager?: boolean
  className?: string
}

const keyOf = (src: string) => src.replace(/^\/?images\//, "").replace(/\.[^.]+$/, "")

/**
 * Responsive photo served as plain static AVIF/WebP files (built by scripts/build-images.mjs).
 * Fills its (relatively positioned, fixed-ratio) parent, so it can never shift the layout.
 * No client JS and no image-optimizer request.
 */
export function Pic({ src, alt, sizes, eager = false, className }: Props) {
  const key = keyOf(src)
  const img = imageManifest[key]
  if (!img) return null
  const set = (ext: string) => img.widths.map((w) => `/img/${key}-${w}.${ext} ${w}w`).join(", ")
  const mid = img.widths[Math.min(1, img.widths.length - 1)]

  return (
    <picture>
      <source type="image/avif" srcSet={set("avif")} sizes={sizes} />
      <img
        src={`/img/${key}-${mid}.webp`}
        srcSet={set("webp")}
        sizes={sizes}
        alt={alt}
        width={img.w}
        height={img.h}
        loading={eager ? "eager" : "lazy"}
        decoding="async"
        className={cn("absolute inset-0 size-full object-cover", className)}
        style={img.blur ? { backgroundImage: `url(${img.blur})`, backgroundSize: "cover" } : undefined}
      />
    </picture>
  )
}
