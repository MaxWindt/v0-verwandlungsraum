import { sanityFetch } from '@/sanity/lib/live'
import { OFFERS_QUERY } from '@/sanity/lib/queries'
import { draftMode } from 'next/headers'
import { ALL_OFFERS_QUERY } from '@/sanity/lib/queries'
import ServicesClient from './services'

export default async function ServicesServer() {
  const draft = await draftMode()
  const { data: offers } = await sanityFetch({
    query: draft.isEnabled ? ALL_OFFERS_QUERY : OFFERS_QUERY,
  })

  return <ServicesClient offers={offers ?? []} />
}
