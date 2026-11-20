import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, ArrowRight, Check, ShieldCheck } from 'lucide-react'
import { useStore } from '../store/useStore'
import { todayKey } from '../lib/date'
import { Mark } from '../components/ui'

const TOTAL_STEPS = 3

export function Onboarding() {
  const navigate = useNavigate()
  const completeOnboarding = useStore((s) => s.completeOnboarding)
  const existing = useStore((s) => s.profile)

  const [step, setStep] = useState(1)
  const [name, setName] = useState(existing.name)
  const [niyyah, setNiyyah] = useState(existing.niyyah)
  const [win, setWin] = useState(existing.win)
  const [startDate, setStartDate] = useState(existing.startDate || todayKey())
  const [quranLevel, setQuranLevel] = useState(existing.quranLevel)
  const [quranTarget, setQuranTarget] = useState(existing.quranTarget || 2)
  const [sleepTarget, setSleepTarget] = useState(existing.sleepTarget || '23:00')
  const [agreed, setAgreed] = useState(false)

  const stepOneReady = name.trim().length >= 2 && niyyah.trim().length >= 8
  const stepTwoReady = quranTarget >= 1 && Boolean(startDate)

  function finish() {
    completeOnboarding({
      name: name.trim(),
      startDate,
      niyyah: niyyah.trim(),
      win: win.trim(),
      quranLevel,
      quranTarget,
      sleepTarget,
    })
    navigate('/today', { replace: true })
  }

  function skip() {
    completeOnboarding({
      ...existing,
      name: existing.name || 'Mujāhid',
      startDate: existing.startDate || todayKey(),
      quranTarget: existing.quranTarget || 2,
      sleepTarget: existing.sleepTarget || '23:00',
    })
    navigate('/today', { replace: true })
  }

  return (
    <div className="min-h-dvh lg:grid lg:grid-cols-[1.05fr_1fr]">
      <aside className="geo relative hidden flex-col justify-between overflow-hidden border-r border-line-soft bg-coal p-12 lg:flex">
        <div className="flex items-center gap-3">
          <span className="text-gold">
            <Mark className="h-10 w-10" />
          </span>
          <div>
            <p className="font-display text-lg text-bone">Mujāhid Mode</p>
            <p className="text-[0.62rem] uppercase tracking-[0.28em] text-faint">
              The disciplined Muslim code
            </p>
          </div>
        </div>

        <div className="relative max-w-lg">
          <p className="eyebrow text-gold">Sixty days. One system.</p>
          <h1 className="display mt-5 text-6xl leading-[0.98] text-bone">
            You are one decision away from never wasting your time again.
          </h1>
          <p className="mt-6 max-w-md text-[0.95rem] leading-relaxed text-muted">
            Not another course you will get to later. A daily operating system for prayer, time,
            desire, and attention — built to be used when motivation has left the room.
          </p>
          <div className="mt-10 grid grid-cols-3 gap-4 border-t border-line pt-6">
            {[
              ['8', 'modules'],
              ['23', 'lessons'],
              ['60', 'days'],
            ].map(([n, label]) => (
              <div key={label}>
                <p className="font-display text-3xl text-gold">{n}</p>
                <p className="mt-1 text-[0.65rem] uppercase tracking-[0.2em] text-faint">{label}</p>
              </div>
            ))}
          </div>
        </div>

        <p className="max-w-md text-[0.68rem] leading-relaxed text-faint">
          A personal discipline tool inspired by the Mujāhid Mode curriculum. It is not a
          substitute for scholarly guidance, therapy, or medical care.
        </p>
      </aside>

      <main className="flex min-h-dvh flex-col px-5 py-8 sm:px-10 lg:px-16 lg:py-12">
        <div className="mb-10 flex items-center justify-between lg:hidden">
          <div className="flex items-center gap-2.5">
            <span className="text-gold">
              <Mark className="h-8 w-8" />
            </span>
            <span className="font-display text-base text-bone">Mujāhid Mode</span>
          </div>
          <span className="text-xs text-faint">
            {step} / {TOTAL_STEPS}
          </span>
        </div>

        <div className="mx-auto flex w-full max-w-md flex-1 flex-col justify-center">
          <div className="mb-8 flex gap-1.5">
            {Array.from({ length: TOTAL_STEPS }).map((_, i) => (
              <div
                key={i}
                className={`h-1 flex-1 rounded-full transition-colors ${
                  i < step ? 'bg-gold' : 'bg-line-soft'
                }`}
              />
            ))}
          </div>

          {step === 1 ? (
            <section className="animate-rise">
              <p className="eyebrow text-gold">Step one · Niyyah</p>
              <h2 className="display mt-3 text-4xl leading-[1.05]">Before the plan, the intention.</h2>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                This is not a productivity challenge. It is a return. Say who you are and why you
                are here — you will read this again on day 60.
              </p>

              <label className="mt-8 block">
                <span className="eyebrow">Your name</span>
                <input
                  className="field mt-2"
                  aria-label="Your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="What should the record call you?"
                  autoFocus
                />
              </label>

              <label className="mt-5 block">
                <span className="eyebrow">Your niyyah</span>
                <textarea
                  className="field mt-2 min-h-28 resize-y"
                  aria-label="Your niyyah"
                  value={niyyah}
                  onChange={(e) => setNiyyah(e.target.value)}
                  placeholder="I am doing this for Allah, to become the man who prays Fajr, protects his time, and stops negotiating with his nafs."
                />
                <span className="mt-2 block text-[0.7rem] text-faint">
                  Be specific. Vague intentions produce vague days.
                </span>
              </label>
            </section>
          ) : null}

          {step === 2 ? (
            <section className="animate-rise">
              <p className="eyebrow text-gold">Step two · The standard</p>
              <h2 className="display mt-3 text-4xl leading-[1.05]">Define what a winning day is.</h2>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                You will be scored out of 100. The score is a mirror, not a master.
              </p>

              <label className="mt-8 block">
                <span className="eyebrow">A winning day looks like</span>
                <textarea
                  className="field mt-2 min-h-20 resize-y"
                  value={win}
                  onChange={(e) => setWin(e.target.value)}
                  placeholder="Five prayers on time, two pages of Quran, one deep work block, phone out of the bedroom."
                />
              </label>

              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                <label className="block">
                  <span className="eyebrow">Start date</span>
                  <input
                    type="date"
                    className="field mt-2"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                  />
                </label>
                <label className="block">
                  <span className="eyebrow">Sleep target</span>
                  <input
                    type="time"
                    className="field mt-2"
                    value={sleepTarget}
                    onChange={(e) => setSleepTarget(e.target.value)}
                  />
                </label>
              </div>

              <fieldset className="mt-5">
                <span className="eyebrow">Quran relationship</span>
                <div className="mt-2 grid grid-cols-3 gap-2">
                  {(
                    [
                      ['beginner', 'Beginner'],
                      ['returning', 'Returning'],
                      ['established', 'Established'],
                    ] as const
                  ).map(([value, label]) => (
                    <button
                      key={value}
                      type="button"
                      onClick={() => {
                        setQuranLevel(value)
                        setQuranTarget(value === 'beginner' ? 1 : value === 'returning' ? 2 : 5)
                      }}
                      className={`rounded-xl border px-3 py-2.5 text-xs transition-colors ${
                        quranLevel === value
                          ? 'border-gold/50 bg-gold/10 text-gold'
                          : 'border-line text-muted hover:text-bone'
                      }`}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </fieldset>

              <label className="mt-4 block">
                <span className="eyebrow">Daily Quran target — pages</span>
                <div className="mt-2 flex items-center gap-3">
                  <input
                    type="range"
                    min={1}
                    max={20}
                    value={quranTarget}
                    onChange={(e) => setQuranTarget(Number(e.target.value))}
                    className="w-full accent-[#c9a55f]"
                  />
                  <span className="w-10 text-right font-display text-xl text-gold">{quranTarget}</span>
                </div>
              </label>
            </section>
          ) : null}

          {step === 3 ? (
            <section className="animate-rise">
              <p className="eyebrow text-gold">Step three · The contract</p>
              <h2 className="display mt-3 text-4xl leading-[1.05]">Sign it honestly.</h2>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                Not a vow to be perfect. A commitment to return fast.
              </p>

              <div className="card mt-7 divide-y divide-line-soft">
                <div className="px-5 py-4">
                  <p className="eyebrow">The mujāhid</p>
                  <p className="mt-1 text-lg text-bone">{name || '—'}</p>
                </div>
                <div className="px-5 py-4">
                  <p className="eyebrow">The niyyah</p>
                  <p className="mt-1 text-sm leading-relaxed text-muted">{niyyah || '—'}</p>
                </div>
                <div className="px-5 py-4">
                  <p className="eyebrow">The win</p>
                  <p className="mt-1 text-sm leading-relaxed text-muted">{win || 'Five prayers, Quran, one deep block, guarded attention.'}</p>
                </div>
                <div className="grid grid-cols-3 gap-3 px-5 py-4">
                  <div>
                    <p className="eyebrow">Starts</p>
                    <p className="mt-1 text-sm text-bone">{startDate}</p>
                  </div>
                  <div>
                    <p className="eyebrow">Quran</p>
                    <p className="mt-1 text-sm text-bone">{quranTarget} pages/day</p>
                  </div>
                  <div>
                    <p className="eyebrow">Lights out</p>
                    <p className="mt-1 text-sm text-bone">{sleepTarget}</p>
                  </div>
                </div>
              </div>

              <div className="mt-5 space-y-2.5 text-sm text-muted">
                {[
                  'I may miss once. I will never miss twice.',
                  'I will log honestly, including the days I am ashamed of.',
                  'I will change one thing per week, not five.',
                  'I will show one trustworthy person my weekly review.',
                ].map((rule) => (
                  <p key={rule} className="flex gap-2.5">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                    {rule}
                  </p>
                ))}
              </div>

              <label className="mt-6 flex cursor-pointer items-start gap-3 rounded-xl border border-line bg-coal px-4 py-3.5">
                <input
                  type="checkbox"
                  checked={agreed}
                  onChange={(e) => setAgreed(e.target.checked)}
                  className="mt-0.5 h-4 w-4 accent-[#c9a55f]"
                />
                <span className="text-xs leading-relaxed text-muted">
                  I understand this is a 60-day system, that progress is measured in returns rather
                  than perfection, and that the data lives on this device.
                </span>
              </label>
            </section>
          ) : null}

          <div className="mt-10 flex items-center justify-between">
            <button
              type="button"
              className="btn-ghost px-0"
              onClick={() => (step === 1 ? skip() : setStep(step - 1))}
            >
              <ArrowLeft className="h-4 w-4" />
              {step === 1 ? 'Skip for now' : 'Back'}
            </button>

            {step < TOTAL_STEPS ? (
              <button
                type="button"
                className="btn-gold"
                disabled={step === 1 ? !stepOneReady : !stepTwoReady}
                onClick={() => setStep(step + 1)}
              >
                Continue
                <ArrowRight className="h-4 w-4" />
              </button>
            ) : (
              <button type="button" className="btn-gold" disabled={!agreed} onClick={finish}>
                <ShieldCheck className="h-4 w-4" />
                Enter the mode
              </button>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}