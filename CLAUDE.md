# NCR Grass — Project Guide & Rules

## Project Summary
Marketing website for **NCR Grass** (North India natural grass supplier & lawn installation for farmhouses, corporate offices, and commercial sites).

## Core Objective
Rank high on Google for local searches (lawn installation, natural grass, farmhouse lawns) and turn visitors into enquiries. **SEO and speed are top priority ahead of visuals.**

## Technology Stack & Constraints
- **Framework:** Next.js (App Router, RSC by default) + TypeScript
- **Styling:** Tailwind CSS v4 (neutral theme variables in `globals.css`)
- **UI Components:** shadcn/ui (default library; **do NOT add other UI libraries without asking**)
- **Icons:** Lucide React
- **Forms:** React Hook Form + Zod + Next.js Route Handler
- **Budget:** 100% free to build with. Ask before adding any paid service or API key.

## Undecided Items (Do NOT assume or invent)
- Design direction, color theme, fonts, and mood
- Business location and service areas
- Page list and marketing copy
Use neutral CSS variables and placeholders so theme and content can be swapped in one place once confirmed.

## SEO & Performance Rules
- Server-render or statically generate pages by default. Client components only for interactivity.
- Per-page metadata, canonical tags, sitemap, robots, and JSON-LD (LocalBusiness).
- Use `next/image` and `next/font`. Keep Core Web Vitals green on mobile.
- Minimal CSS/Tailwind animations. No heavy JS in the hero.
- Semantic HTML, proper heading hierarchy, descriptive alt text.

## Context & Documentation System
- `CLAUDE.md`: Stable project context only. Keep it concise.
- `docs/constitution.md`: **Non-negotiable core rules (strict mobile-first responsiveness, performance invariants).**
- `docs/decisions.md`: What we chose and why.
- `docs/seo.md`: Target keywords, schema structures, verification checklists.
- `docs/content.md`: Business details and verified client copy.
- `docs/todo.md`: Open questions for the client and pending tasks.

## Working Protocol
1. Read `CLAUDE.md` and relevant `/docs` before starting any task.
2. If something is unclear or undecided, ask instead of guessing, and record it in `docs/todo.md`.
3. Keep components small, single-purpose, and organized (`components/ui`, `components/sections`, `lib`, `app`).
4. Make small, reviewable changes and explain briefly what you did.
5. Update `/docs` after finishing whenever decisions or content evolve.
