import { NavLink, Outlet, Navigate } from 'react-router-dom'
import {
  BookOpen,
  ChartNoAxesColumn,
  Compass,
  Flame,
  LayoutGrid,
  Settings,
  Wrench,
} from 'lucide-react'
import { useStore } from '../store/useStore'
import { currentPlanDay, elapsedDays, streak } from '../lib/stats'
import { cn } from '../lib/cn'
import { Mark } from './ui'

const NAV = [
  { to: '/today', label: 'Today', icon: LayoutGrid },
  { to: '/journey', label: 'Journey', icon: Compass },
  { to: '/tools', label: 'Tools', icon: Wrench },
  { to: '/progress', label: 'Progress', icon: ChartNoAxesColumn },
  { to: '/settings', label: 'Settings', icon: Settings },
]

function Brand() {
  return (
    <div className="flex items-center gap-3">
      <div className="text-gold">
        <Mark className="h-9 w-9" />
      </div>
      <div className="leading-tight">
        <p className="font-display text-[1.05rem] tracking-tight text-bone">Mujāhid Mode</p>
        <p className="text-[0.6rem] uppercase tracking-[0.24em] text-faint">The disciplined code</p>
      </div>
    </div>
  )
}

function SidebarStats() {
  const profile = useStore((s) => s.profile)
  const days = useStore((s) => s.days)
  const day = currentPlanDay(profile)
  const done = elapsedDays(profile)
  const current = streak(days, profile)
  return (
    <div className="rounded-2xl border border-line-soft bg-coal p-4">
      <div className="flex items-center justify-between">
        <span className="eyebrow">Day {day} of 60</span>
        <span className="flex items-center gap-1 text-xs text-gold">
          <Flame className="h-3.5 w-3.5" />
          {current}
        </span>
      </div>
      <div className="mt-3 h-1 w-full overflow-hidden rounded-full bg-line-soft">
        <div
          className="h-full rounded-full bg-gold transition-[width] duration-500"
          style={{ width: `${(done / 60) * 100}%` }}
        />
      </div>
      <p className="mt-3 text-[0.7rem] leading-relaxed text-faint">
        {current > 0
          ? `${current} day${current === 1 ? '' : 's'} held in a row. Never miss twice.`
          : 'A day is held at 70 points. Start with one prayer on time.'}
      </p>
    </div>
  )
}

export function Shell() {
  const onboarded = useStore((s) => s.onboarded)
  const profile = useStore((s) => s.profile)
  const days = useStore((s) => s.days)
  if (!onboarded) return <Navigate to="/onboarding" replace />
  const mobileDay = currentPlanDay(profile)
  const mobileStreak = streak(days, profile)

  return (
    <div className="min-h-dvh">
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-[268px] flex-col border-r border-line-soft bg-coal/70 px-5 py-7 backdrop-blur lg:flex">
        <Brand />
        <nav className="mt-10 flex flex-col gap-1">
          {NAV.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                cn(
                  'group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-colors',
                  isActive
                    ? 'bg-raised text-bone'
                    : 'text-muted hover:bg-raised/60 hover:text-bone',
                )
              }
            >
              {({ isActive }) => (
                <>
                  <Icon
                    className={cn('h-[1.05rem] w-[1.05rem]', isActive ? 'text-gold' : 'text-faint')}
                    strokeWidth={1.7}
                  />
                  {label}
                  {isActive ? <span className="ml-auto h-1 w-1 rounded-full bg-gold" /> : null}
                </>
              )}
            </NavLink>
          ))}
        </nav>
        <div className="mt-auto space-y-4">
          <SidebarStats />
          <p className="px-1 text-[0.65rem] leading-relaxed text-faint">
            Local-first. Your record stays on this device unless you export it.
          </p>
        </div>
      </aside>

      <header className="sticky top-0 z-30 flex items-center justify-between gap-3 border-b border-line-soft bg-ink/90 px-4 py-2.5 backdrop-blur lg:hidden">
        <div className="flex min-w-0 items-center gap-2.5">
          <span className="shrink-0 text-gold">
            <Mark className="h-7 w-7" />
          </span>
          <div className="min-w-0 leading-tight">
            <p className="truncate font-display text-[0.95rem] text-bone">Mujāhid Mode</p>
            <p className="truncate text-[0.5rem] uppercase tracking-[0.2em] text-faint">
              The disciplined code
            </p>
          </div>
        </div>
        <div className="flex shrink-0 items-center gap-1.5">
          <span className="rounded-full border border-line px-2 py-1 text-[0.6rem] text-muted">
            Day {mobileDay}/60
          </span>
          <span className="flex items-center gap-1 rounded-full border border-gold/25 bg-gold/[0.06] px-2 py-1 text-[0.6rem] text-gold">
            <Flame className="h-3 w-3" />
            {mobileStreak}
          </span>
        </div>
      </header>

      <div className="lg:pl-[268px]">
        <main className="mx-auto w-full max-w-5xl px-4 pb-28 pt-7 sm:px-6 lg:px-10 lg:pb-16 lg:pt-10">
          <Outlet />
        </main>
      </div>

      <nav className="safe-bottom fixed inset-x-0 bottom-0 z-40 border-t border-line-soft bg-ink/95 backdrop-blur lg:hidden">
        <div className="mx-auto grid max-w-lg grid-cols-5">
          {NAV.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                cn(
                  'flex flex-col items-center gap-1 py-2.5 text-[0.62rem] tracking-wide transition-colors',
                  isActive ? 'text-gold' : 'text-faint',
                )
              }
            >
              <Icon className="h-5 w-5" strokeWidth={1.6} />
              {label}
            </NavLink>
          ))}
        </div>
      </nav>
    </div>
  )
}

export function ReadingShell() {
  return (
    <div className="min-h-dvh">
      <header className="border-b border-line-soft bg-coal/60">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-4 py-4 sm:px-6">
          <NavLink to="/today" className="flex items-center gap-2.5">
            <span className="text-gold">
              <Mark className="h-7 w-7" />
            </span>
            <span className="font-display text-sm text-bone">Mujāhid Mode</span>
          </NavLink>
          <span className="flex items-center gap-1.5 text-xs text-faint">
            <BookOpen className="h-3.5 w-3.5" /> Reading
          </span>
        </div>
      </header>
      <main className="mx-auto w-full max-w-3xl px-4 pb-24 pt-8 sm:px-6">
        <Outlet />
      </main>
    </div>
  )
}