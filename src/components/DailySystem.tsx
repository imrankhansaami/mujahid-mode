import { BookOpen, Check, Clock3, Flame, Minus, Moon, Plus, Shield, X, Users, Zap } from 'lucide-react'
import { PRAYERS, type DayLog, type PrayerState } from '../types'
import { useStore } from '../store/useStore'
import { cn } from '../lib/cn'
import { PrayerStateLabels } from './labels'

const CYCLE: Array<PrayerState | undefined> = [undefined, 'ontime', 'jamaah', 'late', 'missed']

const STATE_STYLE: Record<
  PrayerState | 'unset',
  { label: string; className: string; icon: typeof Check }
> = {
  unset: { label: 'Not logged', className: 'border-line text-faint', icon: Clock3 },
  ontime: { label: 'On time', className: 'border-emerald/40 bg-emerald/10 text-emerald', icon: Check },
  jamaah: { label: 'Jamāʿah', className: 'border-gold/45 bg-gold/10 text-gold', icon: Users },
  late: { label: 'Late', className: 'border-amber/40 bg-amber/10 text-amber', icon: Clock3 },
  missed: { label: 'Missed', className: 'border-danger/40 bg-danger/10 text-danger', icon: X },
}

function nextState(current: PrayerState | undefined): PrayerState | undefined {
  const i = CYCLE.indexOf(current)
  return CYCLE[(i + 1) % CYCLE.length]
}

export function PrayerTracker({ date, log }: { date: string; log?: DayLog }) {
  const setPrayer = useStore((s) => s.setPrayer)
  return (
    <div>
      <div className="mb-3 flex items-baseline justify-between">
        <h3 className="text-sm font-semibold text-bone">The five prayers</h3>
        <span className="text-[0.68rem] text-faint">Tap a status to cycle</span>
      </div>
      <div className="divide-y divide-line-soft">
        {PRAYERS.map((prayer) => {
          const state = log?.prayers[prayer.key]
          const style = STATE_STYLE[state ?? 'unset']
          const Icon = style.icon
          return (
            <div key={prayer.key} className="flex items-center justify-between gap-3 py-2.5">
              <div className="flex items-baseline gap-2.5">
                <span className="w-16 text-sm font-medium text-bone">{prayer.label}</span>
                <span className="arabic text-xs text-faint">{prayer.arabic}</span>
              </div>
              <button
                type="button"
                onClick={() => setPrayer(date, prayer.key, nextState(state))}
                aria-label={`${prayer.label}: ${PrayerStateLabels[state ?? 'unset']}. Tap to change.`}
                className={cn(
                  'flex min-w-[6.7rem] items-center justify-center gap-1.5 rounded-full border px-3 py-1.5 text-[0.72rem] font-medium transition-colors',
                  style.className,
                )}
              >
                <Icon className="h-3.5 w-3.5" strokeWidth={2} />
                {style.label}
              </button>
            </div>
          )
        })}
      </div>
      <p className="mt-3 text-[0.68rem] leading-relaxed text-faint">
        On time = 10 pts · Jamāʿah = 10 pts · Late = 5 pts · Missed = 0. The score is a mirror, not
        a master.
      </p>
    </div>
  )
}

export function QuranTracker({
  date,
  log,
  target,
}: {
  date: string
  log?: DayLog
  target: number
}) {
  const setQuranPages = useStore((s) => s.setQuranPages)
  const pages = log?.quranPages ?? 0
  const pct = Math.min(100, (pages / Math.max(1, target)) * 100)
  return (
    <div>
      <div className="mb-3 flex items-baseline justify-between">
        <h3 className="flex items-center gap-2 text-sm font-semibold text-bone">
          <BookOpen className="h-4 w-4 text-gold" /> Quran
        </h3>
        <span className="text-[0.68rem] text-faint">target {target} pages</span>
      </div>
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <button
            type="button"
            aria-label="Remove one page"
            onClick={() => setQuranPages(date, Math.max(0, pages - 1))}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-line text-muted hover:border-gold-dim hover:text-bone"
          >
            <Minus className="h-4 w-4" />
          </button>
          <div className="flex w-14 items-baseline justify-center gap-1">
            <span className="font-display text-3xl leading-none text-bone">{pages}</span>
            <span className="text-xs text-faint">p</span>
          </div>
          <button
            type="button"
            aria-label="Add one page"
            onClick={() => setQuranPages(date, pages + 1)}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-line text-muted hover:border-gold-dim hover:text-bone"
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>
        <div className="flex-1">
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-line-soft">
            <div
              className="h-full rounded-full bg-gold transition-[width] duration-300"
              style={{ width: `${pct}%` }}
            />
          </div>
          <p className="mt-2 text-right text-[0.68rem] text-faint">
            {pages === 0
              ? 'One page is enough to start.'
              : pages >= target
                ? 'Target met. Barakah in the rest.'
                : `${target - pages} to the target`}
          </p>
        </div>
      </div>
    </div>
  )
}

const COMMITMENTS = [
  { key: 'dhikr' as const, label: 'Dhikr', hint: 'Morning & evening', icon: Flame },
  { key: 'deepWork' as const, label: 'Deep work', hint: 'One protected block', icon: Zap },
  { key: 'screenFast' as const, label: 'Screen fast', hint: 'First & last hour clean', icon: Shield },
  { key: 'sleepOnTime' as const, label: 'Lights out', hint: 'Sleep is worship too', icon: Moon },
]

export function Commitments({ date, log }: { date: string; log?: DayLog }) {
  const toggle = useStore((s) => s.toggleCommitment)
  return (
    <div>
      <div className="mb-3 flex items-baseline justify-between">
        <h3 className="text-sm font-semibold text-bone">The guardrails</h3>
        <span className="text-[0.68rem] text-faint">Tap to mark</span>
      </div>
      <div className="grid grid-cols-2 gap-2">
        {COMMITMENTS.map(({ key, label, hint, icon: Icon }) => {
          const active = Boolean(log?.[key])
          return (
            <button
              key={key}
              type="button"
              aria-pressed={active}
              onClick={() => toggle(date, key)}
              className={cn(
                'flex flex-col items-start gap-1.5 rounded-xl border px-3 py-3 text-left transition-colors',
                active
                  ? 'border-gold/40 bg-gold/[0.07]'
                  : 'border-line bg-coal hover:border-line-soft',
              )}
            >
              <div className="flex w-full items-center justify-between">
                <Icon className={cn('h-4 w-4', active ? 'text-gold' : 'text-faint')} />
                {active ? (
                  <span className="flex h-4 w-4 items-center justify-center rounded-full bg-gold text-ink">
                    <Check className="h-3 w-3" strokeWidth={3} />
                  </span>
                ) : null}
              </div>
              <span className={cn('text-xs font-medium', active ? 'text-bone' : 'text-muted')}>
                {label}
              </span>
              <span className="text-[0.62rem] leading-tight text-faint">{hint}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}

export function DaySummary({ log, target }: { log?: DayLog; target: number }) {
  const states = PRAYERS.map((p) => log?.prayers[p.key])
  const logged = states.filter(Boolean).length
  const onTime = states.filter((s) => s === 'ontime' || s === 'jamaah').length
  return (
    <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-[0.7rem] text-faint">
      <span>{logged}/5 prayers logged</span>
      <span>{onTime} on time</span>
      <span>{log?.quranPages ?? 0} pages</span>
      <span>{target} page target</span>
    </div>
  )
}