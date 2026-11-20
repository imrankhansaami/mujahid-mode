import { mkdirSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { ALL_LESSONS, MODULES } from '../src/data/curriculum'
import { SLOTS } from '../src/lib/plan'
import type { Block, Lesson, PlanDayType } from '../src/types'

const root = process.cwd()
const outDir = join(root, 'content', 'curriculum')
mkdirSync(outDir, { recursive: true })

const pad = (n: number) => String(n).padStart(2, '0')

const typeLabel: Record<PlanDayType, string> = {
  lesson: 'Lesson',
  apply: 'Field day',
  review: 'Weekly review',
  milestone: 'Milestone',
  integration: 'Integration',
}

function renderBlock(block: Block): string {
  switch (block.kind) {
    case 'p':
      return block.text
    case 'h':
      return `### ${block.text}`
    case 'list':
      return block.items.map((item) => `- ${item}`).join('\n')
    case 'quote':
      return `> “${block.text}”\n>\n> — *${block.source}*`
    case 'ayah': {
      const arabic = block.arabic ? `> **${block.arabic}**\n>\n` : ''
      return `${arabic}> “${block.translation}”\n>\n> — *${block.source}*`
    }
    case 'drill':
      return `> **Practice.** ${block.text}`
    default:
      return ''
  }
}

function renderLesson(lesson: Lesson): string {
  const body = lesson.blocks.map(renderBlock).join('\n\n')
  const drills = lesson.drills
    .map(
      (drill) =>
        `- **${drill.title}** — *${drill.cadence} · ${drill.minutes} min*\n  ${drill.instruction}`,
    )
    .join('\n')
  const prompts = lesson.prompts.map((prompt, i) => `${i + 1}. ${prompt}`).join('\n')

  return `## Lesson ${lesson.order} · ${lesson.title}

*${lesson.subtitle}*

**The big idea.** ${lesson.bigIdea}

${body}

### Drills

${drills}

### Reflection

${prompts}

### Notes

Name: ______________________________  Date: ______________

_______________________________________________________________

_______________________________________________________________

_______________________________________________________________

_______________________________________________________________
`
}

function renderModule(mod: (typeof MODULES)[number]): string {
  const lessons = mod.lessons.map(renderLesson).join('\n\n---\n\n')
  const minutes = mod.lessons.reduce((sum, l) => sum + l.minutes, 0)
  const drills = mod.lessons.reduce((sum, l) => sum + l.drills.length, 0)
  return `---
title: "${mod.title}"
module: ${mod.order}
arabic: "${mod.arabic ?? ''}"
subtitle: "${mod.subtitle}"
lessons: ${mod.lessons.length}
reading_time_minutes: ${minutes}
---

# Module ${pad(mod.order)} · ${mod.title}

${mod.arabic ? `**${mod.arabic}**\n\n` : ''}*${mod.subtitle}*

> **Thesis.** ${mod.thesis}

**Lessons:** ${mod.lessons.length} · **Reading time:** ${minutes} minutes · **Drills:** ${drills}

---

${lessons}

---

## Before you move on

- Re-read your notes from this module.
- Pick the one drill you will keep for the rest of the sixty days.
- Name the one thing you are still avoiding.
- Write it in your journal before the next lesson.

*Mujāhid Mode · Module ${pad(mod.order)} · ${mod.title}*
`
}

const moduleFiles: string[] = []
MODULES.forEach((mod) => {
  const name = `module-${pad(mod.order)}-${mod.slug}.md`
  writeFileSync(join(outDir, name), renderModule(mod))
  moduleFiles.push(name)
})

const lessonRows = ALL_LESSONS.map((lesson) => {
  const mod = MODULES.find((m) => m.id === lesson.moduleId)
  return `| ${lesson.order} | ${lesson.title} | ${mod?.title ?? ''} | ${lesson.minutes} min | ${lesson.drills.length} |`
}).join('\n')

const index = `# Curriculum index

**Mujāhid Mode · The Disciplined Muslim Code**

Eight modules. Twenty-three lessons. Sixty days. Three milestones.

## Start here

1. [How to run the 60 days](00-overview.md)
2. [The 60-day schedule](60-day-schedule.md)
3. [Lesson index](lesson-index.md)
4. [The complete curriculum in one file](mujahid-mode-curriculum.md)

## Modules

${MODULES.map(
  (m) =>
    `- [Module ${pad(m.order)} · ${m.title}](module-${pad(m.order)}-${m.slug}.md) — ${m.lessons.length} lessons · ${m.subtitle}`,
).join('\n')}

## Before you read

This curriculum is a practical synthesis written for personal and educational use. It is inspired
by the public Mujāhid Mode programme but is not that paid course, and it does not reproduce its
videos or PDFs.

Qur'anic translations are paraphrased for readability and cited by surah and ayah. Hadith are
attributed where a collection is known; wording and gradings vary. For worship, rulings, and
anything binding, return to the Arabic, the scholars, and a qualified teacher. This is not a
substitute for scholarly guidance, therapy, or medical care.
`

writeFileSync(join(outDir, 'README.md'), index)

const scheduleRows = SLOTS.map((slot) => {
  const lesson = slot.lessonId ? ALL_LESSONS.find((l) => l.id === slot.lessonId) : undefined
  const week = Math.min(9, Math.ceil(slot.day / 7))
  const lessonCell = lesson ? `Lesson ${lesson.order} · ${lesson.title}` : '—'
  return `| ${slot.day} | ${week} | ${typeLabel[slot.type]} | ${lessonCell} | ${slot.focus} |`
}).join('\n')

const schedule = `# The 60-day schedule

Sixty days, one focus per day. The teaching rhythm is three lessons per week — days 1, 3 and 5 of
each week. The days between are **field days**: no new input, just the drills and the five
commitments. Day 6 is the weekly review. Day 7 is integration: family, masjid, rest, and a walk
without a phone.

The milestones fall on days 21, 42 and 60.

| Day | Week | Type | Lesson | Focus |
| ---: | ---: | --- | --- | --- |
${scheduleRows}

## The five commitments (every day)

1. Five prayers — on time where possible.
2. A daily portion of Qur'an.
3. Dhikr.
4. One protected deep block.
5. Guarded attention: screen fast, phone outside the bedroom, lights out.

## The floor (worst days)

Five prayers · one page of Qur'an · one honest log · one small action.

## The rule above all rules

**Never miss twice.**

*Mujāhid Mode · The 60-day schedule*
`

writeFileSync(join(outDir, '60-day-schedule.md'), schedule)

const lessonIndex = `# Lesson index

| # | Lesson | Module | Reading | Drills |
| ---: | --- | --- | ---: | ---: |
${lessonRows}

**Total:** ${ALL_LESSONS.length} lessons · ${ALL_LESSONS.reduce((sum, l) => sum + l.minutes, 0)} minutes of reading · ${ALL_LESSONS.reduce((sum, l) => sum + l.drills.length, 0)} drills.

*Mujāhid Mode · Lesson index*
`

writeFileSync(join(outDir, 'lesson-index.md'), lessonIndex)

const combined = `---
title: "Mujāhid Mode · The Disciplined Muslim Code"
subtitle: "A 60-day curriculum for the Muslim who is done knowing and ready to do"
edition: "First edition"
---

# Mujāhid Mode

## The Disciplined Muslim Code

**A 60-day curriculum for the Muslim who is done knowing and ready to do.**

Eight modules · Twenty-three lessons · Three milestones

---

> You are one decision away from never wasting your time again.
>
> Not because you will try harder this time. Because you are about to enter a structure that keeps
> working when motivation leaves the room.

<div style="page-break-after: always;"></div>

## How to use this book

This is the reading edition of the curriculum. It is meant to be worked, not consumed. Read one
lesson at a time, do the drills on the day they are given, and write in the margins.

The complete daily system — scoring, prayers, Qur'an, tools, and trackers — lives in the
companion app and printable pack. The short version:

1. Read the lesson for the day.
2. Do the drills before you sleep.
3. Answer at least one reflection prompt.
4. Keep the five commitments: prayers, Qur'an, dhikr, deep work, guarded attention.
5. Review the week on day six. Change one thing.

The lessons are grouped into eight modules. Each module ends with a short "before you move on"
checkpoint. Three milestones — days 21, 42 and 60 — ask you to stop, review the record honestly,
and consolidate before moving forward.

**A note on sources.** Qur'anic translations are paraphrased for readability and cited by surah
and ayah. Hadith are attributed where a collection is known; wording and gradings vary. For
worship, rulings, and anything binding, return to the Arabic, the scholars, and a qualified
teacher. This is not a substitute for scholarly guidance, therapy, or medical care.

## Contents

${MODULES.map(
  (mod) =>
    `**Module ${pad(mod.order)} · ${mod.title}**\n${mod.lessons
      .map((l) => `- Lesson ${l.order} · ${l.title}`)
      .join('\n')}`,
).join('\n\n')}

${MODULES.map((mod) => {
  const lessons = mod.lessons
    .map(
      (l) =>
        `## Lesson ${l.order} · ${l.title}\n\n*${l.subtitle}*\n\n**The big idea.** ${l.bigIdea}\n\n${l.blocks
          .map(renderBlock)
          .join('\n\n')}\n\n### Drills\n\n${l.drills
          .map((d) => `- **${d.title}** — *${d.cadence} · ${d.minutes} min*\n  ${d.instruction}`)
          .join('\n')}\n\n### Reflection\n\n${l.prompts.map((p, i) => `${i + 1}. ${p}`).join('\n')}\n`,
    )
    .join('\n\n---\n\n')

  return `<div style="page-break-after: always;"></div>

# Module ${pad(mod.order)} · ${mod.title}

${mod.arabic ? `**${mod.arabic}**\n\n` : ''}*${mod.subtitle}*

> **Thesis.** ${mod.thesis}

---

${lessons}

## Before you move on

- Re-read your notes from this module.
- Pick the one drill you will keep for the rest of the sixty days.
- Name the one thing you are still avoiding.
- Write it in your journal before the next lesson.`
}).join('\n\n')}

<div style="page-break-after: always;"></div>

# After day sixty

The map ends; the mission does not. On day 61 you keep the five commitments, the weekly review,
and one shipped deliverable. Write the next horizon:

- **One outcome for the next 90 days:** ______________________________________
- **One weekly deliverable:** ______________________________________
- **One witness:** ______________________________________
- **One thing I will stop:** ______________________________________

*Move with niyyah, not hesitation.*

---

*Mujāhid Mode · The Disciplined Muslim Code · First edition*
`

writeFileSync(join(outDir, 'mujahid-mode-curriculum.md'), combined)

console.log(`Exported ${MODULES.length} modules, ${ALL_LESSONS.length} lessons`)
console.log(`Wrote ${moduleFiles.length + 4} files to content/curriculum`)