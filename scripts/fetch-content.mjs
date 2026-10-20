// Fetches all website content from the Payload CMS and writes it to content/content.json,
// downloading every image into public/media/ so the published site doesn't depend on the CMS,
// Vercel Blob or any other host. Runs automatically before `npm run dev` and `npm run build`.
//
//   PAYLOAD_URL=https://<project>.vercel.app npm run build
//   npm run dev                 # --dev: falls back to the local CMS (http://localhost:3001) and to the
//                               # last fetched content when the CMS isn't running
//
// If the CMS can't be reached the build fails on purpose, so Cloudflare keeps serving the last good
// version of the site instead of publishing an empty page.

import crypto from 'node:crypto';
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { isLive, mapOffer, mapSiteContent, sortOffers } from '../lib/cms-mapping.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const OUT_FILE = path.join(root, 'content', 'content.json');
const MEDIA_DIR = path.join(root, 'public', 'media');
const dev = process.argv.includes('--dev');

// Real environment variables (e.g. on Cloudflare) win over the local files.
for (const file of ['.env.local', '.env']) {
  try {
    process.loadEnvFile(path.join(root, file));
  } catch {
    // file doesn't exist
  }
}

const PAYLOAD_URL = (process.env.PAYLOAD_URL || (dev ? 'http://localhost:3001' : '')).replace(/\/$/, '');
const MAX_ASSET_BYTES = 25 * 1024 * 1024; // Cloudflare's per-file limit for static assets

async function fail(message) {
  if (dev) {
    const existing = await fs.stat(OUT_FILE).catch(() => null);
    if (existing) {
      console.warn(`[content] ${message}\n[content] Using the content fetched last time (${OUT_FILE}).`);
      process.exit(0);
    }
    console.warn(`[content] ${message}\n[content] Starting with empty content, the page shows its built-in texts only.`);
    await fs.mkdir(path.dirname(OUT_FILE), { recursive: true });
    await fs.writeFile(OUT_FILE, JSON.stringify(emptyContent(), null, 2));
    process.exit(0);
  }
  console.error(`[content] ${message}`);
  process.exit(1);
}

const emptyContent = () => ({
  generatedAt: new Date().toISOString(),
  offers: [],
  siteContent: mapSiteContent({}),
});

if (!PAYLOAD_URL) {
  await fail('PAYLOAD_URL is not set. Set it to the address of the CMS, e.g. https://<project>.vercel.app');
}

async function get(apiPath) {
  const url = `${PAYLOAD_URL}/api${apiPath}`;
  let res;
  try {
    res = await fetch(url, { signal: AbortSignal.timeout(60_000) });
  } catch (error) {
    await fail(`Could not reach the CMS at ${PAYLOAD_URL} (${error.message}). Is PAYLOAD_URL correct and the CMS running?`);
  }
  if (!res.ok) await fail(`GET ${url} failed: HTTP ${res.status}`);
  return res.json();
}

// ── fetch ───────────────────────────────────────────────────────────────────────────────────────

// The public API only returns published offers; hidden ones are filtered again below to be safe.
const [offersResponse, siteContentResponse] = await Promise.all([
  get('/offers?depth=1&limit=500&pagination=false&where[_status][equals]=published'),
  get('/globals/site-content?depth=1'),
]);

const now = Date.now();
const all = (offersResponse.docs || []).map((doc) => mapOffer(doc, PAYLOAD_URL));
const offers = sortOffers(all.filter((offer) => isLive(offer, now)));
const hiddenCount = all.filter((o) => o.hidden).length;
const expiredCount = all.filter((o) => !o.hidden && !isLive(o, now)).length;

const content = {
  generatedAt: new Date(now).toISOString(),
  offers,
  siteContent: mapSiteContent(siteContentResponse, PAYLOAD_URL),
};

// ── localise media ──────────────────────────────────────────────────────────────────────────────

// Vercel Blob (https://<store>.public.blob.vercel-storage.com/...) and the CMS's own "/api/media/file/..." URLs.
const isCmsMedia = (value) =>
  typeof value === 'string' &&
  (/^https?:\/\/[a-z0-9.-]+\.blob\.vercel-storage\.com\//i.test(value) || value.startsWith(`${PAYLOAD_URL}/api/media/file/`));

const downloads = new Map(); // remote URL → Promise<"/media/<file>">
const names = new Map(); // local file name → remote URL, to detect basename collisions

function localName(remoteUrl) {
  let base =
    decodeURIComponent(path.posix.basename(new URL(remoteUrl).pathname)).replace(/[^a-zA-Z0-9._-]+/g, '-') || 'file';
  if (names.has(base) && names.get(base) !== remoteUrl) {
    base = `${crypto.createHash('sha1').update(remoteUrl).digest('hex').slice(0, 8)}-${base}`;
  }
  names.set(base, remoteUrl);
  return base;
}

async function fetchWithRetry(url, attempts = 3) {
  let lastError;
  for (let i = 1; i <= attempts; i++) {
    try {
      const res = await fetch(url, { signal: AbortSignal.timeout(60_000) });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return Buffer.from(await res.arrayBuffer());
    } catch (error) {
      lastError = error;
      if (i < attempts) await new Promise((resolve) => setTimeout(resolve, 500 * i));
    }
  }
  throw new Error(`Could not download ${url}: ${lastError.message}`);
}

function download(remoteUrl) {
  if (!downloads.has(remoteUrl)) {
    downloads.set(
      remoteUrl,
      (async () => {
        const name = localName(remoteUrl);
        const buffer = await fetchWithRetry(remoteUrl);
        if (buffer.length > MAX_ASSET_BYTES) {
          console.warn(`[content] ${name} is ${(buffer.length / 1048576).toFixed(1)} MB; Cloudflare rejects static assets over 25 MB.`);
        }
        await fs.writeFile(path.join(MEDIA_DIR, name), buffer);
        return `/media/${encodeURIComponent(name)}`;
      })(),
    );
  }
  return downloads.get(remoteUrl);
}

/** Replaces every CMS media URL in `value` (deeply) with the path of the downloaded local copy. */
async function localise(value) {
  if (isCmsMedia(value)) return download(value.split('?')[0]);
  if (Array.isArray(value)) return Promise.all(value.map(localise));
  if (value && typeof value === 'object') {
    const entries = await Promise.all(Object.entries(value).map(async ([k, v]) => [k, await localise(v)]));
    return Object.fromEntries(entries);
  }
  return value;
}

await fs.rm(MEDIA_DIR, { recursive: true, force: true });
await fs.mkdir(MEDIA_DIR, { recursive: true });
let localised;
try {
  localised = await localise(content);
} catch (error) {
  await fail(error.message);
}

await fs.mkdir(path.dirname(OUT_FILE), { recursive: true });
await fs.writeFile(OUT_FILE, JSON.stringify(localised, null, 2));

console.log(
  `[content] ${offers.length} offers on the page (${hiddenCount} hidden, ${expiredCount} expired and left out), ` +
    `${downloads.size} images downloaded from ${PAYLOAD_URL}`,
);
