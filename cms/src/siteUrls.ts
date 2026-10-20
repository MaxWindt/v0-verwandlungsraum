/** Public website, used for the live preview and "Preview" links in the admin. */
export const SITE_URL = (process.env.SITE_URL || '').replace(/\/$/, '')

/** This CMS's own origin, from the incoming request. */
export const originOf = (req: { headers: Headers }) => {
  const host = req.headers.get('x-forwarded-host') || req.headers.get('host') || 'localhost:3001'
  const proto = req.headers.get('x-forwarded-proto') || (host.startsWith('localhost') ? 'http' : 'https')
  return `${proto}://${host}`
}
