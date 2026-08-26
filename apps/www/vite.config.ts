import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";

export default defineConfig({
  resolve: {
    alias: {
      "@": fileURLToPath(new URL(".", import.meta.url)),
    },
  },
  server: {
    fs: {
      /* The changelog page imports CHANGELOG.md from the repo root. */
      allow: ["../.."],
    },
  },
  plugins: [
    tanstackStart({
      /* The site is fully static: prerender every page (crawled from the
         root) plus the two text endpoints. */
      prerender: {
        enabled: true,
        crawlLinks: true,
      },
      pages: [
        { path: "/llms.txt", prerender: { enabled: true } },
        { path: "/skills/bones.md", prerender: { enabled: true } },
      ],
    }),
    // react's vite plugin must come after start's vite plugin
    viteReact(),
  ],
});
