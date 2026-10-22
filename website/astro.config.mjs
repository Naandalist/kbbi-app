import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import react from "@astrojs/react";

// Custom domain. base stays "/" so asset and page paths are not prefixed.
// https://kbbi.naandalist.com
export default defineConfig({
  site: "https://kbbi.naandalist.com",
  output: "static",
  trailingSlash: "always",
  integrations: [tailwind(), react()],
});
