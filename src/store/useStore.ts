import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type {
  AppState,
  DayLog,
  Drill,
  JournalEntry,
  PlannerBlock,
  PrayerKey,
  PrayerState,
  Profile,
  TriggerEntry,
  WeeklyReview,
} from '../types'
import { todayKey } from '../lib/date'

const DEFAULT_PROFILE: Profile = {
  name: '',
  startDate: todayKey(),
  niyyah: '',
  win: '',
  quranLevel: 'returning',
  quranTarget: 2,
  sleepTarget: '23:00',
}

const DEFAULT_STATE: AppState = {
  version: 1,
  onboarded: false,
  profile: DEFAULT_PROFILE,
  days: {},
  drills: {},
  lessonNotes: {},
  lessonsDone: {},
  journal: [],
  planner: {},
  plannerTop3: {},
  triggers: [],
  reviews: {},
  dopamine: { baseline: null, days: {}, startedAt: undefined },
  quran: { planStarted: todayKey(), logs: {} },
}

export function drillKey(drill: Drill, date: string): string {
  return drill.cadence === 'once' ? drill.id : `${drill.id}:${date}`
}

interface Actions {
  completeOnboarding: (profile: Profile) => void
  updateProfile: (patch: Partial<Profile>) => void
  setPrayer: (date: string, key: PrayerKey, value: PrayerState | undefined) => void
  setQuranPages: (date: string, pages: number) => void
  toggleCommitment: (
    date: string,
    key: 'dhikr' | 'deepWork' | 'screenFast' | 'sleepOnTime',
  ) => void
  setDayNote: (date: string, note: string) => void
  toggleDrill: (key: string) => void
  completeLesson: (id: string) => void
  saveLessonNote: (id: string, text: string) => void
  addJournal: (entry: Omit<JournalEntry, 'id' | 'createdAt'>) => void
  deleteJournal: (id: string) => void
  setPlanner: (date: string, blocks: PlannerBlock[]) => void
  addPlannerBlock: (date: string, block: PlannerBlock) => void
  togglePlannerBlock: (date: string, id: string) => void
  removePlannerBlock: (date: string, id: string) => void
  setTop3: (date: string, items: string[]) => void
  addTrigger: (entry: Omit<TriggerEntry, 'id'>) => void
  deleteTrigger: (id: string) => void
  saveReview: (review: WeeklyReview) => void
  setDopamineBaseline: (baseline: NonNullable<AppState['dopamine']['baseline']>) => void
  toggleDopamineItem: (day: number, itemId: string) => void
  importState: (raw: string) => boolean
  resetAll: () => void
}

type Store = AppState & Actions

const uid = () => Math.random().toString(36).slice(2, 10)

export const useStore = create<Store>()(
  persist(
    (set, get) => ({
      ...DEFAULT_STATE,

      completeOnboarding: (profile) =>
        set((s) => ({
          onboarded: true,
          profile,
          quran: { ...s.quran, planStarted: profile.startDate },
        })),

      updateProfile: (patch) =>
        set((s) => ({ profile: { ...s.profile, ...patch } })),

      setPrayer: (date, key, value) =>
        set((s) => {
          const day: DayLog = s.days[date] ?? {
            prayers: {},
            quranPages: 0,
            dhikr: false,
            deepWork: false,
            screenFast: false,
            sleepOnTime: false,
          }
          const prayers = { ...day.prayers }
          if (!value) delete prayers[key]
          else prayers[key] = value
          return { days: { ...s.days, [date]: { ...day, prayers } } }
        }),

      setQuranPages: (date, pages) =>
        set((s) => {
          const day: DayLog = s.days[date] ?? {
            prayers: {},
            quranPages: 0,
            dhikr: false,
            deepWork: false,
            screenFast: false,
            sleepOnTime: false,
          }
          return {
            days: { ...s.days, [date]: { ...day, quranPages: Math.max(0, pages) } },
            quran: { ...s.quran, logs: { ...s.quran.logs, [date]: Math.max(0, pages) } },
          }
        }),

      toggleCommitment: (date, key) =>
        set((s) => {
          const day: DayLog = s.days[date] ?? {
            prayers: {},
            quranPages: 0,
            dhikr: false,
            deepWork: false,
            screenFast: false,
            sleepOnTime: false,
          }
          return { days: { ...s.days, [date]: { ...day, [key]: !day[key] } } }
        }),

      setDayNote: (date, note) =>
        set((s) => {
          const day = s.days[date] ?? {
            prayers: {},
            quranPages: 0,
            dhikr: false,
            deepWork: false,
            screenFast: false,
            sleepOnTime: false,
          }
          return { days: { ...s.days, [date]: { ...day, note } } }
        }),

      toggleDrill: (key) =>
        set((s) => ({ drills: { ...s.drills, [key]: !s.drills[key] } })),

      completeLesson: (id) =>
        set((s) => ({ lessonsDone: { ...s.lessonsDone, [id]: todayKey() } })),

      saveLessonNote: (id, text) =>
        set((s) => ({ lessonNotes: { ...s.lessonNotes, [id]: text } })),

      addJournal: (entry) =>
        set((s) => ({
          journal: [
            { ...entry, id: uid(), createdAt: new Date().toISOString() },
            ...s.journal,
          ],
        })),

      deleteJournal: (id) =>
        set((s) => ({ journal: s.journal.filter((j) => j.id !== id) })),

      setPlanner: (date, blocks) =>
        set((s) => ({ planner: { ...s.planner, [date]: blocks } })),

      addPlannerBlock: (date, block) =>
        set((s) => ({
          planner: { ...s.planner, [date]: [...(s.planner[date] ?? []), block] },
        })),

      togglePlannerBlock: (date, id) =>
        set((s) => ({
          planner: {
            ...s.planner,
            [date]: (s.planner[date] ?? []).map((b) =>
              b.id === id ? { ...b, done: !b.done } : b,
            ),
          },
        })),

      removePlannerBlock: (date, id) =>
        set((s) => ({
          planner: {
            ...s.planner,
            [date]: (s.planner[date] ?? []).filter((b) => b.id !== id),
          },
        })),

      setTop3: (date, items) =>
        set((s) => ({ plannerTop3: { ...s.plannerTop3, [date]: items } })),

      addTrigger: (entry) =>
        set((s) => ({ triggers: [{ ...entry, id: uid() }, ...s.triggers] })),

      deleteTrigger: (id) =>
        set((s) => ({ triggers: s.triggers.filter((t) => t.id !== id) })),

      saveReview: (review) =>
        set((s) => ({ reviews: { ...s.reviews, [review.week]: review } })),

      setDopamineBaseline: (baseline) =>
        set((s) => ({
          dopamine: {
            ...s.dopamine,
            baseline,
            startedAt: s.dopamine.startedAt ?? todayKey(),
          },
        })),

      toggleDopamineItem: (day, itemId) =>
        set((s) => {
          const current = s.dopamine.days[day] ?? []
          const next = current.includes(itemId)
            ? current.filter((i) => i !== itemId)
            : [...current, itemId]
          return { dopamine: { ...s.dopamine, days: { ...s.dopamine.days, [day]: next } } }
        }),

      importState: (raw) => {
        try {
          const parsed = JSON.parse(raw) as Partial<AppState>
          if (!parsed || typeof parsed !== 'object' || !parsed.profile) return false
          const merged: AppState = {
            ...DEFAULT_STATE,
            ...parsed,
            profile: { ...DEFAULT_PROFILE, ...parsed.profile },
            days: parsed.days ?? {},
            drills: parsed.drills ?? {},
            lessonNotes: parsed.lessonNotes ?? {},
            lessonsDone: parsed.lessonsDone ?? {},
            journal: parsed.journal ?? [],
            planner: parsed.planner ?? {},
            plannerTop3: parsed.plannerTop3 ?? {},
            triggers: parsed.triggers ?? [],
            reviews: parsed.reviews ?? {},
            dopamine: {
              baseline: parsed.dopamine?.baseline ?? null,
              days: parsed.dopamine?.days ?? {},
              startedAt: parsed.dopamine?.startedAt,
            },
            quran: {
              planStarted: parsed.quran?.planStarted ?? todayKey(),
              logs: parsed.quran?.logs ?? {},
            },
            version: 1,
          }
          set({ ...merged })
          return true
        } catch {
          return false
        }
      },

      resetAll: () => {
        set({ ...DEFAULT_STATE, profile: { ...DEFAULT_PROFILE, startDate: todayKey() } })
        get()
      },
    }),
    {
      name: 'mujahid-mode-v1',
      version: 1,
      merge: (persisted, current) => {
        const p = (persisted ?? {}) as Partial<Store>
        return {
          ...current,
          ...p,
          profile: { ...current.profile, ...(p.profile ?? {}) },
          days: p.days ?? {},
          drills: p.drills ?? {},
          lessonNotes: p.lessonNotes ?? {},
          lessonsDone: p.lessonsDone ?? {},
          journal: p.journal ?? [],
          planner: p.planner ?? {},
          plannerTop3: p.plannerTop3 ?? {},
          triggers: p.triggers ?? [],
          reviews: p.reviews ?? {},
          dopamine: {
            baseline: p.dopamine?.baseline ?? null,
            days: p.dopamine?.days ?? {},
            startedAt: p.dopamine?.startedAt,
          },
          quran: {
            planStarted: p.quran?.planStarted ?? current.quran.planStarted,
            logs: p.quran?.logs ?? {},
          },
        }
      },
    },
  ),
)

export type { PlannerBlock, WeeklyReview, TriggerEntry }