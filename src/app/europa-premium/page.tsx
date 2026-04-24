import PremiumLandingPage, {
  buildPremiumLandingMetadata,
} from "@/landings/premium/PremiumLandingPage";
import { europaPremiumLandingConfig } from "@/landings/premium/configs/europa-premium";

export const metadata = buildPremiumLandingMetadata(europaPremiumLandingConfig);

export default function EuropaPremiumPage() {
  return <PremiumLandingPage config={europaPremiumLandingConfig} />;
}
