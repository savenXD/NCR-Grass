import Link from "next/link"
import { SectionHeading } from "@/components/shared/section-heading"
import { blogPosts } from "@/lib/blog-data"

/** Lawn guides relevant to a place (internal linking from location pages to the blog). Server component. */
export function GuideLinks({ place, locationSlug }: { place: string; locationSlug: string }) {
  const posts = blogPosts.filter((p) => p.relatedLocations.includes(locationSlug))
  if (posts.length === 0) return null
  return (
    <section className="px-4 py-16 sm:px-6 sm:py-24 lg:px-10 xl:px-14">
      <div className="mx-auto max-w-[90rem]">
        <SectionHeading eyebrow="Guides" title={`Lawn guides for ${place}`} description="Practical reading before you plan your lawn." />
        <ul className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((p) => (
            <li key={p.slug} className="reveal">
              <Link
                href={`/blog/${p.slug}`}
                className="block h-full rounded-[1.75rem] border border-primary/25 px-6 py-5 transition-colors hover:border-primary hover:bg-primary/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <span className="block text-xs font-semibold uppercase tracking-widest text-primary">{p.category}</span>
                <span className="mt-1 block text-lg font-semibold leading-snug tracking-tight">{p.title}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
