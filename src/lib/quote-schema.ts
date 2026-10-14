import { z } from "zod"

export const quoteSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name").max(80),
  phone: z
    .string()
    .trim()
    .regex(/^(\+91[\s-]?|0)?[6-9]\d{4}[\s-]?\d{5}$/, "Enter a valid 10-digit mobile number"),
  area: z.string().trim().min(2, "Please enter your city or area").max(80),
  size: z.string().trim().max(40).optional(),
  // Honeypot — real users leave this empty
  website: z.string().max(0).optional(),
})

export type QuoteInput = z.infer<typeof quoteSchema>
