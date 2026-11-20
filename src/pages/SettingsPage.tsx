import { useRef, useState, type ChangeEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  ArrowLeft,
  Download,
  HardDrive,
  Shield,
  Trash2,
  Upload,
} from 'lucide-react'
import { useStore } from '../store/useStore'
import type { AppState } from '../types'
import { PageHeader, SectionTitle, Callout } from '../components/ui'

export function SettingsPage() {
  const state = useStore()
  const updateProfile = useStore((s) => s.updateProfile)
  const importState = useStore((s) => s.importState)
  const resetAll = useStore((s) => s.resetAll)
  const navigate = useNavigate()
  const fileRef = useRef<HTMLInputElement>(null)
  const [message, setMessage] = useState<string | null>(null)

  const exportable: AppState = {
    version: 1,
    onboarded: state.onboarded,
    profile: state.profile,
    days: state.days,
    drills: state.drills,
    lessonNotes: state.lessonNotes,
    lessonsDone: state.lessonsDone,
    journal: state.journal,
    planner: state.planner,
    plannerTop3: state.plannerTop3,
    triggers: state.triggers,
    reviews: state.reviews,
    dopamine: state.dopamine,
    quran: state.quran,
  }

  function exportData() {
    const blob = new Blob([JSON.stringify(exportable, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `mujahid-mode-backup-${new Date().toISOString().slice(0, 10)}.json`
    a.click()
    URL.revokeObjectURL(url)
    setMessage('Backup downloaded.')
  }

  async function importData(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    const text = await file.text()
    const ok = importState(text)
    setMessage(ok ? 'Backup restored.' : 'That file could not be read as a Mujāhid Mode backup.')
    e.target.value = ''
  }

  function reset() {
    if (
      !window.confirm(
        'This deletes every log, journal entry, and plan on this device. Export a backup first. Continue?',
      )
    )
      return
    resetAll()
    navigate('/onboarding', { replace: true })
  }

  const sizeKb = Math.max(1, Math.round(new Blob([JSON.stringify(exportable)]).size / 1024))

  return (
    <div className="animate-rise">
      <PageHeader
        eyebrow="Your system"
        title="Settings."
        description="The record lives on this device. Export it, restore it, or begin again — but never lose it silently."
      />

      <div className="grid gap-5 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="space-y-5">
          <section className="card p-5 sm:p-6">
            <SectionTitle title="The man in the record" hint="Used on the dashboard and the contract" />
            <div className="space-y-3">
              <label className="block">
                <span className="eyebrow">Name</span>
                <input
                  className="field mt-1.5"
                  value={state.profile.name}
                  onChange={(e) => updateProfile({ name: e.target.value })}
                />
              </label>
              <label className="block">
                <span className="eyebrow">Niyyah</span>
                <textarea
                  className="field mt-1.5 min-h-20 resize-y"
                  value={state.profile.niyyah}
                  onChange={(e) => updateProfile({ niyyah: e.target.value })}
                />
              </label>
              <label className="block">
                <span className="eyebrow">A winning day</span>
                <textarea
                  className="field mt-1.5 min-h-20 resize-y"
                  value={state.profile.win}
                  onChange={(e) => updateProfile({ win: e.target.value })}
                />
              </label>
            </div>
          </section>

          <section className="card p-5 sm:p-6">
            <SectionTitle title="The plan" hint="Change the season, keep the system" />
            <div className="grid gap-3 sm:grid-cols-2">
              <label className="block">
                <span className="eyebrow">Start date</span>
                <input
                  type="date"
                  className="field mt-1.5"
                  value={state.profile.startDate}
                  onChange={(e) => updateProfile({ startDate: e.target.value })}
                />
              </label>
              <label className="block">
                <span className="eyebrow">Sleep target</span>
                <input
                  type="time"
                  className="field mt-1.5"
                  value={state.profile.sleepTarget}
                  onChange={(e) => updateProfile({ sleepTarget: e.target.value })}
                />
              </label>
              <label className="block">
                <span className="eyebrow">Quran level</span>
                <select
                  className="field mt-1.5"
                  value={state.profile.quranLevel}
                  onChange={(e) =>
                    updateProfile({ quranLevel: e.target.value as typeof state.profile.quranLevel })
                  }
                >
                  <option value="beginner">Beginner</option>
                  <option value="returning">Returning</option>
                  <option value="established">Established</option>
                </select>
              </label>
              <label className="block">
                <span className="eyebrow">Quran pages / day</span>
                <input
                  type="number"
                  min={1}
                  max={30}
                  className="field mt-1.5"
                  value={state.profile.quranTarget}
                  onChange={(e) => updateProfile({ quranTarget: Math.max(1, Number(e.target.value)) })}
                />
              </label>
            </div>
            <p className="mt-3 text-[0.68rem] leading-relaxed text-faint">
              Moving the start date shifts the whole map. It does not delete any logs. Days already
              lived keep their record.
            </p>
          </section>

          <section className="card p-5 sm:p-6">
            <SectionTitle title="Backup and restore" hint={`${sizeKb} KB on this device`} />
            <div className="flex flex-wrap gap-2">
              <button type="button" className="btn-outline text-xs" onClick={exportData}>
                <Download className="h-3.5 w-3.5" /> Export JSON
              </button>
              <button
                type="button"
                className="btn-outline text-xs"
                onClick={() => fileRef.current?.click()}
              >
                <Upload className="h-3.5 w-3.5" /> Import backup
              </button>
              <input ref={fileRef} type="file" accept="application/json" className="hidden" onChange={importData} />
            </div>
            {message ? <p className="mt-3 text-xs text-emerald">{message}</p> : null}
            <div className="mt-4 flex items-start gap-2 rounded-xl border border-line-soft bg-coal px-3 py-2.5 text-[0.68rem] leading-relaxed text-faint">
              <HardDrive className="mt-0.5 h-3.5 w-3.5 shrink-0 text-gold/70" />
              {Object.keys(state.days).length} {Object.keys(state.days).length === 1 ? 'day' : 'days'} logged · {state.journal.length} journal entries ·{' '}
              {state.triggers.length} urge logs. Export before changing devices or clearing browser data.
            </div>
          </section>

          <section className="card border-danger/20 p-5 sm:p-6">
            <SectionTitle title="Begin again" hint="This cannot be undone" />
            <p className="text-xs leading-relaxed text-muted">
              Reset removes every log, entry, and plan from this browser. Export first if there is
              anything worth keeping.
            </p>
            <button type="button" className="btn-danger mt-4 text-xs" onClick={reset}>
              <Trash2 className="h-3.5 w-3.5" /> Reset all data
            </button>
          </section>
        </div>

        <div className="space-y-5">
          <section className="card p-5 sm:p-6">
            <SectionTitle title="About the app" hint="Version 1.0" />
            <p className="text-xs leading-relaxed text-muted">
              Mujāhid Mode is a local-first discipline system inspired by the 60-day Mujāhid Mode
              curriculum: eight modules, twenty-three lessons, daily practice, tools, and three
              milestones. The content here is a practical synthesis, not a reproduction of the paid
              course.
            </p>
            <div className="mt-4 space-y-2 text-[0.7rem] leading-relaxed text-faint">
              <p className="flex items-start gap-2">
                <Shield className="mt-0.5 h-3.5 w-3.5 shrink-0 text-gold/70" />
                No account, no analytics, no server. Everything is stored in your browser’s local
                storage unless you export it.
              </p>
              <p className="flex items-start gap-2">
                <ArrowLeft className="mt-0.5 h-3.5 w-3.5 shrink-0 text-gold/70" />
                The app works offline once installed. Use your browser’s “Install app” action.
              </p>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              <Link to="/journey" className="btn-outline text-xs">
                Review the curriculum
              </Link>
              <Link to="/progress" className="btn-ghost text-xs">
                See the scoring
              </Link>
            </div>
          </section>

          <Callout tone="gold" title="A note on the references">
            Qur’anic translations are paraphrased for readability and cited by surah and ayah.
            Hadith are attributed where a collection is known; gradings vary and wording is
            approximate. For worship, rulings, and anything binding, return to the Arabic, the
            scholars, and a qualified teacher.
          </Callout>

          <Callout tone="emerald" title="The system in one paragraph">
            Five prayers, a daily portion of Quran, dhikr, one deep block, guarded attention, and
            lights out. Log it honestly. Review weekly. Change one thing. Never miss twice. When you
            fall, return within the hour. That is the whole code.
          </Callout>
        </div>
      </div>
    </div>
  )
}