"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ArrowRight, Download } from "lucide-react"
import { BottomSheet } from "@/components/admin/bottom-sheet"
import { GUIDE_PATH, markInstalled, runInstall, useInstallState } from "@/components/admin/use-install"

/**
 * Install popup, shown on every visit until the app is installed (never inside the installed app, never on the guide itself).
 * Browsers with one-tap install (Chrome, Edge on Android / desktop): the button runs the browser's install dialog.
 * Everything else (iPhone / iPad, other Android browsers): the button opens the step-by-step install guide.
 */
export function InstallPrompt() {
  const { canInstall, evt } = useInstallState()
  const [closed, setClosed] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    window.addEventListener("appinstalled", markInstalled)
    return () => window.removeEventListener("appinstalled", markInstalled)
  }, [])

  if (!canInstall || closed || pathname === GUIDE_PATH) return null

  async function install() {
    if (!evt) return
    if (!(await runInstall(evt))) setClosed(true)
  }

  const button =
    "mt-6 flex h-14 w-full items-center justify-between rounded-full bg-white py-1 pl-7 pr-1 text-base font-semibold text-foreground transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[oklch(0.25_0.06_150)]"
  const knob = "flex size-12 items-center justify-center rounded-full bg-primary text-primary-foreground"

  return (
    <BottomSheet labelledBy="install-title">
      <div className="mt-5 flex items-center gap-4">
        <Image src="/admin/icon-192.png" alt="" width={64} height={64} className="size-16 rounded-2xl ring-1 ring-white/20" />
        <div className="min-w-0">
          <h2 id="install-title" className="text-balance text-xl font-semibold leading-tight tracking-tight text-white">
            Install NCR Grass Admin
          </h2>
          <p className="mt-0.5 text-sm text-emerald-100/70">Open your enquiries in one tap.</p>
        </div>
      </div>

      {evt ? (
        <>
          <button type="button" onClick={install} className={button}>
            Install app
            <span className={knob}>
              <Download className="size-5" aria-hidden="true" />
            </span>
          </button>
          <Link href={GUIDE_PATH} className="mt-2 flex h-12 w-full items-center justify-center text-sm font-medium text-emerald-100/75 underline-offset-4 hover:text-white hover:underline">
            Not working? See how to install
          </Link>
        </>
      ) : (
        <Link href={GUIDE_PATH} className={button}>
          See how to install
          <span className={knob}>
            <ArrowRight className="size-5" aria-hidden="true" />
          </span>
        </Link>
      )}
      <button
        type="button"
        onClick={() => setClosed(true)}
        className="mt-2 flex h-12 w-full items-center justify-center rounded-full text-sm font-semibold text-emerald-100/75 transition-colors hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
      >
        Not now
      </button>
    </BottomSheet>
  )
}
