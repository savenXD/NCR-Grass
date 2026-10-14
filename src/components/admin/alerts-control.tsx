"use client"

import { useCallback, useEffect, useState } from "react"
import { createPortal } from "react-dom"
import { Bell, BellOff, BellRing } from "lucide-react"
import { BottomSheet } from "@/components/admin/bottom-sheet"
import { useInstallState } from "@/components/admin/use-install"
import { alertsTurnedOff, disablePush, enablePush, getPushState, syncPush, type PushState } from "@/lib/admin/push"

const ASKED = "ncr-admin-alerts-asked"

const primary =
  "flex h-14 w-full items-center justify-center rounded-full bg-white text-base font-semibold text-foreground transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[oklch(0.25_0.06_150)]"
const secondary =
  "flex h-12 w-full items-center justify-center rounded-full text-sm font-semibold text-emerald-100/75 transition-colors hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"

/**
 * Bell button in the admin header + the permission sheet. Inside the installed app the sheet opens by itself
 * (once per visit) while alerts are not decided yet; the Allow button is the tap that lets the browser show its prompt.
 */
export function AlertsControl() {
  const [state, setState] = useState<PushState>("checking")
  const [open, setOpen] = useState(false)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { installed } = useInstallState()

  const refresh = useCallback(async () => setState(await getPushState()), [])

  useEffect(() => {
    void (async () => {
      const s = await getPushState()
      setState(s)
      if (s === "on") void syncPush()
      // Ask automatically inside the installed app, once per visit, unless alerts were switched off on purpose
      if (installed && (s === "default" || (s === "off" && !alertsTurnedOff()))) {
        try {
          if (sessionStorage.getItem(ASKED)) return
          sessionStorage.setItem(ASKED, "1")
        } catch {}
        setOpen(true)
      }
    })()
  }, [installed])

  if (state === "checking" || state === "unsupported") return null

  async function allow() {
    setBusy(true)
    setError(null)
    const res = await enablePush()
    setBusy(false)
    await refresh()
    if (res.ok) setOpen(false)
    else setError(res.error)
  }

  async function turnOff() {
    setBusy(true)
    await disablePush()
    setBusy(false)
    await refresh()
    setOpen(false)
  }

  const Icon = state === "on" ? BellRing : BellOff

  return (
    <>
      <button
        type="button"
        onClick={() => {
          setError(null)
          setOpen(true)
        }}
        aria-label={state === "on" ? "Enquiry alerts are on" : "Turn on enquiry alerts"}
        className="flex size-12 items-center justify-center rounded-full text-foreground/80 transition-colors hover:bg-primary/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        <Icon className="size-5" aria-hidden="true" />
      </button>

      {/* Portal to <body>: the header's backdrop-blur would otherwise trap a fixed-position sheet inside the top bar */}
      {open &&
        createPortal(
        <BottomSheet labelledBy="alerts-title" describedBy="alerts-desc" onBackdrop={() => setOpen(false)}>
          <div className="mt-5 flex items-center gap-4">
            <span className="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-white/10 text-accent ring-1 ring-white/15">
              <Bell className="size-7" aria-hidden="true" />
            </span>
            <h2 id="alerts-title" className="text-balance text-xl font-semibold leading-tight tracking-tight text-white">
              {state === "on" ? "Enquiry alerts are on" : state === "denied" ? "Notifications are blocked" : "Get a ping for every new enquiry"}
            </h2>
          </div>
          <p id="alerts-desc" className="mt-3 text-[0.95rem] text-emerald-100/70">
            {state === "on"
              ? "This device gets a notification the moment someone sends the form on your website."
              : state === "denied"
                ? "Allow notifications for NCR Grass Admin in your phone or browser settings, then open the app again."
                : "Allow notifications and this device will alert you as soon as someone sends the form on your website."}
          </p>
          {error && (
            <p role="alert" className="mt-3 text-sm font-medium text-red-300">
              {error}
            </p>
          )}
          <div className="mt-6 grid gap-2">
            {state === "on" ? (
              <button type="button" onClick={turnOff} disabled={busy} className={primary}>
                {busy ? "Turning off…" : "Turn off alerts"}
              </button>
            ) : state !== "denied" ? (
              <button type="button" onClick={allow} disabled={busy} autoFocus className={primary}>
                {busy ? "Setting up…" : "Allow notifications"}
              </button>
            ) : null}
            <button type="button" onClick={() => setOpen(false)} className={secondary}>
              {state === "on" || state === "denied" ? "Close" : "Not now"}
            </button>
          </div>
        </BottomSheet>,
          document.body,
        )}
    </>
  )
}
