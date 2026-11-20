import { describe, expect, it } from 'vitest'
import { ALL_LESSONS, MODULES } from '../data/curriculum'
import { planFor } from '../lib/plan'
import { elapsedDays, isHeld, scoreDay, streak } from '../lib/stats'
import type { DayLog, Profile, PrayerKey } from '../types'

const PROFILE: Profile = {
  name: 'Test',
  startDate: '2026-01-01',
  niyyah: 'Test',
  win: 'Test',
  quranLevel: 'returning',
  quranTarget: 2,
  sleepTarget: '23:00',
}

const PERFECT: DayLog = {
  prayers: { fajr: 'ontime', dhuhr: 'ontime', asr: 'ontime', maghrib: 'ontime', isha: 'jamaah' },
  quranPages: 2,
  dhikr: true,
  deepWork: true,
  screenFast: true,
  sleepOnTime: true,
}

const emptyLog = (): DayLog => ({
  prayers: {},
  quranPages: 0,
  dhikr: false,
  deepWork: false,
  screenFast: false,
  sleepOnTime: false,
})

describe('curriculum', () => {
  it('has 8 modules and 23 lessons', () => {
    expect(MODULES).toHaveLength(8)
    expect(ALL_LESSONS).toHaveLength(23)
  })

  it('has unique lesson and drill ids', () => {
    const lessonIds = ALL_LESSONS.map((l) => l.id)
    expect(new Set(lessonIds).size).toBe(lessonIds.length)
    const drillIds = ALL_LESSONS.flatMap((l) => l.drills.map((d) => d.id))
    expect(new Set(drillIds).size).toBe(drillIds.length)
  })
})

describe('60-day plan', () => {
  const plan = planFor(PROFILE)

  it('covers days 1 to 60 exactly once', () => {
    expect(plan).toHaveLength(60)
    expect(plan.map((d) => d.day)).toEqual(Array.from({ length: 60 }, (_, i) => i + 1))
  })

  it('schedules all 23 lessons', () => {
    const scheduled = plan.filter((d) => d.lessonId).map((d) => d.lessonId)
    expect(scheduled).toHaveLength(23)
    expect(new Set(scheduled).size).toBe(23)
  })

  it('places the three milestones on days 21, 42 and 60', () => {
    const milestones = plan.filter((d) => d.type === 'milestone').map((d) => d.day)
    expect(milestones).toEqual([21, 42, 60])
  })

  it('starts on the profile start date', () => {
    expect(plan[0].date).toBe('2026-01-01')
    expect(plan[59].date).toBe('2026-03-01')
  })
})

describe('scoring', () => {
  it('gives a perfect day 100', () => {
    expect(scoreDay(PERFECT, 2)).toBe(100)
  })

  it('holds a day at 70 and above', () => {
    expect(isHeld(70)).toBe(true)
    expect(isHeld(69)).toBe(false)
  })

  it('keeps prayers heavier than the rest', () => {
    const prayersOnly: DayLog = { ...emptyLog(), prayers: PERFECT.prayers }
    expect(scoreDay(prayersOnly, 2)).toBe(50)
    const quranOnly: DayLog = { ...emptyLog(), quranPages: 2 }
    expect(scoreDay(quranOnly, 2)).toBe(15)
  })

  it('scores a missed prayer at zero and a late one at half', () => {
    const log = emptyLog()
    log.prayers.fajr = 'missed'
    log.prayers.dhuhr = 'late'
    expect(scoreDay(log, 2)).toBe(5)
  })

  it('counts elapsed days inside the 60-day window', () => {
    expect(elapsedDays(PROFILE, '2026-01-01')).toBe(1)
    expect(elapsedDays(PROFILE, '2026-01-10')).toBe(10)
    expect(elapsedDays(PROFILE, '2026-06-01')).toBe(60)
    expect(elapsedDays(PROFILE, '2025-12-01')).toBe(0)
  })
})

describe('streak', () => {
  it('counts consecutive held days', () => {
    const days = {
      '2026-01-01': PERFECT,
      '2026-01-02': PERFECT,
      '2026-01-03': PERFECT,
    }
    expect(streak(days, PROFILE, '2026-01-03')).toBe(3)
  })

  it('gives today a grace period until it is logged', () => {
    const days = {
      '2026-01-01': PERFECT,
      '2026-01-02': PERFECT,
    }
    expect(streak(days, PROFILE, '2026-01-03')).toBe(2)
  })

  it('breaks on an unheld day', () => {
    const weak = emptyLog()
    ;(['fajr', 'dhuhr', 'asr'] as PrayerKey[]).forEach((k) => {
      weak.prayers[k] = 'ontime'
    })
    const days = {
      '2026-01-01': PERFECT,
      '2026-01-02': weak,
      '2026-01-03': PERFECT,
    }
    expect(streak(days, PROFILE, '2026-01-03')).toBe(1)
  })
})