"use client";

import type { ReactNode } from "react";
import dynamic from "next/dynamic";

const CursorEffect = dynamic(() => import("@/components/ui/cursor/cursorEffect"), {
  ssr: false,
});

const Navbar = dynamic(() => import("@/layout/navbar/navbar"), {
  ssr: false,
});

const SmoothScrollBoot = dynamic(
  () => import("@/components/smooth-scroll/SmoothScrollProvider"),
  { ssr: false },
);

const JAPAN_MENU_ITEMS = [
  { label: "Inicio", ariaLabel: "Ir al inicio", link: "#inicio" },
  { label: "Highlights", ariaLabel: "Ir a highlights", link: "#highlights" },
  { label: "Itinerarios", ariaLabel: "Ir a itinerarios", link: "#itinerarios" },
  { label: "Incluye", ariaLabel: "Ir a lo que incluye", link: "#includes" },
  { label: "Testimonios", ariaLabel: "Ir a testimonios", link: "#testimonials" },
  { label: "FAQs", ariaLabel: "Ir a preguntas frecuentes", link: "#faqs" },
  { label: "Contacto", ariaLabel: "Ir al formulario", link: "#form" },
] as const;

export default function JaponPremiumFrame({ children }: { children: ReactNode }) {
  return (
    <>
      <SmoothScrollBoot />
      <CursorEffect>
        <Navbar
          items={[...JAPAN_MENU_ITEMS]}
          logoUrl="/logos/jp-negro.svg"
          colors={["var(--primary-japon)", "var(--secondary-japon)"]}
          accentColor="var(--primary-japon)"
          menuButtonColor="#ffffff"
          openMenuButtonColor="#16181b"
        />
        {children}
      </CursorEffect>
    </>
  );
}
