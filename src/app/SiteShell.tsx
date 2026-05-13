"use client";

import { type CSSProperties, useMemo, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import { MotionConfig } from "motion/react";
import CursorEffect from "@/components/ui/cursor/cursorEffect";
import SmoothScrollProvider from "@/components/smooth-scroll/SmoothScrollProvider";
import { TransitionProvider } from "@/components/page-transition/TransitionProvider";
import { useAnimationsEnabled } from "@/lib/animation-budget";
import Navbar from "@/layout/navbar/navbar";
import { premiumLandingConfigs } from "@/landings/premium/configs";
import type { PremiumLandingConfig, PremiumLandingTheme } from "@/landings/premium/types";
import { DEFAULT_SITE_CONFIG } from "@/config/default-site-config";

function getThemeStyle(theme: PremiumLandingTheme): CSSProperties {
  return {
    "--primary": theme.primary,
    "--secondary": theme.secondary,
    "--complementary": theme.complementary ?? "var(--complementary)",
    "--yellow": theme.yellow ?? "var(--yellow)",
    "--bg": theme.background ?? "var(--bg)",
    "--black": theme.black ?? "var(--black)",
    "--white": theme.white ?? "var(--white)",
  } as CSSProperties;
}

function resolvePremiumConfig(
  pathname: string | null,
): PremiumLandingConfig | null {
  if (!pathname) return null;
  return (
    Object.values(premiumLandingConfigs).find(
      (config) =>
        pathname === config.routePath ||
        pathname.startsWith(`${config.routePath}/`),
    ) ?? null
  );
}

type SiteShellProps = {
  children: ReactNode;
};

export default function SiteShell({ children }: SiteShellProps) {
  const pathname = usePathname();
  const animationsEnabled = useAnimationsEnabled();
  const premiumConfig = useMemo(
    () => resolvePremiumConfig(pathname),
    [pathname],
  );
  const navbarKey = `navbar-${pathname ?? "root"}`;

  const activeTheme = premiumConfig?.theme ?? DEFAULT_SITE_CONFIG.theme;

  const navbarProps = useMemo(() => {
    if (premiumConfig) {
      return {
        items: premiumConfig.navbar.menuItems,
        logoUrl: premiumConfig.navbar.logoUrl ?? DEFAULT_SITE_CONFIG.navbar.logoUrl,
        colors: premiumConfig.navbar.colors,
        accentColor: premiumConfig.navbar.accentColor,
        menuButtonColor: premiumConfig.navbar.menuButtonColor,
        openMenuButtonColor: premiumConfig.navbar.openMenuButtonColor,
        socialItems: premiumConfig.sections.footer.socialLinks.map((s) => ({
          label: s.label,
          link: s.href,
        })),
      };
    }
    return DEFAULT_SITE_CONFIG.navbar;
  }, [premiumConfig]);

  return (
    <div style={getThemeStyle(activeTheme)}>
      <MotionConfig reducedMotion={animationsEnabled ? "user" : "always"}>
        <TransitionProvider>
          <SmoothScrollProvider>
            <CursorEffect>
              <Navbar key={navbarKey} displaySocials {...navbarProps} />

              {/* Al cambiar el pathname, React destruye y recrea esto.
                GSAP obtiene un DOM limpio y sin bugs */}
              <div key={pathname} className="w-full">
                {children}
              </div>
            </CursorEffect>
          </SmoothScrollProvider>
        </TransitionProvider>
      </MotionConfig>
    </div>
  );
}
