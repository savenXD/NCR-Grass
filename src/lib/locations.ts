/**
 * Location landing pages (/service-areas/[slug]).
 * DRAFT SEO copy (docs/seo.md §2–3). Each page must stay genuinely local to avoid Google's
 * doorway-page policy: unique localities, customers, FAQs and route from our Dasna base.
 * No invented prices, distances, timelines or project claims. Client to review (docs/todo.md).
 * Hinglish blocks/FAQs are deliberate: locals search "lawn ki ghaas", "doob ghas rate", etc.
 */
import type { ContentBlock } from "@/lib/page-content"
import { site } from "@/lib/site"

export type Faq = { q: string; a: string }

export type LocationPage = {
  slug: string
  /** Place name as people search it */
  name: string
  kind: "city" | "state"
  /** Parent region, used in schema and copy */
  state: string
  /** <title> (brand is appended by the layout template) */
  title: string
  description: string
  h1: string
  heroText: string
  blocks: ContentBlock[]
  /** Neighbourhoods / towns / cities covered, shown as a list */
  localities: { title: string; items: string[] }
  faqs: Faq[]
  /** Slugs of related location pages for internal links */
  nearby: string[]
}

export const locations: LocationPage[] = [
  // ───────────────────────────── DASNA (our base) ─────────────────────────────
  {
    slug: "dasna",
    name: "Dasna",
    kind: "city",
    state: "Uttar Pradesh",
    title: "Lawn Grass Supplier in Dasna, Ghaziabad",
    description:
      "Lawn grass supplier based in Dasna. Fresh natural grass (lawn ki ghaas), delivery and installation for farmhouses, marriage lawns and homes. Free site visit.",
    h1: "Natural Lawn Grass Supplier in Dasna",
    heroText: "Our home base. Farm-fresh grass, delivered and laid around Dasna, Masuri, Duhai and Pilkhuwa.",
    blocks: [
      {
        eyebrow: "Based in Dasna",
        title: "Your local lawn grass supplier on NH-9",
        paragraphs: [
          "NCR Grass works out of Dasna in Ghaziabad district, right where the Delhi–Meerut Expressway, NH-9 and the Eastern Peripheral Expressway meet. That makes Dasna the closest place to us anywhere we deliver, so orders here have the shortest trip from farm to site.",
          "Whether you are searching for lawn grass, green grass, grass carpet or a grass planter in Dasna, you do not need to travel to a Delhi nursery market or wait for a supplier from far away. Call or WhatsApp us, share your location and size of the area, and we will plan the supply and installation for you.",
        ],
        bullets: [
          "Fresh natural grass, cut to order",
          "Delivery to your gate in Dasna and nearby villages",
          "Free on-site assessment before work starts",
          "Supply only, or complete lawn installation",
        ],
      },
      {
        eyebrow: "Who we work with here",
        title: "Lawns for farmhouses, marriage lawns and schools around Dasna",
        paragraphs: [
          "The land around Dasna is changing fast. Open plots and fields along NH-9 and the expressways are becoming farmhouses, banquet and marriage lawns, schools, warehouses and new homes. Most of them start with the same problem: bare, dusty or muddy ground.",
          "We clear and level that ground, prepare the soil, and lay natural grass so the space is green and usable. For a marriage or party lawn, that means a soft, even surface guests can walk and sit on. For a farmhouse, it means an easy-care lawn that looks good through the year.",
        ],
        bullets: [
          "Farmhouses and private estates",
          "Marriage lawns, banquet and party lawns",
          "Schools, colleges and playgrounds",
          "Dhabas, highway restaurants and hotels",
          "Factories and warehouse campuses",
          "Kothis, villas and home gardens",
        ],
      },
      {
        eyebrow: "Hinglish mein",
        title: "Dasna mein lawn ki ghaas chahiye?",
        paragraphs: [
          "NCR Grass Dasna mein hi hai. Hum seedha farm se taaza natural ghaas laate hain aur aapke ghar, farmhouse, school ya marriage lawn tak deliver karte hain. Sirf ghaas chahiye to sirf ghaas lijiye, aur poora lawn banwana hai to zameen ki safai, levelling aur ghaas lagwane ka kaam bhi hamari team karti hai.",
          "Pehle hum free mein site dekhne aate hain, zameen check karte hain aur batate hain kitni ghaas lagegi. Rate aur jaankari ke liye call ya WhatsApp kijiye.",
        ],
      },
    ],
    localities: {
      title: "Areas we cover around Dasna",
      items: ["Dasna town", "Masuri", "Duhai", "Pilkhuwa", "Hapur", "Raj Nagar Extension", "Crossings Republik", "Vijay Nagar", "Muradnagar", "Villages along NH-9", "Delhi–Meerut Expressway belt", "Eastern Peripheral Expressway belt"],
    },
    faqs: [
      {
        q: "Where can I buy lawn grass in Dasna?",
        a: `NCR Grass is based in Dasna, Ghaziabad. Call or WhatsApp ${site.phoneDisplay} with your location and area size, and we will arrange fresh natural grass delivered to your site.`,
      },
      {
        q: "Dasna mein lawn ki ghaas kahan milegi?",
        a: `NCR Grass Dasna mein hi hai. Call ya WhatsApp (${site.phoneDisplay}) kijiye, apni location aur jagah ka size bataiye, hum taaza ghaas aapke ghar ya farmhouse tak pahuncha denge.`,
      },
      {
        q: "Do you install lawns for marriage and banquet lawns near Dasna?",
        a: "Yes. We prepare the ground and lay natural grass for marriage lawns, banquet and party lawns, farmhouses, schools and homes around Dasna, Masuri, Duhai and Pilkhuwa.",
      },
      {
        q: "Kya aap ghaas lagate bhi ho, ya sirf bechte ho?",
        a: "Dono. Aap sirf ghaas le sakte hain, ya poora kaam hamein de sakte hain: zameen ki safai, levelling, ghaas bichhana aur baad mein dekhbhal ki salah.",
      },
      {
        q: "Do you offer a free site visit in Dasna?",
        a: "Yes. Dasna is our base, and we visit your site free of charge to check the soil and levels and work out how much grass you need.",
      },
    ],
    nearby: ["ghaziabad", "meerut", "noida", "greater-noida"],
  },

  // ───────────────────────────── GHAZIABAD ─────────────────────────────
  {
    slug: "ghaziabad",
    name: "Ghaziabad",
    kind: "city",
    state: "Uttar Pradesh",
    title: "Natural Grass & Lawn Installation in Ghaziabad",
    description:
      "Natural lawn grass supply and installation in Ghaziabad: Raj Nagar Extension, Indirapuram, Vaishali, Crossings Republik. Local team. Free site visit.",
    h1: "Lawn Grass Supply & Installation in Ghaziabad",
    heroText: "From society lawns in Indirapuram to kothis in Kavi Nagar. Local team, farm-fresh grass.",
    blocks: [
      {
        eyebrow: "Local to Ghaziabad",
        title: "A Ghaziabad lawn team, not a far-off supplier",
        paragraphs: [
          "NCR Grass is based in Dasna, inside Ghaziabad district. We supply fresh natural grass and install complete lawns across the city, from the trans-Hindon colonies near Delhi to Raj Nagar Extension, Govindpuram and the Meerut Road side.",
          "Because we are local, we can visit your site, check the ground and plan the lawn properly before any grass arrives. You get one team for the supply, the ground work and the laying.",
        ],
      },
      {
        eyebrow: "Who we serve in Ghaziabad",
        title: "Societies, kothis, schools and offices",
        paragraphs: [
          "Ghaziabad has a lot of new construction, and new buildings usually leave behind compacted soil full of debris. Grass laid on that kind of ground turns patchy fast. We clear the debris, level the ground and prepare the soil first, so the lawn roots properly.",
          "Call it grass plantation, turf laying or simply ghaas lagwana, it is the same job. We work with residential societies and RWAs that want their central lawns and parks redone, homeowners with independent kothis and villas, schools that need a green ground, and offices and factories in the city's industrial areas.",
        ],
        bullets: [
          "Society central lawns and RWA parks",
          "Kothis, villas and independent houses",
          "Schools, colleges and play areas",
          "Offices, showrooms and factory campuses",
          "Builders and landscaping contractors (bulk supply)",
          "Hotels, banquet halls and party lawns",
        ],
      },
      {
        eyebrow: "Hinglish mein",
        title: "Ghaziabad mein ghaas lagwani hai?",
        paragraphs: [
          "Ghar ka lawn ho, society ka park ho ya school ka ground, hum Ghaziabad mein natural ghaas supply bhi karte hain aur poora lawn bhi banate hain. Nayi construction ke baad ki mitti mein malba aur kankad hota hai, isliye hum pehle zameen saaf aur level karte hain, phir ghaas bichhate hain.",
          "Free site visit ke liye call ya WhatsApp kijiye. Hum batayenge kitni ghaas lagegi aur kaam kaise hoga.",
        ],
      },
    ],
    localities: {
      title: "Ghaziabad areas we serve",
      items: ["Raj Nagar Extension", "Raj Nagar", "Kavi Nagar", "Indirapuram", "Vaishali", "Vasundhara", "Kaushambi", "Crossings Republik", "Govindpuram", "Nehru Nagar", "Shastri Nagar", "Sahibabad", "Mohan Nagar", "Loni", "Modinagar", "Muradnagar", "Dasna"],
    },
    faqs: [
      {
        q: "Who supplies natural lawn grass (green grass) in Ghaziabad?",
        a: "NCR Grass supplies fresh natural lawn grass across Ghaziabad from our base in Dasna. We deliver to your site and can also level the ground and lay the lawn.",
      },
      {
        q: "Can you redo the lawn in our society or RWA park?",
        a: "Yes. We regularly plan lawns for shared spaces. We check the existing ground, remove weeds and debris, level it and lay fresh natural grass. Contact us for a free site visit.",
      },
      {
        q: "Ghaziabad mein lawn ghaas ka rate kya hai?",
        a: "Rate ghaas ki variety, jagah ke size aur zameen ki halat par depend karta hai. Apni location aur area (sq ft) WhatsApp kijiye, hum free quote bhej denge.",
      },
      {
        q: "Nayi construction wali mitti par ghaas lag sakti hai?",
        a: "Haan, lekin pehle malba, kankad aur patthar hatana zaroori hai. Hum zameen saaf karke level karte hain aur mitti taiyar karte hain, taaki ghaas achhe se jad pakde.",
      },
      {
        q: "Do you supply grass in bulk to builders in Ghaziabad?",
        a: "Yes. We supply natural grass in bulk for builders, developers and landscaping contractors working in Ghaziabad.",
      },
    ],
    nearby: ["dasna", "noida", "delhi", "meerut"],
  },

  // ───────────────────────────── NOIDA ─────────────────────────────
  {
    slug: "noida",
    name: "Noida",
    kind: "city",
    state: "Uttar Pradesh",
    title: "Lawn Grass Supply & Installation in Noida",
    description:
      "Fresh natural lawn grass for Noida farmhouses, corporate campuses, societies and villas. Ground levelling, grass laying and aftercare. Free site visit.",
    h1: "Natural Lawn Grass for Noida",
    heroText: "Corporate campuses, farmhouses, societies and homes across Noida's sectors.",
    blocks: [
      {
        eyebrow: "Noida",
        title: "Natural lawns for Noida's offices, farmhouses and homes",
        paragraphs: [
          "Noida mixes corporate campuses, large housing societies, independent homes and a farmhouse belt along the Noida Expressway. NCR Grass supplies fresh natural grass and installs lawns for all of them, with deliveries coming in from our base in Dasna.",
          "Office and IT campuses want a lawn that looks sharp every day. Farmhouses want acres of green that stay easy to look after. Homes and villas want a soft lawn for the family. We plan each one around how the space will actually be used.",
        ],
        bullets: [
          "Corporate and IT campuses",
          "Farmhouses along the Noida Expressway",
          "Housing society lawns and parks",
          "Kothis and villas",
          "Schools, colleges and hospitals",
          "Hotels and commercial spaces",
        ],
      },
      {
        eyebrow: "Hinglish mein",
        title: "Noida mein lawn banwana hai?",
        paragraphs: [
          "Office campus ho, farmhouse ho ya ghar ka garden, hum Noida mein taaza natural ghaas deliver karte hain aur zarurat ho to poora lawn bhi banate hain. Free site visit ke liye call ya WhatsApp kijiye.",
        ],
      },
    ],
    localities: {
      title: "Noida areas we serve",
      items: ["Noida Expressway sectors", "Sector 62 & 63", "Sector 125–132", "Sector 135 farmhouses", "Sector 150", "Sector 15A, 14 & 44", "Sector 18", "Sector 50 & 51", "Sector 75–78", "Sector 104–110", "Film City", "Noida Extension"],
    },
    faqs: [
      {
        q: "Do you install lawns for corporate offices in Noida?",
        a: "Yes. We prepare the ground and lay natural grass for corporate and IT campuses, and share an aftercare plan so the facility team can keep it looking good.",
      },
      {
        q: "Can you build a lawn for a farmhouse on the Noida Expressway?",
        a: "Yes. We handle large farmhouse lawns end to end: clearing and levelling the ground, delivering grass in bulk and laying it.",
      },
      {
        q: "Noida mein natural ghaas kaise mangayein?",
        a: `Call ya WhatsApp (${site.phoneDisplay}) kijiye. Apna sector aur jagah ka size bataiye, hum free quote aur delivery plan kar denge.`,
      },
      {
        q: "Is natural grass better than artificial grass for a Noida balcony or terrace?",
        a: "For ground-level lawns, natural grass stays cooler, absorbs rain and feels softer. For terraces and balconies without soil, ask us first: natural grass needs proper soil depth and drainage.",
      },
    ],
    nearby: ["greater-noida", "ghaziabad", "delhi", "dasna"],
  },

  // ───────────────────────────── GREATER NOIDA ─────────────────────────────
  {
    slug: "greater-noida",
    name: "Greater Noida",
    kind: "city",
    state: "Uttar Pradesh",
    title: "Natural Grass Supplier in Greater Noida",
    description:
      "Natural lawn grass supply and lawn installation in Greater Noida and Greater Noida West: societies, institutions, villas and farmhouses. Free site visit.",
    h1: "Lawn Grass Supplier in Greater Noida",
    heroText: "Societies in Greater Noida West, campuses in Knowledge Park, villas and plots across the city.",
    blocks: [
      {
        eyebrow: "Greater Noida",
        title: "Lawns for a city that is still being built",
        paragraphs: [
          "Greater Noida has wide roads, big plots and a lot of new development, from the high-rise societies of Greater Noida West to the universities of Knowledge Park and the projects coming up along the Yamuna Expressway. New plots often have hard, uneven ground left over from construction.",
          "NCR Grass clears that ground, levels it, prepares the soil and lays fresh natural grass. We supply single villa lawns as well as bulk grass for society parks, campuses and developer projects.",
        ],
        bullets: [
          "Society lawns in Greater Noida West",
          "University and school campuses",
          "Villas and independent plots",
          "Farmhouses and estates",
          "Industrial and corporate campuses",
          "Bulk supply for developers and contractors",
        ],
      },
      {
        eyebrow: "Hinglish mein",
        title: "Greater Noida mein ghaas ka kaam",
        paragraphs: [
          "Naye plot ya society mein lawn banwana hai? Hum zameen saaf aur level karte hain, phir taaza natural ghaas bichhate hain. Bulk mein ghaas bhi supply karte hain. Free site visit ke liye call ya WhatsApp kijiye.",
        ],
      },
    ],
    localities: {
      title: "Greater Noida areas we serve",
      items: ["Greater Noida West (Noida Extension)", "Knowledge Park", "Pari Chowk", "Alpha 1 & 2", "Beta 1 & 2", "Gamma 1 & 2", "Delta", "Omega", "Chi & Phi sectors", "Yamuna Expressway", "Dadri", "Surajpur"],
    },
    faqs: [
      {
        q: "Do you supply lawn grass in Greater Noida West?",
        a: "Yes. We deliver fresh natural grass to societies, villas and projects across Greater Noida West (Noida Extension) and can lay the lawn for you.",
      },
      {
        q: "Can you do lawns for colleges and institutions in Knowledge Park?",
        a: "Yes. We plan and install large campus lawns, including ground levelling and bulk grass supply.",
      },
      {
        q: "Naye plot par lawn banane mein kya-kya karna padta hai?",
        a: "Pehle malba aur kankad hatate hain, phir zameen level karke mitti taiyar karte hain, uske baad ghaas bichhate hain. Ye sab hamari team karti hai.",
      },
    ],
    nearby: ["noida", "ghaziabad", "dasna", "uttar-pradesh"],
  },

  // ───────────────────────────── MEERUT ─────────────────────────────
  {
    slug: "meerut",
    name: "Meerut",
    kind: "city",
    state: "Uttar Pradesh",
    title: "Lawn Grass Supply & Installation in Meerut",
    description:
      "Natural lawn grass for Meerut farmhouses, marriage lawns, schools and homes. Supply and lawn installation via the Delhi–Meerut Expressway. Free site visit.",
    h1: "Natural Lawn Grass in Meerut",
    heroText: "Farmhouses, marriage lawns, schools and kothis. Straight up the expressway from our Dasna base.",
    blocks: [
      {
        eyebrow: "Meerut",
        title: "Fresh grass for Meerut, straight up the expressway",
        paragraphs: [
          "Meerut is a direct run up the Delhi–Meerut Expressway from our base in Dasna. NCR Grass supplies fresh natural grass and builds complete lawns across the city and its outskirts.",
          "Meerut has a large number of marriage lawns, farmhouses, schools and big family homes, and every one of them looks better with a proper green lawn. We prepare the ground first and then lay the grass, so it roots well and stays even.",
        ],
        bullets: [
          "Marriage lawns and banquet grounds",
          "Farmhouses and rural estates",
          "Schools, colleges and sports grounds",
          "Kothis and independent homes",
          "Hotels and restaurants on Delhi Road and Garh Road",
          "Institutional and cantonment-area properties",
        ],
      },
      {
        eyebrow: "Hinglish mein",
        title: "Meerut mein marriage lawn ya farmhouse ke liye ghaas",
        paragraphs: [
          "Meerut mein marriage lawn, farmhouse, school ya ghar ka lawn banwana ho, NCR Grass taaza natural ghaas aur poori lagwai ka kaam karta hai. Expressway se seedha delivery. Free site visit ke liye call ya WhatsApp kijiye.",
        ],
      },
    ],
    localities: {
      title: "Meerut areas we serve",
      items: ["Delhi Road", "Garh Road", "Modipuram", "Partapur", "Shastri Nagar", "Pallavpuram", "Ganga Nagar", "Kankerkhera", "Meerut Cantt", "Roorkee Road", "Mawana Road", "Modinagar"],
    },
    faqs: [
      {
        q: "Do you deliver lawn grass to Meerut?",
        a: "Yes. We deliver fresh natural grass to Meerut from our base in Dasna via the Delhi–Meerut Expressway, and can install the full lawn.",
      },
      {
        q: "Marriage lawn ke liye kaunsi ghaas sahi rahegi?",
        a: "Jahan zyada log chalte hain wahan mazboot, ghani ghaas chahiye. Site dekh kar, dhoop aur paani ke hisaab se hum sahi variety batate hain.",
      },
      {
        q: "Can you level a muddy farmhouse plot in Meerut before laying grass?",
        a: "Yes. Clearing, levelling and soil preparation are part of our service before we lay the grass.",
      },
    ],
    nearby: ["dasna", "ghaziabad", "uttar-pradesh", "uttarakhand"],
  },

  // ───────────────────────────── DELHI / NEW DELHI ─────────────────────────────
  {
    slug: "delhi",
    name: "Delhi",
    kind: "city",
    state: "Delhi",
    title: "Lawn Grass Supplier in Delhi & New Delhi",
    description:
      "Natural lawn grass for Delhi and New Delhi farmhouses, kothis and offices: Chhatarpur, Sainik Farms, Bijwasan and across the city. Free site visit.",
    h1: "Natural Lawn Grass Supplier in Delhi & New Delhi",
    heroText: "Farmhouses in Chhatarpur and Bijwasan, kothis in South Delhi, offices and institutions across the city.",
    blocks: [
      {
        eyebrow: "Delhi & New Delhi",
        title: "From Delhi's farmhouse belts to city bungalows",
        paragraphs: [
          "Delhi has some of North India's biggest private lawns: the farmhouses of Chhatarpur, Sainik Farms, Westend Greens, Bijwasan and Kapashera, the bungalows and embassies of New Delhi, and the kothis of South and West Delhi. NCR Grass supplies fresh natural grass and installs lawns for all of them.",
          "We come in from Dasna along the Delhi–Meerut Expressway, which puts East Delhi closest to us, and we cover the rest of the city for supply and installation.",
        ],
        bullets: [
          "Farmhouses and estates",
          "Kothis, bungalows and villas",
          "Embassies, institutions and government campuses",
          "Corporate offices and hotels",
          "Schools and sports grounds",
          "Landscapers and malis needing bulk grass",
        ],
      },
      {
        eyebrow: "Hinglish mein",
        title: "Delhi mein farmhouse ya kothi ke liye ghaas",
        paragraphs: [
          "Delhi mein farmhouse, kothi ya office ka lawn banwana ho, NCR Grass taaza natural ghaas deliver karta hai aur zameen ki taiyari se lekar ghaas bichhane tak poora kaam karta hai. Free site visit ke liye call ya WhatsApp kijiye.",
        ],
      },
    ],
    localities: {
      title: "Delhi areas we serve",
      items: ["Chhatarpur", "Sainik Farms", "Westend Greens", "Rajokri", "Bijwasan", "Kapashera", "Gadaipur", "Mehrauli", "Vasant Vihar", "Greater Kailash", "Lutyens' Delhi", "Dwarka", "Punjabi Bagh", "Alipur & Narela", "Mayur Vihar", "Preet Vihar", "Shahdara"],
    },
    faqs: [
      {
        q: "Do you install farmhouse lawns in Chhatarpur and Sainik Farms?",
        a: "Yes. We supply natural grass in bulk and handle complete farmhouse lawns in Delhi's farmhouse belts, including ground levelling and laying.",
      },
      {
        q: "Delhi mein lawn ghaas kahan se kharidein?",
        a: `NCR Grass se. Hum farm-fresh natural ghaas Delhi mein aapke ghar ya farmhouse tak deliver karte hain. Call ya WhatsApp: ${site.phoneDisplay}.`,
      },
      {
        q: "Do you supply grass to gardeners and landscapers in Delhi?",
        a: "Yes. Malis, landscapers and contractors can order fresh grass from us in bulk, supply only.",
      },
    ],
    nearby: ["ghaziabad", "noida", "haryana", "greater-noida"],
  },

  // ───────────────────────────── STATES ─────────────────────────────
  {
    slug: "uttar-pradesh",
    name: "Uttar Pradesh",
    kind: "state",
    state: "Uttar Pradesh",
    title: "Natural Lawn Grass Supply in Uttar Pradesh",
    description:
      "Natural lawn grass supply and installation across western Uttar Pradesh from our base in Dasna, Ghaziabad. Farmhouses, schools, hotels and homes.",
    h1: "Natural Lawn Grass Across Uttar Pradesh",
    heroText: "Our home state. Based in Dasna, serving Ghaziabad, Noida, Meerut, Hapur and beyond.",
    blocks: [
      {
        eyebrow: "Uttar Pradesh",
        title: "Rooted in western UP",
        paragraphs: [
          "NCR Grass is based in Dasna, Ghaziabad, so western Uttar Pradesh is home ground for us. We supply fresh natural grass and install lawns for farmhouses, schools, hotels, factories and homes across the region.",
          "The Gangetic plain's soil is good for lawns once it is cleared and levelled properly. We handle that groundwork before laying the grass, so the lawn establishes evenly.",
        ],
        bullets: ["Ghaziabad & Dasna", "Noida & Greater Noida", "Meerut", "Hapur & Pilkhuwa", "Bulandshahr", "Muzaffarnagar & further on request"],
      },
      {
        eyebrow: "Hinglish mein",
        title: "UP mein natural ghaas",
        paragraphs: ["Dasna se poore western UP mein taaza natural ghaas ki supply aur lawn banane ka kaam. Apni location bataiye, hum delivery confirm kar denge."],
      },
    ],
    localities: {
      title: "UP cities we serve",
      items: ["Dasna", "Ghaziabad", "Noida", "Greater Noida", "Meerut", "Hapur", "Pilkhuwa", "Modinagar", "Bulandshahr", "Muzaffarnagar"],
    },
    faqs: [
      {
        q: "Which cities in Uttar Pradesh do you deliver lawn grass to?",
        a: "We are based in Dasna and regularly serve Ghaziabad, Noida, Greater Noida, Meerut and Hapur. For other UP cities, share your location and we will confirm delivery.",
      },
      {
        q: "UP mein ghaas ki delivery kahan tak hoti hai?",
        a: "Western UP mein zyada-tar jagah. Apni city aur kitni ghaas chahiye, ye WhatsApp kijiye, hum confirm kar denge.",
      },
    ],
    nearby: ["dasna", "ghaziabad", "meerut", "noida"],
  },
  {
    slug: "haryana",
    name: "Haryana",
    kind: "state",
    state: "Haryana",
    title: "Natural Lawn Grass Supply & Installation in Haryana",
    description:
      "Natural lawn grass for Haryana's farmhouses, corporate campuses and homes: Gurugram, Faridabad, Sonipat and beyond. Bulk supply and complete lawn installation.",
    h1: "Natural Lawn Grass Across Haryana",
    heroText: "Farmhouses, corporate campuses and homes in Gurugram, Faridabad, Sonipat and beyond.",
    blocks: [
      {
        eyebrow: "Haryana",
        title: "Lawns for Haryana's farmhouses and campuses",
        paragraphs: [
          "Haryana's NCR cities have a huge number of farmhouses, corporate campuses and gated communities, and further out the state is full of large farm properties. NCR Grass supplies fresh natural grass and installs lawns across the state.",
          "For big projects we plan bulk deliveries and do the ground preparation, so acres of grass can be laid evenly.",
        ],
        bullets: ["Gurugram farmhouses & offices", "Faridabad homes & institutions", "Sonipat & Panipat estates", "Karnal & Kurukshetra properties", "Bulk supply for contractors"],
      },
      {
        eyebrow: "Hinglish mein",
        title: "Haryana mein farmhouse ka lawn",
        paragraphs: ["Gurugram, Faridabad, Sonipat ya Haryana mein kahin bhi farmhouse ya office ka lawn banwana ho, bulk mein taaza natural ghaas aur poora installation. Call ya WhatsApp kijiye."],
      },
    ],
    localities: {
      title: "Haryana cities we serve",
      items: ["Gurugram", "Faridabad", "Sonipat", "Panipat", "Karnal", "Kurukshetra", "Rohtak", "Bahadurgarh", "Palwal", "Manesar"],
    },
    faqs: [
      {
        q: "Do you deliver natural grass to Gurugram and Faridabad?",
        a: "Yes. We supply natural grass and install lawns in Gurugram, Faridabad and across Haryana. Share your location and area to get a quote.",
      },
      {
        q: "Can you supply grass in bulk for a large Haryana farmhouse?",
        a: "Yes. We plan bulk deliveries and can prepare the ground and lay the grass for large farmhouses.",
      },
    ],
    nearby: ["delhi", "punjab", "rajasthan", "uttar-pradesh"],
  },
  {
    slug: "punjab",
    name: "Punjab",
    kind: "state",
    state: "Punjab",
    title: "Natural Lawn Grass Supply in Punjab",
    description:
      "Natural lawn grass for Punjab farmhouses, kothis and marriage palaces in Ludhiana, Mohali, Jalandhar and Amritsar. Bulk supply and installation.",
    h1: "Natural Lawn Grass for Punjab",
    heroText: "Farmhouses, kothis and marriage palaces in Ludhiana, Mohali, Jalandhar, Amritsar and beyond.",
    blocks: [
      {
        eyebrow: "Punjab",
        title: "Big lawns for farmhouses, kothis and marriage palaces",
        paragraphs: [
          "Punjab loves a big lawn: farmhouses, family kothis and marriage palaces where hundreds of guests gather. NCR Grass supplies fresh natural grass in bulk and installs lawns across the state.",
          "Large lawns need careful levelling and drainage, especially on flat farmland where water can collect. We plan the groundwork before the grass goes down.",
        ],
        bullets: ["Farmhouses and farm estates", "Kothis and villas", "Marriage palaces and resorts", "Schools, colleges and gurdwara grounds", "Bulk supply for landscapers"],
      },
      {
        eyebrow: "Hinglish mein",
        title: "Punjab mein lawn ki ghaas",
        paragraphs: ["Farmhouse, kothi ya marriage palace, Punjab mein bulk mein taaza natural ghaas aur poora lawn installation. Call ya WhatsApp kijiye."],
      },
    ],
    localities: {
      title: "Punjab cities we serve",
      items: ["Ludhiana", "Mohali", "Chandigarh", "Jalandhar", "Amritsar", "Patiala", "Bathinda", "Zirakpur"],
    },
    faqs: [
      {
        q: "Do you supply natural grass in Ludhiana and Mohali?",
        a: "Yes. We supply natural grass in bulk and install lawns across Punjab. Share your location and the area size for a quote and delivery plan.",
      },
      {
        q: "Can you lay a lawn for a marriage palace?",
        a: "Yes. We level the ground, plan drainage and lay natural grass that can handle heavy foot traffic.",
      },
    ],
    nearby: ["haryana", "delhi", "rajasthan"],
  },
  {
    slug: "rajasthan",
    name: "Rajasthan",
    kind: "state",
    state: "Rajasthan",
    title: "Natural Lawn Grass Supply in Rajasthan",
    description:
      "Natural lawn grass for Rajasthan hotels, resorts, wedding venues and farmhouses: Jaipur, Alwar, Neemrana, Bhiwadi. Ground prep for a dry climate.",
    h1: "Natural Lawn Grass for Rajasthan",
    heroText: "Hotels, resorts, wedding venues and farmhouses, with groundwork planned for heat and dry soil.",
    blocks: [
      {
        eyebrow: "Rajasthan",
        title: "Green lawns for heritage hotels, resorts and wedding venues",
        paragraphs: [
          "Rajasthan's hotels, resorts and destination-wedding venues depend on a lush lawn, and so do farmhouses around Jaipur and the Neemrana–Bhiwadi belt. NCR Grass supplies fresh natural grass and installs lawns across the state.",
          "Heat and sandy soil make preparation and watering more important here. We plan soil preparation and give clear watering guidance so the grass establishes well in a dry climate.",
        ],
        bullets: ["Hotels and heritage properties", "Resorts and destination wedding venues", "Farmhouses near Jaipur and Alwar", "Industrial campuses in Bhiwadi & Neemrana", "Schools and institutions"],
      },
      {
        eyebrow: "Hinglish mein",
        title: "Rajasthan mein lawn ki ghaas",
        paragraphs: ["Hotel, resort ya farmhouse ke liye natural ghaas aur poora lawn ka kaam. Garmi aur ret wali mitti ke hisaab se zameen ki taiyari aur paani ki salah. Call ya WhatsApp kijiye."],
      },
    ],
    localities: {
      title: "Rajasthan cities we serve",
      items: ["Jaipur", "Alwar", "Neemrana", "Bhiwadi", "Udaipur", "Ajmer", "Pushkar", "Jodhpur"],
    },
    faqs: [
      {
        q: "Will natural grass survive Rajasthan's heat?",
        a: "Yes, with the right preparation and watering. We prepare the soil properly and give a watering plan suited to the dry climate.",
      },
      {
        q: "Do you do lawns for hotels and wedding venues in Jaipur?",
        a: "Yes. Share your location and lawn area, and we will plan supply and installation.",
      },
    ],
    nearby: ["haryana", "delhi", "punjab"],
  },
  {
    slug: "uttarakhand",
    name: "Uttarakhand",
    kind: "state",
    state: "Uttarakhand",
    title: "Natural Lawn Grass Supply in Uttarakhand",
    description:
      "Natural lawn grass for Uttarakhand's resorts, homestays, hotels and homes: Dehradun, Haridwar, Rishikesh, Roorkee, Haldwani. Lawns for sloping ground too.",
    h1: "Natural Lawn Grass for Uttarakhand",
    heroText: "Resorts, homestays, hotels and homes, including lawns on sloping ground.",
    blocks: [
      {
        eyebrow: "Uttarakhand",
        title: "Lawns for resorts, homestays and hill homes",
        paragraphs: [
          "From riverside resorts in Rishikesh to homes in Dehradun and hotels in Haridwar and Haldwani, a green lawn is a big part of the view. NCR Grass supplies fresh natural grass and installs lawns across Uttarakhand.",
          "Hill sites often have sloping or terraced ground. We prepare and level the ground to suit the site so the grass holds and drains well.",
        ],
        bullets: ["Resorts and homestays", "Hotels and wedding venues", "Homes and villas in Dehradun", "Ashrams and institutions", "Sloping and terraced sites"],
      },
      {
        eyebrow: "Hinglish mein",
        title: "Uttarakhand mein resort ya ghar ka lawn",
        paragraphs: ["Resort, homestay ya ghar ka lawn banwana ho, pahadi aur dhalaan wali zameen par bhi hum zameen taiyar karke natural ghaas lagate hain. Call ya WhatsApp kijiye."],
      },
    ],
    localities: {
      title: "Uttarakhand cities we serve",
      items: ["Dehradun", "Haridwar", "Rishikesh", "Roorkee", "Haldwani", "Rudrapur", "Kashipur", "Mussoorie"],
    },
    faqs: [
      {
        q: "Can you lay a lawn on sloping ground in Uttarakhand?",
        a: "Yes. We prepare and level the ground to suit the slope so the grass roots and drains properly.",
      },
      {
        q: "Do you supply grass to resorts in Rishikesh and Dehradun?",
        a: "Yes. Share your location and lawn area and we will plan delivery and installation.",
      },
    ],
    nearby: ["uttar-pradesh", "meerut", "delhi"],
  },
]

export const cityLocations = locations.filter((l) => l.kind === "city")
export const stateLocations = locations.filter((l) => l.kind === "state")

export function getLocation(slug: string) {
  return locations.find((l) => l.slug === slug)
}

export const locationHref = (slug: string) => `/service-areas/${slug}`
