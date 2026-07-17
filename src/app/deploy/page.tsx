import { Check, ExternalLink, Globe, Key } from "lucide-react";

export const metadata = {
  title: "Belle Luxe — Deploy Guide",
  robots: { index: false, follow: false },
};

export default function DeployPage() {
  return (
    <main className="min-h-svh bg-ink px-6 py-28 text-ivory">
      <div className="mx-auto max-w-3xl">
        <p className="text-[11px] font-bold uppercase tracking-[0.45em] text-gold">Deployment</p>
        <h1 className="mt-4 font-serif text-4xl font-light leading-tight sm:text-5xl">
          Permanent Free <span className="text-gold-gradient italic">Hosting</span>
        </h1>
        <p className="mt-6 text-base leading-relaxed text-sand">
          Belle Luxe runs on Next.js + PostgreSQL. For free permanent hosting, pair <strong>Vercel</strong> (website hosting) with <strong>Supabase</strong> (free PostgreSQL database). This guide gives you every step.
        </p>

        <div className="mt-12 space-y-8">
          {/* Step 1 */}
          <section className="border border-gold/20 bg-coal/40 p-6 sm:p-8">
            <div className="flex items-center gap-3">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gold/15 text-xs font-bold text-gold">1</span>
              <h2 className="font-serif text-xl">Deploy the database (Supabase — free forever)</h2>
            </div>
            <ol className="mt-5 space-y-3 pl-3 text-sm text-ivory/80">
              <li className="flex items-start gap-3">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-gold" strokeWidth={2} />
                Go to <a href="https://supabase.com" target="_blank" rel="noopener noreferrer" className="text-gold-light underline underline-offset-2">supabase.com</a> and create a free account.
              </li>
              <li className="flex items-start gap-3">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-gold" strokeWidth={2} />
                Create a new project (name it <code className="text-gold-light">belle-luxe</code>).
              </li>
              <li className="flex items-start gap-3">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-gold" strokeWidth={2} />
                Go to Settings → Database → Connection String. Copy the <code className="text-gold-light">postgresql://...</code> URL.
              </li>
              <li className="flex items-start gap-3">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-gold" strokeWidth={2} />
                Push the schema: <code className="rounded bg-ink px-2 py-0.5 text-xs text-gold">npx drizzle-kit push</code> using that DATABASE_URL.
              </li>
            </ol>
          </section>

          {/* Step 2 */}
          <section className="border border-gold/20 bg-coal/40 p-6 sm:p-8">
            <div className="flex items-center gap-3">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gold/15 text-xs font-bold text-gold">2</span>
              <h2 className="font-serif text-xl">Host on Vercel (free, never expires for public sites)</h2>
            </div>
            <ol className="mt-5 space-y-3 pl-3 text-sm text-ivory/80">
              <li className="flex items-start gap-3">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-gold" strokeWidth={2} />
                Create a <a href="https://vercel.com" target="_blank" rel="noopener noreferrer" className="text-gold-light underline underline-offset-2">vercel.com</a> account (free).
              </li>
              <li className="flex items-start gap-3">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-gold" strokeWidth={2} />
                Connect your GitHub/GitLab repo, or use the Vercel CLI: <code className="rounded bg-ink px-2 py-0.5 text-xs text-gold">vercel deploy</code> from this folder.
              </li>
              <li className="flex items-start gap-3">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-gold" strokeWidth={2} />
                In Vercel Dashboard → Project → Settings → Environment Variables, add:
                <ul className="mt-2 pl-4 list-disc space-y-1 text-xs text-sand">
                  <li><code>DATABASE_URL</code> = your Supabase connection string</li>
                  <li><code>ADMIN_PASSWORD</code> = a strong password for the admin studio</li>
                </ul>
              </li>
              <li className="flex items-start gap-3">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-gold" strokeWidth={2} />
                Click Redeploy. Your site is live at a <code className="text-gold-light">.vercel.app</code> URL that never expires.
              </li>
            </ol>
          </section>

          {/* Step 3 */}
          <section className="border border-gold/20 bg-coal/40 p-6 sm:p-8">
            <div className="flex items-center gap-3">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gold/15 text-xs font-bold text-gold">3</span>
              <h2 className="font-serif text-xl">Link a custom domain (optional, $10/year)</h2>
            </div>
            <p className="mt-4 text-sm text-ivory/70">
              In Vercel Dashboard → Domains, add your custom domain (e.g. <code>belleluxebykim.com</code>). Vercel handles SSL certificates automatically. Your admin dashboard will be at <code>/admin</code> on that domain.
            </p>
          </section>
        </div>

        <div className="mt-12 flex flex-wrap gap-3">
          <a href="https://supabase.com" target="_blank" rel="noopener noreferrer" className="btn-primary">
            <Globe className="h-3.5 w-3.5" strokeWidth={2} /> Open Supabase
          </a>
          <a href="https://vercel.com" target="_blank" rel="noopener noreferrer" className="btn-ghost">
            <ExternalLink className="h-3.5 w-3.5" strokeWidth={2} /> Open Vercel
          </a>
          <a href="/" className="btn-ghost">
            <Key className="h-3.5 w-3.5" strokeWidth={2} /> Back to Salon
          </a>
        </div>
      </div>
    </main>
  );
}
