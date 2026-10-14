import { SiteShell } from "@/components/shared/site-shell"

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return <SiteShell>{children}</SiteShell>
}
