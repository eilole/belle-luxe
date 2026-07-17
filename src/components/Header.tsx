"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Menu, Sparkles, X } from "lucide-react";
import { useEffect, useState } from "react";

const NAV = [
  { label: "Services", href: "#services" },
  { label: "The Salon", href: "#salon" },
  { label: "Kim", href: "#kim" },
  { label: "Contact", href: "#contact" },
];

export function LogoMark({ size = 52 }: { size?: number }) {
  return (
    <div
      className="relative grid shrink-0 place-items-center rounded-full border border-gold/60"
      style={{ width: size, height: size }}
    >
      <div className="absolute inset-[3px] rounded-full border border-gold/25" />
      <span
        className="font-serif italic leading-none text-gold-gradient"
        style={{ fontSize: size * 0.38 }}
      >
        BL
      </span>
    </div>
  );
}

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed inset-x-0 top-0 z-[60] transition-all duration-500 ${
          scrolled
            ? "border-b border-gold/20 bg-ink/85 py-3 shadow-[0_8px_40px_rgba(0,0,0,0.6)] backdrop-blur-xl"
            : "border-b border-transparent bg-transparent py-5"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6">
          <a href="#top" className="group flex items-center gap-3">
            <LogoMark size={scrolled ? 44 : 52} />
            <div className="leading-none">
              <p className="font-serif text-lg tracking-[0.28em] text-ivory transition-colors group-hover:text-gold-light">
                BELLE&nbsp;LUXE
              </p>
              <p className="mt-1.5 flex items-center gap-1 text-[9px] uppercase tracking-[0.42em] text-gold">
                <Sparkles className="h-2.5 w-2.5" strokeWidth={1.5} />
                by Kim
              </p>
            </div>
          </a>

          <nav className="hidden items-center gap-9 lg:flex">
            {NAV.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="group relative text-[11px] font-semibold uppercase tracking-[0.32em] text-ivory/70 transition-colors hover:text-gold-light"
              >
                {item.label}
                <span className="absolute -bottom-1.5 left-1/2 h-px w-0 -translate-x-1/2 bg-gold transition-all duration-400 group-hover:w-full" />
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <a
              href="#booking"
              className="btn-sheen hidden rounded-full bg-gradient-to-r from-gold-deep via-gold to-gold-light px-6 py-2.5 text-[11px] font-bold uppercase tracking-[0.28em] text-ink transition-transform duration-300 hover:scale-[1.04] sm:block"
            >
              Book Now
            </a>
            <button
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              className="grid h-11 w-11 place-items-center rounded-full border border-gold/40 text-gold transition-colors hover:bg-gold/10 lg:hidden"
            >
              <Menu className="h-5 w-5" strokeWidth={1.5} />
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-[90] flex flex-col bg-ink/97 backdrop-blur-2xl"
          >
            <div className="flex items-center justify-between px-6 py-5">
              <div className="flex items-center gap-3">
                <LogoMark size={44} />
                <p className="font-serif tracking-[0.28em] text-ivory">BELLE&nbsp;LUXE</p>
              </div>
              <button
                onClick={() => setOpen(false)}
                aria-label="Close menu"
                className="grid h-11 w-11 place-items-center rounded-full border border-gold/40 text-gold transition-colors hover:bg-gold/10"
              >
                <X className="h-5 w-5" strokeWidth={1.5} />
              </button>
            </div>

            <nav className="flex flex-1 flex-col items-center justify-center gap-2">
              {[{ label: "Home", href: "#top" }, ...NAV, { label: "Book Now", href: "#booking" }].map(
                (item, i) => (
                  <motion.a
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    initial={{ opacity: 0, y: 28 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.12 + i * 0.07, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    className={`py-3 font-serif text-4xl font-light transition-colors hover:text-gold-light ${
                      item.href === "#booking" ? "italic text-gold-gradient" : "text-ivory"
                    }`}
                  >
                    {item.label}
                  </motion.a>
                ),
              )}
            </nav>

            <p className="pb-10 text-center text-[10px] uppercase tracking-[0.4em] text-sand">
              Luxury Beauty Salon — Tanzania
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
