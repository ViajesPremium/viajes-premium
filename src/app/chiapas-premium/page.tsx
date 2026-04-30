import PremiumLandingPage, {
  buildPremiumLandingMetadata,
} from "@/landings/premium/PremiumLandingPage";
import { chiapasPremiumLandingConfig } from "@/landings/premium/configs/chiapas-premium";

export const metadata = buildPremiumLandingMetadata(
  chiapasPremiumLandingConfig,
);

export default function ChiapasPremiumPage() {
  return <PremiumLandingPage config={chiapasPremiumLandingConfig} />;
}
