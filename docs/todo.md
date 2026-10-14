# Open Questions & Next Steps (NCR Grass)

This document tracks undecided items, open questions for the client, and immediate action items.

---

## 1. Open Questions (Do NOT guess — wait for client confirmation)
- [ ] **Exact Business Location & Address:** Need complete street address, city, state, postal code, and nursery/depot location for Google LocalBusiness JSON-LD schema.
- [ ] **Target Service Areas:** List of specific cities/regions to target for local SEO landing pages (e.g., Delhi, Gurugram, Noida, Greater Noida, Ghaziabad, Faridabad, surrounding rural farmhouse belts).
- [x] **Official Contact Channels:** Phone & WhatsApp confirmed (+91 63990 80816). Destination email address still pending.
- [ ] **Approved Site Structure & Page List:** Confirmation on whether we launch with a focused 3-5 page structure (Home, Services, Before/After Showcase, Contact/Quote) or expandable dynamic routes.
- [ ] **Design & Theme Direction:** Visual mood, font choices, and brand color preference (currently utilizing neutral theme tokens in `globals.css`).
- [ ] **Email Delivery Service for Quote Form:** Client preference on free email dispatch mechanism (e.g. Resend free tier or SMTP). *Remember: Must be 100% free.*

---

## 2. Immediate Next Engineering Steps
- [ ] Build reusable section components in `src/components/sections/` (Hero, Service Highlights, Transformation Process, FAQ, Quote Form).
- [ ] Implement contact/quote form using `react-hook-form` + `zod` schema validation.
- [ ] Implement Next.js route handler (`/api/quote`) for form validation and email dispatch.
- [ ] Implement Next.js SEO infrastructure (`sitemap.ts`, `robots.ts`, OpenGraph metadata, JSON-LD LocalBusiness component).
- [ ] Verify Core Web Vitals and mobile responsiveness across all components.

---

## 3. Homepage v1 placeholders to replace (see `src/lib/site.ts`)
- [ ] Real phone, WhatsApp, email, address (currently dummy values)
- [ ] Written street address for the "Locate us" card (map pin is set: 28.660472, 77.530472 in `location`; card shows `site.address` placeholder)
- [ ] Real service areas (currently "Area 1..6")
- [ ] Grass varieties and "best for" notes
- [ ] Real FAQ answers (price/sq ft, timing, season)
- [ ] Real before/after and gallery photos (slider and gallery use placeholders)
- [ ] Verified trust numbers (projects, years) and real testimonials
- [ ] `/api/quote` saves to Firestore once Firebase keys are set (until then production returns 503). Email delivery is optional now.
- [ ] Hero image is a single `home-screen.png` (served as `natural-lawn-villa-*` files); confirm it is client-approved
- [ ] LocalBusiness JSON-LD, `sitemap.ts`, `robots.ts` (need real details and domain)
- [ ] Separate pages: About, Gallery, Service Areas, Contact (nav currently anchors to homepage sections); consider a Services page
- [ ] About section copy (`src/components/sections/about.tsx`) is a draft with no invented facts. Client to confirm/replace, and supply 3 photos for the inline pill images (grass close-up, site/farmhouse, finished lawn).
- [ ] About-section pill photos (`public/images/about/`) are web images supplied by the user for layout (Google thumbnail, Redfin blog, Magnific stock). Check licensing or replace with real NCR Grass photos before launch.
- [x] Services images: added 1:1 transparent PNGs (`grass-supply.png`, `lawn-installation.png`, `ground-preparation.png`, `aftercare.png`) in `public/images/services/` and linked in `src/lib/site.ts`.
- [x] Who-we-serve before/after photos (16:9): added and linked in `src/lib/site.ts` and `AudienceShowcase` with static cache-busting.
- [ ] Service areas: map highlights Delhi, Haryana, Punjab, HP, Uttarakhand, UP, Rajasthan, J&K, Chandigarh (client said "almost all of North India"). Confirm exact states/cities. Map data is generated from Datameet boundaries (CC BY 4.0); add attribution if required.
- [ ] Removed sections: grass varieties, how it works, recent lawns (and nav "Gallery" link). Re-add a Gallery page later if the client still wants one.

---

## 4. SEO plan blockers (see `docs/seo.md` §4 Phase 0)
- [x] Target areas given (2026-10-13): Dasna (base), Ghaziabad, Meerut, Delhi, New Delhi, Noida, Greater Noida + states UP, Haryana, Punjab, Rajasthan, Uttarakhand.
- [x] Domain name: `ncrgrass.in`
- [ ] Storefront at Dasna (customers can visit, permanent signage) or service-area only?
- [ ] Written address + PIN, opening hours
- [ ] Does a Google Business Profile already exist? Who owns the login?
- [ ] Grass varieties sold + price ranges per sq ft (supply-only and installed)
- [ ] Years in business, project count, owner name/photo for About
- [ ] **Does NCR Grass sell/install artificial grass?** If yes → add a service + pages; if no → only a natural-vs-artificial guide (docs/seo.md §3a).
- [ ] Extra GBP service areas within ~2 h (Hapur, Modinagar, Muradnagar, Bulandshahr, Faridabad, Gurugram?)
- [ ] Real project photos tagged by city (needed before publishing each city page)

- [ ] **Review location page copy** in `src/lib/locations.ts` (11 pages incl. Hinglish). Check localities, customer types (marriage lawns, dhabas, malis...) and claims like 'delivery to Masuri/Pilkhuwa'. Add real local project photos/reviews per city when available.
- [ ] No business email yet. The placeholder is gone from `site.ts`; the contact page shows a Directions tile instead. Add `site.email` + a Mail tile when the client has one (also needed for quote-form delivery).
- [ ] Legal pages (`src/lib/legal.ts`): client to have them reviewed by a legal advisor; confirm which images are AI-generated so the notice can be made specific.
- [ ] Search Console + Bing verification codes (slot ready in `layout.tsx` metadata).
- [x] Images compressed (originals in `assets-source/`, incl. unused root PNG duplicates). Decide whether `assets-source/` (59 MB) should be committed or kept outside git.
- [x] **Lead alerts:** done via Web Push in the admin PWA (`docs/push-setup.md`). Needs `npm run vapid` keys on the host, then real-phone test. Email/Telegram only if ever wanted as a backup.
- [ ] Blog pages (`src/lib/blog-data.ts`): titles 87–97 chars and descriptions 165–177 chars get cut off in Google; `seo:check` lists them.

## 5. Draft SEO copy to review with the client
- [ ] Inner-page long-form copy in `src/lib/page-content.ts` (About, Services, Service Areas, Gallery, Contact, extra FAQs). Written without prices, years, timelines or project counts — client to confirm claims (farm-direct, free site assessment, bulk supply, Delhi NCR express delivery, hill-region installs).
- [ ] Cost, timing and season FAQs were removed from `site.ts` (placeholders). Re-add with real answers from the client.

## 5. Pending from this session (2026-10-13)
- [ ] Street address for the Locate Us card and footer (`site.address`; map pin already set in `location`).
- [ ] Why Choose Us photos, 4:3: `farm-direct.jpg`, `doorstep-delivery.jpg`, `bulk-orders.jpg`, `site-assessment.jpg` in `public/images/why-choose-us/`, then set `image`/`imageAlt` in `reasons` (site.ts). Prompts were given to the user.
- [ ] Real trust figures (years, lawns done, rating) for the hero seal, if the client wants numbers.
- [ ] Decide whether other WhatsApp buttons (FAQ, contact, mobile menu, page CTA) should also use the real WhatsApp glyph.
- [ ] Unused CSS: `animate-spin-slow`, `animate-wheel-scroll` in globals.css can be deleted.
- [ ] Gallery and Contact pages are still the lightest on text; real project captions (type + location) would help SEO.

## SEO follow-ups (2026-10-14)
- [ ] Client to supply real per-sq-ft rates, then add a price section to the cost post and the FAQs (nothing is quoted today).
- [ ] Real project photos: then un-noindex `/gallery`, restore it to the sitemap, (the "Illustration" chip on the slider is already removed).
- [x] State pages are indexable and in the sitemap (2026-10-14, client request). Still worth deepening each with real local detail (cities served, delivery) for ranking.
- [ ] Post images (`image` on blog posts) once real photos exist.
- [ ] Google Business Profile: owner and set-up (see docs/seo.md).

## 5. Admin app / Firebase (see decisions §13)
- [ ] Create the Firebase project and add the 3 `FIREBASE_*` env vars locally and on the host (`docs/firebase-setup.md`). Then test the form end to end.
- [ ] Confirm `ADMIN_PHONE` (currently the business number 6399080816) is the owner's login number. Set the 3 admin env vars on the host. Consider a longer password.
- [ ] Replace `lib/admin/data.ts` with a Firestore listener; delete `mock-data.ts`.
- [ ] Publish the deny-all Firestore rules (in `docs/firebase-setup.md`).
- [ ] Push notifications for new enquiries (FCM; iPhone needs the app installed to the Home Screen).
- [ ] Optional: search/filter and mark-as-contacted in the admin list.

## Pre-launch checklist (2026-10-14)
- [ ] Set all 8 env vars on the host (`ADMIN_*`, `FIREBASE_*`, `VAPID_PUBLIC_KEY`, `VAPID_PRIVATE_KEY`; make the VAPID pair with `npm run vapid`). **Change `ADMIN_PASSWORD` to a random 16+ character one** (changing it signs all devices out).
- [ ] Confirm Vercel plan (commercial use) or switch host.
- [ ] Publish the deny-all Firestore rules; test the form end to end on the live domain (submit, then see it in /admin).
- [ ] `npm run build && npm run start`, then `npm run seo:check`; after deploy `npm run seo:check -- https://ncrgrass.in`.
- [ ] Search Console + Bing: verify domain, submit `https://ncrgrass.in/sitemap.xml`.
- [ ] Commit the project to git (`assets-source/` is now in .gitignore: back that 60 MB folder up elsewhere).
- [ ] On the owner's phone: install the admin app, allow notifications, submit a test enquiry on the live site and confirm the alert arrives (iPhone: Home Screen app only).
