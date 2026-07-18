import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-manrope",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Belle Luxe by Kim — Luxury Beauty Salon",
  description:
    "Belle Luxe by Kim is a luxury beauty salon where every client is treated like royalty. Premium human hair styling, flawless makeup, captivating lashes and luxury nail artistry.",
  openGraph: {
    title: "Belle Luxe by Kim — Luxury Beauty Salon",
    description:
      "Where beauty meets royalty. Premium hair, makeup, lashes and nails — crafted for the modern queen.",
    images: ["/images/hero.png"],
    type: "website",
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${cormorant.variable} ${manrope.variable}`}>
      <body className="grain bg-ink font-sans text-ivory antialiased">
        {children}
      </body>
    </html>
  );
}
import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Belle Luxe by Kim | Salon ya Kucha na Urembo Dar es Salaam',
  description: 'Pata huduma bora za Gel, Acrylics, Lashes na Kucha kwa Belle Luxe by Kim. Tunapatikana Dar es Salaam. Weka uteuzi leo via Instagram @belleluxebykim',
  keywords: ['salon dar es salaam', 'belle luxe kim', 'gel nails tanzania', 'kucha dar', 'beauty salon'],
  openGraph: {
    title: 'Belle Luxe by Kim',
    description: 'Salon ya Kucha na Urembo Dar es Salaam',
    url: 'https://belleluxebykim.vercel.app',
    siteName: 'Belle Luxe by Kim',
    images: ['/og-image.jpg'],
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="sw">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BeautySalon",
              "name": "Belle Luxe by Kim",
              "url": "https://belleluxebykim.vercel.app",
              "telephone": "+255796619669",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Dar es Salaam",
                "addressCountry": "TZ"
              },
              "sameAs": ["https://instagram.com/belleluxe_by_kim"]
            })
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  )
  }
