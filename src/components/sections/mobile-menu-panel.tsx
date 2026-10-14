"use client"

import { useEffect, useRef, useState } from "react"
import { createPortal } from "react-dom"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  ArrowUpRight,
  BookOpen,
  CircleHelp,
  House,
  Info,
  MapPin,
  MessageCircle,
  Phone,
  Send,
  Sprout,
  X,
  type LucideIcon,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { navLinks, phoneHref, site, whatsappHref } from "@/lib/site"

const icons: Record<string, LucideIcon> = {
  "/": House,
  "/about": Info,
  "/services": Sprout,
  "/service-areas": MapPin,
  "/blog": BookOpen,
  "/faq": CircleHelp,
  "/contact": Send,
}

/**
 * Full-screen mobile menu on the site's green page background.
 * Lazy-loaded by mobile-menu.tsx on the first tap, so its links (and their page prefetches)
 * don't exist until the visitor actually opens the menu.
 */
export function MobileMenuPanel({ open: openProp, onClose }: { open: boolean; onClose: () => void }) {
  const pathname = usePathname()
  // First mount happens on the tap that opens the menu: render one frame closed so it animates in
  const [ready, setReady] = useState(false)
  useEffect(() => {
    const id = requestAnimationFrame(() => setReady(true))
    return () => cancelAnimationFrame(id)
  }, [])
  const open = openProp && ready
  const setOpen = (v: boolean) => !v && onClose()

  // Latest onClose without re-running the focus effects (the parent passes a new function every render)
  const closeRef = useRef(onClose)
  useEffect(() => {
    closeRef.current = onClose
  })
  const panel = useRef<HTMLDivElement>(null)
  const closeBtn = useRef<HTMLButtonElement>(null)

  // Lock page scroll while open; close on Escape; keep Tab inside the menu; hand focus back to the opener on close
  useEffect(() => {
    if (!open) return
    const opener = document.activeElement as HTMLElement | null
    document.body.style.overflow = "hidden"
    closeBtn.current?.focus()
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") return closeRef.current()
      if (e.key !== "Tab" || !panel.current) return
      const items = [...panel.current.querySelectorAll<HTMLElement>("a[href], button:not([disabled])")]
      if (items.length === 0) return
      const first = items[0]
      const last = items[items.length - 1]
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }
    window.addEventListener("keydown", onKey)
    return () => {
      document.body.style.overflow = ""
      window.removeEventListener("keydown", onKey)
      opener?.focus?.()
    }
  }, [open])

  // Browser Back (or any navigation) changes the path: close the menu so it never covers the new page
  const firstPath = useRef(pathname)
  useEffect(() => {
    if (pathname !== firstPath.current) {
      firstPath.current = pathname
      closeRef.current()
    }
  }, [pathname])

  return createPortal(
    <div
      ref={panel}
      id="mobile-menu"
      role="dialog"
      aria-modal="true"
      aria-label="Menu"
      aria-hidden={!open}
      inert={!open}
      className={cn(
        "fixed inset-0 z-50 flex flex-col overflow-y-auto bg-gradient-to-b from-background via-background to-secondary px-5 pb-[max(1.25rem,env(safe-area-inset-bottom))] pt-5 text-foreground transition-[opacity,transform] duration-300 ease-out",
        open ? "translate-y-0 opacity-100" : "pointer-events-none -translate-y-3 opacity-0",
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <Link href="/" onClick={() => setOpen(false)} className="flex min-h-12 items-center gap-3">
          <span className="flex size-11 items-center justify-center rounded-full bg-primary p-2">
            <Image src="/logo.svg" alt="" width={28} height={28} className="size-full object-contain" />
          </span>
          <span className="text-xl font-bold tracking-tight">{site.name}</span>
        </Link>
        <button
          ref={closeBtn}
          type="button"
          onClick={() => setOpen(false)}
          aria-label="Close menu"
          className="flex size-12 items-center justify-center rounded-full border border-primary/25 bg-primary/10 transition-colors hover:bg-primary/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <X className="size-5" />
        </button>
      </div>

      {/* Links */}
      <nav aria-label="Mobile navigation" className="mt-8 flex-1">
        <ul className="flex flex-col">
          {navLinks.map((item) => {
            const Icon = icons[item.href] ?? ArrowUpRight
            const active = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href)
            return (
              <li key={item.href} className="border-b border-primary/15">
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  aria-current={active ? "page" : undefined}
                  className="group flex min-h-16 items-center gap-4 py-3"
                >
                  <span
                    className={cn(
                      "flex size-11 shrink-0 items-center justify-center rounded-full transition-colors",
                      active
                        ? "bg-primary text-primary-foreground"
                        : "bg-primary/10 text-primary group-hover:bg-primary/20",
                    )}
                  >
                    <Icon className="size-5" aria-hidden="true" />
                  </span>
                  <span
                    className={cn(
                      "flex-1 text-2xl font-semibold tracking-tight",
                      active && "underline decoration-primary decoration-[3px] underline-offset-[6px]",
                    )}
                  >
                    {item.name}
                  </span>
                  <ArrowUpRight
                    className="size-5 text-primary/70 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    aria-hidden="true"
                  />
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>

      {/* Quick contact */}
      <div className="mt-8 grid grid-cols-2 gap-3">
        <a
          href={whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex h-13 items-center justify-center gap-2 rounded-full bg-primary text-base font-semibold text-primary-foreground"
        >
          <MessageCircle className="size-5" aria-hidden="true" />
          WhatsApp
        </a>
        <a
          href={phoneHref}
          className="inline-flex h-13 items-center justify-center gap-2 rounded-full border border-primary/40 text-base font-semibold"
        >
          <Phone className="size-5" aria-hidden="true" />
          Call
        </a>
      </div>
    </div>,
    document.body,
  )
}
