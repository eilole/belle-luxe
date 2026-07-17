"use client";

import { motion } from "framer-motion";
import { CalendarCheck, ChevronDown, Crown, Sparkles } from "lucide-react";
import Image from "next/image";

const EASE = [0.22, 1, 0.36, 1] as const;

export function Hero() {
  return (
    <section id="top" className="relative flex min-h-svh flex-col overflow-hidden">
      {/* Backdrop */}
      <motion.div
        initial={{ scale: 1.18 }}
        animate={{ scale: 1 }}
        transition={{ duration: 2.6, ease: EASE }}
        className="absolute inset-0"
      >
        <Image
          src="/images/hero.jpg"
          alt="Belle Luxe muse in golden light"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-b from-ink/80 via-ink/55 to-ink" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(6,5,4,0.55)_100%)]" />

      {/* Ornamental side rules */}
      <div className="pointer-events-none absolute inset-y-0 left-6 hidden w-px bg-gradient-to-b from-transparent via-gold/30 to-transparent md:block" />
      <div className="pointer-events-none absolute inset-y-0 right-6 hidden w-px bg-gradient-to-b from-transparent via-gold/30 to-transparent md:block" />

      {/* Content */}
      <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-6 pb-28 pt-36 text-center">
        <motion.p
          initial={{ opacity: 0, letterSpacing: "0.9em" }}
          animate={{ opacity: 1, letterSpacing: "0.5em" }}
          transition={{ duration: 1.4, delay: 0.3, ease: EASE }}
          className="flex items-center gap-3 text-[10px] font-semibold uppercase text-gold sm:text-xs"
        >
          <Sparkles className="h-3.5 w-3.5 shrink-0" strokeWidth={1.5} />
          Welcome to the royal treatment
          <Sparkles className="h-3.5 w-3.5 shrink-0" strokeWidth={1.5} />
        </motion.p>

        <h1 className="mt-8 font-serif font-light leading-[0.95]">
          <motion.span
            initial={{ opacity: 0, y: 60, filter: "blur(12px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 1.2, delay: 0.55, ease: EASE }}
            className="block text-[15vw] uppercase tracking-[0.04em] text-ivory sm:text-[11vw] lg:text-[8.5rem]"
          >
            Belle
          </motion.span>
          <motion.span
            initial={{ opacity: 0, y: 60, filter: "blur(12px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 1.2, delay: 0.75, ease: EASE }}
            className="text-gold-gradient block text-[15vw] uppercase tracking-[0.04em] sm:text-[11vw] lg:text-[8.5rem]"
          >
            Luxe
          </motion.span>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.05, ease: EASE }}
          className="mt-4 flex items-center gap-4 font-serif text-xl italic text-gold-light sm:text-2xl"
        >
          <span className="gold-hairline w-10 sm:w-16" />
          by Kim
          <span className="gold-hairline w-10 sm:w-16" />
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.2, ease: EASE }}
          className="mt-7 max-w-xl text-sm leading-relaxed text-ivory/75 sm:text-base"
        >
          Where beauty meets luxury. Premium human hair, flawless glam,
          captivating lashes and golden nails — crafted for the modern
          African queen.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.35, ease: EASE }}
          className="mt-11 flex flex-col items-center gap-4 sm:flex-row"
        >
          <a
            href="#booking"
            className="btn-sheen group flex items-center gap-3 rounded-full bg-gradient-to-r from-gold-deep via-gold to-gold-light px-9 py-4 text-[11px] font-bold uppercase tracking-[0.3em] text-ink shadow-[0_10px_45px_rgba(212,175,55,0.35)] transition-all duration-300 hover:scale-[1.04] hover:shadow-[0_14px_60px_rgba(212,175,55,0.55)]"
          >
            <CalendarCheck className="h-4 w-4" strokeWidth={2} />
            Book Your Throne
          </a>
          <a
            href="#services"
            className="group flex items-center gap-3 rounded-full border border-gold/40 px-9 py-4 text-[11px] font-bold uppercase tracking-[0.3em] text-gold-light transition-all duration-300 hover:border-gold hover:bg-gold/10"
          >
            <Crown className="h-4 w-4 transition-transform duration-300 group-hover:-rotate-12" strokeWidth={1.75} />
            Explore Services
          </a>
        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.a
        href="#services"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 text-sand transition-colors hover:text-gold"
        aria-label="Scroll to services"
      >
        <span className="text-[9px] uppercase tracking-[0.5em]">Scroll</span>
        <motion.span
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="h-4 w-4" strokeWidth={1.5} />
        </motion.span>
      </motion.a>
    </section>
  );
}
