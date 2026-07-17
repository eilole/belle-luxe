import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Marquee } from "@/components/Marquee";
import { Services } from "@/components/Services";
import { KimSection, QuoteStrip, SalonSection } from "@/components/About";
import { Booking } from "@/components/Booking";
import { Contact, Footer } from "@/components/Contact";
import { FloatingBook } from "@/components/FloatingBook";
import { WHATSAPP_DISPLAY } from "@/lib/services";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "BeautySalon",
  name: "Belle Luxe by Kim",
  description:
    "Luxury beauty salon offering premium human hair styling, makeup artistry, lash extensions and luxury nail design.",
  telephone: WHATSAPP_DISPLAY,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Dar es Salaam",
    addressCountry: "TZ",
  },
  openingHours: "Mo-Sa 09:00-19:00",
  priceRange: "TZS 10,000 - TZS 150,000",
};

export default function Home() {
  return (
    <main className="relative">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header />
      <Hero />
      <Marquee />
      <Services />
      <SalonSection />
      <Marquee inverted />
      <KimSection />
      <QuoteStrip />
      <Booking />
      <Contact />
      <Footer />
      <FloatingBook />
    </main>
  );
}
