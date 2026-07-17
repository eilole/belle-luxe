import {
  ArrowDownCircle,
  CheckCircle2,
  Download,
  FileArchive,
  Package,
  Smartphone,
  Terminal,
  Wrench,
} from "lucide-react";

export const metadata = {
  title: "Belle Luxe — Download Android App",
  robots: { index: true, follow: false },
};

export default function DownloadAppPage() {
  return (
    <main className="min-h-svh bg-ink px-6 py-28 text-ivory">
      <div className="mx-auto max-w-3xl">
        <p className="text-[11px] font-bold uppercase tracking-[0.45em] text-gold">
          Hybrid Native App
        </p>
        <h1 className="mt-4 font-serif text-4xl font-light leading-tight sm:text-5xl">
          Download{" "}
          <span className="text-gold-gradient italic">Belle Luxe App</span>
        </h1>
        <p className="mt-6 text-base leading-relaxed text-sand">
          This is a complete <strong>Capacitor hybrid native project</strong> — the entire salon website wrapped in a native Android shell with custom splash screen, gold theme, and deep linking. Build it locally to produce a real installable <code>.apk</code> file.
        </p>

        {/* Download card */}
        <div className="mt-10 border border-gold/30 bg-gradient-to-br from-coal/80 to-ink/80 p-8 text-center shadow-[0_30px_80px_rgba(0,0,0,0.6)]">
          <div className="mx-auto grid h-20 w-20 place-items-center rounded-2xl border border-gold/40 bg-gold/10">
            <FileArchive className="h-9 w-9 text-gold" strokeWidth={1.5} />
          </div>
          <h2 className="mt-5 font-serif text-2xl">belle-luxe-android-app.zip</h2>
          <p className="mt-2 text-sm text-sand">
            Complete project with Capacitor + Android build script + resources
          </p>

          <ul className="mx-auto mt-6 max-w-sm space-y-2 text-left text-sm text-ivory/80">
            {[
              "Full Next.js + Drizzle source code",
              "Capacitor config (App ID: com.belleluxe.app)",
              "Android resources (colors, strings, styles)",
              "Custom splash screen + app icon",
              "Automated build-android.sh script",
              "Complete README with Play Store signing",
            ].map((f) => (
              <li key={f} className="flex items-start gap-2.5">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-gold" strokeWidth={1.75} />
                {f}
              </li>
            ))}
          </ul>

          <a
            href="/belle-luxe-android-app.zip"
            download="belle-luxe-android-app.zip"
            className="btn-sheen mt-8 inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-gold-deep via-gold to-gold-light px-10 py-4 text-[11px] font-bold uppercase tracking-[0.3em] text-ink shadow-[0_12px_45px_rgba(212,175,55,0.35)] transition-transform duration-300 hover:scale-[1.04]"
          >
            <Download className="h-4 w-4" strokeWidth={2.25} />
            Download Project ZIP (4.6 MB)
          </a>
        </div>

        {/* What you need */}
        <section className="mt-12 border border-gold/20 bg-coal/40 p-7">
          <div className="flex items-center gap-3">
            <Wrench className="h-5 w-5 text-gold" strokeWidth={1.5} />
            <h2 className="font-serif text-xl">Before you build</h2>
          </div>
          <p className="mt-4 text-sm text-ivory/70">
            The ZIP contains source code. You need these tools on your computer to produce the final APK:
          </p>
          <ul className="mt-4 space-y-2 text-sm text-sand">
            <li className="flex items-start gap-2.5">
              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-gold" strokeWidth={1.75} />
              <div>
                <strong className="text-ivory">Node.js 18+</strong> —{" "}
                <a href="https://nodejs.org" target="_blank" rel="noopener noreferrer" className="text-gold-light underline underline-offset-2">nodejs.org</a>
              </div>
            </li>
            <li className="flex items-start gap-2.5">
              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-gold" strokeWidth={1.75} />
              <div>
                <strong className="text-ivory">Android Studio</strong> —{" "}
                <a href="https://developer.android.com/studio" target="_blank" rel="noopener noreferrer" className="text-gold-light underline underline-offset-2">developer.android.com/studio</a>
              </div>
            </li>
            <li className="flex items-start gap-2.5">
              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-gold" strokeWidth={1.75} />
              <strong className="text-ivory">Java JDK 17</strong> (included with Android Studio)
            </li>
          </ul>
        </section>

        {/* 3-step build */}
        <section className="mt-8 border border-gold/20 bg-coal/40 p-7">
          <div className="flex items-center gap-3">
            <Terminal className="h-5 w-5 text-gold" strokeWidth={1.5} />
            <h2 className="font-serif text-xl">3-step build</h2>
          </div>
          <div className="mt-5 overflow-hidden rounded-xl border border-gold/10 bg-ink/90">
            <div className="bg-gold/10 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.3em] text-gold">
              Terminal
            </div>
            <pre className="overflow-x-auto p-4 text-xs leading-relaxed text-ivory/85 font-mono whitespace-pre-wrap">
{`# 1. Unzip and enter the project
unzip belle-luxe-android-app.zip
cd belle-luxe-app

# 2. Set Android SDK (macOS/Linux)
export ANDROID_HOME=$HOME/Android/Sdk

# 3. Build the APK (automatic)
chmod +x build-android.sh
./build-android.sh

# Output: android/app/build/outputs/apk/debug/app-debug.apk`}
            </pre>
          </div>
          <p className="mt-4 flex items-start gap-2 text-sm text-sand">
            <Smartphone className="mt-0.5 h-4 w-4 shrink-0 text-gold" strokeWidth={1.75} />
            Transfer the .apk file to any Android phone via WhatsApp, email, or USB, then tap to install.
          </p>
        </section>

        {/* Alternative: Instant PWA */}
        <section className="mt-8 border border-gold/20 bg-coal/40 p-7">
          <div className="flex items-center gap-3">
            <Package className="h-5 w-5 text-gold" strokeWidth={1.5} />
            <h2 className="font-serif text-xl">Instant alternative (no build)</h2>
          </div>
          <p className="mt-4 text-sm text-ivory/70">
            The salon site is already a Progressive Web App. Clients can install it on any Android phone in seconds — no build step, no APK needed.
          </p>
          <a
            href="/"
            className="mt-5 inline-flex items-center gap-2 rounded-full border border-gold/30 px-6 py-3 text-[10px] font-bold uppercase tracking-[0.28em] text-gold-light transition-colors hover:bg-gold/10"
          >
            <ArrowDownCircle className="h-4 w-4" strokeWidth={1.75} />
            Open the salon (install prompt appears on Android)
          </a>
        </section>
      </div>
    </main>
  );
}
