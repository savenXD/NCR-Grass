/** Sends a crash to /api/client-error (server logs). Fire-and-forget; never throws. */
export function reportError(error: Error & { digest?: string }) {
  try {
    const body = JSON.stringify({ message: error.message, digest: error.digest, path: location.pathname })
    if (!navigator.sendBeacon?.("/api/client-error", body)) {
      void fetch("/api/client-error", { method: "POST", body, keepalive: true }).catch(() => {})
    }
  } catch {}
}
