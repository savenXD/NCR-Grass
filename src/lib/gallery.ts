import { imageManifest } from "@/lib/image-manifest"
import { videoManifest } from "@/lib/video-manifest"

/**
 * Every photo in assets-source/images/gallery (`npm run images`) and every clip in
 * assets-source/videos/gallery (`npm run videos`). Drop in any number of any shape: the page lays them out by aspect ratio.
 * Videos are interleaved among the photos rather than piled at the end.
 */
const photos = Object.entries(imageManifest)
  .filter(([key]) => key.startsWith("gallery/"))
  .map(([key, img]) => ({ kind: "image" as const, src: `/images/${key}`, w: img.w, h: img.h }))

const videos = Object.entries(videoManifest).map(([name, v]) => ({ kind: "video" as const, name, w: v.w, h: v.h }))

export type GalleryItem = (typeof photos)[number] | (typeof videos)[number]

export const galleryItems: GalleryItem[] = (() => {
  const out: GalleryItem[] = [...photos]
  const step = Math.max(1, Math.floor(photos.length / (videos.length + 1)))
  videos.forEach((v, i) => out.splice(Math.min(out.length, (i + 1) * step + i), 0, v))
  return out
})()

export const galleryImages = photos
