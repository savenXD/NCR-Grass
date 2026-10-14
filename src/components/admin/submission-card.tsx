import { ChevronDown, MapPin, Phone, Ruler } from "lucide-react"
import { WhatsappIcon } from "@/components/shared/whatsapp-icon"
import { formatDate, formatPhone, formatTime, initials, timeAgo } from "@/lib/admin/format"
import type { Submission } from "@/lib/admin/types"

const action =
  "flex h-12 flex-1 items-center justify-center gap-2 rounded-full border border-primary/50 text-sm font-semibold transition-colors hover:bg-primary/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"

/** One enquiry. Compact = name, area and time. Expanded = every field plus call / WhatsApp. */
export function SubmissionCard({ item, number, now, expanded, onToggle }: { item: Submission; number: number; now: number; expanded: boolean; onToggle: () => void }) {
  const digits = item.phone.replace(/\D/g, "").slice(-10)
  const panelId = `sub-${item.id}`

  return (
    <li className="rounded-2xl border border-primary/40">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={expanded}
        aria-controls={panelId}
        className="flex min-h-16 w-full items-center gap-2.5 rounded-2xl p-3 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:p-4"
      >
        <span className="w-8 shrink-0 text-center text-sm font-bold tabular-nums text-foreground/70">
          <span className="sr-only">Application </span>
          {number}
        </span>
        <span aria-hidden="true" className="flex size-11 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
          {initials(item.name)}
        </span>
        <span className="min-w-0 flex-1">
          <span className="block truncate font-semibold">{item.name}</span>
          <span className="block truncate text-sm text-foreground/70">
            {item.area} · {timeAgo(item.createdAt, now)}
          </span>
        </span>
        <ChevronDown className={`size-5 shrink-0 text-foreground/60 transition-transform ${expanded ? "rotate-180" : ""}`} aria-hidden="true" />
      </button>

      {expanded && (
        <div id={panelId} className="grid gap-4 border-t border-primary/25 p-3.5 sm:p-4">
          <dl className="grid gap-3 text-sm sm:grid-cols-2">
            <Row icon={Phone} label="Phone" value={formatPhone(item.phone)} />
            <Row icon={MapPin} label="City / area" value={item.area} />
            <Row icon={Ruler} label="Lawn size" value={item.size || "Not given"} />
            <div>
              <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-foreground/60">Received</dt>
              <dd className="mt-0.5 font-medium">
                {formatDate(item.createdAt)} · {formatTime(item.createdAt)}
              </dd>
            </div>
          </dl>
          <div className="flex gap-2">
            <a href={`tel:+91${digits}`} className={action}>
              <Phone className="size-4" aria-hidden="true" />
              Call
            </a>
            <a
              href={`https://wa.me/91${digits}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-12 flex-1 items-center justify-center gap-2 rounded-full bg-[#25D366] text-sm font-semibold text-[#06260f] transition-colors hover:bg-[#1fbd5b] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              <WhatsappIcon className="size-5" />
              WhatsApp
            </a>
          </div>
        </div>
      )}
    </li>
  )
}

function Row({ icon: Icon, label, value }: { icon: typeof Phone; label: string; value: string }) {
  return (
    <div>
      <dt className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-foreground/60">
        <Icon className="size-3.5" aria-hidden="true" />
        {label}
      </dt>
      <dd className="mt-0.5 font-medium">{value}</dd>
    </div>
  )
}
