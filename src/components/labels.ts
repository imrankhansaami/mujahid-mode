import type { PrayerState } from '../types'

export const PrayerStateLabels: Record<PrayerState | 'unset', string> = {
  unset: 'Not logged',
  ontime: 'On time',
  jamaah: "Jamāʿah",
  late: 'Late',
  missed: 'Missed',
}