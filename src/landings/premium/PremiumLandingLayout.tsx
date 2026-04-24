import type { CSSProperties, ReactNode } from "react";
import type { PremiumLandingConfig } from "@/landings/premium/types";

type PremiumLandingLayoutProps = {
  config: PremiumLandingConfig;
  children: ReactNode;
};

function getThemeStyle(config: PremiumLandingConfig): CSSProperties {
  return {
    "--primary-japon": config.theme.primary,
    "--secondary-japon": config.theme.secondary,
    "--complementary-japon":
      config.theme.complementary ?? "var(--complementary-japon)",
    "--yellow-japon": config.theme.yellow ?? "var(--yellow-japon)",
    "--bg": config.theme.background ?? "var(--bg)",
    "--black": config.theme.black ?? "var(--black)",
    "--white": config.theme.white ?? "var(--white)",
  } as CSSProperties;
}

export default function PremiumLandingLayout({
  config,
  children,
}: PremiumLandingLayoutProps) {
  return <div style={getThemeStyle(config)}>{children}</div>;
}
