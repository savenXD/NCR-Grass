"use client"

import { useSyncExternalStore } from "react"
import { forgetPush } from "@/lib/admin/push"

/**
 * Sign-in is checked on the server (`/api/admin/login`) against ADMIN_PHONE / ADMIN_PASSWORD from the env,
 * which sets an httpOnly signed cookie. The browser never sees the credentials or the cookie.
 * localStorage/sessionStorage only keep a "was signed in" hint so the installed app can open offline.
 * Enquiry data comes from `/api/admin/submissions`, which checks the same cookie (`verifySessionToken`).
 */
type State = "pending" | "in" | "out"
const HINT = "ncr-admin-hint"

let state: State = "pending"
let started = false
const listeners = new Set<() => void>()

function set(next: State) {
  if (next === state) return
  state = next
  listeners.forEach((l) => l())
}

/** "remember me" keeps the offline hint in localStorage; otherwise it lives only for the browser session. */
const hint = (v?: "1", remember = true) => {
  try {
    if (v) (remember ? localStorage : sessionStorage).setItem(HINT, v)
    else {
      localStorage.removeItem(HINT)
      sessionStorage.removeItem(HINT)
    }
  } catch {}
}
const hasHint = () => {
  try {
    return localStorage.getItem(HINT) === "1" || sessionStorage.getItem(HINT) === "1"
  } catch {
    return false
  }
}

async function check() {
  try {
    const res = await fetch("/api/admin/session", { cache: "no-store" })
    if (!res.ok) {
      // Server trouble (not "signed out"): show the login screen but keep the offline hint
      set("out")
      return
    }
    const { ok } = (await res.json()) as { ok: boolean }
    if (ok) set("in")
    else {
      hint()
      set("out")
    }
  } catch {
    // offline: trust the last known state so the installed app still opens
    set(hasHint() ? "in" : "out")
  }
}

function subscribe(cb: () => void) {
  listeners.add(cb)
  if (!started) {
    started = true
    void check()
  }
  return () => {
    listeners.delete(cb)
  }
}

/** "pending" on the server and until the first check finishes, so the page never flashes the wrong screen. */
export function useSession(): State {
  return useSyncExternalStore(subscribe, () => state, () => "pending" as const)
}

export async function signIn(phone: string, password: string, remember: boolean): Promise<{ ok: true } | { ok: false; error: string }> {
  try {
    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ phone, password, remember }),
    })
    const data = (await res.json().catch(() => null)) as { ok?: boolean; error?: string } | null
    if (!res.ok || !data?.ok) return { ok: false, error: data?.error || "Could not sign in. Try again." }
  } catch {
    return { ok: false, error: "No connection. Check your internet and try again." }
  }
  hint("1", remember)
  set("in")
  return { ok: true }
}

export async function signOut() {
  hint()
  set("out")
  await forgetPush() // while the cookie still works: this device stops getting alerts
  await fetch("/api/admin/session", { method: "DELETE" }).catch(() => {})
}
