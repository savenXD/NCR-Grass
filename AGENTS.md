<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# NCR Grass — Agent Context & Engineering Guidelines

Welcome! This document (`AGENTS.md`) is the single source of truth for all AI agents (Antigravity, Cursor, Windsurf, Claude Code, GitHub Copilot, Codex) working on the **NCR Grass** codebase.

---

## 1. Project Overview & Business Context
- **Business Name:** NCR Grass (`ncr-grass`)
- **Domain:** Supplying and planting fresh natural grass, transforming bare and muddy land into proper lawns for farmhouses, corporate offices, and commercial sites in North India (exact location TBD).
- **Core Business Goal:** Rank high on Google for local searches (*lawn installation, natural grass, farmhouse lawns, commercial landscaping*) and convert visitors into qualified phone/quote enquiries.
- **Top Engineering Priority:** **SEO and mobile speed are top priority ahead of visuals.**
- **Brand Assets:** Logo at `public/logo.svg`.

---

## 2. Tech Stack & Library Constraints
- **Framework:** Next.js (App Router, Turbopack, React 19)
- **Language:** TypeScript (Strict mode enabled)
- **Styling:** Tailwind CSS v4 (neutral theme tokens in `src/app/globals.css`)
- **UI Component Library:** **shadcn/ui** is the default component library.
  - ⚠️ **Strict Constraint:** Do **NOT** add any other UI component library without explicit user approval.
- **Icons:** Lucide React (`lucide-react`)
- **Forms & Validation:** `react-hook-form` + `zod` + `@hookform/resolvers` with Next.js Route Handlers (no heavy DB, CMS, or auth needed for now).
- **External Component Registry:** [21st.dev](https://21st.dev) (for design engineer blocks when needed).
- **Budget / Cost Rule:** **Everything must be 100% free to build with.** Always ask before adding any paid service or API key.

---

## 3. Undecided Items — Strict "Do NOT Assume" Policy
The following items have **not** been finalized by the client. Do NOT guess or invent:
1. **Design Direction, Colors & Fonts:** Keep neutral placeholders using CSS variables / Tailwind theme tokens so the theme can be swapped in one place once decided.
2. **Business Location & Service Areas:** Use neutral regional placeholders.
3. **Page List & Marketing Copy:** Do not invent fixed page lists; keep routing flexible to easily add service and city pages later.

---

## 4. Context & Documentation System (`/docs` & `CLAUDE.md`)
Keep the project organized from day one:
- **`CLAUDE.md`**: Holds stable project context only. Kept short and actionable.
- **`docs/constitution.md`**: **Non-negotiable core rules (strict mobile-first responsiveness down to 320px, performance invariants, zero horizontal scroll).**
- **`docs/decisions.md`**: What we chose, why, and architectural reasoning.
- **`docs/seo.md`**: Target keywords, local schema templates, and technical checklist.
- **`docs/content.md`**: Verified business info and copy as the client provides it.
- **`docs/todo.md`**: Open questions for the client and pending engineering steps.

---

## 5. Directory Layout & Organization

```
NCR Grass/
├── public/                 # Static assets (logos, favicons)
│   └── logo.svg
├── docs/                   # Project memory, decisions & content
│   ├── constitution.md     # Core engineering constitution (responsiveness & invariants)
│   ├── decisions.md        # Architectural decisions log
│   ├── seo.md              # SEO strategy, keywords & schema
│   ├── content.md          # Business info & client copy
│   └── todo.md             # Open questions & next steps
├── src/
│   ├── app/                # Next.js App Router (pages, layouts, route handlers)
│   │   ├── api/            # Route handlers (e.g., quote submission)
│   │   ├── layout.tsx      # Root application layout
│   │   ├── page.tsx        # Entry view
│   │   └── globals.css     # Tailwind v4 theme, OKLCH palette, custom utilities
│   ├── components/
│   │   ├── ui/             # shadcn/ui atomic primitive components
│   │   ├── sections/       # High-level page sections (hero, features, quote form)
│   │   └── blocks/         # 21st.dev / complex design engineer blocks
│   ├── hooks/              # Custom reusable React hooks
│   ├── lib/                # Shared utilities & configurations (utils.ts)
│   └── types/              # Global TypeScript interfaces & schemas
├── CLAUDE.md               # Stable concise context pointer
├── AGENTS.md               # Master AI agent instructions & guidelines
├── .cursorrules            # Agent pointer rules for Cursor / Windsurf
├── components.json         # shadcn/ui registry & path alias configuration
├── package.json            # Dependencies and scripts
└── tsconfig.json           # Path alias '@/*' pointing to './src/*'
```

---

## 6. SEO & Performance Engineering Rules

### 6.1 Server Components & Minimal Client Footprint
- **Default to Server Components:** All pages and layout components must be Server Components.
- **Client Boundaries:** Only mark leaf components with `'use client'` when state, event handlers, or form hooks are required.

### 6.2 Core Web Vitals (Mobile-First)
- Hero section must be rendered with zero blocking JavaScript.
- Avoid heavy JavaScript animation libraries in the viewport. Prefer CSS transitions and Tailwind utility animations.
- Use `next/image` with explicit sizes and descriptive alt text for all images.
- Use `next/font` for zero layout shifts.

### 6.3 Technical SEO
- Implement per-page metadata, canonical tags, `sitemap.ts`, and `robots.ts`.
- Integrate `LocalBusiness` JSON-LD structured data.
- Enforce strict semantic HTML: single `h1` per page, logical `h2`/`h3` hierarchy.

---

## 7. Working Protocol for Agents

1. **Read First:** Before starting any task, read `CLAUDE.md` and the relevant docs in `/docs`.
2. **Never Guess:** When something is unclear or undecided, ask the user and log it in `docs/todo.md`.
3. **Small Changes:** Make small, reviewable changes and explain briefly what was done.
4. **Update Docs:** After finishing a task, update the relevant `/docs` file if decisions or content changed.
5. **Verify Rigorously:** Run `npx tsc --noEmit`, `npm run lint`, and `npm run build` to ensure zero compilation or type errors.

---

## 8. Architectural Decision Records (ADR) & Memory Log

| Date | Decision / Change | Rationale | Status |
|---|---|---|---|
| 2026-10-13 | Initialized Next.js 16 + React 19 + Tailwind v4 + Lucide React + shadcn/ui | Modern, performant foundation with RSC and App Router | ✅ Active |
| 2026-10-13 | Standardized `cn` utility in `src/lib/utils.ts` using `clsx` and `tailwind-merge` | Guarantees compatibility with all shadcn and 21st.dev components | ✅ Active |
| 2026-10-13 | Added `react-hook-form` + `zod` + `@hookform/resolvers` | Free, robust, type-safe client & server validation for quote/contact form | ✅ Active |
| 2026-10-13 | Created `/docs` system (`decisions.md`, `seo.md`, `content.md`, `todo.md`) and `CLAUDE.md` | Persistent, scalable project memory following the user's working style | ✅ Active |
| 2026-10-13 | Set strict "SEO & Speed > Visuals" and "Zero Paid Services" policy | Aligned with NCR Grass business goal and local search objectives | ✅ Active |
