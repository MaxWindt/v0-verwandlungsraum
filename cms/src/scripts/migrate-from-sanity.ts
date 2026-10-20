/**
 * One-off migration: copies the offers and site texts from Sanity into Payload.
 *
 *   npm run migrate:sanity          # refuses to run if offers already exist
 *   FRESH=1 npm run migrate:sanity  # deletes existing offers, media and site content first
 *
 * The Sanity dataset is read through its public API (no token needed). Editor accounts are never touched.
 * Run it against the production database with DATABASE_URL, BLOB_READ_WRITE_TOKEN and PAYLOAD_SECRET set.
 */
import config from '@payload-config'
import { getPayload } from 'payload'

import { expiresAtFor } from '../lib/expiry'
import { portableTextToLexical } from './lexical'

const SANITY_PROJECT = process.env.SANITY_PROJECT_ID || 'y7ytd6po'
const SANITY_DATASET = process.env.SANITY_DATASET || 'production'
const SANITY_QUERY_URL = `https://${SANITY_PROJECT}.api.sanity.io/v2024-01-01/data/query/${SANITY_DATASET}`
const SANITY_CDN = `https://cdn.sanity.io/images/${SANITY_PROJECT}/${SANITY_DATASET}`

// A fresh object per call: the Vercel Blob plugin sets skipCloudStorage on the context it is given, which would
// otherwise stick and make every upload after the first skip Blob.
const context = () => ({ skipRebuild: true })

const payload = await getPayload({ config })

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

async function groq<T>(query: string): Promise<T> {
  const res = await fetch(`${SANITY_QUERY_URL}?query=${encodeURIComponent(query)}`)
  if (!res.ok) throw new Error(`Sanity query failed: HTTP ${res.status}`)
  return ((await res.json()) as { result: T }).result
}

const MIME: Record<string, string> = {
  jpg: 'image/jpeg',
  jpeg: 'image/jpeg',
  png: 'image/png',
  webp: 'image/webp',
  gif: 'image/gif',
  svg: 'image/svg+xml',
}

type SanityImage = {
  asset?: { _ref?: string }
  hotspot?: { x?: number; y?: number }
} | null | undefined

const mediaCache = new Map<string, number>()

/** Uploads a Sanity image asset (reference like "image-<hash>-800x600-jpg") and returns the media id. */
async function sanityImage(image: SanityImage, name: string, alt: string): Promise<number | null> {
  const ref = image?.asset?._ref
  const match = ref && /^image-([a-f0-9]+)-(\d+x\d+)-(\w+)$/.exec(ref)
  if (!match) return null

  const url = `${SANITY_CDN}/${match[1]}-${match[2]}.${match[3]}`
  const cached = mediaCache.get(url)
  if (cached) return cached

  const res = await fetch(url)
  if (!res.ok) throw new Error(`Download failed (${res.status}): ${url}`)
  const data = Buffer.from(await res.arrayBuffer())

  const fileName = `${name.replace(/[^a-zA-Z0-9äöüÄÖÜß._-]+/g, '-').replace(/^-+|-+$/g, '')}.${match[3]}`
  const doc = await payload.create({
    collection: 'media',
    data: { alt },
    file: {
      data,
      name: fileName,
      mimetype: MIME[match[3].toLowerCase()] || 'application/octet-stream',
      size: data.length,
    },
    context: context(),
  })
  // Payload resets the focal point on upload, so set it afterwards (like the admin's focal point editor does).
  const { x, y } = image?.hotspot ?? {}
  if (typeof x === 'number' && typeof y === 'number') {
    await payload.update({
      collection: 'media',
      id: doc.id,
      data: { focalX: Math.round(x * 100), focalY: Math.round(y * 100) },
      context: context(),
    })
  }
  mediaCache.set(url, doc.id)
  console.log(`  media: ${fileName}`)
  return doc.id
}

const MONTHS: Record<string, number> = {
  januar: 1, jan: 1, februar: 2, feb: 2, märz: 3, maerz: 3, mär: 3, april: 4, apr: 4, mai: 5, juni: 6, jun: 6,
  juli: 7, jul: 7, august: 8, aug: 8, september: 9, sep: 9, sept: 9, oktober: 10, okt: 10, november: 11, nov: 11,
  dezember: 12, dez: 12,
}

/** "Fr, 25.09.2026 I 16-18 Uhr" / "Di, 28. April 2026, 17:00" → "2026-09-25" / "2026-04-28". Null when no year is given. */
function parseGermanDate(value: string): string | null {
  const numeric = /(\d{1,2})\.\s?(\d{1,2})\.\s?(\d{4})/.exec(value)
  const named = /(\d{1,2})\.\s?([A-Za-zäöüÄÖÜ]+)\.?,?\s+(\d{4})/.exec(value)
  const [day, month, year] = numeric
    ? [Number(numeric[1]), Number(numeric[2]), Number(numeric[3])]
    : named && MONTHS[named[2].toLowerCase()]
      ? [Number(named[1]), MONTHS[named[2].toLowerCase()], Number(named[3])]
      : []
  if (!day || !month || !year) return null
  return `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`
}

// ---------------------------------------------------------------------------
// Fresh start
// ---------------------------------------------------------------------------

const existing = await payload.count({ collection: 'offers' })
if (existing.totalDocs > 0) {
  if (process.env.FRESH !== '1') {
    console.error('Payload already has offers. Re-run with FRESH=1 to delete offers and media and migrate again.')
    process.exit(1)
  }
  for (const collection of ['offers', 'media'] as const) {
    await payload.delete({ collection, where: { id: { exists: true } }, context: context() })
    console.log(`Deleted all ${collection}`)
  }
}

// ---------------------------------------------------------------------------
// Offers
// ---------------------------------------------------------------------------

type SanityDoc = Record<string, any> // eslint-disable-line @typescript-eslint/no-explicit-any
const published = '!(_id in path("drafts.**"))'
const offers = await groq<SanityDoc[]>(`*[_type == "offer" && ${published}] | order(order asc, _createdAt asc)`)
console.log(`Loaded ${offers.length} offers from Sanity`)

const noDate: string[] = []
for (const o of offers) {
  const dates: string[] = (o.dates ?? []).filter(Boolean)
  const parsed = dates.map(parseGermanDate).filter((d): d is string => Boolean(d)).sort()
  const eventDate = parsed.length ? parsed[parsed.length - 1] : null
  if (dates.length && !eventDate) noDate.push(`${o.title} (${dates.join(' | ')})`)

  const cardImage = await sanityImage(o.cardImage, `${o.title}-karte`, o.title)
  const image = await sanityImage(o.image, `${o.title}-detail`, o.title)

  await payload.create({
    collection: 'offers',
    draft: false,
    data: {
      _status: 'published',
      title: o.title,
      titleEn: o.titleEn,
      titleEs: o.titleEs,
      shortDescription: o.shortDescription,
      shortDescriptionEn: o.shortDescriptionEn,
      shortDescriptionEs: o.shortDescriptionEs,
      category: o.category === 'individual' ? 'individual' : 'workshop',
      hidden: o.hidden === true,
      eventDate: eventDate ? `${eventDate}T12:00:00.000Z` : undefined,
      order: o.order ?? undefined,
      cardImage,
      image,
      externalImageUrl: o.externalImageUrl,
      dates: dates.map((label) => ({ label })),
      registrationUrl: o.registrationUrl,
      location: o.location,
      participants: o.participants,
      duration: o.duration,
      price: o.price,
      dialogType: ['details', 'session', 'canva', 'kennenlernabend'].includes(o.dialogType) ? o.dialogType : 'details',
      canvaUrl: o.canvaUrl,
      dialogContent: portableTextToLexical(o.dialogContent),
    } as never,
    context: context(),
  })
  const expires = expiresAtFor(eventDate)
  console.log(
    `offer: ${o.title}${o.hidden ? '  [hidden]' : ''}${eventDate ? `  [event ${eventDate}, expires ${expires}]` : ''}`,
  )
}

// ---------------------------------------------------------------------------
// Site content
// ---------------------------------------------------------------------------

const settings = (await groq<SanityDoc[]>(`*[_type == "siteSettings" && ${published}][0...1]`))[0]
if (settings) {
  const rich = ['welcomeIntro', 'aboutParagraph1', 'aboutParagraph2', 'aboutParagraph3', 'sessionDescription1',
    'sessionDescription2', 'sessionDescription3', 'sessionDescription4', 'sessionDescription5',
    'sessionPricesContent', 'sessionBillingContent', 'sessionAdvantagesContent', 'sessionCancellationContent',
    'sessionDisclaimerContent'] as const
  // Headings that equal the built-in German heading are left empty, so English/Spanish visitors still get a translation.
  const titles: Record<string, string> = {
    sessionPricesTitle: 'Preise',
    sessionBillingTitle: 'Abrechnung und Kostenübernahme',
    sessionAdvantagesTitle: 'Was sind die Vorteile einer selbst bezahlten Therapie?',
    sessionCancellationTitle: 'Absage',
    sessionDisclaimerTitle: 'Hinweis zur Therapie / Haftungsausschluss',
  }

  const data: Record<string, unknown> = {}
  for (const key of rich) data[key] = portableTextToLexical(settings[key])
  for (const [key, standard] of Object.entries(titles)) {
    const value = (settings[key] as string | undefined)?.trim()
    data[key] = value && value !== standard ? value : null
  }
  data.welcomeImage = await sanityImage(settings.welcomeImage, 'willkommen', 'Hände mit gelbem Element')
  data.aboutPortrait = await sanityImage(settings.aboutPortrait, 'ueber-mich-portrait', 'Portrait')
  data.sessionRoomImage = await sanityImage(settings.sessionRoomImage, 'raum', 'Therapieraum')

  await payload.updateGlobal({ slug: 'site-content', data: data as never, context: context() })
  console.log('site content: imported')

  const unused = ['ktSubtitle', 'ktHowItWorksIntro', 'ktPomIntro', 'ktPomDescription'].filter(
    (k) => Array.isArray(settings[k]) && settings[k].length,
  )
  if (unused.length) {
    console.log(`Note: ${unused.join(', ')} are filled in Sanity but not shown on the website, so they were not imported.`)
  }
} else {
  console.log('No siteSettings document found in Sanity, site content left empty')
}

if (noDate.length) {
  console.log('\nNo event date could be read from these offers, set "Event-Datum" in the admin if they should expire:')
  for (const line of noDate) console.log(`  - ${line}`)
}

console.log('\nDone.')
process.exit(0)
