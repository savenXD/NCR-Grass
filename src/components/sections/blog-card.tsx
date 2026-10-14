import Link from "next/link"
import { ArrowUpRight, Clock } from "lucide-react"
import { Pic } from "@/components/shared/pic"
import { cn } from "@/lib/utils"
import { formatPostDate, type BlogPost } from "@/lib/blog-data"

type Props = {
  post: BlogPost
  /** Large horizontal card for the first post on the blog index */
  featured?: boolean
  /** Photo is above the fold: load it eagerly */
  eager?: boolean
  className?: string
}

/**
 * One guide in a list. The whole card is a single link (the title), so crawlers get one clear anchor per post
 * and the photo/excerpt stay plain, readable content. Server component.
 */
export function BlogCard({ post, featured = false, eager = false, className }: Props) {
  const href = `/blog/${post.slug}`
  return (
    <article
      className={cn(
        "group relative flex overflow-hidden rounded-[1.75rem] border border-primary/25 bg-card/60 transition-colors hover:border-primary/60 focus-within:border-primary",
        featured ? "flex-col lg:flex-row" : "flex-col",
        className,
      )}
    >
      <div className={cn("relative aspect-[16/10] shrink-0 overflow-hidden bg-primary/10", featured ? "lg:aspect-auto lg:w-[55%]" : "")}>
        <Pic
          src={post.image.src}
          alt={post.image.alt}
          eager={eager}
          sizes={featured ? "(min-width: 1024px) 700px, 100vw" : "(min-width: 1024px) 420px, (min-width: 640px) 45vw, 100vw"}
          className="transition-transform duration-700 group-hover:scale-105"
        />
      </div>

      <div className={cn("flex flex-1 flex-col p-6 sm:p-8", featured && "lg:justify-center lg:p-10")}>
        <div className="flex flex-wrap items-center gap-2 text-xs font-semibold">
          <span className="rounded-full bg-primary px-3 py-1 text-primary-foreground">{post.category}</span>
          {post.locationTag && <span className="rounded-full border border-primary/40 px-3 py-1 text-foreground/80">{post.locationTag}</span>}
        </div>

        <h3 className={cn("mt-4 text-balance font-semibold leading-snug tracking-tight", featured ? "text-2xl sm:text-3xl lg:text-4xl" : "text-xl sm:text-2xl")}>
          {/* The stretched link makes the whole card clickable without nesting anchors */}
          <Link href={href} className="after:absolute after:inset-0 focus-visible:outline-none">
            {post.title}
          </Link>
        </h3>

        <p className="mt-3 text-pretty text-base leading-relaxed text-foreground/75">{post.excerpt}</p>

        <div className="mt-auto flex items-center justify-between gap-4 pt-6 text-sm text-foreground/70">
          <p className="flex flex-wrap items-center gap-x-3 gap-y-1">
            <span className="inline-flex items-center gap-1.5">
              <Clock className="size-4" aria-hidden="true" />
              {post.readTime}
            </span>
            <time dateTime={post.updatedDate ?? post.publishedDate}>{formatPostDate(post.updatedDate ?? post.publishedDate)}</time>
          </p>
          <span
            aria-hidden="true"
            className="flex size-11 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground transition-transform group-hover:rotate-45"
          >
            <ArrowUpRight className="size-5" />
          </span>
        </div>
      </div>
    </article>
  )
}
