import "server-only"
import { createHmac, timingSafeEqual } from "node:crypto"

export const SESSION_COOKIE = "ncr_admin"
export const REMEMBER_MAX_AGE = 60 * 60 * 24 * 30 // "remember me": 30 days
export const SHORT_MAX_AGE = 60 * 60 * 12 // otherwise: cookie ends with the browser session, and the token dies after 12 h

const secret = () => process.env.ADMIN_SESSION_SECRET || ""
// The signing key also covers the admin password: changing the password (or the secret) signs every device out,
// including any stolen cookie, even though tokens are stateless.
const key = () => `${secret()}:${process.env.ADMIN_PASSWORD || ""}`
const sign = (payload: string) => createHmac("sha256", key()).update(payload).digest("base64url")

/** `<expiry>.<signature>`: unforgeable without ADMIN_SESSION_SECRET. */
export function createSessionToken(remember: boolean) {
  const payload = String(Date.now() + (remember ? REMEMBER_MAX_AGE : SHORT_MAX_AGE) * 1000)
  return `${payload}.${sign(payload)}`
}

export function verifySessionToken(token: string | undefined) {
  if (!token || !secret() || !process.env.ADMIN_PASSWORD) return false
  const [payload, sig] = token.split(".")
  if (!payload || !sig) return false
  const a = Buffer.from(sig)
  const b = Buffer.from(sign(payload))
  return a.length === b.length && timingSafeEqual(a, b) && Number(payload) > Date.now()
}

/** Constant-time string compare (hashes first so lengths match). */
export function safeEqual(a: string, b: string) {
  const ha = createHmac("sha256", "cmp").update(a).digest()
  const hb = createHmac("sha256", "cmp").update(b).digest()
  return timingSafeEqual(ha, hb)
}
