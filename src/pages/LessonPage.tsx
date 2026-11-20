import { useState } from 'react'
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft, ArrowRight, Check, Circle, Clock3, PenLine, Sparkles } from 'lucide-react'
import { ALL_LESSONS, getLesson, getModule } from '../data/curriculum'
import { useStore, drillKey } from '../store/useStore'
import { planFor } from '../lib/plan'
import { todayKey } from '../lib/date'
import { cn } from '../lib/cn'
import { LessonBlocks } from '../components/LessonBlocks'
import { Badge, Divider, Eyebrow } from '../components/ui'

export function LessonPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const lesson = id ? getLesson(id) : undefined
  const state = useStore()
  const completeLesson = useStore((s) => s.completeLesson)

  if (!lesson) return <Navigate to="/journey" replace />

  const mod = getModule(lesson.moduleId)
  const today = todayKey()
  const index = ALL_LESSONS.findIndex((l) => l.id === lesson.id)
  const next = ALL_LESSONS[index + 1]
  const prev = ALL_LESSONS[index - 1]
  const done = Boolean(state.lessonsDone[lesson.id])
  const scheduled = planFor(state.profile).find((d) => d.lessonId === lesson.id)

  return (
    <article className="animate-rise">
      <div className="mb-6 flex items-center justify-between">
        <Link
          to="/journey"
          className="inline-flex items-center gap-1.5 text-xs text-faint transition-colors hover:text-gold"
        >
          <ArrowLeft className="h-3.5 w-3.5" /> The map
        </Link>
        <span className="text-[0.65rem] uppercase tracking-[0.18em] text-faint">
          Lesson {lesson.order} of 23
        </span>
      </div>

      <header>
        <div className="flex flex-wrap items-center gap-2">
          <Eyebrow className="text-gold">{mod?.title}</Eyebrow>
          {scheduled ? <Badge tone="neutral">Day {scheduled.day}</Badge> : null}
          {done ? <Badge tone="emerald"><Check className="h-3 w-3" /> Complete</Badge> : null}
        </div>
        <h1 className="display mt-3 text-4xl leading-[1.03] text-balance sm:text-5xl">
          {lesson.title}
        </h1>
        <p className="mt-2 text-sm text-muted">{lesson.subtitle}</p>
        <div className="mt-4 flex flex-wrap items-center gap-4 text-[0.68rem] text-faint">
          <span className="inline-flex items-center gap-1.5">
            <Clock3 className="h-3.5 w-3.5" /> {lesson.minutes} minute read
          </span>
          <span className="h-1 w-1 rounded-full bg-line" />
          <span>{lesson.drills.length} drills</span>
          <span className="h-1 w-1 rounded-full bg-line" />
          <span>{mod?.subtitle}</span>
        </div>
      </header>

      <div className="mt-8 rounded-2xl border border-gold/20 bg-gold/[0.05] px-5 py-5">
        <p className="eyebrow mb-2 text-gold">The big idea</p>
        <p className="font-display text-xl leading-snug text-bone">{lesson.bigIdea}</p>
      </div>

      <div className="mt-9">
        <LessonBlocks blocks={lesson.blocks} />
      </div>

      <Divider className="my-9" />

      <section>
        <div className="mb-4 flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-gold" />
          <h2 className="text-sm font-semibold text-bone">Drills — do them today</h2>
        </div>
        <div className="space-y-2.5">
          {lesson.drills.map((drill) => {
            const key = drillKey(drill, today)
            const checked = Boolean(state.drills[key])
            return (
              <button
                key={drill.id}
                type="button"
                onClick={() => useStore.getState().toggleDrill(key)}
                className={cn(
                  'flex w-full items-start gap-3 rounded-xl border px-4 py-3.5 text-left transition-colors',
                  checked ? 'border-emerald/35 bg-emerald/[0.06]' : 'border-line bg-coal hover:border-line-soft',
                )}
              >
                {checked ? (
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald text-ink">
                    <Check className="h-3 w-3" strokeWidth={3} />
                  </span>
                ) : (
                  <Circle className="mt-0.5 h-5 w-5 shrink-0 text-faint" />
                )}
                <span>
                  <span className={cn('block text-sm font-medium', checked ? 'text-emerald' : 'text-bone')}>
                    {drill.title}
                  </span>
                  <span className="mt-1 block text-xs leading-relaxed text-muted">{drill.instruction}</span>
                  <span className="mt-1.5 block text-[0.6rem] uppercase tracking-[0.16em] text-faint">
                    {drill.cadence} · {drill.minutes} min
                  </span>
                </span>
              </button>
            )
          })}
        </div>
      </section>

      <Divider className="my-9" />

      <section>
        <h2 className="text-sm font-semibold text-bone">Write it down</h2>
        <p className="mt-1 text-xs text-faint">Reflection converts information into a decision.</p>
        <PromptComposer prompts={lesson.prompts} />
      </section>

      <Divider className="my-9" />

      <section>
        <h2 className="text-sm font-semibold text-bone">Your notes</h2>
        <Notes lessonId={lesson.id} initial={state.lessonNotes[lesson.id] ?? ''} />
      </section>

      <Divider className="my-9" />

      <div className="flex flex-wrap items-center justify-between gap-4">
        {prev ? (
          <Link
            to={`/lesson/${prev.id}`}
            className="group flex max-w-[45%] items-center gap-2 text-left"
          >
            <ArrowLeft className="h-4 w-4 shrink-0 text-faint transition-colors group-hover:text-gold" />
            <span className="min-w-0">
              <span className="block text-[0.6rem] uppercase tracking-[0.16em] text-faint">Previous</span>
              <span className="block truncate text-xs text-muted group-hover:text-bone">{prev.title}</span>
            </span>
          </Link>
        ) : (
          <span />
        )}
        {next ? (
          <Link
            to={`/lesson/${next.id}`}
            className="group flex max-w-[45%] items-center gap-2 text-right"
          >
            <span className="min-w-0">
              <span className="block text-[0.6rem] uppercase tracking-[0.16em] text-faint">Next</span>
              <span className="block truncate text-xs text-muted group-hover:text-bone">{next.title}</span>
            </span>
            <ArrowRight className="h-4 w-4 shrink-0 text-faint transition-colors group-hover:text-gold" />
          </Link>
        ) : null}
      </div>

      <div className="mt-8 rounded-2xl border border-line bg-surface p-5">
        {done ? (
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="flex items-center gap-2 text-sm text-emerald">
              <Check className="h-4 w-4" /> Marked complete. Return to it when the lesson fades.
            </p>
            <Link to="/journey" className="btn-outline text-xs">
              Back to the map
            </Link>
          </div>
        ) : (
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-sm text-bone">Finished reading?</p>
              <p className="mt-0.5 text-xs text-faint">
                Complete it after the drills, not after the reading.
              </p>
            </div>
            <button
              type="button"
              className="btn-gold"
              onClick={() => {
                completeLesson(lesson.id)
                if (next) navigate(`/lesson/${next.id}`)
                else navigate('/journey')
              }}
            >
              <Check className="h-4 w-4" /> Mark complete
            </button>
          </div>
        )}
      </div>
    </article>
  )
}

function PromptComposer({ prompts }: { prompts: string[] }) {
  const addJournal = useStore((s) => s.addJournal)
  const [prompt, setPrompt] = useState(prompts[0] ?? 'What is one thing I will do differently?')
  const [body, setBody] = useState('')
  const [saved, setSaved] = useState(false)

  function save() {
    if (!body.trim()) return
    addJournal({ date: todayKey(), prompt, body: body.trim() })
    setBody('')
    setSaved(true)
    window.setTimeout(() => setSaved(false), 2400)
  }

  return (
    <div className="mt-4">
      <div className="flex flex-wrap gap-2">
        {prompts.map((p) => (
          <button
            key={p}
            type="button"
            onClick={() => setPrompt(p)}
            className={cn(
              'rounded-full border px-3 py-1.5 text-left text-[0.68rem] leading-tight transition-colors',
              prompt === p
                ? 'border-gold/40 bg-gold/10 text-gold'
                : 'border-line text-faint hover:text-muted',
            )}
          >
            {p.length > 60 ? `${p.slice(0, 60)}…` : p}
          </button>
        ))}
      </div>
      <p className="mt-4 text-xs leading-relaxed text-muted">{prompt}</p>
      <textarea
        className="field mt-2 min-h-28 resize-y"
        value={body}
        onChange={(e) => setBody(e.target.value)}
        placeholder="Answer briefly and honestly."
      />
      <div className="mt-2 flex justify-end">
        <button type="button" className="btn-outline px-3 py-1.5 text-xs" onClick={save} disabled={!body.trim()}>
          {saved ? <Check className="h-3.5 w-3.5" /> : <PenLine className="h-3.5 w-3.5" />}
          {saved ? 'Saved' : 'Save to journal'}
        </button>
      </div>
    </div>
  )
}

function Notes({ lessonId, initial }: { lessonId: string; initial: string }) {
  const saveLessonNote = useStore((s) => s.saveLessonNote)
  const [value, setValue] = useState(initial)
  const [saved, setSaved] = useState(false)
  return (
    <div className="mt-3">
      <textarea
        className="field min-h-24 resize-y"
        value={value}
        onChange={(e) => {
          setValue(e.target.value)
          setSaved(false)
        }}
        onBlur={() => {
          saveLessonNote(lessonId, value)
          setSaved(true)
        }}
        placeholder="What will you keep from this lesson? One sentence is enough."
      />
      <p className="mt-1.5 text-[0.65rem] text-faint">{saved ? 'Saved.' : 'Saved when you tap away.'}</p>
    </div>
  )
}