export type PrayerKey = 'fajr' | 'dhuhr' | 'asr' | 'maghrib' | 'isha'

export type PrayerState = 'missed' | 'late' | 'ontime' | 'jamaah'

export const PRAYERS: { key: PrayerKey; label: string; arabic: string }[] = [
  { key: 'fajr', label: 'Fajr', arabic: 'الفجر' },
  { key: 'dhuhr', label: 'Dhuhr', arabic: 'الظهر' },
  { key: 'asr', label: 'Asr', arabic: 'العصر' },
  { key: 'maghrib', label: 'Maghrib', arabic: 'المغرب' },
  { key: 'isha', label: 'Isha', arabic: 'العشاء' },
]

export interface DayLog {
  prayers: Partial<Record<PrayerKey, PrayerState>>
  quranPages: number
  dhikr: boolean
  deepWork: boolean
  screenFast: boolean
  sleepOnTime: boolean
  note?: string
}

export interface Profile {
  name: string
  startDate: string
  niyyah: string
  win: string
  quranLevel: 'beginner' | 'returning' | 'established'
  quranTarget: number
  sleepTarget: string
}

export interface JournalEntry {
  id: string
  date: string
  prompt: string
  body: string
  createdAt: string
}

export interface PlannerBlock {
  id: string
  label: string
  time: string
  intention: string
  done: boolean
}

export interface TriggerEntry {
  id: string
  at: string
  trigger: string
  urge: number
  response: string
  outcome: 'held' | 'slipped'
  note?: string
}

export interface WeeklyReview {
  week: number
  wins: string
  leaks: string
  oneChange: string
  score: number
  savedAt: string
}

export interface AppState {
  version: 1
  onboarded: boolean
  profile: Profile
  days: Record<string, DayLog>
  drills: Record<string, boolean>
  lessonNotes: Record<string, string>
  lessonsDone: Record<string, string>
  journal: JournalEntry[]
  planner: Record<string, PlannerBlock[]>
  plannerTop3: Record<string, string[]>
  triggers: TriggerEntry[]
  reviews: Record<number, WeeklyReview>
  dopamine: {
    baseline: { screenHours: number; pickups: number; morningDelay: string } | null
    days: Record<number, string[]>
    startedAt?: string
  }
  quran: {
    planStarted: string
    logs: Record<string, number>
  }
}

export type Block =
  | { kind: 'p'; text: string }
  | { kind: 'h'; text: string }
  | { kind: 'list'; items: string[] }
  | { kind: 'quote'; text: string; source: string }
  | { kind: 'ayah'; arabic?: string; translation: string; source: string }
  | { kind: 'drill'; text: string }

export interface Drill {
  id: string
  title: string
  instruction: string
  cadence: 'once' | 'daily' | 'weekly'
  minutes: number
}

export interface Lesson {
  id: string
  slug: string
  order: number
  moduleId: string
  title: string
  subtitle: string
  minutes: number
  bigIdea: string
  blocks: Block[]
  drills: Drill[]
  prompts: string[]
}

export interface Module {
  id: string
  slug: string
  order: number
  title: string
  arabic?: string
  subtitle: string
  thesis: string
  lessons: Lesson[]
}

export type PlanDayType = 'lesson' | 'apply' | 'review' | 'milestone' | 'integration'

export interface PlanDay {
  day: number
  date: string
  week: number
  type: PlanDayType
  lessonId?: string
  title: string
  focus: string
  moduleId?: string
}