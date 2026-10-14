"use client"

/**
 * Browser side of enquiry alerts (Web Push). Production only, because the service worker is only registered there.
 * The server keeps one record per device (`/api/admin/push`); this file asks permission, subscribes and keeps that record in sync.
 */
export type PushState = "checking" | "unsupported" | "default" | "denied" | "off" | "on"

const supported = () =>
  process.env.NODE_ENV === "production" && typeof window !== "undefined" && "serviceWorker" in navigator && "PushManager" in window && "Notification" in window

/** The active /admin service worker registration. Waits for it (it registers a moment after the page loads), gives up after 6 s. */
async function registration() {
  return Promise.race([navigator.serviceWorker.ready, new Promise<undefined>((resolve) => setTimeout(resolve, 6000))])
}

const OFF_FLAG = "ncr-admin-alerts-off"
const flag = (on: boolean) => {
  try {
    if (on) localStorage.setItem(OFF_FLAG, "1")
    else localStorage.removeItem(OFF_FLAG)
  } catch {}
}
/** True when the owner switched alerts off on purpose, so the app should not keep asking. */
export const alertsTurnedOff = () => {
  try {
    return localStorage.getItem(OFF_FLAG) === "1"
  } catch {
    return false
  }
}

function toKey(base64: string) {
  const pad = "=".repeat((4 - (base64.length % 4)) % 4)
  const raw = atob((base64 + pad).replace(/-/g, "+").replace(/_/g, "/"))
  return Uint8Array.from(raw, (c) => c.charCodeAt(0))
}

const post = (method: "POST" | "DELETE", body: unknown) =>
  fetch("/api/admin/push", { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) })

export async function getPushState(): Promise<PushState> {
  if (!supported()) return "unsupported"
  if (Notification.permission === "denied") return "denied"
  const sub = await (await registration())?.pushManager.getSubscription()
  if (Notification.permission === "granted") return sub ? "on" : "off"
  return "default"
}

/** Must be called from a tap (browsers only show the permission prompt after a user gesture). */
export async function enablePush(): Promise<{ ok: true } | { ok: false; error: string }> {
  try {
    if (!supported()) return { ok: false, error: "This browser cannot show alerts. On iPhone, add the app to the Home Screen first." }
    const permission = await Notification.requestPermission()
    if (permission !== "granted") return { ok: false, error: "Notifications were not allowed." }

    const reg = await registration()
    if (!reg) return { ok: false, error: "The app is still setting up. Close and reopen it, then try again." }

    const keyRes = await fetch("/api/admin/push", { cache: "no-store" })
    const key = (await keyRes.json().catch(() => null)) as { publicKey?: string; error?: string } | null
    if (!keyRes.ok || !key?.publicKey) return { ok: false, error: key?.error || "Alerts are not set up on the server yet." }

    const sub = (await reg.pushManager.getSubscription()) ?? (await reg.pushManager.subscribe({ userVisibleOnly: true, applicationServerKey: toKey(key.publicKey) }))
    const res = await post("POST", sub.toJSON())
    if (!res.ok) {
      await sub.unsubscribe() // the server never heard about this device, so don't pretend alerts are on
      return { ok: false, error: "Could not save this device. Please try again." }
    }
    flag(false)
    return { ok: true }
  } catch {
    return { ok: false, error: "Could not turn on alerts. Check your connection and try again." }
  }
}

/** Turns alerts off for this device (removes the browser subscription and the server record). */
export async function disablePush() {
  flag(true)
  try {
    const sub = await (await registration())?.pushManager.getSubscription()
    if (!sub) return
    await post("DELETE", { endpoint: sub.endpoint }).catch(() => {})
    await sub.unsubscribe()
  } catch {}
}

/** Re-saves this device's subscription on the server (covers a wiped database or a re-signed-in session). */
export async function syncPush() {
  try {
    if (!supported() || Notification.permission !== "granted") return
    const sub = await (await registration())?.pushManager.getSubscription()
    if (sub) await post("POST", sub.toJSON())
  } catch {}
}

/** On sign-out: stop alerts for this device on the server, but keep the browser permission for the next sign-in. */
export async function forgetPush() {
  try {
    if (!supported()) return
    const sub = await (await registration())?.pushManager.getSubscription()
    if (sub) await post("DELETE", { endpoint: sub.endpoint })
  } catch {}
}
