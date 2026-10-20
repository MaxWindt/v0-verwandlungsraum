# Expiry scheduler (Cloudflare Worker)

Rebuilds the website at the moment an event expires, and only then. No cron job: a Durable Object keeps one alarm for
the next expiry. When it fires it calls the deploy hook, asks the CMS for the following expiry and sets the next alarm.
With no upcoming event there is no alarm and nothing runs.

This is optional. The page already hides expired events in the browser; this rebuild only makes the static HTML
match (search engines, visitors without JavaScript).

```
CMS publishes/hides/deletes an offer ──POST /schedule {"at": next expiry}──► Durable Object alarm
                                                                                   │ at midnight (+90 s)
        CMS  ◄── GET /api/next-expiry ── sets the next alarm ◄── POST deploy hook ─┘
```

## Deploy

```bash
cd scheduler
npm install
# set CMS_URL in wrangler.jsonc to your Vercel URL, then:
npx wrangler secret put DEPLOY_HOOK_URL     # the Cloudflare deploy hook of the website
npx wrangler secret put SCHEDULER_SECRET    # any long random string, e.g. openssl rand -hex 32
npx wrangler deploy
```

Then on Vercel (CMS project) set `SCHEDULER_URL=https://verwandlungsraum-scheduler.<account>.workers.dev` and the same
`SCHEDULER_SECRET`, and redeploy. Publish any offer once so the CMS sends the first schedule.

## Check it

```bash
curl -H "Authorization: Bearer <SCHEDULER_SECRET>" https://verwandlungsraum-scheduler.<account>.workers.dev/status
# {"rebuildAt":"2026-10-30T23:01:30.000Z"}   (null = no upcoming event)
```

| Endpoint | |
| --- | --- |
| `POST /schedule` `{"at": "<ISO time>" \| null}` | Sets or clears the single pending rebuild. Needs the bearer secret. |
| `GET /status` | Shows the pending rebuild. Needs the bearer secret. |

`REBUILD_DELAY_SECONDS` (default 90) is the wait after midnight so the build certainly sees the event as expired.
If the deploy hook or CMS is down, the runtime retries the alarm automatically, and a retry never rebuilds twice for the
same expiry.

## Local test

```bash
printf 'DEPLOY_HOOK_URL=http://localhost:4100/hook\nSCHEDULER_SECRET=test\nCMS_URL=http://localhost:3001\nREBUILD_DELAY_SECONDS=0\n' > .dev.vars
npx wrangler dev --port 8799
curl -X POST localhost:8799/schedule -H "Authorization: Bearer test" -d "{\"at\":\"$(date -u -d '+10 seconds' +%FT%TZ)\"}"
```
