import { chromium } from 'playwright-core'
import { existsSync } from 'node:fs'
import { join, resolve } from 'node:path'
import { pathToFileURL } from 'node:url'

const root = process.cwd()
const executablePath = [
  'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
  'C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe',
  'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
].find((p) => existsSync(p))

const browser = await chromium.launch({ executablePath, headless: true })
const page = await browser.newPage({ viewport: { width: 794, height: 1123 } })
await page.emulateMedia({ media: 'print' })

const files = [
  '00-cover.html',
  '01-contract.html',
  '02-daily.html',
  '03-weekly-review.html',
  '04-wall-map.html',
  '05-habit-tracker.html',
  '06-milestone-review.html',
  '07-urge-log.html',
  '08-quran-log.html',
]

for (const file of files) {
  await page.goto(pathToFileURL(join(root, 'printables', file)).href, { waitUntil: 'load' })
  await page.evaluate(() => document.fonts.ready)
  const data = await page.evaluate(() => {
    const sheets = [...document.querySelectorAll('.sheet')].map((s) => {
      const r = s.getBoundingClientRect()
      return Math.round(r.height)
    })
    return { sheets, body: Math.round(document.body.getBoundingClientRect().height) }
  })
  const mm = data.sheets.map((px) => (px / 3.7795).toFixed(1))
  console.log(file, '| sheets px:', data.sheets.join(','), '| mm:', mm.join(','))
}

await browser.close()