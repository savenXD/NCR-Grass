/**
 * Content for /meet-the-owner. DRAFT: name and photo are real, everything else
 * (role, numbers, story, quote) is placeholder copy the client must confirm (docs/todo.md).
 * Swap values here, not in components.
 */
import { Eye, Leaf, MessageCircle, Sprout, type LucideIcon } from "lucide-react"

export const owner = {
  name: "Arjun Yadav",
  firstName: "Arjun",
  role: "Founder & Owner",
  /** Photo key in assets-source/images/owner (square, built by scripts/build-images.mjs) */
  photo: "/images/owner/arjun-yadav.png",
  photoAlt: "Arjun Yadav, founder and owner of NCR Grass, in his office in Dasna",
  intro:
    "I started NCR Grass to make a good natural lawn simple to get: fresh grass from the farm, laid properly, at a fair price. Every enquiry reaches me, and I like to be on site before work begins.",
  whatsappText: "Hi Arjun, I found you on the NCR Grass website and would like to talk about a lawn.",
} as const

export const ownerFacts = [
  { value: "Dasna", label: "Our base, in Ghaziabad" },
  { value: "Farm to lawn", label: "Grass supply and full installation" },
  { value: "Every space", label: "Farmhouses, offices, hotels and homes" },
  { value: "Direct", label: "Call or WhatsApp the owner" },
] as const

export const ownerQuote = {
  text: "A lawn is something a family lives on for years. I would rather spend an extra hour on the ground work than have a client call me about patches in the first monsoon.",
  cite: "Arjun Yadav, Founder",
} as const

export const ownerPromises: { icon: LucideIcon; title: string; text: string }[] = [
  { icon: Eye, title: "A personal site visit", text: "I look at your soil, slope and sunlight first, so the quote matches the real job." },
  { icon: Leaf, title: "Grass cut fresh", text: "Natural grass is supplied fresh and laid promptly, so it settles in and stays green." },
  { icon: MessageCircle, title: "A direct line to me", text: "No call centre. You speak to the person who runs your project." },
  { icon: Sprout, title: "Care after laying", text: "I explain how to water and mow in the first weeks, and you can call me with questions." },
]

export const ownerSteps = [
  { title: "A conversation and site visit", text: "Tell Arjun about your space. He looks at the soil, slope and sunlight before suggesting anything." },
  { title: "Ground preparation", text: "The land is levelled and prepared so the grass can root evenly." },
  { title: "Fresh grass, laid with care", text: "Natural grass is brought in fresh and laid on the prepared ground." },
  { title: "Aftercare guidance", text: "You get simple advice on watering and mowing, and a number to call if you have questions." },
] as const
