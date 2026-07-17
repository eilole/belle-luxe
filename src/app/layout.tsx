import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import "./globals.css";
import { PwaRegister } from "@/components/PwaRegister";
import { InstallPrompt } from "@/components/InstallPrompt";

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
    images: ["/images/hero.jpg"],
    type: "website",
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${cormorant.variable} ${manrope.variable}`}>
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#d4af37" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="Belle Luxe" />
        <link rel="apple-touch-icon" href="/icon-192.png" />
      </head>
      <body className="grain bg-ink font-sans text-ivory antialiased">
        {children}
        <PwaRegister />
        <InstallPrompt />
      </body>
    </html>
  );
}
