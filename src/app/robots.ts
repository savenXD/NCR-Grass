import type { MetadataRoute } from "next"
import { site } from "@/lib/site"

export default function robots(): MetadataRoute.Robots {
  // Preview deployments (e.g. *.vercel.app previews) must never be indexed as duplicates of ncrgrass.in
  if (process.env.VERCEL_ENV && process.env.VERCEL_ENV !== "production") {
    return { rules: { userAgent: "*", disallow: "/" } }
  }
  return { rules: { userAgent: "*", allow: "/", disallow: ["/api/", "/admin"] }, sitemap: `${site.url}/sitemap.xml` }
}
