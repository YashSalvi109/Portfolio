/**
 * Generates optimised images from public/profile.jpeg:
 *   public/profile.webp          – ~800px tall WebP used in the Hero/About (original JPEG is the fallback)
 *   public/favicon.png           – 64px circular face crop
 *   public/favicon-32.png        – 32px circular face crop
 *   public/apple-touch-icon.png  – 180px square face crop
 *   public/og-image.jpg          – 1200x630 social share card
 *
 * Run with: npm run images   (re-run whenever profile.jpeg changes, then commit the outputs)
 * Name and headline on the OG card are read from src/data/profile.ts at runtime via a tiny regex
 * so this script has no TypeScript dependency.
 */
import sharp from 'sharp'
import { readFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import path from 'node:path'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const pub = (f) => path.join(root, 'public', f)
const SRC = pub('profile.jpeg')

// Face-centred square crop inside the 1024x1536 portrait. Adjust if the photo changes.
const FACE = { left: 220, top: 100, width: 640, height: 640 }

const NAVY = '#0B1B33'
const SKY = '#7DD3FC'

async function readProfileStrings() {
  const src = await readFile(path.join(root, 'src/data/profile.ts'), 'utf8')
  const pick = (key) => src.match(new RegExp(`${key}:\\s*'([^']+)'`))?.[1] ?? ''
  return { name: pick('name'), headline: pick('headline'), location: pick('location') }
}

const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

async function main() {
  const meta = await sharp(SRC).metadata()
  console.log(`source: ${meta.width}x${meta.height}`)

  // 1. Hero WebP (~800px tall)
  await sharp(SRC).resize({ height: 800 }).webp({ quality: 82 }).toFile(pub('profile.webp'))

  // 2. Face crops
  const face = sharp(SRC).extract(FACE)
  const faceBuf = await face.toBuffer()

  const circle = (size) =>
    Buffer.from(`<svg width="${size}" height="${size}"><circle cx="${size / 2}" cy="${size / 2}" r="${size / 2}" fill="#fff"/></svg>`)

  for (const [file, size] of [['favicon.png', 64], ['favicon-32.png', 32]]) {
    await sharp(faceBuf)
      .resize(size, size)
      .composite([{ input: circle(size), blend: 'dest-in' }])
      .png()
      .toFile(pub(file))
  }
  await sharp(faceBuf).resize(180, 180).png().toFile(pub('apple-touch-icon.png'))

  // 3. Open Graph card (1200x630): navy gradient, text left, portrait right with a fade
  const { name, headline, location } = await readProfileStrings()
  const W = 1200
  const H = 630
  const photoW = 520
  const photo = await sharp(SRC)
    .extract({ left: 120, top: 40, width: 860, height: 1042 })
    .resize(photoW, H)
    .toBuffer()
  const fade = Buffer.from(
    `<svg width="${photoW}" height="${H}"><defs><linearGradient id="f" x1="0" x2="1"><stop offset="0" stop-color="#fff" stop-opacity="0"/><stop offset=".35" stop-color="#fff" stop-opacity="1"/></linearGradient></defs><rect width="100%" height="100%" fill="url(#f)"/></svg>`,
  )
  const fadedPhoto = await sharp(photo).composite([{ input: fade, blend: 'dest-in' }]).png().toBuffer()

  const bg = Buffer.from(`
  <svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <radialGradient id="g1" cx="15%" cy="10%" r="70%"><stop offset="0" stop-color="#1E3A6E"/><stop offset="1" stop-color="#05070D"/></radialGradient>
      <radialGradient id="g2" cx="60%" cy="100%" r="50%"><stop offset="0" stop-color="${SKY}" stop-opacity=".18"/><stop offset="1" stop-color="${SKY}" stop-opacity="0"/></radialGradient>
    </defs>
    <rect width="100%" height="100%" fill="url(#g1)"/>
    <rect width="100%" height="100%" fill="url(#g2)"/>
    <rect x="80" y="200" width="56" height="4" rx="2" fill="${SKY}"/>
    <text x="80" y="300" font-family="Helvetica Neue, Helvetica, Arial, sans-serif" font-size="76" font-weight="700" fill="#F8FAFC">${esc(name)}</text>
    <text x="80" y="362" font-family="Helvetica Neue, Helvetica, Arial, sans-serif" font-size="34" fill="${SKY}">${esc(headline)}</text>
    <text x="80" y="420" font-family="Helvetica Neue, Helvetica, Arial, sans-serif" font-size="26" fill="#94A3B8">${esc(location)}</text>
  </svg>`)

  await sharp({ create: { width: W, height: H, channels: 3, background: NAVY } })
    .composite([
      { input: bg, left: 0, top: 0 },
      { input: fadedPhoto, left: W - photoW, top: 0 },
    ])
    .jpeg({ quality: 86, mozjpeg: true })
    .toFile(pub('og-image.jpg'))

  console.log('done: profile.webp, favicon.png, favicon-32.png, apple-touch-icon.png, og-image.jpg')
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
