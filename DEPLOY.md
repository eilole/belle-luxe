# Deploy Belle Luxe to Vercel

## Step 1: Create a GitHub Repository

Open your terminal in this project folder and run:

```bash
# Option A: If you have GitHub CLI (`gh`) installed
npx gh repo create belle-luxe --public --source=. --push --description "Belle Luxe by Kim — Luxury Beauty Salon"

# Option B: Manual (no CLI needed)
# 1. Go to https://github.com/new
# 2. Name it `belle-luxe`
# 3. Leave it Public, do NOT initialize with README
# 4. Click Create repository
# 5. Copy the repo URL (e.g. https://github.com/YOUR_USERNAME/belle-luxe.git)
# 6. Run these commands:
git remote add origin https://github.com/YOUR_USERNAME/belle-luxe.git
git branch -M main
git push -u origin main
```

Your code is now on GitHub at: `https://github.com/YOUR_USERNAME/belle-luxe`

## Step 2: Create a Supabase Database (Free)

1. Go to https://supabase.com and sign up
2. Click **New Project**
3. Name it `belle-luxe`, set a strong database password (save it!)
4. Wait 2 minutes for it to provision
5. Go to **Settings → Database → Connection string → URI**
6. Copy the connection string (looks like `postgresql://postgres:password@db...supabase.co:5432/postgres`)
7. **Important:** replace `[YOUR-PASSWORD]` in the URL with your actual database password

## Step 3: Push the Schema to Supabase

From your terminal:

```bash
DATABASE_URL="postgresql://postgres:YOUR_PASSWORD@db...supabase.co:5432/postgres" \
  npx drizzle-kit push
```

You should see "✓ Changes applied" — your `bookings` table is ready.

## Step 4: Import into Vercel

1. Go to https://vercel.com/new
2. Click **Import Git Repository**
3. Select your `belle-luxe` repository
4. Vercel auto-detects Next.js — just click **Deploy**

## Step 5: Add Environment Variables

Before clicking Deploy (or in Project Settings → Environment Variables after):

| Key | Value |
|---|---|
| `DATABASE_URL` | Your Supabase connection string |
| `ADMIN_PASSWORD` | Choose a strong password for `/admin` login |

## Step 6: Done!

Vercel deploys in ~60 seconds. You'll get a URL like:
- `https://belle-luxe-XXXX.vercel.app` → salon website
- `https://belle-luxe-XXXX.vercel.app/admin` → admin studio

This URL **never expires** (free forever on Vercel Hobby plan).

## Optional: Custom Domain

1. Vercel Dashboard → Project → Settings → Domains
2. Add your domain (e.g. `belleluxebykim.com`)
3. Update your domain's DNS with the records Vercel provides
4. SSL certificate is auto-issued

## After Deploy

Every `git push` to the `main` branch triggers an automatic redeploy on Vercel.

---

**Troubleshooting:**

- **Database errors:** Make sure `DATABASE_URL` is set correctly in Vercel env vars
- **Build fails:** Run `npm run build` locally first to verify
- **Admin can't login:** Check `ADMIN_PASSWORD` env var is set (default: `belleluxe`)
