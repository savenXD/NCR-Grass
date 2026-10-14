"use client"

import { useState, type ReactNode } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { ArrowRight, Check, MessageCircle, Phone } from "lucide-react"
import { quoteSchema, type QuoteInput } from "@/lib/quote-schema"
import { phoneHref, site } from "@/lib/site"

// Minimal underline fields, designed for the dark glass panel
const inputCls =
  "h-11 w-full rounded-none border-0 border-b border-foreground/40 bg-transparent px-0 text-lg text-foreground placeholder:text-foreground/45 transition-colors focus:border-foreground focus-visible:outline-none aria-invalid:border-destructive autofill:[-webkit-text-fill-color:var(--foreground)] autofill:shadow-[inset_0_0_0_1000px_transparent]"

/** Keeps at most 10 digits and always shows them as `XXXXX XXXXX`. A pasted +91 / 91 prefix or a leading 0 is dropped. */
function formatPhone(raw: string) {
  let d = raw.replace(/\D/g, "").replace(/^0+/, "")
  if (d.length > 10 && d.startsWith("91")) d = d.slice(2)
  d = d.slice(0, 10)
  return d.length > 5 ? `${d.slice(0, 5)} ${d.slice(5)}` : d
}

/** WhatsApp link with the visitor's details typed in, so a failed submit costs them one tap. */
function fallbackWhatsapp(v: QuoteInput | null) {
  const text = v
    ? `Hi NCR Grass, I'd like a call back. Name: ${v.name}, mobile: ${v.phone}, area: ${v.area}${v.size ? `, lawn size: ${v.size}` : ""}.`
    : "Hi NCR Grass, I'd like a quote for a natural lawn."
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(text)}`
}

function Field({ id, label, error, children }: { id: string; label: string; error?: string; children: ReactNode }) {
  return (
    <div>
      <label htmlFor={id} className="block text-xs font-semibold uppercase tracking-[0.18em] text-foreground/70">
        {label}
      </label>
      {children}
      {error && <p className="mt-1.5 text-sm text-destructive">{error}</p>}
    </div>
  )
}

export function QuoteForm() {
  const [status, setStatus] = useState<"idle" | "sent" | "error">("idle")
  const [sent, setSent] = useState<QuoteInput | null>(null)
  const [lastValues, setLastValues] = useState<QuoteInput | null>(null)
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<QuoteInput>({ resolver: zodResolver(quoteSchema) })

  async function onSubmit(values: QuoteInput) {
    setLastValues(values)
    try {
      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      })
      if (res.ok) setSent(values)
      setStatus(res.ok ? "sent" : "error")
    } catch {
      setStatus("error")
    }
  }

  if (status === "sent" && sent) {
    const digits = sent.phone.replace(/\D/g, "").slice(-10)
    const first = sent.name.trim().split(/\s+/)[0]
    return (
      <div data-sent role="status" className="flex min-h-72 flex-col items-center justify-center gap-4 text-center text-foreground">
        <span className="flex size-14 items-center justify-center rounded-full border border-primary/60">
          <Check className="size-6" aria-hidden="true" />
        </span>
        <p className="text-3xl font-medium tracking-tight">Thank you, {first}.</p>
        <p className="max-w-sm text-foreground/70">
          We&apos;ll call you on <strong className="font-semibold text-foreground">+91 {digits.slice(0, 5)} {digits.slice(5)}</strong> shortly about your lawn in{" "}
          <strong className="font-semibold text-foreground">{sent.area}</strong>
          {sent.size ? <> ({sent.size})</> : null}.
        </p>
      </div>
    )
  }

  return (
    <form data-hide-call onSubmit={handleSubmit(onSubmit)} noValidate className="grid gap-x-6 gap-y-5 text-left sm:grid-cols-2">
      <Field id="name" label="Name" error={errors.name?.message}>
        <input id="name" autoComplete="name" placeholder="Your full name" className={inputCls} aria-invalid={!!errors.name} {...register("name")} />
      </Field>
      <Field id="phone" label="Mobile number" error={errors.phone?.message}>
        <input
          id="phone"
          type="tel"
          placeholder="e.g. 98765 4xxxx"
          inputMode="numeric"
          autoComplete="tel-national"
          className={inputCls}
          aria-invalid={!!errors.phone}
          {...register("phone", {
            onChange: (e) => {
              e.target.value = formatPhone(e.target.value)
            },
          })}
        />
      </Field>
      <Field id="area" label="City / area" error={errors.area?.message}>
        <input id="area" placeholder="City or area" className={inputCls} aria-invalid={!!errors.area} {...register("area")} />
      </Field>
      <Field id="size" label="Lawn size (optional)">
        <input id="size" placeholder="e.g. 5,000 sq ft" className={inputCls} {...register("size")} />
      </Field>

      {/* Honeypot */}
      <input type="text" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" {...register("website")} />

      {status === "error" && (
        <div role="alert" className="grid gap-3 sm:col-span-2">
          <p className="text-sm text-destructive">We could not send your details. Please try again, or reach us directly:</p>
          <div className="flex flex-wrap gap-3">
            <a href={phoneHref} className="inline-flex h-12 items-center gap-2 rounded-full bg-primary px-6 text-sm font-semibold text-primary-foreground">
              <Phone className="size-4" aria-hidden="true" />
              {site.phoneDisplay}
            </a>
            <a
              href={fallbackWhatsapp(lastValues)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-12 items-center gap-2 rounded-full border border-primary/50 px-6 text-sm font-semibold"
            >
              <MessageCircle className="size-4" aria-hidden="true" />
              WhatsApp us
            </a>
          </div>
        </div>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="group mt-2 flex h-14 w-full items-center justify-center gap-3 rounded-full bg-primary text-base font-semibold text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:opacity-60 sm:col-span-2"
      >
        {isSubmitting ? "Sending…" : "Request a call"}
        <ArrowRight className="size-5 transition-transform group-hover:translate-x-1" aria-hidden="true" />
      </button>
    </form>
  )
}
