import Link from "next/link"
import { HeroPicture } from "@/components/shared/hero-picture"
import { ArrowRight, ShieldCheck } from "lucide-react"
import { WhatsappIcon } from "@/components/shared/whatsapp-icon"
import { Navbar } from "@/components/sections/navbar"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { whatsappHref } from "@/lib/site"


export function Hero() {
  return (
    <section className="p-2 pb-24 sm:p-4 sm:pb-24">
      <div className="relative [--hero-base:oklch(0.17_0.04_150)]">
      <div className="relative isolate flex min-h-[calc(100svh-7rem)] flex-col overflow-hidden rounded-[1.75rem] sm:rounded-[2.5rem]">
        <HeroPicture
          alt="Lush green natural lawn in front of a modern villa"
          className="object-bottom md:animate-settle"
        />
        <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-b from-black/55 via-black/35 to-black/60" />

        <div aria-hidden="true" className="absolute inset-x-0 bottom-0 -z-10 h-40 bg-gradient-to-t from-[var(--hero-base)] to-transparent" />

        <Navbar />

        <div className="flex flex-1 flex-col items-center justify-center px-4 pb-28 pt-28 text-center text-white sm:px-8 sm:pt-32">
          <h1 className="animate-fade-up max-w-6xl text-balance text-[oklch(0.96_0.03_125)] [text-shadow:0_2px_24px_rgba(0,0,0,0.35)] text-[2.6rem] font-bold leading-[1.05] tracking-tight sm:text-6xl md:text-7xl lg:text-[5.75rem]">
            <span className="mb-4 block text-[0.8rem] font-semibold leading-snug tracking-normal text-[oklch(0.95_0.045_140)] [text-shadow:0_1px_12px_rgba(0,0,0,0.6)] sm:mb-5 sm:text-base md:text-lg">
              <span className="inline-block">Farm-Fresh Lawn Grass Supplier</span>
              <span className="mx-2 hidden sm:inline opacity-75" aria-hidden="true">·</span>
              <span className="mt-1 block sm:mt-0 sm:inline">Delhi NCR &amp; North India</span>
            </span>
            Transform Bare Land into a{" "}
            <span className="mx-1 inline-block -rotate-1 whitespace-nowrap rounded-[0.3em] bg-accent px-[0.25em] pb-[0.05em] text-accent-foreground shadow-xl [text-shadow:none]">
              Picture-Perfect
            </span>{" "}
            Green Lawn You&apos;ll Love
          </h1>
          <div className="mt-10 flex w-full animate-fade-up items-center gap-3 [animation-delay:200ms] sm:w-auto">
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(buttonVariants(), "h-14 flex-1 gap-2 rounded-full bg-accent px-4 text-sm font-semibold text-accent-foreground hover:bg-accent/90 sm:h-16 sm:flex-none sm:px-10 sm:text-lg [&_svg]:size-5")}
            >
              <WhatsappIcon className="size-5" />
              WhatsApp Us
            </a>
            <Link
              href="/contact"
              className={cn(buttonVariants({ variant: "outline" }), "h-14 flex-1 gap-2 rounded-full border-white/40 bg-transparent px-4 text-sm font-semibold text-white hover:border-white hover:bg-transparent hover:text-white sm:h-16 sm:flex-none sm:px-10 sm:text-lg [&_svg]:size-5")}
            >
              Get a Call Back
              <ArrowRight />
            </Link>
          </div>

        </div>
      </div>

        {/* Tab: the card bulges downward around the badge (same colour as the card's bottom edge) */}
        <svg
          aria-hidden="true"
          viewBox="0 0 260 82"
          className="absolute left-1/2 top-full -mt-px h-[82px] w-[260px] -translate-x-1/2 fill-[var(--hero-base)]"
        >
          <path d="M0,0 C36,0 52,6 62,28 A70,70 0 0 0 198,28 C208,6 224,0 260,0 Z" />
        </svg>

        <Link
          href="/#about"
          aria-label="100% natural grass from trusted lawn experts. Learn more about NCR Grass"
          className="group absolute left-1/2 top-full -mt-10 flex size-[106px] -translate-x-1/2 animate-pop-in [animation-delay:450ms] items-center justify-center rounded-full bg-[color-mix(in_oklab,var(--primary),black_50%)] text-primary-foreground shadow-2xl ring-4 ring-primary transition-transform duration-300 hover:scale-105 focus-visible:outline-none focus-visible:ring-white"
        >
          {/* Static seal text: "Trusted" on the top arc, "Natural" on the bottom arc, both upright */}
          <svg viewBox="0 0 100 100" className="absolute inset-0 size-full select-none" aria-hidden="true">
            <defs>
              <path id="badge-top" d="M14,50 a36,36 0 0 1 72,0" />
              <path id="badge-bottom" d="M5,50 a45,45 0 0 0 90,0" />
            </defs>
            <text className="fill-white/85 text-[8px] font-semibold uppercase tracking-[0.18em]" textAnchor="middle">
              <textPath href="#badge-top" startOffset="50%">Trusted Lawn Experts</textPath>
            </text>
            <text className="fill-white/85 text-[8px] font-semibold uppercase tracking-[0.18em]" textAnchor="middle">
              <textPath href="#badge-bottom" startOffset="50%">100% Natural Grass</textPath>
            </text>
          </svg>

          <span className="relative z-10 flex size-10 items-center justify-center rounded-full bg-primary text-accent ring-1 ring-accent/40">
            <ShieldCheck className="size-6" aria-hidden="true" />
          </span>
        </Link>
      </div>
    </section>
  )
}
