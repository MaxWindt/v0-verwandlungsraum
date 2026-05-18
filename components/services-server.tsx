import { sanityFetch } from '@/sanity/lib/live'
import { OFFERS_QUERY, ALL_OFFERS_QUERY, SITE_SETTINGS_QUERY } from '@/sanity/lib/queries'
import { draftMode } from 'next/headers'
import ServicesClient from './services'

export default async function ServicesServer() {
  const draft = await draftMode()
  const [{ data: offers }, { data: siteSettings }] = await Promise.all([
    sanityFetch({ query: draft.isEnabled ? ALL_OFFERS_QUERY : OFFERS_QUERY }),
    sanityFetch({ query: SITE_SETTINGS_QUERY }),
  ])

  return <ServicesClient offers={offers ?? []} siteSettings={siteSettings ?? null} />
}
