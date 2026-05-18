import { sanityFetch } from '@/sanity/lib/live'
import { SITE_SETTINGS_QUERY } from '@/sanity/lib/queries'
import Session from './session'

export default async function SessionServer() {
  const { data: siteSettings } = await sanityFetch({ query: SITE_SETTINGS_QUERY })
  return <Session siteSettings={siteSettings ?? null} />
}
