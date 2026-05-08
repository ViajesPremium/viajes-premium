"use client";

import Testimonials from "@/layout/testimonials/testimonials";
import { PremiumLandingProvider } from "@/landings/premium/context";
import { japonPremiumLandingConfig } from "@/landings/premium/configs/japon-premium";

export default function HomeTestimonials() {
  return (
    <PremiumLandingProvider config={japonPremiumLandingConfig}>
      <Testimonials disableSakura />
    </PremiumLandingProvider>
  );
}
