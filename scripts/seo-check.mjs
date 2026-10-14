#!/usr/bin/env node
/**
 * Pre-submit indexing check. Run against a running build BEFORE submitting the sitemap:
 *   npm run build && npm run start      (in one terminal)
 *   npm run seo:check                   (checks http://localhost:3000)
 *   npm run seo:check -- https://ncrgrass.in   (checks the live site)
 *
 * For every URL in sitemap.xml it checks the usual reasons Google rejects a page:
 * wrong domain, redirects, non-200, noindex, canonical mismatch, robots.txt block,
 * missing/duplicate title or description, not exactly one <h1>, thin content, orphan page.
 * Exit code 1 if any ERROR is found.
 */

const base = (process.argv[2] || "http://localhost:3000").replace(/\/$/, "")
const errors = []
const warnings = []
const err = (url, msg) => errors.push(`${url}  ${msg}`)
const warn = (url, msg) => warnings.push(`${url}  ${msg}`)

const get = (path) => fetch(base + path, { redirect: "manual", headers: { "user-agent": "Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)" } })
const attr = (html, re) => (html.match(re) || [])[1]
const decode = (s) => s?.replace(/&amp;/g, "&").replace(/&quot;/g, '"').replace(/&#x27;|&#39;/g, "'")

// sitemap + robots
const sitemapRes = await get("/sitemap.xml")
if (sitemapRes.status !== 200) {
  console.error(`sitemap.xml returned ${sitemapRes.status}`)
  process.exit(1)
}
const urls = [...(await sitemapRes.text()).matchAll(/<loc>(.*?)<\/loc>/g)].map((m) => m[1].trim())
const robots = await (await get("/robots.txt")).text()
const disallows = [...robots.matchAll(/^Disallow:\s*(\S+)/gim)].map((m) => m[1])
const sitemapLine = attr(robots, /^Sitemap:\s*(\S+)/im)

const siteHost = new URL(urls[0]).host
if (!sitemapLine) err("robots.txt", "no Sitemap: line")
else if (new URL(sitemapLine).host !== siteHost) err("robots.txt", `Sitemap line points to ${sitemapLine}, sitemap URLs use ${siteHost}`)
if (/example|localhost|vercel\.app/.test(siteHost)) err("sitemap", `URLs use a non-production domain: ${siteHost}`)

const pages = new Map()
const linkedPaths = new Set()

for (const url of urls) {
  const u = new URL(url)
  if (u.host !== siteHost) err(url, `different host from the rest of the sitemap (${siteHost})`)
  const path = u.pathname
  if (disallows.some((d) => d !== "" && path.startsWith(d))) err(url, "blocked by robots.txt")

  const res = await get(path)
  if (res.status >= 300 && res.status < 400) {
    err(url, `redirects (${res.status}) to ${res.headers.get("location")}. List the final URL instead`)
    continue
  }
  if (res.status !== 200) {
    err(url, `HTTP ${res.status}`)
    continue
  }
  const xRobots = res.headers.get("x-robots-tag")
  if (xRobots && /noindex/i.test(xRobots)) err(url, `X-Robots-Tag: ${xRobots}`)

  const html = await res.text()
  if (/<meta[^>]+name="robots"[^>]+noindex/i.test(html)) err(url, "has <meta robots noindex>")

  const canonical = attr(html, /<link[^>]+rel="canonical"[^>]+href="([^"]+)"/i)
  if (!canonical) err(url, "no canonical tag")
  else if (canonical !== url) err(url, `canonical points elsewhere: ${canonical}`)

  const title = decode(attr(html, /<title>(.*?)<\/title>/is))
  const description = decode(attr(html, /<meta[^>]+name="description"[^>]+content="([^"]*)"/i))
  if (!title) err(url, "missing <title>")
  else if (title.length > 65) warn(url, `title is ${title.length} chars (may be cut off)`)
  if (!description) err(url, "missing meta description")
  else if (description.length > 160) warn(url, `description is ${description.length} chars (cut off after ~160)`)

  const h1s = (html.match(/<h1[\s>]/gi) || []).length
  if (h1s !== 1) err(url, `${h1s} <h1> tags (need exactly 1)`)

  // Visible text in <main>, excluding scripts/styles
  const main = attr(html, /<main[^>]*>([\s\S]*?)<\/main>/i) || ""
  const text = main.replace(/<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>/gi, " ").replace(/<[^>]+>/g, " ").replace(/\s+/g, " ")
  const words = text.trim().split(" ").length
  const legal = /privacy|terms|disclaimer/.test(path)
  if (!legal && words < 300) warn(url, `only ~${words} words of content (thin pages often stay "Crawled - currently not indexed")`)

  for (const m of html.matchAll(/<a[^>]+href="(\/[^"#?]*)/g)) {
    const target = m[1].replace(/\/$/, "") || "/"
    if (target !== (path.replace(/\/$/, "") || "/")) linkedPaths.add(target)
  }
  pages.set(url, { title, description })
}

// Duplicates + orphans
const dupes = (key) => {
  const seen = new Map()
  for (const [url, p] of pages) if (p[key]) seen.set(p[key], [...(seen.get(p[key]) || []), url])
  for (const [val, list] of seen) if (list.length > 1) err(list.join(", "), `share the same ${key}: "${val}"`)
}
dupes("title")
dupes("description")
for (const url of pages.keys()) {
  const p = new URL(url).pathname.replace(/\/$/, "") || "/"
  if (p !== "/" && !linkedPaths.has(p)) err(url, "orphan page: no internal link points to it")
}

console.log(`Checked ${urls.length} URLs from ${base}/sitemap.xml (site host: ${siteHost})\n`)
if (warnings.length) console.log(`WARNINGS (${warnings.length})\n  ` + warnings.join("\n  ") + "\n")
if (errors.length) {
  console.log(`ERRORS (${errors.length})\n  ` + errors.join("\n  "))
  process.exit(1)
}
console.log("No indexing blockers found.")
