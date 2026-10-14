import { CircleCheck } from "lucide-react"
import { SectionHeading } from "@/components/shared/section-heading"
import type { ContentBlock } from "@/lib/page-content"

/**
 * Long-form text blocks for inner pages (server-rendered, fully crawlable).
 * Each block: heading on the left (desktop), paragraphs + bullets / sub-sections / steps on the right.
 */
export function ContentSections({ blocks }: { blocks: ContentBlock[] }) {
  return (
    <section className="px-4 py-16 sm:px-6 sm:py-24 lg:px-10 xl:px-14">
      <div className="mx-auto flex max-w-[90rem] flex-col gap-16 sm:gap-24">
        {blocks.map((b) => (
          <article
            key={b.title}
            className="grid gap-8 border-t border-primary/20 pt-10 first:border-t-0 first:pt-0 sm:pt-14 lg:grid-cols-[5fr_7fr] lg:gap-20"
          >
            <SectionHeading eyebrow={b.eyebrow} title={b.title} className="lg:self-start" />

            <div className="min-w-0">
              {b.paragraphs.map((p, i) => (
                <p
                  key={i}
                  className="reveal mt-5 text-lg leading-relaxed text-foreground/80 first:mt-0 sm:text-xl"
                >
                  {p}
                </p>
              ))}

              {b.bullets && (
                <ul className="reveal mt-8 grid gap-3 sm:grid-cols-2">
                  {b.bullets.map((item) => (
                    <li key={item} className="flex gap-3 rounded-2xl border border-primary/20 p-4 text-base leading-snug">
                      <CircleCheck className="mt-0.5 size-5 shrink-0 text-primary" aria-hidden="true" />
                      {item}
                    </li>
                  ))}
                </ul>
              )}

              {b.subsections && (
                <div className="mt-10 grid gap-4 sm:grid-cols-2">
                  {b.subsections.map((s) => (
                    <div key={s.title} className="reveal rounded-[1.75rem] border border-primary/25 p-6 sm:p-7">
                      <h3 className="text-xl font-semibold tracking-tight sm:text-2xl">{s.title}</h3>
                      {s.paragraphs.map((p, i) => (
                        <p key={i} className="mt-3 text-base leading-relaxed text-foreground/75">
                          {p}
                        </p>
                      ))}
                      {s.bullets && (
                        <ul className="mt-4 space-y-2">
                          {s.bullets.map((item) => (
                            <li key={item} className="flex gap-2.5 text-sm leading-snug text-foreground/80 sm:text-base">
                              <CircleCheck className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {b.steps && (
                <ol className="mt-8 flex flex-col">
                  {b.steps.map((s, i) => (
                    <li key={s.title} className="reveal flex gap-5 border-b border-primary/15 py-5 last:border-b-0">
                      <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <div>
                        <h3 className="text-lg font-semibold tracking-tight sm:text-xl">{s.title}</h3>
                        <p className="mt-1 text-base leading-relaxed text-foreground/75">{s.text}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              )}
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
