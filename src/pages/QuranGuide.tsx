import { Link } from 'react-router-dom'
import { ArrowLeft, BookOpen, CalendarCheck, Minus, Plus, Target } from 'lucide-react'
import { useStore } from '../store/useStore'
import { addDays, formatMedium, todayKey } from '../lib/date'
import { PageHeader, SectionTitle, StatTile } from '../components/ui'
import { QuranTracker } from '../components/DailySystem'

const MUSHAF_PAGES = 604

const LEVELS = [
  {
    key: 'beginner' as const,
    label: 'Beginner',
    target: 1,
    body: 'One page a day, read slowly, with the translation of at least one ayah. Consistency beats volume while the habit is forming.',
  },
  {
    key: 'returning' as const,
    label: 'Returning',
    target: 2,
    body: 'Two to four pages a day. If you have been away for years, do not attempt a khatm in a month. Rebuild the relationship first.',
  },
  {
    key: 'established' as const,
    label: 'Established',
    target: 5,
    body: 'Five or more pages a day, with a fixed time after Fajr. Keep one day a week lighter so the plan survives real life.',
  },
]

export function QuranGuide() {
  const state = useStore()
  const updateProfile = useStore((s) => s.updateProfile)
  const today = todayKey()
  const target = state.profile.quranTarget || 1
  const todayPages = state.days[today]?.quranPages ?? 0
  const allLogs = Object.values(state.days)
  const totalPages = allLogs.reduce((sum, d) => sum + (d.quranPages || 0), 0)
  const daysRead = allLogs.filter((d) => (d.quranPages || 0) > 0).length
  const khatmDays = Math.ceil(MUSHAF_PAGES / target)
  const finishDate = addDays(today, khatmDays - 1)

  const last14 = Array.from({ length: 14 }).map((_, i) => {
    const date = addDays(today, i - 13)
    return { date, pages: state.days[date]?.quranPages ?? 0 }
  })
  const maxPages = Math.max(target, ...last14.map((d) => d.pages), 1)

  return (
    <div className="animate-rise">
      <Link to="/tools" className="mb-6 inline-flex items-center gap-1.5 text-xs text-faint hover:text-gold">
        <ArrowLeft className="h-3.5 w-3.5" /> Tools
      </Link>

      <PageHeader
        eyebrow="Tool 02 · the daily portion"
        title="Quran Guide"
        description="A plan sized to your season, not to your guilt. The goal is a relationship, not a number."
      />

      <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <StatTile label="Today" value={`${todayPages} p`} sub={`target ${target}`} accent />
        <StatTile label="Pages logged" value={totalPages} sub="all time in this app" />
        <StatTile label="Days reading" value={daysRead} sub="not necessarily consecutive" />
        <StatTile label="A khatm" value={`${khatmDays}d`} sub={`at ${target} page${target === 1 ? '' : 's'}/day`} />
      </div>

      <div className="grid gap-5 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="space-y-5">
          <div className="card p-5 sm:p-6">
            <SectionTitle title="Today’s portion" hint="Log it honestly; the number is a servant" />
            <QuranTracker date={today} log={state.days[today]} target={target} />
          </div>

          <div className="card p-5 sm:p-6">
            <SectionTitle title="The last fourteen days" hint="Bars are pages; the line is your target" />
            <div className="relative flex h-32 items-end gap-1.5">
              <div
                className="pointer-events-none absolute inset-x-0 border-t border-dashed border-gold/30"
                style={{ bottom: `${(target / maxPages) * 100}%` }}
              />
              {last14.map((d) => (
                <div key={d.date} className="group flex flex-1 flex-col items-center gap-1.5">
                  <div className="flex h-[6.5rem] w-full items-end">
                    <div
                      className={`w-full rounded-t-[3px] transition-colors ${
                        d.pages >= target ? 'bg-gold' : d.pages > 0 ? 'bg-gold/35' : 'bg-line-soft'
                      }`}
                      style={{ height: `${Math.max(2, (d.pages / maxPages) * 100)}%` }}
                      title={`${formatMedium(d.date)}: ${d.pages} pages`}
                    />
                  </div>
                  <span className="text-[0.55rem] text-faint">
                    {new Date(d.date + 'T00:00:00').toLocaleDateString(undefined, { weekday: 'narrow' })}
                  </span>
                </div>
              ))}
            </div>
            <p className="mt-3 flex items-center gap-1.5 text-[0.65rem] text-faint">
              <Target className="h-3.5 w-3.5 text-gold" /> {target} pages a day. At this pace a full
              mushaf takes about {khatmDays} days — around {formatMedium(finishDate)}.
            </p>
          </div>
        </div>

        <div className="space-y-5">
          <div className="card p-5 sm:p-6">
            <SectionTitle title="Your level and target" hint="Change the season, not the standard" />
            <div className="space-y-2">
              {LEVELS.map((level) => (
                <button
                  key={level.key}
                  type="button"
                  onClick={() => updateProfile({ quranLevel: level.key, quranTarget: level.target })}
                  className={`w-full rounded-xl border px-4 py-3 text-left transition-colors ${
                    state.profile.quranLevel === level.key
                      ? 'border-gold/40 bg-gold/[0.06]'
                      : 'border-line bg-coal hover:border-line-soft'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span
                      className={`text-sm font-medium ${
                        state.profile.quranLevel === level.key ? 'text-gold' : 'text-bone'
                      }`}
                    >
                      {level.label}
                    </span>
                    <span className="text-[0.65rem] text-faint">{level.target} p/day default</span>
                  </div>
                  <p className="mt-1 text-[0.7rem] leading-relaxed text-faint">{level.body}</p>
                </button>
              ))}
            </div>

            <div className="mt-4 flex items-center justify-between rounded-xl border border-line-soft bg-coal px-3 py-3">
              <span className="text-xs text-muted">Daily target</span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  className="flex h-7 w-7 items-center justify-center rounded-full border border-line text-muted hover:text-bone"
                  onClick={() => updateProfile({ quranTarget: Math.max(1, target - 1) })}
                  aria-label="Lower target"
                >
                  <Minus className="h-3.5 w-3.5" />
                </button>
                <span className="w-8 text-center font-display text-xl text-gold">{target}</span>
                <button
                  type="button"
                  className="flex h-7 w-7 items-center justify-center rounded-full border border-line text-muted hover:text-bone"
                  onClick={() => updateProfile({ quranTarget: Math.min(30, target + 1) })}
                  aria-label="Raise target"
                >
                  <Plus className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          </div>

          <div className="card p-5 sm:p-6">
            <SectionTitle title="Read for transformation" hint="Not for the counter" />
            <div className="space-y-3">
              {[
                'Read at the same time every day — after Fajr is the anchor.',
                'Read one ayah with its meaning, even on your lightest day.',
                'Keep a pencil. Mark what moves you; return to it in the weekly review.',
                'When you miss, use the floor: one page. Never zero.',
              ].map((line) => (
                <p key={line} className="flex gap-2.5 text-xs leading-relaxed text-muted">
                  <BookOpen className="mt-0.5 h-3.5 w-3.5 shrink-0 text-gold/70" />
                  {line}
                </p>
              ))}
            </div>
            <div className="mt-4 flex items-center gap-2 rounded-xl border border-line-soft bg-coal px-3 py-2.5 text-[0.68rem] text-faint">
              <CalendarCheck className="h-3.5 w-3.5 text-gold" />
              Plan started {formatMedium(state.quran.planStarted)}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}