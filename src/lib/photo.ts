import { imageManifest } from "@/lib/image-manifest"
import { site } from "@/lib/site"

/** Absolute URL of the largest generated WebP for a site photo path like "/images/services/aftercare.webp" (served from /img). */
export function photoUrl(src: string) {
  const key = src.replace(/^\/?images\//, "").replace(/\.[^.]+$/, "")
  const img = imageManifest[key]
  return img ? `${site.url}/img/${key}-${img.widths[img.widths.length - 1]}.webp` : `${site.url}/ncr-grass-natural-lawn-villa.webp`
}
