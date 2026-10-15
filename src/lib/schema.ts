/**
 * JSON-LD builders (schema.org). One business entity, referenced by @id everywhere.
 * Rules: docs/seo.md §4 Phase 1. Never add aggregateRating/review for our own business.
 */
import { areas, location, services, site } from "@/lib/site"
import type { Faq, LocationPage } from "@/lib/locations"
import { cityLocations, stateLocations } from "@/lib/locations"
import type { BlogPost } from "@/lib/blog-data"
import { stripLinks } from "@/components/shared/inline-text"
import { photoUrl } from "@/lib/photo"
import { owner } from "@/lib/owner"

/** What people call the product/service (docs/seo.md §3a). Used as schema hints, not as hidden text. */
const termFamilies = [
  ["Natural lawn grass", "Natural grass", "Green grass", "Natural turf", "Sod", "Grass carpet", "Carpet grass"],
  ["Lawn installation", "Grass plantation", "Grass planting", "Turf laying", "Lawn development"],
  ["Ground levelling", "Land levelling", "Lawn care"],
]

const covered = [...cityLocations, ...stateLocations].map((l) => l.name.toLowerCase())
const extraAreas = areas.filter((a) => a !== "Delhi NCR" && !covered.includes(a.toLowerCase()))

export const businessId = `${site.url}/#business`
const websiteId = `${site.url}/#website`

const abs = (path: string) => `${site.url}${path === "/" ? "" : path}`

export function businessJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "HomeAndConstructionBusiness",
    "@id": businessId,
    name: site.name,
    description:
      "Farm-fresh natural lawn grass supply, ground levelling and lawn installation for farmhouses, offices, schools, marriage lawns and homes across Delhi NCR and North India. Based in Dasna, Ghaziabad.",
    url: site.url,
    telephone: site.phone,
    logo: abs("/logo.svg"),
    image: abs("/ncr-grass-natural-lawn-villa.webp"),
    address: { "@type": "PostalAddress", ...site.postalAddress },
    geo: { "@type": "GeoCoordinates", latitude: location.lat, longitude: location.lng },
    hasMap: `https://www.google.com/maps?q=${location.lat},${location.lng}`,
    areaServed: [
      ...cityLocations.map((l) => ({ "@type": "City", name: l.name })),
      ...stateLocations.map((l) => ({ "@type": "State", name: l.name })),
      // Regions the client serves that have no page of their own yet (the homepage list and map show them too)
      ...extraAreas.map((name) => ({ "@type": "AdministrativeArea", name })),
    ],
    knowsAbout: termFamilies.flat(),
    makesOffer: services.map((s) => ({
      "@type": "Offer",
      itemOffered: { "@type": "Service", name: s.title, description: s.text },
    })),
    // TODO: add openingHoursSpecification, sameAs (GBP, Instagram, YouTube) and postalCode once confirmed
  }
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": websiteId,
    url: site.url,
    name: site.name,
    inLanguage: "en-IN",
    publisher: { "@id": businessId },
  }
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [{ name: "Home", path: "/" }, ...items].map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: abs(it.path),
    })),
  }
}

/** Only for FAQs whose answers are final (no "to be confirmed"). */
export function faqJsonLd(faqs: readonly Faq[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  }
}

/** Service offered in one city/state, tied to the business entity. */
export function locationServiceJsonLd(loc: LocationPage, path: string) {
  const area =
    loc.kind === "state"
      ? { "@type": "State", name: loc.name }
      : {
          "@type": "City",
          name: loc.name,
          containedInPlace: { "@type": loc.state === "Delhi" ? "City" : "State", name: loc.state },
        }
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${abs(path)}#service`,
    name: `Natural lawn grass supply & installation in ${loc.name}`,
    serviceType: "Natural grass supply and lawn installation",
    alternateName: [`Grass plantation in ${loc.name}`, `Turf laying in ${loc.name}`, `Green grass supplier in ${loc.name}`],
    url: abs(path),
    provider: { "@id": businessId },
    areaServed: area,
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: `Lawn services in ${loc.name}`,
      itemListElement: services.map((s) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: `${s.title} in ${loc.name}` },
      })),
    },
  }
}

/** Blog article, authored and published by the business entity (not a second, anonymous organisation). */
export function blogPostingJsonLd(post: BlogPost) {
  const url = abs(`/blog/${post.slug}`)
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${url}#article`,
    headline: post.title,
    description: post.metaDescription,
    url,
    mainEntityOfPage: url,
    inLanguage: "en-IN",
    image: photoUrl(post.image.src),
    datePublished: post.publishedDate,
    dateModified: post.updatedDate ?? post.publishedDate,
    articleSection: post.category,
    author: { "@id": businessId },
    publisher: { "@id": businessId },
  }
}

/** Blog FAQs use the same shape as location FAQs. */
export const blogFaqJsonLd = (post: BlogPost) =>
  faqJsonLd(post.faqs.map((f) => ({ q: f.question, a: stripLinks(f.answer) })))

/** Founder profile page: a Person who founded the one business entity. */
export function ownerJsonLd() {
  return [
    breadcrumbJsonLd([{ name: "Meet the Owner", path: "/meet-the-owner" }]),
    {
      "@context": "https://schema.org",
      "@type": "ProfilePage",
      mainEntity: {
        "@type": "Person",
        "@id": `${site.url}/#owner`,
        name: owner.name,
        jobTitle: owner.role,
        image: abs("/img/owner/arjun-yadav-800.webp"),
        url: abs("/meet-the-owner"),
        worksFor: { "@id": businessId },
        address: { "@type": "PostalAddress", ...site.postalAddress },
      },
    },
  ]
}
