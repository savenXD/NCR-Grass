import type { DayCount } from "@/lib/admin/stats"

const W = 320
const H = 96
const PAD = 6

/** Decorative smooth area chart of enquiries per day (pure SVG, no chart library). */
export function ActivityChart({ data }: { data: DayCount[] }) {
  const max = Math.max(1, ...data.map((d) => d.count))
  const step = (W - PAD * 2) / Math.max(1, data.length - 1)
  const pts = data.map((d, i) => [PAD + i * step, H - PAD - (d.count / max) * (H - PAD * 2 - 8)] as const)

  // smooth curve through the points using cubic Béziers
  const line = pts
    .map(([x, y], i) => {
      if (i === 0) return `M${x},${y}`
      const [px, py] = pts[i - 1]
      const cx = (px + x) / 2
      return `C${cx},${py} ${cx},${y} ${x},${y}`
    })
    .join(" ")
  const area = `${line} L${pts[pts.length - 1][0]},${H} L${pts[0][0]},${H} Z`
  const [lx, ly] = pts[pts.length - 1]
  const total = data.reduce((n, d) => n + d.count, 0)

  return (
    <figure className="m-0">
      <div className="relative h-24">
        <svg
          viewBox={`0 0 ${W} ${H}`}
          role="img"
          aria-label={`${total} enquiries in the last ${data.length} days`}
          className="block size-full overflow-visible"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="admin-area" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="currentColor" stopOpacity="0.22" />
              <stop offset="1" stopColor="currentColor" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path d={area} fill="url(#admin-area)" className="text-primary" />
          <path d={line} fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" vectorEffect="non-scaling-stroke" className="text-primary" />
        </svg>
        {/* HTML dot, not SVG: the SVG is stretched to the card width and would squash a circle into an oval */}
        <span
          aria-hidden="true"
          className="absolute size-3 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white bg-primary"
          style={{ left: `${(lx / W) * 100}%`, top: `${(ly / H) * 100}%` }}
        />
      </div>
      <figcaption className="mt-2 flex justify-between text-xs text-foreground/60">
        <span>{data[0]?.label}</span>
        <span>{data[data.length - 1]?.label}</span>
      </figcaption>
    </figure>
  )
}
