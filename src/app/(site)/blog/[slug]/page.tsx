import type { Metadata } from "next"
import Link from "next/link"
import { Clock, MessageCircle, Phone } from "lucide-react"
import { notFound } from "next/navigation"
import { phoneHref, site, whatsappHref } from "@/lib/site"
import { PageCta } from "@/components/sections/page-cta"
import { PageHero } from "@/components/sections/page-hero"
import { ArticleBody } from "@/components/sections/article-body"
import { BlogCard } from "@/components/sections/blog-card"
import { Pic } from "@/components/shared/pic"
import { formatPostDate, getAllBlogPosts, getBlogPostBySlug, getRelatedBlogPosts } from "@/lib/blog-data"
import { JsonLd } from "@/components/shared/json-ld"
import { getLocation, locationHref } from "@/lib/locations"
import { pageMetadata } from "@/lib/metadata"
import { blogFaqJsonLd, blogPostingJsonLd } from "@/lib/schema"

type PageProps = {
  params: Promise<{ slug: string }>
}

export const ensureStatic = "navigation"

export async function generateStaticParams() {
  return getAllBlogPosts().map((post) => ({
    slug: post.slug,
  }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const post = getBlogPostBySlug(slug)
  if (!post) return {}

  return pageMetadata({
    title: post.metaTitle,
    description: post.metaDescription,
    path: `/blog/${post.slug}`,
    sharedImage: false, // uses ./opengraph-image.tsx
    article: { publishedTime: post.publishedDate, modifiedTime: post.updatedDate, authors: [post.author] },
  })
}

export default function BlogPostPage({ params }: PageProps) {
  // Params are prerendered by generateStaticParams; ensureStatic keeps the full article/location HTML in the response (crawlers, no streamed fallback)
  return <BlogPost params={params} />
}

async function BlogPost({ params }: PageProps) {
  const { slug } = await params
  const post = getBlogPostBySlug(slug)

  if (!post) {
    notFound()
  }

  const related = getRelatedBlogPosts(post.slug)
  const locations = post.relatedLocations.map(getLocation).filter((l) => l !== undefined)

  return (
    <main id="top">
      <JsonLd
        data={[
          blogPostingJsonLd(post),
          ...(post.faqs.length > 0 ? [blogFaqJsonLd(post)] : []),
        ]}
      />

      <PageHero path={`/blog/${post.slug}`} parent={{ name: "Blog", href: "/blog" }} crumb={post.metaTitle} title={post.title} compact />

      <section className="px-4 py-12 sm:px-6 sm:py-20 lg:px-10 xl:px-14">
        <div className="mx-auto grid max-w-[90rem] gap-10 lg:grid-cols-[18rem_minmax(0,1fr)] lg:gap-16 xl:grid-cols-[20rem_minmax(0,1fr)]">
          {/* On this page: static card on mobile, sticky rail on desktop */}
          <aside className="lg:order-first">
            <nav aria-label="On this page" className="rounded-[1.75rem] border border-primary/25 bg-card/50 p-5 sm:p-6 lg:sticky lg:top-24">
              <p className="text-sm font-semibold uppercase tracking-widest text-primary">On this page</p>
              <ol className="mt-4 flex flex-col gap-1">
                {post.sections.map((sec, i) => (
                  <li key={sec.id}>
                    <a href={`#${sec.id}`} className="flex min-h-12 items-center gap-3 rounded-xl px-2 py-2 text-sm font-medium leading-snug transition-colors hover:bg-primary/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                      <span className="font-bold text-primary">{String(i + 1).padStart(2, "0")}</span>
                      {sec.title}
                    </a>
                  </li>
                ))}
                {post.faqs.length > 0 && (
                  <li>
                    <a href="#frequently-asked-questions" className="flex min-h-12 items-center gap-3 rounded-xl px-2 py-2 text-sm font-medium leading-snug transition-colors hover:bg-primary/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                      <span className="font-bold text-primary">{String(post.sections.length + 1).padStart(2, "0")}</span>
                      Frequently asked questions
                    </a>
                  </li>
                )}
              </ol>
            </nav>
          </aside>

          <article className="min-w-0 max-w-3xl">
            <p className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm font-medium text-foreground/75">
              <span className="rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground">{post.category}</span>
              <span className="inline-flex items-center gap-1.5">
                <Clock className="size-4" aria-hidden="true" />
                {post.readTime}
              </span>
              <span>
                By {post.author} · <time dateTime={post.publishedDate}>{formatPostDate(post.publishedDate)}</time>
              </span>
              {post.updatedDate && (
                <span>
                  Updated <time dateTime={post.updatedDate}>{formatPostDate(post.updatedDate)}</time>
                </span>
              )}
            </p>

            <figure className="relative mt-6 aspect-[16/10] overflow-hidden rounded-[1.75rem] bg-primary/10 sm:rounded-[2.25rem]">
              <Pic src={post.image.src} alt={post.image.alt} sizes="(min-width: 1280px) 768px, (min-width: 1024px) 60vw, 100vw" />
            </figure>

            <p className="mt-8 text-pretty text-xl leading-relaxed text-foreground/90 sm:text-2xl sm:leading-relaxed">{post.excerpt}</p>

            <div className="mt-12">
              <ArticleBody sections={post.sections} faqs={post.faqs} />
            </div>

            <div className="mt-16 rounded-[1.75rem] border-2 border-dotted border-primary/60 p-6 sm:p-9">
              <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">Questions about your own lawn?</h2>
              <p className="mt-3 text-base leading-relaxed text-foreground/75 sm:text-lg">
                Call or WhatsApp {site.name} and the team can visit your site for free, check the ground and plan the lawn with you.
              </p>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <a
                  href={phoneHref}
                  className="inline-flex h-14 items-center justify-center gap-3 rounded-full bg-primary px-7 text-base font-semibold text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <Phone className="size-5" aria-hidden="true" />
                  Call {site.phoneDisplay}
                </a>
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-14 items-center justify-center gap-3 rounded-full border border-primary/50 px-7 text-base font-semibold transition-colors hover:bg-primary/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <MessageCircle className="size-5" aria-hidden="true" />
                  WhatsApp us
                </a>
              </div>
              <p className="mt-6 text-sm font-medium text-foreground/75">
                Where we supply:{" "}
                {locations.map((l, i) => (
                  <span key={l.slug}>
                    {i > 0 && " · "}
                    <Link href={locationHref(l.slug)} className="font-semibold text-primary underline decoration-primary/40 underline-offset-4 hover:decoration-primary">
                      {l.name}
                    </Link>
                  </span>
                ))}
                {" · "}
                <Link href="/services" className="font-semibold text-primary underline decoration-primary/40 underline-offset-4 hover:decoration-primary">
                  All services
                </Link>
              </p>
            </div>
          </article>
        </div>
      </section>

      {related.length > 0 && (
        <section className="px-4 pb-16 sm:px-6 sm:pb-24 lg:px-10 xl:px-14">
          <div className="mx-auto max-w-[90rem]">
            <h2 className="text-2xl font-semibold tracking-tight sm:text-4xl">Keep reading</h2>
            <ul className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {related.map((rel) => (
                <li key={rel.slug} className="reveal flex">
                  <BlogCard post={rel} className="w-full" />
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <PageCta />
    </main>
  )
}
