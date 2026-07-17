import { Gem } from "lucide-react";

const WORDS = [
  "Human Hair",
  "Makeup Artistry",
  "Lash Extensions",
  "Nail Design",
  "Bridal Glam",
  "Wig Installs",
];

export function Marquee({ inverted = false }: { inverted?: boolean }) {
  const row = [...WORDS, ...WORDS];
  return (
    <div
      className={`relative overflow-hidden border-y py-5 ${
        inverted
          ? "border-gold/40 bg-gradient-to-r from-gold-deep/30 via-gold/20 to-gold-deep/30"
          : "border-gold/15 bg-coal"
      }`}
    >
      <div className="animate-marquee flex w-max items-center">
        {[0, 1].map((copy) => (
          <div key={copy} className="flex shrink-0 items-center" aria-hidden={copy === 1}>
            {row.map((word, i) => (
              <span key={`${copy}-${i}`} className="flex items-center">
                <span
                  className={`px-7 font-serif text-2xl font-light uppercase tracking-[0.25em] sm:text-3xl ${
                    i % 2 === 0 ? "text-gold-gradient" : "text-outline-gold"
                  }`}
                >
                  {word}
                </span>
                <Gem className="h-4 w-4 shrink-0 text-gold/60" strokeWidth={1.5} />
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
