"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Download } from "lucide-react"
import { GUIDE_PATH, runInstall, useInstallState } from "@/components/admin/use-install"

const cls =
  "flex size-12 items-center justify-center rounded-full text-foreground/80 transition-colors hover:bg-primary/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"

/** Header download icon. One-tap install where the browser allows it, otherwise it opens the install guide. Hidden in the installed app. */
export function InstallIconButton() {
  const { canInstall, evt } = useInstallState()
  const pathname = usePathname()
  if (!canInstall || pathname === GUIDE_PATH) return null

  if (evt) {
    return (
      <button type="button" onClick={() => void runInstall(evt)} aria-label="Install app" className={cls}>
        <Download className="size-5" aria-hidden="true" />
      </button>
    )
  }
  return (
    <Link href={GUIDE_PATH} aria-label="How to install the app" className={cls}>
      <Download className="size-5" aria-hidden="true" />
    </Link>
  )
}
