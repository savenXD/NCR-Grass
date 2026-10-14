import Link from "next/link"
import { pageMetadata } from "@/lib/metadata"
import { PageHero } from "@/components/sections/page-hero"
import { PageCta } from "@/components/sections/page-cta"
import { BlogCard } from "@/components/sections/blog-card"
import { SectionHeading } from "@/components/shared/section-heading"
import { JsonLd } from "@/components/shared/json-ld"
import { getAllBlogPosts } from "@/lib/blog-data"
import { cityLocations, locationHref } from "@/lib/locations"
import { site } from "@/lib/site"

export const metadata = pageMetadata({
  title: "Lawn Guides for Delhi NCR: Soil, Care & Costs",
  description:
    "Practical guides on lawn grass types, soil preparation, lawn care and what decides the cost of a natural lawn in Dasna, Ghaziabad, Noida and Delhi NCR.",
  path: "/blog",
})

export default function BlogIndexPage() {
  const posts = getAllBlogPosts()
  const [featured, ...rest] = posts

  return (
    <main id="top">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: "NCR Grass lawn guides",
          url: `${site.url}/blog`,
          inLanguage: "en-IN",
          mainEntity: {
            "@type": "ItemList",
            itemListElement: posts.map((p, i) => ({
              "@type": "ListItem",
              position: i + 1,
              url: `${site.url}/blog/${p.slug}`,
              name: p.title,
            })),
          },
        }}
      />
      <PageHero
        path="/blog"
        crumb="Blog"
        title="Lawn Guides & Field Insights"
        description="Practical guides on lawn grass types, ground preparation, costs and lawn care for Delhi NCR, Dasna, Ghaziabad and Noida."
      />

      <section className="px-4 py-16 sm:px-6 sm:py-24 lg:px-10 xl:px-14">
        <div className="mx-auto max-w-[90rem]">
          <SectionHeading
            eyebrow="Guides"
            title="Know your lawn before you plan it"
            description="Hot summers, heavy monsoons and cold winter nights make Delhi NCR hard on lawns. These guides cover the grass types, soil preparation, seasonal care and costs behind a lawn that lasts."
          />

          <div className="mt-12 flex flex-col gap-6">
            <BlogCard post={featured} featured eager className="reveal" />
            <ul className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {rest.map((post) => (
                <li key={post.slug} className="reveal flex">
                  <BlogCard post={post} className="w-full" />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="px-4 pb-16 sm:px-6 sm:pb-24 lg:px-10 xl:px-14">
        <div className="reveal mx-auto max-w-[90rem] rounded-[1.75rem] border border-primary/25 p-6 sm:p-10">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary">Local guides</p>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">Looking for lawn grass near you?</h2>
          <p className="mt-3 max-w-2xl text-base leading-relaxed text-foreground/75">
            We supply and install natural lawn grass from Dasna, Ghaziabad. See how it works in your area:
          </p>
          <ul className="mt-6 flex flex-wrap gap-2.5">
            {cityLocations.map((l) => (
              <li key={l.slug}>
                <Link
                  href={locationHref(l.slug)}
                  className="inline-flex min-h-12 items-center rounded-full border border-foreground/30 px-5 text-sm font-medium transition-colors hover:border-primary hover:bg-primary/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  Lawn grass in {l.name}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/services"
                className="inline-flex min-h-12 items-center rounded-full bg-primary px-5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                Our services
              </Link>
            </li>
          </ul>
        </div>
      </section>

      <PageCta />
    </main>
  )
}
