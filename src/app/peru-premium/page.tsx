import PremiumLandingPage, {
  buildPremiumLandingMetadata,
} from "@/landings/premium/PremiumLandingPage";
import { peruPremiumLandingConfig } from "@/landings/premium/configs/peru-premium";

export const metadata = buildPremiumLandingMetadata(peruPremiumLandingConfig);

export default function PeruPremiumPage() {
  return <PremiumLandingPage config={peruPremiumLandingConfig} />;
}
