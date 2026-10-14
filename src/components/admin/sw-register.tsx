"use client"

import { useEffect } from "react"

/** Registers the /admin service worker (scope limited to /admin). Production only, so dev HMR is never cached. */
export function ServiceWorkerRegister() {
  useEffect(() => {
    if (process.env.NODE_ENV !== "production" || !("serviceWorker" in navigator)) return
    navigator.serviceWorker.register("/admin/sw.js", { scope: "/admin" }).catch(() => {})
  }, [])
  return null
}
