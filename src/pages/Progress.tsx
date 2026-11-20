import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Check, Flag, Trophy } from 'lucide-react'
import { useStore } from '../store/useStore'
import { planFor } from '../lib/plan'
import { formatMedium, todayKey } from '../lib/date'
import { summarize, TOTAL_DAYS } from '../lib/stats'
import {
  Badge,
  Callout,
  PageHeader,
  ProgressBar,
  SectionTitle,
  StatTile,
} from '../components/ui'
import { cn } from '../lib/cn'

export function Progress() {
  const state = useStore()
  const today = todayKey()
  const summary = summarize(state, today)
  const plan = useMemo(() => planFor(state.profile), [state.profile.startDate])
  const elapsed = summary.daysElapsed

  const weekScores = Array.from({ length: 9 }).map((_, i) => {
    const week = i + 1
    const days = Array.from({ length: 7 })
      .map((_, j) => week * 7 + j + 1)
      .filter((d) => d <= elapsed)
    if (days.length === 0) return null
    const sum = days.reduce((acc, d) => acc + (summary.scoresByDay[d] ?? 0), 0)
    return Math.round(sum / days.length)
  })

  const prayerTotal = elapsed * 5
  const prayerLogged =
    summary.prayersOnTime + summary.prayersJamaah + summary.prayersLate + summary.prayersMissed
  const prayerPct = (n: number) => (prayerTotal > 0 ? Math.round((n / prayerTotal) * 100) : 0)

  const categories = [
    { label: 'Prayer on time', value: summary.prayersOnTime + summary.prayersJamaah, max: prayerTotal },
    { label: 'Quran opened', value: summary.quranDays, max: elapsed },
    { label: 'Dhikr', value: summary.dhikrDays, max: elapsed },
    { label: 'Deep work', value: summary.deepWorkDays, max: elapsed },
    { label: 'Screen fast', value: summary.screenFastDays, max: elapsed },
    { label: 'Lights out', value: summary.sleepDays, max: elapsed },
  ]

  const currentWeek = Math.min(9, Math.max(1, Math.ceil(elapsed / 7)))
  const [week, setWeek] = useState(currentWeek)
  const existing = state.reviews[week]
  const weekAvg = (() => {
    const days = Array.from({ length: 7 })
      .map((_, j) => (week - 1) * 7 + j + 1)
      .filter((d) => d <= elapsed)
    if (!days.length) return 0
    return Math.round(days.reduce((acc, d) => acc + (summary.scoresByDay[d] ?? 0), 0) / days.length)
  })()

  return (
    <div className="animate-rise">
      <PageHeader
        eyebrow="The record"
        title="What the days actually say."
        description="Not a scoreboard to perform for. A mirror to learn from — and then to close, and go live another day."
        action={
          <Link to="/tools/planner" className="btn-outline">
            Plan today <ArrowRight className="h-4 w-4" />
          </Link>
        }
      />

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <StatTile label="Consistency" value={`${summary.consistency}%`} sub="days held over days lived" accent />
        <StatTile label="Days held" value={`${summary.daysHeld}/${elapsed}`} sub="70 points or more" />
        <StatTile label="Average score" value={summary.avgScore} sub="out of 100" />
        <StatTile label="Best streak" value={summary.bestStreak} sub={`current ${summary.currentStreak}`} />
      </div>

      <section className="card mt-6 p-5 sm:p-6">
        <SectionTitle
          title="The sixty days"
          hint="Every square is a day you actually lived"
          action={<Badge tone="gold"><span className="whitespace-nowrap">Day {Math.max(1, elapsed)} of 60</span></Badge>}
        />
        <div className="grid grid-cols-10 gap-1.5">
          {Array.from({ length: TOTAL_DAYS }).map((_, i) => {
            const day = i + 1
            const score = summary.scoresByDay[day]
            const future = day > elapsed
            const planDay = plan.find((p) => p.day === day)
            const isToday = planDay?.date === today
            let color = 'bg-line-soft'
            let text = 'text-faint'
            if (!future && score !== undefined) {
              if (score >= 90) {
                color = 'bg-gold'
                text = 'text-ink'
              } else if (score >= 70) {
                color = 'bg-emerald/70'
                text = 'text-ink'
              } else if (score >= 40) {
                color = 'bg-amber/45'
                text = 'text-bone'
              } else if (score > 0) {
                color = 'bg-danger/45'
                text = 'text-bone'
              }
            }
            return (
              <div
                key={day}
                title={`Day ${day}${planDay ? ` · ${formatMedium(planDay.date)}` : ''} · ${
                  future ? 'not yet lived' : score ? `${score}/100` : 'unlogged'
                }`}
                className={cn(
                  'flex aspect-square items-center justify-center rounded-[4px] text-[0.55rem] font-medium transition-colors sm:text-[0.65rem]',
                  color,
                  text,
                  future && 'border border-line-soft bg-transparent text-faint/50',
                  isToday && 'ring-1 ring-gold ring-offset-1 ring-offset-surface',
                )}
              >
                {day}
              </div>
            )
          })}
        </div>
        <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-[0.65rem] text-faint">
          <span className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-[3px] bg-gold" /> 90+</span>
          <span className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-[3px] bg-emerald/70" /> held</span>
          <span className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-[3px] bg-amber/45" /> partial</span>
          <span className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-[3px] bg-danger/45" /> barely</span>
          <span className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-[3px] bg-line-soft" /> unlogged</span>
          <span className="ml-auto">{summary.quranPages} pages · {summary.prayersJamaah} jamāʿah · {summary.deepWorkDays} deep days</span>
        </div>
      </section>

      <div className="mt-6 grid gap-5 lg:grid-cols-2">
        <section className="card p-5 sm:p-6">
          <SectionTitle title="The weekly rhythm" hint="Averages, not verdicts" />
          <div className="flex h-40 items-end gap-2">
            {weekScores.map((score, i) => (
              <div key={i} className="flex flex-1 flex-col items-center gap-1.5">
                <span className="text-[0.58rem] text-faint">{score ?? ''}</span>
                <div className="flex h-28 w-full items-end">
                  <div
                    className={cn(
                      'w-full rounded-t-[3px] transition-colors',
                      score === null
                        ? 'bg-line-soft/40'
                        : i + 1 === currentWeek
                          ? 'bg-gold'
                          : 'bg-gold/35',
                    )}
                    style={{ height: `${score ?? 3}%` }}
                    title={score !== null ? `Week ${i + 1}: ${score}/100` : 'Not yet lived'}
                  />
                </div>
                <span className={cn('text-[0.6rem]', i + 1 === currentWeek ? 'text-gold' : 'text-faint')}>
                  W{i + 1}
                </span>
              </div>
            ))}
          </div>
        </section>

        <section className="card p-5 sm:p-6">
          <SectionTitle title="The prayers" hint="The spine of every held day" />
          <div className="flex h-3 w-full overflow-hidden rounded-full bg-line-soft">
            <div className="bg-gold" style={{ width: `${prayerPct(summary.prayersJamaah)}%` }} />
            <div className="bg-emerald/70" style={{ width: `${prayerPct(summary.prayersOnTime)}%` }} />
            <div className="bg-amber/60" style={{ width: `${prayerPct(summary.prayersLate)}%` }} />
            <div className="bg-danger/60" style={{ width: `${prayerPct(summary.prayersMissed)}%` }} />
          </div>
          <div className="mt-4 grid grid-cols-2 gap-y-2.5 text-xs">
            {[
              ['Jamāʿah', summary.prayersJamaah, 'bg-gold'],
              ['On time', summary.prayersOnTime, 'bg-emerald/70'],
              ['Late', summary.prayersLate, 'bg-amber/60'],
              ['Missed', summary.prayersMissed, 'bg-danger/60'],
              ['Unlogged', Math.max(0, prayerTotal - prayerLogged), 'bg-line-soft'],
            ].map(([label, count, color]) => (
              <div key={String(label)} className="flex items-center gap-2 text-muted">
                <span className={cn('h-2 w-2 rounded-full', String(color))} />
                <span>{label}</span>
                <span className="ml-auto mr-4 text-bone">{count}</span>
              </div>
            ))}
          </div>
          <p className="mt-4 text-[0.65rem] leading-relaxed text-faint">
            {prayerLogged === 0
              ? 'Nothing logged yet. The first honest prayer is the beginning of the record.'
              : `${prayerPct(summary.prayersOnTime + summary.prayersJamaah)}% of logged slots were on time or in jamāʿah.`}
          </p>
        </section>
      </div>

      <section className="card mt-6 p-5 sm:p-6">
        <SectionTitle title="Where the system is holding" hint="Percentages of days lived" />
        <div className="grid gap-x-8 gap-y-4 sm:grid-cols-2">
          {categories.map((cat) => {
            const pct = cat.max > 0 ? Math.round((cat.value / cat.max) * 100) : 0
            return (
              <div key={cat.label}>
                <div className="mb-1.5 flex items-baseline justify-between text-xs">
                  <span className="text-muted">{cat.label}</span>
                  <span className="text-bone">{pct}%</span>
                </div>
                <ProgressBar value={pct} tone={pct >= 70 ? 'emerald' : 'gold'} />
              </div>
            )
          })}
        </div>
      </section>

      <section className="mt-6 grid gap-3 sm:grid-cols-3">
        {plan
          .filter((d) => d.type === 'milestone')
          .map((m) => {
            const reached = elapsed >= m.day
            return (
              <div
                key={m.day}
                className={cn(
                  'card p-4',
                  reached ? 'border-gold/25 bg-gold/[0.04]' : '',
                )}
              >
                <div className="flex items-center justify-between">
                  <Badge tone={reached ? 'gold' : 'neutral'}>
                    {reached ? <Trophy className="h-3 w-3" /> : <Flag className="h-3 w-3" />}
                    Day {m.day}
                  </Badge>
                  <span className="text-[0.62rem] text-faint">{formatMedium(m.date)}</span>
                </div>
                <p className="mt-2.5 text-sm font-medium text-bone">{m.title}</p>
                <p className="mt-1 text-[0.68rem] leading-relaxed text-faint">{m.focus}</p>
                <p className="mt-2 text-[0.6rem] uppercase tracking-[0.14em] text-faint">
                  {reached ? 'Reached — review it' : 'Ahead'}
                </p>
              </div>
            )
          })}
      </section>

      <section className="card mt-6 p-5 sm:p-6" id="weekly-review">
        <SectionTitle
          title="The weekly review"
          hint="One win, one leak, one change"
          action={
            <select
              className="field w-auto py-1.5 text-xs"
              value={week}
              onChange={(e) => setWeek(Number(e.target.value))}
            >
              {Array.from({ length: 9 }).map((_, i) => (
                <option key={i} value={i + 1}>
                  Week {i + 1}
                </option>
              ))}
            </select>
          }
        />
        <p className="mb-4 text-[0.7rem] text-faint">
          Week score: <span className="text-gold">{weekAvg}/100</span> · {existing ? `saved ${new Date(existing.savedAt).toLocaleDateString()}` : 'not saved yet'}
        </p>
        <ReviewForm
          key={`${week}-${existing?.savedAt ?? 'new'}`}
          week={week}
          score={weekAvg}
          initialWins={existing?.wins ?? ''}
          initialLeaks={existing?.leaks ?? ''}
          initialChange={existing?.oneChange ?? ''}
        />
      </section>

      <div className="mt-6">
        <Callout tone="emerald" title="How the score works">
          Prayers 50 points (on time or jamāʿah 10 each, late 5, missed 0), Quran 15 (9 for any
          reading, 15 at target), dhikr 10, deep work 10, screen fast 10, lights out 5. A day is
          held at 70. The weights exist to keep the spine — salah and Quran — heavier than the rest.
        </Callout>
      </div>

      <div className="mt-3 flex items-center justify-between rounded-2xl border border-line-soft bg-coal px-5 py-4">
        <p className="text-xs text-muted">
          {summary.daysElapsed < TOTAL_DAYS
            ? `${TOTAL_DAYS - summary.daysElapsed} days remain. Keep the floor.`
            : 'Sixty days lived. The record is yours.'}
        </p>
        <Link to="/journey" className="inline-flex items-center gap-1.5 text-xs text-gold hover:underline">
          Continue the map <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>
    </div>
  )
}

function ReviewForm({
  week,
  score,
  initialWins,
  initialLeaks,
  initialChange,
}: {
  week: number
  score: number
  initialWins: string
  initialLeaks: string
  initialChange: string
}) {
  const saveReview = useStore((s) => s.saveReview)
  const [wins, setWins] = useState(initialWins)
  const [leaks, setLeaks] = useState(initialLeaks)
  const [oneChange, setOneChange] = useState(initialChange)
  const [saved, setSaved] = useState(false)

  function save() {
    saveReview({
      week,
      wins,
      leaks,
      oneChange,
      score,
      savedAt: new Date().toISOString(),
    })
    setSaved(true)
    window.setTimeout(() => setSaved(false), 2400)
  }

  return (
    <div className="grid gap-3 sm:grid-cols-3">
      <label className="block">
        <span className="eyebrow">Three wins</span>
        <textarea
          className="field mt-1.5 min-h-24 resize-y"
          value={wins}
          onChange={(e) => setWins(e.target.value)}
          placeholder="What actually worked?"
        />
      </label>
      <label className="block">
        <span className="eyebrow">The one leak</span>
        <textarea
          className="field mt-1.5 min-h-24 resize-y"
          value={leaks}
          onChange={(e) => setLeaks(e.target.value)}
          placeholder="Where did the week drain?"
        />
      </label>
      <label className="block">
        <span className="eyebrow">One change</span>
        <textarea
          className="field mt-1.5 min-h-24 resize-y"
          value={oneChange}
          onChange={(e) => setOneChange(e.target.value)}
          placeholder="Not five. One."
        />
      </label>
      <div className="sm:col-span-3 flex justify-end">
        <button type="button" className="btn-outline px-3.5 py-2 text-xs" onClick={save}>
          {saved ? <Check className="h-3.5 w-3.5" /> : null}
          {saved ? 'Saved' : 'Save the review'}
        </button>
      </div>
    </div>
  )
}