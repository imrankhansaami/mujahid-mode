# Mujāhid Mode

**A 60-day discipline operating system for the Muslim who is done knowing and ready to do.**

[Live app](https://imrankhansaami.github.io/mujahid-mode/) · [The framework](docs/framework.md) · [Deploy to your own Pages](.github/workflows/deploy.yml)

Mujāhid Mode turns a curriculum into a working daily system: five prayers, a daily portion of
Qur'an, dhikr, one deep block, guarded attention, and lights out — logged honestly, reviewed
weekly, and built to survive the days you feel nothing.

It is a local-first PWA. No account, no server, no analytics. Your record stays in your browser.

<p align="center">
  <img src="docs/screenshots/today.jpg" width="31%" alt="Today: lesson focus, score, prayers, Quran, guardrails" />
  <img src="docs/screenshots/progress.jpg" width="31%" alt="Progress: consistency, 60-day heatmap and score" />
  <img src="docs/screenshots/journey.jpg" width="31%" alt="Journey: the 60-day map of modules and milestones" />
</p>

*Screenshots use sample data.*

```bash
npm install
npm run dev
```

---

## The system in one screen

| Loop | What happens |
| --- | --- |
| **Daily** | Five prayers (missed / late / on time / jamā'ah), Qur'an pages, dhikr, deep work, screen fast, sleep. A score out of 100, a 70-point "held" threshold. |
| **Weekly** | One review: three wins, one leak, one change. The score is a mirror, not a verdict. |
| **60 days** | 8 modules, 23 lessons, 3 milestones (days 21, 42, 60). Lessons land three times a week; the days between are for living the drills. |

**The rules of engagement**

1. Never miss twice.
2. The minimum viable day still counts.
3. Log honestly — a flattering log is a broken mirror.
4. Change one thing per week, not five.
5. Rest is part of the program, not a failure of it.

**Scoring**

| Component | Points |
| --- | --- |
| 5 prayers | 50 (10 each; late 5, missed 0) |
| Qur'an | 15 (9 for any reading, 15 at target) |
| Dhikr | 10 |
| Deep work | 10 |
| Screen fast | 10 |
| Lights out | 5 |

A day is **held** at 70. The weights keep the spine — salah and Qur'an — heavier than the rest.

---

## What is inside

- **Today** — the day's focus, lesson, score ring, prayer tracker, Qur'an counter, guardrails,
  drills, reflection, and the daily line.
- **Journey** — the full 60-day map: modules, lessons, scheduled days, completion, and milestones.
- **Lesson reader** — substantive lessons (6–8 min), ayah/hadith references, drills, reflection
  prompts, notes, and a mark-complete flow.
- **Barakah Planner** — three priorities, time blocks with a niyyah, a default day template.
- **Quran Guide** — level, daily target, a khatm projection, a 14-day chart, and honest logging.
- **Dopamine Reset** — baseline audit (screen hours, pickups, morning delay) and a 7-day,
  35-rule protocol.
- **Lust Mastery** — the emergency protocol, a private urge log with outcomes, and a return plan
  without shame.
- **Journal** — prompts, free writing, search, and a private archive.
- **Progress** — 60-day heatmap, weekly rhythm, prayer breakdown, adherence by category,
  milestones, and the weekly review.
- **Settings** — profile, plan, backup/restore JSON, and a full reset.

## The written pack

Beyond the app, the repository now includes an editable, sellable content layer:

- **[The framework manuscript](content/framework/mujahid-mode-framework.md)** — the full thinking:
  diagnosis, the five layers, the daily/weekly/60-day loops, tools, facilitation, and appendices.
- **[The worksheet pack](content/framework/worksheets.md)** — ten fillable Markdown worksheets.
- **[The curriculum](content/curriculum/mujahid-mode-curriculum.md)** — all 23 lessons in one
  manuscript, plus per-module files, a 60-day schedule, lesson index, and a facilitator overview.
- **[The printable pack](printables/README.md)** — eight print-ready planners and trackers (contract,
  daily page, weekly review, wall map, 60-day tracker, milestone review, private log, Qur'an ledger).
  Print from the HTML or use the **[complete PDF](printables/pdf/00-complete-pack.pdf)**.

Everything is editable: the Markdown can be typeset into a book or imported into a course platform,
and the printables are plain HTML/CSS with a one-file rebrand (`printables/brand.js`).

<p align="center">
  <img src="docs/screenshots/printable-contract.png" width="44%" alt="Printable 60-day contract sheet" />
  <img src="docs/screenshots/printable-tracker.png" width="54%" alt="Printable 60-day habit tracker" />
</p>

## Stack

- React 19 + TypeScript + Vite
- Tailwind CSS v4
- Zustand with `persist` (localStorage)
- React Router (hash routing for static hosting)
- `vite-plugin-pwa` (installable, offline)
- Lucide icons, bundled Inter + Fraunces variable fonts

No backend. Export/import is JSON.

## Development

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # type-check + production build
npm test           # plan, scoring, and streak tests
npm run content:build     # export the Markdown curriculum from the app data
npm run printables:build  # generate the printable PDFs (needs Edge or Chrome)
npm run printables:preview # PNG previews of every printable sheet
npm run preview    # serve the build
npm run icons      # regenerate PWA icons from public/icon.svg (sharp)
```

### Project layout

```
src/
  data/curriculum.ts      # modules + lessons (the content)
  lib/plan.ts             # the 60-day schedule generator
  lib/stats.ts            # scoring, streaks, summaries
  lib/date.ts             # local-date helpers (no UTC drift)
  store/useStore.ts       # persisted state + actions
  components/             # shell, UI primitives, daily system, lesson renderer
  pages/                  # onboarding, today, journey, lesson, tools, progress, settings
docs/framework.md         # the framework, developer overview
content/                  # the written pack (framework, worksheets, curriculum)
printables/               # print-ready HTML sheets + generated PDFs
scripts/                  # content export, printable build, icon generation
```

To add or edit a lesson, change `src/data/curriculum.ts`. The plan automatically slots lessons
into the teaching days in order; the app derives all progress from lesson IDs.

To change the daily weighting, edit `src/lib/stats.ts` (keep the prayer spine heavier). To change
the floor or the 70-point threshold, edit `isHeld`.

## Deploying

The included workflow deploys to GitHub Pages on every push to `main`.

1. Push the repository.
2. **Settings → Pages → Build and deployment → Source: GitHub Actions**.
3. The workflow sets `VITE_BASE` to `/<repo-name>/` automatically. If you rename the repo, no
   change is needed. If you use a custom domain or a `<user>.github.io` repo, set `VITE_BASE: /`
   in `.github/workflows/deploy.yml`.

The app uses hash routing, so deep links work on Pages without a 404 rewrite.

## Data and privacy

Everything is stored under the localStorage key `mujahid-mode-v1` on the device. Nothing is sent
anywhere. Use **Settings → Export JSON** before changing devices or clearing browser data.
The Lust Mastery log is deliberately local-only; treat it as private.

## A note on the source

This is an independent, local-first implementation inspired by the public Mujāhid Mode
curriculum (8 modules, 23 lessons, tools, drills, milestone weeks). It is not the paid course and
does not reproduce its videos or PDFs. The written lessons here are a practical synthesis for
personal use.

Qur'anic translations are paraphrased for readability and cited by surah and ayah. Hadith are
attributed where a collection is known; wording and gradings vary. For worship, rulings, and
anything binding, return to the Arabic, the scholars, and a qualified teacher. This app is not a
substitute for scholarly guidance, therapy, or medical care.

## License

MIT — see [LICENSE](LICENSE).