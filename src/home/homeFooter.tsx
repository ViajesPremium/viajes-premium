"use client";

import Footer from "@/layout/footer/footer";
import { PremiumLandingProvider } from "@/landings/premium/context";
import { japonPremiumLandingConfig } from "@/landings/premium/configs/japon-premium";

export default function HomeFooter() {
  return (
    <PremiumLandingProvider config={japonPremiumLandingConfig}>
      <Footer />
    </PremiumLandingProvider>
  );
}
