'use client'

import { useEffect, useMemo, useState } from 'react'

import Services from '@/components/services'
import Session from '@/components/session'
import { mapOffer, mapSiteContent, sortOffers } from '@/lib/cms-mapping.mjs'
import { siteData } from '@/lib/content'
import type { Offer, SiteContent } from '@/lib/content-types'

// Must be the CMS origin exactly: the admin only talks to a preview from that origin, and we only listen to it.
const CMS_URL = (process.env.NEXT_PUBLIC_CMS_URL || '').replace(/\/$/, '')

type Draft = { kind: 'offer'; offer: Offer } | { kind: 'site-content'; content: SiteContent }

/** Image fields hold a media id while editing; the website needs the file's URL. */
async function populateMedia(data: Record<string, unknown>, fields: string[]) {
  const out = { ...data }
  await Promise.all(
    fields.map(async (field) => {
      const value = out[field]
      if (value && typeof value !== 'object') {
        // Public endpoint, no cookies needed.
        const res = await fetch(`${CMS_URL}/api/media/${value}`).catch(() => null)
        out[field] = res?.ok ? await res.json() : null
      }
    }),
  )
  return out
}

/**
 * Draft preview for the CMS' "Live Preview" panel (eye icon in the admin). The page is part of the
 * static site and renders with the real components. The admin sends the unsaved draft through
 * postMessage; an offer replaces its published version, site texts replace the published texts.
 */
export default function PreviewPage() {
  const [draft, setDraft] = useState<Draft | null>(null)

  useEffect(() => {
    if (!CMS_URL) return

    const onMessage = async (event: MessageEvent) => {
      const message = event.data
      if (event.origin !== CMS_URL || !message || message.type !== 'payload-live-preview' || !message.data) return

      if (message.collectionSlug === 'offers') {
        const data = await populateMedia(message.data, ['cardImage', 'image'])
        setDraft({ kind: 'offer', offer: mapOffer(data, CMS_URL) as Offer })
      } else if (message.globalSlug === 'site-content') {
        const data = await populateMedia(message.data, ['welcomeImage', 'aboutPortrait', 'sessionRoomImage'])
        setDraft({ kind: 'site-content', content: mapSiteContent(data, CMS_URL) as SiteContent })
      }
    }

    window.addEventListener('message', onMessage)
    // Tells the admin the preview is loaded, so it starts sending the draft.
    const admin = window.opener || (window.parent !== window ? window.parent : null)
    admin?.postMessage({ type: 'payload-live-preview', ready: true }, CMS_URL)
    return () => window.removeEventListener('message', onMessage)
  }, [])

  const draftOffer = draft?.kind === 'offer' ? draft.offer : null

  const offers = useMemo(() => {
    if (!draftOffer) return siteData.offers
    // Shown even if hidden or expired, the banner below says so.
    const shown = { ...draftOffer, hidden: false, expiresAt: null }
    const others = siteData.offers.filter((o) => o.id !== draftOffer.id)
    return sortOffers([...others, shown])
  }, [draftOffer])

  const siteContent = draft?.kind === 'site-content' ? draft.content : siteData.siteContent

  // Bring the offer being edited into view.
  const draftId = draftOffer?.id
  useEffect(() => {
    if (draftId) document.getElementById(`offer-${draftId}`)?.scrollIntoView({ block: 'center' })
  }, [draftId])

  const note = draftOffer?.hidden ? 'Dieses Angebot ist versteckt und erscheint nicht auf der Website.' : null

  return (
    <main className="min-h-screen bg-background pt-8">
      <div className="fixed inset-x-0 top-0 z-50 bg-black/80 px-4 py-1 text-center text-xs text-white">
        Vorschau – {note ?? 'so sieht es auf der Website aus'}
      </div>
      <Services offers={offers} siteContent={siteContent} builtAt={siteData.generatedAt} preview />
      <Session siteContent={siteContent} />
    </main>
  )
}
