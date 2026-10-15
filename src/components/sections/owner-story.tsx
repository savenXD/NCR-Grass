import { SectionHeading } from "@/components/shared/section-heading"
import { ownerFacts, ownerSteps, ownerPromises, ownerQuote } from "@/lib/owner"

/** Facts strip, quote, promises and journey for the owner page. Server component, no client JS. */
export function OwnerStory() {
  return (
    <>
      <section className="px-4 sm:px-6 lg:px-10 xl:px-14" aria-label="Key facts">
        <dl className="mx-auto grid max-w-6xl grid-cols-2 gap-3 lg:grid-cols-4">
          {ownerFacts.map((f) => (
            <div key={f.label} className="reveal rounded-[1.5rem] border border-primary/30 px-5 py-6 text-left sm:px-6">
              <dt className="sr-only">{f.label}</dt>
              <dd className="text-2xl font-bold tracking-tight text-primary sm:text-3xl" aria-hidden="true">{f.value}</dd>
              <dd className="mt-1 text-sm leading-snug text-foreground/75 sm:text-base">
                <span className="sr-only">{f.value} </span>
                {f.label}
              </dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="px-4 py-16 sm:px-6 sm:py-24 lg:px-10 xl:px-14">
        <figure className="reveal mx-auto max-w-3xl border-l-4 border-primary pl-5 sm:pl-8">
          <blockquote className="text-balance text-2xl font-medium leading-snug tracking-tight sm:text-3xl lg:text-4xl">
            &ldquo;{ownerQuote.text}&rdquo;
          </blockquote>
          <figcaption className="mt-5 text-sm font-semibold uppercase tracking-widest text-muted-foreground">{ownerQuote.cite}</figcaption>
        </figure>
      </section>

      <section className="px-4 pb-16 sm:px-6 sm:pb-24 lg:px-10 xl:px-14">
        <div className="mx-auto max-w-6xl">
          <SectionHeading eyebrow="How I work" title="What you can count on" />
          <ul className="mt-10 grid gap-4 sm:grid-cols-2">
            {ownerPromises.map(({ icon: Icon, title, text }) => (
              <li key={title} className="reveal rounded-[2rem] border-2 border-dotted border-primary/50 p-6 sm:p-8">
                <Icon className="size-7 text-primary" aria-hidden="true" />
                <h3 className="mt-5 text-xl font-semibold tracking-tight sm:text-2xl">{title}</h3>
                <p className="mt-2 text-base leading-relaxed text-foreground/75 sm:text-lg">{text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="px-4 pb-16 sm:px-6 sm:pb-24 lg:px-10 xl:px-14">
        <div className="mx-auto max-w-3xl">
          <SectionHeading eyebrow="The process" title="How a lawn with us goes" />
          <ol className="mt-10 border-l-2 border-primary/30">
            {ownerSteps.map((s, i) => (
              <li key={s.title} className="reveal relative pb-10 pl-7 last:pb-0 sm:pl-10">
                <span aria-hidden="true" className="absolute -left-[7px] top-1.5 size-3 rounded-full border-2 border-primary bg-background" />
                <p className="text-xs font-semibold uppercase tracking-widest text-primary">Step {i + 1}</p>
                <h3 className="mt-1 text-xl font-semibold tracking-tight sm:text-2xl">{s.title}</h3>
                <p className="mt-2 text-base leading-relaxed text-foreground/75 sm:text-lg">{s.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </>
  )
}
