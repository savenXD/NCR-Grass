import { notFound } from "next/navigation"
import { getAllBlogPosts, getBlogPostBySlug } from "@/lib/blog-data"
import { ogSize, pageOgImage } from "@/lib/og"

export const size = ogSize
export const contentType = "image/png"
export const alt = "NCR Grass lawn guide"

export function generateStaticParams() {
  return getAllBlogPosts().map((p) => ({ slug: p.slug }))
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const post = getBlogPostBySlug((await params).slug)
  if (!post) notFound()
  return pageOgImage({ eyebrow: post.category, title: post.title })
}
