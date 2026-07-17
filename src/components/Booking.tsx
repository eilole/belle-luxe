"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  CalendarCheck,
  CheckCircle2,
  Clock4,
  Loader2,
  MessageCircle,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { useEffect, useMemo, useState, type FormEvent } from "react";
import {
  SERVICE_OPTIONS,
  SERVICES,
  TIME_SLOTS,
  WHATSAPP_DISPLAY,
  whatsappLink,
} from "@/lib/services";
import { Reveal } from "./Reveal";

type Status = "idle" | "sending" | "success" | "error";

const PERKS = [
  { icon: Clock4, text: "Reply within minutes during opening hours" },
  { icon: ShieldCheck, text: "No deposit for first-time queens" },
  { icon: Sparkles, text: "Free consultation with every ritual" },
];

export function Booking() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [service, setService] = useState(SERVICES[0].id);
  const [date, setDate] = useState("");
  const [time, setTime] = useState(TIME_SLOTS[0]);
  const [notes, setNotes] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    const handler = (e: Event) => {
      const detail = (e as CustomEvent<string>).detail;
      if (typeof detail === "string" && SERVICE_OPTIONS.some((o) => o.value === detail)) {
        setService(detail);
      }
    };
    window.addEventListener("belle:book", handler);
    return () => window.removeEventListener("belle:book", handler);
  }, []);

  const minDate = useMemo(() => new Date().toISOString().split("T")[0], []);

  const serviceLabel =
    SERVICE_OPTIONS.find((o) => o.value === service)?.label ?? service;

  const waMessage = `Hello Kim! This is ${name || "…"}. I just requested a booking for ${serviceLabel} on ${date || "…"} at ${time}. My number is ${phone || "…"}.`;

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setErrors({});
    setStatus("sending");
    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, phone, service, date, time, notes }),
      });
      const data = (await res.json().catch(() => ({}))) as {
        ok?: boolean;
        errors?: Record<string, string>;
      };
      if (res.status === 422 && data.errors) {
        setErrors(data.errors);
        setStatus("idle");
        return;
      }
      if (!res.ok || !data.ok) throw new Error("Request failed");
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  const inputLabel = "mb-2 block text-[10px] font-bold uppercase tracking-[0.35em] text-gold";
  const errorText = "mt-1.5 text-xs italic text-red-300/90";

  return (
    <section id="booking" className="relative overflow-hidden bg-coal py-28 sm:py-36">
      <div className="pointer-events-none absolute left-1/2 top-0 h-px w-full bg-gradient-to-r from-transparent via-gold/50 to-transparent" />
      <div className="pointer-events-none absolute -right-40 bottom-0 h-[480px] w-[480px] rounded-full bg-gold/8 blur-[140px]" />

      <div className="mx-auto grid max-w-7xl gap-16 px-6 lg:grid-cols-[1fr_1.05fr] lg:gap-20">
        {/* Left copy */}
        <div className="flex flex-col justify-center">
          <Reveal>
            <p className="text-[11px] font-semibold uppercase tracking-[0.45em] text-gold">
              Reservations
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="mt-5 font-serif text-4xl font-light leading-[1.08] text-ivory sm:text-5xl md:text-6xl">
              Reserve Your{" "}
              <span className="text-gold-gradient italic">Throne</span>
            </h2>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mt-7 max-w-md text-sm leading-[1.9] text-ivory/70 sm:text-[15px]">
              Tell us when, and Kim will have the chair warm. Your request
              lands directly in the salon book — we confirm every appointment
              personally on WhatsApp.
            </p>
          </Reveal>

          <div className="mt-10 space-y-4">
            {PERKS.map((perk, i) => (
              <Reveal key={perk.text} delay={0.2 + i * 0.08}>
                <div className="flex items-center gap-4 border-b border-gold/10 pb-4">
                  <perk.icon className="h-4.5 w-4.5 shrink-0 text-gold" strokeWidth={1.5} />
                  <p className="text-sm text-sand">{perk.text}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.45}>
            <a
              href={whatsappLink("Hello Kim! I would like to book an appointment at Belle Luxe.")}
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-10 inline-flex items-center gap-3 text-sm text-gold-light transition-colors hover:text-gold"
            >
              <MessageCircle className="h-5 w-5" strokeWidth={1.5} />
              <span className="border-b border-gold/40 pb-0.5 transition-colors group-hover:border-gold">
                Prefer to chat? Message us on {WHATSAPP_DISPLAY}
              </span>
            </a>
          </Reveal>
        </div>

        {/* Form card */}
        <Reveal delay={0.15}>
          <div className="relative border border-gold/25 bg-ink/70 p-7 shadow-[0_35px_100px_rgba(0,0,0,0.55)] backdrop-blur-sm sm:p-10">
            <div className="pointer-events-none absolute -left-2 -top-2 h-10 w-10 border-l-2 border-t-2 border-gold" />
            <div className="pointer-events-none absolute -bottom-2 -right-2 h-10 w-10 border-b-2 border-r-2 border-gold" />

            <AnimatePresence mode="wait">
              {status === "success" ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  className="flex min-h-[460px] flex-col items-center justify-center text-center"
                >
                  <span className="grid h-20 w-20 place-items-center rounded-full border border-gold/50 bg-gold/10">
                    <CheckCircle2 className="h-9 w-9 text-gold" strokeWidth={1.5} />
                  </span>
                  <h3 className="mt-7 font-serif text-3xl font-light text-ivory">
                    Your request is <span className="text-gold-gradient italic">received</span>
                  </h3>
                  <p className="mt-4 max-w-sm text-sm leading-relaxed text-sand">
                    {serviceLabel} — {date} at {time}. Kim will confirm your
                    chair personally. Want it sealed even faster?
                  </p>
                  <a
                    href={whatsappLink(waMessage)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-sheen mt-8 flex items-center gap-2.5 rounded-full bg-gradient-to-r from-gold-deep via-gold to-gold-light px-8 py-3.5 text-[10px] font-bold uppercase tracking-[0.28em] text-ink transition-transform duration-300 hover:scale-[1.04]"
                  >
                    <MessageCircle className="h-4 w-4" strokeWidth={2} />
                    Confirm on WhatsApp
                  </a>
                  <button
                    onClick={() => setStatus("idle")}
                    className="mt-5 text-xs italic text-sand underline-offset-4 transition-colors hover:text-gold-light hover:underline"
                  >
                    Make another booking
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  onSubmit={handleSubmit}
                  noValidate
                  className="space-y-6"
                >
                  <div className="grid gap-6 sm:grid-cols-2">
                    <div>
                      <label className={inputLabel} htmlFor="bk-name">Your Name</label>
                      <input
                        id="bk-name"
                        className="field"
                        placeholder="e.g. Neema"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        autoComplete="name"
                      />
                      {errors.name && <p className={errorText}>{errors.name}</p>}
                    </div>
                    <div>
                      <label className={inputLabel} htmlFor="bk-phone">WhatsApp Number</label>
                      <input
                        id="bk-phone"
                        className="field"
                        placeholder="+255 7XX XXX XXX"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        autoComplete="tel"
                        inputMode="tel"
                      />
                      {errors.phone && <p className={errorText}>{errors.phone}</p>}
                    </div>
                  </div>

                  <div>
                    <label className={inputLabel} htmlFor="bk-service">Choose Your Ritual</label>
                    <select
                      id="bk-service"
                      className="field"
                      value={service}
                      onChange={(e) => setService(e.target.value)}
                    >
                      {SERVICE_OPTIONS.map((o) => (
                        <option key={o.value} value={o.value}>
                          {o.label}
                        </option>
                      ))}
                    </select>
                    {errors.service && <p className={errorText}>{errors.service}</p>}
                  </div>

                  <div className="grid gap-6 sm:grid-cols-2">
                    <div>
                      <label className={inputLabel} htmlFor="bk-date">Preferred Date</label>
                      <input
                        id="bk-date"
                        type="date"
                        className="field"
                        min={minDate}
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                      />
                      {errors.date && <p className={errorText}>{errors.date}</p>}
                    </div>
                    <div>
                      <label className={inputLabel} htmlFor="bk-time">Preferred Time</label>
                      <select
                        id="bk-time"
                        className="field"
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                      >
                        {TIME_SLOTS.map((slot) => (
                          <option key={slot} value={slot}>
                            {slot}
                          </option>
                        ))}
                      </select>
                      {errors.time && <p className={errorText}>{errors.time}</p>}
                    </div>
                  </div>

                  <div>
                    <label className={inputLabel} htmlFor="bk-notes">
                      Notes for Kim <span className="normal-case tracking-normal text-sand">(optional)</span>
                    </label>
                    <textarea
                      id="bk-notes"
                      className="field min-h-[92px] resize-y"
                      placeholder="Inspo links, hair length, occasion…"
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                    />
                  </div>

                  {status === "error" && (
                    <p className="border border-red-300/25 bg-red-400/10 px-4 py-3 text-sm text-red-200">
                      Something interrupted your request. Please try again — or
                      reach us instantly on WhatsApp below.
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={status === "sending"}
                    className="btn-sheen flex w-full items-center justify-center gap-3 rounded-full bg-gradient-to-r from-gold-deep via-gold to-gold-light px-8 py-4 text-[11px] font-bold uppercase tracking-[0.3em] text-ink shadow-[0_12px_45px_rgba(212,175,55,0.25)] transition-all duration-300 hover:scale-[1.02] disabled:cursor-wait disabled:opacity-70"
                  >
                    {status === "sending" ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" strokeWidth={2} />
                        Sending your request…
                      </>
                    ) : (
                      <>
                        <CalendarCheck className="h-4 w-4" strokeWidth={2} />
                        Request Appointment
                      </>
                    )}
                  </button>

                  <p className="text-center font-serif text-xs italic text-sand">
                    A queen never waits — we confirm every request personally.
                  </p>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
