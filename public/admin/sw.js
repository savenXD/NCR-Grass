/*
 * NCR Grass admin service worker (scope: /admin).
 * - Page loads: network first, fall back to the last cached copy so the installed app opens offline.
 * - Next.js static files + icons: cache first (their URLs change on every build).
 * - Anything else (API calls, Firebase, other sites) is never touched.
 * Bump VERSION to drop old caches.
 */
const VERSION = "v4"
const CACHE = `ncr-admin-${VERSION}`
const SHELL = ["/admin", "/admin/icon-192.png", "/admin/icon-512.png"]

self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(CACHE).then((c) => c.addAll(SHELL)).then(() => self.skipWaiting()))
})

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.filter((k) => k.startsWith("ncr-admin-") && k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  )
})

self.addEventListener("fetch", (event) => {
  const req = event.request
  if (req.method !== "GET") return
  const url = new URL(req.url)
  if (url.origin !== self.location.origin) return

  if (req.mode === "navigate" && url.pathname.startsWith("/admin")) {
    event.respondWith(
      fetch(req)
        .then((res) => {
          // Only the dashboard itself is the offline fallback (not the install guide or any other /admin page), and never an error page
          if (res.ok && url.pathname === "/admin") {
            const copy = res.clone()
            caches.open(CACHE).then((c) => c.put("/admin", copy))
          }
          return res
        })
        .catch(() => caches.match("/admin"))
    )
    return
  }

  if (url.pathname.startsWith("/_next/static/") || url.pathname.startsWith("/admin/icon") || url.pathname === "/logo.svg") {
    event.respondWith(
      caches.match(req).then(
        (hit) =>
          hit ||
          fetch(req).then((res) => {
            if (res.ok) {
              const copy = res.clone()
              caches.open(CACHE).then((c) => c.put(req, copy))
            }
            return res
          })
      )
    )
  }
})

// Push notifications: sent by the server when a new enquiry is saved (src/lib/push.ts)
self.addEventListener("push", (event) => {
  let data = {}
  try {
    data = event.data ? event.data.json() : {}
  } catch {}
  event.waitUntil(
    self.registration.showNotification(data.title || "New enquiry", {
      body: data.body || "Open the app to see the details.",
      icon: "/admin/icon-192.png",
      badge: "/admin/icon-192.png",
      tag: "new-enquiry", // several quick enquiries replace one another instead of piling up...
      renotify: true, // ...but each one still buzzes the phone
      data: { url: data.url || "/admin" },
    })
  )
})

self.addEventListener("notificationclick", (event) => {
  event.notification.close()
  const url = event.notification.data?.url || "/admin"
  event.waitUntil(
    self.clients.matchAll({ type: "window", includeUncontrolled: true }).then((list) => {
      const open = list.find((c) => new URL(c.url).pathname.startsWith("/admin"))
      return open ? open.focus() : self.clients.openWindow(url)
    })
  )
})
