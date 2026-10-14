import { indiaMap } from "@/lib/india-map"

/**
 * State outlines for the service-areas map, generated from src/lib/india-map.ts (single source of truth).
 * Served as one cacheable file and referenced with <use> instead of being inlined, because inlining
 * put ~37 KB of path data into the page twice (HTML + framework payload).
 * No fill/stroke here on purpose: <use> inherits them, so the map still follows the theme tokens.
 */
const group = (id: string, north: boolean) =>
  `<g id="${id}">${indiaMap.states
    .filter((s) => s.north === north)
    .map((s) => `<path d="${s.d}"/>`)
    .join("")}</g>`

export function GET() {
  const svg =
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${indiaMap.width} ${indiaMap.height}">` +
    group("other", false) +
    group("north", true) +
    `</svg>`
  return new Response(svg, {
    headers: {
      "Content-Type": "image/svg+xml; charset=utf-8",
      "Cache-Control": "public, max-age=86400, stale-while-revalidate=604800",
    },
  })
}
