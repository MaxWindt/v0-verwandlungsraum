import { siteData } from '@/lib/content'
import ServicesClient from './services'

export default function ServicesServer() {
  return <ServicesClient offers={siteData.offers} siteContent={siteData.siteContent} builtAt={siteData.generatedAt} />
}
