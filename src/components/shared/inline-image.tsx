import { Pic } from "@/components/shared/pic"
import { cn } from "@/lib/utils"

type Props = {
  src?: string
  alt?: string
  /** Placeholder gradient used until a real photo is supplied */
  fallback: string
  /** Grow in from nothing when scrolled into view (see .pill-grow in globals.css) */
  grow?: boolean
  className?: string
}

/** Pill-shaped image that flows inline with a line of text. */
export function InlineImage({ src, alt = "", fallback, grow = false, className }: Props) {
  return (
    <span
      className={cn(
        "relative mx-1 inline-block h-[1.2em] w-[3.4em] translate-y-[0.2em] overflow-hidden rounded-full align-baseline",
        grow && "pill-grow",
        !src && fallback,
        className
      )}
    >
      {src && <Pic src={src} alt={alt} sizes="(min-width: 1024px) 220px, 140px" />}
    </span>
  )
}
