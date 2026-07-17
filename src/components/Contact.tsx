"use client";

import { Camera, Clock4, MapPin, MessageCircle, Phone } from "lucide-react";
import { WHATSAPP_DISPLAY, whatsappLink } from "@/lib/services";
import { LogoMark } from "./Header";
import { Reveal, SectionHeading } from "./Reveal";

const CARDS = [
  {
    icon: MessageCircle,
    title: "WhatsApp",
    value: WHATSAPP_DISPLAY,
    sub: "Fastest replies — book in minutes",
    href: whatsappLink("Hello Belle Luxe!"),
  },
  {
    icon: Phone,
    title: "Call the Salon",
    value: WHATSAPP_DISPLAY,
    sub: "Mon–Sat, 9:00 — 19:00",
    href: `tel:+${"255796619669"}`,
  },
  {
    icon: Camera,
    title: "Instagram",
    value: "@belleluxebykim",
    sub: "Daily glam, fresh sets & transformations",
    href: "https://instagram.com/belleluxebykim",
  },
  {
    icon: MapPin,
    title: "Visit Us",
    value: "Dar es Salaam, Tanzania",
    sub: "Exact pin shared on booking",
    href: whatsappLink("Hello! Please share the salon location pin."),
  },
];

export function Contact() {
  return (
    <section id="contact" className="relative overflow-hidden py-28 sm:py-36">
      <div className="pointer-events-none absolute left-1/2 top-10 h-[380px] w-[680px] -translate-x-1/2 rounded-full bg-gold/6 blur-[140px]" />

      <SectionHeading
        eyebrow="Get In Touch"
        title="Your Chair Is"
        italic="Waiting"
        sub="One message away from your most glamorous self"
      />

      <div className="mx-auto mt-16 grid max-w-6xl gap-5 px-6 sm:grid-cols-2 lg:grid-cols-4">
        {CARDS.map((card, i) => (
          <Reveal key={card.title} delay={i * 0.1}>
            <a
              href={card.href}
              target={card.href.startsWith("http") ? "_blank" : undefined}
              rel="noopener noreferrer"
              className="group flex h-full flex-col items-center border border-gold/15 bg-coal/60 px-6 py-10 text-center transition-all duration-500 hover:-translate-y-2 hover:border-gold/50 hover:shadow-[0_20px_60px_rgba(212,175,55,0.12)]"
            >
              <span className="grid h-14 w-14 place-items-center rounded-full border border-gold/40 text-gold transition-all duration-500 group-hover:rotate-6 group-hover:bg-gold group-hover:text-ink">
                <card.icon className="h-5 w-5" strokeWidth={1.5} />
              </span>
              <h3 className="mt-6 text-[10px] font-bold uppercase tracking-[0.4em] text-sand">
                {card.title}
              </h3>
              <p className="mt-3 font-serif text-lg text-ivory transition-colors group-hover:text-gold-light">
                {card.value}
              </p>
              <p className="mt-2 text-xs leading-relaxed text-sand">{card.sub}</p>
            </a>
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.2} className="mt-10 flex justify-center px-6">
        <div className="flex flex-wrap items-center justify-center gap-3 border border-gold/20 bg-gold/5 px-6 py-4 text-xs text-sand">
          <Clock4 className="h-4 w-4 text-gold" strokeWidth={1.5} />
          <span className="tracking-[0.2em] uppercase">Mon – Sat · 9:00 – 19:00</span>
          <span className="hidden h-3 w-px bg-gold/30 sm:block" />
          <span className="font-serif italic text-gold-light">Sundays by royal appointment</span>
        </div>
      </Reveal>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-gold/25 bg-black pb-10 pt-20">
      <div className="pointer-events-none absolute left-1/2 top-0 h-px w-full bg-gradient-to-r from-transparent via-gold/60 to-transparent" />

      <div className="mx-auto flex max-w-7xl flex-col items-center px-6">
        <Reveal>
          <a href="#top" className="flex flex-col items-center gap-4">
            <LogoMark size={64} />
            <p className="text-center font-serif text-[11px] uppercase tracking-[0.5em] text-sand">
              Luxury Beauty Salon
            </p>
          </a>
        </Reveal>

        <Reveal delay={0.1}>
          <p className="text-gold-gradient mt-12 select-none text-center font-serif text-[13.5vw] font-light uppercase leading-none tracking-[0.06em] sm:text-[10vw] lg:text-[7.5rem]">
            Belle Luxe
          </p>
        </Reveal>
        <Reveal delay={0.18}>
          <p className="-mt-2 text-center font-serif text-2xl italic text-sand sm:-mt-4">by Kim</p>
        </Reveal>

        <Reveal delay={0.24}>
          <nav className="mt-12 flex flex-wrap items-center justify-center gap-x-10 gap-y-3">
            {[
              { label: "Services", href: "#services" },
              { label: "The Salon", href: "#salon" },
              { label: "Kim", href: "#kim" },
              { label: "Book Now", href: "#booking" },
              { label: "Contact", href: "#contact" },
            ].map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-[10px] font-semibold uppercase tracking-[0.35em] text-sand transition-colors hover:text-gold"
              >
                {item.label}
              </a>
            ))}
          </nav>
        </Reveal>

        <div className="gold-hairline mt-14 w-full max-w-3xl" />

        <div className="mt-8 flex flex-col items-center gap-2 text-center">
          <p className="text-xs text-sand">
            © {new Date().getFullYear()} Belle Luxe by Kim. All rights reserved.
          </p>
          <p className="font-serif text-xs italic text-sand/70">
            Crafted with gold, for the queens of Tanzania
          </p>
          <a
            href="/admin"
            className="mt-2 text-[10px] uppercase tracking-[0.3em] text-sand/50 transition-colors hover:text-gold"
          >
            Salon Admin
          </a>
          <a
            href="/download-app"
            className="mt-2 text-[10px] uppercase tracking-[0.3em] text-sand/50 transition-colors hover:text-gold"
          >
            Download App
          </a>
        </div>
      </div>
    </footer>
  );
}
