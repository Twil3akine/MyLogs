// @ts-check
import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";

export default defineConfig({
  site: "https://twil3akine.pages.dev",
  integrations: [
    mdx({
      remarkPlugins: [remarkMath],
      rehypePlugins: [rehypeKatex],
    }),
  ],
  vite: {
    server: {
      host: "0.0.0.0",
      port: 4321,
      watch: {
        usePolling: true,
        interval: 1000,
      },
    },
  },
});
