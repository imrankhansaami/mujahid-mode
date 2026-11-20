import { useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowLeft,
  CalendarDays,
  Check,
  ChevronLeft,
  ChevronRight,
  Plus,
  Sparkles,
  Trash2,
} from 'lucide-react'
import { useStore } from '../store/useStore'
import { addDays, formatMedium, todayKey } from '../lib/date'
import { cn } from '../lib/cn'
import { PageHeader, SectionTitle } from '../components/ui'

const TEMPLATE = [
  { time: '04:45', label: 'Fajr anchor', intention: 'Quran and dhikr before the world wakes.' },
  { time: '06:00', label: 'Deep block', intention: 'The work only I can do, phone in another room.' },
  { time: '12:30', label: 'Service block', intention: 'Family, community, or the person who needs me.' },
  { time: '17:00', label: 'Recovery block', intention: 'Move, eat, rest — without a screen.' },
  { time: '21:30', label: 'Shutdown', intention: 'Capture open loops, choose tomorrow, stop.' },
]

export function Planner() {
  const [date, setDate] = useState(todayKey())
  const state = useStore()
  const profile = state.profile
  const top3 = state.plannerTop3[date] ?? ['', '', '']
  const blocks = state.planner[date] ?? []
  const setTop3 = useStore((s) => s.setTop3)
  const setPlanner = useStore((s) => s.setPlanner)
  const addPlannerBlock = useStore((s) => s.addPlannerBlock)
  const togglePlannerBlock = useStore((s) => s.togglePlannerBlock)
  const removePlannerBlock = useStore((s) => s.removePlannerBlock)

  const [time, setTime] = useState('07:00')
  const [label, setLabel] = useState('')
  const [intention, setIntention] = useState('')

  function updateTop3(i: number, value: string) {
    const next = [...top3]
    while (next.length < 3) next.push('')
    next[i] = value
    setTop3(date, next)
  }

  function addBlock(e: FormEvent) {
    e.preventDefault()
    if (!label.trim()) return
    addPlannerBlock(date, {
      id: Math.random().toString(36).slice(2, 10),
      time,
      label: label.trim(),
      intention: intention.trim(),
      done: false,
    })
    setLabel('')
    setIntention('')
  }

  function loadTemplate() {
    if (blocks.length && !window.confirm('Replace the blocks for this day with the default template?')) return
    setPlanner(
      date,
      TEMPLATE.map((b) => ({ ...b, id: Math.random().toString(36).slice(2, 10), done: false })),
    )
  }

  const plannedCount = top3.filter((t) => t && t.trim()).length
  const doneBlocks = blocks.filter((b) => b.done).length

  return (
    <div className="animate-rise">
      <Link to="/tools" className="mb-6 inline-flex items-center gap-1.5 text-xs text-faint hover:text-gold">
        <ArrowLeft className="h-3.5 w-3.5" /> Tools
      </Link>

      <PageHeader
        eyebrow="Tool 01 · the night before"
        title="Barakah Planner"
        description="Three priorities, real blocks, one intention each. If it does not fit here, it does not fit the day."
      />

      <div className="mb-6 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-line bg-surface px-4 py-3">
        <div className="flex items-center gap-1">
          <button
            type="button"
            aria-label="Previous day"
            className="flex h-8 w-8 items-center justify-center rounded-full text-muted hover:bg-raised hover:text-bone"
            onClick={() => setDate(addDays(date, -1))}
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            type="button"
            aria-label="Next day"
            className="flex h-8 w-8 items-center justify-center rounded-full text-muted hover:bg-raised hover:text-bone"
            onClick={() => setDate(addDays(date, 1))}
          >
            <ChevronRight className="h-4 w-4" />
          </button>
          <div className="ml-2">
            <p className="text-sm text-bone">{date === todayKey() ? 'Today' : formatMedium(date)}</p>
            <p className="text-[0.65rem] text-faint">{formatMedium(date)}</p>
          </div>
        </div>
        {date !== todayKey() ? (
          <button type="button" className="btn-ghost text-xs" onClick={() => setDate(todayKey())}>
            Back to today
          </button>
        ) : (
          <span className="hidden items-center gap-1.5 text-[0.65rem] text-faint sm:flex">
            <CalendarDays className="h-3.5 w-3.5" /> Plan tonight for tomorrow
          </span>
        )}
      </div>

      <div className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="space-y-5">
          <div className="card p-5">
            <SectionTitle
              title="Three priorities"
              hint="One deen, one duty, one build"
              action={<span className="text-[0.65rem] text-faint">{plannedCount}/3</span>}
            />
            <div className="space-y-2.5">
              {[0, 1, 2].map((i) => (
                <div key={i} className="flex items-center gap-2.5">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-line text-[0.65rem] text-faint">
                    {i + 1}
                  </span>
                  <input
                    className="field"
                    aria-label={`Priority ${i + 1}`}
                    value={top3[i] ?? ''}
                    onChange={(e) => updateTop3(i, e.target.value)}
                    placeholder={
                      i === 0 ? 'The deen priority' : i === 1 ? 'The duty only you can do' : 'The thing you are building'
                    }
                  />
                </div>
              ))}
            </div>
            <button type="button" className="btn-ghost mt-3 px-0 text-xs" onClick={loadTemplate}>
              <Sparkles className="h-3.5 w-3.5 text-gold" /> Load the default day blocks
            </button>
          </div>

          <div className="card p-5">
            <SectionTitle title="The shape of the day" hint="Anchor, three blocks, buffer, shutdown" />
            <div className="space-y-2 text-xs leading-relaxed text-muted">
              <p><span className="text-bone">Fajr anchor</span> — Quran and dhikr before the phone.</p>
              <p><span className="text-bone">Deep block</span> — 60–90 minutes, one outcome, no notifications.</p>
              <p><span className="text-bone">Service block</span> — the people you are responsible for.</p>
              <p><span className="text-bone">Recovery block</span> — movement, food, rest without a screen.</p>
              <p><span className="text-bone">Shutdown</span> — capture, choose tomorrow, stop.</p>
            </div>
            <div className="mt-4 rounded-xl border border-line-soft bg-coal p-3 text-[0.68rem] leading-relaxed text-faint">
              Lights out: <span className="text-gold">{profile.sleepTarget}</span>. Phone charges
              outside the bedroom.
            </div>
          </div>
        </div>

        <div className="card p-5">
          <SectionTitle
            title="Time blocks"
            hint={blocks.length ? `${doneBlocks}/${blocks.length} done` : 'Nothing planned yet'}
          />

          <form onSubmit={addBlock} className="mb-5 space-y-2 rounded-xl border border-line-soft bg-coal p-3">
            <div className="flex gap-2">
              <input
                type="time"
                className="field w-28"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                aria-label="Block time"
              />
              <input
                className="field"
                value={label}
                onChange={(e) => setLabel(e.target.value)}
                placeholder="What is this block?"
                aria-label="Block label"
              />
            </div>
            <input
              className="field"
              value={intention}
              onChange={(e) => setIntention(e.target.value)}
              placeholder="Niyyah — who is this for?"
              aria-label="Block intention"
            />
            <div className="flex justify-end">
              <button type="submit" className="btn-outline px-3 py-1.5 text-xs" disabled={!label.trim()}>
                <Plus className="h-3.5 w-3.5" /> Add block
              </button>
            </div>
          </form>

          {blocks.length === 0 ? (
            <div className="rounded-xl border border-dashed border-line px-4 py-8 text-center">
              <p className="font-display text-lg text-bone">An unplanned day is an invitation.</p>
              <p className="mx-auto mt-1.5 max-w-xs text-xs leading-relaxed text-faint">
                Load the default day, then adjust it to the life you actually live.
              </p>
            </div>
          ) : (
            <ul className="divide-y divide-line-soft">
              {blocks
                .slice()
                .sort((a, b) => a.time.localeCompare(b.time))
                .map((block) => (
                  <li key={block.id} className="group flex items-start gap-3 py-3">
                    <button
                      type="button"
                      aria-label={block.done ? 'Mark block not done' : 'Mark block done'}
                      onClick={() => togglePlannerBlock(date, block.id)}
                      className={cn(
                        'mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md border transition-colors',
                        block.done
                          ? 'border-emerald bg-emerald text-ink'
                          : 'border-line text-transparent hover:border-gold-dim',
                      )}
                    >
                      <Check className="h-3 w-3" strokeWidth={3} />
                    </button>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-baseline gap-2">
                        <span className="font-mono text-[0.65rem] text-gold">{block.time}</span>
                        <span
                          className={cn(
                            'text-sm',
                            block.done ? 'text-faint line-through' : 'text-bone',
                          )}
                        >
                          {block.label}
                        </span>
                      </div>
                      {block.intention ? (
                        <p className="mt-0.5 text-[0.68rem] leading-relaxed text-faint">{block.intention}</p>
                      ) : null}
                    </div>
                    <button
                      type="button"
                      aria-label="Delete block"
                      onClick={() => removePlannerBlock(date, block.id)}
                      className="mt-0.5 text-faint opacity-0 transition-opacity hover:text-danger group-hover:opacity-100"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </li>
                ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  )
}