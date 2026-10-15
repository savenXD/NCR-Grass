/**
 * Single source of truth for business details and homepage content.
 * Everything marked PLACEHOLDER is unconfirmed — see docs/todo.md.
 * Swap values here (not in components) once the client confirms.
 */

export const site = {
  name: "NCR Grass",
  url: "https://ncrgrass.in",
  // Official contact channels
  phone: "+916399080816",
  phoneDisplay: "+91 63990 80816",
  whatsapp: "916399080816",
  address: "Dasna, Ghaziabad, Uttar Pradesh", // street + PIN pending (docs/todo.md)
  /** Structured address for JSON-LD. Fill streetAddress/postalCode once confirmed. */
  postalAddress: {
    addressLocality: "Dasna",
    addressRegion: "Uttar Pradesh",
    addressCountry: "IN",
  },
  /** Short line used in titles/descriptions */
  tagline: "Natural lawn grass supply & installation",
} as const

export const whatsappHref = `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(
  "Hi NCR Grass, I'd like a quote for a natural lawn."
)}`
export const phoneHref = `tel:${site.phone}`

/** Pinned business location (from the client's Google Maps pin: 28°39'37.7"N 77°31'49.7"E). */
export const location = {
  lat: 28.660472,
  lng: 77.530472,
  embedSrc:
    "https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3500.9225050422383!2d77.530472!3d28.660472!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMjjCsDM5JzM3LjciTiA3N8KwMzEnNDkuNyJF!5e0!3m2!1sen!2sin!4v1791903859641!5m2!1sen!2sin",
} as const
export const directionsHref = `https://www.google.com/maps/dir/?api=1&destination=${location.lat},${location.lng}`

/** Main pages (navbar). Contact is the nav button. */
export const navLinks = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Meet the Owner", href: "/meet-the-owner" },
  { name: "Services", href: "/services" },
  { name: "Gallery", href: "/gallery" },
  { name: "Service Areas", href: "/service-areas" },
  { name: "Blog", href: "/blog" },
  { name: "FAQ", href: "/faq" },
  { name: "Contact", href: "/contact" },
] as const

/** Legal pages, footer only. */
export const legalLinks = [
  { name: "Privacy Policy", href: "/privacy-policy" },
  { name: "Terms of Use", href: "/terms-of-use" },
  { name: "Disclaimer", href: "/disclaimer" },
] as const

/** Every main page, for the footer. */
export const footerLinks = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Meet the Owner", href: "/meet-the-owner" },
  { name: "Services", href: "/services" },
  { name: "Gallery", href: "/gallery" },
  { name: "Service Areas", href: "/service-areas" },
  { name: "Blog", href: "/blog" },
  { name: "FAQ", href: "/faq" },
  { name: "Contact", href: "/contact" },
] as const

// PLACEHOLDER — no invented numbers; client to supply real figures
export const trustPoints = [
  "Farm-fresh natural grass",
  "End-to-end lawn setup",
  "Farmhouses to corporate campuses",
] as const

export type Audience = {
  title: string
  text: string
  /** 16:9 photos in /public/images/who-we-serve/ — unset shows placeholders */
  before?: string
  after?: string
  alt?: string
}

export const audiences: Audience[] = [
  {
    title: "Farmhouses & Estates",
    text: "Acres of lush, easy-care lawn.",
    before: "/images/who-we-serve/farmhouse-before.jpg",
    after: "/images/who-we-serve/farmhouse-after.jpg",
    alt: "Farmhouse estate lawn transformation",
  },
  {
    title: "Corporate Offices",
    text: "Greener campuses that impress.",
    before: "/images/who-we-serve/corporate-before.jpg",
    after: "/images/who-we-serve/corporate-after.jpg",
    alt: "Corporate campus lawn installation",
  },
  {
    title: "Hotels & Commercial",
    text: "Welcoming grounds for guests.",
    before: "/images/who-we-serve/hotel-before.jpg",
    after: "/images/who-we-serve/hotel-after.jpg",
    alt: "Hotel grounds and commercial lawn",
  },
  {
    title: "Homes & Villas",
    text: "A soft green lawn at your door.",
    before: "/images/who-we-serve/villa-before.jpg",
    after: "/images/who-we-serve/villa-after.jpg",
    alt: "Residential villa front lawn",
  },
]

export type Service = {
  title: string
  text: string
  /** 1:1 transparent-background PNG/WebP in /public/images/services/ — unset shows a placeholder slot */
  image?: string
  imageAlt?: string
  /** Internal link to the relevant lawn guide */
  guide?: { href: string; label: string }
}

export const services: Service[] = [
  {
    title: "Natural Grass Supply",
    text: "Buy fresh, healthy natural grass cut to order and delivered straight to your farmhouse, office or home. Every roll is handled with care so it reaches your site green and ready to lay.",
    image: "/images/services/grass-supply.webp",
    imageAlt: "Fresh natural grass turf ready for supply and delivery",
    guide: { href: "/blog/best-natural-grass-varieties-delhi-ncr-climate", label: "Compare lawn grass types for Delhi NCR" },
  },
  {
    title: "Ground Levelling & Preparation",
    text: "A great lawn starts with the ground beneath it. We clear mud, weeds and debris, level uneven patches and prepare the soil so your grass can root evenly and grow thick.",
    image: "/images/services/ground-preparation.webp",
    imageAlt: "Ground levelling and preparation before turf laying",
    guide: { href: "/blog/how-to-prepare-soil-for-natural-lawn-grass-north-india", label: "How to prepare soil for a natural lawn" },
  },
  {
    title: "Lawn Installation",
    text: "Our trained team lays natural turf from edge to edge with tight seams and clean borders, so your lawn looks seamless from day one and settles in quickly.",
    image: "/images/services/lawn-installation.webp",
    imageAlt: "Professional lawn turf installation",
    guide: { href: "/blog/lawn-installation-guide-ghaziabad-residential-farmhouses", label: "Lawn installation step by step" },
  },
  {
    title: "Aftercare Guidance",
    text: "We guide you on watering, mowing and feeding after installation, so your new lawn establishes well and stays lush through every season.",
    image: "/images/services/aftercare.webp",
    imageAlt: "Lawn aftercare guidance and watering support",
    guide: { href: "/blog/maintaining-natural-lawn-delhi-ncr-summer-heat-monsoon", label: "Lawn care through summer, monsoon and winter" },
  },
]

// PLACEHOLDER — "almost all of North India" per client; confirm exact regions/cities (docs/todo.md).
// Names must match the highlighted states in src/lib/india-map.ts (Delhi = "NCT of Delhi").
export const areas = [
  "Delhi NCR",
  "Haryana",
  "Punjab",
  "Himachal Pradesh",
  "Uttarakhand",
  "Uttar Pradesh",
  "Rajasthan",
  "Jammu & Kashmir",
  "Chandigarh",
] as const

export type Reason = {
  title: string
  text: string
  /** 4:3 photo in /public/images/why-choose-us/ — unset shows a placeholder */
  image?: string
  imageAlt?: string
}

export const reasons: Reason[] = [
  {
    title: "Farm-Fresh, Sold Direct",
    text: "Natural grass harvested on the farm and sent straight to you, with no middlemen in between.",
    image: "/images/why-choose-us/farm-direct.jpg",
    imageAlt: "Fresh natural grass turf harvested direct from the farm",
  },
  {
    title: "Delivered to Your Gate",
    text: "We bring the turf right to your site, so there is no pickup or transport to arrange.",
    image: "/images/why-choose-us/doorstep-delivery.jpg",
    imageAlt: "Direct doorstep turf delivery across North India",
  },
  {
    title: "Bulk Supply, Any Size",
    text: "From a single home lawn to acres of farmhouse grounds, we supply grass in bulk.",
    image: "/images/why-choose-us/bulk-orders.jpg",
    imageAlt: "Bulk natural grass supply for farmhouses and large estates",
  },
  {
    title: "Free On-Site Assessment",
    text: "Our team visits your site at no cost to check the ground and plan your lawn.",
    image: "/images/why-choose-us/site-assessment.jpg",
    imageAlt: "Free on-site assessment and lawn ground planning",
  },
]

// Cost, timing and season answers are left out until the client supplies real figures (docs/todo.md); no "to be confirmed" copy goes live.
// First 5 are the best ones: the homepage shows only those; /faq shows all.
export const faqs = [
  {
    q: "Is lawn grass the same as turf, sod or carpet grass?",
    a: "Yes. Lawn grass, natural grass, green grass, natural turf, sod, grass carpet and carpet grass all mean real grass grown on a farm and cut with its roots and soil, ready to lay. In Hindi it is usually called ghaas or hari ghaas. Artificial grass (also called fake grass, synthetic turf or grass mat) is a different, plastic product.",
  },
  {
    q: "Do you only supply grass, or also lay it?",
    a: "Both. You can buy grass supply only, or have us handle the whole installation.",
  },
  {
    q: "Do you offer a free site visit?",
    a: "Yes. We do a free on-site assessment to check the soil, levels and drainage, and to work out how much grass your area needs.",
  },
  {
    q: "Which areas do you deliver grass to?",
    a: "We serve almost all of North India. Delhi NCR is our express delivery area, and we also work across Haryana, Punjab, Chandigarh, Uttar Pradesh, Rajasthan, Himachal Pradesh, Uttarakhand and Jammu & Kashmir.",
  },
  {
    q: "How do I get a quote?",
    a: "Call or WhatsApp us, or fill in the request form on our contact page with your location and approximate area. We will get back to you and arrange a free site assessment.",
  },
  {
    q: "Do you handle muddy or uneven land?",
    a: "Yes. Ground levelling and preparation is part of our end-to-end service.",
  },
  {
    q: "Is natural grass better than artificial turf?",
    a: "For most outdoor spaces, yes. Natural grass stays cooler in summer, absorbs rainwater, supports healthy soil and feels soft underfoot, while artificial turf heats up and wears out over time.",
  },
  {
    q: "How do I look after a newly laid lawn?",
    a: "New turf needs regular watering while the roots establish. We give you a simple aftercare plan covering watering, first mowing and seasonal care.",
  },
] as const

// DRAFT copy for the About page — no facts invented; client to confirm.
export const values = [
  { title: "Farm-fresh natural grass", text: "Freshly cut natural turf, supplied ready to lay for your site." },
  { title: "End-to-end lawn setup", text: "From ground levelling and preparation to laying and aftercare, we handle it all." },
  { title: "Farmhouses to corporate campuses", text: "Lawns for farmhouses, offices, hotels and homes across North India." },
] as const


