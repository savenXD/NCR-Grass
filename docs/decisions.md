# Architecture & Tech Decisions (NCR Grass)

This document records the architectural and technology choices made for NCR Grass, along with the rationale behind each decision.

---

## 1. Core Stack
- **Framework: Next.js (App Router, Turbopack) + TypeScript**
  - *Why:* Unmatched SEO capabilities (SSR / SSG / ISR), native per-page metadata, automated sitemaps, robots.txt, fast mobile Core Web Vitals, and strict type safety.
- **Styling: Tailwind CSS v4**
  - *Why:* Zero runtime CSS overhead, lightning-fast rendering, utility-first consistency, and effortless support for CSS variable theming.
- **Component Primitives: shadcn/ui (`base-nova` style with `@base-ui/react`)**
  - *Why:* Accessible, headless primitives owned in our codebase (`src/components/ui`), with zero third-party UI framework bloat.
  - *Constraint:* Default component library. Do NOT add any other UI library without explicit approval.
- **Icons: Lucide React**
  - *Why:* Standard, lightweight, tree-shakeable SVG icons.

## 2. Forms & Backend Strategy
- **Libraries: React Hook Form + Zod + `@hookform/resolvers`**
  - *Why:* Industry standard for lightweight, performant form state management and rigorous type-safe schema validation.
- **Backend: Next.js Route Handler (`/api/contact` or `/api/quote`)**
  - *Why:* Only requires form validation and email delivery. Avoids unnecessary databases, CMS layers, or auth overhead.
  - *Cost Rule:* 100% free stack. Any email transport or external service must be free or approved first.

## 3. SEO & Performance First
- **Priority over Visuals:** SEO ranking and Core Web Vitals (LCP, INP, CLS) are prioritized over complex animations or heavy scripts.
- **RSC by Default:** All pages and layout components are Server Components. Interactive client boundaries (`'use client'`) are isolated to small leaf components (e.g., the quote form).
- **CSS-Only Motion:** Keep animations lightweight and CSS/Tailwind-driven. No heavy JavaScript animation libraries in hero viewports.

## 4. Design & Content Flexibility
- **Neutral Placeholders:** Since colors, fonts, branding direction, and location are TBD from the client, use CSS theme tokens (`--background`, `--foreground`, `--primary`, etc.) in `globals.css` so the entire visual theme can be adjusted in a single file once finalized.
- **Flexible Routing:** Routes must accommodate dynamic expansion (e.g., service pages, location/city landing pages) without hardcoded page trees.

## 5. Homepage v1 (2026-10-13)
- **Placeholder earthy-green theme** in `globals.css` tokens (primary deep green, accent lime). Swap tokens to rebrand.
- **All business details and copy live in `src/lib/site.ts`** (phone, WhatsApp, areas, services, FAQ). Components never hardcode them.
- **Navbar is a server component**; only `mobile-menu.tsx` and `before-after-slider.tsx` / `quote-form.tsx` are client leaves. FAQ uses native `<details>` (no JS).
- ~~Mobile sticky Call/WhatsApp bar~~ replaced on 2026-10-13 by a floating round Call button, bottom-right, mobile only (`mobile-contact-bar.tsx`). WhatsApp stays as the main hero button.
- **No testimonials section yet**: real reviews only, never invented.
- No `new Date()` in server components (Next 16 prerender rule); footer has no dynamic year.
- **Hero redesign (2026-10-13):** sage-green page background, hero as an inset rounded image card with the navbar inside it, large centred headline in Plus Jakarta Sans (`next/font`), and a bottom-centre notch with a circular scroll badge. Reference: AgriFlyer-style layout supplied by the client. Font and palette are still placeholders.
- Button overrides must go through `cn(buttonVariants(...), "...")`: plain `buttonVariants({ className })` doesn't merge conflicting Tailwind classes.
- **Services redesign (2026-10-13):** alternating image/text rows (no cards) joined by a dashed line with numbered nodes. Image slot is 1:1 with no background so transparent PNGs sit on the green page. Image + alt per service live in `site.ts`.
- **Who we serve redesign (2026-10-13, v2):** editorial showcase: big numbered titles (pill tabs on mobile) + one large 16:9 before/after slider with tilted frame and "drag to compare" sticker; removed the standalone BeforeAfter section to avoid duplication.
- **Service-areas map (2026-10-13):** generated inline SVG of India (Datameet state boundaries, simplified to ~30KB / ~11KB gzipped) with northern states highlighted and a Delhi NCR marker. Chosen over an AI-generated image: crisp at all sizes, zero image requests, editable in code, accessible. Removed Varieties, Process and Gallery-preview sections at client request.
- **Services redesign v2 (2026-10-13):** winding animated dashed SVG path between icon nodes, organic blob behind each 1:1 image slot (transparent PNGs overlap the edge), ghost numerals behind titles. Pure CSS/SVG; the dash animation respects `prefers-reduced-motion`.
- **FAQ (2026-10-13):** client accordion (`faq-list.tsx`) with grid-rows height animation; native `<details>` can't animate height. Answers stay in the DOM (crawlable); closed ones are `inert`.
- **Who we serve is scroll-pinned:** tall track + sticky stage; an IntersectionObserver on invisible zones (75svh each) picks the active audience, no scroll handler. Tabs scroll to their zone.
- **Quote form:** centred in a green card with tilted frames; 2-column fields on `sm+`. Still only logs enquiries (see todo).
- **Footer:** cream colour, grass-blade top edge (SVG pattern), giant watermark, bold logo + name, links to every section. Update `footerLinks` in `site.ts` when real pages exist.
- **Quote section v3 (2026-10-13):** dropped the cartoonish look (lime blobs, tilted frames, pill inputs with icon circles). Now a lawn-photo card under a dark overlay, centred headline, frosted-glass form with underline fields, plain-text contact links.
- **Contact section v4 (2026-10-13):** text + Call/WhatsApp buttons on the left, "Request a call back" glass form on the right (placeholders in all fields, button "Request a call"). Removed the animated grass SVG. Heights tightened. Anchor stays `#quote`.
- **Smooth scroll (2026-10-13):** added `lenis` (free, MIT, ~3KB) via `components/shared/smooth-scroll.tsx`. Skipped for `prefers-reduced-motion`. Anchors are smoothed by Lenis (`anchors: true`). The pinned Who-we-serve section calls `lenis.scrollTo(<number>)` (not the element, which would add `scroll-padding-top`).
- **Contact section v5:** no gradient/grain/fill. Transparent card with a dotted border on the page green; dark text, dark-green buttons, outlined WhatsApp.

## 6. Session changes (2026-10-13, later)
- **Hero:** headline "Transform Bare Land into a Picture-Perfect Green Lawn You'll Love", bold, off-white with a soft text-shadow. "Picture-Perfect" sits in a tilted lime box. Removed the eyebrow pill above it. Main CTA is **WhatsApp Us** (lime, real WhatsApp glyph, `shared/whatsapp-icon.tsx`); secondary is outlined **Get a Quote**; both on one line on mobile; call button removed. On phones the photo is positioned at `object-[20%_100%]` to show the house side.
- **Hero seal:** the spinning "scroll to explore" mouse badge was replaced by a static dark trust seal ("Trusted Lawn Experts" top arc / "100% Natural Grass" bottom arc, shield icon). No numbers until the client gives real ones.
- **Navbar:** bigger logo/name; links turn lime on hover; Contact button turns lime on hover.
- **Mobile menu:** full-screen overlay on the page-green gradient, rendered through a portal into `<body>` (the hero card's stacking context trapped it before). Every page with an icon, ↗ arrow, active page underlined (`usePathname`), Escape closes it.
- **Section order (home):** Hero → About → Who We Serve → Why Choose Us → Services → Service Areas → Locate Us → FAQ → Contact.
- **About section button:** "Know More" → `/about`; hidden on `/about` itself (`showMoreLink`).
- **Who we serve images:** before/after pairs must share the exact camera angle (slider overlays them); only ground/weather/time of day change.
- **Why Choose Us:** bento grid (2026-10-13), chosen because a competitor uses 4 equal stacked cards for this section. Desktop 12-col, 17rem rows: big photo tile (Farm-Fresh, 7×2), outlined split tile (Gate), photo tile (Bulk), dashed text-only statement tile ("no middlemen" in the lime box + "Book a free site visit" WhatsApp button), wide split tile (Site assessment). Updated Farm-Fresh hero tile to use a frosted panel with `text-primary` heading and `border-primary/30` border to match the primary green text and card aesthetics of the rest of the section (eliminating mismatched neon lime `text-accent`). Phones: one column. Copy is the client's points reworded away from the competitor's wording (see `docs/content.md`). Don't go back to equal cards.
- **Services:** order is Supply → Ground Levelling → Installation → Aftercare. No "Get a quote" button; longer descriptions. On mobile everything aligns left (the zig-zag is desktop only).
- **Service-areas map:** only the Delhi NCR callout ("Express delivery area"), static dot (no pulse). The client rejected labelling every state.
- **Locate Us (new):** full-width Google Maps embed, darkened with a CSS invert/hue-rotate filter (Google embeds have no dark theme), and a dark frosted-glass address card with Google "G" mark, address, **Get directions** (main) and **Call**. On mobile the iframe is shifted up by the card height so the centred pin stays visible. Map URL and pin live in `location` in `site.ts`.
- **Animations:**
  - Page-load: navbar fade-down, hero photo "settle", heading/buttons fade-up, seal pop-in (CSS only; hero image is never faded so LCP is unaffected).
  - Scroll: `.reveal` / `.reveal-zoom` / `.reveal-d1-3` + word-by-word section headings (`.reveal-words`). Driven by `shared/reveal-observer.tsx` (IntersectionObserver, ~30 lines) because CSS scroll-driven animations don't run in Firefox/older Safari. Content stays visible without JS (`.reveal-ready` gate) and with reduced motion.
  - **Rule:** never put `reveal` on an element whose `className` React changes on state (it wipes `.is-visible`); wrap it in a static element instead (FAQ bug fix).
- **FAQ:** all questions start closed. No sticky headings anywhere (client dislikes sticky intros); only the Who We Serve stage remains pinned by design.
- **Inner pages long-form copy:** `src/lib/page-content.ts` rendered by `sections/content-sections.tsx` (server, crawlable) on About, Services, Service Areas, Gallery, Contact; FAQ page shows `faqs` + `moreFaqs`. Draft copy, no invented numbers.
- **Rejected along the way (don't reintroduce):** pill image inside the hero heading (also a licensed stock photo), gradient/italic "Lush Green", lime highlighter, animated underline, labels on every map state, green-filled cards.

## 6. SEO build (2026-10-13)
- **Domain `ncrgrass.in`**; base address Dasna, Ghaziabad (street/PIN pending).
- **Location pages at `/service-areas/[slug]`** (nested under the hub for breadcrumbs), data-driven from `src/lib/locations.ts`. Dasna and Ghaziabad are separate pages (client request) with different audiences; Delhi + New Delhi share one page to avoid near-duplicates.
- **Anti-doorway rule:** every location page needs its own localities, customer types, FAQs and route from Dasna. Never clone a page and swap the city name.
- **Hinglish in visible copy** (a "Hinglish mein" block and Hinglish FAQs), not hidden keywords. `lang="en-IN"`.
- **JSON-LD:** one `HomeAndConstructionBusiness` entity (`@id …/#business`) site-wide; location pages add BreadcrumbList, Service (areaServed) and FAQPage. No self-review stars.
- **`pageMetadata()`** sets title/description/canonical/OG/Twitter together, with the generated `app/opengraph-image.tsx` image set explicitly (a page-level `openGraph` drops the inherited file image). The home page uses an absolute title (the template doesn't apply in the layout's own segment).
- `priority` → `preload` on hero images (deprecated in Next 16).
- Unknown `/service-areas/<x>` URLs render the 404 page with `noindex` but HTTP 200 (Cache Components streams it; `dynamicParams` isn't available). Acceptable since nothing links there.

## 7. Footer & legal pages (2026-10-13)
- City links removed from the homepage (client); they live in the footer ("Areas we serve") and on `/service-areas`.
- Footer shows only real pages: Pages, Areas we serve, Contact (phone, WhatsApp, address), Legal. Removed the Services column (all pointed to `/services`), the "Who We Serve" anchor, and the placeholder email.
- Legal pages `/privacy-policy`, `/terms-of-use`, `/disclaimer`: plain text from `src/lib/legal.ts`, describing only what the site really does (form fields, no analytics/cookies, Google Maps embed, WhatsApp). **Update them if analytics, cookies or email delivery are added.**
- AI image notice (`aiImageNotice`) in the footer bottom bar, the Terms and the Disclaimer.
- **Why Choose Us on mobile/tablet (<lg):** "farm-to-lawn journey" (`why-choose-us-journey.tsx`, client leaf). A tall track (100svh + 220svh) pins a sticky stage; vertical scroll progress translates the card strip sideways (rAF-throttled passive scroll listener, direct style writes, no re-renders) until card 4 is fully in view, then the page scrolls on. Each card has a numbered route node with a dashed road to the next, plus a progress bar. Desktop keeps the bento grid. Same pinned-scroll pattern as Who We Serve; `overflow-x-clip` (not `hidden`) must be used on ancestors or sticky breaks.
- **Footer order (2026-10-13):** brand → contact → links (Pages and Areas side by side even on phones) → legal links → copyright + back-to-top. The AI-image notice no longer appears in the footer; it lives only on `/disclaimer` (and the Images section of `/terms-of-use`), reachable via the Legal links. Area link text stays "Lawn grass in <city>" (deliberate SEO anchor text).

## 8. Search result appearance (2026-10-13)
- Client asked about invisible SEO headings: **declined** (Google hidden-text spam policy). Rule added to constitution §4.
- Meta descriptions trimmed to ≤ 160 chars (Google cuts longer ones), with key words first.
- Replaced the default Next.js favicon with `src/app/icon.svg` (white emblem on brand green, `#1f5a32`). Google shows it beside the site name in results. Update when the brand colour is final.

## 9. Blog Architecture & Crawler/SEO Design (2026-10-13)
- **Dedicated Route Structure:** `/blog` (hub listing) and `/blog/[slug]` (SSG dynamic articles), driven by `src/lib/blog-data.ts`.
- **Crawler-First & Reader-First Formatting:** Per user requirements, article bodies use zero decorative SVGs or gimmicks; pure semantic HTML (`h1`, `h2`, `h3`, `p`, `table`, `ul`, `ol`, `blockquote`).
- **Prominent Blue Underlined Hyperlinks:** High-contrast hyperlinks (`text-blue-700 underline`) across all articles connecting users and web crawlers to location landing pages (`/service-areas/dasna`, `/service-areas/ghaziabad`, `/service-areas/noida`, `/service-areas/delhi`), core service offerings, and direct phone/WhatsApp actions.
- **Table of Contents:** Anchor-linked (`#section-id`) at the top of every guide for quick navigation and enhanced Google snippet jumps.
- **Structured Data:** Every article outputs `BlogPosting` and `BreadcrumbList` JSON-LD schemas.
- **Sitemap Integration:** `sitemap.ts` dynamically includes `/blog` (priority 0.8, weekly) and all 8 article URLs (priority 0.8, monthly).
- **Navigation Integration:** Added to desktop `navLinks` and mobile menu (with `BookOpen` icon) and `footerLinks`.

## 9. Performance pass (2026-10-14)
Measured with Lighthouse **mobile on a production build** (`npm run build && npm run start`). Never judge speed from `npm run dev`: it is unminified, adds React dev instrumentation and blocks bfcache (it scored 47 where production scores 92–97).

Result: every main page 92–97 performance (home was 84), 100 accessibility / best practices / SEO, CLS 0, TBT ≤ 180 ms.
- **Images:** sources re-encoded (48.8 MB → 4.5 MB). Originals kept in `assets-source/` (not served). Service cut-outs and hero are WebP now. `next.config` serves **AVIF** first (`formats`), `qualities: [55, 75]`; hero uses 55 (it sits under a dark overlay). Pill images use real `sizes`.
- **Hero (LCP):** `preload` + `fetchPriority="high"`.
- **CSS inlined** (`experimental.inlineCss`): no render-blocking stylesheet request. **Superseded in §10.**
- **JS removed from first load:** Lenis loads only for mouse/trackpad users after idle (`smooth-scroll.tsx` → `lenis-root.tsx`, instance shared via `lib/lenis-store.ts`); quote form (RHF + Zod) loads near the form (`quote-form-lazy.tsx`, falls back to Call/WhatsApp if it can't load); mobile menu panel loads on first tap (`mobile-menu.tsx` → `mobile-menu-panel.tsx`), which also stops it prefetching every page on load.
- **India map** outlines served as cacheable `/india-map.svg` (route handler from `lib/india-map.ts`) and drawn with `<use>`: removed ~37 KB that was in every homepage response twice. Colours still come from theme tokens.
- **Main-thread work:** word-reveal no longer animates `filter: blur` (GPU-only opacity/transform now); services dash animation off on phones; below-the-fold homepage sections use `.cv-auto` (`content-visibility: auto`).
- **Reliability:** security headers + no `X-Powered-By` (`next.config.ts`), custom `not-found.tsx` and `error.tsx` with Call/WhatsApp.
- Remaining gap to 100 is the React/Next.js runtime (~150 KB) that runs before the first paint under Lighthouse's 4× CPU throttle (test: blocking all JS scores 99, blocking the hero image changes nothing).

## 10. Mobile performance pass 2 (2026-10-14)
Lighthouse mobile on a production build: home 88 → 95-98, page weight 624 → ~335 KB, HTML 97 → 42 KB gzipped. Other pages 95-97.
- **Hero is static files, not `next/image`** (`shared/hero-picture.tsx`, `scripts/optimize-hero.mjs`). `/images/hero/hero-{mobile,desktop}.{avif,webp}` via `<picture>`: phones get a tall 583×941 crop at native resolution (~20 KB AVIF; before, the whole landscape photo was downscaled to 750 px and stretched, i.e. blurry), desktop gets the 1672 px photo (~60 KB AVIF). No image-optimizer round trip on the first visit (a cold optimizer is the likely reason real-network PageSpeed scores are lower than local). Preload is sent as a `Link` header with `media`. A 24 px blurred copy is inlined as the CSS background so there is colour before the photo arrives. Re-run the script if the source photo changes.
- **Who-we-serve photos load on demand.** All 8 before/after photos (~270 KB) used to download at page load because every slider sat stacked in the DOM. Now they mount only when the section is within 300 px of the viewport, and only up to the next audience (`deferImages` on `BeforeAfterSlider`). Static-import photos show their blur preview while loading (`placeholder="blur"`).
- **`inlineCss` turned off.** It put the full Tailwind CSS in the HTML three times (style tag + two RSC copies). A cached external stylesheet (17 KB) measured better: FCP 1.2 → 0.9 s, TBT 100 → 30-90 ms.
- **Caching:** `/images/*` and `/logo.svg` get 30-day `Cache-Control` (public files default to `max-age=0`); `images.minimumCacheTTL` raised from 4 h to 30 days. If a file in `/public/images` is replaced, rename it.
- **Hero zoom animation (`animate-settle`) is desktop-only**, to save low-end phones a full-screen animated layer.
- Still open: ~28 KB unused / 14 KB legacy JS inside the Next/React runtime chunk (not ours to trim); Google Maps iframe is lazy but loads ~1 MB when scrolled to (candidate for a click-to-load facade).

- **SEO checklist pass (2026-10-14):** `PageHero` now emits BreadcrumbList JSON-LD from its `path`/`crumb`/`parent` props (omit `path` on 404). Sitemap has `lastModified` (constant in `sitemap.ts`, bump on material changes; blog uses publish date) and an image list on the homepage entry. Generic image files renamed to descriptive names (hero, about, schema image). Not done by choice: opening hours/sameAs/address in schema, FAQPage on /faq, real project photos, `noindex` on legal pages.

- **SEO review pass (2026-10-14):**
  - **Blog rewritten as educational content only.** Removed invented prices, statistics, delivery times, crew sizes, guarantees, fake author titles and back-dated publish dates. Author is now "NCR Grass"; all posts dated 2026-10-14. Add `updatedDate` when a post is revised. Prices go back in only when the client supplies real rates. The grass-type post is general education and does not claim we sell each variety (client has not confirmed which grasses they sell, so no per-variety pages).
  - **Titles:** blog posts and the blog index use `pageMetadata()` (brand appended once). `pageMetadata` also takes `noindex`, `article` and `sharedImage`.
  - **noindex:** `/gallery` (placeholder tiles, AI illustrations) and the 5 state pages (thin). Both are also out of the sitemap. To index again: remove `noindex` in `gallery/page.tsx` / the `loc.kind === "state"` line in `service-areas/[slug]/page.tsx`, and restore them in `sitemap.ts`.
  - **Schema:** `blogPostingJsonLd` (author/publisher = the business `@id`, image = per-post OG image) + `FAQPage` + breadcrumb on posts.
  - **Internal links:** `[text](/path)` syntax inside blog copy (rendered by `InlineText`), `relatedLocations` on posts, `GuideLinks` on location pages, `guide` link on each service card.
  - **OG images:** per-post and per-location cards from `lib/og.tsx` (`opengraph-image.tsx` in each dynamic route).
  - **Markup:** About eyebrow is the h2 and the long sentence a `<p>`; FAQ numbers drawn by CSS; desktop "why choose us" titles use `role="heading"` so the mobile journey owns the `<h3>`s; sliders carry an "Illustration" chip (`illustration={false}` once photos are real).

- **Gallery page removal (2026-10-14):** Removed `/gallery` page, `gallery-grid.tsx` component, `galleryContent` block in `page-content.ts`, and Gallery links from `navLinks`, `footerLinks`, and mobile menu per client request.

## 11. Performance pass 3: static responsive images, CLS, map facade (2026-10-14)
Lighthouse mobile (production build, `npm run perf`): every page 96-98, CLS 0 everywhere (Services was 93 / CLS 0.13, About 94 / 0.06).
- **No `/_next/image` for photos.** `scripts/build-images.mjs` reads `assets-source/images/<group>/*` and writes AVIF + WebP at several widths to `public/img/` plus `src/lib/image-manifest.ts` (dimensions, blur preview). `shared/pic.tsx` (`<Pic src=... sizes=...>`) renders `<picture>` with `srcset`; `src` keeps the old `/images/<group>/<name>.jpg` strings in `site.ts` (only group/name are used). Incremental: re-run `npm run images` after adding or changing a source photo. `/img/*` is cached 1 year, immutable (rename on change). A cold server never encodes anything for a first visitor now.
- **CLS fix = font.** The Jakarta swap re-wrapped text on Services/About. `next/font` now uses `display: "optional"` (font is preloaded; on a very slow first visit the fallback stays for that page view, no shift).
- `.reveal-words .w` is `inline-block` from first paint (was switched on by `.reveal-ready`).
- Film-grain `body::before` (fixed, full-screen, `mix-blend-mode`) is desktop-only (>= 768px): a blended fixed layer costs paint time on phones.
- **Google Map is click-to-load** (`shared/map-embed.tsx`): saves ~1 MB until the visitor taps.
- `npm run perf` runs mobile Lighthouse on 9 pages against a running production server (budget 90).
- Old `public/images/{services,who-we-serve,why-choose-us,about}` are no longer referenced (originals are in `assets-source/images/`); safe to delete.

## 12. Audit fixes (2026-10-14)
- **State pages indexed.** `/service-areas/{uttar-pradesh,haryana,punjab,rajasthan,uttarakhand}` lost `noindex` and are in `sitemap.ts` (priority 0.7; cities 0.9). Reverses the earlier "noindex until unique content" call (§6) at the client's request. Each has its own cities, FAQs and Hinglish block; keep the anti-doorway rule when editing them.
- **No placeholder email.** `site.email` removed; contact page tile is now "Directions" (real Google Maps link).
- **Params inside Suspense.** `service-areas/[slug]` and `blog/[slug]` read `params` in an inner async component under `<Suspense>`, so the shell is static under Cache Components. Known slugs are still prerendered with full content in the HTML (checked); unknown slugs still return the 404 UI with HTTP 200.

## 13. Admin PWA at /admin (2026-10-14)
Client-facing enquiries dashboard, in this same Next app. **UI only for now: sign-in and data are demo stubs** (Firebase comes next).
- **Backend plan:** Firestore (free Spark plan). `/api/quote` writes with the Admin SDK; Firestore rules deny all public access and allow reads only for the client's UID. Login = Firebase email/password where the email is `<mobile number>@ncrgrass.in` (real phone auth needs paid SMS). Push via FCM later.
- **Route groups:** public pages moved to `src/app/(site)/` so `/admin` does not get the site footer, contact bar, smooth scroll or LocalBusiness JSON-LD (`components/shared/site-shell.tsx` holds that chrome; `not-found.tsx` also uses it). The root layout is now just `<html>`, font and metadata. `/admin` is `noindex`, canonical `/admin`, disallowed in `robots.ts`, not in the sitemap.
- **UI:** `components/admin/*`. Header (NCR Grass left, Admin right, sign out), login (+91 number, password, show/hide), stats panel (dark total card with a pure-SVG area chart, then Today / 7 days / 30 days), applications list with a **Compact (default) / Detailed** toggle; tapping one card overrides it. Detailed shows phone, area, size, date and time, plus Call and WhatsApp buttons. No chart library added.
- **Demo seams (replace, then delete):** `lib/admin/auth.ts` (localStorage flag), `lib/admin/data.ts` + `mock-data.ts` (`useSubmissions()` must keep its return shape when it becomes a Firestore `onSnapshot`).
- **PWA:** `public/admin/manifest.webmanifest` (scope and start `/admin`, standalone, icons), `public/admin/sw.js` (page loads network-first with cached fallback, `/_next/static` cache-first, everything cross-origin and non-GET ignored, push handler ready for FCM). Registered only in production (`sw-register.tsx`) with scope `/admin`; `next.config.ts` sends `Service-Worker-Allowed: /admin` and no-cache for the worker. Icons from `node scripts/admin-icons.mjs`. Install button appears only where the browser offers it (Chrome/Android; on iPhone: Share, Add to Home Screen).
- **Verified (production build, Playwright):** no horizontal overflow at 375 and 320 px, worker controls `/admin`, installed app opens offline from cache. Lesson: a flex-column `body` shrink-wraps `main` unless it has `w-full`.
- **Admin login is real now (server-side, env-based).** `ADMIN_PHONE`, `ADMIN_PASSWORD`, `ADMIN_SESSION_SECRET` live in `.env.local` (git-ignored; set the same three on the host). `/api/admin/login` checks them in constant time, rate-limits (8 tries / 15 min per IP, per instance) and sets an httpOnly, Secure, SameSite=Strict cookie signed with HMAC (30 days). `/api/admin/session` GET checks it, DELETE signs out. The password is quoted in `.env.local` because it contains `#`. Missing env = login refuses (503). Verified: wrong or old-stub credentials rejected, password absent from the client bundle. Real enquiry data must later come from an API route that calls `verifySessionToken`, never from client code. The Firebase plan can drop Firebase Auth and read Firestore server-side behind this cookie.
- **Install popup (`components/admin/install-prompt.tsx`).** Shown on every visit to `/admin` (login screen too) until the app is installed; "Not now" only hides it for that visit. **Android / desktop Chrome + Edge:** the popup's Install button calls the browser's `beforeinstallprompt` `prompt()` (one tap, adds to home screen; the event is caught by an inline script in `admin/layout.tsx` because it can fire before hydration). **iPhone/iPad:** Apple exposes no install API to websites, so the popup shows the two taps (Share, Add to Home Screen). **Never shown inside the installed app:** detected with `display-mode: standalone` / `navigator.standalone`, plus an `ncr-admin-installed` localStorage flag set on `appinstalled`/accepted install (so it also stays quiet if the installed user opens the link in a browser tab). Other browsers (Firefox, desktop Safari) get no popup. Tested with simulated events in Playwright, not on real devices.
- **Admin UI revisions (2026-10-14, user feedback).** Total card: plain light card (outlined, frosted white), big number, smooth line + area chart, optional "+N this week" chip (hidden at 0), first/last date only. **Rejected:** grass-blade bars, logo watermark/grain, dark green card, extra captions. Today/7-day/30-day cards removed. Install and sign-out sheets: light white bottom sheets (handle, icon, one line, one button, "Not now"/Cancel); the dark sheet with feature chips was rejected as too much. Each application shows a running number (newest = total, oldest = 1). Sign-out asks for confirmation. Login has "Remember me" (default on): on = 30-day cookie; off = session cookie, 12 h token.
- **Header install icon** (`install-icon-button.tsx`, shared state in `use-install.ts`): a plain download icon next to "Admin". Android/desktop: opens the browser install dialog directly. iPhone: reopens the Share > Add to Home Screen sheet. Hidden inside the installed app and in browsers that cannot install.
- **Desktop layout (`/admin`):** container up to 100 rem. From `lg` the total card sits in a sticky 24 rem left column and the list fills the rest; from `xl` the list is two columns. Login becomes a centred outlined card from `sm`. Checked at 1920, 1440, 1024, 768, 375 px with no horizontal overflow.
- **List controls/buttons:** Compact/Detailed toggle is two icon-only buttons (Rows4 / Rows2, aria-labelled, 48 px). The WhatsApp button is WhatsApp green (#25D366) with the official glyph from `shared/whatsapp-icon.tsx`.
- **Sheets restyled (supersedes "light white sheets" above):** `components/admin/bottom-sheet.tsx` is a dark forest-green sheet with film grain and a faint grass-blade pattern along the bottom, shared by the install popup and the sign-out confirmation. Content stays minimal (icon, title, one line, one button, "Not now"/Cancel) because the earlier version with feature chips was rejected as too much.

## 14. Firestore wired in (2026-10-14)
Dummy data removed (`mock-data.ts` deleted). `lib/firebase-admin.ts` (server-only Admin SDK, env `FIREBASE_PROJECT_ID/CLIENT_EMAIL/PRIVATE_KEY`). `/api/quote` validates, rate-limits (5 / 10 min / IP) and writes to `submissions` with a server timestamp; with no Firebase config it logs and succeeds in dev, but returns 503 in production so a lead is never silently lost. `/api/admin/submissions` (GET, requires the admin cookie) returns the newest 500. `lib/admin/data.ts` polls it every 30 s and on foreground. **No Firebase Auth and no client SDK:** our own cookie login gates the API, and Firestore rules deny all client access. Setup steps: `docs/firebase-setup.md`. Not yet tested against a real Firestore (needs the keys).

## 15. Pre-deployment audit fixes (2026-10-14)
- **Location + blog pages are real static HTML.** `ensureStatic = "navigation"` and no `<Suspense>` around `params` in `service-areas/[slug]` and `blog/[slug]` (the old streamed version put the whole page in a hidden div that a script moved into place: crawlers without JS saw an empty `<main>`, client-side navigation left everything at opacity 0, and unknown slugs returned 200 on first hit). Unknown slugs now return a real 404. **Do not re-add Suspense around `params` there.** `RevealObserver` also watches DOM changes (MutationObserver) so late content can never stay invisible.
- **Schema/SEO:** BlogPosting `image` is the cover photo (`lib/photo.ts` -> `/img/...webp`); the old `/blog/<slug>/opengraph-image` URL 404s (hashed route). Image sitemap uses the same helper. Root layout no longer sets a sitewide canonical (pages set their own via `pageMetadata`). One BreadcrumbList per page (from `PageHero`). `areaServed` also lists the extra regions from `areas` (HP, J&K, Chandigarh).
- **Leads:** form error state shows Call + WhatsApp (with the visitor's details pre-filled). Phones typed with a leading 0 are accepted. **No alert channel yet (client choice): new enquiries are only seen by opening /admin.**
- **Placeholder FAQs hidden:** cost / timing / season questions removed from `faqs` until real answers exist.
- **Admin hardening:** shared limiter in `lib/rate-limit.ts` (pruned, real client IP via `x-real-ip`, looser shared bucket when the IP is unknown); session signing key includes `ADMIN_PASSWORD`, so changing the password signs everyone out; auth check no longer treats a server error as offline; service worker only caches OK pages (cache v2); admin total uses Firestore `count()`.
- **Headers:** HSTS + Content-Security-Policy (production only; `unsafe-inline` for Next hydration, `frame-src https://www.google.com` for the map).
- **Monitoring:** `error.tsx` / `global-error.tsx` report crashes to `/api/client-error`, which writes to the host's server logs.
- **UX:** Call button fades out while the form is on screen; pinned scroll sections (`who-we-serve`, mobile `why-choose-us`) only pin when the viewport is >= 640px tall, otherwise they flow normally; mobile menu traps focus, restores it on close, closes on navigation; touch targets raised to 48px; Google Map is click-to-load (`shared/map-embed.tsx`).
- **Cleanup:** removed `cn` package and unused starter SVGs, `og-image.jpg`, old `public/images/{about,services,who-we-serve,why-choose-us}` (originals live in `assets-source/`, served files in `public/img`), unused CSS animations; `shadcn` CLI moved to devDependencies (`npm audit --omit=dev`: 0 issues).
- **Hosting note:** Vercel's free Hobby plan is for non-commercial use; a business site should be on Pro, or use a host with a free commercial tier (Cloudflare Pages, Netlify). Confirm against Vercel's current terms before launch.

## 16. Enquiry alerts via Web Push (2026-10-14)
New enquiries now trigger a push notification on the owner's installed admin app (`docs/push-setup.md`). Standard Web Push + VAPID using the free `web-push` package (MIT) instead of FCM: reuses the existing service-worker push handler, needs no Firebase client SDK, no paid service. Subscriptions are kept in Firestore (`pushSubscriptions`); `after()` in `/api/quote` sends the alert so a failed push can never lose or delay a lead. UI: `components/admin/alerts-control.tsx` (header bell + permission sheet, auto-opens in the installed app unless alerts were switched off on purpose). The sheet is portalled to `<body>` because the header's `backdrop-blur` would trap a fixed-position child. New env vars: `VAPID_PUBLIC_KEY`, `VAPID_PRIVATE_KEY`. Replaces the "no alert channel" note in §15.

## 17. Install guide page (2026-10-14)
`/admin/install` (`components/admin/install-guide.tsx`): plain numbered steps with iPhone / Android tabs (opens on the visitor's own phone; Samsung Internet note; "Install now" button only where the browser offers one-tap install). Install popup and header download icon: browsers with `beforeinstallprompt` (Chrome/Edge) install in one tap (popup also has a "Not working? See how to install" link); iPhone and every Android browser without it get "See how to install" -> the guide. The popup and header icon hide on the guide itself. It is public (no login needed, no data), `noindex`, under `/admin` in `robots.ts`. The service worker only caches `/admin` itself as the offline shell (cache v3), so visiting the guide can't replace the dashboard's offline copy. Replaces the inline iPhone steps in the old popup.

## 18. PWA icon and splash colours (2026-10-14)
Admin app icon = white emblem (`public/logo.svg`) on **black** (`#000000`), at 192 / 512 / maskable / 180 (apple-touch). `background_color` (Android opening screen) and `theme_color` (status bar) are black in `public/admin/manifest.webmanifest` and `admin/layout.tsx`; iOS status bar style is `black`. Change the colour in one place (`BG` in `scripts/admin-icons.mjs`, then `node scripts/admin-icons.mjs`) and keep the manifest and layout values in sync. Installed copies keep the old icon until the app is removed and installed again (iPhone) or the phone refreshes it (Android). iOS ignores the manifest splash colour and shows its own plain launch screen (a custom one needs a set of per-device startup images; not done).

## 19. Map loads by itself again (2026-10-14, client request)
The click-to-load facade (`shared/map-embed.tsx`, §11/§15) was removed: the Google Maps iframe in `locate-us.tsx` is a normal `loading="lazy"` iframe, so it loads as it nears the viewport without a tap (still not on first paint). Privacy policy wording updated to match. "Get directions" / "Call" buttons never wrap: `whitespace-nowrap`, smaller text and padding below 380 px.

## 20. Before/after slider: handle-only (2026-10-14, client request)
The slider no longer reacts to touches on the photo (the invisible full-size range input caused mis-slides and fought with page scrolling). Only the circular handle moves it: pointer-drag with pointer capture (`touch-none` on the handle only, so the page still scrolls over the photo), plus keyboard (arrows / Home / End) via `role="slider"`. The handle is kept between 3% and 97% so it can always be grabbed. The "Illustration" chip is gone (prop removed), and the "Drag to compare" sticker sits further outside the image corner. Note: the AI-image notice still lives on `/disclaimer`.
