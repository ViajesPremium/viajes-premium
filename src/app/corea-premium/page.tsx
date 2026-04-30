import PremiumLandingPage, {
  buildPremiumLandingMetadata,
} from "@/landings/premium/PremiumLandingPage";
import { coreaPremiumLandingConfig } from "@/landings/premium/configs/corea-premium";

export const metadata = buildPremiumLandingMetadata(coreaPremiumLandingConfig);

export default function CoreaPremiumPage() {
  return <PremiumLandingPage config={coreaPremiumLandingConfig} />;
}
