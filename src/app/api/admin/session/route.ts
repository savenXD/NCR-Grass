import { cookies } from "next/headers"
import { SESSION_COOKIE, verifySessionToken } from "@/lib/admin/session"

/** GET: is the visitor signed in? */
export async function GET() {
  const ok = verifySessionToken((await cookies()).get(SESSION_COOKIE)?.value)
  return Response.json({ ok }, { headers: { "Cache-Control": "no-store" } })
}

/** DELETE: sign out. */
export async function DELETE() {
  ;(await cookies()).delete(SESSION_COOKIE)
  return Response.json({ ok: true })
}
