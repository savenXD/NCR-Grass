"use client"

import { useMemo, useState } from "react"
import { SignOutConfirm } from "@/components/admin/confirm-sheet"
import { AdminHeader } from "@/components/admin/admin-header"
import { LoginForm } from "@/components/admin/login-form"
import { StatsPanel } from "@/components/admin/stats-panel"
import { SubmissionList } from "@/components/admin/submission-list"
import { signOut, useSession } from "@/lib/admin/auth"
import { useSubmissions } from "@/lib/admin/data"
import { dailyCounts, summarize } from "@/lib/admin/stats"

export function AdminApp() {
  const session = useSession()

  if (session === "pending") {
    return <AdminHeader />
  }
  if (session === "out") {
    return (
      <>
        <AdminHeader />
        <LoginForm />
      </>
    )
  }
  return <Dashboard />
}

function Dashboard() {
  const [confirming, setConfirming] = useState(false)
  const { items, total, now, loading, error } = useSubmissions()
  const summary = useMemo(() => summarize(items, total, now), [items, total, now])
  const days = useMemo(() => dailyCounts(items, now), [items, now])

  return (
    <>
      <AdminHeader onSignOut={() => setConfirming(true)} />
      <main className="mx-auto grid w-full max-w-[100rem] items-start gap-8 px-4 pb-[calc(2.5rem+env(safe-area-inset-bottom))] pt-5 sm:px-6 sm:pt-8 lg:grid-cols-[24rem_minmax(0,1fr)] lg:gap-10 lg:px-10 lg:pt-10">
        {loading ? (
          <p className="py-16 text-center text-foreground/70 lg:col-span-2">Loading enquiries...</p>
        ) : (
          <>
            <div className="lg:sticky lg:top-24">
              <StatsPanel summary={summary} days={days} />
            </div>
            <div className="grid gap-4">
              {error && (
                <p role="alert" className="rounded-2xl border border-destructive/40 px-4 py-3 text-sm text-destructive">
                  {error}
                </p>
              )}
              {!(error && items.length === 0) && <SubmissionList items={items} total={total} now={now} />}
            </div>
          </>
        )}
      </main>
      {confirming && (
        <SignOutConfirm
          onCancel={() => setConfirming(false)}
          onConfirm={() => {
            setConfirming(false)
            void signOut()
          }}
        />
      )}
    </>
  )
}
