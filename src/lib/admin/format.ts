const TZ = "Asia/Kolkata"

const dateFmt = new Intl.DateTimeFormat("en-IN", { day: "numeric", month: "short", year: "numeric", timeZone: TZ })
const timeFmt = new Intl.DateTimeFormat("en-IN", { hour: "numeric", minute: "2-digit", hour12: true, timeZone: TZ })
const dayKeyFmt = new Intl.DateTimeFormat("en-CA", { year: "numeric", month: "2-digit", day: "2-digit", timeZone: TZ })
const dayLabelFmt = new Intl.DateTimeFormat("en-IN", { day: "numeric", month: "short", timeZone: TZ })

export const formatDate = (ms: number) => dateFmt.format(ms)
export const formatTime = (ms: number) => timeFmt.format(ms).toUpperCase()
export const formatDayLabel = (ms: number) => dayLabelFmt.format(ms)
/** `YYYY-MM-DD` in India time, used to bucket enquiries by day. */
export const dayKey = (ms: number) => dayKeyFmt.format(ms)

export function timeAgo(ms: number, now: number) {
  const mins = Math.max(0, Math.round((now - ms) / 60000))
  if (mins < 1) return "Just now"
  if (mins < 60) return `${mins} min ago`
  const hours = Math.round(mins / 60)
  if (hours < 24) return `${hours} hr ago`
  const days = Math.round(hours / 24)
  return days === 1 ? "Yesterday" : `${days} days ago`
}

/** `9876543210` -> `98765 43210` (format example only) */
export function formatPhone(raw: string) {
  const d = raw.replace(/\D/g, "").slice(-10)
  return d.length === 10 ? `${d.slice(0, 5)} ${d.slice(5)}` : raw
}

export const initials = (name: string) =>
  name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]!.toUpperCase())
    .join("")
