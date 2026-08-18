import { defineConfig } from "tsdown";

export default defineConfig({
  entry: {
    index: "src/index.ts",
    styles: "src/styles.css",
  },
  format: ["esm"],
  dts: true,
  clean: true,
  external: ["react", "react-dom"],
  outputOptions: {
    // Interactive components; the whole bundle is a client module. tsdown
    // drops per-file directives when bundling, so declare it here.
    banner: '"use client";',
  },
});
