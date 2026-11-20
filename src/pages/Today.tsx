import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowRight,
  BookOpen,
  CalendarDays,
  Check,
  ChevronLeft,
  ChevronRight,
  Circle,
  Compass,
  Flame,
  PenLine,
  Sparkles,
} from 'lucide-react'
import { useStore } from '../store/useStore'
import { getLesson, getModule } from '../data/curriculum'
import { planFor } from '../lib/plan'
import { addDays, diffDays, formatLong, formatMedium, todayKey } from '../lib/date'
import {
  currentPlanDay,
  isHeld,
  scoreDay,
  scoreLabel,
  streak,
  summarize,
} from '../lib/stats'
import { cn } from '../lib/cn'
import { Badge, Callout, PageHeader, ProgressBar, Ring, SectionTitle } from '../components/ui'
import { Commitments, PrayerTracker, QuranTracker } from '../components/DailySystem'
import { drillKey } from '../store/useStore'
import type { Drill, PlanDay } from '../types'

const TYPE_LABEL: Record<PlanDay['type'], string> = {
  lesson: 'Lesson',
  apply: 'Field day',
  review: 'Weekly review',
  integration: 'Integration',
  milestone: 'Milestone',
}

export function Today() {
  const state = useStore()
  const today = todayKey()
  const [date, setDate] = useState(today)
  const { profile } = state
  const plan = useMemo(() => planFor(profile), [profile.startDate])
  const planEnd = addDays(profile.startDate, 59)
  const latest = planEnd < today ? planEnd : today
  const rawDay = useMemo(
    () => diffDays(profile.startDate, date) + 1,
    [profile.startDate, date],
  )
  const day = Math.min(60, Math.max(1, rawDay))
  const planDay = plan.find((d) => d.day === day)
  const lesson = planDay?.lessonId ? getLesson(planDay.lessonId) : undefined
  const mod = lesson ? getModule(lesson.moduleId) : undefined
  const log = state.days[date]
  const target = profile.quranTarget || 1
  const score = scoreDay(log, target)
  const held = isHeld(score)
  const summary = summarize(state, today)
  const currentStreak = streak(state.days, profile, today)
  const lessonDone = lesson ? Boolean(state.lessonsDone[lesson.id]) : false
  const dayNumber = currentPlanDay(profile)
  const isToday = date === today
  const canBrowse = rawDay >= 1 && rawDay <= 60

  if (rawDay < 1) return <BeforeStart startDate={profile.startDate} today={today} />

  return (
    <div className="animate-rise">
      <PageHeader
        eyebrow={`${formatLong(date)} · Week ${Math.min(9, Math.ceil(day / 7))}`}
        title={
          <>
            {greetingForNow()}
            {profile.name ? <span className="text-gold">, {profile.name.split(' ')[0]}</span> : null}
          </>
        }
        description={
          rawDay > 60
            ? 'The sixty days are complete. The system is yours now — keep the five, keep the review, keep the return.'
            : isToday
              ? 'One day. Five commitments. No negotiation with the mood.'
              : 'A day already lived. Tell the truth about it, then return to today.'
        }
        action={
          <div className="flex flex-wrap items-center gap-2">
            {!isToday && canBrowse ? <Badge tone="neutral">Reviewing</Badge> : null}
            <Badge tone="gold">
              <span className="whitespace-nowrap">Day {dayNumber} / 60</span>
            </Badge>
            <Badge tone={currentStreak > 0 ? 'emerald' : 'neutral'}>
              <Flame className="h-3 w-3" /> {currentStreak} streak
            </Badge>
          </div>
        }
      />

      {canBrowse ? (
        <div className="mb-4 flex items-center justify-between gap-2 rounded-xl border border-line bg-surface px-2.5 py-2">
          <button
            type="button"
            aria-label="Previous day"
            disabled={date <= profile.startDate}
            onClick={() => setDate(addDays(date, -1))}
            className="flex h-7 w-7 items-center justify-center rounded-full text-muted transition-colors hover:bg-raised hover:text-bone disabled:opacity-25"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <div className="flex min-w-0 items-center gap-2 text-[0.7rem]">
            <CalendarDays className="h-3.5 w-3.5 shrink-0 text-gold" />
            <span className="truncate text-bone sm:hidden">{isToday ? 'Today' : formatMedium(date)}</span>
            <span className="hidden truncate text-faint sm:inline">{formatLong(date)}</span>
          </div>
          <div className="flex shrink-0 items-center gap-2">
            {!isToday ? (
              <button
                type="button"
                onClick={() => setDate(today)}
                className="text-[0.65rem] text-gold hover:underline"
              >
                Back to today
              </button>
            ) : null}
            <button
              type="button"
              aria-label="Next day"
              disabled={date >= latest}
              onClick={() => setDate(addDays(date, 1))}
              className="flex h-7 w-7 items-center justify-center rounded-full text-muted transition-colors hover:bg-raised hover:text-bone disabled:opacity-25"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      ) : null}

      {rawDay > 60 ? (
        <div className="mb-6">
          <Callout tone="emerald" title="The Return">
            You finished the map, not the mission. Day 61 runs on the same five commitments, one
            weekly review, and one shipped deliverable. <Link to="/progress" className="text-gold underline-offset-2 hover:underline">Read your record</Link>.
          </Callout>
        </div>
      ) : null}

      <section className="card relative overflow-hidden">
        <div className="geo pointer-events-none absolute inset-0 opacity-70" />
        <div className="relative grid gap-8 p-6 sm:p-8 lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <Badge tone={planDay?.type === 'milestone' ? 'gold' : 'neutral'}>
                <Sparkles className="h-3 w-3" />
                {planDay ? TYPE_LABEL[planDay.type] : 'Open day'}
              </Badge>
              {mod ? <span className="chip">{mod.title}</span> : null}
              {lesson ? <span className="chip">{lesson.minutes} min read</span> : null}
            </div>

            <h2 className="display mt-4 max-w-2xl text-3xl leading-[1.08] text-balance sm:text-[2.6rem]">
              {rawDay > 60 ? 'The work continues.' : planDay?.title ?? 'Today'}
            </h2>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted">
              {rawDay > 60
                ? 'You have the structure. Now the structure has to hold without a countdown. Pray, read, build, guard the gates, review weekly.'
                : planDay?.focus}
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-2.5">
              {lesson ? (
                <Link to={`/lesson/${lesson.id}`} className="btn-gold">
                  {lessonDone ? 'Read it again' : 'Open the lesson'}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              ) : planDay?.type === 'milestone' ? (
                <Link to="/progress" className="btn-gold">
                  Open the milestone
                  <ArrowRight className="h-4 w-4" />
                </Link>
              ) : planDay?.type === 'review' ? (
                <Link to="/progress" className="btn-gold">
                  Start the review
                  <ArrowRight className="h-4 w-4" />
                </Link>
              ) : (
                <Link to="/tools/planner" className="btn-gold">
                  Plan the day
                  <ArrowRight className="h-4 w-4" />
                </Link>
              )}
              <Link to="/journey" className="btn-outline">
                <Compass className="h-4 w-4" /> The map
              </Link>
              {lessonDone ? (
                <span className="inline-flex items-center gap-1.5 text-xs text-emerald">
                  <Check className="h-3.5 w-3.5" /> Lesson complete
                </span>
              ) : null}
            </div>

            {lesson && mod ? (
              <div className="mt-6 flex flex-wrap items-center gap-3 text-[0.7rem] text-faint">
                <span className="inline-flex items-center gap-1.5">
                  <BookOpen className="h-3.5 w-3.5" /> Lesson {lesson.order} of 23
                </span>
                <span className="h-1 w-1 rounded-full bg-line" />
                <span>{mod.subtitle}</span>
              </div>
            ) : null}
          </div>

          <div className="flex items-center justify-between gap-6 border-t border-line-soft pt-6 lg:flex-col lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
            <Ring value={score} label={isToday ? 'today' : 'that day'} sub={held ? 'held' : scoreLabel(score)} />
            <div className="space-y-3 text-right lg:text-center">
              <div>
                <p className="font-display text-2xl text-bone">{summary.consistency}%</p>
                <p className="text-[0.62rem] uppercase tracking-[0.18em] text-faint">consistency</p>
              </div>
              <div>
                <p className="font-display text-2xl text-bone">{summary.daysHeld}</p>
                <p className="text-[0.62rem] uppercase tracking-[0.18em] text-faint">days held</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="mt-6 grid gap-5 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="card p-5 sm:p-6">
          <PrayerTracker date={date} log={log} />
          <div className="mt-6 border-t border-line-soft pt-5">
            <QuranTracker date={date} log={log} target={target} />
          </div>
          <div className="mt-6 border-t border-line-soft pt-5">
            <Commitments date={date} log={log} />
          </div>
        </div>

        <div className="space-y-5">
          <DrillsCard lessonDrills={lesson?.drills ?? []} hasLesson={Boolean(lesson)} planDay={planDay} date={date} />
          <ReflectionCard prompts={lesson?.prompts ?? genericPrompts(planDay)} date={date} />
        </div>
      </div>

      <div className="mt-6 grid gap-5 lg:grid-cols-[1.05fr_0.95fr]">
        <DayNote key={date} date={date} initial={log?.note ?? ''} />
        <div className="space-y-4">
          <Callout tone="gold" title="The floor">
            On a bad day, five prayers, one page, one honest log, one small action. The floor is not
            a compromise — it is how the identity survives.
          </Callout>
          <div className="card p-5">
            <SectionTitle title="The week so far" hint="Consistency, not intensity" />
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs text-muted">
                <span>Days held</span>
                <span className="text-bone">
                  {summary.daysHeld} / {summary.daysElapsed}
                </span>
              </div>
              <ProgressBar value={summary.daysHeld} max={Math.max(1, summary.daysElapsed)} />
              <div className="flex items-center justify-between text-xs text-muted">
                <span>Average score</span>
                <span className="text-bone">{summary.avgScore} / 100</span>
              </div>
              <ProgressBar value={summary.avgScore} tone="bone" />
            </div>
            <Link
              to="/progress"
              className="mt-4 inline-flex items-center gap-1.5 text-xs text-gold hover:underline"
            >
              Open the full record <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

function greetingForNow(): string {
  const h = new Date().getHours()
  if (h < 5) return 'Still awake'
  if (h < 12) return 'Good morning'
  if (h < 17) return 'Good afternoon'
  return 'Good evening'
}

function DrillsCard({
  lessonDrills,
  hasLesson,
  planDay,
  date,
}: {
  lessonDrills: Drill[]
  hasLesson: boolean
  planDay?: PlanDay
  date: string
}) {
  const drills = useStore((s) => s.drills)
  const toggleDrill = useStore((s) => s.toggleDrill)

  if (!hasLesson) {
    return (
      <div className="card p-5 sm:p-6">
        <SectionTitle title="Today’s work" hint={planDay ? TYPE_LABEL[planDay.type] : 'Keep the system'} />
        <div className="space-y-3 text-sm text-muted">
          <p className="leading-relaxed">
            {planDay?.focus ?? 'No new input. Keep the five commitments and the floor.'}
          </p>
          <div className="rounded-xl border border-line-soft bg-coal p-4">
            <p className="text-xs font-medium text-bone">Suggested next action</p>
            <p className="mt-1 text-xs leading-relaxed text-faint">
              Repeat one drill from your last lesson, review your weekly numbers, or take a walk
              without your phone. Motion beats analysis today.
            </p>
          </div>
        </div>
        <div className="mt-4 flex gap-2">
          <Link to="/journey" className="btn-outline text-xs">
            Browse lessons
          </Link>
          <Link to="/progress" className="btn-ghost text-xs">
            See progress
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="card p-5 sm:p-6">
      <SectionTitle title="Today’s drills" hint="Action, not consumption" />
      <div className="space-y-2.5">
        {lessonDrills.map((drill) => {
          const key = drillKey(drill, date)
          const done = Boolean(drills[key])
          return (
            <button
              key={drill.id}
              type="button"
              onClick={() => toggleDrill(key)}
              className={cn(
                'flex w-full items-start gap-3 rounded-xl border px-3.5 py-3 text-left transition-colors',
                done ? 'border-emerald/35 bg-emerald/[0.06]' : 'border-line bg-coal hover:border-line-soft',
              )}
            >
              {done ? (
                <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-emerald text-ink">
                  <Check className="h-3 w-3" strokeWidth={3} />
                </span>
              ) : (
                <Circle className="mt-0.5 h-4 w-4 shrink-0 text-faint" />
              )}
              <span>
                <span className={cn('block text-xs font-medium', done ? 'text-emerald' : 'text-bone')}>
                  {drill.title}
                </span>
                <span className="mt-1 block text-[0.7rem] leading-relaxed text-faint">
                  {drill.instruction}
                </span>
                <span className="mt-1.5 block text-[0.6rem] uppercase tracking-[0.16em] text-faint">
                  {drill.cadence} · {drill.minutes} min
                </span>
              </span>
            </button>
          )
        })}
      </div>
    </div>
  )
}

const GENERIC_PROMPTS = [
  'Where did I feel resistance today, and what was underneath it?',
  'What did I do today that the man I am becoming would do again?',
  'What am I pretending not to see?',
]

function genericPrompts(planDay?: PlanDay): string[] {
  if (planDay?.type === 'milestone' || planDay?.type === 'review') {
    return [
      'What actually changed in the last stretch — not in feeling, in behaviour?',
      'Which commitment am I protecting, and which am I performing?',
    ]
  }
  return GENERIC_PROMPTS
}

function ReflectionCard({ prompts, date }: { prompts: string[]; date: string }) {
  const addJournal = useStore((s) => s.addJournal)
  const [prompt, setPrompt] = useState(prompts[0] ?? GENERIC_PROMPTS[0])
  const [body, setBody] = useState('')
  const [saved, setSaved] = useState(false)

  function save() {
    if (!body.trim()) return
    addJournal({ date, prompt, body: body.trim() })
    setBody('')
    setSaved(true)
    window.setTimeout(() => setSaved(false), 2400)
  }

  return (
    <div className="card p-5 sm:p-6">
      <SectionTitle title="Reflection" hint="Two minutes, honest" />
      <div className="mb-3 flex flex-wrap gap-1.5">
        {prompts.slice(0, 2).map((p) => (
          <button
            key={p}
            type="button"
            onClick={() => setPrompt(p)}
            className={cn(
              'rounded-full border px-2.5 py-1 text-left text-[0.65rem] leading-tight transition-colors',
              prompt === p
                ? 'border-gold/40 bg-gold/10 text-gold'
                : 'border-line text-faint hover:text-muted',
            )}
          >
            {p.length > 48 ? `${p.slice(0, 48)}…` : p}
          </button>
        ))}
      </div>
      <p className="mb-2 text-xs leading-relaxed text-muted">{prompt}</p>
      <textarea
        value={body}
        onChange={(e) => setBody(e.target.value)}
        aria-label="Today's reflection"
        placeholder="Write it plainly. No one is grading this."
        className="field min-h-24 resize-y"
      />
      <div className="mt-3 flex items-center justify-between">
        <Link to="/tools/journal" className="text-[0.7rem] text-faint hover:text-gold">
          Open journal
        </Link>
        <button type="button" className="btn-outline px-3 py-1.5 text-xs" onClick={save} disabled={!body.trim()}>
          {saved ? (
            <>
              <Check className="h-3.5 w-3.5" /> Saved
            </>
          ) : (
            <>
              <PenLine className="h-3.5 w-3.5" /> Save entry
            </>
          )}
        </button>
      </div>
    </div>
  )
}

function DayNote({ date, initial }: { date: string; initial: string }) {
  const setDayNote = useStore((s) => s.setDayNote)
  const [value, setValue] = useState(initial)
  const [saved, setSaved] = useState(false)

  return (
    <div className="card p-5 sm:p-6">
      <SectionTitle title="A line for the record" hint="The log is a mirror, not a courtroom" />
      <textarea
        value={value}
        onChange={(e) => {
          setValue(e.target.value)
          setSaved(false)
        }}
        onBlur={() => {
          setDayNote(date, value.trim())
          setSaved(true)
        }}
        aria-label="Note for the day"
        placeholder="What happened today that tomorrow-you needs to know?"
        className="field min-h-24 resize-y"
      />
      <p className="mt-2 text-[0.68rem] text-faint">
        {saved ? 'Saved.' : 'Saved when you tap away.'}
      </p>
    </div>
  )
}

function BeforeStart({ startDate, today }: { startDate: string; today: string }) {
  const updateProfile = useStore((s) => s.updateProfile)
  return (
    <div className="animate-rise">
      <PageHeader
        eyebrow={formatMedium(today)}
        title="The countdown is yours to end."
        description={`Your sixty days are set to begin on ${formatLong(startDate)}. There is no sacred reason to wait.`}
      />
      <div className="card geo p-8">
        <p className="max-w-xl text-sm leading-relaxed text-muted">
          Start dates are where discipline goes to negotiate. If you are here, and you are able,
          begin today. The first day does not need to be perfect. It needs to happen.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <button
            type="button"
            className="btn-gold"
            onClick={() => updateProfile({ startDate: today })}
          >
            Begin today <ArrowRight className="h-4 w-4" />
          </button>
          <Link to="/settings" className="btn-outline">
            Change the date
          </Link>
        </div>
      </div>
    </div>
  )
}