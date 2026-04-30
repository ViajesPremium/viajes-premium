import type { Metadata } from "next";
import SiteShell from "@/app/SiteShell";
import "./globals.css";

const baseUrl =
  process.env.NEXT_PUBLIC_BASE_URL || "https://www.viajespremium.com";

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: "Viajes Premium",
  description: "Disenamos experiencias para quienes valoran atencion personal.",
  alternates: {
    canonical: "/",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es-mx" className="antialiased">
      <head>
        <link
          rel="preload"
          href="/fonts/nohemi-font-family/Nohemi-VF-BF6438cc58ad63d.ttf"
          as="font"
          type="font/ttf"
          crossOrigin="anonymous"
        />
      </head>
      <body className="flex min-h-screen flex-col">
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}
