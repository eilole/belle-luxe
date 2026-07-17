"use client";

import { motion } from "framer-motion";
import { MessageCircle, X } from "lucide-react";
import { useState } from "react";
import { whatsappLink } from "@/lib/services";

const QUICK = [
  { label: "Book an appointment", message: "Hello Belle Luxe! I would like to book an appointment." },
  { label: "Ask about the human hair collection", message: "Hello Kim! Which human hair wigs are currently in stock?" },
  { label: "Bridal package enquiry", message: "Hello Kim! I would love details on your bridal glam package." },
];

export function FloatingBook() {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-[80] flex flex-col items-end gap-3">
      {open && (
        <motion.div
          initial={{ opacity: 0, y: 16, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="w-[280px] overflow-hidden rounded-2xl border border-gold/30 bg-coal/95 shadow-[0_20px_60px_rgba(0,0,0,0.7)] backdrop-blur-xl"
        >
          <div className="border-b border-gold/20 bg-gradient-to-r from-gold-deep/40 to-transparent px-5 py-4">
            <p className="font-serif text-lg italic text-gold-light">Karibu, queen</p>
            <p className="text-xs text-sand">Kim replies within minutes</p>
          </div>
          <div className="flex flex-col p-2">
            {QUICK.map((q) => (
              <a
                key={q.label}
                href={whatsappLink(q.message)}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-xl px-4 py-3 text-left text-sm text-ivory/85 transition-colors hover:bg-gold/10 hover:text-gold-light"
                onClick={() => setOpen(false)}
              >
                {q.label}
              </a>
            ))}
          </div>
        </motion.div>
      )}

      <button
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Close chat" : "Chat on WhatsApp"}
        className="group relative grid h-16 w-16 place-items-center rounded-full bg-gradient-to-br from-gold-light via-gold to-gold-deep text-ink shadow-[0_10px_35px_rgba(212,175,55,0.45)] transition-transform duration-300 hover:scale-105"
      >
        <span className="animate-pulse-ring absolute inset-0 rounded-full border-2 border-gold" />
        {open ? (
          <X className="h-6 w-6" strokeWidth={2} />
        ) : (
          <MessageCircle className="h-6 w-6 transition-transform duration-300 group-hover:-rotate-12" strokeWidth={2} />
        )}
      </button>
    </div>
  );
}
