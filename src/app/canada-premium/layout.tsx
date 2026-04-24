import type { ReactNode } from "react";
import PremiumLandingLayout from "@/landings/premium/PremiumLandingLayout";
import { canadaPremiumLandingConfig } from "@/landings/premium/configs/canada-premium";

export default function CanadaPremiumLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <PremiumLandingLayout config={canadaPremiumLandingConfig}>
      {children}
    </PremiumLandingLayout>
  );
}
