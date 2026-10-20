import type {
  CollectionAfterChangeHook,
  CollectionAfterDeleteHook,
  GlobalAfterChangeHook,
  Payload,
  PayloadRequest,
} from 'payload'

/**
 * The public website is a static site on Cloudflare that reads all content from Payload at
 * build time. Whenever published content changes we call the Cloudflare deploy hook so the site
 * rebuilds (takes ~1–2 minutes).
 *
 * Pass `context: { skipRebuild: true }` to local API calls (e.g. the migration
 * script) to avoid triggering a build per document.
 */
export async function triggerSiteRebuild(payload: Payload, reason: string): Promise<boolean> {
  const hookUrl = process.env.DEPLOY_HOOK_URL
  if (!hookUrl) {
    payload.logger.info(`[rebuild] DEPLOY_HOOK_URL not set, skipping rebuild (${reason})`)
    return false
  }

  try {
    const res = await fetch(hookUrl, { method: 'POST', signal: AbortSignal.timeout(10_000) })
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    payload.logger.info(`[rebuild] Website rebuild triggered (${reason})`)
    return true
  } catch (error) {
    payload.logger.error(`[rebuild] Could not trigger website rebuild: ${(error as Error).message}`)
    return false
  }
}

type Doc = { _status?: 'draft' | 'published' | null }
type AfterRebuild = (payload: Payload, req: PayloadRequest) => Promise<void>

/** Rebuild after a change that affects the live website. `afterRebuild` runs in the same cases. */
export const makeRebuildAfterChange =
  (afterRebuild?: AfterRebuild): CollectionAfterChangeHook =>
  async ({ collection, context, doc, previousDoc, req }) => {
    if (context.skipRebuild) return doc

    if ((doc as Doc)._status === 'draft') {
      // Drafts (including autosaves) don't change the website. The only draft save
      // that does is "Unpublish", which turns the live document into a draft.
      const wasPublished = (previousDoc as Doc | undefined)?._status === 'published'
      if (!wasPublished) return doc
      const live = await req.payload.findByID({
        collection: collection.slug,
        id: (doc as { id: number }).id,
        draft: false,
        depth: 0,
        req,
        select: { _status: true } as never,
      })
      if ((live as Doc)._status === 'published') return doc
    }

    await triggerSiteRebuild(req.payload, `${collection.slug} changed`)
    await afterRebuild?.(req.payload, req)
    return doc
  }

export const makeRebuildAfterDelete =
  (afterRebuild?: AfterRebuild): CollectionAfterDeleteHook =>
  async ({ collection, context, doc, req }) => {
    if (context.skipRebuild || (doc as Doc)._status === 'draft') return
    await triggerSiteRebuild(req.payload, `${collection.slug} deleted`)
    await afterRebuild?.(req.payload, req)
  }

export const rebuildAfterChange = makeRebuildAfterChange()
export const rebuildAfterDelete = makeRebuildAfterDelete()

export const rebuildAfterGlobalChange: GlobalAfterChangeHook = async ({ context, doc, global, req }) => {
  if (!context.skipRebuild) await triggerSiteRebuild(req.payload, `${global.slug} changed`)
  return doc
}
