import type { ReactNode } from "react";
import PremiumLandingLayout from "@/landings/premium/PremiumLandingLayout";
import { europaPremiumLandingConfig } from "@/landings/premium/configs/europa-premium";

export default function EuropaPremiumLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <PremiumLandingLayout config={europaPremiumLandingConfig}>
      {children}
    </PremiumLandingLayout>
  );
}
