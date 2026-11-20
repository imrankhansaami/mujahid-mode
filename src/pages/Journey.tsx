import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Check, ChevronRight, Circle, Flag, Trophy } from 'lucide-react'
import { useStore } from '../store/useStore'
import { MODULES } from '../data/curriculum'
import { planFor } from '../lib/plan'
import { formatMedium, todayKey } from '../lib/date'
import { summarize } from '../lib/stats'
import { cn } from '../lib/cn'
import { Badge, PageHeader, ProgressBar, StatTile } from '../components/ui'

export function Journey() {
  const state = useStore()
  const today = todayKey()
  const plan = useMemo(() => planFor(state.profile), [state.profile.startDate])
  const summary = summarize(state, today)
  const lessonsDone = Object.keys(state.lessonsDone).length
  const milestones = plan.filter((d) => d.type === 'milestone')

  return (
    <div className="animate-rise">
      <PageHeader
        eyebrow="The sixty-day map"
        title="One lesson at a time."
        description="Eight modules, twenty-three lessons, three milestones. Read in order, or return to a battlefield when you need it. The map is not a race."
        action={
          <Link to="/today" className="btn-gold">
            Today <ArrowRight className="h-4 w-4" />
          </Link>
        }
      />

      <div className="mb-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <StatTile label="Lessons" value={`${lessonsDone}/23`} sub="completed" accent />
        <StatTile label="Days held" value={summary.daysHeld} sub={`of ${summary.daysElapsed} lived`} />
        <StatTile label="Consistency" value={`${summary.consistency}%`} sub="since day one" />
        <StatTile label="Best streak" value={summary.bestStreak} sub="days in a row" />
      </div>

      <div className="mb-8 grid gap-3 sm:grid-cols-3">
        {milestones.map((m) => {
          const reached = today >= m.date
          return (
            <Link
              key={m.day}
              to="/progress"
              className={cn(
                'card-soft group p-4 transition-colors hover:border-gold-dim',
                reached && 'border-gold/25 bg-gold/[0.04]',
              )}
            >
              <div className="flex items-center justify-between">
                <Badge tone={reached ? 'gold' : 'neutral'}>
                  {reached ? <Trophy className="h-3 w-3" /> : <Flag className="h-3 w-3" />}
                  Day {m.day}
                </Badge>
                <span className="text-[0.65rem] text-faint">{formatMedium(m.date)}</span>
              </div>
              <p className="mt-3 text-sm font-medium text-bone">{m.title}</p>
              <p className="mt-1 line-clamp-2 text-[0.7rem] leading-relaxed text-faint">{m.focus}</p>
            </Link>
          )
        })}
      </div>

      <div className="space-y-5">
        {MODULES.map((mod) => {
          const done = mod.lessons.filter((l) => state.lessonsDone[l.id]).length
          return (
            <section key={mod.id} className="card overflow-hidden">
              <header className="border-b border-line-soft bg-coal/60 px-5 py-5 sm:px-6">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="eyebrow text-gold">
                        Module {String(mod.order).padStart(2, '0')}
                      </span>
                      {mod.arabic ? <span className="arabic text-sm text-faint">{mod.arabic}</span> : null}
                    </div>
                    <h2 className="display mt-1.5 text-2xl text-bone">{mod.title}</h2>
                    <p className="mt-0.5 text-xs text-muted">{mod.subtitle}</p>
                  </div>
                  <div className="min-w-[7rem]">
                    <div className="flex items-center justify-between text-[0.65rem] text-faint">
                      <span>{done}/{mod.lessons.length}</span>
                      <span>{Math.round((done / mod.lessons.length) * 100)}%</span>
                    </div>
                    <ProgressBar
                      className="mt-2"
                      value={done}
                      max={mod.lessons.length}
                      tone={done === mod.lessons.length ? 'emerald' : 'gold'}
                    />
                  </div>
                </div>
                <p className="mt-4 max-w-2xl text-[0.78rem] leading-relaxed text-faint">{mod.thesis}</p>
              </header>

              <ul className="divide-y divide-line-soft">
                {mod.lessons.map((lesson) => {
                  const scheduled = plan.find((d) => d.lessonId === lesson.id)
                  const complete = Boolean(state.lessonsDone[lesson.id])
                  const isToday = scheduled?.date === today
                  return (
                    <li key={lesson.id}>
                      <Link
                        to={`/lesson/${lesson.id}`}
                        className="group flex items-center gap-4 px-5 py-3.5 transition-colors hover:bg-raised/50 sm:px-6"
                      >
                        <span
                          className={cn(
                            'flex h-7 w-7 shrink-0 items-center justify-center rounded-full border text-[0.65rem]',
                            complete
                              ? 'border-emerald/40 bg-emerald/10 text-emerald'
                              : isToday
                                ? 'border-gold/50 bg-gold/10 text-gold'
                                : 'border-line text-faint',
                          )}
                        >
                          {complete ? <Check className="h-3.5 w-3.5" strokeWidth={3} /> : lesson.order}
                        </span>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-2">
                            <p className="truncate text-sm font-medium text-bone">{lesson.title}</p>
                            {isToday ? <Badge tone="gold">Today</Badge> : null}
                          </div>
                          <p className="mt-0.5 truncate text-[0.7rem] text-faint">{lesson.subtitle}</p>
                        </div>
                        <div className="hidden shrink-0 items-center gap-4 sm:flex">
                          <span className="text-[0.65rem] text-faint">{lesson.minutes} min</span>
                          {scheduled ? (
                            <span className="w-14 text-right text-[0.65rem] text-faint">
                              Day {scheduled.day}
                            </span>
                          ) : null}
                        </div>
                        <ChevronRight className="h-4 w-4 shrink-0 text-faint transition-transform group-hover:translate-x-0.5 group-hover:text-gold" />
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </section>
          )
        })}
      </div>

      <div className="mt-8 flex items-center gap-3 rounded-2xl border border-line-soft bg-coal px-5 py-4">
        <Circle className="h-4 w-4 text-gold" />
        <p className="text-xs leading-relaxed text-muted">
          The lessons are not locked. If today’s topic is the fire you are fighting, go to it. The
          sequence serves you; it does not rule you.
        </p>
      </div>
    </div>
  )
}