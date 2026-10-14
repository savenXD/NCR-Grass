import "server-only"

/**
 * Best-effort, per-server-instance rate limiter (fine for a small site; serverless instances don't share memory,
 * so the real protection for /admin is a long random password).
 * Old entries are pruned on every call so the map can't grow without bound.
 */
export function createLimiter({ limit, windowMs, maxKeys = 5000 }: { limit: number; windowMs: number; maxKeys?: number }) {
  const hits = new Map<string, { n: number; reset: number }>()

  function prune(now: number) {
    for (const [k, v] of hits) if (v.reset <= now) hits.delete(k)
    // hard cap: drop the oldest entries if somebody sprays unique keys
    while (hits.size > maxKeys) hits.delete(hits.keys().next().value as string)
  }

  return {
    /** True when this key has used up its attempts in the current window. */
    isBlocked(key: string, now = Date.now()) {
      prune(now)
      const rec = hits.get(key)
      return !!rec && rec.reset > now && rec.n >= limit
    },
    /** Count one attempt. */
    hit(key: string, now = Date.now()) {
      const rec = hits.get(key)
      hits.set(key, rec && rec.reset > now ? { n: rec.n + 1, reset: rec.reset } : { n: 1, reset: now + windowMs })
    },
    reset(key: string) {
      hits.delete(key)
    },
  }
}

/**
 * The visitor's IP as set by the platform. Vercel overwrites x-forwarded-for / sets x-real-ip, so these can't be
 * spoofed by the client there. Falls back to a shared "unknown" bucket (callers should use a looser limit for it).
 */
export function clientIp(request: Request) {
  const h = request.headers
  return h.get("x-real-ip")?.trim() || h.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown"
}
