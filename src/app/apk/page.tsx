import { ArrowDownCircle, Check, Smartphone, Terminal, Wrench } from "lucide-react";

export const metadata = {
  title: "Belle Luxe — Build APK",
  robots: { index: true, follow: false },
};

export default function ApkPage() {
  return (
    <main className="min-h-svh bg-ink px-6 py-28 text-ivory">
      <div className="mx-auto max-w-3xl">
        <p className="text-[11px] font-bold uppercase tracking-[0.45em] text-gold">
          Developer Guide
        </p>
        <h1 className="mt-4 font-serif text-4xl font-light leading-tight sm:text-5xl">
          Building a native{" "}
          <span className="text-gold-gradient italic">Android APK</span>
        </h1>
        <p className="mt-6 text-base leading-relaxed text-sand">
          The Belle Luxe salon is a web application (Next.js + PostgreSQL). It runs in any browser — mobile, desktop, or tablet. To turn it into a downloadable Android APK file, you have two practical paths.
        </p>

        <div className="mt-14 space-y-10">
          {/* Option 1 — PWA (recommended, no build needed) */}
          <section className="border border-gold/20 bg-coal/40 p-7">
            <div className="flex items-center gap-3">
              <span className="grid h-11 w-11 place-items-center rounded-full border border-gold/40 text-gold">
                <Smartphone className="h-5 w-5" strokeWidth={1.5} />
              </span>
              <h2 className="font-serif text-2xl">Option 1 — Install as PWA (Free, Instant)</h2>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-ivory/70">
              The salon site is already a Progressive Web App. Visitors can install it directly from their Android browser:
            </p>
            <ol className="mt-5 space-y-3 text-sm text-sand">
              {[
                "Open the salon site in Chrome or Edge on Android",
                "Tap the browser menu (⋮) → 'Add to Home screen' or 'Install app'",
                "Confirm — Belle Luxe appears as a native app icon",
                "It works offline and opens like any APK without a Play Store account",
              ].map((step, i) => (
                <li key={i} className="flex items-start gap-3">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-gold" strokeWidth={2} />
                  <span>{step}</span>
                </li>
              ))}
            </ol>
            <a
              href="/"
              className="mt-7 inline-flex items-center gap-2 rounded-full border border-gold/30 px-6 py-3 text-[10px] font-bold uppercase tracking-[0.28em] text-gold-light transition-colors hover:bg-gold/10"
            >
              <ArrowDownCircle className="h-4 w-4" strokeWidth={1.75} />
              Open the salon (install prompt appears on Android)
            </a>
          </section>

          {/* Option 2 — TWA / Bubblewrap */}
          <section className="border border-gold/20 bg-coal/40 p-7">
            <div className="flex items-center gap-3">
              <span className="grid h-11 w-11 place-items-center rounded-full border border-gold/40 text-gold">
                <Terminal className="h-5 w-5" strokeWidth={1.5} />
              </span>
              <h2 className="font-serif text-2xl">Option 2 — Trusted Web Activity APK (Play Store Ready)</h2>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-ivory/70">
              Google provides <strong>Bubblewrap</strong> — a CLI that wraps any PWA into a real `.apk` file for the Play Store with zero native code.
            </p>
            <div className="mt-5 overflow-hidden rounded-xl bg-ink/90 border border-gold/10">
              <div className="bg-gold/10 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.3em] text-gold">Terminal Commands</div>
              <pre className="overflow-x-auto p-4 text-xs leading-relaxed text-ivory/85 font-mono whitespace-pre-wrap">
{`# 1. Install Bubblewrap (Node)
npm install -g @bubblewrap/cli

# 2. Initialize with your PWA URL
bubblewrap init --manifest https://your-domain.com/manifest.json

# 3. Build the APK
bubblewrap build

# Output: app-release-signed.apk (ready for Play Store)`}
              </pre>
            </div>
          </section>

          {/* Option 3 — Capacitor */}
          <section className="border border-gold/20 bg-coal/40 p-7">
            <div className="flex items-center gap-3">
              <span className="grid h-11 w-11 place-items-center rounded-full border border-gold/40 text-gold">
                <Wrench className="h-5 w-5" strokeWidth={1.5} />
              </span>
              <h2 className="font-serif text-2xl">Option 3 — Capacitor (Hybrid Native)</h2>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-ivory/70">
              If you want deeper native features (push notifications from a native module, camera access, file storage), you can wrap the web build with <strong>Capacitor</strong>. It produces both Android and iOS binaries from the same web codebase.
            </p>
            <div className="mt-5 overflow-hidden rounded-xl bg-ink/90 border border-gold/10">
              <div className="bg-gold/10 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.3em] text-gold">Quick Setup</div>
              <pre className="overflow-x-auto p-4 text-xs leading-relaxed text-ivory/85 font-mono whitespace-pre-wrap">
{`npm install @capacitor/core @capacitor/cli
npx cap init
npx cap add android
npm run build
npx cap sync
npx cap open android  # Build APK from Android Studio`}
              </pre>
            </div>
          </section>
        </div>

        <div className="mt-14 border-t border-gold/15 pt-8 text-center">
          <p className="font-serif text-sm italic text-sand">
            The salon is already a web app — these options simply wrap it.
          </p>
          <a
            href="/"
            className="mt-5 inline-flex items-center gap-2 rounded-full border border-gold/30 px-6 py-3 text-[10px] font-bold uppercase tracking-[0.3em] text-gold-light transition-colors hover:bg-gold/10"
          >
            Back to Belle Luxe
          </a>
        </div>
      </div>
    </main>
  );
}
