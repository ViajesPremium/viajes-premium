import type { ReactNode } from "react";
import PremiumLandingLayout from "@/landings/premium/PremiumLandingLayout";
import { peruPremiumLandingConfig } from "@/landings/premium/configs/peru-premium";

export default function PeruPremiumLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <PremiumLandingLayout config={peruPremiumLandingConfig}>
      {children}
    </PremiumLandingLayout>
  );
}
