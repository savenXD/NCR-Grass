import { cookies } from "next/headers"
import type { Timestamp } from "firebase-admin/firestore"
import { getDb, SUBMISSIONS } from "@/lib/firebase-admin"
import { SESSION_COOKIE, verifySessionToken } from "@/lib/admin/session"
import type { Submission } from "@/lib/admin/types"

const noStore = { "Cache-Control": "no-store" }

/** Newest enquiries first. Only for a signed-in admin (same cookie as the login). */
export async function GET() {
  if (!verifySessionToken((await cookies()).get(SESSION_COOKIE)?.value)) {
    return Response.json({ ok: false, error: "Not signed in" }, { status: 401, headers: noStore })
  }

  const db = getDb()
  if (!db) return Response.json({ ok: false, error: "Firebase is not configured" }, { status: 503, headers: noStore })

  try {
    const col = db.collection(SUBMISSIONS)
    // The list is capped at 500 for speed; the real total comes from a count query so numbers stay right past 500
    const [snap, countSnap] = await Promise.all([col.orderBy("createdAt", "desc").limit(500).get(), col.count().get()])
    const total = countSnap.data().count
    const items: Submission[] = snap.docs.map((d) => {
      const x = d.data()
      return {
        id: d.id,
        name: String(x.name ?? ""),
        phone: String(x.phone ?? ""),
        area: String(x.area ?? ""),
        size: x.size ? String(x.size) : undefined,
        // serverTimestamp is briefly null on a just-written doc
        createdAt: (x.createdAt as Timestamp | undefined)?.toMillis() ?? Date.now(),
      }
    })
    return Response.json({ ok: true, items, total }, { headers: noStore })
  } catch (err) {
    console.error("[admin submissions] read failed", err)
    return Response.json({ ok: false, error: "Could not load enquiries" }, { status: 500, headers: noStore })
  }
}
