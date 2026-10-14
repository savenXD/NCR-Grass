import { preload } from "react-dom"
import { heroBlur } from "@/lib/hero-blur"
import { cn } from "@/lib/utils"

const BASE = "/images/hero"
const MOBILE_MQ = "(max-width: 767px)"

/**
 * Full-bleed hero photo (LCP), served as plain static AVIF/WebP files: a phone gets a tall crop
 * at native resolution (~20 KB), desktop the full landscape picture. No image-optimizer round trip.
 * A tiny blurred copy of the photo is inlined as the background, so there is colour at first paint
 * while the real file downloads on a slow connection.
 */
export function HeroPicture({ alt, className, style }: { alt: string; className?: string; style?: React.CSSProperties }) {
  preload(`${BASE}/natural-lawn-villa-mobile.avif`, { as: "image", type: "image/avif", media: MOBILE_MQ, fetchPriority: "high" })
  preload(`${BASE}/natural-lawn-villa-desktop.avif`, { as: "image", type: "image/avif", media: `(min-width: 768px)`, fetchPriority: "high" })

  return (
    <>
      <span
        aria-hidden="true"
        className="absolute inset-0 -z-30 bg-cover bg-center md:hidden"
        style={{ backgroundImage: `url(${heroBlur.mobile})` }}
      />
      <span
        aria-hidden="true"
        className="absolute inset-0 -z-30 hidden bg-cover bg-bottom md:block"
        style={{ backgroundImage: `url(${heroBlur.desktop})` }}
      />
      <picture>
        <source media={MOBILE_MQ} type="image/avif" srcSet={`${BASE}/natural-lawn-villa-mobile.avif`} />
        <source media={MOBILE_MQ} type="image/webp" srcSet={`${BASE}/natural-lawn-villa-mobile.webp`} />
        <source type="image/avif" srcSet={`${BASE}/natural-lawn-villa-desktop.avif`} />
        <img
          src={`${BASE}/natural-lawn-villa-desktop.webp`}
          alt={alt}
          width={heroBlur.desktopSize[0]}
          height={heroBlur.desktopSize[1]}
          fetchPriority="high"
          decoding="async"
          className={cn("absolute inset-0 -z-20 size-full object-cover", className)}
          style={style}
        />
      </picture>
    </>
  )
}
