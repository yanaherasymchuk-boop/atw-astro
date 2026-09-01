import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  site: "https://atwdetailing.com",

  integrations: [
    sitemap({
      filter: (page) =>
        !page.endsWith("/thank-you/") &&
        !page.endsWith("/get-in-touch/"),
    }),
  ],

  vite: {
    server: {
      watch: {
        usePolling: true,
        interval: 300,
      },
    },
  },
});
