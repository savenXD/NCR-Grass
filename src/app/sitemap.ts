import type { MetadataRoute } from "next"
import { reasons, services, site } from "@/lib/site"
import { locationHref, locations } from "@/lib/locations"
import { blogPosts } from "@/lib/blog-data"
import { photoUrl } from "@/lib/photo"

/** Bump when page content changes materially. Blog posts use their own publish date. */
const lastModified = new Date("2026-10-14")

/** Photos shown on the homepage (the optimised /img files the page really serves), listed for Google Images. */
const homeImages = [...services, ...reasons]
  .map((x) => x.image)
  .filter((src): src is string => Boolean(src))
  .map(photoUrl)

const pages = ["", "/services", "/service-areas", "/about", "/faq", "/contact", "/blog"]

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    ...pages.map((r) => ({
      url: `${site.url}${r}`,
      lastModified,
      ...(r === "" && { images: homeImages }),
      changeFrequency: "monthly" as const, priority: r === "" ? 1 : 0.7,
    })),
    ...blogPosts.map((p) => ({
      url: `${site.url}/blog/${p.slug}`,
      lastModified: new Date(p.updatedDate ?? p.publishedDate),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    ...["/privacy-policy", "/terms-of-use", "/disclaimer"].map((r) => ({
      url: `${site.url}${r}`,
      lastModified,
      changeFrequency: "yearly" as const,
      priority: 0.2,
    })),
    ...locations.map((l) => ({
      url: `${site.url}${locationHref(l.slug)}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: l.kind === "city" ? 0.9 : 0.7,
    })),
  ]
}
