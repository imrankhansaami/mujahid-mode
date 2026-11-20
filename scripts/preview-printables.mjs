import { chromium } from 'playwright-core'
import { existsSync, mkdirSync } from 'node:fs'
import { join } from 'node:path'
import { pathToFileURL } from 'node:url'

const root = process.cwd()
const outDir = join(root, '.openchamber', 'printable-previews')
mkdirSync(outDir, { recursive: true })

const executablePath = [
  'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
  'C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe',
  'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
].find((p) => existsSync(p))

const browser = await chromium.launch({ executablePath, headless: true })

const files = [
  '01-contract',
  '02-daily',
  '03-weekly-review',
  '04-wall-map',
  '05-habit-tracker',
  '06-milestone-review',
  '07-urge-log',
  '08-quran-log',
]

for (const file of files) {
  const page = await browser.newPage({ viewport: { width: 1300, height: 1200 } })
  await page.goto(pathToFileURL(join(root, 'printables', `${file}.html`)).href, { waitUntil: 'load' })
  await page.evaluate(() => document.fonts.ready)
  const sheets = page.locator('.sheet')
  const count = await sheets.count()
  for (let i = 0; i < count; i += 1) {
    const name = count > 1 ? `${file}-p${i + 1}.png` : `${file}.png`
    await sheets.nth(i).screenshot({ path: join(outDir, name) })
    console.log(name)
  }
  await page.close()
}

await browser.close()