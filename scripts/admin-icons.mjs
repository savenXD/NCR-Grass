// Builds the /admin PWA icons from public/logo.svg (white emblem) on black.
// Run: node scripts/admin-icons.mjs
import sharp from "sharp"
import { mkdir, readFile } from "node:fs/promises"

const BG = "#000000" // keep in sync with background_color / theme_color in public/admin/manifest.webmanifest and admin/layout.tsx
const logo = await readFile("public/logo.svg")
await mkdir("public/admin", { recursive: true })

async function icon(size, file, scale) {
  const mark = await sharp(logo, { density: 600 }).resize(Math.round(size * scale), Math.round(size * scale), { fit: "contain" }).png().toBuffer()
  await sharp({ create: { width: size, height: size, channels: 4, background: BG } })
    .composite([{ input: mark, gravity: "centre" }])
    .png({ compressionLevel: 9 })
    .toFile(`public/admin/${file}`)
}

await icon(192, "icon-192.png", 0.72)
await icon(512, "icon-512.png", 0.72)
await icon(512, "icon-maskable-512.png", 0.5) // maskable: keep the mark inside the 80% safe zone
await icon(180, "apple-touch-icon.png", 0.72)
console.log("admin icons written")
