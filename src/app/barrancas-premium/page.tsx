import PremiumLandingPage, {
  buildPremiumLandingMetadata,
} from "@/landings/premium/PremiumLandingPage";
import { barrancasPremiumLandingConfig } from "@/landings/premium/configs/barrancas-premium";

export const metadata = buildPremiumLandingMetadata(
  barrancasPremiumLandingConfig,
);

export default function BarrancasPremiumPage() {
  return <PremiumLandingPage config={barrancasPremiumLandingConfig} />;
}
