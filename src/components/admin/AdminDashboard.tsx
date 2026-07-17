"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  CalendarDays,
  CheckCircle2,
  Clock4,
  Crown,
  LogOut,
  MessageCircle,
  Phone,
  RefreshCw,
  Search,
  Sparkles,
  Trash2,
  XCircle,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { getServiceLabel, whatsappLink } from "@/lib/services";

type Booking = {
  id: number;
  name: string;
  phone: string;
  service: string;
  preferredDate: string;
  preferredTime: string;
  notes: string | null;
  status: string;
  createdAt: string;
};

const STATUS_FLOW = ["pending", "confirmed", "completed", "cancelled"] as const;
type Status = (typeof STATUS_FLOW)[number];

const STATUS_STYLES: Record<string, string> = {
  pending: "border-amber-300/40 bg-amber-300/10 text-amber-200",
  confirmed: "border-gold/50 bg-gold/10 text-gold-light",
  completed: "border-emerald-300/40 bg-emerald-300/10 text-emerald-200",
  cancelled: "border-red-300/35 bg-red-300/10 text-red-200",
};

const FILTERS = ["all", ...STATUS_FLOW] as const;

function phoneDigits(phone: string): string {
  return phone.replace(/[^\d]/g, "");
}

function formatDate(value: string): string {
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return value;
  return d.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
}

export function AdminDashboard() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>("all");
  const [query, setQuery] = useState("");
  const [busyId, setBusyId] = useState<number | null>(null);

  async function load() {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/bookings", { cache: "no-store" });
      if (res.status === 401) {
        window.location.reload();
        return;
      }
      const data = await res.json();
      setBookings(data.bookings ?? []);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  async function updateStatus(id: number, status: Status) {
    setBusyId(id);
    setBookings((prev) => prev.map((b) => (b.id === id ? { ...b, status } : b)));
    try {
      await fetch(`/api/admin/bookings/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
    } finally {
      setBusyId(null);
    }
  }

  async function remove(id: number) {
    if (!confirm("Delete this booking permanently?")) return;
    setBusyId(id);
    setBookings((prev) => prev.filter((b) => b.id !== id));
    try {
      await fetch(`/api/admin/bookings/${id}`, { method: "DELETE" });
    } finally {
      setBusyId(null);
    }
  }

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    window.location.reload();
  }

  const stats = useMemo(() => {
    const today = new Date().toISOString().split("T")[0];
    return {
      total: bookings.length,
      pending: bookings.filter((b) => b.status === "pending").length,
      confirmed: bookings.filter((b) => b.status === "confirmed").length,
      today: bookings.filter((b) => b.preferredDate === today).length,
    };
  }, [bookings]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return bookings.filter((b) => {
      const matchFilter = filter === "all" || b.status === filter;
      const matchQuery =
        !q ||
        b.name.toLowerCase().includes(q) ||
        b.phone.toLowerCase().includes(q) ||
        getServiceLabel(b.service).toLowerCase().includes(q);
      return matchFilter && matchQuery;
    });
  }, [bookings, filter, query]);

  return (
    <div className="min-h-svh bg-ink pb-20">
      {/* Top bar */}
      <header className="sticky top-0 z-30 border-b border-gold/20 bg-ink/85 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
          <div className="flex items-center gap-3">
            <span className="grid h-11 w-11 place-items-center rounded-full border border-gold/50">
              <span className="text-gold-gradient font-serif text-sm italic">BL</span>
            </span>
            <div>
              <p className="font-serif text-lg leading-none tracking-[0.2em] text-ivory">
                BELLE LUXE
              </p>
              <p className="mt-1 flex items-center gap-1 text-[9px] uppercase tracking-[0.35em] text-gold">
                <Crown className="h-2.5 w-2.5" strokeWidth={1.5} /> Admin Studio
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={load}
              className="grid h-10 w-10 place-items-center rounded-full border border-gold/30 text-gold transition-colors hover:bg-gold/10"
              aria-label="Refresh"
            >
              <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} strokeWidth={1.75} />
            </button>
            <button
              onClick={logout}
              className="flex items-center gap-2 rounded-full border border-gold/30 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.25em] text-sand transition-colors hover:bg-gold/10 hover:text-gold-light"
            >
              <LogOut className="h-3.5 w-3.5" strokeWidth={1.75} />
              Sign out
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-5">
        {/* Heading */}
        <div className="py-9">
          <h1 className="font-serif text-4xl font-light text-ivory sm:text-5xl">
            Booking <span className="text-gold-gradient italic">Studio</span>
          </h1>
          <p className="mt-2 text-sm text-sand">
            Manage every appointment that arrives from the Belle Luxe website.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {[
            { label: "Total Bookings", value: stats.total, icon: CalendarDays },
            { label: "Awaiting Reply", value: stats.pending, icon: Clock4 },
            { label: "Confirmed", value: stats.confirmed, icon: CheckCircle2 },
            { label: "Today", value: stats.today, icon: Sparkles },
          ].map((s) => (
            <div
              key={s.label}
              className="border border-gold/15 bg-coal/60 p-5 transition-colors hover:border-gold/40"
            >
              <s.icon className="h-5 w-5 text-gold" strokeWidth={1.5} />
              <p className="mt-4 font-serif text-4xl font-light text-ivory">{s.value}</p>
              <p className="mt-1 text-[10px] font-semibold uppercase tracking-[0.28em] text-sand">
                {s.label}
              </p>
            </div>
          ))}
        </div>

        {/* Controls */}
        <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap gap-2">
            {FILTERS.map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`rounded-full border px-4 py-2 text-[10px] font-bold uppercase tracking-[0.22em] transition-colors ${
                  filter === f
                    ? "border-gold bg-gold/15 text-gold-light"
                    : "border-gold/20 text-sand hover:border-gold/40 hover:text-ivory"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
          <div className="relative sm:w-64">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-sand" strokeWidth={1.5} />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search name, phone, service…"
              className="field pl-10"
            />
          </div>
        </div>

        {/* List */}
        <div className="mt-6 space-y-3">
          {loading ? (
            <div className="grid place-items-center py-24 text-sand">
              <RefreshCw className="h-6 w-6 animate-spin text-gold" strokeWidth={1.5} />
              <p className="mt-3 text-sm">Loading bookings…</p>
            </div>
          ) : filtered.length === 0 ? (
            <div className="grid place-items-center border border-dashed border-gold/20 py-24 text-center">
              <Crown className="h-8 w-8 text-gold/60" strokeWidth={1.25} />
              <p className="mt-4 font-serif text-xl text-ivory">No bookings here yet</p>
              <p className="mt-1 text-sm text-sand">
                New requests from the website will appear instantly.
              </p>
            </div>
          ) : (
            <AnimatePresence initial={false}>
              {filtered.map((b) => (
                <motion.div
                  key={b.id}
                  layout
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.97 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  className="border border-gold/15 bg-coal/50 p-5 transition-colors hover:border-gold/35"
                >
                  <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                    {/* Info */}
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-3">
                        <h3 className="font-serif text-xl text-ivory">{b.name}</h3>
                        <span
                          className={`rounded-full border px-3 py-1 text-[9px] font-bold uppercase tracking-[0.25em] ${
                            STATUS_STYLES[b.status] ?? STATUS_STYLES.pending
                          }`}
                        >
                          {b.status}
                        </span>
                      </div>
                      <div className="mt-3 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-sand">
                        <span className="flex items-center gap-2 text-gold-light">
                          <Sparkles className="h-3.5 w-3.5" strokeWidth={1.5} />
                          {getServiceLabel(b.service)}
                        </span>
                        <span className="flex items-center gap-2">
                          <CalendarDays className="h-3.5 w-3.5 text-gold" strokeWidth={1.5} />
                          {formatDate(b.preferredDate)} · {b.preferredTime}
                        </span>
                        <a
                          href={`tel:${b.phone}`}
                          className="flex items-center gap-2 transition-colors hover:text-gold-light"
                        >
                          <Phone className="h-3.5 w-3.5 text-gold" strokeWidth={1.5} />
                          {b.phone}
                        </a>
                      </div>
                      {b.notes ? (
                        <p className="mt-3 border-l-2 border-gold/40 pl-3 text-sm italic text-sand">
                          “{b.notes}”
                        </p>
                      ) : null}
                    </div>

                    {/* Actions */}
                    <div className="flex shrink-0 flex-wrap items-center gap-2">
                      <a
                        href={whatsappLink(
                          `Hello ${b.name}! This is Kim from Belle Luxe regarding your ${getServiceLabel(
                            b.service,
                          )} appointment on ${formatDate(b.preferredDate)} at ${b.preferredTime}.`,
                        )}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="grid h-9 w-9 place-items-center rounded-full border border-gold/30 text-gold transition-colors hover:bg-gold/10"
                        title="Message on WhatsApp"
                        onClick={() => {
                          void phoneDigits(b.phone);
                        }}
                      >
                        <MessageCircle className="h-4 w-4" strokeWidth={1.75} />
                      </a>

                      {b.status !== "confirmed" && b.status !== "completed" && (
                        <button
                          disabled={busyId === b.id}
                          onClick={() => updateStatus(b.id, "confirmed")}
                          className="rounded-full bg-gradient-to-r from-gold-deep via-gold to-gold-light px-4 py-2 text-[10px] font-bold uppercase tracking-[0.2em] text-ink transition-transform hover:scale-105 disabled:opacity-50"
                        >
                          Confirm
                        </button>
                      )}
                      {b.status === "confirmed" && (
                        <button
                          disabled={busyId === b.id}
                          onClick={() => updateStatus(b.id, "completed")}
                          className="rounded-full border border-emerald-300/40 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.2em] text-emerald-200 transition-colors hover:bg-emerald-300/10 disabled:opacity-50"
                        >
                          Complete
                        </button>
                      )}
                      {b.status !== "cancelled" && (
                        <button
                          disabled={busyId === b.id}
                          onClick={() => updateStatus(b.id, "cancelled")}
                          className="grid h-9 w-9 place-items-center rounded-full border border-red-300/30 text-red-200 transition-colors hover:bg-red-300/10 disabled:opacity-50"
                          title="Cancel"
                        >
                          <XCircle className="h-4 w-4" strokeWidth={1.75} />
                        </button>
                      )}
                      <button
                        disabled={busyId === b.id}
                        onClick={() => remove(b.id)}
                        className="grid h-9 w-9 place-items-center rounded-full border border-gold/15 text-sand transition-colors hover:border-red-300/40 hover:text-red-200 disabled:opacity-50"
                        title="Delete"
                      >
                        <Trash2 className="h-4 w-4" strokeWidth={1.75} />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          )}
        </div>
      </main>
    </div>
  );
}
