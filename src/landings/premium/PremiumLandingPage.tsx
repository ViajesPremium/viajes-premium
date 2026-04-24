import type { Metadata } from "next";
import PremiumLandingClient from "@/landings/premium/PremiumLandingClient";
import type { PremiumLandingConfig } from "@/landings/premium/types";

export function buildPremiumLandingMetadata(
  config: PremiumLandingConfig,
): Metadata {
  return {
    title: config.metadata.title,
    description: config.metadata.description,
    keywords: config.metadata.keywords,
    alternates: {
      canonical: config.metadata.canonicalPath,
    },
    openGraph: {
      title: config.metadata.title,
      description: config.metadata.description,
      url: config.metadata.canonicalPath,
      siteName: "Viajes Premium",
      images: [
        {
          url: config.metadata.ogImagePath,
          width: 1200,
          height: 630,
          alt: config.metadata.title,
        },
      ],
      locale: config.metadata.locale ?? "es_MX",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: config.metadata.title,
      description: config.metadata.description,
      images: [config.metadata.ogImagePath],
    },
    robots: {
      index: true,
      follow: true,
      nocache: true,
      googleBot: {
        index: true,
        follow: true,
        "max-snippet": -1,
        "max-image-preview": "large",
        "max-video-preview": -1,
      },
    },
  };
}

type PremiumLandingPageProps = {
  config: PremiumLandingConfig;
};

export default function PremiumLandingPage({ config }: PremiumLandingPageProps) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: config.sections.faqs.items.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <PremiumLandingClient config={config} />
    </>
  );
}
