import { Fragment, type CSSProperties } from "react"
import { cn } from "@/lib/utils"

type Props = {
  eyebrow?: string
  title: string
  description?: string
  className?: string
}

export function SectionHeading({ eyebrow, title, description, className }: Props) {
  return (
    <div className={cn("max-w-2xl", className)}>
      {eyebrow && (
        <p className="reveal text-sm font-semibold uppercase tracking-widest text-primary">{eyebrow}</p>
      )}
      <h2 aria-label={title} className="reveal-words mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
        {/* Word-by-word reveal; the label keeps the heading readable as one phrase */}
        {title.split(" ").map((word, i) => (
          <Fragment key={i}>
            {i > 0 && " "}
            <span aria-hidden="true" className="w" style={{ "--i": i } as CSSProperties}>
              {word}
            </span>
          </Fragment>
        ))}
      </h2>
      {description && (
        <p className="reveal reveal-d2 mt-3 text-base leading-relaxed text-muted-foreground sm:text-lg">{description}</p>
      )}
    </div>
  )
}
