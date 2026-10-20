import { siteData } from '@/lib/content'
import Session from './session'

export default function SessionServer() {
  return <Session siteContent={siteData.siteContent} />
}
