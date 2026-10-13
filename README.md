# Advisory — African Professional Services

Next.js + Bootstrap 5 site for Bernard Bempong & Associates.

## Quick start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Deploy on Vercel

1. Push this repo to GitHub (already linked: `deviTopps/bba`).
2. In [Vercel](https://vercel.com/new), **Import** the repo.
3. Framework preset should be **Next.js** (auto-detected). Leave Build Command `next build` and Output blank.
4. Deploy. No backend environment variables are required.

After deploy, point your custom domain under **Project → Settings → Domains**.

## Content and enquiries

The Express admin service manages enquiries, blog posts and consultations. See [backend setup](backend/README.md). Start it with `npm run admin:dev` after installing its dependencies and creating an admin account. Forms submit to this service, with an email fallback on failure. Set `ADMIN_SERVICE_URL` to switch blog content from local articles to managed posts.

## Stack

- Next.js 15 (App Router) — Vercel-native
- Bootstrap 5 + Bootstrap Icons
- Cormorant Garamond + DM Sans
