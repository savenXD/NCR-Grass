import type { LegalSection } from "@/lib/legal"

/** Simple, readable prose for legal pages. Server component, no animation. */
export function LegalContent({ sections, updated }: { sections: LegalSection[]; updated: string }) {
  return (
    <section className="px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
      <div className="mx-auto max-w-3xl">
        <p className="text-sm font-medium text-foreground/70">Last updated: {updated}</p>
        {sections.map((s) => (
          <div key={s.title} className="mt-10">
            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">{s.title}</h2>
            {s.paragraphs.map((p, i) => (
              <p key={i} className="mt-4 text-base leading-relaxed text-foreground/80 sm:text-lg">
                {p}
              </p>
            ))}
            {s.bullets && (
              <ul className="mt-4 list-disc space-y-2 pl-6 text-base leading-relaxed text-foreground/80 sm:text-lg">
                {s.bullets.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}
