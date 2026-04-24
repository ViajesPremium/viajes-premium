import type { ReactNode } from "react";
import PremiumLandingLayout from "@/landings/premium/PremiumLandingLayout";
import { chiapasPremiumLandingConfig } from "@/landings/premium/configs/chiapas-premium";

export default function ChiapasPremiumLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <PremiumLandingLayout config={chiapasPremiumLandingConfig}>
      {children}
    </PremiumLandingLayout>
  );
}
