import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { site } from "@/lib/site";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  display: "optional",
});

export const viewport: Viewport = {
  themeColor: "#1f5a32",
};

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Farm-Fresh Lawn Grass · Delhi NCR & North India | NCR Grass",
    template: "%s | NCR Grass",
  },
  description:
    "Farm-fresh natural lawn grass with delivery and expert lawn installation from Dasna, Ghaziabad. Farmhouses, offices, schools & homes across Delhi NCR and North India. Free site visit.",
  applicationName: site.name,
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: site.name,
  },
  twitter: { card: "summary_large_image" },
  formatDetection: { telephone: false },
  // verification: { google: "", other: { "msvalidate.01": "" } }, // add Search Console / Bing codes
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en-IN"
      className={`${jakarta.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {children}
      </body>
    </html>
  );
}
