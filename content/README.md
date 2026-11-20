# The Written Pack

The editable, sellable writing that goes with the app. Everything here is Markdown (except the
printable HTML/PDF pack), so it can be edited in any text editor, imported into a course platform,
or typeset into a book.

## What is inside

| Folder | What it contains |
| --- | --- |
| [`framework/mujahid-mode-framework.md`](framework/mujahid-mode-framework.md) | The full framework manuscript: diagnosis, five layers, daily/weekly/60-day operating system, tools, facilitation, appendices. |
| [`framework/worksheets.md`](framework/worksheets.md) | Ten fillable worksheets: cost ledger, baseline, contract, winning day, trigger map, environment redesign, weekly review, milestone review, mission, day-61 plan. |
| [`curriculum/00-overview.md`](curriculum/00-overview.md) | How to run the sixty days: rhythm, scoring, milestones, facilitation, adaptation, safety. |
| [`curriculum/mujahid-mode-curriculum.md`](curriculum/mujahid-mode-curriculum.md) | The complete curriculum in one file, for ebook/PDF export. |
| [`curriculum/module-01-awakening.md`](curriculum/module-01-awakening.md) … `module-08-digital-purity.md` | One file per module: all lessons, drills, reflection prompts, and notes space. |
| [`curriculum/60-day-schedule.md`](curriculum/60-day-schedule.md) | Every day, week, type, lesson, and focus in one table. |
| [`curriculum/lesson-index.md`](curriculum/lesson-index.md) | The 23 lessons with module, reading time, and drill count. |

## How the Markdown was made

The curriculum files are exported from the app's source of truth (`src/data/curriculum.ts`), so the
digital system and the written edition stay consistent. To regenerate them after editing the app
content:

```bash
npm run content:build
```

**Warning:** regeneration overwrites the module files, the schedule, the index, and the combined
curriculum. If you want to edit the Markdown as your master copy, stop regenerating — or copy the
files to a new edition folder first.

The framework manuscript and worksheets are hand-written and are never overwritten.

## How to publish it

### As a PDF or ebook

1. Open the Markdown in your editor (Obsidian, Typora, VS Code with a Markdown PDF extension) or
   import it into Pandoc.
2. Use A4 or 6×9 inches, a serif body, and generous margins.
3. Keep the page breaks between modules and before the appendices.
4. Check every ayah and hadith against a printed copy before publishing.

Example with Pandoc:

```bash
pandoc curriculum/mujahid-mode-curriculum.md \
  -o mujahid-mode-curriculum.pdf \
  --pdf-engine=xelatex \
  -V geometry:a4paper \
  -V mainfont="Georgia" \
  -V fontsize=11pt
```

(You will need a LaTeX distribution for that command. Any Markdown-to-PDF tool is fine.)

### As a course platform

- One module per section.
- One lesson per page.
- Put the drills in a checklist block and the reflection prompts in a text field.
- Use the printable pack for the downloads.
- Keep the weekly review as a live call or a shared form.

### As a facilitated cohort

The overview contains a nine-week plan and a 60-minute circle format. The framework manuscript's
Part VI goes deeper into facilitation, including how to protect privacy around the lust mastery
material.

## Selling an edition

The writing here is an independent synthesis. It is inspired by the public Mujāhid Mode programme
but is not that programme, and it does not reproduce its videos or PDFs.

If you sell an edition:

- **Rebrand.** Do not imply endorsement by the original creator. Check the trade mark position of
  the name in your market.
- **Write your own lessons** where you want a different voice, examples, or audience. The Markdown
  is a starting point, not a licence to republish someone else's course.
- **Verify references.** Translations are paraphrased for readability; hadith wording and gradings
  vary. Have a qualified teacher review anything you publish.
- **Keep the disclaimers.** No substitute for scholarship, therapy, or medical care.
- **Price honestly.** You are selling structure and facilitation.

The repository is MIT licensed. That covers the code and documents in this repository; it does not
grant rights to another person's brand, course, or protected content.

## A note on the religious content

Qur'anic translations are paraphrased and cited by surah and ayah. Hadith are attributed where a
collection is known; wording and gradings vary. For worship, rulings, and anything binding, return
to the Arabic, the scholars, and a qualified teacher.

If a behaviour feels compulsive — especially in the area of lust — treat it as a health issue and
seek qualified help. Taking the means is part of tawakkul, not a lack of faith.