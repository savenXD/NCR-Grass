"use client"

import { useRef, useState, type ComponentType } from "react"
import { Menu } from "lucide-react"

type PanelProps = { open: boolean; onClose: () => void }

/**
 * Menu button only. The full-screen panel (icons, links, portal) is a separate chunk loaded on the
 * first touch/focus of this button, so phones don't download, hydrate or prefetch it on page load.
 */
export function MobileMenu() {
  const [open, setOpen] = useState(false)
  const [Panel, setPanel] = useState<ComponentType<PanelProps> | null>(null)
  const loading = useRef(false)

  function load() {
    if (Panel || loading.current) return
    loading.current = true
    import("@/components/sections/mobile-menu-panel")
      .then((m) => setPanel(() => m.MobileMenuPanel))
      .catch(() => {
        loading.current = false // allow a retry on the next tap
      })
  }

  return (
    <div className="lg:hidden">
      <button
        type="button"
        onPointerDown={load}
        onFocus={load}
        onClick={() => {
          load()
          setOpen(true)
        }}
        aria-expanded={open}
        aria-controls="mobile-menu"
        aria-label="Open menu"
        className="flex size-12 items-center justify-center rounded-full border border-white/25 bg-white/15 text-white backdrop-blur-md transition-colors hover:bg-white/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
      >
        <Menu className="size-5.5" />
      </button>
      {Panel && <Panel open={open} onClose={() => setOpen(false)} />}
    </div>
  )
}
