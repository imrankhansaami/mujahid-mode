export const DAY_MS = 86_400_000

export function toKey(date: Date): string {
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')
  return `${y}-${m}-${d}`
}

export function todayKey(): string {
  return toKey(new Date())
}

export function parseKey(key: string): Date {
  const [y, m, d] = key.split('-').map(Number)
  return new Date(y, m - 1, d)
}

export function addDays(key: string, days: number): string {
  const d = parseKey(key)
  d.setDate(d.getDate() + days)
  return toKey(d)
}

export function diffDays(from: string, to: string): number {
  const a = parseKey(from).getTime()
  const b = parseKey(to).getTime()
  return Math.round((b - a) / DAY_MS)
}

export function weekdayShort(key: string): string {
  return parseKey(key).toLocaleDateString(undefined, { weekday: 'short' })
}

export function formatLong(key: string): string {
  return parseKey(key).toLocaleDateString(undefined, {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  })
}

export function formatMedium(key: string): string {
  return parseKey(key).toLocaleDateString(undefined, {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  })
}

export function formatShort(key: string): string {
  return parseKey(key).toLocaleDateString(undefined, {
    month: 'short',
    day: 'numeric',
  })
}

export function greeting(date = new Date()): string {
  const h = date.getHours()
  if (h < 5) return 'Still awake'
  if (h < 12) return 'Good morning'
  if (h < 17) return 'Good afternoon'
  return 'Good evening'
}