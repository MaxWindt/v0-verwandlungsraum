# Verwandlungsraum CMS (Payload)

All offers, workshops and page texts of the website are edited here. The public website is a static Next.js site
(repo root) on Cloudflare that reads this CMS when it builds. The admin is in German.

```
Editor ──► Payload CMS (this folder, Vercel) ──publish──► Cloudflare deploy hook
                │  Postgres (Neon) + images (Vercel Blob)          │
                │                                                  ▼
                └──────── REST API ◄──── build ──── Next.js site (Cloudflare)
```

- **Angebote (offers)**: title, short description (DE/EN/ES), images, dates, price, dialog content. Changes autosave as
  drafts; nothing changes on the website until **Veröffentlichen**. Version history shows who saved what.
- **Verstecken**: tick *Auf der Website verstecken* and publish. The offer stays in the CMS, the website no longer shows it.
  The list view shows the state of every offer (✅ sichtbar, 🙈 versteckt, ⌛ abgelaufen, ✏️ Entwurf).
- **Event-Datum**: optional. The offer disappears automatically at midnight (Berlin time) after that day.
- **Seiteninhalte (site content)**: welcome text, "about me", session description, prices and conditions, with images.
  Fields left empty show the website's built-in text. These go online with **Speichern** (no draft step), old versions can
  be restored from the Versions tab.
- **Live Preview** (eye icon): shows the unsaved draft inside the real website page, on phone, tablet or desktop.
- The dashboard has a **Website jetzt neu aufbauen** button for when a change doesn't show up.

## Local development

Requires Node 20+ and Docker (for Postgres).

```bash
docker run -d --name verwandlungsraum-postgres -e POSTGRES_PASSWORD=postgres -e POSTGRES_DB=verwandlungsraum -p 5433:5432 postgres:17-alpine
cp .env.example .env          # then set PAYLOAD_SECRET
npm install
npx payload migrate           # create the tables
npm run migrate:sanity        # optional: import the content from the old Sanity site
npm run dev                   # http://localhost:3001/admin, create the first user on first visit
```

The website, against the local CMS (from the repo root): `npm run dev` (http://localhost:3000).

### Changing the schema

Production uses migrations (nothing is pushed automatically). After changing collections or fields:

```bash
npx payload migrate:create <name>    # commit the generated files in src/migrations
npm run generate:types
```

## Deployment

### 1. CMS on Vercel

1. New Vercel project from this repo, **Root Directory: `cms`**. `vercel.json` makes the build run `payload migrate`
   before `next build`.
2. Storage → add **Neon Postgres** (sets `DATABASE_URL`) and a **Blob** store (sets `BLOB_READ_WRITE_TOKEN`).
3. Environment variables:
   - `PAYLOAD_SECRET`: long random string (`openssl rand -hex 32`)
   - `DEPLOY_HOOK_URL`: from step 2.2 below (add it after creating the hook, then redeploy)
   - `SITE_URL`: the public website, e.g. `https://verwandlungsraum.<account>.workers.dev` or your domain. Needed for
     Live Preview and CORS.
   - `SCHEDULER_URL`, `SCHEDULER_SECRET`: optional, see "Expiring events" below
4. Deploy and open `https://<project>.vercel.app/admin`. On the first visit Payload asks you to create the first user
   (email and password). Add further editors under **Einstellungen → Redakteur:innen**.
5. Import the existing content once, from your machine, against the production database:
   `DATABASE_URL=<neon url> BLOB_READ_WRITE_TOKEN=<token> PAYLOAD_SECRET=<secret> npm run migrate:sanity`
   (reads the old Sanity dataset through its public API; `FRESH=1` deletes existing offers first).

### 2. Website on Cloudflare

Build settings and the **deploy hook** are described in the [root README](../README.md#deployment-to-cloudflare).
Put the deploy hook URL into `DEPLOY_HOOK_URL` on Vercel. If the CMS can't be reached the website build fails on
purpose, so Cloudflare keeps serving the last good version.

### Expiring events

Browsers hide expired events by themselves (no setup needed). To also rebuild the static page at the moment an event
expires, deploy the small scheduler Worker ([`../scheduler/README.md`](../scheduler/README.md)) and set `SCHEDULER_URL`
(its address) and `SCHEDULER_SECRET` (the same secret as in the Worker) on Vercel. The CMS then tells it the next
expiry whenever an offer is published, hidden, unpublished or deleted. `GET /api/next-expiry` shows what it will be told.

## Useful files

| File | Purpose |
| --- | --- |
| `src/payload.config.ts` | Collections, globals, live preview, storage, DB, endpoints |
| `src/collections/Offers.ts` | Offers incl. hidden flag, event date, computed status |
| `src/globals/SiteContent.ts` | Texts and images of the page |
| `src/lib/expiry.ts` | The rule "visible until midnight (Berlin) after the event date" |
| `src/lib/schedule.ts` | Next expiry + notifying the scheduler Worker |
| `src/hooks/rebuildSite.ts` | Publish → website rebuild |
| `src/scripts/migrate-from-sanity.ts` | One-off import from Sanity |
