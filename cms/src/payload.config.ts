import { postgresAdapter } from '@payloadcms/db-postgres'
import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob'
import { de } from '@payloadcms/translations/languages/de'
import { en } from '@payloadcms/translations/languages/en'
import path from 'path'
import { buildConfig } from 'payload'
import sharp from 'sharp'
import { fileURLToPath } from 'url'

import { Media } from './collections/Media'
import { Offers } from './collections/Offers'
import { Users } from './collections/Users'
import { contentEditor } from './fields/richText'
import { SiteContent } from './globals/SiteContent'
import { triggerSiteRebuild } from './hooks/rebuildSite'
import { nextExpiry } from './lib/schedule'
import { SITE_URL } from './siteUrls'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    meta: {
      titleSuffix: ' – Verwandlungsraum',
    },
    // Side-by-side preview of the draft while editing. The website has a /preview page that shows
    // the draft live (it is part of the static site, so no extra server is needed).
    livePreview: {
      collections: ['offers'],
      globals: ['site-content'],
      url: SITE_URL ? `${SITE_URL}/preview` : undefined,
      breakpoints: [
        { label: 'Handy', name: 'phone', width: 390, height: 844 },
        { label: 'Tablet', name: 'tablet', width: 820, height: 1180 },
        { label: 'Desktop', name: 'desktop', width: 1440, height: 900 },
      ],
    },
    components: {
      graphics: { Logo: '@/components/Branding#Logo' },
      beforeDashboard: ['@/components/RebuildWebsite#RebuildWebsite'],
    },
  },
  i18n: {
    supportedLanguages: { de, en },
    fallbackLanguage: 'de',
  },
  // The editor preview (a page on the website) reads media files from the CMS in the browser.
  cors: [SITE_URL].filter(Boolean),
  collections: [Offers, Media, Users],
  globals: [SiteContent],
  editor: contentEditor,
  endpoints: [
    {
      // Manual rebuild button on the dashboard.
      path: '/rebuild',
      method: 'post',
      handler: async (req) => {
        if (!req.user) return Response.json({ error: 'Unauthorized' }, { status: 401 })
        const ok = await triggerSiteRebuild(req.payload, `manual rebuild by ${req.user.email}`)
        return Response.json({ ok }, { status: ok ? 200 : 502 })
      },
    },
    {
      // Used by the scheduler Worker (../scheduler): when is the next event going to expire?
      // Public on purpose, it only reveals a timestamp.
      path: '/next-expiry',
      method: 'get',
      handler: async (req) => {
        const at = await nextExpiry(req.payload)
        return Response.json({ at }, { headers: { 'Cache-Control': 'no-store' } })
      },
    },
  ],
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL || '',
    },
    migrationDir: path.resolve(dirname, 'migrations'),
    // Never auto-push schema; use `payload migrate:create` and commit the migration.
    push: false,
  }),
  sharp,
  plugins: [
    // Images live in Vercel Blob in production (served straight from its CDN).
    // Without a token (local dev) files are stored on disk in ./media.
    vercelBlobStorage({
      enabled: Boolean(process.env.BLOB_READ_WRITE_TOKEN),
      token: process.env.BLOB_READ_WRITE_TOKEN,
      collections: { media: { disablePayloadAccessControl: true } },
      clientUploads: true,
      alwaysInsertFields: true,
    }),
  ],
})
