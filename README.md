# Advisory — African Professional Services

Next.js + Bootstrap 5 site for Bernard Bempong & Associates.

## Quick start

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Deploy on Vercel

1. Push this repo to GitHub (already linked: `deviTopps/bba`).
2. In [Vercel](https://vercel.com/new), **Import** the repo.
3. Framework preset should be **Next.js** (auto-detected). Leave Build Command `next build` and Output blank.
4. Add environment variables from [`.env.example`](./.env.example) in **Project → Settings → Environment Variables** (Production + Preview as needed).
5. Deploy.

After deploy, point your custom domain under **Project → Settings → Domains**.

### Recommended env vars on Vercel

| Variable | Required | Purpose |
|---|---|---|
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | For Studio / CMS insights | Sanity project ID |
| `NEXT_PUBLIC_SANITY_DATASET` | Usually `production` | Sanity dataset |
| `SANITY_REVALIDATE_SECRET` | Optional | Protects `/api/revalidate` webhook |
| `CONTACT_WEBHOOK_URL` **or** `RESEND_API_KEY` | Optional | Contact form delivery |

Without Sanity vars the site still builds and serves static content; `/studio` shows a setup message. Without a contact webhook/Resend key, the form falls back to `mailto:`.

### Sanity webhook (optional)

In Sanity, add a webhook to `https://YOUR_DOMAIN/api/revalidate` with header `Authorization: Bearer <SANITY_REVALIDATE_SECRET>` so Insight pages refresh after publish.

## Stack

- Next.js 15 (App Router) — Vercel-native
- Bootstrap 5 + Bootstrap Icons
- Sanity CMS (`/studio`)
- Cormorant Garamond + DM Sans
