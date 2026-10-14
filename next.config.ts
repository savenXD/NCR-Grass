import type { NextConfig } from "next";

// Inline scripts are needed by Next.js (hydration data) and the admin install-event catcher, hence 'unsafe-inline'.
// Everything else is locked to this site; the only third party is the Google Maps embed (loaded on tap).
const csp = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline'",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  "font-src 'self' data:",
  "connect-src 'self'",
  "frame-src https://www.google.com",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'self'",
].join("; ")

const securityHeaders = [
  { key: "Strict-Transport-Security", value: "max-age=63072000" },
  // development needs eval for React's debugging tools, so the policy is production only
  ...(process.env.NODE_ENV === "production" ? [{ key: "Content-Security-Policy", value: csp }] : []),
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), payment=()" },
]

const nextConfig: NextConfig = {
  poweredByHeader: false,
  images: {
    // AVIF is ~30-50% smaller than WebP for photos; WebP stays as the fallback
    formats: ["image/avif", "image/webp"],
    // 55 is used for photos under dark overlays (hero), 75 is the default everywhere else
    qualities: [55, 75],
    // Optimised files are immutable per source+size, so let browsers/CDNs keep them for 30 days (default is 4 hours)
    minimumCacheTTL: 60 * 60 * 24 * 30,
  },
  async headers() {
    return [
      { source: "/:path*", headers: securityHeaders },
      // Static files in /public are otherwise served with max-age=0 and revalidated on every visit
      {
        source: "/img/:path*",
        headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }],
      },
      {
        source: "/images/:path*",
        headers: [{ key: "Cache-Control", value: "public, max-age=2592000, stale-while-revalidate=86400" }],
      },
      // Service worker + manifest must always be revalidated so updates reach installed apps
      {
        source: "/admin/sw.js",
        headers: [
          { key: "Content-Type", value: "application/javascript; charset=utf-8" },
          { key: "Cache-Control", value: "no-cache, no-store, must-revalidate" },
          // lets the worker (served from /admin/) control the /admin page itself, not just /admin/*
          { key: "Service-Worker-Allowed", value: "/admin" },
        ],
      },
      { source: "/admin/manifest.webmanifest", headers: [{ key: "Cache-Control", value: "public, max-age=0, must-revalidate" }] },
      { source: "/logo.svg", headers: [{ key: "Cache-Control", value: "public, max-age=2592000, stale-while-revalidate=86400" }] },
    ]
  },
  /* config options here */
  cacheComponents: true,
  experimental: {
    // Tailwind CSS is small; inlining removes the render-blocking stylesheet request on first visit
    inlineCss: false,
  },
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
