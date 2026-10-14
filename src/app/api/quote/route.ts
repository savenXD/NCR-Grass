import { after } from "next/server"
import { FieldValue } from "firebase-admin/firestore"
import { getDb, SUBMISSIONS } from "@/lib/firebase-admin"
import { quoteSchema } from "@/lib/quote-schema"
import { notifyNewEnquiry } from "@/lib/push"
import { clientIp, createLimiter } from "@/lib/rate-limit"

// Best-effort spam guard (per server instance): 5 enquiries per IP per 10 minutes (looser for visitors with no detectable IP).
const limiter = createLimiter({ limit: 5, windowMs: 10 * 60 * 1000 })
const sharedLimiter = createLimiter({ limit: 30, windowMs: 10 * 60 * 1000 })

export async function POST(request: Request) {
  const ip = clientIp(request)
  const lim = ip === "unknown" ? sharedLimiter : limiter
  if (lim.isBlocked(ip)) {
    return Response.json({ ok: false, error: "Too many requests" }, { status: 429 })
  }

  const body = await request.json().catch(() => null)
  const parsed = quoteSchema.safeParse(body)
  if (!parsed.success) {
    return Response.json({ ok: false, error: "Invalid details" }, { status: 400 })
  }
  lim.hit(ip)

  const { name, phone, area, size } = parsed.data
  const db = getDb()

  if (!db) {
    // Local development without Firebase keys: keep working, but make it obvious nothing was saved.
    if (process.env.NODE_ENV !== "production") {
      console.warn("[quote enquiry] Firebase is not configured, NOT saved:", { name, phone, area, size })
      return Response.json({ ok: true })
    }
    // In production never pretend a lead was saved. The form then shows its Call / WhatsApp fallback.
    console.error("[quote enquiry] Firebase is not configured")
    return Response.json({ ok: false, error: "Unavailable" }, { status: 503 })
  }

  try {
    await db.collection(SUBMISSIONS).add({
      name,
      phone: phone.replace(/\D/g, "").slice(-10),
      area,
      ...(size ? { size } : {}),
      createdAt: FieldValue.serverTimestamp(),
    })
  } catch (err) {
    console.error("[quote enquiry] Firestore write failed", err)
    return Response.json({ ok: false, error: "Could not save" }, { status: 500 })
  }
  // Phone alert to the owner's installed admin app, sent after the response so the visitor never waits on it
  after(() => notifyNewEnquiry({ name, area }))
  return Response.json({ ok: true })
}
