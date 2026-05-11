import type { FooterSectionConfig, PremiumLandingTheme } from "@/landings/premium/types";
import type {
  StaggeredMenuItem,
  StaggeredMenuSocialItem,
} from "@/layout/navbar/navbar";

export type SiteNavbarConfig = {
  logoUrl: string;
  menuItems?: StaggeredMenuItem[];
  colors: [string, string];
  accentColor: string;
  menuButtonColor: string;
  openMenuButtonColor: string;
  socialItems: StaggeredMenuSocialItem[];
};

export type DefaultSiteConfig = {
  theme: PremiumLandingTheme;
  navbar: SiteNavbarConfig;
  footer: FooterSectionConfig;
};

export const DEFAULT_SITE_CONFIG: DefaultSiteConfig = {
  theme: {
    primary: "#002744",
    secondary: "#CCCCCC",
    complementary: "#FDCB34",
    yellow: "#f2cd5e",
    background: "#f3f3f0",
    black: "#16181b",
    white: "#f3f3f0",
  },
  navbar: {
    logoUrl: "/principal-logo.svg",
    colors: ["var(--primary)", "var(--secondary)"],
    accentColor: "var(--secondary)",
    menuButtonColor: "#ffffff",
    openMenuButtonColor: "#111111",
    socialItems: [
      { label: "TikTok", link: "https://www.tiktok.com/@viajespremium" },
      {
        label: "Instagram",
        link: "https://www.instagram.com/viajespremium.oficial",
      },
      {
        label: "Youtube",
        link: "https://www.youtube.com/@viajespremiumelevatuvida",
      },
      {
        label: "Facebook",
        link: "https://www.facebook.com/turismosantafeoficial",
      },
    ],
  },
  footer: {
    srHeading: "Footer Viajes Premium",
    logoWord: "VIAJES",
    address:
      "Cda. de Omega 306, Romero de Terreros, Coyoacan, 04310 Ciudad de Mexico, CDMX",
    mapEmbedTitle: "Ubicacion Viajes Premium",
    contactEmail: "reservaciones@viajespremium.com.mx",
    contactPhoneDisplay: "+52 55 4161 9428",
    contactPhoneLink: "+525541619428",
    pageLinks: [
      { label: "Inicio", href: "/" },
      { label: "Nosotros", href: "/nosotros" },
      { label: "Blog", href: "/blog" },
    ],
    socialLinks: [
      { label: "TikTok", href: "https://www.tiktok.com/@viajespremium" },
      {
        label: "Instagram",
        href: "https://www.instagram.com/viajespremium.oficial",
      },
      {
        label: "Youtube",
        href: "https://www.youtube.com/@viajespremiumelevatuvida",
      },
      {
        label: "Facebook",
        href: "https://www.facebook.com/turismosantafeoficial",
      },
    ],
    copyrightText:
      "Todas las marcas y servicios que se ofrecen son propiedad de Viajes PREMIUM. Consulte Terminos y Condiciones en el Contrato de Adhesion ante PROFECO con numero 7735-2015 y 7180-2015",
    backToTopLabel: "Volver al inicio",
    legalLinks: [
      {
        label: "AVISO DE PRIVACIDAD",
        href: "/japon-premium/aviso-de-privacidad",
      },
    ],
  },
};
