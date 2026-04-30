import PremiumLandingPage, {
  buildPremiumLandingMetadata,
} from "@/landings/premium/PremiumLandingPage";
import { canadaPremiumLandingConfig } from "@/landings/premium/configs/canada-premium";

export const metadata = buildPremiumLandingMetadata(canadaPremiumLandingConfig);

export default function CanadaPremiumPage() {
  return <PremiumLandingPage config={canadaPremiumLandingConfig} />;
}
