"use client";

import { Download, X } from "lucide-react";
import { useEffect, useState } from "react";

export function InstallPrompt() {
  const [prompt, setPrompt] = useState<any>(null);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (localStorage.getItem("belle_install_dismissed") === "1") {
      setDismissed(true);
      return;
    }
    const onBeforeInstall = (e: Event) => {
      e.preventDefault();
      setPrompt(e as any);
    };
    window.addEventListener("beforeinstallprompt", onBeforeInstall);
    return () => window.removeEventListener("beforeinstallprompt", onBeforeInstall);
  }, []);

  const install = async () => {
    if (!prompt) return;
    prompt.prompt();
    const choice = await prompt.userChoice;
    setPrompt(null);
    if (choice.outcome === "accepted") setDismissed(true);
  };

  const dismiss = () => {
    setDismissed(true);
    localStorage.setItem("belle_install_dismissed", "1");
  };

  if (!prompt || dismissed) return null;

  return (
    <div className="fixed bottom-24 left-4 right-4 z-[60] flex items-center justify-between rounded-2xl border border-gold/30 bg-ink/95 px-5 py-4 shadow-[0_15px_45px_rgba(0,0,0,0.7)] backdrop-blur-xl md:right-6 md:left-auto md:max-w-md md:rounded-full md:px-6 md:py-3 md:shadow-[0_20px_50px_rgba(0,0,0,0.6)] md:bottom-28">
      <div className="flex items-center gap-3">
        <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-gold/40 bg-gold/10">
          <Download className="h-4 w-4 text-gold" strokeWidth={1.75} />
        </div>
        <div className="min-w-0">
          <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-gold">Install Belle Luxe</p>
          <p className="text-xs text-sand">Book appointments directly from your home screen</p>
        </div>
      </div>
      <div className="flex shrink-0 items-center gap-2">
        <button
          onClick={install}
          className="rounded-full bg-gradient-to-r from-gold-deep via-gold to-gold-light px-4 py-2.5 text-[10px] font-bold uppercase tracking-[0.22em] text-ink transition-transform hover:scale-[1.05]"
        >
          Install
        </button>
        <button
          onClick={dismiss}
          aria-label="Dismiss"
          className="grid h-9 w-9 place-items-center rounded-full text-sand transition-colors hover:text-ivory"
        >
          <X className="h-4 w-4" strokeWidth={1.75} />
        </button>
      </div>
    </div>
  );
}
