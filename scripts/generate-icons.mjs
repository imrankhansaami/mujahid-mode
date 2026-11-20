import sharp from 'sharp'
import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const svg = readFileSync(join(root, 'public', 'icon.svg'))

const targets = [
  [join(root, 'public', 'pwa-192.png'), 192],
  [join(root, 'public', 'pwa-512.png'), 512],
  [join(root, 'public', 'apple-touch-icon.png'), 180],
]

for (const [path, size] of targets) {
  await sharp(svg, { density: 384 }).resize(size, size).png().toFile(path)
  console.log(`wrote ${path}`)
}