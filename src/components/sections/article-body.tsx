import { CircleCheck, Lightbulb } from "lucide-react"
import { InlineText } from "@/components/shared/inline-text"
import type { BlogFaq, BlogSection } from "@/lib/blog-data"

const link = "font-semibold text-primary underline decoration-primary/40 underline-offset-4 transition-colors hover:decoration-primary"
const linkOnDark = "font-semibold text-accent underline decoration-accent/50 underline-offset-4 hover:decoration-accent"

/**
 * Renders a guide's sections as plain semantic HTML: one H2 per section, real <p>, <ul>/<ol> and <table>
 * (with caption and scoped headers), so crawlers read the structure directly. Server component.
 */
export function ArticleBody({ sections, faqs }: { sections: BlogSection[]; faqs: BlogFaq[] }) {
  return (
    <div className="flex flex-col gap-14 sm:gap-16">
      {sections.map((s) => (
        <section key={s.id} id={s.id} className="scroll-mt-24">
          <h2 className="text-balance text-2xl font-semibold leading-tight tracking-tight sm:text-3xl lg:text-4xl">{s.title}</h2>

          <div className="mt-5 flex flex-col gap-5">
            {s.paragraphs.map((p, i) => (
              <p key={i} className="text-lg leading-relaxed text-foreground/85">
                <InlineText text={p} linkClassName={link} />
              </p>
            ))}
          </div>

          {s.callout && (
            <aside className="mt-8 flex gap-4 rounded-[1.5rem] bg-primary p-5 text-primary-foreground sm:p-7">
              <Lightbulb className="mt-1 size-6 shrink-0 text-accent" aria-hidden="true" />
              <p className="text-lg font-medium leading-relaxed">
                <InlineText text={s.callout} linkClassName={linkOnDark} />
              </p>
            </aside>
          )}

          {s.bullets && (
            <ul className="mt-8 grid gap-3 sm:grid-cols-2">
              {s.bullets.map((b, i) => (
                <li key={i} className="flex gap-3 rounded-2xl border border-primary/25 bg-card/50 p-4 text-base leading-snug">
                  <CircleCheck className="mt-0.5 size-5 shrink-0 text-primary" aria-hidden="true" />
                  <span>
                    <InlineText text={b} linkClassName={link} />
                  </span>
                </li>
              ))}
            </ul>
          )}

          {s.orderedList && (
            <ol className="mt-8 flex flex-col">
              {s.orderedList.map((item, i) => (
                <li key={i} className="flex gap-4 border-b border-primary/20 py-4 last:border-b-0">
                  <span
                    aria-hidden="true"
                    className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground"
                  >
                    {i + 1}
                  </span>
                  <span className="pt-1.5 text-base leading-relaxed sm:text-lg">
                    <InlineText text={item} linkClassName={link} />
                  </span>
                </li>
              ))}
            </ol>
          )}

          {s.table && (
            <div className="mt-8 overflow-x-auto rounded-[1.5rem] border border-primary/25 bg-card">
              <table className="w-full min-w-[34rem] border-collapse text-left text-sm sm:text-base">
                {s.table.caption && <caption className="p-4 text-left text-sm font-semibold text-foreground/80">{s.table.caption}</caption>}
                <thead>
                  <tr className="bg-primary text-primary-foreground">
                    {s.table.headers.map((h) => (
                      <th key={h} scope="col" className="p-3.5 font-semibold sm:p-4">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-primary/15">
                  {s.table.rows.map((row, r) => (
                    <tr key={r} className="even:bg-primary/5">
                      {row.map((cell, c) =>
                        c === 0 ? (
                          <th key={c} scope="row" className="p-3.5 font-semibold sm:p-4">
                            {cell}
                          </th>
                        ) : (
                          <td key={c} className="p-3.5 text-foreground/85 sm:p-4">
                            {cell}
                          </td>
                        ),
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      ))}

      {faqs.length > 0 && (
        <section id="frequently-asked-questions" className="scroll-mt-24 border-t border-primary/25 pt-12">
          <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl lg:text-4xl">Frequently asked questions</h2>
          <dl className="mt-8 flex flex-col gap-4">
            {faqs.map((f) => (
              <div key={f.question} className="rounded-[1.5rem] border border-primary/25 bg-card/50 p-5 sm:p-7">
                <dt>
                  <h3 className="text-lg font-semibold leading-snug tracking-tight sm:text-xl">{f.question}</h3>
                </dt>
                <dd className="mt-2 text-base leading-relaxed text-foreground/80 sm:text-lg">
                  <InlineText text={f.answer} linkClassName={link} />
                </dd>
              </div>
            ))}
          </dl>
        </section>
      )}
    </div>
  )
}
