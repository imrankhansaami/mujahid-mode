import { PRAYERS, type AppState, type DayLog, type PrayerState, type Profile } from '../types'
import { addDays, diffDays, todayKey } from './date'

export const TOTAL_DAYS = 60

export function defaultDay(): DayLog {
  return {
    prayers: {},
    quranPages: 0,
    dhikr: false,
    deepWork: false,
    screenFast: false,
    sleepOnTime: false,
  }
}

export function prayerPoints(state?: PrayerState): number {
  if (!state || state === 'missed') return 0
  if (state === 'late') return 5
  return 10
}

export function scoreDay(log: DayLog | undefined, quranTarget: number): number {
  if (!log) return 0
  const prayers = PRAYERS.reduce((sum, p) => sum + prayerPoints(log.prayers[p.key]), 0)
  const quran = log.quranPages <= 0 ? 0 : log.quranPages >= quranTarget ? 15 : 9
  const extras =
    (log.dhikr ? 10 : 0) +
    (log.deepWork ? 10 : 0) +
    (log.screenFast ? 10 : 0) +
    (log.sleepOnTime ? 5 : 0)
  return Math.round(prayers + quran + extras)
}

export function isHeld(score: number): boolean {
  return score >= 70
}

export function planDayNumber(profile: Profile, dateKey: string): number {
  return diffDays(profile.startDate, dateKey) + 1
}

export function elapsedDays(profile: Profile, today = todayKey()): number {
  const raw = diffDays(profile.startDate, today) + 1
  return Math.max(0, Math.min(TOTAL_DAYS, raw))
}

export function currentPlanDay(profile: Profile, today = todayKey()): number {
  return Math.max(1, Math.min(TOTAL_DAYS, planDayNumber(profile, today)))
}

export function streak(days: Record<string, DayLog>, profile: Profile, today = todayKey()): number {
  const target = profile.quranTarget || 1
  let cursor = today
  if (!isHeld(scoreDay(days[cursor], target))) {
    cursor = addDays(cursor, -1)
  }
  let count = 0
  for (let i = 0; i < TOTAL_DAYS; i += 1) {
    const dayNum = planDayNumber(profile, cursor)
    if (dayNum < 1 || dayNum > TOTAL_DAYS) break
    if (!isHeld(scoreDay(days[cursor], target))) break
    count += 1
    cursor = addDays(cursor, -1)
  }
  return count
}

export interface Summary {
  daysElapsed: number
  daysHeld: number
  consistency: number
  bestStreak: number
  currentStreak: number
  avgScore: number
  prayersOnTime: number
  prayersJamaah: number
  prayersLate: number
  prayersMissed: number
  quranPages: number
  quranDays: number
  dhikrDays: number
  deepWorkDays: number
  screenFastDays: number
  sleepDays: number
  heldByDay: Record<number, boolean>
  scoresByDay: Record<number, number>
}

export function summarize(state: AppState, today = todayKey()): Summary {
  const target = state.profile.quranTarget || 1
  const elapsed = elapsedDays(state.profile, today)
  let daysHeld = 0
  let scoreSum = 0
  let prayersOnTime = 0
  let prayersJamaah = 0
  let prayersLate = 0
  let prayersMissed = 0
  let quranPages = 0
  let quranDays = 0
  let dhikrDays = 0
  let deepWorkDays = 0
  let screenFastDays = 0
  let sleepDays = 0
  const heldByDay: Record<number, boolean> = {}
  const scoresByDay: Record<number, number> = {}

  for (let d = 1; d <= elapsed; d += 1) {
    const date = addDays(state.profile.startDate, d - 1)
    const log = state.days[date]
    const score = scoreDay(log, target)
    scoresByDay[d] = score
    heldByDay[d] = isHeld(score)
    if (heldByDay[d]) daysHeld += 1
    scoreSum += score
    if (!log) continue
    for (const p of PRAYERS) {
      const s = log.prayers[p.key]
      if (s === 'jamaah') prayersJamaah += 1
      else if (s === 'ontime') prayersOnTime += 1
      else if (s === 'late') prayersLate += 1
      else if (s === 'missed') prayersMissed += 1
    }
    quranPages += log.quranPages || 0
    if (log.quranPages > 0) quranDays += 1
    if (log.dhikr) dhikrDays += 1
    if (log.deepWork) deepWorkDays += 1
    if (log.screenFast) screenFastDays += 1
    if (log.sleepOnTime) sleepDays += 1
  }

  let bestStreak = 0
  let run = 0
  for (let d = 1; d <= elapsed; d += 1) {
    if (heldByDay[d]) {
      run += 1
      bestStreak = Math.max(bestStreak, run)
    } else {
      run = 0
    }
  }

  return {
    daysElapsed: elapsed,
    daysHeld,
    consistency: elapsed > 0 ? Math.round((daysHeld / elapsed) * 100) : 0,
    bestStreak,
    currentStreak: streak(state.days, state.profile, today),
    avgScore: elapsed > 0 ? Math.round(scoreSum / elapsed) : 0,
    prayersOnTime,
    prayersJamaah,
    prayersLate,
    prayersMissed,
    quranPages,
    quranDays,
    dhikrDays,
    deepWorkDays,
    screenFastDays,
    sleepDays,
    heldByDay,
    scoresByDay,
  }
}

export function scoreLabel(score: number): string {
  if (score >= 90) return 'Excellent'
  if (score >= 70) return 'Held'
  if (score >= 40) return 'Partial'
  if (score > 0) return 'Barely'
  return 'Unlogged'
}