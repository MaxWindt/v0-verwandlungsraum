# Verwandlungsraum

Website of Rebecca Schwindt (Kunsttherapie). A static [Next.js](https://nextjs.org/) site (`output: 'export'`) on
Cloudflare. All offers, workshops and texts come from the Payload CMS in [`cms/`](cms/README.md) (hosted on Vercel) at
build time.

```
Editor ──► Payload CMS (cms/, Vercel) ──publish──► Cloudflare deploy hook ──► build ──► static site (Cloudflare)
                 │  Postgres (Neon) + images (Vercel Blob)                       ▲
                 └────────────── REST API ◄──── fetch-content.mjs ───────────────┘
                                                                 
  event date passes ──► scheduler Worker (scheduler/) ──► same deploy hook   (one rebuild, exactly at midnight)
```

- `scripts/fetch-content.mjs` runs before every `dev`/`build`: it reads the CMS, **leaves out hidden and expired
  offers**, downloads every image into `public/media/` and writes `content/content.json`. If the CMS can't be reached the
  build fails on purpose, so Cloudflare keeps serving the last good version.
- `components/` render that content. Text that is left empty in the CMS falls back to the built-in translations
  (`lib/translations.ts`, German/English/Spanish).
- `app/preview` is the draft preview shown inside the CMS (eye icon). It is not linked anywhere and set to `noindex`.
- `scheduler/` is a tiny Cloudflare Worker that rebuilds the site when an event expires, see below.

## Hiding offers and events that are over

In the CMS, every offer has

- **Auf der Website verstecken** (hidden): the offer stays in the CMS but is not on the website. Untick and publish
  to show it again.
- **Event-Datum** (event date, optional): the offer disappears automatically at midnight (Berlin time) after that day.
  An event on 2 October is visible all of 2 October and gone from 3 October 00:00. Offers without a date never expire.

Expired events are removed in two layers, so nothing depends on a daily job:

1. **In the browser, instantly, no rebuild.** Every offer carries its expiry time. The page hides expired offers as soon
   as it loads (also when the static HTML is older) and again at the exact second an offer expires while the page is
   open (`hooks/use-live-offers.ts`).
2. **Rebuild exactly once when it matters.** The CMS tells the scheduler Worker the time of the *next* expiry. A
   Durable Object alarm fires at that moment (no cron schedule at all), triggers the deploy hook and asks the CMS for
   the following expiry. No upcoming event = no alarm = nothing runs. This only cleans the static HTML (search engines,
   visitors without JavaScript); the page is already correct without it. Setup: [`scheduler/README.md`](scheduler/README.md).

## Local development

Requires Node 20+. Start the CMS first ([`cms/README.md`](cms/README.md#local-development)), then:

```bash
cp .env.example .env          # PAYLOAD_URL=http://localhost:3001
npm install
npm run dev                   # http://localhost:3000
```

`npm run dev` fetches the content again on every start. Without a running CMS it uses the content fetched last time
(or the built-in texts only), so you can still work on the design.

## Deployment to Cloudflare

The site is a Cloudflare **Worker with static assets** (`wrangler.jsonc`, output folder `out`).

### First upload with wrangler

```bash
npx wrangler login
PAYLOAD_URL=https://<your-cms>.vercel.app npx wrangler deploy
```

`wrangler deploy` runs `npm run build` first (see `build.command` in `wrangler.jsonc`), which fetches the CMS content,
exports the site and uploads `out/`. The site is then live at `https://verwandlungsraum.<account>.workers.dev`.
Custom domain: Cloudflare dashboard → Workers & Pages → verwandlungsraum → Settings → Domains & Routes.

### Automatic rebuilds when content is published

A direct `wrangler deploy` has no build pipeline, so connect the Worker to GitHub once:

1. Cloudflare dashboard → Workers & Pages → **verwandlungsraum** → Settings → **Builds** → connect the GitHub
   repository `MaxWindt/v0-verwandlungsraum`, branch `main`.
2. Build command `npm run build`, deploy command `npx wrangler deploy`.
3. Build variables: **`PAYLOAD_URL=https://<your-cms>.vercel.app`** (required).
4. Same page → **Deploy hooks** → create one for `main` and copy its URL. It goes into `DEPLOY_HOOK_URL` of the CMS
   (Vercel) and of the scheduler Worker.

From then on, publishing in the CMS (or an expiring event) rebuilds the site in about 1–2 minutes. Pushes to `main`
also trigger a build.

## Moving from Sanity

The old Sanity Studio (`/studio`), its schemas and the draft-mode routes were removed. Content was copied once with
`npm run migrate:sanity` in `cms/` (see there). The Sanity project and tokens in `.env.local` are no longer used and
can be deleted once you are happy with the CMS.
