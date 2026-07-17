"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
};

export function Reveal({ children, delay = 0, y = 36, className }: RevealProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y, filter: "blur(8px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-70px" }}
      transition={{ duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  italic,
  sub,
}: {
  eyebrow: string;
  title: string;
  italic: string;
  sub?: string;
}) {
  return (
    <div className="mx-auto max-w-3xl px-6 text-center">
      <Reveal>
        <p className="text-[11px] font-semibold uppercase tracking-[0.45em] text-gold">
          {eyebrow}
        </p>
      </Reveal>
      <Reveal delay={0.08}>
        <h2 className="mt-5 font-serif text-4xl font-light leading-[1.1] text-ivory sm:text-5xl md:text-6xl">
          {title}{" "}
          <span className="text-gold-gradient italic">{italic}</span>
        </h2>
      </Reveal>
      <Reveal delay={0.16}>
        <div className="gold-hairline mx-auto mt-7 w-24" />
      </Reveal>
      {sub ? (
        <Reveal delay={0.22}>
          <p className="mt-6 font-serif text-lg italic text-sand">{sub}</p>
        </Reveal>
      ) : null}
    </div>
  );
}
