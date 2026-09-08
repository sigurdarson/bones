import { defineConfig } from "tsdown";

export default defineConfig({
  entry: { index: "src/index.tsx" },
  format: ["esm"],
  dts: true,
  clean: true,
  deps: { neverBundle: ["react"] },
  outputOptions: {
    // IconProvider uses context; the bundle is a client module. tsdown
    // drops per-file directives when bundling, so declare it here.
    banner: '"use client";',
  },
});
