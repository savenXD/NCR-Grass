/**
 * Long-form, crawlable copy for the inner pages (About, Services, Service Areas, FAQ, Contact).
 * DRAFT written for SEO: no invented prices, years, timelines or project counts. Client to review (docs/todo.md).
 */

export type ContentBlock = {
  /** Small label above the heading */
  eyebrow?: string
  title: string
  paragraphs: string[]
  bullets?: string[]
  /** Optional h3 sub-sections */
  subsections?: { title: string; paragraphs: string[]; bullets?: string[] }[]
  /** Optional numbered steps */
  steps?: { title: string; text: string }[]
}

export const aboutContent: ContentBlock[] = [
  {
    eyebrow: "Who we are",
    title: "A natural grass supplier and lawn team for North India",
    paragraphs: [
      "NCR Grass supplies fresh natural grass and builds complete lawns for farmhouses, corporate offices, hotels, commercial sites and private homes. We work across Delhi NCR and almost all of North India, from the plains of Haryana, Punjab and Uttar Pradesh to the hill regions of Himachal Pradesh, Uttarakhand and Jammu & Kashmir.",
      "Our work starts where most landscaping jobs get difficult: muddy, dusty, uneven or neglected ground. We clear it, level it, prepare the soil and lay natural turf so the space becomes a soft, green, usable lawn.",
    ],
  },
  {
    eyebrow: "What we believe",
    title: "Why we only work with natural grass",
    paragraphs: [
      "Real grass keeps the ground cooler in the North Indian summer, lets rainwater soak into the soil and gives a softness underfoot that artificial turf cannot match. It also looks better every year it is cared for, instead of fading and wearing out.",
      "Because our grass comes farm-direct, it reaches your site fresh and ready to root. There are no middlemen and no long storage, so the turf you receive is healthy and green on the day it is laid.",
    ],
    bullets: [
      "Fresh natural grass, harvested and sent straight to your site",
      "Grass suited to North Indian weather and soil",
      "Cooler, softer and more natural than artificial turf",
      "A living lawn that improves with good care",
    ],
  },
  {
    eyebrow: "How we work",
    title: "One team from bare ground to finished lawn",
    paragraphs: [
      "Many lawn projects go wrong because the supply, the ground work and the laying are handled by different people. We handle the whole job ourselves, so nothing gets lost between steps and you have a single team to talk to.",
      "Every project begins with a free on-site assessment. We look at the soil, the levels, drainage and how the space will be used, then recommend what the ground needs and how much grass to order. You get a clear plan before any work starts.",
    ],
    steps: [
      { title: "Free site assessment", text: "We visit, check the ground and understand how you want to use the space." },
      { title: "Ground preparation", text: "Mud, weeds, stones and debris are cleared and the surface is levelled." },
      { title: "Fresh grass delivery", text: "Natural turf is delivered to your gate, in bulk if needed." },
      { title: "Lawn installation", text: "Our team lays the turf edge to edge with tight seams and clean borders." },
      { title: "Aftercare guidance", text: "We explain watering, mowing and care so the lawn establishes well." },
    ],
  },
  {
    eyebrow: "Who we serve",
    title: "Lawns for every kind of property",
    paragraphs: [
      "Farmhouses and estates need large lawns that look good and stay easy to maintain. Corporate offices and business parks want green spaces that make a strong first impression. Hotels, resorts and commercial sites need welcoming grounds for guests and events. Homeowners want a soft, safe lawn for family and children.",
      "Whatever the size of the space, from a small front yard to acres of farmhouse grounds, we plan the lawn around how it will actually be used.",
    ],
  },
]

export const servicesContent: ContentBlock[] = [
  {
    eyebrow: "Service details",
    title: "Everything you need for a natural lawn, in one place",
    paragraphs: [
      "You can buy fresh natural grass from us on its own, or have our team handle the full lawn installation from bare ground to finished turf. Here is what each service includes.",
    ],
    subsections: [
      {
        title: "Natural grass supply",
        paragraphs: [
          "We supply fresh natural lawn grass, cut to order and sent farm-direct to your site. People also call it natural turf, sod, carpet grass, grass carpet or simply green grass (hari ghaas); it is the same living grass, harvested with its roots and soil. It is ideal if you have your own gardener or landscaping contractor and only need healthy, ready-to-lay turf.",
        ],
        bullets: [
          "Freshly harvested natural turf",
          "Doorstep delivery to your site",
          "Bulk supply for large farmhouses, campuses and commercial projects",
          "Advice on how much grass you need for your area",
        ],
      },
      {
        title: "Ground levelling and preparation",
        paragraphs: [
          "A lawn is only as good as the ground beneath it, which is why land levelling and ground preparation come first. Uneven, compacted or weedy soil causes patchy growth, puddles and bare spots. We prepare the ground properly before any grass is laid.",
        ],
        bullets: [
          "Clearing mud, weeds, stones and construction debris",
          "Levelling uneven ground and filling low spots",
          "Loosening and preparing the soil so roots can grow",
          "Planning for drainage so water does not collect",
        ],
      },
      {
        title: "Lawn installation",
        paragraphs: [
          "Also known as grass plantation, grass planting or turf laying (ghaas lagwana), this is where your lawn takes shape. Our trained team lays natural turf from edge to edge, keeping seams tight and borders clean so the lawn looks seamless from the first day. Fresh turf gives you a green lawn immediately, without waiting for seed to grow.",
        ],
        bullets: [
          "Professional turf laying for any size of area",
          "Tight joints and clean edges along paths and walls",
          "Suitable for farmhouses, offices, hotels and homes",
          "Initial watering after the lawn is laid",
        ],
      },
      {
        title: "Aftercare guidance",
        paragraphs: [
          "The first few weeks decide how well a new lawn roots, so lawn care and maintenance guidance is part of the job. We explain exactly how to water, when to start mowing and how to keep the grass healthy through the seasons.",
        ],
        bullets: [
          "Watering schedule for a newly laid lawn",
          "When and how to mow for the first time",
          "Feeding and weed control basics",
          "Seasonal care tips for North Indian weather",
        ],
      },
    ],
  },
  {
    eyebrow: "Our process",
    title: "How a lawn project works with NCR Grass",
    paragraphs: [
      "Every project follows the same simple process, whether it is a small home lawn or a large farmhouse estate.",
    ],
    steps: [
      { title: "Share your requirement", text: "Call, WhatsApp or send a request with your location and approximate area." },
      { title: "Free on-site assessment", text: "We visit your site to check the soil, levels and drainage at no cost." },
      { title: "Clear quote and plan", text: "You receive a plan for the ground work and the amount of grass needed." },
      { title: "Preparation and installation", text: "We prepare the ground, deliver fresh turf and lay your lawn." },
      { title: "Aftercare support", text: "We guide you on care so your new lawn establishes well." },
    ],
  },
  {
    eyebrow: "Natural vs artificial",
    title: "Why choose natural grass over artificial turf",
    paragraphs: [
      "Artificial turf can look green from a distance, but it heats up in the sun, does not absorb rainwater and wears out over time. Natural grass stays cooler, supports healthy soil, absorbs rain and feels soft underfoot.",
      "For farmhouses, hotels and offices where people actually walk, sit and gather on the lawn, natural grass gives a far more comfortable and premium outdoor space.",
    ],
  },
]

export const serviceAreasContent: ContentBlock[] = [
  {
    eyebrow: "Where we work",
    title: "Natural grass and lawn installation across North India",
    paragraphs: [
      "NCR Grass delivers fresh natural grass and installs lawns across almost all of North India. Delhi NCR is our express delivery area, and we regularly take on farmhouse, corporate, hotel and residential projects across the surrounding states.",
      "Not sure if we cover your location? Share your site address on call or WhatsApp and we will confirm delivery and installation for your area.",
    ],
    subsections: [
      {
        title: "Delhi NCR",
        paragraphs: [
          "Our express delivery area. We supply natural grass and install lawns for farmhouses, offices, hotels and homes across Delhi and the wider National Capital Region, including the farmhouse belts on the city's outskirts.",
        ],
      },
      {
        title: "Haryana",
        paragraphs: [
          "From farmhouses and estates to corporate campuses and commercial sites, we deliver natural turf and handle complete lawn installation across Haryana.",
        ],
      },
      {
        title: "Punjab and Chandigarh",
        paragraphs: [
          "We supply fresh grass and build lawns for farmhouses, homes, institutions and commercial properties across Punjab and Chandigarh.",
        ],
      },
      {
        title: "Uttar Pradesh",
        paragraphs: [
          "Natural grass supply and lawn installation for farmhouses, housing projects, offices and hotels across Uttar Pradesh.",
        ],
      },
      {
        title: "Rajasthan",
        paragraphs: [
          "Hotels, resorts, heritage properties and farmhouses in Rajasthan benefit from a well-prepared natural lawn. We plan ground preparation and care with the region's dry climate in mind.",
        ],
      },
      {
        title: "Himachal Pradesh, Uttarakhand and Jammu & Kashmir",
        paragraphs: [
          "For resorts, homestays, hotels and private properties in the hills, we supply natural grass and lay lawns suited to sloping ground and cooler weather.",
        ],
      },
    ],
  },
]



export const contactContent: ContentBlock[] = [
  {
    eyebrow: "Before you call",
    title: "What to share for a faster quote",
    paragraphs: [
      "The more we know about your space, the faster we can plan your lawn and send a clear quote. These details help most:",
    ],
    bullets: [
      "Your site location (city or area)",
      "Approximate lawn area, in square feet or acres",
      "Current ground condition: muddy, uneven, weedy or already prepared",
      "Whether you need grass supply only or full installation",
      "Photos of the site, if you can send them on WhatsApp",
    ],
  },
  {
    eyebrow: "What happens next",
    title: "From first message to finished lawn",
    paragraphs: [],
    steps: [
      { title: "We get back to you", text: "Our team calls or messages you to understand your requirement." },
      { title: "Free site assessment", text: "We visit the site to check the soil, levels and drainage." },
      { title: "Quote and plan", text: "You receive a clear plan and quote for the work." },
      { title: "Your lawn is installed", text: "We prepare the ground, deliver fresh grass and lay your lawn." },
    ],
  },
]

/** Extra questions shown on the /faq page only (the homepage list lives in site.ts; /faq shows both). */
export const moreFaqs = [
  {
    q: "Ghaas, hari ghaas, lawn ki ghaas, carpet ghaas: kya ye sab ek hi hai?",
    a: "Haan, aam taur par in sab ka matlab natural ghaas hai jo farm par ugaayi jaati hai aur jad aur mitti ke saath kaat kar lagaayi jaati hai. Plastic wali artificial ghaas alag cheez hai.",
  },
  {
    q: "Can you supply grass in bulk for large projects?",
    a: "Yes. We supply natural grass in bulk for large farmhouses, corporate campuses, hotels and commercial projects.",
  },
  {
    q: "Do I need to prepare the ground before you lay the grass?",
    a: "No. Ground levelling and preparation is part of our service. We clear mud, weeds and debris and level the surface before laying the turf.",
  },
  {
    q: "Can you install lawns on sloping or hilly ground?",
    a: "Yes. We prepare and level the ground to suit the site, including properties in the hill regions of Himachal Pradesh, Uttarakhand and Jammu & Kashmir.",
  },
]
