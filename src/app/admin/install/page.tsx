import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { InstallGuide } from "@/components/admin/install-guide"
import { site } from "@/lib/site"

// Same noindex / manifest / icons as the rest of /admin (see admin/layout.tsx); only the title and canonical differ
export const metadata: Metadata = {
  title: { absolute: "Install the app | NCR Grass Admin" },
  alternates: { canonical: "/admin/install" },
}

export default function InstallPage() {
  return (
    <>
      <header className="border-b border-primary/15 bg-background/85 pt-[env(safe-area-inset-top)]">
        <div className="mx-auto flex h-16 max-w-xl items-center justify-between gap-3 px-4 sm:px-6">
          <div className="flex items-center gap-3">
            <span className="flex size-11 items-center justify-center rounded-[14px] bg-primary">
              <Image src="/logo.svg" alt="" width={30} height={30} className="size-[30px] object-contain" priority />
            </span>
            <span className="text-lg font-bold tracking-tight">{site.name}</span>
          </div>
          <Link
            href="/admin"
            className="inline-flex h-12 items-center gap-2 rounded-full px-3 text-sm font-semibold transition-colors hover:bg-primary/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <ArrowLeft className="size-4" aria-hidden="true" />
            Back
          </Link>
        </div>
      </header>

      <main className="mx-auto w-full max-w-xl px-4 pb-[calc(3rem+env(safe-area-inset-bottom))] pt-8 sm:px-6 sm:pt-12">
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">Install the app</h1>
        <p className="mt-2 text-foreground/70">Add NCR Grass Admin to your home screen and open your enquiries in one tap. It takes about 20 seconds.</p>
        <InstallGuide />
      </main>
    </>
  )
}
