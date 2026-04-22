import type { Metadata } from "next";

// Traemos tu variable de entorno con su fallback
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
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
