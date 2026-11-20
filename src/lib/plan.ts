import { ALL_LESSONS } from '../data/curriculum'
import type { PlanDay, PlanDayType, Profile } from '../types'
import { addDays } from './date'

const REVIEW_FOCUS = 'Twenty minutes: look at the week, name one win, one leak, one change.'
const INTEGRATION_FOCUS = 'No new input. Family, masjid, rest, and a long walk without a phone.'
const APPLY_FOCUS = 'Live the day. Prayer, Quran, deep block, the floor of your plan.'

const MILESTONES: Record<number, { title: string; focus: string }> = {
  21: {
    title: 'Milestone I — The First Gate',
    focus:
      'Read your contract. What has actually changed? What is still theatre? Write an honest page, then recommit for the next twenty-one.',
  },
  42: {
    title: 'Milestone II — The Midpoint',
    focus:
      'Twenty-one days left. Review the numbers, name the one leak you have been protecting, and choose the single change that carries you to day sixty.',
  },
  60: {
    title: 'Milestone III — The Return',
    focus:
      'Graduation day. Read your day-one contract, write your day-sixty-one plan, and thank Allah for the tawfiq. This is not the end of the system.',
  },
}

interface Slot {
  day: number
  type: PlanDayType
  lessonId?: string
  title: string
  focus: string
}

function buildSlots(): Slot[] {
  const slots: Slot[] = []
  const lessonIds = ALL_LESSONS.map((l) => l.id)
  let lessonIndex = 0

  for (let week = 0; week < 8; week += 1) {
    for (let offset = 0; offset < 7; offset += 1) {
      const day = week * 7 + offset + 1
      if (offset === 0 || offset === 2 || offset === 4) {
        if (lessonIndex < lessonIds.length) {
          const id = lessonIds[lessonIndex]
          const lesson = ALL_LESSONS[lessonIndex]
          lessonIndex += 1
          slots.push({
            day,
            type: 'lesson',
            lessonId: id,
            title: lesson.title,
            focus: lesson.bigIdea,
          })
        } else {
          slots.push({
            day,
            type: 'integration',
            title: 'The Code — Integration',
            focus:
              'No new lesson. Re-read your notes, choose the three practices you will carry for the rest of your life.',
          })
        }
      } else if (offset === 1 || offset === 3) {
        slots.push({ day, type: 'apply', title: 'Field Day', focus: APPLY_FOCUS })
      } else if (offset === 5) {
        slots.push({ day, type: 'review', title: 'Weekly Review', focus: REVIEW_FOCUS })
      } else {
        slots.push({ day, type: 'integration', title: 'Integration Day', focus: INTEGRATION_FOCUS })
      }
    }
  }

  // Week 9: the return
  const week9: Omit<Slot, 'day'>[] = [
    { type: 'apply', title: 'The Return — Day 57', focus: APPLY_FOCUS },
    {
      type: 'review',
      title: 'The Return — Day 58',
      focus: 'Final weekly review. Read every week you wrote. What pattern is unmistakable now?',
    },
    {
      type: 'integration',
      title: 'The Return — Day 59',
      focus: 'Tell one person what you built. Ask them to hold you to the day-sixty-one plan.',
    },
  ]
  for (let i = 0; i < week9.length; i += 1) {
    slots.push({ ...week9[i], day: 57 + i })
  }

  const withMilestones = slots
    .map((slot) => {
      const milestone = MILESTONES[slot.day]
      if (!milestone) return slot
      return { ...slot, type: 'milestone' as PlanDayType, title: milestone.title, focus: milestone.focus }
    })
    .sort((a, b) => a.day - b.day)

  // Ensure the final day exists as the graduation milestone
  if (!withMilestones.some((s) => s.day === 60)) {
    withMilestones.push({
      day: 60,
      type: 'milestone',
      title: MILESTONES[60].title,
      focus: MILESTONES[60].focus,
    })
  }

  return withMilestones
}

export const SLOTS = buildSlots()

export function planFor(profile: Profile): PlanDay[] {
  return SLOTS.map((slot) => {
    const date = addDays(profile.startDate, slot.day - 1)
    const lesson = slot.lessonId ? ALL_LESSONS.find((l) => l.id === slot.lessonId) : undefined
    return {
      day: slot.day,
      date,
      week: Math.min(9, Math.ceil(slot.day / 7)),
      type: slot.type,
      lessonId: slot.lessonId,
      title: slot.title,
      focus: slot.focus,
      moduleId: lesson?.moduleId,
    }
  })
}

export function planDay(profile: Profile, day: number): PlanDay | undefined {
  return planFor(profile).find((d) => d.day === day)
}

export function dayNumberFor(profile: Profile, dateKey: string): number {
  const start = new Date(profile.startDate + 'T00:00:00')
  const now = new Date(dateKey + 'T00:00:00')
  return Math.round((now.getTime() - start.getTime()) / 86_400_000) + 1
}