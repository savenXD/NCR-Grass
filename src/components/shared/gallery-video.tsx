import { videoManifest } from "@/lib/video-manifest"

type Props = {
  /** Clip name in assets-source/videos/gallery (no extension) */
  name: string
  label: string
}

/**
 * Gallery clip: silent, looping autoplay with no controls (the clips are tiny, under 600 KB, with audio stripped).
 * The poster shows until the first frame is ready. No client JS.
 */
export function GalleryVideo({ name, label }: Props) {
  const v = videoManifest[name]
  if (!v) return null
  return (
    <video
      autoPlay
      muted
      loop
      playsInline
      disablePictureInPicture
      disableRemotePlayback
      preload="metadata"
      poster={`/video/gallery/${name}-poster.webp`}
      aria-label={label}
      width={v.w}
      height={v.h}
      className="absolute inset-0 size-full bg-muted object-cover"
    >
      <source src={`/video/gallery/${name}.mp4`} type="video/mp4" />
    </video>
  )
}
