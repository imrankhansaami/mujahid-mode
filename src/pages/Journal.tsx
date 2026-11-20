import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, Check, NotebookPen, Search, Trash2 } from 'lucide-react'
import { useStore } from '../store/useStore'
import { formatLong, todayKey } from '../lib/date'
import { PageHeader, SectionTitle } from '../components/ui'

const PROMPTS = [
  'Where did I feel resistance today, and what was underneath it?',
  'What am I pretending not to see?',
  'What did I do today that the man I am becoming would do again?',
  'Where did I spend time I cannot account for?',
  'What did I ask Allah for today — and did I act like it?',
  'Which blessing did I treat as ordinary today?',
  'Who did I serve today without being asked?',
  'What would I do differently if today repeated tomorrow?',
  'What am I carrying that I need to put down?',
]

export function Journal() {
  const state = useStore()
  const addJournal = useStore((s) => s.addJournal)
  const deleteJournal = useStore((s) => s.deleteJournal)

  const [prompt, setPrompt] = useState(PROMPTS[0])
  const [body, setBody] = useState('')
  const [query, setQuery] = useState('')
  const [saved, setSaved] = useState(false)

  const filtered = query.trim()
    ? state.journal.filter(
        (e) =>
          e.body.toLowerCase().includes(query.toLowerCase()) ||
          e.prompt.toLowerCase().includes(query.toLowerCase()),
      )
    : state.journal

  const grouped = filtered.reduce<Record<string, typeof filtered>>((acc, entry) => {
    acc[entry.date] = acc[entry.date] ?? []
    acc[entry.date].push(entry)
    return acc
  }, {})
  const dates = Object.keys(grouped).sort((a, b) => b.localeCompare(a))

  function save() {
    if (!body.trim()) return
    addJournal({ date: todayKey(), prompt, body: body.trim() })
    setBody('')
    setSaved(true)
    window.setTimeout(() => setSaved(false), 2400)
  }

  return (
    <div className="animate-rise">
      <Link to="/tools" className="mb-6 inline-flex items-center gap-1.5 text-xs text-faint hover:text-gold">
        <ArrowLeft className="h-3.5 w-3.5" /> Tools
      </Link>

      <PageHeader
        eyebrow="Tool 05 · the private page"
        title="Journal"
        description="The day becomes information when it is written down. This is where the system hears you."
      />

      <div className="grid gap-5 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="card p-5 sm:p-6">
          <SectionTitle title="Today’s entry" hint={formatLong(todayKey())} />
          <label className="block">
            <span className="eyebrow">Prompt</span>
            <select className="field mt-1.5" value={prompt} onChange={(e) => setPrompt(e.target.value)}>
              {PROMPTS.map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </select>
          </label>
          <textarea
            className="field mt-3 min-h-48 resize-y"
            aria-label="Journal entry"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder="Write plainly. No performance. No editing for an audience that does not exist."
          />
          <div className="mt-3 flex items-center justify-between">
            <span className="text-[0.65rem] text-faint">{body.trim().split(/\s+/).filter(Boolean).length} words</span>
            <button type="button" className="btn-gold px-3.5 py-2 text-xs" onClick={save} disabled={!body.trim()}>
              {saved ? <Check className="h-3.5 w-3.5" /> : <NotebookPen className="h-3.5 w-3.5" />}
              {saved ? 'Saved' : 'Save entry'}
            </button>
          </div>
        </div>

        <div>
          <SectionTitle
            title="The archive"
            hint={`${state.journal.length} entr${state.journal.length === 1 ? 'y' : 'ies'}`}
            action={
              <div className="relative">
                <Search className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-faint" />
                <input
                  className="field w-40 py-1.5 pl-8 text-xs"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search"
                />
              </div>
            }
          />

          {dates.length === 0 ? (
            <div className="card-soft px-5 py-10 text-center">
              <p className="font-display text-xl text-bone">
                {query ? 'Nothing matches.' : 'The first page is blank.'}
              </p>
              <p className="mx-auto mt-1.5 max-w-xs text-xs leading-relaxed text-faint">
                {query
                  ? 'Try another word, or clear the search.'
                  : 'One honest paragraph today is worth more than a perfect journal you never start.'}
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {dates.map((date) => (
                <div key={date}>
                  <p className="mb-2 text-[0.62rem] uppercase tracking-[0.18em] text-faint">
                    {formatLong(date)}
                  </p>
                  <div className="space-y-2">
                    {grouped[date].map((entry) => (
                      <article key={entry.id} className="card group p-4">
                        <div className="flex items-start justify-between gap-3">
                          <p className="text-[0.68rem] font-medium text-gold">{entry.prompt}</p>
                          <button
                            type="button"
                            aria-label="Delete entry"
                            onClick={() => deleteJournal(entry.id)}
                            className="text-faint opacity-0 transition-opacity hover:text-danger group-hover:opacity-100"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </div>
                        <p className="mt-2 whitespace-pre-wrap text-sm leading-relaxed text-muted">
                          {entry.body}
                        </p>
                        <p className="mt-2 text-[0.6rem] text-faint">
                          {new Date(entry.createdAt).toLocaleTimeString(undefined, {
                            hour: 'numeric',
                            minute: '2-digit',
                          })}
                        </p>
                      </article>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}