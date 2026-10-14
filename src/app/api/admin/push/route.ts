import { cookies } from "next/headers"
import { removePushSubscription, savePushSubscription, subscriptionSchema, vapidPublicKey } from "@/lib/push"
import { SESSION_COOKIE, verifySessionToken } from "@/lib/admin/session"

const noStore = { "Cache-Control": "no-store" }
const signedIn = async () => verifySessionToken((await cookies()).get(SESSION_COOKIE)?.value)
const unauthorized = () => Response.json({ ok: false, error: "Not signed in" }, { status: 401, headers: noStore })

/** GET: the public VAPID key the browser needs to subscribe (served only to a signed-in admin). */
export async function GET() {
  if (!(await signedIn())) return unauthorized()
  const publicKey = vapidPublicKey()
  if (!publicKey) return Response.json({ ok: false, error: "Alerts are not configured" }, { status: 503, headers: noStore })
  return Response.json({ ok: true, publicKey }, { headers: noStore })
}

/** POST: remember this device so it gets new-enquiry alerts. */
export async function POST(request: Request) {
  if (!(await signedIn())) return unauthorized()
  const parsed = subscriptionSchema.safeParse(await request.json().catch(() => null))
  if (!parsed.success) return Response.json({ ok: false, error: "Invalid subscription" }, { status: 400, headers: noStore })
  try {
    if (!(await savePushSubscription(parsed.data))) return Response.json({ ok: false, error: "Firebase is not configured" }, { status: 503, headers: noStore })
  } catch (err) {
    console.error("[push] save failed", err)
    return Response.json({ ok: false, error: "Could not save" }, { status: 500, headers: noStore })
  }
  return Response.json({ ok: true }, { headers: noStore })
}

/** DELETE: stop alerts for this device (turned off, or signed out). */
export async function DELETE(request: Request) {
  if (!(await signedIn())) return unauthorized()
  const body = (await request.json().catch(() => null)) as { endpoint?: unknown } | null
  if (typeof body?.endpoint !== "string") return Response.json({ ok: false, error: "Invalid request" }, { status: 400, headers: noStore })
  try {
    await removePushSubscription(body.endpoint)
  } catch (err) {
    console.error("[push] remove failed", err)
    return Response.json({ ok: false, error: "Could not remove" }, { status: 500, headers: noStore })
  }
  return Response.json({ ok: true }, { headers: noStore })
}
