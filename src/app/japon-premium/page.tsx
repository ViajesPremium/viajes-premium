import PremiumLandingPage, {
  buildPremiumLandingMetadata,
} from "@/landings/premium/PremiumLandingPage";
import { japonPremiumLandingConfig } from "@/landings/premium/configs/japon-premium";

export const metadata = buildPremiumLandingMetadata(japonPremiumLandingConfig);

export default function JaponPremiumPage() {
  return <PremiumLandingPage config={japonPremiumLandingConfig} />;
}
