import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "ERAAO — Applied AI & Cybersecurity Academy",
    short_name: "ERAAO",
    description: "Enterprise AI Development, Defensive & Offensive Cybersecurity Services, and Professional Practitioner Academy.",
    start_url: "/",
    display: "standalone",
    orientation: "portrait",
    background_color: "#090d16",
    theme_color: "#0ea5e9",
    icons: [
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
      {
        src: "/eraao-logo.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
