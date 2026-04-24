import type { ReactNode } from "react";
import PremiumLandingLayout from "@/landings/premium/PremiumLandingLayout";
import { barrancasPremiumLandingConfig } from "@/landings/premium/configs/barrancas-premium";

export default function BarrancasPremiumLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <PremiumLandingLayout config={barrancasPremiumLandingConfig}>
      {children}
    </PremiumLandingLayout>
  );
}
