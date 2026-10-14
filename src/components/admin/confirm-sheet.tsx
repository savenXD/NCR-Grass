"use client"

import { useEffect } from "react"
import { BottomSheet } from "@/components/admin/bottom-sheet"

/** Bottom-sheet confirmation (same look as the install sheet). Closes on Cancel, backdrop tap or Escape. */
export function SignOutConfirm({ onCancel, onConfirm }: { onCancel: () => void; onConfirm: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onCancel()
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [onCancel])

  return (
    <BottomSheet role="alertdialog" labelledBy="signout-title" describedBy="signout-desc" onBackdrop={onCancel}>
      <h2 id="signout-title" className="mt-5 text-xl font-semibold tracking-tight text-white">
        Sign out?
      </h2>
      <p id="signout-desc" className="mt-1 text-[0.95rem] text-emerald-100/70">
        You will need your number and password to sign in again.
      </p>
      <div className="mt-6 grid gap-2">
        <button
          type="button"
          onClick={onConfirm}
          className="flex h-14 w-full items-center justify-center rounded-full bg-white text-base font-semibold text-foreground transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[oklch(0.25_0.06_150)]"
        >
          Yes, sign out
        </button>
        <button
          type="button"
          autoFocus
          onClick={onCancel}
          className="flex h-12 w-full items-center justify-center rounded-full border border-white/25 text-sm font-semibold text-white transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
        >
          Cancel
        </button>
      </div>
    </BottomSheet>
  )
}
