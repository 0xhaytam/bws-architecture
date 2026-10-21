// @ts-check
import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import { loadEnv } from "vite";
import { fileURLToPath } from "node:url";

const env = loadEnv(process.env.NODE_ENV || "production", process.cwd(), "");
const wpBaseUrl =
  env.WP_CMS_URL ||
  env.WP_BASE_URL ||
  env.WP_API_URL?.replace(/\/wp-json\/?$/, "") ||
  "https://wordpress.example.com";
const wpDomain = new URL(wpBaseUrl).hostname;
const mediaDomain = env.WP_MEDIA_DOMAIN || wpDomain;

export default defineConfig({
  site: env.PUBLIC_SITE_URL || "https://www.example.com",
  output: "static",
  integrations: [react(), sitemap()],
  image: {
    domains: [...new Set([wpDomain, mediaDomain])],
    remotePatterns: [
      { protocol: "http", hostname: wpDomain },
      { protocol: "https", hostname: wpDomain },
      { protocol: "https", hostname: mediaDomain },
    ],
  },
  vite: {
    // The media hostname is public configuration used by hydrated image
    // components to build Cloudflare transformation URLs.
    envPrefix: ["PUBLIC_", "WP_MEDIA_DOMAIN"],
    plugins: [tailwindcss()],
    ssr: { noExternal: ["lucide-react"] },
    resolve: { alias: { "@": fileURLToPath(new URL(".", import.meta.url)) } },
  },
  prefetch: { defaultStrategy: "hover" },
});
