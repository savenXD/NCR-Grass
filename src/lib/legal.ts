/**
 * Plain-language legal pages. Every statement must match how the site actually works today:
 * - Quote form collects name, mobile, city/area, optional lawn size (src/lib/quote-schema.ts)
 * - Enquiries are stored in Google Cloud Firestore (src/lib/firebase-admin.ts) and read in the password-protected /admin app
 * - The site is hosted on Vercel; no analytics, ad trackers or first-party cookies; Google Maps loads only after a tap; WhatsApp links
 * UPDATE THESE if analytics, email delivery, cookies, other storage or new third parties are added.
 * Client should have them reviewed by a legal advisor (docs/todo.md).
 */
import { site } from "@/lib/site"

export type LegalSection = { title: string; paragraphs: string[]; bullets?: string[] }

export const legalUpdated = "14 October 2026"

export const aiImageNotice =
  "Some images on this website are created with AI tools for illustration. They do not show specific NCR Grass projects, customers or locations."

export const privacyPolicy: LegalSection[] = [
  {
    title: "Who we are",
    paragraphs: [
      `This website (${site.url.replace("https://", "")}) belongs to ${site.name}, a natural grass supply and lawn installation business based in ${site.address}. This policy explains what information we collect through the website, why, and what we do with it.`,
    ],
  },
  {
    title: "Information you give us",
    paragraphs: ["When you fill in the request-a-call form, we receive:"],
    bullets: ["Your name", "Your mobile number", "Your city or area", "Your approximate lawn size, if you enter it"],
  },
  {
    title: "When you call or WhatsApp us",
    paragraphs: [
      "If you call us or message us on WhatsApp, we receive your phone number and whatever you choose to share, such as your location, site photos or project details. WhatsApp is run by Meta, and its own privacy policy applies to messages sent through it.",
    ],
  },
  {
    title: "Where your details are stored",
    paragraphs: [
      "Details sent through the request-a-call form are saved in Google Cloud Firestore, a database service run by Google. Only our team can read them, through a password-protected dashboard, and our team's phone may show a short alert (your name and area) when an enquiry arrives. We do not make them public.",
      "This website is hosted on Vercel, which may process technical request data (see Cookies and tracking below) to deliver the pages. Google and Vercel act as service providers for us and handle data under their own terms and privacy policies.",
    ],
  },
  {
    title: "How we use your information",
    paragraphs: ["We use the details you share only to:"],
    bullets: [
      "Contact you about your enquiry",
      "Arrange a site visit and prepare a quote",
      "Deliver grass and carry out the work you ask for",
      "Keep a record of our conversation and any order",
    ],
  },
  {
    title: "What we do not do",
    paragraphs: [
      "We do not sell or rent your personal information. We do not use it for advertising, and we do not add you to marketing lists.",
    ],
  },
  {
    title: "Cookies and tracking",
    paragraphs: [
      "This website does not set its own cookies and does not use analytics or advertising trackers.",
      "The home page has an embedded Google Map that loads only after you tap it. Once loaded, Google may collect information and set cookies under Google's own privacy policy. Clicking a WhatsApp or phone link opens that app, and its own terms apply.",
      "Like most websites, the server that hosts this site may automatically record technical details such as your IP address, browser type and the pages you request. These logs are used to run and protect the website.",
    ],
  },
  {
    title: "How long we keep it",
    paragraphs: [
      "We keep enquiry details only for as long as we need them to respond to you, complete any work, and keep reasonable business records. When they are no longer needed we delete them from our dashboard and database.",
    ],
  },
  {
    title: "Your choices",
    paragraphs: [
      `You can ask us to show, correct or delete the personal information we hold about you, or withdraw your consent to us contacting you. Call or WhatsApp us on ${site.phoneDisplay} and we will help. This number is also our contact point for any privacy question or complaint. If you are not satisfied with our response, you may raise it with the authority that Indian data protection law provides for.`,
    ],
  },
  {
    title: "Children",
    paragraphs: ["This website is meant for adults arranging grass supply or lawn work. It is not directed at children."],
  },
  {
    title: "Changes to this policy",
    paragraphs: ["If we change how we handle information, we will update this page and the date at the top."],
  },
]

export const termsOfUse: LegalSection[] = [
  {
    title: "About these terms",
    paragraphs: [
      `By using this website you agree to these terms. If you do not agree, please do not use the site. The website is run by ${site.name}, ${site.address}.`,
    ],
  },
  {
    title: "Information on this website",
    paragraphs: [
      "The content on this website is general information about our natural grass supply and lawn services. We try to keep it accurate and up to date, but it may contain mistakes or become out of date.",
      "Lawn care tips on this site are general guidance. Every site is different, so the right approach for your lawn depends on your soil, water, sunlight and use.",
    ],
  },
  {
    title: "Quotes, prices and service areas",
    paragraphs: [
      "Nothing on this website is a fixed offer or price. Prices depend on the grass variety, area size, ground condition and location, and are confirmed only after we understand your site.",
      "Service areas listed on this website show where we work. Delivery and installation for a particular location are confirmed for each enquiry.",
      "The details of any order or job, including price, scope and timing, are agreed directly between you and us.",
    ],
  },
  {
    title: "Results",
    paragraphs: [
      "Natural grass is a living plant. How a lawn grows after installation depends on watering, care, weather and other conditions outside our control. We share aftercare guidance, but we cannot promise a specific result.",
    ],
  },
  {
    title: "Images",
    paragraphs: [aiImageNotice],
  },
  {
    title: "Using our content",
    paragraphs: [
      "The text, design and logo on this website belong to NCR Grass. Please do not copy or reuse them for commercial purposes without our permission.",
    ],
  },
  {
    title: "Links to other websites and apps",
    paragraphs: [
      "This website links to services such as WhatsApp and Google Maps. We do not control them and are not responsible for their content or how they handle your information.",
    ],
  },
  {
    title: "Website availability",
    paragraphs: ["We may update, change or pause the website at any time, and we do not guarantee it will always be available or free of errors."],
  },
  {
    title: "Governing law",
    paragraphs: ["These terms are governed by the laws of India."],
  },
  {
    title: "Contact",
    paragraphs: [`Questions about these terms? Call or WhatsApp us on ${site.phoneDisplay}.`],
  },
]

export const disclaimer: LegalSection[] = [
  {
    title: "AI-generated images",
    paragraphs: [
      aiImageNotice,
      "They are used to show the kind of spaces and lawns we work on, such as farmhouses, offices, hotels and homes. Some before-and-after comparisons may also be illustrations rather than records of a specific job. We will add real photos of our work as they become available.",
    ],
  },
  {
    title: "General information only",
    paragraphs: [
      "The information on this website, including lawn care tips and descriptions of grass and services, is general in nature. It is not a substitute for an on-site assessment of your property.",
    ],
  },
  {
    title: "Places named on this website",
    paragraphs: [
      "Cities, localities and states are named on this website to describe where we offer our services. Naming a place does not mean we have completed a project there, and it does not suggest any connection with local authorities, housing societies or other organisations.",
    ],
  },
  {
    title: "No guaranteed results or prices",
    paragraphs: [
      "Lawn results depend on soil, water, weather and care. Prices and availability are confirmed for each enquiry. See our Terms of Use for details.",
    ],
  },
  {
    title: "Third-party services",
    paragraphs: [
      "Google, Google Maps, WhatsApp and other names mentioned on this website belong to their owners. NCR Grass is not affiliated with or endorsed by them.",
    ],
  },
]
