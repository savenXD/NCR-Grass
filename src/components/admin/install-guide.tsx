"use client"

import { useState, type ReactNode } from "react"
import { Check, Compass, Download, EllipsisVertical, Share, SquarePlus, type LucideIcon } from "lucide-react"
import { runInstall, useInstallState } from "@/components/admin/use-install"
import { cn } from "@/lib/utils"

type Tab = "iphone" | "android"
type Step = { icon: LucideIcon; text: ReactNode }

const b = (t: string) => <strong className="font-semibold text-foreground">{t}</strong>

const steps: Record<Tab, Step[]> = {
  iphone: [
    { icon: Compass, text: <>Open this page in {b("Safari")}.</> },
    { icon: Share, text: <>Tap the {b("Share")} button at the bottom of the screen (top right on iPad).</> },
    { icon: SquarePlus, text: <>Scroll down and tap {b("Add to Home Screen")}.</> },
    { icon: Check, text: <>Tap {b("Add")}. The app icon now appears on your home screen.</> },
  ],
  android: [
    { icon: Compass, text: <>Open this page in {b("Chrome")}.</> },
    { icon: EllipsisVertical, text: <>Tap the {b("menu")} (three dots) at the top right.</> },
    { icon: Download, text: <>Tap {b("Install app")} (or {b("Add to Home screen")}).</> },
    { icon: Check, text: <>Tap {b("Install")}. The app icon now appears on your home screen.</> },
  ],
}

const note: Record<Tab, string> = {
  iphone: "Needs iOS 16.4 or newer. Other browsers on iPhone also work: use their Share button the same way.",
  android: "Using Samsung Internet? Tap the menu (three lines), then Add page to, then Home screen.",
}

/** Numbered install steps with iPhone / Android tabs (opens on the visitor's own phone). */
export function InstallGuide() {
  const { evt, ios } = useInstallState()
  const [picked, setPicked] = useState<Tab | null>(null)
  const tab: Tab = picked ?? (ios ? "iphone" : "android")

  const tabBtn = (t: Tab, label: string) => (
    <button
      type="button"
      role="tab"
      id={`guide-tab-${t}`}
      aria-selected={tab === t}
      aria-controls="guide-panel"
      onClick={() => setPicked(t)}
      className={cn(
        "h-12 flex-1 rounded-full text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        tab === t ? "bg-primary text-primary-foreground" : "text-foreground/75 hover:bg-primary/10",
      )}
    >
      {label}
    </button>
  )

  return (
    <div className="mt-8">
      <div role="tablist" aria-label="Your phone" className="flex rounded-full border border-primary/40 p-1">
        {tabBtn("iphone", "iPhone")}
        {tabBtn("android", "Android")}
      </div>

      <div id="guide-panel" role="tabpanel" aria-labelledby={`guide-tab-${tab}`}>
        {tab === "android" && evt && (
          <button
            type="button"
            onClick={() => void runInstall(evt)}
            className="mt-5 flex h-14 w-full items-center justify-center gap-3 rounded-full bg-primary text-base font-semibold text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            <Download className="size-5" aria-hidden="true" />
            Install now
          </button>
        )}

        <ol className="mt-5 grid gap-3">
          {steps[tab].map(({ icon: Icon, text }, i) => (
            <li key={i} className="flex items-center gap-4 rounded-2xl border border-primary/40 p-4">
              <span aria-hidden="true" className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                {i + 1}
              </span>
              <span className="min-w-0 flex-1 leading-snug text-foreground/75">{text}</span>
              <Icon className="size-6 shrink-0 text-primary" aria-hidden="true" />
            </li>
          ))}
        </ol>

        <p className="mt-4 text-sm text-foreground/70">{note[tab]}</p>
        <p className="mt-6 rounded-2xl border border-dashed border-primary/40 p-4 text-sm leading-relaxed text-foreground/75">
          Then open the app from your home screen, sign in, and tap {b("Allow notifications")} to get an alert for every new enquiry.
        </p>
      </div>
    </div>
  )
}
