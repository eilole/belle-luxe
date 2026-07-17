"use client";

import { motion } from "framer-motion";
import { Crown, KeyRound, Loader2 } from "lucide-react";
import { useState, type FormEvent } from "react";

export function AdminLogin() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      if (res.ok) {
        window.location.reload();
        return;
      }
      setError("Incorrect password. Try again, queen.");
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="grid min-h-svh place-items-center bg-ink px-6">
      <div className="pointer-events-none absolute left-1/2 top-1/3 h-[380px] w-[520px] -translate-x-1/2 rounded-full bg-gold/8 blur-[130px]" />

      <motion.div
        initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className="relative w-full max-w-sm border border-gold/25 bg-coal/70 p-8 shadow-[0_35px_100px_rgba(0,0,0,0.6)] backdrop-blur-sm sm:p-10"
      >
        <div className="pointer-events-none absolute -left-2 -top-2 h-9 w-9 border-l-2 border-t-2 border-gold" />
        <div className="pointer-events-none absolute -bottom-2 -right-2 h-9 w-9 border-b-2 border-r-2 border-gold" />

        <div className="flex flex-col items-center text-center">
          <span className="grid h-16 w-16 place-items-center rounded-full border border-gold/50">
            <Crown className="h-6 w-6 text-gold" strokeWidth={1.25} />
          </span>
          <p className="mt-6 font-serif text-2xl tracking-[0.18em] text-ivory">BELLE LUXE</p>
          <p className="mt-2 text-[10px] uppercase tracking-[0.4em] text-gold">Admin Studio</p>
          <p className="mt-4 text-sm text-sand">Sign in to manage your bookings</p>
        </div>

        <form onSubmit={submit} className="mt-8 space-y-4">
          <div>
            <label
              htmlFor="admin-pass"
              className="mb-2 block text-[10px] font-bold uppercase tracking-[0.35em] text-gold"
            >
              Password
            </label>
            <div className="relative">
              <KeyRound className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-sand" strokeWidth={1.5} />
              <input
                id="admin-pass"
                type="password"
                className="field pl-10"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoFocus
              />
            </div>
          </div>

          {error && <p className="text-sm italic text-red-300/90">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="btn-sheen flex w-full items-center justify-center gap-2.5 rounded-full bg-gradient-to-r from-gold-deep via-gold to-gold-light px-6 py-3.5 text-[11px] font-bold uppercase tracking-[0.3em] text-ink transition-transform hover:scale-[1.02] disabled:opacity-60"
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" strokeWidth={2} /> Signing in…
              </>
            ) : (
              "Enter Studio"
            )}
          </button>
        </form>

        <p className="mt-6 text-center text-xs italic text-sand/70">
          Default password: <span className="text-gold-light">belleluxe</span>
        </p>
      </motion.div>
    </div>
  );
}
