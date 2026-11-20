import { chromium } from 'playwright-core'
import { PDFDocument } from 'pdf-lib'
import { mkdirSync, readFileSync, readdirSync, writeFileSync, existsSync } from 'node:fs'
import { join, resolve } from 'node:path'
import { pathToFileURL } from 'node:url'

const root = process.cwd()
const printablesDir = join(root, 'printables')
const outDir = join(printablesDir, 'pdf')
mkdirSync(outDir, { recursive: true })

const SHEETS = [
  '01-contract.html',
  '02-daily.html',
  '03-weekly-review.html',
  '04-wall-map.html',
  '05-habit-tracker.html',
  '06-milestone-review.html',
  '07-urge-log.html',
  '08-quran-log.html',
]

const edgePaths = [
  'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
  'C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe',
]
const chromePaths = [
  'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
]
const executablePath = [...edgePaths, ...chromePaths].find((p) => existsSync(p))

if (!executablePath) {
  console.error('No Edge or Chrome installation found.')
  process.exit(1)
}

const browser = await chromium.launch({ executablePath, headless: true })
const page = await browser.newPage()
const generated = []

for (const sheet of SHEETS) {
  const source = join(printablesDir, sheet)
  const name = sheet.replace(/\.html$/, '.pdf')
  const target = join(outDir, name)
  await page.goto(pathToFileURL(source).href, { waitUntil: 'load' })
  await page.evaluate(() => document.fonts.ready)
  await page.waitForTimeout(250)
  await page.pdf({
    path: target,
    printBackground: true,
    preferCSSPageSize: true,
  })
  const bytes = readFileSync(target)
  generated.push({ name, bytes: bytes.length })
  console.log(`${name} — ${(bytes.length / 1024).toFixed(1)} KB`)
}

await browser.close()

// Merge into a single sellable pack.
const merged = await PDFDocument.create()
merged.setTitle('Mujāhid Mode · The Printable Pack')
merged.setAuthor('Mujāhid Mode')
merged.setSubject('A 60-day discipline operating system — printable planners and trackers')

for (const sheet of SHEETS) {
  const name = sheet.replace(/\.html$/, '.pdf')
  const doc = await PDFDocument.load(readFileSync(join(outDir, name)))
  const pages = await merged.copyPages(doc, doc.getPageIndices())
  pages.forEach((p) => merged.addPage(p))
}

const mergedBytes = await merged.save()
writeFileSync(join(outDir, '00-complete-pack.pdf'), mergedBytes)
console.log(`00-complete-pack.pdf — ${(mergedBytes.length / 1024).toFixed(1)} KB`)

const pdfs = readdirSync(outDir).filter((f) => f.endsWith('.pdf'))
console.log(`\n${generated.length} sheets + 1 merged pack written to printables/pdf (${pdfs.length} files).`)