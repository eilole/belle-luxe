export const WHATSAPP_NUMBER = "255796619669";
export const WHATSAPP_DISPLAY = "+255 796 619 669";

export function whatsappLink(message: string): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export type ServiceItem = {
  name: string;
  price: string;
};

export type Service = {
  id: string;
  index: string;
  title: string;
  tagline: string;
  description: string;
  image: string;
  note: string;
  items: ServiceItem[];
  gallery: { src: string; alt: string }[];
};

const px = (id: string) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=800`;

export const SERVICES: Service[] = [
  {
    id: "hair",
    index: "01",
    title: "Hair/Nywele",
    tagline: "Premium Human Hair Styling",
    description:
      "From precision wig installs to silk-smooth presses — every strand is treated like royalty. We work exclusively with 100% premium human hair for a finish that moves, parts and shines like your own.",
    image: "/images/hair.jpg",
    note: "100% virgin human hair collection in stock — bone straight, body wave, deep wave & curly. Ask about current pieces when booking.",
    items: [
      { name: "Human Hair Wig Installation", price: "TZS 50,000" },
      { name: "Frontal & Closure Installation", price: "TZS 70,000" },
      { name: "Bone Straight & Body Wave Styling", price: "TZS 35,000" },
      { name: "Deep Wave & Curly Wig Styling", price: "TZS 35,000" },
      { name: "Braids, Cornrows & Protective Styles", price: "TZS 30,000" },
      { name: "Hair Coloring & Treatments", price: "TZS 40,000" },
      { name: "Silk Press & Blowouts", price: "TZS 40,000" },
    ],
    gallery: [
      { src: "/images/hair.jpg", alt: "Bone straight human hair styling" },
      { src: px("3993449"), alt: "Salon hair styling session" },
      { src: px("1181519"), alt: "Elegant styled hair portrait" },
      { src: px("2065200"), alt: "Glamorous waves and styling" },
      { src: px("1385472"), alt: "Luxury salon hair finish" },
    ],
  },
  {
    id: "makeup",
    index: "02",
    title: "Makeup",
    tagline: "Flawless Queen Looks",
    description:
      "Skin-first artistry that lasts from the first photo to the last dance. Flawless, luminous glam sculpted to your features, your tone and your moment — never masky, always you.",
    image: "/images/makeup.jpg",
    note: "Bridal packages include a full trial session. Group glam of 3+ queens receives a royal discount.",
    items: [
      { name: "Soft Glam", price: "TZS 50,000" },
      { name: "Full Glam", price: "TZS 80,000" },
      { name: "Bridal Glam + Trial", price: "TZS 150,000" },
      { name: "Photoshoot / Editorial Glam", price: "TZS 100,000" },
      { name: "Brow Sculpt & Tint", price: "TZS 15,000" },
      { name: "Group Bookings (3+ guests)", price: "TZS 45,000 pp" },
    ],
    gallery: [
      { src: "/images/makeup.jpg", alt: "Gold glam makeup close-up" },
      { src: px("38256845"), alt: "Shimmering editorial makeup portrait" },
      { src: px("37550186"), alt: "Elegant portrait with glam makeup" },
      { src: px("1858175"), alt: "Makeup application in progress" },
      { src: px("32160990"), alt: "Bold makeup beauty portrait" },
    ],
  },
  {
    id: "lashes",
    index: "03",
    title: "Lashes/Kope",
    tagline: "Captivating Eye Enhancements",
    description:
      "Weightless, custom-mapped lash sets that frame your gaze — from a natural wisp to full mega-volume drama. Every set is designed around your eye shape for comfort that lasts.",
    image: "/images/lashes.jpg",
    note: "All sets include a lash bath, under-eye treatment and aftercare kit. Refills recommended every 2–3 weeks.",
    items: [
      { name: "Classic Set (1:1)", price: "TZS 35,000" },
      { name: "Hybrid Set", price: "TZS 45,000" },
      { name: "Volume Set (3D–5D)", price: "TZS 60,000" },
      { name: "Mega Volume", price: "TZS 75,000" },
      { name: "Lash Lift & Tint", price: "TZS 30,000" },
      { name: "Refill (2–3 weeks)", price: "TZS 25,000" },
    ],
    gallery: [
      { src: "/images/lashes.jpg", alt: "Dramatic lash extensions macro" },
      { src: px("8554941"), alt: "Lash extension application" },
      { src: px("36930354"), alt: "Precision lash work in salon" },
      { src: px("2681751"), alt: "Finished lash set close-up" },
      { src: px("6135662"), alt: "Beauty spa lash treatment" },
    ],
  },
  {
    id: "nails/Kucha",
    index: "04",
    title: "Nails",
    tagline: "Luxury Nail Artistry",
    description:
      "Sculpted sets and gallery-worthy art sealed in glass shine. Your hands are the introduction — we make it unforgettable, from soft nude elegance to gold-leaf statement sets.",
    image: "/images/nails.jpg",
    note: "Every set starts with a full cuticle ritual and finishes with our signature gold hand oil treatment.",
    items: [
      { name: "Acrylic Full Set", price: "TZS 40,000" },
      { name: "Gel Manicure", price: "TZS 25,000" },
      { name: "Luxury Spa Pedicure", price: "TZS 35,000" },
      { name: "Custom Nail Art & Chrome", price: "TZS 10,000+" },
      { name: "Bespoke Press-On Sets", price: "TZS 30,000" },
      { name: "Cuticle & Hand Treatment", price: "TZS 15,000" },
    ],
    gallery: [
      { src: "/images/nails.jpg", alt: "Nude and gold luxury nail set" },
      { src: px("10632142"), alt: "Gold glitter statement nails" },
      { src: px("34997575"), alt: "French manicure with gold jewelry" },
      { src: px("34871553"), alt: "Red and white nail art" },
      { src: px("704815"), alt: "Manicure in progress" },
    ],
  },
];

const SERVICE_LABELS: Record<string, string> = {
  bridal: "Bridal Package",
  consultation: "Consultation",
};

export function getServiceLabel(id: string): string {
  const svc = SERVICES.find((s) => s.id === id);
  if (svc) return svc.title;
  return SERVICE_LABELS[id] ?? id;
}

export const SERVICE_OPTIONS = [
  ...SERVICES.map((s) => ({ value: s.id, label: `${s.title} — ${s.tagline}` })),
  { value: "bridal", label: "Bridal Package" },
  { value: "consultation", label: "Not sure yet — advise me, Kim" },
];

export const TIME_SLOTS = [
  "09:00",
  "10:00",
  "11:00",
  "12:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
  "18:00",
];
