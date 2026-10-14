import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "NCR Grass",
    short_name: "NCR Grass",
    description: "Natural grass supply and lawn installation across North India.",
    start_url: "/",
    display: "standalone",
    background_color: "#1f5a32",
    theme_color: "#1f5a32",
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png" },
      { src: "/icon-maskable-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  };
}
