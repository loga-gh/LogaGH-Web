import type { Metadata, Viewport } from "next";
import { Outfit, Playfair_Display, Great_Vibes } from "next/font/google";
import "./globals.css";

// ─── Fonts ────────────────────────────────────────────────
const outfit = Outfit({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-outfit",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  style: ["normal", "italic"],
  variable: "--font-playfair",
  display: "swap",
});

const greatVibes = Great_Vibes({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-great-vibes",
  display: "swap",
});

// ─── Metadata ────────────────────────────────────────────
export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://logaguesthouse.lk"
  ),
  title: {
    default: "Loga Guest House — Heritage Luxury in the Heart of Jaffna",
    template: "%s | Loga Guest House",
  },
  description:
    "Experience authentic Tamil heritage hospitality at Loga Guest House, Jaffna. Boutique luxury rooms blending Dutch-colonial architecture with warm Sri Lankan tradition. Book direct for the best rates.",
  keywords: [
    "Loga Guest House",
    "Jaffna guesthouse",
    "Sri Lanka hotel",
    "boutique hotel Jaffna",
    "heritage hotel Sri Lanka",
    "Tamil Nadu cultural stay",
    "Jaffna accommodation",
    "luxury guesthouse Sri Lanka",
  ],
  authors: [{ name: "Loga Guest House" }],
  creator: "Loga Guest House",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: "Loga Guest House",
    title: "Loga Guest House — Heritage Luxury in the Heart of Jaffna",
    description:
      "Boutique luxury rooms in a restored heritage property in Jaffna, Sri Lanka. Book your authentic Tamil stay.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Loga Guest House — Jaffna, Sri Lanka",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Loga Guest House — Jaffna, Sri Lanka",
    description:
      "Boutique heritage luxury in the heart of Jaffna. Authentic Tamil hospitality, immaculate rooms, unforgettable stays.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  manifest: "/site.webmanifest",
};

export const viewport: Viewport = {
  themeColor: "#C89B3C",
  width: "device-width",
  initialScale: 1,
};

// ─── Layout ────────────────────────────────────────────────
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${outfit.variable} ${playfair.variable} ${greatVibes.variable}`}
    >
      <head>
        {/* JSON-LD — Hotel Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LodgingBusiness",
              name: "Loga Guest House",
              description:
                "Heritage boutique guest house offering luxury rooms in Jaffna, Sri Lanka.",
              url: process.env.NEXT_PUBLIC_SITE_URL,
              telephone: "+94-77-XXX-XXXX",
              address: {
                "@type": "PostalAddress",
                streetAddress: "Your Street Address",
                addressLocality: "Jaffna",
                addressRegion: "Northern Province",
                postalCode: "40000",
                addressCountry: "LK",
              },
              geo: {
                "@type": "GeoCoordinates",
                latitude: 9.6615,
                longitude: 80.0255,
              },
              starRating: {
                "@type": "Rating",
                ratingValue: "4",
              },
              priceRange: "Rs. 12,000 – Rs. 35,000",
              image: `${process.env.NEXT_PUBLIC_SITE_URL}/og-image.jpg`,
              sameAs: [
                "https://www.facebook.com/LogaGuestHouse",
                "https://www.instagram.com/LogaGuestHouse",
              ],
            }),
          }}
        />
      </head>
      <body
        style={{
          fontFamily: "var(--font-outfit), 'Noto Sans Tamil', system-ui, sans-serif",
        }}
      >
        {children}
      </body>
    </html>
  );
}
