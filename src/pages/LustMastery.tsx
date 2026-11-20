import { useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowLeft,
  Check,
  Flame,
  Lock,
  ShieldCheck,
  Trash2,
  Waves,
} from 'lucide-react'
import { useStore } from '../store/useStore'
import { cn } from '../lib/cn'
import { Badge, Callout, PageHeader, SectionTitle, StatTile } from '../components/ui'

const PROTOCOL = [
  ['HALT', 'Am I hungry, angry, lonely, or tired? Address the real need first.'],
  ['Change the body', 'Stand up, leave the room, make wudu with cold water, drink a glass.'],
  ['Change the input', 'Close the screen, call your witness, go to the masjid or outside.'],
  ['Name the truth', 'Say it: this costs more than it gives. Make duʿāʾ in the moment.'],
  ['Log it', 'Held or slipped, write it down. The log is a map, not a courtroom.'],
]

export function LustMastery() {
  const state = useStore()
  const addTrigger = useStore((s) => s.addTrigger)
  const deleteTrigger = useStore((s) => s.deleteTrigger)

  const [trigger, setTrigger] = useState('')
  const [urge, setUrge] = useState(6)
  const [response, setResponse] = useState('')
  const [outcome, setOutcome] = useState<'held' | 'slipped'>('held')
  const [note, setNote] = useState('')
  const [added, setAdded] = useState(false)

  const held = state.triggers.filter((t) => t.outcome === 'held').length
  const slipped = state.triggers.filter((t) => t.outcome === 'slipped').length
  const ratio = held + slipped > 0 ? Math.round((held / (held + slipped)) * 100) : 0

  function submit(e: FormEvent) {
    e.preventDefault()
    if (!trigger.trim()) return
    addTrigger({
      at: new Date().toISOString(),
      trigger: trigger.trim(),
      urge,
      response: response.trim(),
      outcome,
      note: note.trim() || undefined,
    })
    setTrigger('')
    setResponse('')
    setNote('')
    setUrge(6)
    setAdded(true)
    window.setTimeout(() => setAdded(false), 2400)
  }

  return (
    <div className="animate-rise">
      <Link to="/tools" className="mb-6 inline-flex items-center gap-1.5 text-xs text-faint hover:text-gold">
        <ArrowLeft className="h-3.5 w-3.5" /> Tools
      </Link>

      <PageHeader
        eyebrow="Tool 04 · the private battle"
        title="Lust Mastery"
        description="Desire is not the enemy; slavery to it is. Build the gates, rehearse the pause, and return fast when you fall."
      />

      <div className="mb-6 grid grid-cols-3 gap-3">
        <StatTile label="Urges held" value={held} sub="logged honestly" accent />
        <StatTile label="Slipped" value={slipped} sub="data, not identity" />
        <StatTile label="Held rate" value={`${ratio}%`} sub={`${held + slipped} logged`} />
      </div>

      <div className="grid gap-5 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="space-y-5">
          <div className="card p-5 sm:p-6">
            <SectionTitle title="The emergency protocol" hint="Rehearse it before you need it" />
            <ol className="space-y-3">
              {PROTOCOL.map(([title, body], i) => (
                <li key={title} className="flex gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-gold/30 bg-gold/[0.06] text-[0.65rem] text-gold">
                    {i + 1}
                  </span>
                  <div>
                    <p className="text-xs font-medium text-bone">{title}</p>
                    <p className="mt-0.5 text-[0.7rem] leading-relaxed text-faint">{body}</p>
                  </div>
                </li>
              ))}
            </ol>
            <div className="mt-4 flex items-start gap-2 rounded-xl border border-emerald/20 bg-emerald/[0.05] px-3 py-2.5 text-[0.68rem] leading-relaxed text-emerald/90">
              <Waves className="mt-0.5 h-3.5 w-3.5 shrink-0" />
              The urge is a wave. It rises, peaks, and falls. Do not fight it — outlast it for ten
              minutes.
            </div>
          </div>

          <div className="card p-5 sm:p-6">
            <SectionTitle title="The return" hint="After a slip" />
            <div className="space-y-2 text-[0.72rem] leading-relaxed text-muted">
              {[
                'Stop the episode. Do not “finish” it.',
                'Admit it to Allah without excuses and ask forgiveness.',
                'Tell one trustworthy person — secrecy is the chain.',
                'Change one gate in the next hour.',
                'Return to the plan today, not Monday.',
              ].map((step, i) => (
                <p key={step} className="flex gap-2">
                  <span className="text-gold">{i + 1}.</span> {step}
                </p>
              ))}
            </div>
            <div className="mt-4 flex items-start gap-2 rounded-xl border border-line-soft bg-coal px-3 py-2.5 text-[0.65rem] leading-relaxed text-faint">
              <Lock className="mt-0.5 h-3.5 w-3.5 shrink-0 text-gold/70" />
              Everything here stays on this device. Nothing is sent anywhere. If the behaviour feels
              compulsive or harmful, seek a qualified counselor — that is taking the means, not
              losing faith.
            </div>
          </div>
        </div>

        <div className="card p-5 sm:p-6">
          <SectionTitle title="Log an urge" hint="Private, honest, specific" />
          <form onSubmit={submit} className="space-y-3">
            <label className="block">
              <span className="eyebrow">What happened before it?</span>
              <input
                className="field mt-1.5"
                aria-label="What happened before the urge"
                value={trigger}
                onChange={(e) => setTrigger(e.target.value)}
                placeholder="Late night, bored, alone, after an argument…"
                required
              />
            </label>

            <label className="block">
              <span className="eyebrow">Urge strength — {urge}/10</span>
              <input
                type="range"
                min={1}
                max={10}
                value={urge}
                onChange={(e) => setUrge(Number(e.target.value))}
                className="mt-2 w-full accent-[#c9a55f]"
              />
            </label>

            <label className="block">
              <span className="eyebrow">What did you do?</span>
              <input
                className="field mt-1.5"
                aria-label="What you did"
                value={response}
                onChange={(e) => setResponse(e.target.value)}
                placeholder="Left the room, made wudu, called a friend, opened the app…"
              />
            </label>

            <div>
              <span className="eyebrow">Outcome</span>
              <div className="mt-1.5 grid grid-cols-2 gap-2">
                {(['held', 'slipped'] as const).map((o) => (
                  <button
                    key={o}
                    type="button"
                    onClick={() => setOutcome(o)}
                    className={cn(
                      'rounded-xl border px-3 py-2 text-xs capitalize transition-colors',
                      outcome === o
                        ? o === 'held'
                          ? 'border-emerald/40 bg-emerald/10 text-emerald'
                          : 'border-danger/40 bg-danger/10 text-danger'
                        : 'border-line text-muted',
                    )}
                  >
                    {o}
                  </button>
                ))}
              </div>
            </div>

            <label className="block">
              <span className="eyebrow">What did you learn? (optional)</span>
              <textarea
                className="field mt-1.5 min-h-16 resize-y"
                aria-label="What you learned"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="One sentence that makes the next time easier."
              />
            </label>

            <div className="flex items-center justify-between pt-1">
              <span className="text-[0.62rem] text-faint">No explicit detail needed.</span>
              <button type="submit" className="btn-gold px-3 py-1.5 text-xs" disabled={!trigger.trim()}>
                {added ? <Check className="h-3.5 w-3.5" /> : <ShieldCheck className="h-3.5 w-3.5" />}
                {added ? 'Logged' : 'Log it'}
              </button>
            </div>
          </form>
        </div>
      </div>

      <section className="mt-8">
        <SectionTitle title="The log" hint="Look for the pattern, not the shame" />
        {state.triggers.length === 0 ? (
          <div className="card-soft px-5 py-8 text-center">
            <p className="font-display text-xl text-bone">Nothing logged yet.</p>
            <p className="mx-auto mt-1.5 max-w-sm text-xs leading-relaxed text-faint">
              Patterns you cannot see will keep defeating you. One honest entry is enough to begin.
            </p>
          </div>
        ) : (
          <ul className="space-y-2.5">
            {state.triggers.slice(0, 20).map((t) => (
              <li key={t.id} className="card group flex items-start gap-3 p-4">
                <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-line text-faint">
                  {t.outcome === 'held' ? (
                    <Check className="h-3.5 w-3.5 text-emerald" />
                  ) : (
                    <Flame className="h-3.5 w-3.5 text-danger" />
                  )}
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge tone={t.outcome === 'held' ? 'emerald' : 'danger'}>{t.outcome}</Badge>
                    <span className="text-[0.62rem] text-faint">
                      {new Date(t.at).toLocaleString(undefined, {
                        month: 'short',
                        day: 'numeric',
                        hour: 'numeric',
                        minute: '2-digit',
                      })}
                    </span>
                    <span className="text-[0.62rem] text-faint">urge {t.urge}/10</span>
                  </div>
                  <p className="mt-1.5 text-sm text-bone">{t.trigger}</p>
                  {t.response ? <p className="mt-0.5 text-[0.7rem] text-muted">{t.response}</p> : null}
                  {t.note ? <p className="mt-1 text-[0.68rem] italic text-faint">{t.note}</p> : null}
                </div>
                <button
                  type="button"
                  aria-label="Delete entry"
                  onClick={() => deleteTrigger(t.id)}
                  className="text-faint opacity-0 transition-opacity hover:text-danger group-hover:opacity-100"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </li>
            ))}
          </ul>
        )}
      </section>

      <div className="mt-6">
        <Callout tone="gold" title="The gates matter more than the will">
          You do not defeat an urge at 11pm. You defeat it when you decide where the phone charges,
          what you watch, and who you call when you are alone. Go back to lesson 15 and close one
          gate today.
        </Callout>
      </div>
    </div>
  )
}