import { Metadata } from "next";
import JaponPremiumClient from "./JaponPremiumClient";

export const metadata: Metadata = {
  title: "Japón Premium",
  description: "Japon Premium",
  keywords: ["Japon Premium", "Viajes Premium"],

  alternates: {
    canonical: "/japon-premium",
  },

  openGraph: {
    title: "Japón Premium",
    description: "Japon Premium",
    url: "/japon-premium",
    siteName: "Viajes Premium",
    images: [
      {
        url: "/japon-premium/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Japón Premium",
      },
    ],
    locale: "es_MX",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Japón Premium",
    description: "Japon Premium",
    images: ["/japon-premium/og-image.jpg"],
  },

  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
};

export default function JaponPremium() {
  return <JaponPremiumClient />;
}
