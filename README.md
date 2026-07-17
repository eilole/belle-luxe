# Belle Luxe by Kim — Luxury Beauty Salon

A full-stack luxury beauty salon website + admin studio built with Next.js 16, TypeScript, Tailwind CSS v4, Drizzle ORM, and PostgreSQL.

## What's inside

- **Public salon site** (`/`) — cinematic hero, 4 service categories with price menus and galleries, salon editorial, Kim profile, booking form
- **Admin studio** (`/admin`) — secure login, booking management (confirm / complete / cancel / delete), stats dashboard
- **PWA** — installable on any phone via `manifest.json` + service worker (`sw.js`)
- **Booking API** (`/api/bookings`) — validated, persistent PostgreSQL storage with `pending` / `confirmed` / `completed` / `cancelled` statuses
- **Download snapshot** (`/index-download.html`) — self-contained HTML file
- **APK guide** (`/apk`) — Bubblewrap, Capacitor, TWA instructions
- **Deployment guide** (`/deploy`) — Vercel + Supabase step-by-step

## Quick start

```bash
npm install
npm run dev
```

## Database

```bash
# Local (sandbox)
npx drizzle-kit push

# Production (Supabase / any PostgreSQL)
npx drizzle-kit push --force  # or use migration files
```

## Environment variables

Copy `.env.example` to `.env.local` and set:
- `DATABASE_URL` — PostgreSQL connection string
- `ADMIN_PASSWORD` — admin dashboard password

## Build

```bash
npm run build
npm start
```

## Deploy permanently (free)

1. Create a free Supabase project and copy the database URL
2. Set `DATABASE_URL` and `ADMIN_PASSWORD` in Vercel environment variables
3. Run:
```bash
npx vercel login
npx vercel deploy --prod
```

See `/deploy` on the live site for the full visual guide.

## Repository

```bash
git clone https://github.com/YOUR_USERNAME/belle-luxe.git
```

To create from this folder:
```bash
git init
git add .
git commit -m "feat: Belle Luxe salon site + admin studio"
npx gh repo create belle-luxe --public --source=. --push
```

## Structure

```
├── src/
│   ├── app/                 # Next.js App Router pages
│   ├── components/          # React components (Hero, Services, Booking, Admin, etc.)
│   ├── lib/                 # Service data, auth, database helpers
│   ├── db/                  # Drizzle schema + connection
│   └── ...
├── public/                  # Images, PWA manifest, icons, download HTML
├── vercel.json              # Production deployment config
```
