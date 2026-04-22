import type { Metadata } from "next";
import CursorEffect from "@/components/ui/cursor/cursorEffect";
import Navbar from "@/layout/navbar/navbar";
import SmoothScrollProvider from "@/components/smooth-scroll/SmoothScrollProvider";
import "./globals.css";

const baseUrl =
  process.env.NEXT_PUBLIC_BASE_URL || "https://www.viajespremium.com";

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: "Viajes Premium",
  description: "Diseñamos experiencias para quienes valoran atención personal.",
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
    <html lang="es-mx" className="h-full antialiased">
      <body className="min-h-full flex flex-col">
        <SmoothScrollProvider>
          <CursorEffect>
            <Navbar
              logoUrl="/logos/jp-negro.svg"
              colors={["var(--primary-japon)", "var(--secondary-japon)"]}
              accentColor="var(--primary-japon)"
              menuButtonColor="#ffffff"
              openMenuButtonColor="#16181b"
            />
            {children}
          </CursorEffect>
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
