import { notFound } from "next/navigation"
import { getLocation, locations } from "@/lib/locations"
import { ogSize, pageOgImage } from "@/lib/og"

export const size = ogSize
export const contentType = "image/png"
export const alt = "NCR Grass service area"

export function generateStaticParams() {
  return locations.map((l) => ({ slug: l.slug }))
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const loc = getLocation((await params).slug)
  if (!loc) notFound()
  return pageOgImage({ eyebrow: "Service area", title: loc.h1 })
}
