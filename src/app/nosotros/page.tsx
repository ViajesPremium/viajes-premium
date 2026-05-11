import type { Metadata } from "next";
import NosotrosTimeline from "./nosotros";

export const metadata: Metadata = {
  title: "Nosotros | Viajes Premium",
  description:
    "Conoce la historia de Viajes Premium: una trayectoria de evolucion, servicio y vision internacional.",
  alternates: {
    canonical: "/nosotros",
  },
};

export default function NosotrosPage() {
  return (
    <>
      <NosotrosTimeline />
    </>
  );
}
