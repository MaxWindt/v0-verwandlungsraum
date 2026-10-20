/** Lexical editor state as stored by Payload (rendered by lib/richtext.tsx). */
export type RichTextData = {
  root: { type: 'root'; children: LexicalNode[] }
}

export type LexicalNode = {
  type: string
  children?: LexicalNode[]
  text?: string
  format?: number | string
  tag?: string
  listType?: string
  fields?: { url?: string; newTab?: boolean; linkType?: string }
  [key: string]: unknown
}

export type Offer = {
  id: string
  title: string
  titleEn: string | null
  titleEs: string | null
  shortDescription: string
  shortDescriptionEn: string | null
  shortDescriptionEs: string | null
  category: 'individual' | 'workshop'
  order: number | null
  cardImage: string | null
  image: string | null
  externalImageUrl: string | null
  dates: string[]
  registrationUrl: string | null
  location: string | null
  participants: string | null
  duration: string | null
  price: string | null
  dialogType: 'details' | 'session' | 'canva' | 'kennenlernabend'
  canvaUrl: string | null
  dialogContent: RichTextData | null
  /** ISO timestamp from which the offer is no longer shown (end of its event date), or null. */
  expiresAt: string | null
  hidden: boolean
}

export type SiteContent = {
  welcomeIntro: RichTextData | null
  welcomeImage: string | null
  aboutParagraph1: RichTextData | null
  aboutParagraph2: RichTextData | null
  aboutParagraph3: RichTextData | null
  aboutPortrait: string | null
  sessionDescription1: RichTextData | null
  sessionDescription2: RichTextData | null
  sessionDescription3: RichTextData | null
  sessionDescription4: RichTextData | null
  sessionDescription5: RichTextData | null
  sessionRoomImage: string | null
  sessionPricesTitle: string | null
  sessionPricesContent: RichTextData | null
  sessionBillingTitle: string | null
  sessionBillingContent: RichTextData | null
  sessionAdvantagesTitle: string | null
  sessionAdvantagesContent: RichTextData | null
  sessionCancellationTitle: string | null
  sessionCancellationContent: RichTextData | null
  sessionDisclaimerTitle: string | null
  sessionDisclaimerContent: RichTextData | null
}

/** What scripts/fetch-content.mjs writes to content/content.json before every build. */
export type SiteData = {
  /** Build time (ISO). Server render and first client render use it as "now", so hydration matches. */
  generatedAt: string
  offers: Offer[]
  siteContent: SiteContent
}
