import { MetadataRoute } from "next";
import { premiumLandingConfigs } from "@/landings/premium/configs";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL || "https://www.viajespremium.com";

  const staticEntries: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 1,
    },
  ];

  const landingEntries: MetadataRoute.Sitemap = Object.values(
    premiumLandingConfigs,
  ).map((landing) => ({
    url: `${baseUrl}${landing.routePath}`,
    lastModified: new Date(),
    changeFrequency: "yearly",
    priority: 0.9,
  }));

  return [...staticEntries, ...landingEntries];
}
