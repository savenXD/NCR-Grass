import { dayKey, formatDayLabel } from "@/lib/admin/format"
import type { Submission } from "@/lib/admin/types"

const DAY = 86_400_000

export type DayCount = { key: string; label: string; count: number }

/** Enquiries per day for the last `days` days (oldest first, today last). */
export function dailyCounts(items: Submission[], now: number, days = 14): DayCount[] {
  const buckets = new Map<string, DayCount>()
  for (let i = days - 1; i >= 0; i--) {
    const t = now - i * DAY
    buckets.set(dayKey(t), { key: dayKey(t), label: formatDayLabel(t), count: 0 })
  }
  for (const s of items) {
    const bucket = buckets.get(dayKey(s.createdAt))
    if (bucket) bucket.count += 1
  }
  return [...buckets.values()]
}

export function summarize(items: Submission[], total: number, now: number) {
  return {
    total,
    week: items.filter((s) => now - s.createdAt < 7 * DAY).length,
  }
}
