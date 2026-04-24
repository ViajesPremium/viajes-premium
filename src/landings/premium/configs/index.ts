import { barrancasPremiumLandingConfig } from "@/landings/premium/configs/barrancas-premium";
import { canadaPremiumLandingConfig } from "@/landings/premium/configs/canada-premium";
import { chiapasPremiumLandingConfig } from "@/landings/premium/configs/chiapas-premium";
import { coreaPremiumLandingConfig } from "@/landings/premium/configs/corea-premium";
import { europaPremiumLandingConfig } from "@/landings/premium/configs/europa-premium";
import { japonPremiumLandingConfig } from "@/landings/premium/configs/japon-premium";
import { peruPremiumLandingConfig } from "@/landings/premium/configs/peru-premium";
import type { PremiumLandingConfig } from "@/landings/premium/types";

export const premiumLandingConfigs: Record<string, PremiumLandingConfig> = {
  [barrancasPremiumLandingConfig.id]: barrancasPremiumLandingConfig,
  [canadaPremiumLandingConfig.id]: canadaPremiumLandingConfig,
  [chiapasPremiumLandingConfig.id]: chiapasPremiumLandingConfig,
  [coreaPremiumLandingConfig.id]: coreaPremiumLandingConfig,
  [europaPremiumLandingConfig.id]: europaPremiumLandingConfig,
  [japonPremiumLandingConfig.id]: japonPremiumLandingConfig,
  [peruPremiumLandingConfig.id]: peruPremiumLandingConfig,
};

export {
  barrancasPremiumLandingConfig,
  canadaPremiumLandingConfig,
  chiapasPremiumLandingConfig,
  coreaPremiumLandingConfig,
  europaPremiumLandingConfig,
  japonPremiumLandingConfig,
  peruPremiumLandingConfig,
};
