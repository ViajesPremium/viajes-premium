import type { ReactNode } from "react";
import PremiumLandingLayout from "@/landings/premium/PremiumLandingLayout";
import { coreaPremiumLandingConfig } from "@/landings/premium/configs/corea-premium";

export default function CoreaPremiumLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <PremiumLandingLayout config={coreaPremiumLandingConfig}>
      {children}
    </PremiumLandingLayout>
  );
}
