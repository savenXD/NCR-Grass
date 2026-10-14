import type { ReactNode } from "react"

/**
 * Dark grainy-green bottom sheet with a faint grass-blade pattern along the bottom edge.
 * Used by the install popup and the sign-out confirmation. Content sits above the texture.
 */
export function BottomSheet({
  role = "dialog",
  labelledBy,
  describedBy,
  onBackdrop,
  children,
}: {
  role?: "dialog" | "alertdialog"
  labelledBy: string
  describedBy?: string
  onBackdrop?: () => void
  children: ReactNode
}) {
  return (
    <div className="animate-fade-in fixed inset-0 z-50 flex items-end justify-center bg-black/50 sm:px-6" onClick={onBackdrop} role="presentation">
      <div
        role={role}
        aria-modal="true"
        aria-labelledby={labelledBy}
        aria-describedby={describedBy}
        onClick={(e) => e.stopPropagation()}
        className="animate-sheet-up relative isolate w-full max-w-md overflow-hidden rounded-t-[2rem] border border-b-0 border-white/10 bg-[oklch(0.25_0.06_150)] px-5 pt-3 pb-[calc(1.25rem+env(safe-area-inset-bottom))] text-emerald-100 shadow-[0_-20px_60px_-10px_rgb(0_0_0/0.55)] sm:mb-6 sm:rounded-[2rem] sm:border-b sm:px-7 sm:pb-7"
      >
        {/* grain */}
        <div aria-hidden="true" className="bg-grain pointer-events-none absolute inset-0 -z-10 opacity-[0.22] mix-blend-overlay" />
        {/* grass-blade pattern along the bottom */}
        <svg aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-16 w-full text-emerald-300/[0.1]">
          <defs>
            <pattern id="sheet-blades" width="160" height="64" patternUnits="userSpaceOnUse">
              <path
                d="M0 42 C2 34 5 18 8 10 C10 24 13 36 16 41 C19 32 23 16 26 6 C28 20 32 34 35 42 C38 36 41 24 44 18 C47 28 50 38 53 41 C57 30 62 14 66 8 C69 22 73 35 76 42 C80 34 84 22 88 14 C91 26 95 36 98 40 C102 28 108 8 112 4 C115 18 120 32 124 41 C128 32 133 20 137 12 C140 24 144 35 147 42 C151 34 154 22 157 16 C158 26 159 36 160 42 L160 64 L0 64 Z"
                fill="currentColor"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#sheet-blades)" />
        </svg>
        <div aria-hidden="true" className="mx-auto h-1.5 w-11 rounded-full bg-white/25" />
        {children}
      </div>
    </div>
  )
}
