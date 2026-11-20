import { Link } from 'react-router-dom'
import {
  ArrowUpRight,
  BookOpen,
  Brain,
  CalendarDays,
  NotebookPen,
  ShieldCheck,
  Sparkles,
} from 'lucide-react'
import { useStore } from '../store/useStore'
import { todayKey } from '../lib/date'
import { PageHeader } from '../components/ui'
import type { ReactNode } from 'react'

export function Tools() {
  const state = useStore()
  const today = todayKey()
  const top3 = state.plannerTop3[today] ?? []
  const blocks = state.planner[today] ?? []
  const dopeToday = state.dopamine.days[1] ?? []
  const held = state.triggers.filter((t) => t.outcome === 'held').length
  const planned = top3.filter(Boolean).length

  const tools: Array<{
    to: string
    title: string
    description: string
    icon: ReactNode
    status: string
  }> = [
    {
      to: '/tools/planner',
      title: 'Barakah Planner',
      description: 'Three priorities, real blocks, a niyyah for each. The day stops being formless.',
      icon: <CalendarDays className="h-5 w-5" />,
      status: planned ? `${planned}/3 priorities · ${blocks.length} blocks` : 'Nothing planned yet',
    },
    {
      to: '/tools/quran',
      title: 'Quran Guide',
      description: 'A daily portion sized to your season — from one page to a full relationship.',
      icon: <BookOpen className="h-5 w-5" />,
      status: `${state.days[today]?.quranPages ?? 0} pages today · target ${state.profile.quranTarget}`,
    },
    {
      to: '/tools/dopamine',
      title: 'Dopamine Reset',
      description: 'Seven days of phone architecture, attention boundaries, and a baseline you can compare.',
      icon: <Brain className="h-5 w-5" />,
      status: `${dopeToday.length}/5 rules today`,
    },
    {
      to: '/tools/lust',
      title: 'Lust Mastery',
      description: 'The emergency protocol, a private trigger log, and a return plan without shame.',
      icon: <ShieldCheck className="h-5 w-5" />,
      status: `${held} urges held · ${state.triggers.length} logged`,
    },
    {
      to: '/tools/journal',
      title: 'Journal',
      description: 'The private page where the day becomes information instead of a mood.',
      icon: <NotebookPen className="h-5 w-5" />,
      status: `${state.journal.length} entr${state.journal.length === 1 ? 'y' : 'ies'}`,
    },
    {
      to: '/progress',
      title: 'Weekly Review',
      description: 'Twenty minutes, one leak, one change. The engine that keeps the other tools honest.',
      icon: <Sparkles className="h-5 w-5" />,
      status: Object.keys(state.reviews).length
        ? `${Object.keys(state.reviews).length} weeks reviewed`
        : 'No review saved yet',
    },
  ]

  return (
    <div className="animate-rise">
      <PageHeader
        eyebrow="The toolkit"
        title="Weapons, not PDFs."
        description="Every tool here is meant to be used today, not downloaded and forgotten. The app remembers; you only have to show up."
      />

      <div className="grid gap-4 sm:grid-cols-2">
        {tools.map((tool) => (
          <Link
            key={tool.to}
            to={tool.to}
            className="card group flex flex-col p-5 transition-colors hover:border-gold-dim/70 hover:bg-raised/40 sm:p-6"
          >
            <div className="flex items-start justify-between">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-line bg-coal text-gold">
                {tool.icon}
              </span>
              <ArrowUpRight className="h-4 w-4 text-faint transition-colors group-hover:text-gold" />
            </div>
            <h2 className="display mt-4 text-2xl text-bone">{tool.title}</h2>
            <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{tool.description}</p>
            <p className="mt-4 border-t border-line-soft pt-3 text-[0.68rem] uppercase tracking-[0.14em] text-faint">
              {tool.status}
            </p>
          </Link>
        ))}
      </div>

      <div className="mt-6 rounded-2xl border border-line-soft bg-coal p-5">
        <p className="text-xs leading-relaxed text-muted">
          <span className="text-gold">A note on the inner work:</span> this app is a discipline
          tool, not a substitute for a scholar, a therapist, or a doctor. For matters of fiqh, ask
          people of knowledge. If a habit feels compulsive, seek qualified help — taking the means
          is part of tawakkul.
        </p>
      </div>
    </div>
  )
}