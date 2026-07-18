"use client";

import { motion } from "framer-motion";
import { BadgeCheck, Clock4, Crown, Gem, HeartHandshake, MapPin } from "lucide-react";
import Image from "next/image";
import { useRef } from "react";
import { Reveal, SectionHeading } from "./Reveal";

const EASE = [0.22, 1, 0.36, 1] as const;

const FEATURES = [
  {
    icon: Crown,
    title: "Private Chair Experience",
    text: "One queen, one chair, undivided artistry. Your appointment is a ritual, never a queue.",
  },
  {
    icon: Gem,
    title: "Premium Products Only",
    text: "100% virgin human hair, luxury lash fibres and skin-safe glam — quality you can feel.",
  },
  {
    icon: BadgeCheck,
    title: "Obsessive Hygiene",
    text: "Hospital-grade sterilisation on every tool, every set, every single time.",
  },
  {
    icon: Clock4,
    title: "Your Time, Honoured",
    text: "Punctual appointments, honest timing, and a chair that's ready when you arrive.",
  },
];

export function SalonSection() {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <section id="salon" ref={ref} className="relative overflow-hidden py-28 sm:py-36">
      <div className="pointer-events-none absolute right-[-180px] top-1/3 h-[460px] w-[460px] rounded-full bg-gold/7 blur-[130px]" />

      <div className="mx-auto grid max-w-7xl items-center gap-14 px-6 lg:grid-cols-2 lg:gap-20">
        {/* Image composition */}
        <Reveal className="relative">
          <motion.div
            initial={{ clipPath: "inset(12% 12% 12% 12%)" }}
            whileInView={{ clipPath: "inset(0% 0% 0% 0%)" }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 1.4, ease: EASE }}
            className="relative aspect-[4/5] overflow-hidden"
          >
            <Image
              src="/images/salon.jpg"
              alt="Inside the Belle Luxe salon"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-transparent" />
          </motion.div>

          {/* Offset gold frame */}
          <div className="pointer-events-none absolute -bottom-5 -right-5 -z-10 h-full w-full border border-gold/40 sm:-bottom-7 sm:-right-7" />

          {/* Floating card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.4, ease: EASE }}
            className="absolute -bottom-8 left-5 flex items-center gap-4 border border-gold/30 bg-ink/90 px-6 py-5 shadow-[0_25px_60px_rgba(0,0,0,0.6)] backdrop-blur-md sm:left-8"
          >
            <p className="font-serif text-5xl font-light text-gold-gradient">5+</p>
            <p className="text-[10px] font-semibold uppercase leading-relaxed tracking-[0.26em] text-sand">
              Years of<br />royal artistry
            </p>
          </motion.div>
        </Reveal>

        {/* Copy */}
        <div>
          <Reveal>
            <p className="text-[11px] font-semibold uppercase tracking-[0.45em] text-gold">
              The Salon
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="mt-5 font-serif text-4xl font-light leading-[1.08] text-ivory sm:text-5xl">
              Step Into a World of{" "}
              <span className="text-gold-gradient italic">Golden Indulgence</span>
            </h2>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mt-7 max-w-xl text-sm leading-[1.9] text-ivory/70 sm:text-[15px]">
              Velvet chairs. Gilded mirrors. Warm light that loves your skin.
              Belle Luxe was designed as an escape — a private sanctuary where
              the noise of the city melts away and every detail whispers
              luxury. Come as you are; leave as royalty.
            </p>
          </Reveal>

          <div className="mt-11 grid gap-x-8 gap-y-8 sm:grid-cols-2">
            {FEATURES.map((f, i) => (
              <Reveal key={f.title} delay={0.1 + i * 0.08}>
                <div className="group flex gap-4">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-gold/40 text-gold transition-all duration-500 group-hover:bg-gold group-hover:text-ink">
                    <f.icon className="h-4.5 w-4.5" strokeWidth={1.5} />
                  </span>
                  <div>
                    <h3 className="text-sm font-semibold tracking-wide text-ivory">{f.title}</h3>
                    <p className="mt-1.5 text-[13px] leading-relaxed text-sand">{f.text}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function KimSection() {
  return (
    <section id="kim" className="relative overflow-hidden bg-coal py-28 sm:py-36">
      <div className="pointer-events-none absolute left-[-160px] top-16 h-[420px] w-[420px] rounded-full bg-gold/7 blur-[130px]" />

      <div className="mx-auto grid max-w-7xl items-center gap-14 px-6 lg:grid-cols-2 lg:gap-20">
        {/* Copy */}
        <div className="order-2 lg:order-1">
          <Reveal>
            <p className="text-[11px] font-semibold uppercase tracking-[0.45em] text-gold">
              Meet The Artist
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="mt-5 font-serif text-4xl font-light leading-[1.08] text-ivory sm:text-5xl">
              Every Queen Deserves{" "}
              <span className="text-gold-gradient italic">a King</span>
            </h2>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mt-7 max-w-xl text-sm leading-[1.9] text-ivory/70 sm:text-[15px]">
              Founder, lead artist and the heart behind Belle Luxe — Kim has
              spent years perfecting the craft of making women feel
              unforgettable. From flawless frontal installs to bridal glam that
              survives happy tears, her signature is precision wrapped in
              warmth.
            </p>
          </Reveal>
          <Reveal delay={0.24}>
            <p className="mt-5 max-w-xl font-serif text-lg italic leading-relaxed text-sand">
              “When you sit in my chair, you are the only queen in the room.
              My job is simple — to make the mirror agree.”
            </p>
          </Reveal>
          <Reveal delay={0.3}>
            <p className="mt-8 font-serif text-4xl italic text-gold-gradient">Kim</p>
            <p className="mt-1 text-[10px] uppercase tracking-[0.4em] text-sand">
              Founder &amp; Lead Artist
            </p>
          </Reveal>

          <Reveal delay={0.36}>
            <div className="mt-10 flex flex-wrap items-center gap-6 text-[11px] uppercase tracking-[0.25em] text-sand">
              <span className="flex items-center gap-2">
                <HeartHandshake className="h-4 w-4 text-gold" strokeWidth={1.5} />
                500+ queens crowned
              </span>
              <span className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-gold" strokeWidth={1.5} />
                Dar es Salaam
              </span>
            </div>
          </Reveal>
        </div>

        {/* Portrait */}
        <Reveal className="relative order-1 lg:order-2">
          <motion.div
            initial={{ clipPath: "inset(12% 12% 12% 12%)" }}
            whileInView={{ clipPath: "inset(0% 0% 0% 0%)" }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 1.4, ease: EASE }}
            className="relative aspect-[4/5] overflow-hidden"
          >
            <Image
              src="/images/kim.jpg"
              alt="Kim — founder of Belle Luxe"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/50 via-transparent to-transparent" />
          </motion.div>
          <div className="pointer-events-none absolute -left-5 -top-5 -z-10 h-full w-full border border-gold/40 sm:-left-7 sm:-top-7" />
        </Reveal>
      </div>
    </section>
  );
}

export function QuoteStrip() {
  return (
    <section className="relative overflow-hidden py-24 sm:py-28">
      <div className="mx-auto max-w-4xl px-6 text-center">
        <SectionHeading
          eyebrow="The Belle Luxe Promise"
          title="“You Arrive a Guest,"
          italic="You Leave a Queen.”"
          sub="Walk-ins welcome when the chair is free — appointments always take the throne."
        />
      </div>
    </section>
  );
}
