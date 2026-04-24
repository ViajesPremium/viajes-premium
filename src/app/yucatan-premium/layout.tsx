import type { ReactNode } from "react";
import PremiumLandingLayout from "@/landings/premium/PremiumLandingLayout";
import { yucatanPremiumLandingConfig } from "@/landings/premium/configs/yucatan-premium";

export default function YucatanPremiumLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <PremiumLandingLayout config={yucatanPremiumLandingConfig}>
      {children}
    </PremiumLandingLayout>
  );
}
