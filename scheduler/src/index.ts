import { DurableObject } from 'cloudflare:workers'

/**
 * Rebuilds the website exactly when an event expires, and not at any other time.
 *
 * The CMS tells this Worker when the next event expires (POST /schedule). A Durable Object keeps a
 * single alarm for that moment. When it fires, the Worker calls the Cloudflare deploy hook (the same
 * one the CMS uses on publish), asks the CMS for the following expiry and sets the next alarm. With no
 * upcoming event there is no alarm and nothing runs, so there are no daily or hourly cron jobs.
 *
 * The page itself already hides expired events in the visitor's browser; this rebuild only makes the
 * static HTML match (search engines, visitors without JavaScript).
 */

export interface Env {
  SCHEDULER: DurableObjectNamespace<Scheduler>
  /** Address of the CMS, e.g. https://verwandlungsraum-cms.vercel.app (no trailing slash). */
  CMS_URL: string
  /** Cloudflare deploy hook URL that rebuilds the website. Secret. */
  DEPLOY_HOOK_URL: string
  /** Shared secret the CMS sends as "Authorization: Bearer …". Secret. */
  SCHEDULER_SECRET: string
  /** Seconds to wait after midnight before rebuilding, so the build certainly sees the event as expired. Default 90. */
  REBUILD_DELAY_SECONDS?: string
}

const delayMs = (env: Env) => Math.max(0, Number(env.REBUILD_DELAY_SECONDS ?? 90)) * 1000

export class Scheduler extends DurableObject<Env> {
  /** Sets (or clears, with null) the one pending rebuild. `at` is the ISO time an event expires. */
  async schedule(at: string | null): Promise<{ rebuildAt: string | null }> {
    const storage = this.ctx.storage
    const expiry = at ? Date.parse(at) : NaN
    if (Number.isNaN(expiry)) {
      await storage.deleteAlarm()
      await storage.delete(['expiry', 'rebuiltFor'])
      return { rebuildAt: null }
    }
    await storage.put('expiry', expiry)
    // Replaces any earlier alarm, so there is always at most one.
    const rebuildAt = expiry + delayMs(this.env)
    await storage.setAlarm(rebuildAt)
    return { rebuildAt: new Date(rebuildAt).toISOString() }
  }

  async status() {
    const alarm = await this.ctx.storage.getAlarm()
    return { rebuildAt: alarm ? new Date(alarm).toISOString() : null }
  }

  async alarm(): Promise<void> {
    const storage = this.ctx.storage
    const expiry = await storage.get<number>('expiry')

    // An alarm that is retried after a failure must not rebuild twice for the same expiry.
    if (expiry === undefined || (await storage.get<number>('rebuiltFor')) !== expiry) {
      const res = await fetch(this.env.DEPLOY_HOOK_URL, { method: 'POST', signal: AbortSignal.timeout(15_000) })
      if (!res.ok) throw new Error(`Deploy hook answered HTTP ${res.status}`) // the runtime retries the alarm
      if (expiry !== undefined) await storage.put('rebuiltFor', expiry)
    }

    // Chain to the next expiry. If the CMS is unreachable, the thrown error retries only this part.
    const res = await fetch(`${this.env.CMS_URL.replace(/\/$/, '')}/api/next-expiry`, {
      signal: AbortSignal.timeout(15_000),
    })
    if (!res.ok) throw new Error(`CMS answered HTTP ${res.status}`)
    const { at } = (await res.json()) as { at: string | null }
    await this.schedule(at)
  }
}

const json = (body: unknown, status = 200) => Response.json(body, { status, headers: { 'Cache-Control': 'no-store' } })

/** Constant-time comparison, so the secret can't be guessed byte by byte from response times. */
async function authorised(request: Request, env: Env): Promise<boolean> {
  const given = request.headers.get('Authorization') ?? ''
  const expected = `Bearer ${env.SCHEDULER_SECRET ?? ''}`
  if (!env.SCHEDULER_SECRET) return false
  const digest = (value: string) => crypto.subtle.digest('SHA-256', new TextEncoder().encode(value))
  const [a, b] = await Promise.all([digest(given), digest(expected)])
  return crypto.subtle.timingSafeEqual(a, b)
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const { pathname } = new URL(request.url)
    if (pathname !== '/schedule' && pathname !== '/status') return json({ error: 'Not found' }, 404)
    if (!(await authorised(request, env))) return json({ error: 'Unauthorized' }, 401)

    // One scheduler for the whole site.
    const scheduler = env.SCHEDULER.get(env.SCHEDULER.idFromName('site'))

    if (pathname === '/status' && request.method === 'GET') return json(await scheduler.status())

    if (pathname === '/schedule' && request.method === 'POST') {
      const body = (await request.json().catch(() => null)) as { at?: string | null } | null
      if (!body || !('at' in body)) return json({ error: 'Expected {"at": "<ISO time>" | null}' }, 400)
      return json(await scheduler.schedule(body.at ?? null))
    }

    return json({ error: 'Method not allowed' }, 405)
  },
}
