import { clientIp, createLimiter } from "@/lib/rate-limit"

// Browser crashes are sent here so they show up in the host's server logs (free, no third-party monitoring).
const limiter = createLimiter({ limit: 10, windowMs: 10 * 60 * 1000 })

export async function POST(request: Request) {
  const ip = clientIp(request)
  if (limiter.isBlocked(ip)) return new Response(null, { status: 204 })
  limiter.hit(ip)

  const raw = await request.text()
  if (raw.length > 2000) return new Response(null, { status: 204 })
  let data: { message?: unknown; digest?: unknown; path?: unknown } = {}
  try {
    data = JSON.parse(raw)
  } catch {}
  console.error("[client error]", {
    message: String(data.message ?? "").slice(0, 300),
    digest: String(data.digest ?? "").slice(0, 60),
    path: String(data.path ?? "").slice(0, 200),
  })
  return new Response(null, { status: 204 })
}
