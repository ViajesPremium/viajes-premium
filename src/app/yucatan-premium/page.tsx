import PremiumLandingPage, {
  buildPremiumLandingMetadata,
} from "@/landings/premium/PremiumLandingPage";
import { yucatanPremiumLandingConfig } from "@/landings/premium/configs/yucatan-premium";

export const metadata = buildPremiumLandingMetadata(
  yucatanPremiumLandingConfig,
);

export default function YucatanPremiumPage() {
  return <PremiumLandingPage config={yucatanPremiumLandingConfig} />;
}
