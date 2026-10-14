export type BlogTable = {
  caption?: string
  headers: string[]
  rows: string[][]
}

export type BlogSection = {
  id: string
  title: string
  paragraphs: string[]
  bullets?: string[]
  orderedList?: string[]
  table?: BlogTable
  callout?: string
}

export type BlogFaq = {
  question: string
  answer: string
}

export type BlogPost = {
  slug: string
  /** H1 on the post page */
  title: string
  /** <title> without the brand (the layout template appends " | NCR Grass"); keep under ~50 characters */
  metaTitle: string
  metaDescription: string
  excerpt: string
  category: "Varieties & Selection" | "Location Guides" | "Soil & Installation" | "Cost & Maintenance"
  locationTag?: string
  /** Cover photo. `src` must be a key of lib/image-manifest.ts (built by scripts/build-images.mjs), so it always exists. */
  image: { src: string; alt: string }
  publishedDate: string
  /** Set when a post is materially revised; used for dateModified in schema */
  updatedDate?: string
  readTime: string
  author: string
  authorRole: string
  sections: BlogSection[]
  faqs: BlogFaq[]
  relatedSlugs: string[]
  /** Slugs from lib/locations.ts, linked from the post as "Where we supply" */
  relatedLocations: string[]
}

/**
 * Educational guides only. Rules (docs/seo.md): no invented prices, statistics, delivery times, crew sizes,
 * guarantees or credentials. Business claims are limited to what the client confirmed (docs/content.md):
 * farm-direct grass, delivery to site, bulk supply, free site visit, levelling, installation, aftercare guidance.
 * Add prices only once the client supplies real rates.
 */
export const blogPosts: BlogPost[] = [

  {
    slug: "best-natural-grass-varieties-delhi-ncr-climate",
    title: "Natural Lawn Grass Types for Delhi NCR: Bermuda, Selection 1, Korean and Mexican Compared",
    metaTitle: "Lawn Grass Types for Delhi NCR Climate",
    metaDescription: "How Bermuda (doob), Selection 1, Korean and Mexican lawn grass cope with Delhi NCR heat, shade, water and foot traffic, and how to choose.",
    excerpt: "Delhi NCR is hard on lawns: 45°C summers, humid monsoons and cold winter nights. Here is how the common lawn grass types compare, and what to ask before you buy.",
    category: "Varieties & Selection",
    locationTag: "Delhi NCR",
    image: { src: "/images/who-we-serve/villa-after.jpg", alt: "Healthy green natural lawn in front of a modern house" },
    publishedDate: "2026-10-14",
    readTime: "6 min read",
    author: "NCR Grass",
    authorRole: "Natural lawn grass supplier, Dasna, Ghaziabad",
    sections: [
      {
        id: "delhi-ncr-climate-challenges",
        title: "What Delhi NCR's climate does to a lawn",
        paragraphs: [
          "Delhi NCR swings between extremes. Summer temperatures often pass 45°C with dry 'loo' winds, the monsoon brings waterlogging and humidity that favours fungus, and winter nights can fall to single digits.",
          "A lawn grass has to survive all three. That is why most lawns in North India use warm-season grasses, which grow strongly in heat and rest (turn pale) in winter.",
        ],
        callout: "Choose a grass for how it handles your site's sun, water and traffic, not for how green it looks on the day you see it.",
      },
      {
        id: "bermuda-selection-1-comparison",
        title: "Bermuda (doob) and Selection 1",
        paragraphs: [
          "Bermuda grass, known locally as doob (Cynodon dactylon), is native to the region. It spreads by stolons and rhizomes, tolerates heat and drought, and recovers well from wear. Its blades are coarser.",
          "Selection 1 is a finer, denser dwarf Bermuda selection. It keeps the heat tolerance of Bermuda but gives a softer, more even carpet-like surface, which is why it is common on farmhouse and residential lawns.",
          "Both need full sun. In shade they thin out and turn weak.",
        ],
        bullets: [
          "Strong heat and drought tolerance.",
          "Recover well after lawn parties, weddings and everyday play.",
          "Go semi-dormant and pale in the coldest weeks, then green up as temperatures rise in February.",
        ],
      },
      {
        id: "korean-mexican-grass-breakdown",
        title: "Korean grass and Mexican grass",
        paragraphs: [
          "Korean grass (Zoysia) is slow-growing with a dense, cushiony feel. It copes with some shade better than Bermuda, but it establishes slowly and does not like standing water in the monsoon.",
          "'Mexican grass' is a trade name for fine-bladed ornamental lawn grasses, and the exact species varies between nurseries. It looks formal and neat but usually needs more care: regular watering, sharp mowing and attention to fungus in humid weather. Always ask a supplier which species they are selling.",
        ],
        table: {
          caption: "General comparison of common lawn grass types in Delhi NCR",
          headers: ["Feature", "Bermuda (doob)", "Selection 1", "Korean (Zoysia)", "Mexican (fine-bladed)"],
          rows: [
            ["Heat tolerance", "Very high", "Very high", "High", "Moderate"],
            ["Sun need", "Full sun", "Full sun", "Full sun to part shade", "Full sun"],
            ["Water need in summer", "Low to moderate", "Moderate", "Higher", "Higher"],
            ["Wear from foot traffic", "Very tolerant", "Tolerant", "Moderate", "Lower"],
            ["Look", "Coarser blade", "Fine, dense carpet", "Soft, cushiony", "Very fine, formal"],
          ],
        },
      },
      {
        id: "shade-and-soil-factors",
        title: "Sun, shade and soil matter more than the variety",
        paragraphs: [
          "A common mistake is laying a full-sun grass under dense tree cover. With fewer than about four hours of direct sun, Bermuda-type grasses stretch, thin out and let moss and weeds in. For shaded areas, ask about shade-tolerant options or consider ground cover instead of grass.",
          "Soil is the other half. Heavy clay needs sand and organic matter worked in for drainage, rocky soil needs topsoil, and construction sites often need rubble removed first. Our guide on [how to prepare soil for a natural lawn](/blog/how-to-prepare-soil-for-natural-lawn-grass-north-india) covers each step.",
        ],
      },
      {
        id: "verdict-recommendation",
        title: "How to choose",
        paragraphs: [
          "Match the grass to the use. A party lawn or farmhouse with heavy traffic and full sun suits a tough Bermuda-type grass. A small shaded courtyard with a gardener and irrigation can suit Korean grass. A formal frontage with regular care can suit a fine-bladed type.",
          "Not sure what suits your site? Call or WhatsApp us for a free on-site assessment, and the team will check sun, soil and use before you decide. You can also read [what decides the cost of a natural lawn](/blog/natural-lawn-grass-cost-per-square-foot-delhi-ncr).",
        ],
      },
    ],
    faqs: [
      {
        question: "Does lawn grass stay green all year in Delhi NCR?",
        answer: "Warm-season grasses such as Bermuda and Selection 1 stay green through most of the year but slow down and turn paler in the coldest weeks of December and January. They recover as temperatures rise in February.",
      },
      {
        question: "Can lawn grass grow in full shade?",
        answer: "No lawn grass does well in deep shade. Korean grass tolerates some shade better than Bermuda, but every lawn grass needs some direct or bright light to stay dense.",
      },
      {
        question: "Which grass is best for a lawn with heavy foot traffic?",
        answer: "Bermuda-type grasses (doob and Selection 1) recover from wear faster than most alternatives, which is why they are common on party lawns and farmhouses.",
      },
    ],
    relatedSlugs: [
      "how-to-prepare-soil-for-natural-lawn-grass-north-india",
      "maintaining-natural-lawn-delhi-ncr-summer-heat-monsoon",
      "natural-lawn-grass-cost-per-square-foot-delhi-ncr",
    ],
    relatedLocations: ["delhi", "noida", "ghaziabad"],
  },

  {
    slug: "farm-fresh-lawn-grass-supplier-dasna-nh9-ghaziabad",
    title: "Farm-Fresh Lawn Grass in Dasna: Why Freshness Matters and How to Order",
    metaTitle: "Farm-Fresh Lawn Grass in Dasna, NH-9",
    metaDescription: "Why freshly cut lawn grass roots better than stacked nursery stock, and how to order farm-direct lawn grass in Dasna, Masuri, Pilkhuwa and along NH-9.",
    excerpt: "Turf is a living product. Here is why freshly cut, farm-direct grass establishes better than grass that has sat stacked, and how to order it in Dasna and along NH-9.",
    category: "Location Guides",
    locationTag: "Dasna, Ghaziabad",
    image: { src: "/images/why-choose-us/bulk-orders.jpg", alt: "Freshly cut natural grass rolls stacked on pallets next to a farm field and a loading truck" },
    publishedDate: "2026-10-14",
    readTime: "5 min read",
    author: "NCR Grass",
    authorRole: "Natural lawn grass supplier, Dasna, Ghaziabad",
    sections: [
      {
        id: "dasna-logistical-hub",
        title: "Dasna: where NH-9 and the expressways meet",
        paragraphs: [
          "Dasna sits where National Highway 9, the Delhi–Meerut Expressway and the Eastern Peripheral Expressway come together, with Masuri, Duhai and Pilkhuwa close by. NCR Grass is based here (see our [Dasna service page](/service-areas/dasna)), which keeps the trip from farm to site short for customers around Ghaziabad, Hapur and Meerut, and puts Delhi, Noida and Greater Noida within reach.",
        ],
        callout: "Cut turf is a living, perishable product. The sooner it goes from the field to the ground, the better it roots.",
      },
      {
        id: "fresh-cut-vs-mandi-stock",
        title: "Why freshly cut grass roots better",
        paragraphs: [
          "Grass cut as rolls starts to deteriorate once it is harvested. If rolls sit stacked for days, especially under cover in warm weather, they heat up inside. That can yellow the blades and damage the roots before the grass ever reaches your lawn.",
          "Buying farm-direct, with grass harvested and sent straight to you, avoids the extra handling that comes with middlemen and roadside stock.",
        ],
        bullets: [
          "Check the rolls on arrival: they should be green, moist and hold together with an even layer of soil.",
          "Look for weeds, especially nutgrass (motha), before you accept the grass.",
          "Have the ground ready before the grass arrives so it can be laid the same day.",
        ],
      },
      {
        id: "marriage-lawns-farmhouses-nh9",
        title: "Marriage lawns, farmhouses and schools along NH-9",
        paragraphs: [
          "The NH-9 corridor between Dasna, Hapur and Pilkhuwa has many marriage lawns, banquet grounds, farmhouses and schools. These lawns need grass that can cope with crowds and recover quickly, laid on well-levelled, well-drained ground.",
          "NCR Grass supplies grass in bulk and can also level the ground and lay it, so you can buy supply only or have the whole lawn done.",
        ],
      },
      {
        id: "delivery-and-site-process",
        title: "How to order",
        paragraphs: ["Ordering grass from NCR Grass takes four steps:"],
        orderedList: [
          "Measure the lawn area (length × width in feet).",
          "Send your location pin on WhatsApp or call us.",
          "If the ground needs levelling or preparation, ask for a free site visit.",
          "Agree supply only or full installation, and we plan delivery to your gate.",
        ],
      },
    ],
    faqs: [
      {
        question: "Do you supply grass in Masuri, Pilkhuwa and Duhai?",
        answer: "Yes. Dasna is our home base, so these nearby areas and villages are among the closest places we supply.",
      },
      {
        question: "Can I get grass supplied without installation?",
        answer: "Yes. You can buy grass supply only, or have us level the ground and lay it for you.",
      },
      {
        question: "Is there a free site visit?",
        answer: "Yes. Call or WhatsApp us and the team will visit your site at no cost to check the ground and plan your lawn.",
      },
    ],
    relatedSlugs: [
      "lawn-installation-guide-ghaziabad-residential-farmhouses",
      "how-to-prepare-soil-for-natural-lawn-grass-north-india",
      "best-natural-grass-varieties-delhi-ncr-climate",
    ],
    relatedLocations: ["dasna", "ghaziabad", "meerut"],
  },

  {
    slug: "lawn-installation-guide-ghaziabad-residential-farmhouses",
    title: "Lawn Installation in Ghaziabad: Soil, Rubble and Laying Turf Step by Step",
    metaTitle: "Lawn Installation Guide for Ghaziabad",
    metaDescription: "How a natural lawn is installed in Ghaziabad kothis, societies and farmhouses: clearing construction rubble, fixing clay soil, levelling and laying turf.",
    excerpt: "New plots in Ghaziabad often hide construction waste and compacted clay under a thin layer of soil. Here is how to prepare and lay a lawn that roots properly.",
    category: "Location Guides",
    locationTag: "Ghaziabad",
    image: { src: "/images/who-we-serve/villa-before.jpg", alt: "Bare soil and building rubble in front of a house before a lawn is installed" },
    publishedDate: "2026-10-14",
    readTime: "6 min read",
    author: "NCR Grass",
    authorRole: "Natural lawn grass supplier, Dasna, Ghaziabad",
    sections: [
      {
        id: "ghaziabad-urban-soil-hurdles",
        title: "Soil problems in Ghaziabad plots",
        paragraphs: [
          "In newly built areas of [Ghaziabad](/service-areas/ghaziabad) such as Raj Nagar Extension, Crossings Republik and Govindpuram, builders often leave a thin layer of topsoil over construction waste. Under it you may find cement, plaster, brick pieces and compacted clay.",
          "If grass is laid straight onto this, roots cannot go down, water collects on the surface and the lawn weakens. Clearing the debris and improving the soil is the most important part of the job; see [how to prepare soil for a natural lawn](/blog/how-to-prepare-soil-for-natural-lawn-grass-north-india).",
        ],
      },
      {
        id: "step-by-step-installation-ghaziabad",
        title: "The installation steps",
        paragraphs: ["A typical natural lawn installation follows these steps:"],
        orderedList: [
          "Clear the site: remove rubble, stones and weeds, including nutgrass (motha) tubers.",
          "Improve the soil: loosen the top few inches and mix in coarse sand and well-rotted manure so water drains and roots can grow.",
          "Level the ground: grade it with a gentle slope away from the house so rainwater does not pond.",
          "Lay the turf: place rolls tightly in a staggered pattern with no gaps or overlaps.",
          "Press and water: roll lightly to remove air pockets, then water deeply straight away.",
        ],
      },
      {
        id: "neighborhood-breakdown",
        title: "Different Ghaziabad areas, different needs",
        paragraphs: ["The right approach depends on the type of property:"],
        bullets: [
          "Bungalow plots (Raj Nagar Extension, Kavi Nagar): front lawns in full sun suit grass well, while shaded courtyards need a different plan.",
          "Societies (Indirapuram, Vaishali): shared lawns get heavy use by children and pets, so tough grass and good drainage matter.",
          "Farmhouses and larger plots toward Dasna and the DME: big open lawns can be levelled and laid in bulk.",
        ],
      },
      {
        id: "maintenance-first-30-days",
        title: "Looking after a new lawn",
        paragraphs: [
          "Keep the soil under new turf moist, with light watering once or twice a day in the first couple of weeks, in the early morning and late afternoon. Keep off the lawn until the roots have knitted into the soil.",
          "Mow for the first time once the grass is clearly growing, and never remove more than about a third of the blade length at once. We give aftercare guidance on watering, mowing and feeding after installation.",
        ],
      },
    ],
    faqs: [
      {
        question: "Do you supply and lay grass in Ghaziabad?",
        answer: "Yes. We are based in Dasna, Ghaziabad district, and can supply grass only or do ground preparation and installation. Call or WhatsApp us for a free site visit.",
      },
      {
        question: "Why has my lawn turned patchy and yellow?",
        answer: "Common causes are compacted soil, buried construction debris, poor drainage, too little sun or too much or too little water. A site visit helps find the cause before any patching is done.",
      },
      {
        question: "How much does lawn installation cost in Ghaziabad?",
        answer: "It depends on the area, the grass, and how much levelling and soil work the ground needs. Share your site details on WhatsApp for a quote.",
      },
    ],
    relatedSlugs: [
      "how-to-prepare-soil-for-natural-lawn-grass-north-india",
      "farm-fresh-lawn-grass-supplier-dasna-nh9-ghaziabad",
      "natural-lawn-grass-cost-per-square-foot-delhi-ncr",
    ],
    relatedLocations: ["ghaziabad", "dasna"],
  },

  {
    slug: "natural-turf-installation-noida-villas-corporate-campuses",
    title: "Natural Lawns in Noida and Greater Noida: Soil, Water and Property Types",
    metaTitle: "Natural Lawns in Noida & Greater Noida",
    metaDescription: "What to plan for a natural lawn in Noida and Greater Noida: silty soil, hard borewell water, and how villas, offices and farmhouses differ.",
    excerpt: "Noida and Greater Noida have villas, IT campuses and farmhouses with very different lawn needs. Here is what to plan for, from soil to water quality.",
    category: "Location Guides",
    locationTag: "Noida & Greater Noida",
    image: { src: "/images/who-we-serve/corporate-after.jpg", alt: "Green natural lawn curving in front of an office building at sunrise" },
    publishedDate: "2026-10-14",
    readTime: "5 min read",
    author: "NCR Grass",
    authorRole: "Natural lawn grass supplier, Dasna, Ghaziabad",
    sections: [
      {
        id: "noida-landscaping-boom",
        title: "Planning a lawn in Noida",
        paragraphs: [
          "[Noida](/service-areas/noida) and [Greater Noida](/service-areas/greater-noida) are planned cities with plenty of open space: villa fronts, society parks, institutional campuses and farmhouses along the expressways. Much of the area sits on the Yamuna and Hindon plains, where soil can be fertile but silty, and tends to crust or compact under sprinklers.",
          "Loosening the soil and adding organic matter before laying grass helps water and roots move through it.",
        ],
      },
      {
        id: "villa-vs-corporate-campus",
        title: "Villas, campuses and farmhouses",
        paragraphs: [
          "How the lawn is used decides how it should be planned.",
        ],
        table: {
          caption: "How property type affects lawn planning",
          headers: ["Property type", "What matters most", "Practical points"],
          rows: [
            ["Villa or bungalow", "Appearance", "A neat, even surface; irrigation and regular mowing."],
            ["Office or IT campus", "Durability and low upkeep", "Automatic irrigation, easy mowing, tough grass for events."],
            ["Farmhouse", "Size and drainage", "Level ground in bulk and drainage that copes with the monsoon."],
            ["Society park", "Heavy use", "Wear-tolerant grass and good drainage."],
          ],
        },
      },
      {
        id: "irrigation-and-water-salinity",
        title: "Hard borewell water",
        paragraphs: [
          "In parts of Noida and Greater Noida, borewell water has high dissolved salts. Over time salts can build up on the soil surface and stress grass. Deep, less frequent watering flushes salts below the root zone better than frequent light sprinkling. If your water is very hard, get it tested and ask about grass that copes with salts.",
        ],
      },
      {
        id: "booking-installation-noida",
        title: "Getting a lawn done in Noida",
        paragraphs: [
          "NCR Grass supplies farm-direct grass to Noida and Greater Noida and can handle ground preparation and installation. Call or WhatsApp for a free site visit and we will check the ground and plan the lawn with you.",
        ],
      },
    ],
    faqs: [
      {
        question: "Do you supply grass in Noida and Greater Noida?",
        answer: "Yes. We deliver to your gate in Noida and Greater Noida from our base in Dasna, and can also level the ground and lay the grass.",
      },
      {
        question: "Can natural grass be grown on a rooftop terrace?",
        answer: "It can, if the roof is properly waterproofed and has drainage and a suitable soil layer. Check the load capacity and waterproofing with a qualified professional first.",
      },
      {
        question: "Can you handle a large corporate lawn?",
        answer: "Yes. We supply grass in bulk, from a single home lawn to acres of grounds. Ask for a site visit to plan a large lawn.",
      },
    ],
    relatedSlugs: [
      "how-to-prepare-soil-for-natural-lawn-grass-north-india",
      "maintaining-natural-lawn-delhi-ncr-summer-heat-monsoon",
      "best-natural-grass-varieties-delhi-ncr-climate",
    ],
    relatedLocations: ["noida", "greater-noida"],
  },

  {
    slug: "farmhouse-lawn-development-delhi-chhatarpur-mehrauli",
    title: "Farmhouse Lawns in Delhi: Levelling, Drainage and Wear from Parties",
    metaTitle: "Farmhouse Lawn Development in Delhi",
    metaDescription: "Planning a large farmhouse lawn in Chhatarpur, Mehrauli, Bijwasan or Alipur: levelling, drainage, and grass that copes with parties and heavy use.",
    excerpt: "Farmhouse lawns in Delhi are big, busy and exposed to the monsoon. Here is what to plan for: levelling, drainage and choosing grass that can take party traffic.",
    category: "Location Guides",
    locationTag: "Delhi Farmhouses",
    image: { src: "/images/who-we-serve/farmhouse-after.jpg", alt: "Large green farmhouse lawn with trees and a single-storey house behind it" },
    publishedDate: "2026-10-14",
    readTime: "5 min read",
    author: "NCR Grass",
    authorRole: "Natural lawn grass supplier, Dasna, Ghaziabad",
    sections: [
      {
        id: "scale-of-delhi-farmhouses",
        title: "Why farmhouse lawns are different",
        paragraphs: [
          "[Delhi](/service-areas/delhi)'s farmhouse belts, including Chhatarpur, Mehrauli, Bijwasan, Kapashera and Alipur, have lawns far larger than a typical home garden. At that size, levelling by hand is not practical and small slopes turn into puddles in the monsoon.",
          "Many farmhouses also host weddings and parties, so the grass needs to cope with crowds, tents, tables and catering vehicles.",
        ],
      },
      {
        id: "site-preparation-grading",
        title: "Levelling, drainage and soil",
        paragraphs: ["For a large lawn, good preparation matters more than anything else:"],
        bullets: [
          "Level the ground with machinery so that water flows off rather than collecting.",
          "Give the lawn a gentle fall toward drains, swales or soak pits.",
          "Loosen compacted soil and remove deep-rooted weeds such as nutgrass (motha) before laying.",
          "Work in well-rotted manure and sand where the soil is heavy.",
        ],
      },
      {
        id: "turf-selection-party-durability",
        title: "Grass for party lawns",
        paragraphs: [
          "For lawns that see heavy use, a tough Bermuda-type grass generally recovers from wear better than fine ornamental grasses, which suit formal areas with less traffic.",
          "After an event, aerating and watering deeply helps compressed turf recover.",
        ],
      },
      {
        id: "managing-delhi-borewell-water",
        title: "Water in South and North Delhi",
        paragraphs: [
          "Groundwater quality varies across Delhi, and hard or saline borewell water can stress grass over time. Watering deeply and less often helps, and testing the water is worth doing before you plan a large lawn.",
          "Planning a farmhouse lawn? Call or WhatsApp for a free site visit and bulk supply plan.",
        ],
      },
    ],
    faqs: [
      {
        question: "How much grass does a one-acre farmhouse need?",
        answer: "One acre is 43,560 square feet, but you will not need grass for all of it. Subtract driveways, pools, buildings and planting beds from your plan. A site visit gives an accurate figure.",
      },
      {
        question: "Do you supply grass to farmhouses in Delhi?",
        answer: "Yes. We serve Delhi farmhouse belts from our base in Dasna and supply grass in bulk.",
      },
      {
        question: "Can you level the ground as well?",
        answer: "Yes. Ground levelling and preparation is part of our service, so you can have supply only or the whole lawn done.",
      },
    ],
    relatedSlugs: [
      "how-to-prepare-soil-for-natural-lawn-grass-north-india",
      "best-natural-grass-varieties-delhi-ncr-climate",
      "natural-lawn-grass-cost-per-square-foot-delhi-ncr",
    ],
    relatedLocations: ["delhi", "noida", "ghaziabad"],
  },

  {
    slug: "how-to-prepare-soil-for-natural-lawn-grass-north-india",
    title: "How to Prepare Soil for a Natural Lawn in North India",
    metaTitle: "How to Prepare Soil for a Natural Lawn",
    metaDescription: "Step-by-step soil preparation before laying natural lawn grass in North India: removing motha weeds, improving clay soil, levelling and using gobar khad.",
    excerpt: "Most lawn problems start under the grass. Here is how to clear weeds, loosen and improve the soil, level the ground and let it settle before laying turf.",
    category: "Soil & Installation",
    locationTag: "Soil Preparation",
    image: { src: "/images/who-we-serve/farmhouse-before.jpg", alt: "Muddy, uneven ground with rubble that needs clearing and levelling before laying grass" },
    publishedDate: "2026-10-14",
    readTime: "6 min read",
    author: "NCR Grass",
    authorRole: "Natural lawn grass supplier, Dasna, Ghaziabad",
    sections: [
      {
        id: "why-soil-prep-matters",
        title: "A lawn is only as good as the soil under it",
        paragraphs: [
          "When a lawn goes patchy, the grass often gets the blame, but the cause is usually the ground. Turf rolls arrive with only a thin layer of soil. To survive, roots must quickly grow into the soil below. If it is rock-hard, full of rubble or lacks organic matter, the roots stay shallow and the grass struggles in the first heatwave.",
          "Time spent on the ground before laying pays off in a lawn that roots deeper, needs less water and resists weeds.",
        ],
      },
      {
        id: "weed-eradication-motha",
        title: "Clear perennial weeds, especially motha",
        paragraphs: [
          "The worst weed in North Indian lawns is nutgrass, locally motha (Cyperus rotundus). It spreads by underground tubers that survive dry soil for a long time. If you only cut the leaves and lay grass over it, motha will push through the new turf.",
        ],
        bullets: [
          "Water the bare ground first so weeds and tubers sprout.",
          "Dig out the tubers by hand, or treat the green growth with a suitable herbicide as the label directs, and wait for it to die back.",
          "Rake out dead roots and tubers before laying grass.",
        ],
      },
      {
        id: "soil-amendment-formula",
        title: "Improve the soil",
        paragraphs: [
          "Soil in [Delhi NCR](/service-areas) tends toward heavy clay or loose silt. The aim is a crumbly, well-draining root zone in the top 4 to 6 inches.",
        ],
        table: {
          caption: "What to add, and why",
          headers: ["Material", "Purpose"],
          rows: [
            ["Coarse sand (badarpur)", "Opens up clay so water drains and roots can grow"],
            ["Well-rotted gobar khad (manure)", "Adds organic matter and slow-release nutrients"],
            ["Vermicompost", "Adds organic matter and supports root growth"],
            ["Neem cake (neem khali)", "Helps deter soil pests such as white grubs"],
          ],
        },
      },
      {
        id: "grading-and-settling",
        title: "Level, water and let it settle",
        paragraphs: [
          "Once the soil is mixed in, level the ground with a gentle fall away from buildings so rainwater drains off.",
          "Water the prepared ground a day or two before laying so loose soil settles. If you skip this, dips can appear once you start watering the new grass.",
          "When the surface is workable and crumbly, smooth it with a leveller and the ground is ready for grass.",
        ],
      },
    ],
    faqs: [
      {
        question: "Can I use fresh cow dung?",
        answer: "No. Fresh dung heats up as it breaks down, can burn roots and carries weed seeds. Use fully rotted, dark and odourless gobar khad.",
      },
      {
        question: "How deep should the soil be loosened before laying grass?",
        answer: "At least about 6 inches. Larger or heavily used lawns benefit from going deeper.",
      },
      {
        question: "Can NCR Grass prepare the ground for me?",
        answer: "Yes. Ground levelling and preparation is part of our service. Call or WhatsApp for a free site visit.",
      },
    ],
    relatedSlugs: [
      "lawn-installation-guide-ghaziabad-residential-farmhouses",
      "best-natural-grass-varieties-delhi-ncr-climate",
      "maintaining-natural-lawn-delhi-ncr-summer-heat-monsoon",
    ],
    relatedLocations: ["ghaziabad", "noida", "delhi"],
  },

  {
    slug: "natural-lawn-grass-cost-per-square-foot-delhi-ncr",
    title: "What Decides the Cost of a Natural Lawn in Delhi NCR",
    metaTitle: "Natural Lawn Cost in Delhi NCR: What Decides It",
    metaDescription: "Why lawn grass rates differ so much in Delhi NCR, what a quote should include, and how to compare supply-only and full-installation prices.",
    excerpt: "Quotes for lawn grass can differ a lot. Here is what makes up the cost of a natural lawn, what to check in a quote, and how to compare like with like.",
    category: "Cost & Maintenance",
    locationTag: "Cost Guide",
    image: { src: "/images/why-choose-us/site-assessment.jpg", alt: "Two people shaking hands over a green natural lawn after agreeing a plan" },
    publishedDate: "2026-10-14",
    readTime: "5 min read",
    author: "NCR Grass",
    authorRole: "Natural lawn grass supplier, Dasna, Ghaziabad",
    sections: [
      {
        id: "understanding-lawn-costs",
        title: "Why quotes vary so much",
        paragraphs: [
          "Search for lawn grass rates in Delhi NCR and you will see very different prices. Often the quotes are not comparing the same thing. One may be grass only, collected from the field. Another may include delivery, ground preparation and laying.",
          "To compare fairly, split any quote into three parts: the grass, the ground work, and delivery.",
        ],
      },
      {
        id: "turf-variety-pricing-table",
        title: "What makes up the cost",
        paragraphs: ["The final price depends mainly on:"],
        bullets: [
          "Grass type: finer, slower-growing grasses usually cost more than tough Bermuda-type grass.",
          "Area: bulk orders are priced differently from a small garden.",
          "Ground condition: clearing rubble, levelling and soil improvement add work.",
          "Distance: delivery depends on how far your site is from Dasna.",
          "Supply only or installation: laying, rolling and watering is extra if you want it done for you.",
        ],
      },
      {
        id: "installation-and-labour-costs",
        title: "Supply only, or full installation",
        paragraphs: [
          "If you already have a gardener and a prepared site, supply only may be enough. If the ground is uneven, muddy or full of debris, full installation, including levelling, soil work and laying, usually gives a better lawn than patching the ground yourself.",
          "NCR Grass offers both. A free site visit lets us see the ground and quote for what it actually needs. [Contact us](/contact) to book one.",
        ],
      },
      {
        id: "hidden-expenses-to-avoid",
        title: "What to check in a quote",
        paragraphs: ["Before accepting any quote, ask:"],
        bullets: [
          "Is delivery to my site included?",
          "Are levelling, soil work and laying included, or only the grass?",
          "Which grass is it, and how thick is the soil layer on the rolls?",
          "Are the rolls free of weeds such as motha?",
        ],
      },
    ],
    faqs: [
      {
        question: "What is the rate per square foot?",
        answer: "It depends on the grass, the area and the site, so we quote after seeing your details. Share your location and area on WhatsApp, or ask for a free site visit.",
      },
      {
        question: "Is there a minimum order?",
        answer: "We supply from a single home lawn up to acres of grounds. Ask us about your quantity.",
      },
      {
        question: "Does the quote include delivery?",
        answer: "Delivery to your gate is part of what we offer. Confirm what is included in your written quote.",
      },
    ],
    relatedSlugs: [
      "how-to-prepare-soil-for-natural-lawn-grass-north-india",
      "best-natural-grass-varieties-delhi-ncr-climate",
      "maintaining-natural-lawn-delhi-ncr-summer-heat-monsoon",
    ],
    relatedLocations: ["delhi", "noida", "ghaziabad"],
  },

  {
    slug: "maintaining-natural-lawn-delhi-ncr-summer-heat-monsoon",
    title: "Natural Lawn Care in Delhi NCR: Summer, Monsoon and Winter",
    metaTitle: "Lawn Care in Delhi NCR: Summer to Winter",
    metaDescription: "Seasonal lawn care for Delhi NCR: watering in 45°C summers, preventing fungus in the monsoon, and what winter dormancy means for your grass.",
    excerpt: "A routine that works in March can harm a lawn in August. Here is how to adjust watering, mowing and feeding through summer, monsoon and winter in Delhi NCR.",
    category: "Cost & Maintenance",
    locationTag: "Lawn Care",
    image: { src: "/images/who-we-serve/hotel-after.jpg", alt: "Well-kept natural grass lawn at sunset beside a stone building" },
    publishedDate: "2026-10-14",
    readTime: "6 min read",
    author: "NCR Grass",
    authorRole: "Natural lawn grass supplier, Dasna, Ghaziabad",
    sections: [
      {
        id: "seasonal-calendar-overview",
        title: "Match your care to the season",
        paragraphs: [
          "[Delhi NCR](/service-areas) has hot dry summers, a humid monsoon and cool winters, and a lawn needs different care in each. Watering that keeps a lawn healthy in March can cause rot in August, and heavy fertiliser in a heatwave can burn the grass.",
        ],
      },
      {
        id: "summer-survival-may-june",
        title: "Summer: April to June",
        paragraphs: [
          "Water early in the morning so moisture reaches the roots before the heat evaporates it. Avoid watering in the afternoon heat.",
          "Raise the mower height a little in summer. Taller grass shades the soil, keeps it cooler and holds moisture.",
        ],
        bullets: [
          "Deep watering a few times a week is better than a light sprinkle every day.",
          "Avoid heavy nitrogen fertiliser in peak heat.",
          "Keep heavy foot traffic off during extreme heat.",
        ],
      },
      {
        id: "monsoon-management-july-august",
        title: "Monsoon: July to September",
        paragraphs: [
          "Warmth and rain make grass grow fast, so mow more often and do not let it get long. Humidity also favours fungal problems such as brown patch.",
          "Check the lawn after heavy rain. Water that stands for long on the surface points to a drainage problem, and loosening the surface with a fork can help. If circular brown or greasy patches spread, ask a local nursery for a suitable fungicide and follow the label.",
        ],
      },
      {
        id: "autumn-winter-care",
        title: "Autumn and winter: October to February",
        paragraphs: [
          "Autumn is a good time to aerate, top-dress and feed the lawn, as the weather is mild and grass grows well.",
          "In the coldest weeks, warm-season grasses such as Bermuda and Selection 1 slow down and turn paler. This is normal rest. Reduce watering rather than pushing growth with fertiliser, and the lawn greens up again as temperatures rise in February.",
        ],
      },
    ],
    faqs: [
      {
        question: "Why does my lawn turn yellow in January?",
        answer: "Warm-season grasses go semi-dormant in cold weather. The roots are alive and the grass recovers when it warms up.",
      },
      {
        question: "When should I water my lawn?",
        answer: "Early morning is best, and in the late afternoon if needed. Avoid midday heat.",
      },
      {
        question: "Do you give aftercare advice for new lawns?",
        answer: "Yes. We guide you on watering, mowing and feeding after installation so a new lawn establishes well.",
      },
    ],
    relatedSlugs: [
      "how-to-prepare-soil-for-natural-lawn-grass-north-india",
      "best-natural-grass-varieties-delhi-ncr-climate",
      "natural-lawn-grass-cost-per-square-foot-delhi-ncr",
    ],
    relatedLocations: ["delhi", "noida", "ghaziabad"],
  },
]

/** "14 Oct 2026" from an ISO date (fixed locale and zone, so server and browser agree). */
export function formatPostDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" })
}

export function getAllBlogPosts(): BlogPost[] {
  return blogPosts
}

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug)
}

export function getRelatedBlogPosts(currentSlug: string): BlogPost[] {
  const current = getBlogPostBySlug(currentSlug)
  if (!current) return []
  return current.relatedSlugs
    .map((slug) => getBlogPostBySlug(slug))
    .filter((p): p is BlogPost => Boolean(p))
}
