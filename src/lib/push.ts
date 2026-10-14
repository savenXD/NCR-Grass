import "server-only"
import { createHash } from "node:crypto"
import webpush from "web-push"
import { z } from "zod"
import { getDb } from "@/lib/firebase-admin"
import { site } from "@/lib/site"

/**
 * Web Push for the admin app (free, standard Web Push + VAPID, no Firebase client SDK).
 * Env: VAPID_PUBLIC_KEY, VAPID_PRIVATE_KEY (create with `npm run vapid`), optional VAPID_SUBJECT.
 * Subscriptions live in Firestore (`pushSubscriptions`, one doc per device, id = hash of the endpoint).
 */
const COLLECTION = "pushSubscriptions"

export const subscriptionSchema = z.object({
  endpoint: z.url().max(1000).startsWith("https://"),
  keys: z.object({ p256dh: z.string().min(1).max(200), auth: z.string().min(1).max(100) }),
})
export type PushSub = z.infer<typeof subscriptionSchema>

const idOf = (endpoint: string) => createHash("sha256").update(endpoint).digest("hex")

export function vapidPublicKey() {
  return process.env.VAPID_PUBLIC_KEY || null
}

function configure() {
  const pub = process.env.VAPID_PUBLIC_KEY
  const priv = process.env.VAPID_PRIVATE_KEY
  if (!pub || !priv) return false
  webpush.setVapidDetails(process.env.VAPID_SUBJECT || site.url, pub, priv)
  return true
}

export async function savePushSubscription(sub: PushSub) {
  const db = getDb()
  if (!db) return false
  await db.collection(COLLECTION).doc(idOf(sub.endpoint)).set({ endpoint: sub.endpoint, keys: sub.keys, updatedAt: Date.now() })
  return true
}

export async function removePushSubscription(endpoint: string) {
  const db = getDb()
  if (!db) return false
  await db.collection(COLLECTION).doc(idOf(endpoint)).delete()
  return true
}

/** Tells every signed-in admin device about a new enquiry. Never throws: a failed alert must not lose the lead. */
export async function notifyNewEnquiry({ name, area }: { name: string; area: string }) {
  try {
    const db = getDb()
    if (!db || !configure()) return
    const snap = await db.collection(COLLECTION).get()
    if (snap.empty) return
    const payload = JSON.stringify({ title: "New enquiry", body: `${name} · ${area}`, url: "/admin" })
    await Promise.allSettled(
      snap.docs.map(async (d) => {
        const { endpoint, keys } = d.data() as PushSub
        try {
          await webpush.sendNotification({ endpoint, keys }, payload, { TTL: 60 * 60 * 24, urgency: "high", timeout: 8000 })
        } catch (err) {
          const status = (err as { statusCode?: number }).statusCode
          // 404/410 = the device uninstalled the app or revoked permission: forget it
          if (status === 404 || status === 410) await d.ref.delete()
          else console.error("[push] send failed", status ?? err)
        }
      }),
    )
  } catch (err) {
    console.error("[push] notify failed", err)
  }
}
