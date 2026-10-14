# SEO Strategy & Ranking Plan (NCR Grass)

How we get NCR Grass to the top of Google (Maps "local pack", normal results, and AI Overviews) for natural grass and lawn searches across Delhi NCR and North India.
Researched 2026-10-13. Sources at the bottom.

---

## 1. How Google ranks a business like this (research summary)

There are **three separate places** to win, and each one is ranked differently:

| Where | What decides it | Our main lever |
|---|---|---|
| **Map pack** (3 businesses + map, top of "lawn grass near me") | Google's own 3 factors: **relevance, distance, prominence**. 2026 expert survey top factors: primary GBP category, distance to searcher, keywords in GBP name, address in the searched city, open at search time, high star rating | **Google Business Profile (GBP) + reviews** |
| **Organic results** (blue links) | Helpful, unique content matching the query, page experience, links/mentions from other sites, clean technical setup | **The website** |
| **AI Overviews / AI Mode** | For local queries roughly 42% of citations come from GBP, 28% from directories, 17% from the business's own site (vendor study, treat as indicative). Pages that answer the exact question with a concrete number get cited | **GBP + directories + pages that answer questions plainly (prices, timing, varieties)** |

Key facts that shape the plan:
- **Distance can't be faked.** We'll win the map pack near the base (Dasna / Ghaziabad / Noida / Meerut belt). For far cities and states (Punjab, Rajasthan, Uttarakhand), the map pack goes to businesses located there, so we win those through **organic pages**.
- **GBP service areas are capped at 20, and they must stay within about 2 hours' drive** of the base. States like Punjab or Rajasthan can't go in GBP; they belong on the website.
- **City pages are risky if copy-pasted.** Google's doorway / scaled-content spam policies target near-identical pages that swap the city name. Every location page needs **genuinely local, unique content**, otherwise it can drag the whole site down.
- **Myths to ignore** (from Google's SEO Starter Guide): meta keywords, keyword stuffing, word-count targets, keyword-in-domain. Don't spend time on these.
- **The competition is weak.** "Natural grass Ghaziabad / Delhi" results are dominated by **IndiaMART / JustDial listings**, with very few proper supplier websites. A fast, well-structured site with real photos, prices and reviews can outrank them.
- **Prices drive clicks.** Directory listings show ₹2.5–4/sq ft for Bermuda / Selection No. 1 and ₹9–16/sq ft for Mexican / Korean-type grass. Searchers want rates; our site currently says "to be confirmed".

---

## 2. Target areas (client list, 2026-10-13) — domain `ncrgrass.in`

Base: **Dasna, Ghaziabad (UP)**, pin 28.660472, 77.530472. Location pages live at `/service-areas/<slug>`, data in `src/lib/locations.ts`.

| Page | Angle (what makes it unique) |
|---|---|
| `/service-areas/dasna` | **Home base.** NH-9 / Delhi–Meerut Expressway / EPE junction; rural + highway customers: farmhouses, **marriage/banquet lawns**, schools, dhabas, warehouses. Masuri, Duhai, Pilkhuwa. |
| `/service-areas/ghaziabad` | **Urban.** Societies/RWAs, kothis, schools, offices; post-construction debris soil. Raj Nagar Ext., Indirapuram, Vaishali, Crossings Republik... |
| `/service-areas/noida` | Corporate/IT campuses, Noida Expressway farmhouses, societies. |
| `/service-areas/greater-noida` | New development: Greater Noida West societies, Knowledge Park campuses, Yamuna Expressway. |
| `/service-areas/meerut` | Straight up the DME; marriage lawns, farmhouses, schools. |
| `/service-areas/delhi` | Delhi **+ New Delhi on one page**: Chhatarpur / Sainik Farms / Bijwasan farmhouse belts, kothis, bungalows, malis buying bulk. |
| `/service-areas/{uttar-pradesh,haryana,punjab,rajasthan,uttarakhand}` | State pages (organic only, outside GBP's 2 h radius): climate/property angle per state. |

Decision (client, 2026-10-13): **Dasna and Ghaziabad get separate pages** with different audiences and localities, so they don't compete.

---

## 3. Keyword map (English + Hinglish)

Locals type Hinglish in Latin script ("lawn ki ghaas"), and voice search adds Hindi. Hinglish is used **in visible content** (a "Hinglish mein" block + Hinglish FAQs on every location page, 2 Hinglish FAQs on the homepage/FAQ page), never as hidden keywords. Validate volumes with Keyword Planner + Search Console after launch.

**Who searches, and what they type**

| Buyer | English searches | Hinglish searches |
|---|---|---|
| Farmhouse owner | farmhouse lawn grass, farmhouse lawn development, mexican grass for farmhouse | farmhouse ke liye ghaas, farmhouse lawn banwana |
| Marriage / banquet lawn owner | marriage lawn grass, banquet lawn grass, party lawn grass installation | marriage lawn ke liye ghaas, lawn ki ghaas lagwani hai |
| Homeowner (kothi/villa) | lawn grass for home, garden grass price, lawn grass near me, grass carpet price | ghar ke lawn ke liye ghaas, lawn ki ghaas, ghaas wala, hari ghaas |
| Society / RWA | society lawn grass, park grass installation | society park mein ghaas |
| Builder / contractor / mali | bulk lawn grass supplier, lawn grass wholesale, grass nursery Ghaziabad | ghaas wholesale rate, thok mein ghaas |
| School / sports | school ground grass, cricket ground grass, playground grass | school ground mein ghaas |
| Corporate / factory | corporate landscaping Noida, office lawn installation | — |
| Hotel / resort | hotel lawn grass, resort landscaping Rishikesh/Jaipur | — |

**Modifiers:** + city/locality ("lawn grass Raj Nagar Extension"), + price/rate/per sq ft, + near me, + supplier/wala, + variety (Mexican, Bermuda / Selection No. 1, Korean, doob/dub, carpet grass — **only once the client confirms varieties sold**).

**Question keywords** (for guides + AI Overviews): lawn grass price per sq ft Delhi NCR · ghaas ka rate kya hai · best grass for Delhi garmi · ghaas kab lagani chahiye (season) · Mexican vs Bermuda grass · natural vs artificial grass · lawn kaise banaye · nayi ghaas mein paani kitna dein.

**Page → primary keyword**
- `/` lawn grass supplier Dasna Ghaziabad Delhi NCR
- `/services` lawn installation / natural grass supply Delhi NCR
- `/service-areas/<city>` lawn grass in <city>, natural grass supplier <city>, <city> mein lawn ki ghaas
- `/faq` lawn grass price / planting / care questions (English + Hinglish)

---

## 3a. Same thing, many names (synonym strategy)

People search for the same product with very different words ("green grass planter near me", "natural green grass", "grass carpet", "ghaas wala"). How we handle it:

1. **Google already maps synonyms.** Its language systems (neural matching, BERT, now Gemini-based ranking) understand that "green grass planter" ≈ "lawn grass installation". **No separate page per synonym**: near-duplicate pages are the doorway-page spam pattern.
2. **But exact words still help**, especially for local results. So each page leads with its primary term and naturally uses 2–4 variants in body text, headings or FAQs. Never as a comma-separated keyword list or hidden text.
3. **One FAQ explains the names** ("Is lawn grass the same as turf, sod or carpet grass?", plus a Hinglish version). It catches synonym searches and answers a real buyer question.
4. **Google Business Profile services list** is where synonyms carry the most local weight: add each as a service with a one-line description (Grass plantation, Turf laying, Lawn development, Natural grass supply...).
5. **Discover the words we haven't thought of** from real data: Search Console → Performance → Queries (monthly), Google autocomplete, "People also ask" / "Related searches", Keyword Planner, and IndiaMART/JustDial category names (they mirror buyer vocabulary). Add new terms to this table, then into copy.
6. Misspellings ("lwan grass", "gras") need nothing; Google corrects them.

| Family | English variants | Hinglish / Hindi variants |
|---|---|---|
| **Product** | lawn grass, natural grass, green grass, real grass, garden grass, natural turf, turf, sod, grass carpet, carpet grass, lawn carpet, grass rolls, ready lawn, instant lawn | ghaas, hari ghaas, lawn ki ghaas, garden ki ghaas, carpet ghaas, ghaas ka carpet, doob / doob ghaas |
| **Varieties** *(only once client confirms what they sell)* | Mexican grass, Korean grass, Bermuda grass, Selection No. 1, Nilgiri / Calcutta grass, Paspalum, Zoysia | mexican ghas, doob |
| **Service** | lawn installation, grass plantation, grass planting, turf laying, sod installation, lawn making, lawn development, lawn setup, landscaping, garden development | ghaas lagana / lagwana, ghaas bichhana, lawn banwana, bagicha banwana |
| **Who** | supplier, dealer, wholesaler, nursery, seller, contractor, landscaper, gardener, "grass planter" | ghaas wala, mali, nursery wala |
| **Ground** | land levelling, ground preparation, soil preparation | zameen level karna, mitti ka kaam |
| **Intent** | near me, price, rate, per sq ft, cost, for farmhouse/home/office, bulk, wholesale | rate kya hai, kahan milegi, kitne ka, thok mein |

**Artificial grass** ("artificial grass supplier", "fake grass", "synthetic turf", "grass mat") is a **different product**, not a synonym. Unless the client sells it, we must not claim to supply it. Instead we capture these searchers with honest comparison content (natural vs artificial grass guide, FAQ answer) for people still deciding. Client decision pending (docs/todo.md).

---

## 4. The plan

### Phase 0: Blockers (client, needed before anything ranks)
- [x] **Domain:** `ncrgrass.in` (set in `site.url`).
- [ ] **Storefront or service-area?** Can customers visit/collect grass at Dasna (with permanent signage)? Yes → hybrid GBP showing the address (stronger map-pack signal). No → service-area GBP with the address hidden.
- [ ] **Written address, PIN code, opening hours** (exact, identical everywhere: this is the "NAP").
- [ ] **Google Business Profile:** create or claim it and verify it. Tell us if one already exists.
- [ ] **Real prices** (range per sq ft per variety, supply-only vs installed), **grass varieties sold**, years in business, number of projects.
- [ ] **Real photos** of projects, the farm, trucks and team, ideally tagged by location.

### Phase 1: Technical foundation (code, ~1 week)
- [x] **JSON-LD** in `src/lib/schema.ts` + `<JsonLd>` (done 2026-10-13: business + website site-wide; Breadcrumb, Service, FAQPage on location pages). Still to add: openingHours, sameAs, postalCode.
  - `LocalBusiness` (most specific subtype that fits; review options when building) with name, address, geo (5+ decimals), telephone, openingHours, url, image, `areaServed` (cities + states), `sameAs` (GBP/social). Use **one canonical business entity** referenced by `@id` on every page.
  - `WebSite` + `Organization` (logo) on the homepage.
  - `Service` per service page, with `provider` → business `@id` and `areaServed`.
  - `BreadcrumbList` on inner pages.
  - `FAQPage`: Google no longer shows FAQ rich results for most sites, but it helps machines read the answers. Add it only once the answers are real (no "to be confirmed").
  - **No self-made review stars** (`aggregateRating` on our own business isn't eligible for stars).
- [x] **Metadata:** `pageMetadata()` in `src/lib/metadata.ts`; title template (`%s | NCR Grass`), unique title/description per page, `openGraph` + `twitter` + a generated OG image (`opengraph-image.tsx`), `<html lang="en-IN">`.
- [x] **Homepage H1 needs keywords.** Done: keyword line inside the H1 ("Natural Lawn Grass Supplier · Dasna, Ghaziabad & Delhi NCR"). Currently "Transform Bare Land into a Picture-Perfect Green Lawn"; make it e.g. "Natural Grass Supply & Lawn Installation in Delhi NCR" (styled text can stay similar). Remove the opacity fade on the H1 so it isn't hidden while the page loads (LCP).
- [ ] **Images:** source files are 2–3.6 MB each (~50 MB total). Compress to WebP at ≤ 2000 px (~150–300 KB). Delete unused root PNG duplicates in `public/`. Replace the deprecated `priority` prop with `preload` (Next 16). Use descriptive file names (`farmhouse-lawn-ghaziabad.webp`).
- [ ] **Google Maps iframe:** load on click/facade so it doesn't cost speed.
- [x] **Sitemap:** includes all location pages. Still to do: real `lastModified`. (services, locations, guides) with real `lastModified`.
- [ ] **Search Console + Bing Webmaster Tools** (free): verify, submit sitemap, request indexing. Bing also feeds ChatGPT/Copilot search.
- [ ] Lighthouse mobile ≥ 95 on every template; Rich Results Test passes.

### Phase 2: Site architecture & content (~2–4 weeks, content-dependent)
URL plan (keep the routing data-driven from `src/lib/`):
```
/                                   homepage: Delhi NCR + North India
/services/natural-grass-supply      "buy lawn grass" intent + price table
/services/lawn-installation         full installation
/services/ground-levelling          land prep / muddy land to lawn
/grass/<variety>                    one page per variety actually sold (Mexican, Bermuda/Selection 1, ...)
/service-areas/<city|state>          DONE: Dasna, Ghaziabad, Noida, Greater Noida, Meerut, Delhi + 5 states
/projects/<slug>                    real case studies (before/after, place, size, variety)
/guides/<slug>                      question-answering articles
```
- [ ] **City page recipe (anti-doorway):** each must have ≥ 3 unique elements: distance/delivery time from Dasna, localities served (e.g. Noida sectors, Greater Noida West), a local project with photos, local review(s), city-specific FAQs, a note on local soil/water (e.g. Meerut's farmland soil vs Noida's construction fill). **No real local material = don't publish yet.** Launch Tier 1 only.
- [ ] **Grass variety pages:** what it is, look, sun/shade, water needs, foot traffic, price range, best for (farmhouse / office / home), photos. High search volume, little real competition.
- [ ] **Guides (first 6):** lawn grass price per sq ft in Delhi NCR (2026); best grass for North India summers; Mexican vs Bermuda grass; when to plant grass in Delhi NCR; natural vs artificial grass; new lawn care for the first 30 days. Answer the question in the first 2 sentences, with a number.
- [ ] **Internal linking:** homepage → services/locations; every city page → relevant services + varieties + projects; guides → services. Footer: "Areas we serve" links.
- [ ] **Trust (E-E-A-T):** About page with the owner's name/photo and story, real years and project counts, farm photos, a visible address/phone on every page (footer), clear photo captions.
- [ ] Fix the remaining placeholder FAQ answers; they're the most quotable content for AI Overviews.

### Phase 3: Google Business Profile (biggest map-pack lever, runs in parallel)
- [ ] **Name:** exactly "NCR Grass" (it already contains "NCR"). Never stuff keywords into the name; that gets profiles suspended.
- [ ] **Primary category:** pick from GBP's list after checking what the top-ranking competitors use. Candidates: "Turf supplier", "Landscaper", "Lawn care service". Add the others as secondary categories.
- [ ] **Service areas (max 20, ≤ ~2 h drive):** Ghaziabad, Dasna, Noida, Greater Noida, Delhi, New Delhi, Meerut, Hapur, Modinagar, Muradnagar, Bulandshahr, Faridabad, Gurugram ... (client to confirm).
- [ ] Fill in **everything**: services (with descriptions), products (each grass variety with a price), hours, description, website link to the homepage, WhatsApp/call.
- [ ] **Weekly:** 3–5 new geotagged real photos/videos plus 1 post (a project, offer or tip). Activity and fresh photos help prominence and conversion.

### Phase 4: Reviews (prominence + conversion)
- [ ] After every job, send the **GBP review short-link on WhatsApp** with a one-line ask. Ask customers to mention the grass type and place ("Mexican grass farmhouse lawn in Meerut"); never script or pay for reviews.
- [ ] Aim for a **steady flow** (recency matters), e.g. 4–8 per month, reaching 4.5★+.
- [ ] **Reply to every review** within 48 h, naturally mentioning the service/place.
- [ ] Show real reviews on the site (text, not fake stars markup).

### Phase 5: Citations, links & mentions
- [ ] **Exact same NAP everywhere:** Bing Places, Apple Business Connect, JustDial, IndiaMART (also a lead source, where competitors already are), Sulekha, TradeIndia, Facebook, Instagram, YouTube.
- [ ] **YouTube / Instagram:** short before/after transformation videos, titled with place + grass type, linking to the site.
- [ ] **Local links:** farmhouse/wedding venues, architects, builders, nurseries and schools you've worked for (ask for a "lawn by NCR Grass" credit link); local news (Dainik Jagran / Amar Ujala Ghaziabad editions) for a notable project; trade associations.
- [ ] **No** bought links, PBNs, or mass directory blasts.

### Phase 6: Measure & iterate (monthly)
- Search Console: impressions/clicks/position per page and per city query; GBP Insights: calls, direction requests, website clicks; enquiries per month (calls + WhatsApp + form).
- Manually check rankings monthly from incognito for the core terms per Tier 1 city.
- Pages with impressions but position 8–20 → improve the content first. Then add the next city or guide.
- Analytics: avoid heavy scripts. Start with Search Console + GBP Insights; add GA4 only if needed, loaded after interaction.

---

## 4a. Indexing checklist (do this every launch / sitemap submit)

Past problem: most sitemap pages were not indexed. Likely causes on this project: `site.url` was the placeholder `ncrgrass.example` until 2026-10-13, so every canonical and sitemap URL pointed to a domain that doesn't exist, and Google ignores pages whose canonical points elsewhere.

**Before submitting:**
1. `npm run build && npm run start`, then `npm run seo:check` (or `npm run seo:check -- https://ncrgrass.in` on the live site). It must say "No indexing blockers found". It checks: domain, redirects, HTTP 200, noindex, canonical = sitemap URL, robots.txt, one H1, unique title/description, thin content, orphan pages.
2. Hosting: `ncrgrass.in` is the primary domain; `www.ncrgrass.in` **301-redirects** to it; HTTPS forced. (Sitemap and canonicals use `https://ncrgrass.in` without `www` and without a trailing slash.)
3. Preview deployments are blocked in `robots.ts` (Vercel `VERCEL_ENV`). If hosting elsewhere, make sure no second domain serves the site.

**In Search Console:**
4. Add a **Domain property** for `ncrgrass.in` (DNS verification covers http/https/www).
5. Submit `https://ncrgrass.in/sitemap.xml` only.
6. URL Inspection → **Request indexing** for the most important pages first (homepage, /services, /service-areas/dasna, /service-areas/ghaziabad, then the other cities). There's a small daily quota.
7. Bing Webmaster Tools: import from Search Console.

**What the statuses mean:**
- *Discovered – currently not indexed*: Google knows the URL but hasn't crawled yet. Normal for a new domain; links (GBP, directories, social) speed it up.
- *Crawled – currently not indexed*: Google judged the page not valuable enough yet. Fix with unique, useful content and real photos; avoid near-duplicate pages.
- *Duplicate / Alternate page with proper canonical*: canonical or domain mismatch. `seo:check` catches this.
- *Page with redirect*, *Not found (404)*, *Excluded by noindex*: technical; `seo:check` catches these.

Google never guarantees indexing. New domains often take 2–8 weeks for all pages.

---

## 5. Realistic expectations
- **Weeks 1–4:** indexed; ranking for the brand name and long-tail terms ("Mexican grass supplier Dasna").
- **Months 2–4:** map pack for Ghaziabad / Dasna / nearby areas *if* GBP is verified and reviews are flowing; city pages climb in Noida and Greater Noida.
- **Months 4–12:** competitive Delhi terms and state pages. These depend on reviews, links and real project content more than on code.
- No one can guarantee #1. Google says ranking can't be paid for. The plan maximises every factor we control.

---

## 6. Pre-launch checklist
- [ ] Unique title + description on every route; self-referencing canonicals
- [ ] Valid JSON-LD (Rich Results Test) on home, services, locations
- [ ] sitemap.xml + robots.txt on the real domain, submitted in Search Console & Bing
- [ ] All images WebP-compressed, descriptive alt + file names
- [ ] Mobile Lighthouse ≥ 95, CLS < 0.1, LCP < 2.5 s
- [ ] NAP identical across site, GBP and directories
- [ ] Zero broken links or redirect chains

---

## Sources
- Google: [How local ranking works](https://support.google.com/business/answer/7091) · [Service-area rules](https://support.google.com/business/answer/9157481) · [SEO Starter Guide](https://developers.google.com/search/docs/fundamentals/seo-starter-guide) · [LocalBusiness structured data](https://developers.google.com/search/docs/appearance/structured-data/local-business)
- [Whitespark 2026 Local Search Ranking Factors](https://whitespark.ca/local-search-ranking-factors/)
- Doorway/scaled content: [ppc.land](https://ppc.land/scaled-content-abuse/), [gsqi.com](https://gsqi.com/marketing-blog/august-2026-google-spam-update-case-studies/)
- AI Overviews local citations: [BrightLocal](https://www.brightlocal.com/resources/ai-directory-sources/), [Pinmeto](https://www.pinmeto.com/blog/ai-overviews-local-search-2026/)
- Indian citations: [crawlvision](https://crawlvision.com/blog/local-citation-building-seo-2026/), [amazeinternet](https://amazeinternet.com/blog/local-seo-india-2026.html)
- Competitor/price landscape: [IndiaMART Bermuda grass](https://m.indiamart.com/impcat/bermuda-grasses.html), [IndiaMART natural grass Greater Noida](https://dir.indiamart.com/greater-noida/natural-grass.html)
