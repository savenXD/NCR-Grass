// Mobile Lighthouse over the main pages. Needs a production server: npm run build && npm run start
// Usage: node scripts/perf.mjs [baseUrl]   (default http://localhost:3000)
import { execFileSync } from "node:child_process"
import { mkdtempSync, readFileSync } from "node:fs"
import { tmpdir } from "node:os"
import { join } from "node:path"

const base = process.argv[2] ?? "http://localhost:3000"
const pages = ["/", "/services", "/about", "/service-areas", "/service-areas/dasna", "/blog", "/contact", "/faq"]
const dir = mkdtempSync(join(tmpdir(), "lh-"))
const BUDGET = 90

let failed = false
for (const [i, p] of pages.entries()) {
  const out = join(dir, `${i}.json`)
  execFileSync(
    "npx",
    ["-y", "lighthouse@12", base + p, "--preset=perf", "--form-factor=mobile", "--screenEmulation.mobile", "--chrome-flags=--headless=new --no-sandbox", "--output=json", `--output-path=${out}`, "--quiet"],
    { stdio: "ignore", env: { ...process.env, CHROME_PATH: process.env.CHROME_PATH ?? "/usr/bin/google-chrome" } }
  )
  const r = JSON.parse(readFileSync(out, "utf8"))
  const a = r.audits
  const score = Math.round(r.categories.performance.score * 100)
  if (score < BUDGET) failed = true
  console.log(`${String(score).padStart(3)}  ${p.padEnd(24)} FCP ${a["first-contentful-paint"].displayValue}  LCP ${a["largest-contentful-paint"].displayValue}  TBT ${a["total-blocking-time"].displayValue}  CLS ${a["cumulative-layout-shift"].displayValue}  ${a["total-byte-weight"].displayValue.replace("Total size was ", "")}`)
}
if (failed) {
  console.error(`\nBelow the ${BUDGET} budget on at least one page.`)
  process.exit(1)
}
