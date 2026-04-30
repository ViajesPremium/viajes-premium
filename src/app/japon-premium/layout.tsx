import type { ReactNode } from "react";
import PremiumLandingLayout from "@/landings/premium/PremiumLandingLayout";
import { japonPremiumLandingConfig } from "@/landings/premium/configs/japon-premium";

export default function JaponPremiumLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <PremiumLandingLayout config={japonPremiumLandingConfig}>
      {children}
    </PremiumLandingLayout>
  );
}
