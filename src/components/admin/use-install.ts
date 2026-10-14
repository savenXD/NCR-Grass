"use client"

import { useSyncExternalStore } from "react"

export type InstallEvent = Event & { prompt: () => Promise<void>; userChoice: Promise<{ outcome: "accepted" | "dismissed" }> }
declare global {
  interface Window {
    /** Captured by the inline script in the admin layout, because the event can fire before React hydrates */
    __ncrInstall?: InstallEvent
  }
}

const INSTALLED = "ncr-admin-installed"
const CHANGED = "ncr-install-change"
/** Step-by-step install guide (iPhone + Android). Where the install buttons lead when the browser has no one-tap install. */
export const GUIDE_PATH = "/admin/install"
const noop = () => () => {}

/** True when running as the installed app (Android/desktop standalone window, or iPhone home-screen app). */
function isInstalled() {
  try {
    if (localStorage.getItem(INSTALLED) === "1") return true
  } catch {}
  return window.matchMedia("(display-mode: standalone)").matches || (navigator as Navigator & { standalone?: boolean }).standalone === true
}

function subscribeInstalled(cb: () => void) {
  const mq = window.matchMedia("(display-mode: standalone)")
  mq.addEventListener("change", cb)
  window.addEventListener("appinstalled", cb)
  window.addEventListener(CHANGED, cb)
  return () => {
    mq.removeEventListener("change", cb)
    window.removeEventListener("appinstalled", cb)
    window.removeEventListener(CHANGED, cb)
  }
}

function subscribeEvent(cb: () => void) {
  window.addEventListener("beforeinstallprompt", cb)
  window.addEventListener(CHANGED, cb)
  return () => {
    window.removeEventListener("beforeinstallprompt", cb)
    window.removeEventListener(CHANGED, cb)
  }
}

const isAndroid = () => /Android/i.test(navigator.userAgent)
const isIos = () => /iPhone|iPad|iPod/.test(navigator.userAgent) || (navigator.userAgent.includes("Macintosh") && navigator.maxTouchPoints > 1)

export function markInstalled() {
  try {
    localStorage.setItem(INSTALLED, "1")
  } catch {}
  window.__ncrInstall = undefined
  window.dispatchEvent(new Event(CHANGED))
}

/** Runs the browser's install dialog. Resolves true if the user installed. The event only works once. */
export async function runInstall(evt: InstallEvent) {
  await evt.prompt()
  const { outcome } = await evt.userChoice
  if (outcome === "accepted") markInstalled()
  else {
    window.__ncrInstall = undefined
    window.dispatchEvent(new Event(CHANGED))
  }
  return outcome === "accepted"
}

/** Shared by the popup, the header button and the guide. `canInstall` is false inside the installed app and on desktop browsers without install support. */
export function useInstallState() {
  const installed = useSyncExternalStore(subscribeInstalled, isInstalled, () => true)
  const evt = useSyncExternalStore(subscribeEvent, () => window.__ncrInstall ?? null, () => null)
  const ios = useSyncExternalStore(noop, isIos, () => false)
  const android = useSyncExternalStore(noop, isAndroid, () => false)
  // One-tap install where the browser offers it; iPhone and Android phones without it are sent to the guide
  return { installed, evt, ios, android, canInstall: !installed && (!!evt || ios || android) }
}
