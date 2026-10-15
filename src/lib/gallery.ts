import { imageManifest } from "@/lib/image-manifest"

/**
 * Every photo in assets-source/images/gallery, built by `npm run images`.
 * Drop in any number of photos of any shape: the page lays them out by their own aspect ratio.
 */
export const galleryImages = Object.entries(imageManifest)
  .filter(([key]) => key.startsWith("gallery/"))
  .map(([key, img]) => ({ src: `/images/${key}`, w: img.w, h: img.h }))
