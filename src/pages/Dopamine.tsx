import { useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowLeft,
  BellOff,
  Check,
  Clock3,
  Moon,
  Smartphone,
  Timer,
  VideoOff,
} from 'lucide-react'
import { useStore } from '../store/useStore'
import { addDays, diffDays, formatMedium, todayKey } from '../lib/date'
import { cn } from '../lib/cn'
import { Callout, PageHeader, ProgressBar, SectionTitle } from '../components/ui'

const RULES = [
  { id: 'morning', label: 'No phone for the first 30 minutes', icon: Timer },
  { id: 'bedroom', label: 'Phone charges outside the bedroom', icon: Moon },
  { id: 'notifications', label: 'Notifications off except calls', icon: BellOff },
  { id: 'block', label: 'One 60-minute screen-free block', icon: Clock3 },
  { id: 'shortform', label: 'No short-form video today', icon: VideoOff },
]

const DELAYS = ['Under 5 minutes', '5–30 minutes', '30–60 minutes', 'Over an hour']

export function Dopamine() {
  const state = useStore()
  const setBaseline = useStore((s) => s.setDopamineBaseline)
  const toggleItem = useStore((s) => s.toggleDopamineItem)
  const today = todayKey()
  const baseline = state.dopamine.baseline

  const [screenHours, setScreenHours] = useState(baseline?.screenHours ?? 4)
  const [pickups, setPickups] = useState(baseline?.pickups ?? 60)
  const [morningDelay, setMorningDelay] = useState(baseline?.morningDelay ?? DELAYS[1])
  const [saved, setSaved] = useState(false)

  const startedAt = state.dopamine.startedAt
  const currentDay = startedAt ? Math.min(7, Math.max(1, diffDays(startedAt, today) + 1)) : 1
  const totalDone = Object.values(state.dopamine.days).reduce((sum, day) => sum + day.length, 0)

  function saveBaseline(e: FormEvent) {
    e.preventDefault()
    setBaseline({ screenHours, pickups, morningDelay })
    setSaved(true)
    window.setTimeout(() => setSaved(false), 2400)
  }

  return (
    <div className="animate-rise">
      <Link to="/tools" className="mb-6 inline-flex items-center gap-1.5 text-xs text-faint hover:text-gold">
        <ArrowLeft className="h-3.5 w-3.5" /> Tools
      </Link>

      <PageHeader
        eyebrow="Tool 03 · the seven-day reset"
        title="Dopamine Reset"
        description="You cannot hate your way out of a habit you built with repetition. Measure the baseline, change the architecture, hold the line for seven days."
      />

      <div className="mb-6 grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
        <form onSubmit={saveBaseline} className="card p-5">
          <SectionTitle title="The baseline" hint="Numbers before opinions" />
          <div className="space-y-3">
            <label className="flex items-center justify-between gap-3">
              <span className="text-xs text-muted">Screen hours / day</span>
              <input
                type="number"
                min={0}
                max={24}
                step={0.5}
                className="field w-24 text-right"
                value={screenHours}
                onChange={(e) => setScreenHours(Number(e.target.value))}
              />
            </label>
            <label className="flex items-center justify-between gap-3">
              <span className="text-xs text-muted">Phone pickups / day</span>
              <input
                type="number"
                min={0}
                max={500}
                className="field w-24 text-right"
                value={pickups}
                onChange={(e) => setPickups(Number(e.target.value))}
              />
            </label>
            <label className="block">
              <span className="text-xs text-muted">First phone use after waking</span>
              <select
                className="field mt-1.5"
                value={morningDelay}
                onChange={(e) => setMorningDelay(e.target.value)}
              >
                {DELAYS.map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <div className="mt-4 flex items-center justify-between">
            <span className="text-[0.65rem] text-faint">
              {state.dopamine.startedAt ? `Reset started ${formatMedium(state.dopamine.startedAt)}` : 'Saving starts the seven days'}
            </span>
            <button type="submit" className="btn-outline px-3 py-1.5 text-xs">
              {saved ? <Check className="h-3.5 w-3.5" /> : null}
              {saved ? 'Saved' : 'Save baseline'}
            </button>
          </div>
        </form>

        <div className="card p-5">
          <SectionTitle title="The seven days" hint={`${totalDone} of 35 rules kept`} />
          <ProgressBar value={totalDone} max={35} tone={totalDone >= 30 ? 'emerald' : 'gold'} />
          <div className="mt-4 grid grid-cols-7 gap-1.5">
            {Array.from({ length: 7 }).map((_, i) => {
              const n = i + 1
              const done = state.dopamine.days[n]?.length ?? 0
              return (
                <div key={n} className="text-center">
                  <div
                    className={cn(
                      'mx-auto flex h-9 w-9 items-center justify-center rounded-full border text-[0.7rem]',
                      done === 5
                        ? 'border-emerald bg-emerald/15 text-emerald'
                        : n === currentDay
                          ? 'border-gold/50 bg-gold/10 text-gold'
                          : 'border-line text-faint',
                    )}
                  >
                    {done === 5 ? <Check className="h-4 w-4" /> : n}
                  </div>
                  <p className="mt-1 text-[0.55rem] text-faint">{done}/5</p>
                </div>
              )
            })}
          </div>
          <div className="mt-4 grid gap-2 text-[0.7rem] leading-relaxed text-muted sm:grid-cols-2">
            {RULES.map((rule) => {
              const Icon = rule.icon
              return (
                <p key={rule.id} className="flex items-start gap-2">
                  <Icon className="mt-0.5 h-3.5 w-3.5 shrink-0 text-gold/70" />
                  {rule.label}
                </p>
              )
            })}
          </div>
        </div>
      </div>

      <div className="space-y-3">
        {Array.from({ length: 7 }).map((_, i) => {
          const n = i + 1
          const done = state.dopamine.days[n] ?? []
          const date = startedAt ? addDays(startedAt, i) : addDays(today, i)
          return (
            <div
              key={n}
              className={cn(
                'card p-4 sm:p-5',
                n === currentDay && 'border-gold/30 bg-gold/[0.03]',
              )}
            >
              <div className="mb-3 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <span className="font-display text-xl text-bone">Day {n}</span>
                  <span className="text-[0.65rem] text-faint">{formatMedium(date)}</span>
                  {n === currentDay ? <span className="chip border-gold/30 text-gold">Today</span> : null}
                </div>
                <span className="text-[0.65rem] text-faint">{done.length}/5</span>
              </div>
              <div className="grid gap-2 sm:grid-cols-2">
                {RULES.map((rule) => {
                  const checked = done.includes(rule.id)
                  const Icon = rule.icon
                  return (
                    <button
                      key={rule.id}
                      type="button"
                      aria-pressed={checked}
                      onClick={() => toggleItem(n, rule.id)}
                      className={cn(
                        'flex items-center gap-2.5 rounded-xl border px-3 py-2.5 text-left transition-colors',
                        checked
                          ? 'border-emerald/30 bg-emerald/[0.06] text-emerald'
                          : 'border-line bg-coal text-muted hover:border-line-soft',
                      )}
                    >
                      <span
                        className={cn(
                          'flex h-4 w-4 shrink-0 items-center justify-center rounded-full border',
                          checked ? 'border-emerald bg-emerald text-ink' : 'border-line text-transparent',
                        )}
                      >
                        <Check className="h-2.5 w-2.5" strokeWidth={3} />
                      </span>
                      <Icon className="h-3.5 w-3.5 shrink-0 text-faint" />
                      <span className="text-[0.72rem] leading-tight">{rule.label}</span>
                    </button>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>

      <div className="mt-6">
        <Callout tone="gold" title="If you break a rule">
          Do not abandon the week. Note what preceded it — boredom, loneliness, fatigue, a
          notification — and protect that door tomorrow. The reset is not a purity test; it is a
          redesign.
        </Callout>
      </div>

      <div className="mt-3 flex items-center gap-2 rounded-xl border border-line-soft bg-coal px-4 py-3 text-[0.68rem] leading-relaxed text-faint">
        <Smartphone className="h-4 w-4 shrink-0 text-gold/70" />
        The goal is not a dumb phone. It is a phone that serves the mission and bores the nafs.
      </div>
    </div>
  )
}