"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, CalendarCheck, Gem, MessageCircle, Sparkles, X } from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { SERVICES, whatsappLink, type Service } from "@/lib/services";
import { Reveal, SectionHeading } from "./Reveal";

const EASE = [0.22, 1, 0.36, 1] as const;

function ServiceCard({
  service,
  i,
  onOpen,
}: {
  service: Service;
  i: number;
  onOpen: () => void;
}) {
  return (
    <motion.button
      onClick={onOpen}
      initial={{ opacity: 0, y: 70 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 1, delay: i * 0.12, ease: EASE }}
      whileHover="hover"
      className="group relative block w-full overflow-hidden border border-gold/15 bg-coal text-left transition-colors duration-500 hover:border-gold/50"
    >
      <div className="relative aspect-[3/4] overflow-hidden">
        <motion.div
          variants={{ hover: { scale: 1.08 } }}
          transition={{ duration: 1.1, ease: EASE }}
          className="absolute inset-0"
        >
          <Image
            src={service.image}
            alt={service.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 25vw"
            className="object-cover"
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/25 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-gold-deep/25 to-transparent opacity-0 transition-opacity duration-700 group-hover:opacity-100" />

        {/* Index */}
        <span className="absolute left-5 top-5 font-serif text-sm italic tracking-[0.3em] text-gold/90">
          {service.index}
        </span>
        <motion.span
          variants={{ hover: { rotate: 45 } }}
          transition={{ duration: 0.5, ease: EASE }}
          className="absolute right-5 top-5 grid h-10 w-10 place-items-center rounded-full border border-gold/50 bg-ink/40 text-gold backdrop-blur-md"
        >
          <ArrowUpRight className="h-4 w-4" strokeWidth={1.75} />
        </motion.span>

        {/* Copy */}
        <div className="absolute inset-x-0 bottom-0 p-6">
          <h3 className="font-serif text-4xl font-light uppercase tracking-[0.14em] text-ivory transition-colors duration-500 group-hover:text-gold-light">
            {service.title}
          </h3>
          <div className="gold-hairline mt-3 w-14 origin-left transition-transform duration-700 group-hover:scale-x-[2.2]" />
          <p className="mt-3 font-serif text-base italic text-sand">{service.tagline}</p>
          <p className="mt-4 flex translate-y-2 items-center gap-2 text-[10px] font-bold uppercase tracking-[0.32em] text-gold opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
            <Sparkles className="h-3 w-3" strokeWidth={1.5} />
            Discover the menu
          </p>
        </div>
      </div>
    </motion.button>
  );
}

function ServiceModal({ service, onClose }: { service: Service; onClose: () => void }) {
  const bookInSalon = () => {
    window.dispatchEvent(new CustomEvent("belle:book", { detail: service.id }));
    onClose();
    requestAnimationFrame(() => {
      document.getElementById("booking")?.scrollIntoView({ behavior: "smooth" });
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.45 }}
      className="fixed inset-0 z-[100] overflow-y-auto bg-ink/92 backdrop-blur-xl"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`${service.title} services`}
    >
      <button
        onClick={onClose}
        aria-label="Close"
        className="fixed right-5 top-5 z-[110] grid h-12 w-12 place-items-center rounded-full bg-gradient-to-br from-gold-light via-gold to-gold-deep text-ink shadow-[0_8px_30px_rgba(212,175,55,0.4)] transition-transform hover:rotate-90 hover:scale-105"
      >
        <X className="h-5 w-5" strokeWidth={2.25} />
      </button>

      <motion.div
        initial={{ opacity: 0, y: 60, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 40, scale: 0.98 }}
        transition={{ duration: 0.7, ease: EASE }}
        onClick={(e) => e.stopPropagation()}
        className="mx-auto my-10 w-[min(1060px,92vw)] border border-gold/25 bg-coal shadow-[0_40px_120px_rgba(0,0,0,0.8)]"
      >
        {/* Head */}
        <div className="relative overflow-hidden px-7 pb-10 pt-14 text-center sm:px-12">
          <div className="pointer-events-none absolute -top-32 left-1/2 h-64 w-[500px] -translate-x-1/2 rounded-full bg-gold/15 blur-[110px]" />
          <p className="flex items-center justify-center gap-3 text-[10px] font-semibold uppercase tracking-[0.5em] text-gold">
            <Gem className="h-3.5 w-3.5" strokeWidth={1.5} />
            {service.index} — The {service.title} Menu
            <Gem className="h-3.5 w-3.5" strokeWidth={1.5} />
          </p>
          <h2 className="mt-5 font-serif text-5xl font-light uppercase tracking-[0.12em] sm:text-6xl">
            <span className="text-gold-gradient">{service.title}</span>
          </h2>
          <p className="mt-4 font-serif text-lg italic text-sand">{service.tagline}</p>
          <p className="mx-auto mt-5 max-w-2xl text-sm leading-relaxed text-ivory/70">
            {service.description}
          </p>
        </div>

        <div className="grid gap-10 px-7 pb-12 sm:px-12 lg:grid-cols-[1.05fr_1fr]">
          {/* Menu */}
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-gold">
              Services &amp; Investment
            </p>
            <ul className="mt-5 divide-y divide-gold/10 border-y border-gold/10">
              {service.items.map((item, i) => (
                <motion.li
                  key={item.name}
                  initial={{ opacity: 0, x: -18 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.05 }}
                  className="group flex items-baseline justify-between gap-4 py-3.5"
                >
                  <span className="flex items-baseline gap-3 text-sm text-ivory/85 transition-colors group-hover:text-gold-light sm:text-[15px]">
                    <Sparkles className="h-3 w-3 shrink-0 translate-y-[1px] text-gold/70" strokeWidth={1.5} />
                    {item.name}
                  </span>
                  <span className="mx-1 hidden flex-1 border-b border-dotted border-gold/25 sm:block" />
                  <span className="shrink-0 font-serif text-sm italic tracking-wide text-gold-light">
                    {item.price}
                  </span>
                </motion.li>
              ))}
            </ul>

            <p className="mt-5 border-l-2 border-gold/60 bg-gold/5 px-4 py-3 text-xs leading-relaxed text-sand">
              {service.note}
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href={whatsappLink(
                  `Hello Kim! I would like to book a ${service.title.toLowerCase()} appointment at Belle Luxe.`,
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-sheen flex flex-1 items-center justify-center gap-2.5 rounded-full bg-gradient-to-r from-gold-deep via-gold to-gold-light px-6 py-3.5 text-[10px] font-bold uppercase tracking-[0.28em] text-ink transition-transform duration-300 hover:scale-[1.03]"
              >
                <MessageCircle className="h-4 w-4" strokeWidth={2} />
                Reserve on WhatsApp
              </a>
              <button
                onClick={bookInSalon}
                className="flex flex-1 items-center justify-center gap-2.5 rounded-full border border-gold/45 px-6 py-3.5 text-[10px] font-bold uppercase tracking-[0.28em] text-gold-light transition-colors duration-300 hover:bg-gold/10"
              >
                <CalendarCheck className="h-4 w-4" strokeWidth={1.75} />
                Book Online
              </button>
            </div>
          </div>

          {/* Gallery */}
          <div className="grid grid-cols-2 gap-3 self-start">
            {service.gallery.map((img, i) => (
              <motion.div
                key={img.src}
                initial={{ opacity: 0, scale: 0.94 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.07, ease: EASE }}
                className={`group/img relative overflow-hidden border border-gold/15 ${
                  i === 0 ? "col-span-2 aspect-[16/10]" : "aspect-square"
                }`}
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  sizes="(max-width: 1024px) 45vw, 300px"
                  className="object-cover transition-transform duration-700 ease-out group-hover/img:scale-110"
                />
                <div className="absolute inset-0 border-2 border-transparent transition-colors duration-500 group-hover/img:border-gold/60" />
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export function Services() {
  const [active, setActive] = useState<Service | null>(null);

  const onKey = useCallback((e: KeyboardEvent) => {
    if (e.key === "Escape") setActive(null);
  }, []);

  useEffect(() => {
    if (active) {
      window.addEventListener("keydown", onKey);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [active, onKey]);

  return (
    <section id="services" className="relative py-28 sm:py-36">
      <div className="pointer-events-none absolute left-1/2 top-24 h-[420px] w-[720px] -translate-x-1/2 rounded-full bg-gold/6 blur-[140px]" />

      <SectionHeading
        eyebrow="Our Services"
        title="Crown Your"
        italic="Beauty"
        sub="Four ateliers of artistry — choose your ritual"
      />

      <div className="mx-auto mt-16 grid max-w-7xl gap-5 px-6 sm:grid-cols-2 lg:grid-cols-4">
        {SERVICES.map((service, i) => (
          <ServiceCard
            key={service.id}
            service={service}
            i={i}
            onOpen={() => setActive(service)}
          />
        ))}
      </div>

      <Reveal delay={0.1} className="mt-12 text-center">
        <p className="px-6 font-serif text-base italic text-sand">
          Every ritual begins with a consultation —{" "}
          <span className="text-gold-light">Karibu, queen</span>
        </p>
      </Reveal>

      <AnimatePresence>
        {active && <ServiceModal service={active} onClose={() => setActive(null)} />}
      </AnimatePresence>
    </section>
  );
}
