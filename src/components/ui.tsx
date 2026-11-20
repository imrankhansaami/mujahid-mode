import type { ReactNode } from 'react'
import { cn } from '../lib/cn'

export function Mark({ className = 'h-8 w-8' }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" className={className} aria-hidden="true">
      <rect x="3" y="3" width="42" height="42" rx="11" stroke="currentColor" strokeOpacity="0.35" />
      <path
        d="M24 8 40 24 24 40 8 24 24 8Z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeOpacity="0.9"
      />
      <path
        d="M24 15.5 32.5 24 24 32.5 15.5 24 24 15.5Z"
        fill="currentColor"
        fillOpacity="0.16"
        stroke="currentColor"
        strokeWidth="1.2"
      />
      <circle cx="24" cy="24" r="2.2" fill="currentColor" />
    </svg>
  )
}

export function Eyebrow({ children, className }: { children: ReactNode; className?: string }) {
  return <p className={cn('eyebrow', className)}>{children}</p>
}

export function PageHeader({
  eyebrow,
  title,
  description,
  action,
}: {
  eyebrow?: string
  title: ReactNode
  description?: ReactNode
  action?: ReactNode
}) {
  return (
    <header className="mb-8 flex flex-wrap items-start justify-between gap-4">
      <div className="max-w-2xl">
        {eyebrow ? <Eyebrow className="mb-2">{eyebrow}</Eyebrow> : null}
        <h1 className="display text-4xl leading-[1.05] sm:text-5xl">{title}</h1>
        {description ? (
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted">{description}</p>
        ) : null}
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </header>
  )
}

export function SectionTitle({
  title,
  hint,
  action,
}: {
  title: string
  hint?: string
  action?: ReactNode
}) {
  return (
    <div className="mb-4 flex items-end justify-between gap-3">
      <div>
        <h2 className="text-sm font-semibold tracking-wide text-bone">{title}</h2>
        {hint ? <p className="mt-1 text-xs text-faint">{hint}</p> : null}
      </div>
      {action}
    </div>
  )
}

export function Badge({
  children,
  tone = 'neutral',
  className,
}: {
  children: ReactNode
  tone?: 'neutral' | 'gold' | 'emerald' | 'amber' | 'danger'
  className?: string
}) {
  const tones = {
    neutral: 'border-line text-muted',
    gold: 'border-gold/35 bg-gold/10 text-gold',
    emerald: 'border-emerald/35 bg-emerald/10 text-emerald',
    amber: 'border-amber/35 bg-amber/10 text-amber',
    danger: 'border-danger/35 bg-danger/10 text-danger',
  }
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[0.68rem] font-medium tracking-wide',
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  )
}

export function StatTile({
  label,
  value,
  sub,
  accent,
}: {
  label: string
  value: ReactNode
  sub?: string
  accent?: boolean
}) {
  return (
    <div className="card px-4 py-4">
      <p className="eyebrow">{label}</p>
      <p
        className={cn(
          'mt-2 font-display text-3xl leading-none',
          accent ? 'text-gold' : 'text-bone',
        )}
      >
        {value}
      </p>
      {sub ? <p className="mt-2 text-xs text-faint">{sub}</p> : null}
    </div>
  )
}

export function ProgressBar({
  value,
  max = 100,
  className,
  tone = 'gold',
}: {
  value: number
  max?: number
  className?: string
  tone?: 'gold' | 'emerald' | 'bone'
}) {
  const pct = Math.max(0, Math.min(100, (value / max) * 100))
  const colors = { gold: 'bg-gold', emerald: 'bg-emerald', bone: 'bg-bone' }
  return (
    <div className={cn('h-1.5 w-full overflow-hidden rounded-full bg-line-soft', className)}>
      <div
        className={cn('h-full rounded-full transition-[width] duration-500', colors[tone])}
        style={{ width: `${pct}%` }}
      />
    </div>
  )
}

export function Ring({
  value,
  size = 156,
  label,
  sub,
}: {
  value: number
  size?: number
  label?: string
  sub?: string
}) {
  const stroke = 8
  const r = (size - stroke) / 2
  const c = 2 * Math.PI * r
  const pct = Math.max(0, Math.min(100, value))
  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="#1c231e" strokeWidth={stroke} />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke="#c9a55f"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={c - (pct / 100) * c}
          className="transition-[stroke-dashoffset] duration-700"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="font-display text-4xl leading-none text-bone">{Math.round(pct)}</span>
        {label ? <span className="mt-1 text-[0.65rem] uppercase tracking-[0.2em] text-faint">{label}</span> : null}
        {sub ? <span className="mt-0.5 text-[0.7rem] text-gold">{sub}</span> : null}
      </div>
    </div>
  )
}

export function EmptyState({
  title,
  body,
  action,
}: {
  title: string
  body: string
  action?: ReactNode
}) {
  return (
    <div className="card-soft px-5 py-8 text-center">
      <p className="font-display text-xl text-bone">{title}</p>
      <p className="mx-auto mt-2 max-w-sm text-sm leading-relaxed text-muted">{body}</p>
      {action ? <div className="mt-4 flex justify-center">{action}</div> : null}
    </div>
  )
}

export function Callout({
  tone = 'gold',
  children,
  title,
}: {
  tone?: 'gold' | 'emerald' | 'danger'
  children: ReactNode
  title?: string
}) {
  const tones = {
    gold: 'border-gold/25 bg-gold/[0.06]',
    emerald: 'border-emerald/25 bg-emerald/[0.07]',
    danger: 'border-danger/25 bg-danger/[0.06]',
  }
  return (
    <div className={cn('rounded-2xl border px-5 py-4', tones[tone])}>
      {title ? <p className="mb-1 text-sm font-semibold text-bone">{title}</p> : null}
      <div className="text-sm leading-relaxed text-muted">{children}</div>
    </div>
  )
}

export function Divider({ className }: { className?: string }) {
  return <div className={cn('h-px w-full bg-line-soft', className)} />
}