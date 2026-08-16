import { defineConfig } from "tsdown";

export default defineConfig({
  entry: { index: "src/index.tsx" },
  format: ["esm"],
  dts: true,
  clean: true,
  external: ["react"],
});
