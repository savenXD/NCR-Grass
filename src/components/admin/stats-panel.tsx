import { ActivityChart } from "@/components/admin/activity-chart"
import type { DayCount } from "@/lib/admin/stats"

type Summary = { total: number; week: number }

/** Total enquiries and a small 14-day chart. The "this week" chip only shows when there is something to show. */
export function StatsPanel({ summary, days }: { summary: Summary; days: DayCount[] }) {
  return (
    <section aria-labelledby="stats-title" className="rounded-3xl border border-primary/40 bg-white/40 p-5 sm:p-7">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 id="stats-title" className="text-xs font-semibold uppercase tracking-[0.18em] text-foreground/70">
            Total applications
          </h2>
          <p className="mt-2 text-6xl font-semibold leading-none tracking-tight tabular-nums sm:text-7xl">{summary.total}</p>
        </div>
        {summary.week > 0 && (
          <span className="rounded-lg bg-accent px-2.5 py-1 text-xs font-bold text-accent-foreground">+{summary.week} this week</span>
        )}
      </div>
      <div className="mt-6">
        <ActivityChart data={days} />
      </div>
    </section>
  )
}
