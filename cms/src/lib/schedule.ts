import type { Payload, PayloadRequest } from 'payload'

import { expiresAtFor } from './expiry'

/**
 * The next moment an event on the website expires, i.e. when the static site should be rebuilt
 * so the expired event also disappears from the HTML (visitors' browsers already hide it by themselves).
 *
 * Only live offers count: published, not hidden, with an event date in the future.
 * Pass `req` inside hooks so the query sees the not-yet-committed change of the current transaction.
 */
export async function nextExpiry(payload: Payload, req?: PayloadRequest): Promise<string | null> {
  const now = Date.now()
  const { docs } = await payload.find({
    collection: 'offers',
    where: {
      and: [
        { _status: { equals: 'published' } },
        { hidden: { not_equals: true } },
        // eventDate is a calendar day, so anything older than two days has expired in every time zone.
        { eventDate: { greater_than: new Date(now - 2 * 86_400_000).toISOString() } },
      ],
    },
    draft: false,
    depth: 0,
    limit: 500,
    pagination: false,
    select: { eventDate: true } as never,
    req,
  })
  const upcoming = docs
    .map((doc) => expiresAtFor((doc as { eventDate?: string | null }).eventDate))
    .filter((at): at is string => Boolean(at) && Date.parse(at as string) > now)
    .sort()
  return upcoming[0] ?? null
}

/**
 * Tells the scheduler Worker (see ../scheduler) when to trigger the next rebuild.
 * Optional: without SCHEDULER_URL nothing happens and expired events are only hidden by the browser
 * until the next rebuild. Never throws, a failing scheduler must not block saving.
 */
export async function syncExpirySchedule(payload: Payload, req?: PayloadRequest): Promise<void> {
  const url = process.env.SCHEDULER_URL?.replace(/\/$/, '')
  if (!url) return

  try {
    const at = await nextExpiry(payload, req)
    const res = await fetch(`${url}/schedule`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.SCHEDULER_SECRET ?? ''}`,
      },
      body: JSON.stringify({ at }),
      signal: AbortSignal.timeout(8_000),
    })
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    payload.logger.info(`[schedule] Next rebuild for expiring events: ${at ?? 'none'}`)
  } catch (error) {
    payload.logger.error(`[schedule] Could not update the expiry schedule: ${(error as Error).message}`)
  }
}
