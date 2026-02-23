export type Recurrence = 'daily' | 'weekly' | 'monthly'

export function computeNextDue(due: string | null | undefined, recurrence?: { interval: Recurrence } | null): string | null {
  if (!recurrence) return null
  if (!due) return null
  const d = new Date(due)
  if (recurrence.interval === 'daily') d.setDate(d.getDate() + 1)
  if (recurrence.interval === 'weekly') d.setDate(d.getDate() + 7)
  if (recurrence.interval === 'monthly') d.setMonth(d.getMonth() + 1)
  return d.toISOString().slice(0,10)
}

export function parseTags(raw: string | null | undefined): string[] {
  if (!raw) return []
  return raw.split(',').map(s=>s.trim()).filter(Boolean)
}
