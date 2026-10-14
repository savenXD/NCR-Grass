"use client"

import { useMemo, useState } from "react"
import { Rows2, Rows4 } from "lucide-react"
import { SubmissionCard } from "@/components/admin/submission-card"
import type { Submission } from "@/lib/admin/types"

type Mode = "compact" | "detailed"

/**
 * Newest first. The toggle switches every card between compact (default) and detailed;
 * tapping a single card overrides that one until the toggle is used again.
 */
export function SubmissionList({ items, total, now }: { items: Submission[]; total: number; now: number }) {
  const [mode, setMode] = useState<Mode>("compact")
  const [overrides, setOverrides] = useState<Record<string, boolean>>({})

  // Newest first. Numbers count up with time, so the oldest enquiry is 1 and the newest matches the total.
  const sorted = useMemo(() => [...items].sort((a, b) => b.createdAt - a.createdAt), [items])

  const isOpen = (id: string) => overrides[id] ?? mode === "detailed"
  const choose = (m: Mode) => {
    setMode(m)
    setOverrides({})
  }

  const tab = (m: Mode) =>
    `flex size-12 items-center justify-center rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
      mode === m ? "bg-primary text-primary-foreground" : "text-foreground/75 hover:bg-primary/10"
    }`

  return (
    <section aria-labelledby="list-title" className="grid gap-4">
      <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-2">
        <h2 id="list-title" className="text-xl font-semibold tracking-tight sm:text-2xl">
          Applications
        </h2>
        <div role="group" aria-label="View" className="flex rounded-full border border-primary/40 p-0.5">
          <button type="button" onClick={() => choose("compact")} aria-pressed={mode === "compact"} aria-label="Compact view" title="Compact view" className={tab("compact")}>
            <Rows4 className="size-5" aria-hidden="true" />
          </button>
          <button type="button" onClick={() => choose("detailed")} aria-pressed={mode === "detailed"} aria-label="Detailed view" title="Detailed view" className={tab("detailed")}>
            <Rows2 className="size-5" aria-hidden="true" />
          </button>
        </div>
      </div>

      {sorted.length === 0 ? (
        <p className="rounded-2xl border border-dashed border-primary/40 p-8 text-center text-foreground/70">No enquiries yet. New ones will show up here.</p>
      ) : (
        <ul className="grid items-start gap-2.5 xl:grid-cols-2 xl:gap-3">
          {sorted.map((item, i) => (
            <SubmissionCard
              key={item.id}
              item={item}
              number={Math.max(total, sorted.length) - i}
              now={now}
              expanded={isOpen(item.id)}
              onToggle={() => setOverrides((o) => ({ ...o, [item.id]: !isOpen(item.id) }))}
            />
          ))}
        </ul>
      )}
    </section>
  )
}
