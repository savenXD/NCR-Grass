import Image from "next/image"
import { LogOut } from "lucide-react"
import { AlertsControl } from "@/components/admin/alerts-control"
import { InstallIconButton } from "@/components/admin/install-icon-button"
import { site } from "@/lib/site"

/** Top bar: brand on the left, "Admin" (and sign-out once logged in) on the right. */
export function AdminHeader({ onSignOut }: { onSignOut?: () => void }) {
  return (
    <header className="sticky top-0 z-20 border-b border-primary/15 bg-background/85 pt-[env(safe-area-inset-top)] backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-[100rem] items-center justify-between gap-3 px-4 sm:px-6 lg:px-10">
        <div className="flex items-center gap-3">
          <span className="flex size-11 items-center justify-center rounded-[14px] bg-primary">
            <Image src="/logo.svg" alt="" width={30} height={30} className="size-[30px] object-contain" priority />
          </span>
          <span className="text-lg font-bold tracking-tight sm:text-xl">{site.name}</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="rounded-full border border-primary/40 px-3.5 py-1.5 text-sm font-semibold">Admin</span>
          {onSignOut && <AlertsControl />}
          <InstallIconButton />
          {onSignOut && (
            <button
              type="button"
              onClick={onSignOut}
              aria-label="Sign out"
              className="flex size-12 items-center justify-center rounded-full text-foreground/80 transition-colors hover:bg-primary/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <LogOut className="size-5" aria-hidden="true" />
            </button>
          )}
        </div>
      </div>
    </header>
  )
}
