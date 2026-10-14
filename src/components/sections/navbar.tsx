import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { MobileMenu } from "@/components/sections/mobile-menu"
import { navLinks, site } from "@/lib/site"

/** Lives inside the hero card, so it is positioned over the image with light text. */
export function Navbar() {
  return (
    <header className="absolute inset-x-0 top-0 z-30 animate-fade-down p-3 sm:p-6">
      <nav
        aria-label="Main navigation"
        className="flex items-center justify-between gap-4 py-1.5 px-2 sm:px-4"
      >
        <Link
          href="/"
          className="flex min-h-12 items-center gap-3 rounded-xl text-white drop-shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
        >
          <Image src="/logo.svg" alt="" width={48} height={48} className="size-10 object-contain sm:size-12" loading="eager" />
          <span className="text-xl font-bold tracking-tight sm:text-2xl">{site.name}</span>
        </Link>

        <div className="flex items-center gap-1 lg:gap-3">
          <ul className="hidden items-center lg:flex">
            {navLinks.filter((l) => l.href !== "/contact").map((item) => (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className="inline-flex min-h-12 items-center px-2.5 text-sm font-medium text-white/90 drop-shadow-sm transition-colors duration-200 hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white xl:px-4"
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
          <Link
            href="/contact"
            className="hidden h-12 items-center gap-3 rounded-full bg-white py-1 pl-6 pr-1 text-sm font-semibold text-foreground shadow-md transition-colors hover:bg-accent hover:text-accent-foreground sm:inline-flex"
          >
            Contact Us
            <span className="flex size-10 items-center justify-center rounded-full bg-primary text-primary-foreground">
              <ArrowRight className="size-4" aria-hidden="true" />
            </span>
          </Link>
          <MobileMenu />
        </div>
      </nav>
    </header>
  )
}
