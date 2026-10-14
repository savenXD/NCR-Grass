import { SectionHeading } from "@/components/shared/section-heading"
import { values } from "@/lib/site"

export function AboutValues() {
  return (
    <section className="px-4 py-16 sm:px-6 sm:py-24 lg:px-10 xl:px-14">
      <div className="mx-auto max-w-[90rem]">
        <SectionHeading
          eyebrow="Why NCR Grass"
          title="What you can expect from us"
          className="mx-auto text-center"
        />
        <ul className="mt-12 grid gap-4 lg:grid-cols-3">
          {values.map((v, i) => (
            <li key={v.title} className="reveal rounded-[2rem] border-2 border-dotted border-primary/50 p-6 sm:p-8">
              <span className="text-6xl font-black leading-none text-primary/25" aria-hidden="true">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-6 text-2xl font-semibold tracking-tight">{v.title}</h3>
              <p className="mt-3 text-base leading-relaxed text-foreground/75 sm:text-lg">{v.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
