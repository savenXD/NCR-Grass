import type { Metadata, Viewport } from "next"
import { InstallPrompt } from "@/components/admin/install-prompt"
import { ServiceWorkerRegister } from "@/components/admin/sw-register"

export const metadata: Metadata = {
  title: { absolute: "NCR Grass Admin" },
  description: "Private enquiries dashboard.",
  robots: { index: false, follow: false },
  alternates: { canonical: "/admin" },
  openGraph: null,
  twitter: null,
  manifest: "/admin/manifest.webmanifest",
  appleWebApp: { capable: true, title: "NCR Admin", statusBarStyle: "black" },
  icons: { icon: "/admin/icon-192.png", apple: "/admin/apple-touch-icon.png" },
}

export const viewport: Viewport = {
  themeColor: "#000000",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* The install event can fire before React hydrates, so catch it right away and hand it to <InstallPrompt /> */}
      <script
        dangerouslySetInnerHTML={{
          __html: "window.addEventListener('beforeinstallprompt',function(e){e.preventDefault();window.__ncrInstall=e})",
        }}
      />
      <ServiceWorkerRegister />
      {children}
      <InstallPrompt />
    </>
  )
}
