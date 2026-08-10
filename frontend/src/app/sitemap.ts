import { MetadataRoute } from "next";

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
    "/privacy",
    "/terms",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "daily" : "weekly",
    priority: route === "" ? 1.0 : 0.8,
  }));

  return staticRoutes;
}
