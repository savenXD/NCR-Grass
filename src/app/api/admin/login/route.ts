import { cookies } from "next/headers"
import { z } from "zod"
import { clientIp, createLimiter } from "@/lib/rate-limit"
import { SESSION_COOKIE, REMEMBER_MAX_AGE, createSessionToken, safeEqual } from "@/lib/admin/session"

const body = z.object({ phone: z.string().regex(/^[6-9]\d{9}$/), password: z.string().min(1).max(200), remember: z.boolean().optional() })

// 8 failed tries per IP per 15 min. Visitors with no detectable IP share one bucket, so it gets a looser limit.
const limiter = createLimiter({ limit: 8, windowMs: 15 * 60 * 1000 })
const sharedLimiter = createLimiter({ limit: 40, windowMs: 15 * 60 * 1000 })

export async function POST(request: Request) {
  const ip = clientIp(request)
  const lim = ip === "unknown" ? sharedLimiter : limiter
  if (lim.isBlocked(ip)) {
    return Response.json({ ok: false, error: "Too many attempts. Try again in 15 minutes." }, { status: 429 })
  }

  const expectedPhone = process.env.ADMIN_PHONE
  const expectedPassword = process.env.ADMIN_PASSWORD
  if (!expectedPhone || !expectedPassword || !process.env.ADMIN_SESSION_SECRET) {
    return Response.json({ ok: false, error: "Admin login is not configured." }, { status: 503 })
  }

  const parsed = body.safeParse(await request.json().catch(() => null))
  const ok = parsed.success && safeEqual(parsed.data.phone, expectedPhone.replace(/\D/g, "").slice(-10)) && safeEqual(parsed.data.password, expectedPassword)

  if (!ok) {
    lim.hit(ip)
    return Response.json({ ok: false, error: "Wrong number or password" }, { status: 401 })
  }

  lim.reset(ip)
  const remember = parsed.success && parsed.data.remember === true
  ;(await cookies()).set(SESSION_COOKIE, createSessionToken(remember), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    // no maxAge = session cookie, gone when the browser/app is fully closed
    ...(remember ? { maxAge: REMEMBER_MAX_AGE } : {}),
  })
  return Response.json({ ok: true })
}
