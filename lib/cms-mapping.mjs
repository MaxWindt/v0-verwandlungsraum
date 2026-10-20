// Turns the Payload REST API shape into the plain content the page components render.
//
// Shared by the build step (scripts/fetch-content.mjs, plain Node) and the browser preview
// (app/preview, where Payload's Live Preview sends draft data). Keep it dependency-free.

/** Payload hands out local-dev media as "/api/media/file/…"; make such URLs absolute. */
function absoluteUrl(url, base) {
  if (!url) return null;
  return url.startsWith('/') && base ? `${base.replace(/\/$/, '')}${url}` : url;
}

/** URL of a media document, preferring a resized variant ("thumbnail", "card", "large"). */
export function mediaUrl(media, size, base) {
  if (!media || typeof media !== 'object') return null;
  const variant = size && media.sizes && media.sizes[size];
  return absoluteUrl((variant && variant.url) || media.url, base);
}

/** Lexical state with no actual text/content → null, so the page falls back to its built-in text. */
export function richOrNull(state) {
  const children = state && state.root && state.root.children;
  if (!Array.isArray(children) || children.length === 0) return null;
  const hasContent = (node) =>
    node.type === 'text'
      ? Boolean(node.text && node.text.trim())
      : Array.isArray(node.children) && node.children.some(hasContent);
  return children.some(hasContent) ? state : null;
}

const str = (value) => (typeof value === 'string' && value.trim() ? value : null);

/** @param {any} doc offer as returned by /api/offers?depth=1 (or sent by Live Preview) */
export function mapOffer(doc, base = '') {
  return {
    id: String(doc.id ?? 'new'),
    title: doc.title || '',
    titleEn: str(doc.titleEn),
    titleEs: str(doc.titleEs),
    shortDescription: doc.shortDescription || '',
    shortDescriptionEn: str(doc.shortDescriptionEn),
    shortDescriptionEs: str(doc.shortDescriptionEs),
    category: doc.category === 'individual' ? 'individual' : 'workshop',
    order: typeof doc.order === 'number' ? doc.order : null,
    cardImage: mediaUrl(doc.cardImage, 'card', base),
    image: mediaUrl(doc.image, 'large', base),
    externalImageUrl: str(doc.externalImageUrl),
    dates: (doc.dates || []).map((d) => d && d.label).filter(Boolean),
    registrationUrl: str(doc.registrationUrl),
    location: str(doc.location),
    participants: str(doc.participants),
    duration: str(doc.duration),
    price: str(doc.price),
    dialogType: doc.dialogType || 'details',
    canvaUrl: str(doc.canvaUrl),
    dialogContent: richOrNull(doc.dialogContent),
    // When the event stops being shown (ISO timestamp), computed by the CMS from "Event-Datum". Null = never.
    expiresAt: doc.eventDate ? doc.expiresAt || null : null,
    hidden: doc.hidden === true,
  };
}

const RICH_FIELDS = [
  'welcomeIntro',
  'aboutParagraph1',
  'aboutParagraph2',
  'aboutParagraph3',
  'sessionDescription1',
  'sessionDescription2',
  'sessionDescription3',
  'sessionDescription4',
  'sessionDescription5',
  'sessionPricesContent',
  'sessionBillingContent',
  'sessionAdvantagesContent',
  'sessionCancellationContent',
  'sessionDisclaimerContent',
];
const TEXT_FIELDS = [
  'sessionPricesTitle',
  'sessionBillingTitle',
  'sessionAdvantagesTitle',
  'sessionCancellationTitle',
  'sessionDisclaimerTitle',
];
const IMAGE_FIELDS = [
  ['welcomeImage', 'large'],
  ['aboutPortrait', 'large'],
  ['sessionRoomImage', 'large'],
];

/** @param {any} doc the "site-content" global as returned by /api/globals/site-content?depth=1 */
export function mapSiteContent(doc, base = '') {
  const out = {};
  for (const key of RICH_FIELDS) out[key] = richOrNull(doc && doc[key]);
  for (const key of TEXT_FIELDS) out[key] = str(doc && doc[key]);
  for (const [key, size] of IMAGE_FIELDS) out[key] = mediaUrl(doc && doc[key], size, base);
  return out;
}

/** Order shown on the page: "Reihenfolge" first (offers without one last), then oldest first. */
export function sortOffers(offers) {
  return [...offers].sort((a, b) => {
    const ao = a.order ?? Number.POSITIVE_INFINITY;
    const bo = b.order ?? Number.POSITIVE_INFINITY;
    return ao === bo ? (Number(a.id) || 0) - (Number(b.id) || 0) : ao - bo;
  });
}

/** True while the offer should be on the page at time `now` (ms): not hidden and not past its event date. */
export function isLive(offer, now) {
  if (offer.hidden) return false;
  return !offer.expiresAt || Date.parse(offer.expiresAt) > now;
}
