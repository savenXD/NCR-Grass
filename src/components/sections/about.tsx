import Link from "next/link"
import { ArrowRight, Leaf } from "lucide-react"
import { InlineImage } from "@/components/shared/inline-image"

/**
 * DRAFT copy — no facts invented, client to confirm (docs/todo.md).
 * Pill images are temporary stock/web photos — replace with real NCR Grass project photos.
 */
/** `showMoreLink` is off on /about itself, where "Know More" would link to the same page. */
export function About({ showMoreLink = true }: { showMoreLink?: boolean }) {
  return (
    <section id="about" className="px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center text-center">
        <h2 className="reveal inline-flex items-center gap-2 rounded-full border border-border bg-card/70 px-4 py-2 text-sm font-medium">
          <Leaf className="size-4 text-primary" aria-hidden="true" />
          About NCR Grass
        </h2>

        <p className="reveal reveal-d1 mt-8 text-balance text-[1.65rem] font-medium leading-[1.45] tracking-tight sm:text-4xl sm:leading-[1.45] md:text-5xl md:leading-[1.4] lg:text-[3.5rem] lg:leading-[1.35]">
          We&apos;re passionate about turning bare, muddy land into lush{" "}
          <InlineImage
            grow
            src="/images/about/green-field-single-tree.jpg"
            alt="Open green field with a single tree, the kind of bare land we turn into a natural lawn"
            fallback="bg-gradient-to-r from-lime-700 via-lime-500 to-emerald-700"
          />
          natural lawns. Our team is dedicated to supplying fresh grass and laying it with care for farmhouses,{" "}
          <InlineImage
            grow
            src="/images/about/farmhouse-lawn-at-dusk.jpg"
            alt="Farmhouse at dusk with a manicured natural grass lawn"
            fallback="bg-gradient-to-r from-amber-800 via-orange-400 to-lime-600"
          />
          offices and commercial sites. From ground preparation to aftercare, we handle it all so your lawn looks great from{" "}
          <span className="whitespace-nowrap">
            day one.
            <InlineImage
            grow
            src="/images/about/rolling-green-grass-hills.jpg"
            alt="Rolling green natural grass with trees, an example of a well-established lawn"
            fallback="bg-gradient-to-r from-emerald-800 via-green-500 to-yellow-500"
          />
          </span>
        </p>

        {showMoreLink && (
          <Link
            href="/about"
            className="mt-10 inline-flex h-12 items-center gap-3 rounded-full border border-primary/50 py-1 pl-6 pr-1 text-sm font-semibold text-foreground transition-colors hover:bg-primary/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            Know More
            <span className="flex size-10 items-center justify-center rounded-full bg-primary text-primary-foreground">
              <ArrowRight className="size-4" aria-hidden="true" />
            </span>
          </Link>
        )}
      </div>
    </section>
  )
}
