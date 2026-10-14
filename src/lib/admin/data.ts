"use client"

import { useCallback, useEffect, useState } from "react"
import { signOut } from "@/lib/admin/auth"
import type { Submission } from "@/lib/admin/types"

const REFRESH_MS = 30_000

/**
 * Loads enquiries from `/api/admin/submissions` (Firestore, server-side) and refreshes every 30 s,
 * when the app comes back to the foreground, and on `refresh()`. Keeps the last good list if a refresh fails.
 */
export function useSubmissions() {
  const [state, setState] = useState<{ items: Submission[]; total: number; now: number; loading: boolean; error: string | null }>({
    items: [],
    total: 0,
    now: 0,
    loading: true,
    error: null,
  })

  const refresh = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/submissions", { cache: "no-store" })
      if (res.status === 401) return void signOut() // session expired
      const data = (await res.json().catch(() => null)) as { ok?: boolean; items?: Submission[]; total?: number; error?: string } | null
      if (!res.ok || !data?.ok || !data.items) throw new Error(data?.error || "Could not load enquiries")
      setState({ items: data.items, total: data.total ?? data.items.length, now: Date.now(), loading: false, error: null })
    } catch (e) {
      const offline = typeof navigator !== "undefined" && !navigator.onLine
      setState((s) => ({ ...s, now: s.now || Date.now(), loading: false, error: offline ? "You are offline. Showing the last loaded list." : e instanceof Error ? e.message : "Could not load enquiries" }))
    }
  }, [])

  useEffect(() => {
    void refresh()
    const timer = setInterval(() => void refresh(), REFRESH_MS)
    const onVisible = () => document.visibilityState === "visible" && void refresh()
    document.addEventListener("visibilitychange", onVisible)
    return () => {
      clearInterval(timer)
      document.removeEventListener("visibilitychange", onVisible)
    }
  }, [refresh])

  return { ...state, refresh }
}
