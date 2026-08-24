import { MetadataRoute } from "next";
import { SERVICES_CATALOG } from "@/data/servicesData";

export const dynamic = "force-static";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://eraao.com";

  // Static core routes
  const staticRoutes: MetadataRoute.Sitemap = [
    "",
    "/services",
    "/academy",
    "/careers",
    "/about",
    "/blog",
    "/book",
    "/quote",
    "/privacy",
    "/terms",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? ("daily" as const) : ("weekly" as const),
    priority: route === "" ? 1.0 : 0.8,
  }));

  // Dynamic service detail routes
  const serviceRoutes: MetadataRoute.Sitemap = SERVICES_CATALOG.map((service) => ({
    url: `${baseUrl}/services/${service.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.85,
  }));

  return [...staticRoutes, ...serviceRoutes];
}
