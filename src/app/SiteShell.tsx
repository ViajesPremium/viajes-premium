"use client";

import { type CSSProperties, useMemo, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import CursorEffect from "@/components/ui/cursor/cursorEffect";
import SmoothScrollProvider from "@/components/smooth-scroll/SmoothScrollProvider";
import { BlogTransitionProvider } from "@/components/page-transition/BlogTransitionProvider";
import Navbar from "@/layout/navbar/navbar";
import { premiumLandingConfigs } from "@/landings/premium/configs";
import type { PremiumLandingConfig } from "@/landings/premium/types";

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
  const premiumConfig = useMemo(
    () => resolvePremiumConfig(pathname),
    [pathname],
  );
  const navbarKey = `navbar-${pathname ?? "root"}`;

  return (
    <div style={premiumConfig ? getThemeStyle(premiumConfig) : undefined}>
      <BlogTransitionProvider>
      <SmoothScrollProvider>
        <CursorEffect>
          {premiumConfig ? (
            <Navbar
              key={navbarKey}
              items={premiumConfig.navbar.menuItems}
              logoUrl={premiumConfig.navbar.logoUrl}
              colors={premiumConfig.navbar.colors}
              accentColor={premiumConfig.navbar.accentColor}
              menuButtonColor={premiumConfig.navbar.menuButtonColor}
              openMenuButtonColor={premiumConfig.navbar.openMenuButtonColor}
              socialItems={premiumConfig.sections.footer.socialLinks.map(
                (s) => ({
                  label: s.label,
                  link: s.href,
                }),
              )}
              displaySocials={true}
            />
          ) : (
            <Navbar key={navbarKey} />
          )}

          {/* LA MAGIA: Al cambiar el pathname, React destruye y recrea esto.
              GSAP obtiene un DOM limpio y sin bugs */}
          <div key={pathname} className="w-full">
            {children}
          </div>
        </CursorEffect>
      </SmoothScrollProvider>
      </BlogTransitionProvider>
    </div>
  );
}


