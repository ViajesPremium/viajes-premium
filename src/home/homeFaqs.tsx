"use client";

import Faqs from "@/layout/faqs/faqs";
import { PremiumLandingProvider } from "@/landings/premium/context";
import { japonPremiumLandingConfig } from "@/landings/premium/configs/japon-premium";

export default function HomeFaqs() {
  return (
    <PremiumLandingProvider config={japonPremiumLandingConfig}>
      <Faqs hideCharacters />
    </PremiumLandingProvider>
  );
}
