# The Printable Pack

Eight print-ready sheets for the 60-day system, plus a merged PDF pack. Every sheet is plain HTML
and CSS so you can edit, rebrand, translate, print, or sell your own edition.

## What is inside

| # | Sheet | Pages | Paper | Use |
| --- | --- | ---: | --- | --- |
| 00 | Cover | 1 | A4 portrait | The PDF pack cover (not a fillable sheet) |
| 01 | [The 60-Day Contract](01-contract.html) | 1 | A4 portrait | Niyyah, winning day, floor, rules, witness |
| 02 | [The Daily Page](02-daily.html) | 1 | A4 portrait | Prayers, Qur'an, guardrails, priorities, score |
| 03 | [The Weekly Review](03-weekly-review.html) | 1 | A4 portrait | Numbers, wins, leak, one change, witness |
| 04 | [The 60-Day Map](04-wall-map.html) | 1 | A4 portrait | Wall map of dates and held days |
| 05 | [The 60-Day Tracker](05-habit-tracker.html) | 2 | A4 landscape | Ten habits + daily score, days 1–30 and 31–60 |
| 06 | [The Milestone Review](06-milestone-review.html) | 2 | A4 portrait | Days 21, 42, 60 + the day-61 plan |
| 07 | [The Private Log](07-urge-log.html) | 1 | A4 portrait | Emergency protocol, urge log, return protocol |
| 08 | [The Qur'an Ledger](08-quran-log.html) | 1 | A4 portrait | 30 days of pages, surahs, and one ayah |

**PDFs:** [`pdf/00-complete-pack.pdf`](pdf/00-complete-pack.pdf) (all 11 pages) or the individual
files in [`pdf/`](pdf/).

## Printing

- Paper: **A4**.
- Scale: **100%** — do not use “fit to page”.
- Enable **background graphics** so the light shading and rules print.
- The habit tracker is **landscape**; everything else is portrait.
- The design is deliberately ink-light and remains readable in black and white.
- For a booklet, print double-sided and bind the daily pages separately; the daily page is designed
  to be reprinted as a stack.

## Editing

### Rebrand every sheet at once

Open [`brand.js`](brand.js) and change:

```js
window.PRINTABLE_BRAND = {
  name: 'Your Edition',
  tagline: 'Your tagline',
  footer: 'Your footer',
}
```

The names are applied to every element marked `data-brand`, `data-tagline`, or `data-footer`.

### Change the look

The palette lives at the top of [`print.css`](print.css):

```css
:root {
  --ink: #191917;
  --accent: #1e4b39;
  --gold: #8a6b2f;
  --paper: #ffffff;
  --wash: #f4f2ea;
}
```

Change `--accent` and `--gold` to rebrand. Keep `--ink` dark and `--paper` light for print.

### Change the fields or wording

Edit the HTML directly. Text fields use `contenteditable="true"` so the sheets can be filled on
screen before printing. Checkboxes are `<span class="box">` elements and can be clicked on screen
(they print as ticked if you click them before printing).

To add writing lines, copy a block like:

```html
<div class="lines" contenteditable="true" data-placeholder="Write here."></div>
```

Use `class="lines lg"` for taller lines. `data-placeholder` only appears on screen; it is hidden
when printing.

### Rebuild the PDFs

```bash
npm install
npm run printables:build
```

This uses the installed Microsoft Edge or Google Chrome (headless) to print each sheet and merge
them into `printables/pdf/00-complete-pack.pdf`. If neither browser is installed, edit the paths in
[`scripts/build-printables.mjs`](../scripts/build-printables.mjs).

To preview without making PDFs:

```bash
npm run printables:preview
```

PNG previews are written to `.openchamber/printable-previews/` (not committed).

## Selling or distributing an edition

The files are MIT licensed, so you may adapt and sell your own version. Do the following:

1. **Rebrand.** Change the name, tagline, and accent. Do not use the original programme's name,
   logo, or identity in a way that implies endorsement.
2. **Replace what you do not own.** Write your own lessons, examples, and worksheets. Inspiration is
   not a licence to copy another creator's course.
3. **Verify every reference.** Qur'anic translations are paraphrased here for readability. Before
   publishing for a paid audience, check the Arabic, the hadith sources, and the gradings with a
   qualified teacher.
4. **Keep the safety notes.** The disclaimers about scholarship, therapy, and compulsion are part of
   the product, not decoration.
5. **Price the structure, not salvation.** You are selling a planner and a system, not a guarantee.

This is not legal advice; if you are building a commercial edition, get proper advice on trade
marks and copyright in your jurisdiction.

## Privacy

Sheet 07 (The Private Log) is deliberately discreet and private. Do not collect it, photograph it,
or ask anyone to submit it. If you facilitate a circle, participants keep their own logs.

## File map

```
printables/
  index.html                  screen-only gallery
  print.css                   shared print/screen styles
  print.js                    print button, checkboxes, editable fields
  brand.js                    one-file rebrand
  00-cover.html
  01-contract.html
  02-daily.html
  03-weekly-review.html
  04-wall-map.html
  05-habit-tracker.html
  06-milestone-review.html
  07-urge-log.html
  08-quran-log.html
  pdf/                        generated PDFs
```