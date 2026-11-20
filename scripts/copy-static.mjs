import { cpSync, existsSync, mkdirSync } from 'node:fs'
import { join } from 'node:path'

const root = process.cwd()
const dist = join(root, 'dist')

if (!existsSync(dist)) {
  console.error('dist/ does not exist — run vite build first.')
  process.exit(1)
}

for (const folder of ['printables', 'content']) {
  const from = join(root, folder)
  const to = join(dist, folder)
  if (!existsSync(from)) continue
  mkdirSync(to, { recursive: true })
  cpSync(from, to, { recursive: true })
  console.log(`copied ${folder}/ → dist/${folder}/`)
}