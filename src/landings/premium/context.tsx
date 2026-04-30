"use client";

import { createContext, useContext, type ReactNode } from "react";
import { japonPremiumLandingConfig } from "@/landings/premium/configs/japon-premium";
import type { PremiumLandingConfig } from "@/landings/premium/types";

const PremiumLandingContext = createContext<PremiumLandingConfig>(
  japonPremiumLandingConfig,
);

type PremiumLandingProviderProps = {
  config: PremiumLandingConfig;
  children: ReactNode;
};

export function PremiumLandingProvider({
  config,
  children,
}: PremiumLandingProviderProps) {
  return (
    <PremiumLandingContext.Provider value={config}>
      {children}
    </PremiumLandingContext.Provider>
  );
}

export function usePremiumLandingConfig() {
  return useContext(PremiumLandingContext);
}
