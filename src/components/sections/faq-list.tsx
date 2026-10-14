"use client"

import { useState } from "react"
import { Plus } from "lucide-react"
import { cn } from "@/lib/utils"

type Item = { q: string; a: string }

/**
 * Accordion with a smooth height animation (grid-template-rows 0fr -> 1fr).
 * Answers stay in the DOM (crawlable); closed ones are `inert` so they can't take focus.
 */
export function FaqList({ items }: { items: readonly Item[] }) {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <div className="flex flex-col gap-3 sm:gap-4">
      {items.map((f, i) => {
        const isOpen = open === i
        return (
          // Static wrapper owns the scroll reveal: React rewrites the inner className on toggle,
          // which would otherwise wipe the observer's .is-visible and hide the item.
          <div key={f.q} className="reveal">
            <div
              className={cn(
                "rounded-[1.75rem] border px-5 backdrop-blur-sm transition-colors duration-500 ease-in-out sm:px-7",
                isOpen ? "border-primary bg-primary text-primary-foreground" : "border-primary/20 bg-card/50 hover:bg-card/70",
              )}
            >
              <h3>
                <button
                  type="button"
                  id={`faq-q-${i}`}
                  aria-expanded={isOpen}
                  aria-controls={`faq-a-${i}`}
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex min-h-20 w-full cursor-pointer items-center gap-4 py-4 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  {/* Number drawn by CSS (data-n) so the heading text is just the question */}
                  <span
                    className={cn("text-sm font-bold transition-colors duration-500 before:content-[attr(data-n)]", isOpen ? "text-accent" : "text-primary")}
                    data-n={String(i + 1).padStart(2, "0")}
                    aria-hidden="true"
                  />
                  <span className="flex-1 text-lg font-semibold leading-snug tracking-tight sm:text-xl lg:text-2xl">{f.q}</span>
                  <span
                    className={cn(
                      "flex size-11 shrink-0 items-center justify-center rounded-full transition-all duration-500 ease-in-out",
                      isOpen ? "rotate-[135deg] bg-accent text-accent-foreground" : "bg-primary text-primary-foreground",
                    )}
                  >
                    <Plus className="size-5" aria-hidden="true" />
                  </span>
                </button>
              </h3>
              <div
                id={`faq-a-${i}`}
                role="region"
                aria-labelledby={`faq-q-${i}`}
                inert={!isOpen}
                className={cn("grid transition-[grid-template-rows] duration-500 ease-in-out", isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]")}
              >
                <div className="overflow-hidden">
                  <p
                    className={cn(
                      "pb-6 pl-9 pr-14 text-base leading-relaxed text-primary-foreground/85 transition-all duration-500 ease-in-out sm:pl-10 sm:text-lg",
                      isOpen ? "translate-y-0 opacity-100" : "-translate-y-2 opacity-0",
                    )}
                  >
                    {f.a}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
