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

export default function JaponPremiumFrame({ children }: { children: ReactNode }) {
  return (
    <>
      <SmoothScrollBoot />
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
    </>
  );
}
