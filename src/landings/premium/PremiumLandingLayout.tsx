import type { CSSProperties, ReactNode } from "react";
import type { PremiumLandingConfig } from "@/landings/premium/types";

type PremiumLandingLayoutProps = {
  config: PremiumLandingConfig;
  children: ReactNode;
};

function getThemeStyle(config: PremiumLandingConfig): CSSProperties {
  return {
    "--primary": config.theme.primary,
    "--secondary": config.theme.secondary,
    "--complementary":
      config.theme.complementary ?? "var(--complementary)",
    "--yellow": config.theme.yellow ?? "var(--yellow)",
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
