/**
 * Events disappear from the website automatically once their date has passed.
 *
 * An offer with `eventDate = 2026-10-02` stays visible for the whole of 2 October and is gone from
 * the first second of 3 October, in the time zone of the business (not the visitor's, not the server's).
 * The same rule is applied in three places, always based on the `expiresAt` timestamp computed here:
 *   - the CMS (status column, scheduler),
 *   - the website build (expired events are left out of the static HTML),
 *   - the visitor's browser (an open or stale page hides the event at the exact moment).
 */
export const SITE_TIME_ZONE = 'Europe/Berlin'

/** Offset (ms) of the time zone from UTC at the given instant: local wall clock minus UTC. */
const zoneOffsetMs = (instant: number, timeZone: string): number => {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone,
    hourCycle: 'h23',
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
  }).formatToParts(new Date(instant))
  const get = (type: string) => Number(parts.find((p) => p.type === type)?.value)
  const asUtc = Date.UTC(get('year'), get('month') - 1, get('day'), get('hour'), get('minute'), get('second'))
  return asUtc - Math.floor(instant / 1000) * 1000
}

/** The instant (ms since epoch) at which the local wall clock in `timeZone` shows 00:00 on the given day. */
const startOfDay = (year: number, month: number, day: number, timeZone: string): number => {
  const naive = Date.UTC(year, month - 1, day, 0, 0, 0)
  // Two passes, because the offset has to be looked up at the instant we're searching for.
  const first = naive - zoneOffsetMs(naive, timeZone)
  return naive - zoneOffsetMs(first, timeZone)
}

/** "2026-10-02", or the ISO timestamp Payload stores for a date field, → "2026-10-02". */
const calendarDay = (value: string | Date | null | undefined): [number, number, number] | null => {
  if (!value) return null
  const text = typeof value === 'string' ? value : value.toISOString()
  const match = /^(\d{4})-(\d{2})-(\d{2})/.exec(text)
  return match ? [Number(match[1]), Number(match[2]), Number(match[3])] : null
}

/**
 * When an event on `eventDate` stops being shown: the start of the following day in the business time zone.
 * Returns an ISO timestamp, or null when no (valid) date is set.
 */
export const expiresAtFor = (eventDate: string | Date | null | undefined): string | null => {
  const day = calendarDay(eventDate)
  if (!day) return null
  // Day arithmetic via UTC so 31 Oct + 1 correctly becomes 1 Nov.
  const next = new Date(Date.UTC(day[0], day[1] - 1, day[2] + 1))
  return new Date(
    startOfDay(next.getUTCFullYear(), next.getUTCMonth() + 1, next.getUTCDate(), SITE_TIME_ZONE),
  ).toISOString()
}

export type Visibility = 'visible' | 'hidden' | 'expired' | 'draft'

export const visibilityOf = (
  doc: { _status?: string | null; hidden?: boolean | null; expiresAt?: string | null },
  now = Date.now(),
): Visibility => {
  if (doc._status && doc._status !== 'published') return 'draft'
  if (doc.hidden) return 'hidden'
  if (doc.expiresAt && Date.parse(doc.expiresAt) <= now) return 'expired'
  return 'visible'
}

export const visibilityLabels: Record<Visibility, string> = {
  visible: '✅ Sichtbar',
  hidden: '🙈 Versteckt',
  expired: '⌛ Abgelaufen',
  draft: '✏️ Entwurf (nicht veröffentlicht)',
}
