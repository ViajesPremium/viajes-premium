import type { FocusRailItem } from "@/components/ui/focus-rail/focus-rail";
import type { LogoItem } from "@/components/ui/marquee/marquee";
import type { ImageSectionFormConfig } from "@/layout/first-form/form";
import type { StaggeredMenuItem } from "@/layout/navbar/navbar";
import type { GoogleRatingData } from "@/lib/google-reviews";

export type PremiumLandingMetadata = {
  title: string;
  description: string;
  keywords: string[];
  canonicalPath: string;
  ogImagePath: string;
  locale?: string;
};

export type PremiumLandingTheme = {
  primary: string;
  secondary: string;
  complementary?: string;
  yellow?: string;
  background?: string;
  black?: string;
  white?: string;
};

export type PremiumLandingNavbar = {
  logoUrl: string;
  menuItems: StaggeredMenuItem[];
  colors: [string, string];
  accentColor: string;
  menuButtonColor: string;
  openMenuButtonColor: string;
};

export type HeroDescriptionLine = {
  highlight: string;
  text: string;
};

export type HeroOverlayConfig = {
  baseImage: string;
  samuraiImage: string;
  baseAlt?: string;
  samuraiAlt?: string;
};

export type HeroSectionConfig = {
  seoHeading: string;
  title: {
    line1Lead: string;
    line1Focus: string;
    line2Lead: string;
    line2Focus: string;
  };
  mobileTitle?: {
    line1Lead: string;
    line1Focus: string;
    line2Lead: string;
    line2Focus: string;
  };
  descriptionLines: HeroDescriptionLine[];
  ctaPrimary: {
    label: string;
    target: string;
  };
  ctaSecondary: {
    label: string;
    target: string;
  };
  backgroundImage: string;
  heroOverlay?: HeroOverlayConfig;
};

export type SnapshotCardConfig = {
  image: string;
  text: string;
  experiences: string;
  wide?: boolean;
};

export type SnapshotSectionConfig = {
  srHeading: string;
  badgeText: string;
  titleText: string;
  titleHighlightWords: string[];
  cards: SnapshotCardConfig[];
  cardButtonLabel: string;
  cardButtonTarget: string;
};

export type FirstFormSectionConfig = {
  srHeading: string;
  sectionTitle: string;
  sectionTitleHighlightWord?: string;
  sectionSubtitle: string;
  backgroundImage: string;
  mobileImage: {
    src: string;
    alt: string;
  };
  formConfig: ImageSectionFormConfig;
};

export type HighlightsBracketConfig = {
  label: string;
  imageSrc: string;
  imageAlt: string;
  textTone?: "ot" | "epochal";
};

export type HighlightsSectionConfig = {
  srHeading: string;
  badgeText: string;
  kickerTop: string;
  kickerBottom: string;
  line1: {
    lead: string;
    bracket: HighlightsBracketConfig;
    tail: string;
  };
  line2: {
    text: string;
    highlightWord: string;
    bracket: HighlightsBracketConfig;
    tail: string;
  };
  line3: {
    lead: string;
    bracket: HighlightsBracketConfig;
    tail: string;
  };
  line4: {
    text: string;
    highlightWord: string;
  };
  focusRailItems: FocusRailItem[];
  ctaPrimary: {
    label: string;
    target: string;
  };
  ctaSecondary: {
    label: string;
    target: string;
  };
};

export type ItineraryItemConfig = {
  id: number;
  day: string;
  title: string;
  description: string;
  ideal: string;
  image1: string;
  image2: string;
};

export type ItinerariesSectionConfig = {
  srHeading: string;
  items: ItineraryItemConfig[];
  secondaryCtaLabel: string;
  primaryCta: {
    label: string;
    target: string;
  };
};

export type IncludesItemConfig = {
  id: string;
  label: string;
  title: string;
  description: string;
  image: string;
};

export type IncludesSectionConfig = {
  srHeading: string;
  badgeText: string;
  titleText: string;
  titleHighlightWords: string[];
  cta: {
    label: string;
    target: string;
  };
  cardChipLabel: string;
  previousButtonAriaLabel: string;
  nextButtonAriaLabel: string;
  items: IncludesItemConfig[];
};

export type TestimonialItemConfig = {
  id: number;
  quote: string;
  name: string;
  location: string;
  avatar: string;
};

export type TestimonialsSectionConfig = {
  srHeading: string;
  badgeText: string;
  items: TestimonialItemConfig[];
  cta: {
    label: string;
    target: string;
  };
  googleRating?: GoogleRatingData;
};

export type InterludeSectionConfig = {
  srHeading: string;
  rows: [string, string, string];
  role: string;
  name: string;
  quote: string;
  quoteHighlight: string;
  image: {
    src: string;
    alt: string;
  };
};

export type FaqItemConfig = {
  id: string;
  question: string;
  answer: string;
};

export type FaqsSectionConfig = {
  srHeading: string;
  accordionAriaLabel: string;
  badgeText: string;
  title: string;
  subtitle: string;
  contactLabel: string;
  contactEmail: string;
  items: FaqItemConfig[];
};

export type CtaFormSectionConfig = {
  srHeading: string;
  backgroundImage: string;
  shojiBaseImage: string;
  shojiLeftImage: string;
  shojiRightImage: string;
  formTheme?: "dark" | "light";
  formConfig: ImageSectionFormConfig;
};

export type MarqueeSectionConfig = {
  srHeading: string;
  badgeText: string;
  introLeftLogo: {
    src: string;
    alt: string;
    width: number;
    height: number;
  };
  introRightLogo: {
    src: string;
    alt: string;
    width: number;
    height: number;
  };
  logos: LogoItem[];
};

export type FooterSectionConfig = {
  srHeading: string;
  samuraiImage: string;
  brandLogo: string;
  address: string;
  mapEmbedTitle: string;
  contactEmail: string;
  contactPhoneDisplay: string;
  contactPhoneLink: string;
  pageLinks: Array<{ label: string; href: string }>;
  socialLinks: Array<{ label: string; href: string }>;
  copyrightText: string;
  backToTopLabel: string;
  legalLinks: Array<{ label: string; href: string }>;
};

export type PremiumLandingSections = {
  hero: HeroSectionConfig;
  snapshot: SnapshotSectionConfig;
  firstForm: FirstFormSectionConfig;
  highlights: HighlightsSectionConfig;
  itineraries: ItinerariesSectionConfig;
  includes: IncludesSectionConfig;
  testimonials: TestimonialsSectionConfig;
  interlude: InterludeSectionConfig;
  faqs: FaqsSectionConfig;
  ctaForm: CtaFormSectionConfig;
  marquee: MarqueeSectionConfig;
  footer: FooterSectionConfig;
};

export type PremiumLandingConfig = {
  id: string;
  routePath: string;
  metadata: PremiumLandingMetadata;
  theme: PremiumLandingTheme;
  navbar: PremiumLandingNavbar;
  sections: PremiumLandingSections;
};
