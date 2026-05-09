# Expats Connect Netherlands

A CMS-powered community website for expats living in the Netherlands. Built with Next.js 15, TypeScript, and Tailwind CSS — deployable to Vercel in one click.

## Features

- **Homepage** — Hero section, live countdown timer to next event, community stats, featured event, blog preview
- **Events** — All events listing with upcoming/past split, featured event card
- **Event Detail** — Full event page with countdown, RSVP via email, organiser info
- **Blog** — Articles and practical guides for expats
- **About** — Team, mission, values
- **Contact** — Contact form with subject dropdown
- **Admin CMS** — Password-protected admin panel at `/admin` with full CRUD for events and posts

## Upcoming Events

| Event | Date | Time | Location |
|-------|------|------|----------|
| **Sip & Pray** | Saturday, 6 June 2026 | 12:00 noon – 1:30 PM | Amsterdam |
| Expat Welcome Walk | Saturday, 20 June 2026 | 10:00 AM | Amsterdam |
| Dutch Language Exchange | Friday, 10 July 2026 | 7:00 PM | Utrecht |

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Admin Panel

Go to `/admin` and log in with the password set in `src/data/site.ts`.

> ⚠️ Change the default password (`admin2026`) before deploying!

## Deploying to Vercel

### Option 1: Vercel CLI (fastest)

```bash
npm install -g vercel
vercel
```

### Option 2: GitHub + Vercel Dashboard

1. Push this project to a GitHub repository
2. Go to [vercel.com](https://vercel.com) → New Project
3. Import your GitHub repository
4. Vercel auto-detects Next.js — click **Deploy**
5. Done! Your site is live.

### Environment Variables (optional)

No environment variables are required for basic deployment. Everything is file-based.

## Updating Content

Content lives in TypeScript files for reliability and type safety:

| Content | File |
|---------|------|
| Events | `src/data/events.ts` |
| Blog Posts | `src/data/posts.ts` |
| Site Settings | `src/data/site.ts` |

After editing, redeploy to Vercel (`git push` triggers auto-deploy).

### Making the CMS fully persistent

To allow real-time content editing without redeploying, connect **Vercel KV**:

1. In your Vercel project dashboard → Storage → Create KV Store
2. Add `KV_REST_API_URL` and `KV_REST_API_TOKEN` environment variables
3. Update API routes in `src/app/api/` to use `@vercel/kv`

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Dates**: date-fns
- **Deployment**: Vercel
# expats-connect
