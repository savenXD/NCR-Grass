# NCR Grass — Core Engineering Constitution & Non-Negotiables

This document defines the absolute, non-negotiable rules for the NCR Grass codebase. All AI agents and developers must adhere to these tenets unconditionally.

---

## 1. Strict Responsiveness & Mobile-First Mandate
- **Mobile-First by Default:** All layouts, typography, navigation, tables, grids, and forms must be engineered and styled mobile-first (`<640px`) before applying tablet (`md:`) or desktop (`lg:`, `xl:`) breakpoints.
- **Zero Horizontal Overflow:** Absolutely no uncontained horizontal scrolling or cut-off elements at any viewport width down to **320px**.
- **Touch-First Tap Targets:** All interactive elements (buttons, links, inputs, hamburger menus) must have a minimum interactive tap target size of **48x48px** with appropriate touch spacing on mobile.
- **Fluid Typography & Spacing:** Use responsive text scaling (`text-base sm:text-lg md:text-xl`) and fluid padding/margins (`p-4 sm:p-6 lg:p-8`) to prevent layout cramping or awkward line breaks.
- **Adaptive Components:**
  - Navigation must cleanly collapse into a mobile drawer or accessible dialog on small viewports.
  - Multi-column grids must default to single column (`grid-cols-1`) on small viewports and scale gracefully (`sm:grid-cols-2 lg:grid-cols-3`).
  - Forms must stack labels and inputs vertically on mobile.
  - Images must use responsive wrappers and `sizes` attributes via `next/image` to prevent layout shifts across viewports.

---

## 2. Core Web Vitals & Performance
- **Speed Over Visuals:** Fast load times on mobile 4G networks take precedence over heavy visual embellishments.
- **Hero Cleanliness:** Zero heavy client JS bundles or layout-shifting animations in the viewport on initial load.
- **CLS < 0.1:** Explicit aspect ratios for all media and banners.

---

## 3. Architecture & Dependency Invariants
- **shadcn/ui Default:** No secondary component libraries.
- **Zero Cost Rule:** 100% free build and runtime stack.
- **Neutral Theming:** Style using semantic CSS tokens (`globals.css`) until client finalizes brand direction.
- **Server Components by Default:** Minimize the client-side JavaScript footprint.

---

## 4. SEO Integrity (no spam techniques)
- **No hidden or off-screen text for SEO**: no `opacity-0`, `sr-only`, off-screen positioning, tiny or same-colour text holding keywords. This breaks Google's spam policy on hidden text and can get the whole site demoted or removed. `sr-only` is only for genuine accessibility labels (icon buttons, form labels).
- No keyword-stuffed lists, doorway pages (city clones) or fake reviews/ratings.
- What Google shows in results comes from the `<title>` and meta description (`pageMetadata()` in `src/lib/metadata.ts`). Keep titles ≲ 60 chars and descriptions ≤ 160 chars, with the most important words first.
