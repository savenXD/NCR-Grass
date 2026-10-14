"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Eye, EyeOff, Loader2, Lock } from "lucide-react"
import { signIn } from "@/lib/admin/auth"

const schema = z.object({
  phone: z.string().trim().regex(/^[6-9]\d{9}$/, "Enter your 10-digit mobile number"),
  password: z.string().min(1, "Enter your password"),
  remember: z.boolean(),
})
type Values = z.infer<typeof schema>

const label = "block text-xs font-semibold uppercase tracking-[0.18em] text-foreground/70"
const field =
  "h-14 w-full rounded-2xl border border-primary/40 bg-white/40 px-4 text-base text-foreground placeholder:text-foreground/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"

export function LoginForm() {
  const [show, setShow] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<Values>({ resolver: zodResolver(schema), defaultValues: { remember: true } })

  async function onSubmit(v: Values) {
    setError(null)
    const res = await signIn(v.phone, v.password, v.remember)
    if (!res.ok) setError(res.error)
  }

  return (
    <main className="mx-auto flex min-h-[calc(100svh-4rem)] w-full max-w-md flex-col justify-center px-4 py-10 sm:px-6 lg:max-w-xl">
      <div className="sm:rounded-3xl sm:border sm:border-primary/40 sm:bg-white/40 sm:p-10">
      <div className="mb-8 flex flex-col items-start gap-3">
        <span className="flex size-12 items-center justify-center rounded-full border border-primary/50">
          <Lock className="size-5" aria-hidden="true" />
        </span>
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">Welcome back</h1>
        <p className="text-foreground/70">Sign in to see your enquiries.</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} noValidate className="grid gap-5">
        <div>
          <label htmlFor="phone" className={label}>
            Mobile number
          </label>
          <div className="mt-2 flex items-center gap-2">
            <span className="flex h-14 items-center rounded-2xl border border-primary/40 bg-white/40 px-4 text-base font-medium text-foreground/80">+91</span>
            <input
              id="phone"
              type="tel"
              inputMode="numeric"
              autoComplete="username"
              maxLength={10}
              placeholder="98765 4xxxx"
              className={field}
              aria-invalid={!!errors.phone}
              {...register("phone")}
            />
          </div>
          {errors.phone && <p className="mt-1.5 text-sm text-destructive">{errors.phone.message}</p>}
        </div>

        <div>
          <label htmlFor="password" className={label}>
            Password
          </label>
          <div className="relative mt-2">
            <input
              id="password"
              type={show ? "text" : "password"}
              autoComplete="current-password"
              placeholder="Your password"
              className={`${field} pr-14`}
              aria-invalid={!!errors.password}
              {...register("password")}
            />
            <button
              type="button"
              onClick={() => setShow((s) => !s)}
              aria-label={show ? "Hide password" : "Show password"}
              className="absolute right-1 top-1 flex size-12 items-center justify-center rounded-xl text-foreground/70 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              {show ? <EyeOff className="size-5" aria-hidden="true" /> : <Eye className="size-5" aria-hidden="true" />}
            </button>
          </div>
          {errors.password && <p className="mt-1.5 text-sm text-destructive">{errors.password.message}</p>}
        </div>

        <label className="flex min-h-12 cursor-pointer items-center gap-3 text-[0.95rem] font-medium">
          <input type="checkbox" className="size-5 shrink-0 cursor-pointer rounded accent-primary" {...register("remember")} />
          Remember me on this device
        </label>

        {error && (
          <p role="alert" className="text-sm text-destructive">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="mt-1 flex h-14 w-full items-center justify-center gap-2 rounded-full bg-primary text-base font-semibold text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:opacity-60"
        >
          {isSubmitting && <Loader2 className="size-5 animate-spin" aria-hidden="true" />}
          {isSubmitting ? "Signing in" : "Sign in"}
        </button>
      </form>
      </div>
    </main>
  )
}
