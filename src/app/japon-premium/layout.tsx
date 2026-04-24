import type { ReactNode } from "react";
import CursorEffect from "@/components/ui/cursor/cursorEffect";
import Navbar from "@/layout/navbar/navbar";
import SmoothScrollProvider from "@/components/smooth-scroll/SmoothScrollProvider";

export default function JaponPremiumLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
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
  );
}
